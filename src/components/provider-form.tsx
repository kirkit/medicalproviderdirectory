"use client"


import {useForm} from "react-hook-form";
import type {Provider} from "@/types/provider"
import {Dialog, DialogTitle, DialogContent, DialogFooter} from "@/components/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {maxNameLength, maxEmailLength} from "@/values/definitions.ts";
//Consulted vercel v0 for the best way to implement the form with validation, and zod was suggested

const formSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required, cannot be empty or only be whitespaces").max(maxNameLength,`First name should not exceed ${maxNameLength} characters.`),
    lastName: z.string().trim().min(1, "Last name is required, cannot be empty or only be whitespaces").max(maxNameLength,`Last name should not exceed ${maxNameLength} characters.`),
    email: z.string().email("Invalid email address").min(1, "Email is required").max(maxEmailLength,`Email should not exceed ${maxEmailLength} characters.`),
    practiceName: z.string().optional(),
    specialty: z.string().optional(),
})
type FormValues = z.infer<typeof formSchema>

interface ProviderFormProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (provider: Omit<Provider, "id">) => void
}

export function ProviderForm({isOpen, onClose, onSubmit}: ProviderFormProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            practiceName: "",
            specialty: "",
        },
    })

    const handleSubmit = (values: FormValues) => {
        const newProvider  = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            specialty: values.specialty,
            practiceName: values.practiceName,
            providerName: values.lastName + ", " + values.firstName,
        }
        onSubmit(newProvider)

        form.reset()
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open)=> !open && onClose()}>
            <DialogContent>
                <DialogTitle>Add New Provider</DialogTitle>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-6">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>First Name *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Jane" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Last Name *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="jdoe@ohiohealth.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="specialty"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Specialty</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Pediatrics" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="practiceName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Practice Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Riverside Hospital" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="flex justify-end gap-2 pt-4">
                            <Button type="button" onClick={onClose} variant="destructive">Cancel</Button>
                            <Button type="submit">Add Provider</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
