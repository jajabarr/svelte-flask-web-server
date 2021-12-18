import os
import shutil
from flask import Flask, request
from flask_cors import CORS
import json 

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

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
def home():

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

    
      


if __name__ == '__main__':
  app.run(debug=True, port=8080)