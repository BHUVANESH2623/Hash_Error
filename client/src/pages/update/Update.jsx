import './update.scss';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from 'react';
import axios from 'axios';

export const Update=({setUpdatetrue,profile})=>{
    const [profileImg,setProfileImg]=useState(null);

    const [texts, setTexts] = useState({
        role: profile.role,
        country: profile.country,
        portpolio: profile.portpolio,
        github: profile.github,
        linkedin: profile.linkedin,
      });

      const handleChange=(e)=>{
        setTexts(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleClick= async (e)=>{
        e.preventDefault();
        try{
            await axios.put(`http://localhost:8080/api/profile/${profile.user_id}`,{role:texts.role,country:texts.country,portpolio:texts.portpolio,github:texts.github,linkedin:texts.linkedin});
        }
        catch(err){
            console.log(err.response.message);
        }
        setUpdatetrue(false)
    }
    return (
        <div className="update">
            <div className="wrapper">
                <h1>Update Your Profile</h1>
                <form>
                <div className="files">
                    <label htmlFor="profile">
                    <span>Profile Picture</span>
                    <div className="imgContainer">
                        <img
                        src={
                            profileImg
                            ? URL.createObjectURL(profileImg)
                            : "hello world"
                        }
                        alt=""
                        />
                        <CloudUploadIcon className="icon" />
                    </div>
                    </label>
                    <input
                    type="file"
                    id="profile"
                    style={{ display: "none" }}
                    onChange={(e) => setProfileImg(e.target.files[0])}
                    />
                </div>
                <label>Role</label>
                <input
                    type="text"
                    value={texts.role}
                    name="role"
                    onChange={handleChange}
                />
                <label>Country</label>
                <input
                    type="text"
                    value={texts.country}
                    name="country"
                    onChange={handleChange}
                />
                <label>Portpolio</label>
                <input
                    type="text"
                    value={texts.portpolio}
                    name="portpolio"
                    onChange={handleChange}
                />
                <label>Github</label>
                <input
                    type="text"
                    name="github"
                    value={texts.github}
                    onChange={handleChange}
                />
                <label>LinkedIn</label>
                <input
                    type="text"
                    name="linkedin"
                    value={texts.linkedin}
                    onChange={handleChange}
                />
                <button onClick={handleClick}>Update</button>
                </form>
                <button className="close" onClick={() => setUpdatetrue(false)}>
                close
                </button>
            </div>
        </div>
    )
}