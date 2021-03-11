import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)

const routes = [
    {
        name: "Home",
        path: "/",
        component: ()=>import("../view/Home")
    },
    {
        name: "Login",
        path: "/login",
        component: ()=>import("../view/Login")
    }
];

export default new Router({
    routes
})