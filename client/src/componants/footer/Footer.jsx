import './footer.scss'
import {Link} from 'react-router-dom'
import Google from '../../images/google.png';
import Github from '../../images/githubcolored.png';
import Facebook from '../../images/facebook.png';
import LinkedIn from '../../images/linkedin.png';


export const Footer=()=>{
    return (
        <div className="footer">
            <div className="copy">
                <span>copyright: <>&copy; </> 2023 #hashError</span>
                <ul>
                    <li><Link to={'https://www.google.com/'} target='blank'><img src={Google} alt="" /></Link></li>
                    <li><Link target='blank' to={'https://github.com/BHUVANESH2623'}><img src={Github} alt="" /></Link></li>
                    <li><Link target='blank' to={'https://www.facebook.com/'}><img src={Facebook} alt="" /></Link></li>
                    <li><Link target='blank' to={'https://www.linkedin.com/in/bhuvanesh-g-62769423a/'}><img src={LinkedIn} alt="" /></Link></li>
                </ul>
            </div>
            <div className="foots">
                <span>Quick Links:</span>
                <ul>
                    <li>About Us</li>
                    <li>Home</li>
                    <li>Services</li>
                    <li>Products</li>
                    <li>Blog</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className="foots">
                <span>Policy:</span>
                <ul>
                    <li><Link className='link' to={'/pp'}>Privacy Policy</Link></li>
                    <li>Terms of services</li>
                </ul>
            </div>
            <div className="foots">
                <span>Tech Stacks:</span>
                <ul>
                    <li><Link className='link' to={'https://react.dev/'} target='_blank'>React</Link></li>
                    <li><Link className='link' to={'https://nodejs.org/it/docs'} target='_blank'>Node</Link></li>
                    <li><Link className='link' to={'https://expressjs.com/en/guide/routing.html'} target='_blank'>Express</Link></li>
                    <li><Link className='link' to={'https://dev.mysql.com/doc/'} target='_blank'>MySQL</Link></li>
                </ul>
            </div>
        </div>
    )
}