//Form for adding a new provider
//Form will make it easier to check fields as required and add new providers
//Have to decide how I want to display the form, should it be side by side or a pop-up?
    //Leaning towards pop-up to keep main page cleaner and also make it easier for focus on on thing at a time
"use client"


import {Dialog, DialogTitle, DialogContent, DialogFooter} from "@/components/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
//Consulted vercel v0 for best way to implement the form with validation and zod was suggested
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

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
    onSubmit: () => void
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
    return (
        <Dialog open={isOpen} onOpenChange={(open)=> !open && onClose()}>
            <DialogContent>
                <DialogTitle>Add New Provider</DialogTitle>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>First Name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First Name..." {...field} />
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
                                        <Input placeholder="Last Name..." {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email@test.com" {...field} />
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
                                        <Input placeholder="COPCP" {...field} />
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
