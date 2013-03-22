#!/usr/bin/python
#-*-coding:utf-8-*-

from django import forms
from captcha.fields import CaptchaField
from fields import UsernameField,PasswordField,ClassnameField,ClassidField,\
    StudentidField,StudentnameField,TermField
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login
from django.contrib.auth.forms import AuthenticationForm
from models import Class,SEX_CHOICES,Student,Assessment,AssessmentRecord,EVALUATE_CHOICES,\
    AssessmentRow,LEVEL_CHOICES,Behavior,Development,DEVELOPMENT_LEVEL_CHOICES,\
    Comperformance,Grade,ComperformanceScore
import traceback

class LoginForm(forms.Form):
    username = UsernameField(required=True,max_length=12,min_length=6)
    password = PasswordField(required=True,max_length=12,min_length=6)
    captcha = CaptchaField(required=True,error_messages={'invalid':u"您输入的验证码不正确"})

    def __init__(self, request=None, *args, **kwargs):
        self.request = request
        self.user_cache = None
        super(LoginForm, self).__init__(*args, **kwargs)

    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if username and password:
            self.user_cache = authenticate(username=username, password=password)
            #如果成功返回对应的User对象，否则返回None(只是判断此用户是否存在，不判断是否is_active或者is_staff)
            if self.user_cache is None:
                raise forms.ValidationError(u"您输入的用户名或密码不正确!")
            elif not self.user_cache.is_active or not self.user_cache.is_staff:
                raise forms.ValidationError(u"您输入的用户名或密码不正确!")
            else:
                login(self.request,self.user_cache)
        return self.cleaned_data
        
    def get_user_id(self):
        if self.user_cache:
            return self.user_cache.id
        return None

    def get_user(self):
        return self.user_cache

class ChangePasswordForm(forms.Form):
    """
        A form used to change the password of a user in the admin interface.
    """
    newpassword = PasswordField(required=True,max_length=12,min_length=6)
    renewpassword = PasswordField(required=True,max_length=12,min_length=6)

    def __init__(self, user, *args, **kwargs):
        self.user = user
        super(ChangePasswordForm, self).__init__(*args, **kwargs)

    def clean_password2(self):
        newpassword = self.cleaned_data.get('newpassword')
        renewpassword = self.cleaned_data.get('renewpassword')
        if newpassword and renewpassword:
            if newpassword != renewpassword:
                raise forms.ValidationError(u"此处必须输入和上栏密码相同的内容")
        raise forms.ValidationError(u"此处必须输入和上栏密码相同的内容")
        return renewpassword

    def save(self, commit=True):
        """
        Saves the new password.
        """
        self.user.set_password(self.cleaned_data["newpassword"])
        if commit:
            self.user.save()
        return self.user

class ClassForm(forms.Form):
    class_id = forms.CharField(required=False)
    classid = ClassidField(required=True)
    classname = ClassnameField(required=True,max_length=6,min_length=2)

    def clean_class_id(self):
        if self.get_id():
            try:
                Class.objects.get(id = self.get_id())
            except Class.DoesNotExist:
                raise forms.ValidationError(u"请不要非法提交数据")
            return self.get_id()
        return self.get_id()

    def clean_classid(self):
        classid = self.cleaned_data['classid']
        if not self.get_id():
            try:
                Class.objects.get(classid__exact = classid)
            except Class.DoesNotExist:
                return self.cleaned_data['classid']
            raise forms.ValidationError(u"该班号已经存在")
        else:
            try:
                updateclass = Class.objects.get(id = self.get_id())
                try:
                    classid = updateclass.classid
                    Class.objects.exclude(classid=classid).get(classid=self.cleaned_data['classid'])
                    raise forms.ValidationError(u"该班号已经存在")
                except Class.DoesNotExist:
                    return self.cleaned_data['classid']
            except Class.DoesNotExist:
                raise forms.ValidationError(u"请不要非法提交数据")
        return self.cleaned_data['classid']
    
    
        classid = self.cleaned_data['classid']
        try:
            Class.objects.get(classid__exact = classid)
        except Class.DoesNotExist:
            return classid
        raise forms.ValidationError(u"该班号已经存在")

    def save(self,commit=True):
        newclass = Class(classid=self.cleaned_data['classid'],classname=self.cleaned_data['classname'])
        if commit:
            newclass.save()
        return newclass

    def get_id(self):
        return self.cleaned_data['class_id']

    def update(self):
        editclass = Class.objects.get(id = self.get_id()) 
        editclass.classid = self.cleaned_data['classid']
        editclass.classname = self.cleaned_data['classname']
        editclass.save()

