import { browser } from '$app/environment';
import data from '$lib/data';

/** @type {import('./$types').PageLoad} */
export async function load() {
    if(!browser) return {
        items: []
    } 

    var result = await data.list();
    return result;
}