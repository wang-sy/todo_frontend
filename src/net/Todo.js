const axios = require("axios");
const BASE_URL = require("./interface");

/**
 * 格式化字符串函数
 * @param {Date} v
 * @param {string} format 
 * @returns string
 */
const FormatDateTime = function(v, format) {
    if (typeof v === "string") {
        return v
    }
    //v = toDate(v);
    if (v) {
        const o = {
            "M+": v.getMonth() + 1, //月份
            "d+": v.getDate(), //日
            "h+": v.getHours() % 12 === 0 ? 12 : v.getHours() % 12, //小时
            "H+": v.getHours(), //小时
            "m+": v.getMinutes(), //分
            "s+": v.getSeconds(), //秒
            "q+": Math.floor((v.getMonth() + 3) / 3), //季度
            "S": v.getMilliseconds() //毫秒
        };
        const week = {
            "0": "\u65e5",
            "1": "\u4e00",
            "2": "\u4e8c",
            "3": "\u4e09",
            "4": "\u56db",
            "5": "\u4e94",
            "6": "\u516d"
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (v.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(format)) {
            format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[v.getDay() + ""]);
        }
        for (const k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return format;

    }
}


/**
 * 创建一个todo事务的请求
 * @param {Number} UserId 用户的Id
 * @param {Date} TodoStartTime 事务的开始时间
 * @param {Date} TodoEndTime 事务的结束时间
 * @param {string} TodoTitle 事务的标题
 * @param {string} TodoDescription 事务的描述
 * @param {string} TokenVal 令牌
 */
const CreateTodo = async function(UserId, TodoStartTime, TodoEndTime, TodoTitle, TodoDescription, TokenVal) {
    let resData = undefined
    await axios({
        method: "post",
        url: BASE_URL + "/todo/create",
        headers: {
            todo_token: TokenVal,
        },
        data: {
            UserId: UserId,
            TodoStartTime: FormatDateTime(TodoStartTime, "yyyy-MM-dd hh:mm"),
            TodoEndTime: FormatDateTime(TodoEndTime, "yyyy-MM-dd hh:mm"),
            TodoTitle: TodoTitle,
            TodoDescription: TodoDescription,
        }
    }).then(function(res) {
        resData = res.data
    })
    return resData
}

/**
 * 将todo事务进行更新的请求
 * @param {Number} UserId 用户的Id
 * @param {Number} TodoId 需要更新的todo的号码
 * @param {Date} TodoStartTime 事务的开始时间
 * @param {Date} TodoEndTime 事务的结束时间
 * @param {string} TodoTitle 事务的标题
 * @param {string} TodoDescription 事务的描述
 * @param {string} TokenVal 令牌
 */
const UpdateTodo = async function(UserId, TodoId, TodoStartTime, TodoEndTime, TodoTitle, TodoDescription, TokenVal) {
    let resData = undefined
    await axios({
        method: "post",
        url: BASE_URL + "/todo/update/row",
        headers: {
            todo_token: TokenVal,
        },
        data: {
            UserId: UserId,
            TodoId: TodoId,
            TodoStartTime: FormatDateTime(TodoStartTime, "yyyy-MM-dd hh:mm"),
            TodoEndTime: FormatDateTime(TodoEndTime, "yyyy-MM-dd hh:mm"),
            TodoTitle: TodoTitle,
            TodoDescription: TodoDescription,
        }
    }).then(function(res) {
        resData = res.data
    })
    return resData
}

/**
 * 更新完成状态
 * @param {Number} UserId 用户Id 
 * @param {Number} TodoId todoId
 * @param {boolean} NewTag 新的Tag
 * @param {string} TokenVal Token
 */
const UpdateTodoFinishedTag = async function(UserId, TodoId, NewTag, TokenVal) {
    let resData = undefined
    await axios({
        method: "post",
        url: BASE_URL + "/todo/update/tag",
        headers: {
            todo_token: TokenVal
        },
        data: {
            UserId: UserId,
            TodoId: TodoId,
            TodoNewFinished: NewTag,
        }
    }).then(function(res) {
        resData = res.data
    })
    return resData
}

/**
 * 查询一个用户的所有todo
 * @param {Number} UserId 用户Id 
 * @param {string} TokenVal 令牌
 */
const RetrieveTodo = async function(UserId, TokenVal) {
    let resData = undefined
    await axios({
        method: "post",
        url: BASE_URL + "/todo/retrieve",
        headers: {
            todo_token: TokenVal
        },
        data: {
            UserId: UserId
        }
    }).then(function(res) {
        resData = res.data
    })
    return resData
}

/**
 * 删除一个todo事务
 * @param {Number} UserId 用户Id
 * @param {Number} TodoId TodoId
 * @param {string} TokenVal 令牌
 */
const DeleteTodo = async function(UserId, TodoId, TokenVal) {
    let resData = undefined
    await axios({
        method: "post",
        url: BASE_URL + "/todo/delete",
        headers: {
            todo_token: TokenVal
        },
        data: {
            UserId: UserId,
            TodoId: TodoId
        }
    }).then(function(res) {
        resData = res.data
    })
    return resData
}

const Todo = {
    CreateTodo: CreateTodo,
    UpdateTodo: UpdateTodo,
    UpdateTodoFinishedTag: UpdateTodoFinishedTag,
    RetrieveTodo: RetrieveTodo,
    DeleteTodo: DeleteTodo
}

module.exports = Todo