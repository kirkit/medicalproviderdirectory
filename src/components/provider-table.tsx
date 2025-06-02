//The Table which will be used to display the providers, and also how to sort them by fields
//TODO: sort and delete providers
"use client"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import type {Provider} from "@/types/provider"
import {Button} from "@/components/ui/button.tsx";
import {TrashIcon} from "lucide-react";

//Table will need to give the ability to sort and delete providers
interface ProviderTableProps {
    providers: Provider[]
    onDelete: (id: string) => void
    // onsort: () => void
}

export function ProviderTable({providers, onDelete}: ProviderTableProps) {
    return (
        <div className=" border rounded-md overflow-hidden shadow-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Provider Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Practice Name</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {providers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-muted-foreground py-6">No providers found</TableCell>
                        </TableRow>
                    ) : (
                        providers.map(provider =>
                            (
                                <TableRow key={provider.id}>
                                    <TableCell>{provider.providerName}</TableCell>
                                    <TableCell>{provider.email}</TableCell>
                                    <TableCell>{provider.specialty || "----"}</TableCell>
                                    <TableCell>{provider.practiceName || "----"}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={()=> onDelete(provider.id)}
                                                aria-label={`Delete ${provider.providerName}`}
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        )

                    )}
                </TableBody>
            </Table>
        </div>
    )
}
