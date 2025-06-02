import {ProviderDirectory} from '@/components/ProviderDirectory'
import {describe, it} from "node:test";
import {render, screen} from "@testing-library/react";

describe('ProviderDirectory', () => {
    it("Renders correctly", () => {
        render(<ProviderDirectory/>)

        expect(screen.getByText("Provider Directory")).toBeInTheDocument()
        expect(screen.getByRole("button", {name: /Add Provider/i})).toBeInTheDocument()
        expect(screen.getByText("Search providers...")).toBeInTheDocument()
    })
})
