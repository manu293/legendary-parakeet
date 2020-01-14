// imports
import app from 'firebase/app';
import 'firebase/auth';

// local imports
import firebaseConfig from './config';

// handle login and signup
class Firebase {
  constructor() {
    // Initialize Firebase
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  async register(name, email, password) {
    //   creating a new user using email and password authentication
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    const updatedUserName = await newUser.user.updateProfile({ displayName: name });
    return updatedUserName;
  }

  async login(email, password) {
    //   logging user using email and password
    const loggedInUser = await this.auth.signInWithEmailAndPassword(email, password);
    return loggedInUser;
  }

  async logout() {
    await this.auth.signOut();
  }

  async resetPassword(email) {
    await this.auth.sendPasswordResetEmail(email);
  }
}

const firebase = new Firebase();

export default firebase;
