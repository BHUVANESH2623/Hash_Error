import {  useEffect, useState } from 'react';
import './leftbar.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';

export const Leftbar=()=>{
   
    const [cats,setCats]=useState([]);
    

    useEffect(()=>{
        try{
            const fetchCats=async()=>{
                const res=await axios.get('http://localhost:8080/api/cats');
                const arraydata=Object.values(res.data);
                setCats(arraydata);
            }

            fetchCats();
        }
        catch(err){
            console.log(err);
        }
    },[])
    return (
        <div className="leftbar">
            <div className="cat">
                {cats.map((catagory,index)=>(
                    <ul key={index}>
                        <Link className='link' to={`/?cat=${catagory.cat}`}>
                            <li>
                                {catagory.cat}
                            </li>
                        </Link>
                    </ul>
                ))}
            </div>
        </div>
    )
}