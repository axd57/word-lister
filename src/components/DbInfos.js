import React, { Component } from 'react'

export default class DbInfos extends Component {
    render() {

        const {getWordCount, getLatesUpdatedTime}= this.props;

        return (
            <div style={{textAlign: "center", marginTop: "20px", marginBottom: "55px"}}>
                <div className="card text-white bg-success" style={{maxWidth: "18rem", display: "inline-block", marginRight: "20px"}}>
                    <div className="card-header"><i className="fas fa-check-square"></i> Total Words</div>
                    <div className="card-body" style={{textAlign: "center"}}>
                        <h5 className="card-title">{parseInt(getWordCount)}</h5>
                    </div>
                </div>

                <div className="card text-white bg-secondary" style={{maxWidth: "18rem", display: "inline-block"}}>
                    <div className="card-header"><i className="fas fa-clock"></i> Latest Update</div>
                    <div className="card-body" style={{textAlign: "center"}}>
                        <h5 className="card-title">{getLatesUpdatedTime}</h5>
                    </div>
                </div>
            </div>
        )
    }
}
