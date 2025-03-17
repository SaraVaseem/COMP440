import mysql.connector

registration = mysql.connector.connect(
  host="localhost",
  user="root",
  password="Marimbagirl02!",
  database = "registration"
)
print('It works')
cursor = registration.cursor()



email = input("Enter email: ")
password = input("Enter password: ")



query = "SELECT * FROM user WHERE email = %s AND password = %s"


# Run query and print SQL for debugging
result = cursor.fetchall()

# Debugging: Print raw query results
print("Query result from MySQL:", result)

if result:
    print(f"Login successful! Welcome")  # Assuming firstName is at index 2
else:
    print("Invalid Login. Either email or password is wrong.")

cursor.close()
registration.close()





'''query = "SELECT * FROM user WHERE email = %s AND password = %s"
cursor.execute(query, (email,password))

result=cursor.fetchall()

print("Query result: ",result)
if result:
    print("Login successful!")
else:
    print("Invalid Login")

cursor.close()
registration.close()
'''

