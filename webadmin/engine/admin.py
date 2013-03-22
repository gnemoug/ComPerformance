#!/usr/bin/python
#-*-coding:utf-8-*-

from django.contrib import admin
from models import  Class, Student, Assessment, AssessmentRecord,AssessmentRow,\
    Grade,Behavior,Development,Comperformance,ComperformanceDevelopmentScore,\
    ComperformanceBehaviorScore,ComperformancePhysicalScore,ComperformanceScore

admin.site.register(Class)
admin.site.register(Student)
admin.site.register(Assessment)
admin.site.register(AssessmentRecord)
admin.site.register(AssessmentRow)
admin.site.register(Grade)
admin.site.register(Behavior)
admin.site.register(Development)
admin.site.register(Comperformance)
admin.site.register(ComperformanceDevelopmentScore)
admin.site.register(ComperformanceBehaviorScore)
admin.site.register(ComperformancePhysicalScore)
admin.site.register(ComperformanceScore)
