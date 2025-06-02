"use client"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import type {Provider} from "@/types/provider"
import {Button} from "@/components/ui/button.tsx";
import {ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon, TrashIcon} from "lucide-react";
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
        const direction = sortField === field && sortDirection === "asc" ? "desc" : "asc"
        setSortField(field)
        setSortDirection(direction)
        onSort(field, direction)
    }

    const getSortIcon = (field: keyof Provider) => {
        if(sortField !== field) return <ChevronsUpDownIcon className="w-4 h-4" />
        return sortDirection === "asc" ? <ChevronUpIcon className="ml-2 h-4 w-4" /> : <ChevronDownIcon className="ml-2 h-4 w-4" />
    }

    return (
        <div className=" border rounded-md overflow-hidden shadow-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead onClick={()=> handleSort("providerName")} className="cursor-pointer w-auto justify-center gap-2 pl-2 pr-4">
                            <div className="flex items-center">
                                Provider Name
                                {getSortIcon("providerName")}
                            </div>
                        </TableHead>
                        <TableHead onClick={()=> handleSort("email")} className="cursor-pointer">
                            <div className="flex items-center">
                                Email
                                {getSortIcon("email")}
                            </div>
                        </TableHead>
                        <TableHead onClick={()=> handleSort("specialty")} className="cursor-pointer">
                            <div className="flex items-center">
                                Specialty
                                {getSortIcon("specialty")}
                            </div>
                        </TableHead>
                        <TableHead onClick={()=> handleSort("practiceName")} className="cursor-pointer">
                            <div className="flex items-center">
                                Practice Name
                                {getSortIcon("practiceName")}
                            </div>
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
