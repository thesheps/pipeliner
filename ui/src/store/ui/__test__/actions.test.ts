import {
  showError,
  hideError,
  showRegisterModal,
  hideRegisterModal,
} from "../actions";
import {
  SHOW_ERROR,
  HIDE_ERROR,
  SHOW_REGISTER_MODAL,
  HIDE_REGISTER_MODAL,
} from "../types";

describe("UI actions", () => {
  it("creates SHOW_ERROR action", () => {
    const errorMessage = "Whoops!!";
    const action = showError(errorMessage);

    expect(action).toEqual({
      type: SHOW_ERROR,
      errorMessage,
    });
  });

  it("creates HIDE_ERROR action", () => {
    const action = hideError();
    expect(action).toEqual({ type: HIDE_ERROR });
  });

  it("creates SHOW_REGISTER_MODAL action", () => {
    const action = showRegisterModal();
    expect(action).toEqual({ type: SHOW_REGISTER_MODAL });
  });

  it("creates HIDE_REGISTER_MODAL action", () => {
    const action = hideRegisterModal();
    expect(action).toEqual({ type: HIDE_REGISTER_MODAL });
  });
});
