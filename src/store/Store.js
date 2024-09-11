import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import ChatsReducer from './apps/chat/ChatSlice';
import TicketReducer from './apps/ticket/TicketSlice';
import loginReducer from './auth/loginSlice';
import registerReducer from './auth/registerSlice';
import productReducer from './products/productSlice';
import categoryReducer from './category/categorySlice';
import attributeReducer from './attributes/attributeSlice';
import bannersReducer from './banner/bannerSlice';
import ordersReducer from './orders/ordersSlice';
import subcategoryReducer from './subcategory/subcategorySlice';
import tagsReducer from './tags/tagsSlice';
import reviewsReducer from './reviews/reviewsSlice';
import fileUploadReducer from './fileupload/fileUploadSlice';
import featuredproductReducer from './featuredproduct/featuredProductSlice';
import couponReducer from './coupons/couponSlice';
import userReducer from './users/userSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    products: productReducer,
    categories: categoryReducer,
    attribute: attributeReducer,
    banners: bannersReducer,
    orders: ordersReducer,
    subcategories: subcategoryReducer,
    tags: tagsReducer,
    reviews: reviewsReducer,
    fileUpload: fileUploadReducer,
    featuredproduct: featuredproductReducer,
    coupons: couponReducer,
    users: userReducer,



    customizer: CustomizerReducer,
    chatReducer: ChatsReducer,
    ticketReducer: TicketReducer,
  },
});

export default store;
