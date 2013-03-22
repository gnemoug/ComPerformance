#!/usr/bin/python
#-*-coding:utf8-*-

from django.template import Library
from django.utils.safestring import mark_safe
from django.db.models import Q
import datetime
from engine.models import Assessment

register = Library()

@register.simple_tag
def go_assess():
    today = datetime.date.today()
    kwargzs = [
        {"enddate__gte":today},
        {"begindate__lte" :today},
    ]
    outputQ = None
    for kwargz in kwargzs:
        outputQ = outputQ & Q(**kwargz) if outputQ else Q(**kwargz)
    assessments = Assessment.objects.filter(outputQ)
    if not assessments:
        return mark_safe(u"")
    else:
        return mark_safe(u"<li><a href='/manage/goassessment/'>进行互评</a></li>")
