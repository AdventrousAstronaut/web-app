const firebaseConfig = {
    apiKey: "AIzaSyAq9MFTflBccRelk4pElUHkkKwwdGq_xXs",
    authDomain: "mywebsite-vivian.firebaseapp.com",
    databaseURL: "https://mywebsite-vivian-default-rtdb.firebaseio.com",
    projectId: "mywebsite-vivian",
    storageBucket: "mywebsite-vivian.appspot.com",
    messagingSenderId: "224190063105",
    appId: "1:224190063105:web:3017a60fc5aa4ae9b1d600"
  };
firebase.initializeApp(firebaseConfig);


class Paragraph {
    constructor(text, soundtrack, translation, img) {
        this.text = text;
        this.translation = translation;
        this.soundtrack = soundtrack;
        this.img = img;
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

function formatStories(soundList, textList, translationTextList, ImgList){
    const arr = [];
    for (let i = 0; i < soundList.length; i++) {
        arr.push(new Paragraph(soundList[i], textList[i], translationTextList[i], ImgList[i]));
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

// 已存在的
function publishStories(token, item){
    const path = "/public/stories/" + token;
    firebase.database().ref(path).set(item);
}

// 新增一個故事, 拿物件與 用戶 id
// 如何獲取用戶 id? -> 見 retUserInfo()
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

// 更新故事
// 用戶 id -> retUserInfo()
// 故事 token -> 從網頁獲取
// 推入一個新的故事進入 Storage
function updateStories(id, token, item){
    const path = "/private/" + id + "/mystories/" + token;
    firebase.database().ref(path).set(item);
}

// getPublishStories
// return stories information
// use .then(data => {}) retrieve and use the data
// 在此用 hidden type 將故事id存入,未來update故事可以拿取
function getPublishedStories(){
    const publicRef = firebase.database().ref("/public/stories");
    return publicRef.once('value').then(data => {
        return data.val();
    });
}

// 給予用戶 id 拿取此人的所有物件
function getMyStories(id){
    const path = "/private/" + id + "/mystories/";
    const publicRef = firebase.database().ref(path);
    return publicRef.once("value").then(data => {
        return data.val();
    });
}

const tmpAudio = "https://firebasestorage.googleapis.com/v0/b/mywebsite-vivian.appspot.com/o/audio%2F1716360291168-Franc%20Moody%20-%20Move%20Me%20%5BTubeRipper.com%5D.mp3?alt=media&token=d7136cdb-61d2-4ff1-9ed0-494110c803cb";
const tmpImg = "https://firebasestorage.googleapis.com/v0/b/mywebsite-vivian.appspot.com/o/images%2F1716360046025-%E5%9C%96%E7%89%871.png?alt=media&token=6bad75d2-2274-4330-a999-70146186b565";

// Example usage:
const imgList = [tmpImg, tmpImg];
const soundList = [tmpAudio, tmpAudio];
const textList = ["Text 1", "Text 2"];
const translationtextList =  ["Text 1", "Text 2"];
const stories = formatStories(soundList, textList, translationtextList, imgList);
const imageURL = tmpImg;
// 使用者 ID
const ID = "T9wUmGbpGsMOSWw3f2PPaLUD8hr2"
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
// updateStories(ID, item);

// getMyStories("id")
// .then(stories => {
//     console.log(stories);
// })
