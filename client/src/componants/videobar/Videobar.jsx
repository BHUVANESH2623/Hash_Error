import './videobar.scss';
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

export const Videobar=({postId})=>{

        // const videoId = ["pYBIpM5mBm4","N5pP7k7qppE","s7-GTShjcqY","s7-GTShjcqY","s7-GTShjcqY"]; // Replace this with the YouTube video ID you want to display
    const [videoId,setVideoId]=useState([])

    useEffect(()=>{
        try{
        const fetchVideo=async()=>{
            const res=await axios.get(`http://localhost:8080/api/solutions/videoid/${postId}`);
            setVideoId(res.data);
        }

        fetchVideo();
        }
        catch(err){
        console.log(err);
        }
    },[postId,videoId])
    const opts = {
        height: '175',
        width: '300',
        playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        },
    };

    return (
        <div className="videobar">
            {
                videoId.map((vid,index)=>(
                    <div className='video'>
                        <YouTube key={index} loading={<div>Loading...</div>} videoId={vid.linkid} opts={opts} />
                    </div>
                ))
            }
        </div>
    )
}