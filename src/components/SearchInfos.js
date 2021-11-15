import React, {  Fragment } from 'react'
import LeastSearchedsWordBox from './LeastSearchedsWordBox';
import MostSearchedsWordBox from './MostSearchedsWordBox';

const SearchInfos= ({getAllWords}) => {
    const tmpArr=[...getAllWords];
    const lSA=tmpArr.sort((a,b) => (a.searchCount > b.searchCount) ? 1 : ((b.searchCount > a.searchCount) ? -1 : 0)).slice(0, 5);
    const mSA=tmpArr.sort((a,b) => (a.searchCount > b.searchCount) ? -1 : ((b.searchCount > a.searchCount) ? 1 : 0)).slice(0, 5);
    
    return (
        <Fragment>
            <div className="card bg-danger mb-3" style={{marginTop: "35px"}}>
                <div className="card-header text-white"><i className="fas fa-info-circle"></i> Least Searcheds (Top 5)</div>
                <div className="card-body" style={{overflow: "auto", whiteSpace: "nowrap"}}>
                    {
                        lSA.map((word, index)=><LeastSearchedsWordBox key={index} word={word}/>)
                    }
                    
                </div>
            </div>

            <div className="card bg-primary mb-3">
                <div className="card-header text-white"><i className="fas fa-info-circle"></i> Most Searcheds (Top 5)</div>
                <div className="card-body" style={{overflow: "auto", whiteSpace: "nowrap"}}>
                    {
                        mSA.map((word, index)=><MostSearchedsWordBox key={index} word={word}/>)
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default SearchInfos;
