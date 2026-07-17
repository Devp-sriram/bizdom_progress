import { createContext, useContext, useState, useEffect } from "react";
import data from '../utils/data.json'
const ProductContext = createContext('');
const CartContext = createContext('');

export const useProduct = () => useContext(ProductContext);
export const useCart = () => useContext(CartContext);

export const AppProvider = ({ children }) => {
    const [products, setProducts] = useState(data.products || []);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    useEffect(() => {
        products.length > 0 && localStorage.setItem('products', JSON.stringify(products))
    }, [products]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]);

    return <ProductContext.Provider value={{ products, setProducts }}>
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    </ProductContext.Provider>
}