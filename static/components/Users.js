export default{
    template:`<div class="mt-5" style="margin-left:500px">List of Users
    <div v-for="a in all_users" class="mt-2">{{a.email}}
    <button class="m-2 btn btn-secondary" v-if="!a.active" @click="activate_inst(a.id)">Activate</button>
    </div>
    </div>
    `
    ,
   data(){
    return{
        token:localStorage.getItem('auth-token'),
        all_users:[]
    }

   },
   methods:{
    async activate_inst(id){
        const res=await fetch(`/activate/instructor/${id}`,{
            headers:{"Authentication-Token":this.token,
        }
        })
        const data=await res.json() 
        if(res.ok){
            alert(data.message)
        }
        else{
            alert(data.message)
        }
    },

   },
   async mounted(){
        const res=await fetch('/users',{
            headers:{"Authentication-Token":this.token},
        })
        const data=await res.json()
        if(res.ok){
            this.all_users=data
        }
   },
}