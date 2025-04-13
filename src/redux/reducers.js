const initialAuthState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
};

export default function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case "ON_LOGIN":
      if (!action.payload || !action.payload.email) {
        console.log("Invalid login payload.");
        return state;
      }
      return {
        ...state,
        currentUser: action.payload,
      };
    case "ON_LOGOUT":
      return {
        ...state,
        currentUser: null,
        cart: [],
      };
    default:
      return state;
  }
}
