// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp } from 'firebase/app';
import { get, getDatabase, onValue, ref } from 'firebase/database';
import { getDownloadURL, getStorage, ref as storageRef } from 'firebase/storage';
import React, { Component } from 'react';
import _ from 'lodash';


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
            setView: this.setView,
            loadManual: this.loadManual,
            loadProduct: this.loadProduct,
            loadUserData: this.loadUserData, 
            productIsPinned: this.productIsPinned,
            setProductIsPinned: this.setProductIsPinned
        }
    }

    loadUserData = (userId="00192") => {
        get(ref(this.db, `/users/${userId}`)).then(data => {
            const jsData = data.val();
            this.setState(jsData);
        })
        this.setState({
        
        })
    }

    componentDidMount = () => {
        this.db = getDatabase();
        this.stor = getStorage();
    }


    setView = (view) => {
        this.setState({view})
    }

    loadManual = (classId) => {
        const classData = ref(this.db,`/class/${classId}`)
        get(classData).then((data) => {
            const dataVal = data.val();
            this.setState({manual:dataVal.manual});
            const manualRef = storageRef(this.stor, dataVal.manualUri);
            getDownloadURL(manualRef).then(url => fetch(url).then(r => r.text()).then(text => this.setState({manual: text})));
        });
    }

    loadProduct = (prodId) => {
        const db = getDatabase()
        const prodData = ref(db,`/instance/${prodId}`);
        onValue(prodData,(data) => {
            const dataVal = data.val();
            if(dataVal == null){
                console.error("Datavali is null. Prodid:", prodId);
            }
            this.setState({expiryDate:dataVal.expiry_date});
            this.loadManual(dataVal.class_id)
        });
        this.setState({expiry:'5/6/2027'})
        console.log(this.state)
    }


    render = () => {
        return <AppStateContext.Provider value={this.state}>
            {this.props.children}
        </AppStateContext.Provider>
    }
}