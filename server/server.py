import os
import shutil
import hashlib, uuid
from flask import Flask, request, send_file, make_response, abort, jsonify
from flask.wrappers import Response
from flask_cors import CORS
import json

from werkzeug.exceptions import HTTPException 

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

def abort_msg(status, message):
  response = make_response(jsonify(message=message), status)
  abort(response)

def saveCredential(username, password):

  credFile = f'{username}.cred.json'

  if os.path.exists(credFile):
    abort_msg(409, 'An account with that username is already registered.')
  
  with open(credFile, 'w+') as f:

    credentials = {}

    salt = uuid.uuid4().hex
    pw = hashlib.sha256(str(salt + password).encode('utf-8')).hexdigest()
    
    credentials = {
      'salt': salt,
      'password': pw
    }

    json.dump(credentials, f, indent=2)

def loginWithCredential(username, password):
  credFile = f'{username}.cred.json'

  validUserAccount = False
  validUserPassword = False

  try:
    with open(credFile, 'r') as f:
      credential = json.load(f)

      cred_password = credential['password']
      cred_salt = credential['salt']

      validUserAccount = True

      if hashlib.sha256(str(cred_salt + password).encode('utf-8')).hexdigest() == cred_password:
        validUserPassword = True

  # try to keep credential checking and file checking same length
  except IOError:
    hashlib.sha256(str(uuid.uuid4().hex + password).encode('utf-8')).hexdigest()
  
  return validUserAccount and validUserPassword


def getDirReference(tree, path):
  ref = tree
  path_str = ""

  for dir in path:
    for pointer in ref:
      name = pointer['name']

      if name == dir: 
        path_str += f'{"." if name == "sfsk_webserver_root" else ""}/{name}'
        ref = pointer['files']
        break
  
  return ref, path_str

def buildDirectory():
  startDir = 'sfsk_webserver_root'
  user_files = []
  tree = [{
      'name': 'sfsk_webserver_root',
      'path': './sfsk_webserver_root',
      'files': user_files
  }]
  
  for root, dirs, files in os.walk(startDir):
      roots = root.split(os.sep)
      current, path = getDirReference(tree, roots)

      for dir in dirs:
        current.append({'name': dir, 'path': path + f'/{dir}', 'files': []})
      
      for file in files:
        current.append({'name': file, 'path': path + f'/{file}'})

  return user_files

@app.route("/directory", methods=['GET', 'POST', 'DELETE'])
def directory():

  if request.method == 'GET':
    pass

  else:

    body = request.get_json()
    type = body['type']
    path = body['path']

    if request.method == 'DELETE':
      if type == 'DIRECTORY':
        shutil.rmtree(path)
      elif type == 'FILE':
        os.remove(path)

    elif request.method == 'POST':
      if type == 'DIRECTORY':
        os.mkdir(path)
      elif type == 'FILE':
        with open (path, 'w+'):
          pass
    
  tree = json.dumps(buildDirectory())
  return tree

    
@app.route("/file", methods=['POST'])
def file():

  body = request.get_json()
  path = body['path']

  response = make_response(send_file(path))
  response.headers['Content-Transfer-Encoding']='base64'

  return response

@app.route("/create", methods=['POST'])
def create():

  authorization = request.authorization
  saveCredential(authorization.username, authorization.password)

  return json.dumps({
    'name': authorization.username,
    'sessionId': uuid.uuid4().hex
  })

@app.route('/login', methods=['POST'])
def login():

  try:
    authorization = request.authorization
    if loginWithCredential(authorization.username, authorization.password):
      return json.dumps({
        'name': authorization.username,
        'sessionId': uuid.uuid4().hex
      })
  except:
    abort_msg(500, "Something went wrong. Try again.")

  abort_msg(401, 'Incorrect username or password')


if __name__ == '__main__':
  app.run(debug=True, port=8080)