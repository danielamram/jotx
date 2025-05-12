import { AssertEqual, Call, TestCase, TestSuite, render } from "../../build";

const add = (a: number, b: number) => a + b;

render(
  <TestSuite name="Math">
    <TestCase name="adds numbers">
      <Call fn={() => add(2, 3)} as="result" />
      <AssertEqual actual="result" expected={5} />
    </TestCase>
  </TestSuite>
);
