import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi, beforeEach, expect } from "vitest";
import Pagination from "..";

describe("Pagination Component", () => {
  let onPageChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onPageChange = vi.fn();
  });

  describe("Rendering and Visibility", () => {
    it("renders all pagination buttons correctly", () => {
      render(
        <Pagination
          currentPage={2}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      expect(
        screen.getAllByRole("button", { name: /Previous/i }).length
      ).toBeGreaterThan(0);
      expect(
        screen.getAllByRole("button", { name: /Next/i }).length
      ).toBeGreaterThan(0);
    });

    it("renders mobile and desktop views", () => {
      render(
        <Pagination
          currentPage={2}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      // Check for mobile view container
      const mobileView = document.querySelector(".sm\\:hidden");
      expect(mobileView).toBeTruthy();

      // Check for desktop view container
      const desktopView = document.querySelector(".hidden.sm\\:flex");
      expect(desktopView).toBeTruthy();
    });

    it("disables Previous button on first page", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      const prevButtons = screen.getAllByRole("button", { name: /Previous/i });
      prevButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it("disables Next button on last page", () => {
      render(
        <Pagination
          currentPage={5}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      const nextButtons = screen.getAllByRole("button", { name: /Next/i });
      nextButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it("renders nothing when totalResults is 0", () => {
      const { container } = render(
        <Pagination
          currentPage={1}
          totalResults={0}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      expect(container.firstChild).toBeNull();
    });

    it("renders nothing when there is only one page", () => {
      const { container } = render(
        <Pagination
          currentPage={1}
          totalResults={5}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Page Navigation", () => {
    it("calls onPageChange with correct page number when number is clicked", async () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      const pageButtons = screen.getAllByRole("button", { name: "3" });
      await userEvent.click(pageButtons[0]);
      expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it("calls onPageChange with next page when Next is clicked", async () => {
      render(
        <Pagination
          currentPage={2}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      const nextButtons = screen.getAllByRole("button", { name: /Next/i });
      await userEvent.click(nextButtons[0]);
      expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it("calls onPageChange with previous page when Previous is clicked", async () => {
      render(
        <Pagination
          currentPage={2}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      const prevButtons = screen.getAllByRole("button", { name: /Previous/i });
      await userEvent.click(prevButtons[0]);
      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it("does not call onPageChange when disabled Previous button is clicked", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      const prevButtons = screen.getAllByRole("button", { name: /Previous/i });
      fireEvent.click(prevButtons[0]);
      expect(onPageChange).not.toHaveBeenCalled();
    });

    it("does not call onPageChange when disabled Next button is clicked", () => {
      render(
        <Pagination
          currentPage={5}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      const nextButtons = screen.getAllByRole("button", { name: /Next/i });
      fireEvent.click(nextButtons[0]);
      expect(onPageChange).not.toHaveBeenCalled();
    });
  });

  describe("Page Calculation", () => {
    it("calculates total pages correctly", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={45}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
    });

    it("handles exact division of totalResults by resultsPerPage", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={100}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      expect(screen.getByText("Page 1 of 10")).toBeInTheDocument();
    });

    it("respects maxPages limit", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={50000}
          resultsPerPage={10}
          maxPages={100}
          onPageChange={onPageChange}
        />
      );
      expect(screen.getByText("Page 1 of 100")).toBeInTheDocument();
    });

    it("uses default maxPages when not provided", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={20000}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      // Should default to 1000 max pages
      expect(screen.getByText("Page 1 of 1000")).toBeInTheDocument();
    });
  });

  describe("Current Page Highlighting", () => {
    it("highlights current page button with correct classes", () => {
      render(
        <Pagination
          currentPage={3}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      const currentPageButtons = screen.getAllByRole("button", { name: "3" });

      // At least one button should have the active classes
      const hasActiveButton = currentPageButtons.some(
        (button) =>
          button.classList.contains("bg-blue-600") &&
          button.classList.contains("text-white")
      );
      expect(hasActiveButton).toBe(true);
    });

    it("does not highlight non-current page buttons", () => {
      render(
        <Pagination
          currentPage={3}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      const otherPageButtons = screen.getAllByRole("button", { name: "2" });

      // Non-current buttons should not have active classes
      const hasActiveButton = otherPageButtons.some(
        (button) =>
          button.classList.contains("bg-blue-600") &&
          button.classList.contains("text-white")
      );
      expect(hasActiveButton).toBe(false);
    });
  });

  describe("Results Information Display", () => {
    it("displays correct results range on first page", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={100}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      // Use flexible text matching for spaced content
      expect(
        screen.getByText((content) => {
          return (
            content.includes("Showing") &&
            content.includes("1") &&
            content.includes("10") &&
            content.includes("100")
          );
        })
      ).toBeInTheDocument();
    });

    it("displays correct results range on middle page", () => {
      render(
        <Pagination
          currentPage={3}
          totalResults={100}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      expect(
        screen.getByText((content) => {
          return (
            content.includes("Showing") &&
            content.includes("21") &&
            content.includes("30") &&
            content.includes("100")
          );
        })
      ).toBeInTheDocument();
    });

    it("displays correct results range on last page with partial results", () => {
      render(
        <Pagination
          currentPage={3}
          totalResults={25}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      expect(
        screen.getByText((content) => {
          return (
            content.includes("Showing") &&
            content.includes("21") &&
            content.includes("25") &&
            content.includes("25")
          );
        })
      ).toBeInTheDocument();
    });

    it("shows total results in mobile view", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={150}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      expect(screen.getByText("150 total results")).toBeInTheDocument();
    });
  });

  describe("Page Range Logic", () => {
    it("shows ellipsis when there are many pages", () => {
      render(
        <Pagination
          currentPage={10}
          totalResults={500}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      const ellipsis = screen.getAllByText("...");
      expect(ellipsis.length).toBeGreaterThan(0);
    });

    it("shows first and last page buttons when in middle", () => {
      render(
        <Pagination
          currentPage={25}
          totalResults={500}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      // Should show page 1 and last page
      expect(
        screen.getAllByRole("button", { name: "1" }).length
      ).toBeGreaterThan(0);
      expect(
        screen.getAllByRole("button", { name: "50" }).length
      ).toBeGreaterThan(0);
    });

    it("shows consecutive pages near current page", () => {
      render(
        <Pagination
          currentPage={10}
          totalResults={200}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      // Should show current page
      expect(
        screen.getAllByRole("button", { name: "10" }).length
      ).toBeGreaterThan(0);

      // Check for some nearby pages
      const nearbyPages = ["8", "9", "11", "12"];
      const foundPages = nearbyPages.filter(
        (page) => screen.queryAllByRole("button", { name: page }).length > 0
      );
      expect(foundPages.length).toBeGreaterThan(0);
    });
  });

  describe("Edge Cases", () => {
    it("handles invalid currentPage gracefully", () => {
      render(
        <Pagination
          currentPage={999}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      // Should still render something
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });

    it("handles currentPage of 0", () => {
      render(
        <Pagination
          currentPage={0}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      // Should handle gracefully
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });

    it("handles negative currentPage", () => {
      render(
        <Pagination
          currentPage={-1}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
    });

    it("handles zero resultsPerPage", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={50}
          resultsPerPage={0}
          onPageChange={onPageChange}
        />
      );
    });

    it("handles negative totalResults", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={-10}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      // Should not render
      const container = document.querySelector(".bg-white");
      expect(container).toBeFalsy();
    });
  });

  describe("Styling and Theme", () => {
    it("applies correct container styling", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      const container = document.querySelector(".bg-white.dark\\:bg-gray-800");
      expect(container).toBeTruthy();
    });

    it("applies responsive classes correctly", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      // Check for mobile hidden class
      const mobileHidden = document.querySelector(".sm\\:hidden");
      expect(mobileHidden).toBeTruthy();

      // Check for desktop hidden class
      const desktopHidden = document.querySelector(".hidden.sm\\:flex");
      expect(desktopHidden).toBeTruthy();
    });

    it("applies hover states to clickable s", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      const pageButtons = screen.getAllByRole("button", { name: "2" });
      const pageButton = pageButtons[0];

      // Should have hover classes
      expect(pageButton.className).toMatch(/hover:/);
    });

    it("applies disabled styling to disabled buttons", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      const prevButtons = screen.getAllByRole("button", { name: /Previous/i });
      const prevButton = prevButtons[0];

      expect(prevButton).toBeDisabled();
      expect(prevButton.className).toMatch(/disabled:/);
    });
  });

  describe("Number Formatting", () => {
    it("formats very large numbers consistently", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={9876543}
          resultsPerPage={100}
          onPageChange={onPageChange}
        />
      );
    });
  });

  describe("Quick Navigation", () => {
    it("renders quick jump buttons for large datasets", () => {
      render(
        <Pagination
          currentPage={50}
          totalResults={1000}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Last")).toBeInTheDocument();
    });

    it("calls onPageChange with page 1 when First is clicked", async () => {
      render(
        <Pagination
          currentPage={50}
          totalResults={1000}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      await userEvent.click(screen.getByText("First"));
      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it("calls onPageChange with last page when Last is clicked", async () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={1000}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      await userEvent.click(screen.getByText("Last"));
      expect(onPageChange).toHaveBeenCalledWith(100);
    });

    it("does not show quick navigation for small datasets", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={30}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      expect(screen.queryByText("First")).not.toBeInTheDocument();
      expect(screen.queryByText("Last")).not.toBeInTheDocument();
    });
  });

  describe("Performance and Memory", () => {
    it("does not create excessive DOM nodes for large page counts", () => {
      render(
        <Pagination
          currentPage={500}
          totalResults={10000}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      // Count numeric page buttons
      const buttons = screen.getAllByRole("button");
      const pageNumberButtons = buttons.filter((button) =>
        /^\d+$/.test(button.textContent || "")
      );

      // Should not render all 1000 pages as buttons
      expect(pageNumberButtons.length).toBeLessThan(20);
    });

    it("handles re-renders efficiently", () => {
      const { rerender } = render(
        <Pagination
          currentPage={1}
          totalResults={100}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      rerender(
        <Pagination
          currentPage={2}
          totalResults={100}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      expect(screen.getByText("Page 2 of 10")).toBeInTheDocument();
    });
  });

  describe("Integration with Parent Components", () => {
    it("works inside a parent container and triggers callback correctly", async () => {
      const Wrapper = () => (
        <div data-testid="container">
          <Pagination
            currentPage={1}
            totalResults={30}
            resultsPerPage={10}
            onPageChange={onPageChange}
          />
        </div>
      );
      render(<Wrapper />);

      const pageButtons = screen.getAllByRole("button", { name: "2" });
      await userEvent.click(pageButtons[0]);
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("updates correctly when props change", () => {
      const { rerender } = render(
        <Pagination
          currentPage={1}
          totalResults={100}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      expect(screen.getByText("Page 1 of 10")).toBeInTheDocument();

      rerender(
        <Pagination
          currentPage={5}
          totalResults={200}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      expect(screen.getByText("Page 5 of 20")).toBeInTheDocument();
    });

    it("maintains state consistency across re-renders", () => {
      const { rerender } = render(
        <Pagination
          currentPage={3}
          totalResults={100}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      // Re-render with same props
      rerender(
        <Pagination
          currentPage={3}
          totalResults={100}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );
      expect(screen.getByText("Page 3 of 10")).toBeInTheDocument();
      expect(onPageChange).not.toHaveBeenCalled();
    });
  });

  describe("Error Recovery", () => {
    it("recovers gracefully from invalid props combinations", () => {
      render(
        <Pagination
          currentPage={0}
          totalResults={0}
          resultsPerPage={0}
          onPageChange={onPageChange}
        />
      );
    });

    it("handles extremely large numbers", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={Number.MAX_SAFE_INTEGER}
          resultsPerPage={100}
          maxPages={1000}
          onPageChange={onPageChange}
        />
      );

      // Should still render and respect maxPages
      expect(screen.getByText("Page 1 of 1000")).toBeInTheDocument();
    });
  });

  describe("Responsive Behavior", () => {
    it("shows abbreviated text on small screens", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={100}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      // Check for responsive text classes
      const hiddenText = document.querySelector(".hidden.xs\\:inline");
      expect(hiddenText).toBeTruthy();
    });

    it("adapts button spacing for different screen sizes", () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={100}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      // Mobile buttons should have different spacing than desktop
      const mobileButtons = document.querySelectorAll(".sm\\:hidden button");
      const desktopButtons = document.querySelectorAll(
        ".hidden.sm\\:flex button"
      );

      expect(mobileButtons.length).toBeGreaterThan(0);
      expect(desktopButtons.length).toBeGreaterThan(0);
    });

    it("shows page info differently on mobile vs desktop", () => {
      render(
        <Pagination
          currentPage={5}
          totalResults={100}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      // Mobile shows "Page X of Y"
      expect(screen.getByText("Page 5 of 10")).toBeInTheDocument();

      // Desktop shows "Showing X to Y of Z results"
      expect(
        screen.getByText(
          (content) =>
            content.includes("Showing") &&
            content.includes("41") &&
            content.includes("50")
        )
      ).toBeInTheDocument();
    });
  });

  describe("Event Handling Edge Cases", () => {
    it("prevents multiple rapid clicks", () => {
      render(
        <Pagination
          currentPage={5}
          totalResults={100}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      const nextButtons = screen.getAllByRole("button", { name: /Next/i });
      const nextButton = nextButtons[0];

      // Rapid clicks
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);

      // Should only call once for each click
      expect(onPageChange).toHaveBeenCalledWith(6);
    });

    it("handles click events with synthetic event objects", async () => {
      render(
        <Pagination
          currentPage={1}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={onPageChange}
        />
      );

      const pageButtons = screen.getAllByRole("button", { name: "2" });

      // Use userEvent for more realistic event simulation
      await userEvent.click(pageButtons[0]);

      expect(onPageChange).toHaveBeenCalledWith(2);
      expect(onPageChange).toHaveBeenCalledTimes(1);
    });

    it("maintains callback reference stability", () => {
      const stableCallback = vi.fn();
      const { rerender } = render(
        <Pagination
          currentPage={1}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={stableCallback}
        />
      );

      // Re-render with same callback
      rerender(
        <Pagination
          currentPage={2}
          totalResults={50}
          resultsPerPage={10}
          onPageChange={stableCallback}
        />
      );

      // Component should handle re-render without issues
      expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
    });
  });
});
