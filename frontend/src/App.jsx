import Product from './components/Product/Product';
import './index.css';
import './App.css'
import { useState } from 'react';

function App() {
  const [selectedSort, setSelectedSort] = useState("Coins per hour");
  const [reversed, setReversed] = useState(false);

  function setSort(curSort){
    setSelectedSort(curSort);
  }
  function toggleReversed(){
    setReversed(!reversed);
  }

  return (
    <>
      <div className='sort-container'>
        <select name="" id="" className='sort-select' value={selectedSort} onChange={(e) => setSort(e.target.value)}>
          <option>Coins per hour</option>
          <option>Margin</option>
          <option>Margin %</option>
          <option>Instabuys</option>
          <option>Instasells</option>
          <option>Buy order price</option>
          <option>Sell order price</option>
        </select>
        <button className='sort-reverse-button' onClick={() => toggleReversed()}>{reversed ? "⬆" : "⬇"}</button>
      </div>
      <div className='product-container'>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
      </div>
    </>
  )
}

export default App
