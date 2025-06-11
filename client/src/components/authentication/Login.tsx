import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password is too short"),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="gradient-bg p-8 h-screen flex flex-wrap md:gap-8 lg:gap-16 justify-center items-center">
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <div className="lg:w-1/3 md:w-10/12">
        <img src={ pcImg } className="rounded-sm" alt="Ai generated image of girl with computer" />
      </div>
    </div>
  );
}