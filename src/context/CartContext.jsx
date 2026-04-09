import { createContext, useContext, useReducer, useMemo } from "react";

const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.items[action.item.id];
      const qty = (existing?.qty || 0) + (action.qty || 1);
      return { ...state, items: { ...state.items, [action.item.id]: { item: action.item, qty } } };
    }
    case "REMOVE": {
      const copy = { ...state.items };
      delete copy[action.id];
      return { ...state, items: copy };
    }
    case "SET_QTY": {
      const copy = { ...state.items };
      if (action.qty <= 0) delete copy[action.id];
      else copy[action.id] = { ...copy[action.id], qty: action.qty };
      return { ...state, items: copy };
    }
    case "CLEAR": return { items: {} };
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: {} });

  const total = useMemo(() => {
    return Object.values(state.items).reduce((sum, { item, qty }) => sum + item.price * qty, 0);
  }, [state.items]);

  const value = {
    items: state.items,
    total,
    addToCart: (item, qty = 1) => dispatch({ type: "ADD", item, qty }),
    removeFromCart: (id) => dispatch({ type: "REMOVE", id }),
    setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
