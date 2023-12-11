from flask import current_app as app,jsonify,request,render_template
from flask_security import auth_required,roles_required
from flask_restful import marshal,fields
from werkzeug.security import check_password_hash
from .models import User,db,StudyResource
from .sec import datastore
from .tasks import say_hello

@app.get('/')
def home():
    return render_template("index.html")

@app.get('/admin')
@auth_required("token")
@roles_required("admin")
def admin():
    return "Welcome Admin"

@app.get('/activate/instructor/<int:inst_id>')
@auth_required("token")
@roles_required("admin")
def activate_instructor(inst_id):
    instructor=User.query.get(inst_id)
    if not instructor or "inst" not in instructor.roles:
        return {"message":"Invalid instructor or user"},404
    instructor.active=True
    db.session.commit()
    return jsonify({"message":"Instructor activated"})

@app.post('/user-login')
def user_login():
    data=request.get_json()
    email=data.get("email")
    if not email:
        return jsonify({"message":"Email not provided"}),400
    user=datastore.find_user(email=email)
    if not user:
        return jsonify({"message":"User not found"}),404
    
    if check_password_hash(user.password,data.get("password")):
        return jsonify({"token":user.get_auth_token(),"role":user.roles[0].name,"email":user.email})
    else:
        return jsonify({"message":"Incorrect Password"}),400
user_fields={
    "id":fields.Integer,
    "email":fields.String,
    "active":fields.Boolean,
}

@app.get('/users')
@auth_required("token")
@roles_required("admin")
def all_users():
    users=User.query.all()
    if(len(users)==0):
        return jsonify({"message":"No user found"},404)
    return marshal(users,user_fields)

@app.get('/study-resource/<int:id>/activate')
@auth_required('token')
@roles_required('inst')
def approve_resource(id):
    study_resource=StudyResource.query.get(id)
    if not study_resource:
        return jsonify({"message":"Resource not found"}),404
    study_resource.is_approved=True
    db.session.commit()
    return jsonify({"message":"Approved"})

@app.get('/say-hello')
def say_hello_view():
    t=say_hello.delay()
    return jsonify({"task-id":t.id})



