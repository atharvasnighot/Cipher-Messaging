import { BASE_API_URL } from "../../Config/api";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  REQ_USER,
  SEARCH_USER,
  UPDATE_USER,
} from "./ActionType";

export const register = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (resData.jwt) localStorage.setItem("token", resData.jwt);
    console.log("register ", resData);
    dispatch({ type: REGISTER, payload: resData });
  } catch (error) {
    console.log("catch error: ",error)
  }
}


export const login = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      // Handle non-2xx HTTP responses
      const errorData = await res.json();
      console.error("Login Error:", errorData);
      throw new Error("Authentication failed");
    }

    const resData = await res.json();
    console.log("login ", resData);

    if (resData.jwt) {
      localStorage.setItem("token", resData.jwt);
      dispatch({ type: LOGIN, payload: resData });
      return resData;
    } else {
      throw new Error("Authentication failed");
    }
  } catch (error) {
    console.error("catch error: ", error);

    // Handle network errors
    if (error instanceof TypeError && error.message.includes("NetworkError")) {
      console.error("Network Error:", error);
      throw new Error("Network error occurred");
    }

    throw error;
  }
};



export const currentUser = (token) => async (dispatch) => {
  console.log("current user: ", token);
  try {
    const res = await fetch(`${BASE_API_URL}/api/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resData = await res.json();
    console.log("current user ", resData);
    dispatch({ type: REQ_USER, payload: resData });
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const searchUser = (data) => async (dispatch) => {
  console.log("search data: ",data)
  try {
    const res = await fetch(
      `${BASE_API_URL}/api/users/search?name=${data.keyword}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    const resData = await res.json();
    console.log("search:  ", resData);
    dispatch({ type: SEARCH_USER, payload: resData });
  } catch (error) {
    console.log("catch error ", error);
  }
};
export const updateUser = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/users/update/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body:JSON.stringify(data.data)
    });
    const resData = await res.json();
    console.log("updateuser ", resData);
    dispatch({ type: UPDATE_USER, payload: resData });
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const logoutAction = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT, payload: null });
  dispatch({ type: REQ_USER, payload: null });
};
