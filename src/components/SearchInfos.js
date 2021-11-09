import React, {  Fragment } from 'react'

const SearchInfos= () => {
    return (
        <Fragment>
            <div className="card bg-danger mb-3" style={{marginTop: "35px"}}>
                <div className="card-header text-white"><i className="fas fa-info-circle"></i> Least Searcheds (Top 5)</div>
                <div className="card-body" style={{overflow: "auto", whiteSpace: "nowrap"}}>

                    <div className="card m-2" style={{display: "inline-block"}}>
                        <div className="card-body" style={{textAlign: "center"}}>
                            <a href="#" style={{textDecoration: "none"}}> <span className="badge bg-primary" style={{padding: "10px", fontSize: "15px"}}> <i className="far fa-play-circle"></i> Cat</span> </a>  : <span className="badge bg-primary" style={{padding: "10px", fontSize: "15px"}}>Kedi</span> <br/> <span className="badge bg-danger"><i className="fas fa-history"></i> 5</span>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="card bg-primary mb-3">
                <div className="card-header text-white"><i className="fas fa-info-circle"></i> Most Searcheds (Top 5)</div>
                <div className="card-body" style={{overflow: "auto", whiteSpace: "nowrap"}}>

                    <div className="card m-2" style={{display: "inline-block"}}>
                        <div className="card-body" style={{textAlign: "center"}}>
                            <a href="#" style={{textDecoration: "none"}}> <span className="badge bg-primary" style={{padding: "10px", fontSize: "15px"}}> <i className="far fa-play-circle"></i> Cat</span> </a>  : <span className="badge bg-primary" style={{padding: "10px", fontSize: "15px"}}>Kedi</span> <br/> <span className="badge bg-danger"><i className="fas fa-history"></i> 5</span>
                        </div>
                    </div>

                </div>
            </div>


        </Fragment>
    )
}

export default SearchInfos;