class StudentForm(forms.Form):
    student_id = forms.CharField(required=False)
    studentid = StudentidField(required=True)
    studentname = StudentnameField(required=True,max_length=4,min_length=2)
    studentsex = forms.ChoiceField(required=True,choices=SEX_CHOICES,error_messages={'invalid':u'请您正确选择下拉框'})
    studentclass = forms.CharField(required=True)
    
    def clean_student_id(self):
        if self.get_id():
            try:
                Student.objects.get(id = self.get_id())
            except Student.DoesNotExist:
                raise forms.ValidationError(u"请不要非法提交数据")
            return self.get_id()
        return self.get_id()
    
    def clean_studentid(self):
        if not self.get_id():
            try:
                User.objects.get(username = self.cleaned_data['studentid'])
            except User.DoesNotExist:
                return self.cleaned_data['studentid']
            raise forms.ValidationError(u"该学号已经存在")
        else:
            try:
                student = Student.objects.get(id = self.get_id())
                try:
                    oclassid = student.user.username
                    User.objects.exclude(username=oclassid).get(username=self.cleaned_data['studentid'])
                    raise forms.ValidationError(u"该学号已经存在")
                except User.DoesNotExist:
                    return self.cleaned_data['studentid']
            except Student.DoesNotExist:
                raise forms.ValidationError(u"请不要非法提交数据")
        return self.cleaned_data['studentid']
    
    def clean_studentclass(self):
        try:
            Class.objects.get(id = self.cleaned_data['studentclass'])
        except Class.DoesNotExist:
            raise forms.ValidationError(u"该班级不存在")
        
        return self.cleaned_data['studentclass']
    
    def get_id(self):
        return self.cleaned_data['student_id']
    
    def save(self,commit=True):
        user = User.objects.create_user(self.cleaned_data['studentid'], '', '000000')
        user.is_staff = True
        user.save()
        theclass = Class.objects.get(id = self.cleaned_data['studentclass'])
        student = Student(user=user,realname=self.cleaned_data['studentname'],\
            theclass=theclass,sex=self.cleaned_data['studentsex'])
        if commit:
            student.save()
        return student
        
    def update(self):
        student = Student.objects.get(id = self.get_id())
        user = student.user
        user.username = self.cleaned_data['studentid']
        user.save()
        student.realname = self.cleaned_data['studentname']
        theclass = Class.objects.get(id = self.cleaned_data['studentclass'])
        student.theclass = theclass
        student.sex = self.cleaned_data['studentsex']
        student.save()

