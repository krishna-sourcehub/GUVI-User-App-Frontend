import axios from 'axios';
import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import API_URL from '../../config/global';
import "../css/Login.css";
const Login = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function ValidateEmail(mail) {
        console.log('Email validation called');
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    const checkPassword = (password) => {
        if (password.length < 8) {
            alert('Password must have at least 8 characters.');
            return false;
        }


        console.log('Password is valid!');
        return true;
    };


    function multifunctioncall(e) {
        e.preventDefault();
    
        const isValid =
            ValidateEmail(formData.email) &&
            checkPassword(formData.password)
            
        if (isValid) {
            console.log('All validations passed. Proceeding with logic...');
            handleSubmit();
        } else {
            console.log('Validation failed. Check console for details.');
        }
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        // console.log(formData);
        try {
            const response = await axios.post(`${API_URL}/login`, formData);
            // console.log(response);
            if (response.data === "Invalid User name or Password") {
                alert("Invalid User name or Password");
            }else if(response.data ==="Server Busy"){
                alert(" verify your email id")
            }else if(response?.status){
                localStorage.setItem("userInfo",JSON.stringify(response.data));
                navigate("/Profile");
            }
        } catch (error) {
            console.error("Error during Registration:", error);
        }

    };

    return (
        <Container>
            <h1>Login</h1>
            <Form onSubmit={multifunctioncall}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                </Form.Group>
                <Link to="/ForgotPassword">Forgot Password?</Link>
                <Button variant='primary' type='submit'>Login</Button>
                <p>You don't have an account? <Link to="/SignUp">Signup</Link></p>
                
                
            </Form>
        </Container>
    );
}

export default Login;
