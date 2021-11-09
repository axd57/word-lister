import React, { Component } from 'react';

import axios from 'axios'

import Header from './Header';
import DbInfos from './DbInfos';
import SearchBox from './SearchBox';
import WordContainer from './WordContainer';
import SearchInfos from './SearchInfos';


class App extends Component{
    constructor(props){
        super(props)

        this.translateWord = this.translateWord.bind(this);
        this.saveAndUpdateWord = this.saveAndUpdateWord.bind(this);
        this.deleteWord = this.deleteWord.bind(this);
        
        this.state={
            words: [],
            word:{
                en: "en",
                tr: "tr",
                searchCount: 0
            },
            wordIsAlreadyExist: false
        }
        
    }

    //App strarted
    componentDidMount(){ 
        const db=JSON.parse(localStorage.getItem('wldb'));

        if(db){
            this.setState({
                words:db
            });
        }
        
        console.log("---------Db fetched---------");
        
    }

    componentDidUpdate(prevProps, prevState){ 
        //if(prevState.words.length != this.state.words.length){
            localStorage.setItem('wldb', JSON.stringify(this.state.words));
            console.log("---------Db changed---------");
        //}
    }
    
    
    //Word translation
    translateWord(word){
        console.log("Word sending...")
        const existWord = this.state.words.find( ({ en }) => en === word);
        
        if(existWord !=undefined){
            this.setState(Object.assign(this.state.word, {en:existWord.en, tr:existWord.tr, searchCount: existWord.searchCount}));
            
            this.setState({wordIsAlreadyExist: true});
        }
        else{
            axios.post(`https://libretranslate.de/translate`, {q: word, source: "en", target:"tr"}).then((response) => {
            this.setState(Object.assign(this.state.word, {en:word, tr:response.data.translatedText, searchCount: 1}));
            });

            this.setState({wordIsAlreadyExist: false});
        }
            
       

        console.log("Word existing status: "+this.state.wordIsAlreadyExist);
    }

    
    saveAndUpdateWord(wordObject){
        let wordIndex = this.state.words.findIndex((obj => obj.en === wordObject.en));
        
        if(wordIndex==-1){
            this.setState(prevState => ({
                words: [...prevState.words, {en: wordObject.en, tr: wordObject.tr, searchCount: wordObject.searchCount}]
            }));
    
            console.log("---------Word added---------");
        }
        else{
            this.setState(prevState => ({
                words: [...this.state.words.slice(0,wordIndex), Object.assign({}, this.state.words[wordIndex], {searchCount: this.state.words[wordIndex].searchCount+1}), ...this.state.words.slice(wordIndex+1)]
            }));
            
            console.log("---------Word updated---------");
        }
        
        
    }

    deleteWord(wordIndex){
        const tmpArr= [...this.state.words];
        tmpArr.splice(wordIndex, 1);
        
        this.setState(prevState => ({
            words:  tmpArr
        }));
        
        console.log("---------Word deleted---------");
    }




    
    
    render(){
        return(
            <div className="container">
                <Header/>
                <DbInfos getWordCount={this.state.words.length}/>
                <SearchBox translateWord={this.translateWord} translatedWord={this.state.word} saveAndUpdateWord={this.saveAndUpdateWord} currentWordExistingStatus={this.state.wordIsAlreadyExist}/>
                <WordContainer getAllWords={this.state.words} deleteWord={this.deleteWord}/>
                <SearchInfos/>
            </div>
        );
    }
}

export default App