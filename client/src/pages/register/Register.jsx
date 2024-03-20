import { Link, useNavigate } from "react-router-dom"
import './register.scss'
import { useState } from "react"
import axios from 'axios';


export const Register=()=>{
    const [inputs,setInputs]=useState({
        username:"",
        email:"",
        password:""
    })
    const navigate=useNavigate();
    const handleInput=(e)=>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleClick=async(e)=>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8080/api/auth/register",inputs);
            navigate('/login');
        }catch(err){
            console.log(err.response.message);
        }
    }
    return (
        <div className="register">
            <Link style={{color:"inherit",textDecoration:"none"}} to={'/'}><button className='close'>X</button></Link>
            <div className="container">
                <h1>Sign Up</h1>
                <form action="">
                    <input type="text" placeholder="username" required name="username" onChange={handleInput}/>
                    <input type="email" placeholder="email" required name="email" onChange={handleInput} />
                    <input type="password" placeholder="password" required name="password" onChange={handleInput} />
                    <button onClick={handleClick}>Submit</button>
                    {/* <p>There is an err</p> */}
                    <span>Do have an account?
                        &nbsp;
                        <Link to={'/login'} style={{color:"inherit",textDecoration:""}}>Sign In</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}