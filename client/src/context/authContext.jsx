import { createContext, useEffect, useState} from "react";
import axios from 'axios';


export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("user"))||null);

    const login=async(inputs)=>{
        const res=await axios.post('http://localhost:8080/api/auth/login',inputs,{
                withCredentials:"true",
            });
            setCurrentUser(res.data);
    };
    const logout=async()=>{
        try{
            await axios.post("http://localhost:8080/api/auth/logout");
            setCurrentUser(null);
        }catch(err){
            console.log(err);
        }
    }

    const [search,setSearch]=useState("");
    const [qSearch,setQSearch]=useState("");


    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser])

    return (
        <AuthContext.Provider value={{currentUser,login,logout,search,setSearch,qSearch,setQSearch}}>
            {children}
        </AuthContext.Provider>
    )
}