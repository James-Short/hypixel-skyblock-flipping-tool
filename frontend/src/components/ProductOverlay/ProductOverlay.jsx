import './ProductOverlay.css';

import { LineChart, Line, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ProductOverlay(){
    const testData = [{ date: 'Jan', value: 1 }, { date: 'Mar', value: 7 }, { date: 'May', value: 3 }, { date: 'July', value: 1 }]
    return(
        <div className='product-overlay'>
            <button className='close-product-overlay'>X</button>
            <ResponsiveContainer width="50%" height="50%">
                <LineChart data={testData}>
                    <CartesianGrid vertical={false}/>
                    <XAxis dataKey="date" tickLine={false} axisLine={false}/>
                    <YAxis tickLine={false} axisLine={false}/>
                    <Line type="monotone" dataKey="value"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ProductOverlay;