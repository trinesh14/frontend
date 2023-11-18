
import { createContext, useState } from "react";


export const Context = createContext();

const AppContext = ({ children }) => {
    const [categories, setCategories] = useState();
    const [showCart, setShowCart] = useState(false);
   








    return (
        <Context.Provider
            value={{
                categories,
                setCategories,
                showCart,
                setShowCart,

            }}
        >
            {children}
        </Context.Provider>
    );
};

export default AppContext;
