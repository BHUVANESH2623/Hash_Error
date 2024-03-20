import './profile.scss';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {  useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import defaultProfile from  '../../images/profile.png';
import { Update } from '../update/Update';
export const Profile=()=>{

    const {currentUser,logout}=useContext(AuthContext);
        const buttons = document.querySelectorAll('.tag');
        buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
        });
        const [selectedButton, setSelectedButton] = useState('Errors');
        const handleButtonClick = (value) => {
            setSelectedButton(value);
          };
          const location=useLocation();
          const profileid=location.pathname.split('/')[2];
          const [posts,setPosts]=useState([]);
          const [user,setUser]=useState('');
          useEffect(()=>{
            const fetchPosts=async()=>{
                try{
                    const res=await axios.get(`http://localhost:8080/api/posts/userposts/${profileid}`);
                    setUser(res.data[0].username)
                    setPosts(res.data);
                }
                catch(err){
                    console.log(err.response.message)
                }
            }
            fetchPosts();
          },[profileid])
          const [questions,setQuestions]=useState([]);
          useEffect(()=>{
            const fetchQuestions=async ()=>{
                try{
                    const res=await axios.get(`http://localhost:8080/api/questions/userquestions/${profileid}`);
                    setQuestions(res.data);
                }
                catch(err){
                    console.log(err.response.message)
                }
            }
            fetchQuestions();
          },[profileid])

          const [solutions,setSolutions]=useState([]);
          useEffect(()=>{
            const fetchSolution=async ()=>{
                try{
                    const res=await axios.get(`http://localhost:8080/api/solutions/usersolution/${profileid}`);
                    setSolutions(res.data);
                }
                catch(err){
                    console.log(err.response.message);
                }
            }
            fetchSolution();
          },[profileid])

          const [answers,setAnswers]=useState([]);

          useEffect(()=>{
            const fetchUserAnswers=async()=>{
                try{
                    const res=await axios.get(`http://localhost:8080/api/answers/useranswers/${profileid}`);
                    setAnswers(res.data);
                }
                catch(err){
                    console.log(err.response.message);
                }
            }
            fetchUserAnswers();
          },[profileid])


        const [profile,setProfile]=useState([]);

        useEffect(()=>{
            const fetchProfile=async()=>{
                try{
                    const res=await axios.get(`http://localhost:8080/api/profile/${profileid}`)
                    setProfile(res.data[0]);
                }
                catch(err){
                    console.log(err.response.message);
                }
            }
            fetchProfile();
        },[profileid,profile]);
        

        const role=profile.role
        const country=profile.country 
        const portpolio=profile.portpolio 
        const github =profile.github 
        const linkedin =profile.linkedin 
        const img=profile?.img || defaultProfile;

        const [updatetrue,setUpdatetrue]=useState(false);

        const handleUpdate=(val)=>{
            console.log(val);
            setUpdatetrue(!val);
        }

        const score=10 + Math.floor((posts.length + questions.length)*2.5 + (solutions.length + answers.length)*5);
    return (
        <div className="profile">
            <div className="left">
                <div className="userprofile">
                    <div className="user">
                        <img src={img} alt="" />
                        <div className="u">
                            <div className="name">
                            <h3>{user}</h3>
                            {currentUser?.username === user && <div className="logos">
                                <EditOutlinedIcon onClick={()=>handleUpdate(updatetrue)}/>
                                <LogoutOutlinedIcon onClick={logout}/>
                            </div>}
                            </div>
                            <span style={{color:"gray" ,fontWeight:"500"}}>Points : {score}</span>
                        </div>
                        
                    </div>
                    <div className="label">
                        <label htmlFor="Role">Role</label> 
                        <span>{role}</span>
                    </div>
                    <div className="label">
                        <label htmlFor="Country">Country</label> 
                        <span>{country}</span>
                    </div>
                    <div className="label">
                        <label htmlFor="PortFolio">PortFolio</label> 
                        <Link className='link' to={`${portpolio}`} target='blank'><span>{portpolio}</span></Link>
                    </div>
                    <div className="label">
                        <label htmlFor="Github">Github</label> 
                        <Link className='link' to={`${github}`} target='blank'><span>{github}</span></Link>
                    </div>
                    <div className="label">
                        <label htmlFor="LinkedIn">LinkedIn</label> 
                        <Link className='link' to={`${linkedin}`} target='blank'><span>{linkedin}</span></Link>
                    </div>
                </div>
            </div>
            {updatetrue && <Update setUpdatetrue={setUpdatetrue} profile={profile}/>}
            <div className="right">
                <div className="top">
                    <div className="boxes">
                        <div className="box">
                            <h3>Errors Asked</h3>
                            <span>{posts.length > 0 ?posts.length : 0}</span>
                        </div>
                        <div className="box">
                            <h3>Errors Solved</h3>
                            <span>{solutions.length > 0 ?solutions.length : 0}</span>
                        </div>
                        <div className="box">
                            <h3>Questions Asked</h3>
                            <span>{questions.length > 0 ?questions.length : 0}</span>
                        </div>
                        <div className="box">
                            <h3>Answered</h3>
                            <span>{answers.length > 0 ?answers.length : 0}</span>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="tags">
                        <button className={`tag ${selectedButton === 'Errors' ? 'active' : ''}`} onClick={() => handleButtonClick('Errors')}>Errors</button>
                        <button className={`tag ${selectedButton === 'Solutions' ? 'active' : ''}`} onClick={() => handleButtonClick('Solutions')}>Answered Errors</button>
                        <button className={`tag ${selectedButton === 'Questions' ? 'active' : ''}`} onClick={() => handleButtonClick('Questions')}>Questions</button>
                        <button className={`tag ${selectedButton === 'Answers' ? 'active' : ''}`} onClick={() => handleButtonClick('Answers')}>Answered Questions</button>
                    </div>
                    <hr />
                    <div className="elements">
                        {selectedButton ==='Errors' && 
                           posts.map((post)=>
                           (<div className="postpp" key={post.id}>
                               <h3>
                                   <Link className='link' to={`/post/${post.id}`}>{post.errmsg}</Link>
                               </h3>
                               <div className="end">
                                    <span>1 min ago</span>
                               </div>
                           </div>)
                       )
                        }
                        {selectedButton==='Questions' && 
                             questions.map((question)=>(
                                <div className="ques">
                                    <div className="lefts">
                                        <h3>
                                            <Link className='link' to={`/question/${question.id}`}>{question.que}</Link>
                                        </h3>
                                    </div>
                                    <div className="rights">
                                        <span>1 day ago</span>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            selectedButton==='Solutions' && 
                            solutions.map((solution)=>
                            (<div className="postpp" key={solution.id}>
                                <h3>
                                    <Link className='link' to={`/post/${solution.postId}`}>{solution.errmsg}</Link>
                                </h3>
                                <div className="end">
                                     <span>1 min ago</span>
                                </div>
                            </div>)
                        )
                        }
                        {
                            selectedButton==='Answers' && 
                            answers.map((answer)=>(
                                <div className="answer">
                                    <div className="lefts">
                                        <h3>
                                            <Link className='link' to={`/question/${answer.quesId}`}>{answer.que}</Link>
                                        </h3>
                                    </div>
                                    <div className="rights">
                                        <span>1 day ago</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}