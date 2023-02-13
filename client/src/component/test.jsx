import React,{useState} from 'react'



export default function Textform(props) {
    const handleUpClick = () =>{
/*         console.log("uppercase was clicked" + text); */
        let newText = text.toUpperCase();
        settext(newText)
        props.showAlert("Converted to uppercase!" , "success");
    }

    const handleloClick = () =>{
        /*         console.log("lowercase was clicked" + text); */
                let newText = text.toLowerCase();
                settext(newText)
                props.showAlert("Converted to lowercase!" , "success");
            }

 const handleClearClick = () =>{
               
                        let newText = ' ';
                        settext(newText)
                    }
                    props.showAlert("text has been cleared!" , "success");

  const handleCopy= () =>{
                     console.log("i am copy");
                     var text = document.getElementById("mybox");
               text.select();
                       navigator.clipboard.writeText(text.value);
                       props.showAlert("text has been copied!" , "success");
                          }

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ] +/);
    settext(newText.join(" "))
    props.showAlert("extra spaces has been removed!" , "success")
  }                        
                          
                    

    const handleOnChange = (event) =>{
        
        settext(event.target.value);
      
    }
    const [text, settext] = useState('');
    //text = "new text";  //wrong way to change the state
    //settext("new text"); //correct way  to  change the state


  return (<>
    <div className='container' style={{color:props.mode==='dark'? 'white':'black'}}>
        <h1>{props.heading}</h1>
   <div className="mb-3">
  
  <textarea className="form-control" id="mybox" rows="8" value= {text} onChange={handleOnChange} style={{backgroundColor:props.mode==='dark'? 'grey':'white',
color:props.mode==='dark'? 'white':'black'}}></textarea>
</div>
  <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to uppercase</button>
  <button className="btn btn-primary mx-2" onClick={handleloClick}>Convert to Lowercase</button>
  <button className="btn btn-primary mx-2" onClick={handleClearClick}>clear text</button>
  <button className="btn btn-primary mx-2" onClick={handleExtraSpaces}>Remove extra spaces</button>
  

    </div>

    <div className="container my-3 " style={{color:props.mode==='dark'? 'white':'black'}}>
        <h2> Your text summary</h2>
        <p>{text.split(" ").length} words and {text.length} characters</p>
        <p>{0.008 * text.split(" ").length} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"enter something in the textbox above to preview it here"}</p>
    </div>
    </>
  )
}