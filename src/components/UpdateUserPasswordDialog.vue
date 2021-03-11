<template>
    <Modal title="修改密码" v-model="visible"
           @on-cancel="doClose">
        <div slot="footer">
            <Button type="success" size="large" long  @click="doUpdateUserPassword">Change Password</Button>
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
            <b style="float: left">Old password</b>
            <Input
                clearable
                prefix="ios-key"
                v-model="Password"
                placeholder="Old password"
            />
        </label>
        <label
            style="line-height:3.5vh"
        >
            <b style="float: left">New password</b>
            <Input
                clearable
                prefix="ios-key"
                v-model="NewPassword"
                placeholder="New password"
            />
        </label>
    </Modal>
</template>

<script>
import User from "../net/User"

export default {
    name: "UpdateUserPasswordDialog",
    data() {
        return {
            visible: false,
            UserName: "",
            Password: "",
            NewPassword: ""
        }
    },
    methods: {
        doClose() {
            this.visible = false
            this.UserName = ""
            this.Password = ""
            this.NewPassword = ""
        },
        doUpdateUserPassword: async function() {
            let updateResponse = await User.UpdateUserPassword(this.UserName, this.Password, this.NewPassword)
            if (updateResponse.Code !== 0) {
                this.$eventBus.$emit("OpenMessageDialog", "密码更改失败", updateResponse.Message)
            } else {
                this.doClose()
                this.$eventBus.$emit("OpenMessageDialog", "密码更改成功", "请输入用户名密码以登录")
            }
        }
    },
    created() {
        const _this = this
        this.$eventBus.$off("OpenUpdateUserPasswordDialog")
        this.$eventBus.$on("OpenUpdateUserPasswordDialog", ()=> {
            _this.visible = true
        })
    }
}
</script>

<style scoped>

</style>