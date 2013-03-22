#!/usr/bin/python
#-*-coding:utf-8-*-

from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    username = request.user.username

    return render_to_response('index.html',{
            "title":'主页',
            'username':username},context_instance = RequestContext(request))
