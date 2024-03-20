import { Leftbar } from '../../componants/leftbar/Leftbar'
import { Posts } from '../../componants/posts/Posts'
import { Rightbar } from '../../componants/rightbar/Rightbar'
import './home.scss'

export const Home =()=>{
    return (
        <div className="home">
            <Leftbar/>
            <Posts/>
            <Rightbar/>
        </div>
    )
}