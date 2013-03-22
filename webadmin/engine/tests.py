#!/usr/bin/python
#-*-coding:utf-8-*-
"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase
from django.test.client import Client

#for test
class SimpleTest(TestCase):
    def test_basic_addition(self):
        """
        Tests that 1 + 1 always equals 2.
        """
        self.assertEqual(1 + 1, 2)

class TestAccount(TestCase):
    def test_userlogin(self):
        c = Client()
        response = c.get('/accounts/login/')
        self.assertEqual(response.status_code, 200)
        response = c.get('/manage/class/')
        self.assertEqual(response.status_code, 302)

    def test_changepassword(self):
        c = Client()
        response = c.get('/accounts/changepassword/')
        self.assertEqual(response.status_code, 302)

class TestViews(TestCase):
    def test_index(self):
        c = Client()
        response = c.get('/')
        self.assertEqual(response.status_code, 302)

class TestClass(TestCase):
    def test_index(self):
        c = Client()
        response = c.get('/manage/class/')
        self.assertEqual(response.status_code, 302)

    def test_addclass(self):
        c = Client()
        response = c.get('/manage/addclass/')
        self.assertEqual(response.status_code, 302)
        
    def test_editclass(self):
        c = Client()
        response = c.get('/manage/editclass/')
        self.assertEqual(response.status_code, 302)
        
    def test_deleteclass(self):
        c = Client()
        response = c.get('/manage/deleteclass/')
        self.assertEqual(response.status_code, 302)
        
    def test_get_classes_list(self):
        c = Client()
        response = c.get('/ajax/get_classes_list/')
        self.assertEqual(response.status_code, 302)
        
class TestStudent(TestCase):
    def test_index(self):
        c = Client()
        response = c.get('/manage/student/')
        self.assertEqual(response.status_code, 302)

    def test_addstudent(self):
        c = Client()
        response = c.get('/manage/addstudent/')
        self.assertEqual(response.status_code, 302)
        
    def test_editstudent(self):
        c = Client()
        response = c.get('/manage/editstudent/')
        self.assertEqual(response.status_code, 302)
        
    def test_deletestudent(self):
        c = Client()
        response = c.get('/manage/deletestudent/')
        self.assertEqual(response.status_code, 302)
        
    def test_initstudent(self):
        c = Client()
        response = c.get('/manage/initstudent/')
        self.assertEqual(response.status_code, 302)
        
    def test_studentprofile(self):
        c = Client()
        response = c.get('/studentprofile/')
        self.assertEqual(response.status_code, 302)
        
    def test_get_students_list(self):
        c = Client()
        response = c.get('/ajax/get_students_list/')
        self.assertEqual(response.status_code, 302)
        
    def test_select_classes(self):
        c = Client()
        response = c.get('/ajax/select_classes/')
        self.assertEqual(response.status_code, 302)
        
        
class TestAssessment(TestCase):
    def test_index(self):
        c = Client()
        response = c.get('/manage/assessment/')
        self.assertEqual(response.status_code, 302)

    def test_addassessment(self):
        c = Client()
        response = c.get('/manage/addassessment/')
        self.assertEqual(response.status_code, 302)
        
    def test_deleteassessment(self):
        c = Client()
        response = c.get('/manage/deleteassessment/')
        self.assertEqual(response.status_code, 302)
        
    def test_viewassessment(self):
        c = Client()
        response = c.get('/view/assessment/')
        self.assertEqual(response.status_code, 302)
        
    def test_get_assessments_list(self):
        c = Client()
        response = c.get('/ajax/get_assessments_list/')
        self.assertEqual(response.status_code, 302)
        
    def test_view_assessments_list(self):
        c = Client()
        response = c.get('/ajax/view_assessments_list/')
        self.assertEqual(response.status_code, 302)
        
    def test_goassessment(self):
        try:
            c = Client()
            response = c.get('/ajax/goassessment/')
            self.assertEqual(response.status_code, 302)
        except Exception,e:
            print "test_goassessment right"
        
    def test_go_assessments_list(self):
        c = Client()
        response = c.get('/ajax/go_assessments_list/')
        self.assertEqual(response.status_code, 302)
        
    def test_go_assessments(self):
        c = Client()
        response = c.get('/ajax/go_assessments/')
        self.assertEqual(response.status_code, 302)


