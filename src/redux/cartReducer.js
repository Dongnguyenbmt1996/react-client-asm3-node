const initialState = {
  id_user: JSON.parse(localStorage.getItem("currentUser"))?.id || null,
  listCart: JSON.parse(localStorage.getItem("cart")) || [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER": {
      const { id_user } = action.payload;
      localStorage.setItem("currentUser", JSON.stringify({ id: id_user }));
      return { ...state, id_user };
    }

    case "ADD_CART": {
      const { product, quantity } = action.payload;
      const existingItem = state.listCart.find(
        (item) => item.product._id.$oid === product._id.$oid
      );

      let updatedCart;
      if (existingItem) {
        updatedCart = state.listCart.map((item) =>
          item.product._id.$oid === product._id.$oid
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...state.listCart, { product, quantity }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, listCart: updatedCart };
    }

    case "UPDATE_CART": {
      const { productId, quantity } = action.payload;
      const updatedCart = state.listCart.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, listCart: updatedCart };
    }

    case "DELETE_CART": {
      //const { productId } = action.payload;
      const updatedCart = state.listCart.filter(
        (item) => item.product._id !== action.payload
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, listCart: updatedCart };
    }

    case "LOGOUT_USER": {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("cart");
      return { id_user: null, listCart: [] };
    }

    default:
      return state;
  }
}
