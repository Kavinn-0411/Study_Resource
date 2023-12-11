export default{
    template:`
    <div>
    <input type="text" placeholder="Topic" v-model="resource.topic"></input>
    <input type="text" placeholder="Descripiton" v-model="resource.description"></input>
    <input type="text" placeholder="Source Link" v-model="resource.resource_link"></input>
    <button @click="create_resource">Add Study Resource</button>
    </div>
    `,

data(){
    return{
        resource:{
            topic: null,
            description: null,
            resource_link:null,
            

        },
        token:localStorage.getItem("auth-token"),
    }

},
methods:{
    async create_resource(){
        const res=await fetch('api/study_material',{
            method:'POST',
            headers:{
                'Authentication-Token':this.token,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.resource),
        })
        const data=await res.json()
        if(res.ok){
            alert(data.message)
        }
    }
}
}