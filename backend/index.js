import { updateProductprices, getCurrentProducts } from './db/queries.js';
import { startProductsFetch } from './fetchProducts.js';


let products = await getCurrentProducts();
