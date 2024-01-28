import axios from 'axios';
import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import API_URL from '../../config/global';
import "../css/SignUp.css";
const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        repeatpassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    function validname(name) {
        console.log('Sender Name validation called');
        const isValidInput = /^[a-zA-Z ]+$/.test(name);

        if (isValidInput) {
            // Proceed with your logic for a valid input
            console.log('Input Name is a valid Name');
            return true;
        } else {
            // Handle the case for an invalid input
            alert('Enter a Name using only Alphabets ');
            // You can show an error message or take other actions
        }
    }

    function ValidateEmail(mail) {
        console.log('Email validation called');
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    const checkPassword = (password) => {
        // Check if the password has at least 8 characters
        if (password.length < 8) {
            alert('Password must have at least 8 characters.');
            return false;
        }

        // Check if the password contains at least one number
        if (!/\d/.test(password)) {
            alert('Password must contain at least one number.');
            return false;
        }

        // Check if the password contains at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            alert('Password must contain at least one uppercase letter.');
            return false;
        }

        // Check if the password contains at least one special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            alert('Password must contain at least one special character.');
            return false;
        }

        console.log('Password is valid!');
        return true;
    };

    function matchPassword() {
        if (formData.password === formData.repeatpassword) {
            return true;
        }
        else {
            alert("Password and Confirm Password are not Match");
        }
    }
    function multifunctioncall(e) {
        e.preventDefault(); 
    
        const isValid =
            validname(formData.name) &&
            ValidateEmail(formData.email) &&
            checkPassword(formData.password) &&
            matchPassword();
    
        if (isValid) {
            console.log('All validations passed.');
            handleSubmit();
        } else {
            console.log('Validation failed.');
        }
    }


    const handleSubmit = async (e) => {
        console.log(formData);
        try {
            const response = await axios.post(`${API_URL}/signin/verify`, formData);
            if (response.data && response.data.message !== undefined) {
                const messageValue = response.data.message;

                if (messageValue === true) {
                    alert("Registeration Link Sent to your Email Id");
                    console.log("Registeration Link Sent to your Email Id");
                    navigate("/");
                } else {
                    console.log("Email already exists. Registration failed.");
                    alert("Email already exists. Registration failed.");
                }
            } else {
                console.error("Unexpected response format:", response);
            }
        } catch (error) {
            console.error("Error during Registration:", error);
        }

    };


    return (
        <Container>
            <h1>Sign Up</h1>
            <Form onSubmit={multifunctioncall}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange}
                    required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="repeatpassword" value={formData.repeatpassword} onChange={handleChange}required />
                    
                </Form.Group>

                <Button variant='primary' type='submit'>Register</Button>
                <p>Already have an account? <Link to="/">Login</Link></p>

            </Form>
        </Container>
    );
}

export default SignUp;
