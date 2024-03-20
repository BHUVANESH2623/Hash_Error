import { useState } from 'react';
import './write.scss';
import { Leftbar } from '../../componants/leftbar/Leftbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Rightbar } from '../../componants/rightbar/Rightbar';

export const Write=()=>{
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [cat, setCat] = useState('');
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8080/api/posts",{errmsg:error,description:value,cat},{
                withCredentials:true
            });
            navigate('/');
        }catch(err){
            console.log(err.response.message)
        }
    }

    return (
        <div className="write">
            <div className="left">
            <Leftbar/>
            </div>
            <div className="center">
                <div className="errortable">
                    <h1>Enter the Error:</h1>
                    <div>
                    <textarea className='error' name="error" id="e1" cols="30" rows="10" 
                    placeholder={`Error:            http://localhost:3000
                    On Your Network:  http://172.16.5.1:3000
                  
                  Note that the development build is not optimized.`}
                    value={error}
                    onChange={e=>{setError(e.target.value)}}>
                    </textarea>
                    </div>
                </div>
                <div className="quill">
                    <p>Enter the problem that you face: </p>
                    <div>
                    <textarea className='description' name="description" id="d2" cols="30" rows="10" 
                    placeholder='Write your answer ...'
                    value={value}
                    onChange={e=>{setValue(e.target.value)}}>
                    </textarea>
                    </div>
                </div>
                <div className="cat">
                    <div className="cats">
                        <p>
                            Define Catagory:
                        </p>
                        <input type="text" placeholder='Enter the catagory' value={cat} onChange={e=>{setCat(e.target.value)}}/>
                    </div>
                    <div className="files">
                        <p>Upload File:</p>
                        <label htmlFor="file">Click here to Upload</label>
                        <input type="file" id='file' />
                    </div>
                    <div className="preview">
                        <img src="https://wallpapercave.com/dwp2x/wp4829309.jpg" alt="" />
                    </div>
                </div>
                <div className="submit">
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className="right">
                <Rightbar/>
            </div>
        </div>
    )
}