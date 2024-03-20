import db from "../db.js";
import jwt from 'jsonwebtoken';

export const getProfile=(req,res)=>{
    const q='SELECT * FROM profiles WHERE user_id=?';
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}
export const updateProfile = (req, res) => {
    const q = 'UPDATE profiles SET role=?, country=?, portpolio=?, github=?, linkedin=? WHERE user_id=?';
    db.query(
        q,
        [
            req.body.role,
            req.body.country,
            req.body.portpolio,
            req.body.github,
            req.body.linkedin,
            req.params.id
        ],
        (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Updated");
          
        }
    );
};
