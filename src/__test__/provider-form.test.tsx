//Tests for adding to provider directory
    //Need to test for duplicate providers
    //Need to test for invalid providers
    //Need to test for empty First/Last/Email
    //Need to be sure speciality and practice name are optional
// Tests for removing from provider directory
    //Need to be sure only desired provider is removed
    //Need to decicde if needed a confirmation dialog for removal, and if so needs to be tested
// Tests for searching for providers
    //Test for searching by speciality
    //Test for searching by practice name
    //Test for searching by email
    //Test for searching by name
        //Also will need to test for when last name are the same but other values are different
// Tests for sorting providers/
    //Need to test for sorting by name
        //Also need to test for when last name are the same but first name are different, they are sorted correctly
    //Need to test for sorting by speciality
    //Need to test for sorting by practice name
    //Need to test for sorting by email
import {ProviderForm} from "@/components/provider-form.tsx";
import {beforeEach, describe, it} from "node:test";
import jest from 'jest-mock';
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {expect} from "@jest/globals";
import '@testing-library/jest-dom/jest-globals'
import {maxNameLength, maxEmailLength} from "@/values/definitions.ts";

describe('ProviderForm', () => {
    const mockAddProvider = jest.fn()
    const mockClose = jest.fn()

    beforeEach(()=>{
        mockAddProvider.mockClear()
        mockClose.mockClear()
    })

    it("Renders correctly", () => {
        render(<ProviderForm isOpen={true} onClose={mockClose} onSubmit={mockAddProvider}/>)

        expect(screen.getByText("Add New Provider")).toBeInTheDocument()
        expect(screen.getByLabelText(/First Name */i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Last Name */i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Email */i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Specialty/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Practice Name/i)).toBeInTheDocument()
        expect(screen.getByRole("button", {name: /Cancel/i})).toBeInTheDocument()
        expect(screen.getByRole("button", {name: /Add Provider/i})).toBeInTheDocument()
    })

    it("Checks for required fields", async () => {
        render(<ProviderForm isOpen={true} onClose={mockClose} onSubmit={mockAddProvider}/>)

        const submitButton = screen.getByRole("button", {name: /Add Provider/i})
        fireEvent.click(submitButton)

        await waitFor(()=> {
            expect(screen.getByText("First name is required")).toBeInTheDocument()
            expect(screen.getByText("Last name is required")).toBeInTheDocument()
            expect(screen.getByText("Email is required")).toBeInTheDocument()
        })

        expect(mockAddProvider).not.toHaveBeenCalled()
    })

    it("validates whitespace error", async () => {
        render(<ProviderForm isOpen={true} onClose={mockClose} onSubmit={mockAddProvider}/>)

        const FirstNameInput = screen.getByLabelText(/First Name */i)
        const LastNameInput = screen.getByLabelText(/Last Name */i)
        const emailInput = screen.getByLabelText(/Email */i)
        const submitButton = screen.getByRole("button", {name: /Add Provider/i})

        fireEvent.change(FirstNameInput, {target: {value: " "}})
        fireEvent.change(LastNameInput, {target: {value: " "}})
        fireEvent.change(emailInput, {target: {value: "test@test.com"}})
        fireEvent.click(submitButton)

        await waitFor(()=> {
            expect(screen.getByText("cannot be empty or only be whitespaces")).toBeInTheDocument()
        })

        expect(mockAddProvider).not.toHaveBeenCalled()
    })

    it("validates max length correctly", async () => {
        render(<ProviderForm isOpen={true} onClose={mockClose} onSubmit={mockAddProvider}/>)

        const FirstNameInput = screen.getByLabelText(/First Name */i)
        const LastNameInput = screen.getByLabelText(/Last Name */i)
        const emailInput = screen.getByLabelText(/Email */i)
        const submitButton = screen.getByRole("button", {name: /Add Provider/i})

        fireEvent.change(FirstNameInput, {target: {value: "testtesttesttesttesttesttesttest"}})
        fireEvent.change(LastNameInput, {target: {value: "testtesttesttesttesttesttesttest"}})
        fireEvent.change(emailInput, {target: {value: "testtesttesttesttesttesttesttesttest@testtestesttesttesttest.com"}})
        fireEvent.click(submitButton)

        await waitFor(()=> {
            expect(screen.getByText(`should not exceed ${maxNameLength}`)).toBeInTheDocument()
            expect(screen.getByText(`should not exceed ${maxEmailLength}`)).toBeInTheDocument()
        })

        expect(mockAddProvider).not.toHaveBeenCalled()
    })

    it("validates correct email foramt", async () => {
        render(<ProviderForm isOpen={true} onClose={mockClose} onSubmit={mockAddProvider}/>)

        const FirstNameInput = screen.getByLabelText(/First Name */i)
        const LastNameInput = screen.getByLabelText(/Last Name */i)
        const emailInput = screen.getByLabelText(/Email */i)
        const submitButton = screen.getByRole("button", {name: /Add Provider/i})

        fireEvent.change(FirstNameInput, {target: {value: "Jane"}})
        fireEvent.change(LastNameInput, {target: {value: "Doe"}})
        fireEvent.change(emailInput, {target: {value: "jdoe"}})
        fireEvent.click(submitButton)

        await waitFor(()=> {
            expect(screen.getByText("Invalid email address")).toBeInTheDocument()
        })

        expect(mockAddProvider).not.toHaveBeenCalled()
    })

    it("Submits with correct values", async () => {
        render(<ProviderForm isOpen={true} onClose={mockClose} onSubmit={mockAddProvider}/>)

        const firstNameInput = screen.getByLabelText(/First Name */i)
        const lastNameInput = screen.getByLabelText(/Last Name */i)
        const emailInput = screen.getByLabelText(/Email */i)
        const specialtyInput = screen.getByLabelText(/Specialty/i)
        const practiceNameInput = screen.getByLabelText(/Practice Name/i)
        const submitButton = screen.getByRole("button", {name: /Add Provider/i})

        fireEvent.change(firstNameInput, {target: {value: "Jane"}})
        fireEvent.change(lastNameInput, {target: {value: "Doe"}})
        fireEvent.change(emailInput, {target: {value: "jdoe@test.com"}})
        fireEvent.change(specialtyInput, {target: {value: "Pediatrics"}})
        fireEvent.change(practiceNameInput, {target: {value: "Riverside Hospital"}})
        fireEvent.click(submitButton)

        await waitFor(()=> {
            expect(mockAddProvider).toHaveBeenCalledTimes(1)
            expect(mockAddProvider).toHaveBeenCalledWith(
                expect.objectContaining({
                    firstName: "Jane",
                    lastName: "Doe",
                    email: "jdoe@test.com",
                    specialty: "Pediatrics",
                    practiceName: "Riverside Hospital",
                })
            )
        })
    })

    it("Submits with optional fields empty", async () => {
        render(<ProviderForm isOpen={true} onClose={mockClose} onSubmit={mockAddProvider}/>)

        const firstNameInput = screen.getByLabelText(/First Name */i)
        const lastNameInput = screen.getByLabelText(/Last Name */i)
        const emailInput = screen.getByLabelText(/Email */i)
        const submitButton = screen.getByRole("button", {name: /Add Provider/i})

        fireEvent.change(firstNameInput, {target: {value: "Jane"}})
        fireEvent.change(lastNameInput, {target: {value: "Doe"}})
        fireEvent.change(emailInput, {target: {value: "jdoe@test.com"}})
        fireEvent.click(submitButton)

        await waitFor(()=> {
            expect(mockAddProvider).toHaveBeenCalledTimes(1)
            expect(mockAddProvider).toHaveBeenCalledWith(
                expect.objectContaining({
                    firstName: "Jane",
                    lastName: "Doe",
                    email: "jdoe@test.com",
                    specialty: "",
                    practiceName: "",
                })
            )
        })
    })

    it("Cancels form", async () => {
        render(<ProviderForm isOpen={true} onClose={mockClose} onSubmit={mockAddProvider}/>)

        const cancelButton = screen.getByRole("button", {name: /Cancel/i})
        fireEvent.click(cancelButton)

        await waitFor(()=> {
            expect(mockClose).toHaveBeenCalledTimes(1)
        })
    })
})

