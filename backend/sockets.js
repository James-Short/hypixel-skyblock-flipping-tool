import { getCurrentProducts, getProductHistory } from './db/queries.js';

export async function socketRouter(ws, data){
    if(data.type === 'getTopProducts'){
        try{
            const topProducts = await getCurrentProducts(data.sortBy, data.reverse);
            console.log(topProducts);
            ws.send(JSON.stringify({ type: 'deliverTopProducts', data: topProducts }))
        } catch(err){
            console.error(err);
        }
    }
    else if(data.type === 'getProductHistory'){
        if(data.productId){
            try{
                const productHistory = await getProductHistory(data.productId);
                ws.send(JSON.stringify({ type: "deliverProductHistory", data: productHistory }));
            } catch(err){
                console.error(err);
            }
        }
        else{
            ws.send(JSON.stringify({ type: "error", data: "getProductHistory requests must include a valid productID." }));
        }
    }
}