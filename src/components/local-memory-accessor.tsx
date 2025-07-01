import {initialProviders} from "@/data/inital-providers"
import type { Provider } from "@/types/provider"

//Memory Management Helper Functions
/**
 * Sets up the local storage with the initial provider dataset if no data exists in local storage
 */
function setInitialProviders() {
    const key = "providers"
    try {
        const providers = JSON.parse(localStorage.getItem(key) || "[]") as Provider[]
        if(providers.length === 0) {
            localStorage.setItem(key, JSON.stringify(initialProviders))
        }
    } catch (error) {
        console.error("Failed to get/set from local storage",error)
    }
}

/**
 * Returns the providers saved in local storage or if there was an issue accessing local storage or no values exist
 * under the "provider" key returns an empty provider array
 */
function getProvidersFromStorage() {
    const key = "providers"
    try {
        return JSON.parse(localStorage.getItem(key) || "[]") as Provider[]
    } catch (error) {
        console.error("Failed to get from local storage",error)
        return []
    }
}

/**
 * Stores the given providers array into local storage
 *
 * @param providers
 *  The providers to save into local storage under the "providers" key
 */
function setProvidersInStorage(providers: Provider[]) {
    const key = "providers"
    try {
        localStorage.setItem(key, JSON.stringify(providers))
    } catch (error) {
        console.error("Failed to set in local storage",error)
    }
}

export {setInitialProviders, setProvidersInStorage, getProvidersFromStorage}
