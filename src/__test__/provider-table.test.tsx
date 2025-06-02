import {beforeEach, describe, it} from "node:test";
import jest from 'jest-mock';
import {expect} from "@jest/globals";
import '@testing-library/jest-dom/jest-globals'
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {ProviderTable} from "@/components/provider-table.tsx";
import type {Provider} from "@/types/provider"

describe('ProviderTable', () => {
    const mockDelete = jest.fn()
    const mockSort = jest.fn()

    const mockProviders: Provider[] = [
        {
            id: "1",
            firstName: "Jane",
            lastName: "Doe",
            email: "jdoe@test.com",
            practiceName: "Riverside Hospital",
            specialty: "Pediatrics",
            providerName: "Doe, Jane"
        },
        {
            id: "2",
            firstName: "John",
            lastName: "North",
            email: "jnorth@test.com",
            practiceName: "OSU Hospital",
            specialty: "Cardiology",
            providerName: "North, John"
        }
    ]

    beforeEach(()=>{
        mockDelete.mockClear()
        mockSort.mockClear()
    })

    it("Renders the headers correctly", () => {
        render(<ProviderTable providers={mockProviders} onDelete={mockDelete} onSort={mockSort}/>)

        expect(screen.getByText("Provider Name")).toBeInTheDocument()
        expect(screen.getByText("Email")).toBeInTheDocument()
        expect(screen.getByText("Specialty")).toBeInTheDocument()
        expect(screen.getByText("Practice Name")).toBeInTheDocument()
        expect(screen.getByText("Actions")).toBeInTheDocument()
    })

    it("Renders the contacts correctly", () => {
        render(<ProviderTable providers={mockProviders} onDelete={mockDelete} onSort={mockSort}/>)

        expect(screen.getByText("Doe, Jane")).toBeInTheDocument()
        expect(screen.getByText("Riverside Hospital")).toBeInTheDocument()
        expect(screen.getByText("Pediatrics")).toBeInTheDocument()
        expect(screen.getByText("North, John")).toBeInTheDocument()
        expect(screen.getByText("OSU Hospital")).toBeInTheDocument()
        expect(screen.getByText("Cardiology")).toBeInTheDocument()
    })

    it("Sorts by name", async () => {
        render(<ProviderTable providers={mockProviders} onDelete={mockDelete} onSort={mockSort}/>)

        const nameHeader = screen.getByText("Provider Name")
        fireEvent.click(nameHeader)

        await waitFor(()=> {
            expect(mockSort).toHaveBeenCalledTimes(1)
            expect(mockSort).toHaveBeenCalledWith("providerName")
        })
    })

    it("Sorts by email", async () => {
        render(<ProviderTable providers={mockProviders} onDelete={mockDelete} onSort={mockSort}/>)

        const emailHeader = screen.getByText("Email")
        fireEvent.click(emailHeader)

        await waitFor(()=> {
            expect(mockSort).toHaveBeenCalledTimes(1)
            expect(mockSort).toHaveBeenCalledWith("providerName")
        })
    })

    it("Sorts by specialty", async () => {
        render(<ProviderTable providers={mockProviders} onDelete={mockDelete} onSort={mockSort}/>)

        const specialtyHeader = screen.getByText("Specialty")
        fireEvent.click(specialtyHeader)

        await waitFor(()=> {
            expect(mockSort).toHaveBeenCalledTimes(1)
            expect(mockSort).toHaveBeenCalledWith("specialty")
        })
    })

    it("Sorts by practice name", async () => {
        render(<ProviderTable providers={mockProviders} onDelete={mockDelete} onSort={mockSort}/>)

        const practiceNameHeader = screen.getByText("Practice Name")
        fireEvent.click(practiceNameHeader)

        await waitFor(()=> {
            expect(mockSort).toHaveBeenCalledTimes(1)
            expect(mockSort).toHaveBeenCalledWith("practiceName")
        })
    })

    it("Renders a message when no providers are found", () => {
        render(<ProviderTable providers={[]} onDelete={mockDelete} onSort={mockSort}/>)
        expect(screen.getByText("No providers found")).toBeInTheDocument()
    })

    it("Deletes a provider", async () => {
        render(<ProviderTable providers={mockProviders} onDelete={mockDelete} onSort={mockSort}/>)

        const mockProviderName = "Doe, Jane"
        const deleteButton = screen.getByText('Delete  ${mockProviderName}')
        fireEvent.click(deleteButton)

        await waitFor(()=> {
            expect(mockDelete).toHaveBeenCalledTimes(1)
            expect(mockDelete)
            if(mockProviders && mockProviders.length > 1) {
                expect(screen.queryByText(mockProviderName)).not.toBeInTheDocument()
            }
        })
    })
})
