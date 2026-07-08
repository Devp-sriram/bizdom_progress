import { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();
const ProductContext = createContext();
const OrderContext = createContext();

export const useUser = () => useContext(ContentContext);
export const useProduct = () => useContext(ProductContext);
export const useOrder = () => useContext(OrderContext);

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || []);

  useEffect(() => {
    users.length > 0 && localStorage.setItem("users", JSON.stringify(users));
  }, [users])

  useEffect(() => {
    orders.length > 0 && localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders])

  useEffect(() => {
    products.length > 0 && localStorage.setItem("products", JSON.stringify(products));
  }, [products])

  useEffect(() => {
    if (!localStorage.getItem('users')) {
      fetch('https://dummyjson.com/users?select=id,firstName,lastName,email,phone,address').then(res => res.json()).then(res => setUsers(res.users))
    }
  }, [])

  useEffect(() => {
    //id,images,title,brand,category,stock
    if (!localStorage.getItem('products')) {
      fetch('https://dummyjson.com/products?select=id,images,title,brand,category,stock,price').then(res => res.json()).then(res => setProducts(res.products))
    }
  }, [])

  return (
    <ContentContext.Provider value={{ users, setUsers }}>
      <ProductContext.Provider value={{ products, setProducts }}>
        <OrderContext.Provider value={{ orders, setOrders }}>
          {children}
        </OrderContext.Provider>
      </ProductContext.Provider>
    </ContentContext.Provider>
  );
};
