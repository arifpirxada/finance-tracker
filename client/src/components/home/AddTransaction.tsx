import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { addTransactionSchema } from "@/features/transactions/transactionSchema"
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

export default function AddTransaction() {

    const user = useAppSelector((state) => state.auth.user);

    const form = useForm<z.infer<typeof addTransactionSchema>>({
        resolver: zodResolver(addTransactionSchema),
        defaultValues: {
            amount: 0,
            note: "",
            account: "",
            toAccount: "",
            type: "income",
            tags: [],
            date: new Date(),
        }
    })

    const onSubmit = (values: z.infer<typeof addTransactionSchema>) => {
        console.log(values);
    }

    if (user?.accounts.length === 0) {
        return (
            <p className="mx-4">Please add a bank account to make a transaction</p>
        )
    }

    return (
        <div className="p-4">
            <Form { ...form }>
                <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-8">
                    <FormField
                        control={ form.control }
                        name="amount"
                        render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="0.00" { ...field } />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}