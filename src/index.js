import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase/app'
import 'firebase/storage';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

var firebaseConfig = {
    apiKey: "AIzaSyBBoKVZA2HF0ndXVmTxHutGsZaL9bJZQe4",
    authDomain: "patientpal-649d0.firebaseapp.com",
    databaseURL: "https://patientpal-649d0.firebaseio.com",
    projectId: "patientpal-649d0",
    storageBucket: "patientpal-649d0.appspot.com",
    messagingSenderId: "565146973715",
    appId: "1:565146973715:web:80ef62b13b6dd9efe031e6",
    measurementId: "G-T32RQQCBP8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
