import { zodResolver } from "@hookform/resolvers/zod"
import { addAccountSchema } from "@/features/accounts/accountSchema"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/store/hooks"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"
import { Loader2Icon } from "lucide-react"
import { addAccount } from "@/features/accounts/accountApi"

export default function AddAccount() {

    const [customError, setCustomError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const user = useAppSelector((state) => state.auth.user);

    const form = useForm<z.infer<typeof addAccountSchema>>({
        resolver: zodResolver(addAccountSchema),
        defaultValues: {
            name: "",
            type: "Bank account",
            balance: 0
        }
    })

    const onSubmit = async (values: z.infer<typeof addAccountSchema>) => {
        try {
            setLoading(true);

            const data = await addAccount(values);

            if (!data?.success) {
                setCustomError(data.message || "Could not add account! Please try later")
                return;
            }

            setCustomError("");
            setSuccessMessage(data.message || "Account added successfully");

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            setCustomError(error.message || "Something went wrong! Please try later");
        }
    }

    return (
        <div className="basis-[60%] p-4">
            <h4 className="text-2xl mb-3 font-bold">Add Account</h4>
            { user?.accounts.length === 0 && <p className="my-2">Please add a bank account to make a transaction</p> }
            <Form { ...form }>
                <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4">
                    <div className="flex gap-4 md:items-end flex-col md:flex-row">
                        <FormField
                            control={ form.control }
                            name="name"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Name" { ...field } />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />

                        <Controller
                            control={ form.control }
                            name="type"
                            render={ ({ field }) => (
                                <div>
                                    <Select
                                        onValueChange={ field.onChange }
                                        value={ field.value }
                                        defaultValue={ field.value }
                                    >
                                        <SelectTrigger className="w-full">
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

                        <FormField
                            control={ form.control }
                            name="balance"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormLabel>Balance</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="0.00" { ...field } />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                    </div>

                    <Button type="submit" className="mt-4 cursor-pointer">
                        { loading && <><Loader2Icon className="animate-spin" />
                            Please wait</> }
                        { !loading && <>Add Account</> }
                    </Button>
                    <p className="text-red-400">{ customError }</p>
                    <p className="text-green-400">{ successMessage }</p>
                </form>
            </Form>
        </div>
    )
}