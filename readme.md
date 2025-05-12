# JotX

<div align="center">
  <img src="https://github.com/danielamram/jotx/blob/f19285333ddee94fecf3b5344c98db0beeb661b4/media/jotx-logo.png" alt="JotX Logo" width="200" />
  <h3>Declarative, React-based Testing Framework</h3>
  <p>Write tests as React components with a BDD-style syntax</p>
  
  [![npm version](https://img.shields.io/npm/v/jotx.svg?style=flat)](https://www.npmjs.com/package/jotx)
  [![Build Status](https://img.shields.io/github/workflow/status/jotx/jotx/CI)](https://github.com/jotx/jotx/actions)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
</div>

## Overview

JotX is a developer-friendly testing framework that lets you write tests as React components. It combines the declarative nature of React with the expressiveness of Behavior-Driven Development (BDD) to create tests that are readable, maintainable, and powerful.

```tsx
// math.test.tsx
import { AssertEqual, Call, TestCase, TestSuite, render } from "jotx";

const add = (a: number, b: number) => a + b;

render(
  <TestSuite name="Math">
    <TestCase name="adds numbers">
      <Call fn={() => add(2, 3)} as="result" />
      <AssertEqual actual="result" expected={5} />
    </TestCase>
  </TestSuite>
);
```

## Features

- 🧩 **Declarative Testing**: Write tests as React components
- 🔍 **BDD-Style Syntax**: Given-When-Then pattern for clear test structure
- 🔄 **Async Testing**: Support for asynchronous operations
- 🎭 **Powerful Mocking**: Mock functions, APIs, and network requests
- 👁️ **Spying**: Track function calls and verify interactions
- 🐞 **Debugging**: Enhanced debugging with context inspection
- 🏷️ **Tagging**: Organize tests with tags and descriptions
- 🔌 **Extensible**: Works with Jest, Vitest, and other test runners

## Installation

```shellscript
npm install --save-dev jotx
# or
yarn add --dev jotx
# or
pnpm add --save-dev jotx
```

## Basic Usage

### 1. Configure your test runner

Create a setup file for your test runner (e.g., `jest.setup.ts`):

```typescript
// For Jest
import { jestRuntime } from "jotx/runtimes/jest";
import { setRuntime } from "jotx";

setRuntime(jestRuntime);
```

> **Note:** Make sure your test environment's `tsconfig.json` includes:
>
> ```json
> {
>   "compilerOptions": {
>     "jsx": "react-jsx"
>   }
> }
> ```

### 2. Write your first test

```tsx
import { TestSuite, TestCase, Given, When, Then, render } from "jotx";

// Function to test
const add = (a: number, b: number) => a + b;

render(
  <TestSuite name="Math Functions">
    <TestCase name="adds two numbers correctly">
      <Given name="a" value={2} />
      <Given name="b" value={3} />
      <When fn={(ctx) => add(ctx.get("a"), ctx.get("b"))} as="result" />
      <Then expect="result" toBe={5} />
    </TestCase>
  </TestSuite>
);
```

### 3. Run your tests

```shellscript
npm test
# or
yarn test
# or
pnpm test
```

## Advanced Usage

### Testing Asynchronous Code

```tsx
<TestCase name="fetches user data">
  <MockFetch url="/api/users/1" response={{ id: 1, name: "John Doe" }} />

  <WhenAsync fn={() => fetchUserData(1)} as="userData" />

  <Then expect="userData.name" toEqual="John Doe" />
</TestCase>
```

### Spying and Verification

```tsx
<TestCase name="calls the logger when error occurs">
  <Given name="logger" value={{ error: jest.fn() }} />
  <Spy target="logger" method="error" as="loggerSpy" />

  <When
    fn={(ctx) => processWithErrorHandling("bad data", ctx.get("logger"))}
    as="result"
  />

  <Verify spy="loggerSpy" called={true} />
  <Verify spy="loggerSpy" calledWith={["Error processing data: bad data"]} />
</TestCase>
```

### Mocking

```tsx
<TestCase name="uses cached data when available">
  <Given name="cache" value={{ get: jest.fn(), set: jest.fn() }} />
  <Given name="cacheKey" value="user-123" />
  <Given name="cachedData" value={{ name: "Cached User" }} />

  <Mock
    target="cache"
    method="get"
    implementation={(ctx) => (key) =>
      key === ctx.get("cacheKey") ? ctx.get("cachedData") : null
    }
  />

  <When
    fn={(ctx) => getUserWithCache(ctx.get("cacheKey"), ctx.get("cache"))}
    as="result"
  />

  <Then expect="result.name" toEqual="Cached User" />
</TestCase>
```

## API Reference

### Core Components

#### `<TestSuite>`

Groups related tests together.

```tsx
<TestSuite
  name="User Authentication"
  description="Tests for user login and registration"
  tags={["auth", "user"]}
>
  {/* Test cases go here */}
</TestSuite>
```

#### `<TestCase>`

Defines an individual test.

```tsx
<TestCase
  name="logs in successfully"
  description="User should be able to log in with valid credentials"
  tags={["happy-path"]}
>
  {/* Test steps go here */}
</TestCase>
```

### BDD Components

#### `<Given>`

Sets up test preconditions.

```tsx
<Given name="user" value={{ id: 1, name: "John" }} />
```

#### `<When>`

Executes the action being tested.

```tsx
<When fn={(ctx) => login(ctx.get("credentials"))} as="result" />
```

#### `<WhenAsync>`

Executes asynchronous actions.

```tsx
<WhenAsync
  fn={(ctx) => fetchUserData(ctx.get("userId"))}
  as="userData"
  timeout={5000} // Optional timeout in ms
/>
```

#### `<Then>`

Asserts the expected outcome.

```tsx
<Then expect="result.success" toBe={true} />
<Then expect="user.name" toEqual="John Doe" />
<Then expect="errors" toContain="Invalid email" />
<Then expect="value" toBeTrue />
<Then expect="value" toBeDefined />
<Then expect="text" toMatch={/hello/i} />
```

### Mocking Components

#### `<Mock>`

Creates a mock function.

```tsx
<Mock
  target="userService"
  method="login"
  returns={{ success: true }}
/>

<Mock
  target="api"
  method="fetchData"
  resolves={{ data: [...] }}
/>

<Mock
  target="database"
  method="query"
  implementation={(ctx) => [...ctx.get("mockData")]}
/>
```

#### `<MockFetch>`

Mocks fetch API responses.

```tsx
<MockFetch
  url="/api/users"
  method="GET" // Optional, defaults to GET
  response={[{ id: 1, name: "John" }]}
  status={200} // Optional, defaults to 200
  headers={{ "Content-Type": "application/json" }} // Optional
  delay={500} // Optional delay in ms
/>
```

#### `<Spy>`

Creates a spy on an object method.

```tsx
<Spy target="userService" method="login" as="loginSpy" />
```

#### `<Verify>`

Verifies spy/mock interactions.

```tsx
<Verify spy="loginSpy" called={true} />
<Verify spy="fetchSpy" calledTimes={2} />
<Verify spy="createUserSpy" calledWith={["John", 30]} />
<Verify spy="firstSpy" calledBefore="secondSpy" />
```

### Utility Components

#### `<Wait>`

Pauses test execution.

```tsx
<Wait ms={500} description="Wait for animation to complete" />
```

#### `<Debug>`

Logs debug information.

```tsx
<Debug value="userData" message="User data after login" />
<Debug logContext={true} />
```

## Configuration

### Test Runners

JotX supports multiple test runners through runtime adapters:

- **Jest**: `jotx/runtimes/jest`
- **Vitest**: `jotx/runtimes/vitest`

Create your own adapter by implementing the `TestRuntime` interface.

### TypeScript Configuration

For the best development experience, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat(runtime): some amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Ink
- Built with TypeScript and React
