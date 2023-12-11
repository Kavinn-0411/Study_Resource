import Home from "./components/Home.js"
import login from "./components/login.js"
import Users from "./components/Users.js"
import CreateStudyResource from "./components/CreateStudyResource.js"

const routes = [{path:'/', component:Home },
{path:'/login', component: login,name:"Login",},
{path:'/users', component:Users },
{path:'/create-resource', component:CreateStudyResource }]

export default new VueRouter({
    routes,
})