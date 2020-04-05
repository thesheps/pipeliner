import {
  showError,
  showSuccess,
  hideError,
  hideSuccess,
  setShowRegisterModal,
  setShowSignInModal,
} from "../actions";
import {
  SHOW_ERROR,
  HIDE_ERROR,
  SET_SHOW_REGISTER_MODAL,
  SHOW_SUCCESS,
  HIDE_SUCCESS,
  SET_SHOW_SIGN_IN_MODAL,
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

  it("creates SHOW_SUCCESS action", () => {
    const successMessage = "YAY!!";
    const action = showSuccess(successMessage);

    expect(action).toEqual({
      type: SHOW_SUCCESS,
      successMessage,
    });
  });

  it("creates HIDE_SUCCESS action", () => {
    const action = hideSuccess();
    expect(action).toEqual({ type: HIDE_SUCCESS });
  });

  it("creates SHOW_REGISTER_MODAL action", () => {
    const action = setShowRegisterModal(true);
    expect(action).toEqual({ type: SET_SHOW_REGISTER_MODAL, show: true });
  });

  it("creates HIDE_REGISTER_MODAL action", () => {
    const action = setShowRegisterModal(false);
    expect(action).toEqual({ type: SET_SHOW_REGISTER_MODAL, show: false });
  });

  it("creates SHOW_SIGN_IN_MODAL action", () => {
    const action = setShowSignInModal(true);
    expect(action).toEqual({ type: SET_SHOW_SIGN_IN_MODAL, show: true });
  });

  it("creates HIDE_SIGN_IN_MODAL action", () => {
    const action = setShowSignInModal(false);
    expect(action).toEqual({ type: SET_SHOW_SIGN_IN_MODAL, show: false });
  });
});
