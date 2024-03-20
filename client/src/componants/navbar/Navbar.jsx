import {Link} from 'react-router-dom';
import './navbar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useContext } from 'react';
import {AuthContext} from '../../context/authContext'
export const Navbar=()=>{
    const {currentUser,logout,search,setSearch}=useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="left">
                <Link style={{color:"inherit",textDecoration:"none"}} to={'/'}><h2><span style={{color:"Gold"}}>#</span>hash<span style={{color:"red"}}>Error</span></h2></Link>
                
                <div className="search">
                    <SearchOutlinedIcon/>
                    <input type="text" placeholder="Search..." value={search} onChange={e=>{setSearch(e.target.value)}} />
                   <div className="but">
                        <button>Search</button>
                   </div>
                </div>
            </div>
            <div className="center">
                <button><Link style={{color:"inherit",textDecoration:"none"}} to={'/write'}>Write Error</Link></button>
            </div>
            <div className="right">
                {
                    currentUser ? 
                    <>
                    <div className="user">
                        <img src='https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='profile'/>
                        <span>{currentUser.username}</span>
                        <span onClick={logout}>Logout</span>
                    </div>
                    </> :
                    <>
                    <div className="auth">
                    <Link className='link' to={'/login'}><span>Sign In</span></Link>
                    <span className='slash'>/</span>
                    <Link className='link' to={'/register'}><span>Sign Up</span></Link>
                        
                    </div>
                    </>
                }
            </div>
        </div>
    )
}