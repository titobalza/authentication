import bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    hashed_password = db.Column(db.String(480), unique=False, nullable=False)
    salt= db.Column(db.String(250), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    def __repr__(self):
        return f'<User {self.email}>'

    @classmethod
    def create(cls, body):
        try:
            user_is_valid = cls.user_exist(email=body.get("email"))
            if isinstance(user_is_valid, cls):
                raise Exception({
                    "message": "Invalid user",
                    "status": 400
                })
            if(user_is_valid) != False:
                raise Exception({
                    "message": "Internal application error",
                    "status": 500
                })
            salt_bytes = bcrypt.gensalt()
            salt = salt_bytes.decode()
            hashed_password = generate_password_hash(f'{body["password"]}{salt}')
            new_user = cls(email=body["email"], hashed_password=hashed_password, salt=salt, is_active=True)
            if not isinstance(new_user, cls):
                raise Exception({
                    "message": "Instance error",
                    "status": 500
                })
            saved = new_user.save_and_commit()
            if not saved:
                raise Exception({
                    "message": "Database error",
                    "status": 500
                })
            return new_user
        except Exception as error:
            return error.args[0]

    @classmethod
    def user_exist(cls, **kwargs):
        try:
            user_exist = cls.query.filter_by(email=kwargs["email"]).one_or_none()
            if user_exist:
                user = cls(id=user_exist.id ,email=user_exist.email, hashed_password=user_exist.hashed_password, salt=user_exist.salt, created_at=user_exist.created_at, updated_at=user_exist.updated_at)
                return user
            return False
        except Exception as error:
            return error.args[0]
            
    @classmethod
    def verify_credentials(cls, **kwargs):
        try:
            user = cls.user_exist(email=kwargs["email"])
            if not isinstance(user, cls):
                raise Exception({
                    "message": "Invalid credentials",
                    "status": 400
                })
            password_is_valid = check_password_hash(user.hashed_password, f'{kwargs["password"]}{user.salt}')
            if not password_is_valid:
                raise Exception({
                    "message": "Invalid credentials",
                    "status": 400
                })
            return user
        except Exception as error:
            return error.args[0]

    def save_and_commit(self):
        try:
            db.session.add(self)  
            db.session.commit() 
            return True
        except error:
            db.session.rollback()
            return False

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }