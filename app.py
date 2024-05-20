from flask import Flask, render_template, request, jsonify, session, redirect
from functools import wraps
from datetime import datetime
import requests, uuid

app = Flask(__name__)
app.secret_key = b'O\x92\xe9\x89\x8ag\x90\xb5\x86`\xeb\x10\x81^/\x80'


@app.route('/newlogin')
def newLogin():
    return render_template('new-login.html')
    
###############################################################
#                                                             #
#               TABLE OF CONTENTS (APP PY)                    #
#-------------------------------------------------------------#
#   Line                                                      #
#       33 - 51  ---------------- DECORATORS                  #
#       54 - 60  ---------------- INDEX                       #
#       62 - 73  ---------------- Image Viewer                #
#       77 - 92  ---------------- LOGIN, SIGNOUT, SESSION     #
#       97 - 105 ---------------- MAINTENANCE                 #
#      107 - 115 ---------------- VEHICLE                     #
#      117 - 120 ---------------- ROOM                        #
#      122 - 133 ---------------- MEDICINE                    #
#      136 - 228 ---------------- REDIRECTOR                  #
#                                                             #
###############################################################

###############################################################
#                                                             #
#          DEAR JANZ, REDIRECTOR IS NOW AT THE BOTTOM         #
#                                                             #
###############################################################

# Decorator
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        return f(*args, **kwargs) if 'logged_in' in session else redirect('/')
    return wrap
def start_session(user):
    session['logged_in'], session['user'] = True, user["userdata"]
    return jsonify(user), 200
def dateFormatVrf(myDict):
    if not myDict['data']:
        return myDict
    else:
        for x in myDict['data']:
            date_start,           date_end,           dateFiled,            = x['io']['s'],                              x['io']['e'],                            x['rq']['r']
            date_start_obj,       date_end_obj,       dateFiled_obj,        = datetime.strptime(date_start, "%Y-%m-%d"), datetime.strptime(date_end, "%Y-%m-%d"), datetime.strptime(dateFiled, "%Y-%m-%d")
            formatted_date_start, formatted_date_end, formatted_dateFiled,  = date_start_obj.strftime("%b %d, %Y"),      date_end_obj.strftime("%b %d, %Y"),      dateFiled_obj.strftime("%b %d, %Y")    
            x['io']['s'],         x['io']['e'],       x['rq']['r'],         = formatted_date_start,                      formatted_date_end,                      formatted_dateFiled                

            if x['rq']['a'] != '--':
                dateApproved = x['rq']['a']
                dateApproved_obj =  datetime.strptime(dateApproved, "%Y-%m-%d %I:%M %p")
                formatted_dateApproved =  dateApproved_obj.strftime("%b %d, %Y %I:%M %p")
                x['rq']['a'] = formatted_dateApproved
        return myDict

def dateFormatMnt(myDict):
    if not myDict['data']:
        return myDict
    else:
        for x in myDict['data']:
            dateFiled           = x['rq']['r']
            dateFiled_obj       = datetime.strptime(dateFiled, "%Y-%m-%d")
            formatted_dateFiled = dateFiled_obj.strftime("%b %d, %Y")
            x['rq']['r']        = formatted_dateFiled
            
            if x['rq']['a'] != '--':
                    dateApproved = x['rq']['a']
                    dateApproved_obj =  datetime.strptime(dateApproved, "%Y-%m-%d %I:%M %p")
                    formatted_dateApproved =  dateApproved_obj.strftime("%b %d, %Y %I:%M %p")
                    x['rq']['a'] = formatted_dateApproved
        return myDict

# USER SESSION LOGIN, SIGNOUT and ASSIGNING
# @app.route('/login', methods=["POST", "GET"])
# def login():
#     if request.method=="GET":
#         return redirect('/')
#     else:
#         response = requests.post('http://172.20.238.20/api/user/login', json={"e": request.form['email'].lower(), "pw": request.form['password']}).json()
#         if response["status"] == "200" :
#             start_session(response)
#             return redirect('/dashboard')
#         elif response["status"] == "401" :
#             return jsonify(response)
@app.route('/signout')
def signout():
    session.clear()
    return redirect('/')
#ROUTES
@app.route('/', methods=["POST", "GET"])
def loginForm():
    if 'logged_in' in session:
        if session['logged_in']:
            return redirect('/dashboard')
    else:
        if request.method=="GET" :
            return render_template('login.html', response=None)
        else:
            response = requests.post('http://172.20.238.20/api/user/login', json={"e": request.form['email'].lower(), "pw": request.form['password']}).json()
            if response["status"] == "200" :
                start_session(response)
                return redirect('/dashboard')
            elif response["status"] == "401" :
                return render_template('login.html', response=response)
        

