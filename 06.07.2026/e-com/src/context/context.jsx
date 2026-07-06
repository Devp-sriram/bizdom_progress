import { createContext, useContext, useState , useEffect } from 'react';

const ContentContext = createContext();

export const useCart = () => useContext(ContentContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart'))||[]);

  useEffect(()=>{
    localStorage.setItem("cart" , JSON.stringify(cart));
  },[cart])

  return (
    <ContentContext.Provider value={{ cart, setCart }}>
      {children}
    </ContentContext.Provider>
  );
};
