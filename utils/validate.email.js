const check = async (text) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,12})+$/;
    var check = text.match(mailformat);
    return check;
}

module.exports = {check};