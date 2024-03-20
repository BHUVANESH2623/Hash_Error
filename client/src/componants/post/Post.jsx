import { Leftbar } from '../leftbar/Leftbar';
import './post.scss';
import YouTube from 'react-youtube';
import { useEffect, useState } from 'react';
import { Solution } from '../solution/Solution';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Videobar } from '../videobar/Videobar';

export const Post=()=>{
    const opts={
        height:"300",
        width:'500',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
          },
    }
    const [post,setPost]=useState({});
    const location=useLocation();
    const postId=location.pathname.split('/')[2];


    useEffect(()=>{
        const fetchPost=async()=>{
            try{
                const res=await axios.get(`http://localhost:8080/api/posts/${postId}`)
                setPost(res.data);
            }catch(err){
                console.log(err.response.message);
            }
        }
        fetchPost();
    },[postId])

    const [singleid,setSingleid]=useState({});

    useEffect(()=>{
        const fetchSingle=async()=>{
            try{
                const res=await axios.get(`http://localhost:8080/api/solutions/link/${postId}`);
                setSingleid(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchSingle();
    },[postId])

    const [value, setValue] = useState('');
    const [videoId,setVideoId]=useState('');

    const linkid=videoId.split('/')[3];

    const handleSolution=async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:8080/api/solutions',{
                solu:value,linkid,postId
            },{
                withCredentials:true
            })
            setValue('');
            setVideoId('')
        }
        catch(err){
            console.log(err);
        }
    }

    

    return (
        <div className="post">
            <div className="left">
                <Leftbar/>
            </div>
            <div className="center">
                <h3>{post.errmsg}</h3>
                {post.img && <img src={post.img} alt="" />}
                <p>{post.description}</p>
                {singleid.length !== 0  && 
                    <div className="yt">
                        <YouTube  videoId={singleid.linkid} opts={opts}/>
                    </div>
                }
                
                <Solution/>
                <div className="solu">
                <p>Enter your Solution: </p>
                    <div>
                    <textarea className='description' name="description" id="d1" cols="30" rows="10" 
                    placeholder='Write your solution ...'
                    value={value}
                    onChange={e=>{setValue(e.target.value)}}>
                    </textarea>
                    </div> 
                </div>
                <div className="ytlink">
                    <p>Enter Youtube link:</p>
                    <input type="text" placeholder='Enter the link for reference ' value={videoId} onChange={e=>{setVideoId(e.target.value)}} />
                </div>
                
                <div className="add">
                    <button onClick={handleSolution}>Add Solution</button>
                </div>
            </div>
            <div className="right">
                <Videobar postId={postId}/>
            </div>
        </div>
    )
}