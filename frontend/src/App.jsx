import Product from './components/Product/Product';
import './index.css';
import './App.css'
import { useState, useEffect, useRef } from 'react';
import ProductOverlay from './components/ProductOverlay/ProductOverlay';

function App() {
  const [products, setProducts] = useState([]); 
  const [selectedSort, setSelectedSort] = useState("Coins per hour");
  const [reversed, setReversed] = useState(false);
  const ws = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    let cancelled = false;
    const socket = new WebSocket('ws://localhost:8080');
    ws.current = socket;

    socket.onopen = () => {
      if(cancelled) return;

      console.log("Successfully Connected!");
      socket.send(JSON.stringify({ type: "getTopProducts", sortBy: "Coins per hour", reverse: false }));
    }

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log("Got message: ", data);
      if(data.type === 'deliverTopProducts'){
        setProducts(data.data);
      }
    }

    return () => {
      cancelled = true;
      socket.close();
      ws.current = null;
    }

  }, []);

  useEffect(() => {
    if(isFirstRender.current){
      isFirstRender.current = false;
      return;
    }

    const socket = ws.current;
    if(!socket || socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify({ type: "getTopProducts", sortBy: selectedSort, reverse: reversed }));
  }, [selectedSort, reversed])


  return (
    <>
      <ProductOverlay/>
      <div className='sort-container'>
        <select name="" id="" className='sort-select' value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
          <option>Coins per hour</option>
          <option>Margin</option>
          <option>Margin %</option>
          <option>Instabuys</option>
          <option>Instasells</option>
          <option>Buy order price</option>
          <option>Sell order price</option>
        </select>
        <button className='sort-reverse-button' onClick={() => setReversed(!reversed)}>{reversed ? "⬆" : "⬇"}</button>
      </div>
      <div className='product-container'>
        {products.map(({ product_id, buy_price, sell_price, buy_moving_week, sell_moving_week }, index) => (
          <Product productName={product_id.replace(/_/g," ")} buyPrice={buy_price} sellPrice={sell_price} instaSells={sell_moving_week / (7*24)} instaBuys={buy_moving_week / (7*24)}/>
        ))}
      </div>
    </>
  )
}

export default App
