from flask import jsonify
from flask_restful import Resource,Api, marshal,reqparse,fields,marshal_with
from flask_security import auth_required,roles_required,current_user
from .models import StudyResource,db
from sqlalchemy import or_

api=Api(prefix='/api')

parser=reqparse.RequestParser()

parser.add_argument('topic',type=str,help='Topic should be a string',required=True)
parser.add_argument('description',type=str,help='String must be',required=True)
parser.add_argument('resource_link',type=str,help='String should be',required=True)

class Creator(fields.Raw):
    def format(self,user):
        return user.email

study_material_fields={
    "id":fields.Integer,
    "topic":fields.String,
    "description":fields.String,
    "resource_link":fields.String,
    "creator":Creator,
    "is_approved":fields.Boolean

}


class StudyMaterial(Resource):
    @auth_required("token")
    def get(self):
        if "inst" not in current_user.roles:
             study_resources=StudyResource.query.filter(or_(StudyResource.is_approved==True,StudyResource.creator==current_user)).all()
            
        else:
            study_resources=StudyResource.query.all()
           
        if len(study_resources)>0:
            return marshal(study_resources,study_material_fields)
        else:
            return jsonify({"message":"No resource found"}),404


       
        
    @auth_required("token")
    @roles_required("stud")
    def post(self):
        args=parser.parse_args()
        study_resource=StudyResource(topic=args.get("topic"),description=args.get("description"),resource_link=args.get("resource_link"),creator_id=current_user.id)
        db.session.add(study_resource)
        db.session.commit()
        return{"message":"Soruce Created!"}

api.add_resource(StudyMaterial,'/study_material')