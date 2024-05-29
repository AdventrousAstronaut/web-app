const tmp = {
    "title": "...",
    "From_To": "...",
    "title_eng" : "...",
    "paragraghs": ["..", "..", "..", ".."],
    "translations": ["..", "..", "..", ".."],
    "image_urls": ["..", "..", "..", ".."],
    "speech_urls": ["..", "..", "..", ".."],
    "uid": "shi",
    "storyToken": 'shishishi'
};

// then console.log
function updateStories(tmp){ // json file
    const stories = formatStories(tmp["speech_urls"], tmp["paragraghs"], tmp["translations"], tmp["image_urls"]);
    // 使用者 ID
    const item = formatItem(tmp["title"], tmp["From_To"], tmp["image_urls"][0], stories, tmp["uid"]);
    const token = "-NxL96fO7UBm_LN8vDws";

    const path = "/private/" + tmp["uid"] + "/mystories/" + tmp["storyToken"];
    firebase.database().ref(path).set(item);
}


updateStories(tmp)