class AssessmentForm(forms.Form):
    assessment_id = forms.CharField(required=False)
    begindate = forms.DateField(required=True,input_formats=['%Y-%m-%d',],error_messages={'invalid':'请输入正确格式的日期'})
    enddate = forms.DateField(required=True,input_formats=['%Y-%m-%d',],error_messages={'invalid':'请输入正确格式的日期'})
    term = TermField(required=True)
    excellent = forms.IntegerField(required=True,max_value=100,min_value=0,error_messages={
        'invalid':'请输入数字',
        'max_value':'优最大为100',
        'min_value':'优最小为0'})
    good = forms.IntegerField(required=True,max_value=100,min_value=0,error_messages={
        'invalid':'请输入数字',
        'max_value':'良最大为100',
        'min_value':'良最小为0'})
    ordinary = forms.IntegerField(required=True,max_value=100,min_value=0,error_messages={
        'invalid':'请输入数字',
        'max_value':'中最大为100',
        'min_value':'中最小为0'})

    def clean_assessment_id(self):
        if self.get_id():
            try:
                Assessment.objects.get(id = self.get_id())
            except Assessment.DoesNotExist:
                raise forms.ValidationError(u"请不要非法提交数据")
            return self.get_id()
        return self.get_id()
    
    def clean_term(self):
        if not self.get_id():
            try:
                Assessment.objects.get(term = self.cleaned_data['term'])
            except Assessment.DoesNotExist:
                return self.cleaned_data['term']
            raise forms.ValidationError(u"该学期已经存在")
        else:
            try:
                assessment = Assessment.objects.get(id = self.get_id())
                try:
                    oterm = assessment.term
                    Assessment.objects.exclude(term=oterm).get(term=self.cleaned_data['term'])
                    raise forms.ValidationError(u"该学期已经存在")
                except Assessment.DoesNotExist:
                    return self.cleaned_data['term']
            except Assessment.DoesNotExist:
                raise forms.ValidationError(u"请不要非法提交数据")
        return self.cleaned_data['term']
    
    def clean_enddate(self):
        if self.cleaned_data['enddate'] < self.cleaned_data['begindate']:
            raise forms.ValidationError(u"开始日期必须小于结束日期")
        return self.cleaned_data['enddate']
    
    def clean_ordinary(self):
        if self.cleaned_data['excellent'] + self.cleaned_data['good'] + self.cleaned_data['ordinary'] != 100:
            raise forms.ValidationError(u"优良中之和必须为100")
        return self.cleaned_data['ordinary']

    def get_id(self):
        return self.cleaned_data['assessment_id']

    def save(self,commit=True):
        newassessment = Assessment(begindate=self.cleaned_data['begindate'],\
            enddate=self.cleaned_data['enddate'],term=self.cleaned_data['term'],\
            excellent=self.cleaned_data['excellent'],good=self.cleaned_data['good'],\
            ordinary=self.cleaned_data['ordinary'])
        if commit:
            newassessment.save()
        #generate the records
        for i in Class.objects.all():
            for student in i.student_set.all():
                for exstudent in i.student_set.all():
                    newAssessmentRecord = AssessmentRecord(assessment=newassessment,\
                        ostudent=student,dstudent=exstudent,\
                        result='3')#'3'------>'无'
                    newAssessmentRecord.save()
        
        #generate rows
        for i in Class.objects.all():
            for student in i.student_set.all():
                newAssessmentRow = AssessmentRow(assessment=newassessment,student=student,\
                    excellent=0,good=0,ordinary=0)
                newAssessmentRow.save()
        return newassessment

    def update(self):
        assessment = Assessment.objects.get(id = self.get_id())
        assessment.begindate = self.cleaned_data['begindate']
        assessment.enddate = self.cleaned_data['enddate']
        assessment.term = self.cleaned_data['term']
        assessment.excellent = self.cleaned_data['excellent']
        assessment.good = self.cleaned_data['good']
        assessment.ordinary = self.cleaned_data['ordinary']
        assessment.save()

class ImportForm(forms.Form):
    grades = forms.FileField(required=True,error_messages={
        'required':u'必须选择成绩单',
        'invalid':u'成绩单为以xls结尾的excel'})

class BehaviorForm(forms.Form):
    behavior_id = forms.CharField(required=False)
    actlevel = forms.ChoiceField(required=True,choices=LEVEL_CHOICES,error_messages={'invalid':u'请您正确选择单选框'})
    behaviorname = forms.CharField(required=True)

    def clean_behavior_id(self):
        if self.get_id():
            try:
                Behavior.objects.get(id = self.get_id())
            except Behavior.DoesNotExist:
                raise forms.ValidationError(u"请不要非法提交数据")
            return self.get_id()
        return self.get_id()

    def get_id(self):
        return self.cleaned_data['behavior_id']

    def save(self,commit=True):
        newbehavior = Behavior(actlevel=self.cleaned_data['actlevel'],\
            name=self.cleaned_data['behaviorname'])
        if commit:
            newbehavior.save()
            
    def update(self):
        behavior = Behavior.objects.get(id = self.get_id())
        behavior.actlevel = self.cleaned_data['actlevel']
        behavior.name = self.cleaned_data['behaviorname']
        behavior.save()

