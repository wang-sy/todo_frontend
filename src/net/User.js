const axios = require("axios")
const BASE_URL = require("./interface")

/**
 * 发送创建用户请求
 * @param {string} UserName 用户名
 * @param {string} UserPassword 密码
 * @returns 将返回的data部分返回
 */
const CreateUser = async function(UserName, UserPassword) {
    let resData = undefined
    await axios({
        method: "post",
        url: BASE_URL + "/user/create",
        data: {
            UserName: UserName,
            UserPassword: UserPassword
        }
    }).then(function(res) {
        resData = res.data
    })
    return resData
}

/**
 * 发送登陆请求
 * @param {string} UserName 用户名
 * @param {string} UserPassword 密码
 * @returns 将响应的data部分返回
 */
const RetrieveUser = async function(UserName, UserPassword) {
    let resData = undefined
    await axios({
        method: "post",
        url: BASE_URL + "/user/retrieve",
        data: {
            UserName: UserName,
            UserPassword: UserPassword
        }
    }).then(function(res) {
        resData = res.data
    })
    return resData
}

/**
 * 更新密码请求
 * @param {string} UserName 用户名
 * @param {string} UserPassword 原本的密码
 * @param {string} NewPassword 新的密码
 * @returns 将响应的data部分返回
 */
const UpdateUserPassword = async function(UserName, UserPassword, NewPassword) {
    let resData = undefined
    await axios({
        method: "post",
        url: BASE_URL + "/user/update",
        data: {
            UserName: UserName,
            UserPassword: UserPassword,
            NewPassword: NewPassword
        }
    }).then(function(res) {
        resData = res.data
    })
    return resData
}

const User = {
    UpdateUserPassword: UpdateUserPassword,
    RetrieveUser: RetrieveUser,
    CreateUser: CreateUser
}

module.exports = User