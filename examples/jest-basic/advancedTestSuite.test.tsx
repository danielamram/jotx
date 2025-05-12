import {
  AfterAll,
  AfterEach,
  AssertDefined,
  AssertEqual,
  AssertFalse,
  AssertRejects,
  AssertThrows,
  AssertTrue,
  AsyncCall,
  BeforeAll,
  BeforeEach,
  Call,
  OnlyTest,
  render,
  SkipTest,
  TestCase,
  TestSuite,
  Wait,
} from "../../build";

// Sample functions to test
const add = (a: number, b: number) => a + b;
const asyncFunction = async (value: boolean) => {
  if (!value) throw new Error("Failed");
  return "success";
};
const throwingFunction = () => {
  throw new Error("Expected error");
};

// Sample class to test spying and mocking
class Calculator {
  add(a: number, b: number) {
    return a + b;
  }
  subtract(a: number, b: number) {
    return a - b;
  }
}

render(
  <TestSuite name="Advanced Test Suite Example">
    {/* Setup and teardown */}
    <BeforeAll fn={() => console.log("Before all tests")} />
    <AfterAll fn={() => console.log("After all tests")} />
    <BeforeEach fn={() => console.log("Before each test")} />
    <AfterEach fn={() => console.log("After each test")} />

    {/* Basic assertions */}
    <TestCase name="demonstrates various assertions">
      <Call fn={() => add(2, 3)} as="result" />
      <AssertEqual actual="result" expected={5} />
      <AssertTrue value="result" />
      <AssertFalse value="result" />
      <AssertDefined value="result" />
    </TestCase>

    {/* Async testing */}
    <TestCase name="tests async functions">
      <AsyncCall fn={() => asyncFunction(true)} as="asyncResult" />
      <Wait ms={100} />
      <AssertEqual actual="asyncResult" expected="success" />
    </TestCase>

    {/* Testing exceptions */}
    <TestCase name="tests throwing functions">
      <Call fn={() => throwingFunction} as="throwingFn" />
      <AssertThrows fn="throwingFn" />
    </TestCase>

    <TestCase name="tests rejecting promises">
      <Call fn={() => () => asyncFunction(false)} as="rejectingFn" />
      <AssertRejects fn="rejectingFn" />
    </TestCase>

    {/* Spying and mocking */}
    <TestCase name="demonstrates spying">
      <Call fn={() => new Calculator()} as="calculator" />
      {/* <Spy object="calculator" method="add" as="addSpy" />
      <Call
        fn={(context) => {
          const calc = context.get("calculator");
          calc.add(5, 3);
          return calc.add(1, 1);
        }}
        as="spyResult"
      /> */}
      <AssertEqual actual="spyResult" expected={2} />
      {/* In a real test, you would verify the spy was called correctly */}
    </TestCase>

    {/* Skipped test */}
    <SkipTest name="this test is skipped">
      <Call fn={() => "skipped"} as="skipped" />
      <AssertEqual actual="skipped" expected="this won't run" />
    </SkipTest>

    {/* Focused test */}
    <OnlyTest name="only this test would run (if enabled)">
      <Call fn={() => "focused"} as="focused" />
      <AssertEqual actual="focused" expected="focused" />
    </OnlyTest>
  </TestSuite>
);
