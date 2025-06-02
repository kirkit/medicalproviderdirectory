//The Table which will be used to display the providers, and also how to sort them by fields
"use client"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import type {Provider} from "@/types/provider"

//Table will need to give the ability to sort and delete providers
interface ProviderTableProps {
    providers: Provider[]
    //ondelete: () => void
    //onsort: () => void
}

export function ProviderTable({providers}: ProviderTableProps) {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableHead>Provider Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Practice Name</TableHead>
                </TableHeader>
                <TableBody>
                    {providers.length === 0 ? (
                        <TableRow>
                            <TableCell>No providers found</TableCell>
                        </TableRow>
                    ) : (
                        providers.map(provider =>
                            (
                                <TableRow key={provider.id}>
                                    <TableCell>{provider.providerName}</TableCell>
                                    <TableCell>{provider.email}</TableCell>
                                    <TableCell>{provider.specialty}</TableCell>
                                    <TableCell>{provider.practiceName}</TableCell>
                                </TableRow>
                            )
                        )

                    )}
                </TableBody>
            </Table>
        </div>
    )
}
