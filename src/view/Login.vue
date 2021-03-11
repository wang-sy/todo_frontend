<template>
    <main>
        <!--用户登录-->
        <div class="loginContainer">
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
                <a style="float: right" @click="openUpdateUserPasswordDialog"><b>Change password?</b></a>
                <Input
                    clearable
                    prefix="ios-key"
                    v-model="PassWord"
                    placeholder="Password"
                />
            </label>
            <Button
                type="success"
                style="margin-top: 2vh"
                size="large"
                @click="doLogin"
            ><b>Sign in</b></Button>
            <Button
                style="margin-top: 1vh"
                size="large"
                @click="openSignUpDialog"
            ><b>Sign up</b></Button>
        </div>
        <UpdateUserPasswordDialog></UpdateUserPasswordDialog>
        <CreateUserDialog></CreateUserDialog>
    </main>
</template>

<script>
import User from "../net/User"
import CreateUserDialog from "@/components/CreateUserDialog";
import UpdateUserPasswordDialog from "@/components/UpdateUserPasswordDialog";

export default {
    name: "Login",
    components: {
        CreateUserDialog,
        UpdateUserPasswordDialog
    },
    data() {
        return {
            UserName: "",
            PassWord: ""
        }
    },
    methods: {
        doLogin: async function() {
            let loginResponse = await User.RetrieveUser(this.UserName, this.PassWord)
            if(loginResponse.Code !== 0){
                this.$eventBus.$emit("OpenMessageDialog", "登陆错误", loginResponse.Message)
            } else {
                let token = loginResponse.Data.Token.TokenVal
                localStorage.setItem("todo_token", token)
                localStorage.setItem("todo_user_id", loginResponse.Data.UserId)
                localStorage.setItem("todo_user_name", this.UserName)
                this.UserName = this.PassWord = ""
                await this.$router.push({name: "Home"})
            }
        },
        openSignUpDialog() {
            this.$eventBus.$emit("OpenCreateUserDialog")
        },
        openUpdateUserPasswordDialog() {
            this.$eventBus.$emit("OpenUpdateUserPasswordDialog")
        }
    },
}
</script>

<style scoped>

.loginContainer{
    position: absolute;
    width: 28vw;
    left: 36vw;

    text-align: center;
    margin-top: 22vh;
    padding: 3vh 2vw 3vh 2vw;
    border: 2px solid #eaecef;

    display: flex;
    flex-direction: column;
    background-color: #f5f8fa;
    border-radius:25px;
}


</style>