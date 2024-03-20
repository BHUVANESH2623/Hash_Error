import db from "../db.js";
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const getSolutions=(req,res)=>{
    const q='SELECT s.* ,username FROM solution AS s JOIN user AS u on (u.id=s.userId) WHERE postId=?';
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const addSolution=(req,res)=>{
    const token=req.cookies.ATK;
    if(!token) return res.status(401).json("User not Logged in");

    jwt.verify(token,"tokenkey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token gets expired");

        const q='INSERT INTO solution(solu,linkid,userId,postId,createdAt) VALUES (?) ';
        const values=[
            req.body.solu,
            req.body.linkid,
            userInfo.id,
            req.body.postId,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Solution is added")
        })
    })
}

export const getVideoId=(req,res)=>{
    const q='SELECT linkid FROM solution WHERE postId=? AND linkid <> ""  ORDER BY id DESC';
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const getSingleLink=(req,res)=>{
    const q='SELECT linkid FROM solution WHERE postId=? AND linkid <> "" ORDER BY  id DESC LIMIT 1';
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0])
    })
}

export const getUserSolutions=(req,res)=>{
    const q=`SELECT DISTINCT p.id , p.errmsg, s.*
    FROM solution AS s
    JOIN posts AS p ON (s.postId = p.id)
    WHERE s.userId = ?
    `
    // const q=`SELECT p.errmsg
    // FROM posts AS p
    // WHERE p.id IN (SELECT s.postId FROM solution AS s WHERE s.userId = ?);
    // `

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}