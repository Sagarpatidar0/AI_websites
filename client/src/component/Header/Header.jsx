import './header.css'
import blank from '../../img/blank_pro.png'
import {Link} from 'react-router-dom'

export default function Header() {
    return (
        <div className='header-cont'>
            <div className="right">
                <h2 className="logo">AI-Image</h2>
                <h4 className="title">by sagar</h4>
            </div>

            <div className="left">
                <Link to={"/"}>Collections</Link>
                <div>
                    <img src={blank} alt=""/>
                </div>
            </div>
        </div>
    )
}
