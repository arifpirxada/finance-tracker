import axios from "@/lib/axios";
import type { AxiosError } from "axios";

export const getTransactions = async () => {
  try {
    const response = await axios.get("/transactions");

    return response?.data?.data;
  } catch (err) {
    const error = err as AxiosError<{ success: false; message: string }>;
    const message =
      error.response?.data?.message ||
      "Failed to display Transactions. Please try again.";

    throw new Error(message);
  }
};

// const addTransaction = async () => {
//   try {
//     const response = await axios.post("/transactions")
//   } catch (err) {
//     const error = err as AxiosError<{ success: false; message: string }>;
//     const message =
//       error.response?.data?.message ||
//       "Failed to add Transaction. Please try again.";

//     throw new Error(message);
//   }
// };
