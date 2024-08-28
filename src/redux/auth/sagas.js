import { all, call, takeEvery, put, delay, select } from "redux-saga/effects";
import authActions from "./actions";
import commonActions from "../common/actions";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import Cookies from "js-cookie";
import setAuthToken from "../../utils/setAuthToken";

const authSagas = function* () {
    yield all([
        yield takeEvery(authActions.USER_SIGNUP, userSignup),
        yield takeEvery(authActions.USER_LOGIN, userLogin),
        yield takeEvery(authActions.GET_USERS, getUsers),
        yield takeEvery(authActions.HANDLE_USER_FILTER, handleUserFilter),
    ])
};

const userSignup = function* (data) {
    const { payload } = data;
    const { navigate } = payload;

    yield put({ type: commonActions.SET_BUTTON_LOADER, payload: true });
    try {
        const result = yield call(() =>
            axios.post(`${API_URL}/signup`, payload?.data)
        );
        yield put({ type: commonActions.SET_BUTTON_LOADER, payload: false });
        yield put({
            type: commonActions.SET_ALERT,
            payload: {
                status: (result?.data?.statusCode === 200) ? 'success' : 'failed',
                show: true,
                message: result?.data?.message
            }
        });
        if (result?.data?.statusCode === 200) {
            navigate(`/login`);
        };
        yield delay(2000);
        yield put({
            type: commonActions.SET_ALERT,
            payload: { status: null, show: false, message: null }
        });
    } catch (error) {
        console.log(error);
    }
    yield put({ type: commonActions.SET_BUTTON_LOADER, payload: false });
};

const userLogin = function* (data) {
    const { payload } = data;
    const { navigate } = payload;

    yield put({ type: commonActions.SET_BUTTON_LOADER, payload: true });
    try {
        const result = yield call(() =>
            axios.post(`${API_URL}/login`, payload?.data)
        );
        yield put({ type: commonActions.SET_BUTTON_LOADER, payload: false });
        yield put({
            type: commonActions.SET_ALERT,
            payload: {
                status: (result?.data?.statusCode === 200) ? 'success' : 'failed',
                show: true,
                message: result?.data?.message
            }
        });
        if (result?.data?.statusCode === 200) {
            Cookies.set('assessment_route', result?.data?.role);
            Cookies.set('assessment_token', result?.data?.token, { expires: 7 });
            setAuthToken(result?.data?.token);
            navigate(`/${result?.data?.role}/home`);
            window.location.reload();
        };
        yield delay(2000);
        yield put({
            type: commonActions.SET_ALERT,
            payload: { status: null, show: false, message: null }
        });
    } catch (error) {
        console.log(error);
    };
};

const getUsers = function* () {
    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user`)
        );
        if (result?.data?.statusCode === 200) {
            let finalRes = result?.data?.result?.map((val, i) => {
                return { ...val, id: i + 1 }
            })
            yield put({
                type: authActions.SET_USERS,
                payload: {
                    all: finalRes || [],
                    filtered: finalRes || []
                }
            });
        }
    } catch (err) {
        console.log(err);
    };
};

const handleUserFilter = function* () {
    try {
        const { filterValues, users } = yield select(state => state.authReducer);
        //eslint-disable-next-line
        const filteredList = users?.all?.filter(val => {
            if (filterValues?.role === 'All') {
                if (val?.firstname?.toLowerCase()?.includes(filterValues?.searchText?.toLowerCase()) ||
                    val?.lastname?.toLowerCase()?.includes(filterValues?.searchText?.toLowerCase()) ||
                    val?.emailid?.toLowerCase()?.includes(filterValues?.searchText?.toLowerCase()) ||
                    val?.mobileno?.toLowerCase()?.includes(filterValues?.searchText?.toLowerCase())
                ) {
                    return val
                }
            } else {
                if ((val?.firstname?.toLowerCase()?.includes(filterValues?.searchText?.toLowerCase()) ||
                    val?.lastname?.toLowerCase()?.includes(filterValues?.searchText?.toLowerCase()) ||
                    val?.emailid?.toLowerCase()?.includes(filterValues?.searchText?.toLowerCase()) ||
                    val?.mobileno?.toLowerCase()?.includes(filterValues?.searchText?.toLowerCase())) &&
                    val?.role === filterValues?.role
                ) {
                    return val
                }
            }
        });
        yield put({
            type: authActions.SET_USERS,
            payload: {
                ...users,
                filtered: filteredList || []
            }
        });
    } catch (err) {
        console.log(err);
    };
};

export default authSagas;