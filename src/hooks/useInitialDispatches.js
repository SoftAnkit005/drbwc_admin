import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../store/products/productSlice";
import { fetchCategories } from "../store/category/categorySlice";
import { getsubcategories } from "../store/subcategory/subcategorySlice";

// Function to validate token
// const isTokenValid = (token) => {
//   // Simple check: return false if token is not present
//   if (!token) return false;

//   // You can add more complex checks here, such as token expiration
//   return true;
// };

const useInitialDispatches = () => {
  const dispatch = useDispatch();
  dispatch(fetchCategories());
  dispatch(getsubcategories());
//   const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Dispatch global thunks
    dispatch(fetchProducts());
  }, [dispatch]);
};

export default useInitialDispatches;

