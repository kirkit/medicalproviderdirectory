"use client"


import {useForm} from "react-hook-form";
import type {Provider} from "@/types/provider"
import {Dialog, DialogTitle, DialogContent, DialogFooter} from "@/components/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
//Consulted vercel v0 for best way to implement the form with validation and zod was suggested
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const FormSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    practiceName: z.string().optional(),
    specialty: z.string().optional(),
})
type FormValues = z.infer<typeof FormSchema>

interface ProviderFormProps {
    //Going to do a pop-up so need to know when it is open and what to do when it is closes
    isOpen: boolean
    onClose: () => void
    onSubmit: (provider: Omit<Provider, "id">) => void
}

export function ProviderForm({isOpen, onClose, onSubmit}: ProviderFormProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues:
        {
            firstName: "",
            lastName: "",
            email: "",
            specialty: "",
            practiceName: ""
        }
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
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
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
