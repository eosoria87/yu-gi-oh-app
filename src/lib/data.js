import { db } from './db';
import api from './api';
import { browser } from '$app/environment';

const paginate = (
    /** @type {any[]} */ array, 
    /** @type {number} */ skip, 
    /** @type {number} */ take) => {
    return [...array.slice(skip, skip + take)];
}

const list = async (
    /** @type {number} */ skip = 0, 
    /** @type {number} */ take = 15,
    /** @type {string | null} */ filter = null) => {
    let data = (browser) ? await db.cardinfo?.toArray() ?? [] : []; 
    
    if(data.length === 0) {
        data = await api.list();
        if(browser) {
            db.cardinfo?.bulkAdd(data);
        }
    }

    if(data.length === 0) return data;

    // banlist
    data = data.filter((/** @type {any} */ d) => !d.banlist_info);

    if(filter){
        data = data.filter((/** @type {any} */ x) => 
            x.name?.toLowerCase().includes(filter.toLowerCase()) || 
            x.type?.toLowerCase().includes(filter.toLowerCase()) || 
            x.frameType?.toLowerCase().includes(filter.toLowerCase()));
    }
    
    return { items: paginate(data, skip, take), total: data.length };
}

const findById = async (/** @type {number} */ id) => {
    let data = await db.cardinfo?.get(id);
    if(!data) {
        data = await api.findById(id);
    }
    return data;
}

export default {
    list
}
