from Backend import create_app

app = create_app()

#Members API Route
@app.route("/members")

def members():
    return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == '__main__':
    app.run(debug=True)