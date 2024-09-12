from flask import Flask, render_template, request

app = Flask(__name__, template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/main',methods=["get","post"])
def main():
    r = request.form.get("q")
    return render_template('main.html', r = r)

@app.route('/president',methods=["get","post"])
def transfer_money():
    return render_template('indexPresident.html')

@app.route('/city',methods=["get","post"])
def loop():
    return render_template('indexCity.html')

if __name__ == '__main__':
    app.run(debug=True)
