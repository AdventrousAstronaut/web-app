const config = {
    authDomain: "project-20240429",
    databaseURL: "https://project-20240429-default-rtdb.firebaseio.com/",
    projectId: "project-20240429",
}
firebase.initializeApp(config);


class User {
    constructor(email, pwd) {
        this.username = "Anon",
        this.email = email;
        this.pwd = pwd;
        this.userID = Date.now().toString();
        this.avatarURL = "/public/assets/image/defaultAvatar.jpeg",
        this.intro = "I have something to say...";
    }
}

// register: register using set
function register(email, pwd) {
    const path = "/users/" + email.replace(".", ",");
    const newUser = new User(email, pwd);
    const dbRef = firebase.database().ref(path);
    return dbRef.set(newUser);
}

// login: if the user password is valid
async function isValid(email, loginPwd){
    const user = await getUser(email);
    return user && user.pwd === loginPwd;
}


// return user information
// to render on the personal page
async function getUser(email){
    const path = "/users/" + email.replace(".", ",");
    const snapshot = await firebase.database().ref(path).once('value');
    const user = snapshot.val();
    return user;
}



const mail = "doraamon@gmail.com";
const password = "12345";

// isValid(mail, password).then(res => {
//     console.log("is valid: " + res);
// })

// register(mail, password)
// .then(() => {
//     console.log("User registered successfully!");
// });


getUser(mail).then(data => {
    console.log(data);
    console.log("userID: " + data.userID);
})