<template>
    <Layout>
        <Header :style="{position: 'fixed', width: '100%'}">
            <Menu ref="menu" mode="horizontal" theme="dark" :active-name="ActiveKey"
                  @on-select="checkSelect">
                <h1 style="float: left; position: relative; color: #eaecef"><b>Gotodo</b></h1>
                <Button
                    style="
                        float: right; position:relative;
                        height: 60%; top: 20%;
                        margin-left: 2vw;
                    "
                    @click="doSignOut"
                ><b>Sign Out</b></Button>
                <h3 style="float: right; position: relative; color: #eaecef"><b>{{UserName}}</b></h3>
                <div style="width: 480px; margin: 0 auto">
                    <MenuItem name="1">
                        <Icon @click="changeFilterMode('Agency')" type="md-list" />
                        <font @click="changeFilterMode('Agency')">Agency</font>
                    </MenuItem>
                    <MenuItem name="2">
                        <Icon @click="changeFilterMode('Completed')" type="md-checkbox-outline" />
                        <font @click="changeFilterMode('Completed')">Completed</font>
                    </MenuItem>
                    <MenuItem name="3">
                        <Icon @click="changeFilterMode('ShowAll')" type="ios-apps" />
                        <font @click="changeFilterMode('ShowAll')">Show All</font>
                    </MenuItem>
                    <MenuItem name="4">
                        <Icon @click="doCreateTodo" type="md-add-circle" />
                        <font @click="doCreateTodo" >Add Todo</font>
                    </MenuItem>
                </div>
            </Menu>
        </Header>
        <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
            <TodoField></TodoField>
            <CreateTodoDialog></CreateTodoDialog>
            <UpdateTodoDialog></UpdateTodoDialog>
        </Content>
    </Layout>
</template>

<script>
import Token from "../net/Token"
import TodoField from "@/components/TodoField";
import CreateTodoDialog from "@/components/CreateTodoDialog";
import UpdateTodoDialog from "@/components/UpdateTodoDialog";

export default {
    name: "Home",
    components: {UpdateTodoDialog, CreateTodoDialog, TodoField},
    data() {
        return {
            timer: null,
            UserName: "",
            UserId: "",
            ActiveKey: "1",
            BeforeKey: "1",
            openKeys: []
        }
    },
    methods: {
        doCheckToken: async function() {
            // 进入主页面前，会对用户的token进行核验
            // 如果没有token或是核验错误，那么将会跳转到login界面中
            if (!await CheckToken()){
                await this.$router.push({name: "Login"})
            } else {
                this.UserId = localStorage.getItem("todo_user_id")
            }
        },
        doSignOut() {
            localStorage.setItem("todo_user_name", null)
            localStorage.setItem("todo_user_id", null)
            localStorage.setItem("todo_token", null)
            this.$router.push({name: "Login"})
        },
        checkSelect(name) {
            if (name === "4") {
                const _this = this
                this.$nextTick(()=>{
                    _this.ActiveKey = _this.BeforeKey
                    _this.$refs.menu.updateActiveName();
                })
            } else {
                this.BeforeKey = name
            }
        },
        doCreateTodo() {
            this.$eventBus.$emit("OpenCreateTodoDialog")
        },
        changeFilterMode(mode){
            this.$eventBus.$emit("setTodoListFilterMode", mode)
        }
    },
    created: async function () {
        // 每20秒做一次
        this.UserName = localStorage.getItem("todo_user_name")
        await this.doCheckToken()
        this.timer = setInterval(this.doCheckToken, 1000 * 20);
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
}

/**
 * 检测token
 * @returns {Promise<boolean>} true-->验证成功 false-->验证失败
 */
const CheckToken = async function (){
    let token = localStorage.getItem("todo_token")
    console.log("check token :", token)
    if(token === null) {
        return false
    }
    let checkResponse = await Token.RetrieveToken(token)
    if(checkResponse.Code === 1) {
        return false
    } else { // 检测token是否需要刷新
        if (checkResponse.Data.Refresh === true) {
            localStorage.setItem("todo_token", checkResponse.Data.TokenVal)
        }
    }
    // 完成了校验，将本地的UserId进行更改
    localStorage.setItem("todo_user_id", checkResponse.Data.UserId)
    return true
}
</script>



<style scoped>

</style>