from Backend import create_app
from flask import Flask, jsonify, render_template
import datetime

app = create_app()

x = datetime.datetime.now()

@app.route('/data')
def get_time():

    # Returning an api for showing in  reactjs
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }

if __name__ == '__main__':
    app.run(debug=True)