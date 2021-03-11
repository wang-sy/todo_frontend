const axios = require("axios");
const BASE_URL = require("./interface");


/**
 * 验证用户token
 * @param {string} TokenVal
 */
const RetrieveToken = async function(TokenVal) {
    let resData = undefined
    await axios({
        method: "post",
        url: BASE_URL + "/user/token",
        data: {
            TokenVal: TokenVal
        }
    }).then(function(res) {
        resData = res.data
    })
    return resData
}

const Token = {
    RetrieveToken: RetrieveToken
}

module.exports = Token