import { createSlice } from "@reduxjs/toolkit";
import isEmpty from "../utils/is-empty";
import { STATUSES } from "../utils";
import UserData from "../db/json";

// initialState defined
const initialState = {
  isAuthenticated: sessionStorage.getItem("userInfo") ? true : false,
  user: sessionStorage.getItem("userInfo")
    ? sessionStorage.getItem("userInfo")
    : null,
  status: STATUSES.IDLE,
  errors: null,
  isError: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.errors = action.payload.message;
      state.isError = action.payload.isError;
    },
    setCurrentUser: (state, action) => {
      state.isAuthenticated = !isEmpty(action.payload);
      state.user = action.payload;
    },
    resetAuth: () => initialState,
  },
});

export const { setCurrentUser, setStatus, setError, resetAuth } =
  authSlice.actions;

export default authSlice.reducer;

//login perform
export const LoginUser = (data) => (dispatch) => {
  dispatch(setStatus(STATUSES.LOADING));
  if (!isEmpty(data)) {
    const { email, password } = data;
    const isUserExist = UserData?.filter((user) => user.email === email);
    if (isUserExist?.length > 0 && isUserExist?.[0]?.password === password) {
      // SET USER TO SESSIONSTORAGE
      sessionStorage.setItem("userInfo", JSON.stringify(data));
      // SET CURRENT USER
      dispatch(setCurrentUser(data));
    } else if (
      isUserExist?.length > 0 &&
      isUserExist?.[0]?.password !== password
    ) {
      // throw error user password does not match
      dispatch(
        setError({
          isError: true,
          message: "User Credentials does not matched.",
        })
      );
    } else {
      // throw error user not exist
      dispatch(setError({ isError: true, message: "User not found." }));
    }
  }
  dispatch(setStatus(STATUSES.IDLE));
};

// logout user perform
export const LogoutUser = () => (dispatch) => {
  // REMOVE USER FROM SessionStorage
  sessionStorage.removeItem("userInfo");
  // SET CURRENT USER TO NULL AND ISAUTHENTICATED IS FALSE
  dispatch(setCurrentUser(null));
};
