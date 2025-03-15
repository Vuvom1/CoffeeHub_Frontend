import { ADD_TO_CART, UPDATE_QUANTITY, REMOVE_FROM_CART, CLEAR_CART } from '../actions/cartActions';

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
    totalAmount: JSON.parse(localStorage.getItem('cartTotalAmount')) || 0,
    totalItems: JSON.parse(localStorage.getItem('cartTotalItems')) || 0,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedItem = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === addedItem.id);
            let updatedItems;

            if (existingItemIndex >= 0) {
                const updatedItem = {
                    ...state.items[existingItemIndex],
                    quantity: state.items[existingItemIndex].quantity + 1,
                };
                updatedItems = [...state.items];
                updatedItems[existingItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat({ ...addedItem, quantity: 1 });
            }

            const updatedTotalAmount = state.totalAmount + addedItem.price;
            const updatedTotalItems = state.totalItems + 1;

            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            localStorage.setItem('cartTotalAmount', JSON.stringify(updatedTotalAmount));
            localStorage.setItem('cartTotalItems', JSON.stringify(updatedTotalItems));

            return {
                ...state,
                items: updatedItems,
                totalAmount: updatedTotalAmount,
                totalItems: updatedTotalItems,
            };

        case UPDATE_QUANTITY:
            const { key, quantity } = action.payload;
            const itemToUpdateIndex = state.items.findIndex(item => item.key === key);
            const itemToUpdate = state.items[itemToUpdateIndex];
            const updatedItem = {
                ...itemToUpdate,
                quantity,
            };
            const updatedItemsQuantity = [...state.items];
            updatedItemsQuantity[itemToUpdateIndex] = updatedItem;            

            const newTotalAmount = updatedItemsQuantity.reduce((acc, item) => acc + item.price * item.quantity, 0);
            const newTotalItems = updatedItemsQuantity.reduce((acc, item) => acc + item.quantity, 0);

            localStorage.setItem('cartItems', JSON.stringify(updatedItemsQuantity));
            localStorage.setItem('cartTotalAmount', JSON.stringify(newTotalAmount));
            localStorage.setItem('cartTotalItems', JSON.stringify(newTotalItems));

            return {
                ...state,
                items: updatedItemsQuantity,
                totalAmount: newTotalAmount,
                totalItems: newTotalItems,
            };

        case REMOVE_FROM_CART:
            const itemId = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === itemId);
            const itemToRemove = state.items[itemIndex];
            let updatedCartItems;

            updatedCartItems = state.items.filter(item => item.id !== itemId);

            const updatedAmount = state.totalAmount - itemToRemove.price;
            const updatedItemsCount = state.totalItems - itemToRemove.quantity;

            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            localStorage.setItem('cartTotalAmount', JSON.stringify(updatedAmount));
            localStorage.setItem('cartTotalItems', JSON.stringify(updatedItemsCount));

            return {
                ...state,
                items: updatedCartItems,
                totalAmount: updatedAmount,
                totalItems: updatedItemsCount,
            };

        case CLEAR_CART:
            localStorage.removeItem('cartItems');
            localStorage.removeItem('cartTotalAmount');
            localStorage.removeItem('cartTotalItems');

            return {
                ...state,
                items: [],
                totalAmount: 0,
                totalItems: 0,
            };

        default:
            return state;
    }
};

export default cartReducer;