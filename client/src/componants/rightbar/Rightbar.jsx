import { Questions } from '../questions/Questions';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './rightbar.scss';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';



export const Rightbar = () => {
  const [que,setQue]=useState('');
  const {qSearch,setQSearch}=useContext(AuthContext);

  const handleAsk=async (e)=>{
    e.preventDefault();
    try{
      await axios.post('http://localhost:8080/api/questions',{que},{withCredentials:true});

      setQue('');
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='rightbar'>
      <div className="search">
          <SearchOutlinedIcon/>
          <input type="text" placeholder='Search any Questions' value={qSearch} onChange={e=>setQSearch(e.target.value)} />
          <div className="but">
              <button>Search</button>
          </div>
      </div>
      <div className="search">
        <input type="text" placeholder='Ask a simple question' value={que} onChange={e=>{setQue(e.target.value)}}/>
        <div className="buts">
          <button onClick={handleAsk}>Ask</button>
        </div>
      </div>
      <Questions/>
    </div>
  );
};
