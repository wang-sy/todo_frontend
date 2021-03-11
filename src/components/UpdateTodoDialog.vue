<template>
    <Modal title="修改todo事务" v-model="visible">
        <div slot="footer">
            <Button type="success" size="large" long  @click="doChangeTodo">Change Todo</Button>
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
    name: "UpdateTodoDialog",
    methods: {
        doClose() {
            this.visible = false
        },
        doChangeTodo: async function () {
            let token = localStorage.getItem("todo_token")
            let updateTodoResponse = await Todo.UpdateTodo(this.UserId, this.TodoId, this.TodoStartTime, this.TodoEndTime,
                                                     this.TodoTitle, this.TodoDescription, token)
            if (updateTodoResponse.Code !== 0) {
                this.$eventBus.$emit("OpenMessageDialog", "更新todo时发生错误", updateTodoResponse.Message)
            } else {
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
    data() {
        return {
            visible: false,
            Token: "",
            UserId: 0,
            TodoTitle: "",
            TodoDescription: "",
            TodoStartTime: new Date(),
            TodoEndTime: new Date(),
            TodoId: 0
        }
    },
    created() {
        const _this = this
        this.UserId = localStorage.getItem("todo_user_id")
        this.$eventBus.$off("OpenUpdateTodoDialog")
        this.$eventBus.$on("OpenUpdateTodoDialog", (todo)=>{
            _this.TodoTitle = todo.TodoTitle
            _this.TodoDescription = todo.TodoDescription
            _this.TodoStartTime = todo.TodoStartTime
            _this.TodoEndTime = todo.TodoEndTime
            _this.TodoId = todo.TodoId
            _this.UserId = todo.UserId
            _this.visible = true
        })
        console.log("create")
    },
}
</script>

<style scoped>

</style>