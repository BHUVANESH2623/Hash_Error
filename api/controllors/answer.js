import moment from "moment/moment.js";
import db from "../db.js";
import jwt from "jsonwebtoken";

export const getAnswers=(req,res)=>{
    const q='SELECT * ,u.username FROM answers JOIN user as u ON (userId=u.id) WHERE quesId=?';
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const addAnswer=(req,res)=>{
    const token=req.cookies.ATK;
    if(!token) return res.status(401).json("User not logged in ");
    jwt.verify(token,"tokenkey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is expired");

        const q='INSERT INTO answers(ans,userId,quesId,createdAt) values(?)';
        const values=[
            req.body.ans,
            userInfo.id,
            req.body.quesId,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Answer is inserted successfully")
        })
    })
}

export const getUserAnswers=(req,res)=>{
    const q=`SELECT DISTINCT q.que,a.* FROM answers AS a JOIN questions AS q ON (a.quesId=q.id) WHERE a.userId=?`;
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}