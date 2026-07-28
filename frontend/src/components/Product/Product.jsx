import './Product.css';

function Product({ productName, buyPrice, sellPrice, instaBuys, instaSells, coinsPerHour, onClick }){
    return(
        <div className='product' onClick={onClick}>
            <h3 className='product-title'>{productName}</h3>
            <h4>Buy price: ${buyPrice}</h4>
            <h4>Sell price: ${sellPrice}</h4>
            <h4>Daily instabuys: {instaBuys}</h4>
            <h4>Daily instasells: {instaSells}</h4>
            <h4>Coins per hour: ${coinsPerHour}</h4>
        </div>
    );
}

export default Product;
