<template>
    <Modal title="创建用户" v-model="visible"
            @on-cancel="doClose">
        <div slot="footer">
            <Button type="success" size="large" long  @click="doCreateUser">Sign Up</Button>
        </div>
        <label
            style="line-height:3.5vh"
        >
            <b style="float: left">Username or Account</b>
            <Input
                prefix="ios-contact"
                v-model="UserName"
                placeholder="UserName"
            />
        </label>
        <label
            style="line-height:3.5vh"
        >
            <b style="float: left">Password</b>
            <Input
                clearable
                prefix="ios-key"
                v-model="Password"
                placeholder="Password"
            />
        </label>
    </Modal>
</template>

<script>
import User from "../net/User"

export default {
    name: "CreateUserDialog",
    data() {
        return {
            visible: false,
            UserName: "",
            Password: ""
        }
    },
    methods: {
        doClose() {
            this.visible = false
            this.UserName = ""
            this.Password = ""
        },
        doCreateUser: async function () {
            let createUserResponse = await User.CreateUser(this.UserName, this.Password)
            if (createUserResponse.Code === 1) {
                this.$eventBus.$emit("OpenMessageDialog", "创建用户失败", createUserResponse.Message)
            } else {
                this.doClose()
                this.$eventBus.$emit("OpenMessageDialog", "用户创建成功", "请输入用户名密码以登录")
            }
        }
    },
    beforeCreate: async function() {
        this.$eventBus.$off("OpenCreateUserDialog")
        this.$eventBus.$on("OpenCreateUserDialog", ()=> {
            this.visible = true
        })
    }
}
</script>

<style scoped>

</style>