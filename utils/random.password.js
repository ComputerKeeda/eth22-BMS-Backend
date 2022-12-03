const getPassword = async () => {
    var pwd =  Math.random().toString(36).slice(2);
    return pwd.toString();
}

module.exports = {getPassword};