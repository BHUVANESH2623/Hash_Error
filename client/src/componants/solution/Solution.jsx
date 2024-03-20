import { useEffect, useState } from 'react';
import './solution.scss';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';

export const Solution=()=>{
    const [solutions,setSolutions]=useState([]);
    const location=useLocation();
    const postId=location.pathname.split('/')[2];
    useEffect(()=>{
        try{const fetchSolutions=async()=>{
            const res=await axios.get(`http://localhost:8080/api/solutions/${postId}`);
            setSolutions(res.data);
        }
        fetchSolutions();
    }
    catch(err){
        console.log(err);
    }
    },[postId,solutions])
    return (
        <div className="solution">
            {solutions.map((solution)=>(
                <div className='solute'>
                    <p>
                        {solution.solu}
                    </p>
                    <div className="suser">
                            <div className="left">
                                <img src="https://wallpapercave.com/dwp2x/wp4829309.jpg" alt="" />
                                <span><Link className='link' to={`/profile/${solution.userId}`}>{solution.username}</Link></span>
                            </div>
                            <div className="right">
                              <span>{moment(solution.createdAt).fromNow()}</span>
                            </div>
                    </div>
                </div>
            ))}
        </div>
    )
}