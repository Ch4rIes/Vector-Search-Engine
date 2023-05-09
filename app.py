from flask import Flask , request, jsonify
from search import SearchEngine
import boto3
import botocore
import glob,os
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

docs = []

for txtfile in glob.glob(os.path.join("Search Engine Document Data" , "*.txt")):
    docs.append(open(txtfile).read().replace('\n' , ' '))

docs_with_title = []
for txtfile in glob.glob(os.path.join("Search Engine Document Data" , "*.txt")):
    docs_with_title.append([txtfile[28:] , open(txtfile).read().replace('\n' , ' ')])

@app.route('/get_docs', methods=['GET'])
def get_docs():
    return jsonify(docs_with_title)

@app.route('/detect-relevancy', methods=['POST'])
def detect_relevancy():
    print('here')
    query = request.get_json()['query_string']
    engine = SearchEngine(docs)
    result = engine.search(query=query)
    result_with_title = []
    for it in result:
        for entry in docs_with_title:
            if it == entry[1]:
                result_with_title.append(entry)
    return jsonify(result_with_title)

@app.route("/")
def hello_world():
    return "<p>Search</p>"