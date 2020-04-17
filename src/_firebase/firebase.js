// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

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

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.serverValue = app.database.ServerValue;
        this.emailAuthProvider = app.auth.EmailAuthProvider;

        this.auth = app.auth();
        this.db = app.database();
        this.storage = app.storage();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification({
            // TODO in Production change this domain name such that https://mydomain.com
            url: 'http://localhost:3000',
        });

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

    getFaqs = () => this.db.ref('faqs');

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        // default empty roles
                        if (dbUser && !dbUser.roles) {
                            dbUser.roles = {};
                        }

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser,
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    // Add new backend methods here
}

export default Firebase;
