import { Leftbar } from '../leftbar/Leftbar';
import { Rightbar } from '../rightbar/Rightbar';
import { Link, useLocation } from 'react-router-dom';
import './question.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

export const Question=()=>{
    // const [value, setValue] = useState('');
    const [question,setQuestion]=useState([]);
    const location=useLocation();
    const questionId=location.pathname.split('/')[2];

    useEffect(()=>{
        const fetchQuestion=async ()=>{
            try{
                const res=await axios.get(`http://localhost:8080/api/questions/${questionId}`);
                setQuestion(res.data);
            }
            catch(err){
                console.log(err.response.message);
            }
        }
        fetchQuestion();
    },[questionId])

    const [answers,setAnswers]=useState([]);

    useEffect(()=>{
        const fetchAnswers=async()=>{
            try{
                const res=await axios.get(`http://localhost:8080/api/answers/${questionId}`);
                setAnswers(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchAnswers();
    },[answers,questionId])
    const [ans,setAns]=useState('');
    const handleAnswer=async (e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:8080/api/answers',{ans,quesId:questionId},{withCredentials:true});
            setAns('');
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="question">
            <div className="left">
                <Leftbar/>
            </div>
            <div className="center">
                <div className="q">
                    <h2>{question.que}</h2>
                    <div className="profile">
                        <Link  className='link' to={`/profile/${question.uid}`}><span>{question.username}</span></Link>
                        <span>{moment(question.createdAt).fromNow()}</span>
                    </div>
                </div>
                {
                    answers.map((answer)=>(
                        <div className="answer">
                            <p>{answer.ans}</p>
                            <div className="user">
                                <div className="userinfo">
                                    <img src="https://wallpapercave.com/dwp2x/wp4829309.jpg" alt="" />
                                    <Link className='link' to={`/profile/${answer.userId}`}><span>{answer.username}</span></Link>
                                </div>
                                <span>{moment(answer.createdAt).fromNow()}</span>
                            </div>
                        </div>
                    ))
                }
                <div className="postanswer">
                    <h3>Add Answer:</h3>
                    <div >
                    <textarea className='quill' name="answer" id="d1" cols="30" rows="10" 
                    placeholder='Write your answer ...'
                    value={ans}
                    onChange={e=>{setAns(e.target.value)}}>
                    </textarea>
                    </div>
                    <div className="add">
                        <button onClick={handleAnswer}>Add answer</button>
                    </div>
                </div>

            </div>
            <div className="right">
                <Rightbar/>
            </div>

            {/* <textarea id="wmd-input" name="post-text" class="wmd-input s-input bar0 js-post-body-field processed" data-editor-type="wmd" data-post-type-id="2" cols="92" rows="15" aria-labelledby="your-answer-header" tabindex="101" data-min-length=""></textarea> */}
        </div>
    )
}
