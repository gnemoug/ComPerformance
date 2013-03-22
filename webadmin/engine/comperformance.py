#!/usr/bin/python
#-*-coding:utf-8-*-

from django.template import RequestContext
from django.http import HttpResponse,HttpResponseRedirect,Http404
from django.shortcuts import render_to_response
from django.db.models import Q
from django.contrib.auth.models import User
from engine.utils import get_datatables_records
from django.contrib.auth.decorators import login_required
from django.utils import simplejson
from django.db.models import Avg
from django.utils import formats
from django.utils.cache import add_never_cache_headers
from models import Comperformance,Behavior,Development,ComperformanceDevelopmentScore,\
    ComperformancePhysicalScore,ComperformanceBehaviorScore,ComperformanceScore,\
    Grade,Student
from forms import Comperformance_SetupForm
import traceback
import datetime

@login_required
def comperformance_setup(request):
    username = request.user.username

    return render_to_response('comperformance/comperformance_setup.html',{
            "title":'综合测评设置',
            'username':username},context_instance = RequestContext(request))

@login_required
def ajaxcomperformance_setup(request):
    comperformances = Comperformance.objects.all().order_by('term')

    columnIndexNameMap = {
        0:'id',
        1:'term',
        2:'moral',
        3:'behaviorup',
        4:'physical',
        5:'excellent',
        6:'good',
        7:'ordinary',
        8:'development',
        9:'behavior',
    }

    try:
        aaData,sEcho,iTotalRecords,iTotalDisplayRecords,sColumns = get_datatables_records(request, comperformances, columnIndexNameMap,None,{},False,{},{}) 
    except Exception,e:
        traceback.print_stack()
        traceback.print_exc()
        print e
        aaData,sEcho,iTotalRecords,iTotalDisplayRecords,sColumns = [],1,0,0,','.join(columnIndexNameMap.values())

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
def addcomperformance_setup(request):
    username = request.user.username

    if request.method == "POST":
        form = Comperformance_SetupForm(data = request.POST)
        if form.is_valid():
            form.save()
            success = True
            successinfo = "添加"
            return render_to_response('comperformance/comperformance_setup.html',{
                "title":'综合测评设置',
                'form':form,
                'successinfo':successinfo,
                'success':success,
                'username':username},context_instance = RequestContext(request))
        else:
            return render_to_response('comperformance/comperformance_setup.html',{
                "title":'综合测评设置',
                'form':form,
                'username':username},context_instance = RequestContext(request))

    return HttpResponseRedirect('/manage/comperformance_setup/')

@login_required
def editcomperformance_setup(request):
    username = request.user.username

    if request.method == "POST":
        form = Comperformance_SetupForm(data = request.POST)
        if form.is_valid():
            form.update()
            success = True
            successinfo = "修改"
            return render_to_response('comperformance/comperformance_setup.html',{
                "title":'综合测评设置',
                'form':form,
                'successinfo':successinfo,
                'success':success,
                'username':username},context_instance = RequestContext(request))
        else:
            return render_to_response('comperformance/comperformance_setup.html',{
                "title":'综合测评设置',
                'form':form,
                'username':username},context_instance = RequestContext(request))

    return HttpResponseRedirect('/manage/comperformance_setup/')

@login_required
def deletecomperformance_setup(request):
    username = request.user.username

    if request.method == "POST":
        try:
            comperformance_setup_id = request.POST.get('id')
            try:
                delcomperformance_setup = Comperformance.objects.get(id = comperformance_setup_id)
                delcomperformance_setup.delete()
                success = True
                successinfo = "删除"
                return render_to_response('comperformance/comperformance_setup.html',{
                    "title":'综合测评设置',
                    'successinfo':successinfo,
                    'success':success,
                    'username':username},context_instance = RequestContext(request))
            except Comperformance.DoesNotExist:
                traceback.print_stack()
                traceback.print_exc()
                print e
        except Exception,e:
            traceback.print_stack()
            traceback.print_exc()
            print e

    return HttpResponseRedirect('/manage/comperformance_setup/')

@login_required
def comperformance(request):
    username = request.user.username
    behaviors = Behavior.objects.all().order_by('-actlevel')
    developments = Development.objects.all().order_by('parent')
    behaviorstart = 5
    behaviorend = behaviorstart + Behavior.objects.count() - 1
    physical = behaviorend + 2
    developmentstart = physical + 3
    developmentend = developmentstart + Development.objects.count() - 1

    return render_to_response('comperformance/comperformance.html',{
            "title":'综合测评',
            'behaviors':behaviors,
            'behaviorstart':behaviorstart,
            'behaviorend':behaviorend,
            'physical':physical,
            'developmentstart':developmentstart,
            'developmentend':developmentend,
            'developments':developments,
            'username':username},context_instance = RequestContext(request))

