import db from "../db.js";

export const getCats=(req,res)=>{
    const  q="SELECT DISTINCT cat FROM posts WHERE cat IS NOT NULL AND cat <> ''";
    db.query(q,(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}