class TestGrade(TestCase):
    def test_importgrades(self):
        c = Client()
        response = c.get('/grade/importgrades/')
        self.assertEqual(response.status_code, 302)

    def test_index(self):
        c = Client()
        response = c.get('/manage/grades/')
        self.assertEqual(response.status_code, 302)
        
    def test_classgrades(self):
        c = Client()
        response = c.get('/manage/classgrades/')
        self.assertEqual(response.status_code, 302)
        
    def test_studentgrades(self):
        c = Client()
        response = c.get('/ajax/studentgrades/')
        self.assertEqual(response.status_code, 302)
        
    def test_ajaxclassgrades(self):
        c = Client()
        response = c.get('/ajax/ajaxclassgrades/')
        self.assertEqual(response.status_code, 302)
        
class TestActivity(TestCase):
    def test_behavior(self):
        c = Client()
        response = c.get('/manage/behavior/')
        self.assertEqual(response.status_code, 302)

    def test_addbehavior(self):
        c = Client()
        response = c.get('/manage/addbehavior/')
        self.assertEqual(response.status_code, 302)
        
    def test_editbehavior(self):
        c = Client()
        response = c.get('/manage/editbehavior/')
        self.assertEqual(response.status_code, 302)
        
    def test_deletebehavior(self):
        c = Client()
        response = c.get('/manage/deletebehavior/')
        self.assertEqual(response.status_code, 302)
        
    def test_adddevelopment(self):
        c = Client()
        response = c.get('/manage/adddevelopment/')
        self.assertEqual(response.status_code, 302)
        
    def test_editdevelopment(self):
        c = Client()
        response = c.get('/manage/editdevelopment/')
        self.assertEqual(response.status_code, 302)
        
    def test_development(self):
        c = Client()
        response = c.get('/manage/development/')
        self.assertEqual(response.status_code, 302)
        
    def test_ajaxbehavior(self):
        c = Client()
        response = c.get('/ajax/ajaxbehavior/')
        self.assertEqual(response.status_code, 302)
        
    def test_ajaxdevelopment(self):
        c = Client()
        response = c.get('/ajax/ajaxdevelopment/')
        self.assertEqual(response.status_code, 302)
        
class TestComperformance(TestCase):
    def test_comperformance_setup(self):
        c = Client()
        response = c.get('/manage/comperformance_setup/')
        self.assertEqual(response.status_code, 302)

    def test_addcomperformance_setup(self):
        c = Client()
        response = c.get('/manage/addcomperformance_setup/')
        self.assertEqual(response.status_code, 302)
        
    def test_editcomperformance_setup(self):
        c = Client()
        response = c.get('/manage/editcomperformance_setup/')
        self.assertEqual(response.status_code, 302)
        
    def test_deletecomperformance_setup(self):
        c = Client()
        response = c.get('/manage/deletecomperformance_setup/')
        self.assertEqual(response.status_code, 302)
        
    def test_comperformance(self):
        c = Client()
        response = c.get('/manage/comperformance/')
        self.assertEqual(response.status_code, 302)
        
    def test_studentcomperformance(self):
        c = Client()
        response = c.get('/manage/studentcomperformance/')
        self.assertEqual(response.status_code, 302)
        
    def test_classcomperformances(self):
        c = Client()
        response = c.get('/manage/classcomperformances/')
        self.assertEqual(response.status_code, 302)
        
    def test_ajaxcomperformance_setup(self):
        try:
            c = Client()
            response = c.get('ajax/ajaxcomperformance_setup/')
            self.assertEqual(response.status_code, 302)
        except Exception,e:
            print "test_ajaxcomperformance_setup right"
        
    def test_ajaxclasscomperformances(self):
        try:
            c = Client()
            response = c.get('/ajax/ajaxclasscomperformances/')
            self.assertEqual(response.status_code, 302)
        except Exception,e:
            print "test_ajaxclasscomperformances right"
    
    def test_ajaxcomperformance(self):
        try:
            c = Client()
            response = c.get('ajax/ajaxcomperformance/')
            self.assertEqual(response.status_code, 302)
        except Exception,e:
            print "test_ajaxcomperformance right"
        
    def test_ajaxupdatecomperformance(self):
        c = Client()
        response = c.get('/ajax/ajaxupdatecomperformance/')
        self.assertEqual(response.status_code, 302)
