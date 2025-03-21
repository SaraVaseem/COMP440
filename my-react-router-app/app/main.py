from Backend import create_app
from flask import Flask, jsonify, render_template, request
import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from flask import Flask, render_template, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
# from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user

app = create_app()
# db = SQLAlchemy(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
# app.config['SECRET_KEY'] = 'thisisasecretkey'

# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = 'login'


# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))


# class User(db.Model, UserMixin):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(20), nullable=False, unique=True)
#     password = db.Column(db.String(80), nullable=False)


# class RegisterForm(FlaskForm):
#     username = StringField(validators=[
#                            InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})

#     password = PasswordField(validators=[
#                              InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})

#     submit = SubmitField('Register')

#     def validate_username(self, username):
#         existing_user_username = User.query.filter_by(
#             username=username.data).first()
#         if existing_user_username:
#             raise ValidationError(
#                 'That username already exists. Please choose a different one.')


# class LoginForm(FlaskForm):
#     username = StringField(validators=[
#                            InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})

#     password = PasswordField(validators=[
#                              InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})

#     submit = SubmitField('Login')

# x = datetime.datetime.now()

# @app.route('/data', methods=['GET', 'POST'])
# # @login_required
# def get_time():
#     # data = request.form
#     # print(data)
#     # Returning an api for showing in  reactjs
#     return {
#         'Name':"geek", 
#         "Age":"22",
#         "Date":x, 
#         "programming":"python"
#         }

# @app.route('/login')
# def login():
#     return

@app.route('/logout')
def logout():
    return "<p>Logout</p>"

# @app.route('/sign-up')
# def sign_up():

if __name__ == '__main__':
    app.run(debug=True)