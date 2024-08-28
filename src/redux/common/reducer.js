import commonActions from "./actions";

const initialState = {
  buttonLoader: false,
  pageLoader: false,
  alert: { status: null, show: false, message: null },
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case commonActions.SET_BUTTON_LOADER:
      return {
        ...state,
        buttonLoader: action.payload,
      };
    case commonActions.SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case commonActions.SET_PAGE_LOADER:
      return {
        ...state,
        pageLoader: action.payload,
      };
    default:
      return state;
  }
};

export default commonReducer;
