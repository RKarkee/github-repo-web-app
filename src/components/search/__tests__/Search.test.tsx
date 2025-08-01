import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "../SearchForm";

describe("SearchForm Component", () => {
  let onSearch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onSearch = vi.fn();
  });

  it("renders all form elements correctly", () => {
    render(<SearchForm onSearch={onSearch} />);

    expect(
      screen.getByRole("heading", { name: /search/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/search or jump to/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
    expect(screen.getByText(/results per page/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /search repositories/i })
    ).toBeInTheDocument();
  });

  it("updates query input when user types", async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/search or jump to/i);
    await user.type(input, "react typescript");

    expect(input).toHaveValue("react typescript");
  });

  it("calls onSearch with correct parameters when form is submitted", async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/search or jump to/i);
    const submitButton = screen.getByRole("button", {
      name: /search repositories/i,
    });

    await user.type(input, "react hooks");
    await user.click(submitButton);

    expect(onSearch).toHaveBeenCalledWith({
      query: "react hooks",
      sort: "stars", // default value
      order: "desc",
      per_page: 25, // corrected default value
      page: 1,
    });
  });

  it("trims whitespace from query before submitting", async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/search or jump to/i);
    const submitButton = screen.getByRole("button", {
      name: /search repositories/i,
    });

    await user.type(input, "  react  ");
    await user.click(submitButton);

    expect(onSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        query: "react",
      })
    );
  });

  it("does not submit when query is empty or only whitespace", async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={onSearch} />);

    const submitButton = screen.getByRole("button", {
      name: /search repositories/i,
    });

    // Try to submit with empty query
    await user.click(submitButton);
    expect(onSearch).not.toHaveBeenCalled();

    // Try to submit with only whitespace
    const input = screen.getByPlaceholderText(/search or jump to/i);
    await user.type(input, "   ");
    await user.click(submitButton);
    expect(onSearch).not.toHaveBeenCalled();
  });

  it("updates sort option and submits with new sort value", async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/search or jump to/i);
    // Use getByDisplayValue to find the select element
    const sortSelect = screen.getByDisplayValue("Stars");
    const submitButton = screen.getByRole("button", {
      name: /search repositories/i,
    });

    await user.type(input, "vue");
    await user.selectOptions(sortSelect, "forks");
    await user.click(submitButton);

    expect(onSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        query: "vue",
        sort: "forks",
      })
    );
  });

  it("updates results per page option and submits with new value", async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/search or jump to/i);
    // Use getByDisplayValue to find the select element
    const perPageSelect = screen.getByDisplayValue("25");
    const submitButton = screen.getByRole("button", {
      name: /search repositories/i,
    });

    await user.type(input, "angular");
    await user.selectOptions(perPageSelect, "50");
    await user.click(submitButton);

    expect(onSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        query: "angular",
        per_page: 50,
      })
    );
  });

  it("disables all form elements when loading", () => {
    render(<SearchForm onSearch={onSearch} isLoading={true} />);

    expect(screen.getByPlaceholderText(/search or jump to/i)).toBeDisabled();
    // Use getByDisplayValue for select elements
    expect(screen.getByDisplayValue("Stars")).toBeDisabled();
    expect(screen.getByDisplayValue("25")).toBeDisabled();
    expect(screen.getByRole("button", { name: /searching/i })).toBeDisabled();
  });

  it("shows loading text on submit button when loading", () => {
    render(<SearchForm onSearch={onSearch} isLoading={true} />);

    expect(
      screen.getByRole("button", { name: /searching/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /search repositories/i })
    ).not.toBeInTheDocument();
  });

  it("submits form on Enter key press in input field", async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/search or jump to/i);

    await user.type(input, "nextjs");
    await user.keyboard("{Enter}");

    expect(onSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        query: "nextjs",
      })
    );
  });
});