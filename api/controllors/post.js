import moment from "moment/moment.js";
import db from "../db.js";
import  Jwt  from "jsonwebtoken";

export const getPosts=(req,res)=>{
    const q=req.query.cat?'SELECT  p.*,u.id AS uid,username FROM posts AS p JOIN  user AS u ON (u.id=p.userId) WHERE cat=?':'SELECT  p.*,u.id AS uid,username FROM posts AS p JOIN  user AS u ON (u.id=p.userId)'
    db.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const getPost=(req,res)=>{
    const q='SELECT  p.*,u.id AS uid,username FROM posts AS p JOIN  user AS u ON (u.id=p.userId) WHERE p.id=?';

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0]);

    })

}

export const addPost=(req,res)=>{
    const token=req.cookies.ATK;
    if(!token) return res.status(403).json("User not logged in");
    Jwt.verify(token,"tokenkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)

        const q='INSERT INTO posts(errmsg,description,createdAt,userId,cat) VALUES(?)';
        const values=[
            req.body.errmsg,
            req.body.description,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.cat
        ]
        db.query(q,[values],(err,data)=>{
            if(err)return res.status(500).json(err);
            return res.status(200).json("post created successfully");
        })
    })
}

export const deletePost=(req,res)=>{

}

export const updatePost=(req,res)=>{
    
}

export const getUserPosts=(req,res)=>{
    const q='SELECT p.*,u.username FROM posts AS p JOIN user AS u ON (p.userId=u.id)  WHERE userId=?';
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}