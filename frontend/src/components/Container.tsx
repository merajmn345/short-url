import * as React from "react";
import FormContainer from "./FormContainer";
import { UrlData } from "../interface/UrlData";
import { serverUrl } from "../helpers/constants";
import axios from "axios";
import DataTable from "./DataTable";

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {
    const [data, setData] = React.useState<UrlData[]>([]);
    const [reload, setReload] = React.useState<boolean>(false);

    const updateReloadState = (): void => {
        setReload(true);
    };
    const fetchTableData = async () => {
        const response = await axios.get(`${serverUrl}/shortUrl`);
        console.log("Response from server is: ", response);
        setData(response.data);
        setReload(false);
    };

    React.useEffect(() => {
        fetchTableData();
    }, [reload]);
    return (
        <div className="">
            <FormContainer updateReloadState={updateReloadState} />
            <DataTable updateReloadState={updateReloadState} data={data} />
        </div>
    );
};

export default Container;
