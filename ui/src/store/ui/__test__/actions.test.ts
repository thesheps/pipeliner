import { showError, hideError, setShowRegisterModal } from "../actions";
import { SHOW_ERROR, HIDE_ERROR, SET_SHOW_REGISTER_MODAL } from "../types";

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
    const action = setShowRegisterModal(true);
    expect(action).toEqual({ type: SET_SHOW_REGISTER_MODAL, show: true });
  });

  it("creates HIDE_REGISTER_MODAL action", () => {
    const action = setShowRegisterModal(false);
    expect(action).toEqual({ type: SET_SHOW_REGISTER_MODAL, show: false });
  });
});
