// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const developmentConfig = {
    // add development configs. 
    // deleted for security concerns.
};

const releaseConfig = {
    // add release configs
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

    databaseRef = () => this.db.ref();

    // SignIn, SignOut and more session functions
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification({
            // TODO in Production change this domain name such that https://mydomain.com
            url: 'http://localhost:3000',
        });

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

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

    doSignOut = () => this.auth.signOut();

    doDelete = () => this.auth.currentUser.delete();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // App's general info pages' functions
    getAboutUsInfo = () => this.db.ref('aboutUs');

    getFaqs = () => this.db.ref('faqs');

    // Storage functions
    getLogo = () => this.storage.ref().child('app_pics').child('logo.jpg');

    getPsychoPic = () =>
        this.storage.ref().child('app_pics').child('psycho.jpg');

    profilePic = () => this.storage.ref().child('profile_pics');

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    meeting = uid => this.db.ref(`meetings/${uid}`);

    meetings = () => this.db.ref('meetings');

    messages = uid => this.db.ref(`messages/${uid}`);

    reservation = uid => this.db.ref(`reservations/${uid}`);

    reservations = () => this.db.ref(`reservations`);

    articles = () => this.db.ref('articles');

    policy = () => this.db.ref('policy');

    getEmailServiceId = () => this.db.ref('emailServiceId');

    getEmailUserId = () => this.db.ref('emailUserId');

    getEmailTemplateId = () => this.db.ref('emailTemplateId');

    // Add new backend methods here
}

export default Firebase;
