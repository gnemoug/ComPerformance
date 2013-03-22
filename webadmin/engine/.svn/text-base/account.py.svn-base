#!/usr/bin/python
#-*-coding:utf-8-*-

from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from forms import LoginForm,ChangePasswordForm
from django.views.decorators.csrf import csrf_protect

def userlogin(request):
    if request.method == "POST":
        form = LoginForm(request=request,data=request.POST)
        captcha = form['captcha']
        if form.is_valid():
            return HttpResponseRedirect('/')
        else:
            return render_to_response('accounts/login.html',{
                'captcha':captcha,
                "form":form},context_instance = RequestContext(request))
    else:
        form = LoginForm()
        captcha = form['captcha']
        if request.user.is_authenticated():
            return HttpResponseRedirect('/')

    return render_to_response('accounts/login.html',{
        'captcha':captcha},context_instance = RequestContext(request))

@login_required
def changepassword(request):
    if request.method == "POST":
        form = ChangePasswordForm(user=request.user,data=request.POST)
        if form.is_valid():
            form.save()
        return HttpResponseRedirect("/accounts/logout/")
    else:
        form = password_change_form(user=request.user)

    return render_to_response('index.html',{
            "title":'主页',
            'username':user.username,
            'form':form},context_instance = RequestContext(request))
