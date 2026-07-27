import Product from './components/Product/Product';
import './index.css';
import './App.css'
import { useState, useEffect, useRef } from 'react';
import ProductOverlay from './components/ProductOverlay/ProductOverlay';

function App() {
  const [products, setProducts] = useState([]); 
  const [selectedSort, setSelectedSort] = useState("Coins per hour");
  const [reversed, setReversed] = useState(false);
  const [currentProductHistory, setCurrentProductHistory] = useState([]);
  const [currentProductName, setCurrentProductName] = useState("");
  const [overlayVisible, setOverlayVisible] = useState(false);
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
      else if(data.type === 'deliverProductHistory'){
        setCurrentProductHistory(data.data);
        setOverlayVisible(true);
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
      {overlayVisible ? <ProductOverlay data={currentProductHistory} productName={currentProductName} closeMenu={() => setOverlayVisible(false)}/> : <></>}
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
          <Product key={product_id} productName={product_id.replace(/_/g," ")} buyPrice={buy_price.toLocaleString()} sellPrice={sell_price.toLocaleString()}
            instaSells={(sell_moving_week / (7*24)).toLocaleString()} instaBuys={(buy_moving_week / (7*24)).toLocaleString()}
            onClick={() => {ws.current.send(JSON.stringify({ type: "getProductHistory", productId: product_id })); setCurrentProductName(product_id.replace(/_/g, " "));}}
          />
        ))}
      </div>
    </>
  )
}

export default App
