import { Card, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSections } from "../../store/featuredproduct/featuredProductSlice";
import DataTableListing from "../../components/table/DataTableListing";

const FeaturedProduct = () => {
    const dispatch = useDispatch();
    const { sections, loading, error } = useSelector(state => state.featuredproduct);
    const [featuredproductData, setFeaturedproductData] = useState([]);
    const [featuredproductChange, setFeaturedproductChange] = useState(false);

    const featuredproductChanged = (e) => {
        setFeaturedproductChange(e);
    };

    // Update the data when sections change
    useEffect(() => {
        dispatch(fetchSections());
        setFeaturedproductChange(false);
    }, [dispatch, featuredproductChange]);

    useEffect(() => {
        if (sections?.success) {
            setFeaturedproductData(sections.sections);
        }
    }, [sections]);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <Card>
            <CardBody>
                <DataTableListing
                    pageName="featured product"
                    tableData={featuredproductData}
                    changeData={featuredproductChanged}
                />
            </CardBody>
        </Card>
    );
};

export default FeaturedProduct;
