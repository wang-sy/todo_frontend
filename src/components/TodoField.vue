<template>
    <Card>
        <div v-for="item in ShowList" :key="item.TodoId">
            <card style="margin-top: 2vh">
                <p slot="title">
                    <Icon @click="updateTodoFinishedTag(item)"
                        type="md-radio-button-off" v-if="item.TodoFinished === undefined"/>
                    <Icon type="md-radio-button-on" v-if="item.TodoFinished !== undefined"/>
                    {{ item.TodoTitle }}

                    <font style="margin-left: 2vw; font-size: 1.4vh"> <Icon type="md-alarm" />    {{item.TodoStartTime }} -- {{ item.TodoEndTime}}</font>
                </p>
                <div slot="extra">
                    <a @click="doUpdate(item)"> change<Icon type="md-create" /></a>
                    <a @click="doDelete(item.TodoId)" style="margin-left: 2vw"> Delete<Icon type="ios-trash" /></a>
                </div>
                {{item.TodoDescription}}
            </card>
        </div>
    </Card>
</template>

<script>
import Todo from "../net/Todo"

export default {
    name: "TodoField",
    data() {
        return {
            TodoList: [],
            ShowList: [],
            UserId: "",
            Token: "",
            mode: "Agency"
        }
    },
    methods: {
        getTodoList: async function() {
            // 在本处，Token与UserId必生效
            let token = localStorage.getItem("todo_token")
            let todoResponse = await Todo.RetrieveTodo(this.UserId, token)
            if (todoResponse.Code !== 0) {
                this.$eventBus.$emit("OpenMessageDialog", "获取todolist失败", todoResponse.Message)
            } else {
                this.TodoList = todoResponse.Data
                this.filterData()
            }
        },
        // 筛选数据
        filterData() {
            this.ShowList = []
            for(let i = this.TodoList.length - 1; i >= 0; i --) {
                if (this.mode === "Agency" && this.TodoList[i].TodoFinished !== true) {
                    this.ShowList.push(this.TodoList[i])
                } else if (this.mode === "Completed" && this.TodoList[i].TodoFinished === true) {
                    this.ShowList.push(this.TodoList[i])
                } else if (this.mode === "ShowAll") {
                    this.ShowList.push(this.TodoList[i])
                }
            }
        },
        doDelete: async function (TodoId) {
            let todoResponse = await Todo.DeleteTodo(this.UserId, TodoId, this.Token)
            if(todoResponse.Code !== 0) {
                this.$eventBus.$emit("OpenMessageDialog", "删除Todo时发生错误", todoResponse.Message)
            } else {
                this.getTodoList()
            }
        },
        doUpdate(todo) {
            this.$eventBus.$emit("OpenUpdateTodoDialog", todo)
        },
        updateTodoFinishedTag: async function (todo) {
            let token = localStorage.getItem("todo_token")
            let updateResponse = await Todo.UpdateTodoFinishedTag(todo.UserId, todo.TodoId, true, token)
            if (updateResponse.Code !== 0) {
                this.$eventBus.$emit("OpenMessageDialog", "更新TodoFinishedTag出错", updateResponse.Message)
            } else {
                this.getTodoList()
            }

        }
    },
    created() {
        this.UserId = Number(localStorage.getItem("todo_user_id"))
        this.Token = localStorage.getItem("todo_token")
        this.getTodoList()
        const _this = this

        // 设置重新获取todoList的监听器
        this.$eventBus.$off("getTodoList")
        this.$eventBus.$on("getTodoList", ()=> {
            _this.getTodoList()
        })
        // 设置当前的filter模式
        this.$eventBus.$off("setTodoListFilterMode")
        this.$eventBus.$on("setTodoListFilterMode", (mode)=> {
            _this.mode = mode
            console.log(mode)
            _this.filterData()
        })
    }
}
</script>

<style scoped>

</style>