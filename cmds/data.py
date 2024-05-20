
import requests


def login(request):
    response = requests.post('http://172.20.238.20/api/user/login',json={"e":request.form['email'],"pw":request.form['password']}).json()
    return response