class DevelopmentForm(forms.Form):
    development_id = forms.CharField(required=False)
    developmentlevel = forms.ChoiceField(required=True,choices=DEVELOPMENT_LEVEL_CHOICES,error_messages={'invalid':u'请您正确选择单选框'})
    developmentname = forms.CharField(required=True)

    def clean_development_id(self):
        if self.get_id():
            try:
                Development.objects.get(id = self.get_id())
            except Development.DoesNotExist:
                raise forms.ValidationError(u"请不要非法提交数据")
            return self.get_id()
        return self.get_id()

    def get_id(self):
        return self.cleaned_data['development_id']

    def save(self,commit=True):
        newdevelopment = Development(parent=self.cleaned_data['developmentlevel'],\
            name=self.cleaned_data['developmentname'])
        if commit:
            newdevelopment.save()

    def update(self):
        development = Development.objects.get(id = self.get_id())
        development.parent = self.cleaned_data['developmentlevel']
        development.name = self.cleaned_data['developmentname']
        development.save()

class Comperformance_SetupForm(forms.Form):
    comperformance_setup_id = forms.CharField(required=False)
    term = TermField(required=True)
    moral = forms.FloatField(required=True,max_value=100,min_value=0,error_messages={
        'invalid':'互评最高分为数字',
        'max_value':'互评最高分最大为100',
        'min_value':'互评最高分最小为0'})
    behaviorup = forms.FloatField(required=True,max_value=100,min_value=0,error_messages={
        'invalid':'日常行为分最高分为数字',
        'max_value':'日常行为分最高分最大为100',
        'min_value':'日常行为分最高分最小为0'})
    physical = forms.FloatField(required=True,max_value=100,min_value=0,error_messages={
        'invalid':'体能分数为数字',
        'max_value':'体能分数最大为100',
        'min_value':'体能分数最小为0'})
    excellent = forms.FloatField(required=True,max_value=100,min_value=0,error_messages={
        'invalid':'优分数为数字',
        'max_value':'优分数最大为100',
        'min_value':'优分数最小为0'})
    good = forms.FloatField(required=True,max_value=100,min_value=0,error_messages={
        'invalid':'良分数为数字',
        'max_value':'良分数最大为100',
        'min_value':'良分数最小为0'})
    ordinary = forms.FloatField(required=True,max_value=100,min_value=0,error_messages={
        'invalid':'中分数为数字',
        'max_value':'中分数最大为100',
        'min_value':'中分数最小为0'})
    development = forms.FloatField(required=True,max_value=100,min_value=0,error_messages={
        'invalid':'单项最高分为数字',
        'max_value':'单项最高分最大为100',
        'min_value':'单项最高分最小为0'})
    behavior = forms.FloatField(required=True,max_value=100,min_value=0,error_messages={
        'invalid':'日常行为分基础分为数字',
        'max_value':'日常行为分基础分最大为100',
        'min_value':'日常行为分基础分最小为0'})

    def clean_comperformance_setup_id(self):
        if self.get_id():
            try:
                Comperformance.objects.get(id = self.get_id())
            except Comperformance.DoesNotExist:
                raise forms.ValidationError(u"请不要非法提交数据")
            return self.get_id()
        return self.get_id()

    def clean_physical(self):
        if self.cleaned_data['moral'] + self.cleaned_data['behaviorup'] + self.cleaned_data['physical'] != 100:
            raise forms.ValidationError(u"互评最高分,日常行为分最高分,体能分数之和必须为100")
        return self.cleaned_data['physical']

    def clean_term(self):
        if not self.get_id():
            try:
                Comperformance.objects.get(term = self.cleaned_data['term'])
            except Comperformance.DoesNotExist:
                return self.cleaned_data['term']
            raise forms.ValidationError(u"该学期已经存在")
        else:
            try:
                comperformance = Comperformance.objects.get(id = self.get_id())
                try:
                    oterm = comperformance.term
                    Comperformance.objects.exclude(term=oterm).get(term=self.cleaned_data['term'])
                    raise forms.ValidationError(u"该学期已经存在")
                except Comperformance.DoesNotExist:
                    return self.cleaned_data['term']
            except Comperformance.DoesNotExist:
                raise forms.ValidationError(u"请不要非法提交数据")
        return self.cleaned_data['term']

    def get_id(self):
        return self.cleaned_data['comperformance_setup_id']

    def save(self,commit=True):
        newcomperformance = Comperformance(excellent=self.cleaned_data['excellent'],\
            good=self.cleaned_data['good'],ordinary=self.cleaned_data['ordinary'],\
            physical=self.cleaned_data['physical'],behavior=self.cleaned_data['behavior'],\
            development=self.cleaned_data['development'],moral=self.cleaned_data['moral'],\
            behaviorup=self.cleaned_data['behaviorup'],term=self.cleaned_data['term'])
        
        if commit:
            newcomperformance.save()
        for i in Class.objects.all():
            classnum = i.student_set.count()
            for student in i.student_set.all():
                try:
                    assessmentrow = AssessmentRow.objects.filter(assessment__term=newcomperformance.term).get(student__id = student.id)
                    assessmentscore = round((assessmentrow.excellent*newcomperformance.excellent + assessmentrow.good*newcomperformance.good + \
                    assessmentrow.ordinary*newcomperformance.ordinary)/classnum,2)
                except AssessmentRow.DoesNotExist,e:
                    assessmentscore = 0
                    traceback.print_stack()
                    traceback.print_exc()
                    print e
                try:
                    grade = Grade.objects.filter(term=newcomperformance.term).get(student__id = student.id)
                    gradescore = grade.score
                except Grade.DoesNotExist,e:
                    gradescore = 0
                    traceback.print_stack()
                    traceback.print_exc()
                    print e
                behavior = newcomperformance.behavior
                comperformancescore = assessmentscore*0.3 + gradescore*0.7 + behavior*0.3
                newcomperformancescore = ComperformanceScore(student=student,\
                    comperformance=newcomperformance,\
                    score=comperformancescore,assessmentscore=assessmentscore)
                newcomperformancescore.save()

    def update(self):
        comperformance = Comperformance.objects.get(id = self.get_id())
        comperformance.excellent = self.cleaned_data['excellent']
        comperformance.good = self.cleaned_data['good']
        comperformance.ordinary = self.cleaned_data['ordinary']
        comperformance.physical = self.cleaned_data['physical']
        comperformance.behavior = self.cleaned_data['behavior']
        comperformance.development = self.cleaned_data['development']
        comperformance.moral = self.cleaned_data['moral']
        comperformance.behaviorup = self.cleaned_data['behaviorup']
        comperformance.term = self.cleaned_data['term']
        comperformance.save()
        
        for i in Class.objects.all():
            classnum = i.student_set.count()
            for student in i.student_set.all():
                try:
                    assessmentrow = AssessmentRow.objects.filter(assessment__term=comperformance.term).get(student__id = student.id)
                    assessmentscore = round((assessmentrow.excellent*comperformance.excellent + assessmentrow.good*comperformance.good + \
                    assessmentrow.ordinary*comperformance.ordinary)/classnum,2)
                except AssessmentRow.DoesNotExist,e:
                    assessmentscore = 0
                    traceback.print_stack()
                    traceback.print_exc()
                    print e
                try:
                    grade = Grade.objects.filter(term=comperformance.term).get(student__id = student.id)
                    gradescore = grade.score
                except Grade.DoesNotExist,e:
                    gradescore = 0
                    traceback.print_stack()
                    traceback.print_exc()
                    print e
                behavior = comperformance.behavior
                comperformancescore = assessmentscore*0.3 + gradescore*0.7 + behavior*0.3
                obj,created =  ComperformanceScore.objects.get_or_create(student=\
                    student,comperformance=comperformance)
                obj.score=comperformancescore
                obj.assessmentscore=assessmentscore
                obj.save()
