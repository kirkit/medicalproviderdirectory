//Main directory for providers
//will need to add a way to add providers
    //going to need a form probably to make it easier to add and test
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
        //setting up for when we add new providers
        setProviders(initialProviders)
        setSelectedProvider(initialProviders)
    }, [])

    useEffect(() =>
    {
        if(searchQuery.trim() === ""){
            setSelectedProvider(providers) //setting up for when we add new providers
        } else {
            // Filter providers by search term
            const searchTerm = searchQuery.toLowerCase();
            const selected = providers.filter(
                (provider) =>
                    provider.providerName.toLowerCase().includes(searchTerm)||
                    //First and last might be overkill to check on since provider name will contain both, but adding them for now
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

    return (
        <main>
            <h1>Provider Directory</h1>

            <div>
                <SearchBar value={searchQuery} onChange={setSearchQuery}/>
            </div>

            <ProviderTable
                providers={selectedProviders}
            />

            <Button onClick={()=> setIsAddFormOpen(true)}>Add Provider</Button>
            <ProviderForm isOpen={isAddFormOpen} onClose={()=> setIsAddFormOpen(false)}/>
        </main>
    )
}
