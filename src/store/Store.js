import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import ChatsReducer from './apps/chat/ChatSlice';
import TicketReducer from './apps/ticket/TicketSlice';
import loginReducer from './auth/loginSlice';
import registerReducer from './auth/registerSlice';
import productReducer  from './products/productSlice';
import categoryReducer from './category/categorySlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    products: productReducer ,
    categories: categoryReducer,



    customizer: CustomizerReducer,
    chatReducer: ChatsReducer,
    ticketReducer: TicketReducer,
  },
});

export default store;
