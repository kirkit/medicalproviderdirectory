//Main directory for providers
//Will need to add a table of providers
//will need to add a way to add providers
    //going to need a form probably to make it easier to add and test
"use client"

import {useState, useEffect} from "react"
import {SearchBar} from "@/components/search-bar"
import {ProviderTable} from "@/components/provider-table"
import type {Provider} from "@/types/provider"
import {initialProviders} from "@/data/inital-providers"

export default function ProviderDirectory() {
    const [searchQuery, setSearchQuery] = useState("")
    const [providers, setProviders] = useState<Provider[]>([])

    useEffect(()=>
    {
        setProviders(initialProviders)
    }, [])

    useEffect(() =>
    {
        if(searchQuery.trim() === ""){
            // Display all providers
        } else {
            // Filter providers by search term
            // const searchTerm = query.trim().toLowerCase();
            // need to set up table to display providers now
        }
    }, [searchQuery])

    return (
        <main>
            <h1>Provider Directory</h1>

            <div>
                <SearchBar value={searchQuery} onChange={setSearchQuery}/>
            </div>

            <ProviderTable
                providers={providers}
            />
        </main>
    )
}
