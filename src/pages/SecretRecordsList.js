import useAuth from "../hooks/useAuth";
import {useEffect, useState} from "react";
import SecretRecordsService from "../services/secret-records.service";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {Button, Input, message, Modal, Table} from "antd";

const SecretRecordsList = () => {
    const [getSearchParams, setSearchParams] = useSearchParams();
    const {token} = useAuth();
    const navigate = useNavigate();
    const [secretRecords, setSecretRecords] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [newRecordModalOpen, setNewRecordModalOpen] = useState(false);
    const [newRecordKey, setRecordKey] = useState('');
    const [newRecordValue, setRecordValue] = useState('');
    const [newSecretBtnLoading, setNewSecretBtnLoading] = useState(false);
    const [reload, setReload] = useState(1);

    const fetchSecretRecords = async () => {
        try {
            const response = await SecretRecordsService.getAllBySecretId(
                getSearchParams.get('secretId'),
                token
            )
            setSecretRecords(response.data);
            setLoading(false);
        } catch (e) {
            setError('An error occurred while fetching secret records.');
            setLoading(false);
        }
    }

    const handleCreateRecord = async () => {
        if (!newRecordKey) {
            message.error('Please enter record key');
            return;
        }

        if (!newRecordValue) {
            message.error('Please enter record value');
            return;
        }

        setNewSecretBtnLoading(true)

        try {
            await SecretRecordsService.create({
                secret: getSearchParams.get('secretId'),
                key: newRecordKey,
                value: newRecordValue
            },
                token
            )
            message.success('Record created successfully.');
            setNewRecordModalOpen(false);
            setNewSecretBtnLoading(false);
            setReload(reload + 1);
        } catch (e) {
            setError('An error occurred while adding record');
            setNewSecretBtnLoading(false);
        }
    }

    const handleDeleteRecord = async (id) => {
        try {
            await SecretRecordsService.delete(id, token);
            message.success('Record deleted successfully.');
            setReload(reload + 1);
        } catch (e) {
            message.error('An error occurred while deleting record.');
        }
    }

    const SecretRecordsTableColumns = [
        {
            title: "Name",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Value",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "",
            render: (text, record) => <Button
                onClick={() => handleDeleteRecord(record.id)}
                type="link"
                size="small"
                danger
            >Delete</Button>
        },
    ]

    useEffect(() => {
        fetchSecretRecords();
    }, [reload]);

    return (
        <div className="container mt-5">
            <Link className='mb-3' to='/'>Home</Link>
            <div className="d-flex justify-content-between align-items-center">
                <h1 className='mb-3'>{getSearchParams.get('secretName')}</h1>
                <Button
                    type="primary"
                    onClick={() => setNewRecordModalOpen(true)}
                >
                    Add record
                </Button>
            </div>
            {
                error && (
                    <div className="alert alert-danger">
                        <p className='m-0'>{error}</p>
                    </div>
                )
            }
            <Table
                size={"small"}
                dataSource={secretRecords}
                columns={SecretRecordsTableColumns}
                loading={loading}
                bordered
            />

            <Modal
                title={'Create new secret record'}
                open={newRecordModalOpen}
                onCancel={() => setNewRecordModalOpen(false)}
                okText="Add record"
                okButtonProps={{
                    loading: newSecretBtnLoading
                }}
                onOk={handleCreateRecord}
                destroyOnClose
            >
                <div className='mb-3'>
                    <Input
                        placeholder="Key"
                        onChange={(e) => setRecordKey(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <Input
                        placeholder="Value"
                        onChange={(e) => setRecordValue(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default SecretRecordsList;