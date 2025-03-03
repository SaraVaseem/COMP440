import mysql.connector

registration = mysql.connector.connect(
  host="localhost",
  user="root",
  password="*"
)

print(registration)
