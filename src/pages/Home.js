import {Button, Input, message, Modal, Popconfirm, Table} from "antd";
import {useEffect, useState} from "react";
import SecretsService from "../services/secrets.service";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import SecretRecordsService from "../services/secret-records.service";
import APIKey from "../components/APIKey";

const Home = () => {
    const {token} = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [secrets, setSecrets] = useState([]);
    const [error, setError] = useState('');
    const [newSecretModalOpen, setNewSecretModalOpen] = useState(false);
    const [newSecretName, setNewSecretName] = useState('');
    const [newSecretBtnLoading, setNewSecretBtnLoading] = useState(false);
    const [reload, setReload] = useState(1);

    const fetchSecrets = async () => {
        try {
            const response = await SecretsService.getAllByUserId(token);
            setSecrets(response.data);
            setLoading(false);
        } catch (e) {
            setError('An error occurred while fetching secrets.');
            setLoading(false);
        }
    }

    const handleCreateSecret = async () => {
        if (!newSecretName) {
            message.error('Please enter name of the new secret');
            return;
        }

        if (
            newSecretName.includes('/') ||
            newSecretName.includes('&') ||
            newSecretName.includes('?') ||
            newSecretName.includes('\\') ||
            newSecretName.includes('=')
        ) {
            message.error('Name of secret cannot contain the following characters: /, \\, ?, &, =');
            return;
        }

        setNewSecretBtnLoading(true)

        try {
            await SecretsService.create(
                {name: newSecretName},
                token
            )
            message.success('Secret created successfully.');
            setNewSecretModalOpen(false);
            setNewSecretBtnLoading(false);
            setReload(reload + 1);
        } catch (e) {
            setError('An error occurred while creating secrets.');
            setNewSecretBtnLoading(false);
        }
    }

    const handleDeleteSecret = async (id) => {
        try {
            await SecretsService.delete(id, token);
            message.success('Secret deleted successfully.');
            setReload(reload + 1);
        } catch (e) {
            message.error('An error occurred while deleting secret.');
        }
    }

    const SecretsTableColumns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "",
            render: (text, record) => (
                <>
                    <Button
                        onClick={() => navigate(`/secrets/?secretId=${record.id}&secretName=${record.name}`)}
                        type="link"
                        size="small"
                    >View</Button>
                    <Button
                        className='ms-3'
                        type="link"
                        size="small"
                        danger
                    >
                        <Popconfirm
                            title={`Are you sure you want to delete ${record.name}?`}
                            description='All the records associated with this secret will be deleted.'
                            onConfirm={() => handleDeleteSecret(record.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            Delete secret
                        </Popconfirm>
                    </Button>
                </>
            )
        },
    ]

    useEffect(() => {
        fetchSecrets();
    }, [reload]);

    return (
        <div>
            <div className="container mt-5">
                <APIKey />
                <div className="d-flex justify-content-between align-items-center">
                <h1 className='mb-3'>Secrets</h1>
                    <Button
                        type="primary"
                        onClick={() => setNewSecretModalOpen(true)}
                    >
                        Create secret
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
                    dataSource={secrets}
                    columns={SecretsTableColumns}
                    loading={loading}
                    bordered
                />

                <Modal
                    title={'Create new secret'}
                    open={newSecretModalOpen}
                    onCancel={() => setNewSecretModalOpen(false)}
                    okText="Create secret"
                    okButtonProps={{
                        loading: newSecretBtnLoading
                    }}
                    onOk={handleCreateSecret}
                    destroyOnClose
                >
                    <Input
                        placeholder="Enter new secret"
                        onChange={(e) => setNewSecretName(e.target.value)}
                    />
                </Modal>
            </div>
        </div>
    )
}

export default Home;