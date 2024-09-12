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
def president():
    return render_template('indexPresident.html')

@app.route('/car',methods=["get","post"])
def car():
    return render_template('indexCar.html')
    
@app.route('/city',methods=["get","post"])
def city():
    return render_template('indexCity.html')

if __name__ == '__main__':
    app.run(debug=True)
