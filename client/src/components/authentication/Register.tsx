import { Controller, useForm } from "react-hook-form";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from "react-router-dom";

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

const formSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password is too short"),
  currency: z.string(),
  accountName: z.string().min(2, "Account name is too short"),
  accountType: z.enum(['Cash', 'Bank account', 'Other']),
  accountBalance: z.number().min(0, "Balance can't be negative")
});

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="gradient-bg p-8 h-screen flex flex-wrap gap-8 md:gap-8 lg:gap-16 justify-center items-center">
      <div className="w-full lg:w-1/4 md:w-10/12">
        <h1 className="text-3xl mb-8">Register - Finance Tracker</h1>
        <Form { ...form }>
          <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6">

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
                        <Input placeholder="Account Balance" { ...field } />
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
                      {/* <FormLabel>Currency</FormLabel> */}
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