import { render, screen, fireEvent } from "@testing-library/react";
import { ConfigProvider, Form } from "antd";

import "@mocks/dom";

import NumberInput from "../number-input";

const renderNumberInput = () => (
  <ConfigProvider>
    <Form name="numberInputForm">
      <NumberInput label="Number Input" name="numberInput" />
    </Form>
  </ConfigProvider>
);

describe("Number input", () => {
  it("Should increase value correctly", async () => {
    render(renderNumberInput());

    const input = await screen.findByRole("number-input");
    fireEvent.change(input, { target: { value: "2" } });
    expect(input).toHaveValue("2");
  });
});
