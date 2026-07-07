import { createContext, useContext, useState, useEffect } from 'react';
import { product } from './globalwrapper';

const ContentContext = createContext();
const ProductContext = createContext();

export const useCart = () => useContext(ContentContext);
export const useProduct = () => useContext(ProductContext);

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || product)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products])

  return (
    <ContentContext.Provider value={{ cart, setCart }}>
      <ProductContext.Provider value={{ products, setProducts }}>
        {children}
      </ProductContext.Provider>
    </ContentContext.Provider>
  );
};
