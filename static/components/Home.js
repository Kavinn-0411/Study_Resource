import StudentHome from "./StudentHome.js"
import AdminHome from "./AdminHome.js"
import InstructorHome from "./InstructorHome.js"
import StudyResource from "./StudyResource.js"


export default{
    template: `
    <div><StudentHome v-if="userRole=='stud'"/>
    <InstructorHome v-if="userRole=='inst'"/>
    <AdminHome v-if="userRole=='admin'"/>
    <StudyResource v-for="(resource,index) in resources":key="index" :resource="resource"/>
    </div>

    `,
    data(){
        return{
            userRole:localStorage.getItem('role'),
            resources:[],
            token:localStorage.getItem('auth-token'),
        }
    },
    components:{
        StudentHome,
        InstructorHome,
        AdminHome,
        StudyResource
    },

    async mounted(){
        const res=await fetch('/api/study_material',{
            headers:{'Authentication-Token':this.token},
        })
        const data=await res.json()
        console.log(data)
        if (res.ok){
            this.resources=data
            }
        else{
            alert(data.message)
        }

    }
}