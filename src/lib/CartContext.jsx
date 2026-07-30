import { createContext, useContext, useMemo, useReducer, useCallback, useState } from "react";
import { byId } from "../data/products.js";

const CartCtx = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const { id, size, hide, qty } = action;
      const i = state.lines.findIndex(l => l.id === id && l.size === size && l.hide === hide);
      const lines = [...state.lines];
      if (i > -1) lines[i] = { ...lines[i], qty: Math.min(9, lines[i].qty + qty) };
      else lines.push({ id, size, hide, qty });
      return { ...state, lines };
    }
    case "setQty": {
      const lines = [...state.lines];
      if (action.qty <= 0) lines.splice(action.index, 1);
      else lines[action.index] = { ...lines[action.index], qty: Math.min(9, action.qty) };
      return { ...state, lines };
    }
    case "remove":
      return { ...state, lines: state.lines.filter((_, i) => i !== action.index) };
    case "clear":
      return { ...state, lines: [] };
    case "toggleFav": {
      const fav = new Set(state.fav);
      fav.has(action.id) ? fav.delete(action.id) : fav.add(action.id);
      return { ...state, fav };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], fav: new Set() });
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((msg) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2600);
  }, []);

  const value = useMemo(() => {
    const count = state.lines.reduce((a, l) => a + l.qty, 0);
    const subtotal = state.lines.reduce((a, l) => {
      const p = byId(l.id);
      return a + (p ? p.price * l.qty : 0);
    }, 0);
    return {
      lines: state.lines, fav: state.fav, count, subtotal, toasts, toast,
      add: (id, size, hide, qty = 1) => {
        dispatch({ type:"add", id, size, hide, qty });
        toast(`${byId(id)?.name} · ${size} added`);
      },
      setQty: (index, qty) => dispatch({ type:"setQty", index, qty }),
      remove: (index) => dispatch({ type:"remove", index }),
      clear:  () => dispatch({ type:"clear" }),
      toggleFav: (id) => { dispatch({ type:"toggleFav", id }); toast(state.fav.has(id) ? "Removed from saved" : "Saved"); }
    };
  }, [state, toasts, toast]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
};
