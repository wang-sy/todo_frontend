<template>
    <Modal title="创建Todo事务" @on-cancel="doClose" v-model="visible">
        <div slot="footer">
            <Button type="success" size="large" long  @click="doCreateTodo">Create Todo</Button>
        </div>
        <label
            style="line-height:3.5vh; width: 100%"
        >
            <b style="float: left">Todo Start & End Time</b>
            <DatePicker
                confirm type="datetimerange" @on-change="doChange"
                laceholder="Select Todo Start & End Date & Time" style="width: 100%;"></DatePicker>
        </label>
        <label
            style="line-height:3.5vh; width: 100%"
        >
            <b style="float: left">Todo Title</b>
            <Input v-model="TodoTitle" placeholder="Todo Title" style="width: 100%;"/>
        </label>
        <label
            style="line-height:3.5vh; width: 100%"
        >
            <b style="float: left">Todo Title</b>
            <Input :autosize="true"
                   v-model="TodoDescription" maxlength="100" show-word-limit type="textarea"
                   placeholder="Todo Description ..." style="width: 100%" />
        </label>



    </Modal>
</template>

<script>
import Todo from "../net/Todo"

export default {
    name: "CreateTodoDialog",
    data() {
        return {
            visible: false,
            Token: "",
            UserId: 0,
            TodoTitle: "",
            TodoDescription: "",
            TodoStartTime: new Date(),
            TodoEndTime: new Date()
        }
    },
    methods: {
        doClose() {
            this.visible = false
            this.TodoTitle = ""
            this.TodoDescription = ""
            this.TodoStartTime = new Date()
            this.TodoEndTime = new Date()
        },
        doCreateTodo: async function() {
            let token = localStorage.getItem("todo_token")
            let createResponse = await Todo.CreateTodo(   this.UserId, this.TodoStartTime, this.TodoEndTime,
                                                    this.TodoTitle, this.TodoDescription, token)
            console.log(createResponse)
            if(createResponse.Code !== 0) {
                this.$eventBus.$emit("OpenMessageDialog", "创建Todo失败", createResponse.Message)
            } else { // 重新获取TodoList
                this.$eventBus.$emit("getTodoList")
                this.doClose()
            }
        },
        doChange(newDateTime, type){
            type
            this.TodoStartTime = newDateTime[0]
            this.TodoEndTime = newDateTime[1]
        }
    },
    created() {
        const _this = this
        this.$eventBus.$off("OpenCreateTodoDialog")
        this.$eventBus.$on("OpenCreateTodoDialog", ()=>{
            _this.visible = true
        })
        this.UserId = Number(localStorage.getItem("todo_user_id"))
    }
}
</script>

<style scoped>

</style>