import img from "../../img/blank.png";
import "./card.css"
import { saveAs } from 'file-saver'


const Card = ({post}) => {

    const PF = "uploads/";
    const download = async (e) => {
        saveAs(PF+post.image, 'image.jpg')
    }

    return (
        <div className="single-card">
            <img className="card-image" src={PF+post.image||img} alt="" />
            <div className="card-contant">
                <div className="card-prompt">
                {post.prompt}
                </div>
                <button onClick={download}>Download</button>
            </div>
        </div>
    )
}

export default Card
