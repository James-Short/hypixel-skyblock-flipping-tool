import 'dotenv/config';

import { updateProductprices, getCurrentProducts, getProductHistory } from './db/queries.js';
import { startProductsFetch } from './fetchProducts.js';


getProductHistory('CORRUPTED_BAIT');