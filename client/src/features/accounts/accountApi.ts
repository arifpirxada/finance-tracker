import type { AxiosError } from "axios";
import axios from "@/lib/axios";
import type { AddAccountInput } from "./accountSchema";

export const addAccount = async (values: AddAccountInput) => {
  try {
    const response = await axios.post("/users/bank-accounts", values);

    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ success: false; message: string }>;

    const message =
      error.response?.data?.message || "Failed to add account. Please try again.";

    throw new Error(message);
  }
};
