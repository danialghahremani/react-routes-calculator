import { render, screen, fireEvent } from "@testing-library/react";
import { ConfigProvider } from "antd";

import "@mocks/router.mock";
import "@mocks/dom";

import SearchForm from "../search-form";

const renderSearchForm = () => (
  <ConfigProvider>
    <SearchForm />
  </ConfigProvider>
);

describe("Search form", () => {
  it("Should render city of origin input correctly!", async () => {
    render(renderSearchForm());
    const cityOfOriginInput = screen.getByLabelText("City of origin");
    expect(cityOfOriginInput).toBeInTheDocument();
  });

  it("Should change the value of city of origin input", async () => {
    render(renderSearchForm());
    const cityOfOriginInput = screen.getByLabelText("City of origin");

    fireEvent.change(cityOfOriginInput, { target: { value: "Paris" } });
    expect(cityOfOriginInput).toHaveValue("Paris");
  });
});
