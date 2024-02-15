import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ModalDialog from "../src/components/ModalDialog/ModalDialog.jsx";

// ModalDialog = ({
//     show, boolean
//     type, (success, error, confirmation, loading)
//     message, string
//     handleYesClick, for type: confirmation
//     handleNoClick, for type: confirmation
//   })

describe("Modal Dialog Component", () => {
  let show = true;
  const message = "Test message";
  let type = "success";

  describe("Basic rendering", () => {
    it("Renders properly when show=true", () => {
      render(<ModalDialog show={show} message={message} type={type} />);
    });

    it("When show = false the element does not render", () => {
      show = false;
      render(<ModalDialog show={show} message={message} type={type} />);
      const nothing = screen.queryByText("Test message");
      expect(nothing).toBeNull();
    });
  });

  describe("Success dialog: ", () => {
    it("Does not display buttons", () => {
      show = true;
      render(<ModalDialog show={show} message={message} type={type} />);
      const buttons = screen.queryAllByRole("button");
      expect(buttons.length).toBe(0);
    });

    it("Displays a message and a success icon", () => {
      show = true;
      render(<ModalDialog show={show} message={message} type={type} />);
      const headings = screen.getAllByRole("heading", { hidden: true });
      expect(headings.length).toBe(2);
    });
  });

  describe("Error Dialog", () => {
    it("Displays a message and an error icon", () => {
      show = true;
      type = "error";
      render(<ModalDialog show={show} message={message} type={type} />);
      const headings = screen.getAllByRole("heading", { hidden: true });
      expect(headings.length).toBe(2);
    });

    it("Does not display buttons", () => {
      show = true;
      type = "error";
      render(<ModalDialog show={show} message={message} type={type} />);
      const buttons = screen.queryAllByRole("button");
      expect(buttons.length).toBe(0);
    });
  });

  describe("Loading Dialog", () => {
    it("Displays a message and an error icon", () => {
      show = true;
      type = "loading";
      render(<ModalDialog show={show} message={message} type={type} />);
      const headings = screen.getAllByRole("heading", { hidden: true });
      expect(headings.length).toBe(2);
    });

    it("Does not display buttons", () => {
      show = true;
      type = "loading";
      render(<ModalDialog show={show} message={message} type={type} />);
      const buttons = screen.queryAllByRole("button");
      expect(buttons.length).toBe(0);
    });
  });
  describe("Confirmation Dialog", () => {
    it("Displays a message", () => {
      show = true;
      type = "confirmation";
      render(<ModalDialog show={show} message={message} type={type} />);
      expect(screen.queryByText("Test message")).toBeInTheDocument();
    });

    it("Displays two buttons, when clicked each button executes a function", () => {
      show = true;
      type = "confirmation";
      const handleYesClick = vi.fn();
      const handleNoClick = vi.fn();
      render(
        <ModalDialog
          show={show}
          message={message}
          type={type}
          handleNoClick={handleNoClick}
          handleYesClick={handleYesClick}
        />
      );
      const buttons = screen.queryAllByRole("button");
      expect(buttons.length).toBe(2);
      fireEvent.click(screen.getByText("Yes"));
      expect(handleYesClick).toHaveBeenCalledTimes(1);
      fireEvent.click(screen.getByText("No"));
      expect(handleNoClick).toHaveBeenCalledTimes(1);
    });
  });
});
