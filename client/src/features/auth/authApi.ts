import axios from "@/lib/axios";
import { type LoginInput, type RegisterInput } from "./authSchema";
import { AxiosError } from "axios";

export const authenticateUser = async () => {
  try {
    const response = await axios.get("/users/me");
    const user = response.data.user;

    return user;
  } catch (err) {
    const error = err as AxiosError<{ success: false; message: string }>;
    const message =
      error.response?.data?.message ||
      "Authentication failed. Please try again.";

    throw new Error(message);
  }
};

export const registerUser = async (values: RegisterInput) => {
  try {
    const response = await axios.post("/users/register", values);

    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ success: false; message: string }>;

    const message =
      error.response?.data?.message || "Registration failed. Please try again.";

    throw new Error(message);
  }
};

export const loginUser = async (values: LoginInput) => {
  try {
    const response = await axios.post("/users/login", values);

    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ success: false; message: string }>;

    const message =
      error.response?.data?.message || "Login failed. Please try again.";

    throw new Error(message);
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post("/users/logout");

    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ success: false; message: string }>;

    const message =
      error.response?.data?.message || "Something went wrong while logging out";
    throw new Error(message);
  }
};
