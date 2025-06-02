import ProviderDirectory from "@/components/provider-directory.tsx";
import {describe, it} from "node:test";
import {render, screen} from "@testing-library/react";
import {expect} from "@jest/globals";
import '@testing-library/jest-dom/jest-globals'

describe('ProviderDirectory', () => {
    it("Renders correctly", () => {
        render(<ProviderDirectory/>)

        expect(screen.getByText("Provider Directory")).toBeInTheDocument()
        expect(screen.getByRole("button", {name: /Add Provider/i})).toBeInTheDocument()
    })
})
