import db from "../db.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getQuestions=(req,res)=>{
    const q='SELECT * FROM questions ';
    db.query(q,[],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const getQuestion=(req,res)=>{
    const q='SELECT q.*,username,u.id AS uid FROM questions AS q JOIN user AS u ON (q.userId=u.id) WHERE q.id= ?';
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    })
    
}

export const addQuestion=(req,res)=>{
    const token=req.cookies.ATK;
    if(!token) return res.status(401).json("user not logged in ");
    jwt.verify(token,"tokenkey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token get expired");

        const q='INSERT INTO questions(que,createdAt,userId) VALUES(?)';
        const values=[
            req.body.que,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Question has been inserted");
        })
    })
}

export const getUserQuestions=(req,res)=>{
    const q='SELECT * FROM questions WHERE userId=?';
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}