@login_required
def studentcomperformance(request):
    username = request.user.username
    behaviors = Behavior.objects.all().order_by('-actlevel')
    developments = Development.objects.all().order_by('parent')

    return render_to_response('comperformance/studentcomperformance.html',{
            "title":'查看综合-同学',
            'behaviors':behaviors,
            'developments':developments,
            'username':username},context_instance = RequestContext(request))

@login_required
def ajaxcomperformance(request):
    comperformancescores = ComperformanceScore.objects.all().order_by('-comperformance__term','student__user__username')
    
    customSearch = request.GET.get('sSearch', '').rstrip().encode('utf-8');
    if customSearch != '':
        kwargzs = [
            {"comperformance__term__icontains" : customSearch},
            {"student__realname__icontains":customSearch},
            {"student__user__username__icontains":customSearch},
            {"student__theclass__classid__icontains":customSearch},
        ]
        outputQ = None
        for kwargz in kwargzs:
            outputQ = outputQ | Q(**kwargz) if outputQ else Q(**kwargz)
        comperformancescores = comperformancescores.filter(outputQ)

    cols = int(request.GET.get('iColumns',0)) #获取有多少列数据
    iDisplayLength = min(int(request.GET.get('iDisplayLength',10)),100)     #每页获取rows个数
    startRecord = int(request.GET.get('iDisplayStart',0)) #本页第一条数据，是所有数据的第几个,从0开始
    endRecord = startRecord + iDisplayLength 
    sEcho = int(request.GET.get('sEcho',0)) #页数
    
    iTotalRecords = iTotalDisplayRecords = comperformancescores.count() #总共的rows数
    comperformancescores = comperformancescores[startRecord:endRecord]

    aaData = []

    for i in comperformancescores:
        arecord = [unicode(i.comperformance.term),unicode(i.student.realname),unicode(i.student.user.username),unicode(i.student.theclass.classid),unicode(i.score)]
        
        behaviors = Behavior.objects.all().order_by('-actlevel')
        for j in behaviors:
            try:
                obj = j.comperformancebehaviorscore_set.filter(comperformance=i.comperformance).filter(behavior=j).get(student=i.student)
                comperformancebehaviorscore = obj.score
            except Exception,e:
                comperformancebehaviorscore = ""
            arecord.append(unicode(comperformancebehaviorscore))
        
        arecord.append(unicode(i.assessmentscore))
        
        try:
            obj = ComperformancePhysicalScore.objects.filter(comperformance=i.comperformance).get(student=i.student)
            comperformancephysicalscore = obj.score
        except Exception,e:
            comperformancephysicalscore = 0.0
        arecord.append(unicode(comperformancephysicalscore))
        
        comperformancebehaviorscores = ComperformanceBehaviorScore.objects.filter(comperformance=i.comperformance).filter(student=i.student)
        behaviorscores = i.comperformance.behavior
        if comperformancebehaviorscores:
            for j in comperformancebehaviorscores:
                behaviorscores += j.score
        arecord.append(unicode(behaviorscores))
        
        try:
            obj = Grade.objects.filter(term=i.comperformance.term).get(student=i.student)
            grade = obj.score
        except Exception,e:
            grade = 0.0
            traceback.print_stack()
            traceback.print_exc()
            print e
        arecord.append(unicode(grade))

        developments = Development.objects.all().order_by('parent')
        for j in developments:
            try:
                obj = j.comperformancedevelopmentscore_set.filter(comperformance=i.comperformance).filter(development=j).get(student=i.student)
                comperformancedevelopmentscore = obj.score
            except Exception,e:
                comperformancedevelopmentscore = ""
            arecord.append(unicode(comperformancedevelopmentscore))
        
        comperformancedevelopmentscores = ComperformanceDevelopmentScore.objects.filter(comperformance=i.comperformance).filter(student=i.student)
        developmentscores = 0.0
        if comperformancedevelopmentscores:
            for j in comperformancedevelopmentscores:
                developmentscores += j.score
        arecord.append(unicode(developmentscores))
        
        if request.user.is_superuser:
            arecord.append(unicode(""))
            
        aaData.append(arecord)


    response_dict = {}
    response_dict.update({'aaData':aaData})
    response_dict.update({
        'sEcho': sEcho, 
        'iTotalRecords': iTotalRecords, 
        'iTotalDisplayRecords':iTotalDisplayRecords})

    response =  HttpResponse(simplejson.dumps(response_dict), mimetype='application/json')

    #阻止缓存
    add_never_cache_headers(response)
    return response

@login_required
def classcomperformances(request):
    username = request.user.username

    return render_to_response('comperformance/classcomperformances.html',{
            "title":'综合测评-班级',
            'username':username},context_instance = RequestContext(request))

