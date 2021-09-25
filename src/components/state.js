import React, { Component } from 'react';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

import {initializeApp} from 'firebase/app'
import {getDatabase, ref, onValue} from 'firebase/database'

// import credJson from '../credentials/pharmpham-ca9c2-firebase-adminsdk-rbpxq-ba90ed6013.json'

const firebaseConfig = {
    apiKey: "AIzaSyDMdfO60OMPkrgWehDESBiGCeQUUO8kbz4",
    authDomain: "pharmpham-ca9c2.firebaseapp.com",
    databaseURL: "https://pharmpham-ca9c2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pharmpham-ca9c2",
    storageBucket: "pharmpham-ca9c2.appspot.com",
    messagingSenderId: "943213270509",
    appId: "1:943213270509:web:dd1d52fc7a840e127203e4",
    measurementId: "G-WSDG3CW4RN"
  };



export const AppStateContext = React.createContext({});

export class AppStateProvider extends Component {
    constructor({props}){
        super();
        // Add default fields & functions to change state
        initializeApp(firebaseConfig);
        this.state = {
            setX: this.setX,
            x: 2,
            setView: this.setView,
            loadManual: this.loadManual,
            loadProduct: this.loadProduct 
        }
    }

    componentDidUpdate = () => {
        this.x = 2;
    }


    setView = (view) => {
        this.setState({view})
    }

    loadManual = (classId) => {
        const db = getDatabase()
        const classData = ref(db,`/class/${classId}`)
        onValue(classData,(data) => {
            const dataVal = data.val();
            // console.log(dataVal.manual)
            this.setState({manual:dataVal.manual});
        });
        const path = '/md_example.md'
        fetch(path).then(r => r.text()).then(text => this.setState({manual: text}));
    }

    loadProduct = (prodId) => {
        const db = getDatabase()
        const prodData = ref(db,`/instance/${prodId}`);
        onValue(prodData,(data) => {
            const dataVal = data.val();
            this.setState({expiryDate:dataVal.expiry_date});
            this.loadManual(dataVal.class_id)
        });
        this.setState({expiry:'5/6/2027'})
        console.log(this.state)
    }

    setX = () => {
        this.setState({x: 3});
        // fetch(path).then(r => r.text()).then(text => setContent(text));z
    }

    loadProp


    render = () => {
        return <AppStateContext.Provider value={this.state}>
            {this.props.children}
        </AppStateContext.Provider>
    }
}