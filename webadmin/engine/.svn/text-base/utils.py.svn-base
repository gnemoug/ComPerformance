#!/usr/bin/python
#-*- coding:utf-8 -*-

from django.db.models import Q
from django.template.loader import render_to_string
from django.http import HttpResponse
from datetime import datetime
import time

def get_datatables_records(request, querySet, columnIndexNameMap, jsonTemplatePath = None,extrafilters={},handle_user=False,updatefilter={},updateitems={}, *args):

    ######################################参数解析过程################################################
    cols = int(request.GET.get('iColumns',0)) #获取有多少列数据
    iDisplayLength = min(int(request.GET.get('iDisplayLength',10)),100)     #每页获取rows个数
    startRecord = int(request.GET.get('iDisplayStart',0)) #本页第一条数据，是所有数据的第几个,从0开始
    endRecord = startRecord + iDisplayLength  
    
    #Pass sColumns
    keys = columnIndexNameMap.keys()
    keys.sort()

    colitems = [columnIndexNameMap[key] for key in keys]
    sColumns = ",".join(map(str,colitems))#
    
    if updateitems:
        for k,v in updateitems.items():
            colitems[k] = v
    
    #Ordering data
    iSortingCols =  int(request.GET.get('iSortingCols',0))#根据几columns进行排序
    asortingCols = []
        
    if iSortingCols:
        for sortedColIndex in range(0, iSortingCols):
            sortedColID = int(request.GET.get('iSortCol_'+str(sortedColIndex),0))
            if request.GET.get('bSortable_{0}'.format(sortedColID), 'false')  == 'true':  #判断是否可以sort
                sortedColName = columnIndexNameMap[sortedColID]
                if handle_user:######根据用户realname进行排序#######
                    if sortedColName == 'user_id':
                        sortedColName = 'user'
                sortingDirection = request.GET.get('sSortDir_'+str(sortedColIndex), 'asc')
                if sortingDirection == 'desc':
                    sortedColName = '-'+sortedColName
                asortingCols.append(sortedColName) 
        querySet = querySet.order_by(*asortingCols)

    #定制的filter字段
    if updatefilter:
        columnIndexNameMap.update(updatefilter)

    #看哪些column可以search
    searchableColumns = []
    for col in range(0,cols):
        if request.GET.get('bSearchable_{0}'.format(col), False) == 'true': searchableColumns.append(columnIndexNameMap[col])

    #or search
    customSearch = request.GET.get('sSearch', '').rstrip().encode('utf-8');
   
    if customSearch != '':
        outputQ = None
        first = True
        for searchableColumn in searchableColumns:
            kwargz = {searchableColumn+"__icontains" : customSearch}

            outputQ = outputQ | Q(**kwargz) if outputQ else Q(**kwargz)

        if extrafilters:
            for k,v in extrafilters.items():
                for i in [real for real,mapping in v if customSearch in mapping]:
                    kwargz = {k+'__iexact':i}
                    outputQ = outputQ | Q(**kwargz) if outputQ else Q(**kwargz)

        #####################handle user or filter####################
        if handle_user:
            kwargz = {'user__realname__icontains':customSearch}
            outputQ = outputQ | Q(**kwargz)
        try:
            querySet = querySet.filter(outputQ)
        except Exception,e:
            print e

    #and search 
    outputQ = None
    for col in range(0,cols):
        if request.GET.get('sSearch_{0}'.format(col), False) > '':
            kwargz = {columnIndexNameMap[col]+"__iexact" : request.GET['sSearch_{0}'.format(col)]}
            outputQ = outputQ & Q(**kwargz) if outputQ else Q(**kwargz)
    if outputQ: 
        querySet = querySet.filter(outputQ)

    ######################################参数解析过程################################################

    ######################################提取json中的数据集################################################

    iTotalRecords = iTotalDisplayRecords = querySet.count() #总共的rows数
    querySet = querySet[startRecord:endRecord] #本页内容切片
    sEcho = int(request.GET.get('sEcho',0)) #页数
    
    if jsonTemplatePath:
        jstonString = render_to_string(jsonTemplatePath, locals()) 
        response = HttpResponse(jstonString, mimetype="application/javascript")
    else:
        aaData = []
        a = querySet.values() 
        for row in a:
            rowkeys = row.keys()
            rowvalues = row.values()
            rowlist = []
            for col in range(0,len(colitems)):
                for idx, val in enumerate(rowkeys):
                    if val == colitems[col]:
                        if isinstance(rowvalues[idx],datetime):
                            rowvalues[idx] = rowvalues[idx].strftime('%Y-%m-%d %H:%M:%S') 
                        #使用unicode原因是为了处理int,long,和unicode类型的中文问题,此处使用str，若遇到unicode中文会出错
                        rowlist.append(unicode(rowvalues[idx]))
            aaData.append(rowlist)

    ######################################提取json中的数据集################################################

    return (aaData,sEcho,iTotalRecords,iTotalDisplayRecords,sColumns)
