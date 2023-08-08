import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

const useMakeRequest = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const makeRequest = async (body: any, url: any, type = 'get') => {
        try {
            setLoading(true);
            setError(null);

            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const requestUrl = `${apiUrl}${url}`;
            const isUserLoginToken = localStorage.getItem("isUserLoginToken");

            const config = {
                headers: { Authorization: `Bearer ${isUserLoginToken}` }
            };

            let response;
            if (type === 'get') {
                response = await axios.get(requestUrl, config);
            } else if (type === 'post') {
                response = await axios.post(requestUrl, body, config);
            } else if (type === 'put') {
                response = await axios.put(requestUrl, body, config);
            } else if (type === 'delete') {
                response = await axios.delete(requestUrl, config);
            } else {
                throw new Error('Invalid HTTP method provided');
            }

            setData(response.data);
            setLoading(false);
            return response.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
            console.log("errrrrrrrrrrrrrrrrrrrrrrrr", error?.response?.data);

            setError(error);
            setLoading(false);
            throw error;
        }
    };

    return { loading, data, error, makeRequest };
};

export default useMakeRequest;
