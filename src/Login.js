import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('/api/login', {username, password});
            console.log("response", response);
            console.log(response.data);
            if(response.data){
                //success
                console.log('Login successful');
                navigate('/directory', {state: {employee_id: response.data.employee_id, access_level: response.data.access_level}});
                
            }
        } catch(error) {
            setLoginError(true);
            console.log('Error Occurred: ', error);
            console.log('Invalid username or password');
        }
        
    };

    return (
        <div className="login-page">
            <img className="logo" src="https://res.cloudinary.com/value-penguin/image/upload/c_limit,dpr_1.0,f_auto,h_1600,q_auto,w_1600/v1/referral_logos/us/insurance/travelers-2"/>
            <p className="tm">Create by Justin Nicholas & Alondra Torres</p>
            <div className="login-image-container">
                <img className="login-image" src="https://i0.wp.com/www.washingtoninformer.com/wp-content/uploads/2018/02/E7B43ECF-CBE7-4464-9A0D-3902BAEAF5F7.jpeg?resize=524%2C600&ssl=1" alt="Umbrella image" />
            </div>
            <div className="login-form-container">
            <div className="login-form-text">
            <h1 className="welcome">Welcome!</h1>
            <p>Log in to find your fellow Travelers.</p>
            <form onSubmit={handleLogin} className="login-container">
              <div >
                {/* <label className="login-label" htmlFor="username">Username:</label> */}
                {/* <br/> */}
                <input
                placeholder="Username"
                className="login-input"
                type = "text"
                id = "username"
                value = {username}
                onChange = {(e) =>
                setUsername(e.target.value)} />
                </div>
                <div> 
                    {/* <label className="login-label" htmlFor='password'>Password: </label> */}
                {/* <br/> */}
                <input 
                placeholder="Password"
                className="login-input"
                type= "password"
                id = "password"
                value = {password}
                onChange= {(e) => 
                setPassword(e.target.value)} />
                </div>
                {loginError && <p> Invalid username or password. Please try again.</p>}
                <button className="login-button" type = "submit">Login</button>  
            </form>
            </div>
            </div>
        </div>
    );
};

export default Login;