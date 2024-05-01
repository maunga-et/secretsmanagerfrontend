import React, {useEffect, useState} from 'react';
import {Button, Card, Input, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import UsersService from "../services/users.service";

function Register(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [isLoginBtnDisabled, setIsLoginBtnDisabled] = useState(true);
    const [isLoginBtnLoading, setIsLoginBtnLoading] = useState(false);

    const handleRegister = async () => {
        if (password !== passwordConfirm) {
            message.error('Passwords do not match');
            return;
        } else if (password.length < 8) {
            message.error('Password must contain at least 8 characters');
            return;
        }

        setIsLoginBtnDisabled(true);
        setIsLoginBtnLoading(true);
        try {
            await UsersService.create({
                username,
                password,
                email
            })
            message.success("Account created successfully, please login");
            navigate('/login');
        } catch (e) {
            setIsLoginBtnDisabled(false);
            setIsLoginBtnLoading(false);
            if (e.response && e.response.status === 400) {
                if (e.response.data.username) {
                    message.error(e.response.data.username[0]);
                }
                if (e.response.data.email) {
                    message.error(e.response.data.email[0]);
                }
            } else {
                message.error('Please check your internet connection');
            }
        }
    }

    useEffect(() => {
        if (password === '' || username === '' || passwordConfirm === '' || email === '') {
            setIsLoginBtnDisabled(true);
        } else {
            setIsLoginBtnDisabled(false);
        }
    }, [
        username,
        password,
        passwordConfirm,
        email
    ]);

    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <Card style={{width: '450px'}} className='pb-5 bg-light'>
                <h1 className='text-center mb-3'>Secrets Manager</h1>
                <h3 className='text-center mb-5'>Register</h3>
                <div className='mb-3'>
                    <Input
                        size={"large"}
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <Input
                        size={"large"}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
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
                    <Input
                        type='password'
                        size={"large"}
                        placeholder='Confirm password'
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <Button
                        type={"primary"}
                        size='large'
                        disabled={isLoginBtnDisabled}
                        loading={isLoginBtnLoading}
                        onClick={handleRegister}
                        block
                    >Register</Button>
                </div>
                <div>
                    <Link to="/login">Login</Link>
                </div>
            </Card>
        </div>
    );
}

export default Register;