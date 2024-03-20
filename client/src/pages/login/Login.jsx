import {Link, useNavigate} from 'react-router-dom'
import './login.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';

export const Login=()=>{
    const {login}=useContext(AuthContext);
    const [err,setErr]=useState(null);
    const [inputs,setInputs]=useState({
        email:"",
        password:""
    })
    const handleInput=(e)=>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const navigate=useNavigate();

    const handleClick=async(e)=>{
        e.preventDefault();
        try{
            await login(inputs);
            navigate('/');
        }catch(err){
           setErr(err.response.data);
        }
    }
    return (
        <div className="login">
            <Link style={{color:"inherit",textDecoration:"none"}} to={'/'}><button className='close'>X</button></Link>
            <div className="container">
                <div className="right">
                    <h1>Sign In</h1>
                    <form action="">
                        <input type="email" placeholder="email" required name='email' onChange={handleInput}/>
                        <input type="password" placeholder="password" required name='password' onChange={handleInput}/>
                        <button onClick={handleClick}>Submit</button>
                        {err && <p>{err}</p> }
                        <span>Don't have an account?  &nbsp; 
                        <Link to={'/register'} style={{textDecoration:"",color:"inherit"}}>Sign Up</Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}