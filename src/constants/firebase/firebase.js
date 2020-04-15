// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { storageConstants } from '../storageConstants';

const developmentConfig = {
    apiKey: 'AIzaSyBCbSOeYmUnT8aMuc-9kaFAK00E-123uQQ',
    authDomain: 'psycholog-8ba2d.firebaseapp.com',
    databaseURL: 'https://psycholog-8ba2d.firebaseio.com',
    projectId: 'psycholog-8ba2d',
    storageBucket: 'psycholog-8ba2d.appspot.com',
    messagingSenderId: '89192422619',
    appId: '1:89192422619:web:8f8d52e9e378c37d8c00fe',
    measurementId: 'G-C2Y8M4Q09Q',
};

const releaseConfig = {
    apiKey: 'AIzaSyBaQCNSfXDzVD2wL1qwXce9Fuo3uwouICw',
    authDomain: 'psycholog-release-ce0a9.firebaseapp.com',
    databaseURL: 'https://psycholog-release-ce0a9.firebaseio.com',
    projectId: 'psycholog-release-ce0a9',
    storageBucket: 'psycholog-release-ce0a9.appspot.com',
    messagingSenderId: '721672595036',
    appId: '1:721672595036:web:de3a3197f99baa2404a899',
    measurementId: 'G-7DR9KH8796',
};

// TODO change when release config is ready
// const config = process.env.NODE_ENV === 'production' ? releaseConfig : developmentConfig;
const config = developmentConfig;

// TODO use when getting current user infos from db
const currentUserID = localStorage.getItem(storageConstants.USER_ID);

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
        this.storage = app.storage();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    getUser = () => this.db.ref('user');

    getUserProfilePic = () =>
        this.storage.ref().child('profile_pics').child('profile_pic.jpg');

    getAboutUsInfo = () => this.db.ref('aboutUs');

    getLogo = () => this.storage.ref().child('app_pics').child('logo.jpg');

    getPsychoPic = () =>
        this.storage.ref().child('app_pics').child('psycho.jpg');

    // Add new backend methods here
}

export default Firebase;
