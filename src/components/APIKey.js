import ApiKeysService from "../services/api-keys.service";
import useAuth from "../hooks/useAuth";
import {useEffect, useState} from "react";
import {Button} from "antd";

const APIKey = () => {
    const {token} = useAuth();
    const [key, setKey] = useState('');
    const [error, setError] = useState('');
    const [reload, setReload] = useState(1);

    const fetchApiKey = async () => {
        try {
            const response = await ApiKeysService.get(token);
            setKey(response?.data[0]?.key);
        } catch (e) {
            setError('An error occurred while fetching api keys.');
        }
    }

    const handleGenerateAPIKey = async () => {
        try {
            await ApiKeysService.create(token);
            setReload(reload + 1);
        } catch (e) {
            setError('An error occurred while creating api key.');
        }
    }

    useEffect(() => {
        fetchApiKey();
    }, [reload]);

    return (
        <>
            {
                error && (
                    <div className="alert alert-danger">
                        <p className='m-0'>{error}</p>
                    </div>
                )
            }

            <div className='mb-2'>
                <p className='mb-1'>API Key</p>
                <p className='mb-1 text-muted bg-light-subtle py-2 rounded-2'>
                    {
                        key ? key : (
                            <Button
                                onClick={handleGenerateAPIKey}
                                size={"small"}
                                type={"primary"}
                            >
                                Generate key
                            </Button>
                        )
                    }
                </p>
            </div>
        </>
    )
}

export default APIKey;