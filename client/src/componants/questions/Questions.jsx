import { useContext, useEffect, useState } from 'react';
import './questions.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import moment from 'moment';

export const Questions=()=>{
    
    const {qSearch}=useContext(AuthContext);

    const [questions,setQuestions]=useState([]);
    useEffect(()=>{
        const fetchQuestions=async ()=>{
            try{
                const res=await axios.get('http://localhost:8080/api/questions');
                setQuestions(res.data.filter((question)=>question.que.toLowerCase().includes(qSearch)));
            }
            catch(err){
                console.log(err.response.message);
            }
        }
        fetchQuestions();
    },[questions,qSearch])
    return (
        <div className="questions">
           {
            questions.length!==0?
            questions.map((question)=>(
                <div className="ques">
                    <div className="lefts">
                        <h4>
                            <Link className='link' to={`/question/${question.id}`}>{question.que}</Link>
                        </h4>
                    </div>
                    <div className="rights">
                        <span>{moment(question.createdAt).fromNow()}</span>
                    </div>
                </div>
            ))
            :
            <div className="nodata">
                <h3>Sorry, no results</h3>
            </div>
           }
        </div>
    )
}