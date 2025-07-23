import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { addTransactionSchema, type AddTransactionInput } from "@/features/transactions/transactionSchema"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/store/hooks"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { addTransaction } from "@/features/transactions/transactionApi"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"

export default function AddTransaction() {

    const [customError, setCustomError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const user = useAppSelector((state) => state.auth.user);

    const form = useForm<z.infer<typeof addTransactionSchema>>({
        resolver: zodResolver(addTransactionSchema),
        defaultValues: {
            amount: 0,
            note: "",
            account: "",
            toAccount: "",
            type: "income",
            tags: "",
            date: "",
        }
    })

    const typeValue = form.watch("type")
    const accountValue = form.watch("account")
    const toAccountValue = form.watch("toAccount")

    const onSubmit = async (values: AddTransactionInput) => {
        try {
            setLoading(true);

            const data = await addTransaction(values);

            if (!data?.success) {
                setCustomError(data.message || "Could not add Transaction! Please try later")
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
        <div className="basis-[40%] p-4">
            <h4 className="text-2xl font-bold mb-3">Add Transaction</h4>
            <Form { ...form }>
                <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4">
                    <FormField
                        control={ form.control }
                        name="amount"
                        render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="0.00" { ...field } />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />
                    <FormField
                        control={ form.control }
                        name="note"
                        render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>Note</FormLabel>
                                <FormControl>
                                    <Input placeholder="Note" { ...field } />
                                </FormControl>
                                <FormDescription>
                                    Please add a note.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />

                    <div className="flex gap-4">

                        <Controller
                            control={ form.control }
                            name="type"
                            render={ ({ field }) => (
                                <div className="basis-1/2">
                                    <FormLabel className="mb-2">Type</FormLabel>
                                    <Select
                                        onValueChange={ field.onChange }
                                        value={ field.value }
                                        defaultValue={ field.value }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="income">Income</SelectItem>
                                            <SelectItem value="expense">Expense</SelectItem>
                                            <SelectItem value="transfer">Transfer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            ) }
                        />

                        <Controller
                            control={ form.control }
                            name="account"
                            render={ ({ field }) => (
                                <div className="basis-1/2">
                                    <FormLabel className="mb-2">Account</FormLabel>
                                    <Select
                                        onValueChange={ field.onChange }
                                        value={ field.value }
                                        defaultValue={ field.value }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Account" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="select">Select</SelectItem>
                                            { user?.accounts
                                                .filter(account => account._id !== toAccountValue)
                                                .map(account => (
                                                    <SelectItem key={ account._id } value={ account._id }>
                                                        { account.name }
                                                    </SelectItem>
                                                )) }
                                        </SelectContent>
                                    </Select>
                                </div>
                            ) }
                        />
                    </div>


                    { typeValue === "transfer" && <Controller
                        control={ form.control }
                        name="toAccount"
                        render={ ({ field }) => (
                            <div className="basis-1/3">
                                <FormLabel className="mb-2">To Account</FormLabel>
                                <Select
                                    onValueChange={ field.onChange }
                                    value={ field.value }
                                    defaultValue={ field.value }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select To Account" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="select">Select</SelectItem>
                                        { user?.accounts
                                            .filter(account => account._id !== accountValue)
                                            .map(account => (
                                                <SelectItem key={ account._id } value={ account._id }>
                                                    { account.name }
                                                </SelectItem>
                                            )) }
                                    </SelectContent>
                                </Select>
                                <FormDescription className="mt-2">
                                    To account is required for transfer.
                                </FormDescription>
                            </div>
                        ) }
                    /> }


                    <FormField
                        control={ form.control }
                        name="tags"
                        render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input placeholder="tag1, tag2, tag3..." { ...field } />
                                </FormControl>
                                <FormDescription>
                                    Date of Transaction
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />

                    <FormField
                        control={ form.control }
                        name="date"
                        render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input type="datetime-local" placeholder="Date" { ...field } />
                                </FormControl>
                                <FormDescription>
                                    Add tags seperated by comma
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />


                    <Button type="submit" className="cursor-pointer mt-4">
                        { loading && <><Loader2Icon className="animate-spin" />
                            Please wait</> }
                        { !loading && <>Add Transaction</> }</Button>
                    <p className="text-red-400">{ customError }</p>
                    <p className="text-green-400">{ successMessage }</p>
                </form>
            </Form>
        </div>
    )
}