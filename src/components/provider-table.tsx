"use client"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import type {Provider} from "@/types/provider"
import {Button} from "@/components/ui/button.tsx";
import {TrashIcon} from "lucide-react";
import {useState} from "react";

//Table will need to give the ability to sort and delete providers
interface ProviderTableProps {
    providers: Provider[]
    onDelete: (id: string) => void
    onSort: (field: keyof Provider, direction: "asc" | "desc" ) => void
}

export function ProviderTable({providers, onDelete, onSort}: ProviderTableProps) {
    const [sortField, setSortField] = useState<keyof Provider | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

    const handleSort = (field: keyof Provider) => {
        const newDirection = sortField === field ? sortDirection === "asc" ? "desc" : "asc" : "asc"
        setSortField(field)
        setSortDirection(newDirection)
        onSort(field, sortDirection)
    }

    return (
        <div className=" border rounded-md overflow-hidden shadow-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead onClick={()=> handleSort("providerName")} className="cursor-pointer">
                            <div>Provider Name</div>
                        </TableHead>
                        <TableHead onClick={()=> handleSort("email")} className="cursor-pointer">
                            <div>Email</div>
                        </TableHead>
                        <TableHead onClick={()=> handleSort("specialty")} className="cursor-pointer">
                            <div>Specialty</div>
                        </TableHead>
                        <TableHead onClick={()=> handleSort("practiceName")} className="cursor-pointer">
                            <div>Practice Name</div>
                        </TableHead>
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
