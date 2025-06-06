"use client"

import {Input} from "@/components/ui/input"
import {Search} from "lucide-react"

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
}

export function SearchBar({value, onChange}: SearchBarProps) {
    return (
        <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search providers..."
                className="pl-8"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
