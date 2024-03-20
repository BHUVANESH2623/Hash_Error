import { Link, useLocation } from 'react-router-dom';
import './posts.scss';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import moment from 'moment';
//import { Post } from '../post/Post';

export const Posts=()=>{
    const {search}=useContext(AuthContext);

    const [posts,setPosts]=useState([]);
    const cat=useLocation().search;
    useEffect(()=>{
      const fetchPosts=async()=>{
        try{
          const res=await axios.get(`http://localhost:8080/api/posts${cat}`);
          setPosts(res.data.filter((post)=>post.errmsg.toLowerCase().includes(search)));
        }
        catch(err){
          console.log(err.response.message)
        }
      }
      fetchPosts();
    },[cat,search])

    return (
        <div className="posts">
            {
              posts.length !==0 ?
                posts.map((post)=>
                    (<div className="postpp" key={post.id}>
                        <h3>
                            <Link className='link' to={`/post/${post.id}`}>{post.errmsg}</Link>
                        </h3>
                        <div className="user">
                            <div className="left">
                                <img src="https://wallpapercave.com/dwp2x/wp4829309.jpg" alt="" />
                                <span><Link className='link' to={`/profile/${post.uid}`}>{post.username}</Link></span>
                            </div>
                            <div className="right">
                              <span>{moment(post.createdAt).fromNow()}</span>
                            </div>
                        </div>
                    </div>)
                )
                : <div className="nodata">
                  <h1>Sorry, no results</h1>
                </div>
            }
        </div>
    )
}