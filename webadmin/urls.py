#!/usr/bin/python
#-*-coding:utf-8-*-

from django.conf.urls.defaults import patterns, include, url
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
import settings
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'webadmin.views.home', name='home'),
    # url(r'^webadmin/', include('webadmin.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^grappelli/',include('grappelli.urls')),
    url(r'^admin/', include(admin.site.urls)),

    #favicon.ico
    url(r'^favicon.ico$', 'django.views.generic.simple.redirect_to', {'url': '/static/images/favicon.png'}),

    url(r'^accounts/login/$', 'engine.account.userlogin',name="userlogin"),
    url(r'^accounts/logout/$',  'django.contrib.auth.views.logout',
                                {'next_page': '/accounts/login/'},name="userlogout"),
    url(r'^accounts/changepassword/$', 'engine.account.changepassword',name="changepassword"),
    url(r'^$', 'engine.views.index'),

    #class
    url(r'^manage/class/$', 'engine.class.index',name="manageclass"),
    url(r'^manage/addclass/$', 'engine.class.addclass',name="addclass"),
    url(r'^manage/editclass/$', 'engine.class.editclass',name="editclass"),
    url(r'^manage/deleteclass/$', 'engine.class.deleteclass',name="deleteclass"),
    #class ajax
    url(r'^ajax/get_classes_list/$', 'engine.class.get_classes_list',name="get_classes_list"),
    
    #student
    url(r'^manage/student/$', 'engine.student.index',name="managestudent"),
    url(r'^manage/addstudent/$', 'engine.student.addstudent',name="addstudent"),
    url(r'^manage/editstudent/$', 'engine.student.editstudent',name="editstudent"),
    url(r'^manage/deletestudent/$', 'engine.student.deletestudent',name="deletestudent"),
    url(r'^manage/initstudent/$', 'engine.student.initstudent',name="initstudent"),
    url(r'^studentprofile/$', 'engine.student.studentprofile',name="studentprofile"),
    #student ajax
    url(r'^ajax/get_students_list/$', 'engine.student.get_students_list',name="get_students_list"),
    url(r'^ajax/select_classes/$', 'engine.class.select_classes',name="select_classes"),

    #assessment
    url(r'^manage/assessment/$', 'engine.assessment.index',name="manageassessment"),
    url(r'^manage/addassessment/$', 'engine.assessment.addassessment',name="addassessment"),
    url(r'^manage/editassessment/$', 'engine.assessment.editassessment',name="editassessment"),
    url(r'^manage/deleteassessment/$', 'engine.assessment.deleteassessment',name="deleteassessment"),
    url(r'^view/assessment/$', 'engine.assessment.viewassessment',name="viewassessment"),
    #assessment ajax
    url(r'^ajax/get_assessments_list/$', 'engine.assessment.get_assessments_list',name="get_assessments_list"),
    url(r'^ajax/view_assessments_list/$', 'engine.assessment.view_assessments_list',name="view_assessments_list"),
    #student assessment
    url(r'^manage/goassessment/$', 'engine.assessment.goassessment',name="goassessment"),
    #student assessment ajax
    url(r'^ajax/go_assessments_list/$', 'engine.assessment.go_assessments_list',name="go_assessments_list"),
    url(r'^ajax/go_assessments/$', 'engine.assessment.go_assessments',name="go_assessments"),
    
    #grade
    url(r'^grade/importgrades/$', 'engine.grade.importgrades',name="importgrades"),
    url(r'^manage/grades/$', 'engine.grade.index',name="managegrades"),
    url(r'^manage/classgrades/$', 'engine.grade.classgrades',name="classgrades"),
    #ajax grades
    url(r'^ajax/studentgrades/$', 'engine.grade.studentgrades',name="studentgrades"),
    url(r'^ajax/ajaxclassgrades/$', 'engine.grade.ajaxclassgrades',name="ajaxclassgrades"),

    #activity
    url(r'^manage/behavior/$', 'engine.activity.behavior',name="behavior"),
    url(r'^manage/addbehavior/$', 'engine.activity.addbehavior',name="addbehavior"),
    url(r'^manage/editbehavior/$', 'engine.activity.editbehavior',name="editbehavior"),
    url(r'^manage/deletebehavior/$', 'engine.activity.deletebehavior',name="deletebehavior"),
    url(r'^manage/adddevelopment/$', 'engine.activity.adddevelopment',name="adddevelopment"),
    url(r'^manage/editdevelopment/$', 'engine.activity.editdevelopment',name="editdevelopment"),
    url(r'^manage/deletedevelopment/$', 'engine.activity.deletedevelopment',name="deletedevelopment"),
    url(r'^manage/development/$', 'engine.activity.development',name="development"),
    #ajax activity
    url(r'^ajax/ajaxbehavior/$', 'engine.activity.ajaxbehavior',name="ajaxbehavior"),
    url(r'^ajax/ajaxdevelopment/$', 'engine.activity.ajaxdevelopment',name="ajaxdevelopment"),

    #comperformance
    url(r'^manage/comperformance_setup/$', 'engine.comperformance.comperformance_setup',name="comperformance_setup"),
    url(r'^manage/addcomperformance_setup/$', 'engine.comperformance.addcomperformance_setup',name="addcomperformance_setup"),
    url(r'^manage/editcomperformance_setup/$', 'engine.comperformance.editcomperformance_setup',name="editcomperformance_setup"),
    url(r'^manage/deletecomperformance_setup/$', 'engine.comperformance.deletecomperformance_setup',name="deletecomperformance_setup"),
    url(r'^manage/comperformance/$', 'engine.comperformance.comperformance',name="comperformance"),
    url(r'^manage/studentcomperformance/$', 'engine.comperformance.studentcomperformance',name="studentcomperformance"),
    url(r'^manage/classcomperformances/$', 'engine.comperformance.classcomperformances',name="classcomperformances"),
    #ajax comperformance
    url(r'^ajax/ajaxcomperformance_setup/$', 'engine.comperformance.ajaxcomperformance_setup',name="ajaxcomperformance_setup"),
    url(r'^ajax/ajaxclasscomperformances/$', 'engine.comperformance.ajaxclasscomperformances',name="ajaxclasscomperformances"),
    url(r'^ajax/ajaxcomperformance/$', 'engine.comperformance.ajaxcomperformance',name="ajaxcomperformance"),
    url(r'^ajax/ajaxupdatecomperformance/$', 'engine.comperformance.ajaxupdatecomperformance',name="ajaxupdatecomperformance"),
    
    #captcha
    url(r'^captcha/', include('captcha.urls')),
)

if settings.DEBUG:
    urlpatterns += patterns('django.contrib.staticfiles.views',
        url(r'^static/(?P<path>.*)$', 'serve',{'document_root':settings.STATIC_ROOT}),
    )
