// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductVariant } from '../entities/product';

interface CartItem {
  id: string; // product id
  name: string;
  price: number | null;
  quantity: number;
  image?: string | null;
  variant?: ProductVariant | null;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (i) => i.id === action.payload.id && i.variant?.id === action.payload.variant?.id
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string; variantId?: string }>) => {
      state.items = state.items.filter(
        (i) => !(i.id === action.payload.id && i.variant?.id === action.payload.variantId)
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; variantId?: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (i) => i.id === action.payload.id && i.variant?.id === action.payload.variantId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
