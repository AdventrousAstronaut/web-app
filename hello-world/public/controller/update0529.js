function getStoryByIDandToken(id, token){
    const path = "/private/" + id + "/mystories/" + token;
    const publicRef = firebase.database().ref(path);
    return publicRef.once("value").then(data => {
        return data.val();
    });
}
