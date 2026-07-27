import './ProductOverlay.css';

import { LineChart, Line, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ProductOverlay({ data, productName, closeMenu }){
    return(
        <div className='product-overlay-container'>
            <div className='product-overlay'>
                <button className='close-product-overlay' onClick={closeMenu}>X</button>
                <h1 className='product-overlay-header'>{productName}</h1>
                <ResponsiveContainer width="70%" height="70%">
                    <LineChart data={data} overflow="visible">
                        <CartesianGrid vertical={false}/>
                        <XAxis dataKey="recorded_at" tickLine={false} axisLine={false} stroke='white' tickCount={500}
                            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric'})}
                        />
                        <YAxis tickLine={false} axisLine={false} stroke='white' tickCount={5} domain={[(dataMin) => Math.floor(dataMin * 0.98), (dataMax) => Math.ceil(dataMax * 1.02)]}
                            tickFormatter={(value) => value.toLocaleString()}    
                        />
                        <Line type="monotone" dataKey="buy_price" stroke='#305CDE' strokeWidth='1px'/>
                        <Line type="monotone" dataKey="sell_price" stroke='tomato' />
                        <Legend position={'insideTopRight'} offset={10} wrapperStyle={{border: '1px solid white', borderRadius: 5, padding: '1%'}}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ProductOverlay;