"use client"

import {useState, useEffect} from "react"
import {SearchBar} from "@/components/search-bar"
import {ProviderTable} from "@/components/provider-table"
import type {Provider} from "@/types/provider"
import {initialProviders} from "@/data/inital-providers"
import {ProviderForm} from "@/components/provider-form.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function ProviderDirectory() {
    const [searchQuery, setSearchQuery] = useState("")
    const [providers, setProviders] = useState<Provider[]>([])
    const [selectedProviders, setSelectedProvider] = useState<Provider[]>([])
    const [isAddFormOpen, setIsAddFormOpen] = useState(false)

    useEffect(()=>
    {
        localStorage.setItem("providers", JSON.stringify(initialProviders))
        setProviders((JSON.parse(localStorage.getItem("providers") || "[]") as Provider[]) || [])
        setSelectedProvider((JSON.parse(localStorage.getItem("providers") || "[]") as Provider[]) || [])
    }, [])

    useEffect(() => {
        // Save providers to localStorage
        localStorage.setItem("providers", JSON.stringify(providers))
    }, [providers]);

    useEffect(() =>
    {
        if(searchQuery.trim() === ""){
            setSelectedProvider(providers)
        } else {
            // Filter providers by search term
            const searchTerm = searchQuery.toLowerCase();
            const selected = providers.filter(
                (provider) =>
                    provider.providerName.toLowerCase().includes(searchTerm)||
                    //First and last might be overkill to check on since the provider name will contain both, but adding them for now
                    provider.firstName.toLowerCase().includes(searchTerm)||
                    provider.lastName.toLowerCase().includes(searchTerm)||
                    provider.email.toLowerCase().includes(searchTerm) ||
                    (provider.practiceName &&
                        provider.practiceName.toLowerCase().includes(searchTerm)) ||
                    (provider.specialty &&
                        provider.specialty.toLowerCase().includes(searchTerm))
            )

            setSelectedProvider(selected)
        }
    }, [searchQuery, providers])

    const addContact = (newProvider: Omit<Provider, "id">)=>{
        const addProvider = {
            id: Date.now().toString(),
            ...newProvider
        }

        setProviders([addProvider, ...providers])
        setIsAddFormOpen(false)
    }

    const deleteProvider = (id: string)=>{
        setProviders(providers.filter(provider => provider.id !== id))
    }

    const sortProviders = (field: keyof Provider, direction: "asc" | "desc")=>{
        const sorted = [...providers].sort((a, b) => {
            const valueA = a[field]|| ""
            const valueB = b[field]|| ""

            return direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
        })

        setSelectedProvider(sorted)
    }

    return (
        <main>
            <h1>Provider Directory</h1>

            <div className="flex items-center gap-4 mb-4">
                <SearchBar value={searchQuery} onChange={setSearchQuery}/>
                <Button onClick={()=> setIsAddFormOpen(true)}>Add Provider</Button>
            </div>

            <ProviderTable
                providers={selectedProviders}
                onDelete={deleteProvider}
                onSort={sortProviders}
            />

            <ProviderForm
                isOpen={isAddFormOpen}
                onClose={()=> setIsAddFormOpen(false)}
                onSubmit={addContact}
            />
        </main>
    )
}
