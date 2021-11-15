import React, {  Fragment } from 'react'
import Speech from 'react-speech';

const MostSearchedsWordBox=({word})=>{
    const style = {
        play: {
            hover: {
                backgroundColor: "#0d6efd",
                color: "#fff",
            },
            button: {
                padding: "6px 9px",
                fontSize: "15px",
                Color: '#fff',
                textAlign: "center",
                borderRadius: 4,
                backgroundColor: "#0d6efd" ,
                fontWeight: 700,
                border: "none"
            }
        },
        pause: {
            hover: {},
            button: {},
        },
        stop: {
            hover: {},
            button: {},
        },
        resume: {
            hover: {},
            button: {},
        }
    };
    
    return (
        <div className="card m-2" style={{display: "inline-block"}}>
            <div className="card-body" style={{textAlign: "center"}}>
                <div>
                    <Speech styles={style} textAsButton={true} displayText={word.en}  text={word.en} /> : <span className="badge bg-primary" style={{padding: "10px", fontSize: "15px"}}> {word.tr} </span> <br/> <span className="badge bg-danger"> <i className="fas fa-history"></i> {word.searchCount} </span>
                </div>
            </div>
        </div>
    )
}

export default MostSearchedsWordBox;