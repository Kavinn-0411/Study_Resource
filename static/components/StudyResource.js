export default{
    template:`
    <div class="">
    <h4>{{resource.topic}}</h4>
    <h4>{{resource.description}}</h4>
    <h4>{{resource.creator}}</h4>
    <p></p>
    <button class="btn btn-success" v-if="!resource.is_approved && role=='inst'" @click="approve(resource.id)">Approve</button>
    </div>
    `,
    props:['resource'],
    data(){
        return{
            role:localStorage.getItem("role")
        }
    },
    methods:
    {
        async approve(id){
            const res=await fetch(`/study-resource/${id}/activate`,{
                headers:{
                    "Authentication-Token":localStorage.getItem('auth-token'),
                }
            })
            const data=await res.json()
            if(res.ok){
                alert(data.message)
                this.$router.go(0)
            }
            else{
                alert(data.message)
            }
        } 
    }
}