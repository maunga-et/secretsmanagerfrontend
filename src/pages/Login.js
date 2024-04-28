import React, {useEffect, useState} from 'react';
import {Button, Card, Input, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import AuthenticationService from "../services/authentication.service";
import useAuth from "../hooks/useAuth";

function Login(props) {
    const {setToken} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginBtnDisabled, setIsLoginBtnDisabled] = useState(true);
    const [isLoginBtnLoading, setIsLoginBtnLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoginBtnDisabled(true);
        setIsLoginBtnLoading(true);
        try {
            const response = await AuthenticationService.login({
                username,
                password
            })
            setToken(response.data.access);
            message.success("Login successfull");
            navigate('/');
        } catch (e) {
            setIsLoginBtnDisabled(false);
            setIsLoginBtnLoading(false);
            if (e.response && e.response.status === 401) {
                message.error('Access denied!');
                return;
            } else {
                message.error('Please check your internet connection');
            }
        }
    }

    useEffect(() => {
        if (password === '' || username === '') {
            setIsLoginBtnDisabled(true);
        } else {
            setIsLoginBtnDisabled(false);
        }
    }, [username, password]);

    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <Card style={{ width: '450px' }} className='pb-5 bg-light'>
                <h1 className='text-center mb-5'>Secrets Manager</h1>
                <div className='mb-3'>
                    <Input
                        size={"large"}
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <Input
                        type='password'
                        size={"large"}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <Button
                        type={"primary"}
                        size='large'
                        disabled={isLoginBtnDisabled}
                        loading={isLoginBtnLoading}
                        onClick={handleLogin}
                        block
                    >Login</Button>
                </div>
                <div>
                    <Link to="/register">Create an account</Link>
                </div>
            </Card>
        </div>
    );
}

export default Login;