//Main directory for providers
//Will need to add a table of providers
//will need to add a way to add providers
    //going to need a form probably to make it easier to add and test

import {useEffect, useState} from "react"
import {SearchBar} from "@/components/search-bar"

export default function ProviderDirectory() {
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() =>
        {
            if(searchQuery.trim() === ""){
            } else {
                // const searchTerm = query.trim().toLowerCase();

            }
        }
    )

    return (
        <main>
            <h1>Provider Directory</h1>

            <div>
                <SearchBar value={searchQuery} onChange={setSearchQuery}/>
            </div>
        </main>
    )
}
