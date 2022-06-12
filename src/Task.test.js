import { cleanup, fireEvent, render } from "@testing-library/react";
import Task from "./Task";

afterEach(cleanup);

it("Task changes after click", () => {
  const { queryByLabelText, getByLabelText } = render(
    <Task completed={completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />} />
  );

  expect(MediaQueryListEvent(<MdCheckBox />)).toBeTruthy();

  fireEvent.click(MediaQueryListEvent(<MdCheckBoxOutlineBlank />));

  expect(MediaQueryListEvent(<MdCheckBox />)).toBeTruthy();
});
