import React, { Fragment, useState } from 'react'
import {Alert} from 'react-bootstrap'


const searchBox=({translateWord, translatedWord, saveAndUpdateWord, currentWordExistingStatus, errorCheck})=> {
    const [tType, setTType]= useState(true);
    const [tBox, setTBox]= useState(false);
    
    const [alertShow, setAlertShow] = useState(false);
    const [errorShow, setErrorShow] = useState(true);
    
    var timer;
    

    
    return (
        <Fragment>
            {errorShow && (
                errorCheck.error && (
                    <Alert variant="danger" style={{textAlign: "center"}}>
                        <Alert.Heading><i class="fas fa-exclamation-triangle"></i> Server Error {errorCheck.errorStatus}!</Alert.Heading>
                        
                        <p style={{marginBottom: "0"}}>
                            {errorCheck.errorData}
                            <br/>
                            Wait or use manual translation.
                        </p>
                    </Alert>
                    )
                )
            }
            
            <div className="text-center form-switch my-2" style={{paddingLeft:"0px"}}>
                <input className="form-check-input" type="checkbox" defaultChecked={true} onChange={e=>{
                    const cBoxStatus=e.target.checked;
                    
                    setTType(cBoxStatus);

                    if(cBoxStatus){
                        setErrorShow(true);
                    }
                    else{
                        setTBox(false);
                        setErrorShow(false);
                    }
                    
                    setAlertShow(false);
                    
                    
                }}/>
                <label className="form-check-label" style={{paddingLeft:"10px"}}>Auto translation</label>
            </div>
            
            {tType ?
                <Fragment>
                    <div className="input-group w-50" style={{margin: "auto"}}>
                        <input id="aTE" type="text" className="form-control" onKeyUp={e=>{
                            //Auto translate
                            //Waiting for user to finish typing
                            if(e.target.value.length > 1){
                                setAlertShow(false);
                                setTBox(true);
                            }
                            else{
                                setAlertShow(true);
                                setTBox(false);    
                            }
                                
                            
                            clearInterval(timer);
                            timer = setTimeout(function() {
                                if(e.target.value.length > 1)
                                    translateWord(e.target.value.trim().toLowerCase());
                            }, 1000);
                            
                        }} placeholder="Enter the word"/>
                        <button className="btn btn-success" onClick={()=>{
                            let englishWord= document.getElementById("aTE").value;
                            
                            if(englishWord.length > 1){
                                // new object sending (not state)
                                saveAndUpdateWord({en: translatedWord.en, tr: translatedWord.tr, searchCount: translatedWord.searchCount});
                                document.getElementById("aTE").value="";
                                setTBox(false);
                            }
                            else
                                setAlertShow(true);
                        }}><i className="fas fa-save"></i> Save</button>
                    </div>
                    
                    {   alertShow &&
                        
                        <div style={{textAlign: "center"}}>
                            <Alert variant="danger" className="py-1 mt-3" style={{margin: "0 auto", display: "inline-block", overflow: "hidden"}}>
                                Type at least two characters.
                            </Alert>
                        </div>
                    }  
                    
                    {   tBox &&(
                            currentWordExistingStatus ?
                                <div style={{textAlign: "center"}}>
                                    <div className="alert alert-warning py-1 mt-3" style={{margin: "0 auto", display: "inline-block", overflow: "hidden"}}>
                                        <i className="far fa-star"></i> {translatedWord.tr}
                                    </div>
                                </div>
                            :
                                <div style={{textAlign: "center"}}>
                                    <div className="alert alert-primary py-1 mt-3" style={{margin: "0 auto", display: "inline-block", overflow: "hidden"}}>
                                        {translatedWord.tr}
                                    </div>
                                </div>
                        )
                    }
                </Fragment>
            
            :   
                <Fragment>        
                    <div className="input-group w-50" style={{margin: "auto"}}>
                        <input id="mTE" type="text" className="form-control" placeholder="English word"/> <p className="mx-1 my-1">:</p> <input id="mTT" type="text" className="form-control"  placeholder="Turkish word"/>
                        <button className="btn btn-success" onClick={()=>{
                            let englishWord= document.getElementById("mTE").value.trim().toLowerCase();
                            let turkishhWord= document.getElementById("mTT").value.trim().toLowerCase();
                            //Manula translate
                            if(englishWord.length > 1 && turkishhWord.length > 1){
                                saveAndUpdateWord({en: englishWord, tr: turkishhWord, searchCount: 1});
                                document.getElementById("mTE").value = document.getElementById("mTT").value="";

                                setAlertShow(false);
                            }
                            else{
                                setAlertShow(true); console.log("hi");
                            }
                                
                            
                        }}><i className="fas fa-save"></i> Save</button>
                    </div>
                
                    {   alertShow &&
                            
                        <div style={{textAlign: "center"}}>
                            <Alert variant="danger" className="py-1 mt-3" style={{margin: "0 auto", display: "inline-block", overflow: "hidden"}}>
                                Enter at least two characters for both.
                            </Alert>
                        </div>
                    } 
                </Fragment>   
                }

            <hr/>
        </Fragment>
    )
    
}

export default searchBox;