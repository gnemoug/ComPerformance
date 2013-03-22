#!/usr/bin/python
#-*-coding:utf-8-*-

from django.template import RequestContext
from django.http import HttpResponse,HttpResponseRedirect
from django.shortcuts import render_to_response
from engine.utils import get_datatables_records
from django.contrib.auth.decorators import login_required
from models import Class
from forms import ClassForm
from django.utils import simplejson
from django.utils.cache import add_never_cache_headers
import traceback

@login_required
def index(request):
    username = request.user.username

    return render_to_response('class/class.html',{
            "title":'班级管理',
            'username':username},context_instance = RequestContext(request))

@login_required
def get_classes_list(request):
    classes = Class.objects.all().reverse()

    columnIndexNameMap = {
        0:'id',
        1:'classid',
        2:'classname',
    }

    try:
        aaData,sEcho,iTotalRecords,iTotalDisplayRecords,sColumns = get_datatables_records(request, classes, columnIndexNameMap,None,{},False,{},{}) 
    except Exception,e:
        traceback.print_stack()
        aaData,sEcho,iTotalRecords,iTotalDisplayRecords,sColumns = [],1,0,0,','.join(columnIndexNameMap.values())

    for i in aaData:
        i.append(str(Class.objects.get(classid__exact=i[1]).student_set.exclude(sex="1").count()))
        i.append(str(Class.objects.get(classid__exact=i[1]).student_set.exclude(sex="0").count()))

    sColumns += 'man,woman'

    response_dict = {}
    response_dict.update({'aaData':aaData})
    response_dict.update({
        'sEcho': sEcho, 
        'iTotalRecords': iTotalRecords, 
        'iTotalDisplayRecords':iTotalDisplayRecords, 
        'sColumns':sColumns})

    response =  HttpResponse(simplejson.dumps(response_dict), mimetype='application/json')

    #阻止缓存
    add_never_cache_headers(response)
    return response

@login_required
def addclass(request):
    username = request.user.username

    if request.method == "POST":
        form = ClassForm(data = request.POST)
        if form.is_valid():
            form.save()
            success = True
            successinfo = "添加"
            return render_to_response('class/class.html',{
                "title":'班级管理',
                'form':form,
                'successinfo':successinfo,
                'success':success,
                'username':username},context_instance = RequestContext(request))
        else:
            return render_to_response('class/class.html',{
                "title":'班级管理',
                'form':form,
                'username':username},context_instance = RequestContext(request))

    return HttpResponseRedirect('/manage/class/')

@login_required
def editclass(request):
    username = request.user.username

    if request.method == "POST":
        form = ClassForm(data = request.POST)
        if form.is_valid():
            form.update()
            success = True
            successinfo = "修改"
            return render_to_response('class/class.html',{
                "title":'班级管理',
                'form':form,
                'successinfo':successinfo,
                'success':success,
                'username':username},context_instance = RequestContext(request))
        else:
            return render_to_response('class/class.html',{
                "title":'班级管理',
                'form':form,
                'username':username},context_instance = RequestContext(request))

    return HttpResponseRedirect('/manage/class/')

@login_required
def deleteclass(request):
    username = request.user.username
    
    if request.method == "POST":
        try:
            class_id = request.POST.get('id')
            try:
                delclass = Class.objects.get(id = class_id)
                delclass.delete()
                success = True
                successinfo = "删除"
                return render_to_response('class/class.html',{
                    "title":'班级管理',
                    'successinfo':successinfo,
                    'success':success,
                    'username':username},context_instance = RequestContext(request))
            except Class.DoesNotExist:
                traceback.print_stack()
        except Exception,e:
            traceback.print_stack()
        
    return HttpResponseRedirect('/manage/class/')
    
@login_required
def select_classes(request):
    
    classes =  Class.objects.values('id','classid')
    value = [i.values() for i in classes]
    
    for i in value:
        i.reverse()
    
    response_json = {'data':value}
    response =  HttpResponse(simplejson.dumps(response_json), mimetype='application/json')

    return response  
