#!/usr/bin/python
#-*-coding:utf-8-*-

import re
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError

username_re = re.compile(r'^([\w]{9}|[a-zA-Z]{1}[\w]+?)$')
username = RegexValidator(username_re,u'学生:您的学号,管理员:6-12位,由字母数字下划线组成,首字母为字母','invalid')

password_re = re.compile(r'^[\w]+?$')
password = RegexValidator(password_re,u'密码由字母数字下划线组成的字符串，最少为6位','invalid')

classid_re = re.compile(r'^[\w]{7}$')
classid = RegexValidator(classid_re,u'班号由7位数数字组成','invalid')

classname_re = re.compile(r'^[\u4e00-\u9fa5]{2,6}$')

class ClassnameValidator(object):
    message = u'班级姓名必须是2-6个汉字'
    code = 'invalid'

    def __init__(self, message=None, code=None):
        if message is not None:
            self.message = message
        if code is not None:
            self.code = code

    def __call__(self,value):
        if not all([True if i >= u'\u4e00' and i <= u'\u9fa5' else False for i in value]):
            raise ValidationError(self.message, code=self.code)

classname = ClassnameValidator()

studentid_re = re.compile(r'^[\w]{9}$')
studentid = RegexValidator(studentid_re,u'学号由9位数数字组成','invalid')

class StudentnameValidator(ClassnameValidator):
    message = u'同学姓名必须是2-4个汉字'

studentname = StudentnameValidator()

class TermValidator(object):
    message = u'要按照(2012年秋)格式填'
    code = 'invalid'

    def __init__(self, message=None, code=None):
        if message is not None:
            self.message = message
        if code is not None:
            self.code = code

    def __call__(self,value):
        if not (all([True if i >= u'\u4e00' and i <= u'\u9fa5' else False for i in value[4:]]) and all([True if i in ['0','1','2','3','4','5','6','7','8','9'] else False for i in value[:4]])):
            raise ValidationError(self.message, code=self.code)

term = TermValidator()
