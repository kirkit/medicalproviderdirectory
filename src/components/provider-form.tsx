//Form for adding a new provider
//Form will make it easier to check fields as required and add new providers
//Have to decide how I want to display the form, should it be side by side or a pop-up?
    //Leaning towards pop-up to keep main page cleaner and also make it easier for focus on on thing at a time
"use client"

import {Dialog, DialogTitle, DialogContent} from "@/components/ui/dialog.tsx";

interface ProviderFormProps {
    //Going to do a pop-up so need to know when it is open and what to do when it is closes
    isOpen: boolean
    onClose: () => void
    //onSubmit: () => void
}

export function ProviderForm({isOpen, onClose}: ProviderFormProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open)=> !open && onClose()}>
            <DialogContent>
                <DialogTitle>Add New Provider</DialogTitle>
            </DialogContent>
        </Dialog>
    )
}
