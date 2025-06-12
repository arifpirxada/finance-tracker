import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginSchema, type LoginInput } from "@/features/auth/authSchema";
import { authenticateUser, loginUser } from "@/features/auth/authApi";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { login } from "@/features/auth/authSlice";


export default function Login() {

  // Redirect user if logged in
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [customError, setCustomError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: LoginInput) => {
    try {
      setLoading(true);
      const data = await loginUser(values);

      if (!data?.success) {
        setCustomError(data.message || "Something went wrong! Please try later")
        return;
      }

      setCustomError("");
      setSuccessMessage(data.message || "Login successful");

      const user = await authenticateUser();
      dispatch(login(user));

      setLoading(false);
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      setCustomError(error.message || "Something went wrong! Please try later");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="gradient-bg p-8 min-h-screen flex flex-wrap md:gap-8 lg:gap-16 justify-center items-center">
      <div className="w-full lg:w-1/4 md:w-10/12">
        <h1 className="text-3xl mb-8">Login - Finance Tracker</h1>
        <Form { ...form }>
          <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6">

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

            <p>New here? <Link className="text-blue-500" to="/register">Register</Link></p>
            <p className="text-red-400">{ customError }</p>
            <p className="text-green-400">{ successMessage }</p>
            <Button type="submit">
              { loading && <><Loader2Icon className="animate-spin" />
                Please wait</> }
              { !loading && <>Login</> }
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