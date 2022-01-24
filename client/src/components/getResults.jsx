import { useEffect, useState } from "react";
import axios from "axios";

const GetResults = (pageNumber) => {
    useEffect(() => {
        axios({
            method: 'GET',
            url: '/api/results',
            params: { page: pageNumber }
        }).then(res => {
            console.log(res.data);
        });
    }, [pageNumber]);
    return null;
}
 
export default GetResults;