# IMAGE VIEWER
@app.route('/mnt_pic_view', methods=['POST'])
def mntPicView():
    response = requests.get('http://172.20.238.20/api/hrga/mnt/vpic', json=request.json).json()
    return jsonify({"_id": response['_id'], "img":response["img"]})
@app.route('/vrf_report', methods=['POST'])
def vrfReport():
    response = requests.get('http://172.20.238.20/api/hrga/vrf/report', json=request.json).json()
    return response
@app.route('/vrf_pic_view', methods=['POST'])
def vrfPicView():
    response = requests.get('http://172.20.238.20/api/hrga/vrf/vpic', json=request.json).json()
    myDict= {
        "_id": response['data']["_id"],
        "img": response['data']['img'], 
        "t": response['data']['t'], 
        "br": response['data']['br'], 
        "m":response['data']['m']
    }
    if 'driver' in response:
        return jsonify({"data":myDict,"driver": response['driver']})
    return jsonify({"data":myDict})
    # myDriver = requests.get('http://172.20.238.20/api/driver/view', json={"_id":"DVR-01"}).json()
    # myDict['driver'] = {myDriver}
    # return jsonify({"_id": response["_id"],"img": response['img'], "t": response['t'], "br": response['br'], "m":response['m']})
def vrfAPicView():
    response = requests.get('http://172.20.238.20/api/hrga/vrf/vapic').json()
    return response
    


#MAINTENANCE ROUTE/ACTIONS  
@app.route('/mnt_view', methods=["POST"])    
def mnt_view():
    myDict = requests.get('http://172.20.238.20/api/hrga/mnt/view', json={"filter": str(session['user']['_id']),"s": "HR"}).json()
    return dateFormatMnt(myDict)
@app.route('/mnt_viewall', methods=["POST"])
def mnt_viewall():
    myDict = requests.get('http://172.20.238.20/api/hrga/mnt/viewall', json={"s": "HR"}).json()
    return dateFormatMnt(myDict)

#VEHICLE RF ROUTE/ACTIONS
@app.route('/vrf_view', methods=["POST"])    
def vrf_view():
    myDict = requests.get('http://172.20.238.20/api/hrga/vrf/view', json={"filter": str(session['user']['_id']), "s": "HR"}).json()
    return dateFormatVrf(myDict)

@app.route('/vrf_viewall', methods=["POST"])
def vrf_viewall():
    myDrivers = requests.get('http://172.20.238.20/api/driver/viewall').json()
    myDict = requests.get('http://172.20.238.20/api/hrga/vrf/viewall', json={"s": "HR"}).json()
    myDict['driver'] = myDrivers['drivers']
    return dateFormatVrf(myDict)

#ROOM RESERVATION ROUTE/ACTIONS   
@app.route('/rmr_view', methods=["POST"])        
def rmr_view():
    return requests.get('http://172.20.238.20/api/hrga/rmr/view', json={"s":"HR","filter": str(session['user']['_id'])}).json()

#MEDICINE ROUTE/ ACTIONS
@app.route('/mdc_view')
def mdc_view():
    myDict = requests.post('http://172.20.238.20/api/hrga/mdc/view', json={"s":"HR","filter": str(session['user']['_id'])}).json()
    balance = myDict['data']['b'] # Generating Balance to Display in Dashboard
    formatted_balance = f"{balance:,}"
    myDict['data']['b'] = formatted_balance
    return myDict 

app.route('/mdc_viewall')
def mdc_viewall():
    return requests.post('http://172.20.238.20/api/hrga/mdc/viewall', json={"s": "HR"}).json()

