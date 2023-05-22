import firebase from 'firebase/compat/app';

// 사용할 파이어베이스 서비스 주석 해제
//import "firebase/compat/auth";
import "firebase/compat/database";
//import "firebase/compat/firestore";
//import "firebase/compat/functions";
import "firebase/storage";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옴
const firebaseConfig = {
    //7조 매일이 firebase
    
    apiKey: "AIzaSyC-ZegPzuDiKTNGf3I1nXzWhDH0FZUvqWo",
    authDomain: "maeili-fbc63.firebaseapp.com",
    databaseURL: "https://maeili-fbc63-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "maeili-fbc63",
    storageBucket: "maeili-fbc63.appspot.com",
    messagingSenderId: "804209668328",
    appId: "1:804209668328:web:0009628bdcbb7be3f8595d",
    measurementId: "G-NFSCK767PX"


    // apiKey: "AIzaSyDRhwEgKdRVTkf0kvrWRaLBCruhRDSGyl0",
    // authDomain: "maeili.firebaseapp.com",
    // databaseURL: "https://maeili-default-rtdb.asia-southeast1.firebasedatabase.app/",
    // projectId: "maeili",
    // storageBucket: "maeili.appspot.com",
    // messagingSenderId: "611304523563",
    // appId: "1:611304523563:web:1437b7de0bc1d1d36b676e",
    // measurementId: "G-R4464PX0TX"
};


//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database()

