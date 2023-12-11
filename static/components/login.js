export default{
    template:`
<div class="d-flex justify-content-center" style="margin-top: 30vh">
<div class="mb-3 p-3 bg-light">
<div class="text-danger" v-if="error!=null"> *{{error}} </div>
  <label for="user-email" class="form-label">Email address</label>
  <input type="email" class="form-control" id="user-email" placeholder="name@example.com" v-model="cred.email">
  <label for="user-password" class="form-label">Password</label>
  <input type="password" class="form-control" id="user-password" placeholder="Atleast 10 characters" v-model="cred.password" >
  <button class="btn btn-primary mt-2" @click="login">Login </button>
  </div>
</div>

    `,
    data(){
        return {
            cred:{
            email:null,
            password:null,},
            error:null,
    }},
    methods:{
        async login(){
            const res= await fetch('/user-login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(this.cred),
            })
            const data=await res.json()
            if(res.ok){
                localStorage.setItem('auth-token',data.token)
                localStorage.setItem('role',data.role)
                this.$router.push({path:'/'})
                this.$router.go()
            }
            else{
                this.error=data.message
            }
        },
    },
}