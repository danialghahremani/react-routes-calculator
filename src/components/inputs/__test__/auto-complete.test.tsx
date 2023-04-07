import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ConfigProvider, Form } from "antd";

import "@mocks/dom";

import AutoComplete from "../auto-complete/auto-complete";

const renderInput = () => (
  <ConfigProvider>
    <Form name="autoCompleteInputForm">
      <AutoComplete
        label="Autocomplete Input"
        name="autoCompleteInput"
        rules={[
          {
            required: true,
            message: "Required field!",
          },
        ]}
      />
    </Form>
  </ConfigProvider>
);

describe("Autocomplete input", () => {
  beforeEach(() => render(renderInput()));
  it("Should change the value of input", async () => {
    const input = await screen.findByRole("combobox");
    fireEvent.change(input, { target: { value: "Paris" } });

    await waitFor(() => {
      expect(input).toHaveValue("Paris");
    });
  });

  it("Should render the skeleton when input changed", async () => {
    const input = await screen.findByRole("combobox");
    fireEvent.change(input, { target: { value: "Paris" } });

    const skeleton = await screen.findByRole("auto-complete-skeleton");
    await waitFor(() => {
      expect(skeleton).toBeInTheDocument();
    });
  });

  it("Should show error message when input is empty", async () => {
    const input = await screen.findByRole("combobox");

    fireEvent.change(input, { target: { value: "Paris" } });
    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      const alert = screen.getByText("Required field!");
      expect(alert).toBeInTheDocument();
    });
  });

  it("Should show error when search failed", async () => {
    const input = await screen.findByRole("combobox");

    fireEvent.change(input, { target: { value: "fail" } });

    await waitFor(() => {
      setTimeout(() => {
        const alert = screen.getByText(
          "Oops! Failed to search with this keyword"
        );
        expect(alert).toBeInTheDocument();
      }, 3000);
    });
  });
});
