import { useEffect, useState } from "react"
import axios from "axios"
import Card from "./Card"
import "./card.css"


const Allcard = () => {
    const [data, setData] = useState([])

    useEffect(()=>{
        const getData = async()=>{
            const res = await axios.get('api/posts')
            console.log(res);
            setData(res.data)
        }
        getData();
    },[])

    return (
      <div className="all-card">
        {data.map((post)=>{
            return <Card key={post._id} post={post} />
        })}
      </div>
    )
  }
  
  export default Allcard
  