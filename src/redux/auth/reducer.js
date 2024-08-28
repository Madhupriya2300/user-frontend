import authActions from "./actions";

const initialState = {
    users: {
        all: [],
        filtered: []
    },
    filterValues: {
        searchText: "",
        role: "All"
    }
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case authActions.SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case authActions.SET_FILTER_VALUES:
            return {
                ...state,
                filterValues: action.payload
            }

        default:
            return state
    };
};

export default authReducer;