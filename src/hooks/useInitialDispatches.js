import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../store/products/productSlice";
import { fetchCategories } from "../store/category/categorySlice";
import { getsubcategories } from "../store/subcategory/subcategorySlice";
import { fetchSections } from "../store/featuredproduct/featuredProductSlice";
import { fetchReviews } from "../store/reviews/reviewsSlice";
import { fetchUserData } from "../store/users/userSlice";
import { getOrders } from "../store/orders/ordersSlice";
import { fetchTaxData } from "../store/settings/taxsettings/taxsettingsSlice";

// Function to validate token
// const isTokenValid = (token) => {
//   // Simple check: return false if token is not present
//   if (!token) return false;

//   // You can add more complex checks here, such as token expiration
//   return true;
// };

const useInitialDispatches = () => {
  const dispatch = useDispatch();
  //   const token = useSelector((state) => state.auth.token);
  dispatch(fetchReviews());
  
  useEffect(() => {
    // Dispatch global thunks
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchUserData());
    dispatch(getsubcategories());
    dispatch(fetchTaxData());
    dispatch(getOrders());
    dispatch(fetchSections());
  }, [dispatch]);
};

export default useInitialDispatches;

