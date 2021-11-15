import React, { Component } from 'react';

import axios from 'axios'
import moment from 'moment';

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
            wordIsAlreadyExist: false,
            latesUpdatedTime: "never",
            serverErrorStatus:{
                error: false,
                errorStatus: "",
                errorData:""
            }
        }
        
    }

    //App strarted
    componentDidMount(){ 
        const db=JSON.parse(localStorage.getItem('wldb'));
        
        if(db){
            db.sort((a,b) => (a.en > b.en) ? 1 : ((b.en > a.en) ? -1 : 0));
            this.setState({
                words:db
            });

            console.log("---------Db fetched---------");
        }
        
        this.tick();
        
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    componentDidUpdate(prevProps, prevState){ 
        if(prevState.words != this.state.words){
            localStorage.setItem('wldb', JSON.stringify(this.state.words));
            
            console.log("---------Db changed---------");
        }
    }
    
    tick() {
        const timeDifference= moment(JSON.parse(localStorage.getItem('dblud'))).fromNow();
        
        if(timeDifference != "Invalid date"){
            this.setState({
                latesUpdatedTime: timeDifference
            });
        }
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
            
            this.setState(Object.assign(this.state.serverErrorStatus, {error:false, errorStatus:"", errorData:""}));
            }).catch((error) => {
                this.setState(Object.assign(this.state.serverErrorStatus, {error:true, errorStatus:error.response.status, errorData:error.response.data.error}));
            });

            this.setState({wordIsAlreadyExist: false});
        }
            
       

        console.log("Word existing status: "+this.state.wordIsAlreadyExist);
    }

    
    saveAndUpdateWord(wordObject){
        let wordIndex = this.state.words.findIndex((obj => obj.en === wordObject.en));
        
        if(wordIndex==-1){
            const tmpArr= [...this.state.words];
            tmpArr.push(wordObject);
            tmpArr.sort((a,b) => (a.en > b.en) ? 1 : ((b.en > a.en) ? -1 : 0));
            
            this.setState(prevState => ({
                //words: [...prevState.words, {en: wordObject.en, tr: wordObject.tr, searchCount: wordObject.searchCount}]
                words: tmpArr
            }));
    
            console.log("---------Word added---------");
        }
        else{
            this.setState(prevState => ({
                words: [...this.state.words.slice(0,wordIndex), Object.assign({}, this.state.words[wordIndex], {searchCount: this.state.words[wordIndex].searchCount+1}), ...this.state.words.slice(wordIndex+1)]
            }));
            
            console.log("---------Word updated---------");
        }
        
        localStorage.setItem('dblud', JSON.stringify(moment().format("YYYY-MM-DD HH:mm:ss")));
        this.tick();
    }

    deleteWord(wordIndex){
        const tmpArr= [...this.state.words];
        tmpArr.splice(wordIndex, 1);
        tmpArr.sort((a,b) => (a.en > b.en) ? 1 : ((b.en > a.en) ? -1 : 0));
        
        this.setState(prevState => ({
            words: tmpArr
        }));
        
        console.log("---------Word deleted---------");

        localStorage.setItem('dblud', JSON.stringify(moment().format("YYYY-MM-DD HH:mm:ss")));
        this.tick();
    }




    
    
    render(){
        return(
            <div className="container">
                <Header/>
                <DbInfos getWordCount={this.state.words.length} getLatesUpdatedTime={this.state.latesUpdatedTime}/>
                <SearchBox translateWord={this.translateWord} translatedWord={this.state.word} saveAndUpdateWord={this.saveAndUpdateWord} currentWordExistingStatus={this.state.wordIsAlreadyExist} errorCheck={this.state.serverErrorStatus}/>
                <WordContainer getAllWords={this.state.words} deleteWord={this.deleteWord}/>
                <SearchInfos getAllWords={this.state.words}/>
            </div>
        );
    }
}

export default App