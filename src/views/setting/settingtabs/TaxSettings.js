import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody } from "reactstrap"
import DataTableListing from "../../../components/table/DataTableListing"
import { fetchTaxData } from "../../../store/settings/taxsettings/taxsettingsSlice";

const TaxSettings = () => {
    const dispatch = useDispatch();
    const { taxes, loading, error } = useSelector((state) => state.taxes);
    const [taxData, setTaxData] = useState([]);
    const [taxChange, setTaxChange] = useState(false);

    const taxChanged = (e) => {
        setTaxChange(e);
    };

    useEffect(() => {
        dispatch(fetchTaxData());
        setTaxChange(false);
    }, [dispatch, taxChange]);

    useEffect(() => {
        if (taxes?.success) {
            setTaxData(taxes.taxes);
        }
    }, [taxes]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Card>
            <CardBody>
                <DataTableListing pageName="tax" tableData={taxData} changeData={taxChanged} />
            </CardBody>
        </Card>
    )
}

export default TaxSettings