#redirector
@app.route('/<string:component>/', methods=['POST','GET'])
@login_required
def rDirector(component):
    component = component.lower()
    
    myValue ={
        "dashboard":         mdc_view(),
        "maintenance":       mnt_viewall()    if session['user']['p']=='Supervisor' or session['user']['p']=='Manager' else mnt_view(),
        "vehicle":           vrf_viewall()    if session['user']['p']=='Supervisor' or session['user']['p']=='Manager' else vrf_view(),
        "vehicle_inventory": vrf_viewall(),
        "medicine":          mdc_viewall()    if session['user']['p']=='Supervisor'                                    else mdc_view(),
        "room":              rmr_view(),
        "driver_management": vrf_viewall(),
        "analytics": "",
        "user_management": "",
    }
    myDept = [
        'hr',
        'ict'
    ]
    myModule =[
        'maintenance',
        'vehicle',
        'room',
        'medicine'
    ]
    
    #DASHBOARD AND REDIRECTION
    if   component == 'dashboard':
        return render_template('user-dashboard.html',               value=myValue[component])
    
    #MODAL REDIRECTOR
    elif component in myValue:
        return render_template('module/hr/'  + component +'.html',   value=myValue[component])
        
    #DEPARTMENT REDIRECTOR
    elif component in myDept:
        return render_template('department/'+ component +'.html')
    
    
    #MODAL REDIRECTOR W/O VALUE
    elif component in myModule:
        return render_template('module/hr/'  + component +'.html')
    
    #FETCHER
    elif component == "mnt_st":
        return jsonify({"currSt": "1"})

    #INSERT AND UPSERT SECTION
    elif component == "vrf_insert" and request.method == 'POST' :
        response = requests.put('http://172.20.238.20/api/hrga/vrf/insert',data=request.form).json()
    #    return redirect('/vehicle') if response["status"] == "200" else jsonify({"status": "400", "value": "sum ting wong"}) if response["status"] == "400" else None     
    elif component == "vrf_update" and request.method == 'POST': 
        response = requests.patch('http://172.20.238.20/api/hrga/vrf/update', data=request.form).json()
    #    return redirect('/medical') if response["status"] == "200" else jsonify({"status": "400", "value": "sum ting wong"}) if response["status"] == "400" else None
    elif component == "vrf_inv_update" and request.method == 'POST':
        response = requests.patch('http://172.20.238.20/api/hrga/vrf/upic', json={"_id": request.json['_id'], "st": request.json['st']}).json()
    
    elif component == "rmr_insert" and request.method == 'POST':
        myDict = {
                "_id": str(uuid.uuid4()),############ Unique ID (for now)
                "eid": session['user']['_id'],####### employee ID
                "n": session['user']['n'],########### employee Name
                "rt": request.form['room-type'],##### Form Room Type
                "rm": request.form['remarks'],####### Form Remarks
                "io": {############################## Form Reservation Date
                    "s": request.form['date_s'],##### Form Reserve Stard Date
                    "e": request.form['date_e']},#### Form Reserve End Date
                "rq": {############################## Form Request Date
                    "r": request.form['datetime'],### Form Requested Date
                    "a": "TBD"},##################### Form Approved Date
                "st": "for approval",################ Form Status (pending, approved, declined)
                "ab": "None Yet",#################### Form Approved By
            }
        response = requests.put('http://172.20.238.20/api/hrga/rmr/insert',json=myDict).json()
        return redirect('/room') if response["status"] == "200" else jsonify({"status": "400", "value": "sum ting wong"}) if response["status"] == "400" else None      
    elif component == "mdc_update" and request.method == 'POST': 
        response = requests.patch('http://172.20.238.20/api/hrga/mdc/update', data=request.form).json()
        return redirect('/medical') if response["status"] == "200" else jsonify({"status": "400", "value": "sum ting wong"}) if response["status"] == "400" else None


    elif component == "vehicle_add" and request.method == 'POST':
        response = requests.put('http://172.20.238.20/api/hrga/vrf/add', files=request.files, data=request.form).json()
        # return redirect('/vehicle_inventory') if response["status"] == "200" else jsonify({"status": "400", "value": "sum ting wong"}) if response["status"] == "400" else None
    elif component == "vehicle_change" and request.method == 'POST':
        response = requests.patch('http://172.20.238.20/api/hrga/vrf/change', json=request.json).json()
        # return redirect('/vehicle_inventory') if response["status"] == "200" else jsonify({"status": "400", "value": "sum ting wong"}) if response["status"] == "400" else None
    
    elif component == "driver_add" and request.method == 'POST':
        response = requests.put('http://172.20.238.20/api/driver/insert', files=request.files, data=request.form).json()
    
    elif component == "user_add" and request.method == 'POST':
        response = requests.put('http://172.20.238.20/api/user/insert', data=request.form).json()
        # return redirect('/vehicle_inventory') if response["status"] == "200" else jsonify({"status": "400", "value": "sum ting wong"}) if response["status"] == "400" else None
        
        
    ##################### THIS PART IS ALREADY DONE ##############
    elif component == "mnt_update" and request.method == 'POST':
        response = requests.patch('http://172.20.238.20/api/hrga/mnt/update', data=request.form).json()
        #return redirect('/') if response['status'] == '200' else jsonify({"status":"400", "value":"sum ting wong"}) if response['status'] == '400' else None 
    elif component == "mnt_insert" and request.method == 'POST':
        response = requests.put('http://172.20.238.20/api/hrga/mnt/insert', files=request.files, data=request.form).json()
        #return redirect('/maintenance') if response["status"] == "200" else jsonify({"status": "400", "value": "sum ting wong"})
    return "SUM TING WONG"