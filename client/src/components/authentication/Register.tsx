import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/features/auth/authSchema";
import { authenticateUser, registerUser } from "@/features/auth/authApi";
import { useNavigate } from 'react-router-dom';

import pcImg from '@/assets/imgs/girl-with-pc.jpg'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Loader2Icon } from "lucide-react";
import { login } from "@/features/auth/authSlice";

const supportedCurrencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'SEK', name: 'Swedish Krona' },
  { code: 'NZD', name: 'New Zealand Dollar' },
  { code: 'SGD', name: 'Singapore Dollar' },
  { code: 'HKD', name: 'Hong Kong Dollar' },
  { code: 'ZAR', name: 'South African Rand' },
  { code: 'AED', name: 'UAE Dirham' },
];

export default function Register() {

  // Redirect user if logged in
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [customError, setCustomError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      currency: "INR",
      accountName: "",
      accountType: "Bank account",
      accountBalance: 0
    },
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: RegisterInput) => {
    try {
      setLoading(true);
      const data = await registerUser(values);

      if (!data?.success) {
        setCustomError(data.message || "Something went wrong! Please try later")
        return;
      }

      setCustomError("");
      setSuccessMessage(data.message || "Registration successful");

      const user = await authenticateUser();
      dispatch(login(user));

      setLoading(false);
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      setCustomError(error.message || "Something went wrong! Please try later");
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="gradient-bg p-8 min-h-screen flex flex-wrap gap-8 md:gap-8 lg:gap-16 justify-center items-center">
      <div className="w-full lg:w-1/4 md:w-10/12">
        <h1 className="text-3xl mb-8">Register - Finance Tracker</h1>
        <Form { ...form }>
          <form onSubmit={ form.handleSubmit(handleSubmit) } className="space-y-6">

            <FormField
              control={ form.control }
              name="name"
              render={ ({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" { ...field } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <FormField
              control={ form.control }
              name="email"
              render={ ({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" { ...field } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <FormField
              control={ form.control }
              name="password"
              render={ ({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Your password" { ...field } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <p className="text-sm font-medium">Create Account</p>
            <div className="flex gap-4 flex-wrap">
              <div className="w-2/5">
                <FormField
                  control={ form.control }
                  name="accountName"
                  render={ ({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Account Name" { ...field } />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  ) }
                />
              </div>


              <div className="w-2/5">
                <Controller
                  control={ form.control }
                  name="accountType"
                  render={ ({ field }) => (
                    <div className="space-y-2">
                      <Select
                        onValueChange={ field.onChange }
                        value={ field.value }
                        defaultValue={ field.value }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Account Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Bank account">Bank account</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ) }
                />
              </div>

              <div className="w-2/5">

                <FormField
                  control={ form.control }
                  name="accountBalance"
                  render={ ({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" placeholder="Account Balance" { ...field } />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  ) }
                />
              </div>

              <div className="w-2/5">
                <Controller
                  control={ form.control }
                  name="currency"
                  render={ ({ field }) => (
                    <div className="space-y-2">
                      {/* <FormLabel>Currency</FormLabel> */ }
                      <Select
                        onValueChange={ field.onChange }
                        value={ field.value }
                        defaultValue={ field.value }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                        <SelectContent>
                          { supportedCurrencies.map((currency) => (
                            <SelectItem key={ currency.code } value={ currency.code }>
                              { currency.code } – { currency.name }
                            </SelectItem>
                          )) }
                        </SelectContent>
                      </Select>
                      {/* Error message */ }
                      { form.formState.errors.currency && (
                        <p className="text-sm text-red-500">
                          { form.formState.errors.currency.message }
                        </p>
                      ) }
                    </div>
                  ) }
                />
              </div>

            </div>

            <p>Already registered? <Link className="text-blue-500" to="/login">Login</Link></p>
            <p className="text-red-400">{ customError }</p>
            <p className="text-green-400">{ successMessage }</p>
            <Button type="submit">
              { loading && <><Loader2Icon className="animate-spin" />
                Please wait</> }
              { !loading && <>Register</> }
            </Button>
          </form>
        </Form>
      </div>
      <div className="lg:w-1/3 md:w-10/12">
        <img src={ pcImg } className="rounded-sm" alt="Ai generated image of girl with computer" />
      </div>
    </div>
  );
}