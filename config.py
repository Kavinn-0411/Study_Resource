class Config(object):
    DEBUG=False
    Testing=False

class DevelopmentConfig(Config):
    DEBUG=True
    SQLALCHEMY_DATABASE_URI ='sqlite:///dev.db'
    SECRET_KEY="thisisscecret"
    SECURITY_PASSWORD_SALT="thisissaltt"
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    WTF_CSRF_ENABLED=False
    SECURITY_TOKEN_AUTHENTICATION_HEADER='Authentication-Token'