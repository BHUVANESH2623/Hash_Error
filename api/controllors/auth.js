import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register=(req,res)=>{
    const q="SELECT * FROM user WHERE username=?  AND email=? ";
    const p='INSERT INTO profiles(user_id) VALUES (?)'
    db.query(q,[req.body.username,req.body.email],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("User already exist");

        const q="INSERT INTO user(username,email,password) values(?) ";
        const salt=bcrypt.genSaltSync(10);
        const password=bcrypt.hashSync(req.body.password,salt);
        const values=[
            req.body.username,
            req.body.email,
            password
        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);

            const user_id = data.insertId;
            db.query(p,[user_id],(err,data)=>{
                if(err) return res.status(500).json("Error in profile");
            })
            return res.status(200).json("User has been created");
        })
    })

}

export const login=(req,res)=>{
    const q="SELECT * FROM user WHERE email=?";
    db.query(q,[req.body.email],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length ===0) return res.status(400).json("User not found");

        const comparePassword=bcrypt.compareSync(req.body.password,data[0].password);
        if(!comparePassword) return res.status(400).json("Wrong username or password");

        const token=jwt.sign({id:data[0].id},"tokenkey");
        const {password,...others}=data[0];

        res.cookie("ATK",token,{
            httpOnly:true,
            secure:true
        }).status(200).json(others)
        // console.log(token)

    })

}

export const logout=(req,res)=>{
   res.clearCookie("access_token",{
    secure:true,
    sameSite:"none"
   }).status(200).json("user has been logged out")
}