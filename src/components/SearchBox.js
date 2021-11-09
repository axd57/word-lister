import React, { Fragment, useState } from 'react'

const searchBox=({translateWord, translatedWord, saveAndUpdateWord, currentWordExistingStatus})=> {
    const [tType, setTType]= useState(true);
    const [tBox, setTBox]= useState(false);
    
    
    
    var timer;
    

    
    return (
        <Fragment>
            <div className="text-center form-switch my-2" style={{paddingLeft:"0px"}}>
                <input className="form-check-input" type="checkbox" defaultChecked={true} onChange={e=>{setTType(e.target.checked); setTBox(false);}}/>
                <label className="form-check-label" style={{paddingLeft:"10px"}}>Auto translate</label>
            </div>
            
            {tType ?
                <Fragment>
                    <div className="input-group w-50" style={{margin: "auto"}}>
                        <input id="aTE" type="text" className="form-control" onKeyUp={e=>{
                            //Auto translate
                            //Waiting for user to finish typing
                            if(e.target.value.length > 1)
                                setTBox(true);
                            else
                                setTBox(false);
                            
                            clearInterval(timer);
                            timer = setTimeout(function() {
                                if(e.target.value.length > 1)
                                    translateWord(e.target.value.trim().toLowerCase());
                            }, 1000);
                            
                        }} placeholder="Enter the word"/>
                        <button className="btn btn-success" onClick={()=>{
                            // let savedWord={
                            //     en: translatedWord.en,
                            //     tr: translatedWord.tr,
                            //     searchCount: translatedWord.searchCount
                            // }
                            
                            let englishWord= document.getElementById("aTE").value;
                            
                            if(englishWord.length > 1){
                                saveAndUpdateWord(translatedWord);
                                document.getElementById("aTE").value="";
                            }
                        
                        }}><i className="fas fa-save"></i> Save</button>
                    </div>
                    {
                        tBox &&(
                            currentWordExistingStatus ?
                                <div style={{textAlign: "center"}}>
                                    <div className="alert alert-warning py-1 mt-3" style={{margin: "0 auto", display: "inline-block", overflow: "hidden"}}>
                                        {translatedWord.tr}
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
                <div className="input-group w-50" style={{margin: "auto"}}>
                    <input id="mTE" type="text" className="form-control mx-1" placeholder="English word"/> : <input id="mTT" type="text" className="form-control mx-1"  placeholder="Turkish word"/>
                    <button className="btn btn-success" onClick={()=>{
                        let englishWord= document.getElementById("mTE").value.trim().toLowerCase();
                        let turkishhWord= document.getElementById("mTT").value.trim().toLowerCase();
                        //Manula translate
                        if(englishWord.length > 1 && turkishhWord.length > 1){
                            saveAndUpdateWord({en: englishWord, tr: turkishhWord, searchCount: 1});
                            document.getElementById("mTE").value = document.getElementById("mTT").value="";
                        }
                    }}><i className="fas fa-save"></i> Save</button>
                </div>}

            <hr/>
        </Fragment>
    )
    
}

export default searchBox;