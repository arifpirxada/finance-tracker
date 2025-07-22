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
import { Select, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { SelectContent } from "../ui/select"

export default function AddAccount() {

    const user = useAppSelector((state) => state.auth.user);

    const form = useForm<z.infer<typeof addAccountSchema>>({
        resolver: zodResolver(addAccountSchema),
        defaultValues: {
            name: "",
            type: "Bank account",
            balance: 0
        }
    })

    const onSubmit = (values: z.infer<typeof addAccountSchema>) => {
        console.log(values);
    }

    return (
        <div className="p-4">
            <Form { ...form }>
                <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-8">
                    <FormField
                        control={ form.control }
                        name="name"
                        render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>Account Name</FormLabel>
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

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}