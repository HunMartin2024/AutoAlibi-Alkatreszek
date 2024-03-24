function randomString(hossz){
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let str = "";
    for (let i = 0; i < hossz; i++)
    {
        str += characters[Math.floor(Math.random() * characters.length)]
    }
    return str;
}

module.exports = {randomString}