import React, { useEffect } from 'react'
import './create.css'
import axios from 'axios';
import { useState } from 'react';
import blank_img from '../img/blank.png';
import Header from '../component/Header/Header';
import { saveAs } from 'file-saver'
import gif from "../img/giphy.gif";
import Allcard from '../component/Card/Allcard';
import Textform from '../component/test';

export default function Create() {
    const [prompt, setPrompt] = useState("")
    const [img, setImg] = useState(blank_img);
    const [loading, setLoading] = useState(false);
    const [imageGenerate, setImageGenerate] = useState(true);
    let file;

    const handleClick = async (e) => {
        e.preventDefault();
        if (prompt !== "") {
            setLoading(true);
            const res = await axios.post("api/", { prompt });
            setImg(`data:image/png;base64,${res.data.photo0}`);
            setLoading(false);
            setImageGenerate(true);
            console.log(loading, imageGenerate,res);
        }
    }
    const upload_img = async () => {
        file = await createFile();
        const data = new FormData();
        data.append("file", file);
        const resdata = await axios.post("api/upload", data);
        const res = await axios.post("api/post", {
            prompt: prompt,
            email: "sp202@gmail.com",
            image: resdata.data,
        })
        window.location.reload();
        console.log(res, file);
    }

    const download = async (e) => {
        saveAs(img, 'image.jpg')
    }
    async function createFile() {
        let response = await fetch(img);
        let data = await response.blob();
        let metadata = {
            type: 'image/jpeg'
        };
        return new File([data], ".jpg", metadata);
    }

    useEffect(() => {
        loading ? setImg(gif) : setImg(img);
    }, [loading, img]);

    return (
        <div className="create-img">
            <Header />
            <Textform showAlert=""/>
            <div className='create-img-cont' >
                <form onSubmit={handleClick} >
                    <label htmlFor="prompt">Start with a detailed description</label>
                    <input type="text"
                        autoComplete='off'
                        name="prompt"
                        value={prompt}
                        placeholder="An armchair in the shape of an avocado"
                        autoFocus={true}
                        onChange={e => setPrompt(e.target.value)}
                        id="prompt"
                        minLength={20}
                    />
                    <img src={img} alt="placeholder" />
                    <input type="submit"
                        value="Generate"
                        disabled={loading}
                    />
                    <input type="button"
                        onClick={download}
                        value="Download"
                        disabled={!imageGenerate}
                    />
                    <input type="button"
                        onClick={upload_img}
                        value="Upload"
                        disabled={!imageGenerate}
                    />
                </form>
            </div>
            <Allcard />
        </div>
    )
}
