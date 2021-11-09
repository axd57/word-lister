import React, { Component, Fragment } from 'react'

import WordBox from './WordBox'

export default class WordContainer extends Component {
    render() {
        return (
            <Fragment>
                <div style={{textAlign: "center"}}>
                    {
                        this.props.getAllWords.map((word, index)=><WordBox key={index} word={word} itemIndex={index} deleteWord={this.props.deleteWord}/>)
                    }
                </div>

                <hr/>
            </Fragment>
        )
    }
}
