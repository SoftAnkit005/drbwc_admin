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
const isTokenValid = (token) => {
  if (!token) return false; // If token is not present, return false

  // You can add more validation logic, such as token expiration check
  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decoding JWT token
    const currentTime = Math.floor(Date.now() / 1000);
    if (tokenPayload.exp && tokenPayload.exp < currentTime) {
      return false; // Token is expired
    }
    return true;
  } catch (error) {
    console.error("Invalid token format", error);
    return false;
  }
};

const useInitialDispatches = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authAdminToken");

  // Check if token is valid
  useEffect(() => {
    if (isTokenValid(token)) {
      console.log("Token is valid");

      // Dispatch global thunks if the token is valid
      dispatch(fetchProducts());
      dispatch(fetchCategories());
      dispatch(fetchUserData());
      dispatch(getsubcategories());
      dispatch(fetchTaxData());
      dispatch(getOrders());
      dispatch(fetchSections());
      dispatch(fetchReviews());
    } else {
      console.log("Token is invalid or not found");
      // Clear the token from localStorage if invalid
      localStorage.removeItem("authAdminToken");
    }
  }, [dispatch, token]);
};

export default useInitialDispatches;
