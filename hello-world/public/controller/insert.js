const config = {
    authDomain: "project-20240429",
    databaseURL: "https://project-20240429-default-rtdb.firebaseio.com/",
    projectId: "project-20240429",
}
firebase.initializeApp(config);


class Paragraph {
    constructor(text, soundtrack, translation) {
        this.text = text;
        this.translation = translation;
        this.soundtrack = soundtrack;
    }
}

class Story {
    constructor(parag, trans, imageURL) {
        this.paragraph = parag;
        this.translation = trans;
        this.picture = imageURL;
    }
}

class Item {
    constructor(title, language, imageURL, stories, sig) {
        this.title = title;
        this.language = language;
        this.stories = stories;
        this.image = imageURL;
        this.signature = sig;
    }
}

function formatStories(soundList, textList, translationTextList){
    const arr = [];
    for (let i = 0; i < soundList.length; i++) {
        arr.push(new Paragraph(soundList[i], textList[i], translationTextList[i]));
    }
    return arr;
}

function formatItem(title, language, imageURL, stories, id){
    return new Item(title, language, imageURL, stories, id);
}

// testing use, the item is beta ver. please ignore
function insertItem(item){
    firebase.database().ref("/items/").push(item);
}

// publishStories with Item
function publishStories(token, item){
    const path = "/public/stories/" + token;
    firebase.database().ref(path).set(item);
}

// new a Stories
// helper function upload
function newStories(id, item){
    const path = "/private/" + id + "/mystories/";
    return new Promise((resolve, reject) => {
        firebase.database().ref(path).push(item)
            .then(data => {
                resolve(data.key);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// function update story
function updateStories(id, token, item){
    const path = "/private/" + id + "/mystories/" + token;
    firebase.database().ref(path).set(item);
}

// getPublishStories
// return stories information
// use .then(data => {}) retrieve and use the data
function getPublishedStories(){
    const publicRef = firebase.database().ref("/public/stories");
    return publicRef.once('value').then(data => {
        return data.val();
    });
}

function getMyStories(id){
    const path = "/private/" + id + "/mystories/";
    const publicRef = firebase.database().ref(path);
    return publicRef.once("value").then(data => {
        return data.val();
    });
}

// Example usage:
const soundList = ["song1.mp4", "song2.mp4"];
const textList = ["Text 1", "Text 2"];
const translationtextList =  ["Text 1", "Text 2"];
const stories = formatStories(soundList, textList, translationtextList);
const imageURL = "../static/image/1.png";
const ID = "id"
const item = formatItem("Title", "Language", imageURL, stories, ID);
const token = "-NxL96fO7UBm_LN8vDws";
// insertItem(item);

// publishStories(token, item);
// getPublishedStories().then(data => {
//     console.log(data);
// });

// newStories(ID, item).then(key => {
//     console.log("Unique key:", key);
// });

// updateStories(ID, "-NxLHr_qzd_a4_hZsRXe", item);


// getMyStories("id")
// .then(stories => {
//     console.log(stories);
// })
