// @ts-nocheck
import { browser } from '$app/environment';
import api from '$lib/api';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {    
    if(!browser || !params.id) return { item: null }
    return await api.findById(params.id);
}