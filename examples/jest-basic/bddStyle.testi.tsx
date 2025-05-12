import {
  Debug,
  Given,
  MockFetch,
  Spy,
  TestCase,
  TestSuite,
  Then,
  Verify,
  Wait,
  When,
  WhenAsync,
} from "../../build/components/test-dsl";
import { render } from "../../build/renderTestTree";

// Sample user service
class UserService {
  async login(credentials: { email: string; password: string }) {
    // In a real app, this would call an API
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    return response.json();
  }

  validateEmail(email: string) {
    return email.includes("@");
  }
}

render(
  <TestSuite
    name="User Authentication"
    description="Tests for user login and registration flows"
    tags={["auth", "user"]}
  >
    {/* Setup shared test data */}
    <Given name="userService" value={new UserService()} />
    <Given
      name="validCredentials"
      value={{ email: "user@example.com", password: "password123" }}
    />
    <Given
      name="invalidCredentials"
      value={{ email: "invalid", password: "wrong" }}
    />

    <TestCase
      name="validates email format correctly"
      description="Email validator should identify valid and invalid emails"
    >
      {/* Test valid email */}
      <When
        fn={(ctx) =>
          ctx
            .get("userService")
            .validateEmail(ctx.get("validCredentials").email)
        }
        as="validResult"
      />
      <Then expect="validResult" toBeTrue />

      {/* Test invalid email */}
      <When
        fn={(ctx) =>
          ctx
            .get("userService")
            .validateEmail(ctx.get("invalidCredentials").email)
        }
        as="invalidResult"
      />
      <Then expect="invalidResult" toBeFalse />

      {/* Debug output */}
      <Debug value="validResult" message="Valid email check result" />
    </TestCase>

    <TestCase
      name="logs in successfully with valid credentials"
      tags={["happy-path"]}
    >
      {/* Mock the fetch API */}
      <MockFetch
        url="/api/login"
        method="POST"
        response={{ success: true, token: "abc123" }}
        status={200}
      />

      {/* Create a spy on the login method */}
      <Spy target="userService" method="login" as="loginSpy" />

      {/* Perform the login */}
      <WhenAsync
        fn={(ctx) => ctx.get("userService").login(ctx.get("validCredentials"))}
        as="loginResult"
      />

      {/* Wait for async operation to complete */}
      <Wait ms={100} />

      {/* Verify the result */}
      <Then expect="loginResult.success" toBe={true} />
      <Then expect="loginResult.token" toEqual="abc123" />

      {/* Verify the spy was called correctly */}
      <Verify spy="loginSpy" calledOnce />
      <Verify
        spy="loginSpy"
        calledWith={[{ email: "user@example.com", password: "password123" }]}
      />
    </TestCase>

    <TestCase name="fails with invalid credentials" tags={["error-handling"]}>
      {/* Mock the fetch API to return an error */}
      <MockFetch
        url="/api/login"
        method="POST"
        response={{ success: false, error: "Invalid credentials" }}
        status={401}
      />

      {/* Perform the login with invalid credentials */}
      <WhenAsync
        fn={(ctx) =>
          ctx.get("userService").login(ctx.get("invalidCredentials"))
        }
        as="loginResult"
      />

      {/* Wait for async operation to complete */}
      <Wait ms={100} />

      {/* Verify the error result */}
      <Then expect="loginResult.success" toBeFalse />
      <Then expect="loginResult.error" toEqual="Invalid credentials" />
    </TestCase>
  </TestSuite>
);
