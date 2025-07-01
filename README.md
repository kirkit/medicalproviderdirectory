# Medical Provider Directory Application
### React + TypeScript + Vite
A web-based medical provider directory application built with Vite, Next.js, TypeScript, React, and Tailwind CSS

## Features
- View a list of providers with their details
- Add a new provider with required field validation
- Delete providers
- Sort providers by any field (asc/desc)
- Search contacts

### Data Persistence
Medical Provider Directory uses local storage to store and restore contacts between sessions.

## Technical Stack
- Vite
- TypeScript
- Tailwind CSS
- React Hook Form with Zod validation
- shadcn/ui components

### Shadcn UI Components used
- Button: Used in a variety of places for button functionality
- Form: Used for adding a new provider form
- Input: Used for the search bar and the provider form
- Table: Used to create the provider table
- Dialog: Used to create the new provider form
- Label: Form dependency

## Using the Directory

### Prerequisites
- Node.js 18.x or later
- npm or yarn

1. Clone the repo:


    git clone https://github.com/kirkit/medicalproviderdirectory.git
    cd medicalproviderdirectory
   
2. Install the dependencies


    npm install

3. Run th dev server


    npm run dev

4. Open dev host with your browser to access the directory, ex [http://localhost:3000](http://localhost:3000)

## Testing Information
### Testing Technical Stack
- Jest
- JestDom

Tests can be found in /src/__test__
Tests are written, but still had trouble getting them to run

## Project Organization
- __test__: test case dir
- components: react components and program support components
- components/ui: shadcn/ui components
- data: testing and initalization data
- lib: support and dependency libraries, in this case library for shadcn/ui
- types: defined TypeScript types

### External tools used
Made use of vercel v0 to help give a starting point for the provider form, 
and for the unit testing since I've never worked with Jest before

