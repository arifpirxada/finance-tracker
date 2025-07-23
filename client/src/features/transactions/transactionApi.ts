import axios from "@/lib/axios";
import type { AxiosError } from "axios";
import type { AddTransactionInput } from "./transactionSchema";

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

export const addTransaction = async (values: AddTransactionInput) => {
  try {
    const tags = values?.tags
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const date =
      values.date === ""
        ? new Date().toISOString()
        : new Date(values.date!).toISOString();

    const body = {
      ...values,
      tags,
      date,
    };

    const response = await axios.post("/transactions", body);

    console.log(response);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ success: false; message: string }>;
    const message =
      error.response?.data?.message ||
      "Failed to add Transaction. Please try again.";

    throw new Error(message);
  }
};
