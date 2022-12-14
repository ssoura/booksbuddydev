export function reducer(state, { type, payload }) {
  switch (type) {
    case "FILTER":
      let newFilterProperty = state.filterBy[payload.property];
      if (state.filterBy[payload.property].includes(payload.selection)) {
        newFilterProperty = newFilterProperty.filter(
          (item) => item !== payload.selection
        );
      } else {
        newFilterProperty = newFilterProperty.concat(payload.selection);
      }
      return {
        ...state,
        filterBy: {
          ...state.filterBy,
          [payload.property]: newFilterProperty,
        },
      };
    case "SAVE PREVIOUS FILTER":
      return {
        ...state,
        previousFilterBy: { ...state.filterBy },
      };
    case "RESTORE PREVIOUS FILTER":
      return {
        ...state,
        filterBy: {
          ...state.previousFilterBy,
        },
      };
    case "CLEAR FILTER":
      return {
        ...state,
        filterBy: {
          genres: [],
          author: [],
        },
      };
    case "SORT":
      return { ...state, sortBy: payload };
    case "ADD TO WISHLIST":
      if (state.wishList.includes(payload)) {
        return state;
      } else {
        return { ...state, wishList: [...state.wishList, payload] };
      }
    case "REMOVE FROM WISHLIST":
      return {
        ...state,
        wishList: state.wishList.filter((item) => item._id !== payload._id),
      };
    case "ADD TO CART":
      return {
        ...state,
        wishList: state.wishList.filter((item) => item._id !== payload._id),
        cart: [...state.cart, payload],
      };
    case "REMOVE FROM CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== payload._id),
      };
    case "MOVE TO WISHLIST":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== payload._id),
        wishList: [...state.wishList, payload],
      };
    case "LOAD PRODUCTS":
      return {
        ...state,
        productsList: [...payload],
      };
    case "SAVE SESSION":
      localStorage.setItem(
        "session",
        JSON.stringify({
          userId: payload.userId,
          jwt: payload.jwt,
        })
      );
      return { ...state, userId: payload.userId };
    case "RESUME SESSION":
      return { ...state, userId: payload };
    case "END SESSION":
      localStorage.setItem(
        "session",
        JSON.stringify({ userId: null, jwt: null })
      );
      return {
        ...state,
        userId: null,
        cart: [],
        wishList: [],
      };
    case "LOAD USER DATA":
      console.log("a", payload);
      return {
        ...state,
        cart: [...state.cart, ...payload.cart],
        wishList: [...state.wishList, ...payload.wishList],
      };
    case "CLEAR CART":
      return {
        ...state,
        cart: [],
      };
    case "SET USER": {
      return { ...state, user: payload };
    }
    default:
      return state;
  }
}

export const initialState = {
  filterBy: {
    genres: [],
    author: [],
  },
  previousFilterBy: {},
  sortBy: "BEST SELLING",
  wishList: [],
  cart: [],
  productsList: [],
  userId: null,
  user: {},
};
