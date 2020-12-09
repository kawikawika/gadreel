#!/usr/bin/env python3

from flask import Flask, request, render_template, redirect, session, url_for
from livereload import Server

app = Flask(__name__)

app.debug = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route("/")
def home():
    return render_template("index.html")

def test():
    return render_template("test.html")

server = Server(app.wsgi_app)
server.serve()