@login_required
def ajaxclasscomperformances(request):
    
    if request.is_ajax():
        try:
            xAxis = [i[0] for i in ComperformanceScore.objects.values_list('comperformance__term').distinct()]
            classes = [i[0] for i in ComperformanceScore.objects.values_list('student__theclass__classid').distinct()]

            xAxis.reverse()
            series = []
            
            #round:控制小数点位数
            for i in classes:
                series.append({
                    'name':i,
                    'data':[round(ComperformanceScore.objects.filter(student__theclass__classid=i).filter(comperformance__term=j).aggregate(avgprice=Avg('score'))['avgprice'],2) for j in xAxis]
                })

            return HttpResponse(simplejson.dumps([xAxis,series]), mimetype='application/json')
        except Exception,e:
            response = 'false'
            traceback.print_stack()
            print e
            return HttpResponse(simplejson.dumps([[],[]]), mimetype='application/json')

    raise Http404 
    
@login_required
def ajaxupdatecomperformance(request):
    
    if request.is_ajax():
        response = "true"
        num = 0
        for i in dict(request.GET)['data[]']:
            try:
                if i:
                    float(i)
            except ValueError,e:
                response = 'false'
                traceback.print_stack()
                traceback.print_exc()
                print e
                break
        if response == "false":
            return HttpResponse(simplejson.dumps([response,]), mimetype='application/json')
        comperformance = Comperformance.objects.get(term=request.GET.get('term'))
        student = Student.objects.get(user__username=request.GET.get('user'))
        comperformancescore = ComperformanceScore.objects.filter(student=student).get(comperformance=comperformance)
        
        behaviors = Behavior.objects.all().order_by('-actlevel')
        developments = Development.objects.all().order_by('parent')
        
        for i in xrange(Behavior.objects.count()):
            if dict(request.GET)['data[]'][i]:
                if float(dict(request.GET)['data[]'][i]) > comperformance.behaviorup - comperformance.behavior:
                    response = 'false'
                    traceback.print_stack()
                    traceback.print_exc()
                    break
            num = i
        if response == "false":
            return HttpResponse(simplejson.dumps([response,]), mimetype='application/json')
        
        num+=1
        if dict(request.GET)['data[]'][num]:
            if float(dict(request.GET)['data[]'][num]) > comperformance.physical:
                response = 'false'
                traceback.print_stack()
                traceback.print_exc()
        if response == "false":
            return HttpResponse(simplejson.dumps([response,]), mimetype='application/json')
        
        num+=1
        for i in xrange(Development.objects.count()):
            if dict(request.GET)['data[]'][i+num]:
                if float(dict(request.GET)['data[]'][i+num]) > comperformance.development:
                    response = 'false'
                    traceback.print_stack()
                    traceback.print_exc()
                    break
        if response == "false":
            return HttpResponse(simplejson.dumps([response,]), mimetype='application/json')
        
        ####################update################
        for i in xrange(Behavior.objects.count()):

            if dict(request.GET)['data[]'][i]:
                comperformancebehaviorscore, created = ComperformanceBehaviorScore.objects.get_or_create(comperformance=comperformance,student=student,behavior=behaviors[i])
                if created:
                    comperformancescore.score = comperformancescore.score +  float(dict(request.GET)['data[]'][i])*0.3
                    comperformancebehaviorscore.score = float(dict(request.GET)['data[]'][i])
                else:
                    comperformancescore.score = comperformancescore.score +  float(dict(request.GET)['data[]'][i])*0.3 - comperformancebehaviorscore.score*0.3
                    comperformancebehaviorscore.score = float(dict(request.GET)['data[]'][i])
                comperformancebehaviorscore.save()
            num = i
        
        num+=1
        if dict(request.GET)['data[]'][num]:
            comperformancephysicalscore, created = ComperformancePhysicalScore.objects.get_or_create(comperformance=comperformance,student=student)
            if created:
                comperformancescore.score = comperformancescore.score +  float(dict(request.GET)['data[]'][num])*0.3
                print 
                comperformancephysicalscore.score = float(dict(request.GET)['data[]'][num])
            else:
                comperformancescore.score = comperformancescore.score +  float(dict(request.GET)['data[]'][num])*0.3 - comperformancephysicalscore.score*0.3
                comperformancephysicalscore.score = float(dict(request.GET)['data[]'][num])
            comperformancephysicalscore.save()
        
        num+=1
        for i in xrange(Development.objects.count()):
            if dict(request.GET)['data[]'][num+i]:
                comperformancedevelopmentscore, created = ComperformanceDevelopmentScore.objects.get_or_create(comperformance=comperformance,student=student,development=developments[i])
                if created:
                    comperformancescore.score = comperformancescore.score +  float(dict(request.GET)['data[]'][num+i])
                    comperformancedevelopmentscore.score = float(dict(request.GET)['data[]'][num+i])
                else:
                    comperformancescore.score = comperformancescore.score +  float(dict(request.GET)['data[]'][num+i]) - comperformancedevelopmentscore.score
                    comperformancedevelopmentscore.score = float(dict(request.GET)['data[]'][num+i])
                comperformancedevelopmentscore.save()
        
        
        comperformancescore.save()
    
        return HttpResponse(simplejson.dumps([response,]), mimetype='application/json')
    raise Http404 
