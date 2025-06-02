import {SearchBar} from '@/components/search-bar';
import {beforeEach, describe, it} from "node:test";
import {jest} from "globals";
import {render, screen, fireEvent} from "@testing-library/react";

describe('SearchBar', () => {
    const mockOnChange = jest.fn()
    const mockValue= "test"

    beforeEach(()=>{
        mockOnChange.mockClear()
    })

    it("Renders correctly with empty value", () => {
        render(<SearchBar onChange={mockOnChange} value={""}/>)

        expect(screen.getByPlaceholderText("Search providers...")).toBeInTheDocument()
    })

    it("Updates search query when changed", () => {
        render(<SearchBar onChange={mockOnChange} value={""}/>)

        const searchInput = screen.getByPlaceholderText("Search providers...")
        fireEvent.change(searchInput, {target: {value: mockValue}})

        expect(mockOnChange).toHaveBeenCalledTimes(1)
    })
})
