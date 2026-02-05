import { createSlice } from "@reduxjs/toolkit";

const getUserId = () => {
    try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        return user ? (user._id || user.id || "guest") : "guest";
    } catch (e) {
        return "guest";
    }
};

const items =
    localStorage.getItem(`cartItems_${getUserId()}`) !== null
        ? JSON.parse(localStorage.getItem(`cartItems_${getUserId()}`))
        : [];

const totalAmount =
    localStorage.getItem(`totalAmount_${getUserId()}`) !== null
        ? JSON.parse(localStorage.getItem(`totalAmount_${getUserId()}`))
        : 0;

const totalQuantity =
    localStorage.getItem(`totalQuantity_${getUserId()}`) !== null
        ? JSON.parse(localStorage.getItem(`totalQuantity_${getUserId()}`))
        : 0;

const setItemFunc = (item, totalAmount, totalQuantity) => {
    const userId = getUserId();
    localStorage.setItem(`cartItems_${userId}`, JSON.stringify(item));
    localStorage.setItem(`totalAmount_${userId}`, JSON.stringify(totalAmount));
    localStorage.setItem(`totalQuantity_${userId}`, JSON.stringify(totalQuantity));
};

const initialState = {
    cartItems: items,
    totalQuantity: totalQuantity,
    totalAmount: totalAmount,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        // =========== add item ============
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );
            state.totalQuantity++;

            if (!existingItem) {
                // ===== note: if you use react-redux you should not mute state array element instead you can carry use push
                state.cartItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    image01: newItem.image01,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice =
                    Number(existingItem.totalPrice) + Number(newItem.price);
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );

            setItemFunc(
                state.cartItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
            );
        },

        // ========= remove item ========

        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);
            state.totalQuantity--;

            if (existingItem.quantity === 1) {
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice =
                    Number(existingItem.totalPrice) - Number(existingItem.price);
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );

            setItemFunc(
                state.cartItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
            );
        },

        // ============= delete item ===========

        deleteItem(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
                state.totalQuantity = state.totalQuantity - existingItem.quantity;
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );

            setItemFunc(
                state.cartItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
            );
        },

        clearCart(state) {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            // Note: We don't necessarily want to call setItemFunc here 
            // as we are likely switching users.
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
