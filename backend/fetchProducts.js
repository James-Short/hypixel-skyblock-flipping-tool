import { updateProductprices } from './db/queries.js';

export async function startProductsFetch(){
    try{
        const res = await fetch('https://api.hypixel.net/v2/skyblock/bazaar');
        if(!res.ok){
            console.error('Failed to fetch: ', res.status);
            return;
        }
        const products = await res.json();
        updateProductprices(products.products);
    } catch(err){
        console.error('Failed to fetch: ', err);
    } finally{
        setTimeout(startProductsFetch, 300_000);
    }
}