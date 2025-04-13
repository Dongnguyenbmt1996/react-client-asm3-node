export const SHOW_POPUP = "SHOW_POPUP";
export const HIDE_POPUP = "HIDE_POPUP";
export const ON_LOGIN = "ON_LOGIN";
export const ON_LOGOUT = "ON_LOGOUT";
export const ADD_CART = "ADD_CART";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_CART = "DELETE_CART";
export const LOAD_CART = "LOAD_CART";

export const showPopup = (productData) => ({
  type: SHOW_POPUP,
  payload: productData,
});

export const hidePopup = () => ({
  type: HIDE_POPUP,
});

export const addCart = (product, quantity) => ({
  type: ADD_CART,
  payload: { product, quantity },
});

export const updateCart = (productId, quantity) => ({
  type: UPDATE_CART,
  payload: { productId, quantity },
});

export const deleteCart = (productId) => ({
  type: DELETE_CART,
  payload: { productId },
});

export const loadCart = (currentUser) => ({
  type: LOAD_CART,
  payload: { currentUser },
});

export const setUser = (id_user) => ({
  type: "SET_USER",
  payload: { id_user },
});
