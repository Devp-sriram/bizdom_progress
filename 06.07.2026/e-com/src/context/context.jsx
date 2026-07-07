import { createContext, useContext, useState, useEffect } from 'react';
import { product } from './globalwrapper';

const ContentContext = createContext();
const ProductContext = createContext();
const OrderContext = createContext();

export const useCart = () => useContext(ContentContext);
export const useProduct = () => useContext(ProductContext);
export const useOrder = () => useContext(OrderContext);

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || product)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])

   useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders])

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products])

  return (
    <ContentContext.Provider value={{ cart, setCart }}>
      <ProductContext.Provider value={{ products, setProducts }}>
        <OrderContext.Provider value={{ orders, setOrders }}>
          {children}
        </OrderContext.Provider>
      </ProductContext.Provider>
    </ContentContext.Provider>
  );
};
