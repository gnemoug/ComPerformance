#!/usr/bin/python
#-*- coding:utf-8 -*-

from django.db import models
from django.contrib.auth.models import User
import datetime

SEX_CHOICES = (
    ('0','男'),
    ('1','女'),
)

LEVEL_CHOICES = (
    ('0','学校'),
    ('1','学院'),
)

EVALUATE_CHOICES = (
    ('0','优'),
    ('1','良'),
    ('2','中'),
    ('3','无'),
)

DEVELOPMENT_LEVEL_CHOICES = (
    ('0','组织管理'),
    ('1','创新'),
    ('2','其他'),
)

class Class(models.Model):
    classid = models.CharField(u"班号",unique=True,max_length=10)
    classname = models.CharField(u"班级名称",max_length=20)

    def __unicode__(self):
        return self.classid

    class Meta:
        db_table = u"class"
        verbose_name_plural = '班级'
        
class Student(models.Model):
    user = models.OneToOneField(User)
    realname = models.CharField(u'姓名',max_length=16)
    theclass = models.ForeignKey(Class,verbose_name="班级")
    sex = models.CharField(u'性别',choices = SEX_CHOICES,max_length = 1)

    def __unicode__(self):
        return self.user.username

    class Meta:
        db_table = u"student"
        verbose_name_plural = '学生'

class Assessment(models.Model):
    begindate = models.DateField(u"开始日期")
    enddate = models.DateField(u"结束日期")
    term = models.CharField(u'学期',unique=True,max_length=16)
    excellent = models.IntegerField(u"优")
    good = models.IntegerField(u"良")
    ordinary = models.IntegerField(u"中")

    def __unicode__(self):
        return self.term

    class Meta:
        db_table = u"assessment"
        verbose_name_plural = '互评设置'

class AssessmentRecord(models.Model):
    assessment = models.ForeignKey(Assessment,verbose_name="互评")
    ostudent = models.ForeignKey(Student,verbose_name="评价同学",related_name = 'ostuent')
    dstudent = models.ForeignKey(Student,verbose_name="被评价同学",related_name = 'dstuent')
    result = models.CharField(u'评价结果',choices=EVALUATE_CHOICES,max_length=1)

    def __unicode__(self):
        return self.assessment.term + self.ostudent.realname + "-" + self.dstudent.realname

    class Meta:
        db_table = u"assessmentrecord"
        verbose_name_plural = '互评记录'

class AssessmentRow(models.Model):
    assessment = models.ForeignKey(Assessment,verbose_name="互评")
    student = models.ForeignKey(Student,verbose_name="被评价同学")
    excellent = models.IntegerField(u"优")
    good = models.IntegerField(u"良")
    ordinary = models.IntegerField(u"中")

    def __unicode__(self):
        return self.assessment.term + "--" +self.student.realname

    class Meta:
        db_table = u"assessmentrow"
        verbose_name_plural = '每人互评记录'

class Grade(models.Model):
    term = models.CharField(u'学期',max_length=16)
    student = models.ForeignKey(Student,verbose_name="同学")
    score = models.FloatField(u"分数")
    
    def __unicode__(self):
        return  self.term + "  " + self.student.user.username + "-->" + str(self.score)

    class Meta:
        db_table = u"grade"
        verbose_name_plural = '成绩'

class Behavior(models.Model):
    actlevel = models.CharField(u'级别',choices = LEVEL_CHOICES,max_length = 1)
    name = models.CharField(u'名称',max_length=16)
    
    def __unicode__(self):
        return self.name

    class Meta:
        db_table = u"behavior"
        verbose_name_plural = '日常行为活动'

class Development(models.Model):
    parent = models.CharField(u'个性发展大类',choices = DEVELOPMENT_LEVEL_CHOICES,max_length = 1,null=True,blank=True)
    name = models.CharField(u'个性发展名称',max_length=11)
    
    def __unicode__(self):
        return self.name

    class Meta:
        db_table = u"development"
        verbose_name_plural = '个性发展活动'

class Comperformance(models.Model):
    excellent = models.FloatField(u"优分数")
    good = models.FloatField(u"良分数")
    ordinary = models.FloatField(u"中分数")
    physical = models.FloatField(u"体能分数")
    behavior = models.FloatField(u"日常行为分基础分")
    development = models.FloatField(u"单项最高分")
    moral = models.FloatField(u"互评最高分")
    behaviorup = models.FloatField(u"日常行为分最高")
    term = models.CharField(u'学期',unique=True,max_length=16)

    def __unicode__(self):
        return self.term

    class Meta:
        db_table = u"comperformance"
        verbose_name_plural = '综合测评设置'

class ComperformanceDevelopmentScore(models.Model):
    student = models.ForeignKey(Student,verbose_name="同学")
    comperformance = models.ForeignKey(Comperformance,verbose_name="综合成绩管理")
    development = models.ForeignKey(Development,verbose_name="个性发展")
    score = models.FloatField(u"分数",null=True, blank=True)
    
    def __unicode__(self):
        return self.student.user.username + u"-->个性发展分数:" + str(self.score)

    class Meta:
        db_table = u"comperformancedevelopmentscore"
        verbose_name_plural = '个性发展加分'

class ComperformanceBehaviorScore(models.Model):
    student = models.ForeignKey(Student,verbose_name="同学")
    comperformance = models.ForeignKey(Comperformance,verbose_name="综合成绩管理")
    behavior = models.ForeignKey(Behavior,verbose_name="日常行为")
    score = models.FloatField(u"分数",null=True, blank=True)
    
    def __unicode__(self):
        return self.student.user.username + u"-->日常行为分数:" + str(self.score)

    class Meta:
        db_table = u"comperformancebehaviorscore"
        verbose_name_plural = '日常活动加分'

class ComperformancePhysicalScore(models.Model):
    student = models.ForeignKey(Student,verbose_name="同学")
    comperformance = models.ForeignKey(Comperformance,verbose_name="综合成绩管理")
    score = models.FloatField(u"分数",null=True, blank=True)
    
    def __unicode__(self):
        return self.student.user.username + u"-->体能分数：" + str(self.score)

    class Meta:
        db_table = u"comperformancephysicalscore"
        verbose_name_plural = '体能加分'
        
class ComperformanceScore(models.Model):
    student = models.ForeignKey(Student,verbose_name="同学")
    comperformance = models.ForeignKey(Comperformance,verbose_name="综合成绩管理")
    score = models.FloatField(u"综合成绩分数",null=True, blank=True)
    assessmentscore = models.FloatField(u"互评分数",null=True, blank=True)
    
    def __unicode__(self):
        return self.student.user.username + u"-->综合成绩分数：" + str(self.score) + u"互评分数：" + str(self.assessmentscore)

    class Meta:
        db_table = u"comperformancescore"
        verbose_name_plural = '综合测评分数'
