function getObjectClass(obj) {   
     if (obj && obj.constructor && obj.constructor.toString) {   
         var arr = obj.constructor.toString().match(   
             /function\s*(\w+)/);   
   
         if (arr && arr.length == 2) {   
             return arr[1];   
         }   
     }   
   
     return undefined;   
}

//for reload a datatable
$.fn.dataTableExt.oApi.fnReloadAjax = function ( oSettings, sNewSource, fnCallback, bStandingRedraw )
{
    if ( typeof sNewSource != 'undefined' && sNewSource != null ) {
        oSettings.sAjaxSource = sNewSource;
    }
 
    // Server-side processing should just call fnDraw
    if ( oSettings.oFeatures.bServerSide ) {
        this.fnDraw();
        return;
    }
 
    this.oApi._fnProcessingDisplay( oSettings, true );
    var that = this;
    var iStart = oSettings._iDisplayStart;
    var aData = [];
  
    this.oApi._fnServerParams( oSettings, aData );
      
    oSettings.fnServerData.call( oSettings.oInstance, oSettings.sAjaxSource, aData, function(json) {
        /* Clear the old information from the table */
        that.oApi._fnClearTable( oSettings );
          
        /* Got the data - add it to the table */
        var aData =  (oSettings.sAjaxDataProp !== "") ?
            that.oApi._fnGetObjectDataFn( oSettings.sAjaxDataProp )( json ) : json;
          
        for ( var i=0 ; i<aData.length ; i++ )
        {
            that.oApi._fnAddData( oSettings, aData[i] );
        }
          
        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
          
        if ( typeof bStandingRedraw != 'undefined' && bStandingRedraw === true )
        {
            oSettings._iDisplayStart = iStart;
            that.fnDraw( false );
        }
        else
        {
            that.fnDraw();
        }
          
        that.oApi._fnProcessingDisplay( oSettings, false );
          
        /* Callback user function - for event handlers etc */
        if ( typeof fnCallback == 'function' && fnCallback != null )
        {
            fnCallback( oSettings );
        }
    }, oSettings );
};

;(function( $, window, document, undefined ) {

    $(document).ready(function() {

        // Data Tables
        if( $.fn.dataTable ) {
            
            //class
            var $class_selectrow = null;
            
            $("#classes").dataTable({
                "iDisplayLength": 10,
                "aLengthMenu": [[10, 15, 20], [10, 15, 20]],
                sPaginationType: "full_numbers",
                "bAutoWidth": false,
                "sScrollX": "100%",
                "bDeferRender": true,//Deferred rendering
                "bProcessing": true,
                //"bStateSave": true,
                "sScrollXInner": "100%",
                "sDom": 'T<"top"f>rt<"bottom"lpi><"clear">',
                "bServerSide": true,
                "sAjaxSource": "/ajax/get_classes_list/",
                //"fnServerParams": function(aoData) {
                //    aoData.push({name:"sSearch_4",value:"172.29.142.136",});
                //},
                "fnServerData":function(sSource,aoData,fnCallback){
                    $.getJSON(sSource,aoData, function (json) { 
                        // Do whatever additional processing you want on the callback, then tell DataTables 
                        $class_selectrow = null;
                        fnCallback(json);
                    });  
                },
                "aoColumns": [
                    { "bSearchable": true},
                    { "bSearchable": true},
                    { "bSearchable": true},
                    { "bSearchable": false},
                    { "bSearchable": false},
                ],
                "aoColumnDefs":[
                     {
                         "bSortable": false, 
                         "aTargets": [3,4],
                     }
                 ],
                "oTableTools":{
                    "sRowSelect": "single",             
                    "fnRowSelected":function(node){
                        $class_selectrow = $(node).children();
                        
              //          $('#receiver_detail_ip').text("接受者ip:" + $(s[6]).text());
                //        receiver_detail_oTable.fnReloadAjax();
                        /*
                        $.getJSON('/ajax/get_resemails_detail_list/',
                            {
                                receiver:$($('#resemails tbody tr.DTTT_selected td')[1]).text(),
                            },
                            function(data){
                                alert(data.iTotalDisplayRecords);
                                receiver_detail_oTable.fnReloadAjax();
                            }
                        );
                        */
                    },
                    "aButtons":[],
                }
            });

            $('#classes_filter').attr('style','height:25px;');
        
            $("<a href='#' class='btn' id='editclass'style='float:right;width:66px;margin-right:2px;'><i class='icon-edit'></i>修改</a> \
            <a href='#' class='btn' id='deleteclass'  style='float:right;width:66px;margin-right:2px;'><i class='icon-remove'></i>删除</a> \
            <a href='#' class='btn' id='addclass' style='float:right;width:66px;margin-right:2px;'><i class='icon-plus'></i>添加</a>").appendTo('#classes_filter');
            
            //delete one row class
            $("#deleteclass").bind("click", function (event) {
                event.preventDefault();
                if($class_selectrow == null){
                    $("#select-class-dialog").dialog("open");
                }else{
                    $('#delete_class_id').val($($class_selectrow[0]).text());
                    $("#delete-class-dialog").dialog("open");
                }
            });
            
            //edit one row class
            $("#editclass").bind("click", function (event) {
                event.preventDefault();
                if($class_selectrow == null){
                    $("#select-class-dialog").dialog("open");
                }else{
                    $('#edit_class_id').val($($class_selectrow[0]).text());
                    $('#editclassid').val($($class_selectrow[1]).text());
                    $('#editclassname').val($($class_selectrow[2]).text());
                    $("#edit-class-dialog").dialog("open");
                }
            });
            
            
            //student
            var $student_selectrow = null;
            
            $("#students").dataTable({
                "iDisplayLength": 10,
                "aLengthMenu": [[10, 15, 20], [10, 15, 20]],
                sPaginationType: "full_numbers",
                "bAutoWidth": false,
                "sScrollX": "100%",
                "bDeferRender": true,//Deferred rendering
                "bProcessing": true,
                //"bStateSave": true,
                "sScrollXInner": "100%",
                "sDom": 'T<"top"f>rt<"bottom"lpi><"clear">',
                "bServerSide": true,
                "sAjaxSource": "/ajax/get_students_list/",
                //"fnServerParams": function(aoData) {
                //    aoData.push({name:"sSearch_4",value:"172.29.142.136",});
                //},
                "fnServerData":function(sSource,aoData,fnCallback){
                    $.getJSON(sSource,aoData, function (json) { 
                        // Do whatever additional processing you want on the callback, then tell DataTables 
                        $student_selectrow = null;
                        fnCallback(json);
                    });  
                },
                "aoColumns": [
                    { "bSearchable": true},
                    { "bSearchable": true},
                    { "bSearchable": true},
                    { "bSearchable": false},
                    { "bSearchable": true},
                ],
                "oTableTools":{
                    "sRowSelect": "single",             
                    "fnRowSelected":function(node){
                        $student_selectrow = $(node).children();
                        
              //          $('#receiver_detail_ip').text("接受者ip:" + $(s[6]).text());
                //        receiver_detail_oTable.fnReloadAjax();
                        /*
                        $.getJSON('/ajax/get_resemails_detail_list/',

                            {
                                receiver:$($('#resemails tbody tr.DTTT_selected td')[1]).text(),

                            },
                            function(data){
                                alert(data.iTotalDisplayRecords);
                                receiver_detail_oTable.fnReloadAjax();
                            }

                        );
                        */
                    },
                    "aButtons":[],
                }
            });

            $('#students_filter').attr('style','height:25px;');
        
            $("<a href='#' class='btn' id='editstudent'style='float:right;width:66px;margin-right:2px;'><i class='icon-edit'></i>修改</a> \
            <a href='#' class='btn' id='deletestudent'  style='float:right;width:66px;margin-right:2px;'><i class='icon-remove'></i>删除</a> \
            <a href='#' class='btn' id='addstudent' style='float:right;width:66px;margin-right:2px;'><i class='icon-plus'></i>添加</a>\
            <a href='#' class='btn' id='initstudent' style='float:right;width:100px;margin-right:2px;'><i class='icol-ui-text-field-password'></i>初始化密码</a>").appendTo('#students_filter');
            
            //init one row student
            $("#initstudent").bind("click", function (event) {
                event.preventDefault();
                if($student_selectrow == null){
                    $("#select-student-dialog").dialog("open");
                }else{
                    $('#init_student_id').val($($student_selectrow[0]).text());
                    $("#init-student-dialog").dialog("open");
                }
            });
            
            //delete one row student
            $("#deletestudent").bind("click", function (event) {
                event.preventDefault();
                if($student_selectrow == null){
                    $("#select-student-dialog").dialog("open");
                }else{
                    $('#delete_student_id').val($($student_selectrow[0]).text());
                    $("#delete-student-dialog").dialog("open");
                }
            });
            
            //edit one row student
            
            $("#editstudent").bind("click", function (event) {
                event.preventDefault();
                if($student_selectrow == null){
                    $("#select-student-dialog").dialog("open");
                }else{
                    $('#edit_student_id').val($($student_selectrow[0]).text());
                    $('#editstudentid').val($($student_selectrow[1]).text());
                    $('#editstudentname').val($($student_selectrow[2]).text());
                    
                    $('#editstudentsex').find('span').each(function(index,element){
                        if($(element).text() == $($student_selectrow[3]).text()){
                            $(this).parent().click();
                        }
                    });
                    
                    $("#edit-student-dialog").dialog("open");
                }
            });
            
            //assessments
            var $assessment_selectrow = null;
            
            $("#assessments").dataTable({
                "iDisplayLength": 10,
                "aLengthMenu": [[10, 15, 20], [10, 15, 20]],
                sPaginationType: "full_numbers",
                "bAutoWidth": false,
                "sScrollX": "100%",
                "bDeferRender": true,//Deferred rendering
                "bProcessing": true,
                "sScrollXInner": "100%",
                "sDom": 'T<"top"f>rt<"bottom"lpi><"clear">',
                "bServerSide": true,
                "sAjaxSource": "/ajax/get_assessments_list/",
                "fnServerData":function(sSource,aoData,fnCallback){
                    $.getJSON(sSource,aoData, function (json) { 
                        // Do whatever additional processing you want on the callback, then tell DataTables 
                        $assessment_selectrow = null;
                        fnCallback(json);
                    });  
                },
                "aoColumns": [
                    { "bSearchable": true},
                    { "bSearchable": true},
                    { "bSearchable": false},
                    { "bSearchable": false},
                    { "bSearchable": true},
                    { "bSearchable": true},
                    { "bSearchable": true},
                ],
                "oTableTools":{
                    "sRowSelect": "single",             
                    "fnRowSelected":function(node){
                        $assessment_selectrow = $(node).children();
                    },
                    "aButtons":[],
                }
            });

            $('#assessments_filter').attr('style','height:25px;');

            $("<a href='#' class='btn' id='editassessment'style='float:right;width:66px;margin-right:2px;'><i class='icon-edit'></i>修改</a> \
            <a href='#' class='btn' id='deleteassessment'  style='float:right;width:66px;margin-right:2px;'><i class='icon-remove'></i>删除</a> \
            <a href='#' class='btn' id='addassessment' style='float:right;width:66px;margin-right:2px;'><i class='icon-plus'></i>添加</a>").appendTo('#assessments_filter');

            //delete one row assessment
            $("#deleteassessment").bind("click", function (event) {
                event.preventDefault();
                if($assessment_selectrow == null){
                    $("#select-assessment-dialog").dialog("open");
                }else{
                    $('#delete_assessment_id').val($($assessment_selectrow[0]).text());
                    $("#delete-assessment-dialog").dialog("open");
                }
            });
            
            //edit one row assessment
            $("#editassessment").bind("click", function (event) {
                event.preventDefault();
                if($assessment_selectrow == null){
                    $("#select-assessment-dialog").dialog("open");
                }else{
                    $('#edit_assessment_id').val($($assessment_selectrow[0]).text());
                    $('#editterm').val($($assessment_selectrow[1]).text());
                    $('#editbegindate').val($($assessment_selectrow[2]).text());
                    $('#editenddate').val($($assessment_selectrow[3]).text());
                    $('#editexcellent').val($($assessment_selectrow[4]).text());
                    $('#editgood').val($($assessment_selectrow[5]).text());
                    $('#editordinary').val($($assessment_selectrow[6]).text());
                    $("#edit-assessment-dialog").dialog("open");
                }
            });
            
            //viewassessments
            $("#viewassessments").dataTable({
                "iDisplayLength": 10,
                "aLengthMenu": [[10, 20, 100], [10, 20, "所有"]],
                sPaginationType: "full_numbers",
                "bAutoWidth": false,
                "sScrollX": "100%",
                "bDeferRender": true,//Deferred rendering
                "bProcessing": true,
                "sScrollXInner": "100%",
                "sDom": 'T<"top"f>rt<"bottom"lpi><"clear">',
                "bServerSide": true,
                "sAjaxSource": "/ajax/view_assessments_list/",
                "aoColumns": [
                    { "bSearchable": true},
                    { "bSearchable": true},
                    { "bSearchable": true},
                    { "bSearchable": true},
                    { "bSearchable": false},
                    { "bSearchable": false},
                    { "bSearchable": false},
                ],
                "aoColumnDefs":[
                     {
                         "bSortable": false, 
                         "aTargets": [0,1,2,3,4,5,6],
                     }
                 ],
                "oTableTools":{
                    "sRowSelect": "single",
                    "aButtons":[
                        {
                            "sExtends":"print",
                            "sButtonText": "打印"
                        },
                        {
                            "sExtends":"collection",
                            "sButtonText": "保存",
                            "aButtons":    [ 
                                {
                                    "sExtends":"csv",
                                    "sButtonText": "保存为csv",
                                },
                                {
                                    "sExtends":"xls",
                                    "sButtonText": "保存为xls",
                                },
                                {
                                    "sExtends":"pdf",
                                    "sButtonText": "保存为pdf",
                                },
                            ]
                        },
                    ],
                    "sSwfPath": "/static/swf/copy_csv_xls_pdf.swf",
                }
            });

            $('#viewassessments_filter').attr('style','height:25px;');
            
            //goassessments
            var $goassessment_selectrow = null;
            
            $("#goassessments").dataTable({
                "iDisplayLength": 10,
                "aLengthMenu": [[10, 15, 20], [10, 15, 20]],
                sPaginationType: "full_numbers",
                "bAutoWidth": false,
                "sScrollX": "100%",
                "bDeferRender": true,//Deferred rendering
                "bProcessing": true,
                "sScrollXInner": "100%",
                "sDom": 'T<"top"f>rt<"bottom"lpi><"clear">',
                "bServerSide": true,
                "sAjaxSource": "/ajax/go_assessments_list/",
                "fnServerData":function(sSource,aoData,fnCallback){
                    $.getJSON(sSource,aoData, function (json) { 
                        // Do whatever additional processing you want on the callback, then tell DataTables 
                        $goassessment_selectrow = null;
                        fnCallback(json);
                    });  
                },
                "aoColumns": [
                    { "bSearchable": false},
                    { "bSearchable": true},
                    { "bSearchable": true},
                    { "bSearchable": false},
                    { "bSearchable": false},
                ],
                "aoColumnDefs":[
                     {
                         "bSortable": false, 
                         "aTargets": [0,1,2,3,4],
                     }
                 ],
                "oTableTools":{
                    "sRowSelect": "single",
                    "fnRowSelected":function(node){
                        $goassessment_selectrow = $(node).children();
                    },
                    "aButtons":[],
                }
            });

            $('#goassessments_filter').attr('style','height:25px;');
            $("<a href='#' class='btn' id='goordinary'style='float:right;width:66px;margin-right:2px;'><i class='icol-smiley-cry'></i>中</a> \
            <a href='#' class='btn' id='gogood'  style='float:right;width:66px;margin-right:2px;'><i class='icol-smiley-red'></i>良</a> \
            <a href='#' class='btn' id='goexcellent' style='float:right;width:66px;margin-right:2px;'><i class='icol-smiley-cool'></i>优</a>").appendTo('#goassessments_filter');
            
            //excellent
            $("#goexcellent").bind("click", function (event) {
                event.preventDefault();
                if($goassessment_selectrow == null){
                    $("#select-assessment-dialog").dialog("open");
                }else{
                    $.getJSON('/ajax/go_assessments/', {
                        term:$($goassessment_selectrow[0]).text(),
                        username:$($goassessment_selectrow[2]).text(),
                        result:"优",
                    },
                    function(data){
                        if(data[0] == "true"){
                            $($goassessment_selectrow[4]).text("优");
                        }else{
                            $('#resultnum').text("优最多可选" + data[1] + "个");
                            $("#num-assessment-dialog").dialog("open");
                        }
                    });
                }
            });
            
            //good
            $("#gogood").bind("click", function (event) {
                event.preventDefault();
                if($goassessment_selectrow == null){
                    $("#select-assessment-dialog").dialog("open");
                }else{
                    $.getJSON('/ajax/go_assessments/', {
                        term:$($goassessment_selectrow[0]).text(),
                        username:$($goassessment_selectrow[2]).text(),
                        result:"良",
                    },
                    function(data){
                        if(data[0] == "true"){
                            $($goassessment_selectrow[4]).text("良");
                        }else{
                            $('#resultnum').text("良最多可选" + data[1] + "个");
                            $("#num-assessment-dialog").dialog("open");
                        }
                    });
                }
            });
            
            //ordinary
            $("#goordinary").bind("click", function (event) {
                event.preventDefault();
                if($goassessment_selectrow == null){
                    $("#select-assessment-dialog").dialog("open");
                }else{
                    $.getJSON('/ajax/go_assessments/', {
                        term:$($goassessment_selectrow[0]).text(),
                        username:$($goassessment_selectrow[2]).text(),
                        result:"中",
                    },
                    function(data){
                        if(data[0] == "true"){
                            $($goassessment_selectrow[4]).text("中");
                        }else{
                            $('#resultnum').text("中最多可选" + data[1] + "个");
                            $("#num-assessment-dialog").dialog("open");
                        }
                    });
                }
            });

            //student grades
            $("#studentgrades").dataTable({
                "iDisplayLength": 10,
                "aLengthMenu": [[10, 20, 100], [10, 20, "所有"]],
                sPaginationType: "full_numbers",
                "bAutoWidth": false,
                "sScrollX": "100%",
                "bDeferRender": true,//Deferred rendering
                "bProcessing": true,
                "sScrollXInner": "100%",
                "sDom": 'T<"top"f>rt<"bottom"lpi><"clear">',
                "bServerSide": true,
                "sAjaxSource": "/ajax/studentgrades/",
                "aoColumns": [
                    { "bSearchable": false},
                    { "bSearchable": false},
                    { "bSearchable": true},
                    { "bSearchable": false},
                    { "bSearchable": true},
                ],
                "aoColumnDefs":[
                     {
                         "bSortable": false, 
                         "aTargets": [0,1,3],
                     }
                 ],
                "oTableTools":{
                    "sRowSelect": "single",
                    "aButtons":[
                        {
                            "sExtends":"print",
                            "sButtonText": "打印"
                        },
                        {
                            "sExtends":"collection",
                            "sButtonText": "保存",
                            "aButtons":    [ 
                                {
                                    "sExtends":"csv",
                                    "sButtonText": "保存为csv",
                                },
                                {
                                    "sExtends":"xls",
                                    "sButtonText": "保存为xls",
                                },
                                {
                                    "sExtends":"pdf",
                                    "sButtonText": "保存为pdf",
                                },
                            ]
                        },
                    ],
                    "sSwfPath": "/static/swf/copy_csv_xls_pdf.swf",
                }
            });

            $('#studentgrades_filter').attr('style','height:25px;');
            
            //behaviors
            var $behaviors_selectrow = null;
            
            $("#behaviors").dataTable({
                "iDisplayLength": 10,
                "aLengthMenu": [[10, 15, 20], [10, 15, 20]],
                sPaginationType: "full_numbers",
                "bAutoWidth": false,
                "sScrollX": "100%",
                "bDeferRender": true,//Deferred rendering
                "bProcessing": true,
                "sScrollXInner": "100%",
                "sDom": 'T<"top"f>rt<"bottom"lpi><"clear">',
                "bServerSide": true,
                "sAjaxSource": "/ajax/ajaxbehavior/",
                "fnServerData":function(sSource,aoData,fnCallback){
                    $.getJSON(sSource,aoData, function (json) { 
                        // Do whatever additional processing you want on the callback, then tell DataTables 
                        $behaviors_selectrow = null;
                        fnCallback(json);
                    });  
                },
                "aoColumns": [
                    { "bSearchable": false},
                    { "bSearchable": false},
                    { "bSearchable": true},
                ],
                "aoColumnDefs":[
                     {
                         "bSortable": false, 
                         "aTargets": [0,1,2],
                     }
                 ],
                "oTableTools":{
                    "sRowSelect": "single",
                    "fnRowSelected":function(node){
                        $behaviors_selectrow = $(node).children();
                    },
                    "aButtons":[],
                }
            });

            $('#behaviors_filter').attr('style','height:25px;');
            
            $("<a href='#' class='btn' id='editbehavior'style='float:right;width:66px;margin-right:2px;'><i class='icon-edit'></i>修改</a> \
            <a href='#' class='btn' id='deletebehavior'  style='float:right;width:66px;margin-right:2px;'><i class='icon-remove'></i>删除</a> \
            <a href='#' class='btn' id='addbehavior' style='float:right;width:66px;margin-right:2px;'><i class='icon-plus'></i>添加</a>").appendTo('#behaviors_filter');
            
            
            //delete one row behavior
            $("#deletebehavior").bind("click", function (event) {
                event.preventDefault();
                if($behaviors_selectrow == null){
                    $("#select-behavior-dialog").dialog("open");
                }else{
                    $('#delete_behavior_id').val($($behaviors_selectrow[0]).text());
                    $("#delete-behavior-dialog").dialog("open");
                }
            });
            
            //edit one row class
            $("#editbehavior").bind("click", function (event) {
                event.preventDefault();
                if($behaviors_selectrow == null){
                    $("#select-behavior-dialog").dialog("open");
                }else{
                    $('#edit_behavior_id').val($($behaviors_selectrow[0]).text());
                    
                    $('#editactlevel').find('span').each(function(index,element){
                        if($(element).text() == $($behaviors_selectrow[1]).text()){
                            $(this).parent().click();
                        }
                    });
                    $('#editbehaviorname').val($($behaviors_selectrow[2]).text());
                    $("#edit-behavior-dialog").dialog("open");
                }
            });
            
            //developments
            var $developments_selectrow = null;
            
            $("#developments").dataTable({
                "iDisplayLength": 10,
                "aLengthMenu": [[10, 15, 20], [10, 15, 20]],
                sPaginationType: "full_numbers",
                "bAutoWidth": false,
                "sScrollX": "100%",
                "bDeferRender": true,//Deferred rendering
                "bProcessing": true,
                "sScrollXInner": "100%",
                "sDom": 'T<"top"f>rt<"bottom"lpi><"clear">',
                "bServerSide": true,
                "sAjaxSource": "/ajax/ajaxdevelopment/",
                "fnServerData":function(sSource,aoData,fnCallback){
                    $.getJSON(sSource,aoData, function (json) { 
                        // Do whatever additional processing you want on the callback, then tell DataTables 
                        $developments_selectrow = null;
                        fnCallback(json);
                    });  
                },
                "aoColumns": [
                    { "bSearchable": false},
                    { "bSearchable": false},
                    { "bSearchable": true},
                ],
                "aoColumnDefs":[
                     {
                         "bSortable": false, 
                         "aTargets": [0,1,2],
                     }
                 ],
                "oTableTools":{
                    "sRowSelect": "single",
                    "fnRowSelected":function(node){
                        $developments_selectrow = $(node).children();
                    },
                    "aButtons":[],
                }
            });

            $('#developments_filter').attr('style','height:25px;');
            
            $("<a href='#' class='btn' id='editdevelopment'style='float:right;width:66px;margin-right:2px;'><i class='icon-edit'></i>修改</a> \
            <a href='#' class='btn' id='deletedevelopment'  style='float:right;width:66px;margin-right:2px;'><i class='icon-remove'></i>删除</a> \
            <a href='#' class='btn' id='adddevelopment' style='float:right;width:66px;margin-right:2px;'><i class='icon-plus'></i>添加</a>").appendTo('#developments_filter');
            
            //delete one row development
            $("#deletedevelopment").bind("click", function (event) {
                event.preventDefault();
                if($developments_selectrow == null){
                    $("#select-development-dialog").dialog("open");
                }else{
                    $('#delete_development_id').val($($developments_selectrow[0]).text());
                    $("#delete-development-dialog").dialog("open");
                }
            });

            //edit one row development
            $("#editdevelopment").bind("click", function (event) {
                event.preventDefault();
                if($developments_selectrow == null){
                    $("#select-development-dialog").dialog("open");
                }else{
                    $('#edit_development_id').val($($developments_selectrow[0]).text());
                    
                    $('#editdevelopmentlevel').find('span').each(function(index,element){
                        if($(element).text() == $($developments_selectrow[1]).text()){
                            $(this).parent().click();
                        }
                    });
                    $('#editdevelopmentname').val($($developments_selectrow[2]).text());
                    $("#edit-development-dialog").dialog("open");
                }
            });
            
            //comperformance_setups
            var $comperformance_setups_selectrow = null;
            
            $("#comperformance_setups").dataTable({
                "iDisplayLength": 10,
                "aLengthMenu": [[10, 15, 20], [10, 15, 20]],
                sPaginationType: "full_numbers",
                "bAutoWidth": false,
                "sScrollX": "100%",
                "bDeferRender": true,//Deferred rendering
                "bProcessing": true,
                "sScrollXInner": "100%",
                "sDom": 'T<"top"f>rt<"bottom"lpi><"clear">',
                "bServerSide": true,
                "sAjaxSource": "/ajax/ajaxcomperformance_setup/",
                "fnServerData":function(sSource,aoData,fnCallback){
                    $.getJSON(sSource,aoData, function (json) { 
                        // Do whatever additional processing you want on the callback, then tell DataTables 
                        $comperformance_setups_selectrow = null;
                        fnCallback(json);
                    });  
                },
                "aoColumns": [
                    { "bSearchable": true},
                    { "bSearchable": true},
                    { "bSearchable": false},
                    { "bSearchable": false},
                    { "bSearchable": false},
                    { "bSearchable": false},
                    { "bSearchable": false},
                    { "bSearchable": false},
                    { "bSearchable": false},
                    { "bSearchable": false},
                ],
                "aoColumnDefs":[
                     {
                         "bSortable": false, 
                         "aTargets": [0,1,2,3,4,5,6,7,8,9],
                     }
                 ],
                "oTableTools":{
                    "sRowSelect": "single",
                    "fnRowSelected":function(node){
                        $comperformance_setups_selectrow = $(node).children();
                    },
                    "aButtons":[],
                }
            });

            $('#comperformance_setups_filter').attr('style','height:25px;');
            
            $("<a href='#' class='btn' id='editcomperformance_setup'style='float:right;width:66px;margin-right:2px;'><i class='icon-edit'></i>修改</a> \
            <a href='#' class='btn' id='deletecomperformance_setup'  style='float:right;width:66px;margin-right:2px;'><i class='icon-remove'></i>删除</a> \
            <a href='#' class='btn' id='addcomperformance_setup' style='float:right;width:66px;margin-right:2px;'><i class='icon-plus'></i>添加</a>").appendTo('#comperformance_setups_filter');
            
            //delete one row comperformance_setup
            $("#deletecomperformance_setup").bind("click", function (event) {
                event.preventDefault();
                if($comperformance_setups_selectrow == null){
                    $("#select-comperformance_setup-dialog").dialog("open");
                }else{
                    $('#delete_comperformance_setup_id').val($($comperformance_setups_selectrow[0]).text());
                    $("#delete-comperformance_setup-dialog").dialog("open");
                }
            });

            //edit one row comperformance_setup
            $("#editcomperformance_setup").bind("click", function (event) {
                event.preventDefault();
                if($comperformance_setups_selectrow == null){
                    $("#select-comperformance_setup-dialog").dialog("open");
                }else{
                    $('#edit_comperformance_setup_id').val($($comperformance_setups_selectrow[0]).text());
                    $('#editterm').val($($comperformance_setups_selectrow[1]).text());
                    $('#editmoral').val($($comperformance_setups_selectrow[2]).text());
                    $('#editbehaviorup').val($($comperformance_setups_selectrow[3]).text());
                    $('#editphysical').val($($comperformance_setups_selectrow[4]).text());
                    $('#editexcellent').val($($comperformance_setups_selectrow[5]).text());
                    $('#editgood').val($($comperformance_setups_selectrow[6]).text());
                    $('#editordinary').val($($comperformance_setups_selectrow[7]).text());
                    $('#editdevelopment').val($($comperformance_setups_selectrow[8]).text());
                    $('#editbehavior').val($($comperformance_setups_selectrow[9]).text());
                    $("#edit-comperformance_setup-dialog").dialog("open");
                }
            });

            //student comperformances
            $("#studentcomperformances").dataTable({
                "iDisplayLength": 10,
                "aLengthMenu": [[10, 20, 100], [10, 20, "所有"]],
                sPaginationType: "full_numbers",
                "bAutoWidth": false,
                "sScrollX": "100%",
                "bDeferRender": true,//Deferred rendering
                "bProcessing": true,
                "bSort":false,
                "sScrollXInner": "350%",
                "sDom": 'T<"top"f>rt<"bottom"lpi><"clear">',
                "bServerSide": true,
                "sAjaxSource": "/ajax/ajaxcomperformance/",
                "oTableTools":{
                    "sRowSelect": "single",
                    "aButtons":[
                        {
                            "sExtends":"print",
                            "sButtonText": "打印"
                        },
                        {
                            "sExtends":"collection",
                            "sButtonText": "保存",
                            "aButtons":    [ 
                                {
                                    "sExtends":"csv",
                                    "sButtonText": "保存为csv",
                                },
                                {
                                    "sExtends":"xls",
                                    "sButtonText": "保存为xls",
                                },
                                {
                                    "sExtends":"pdf",
                                    "sButtonText": "保存为pdf",
                                },
                            ]
                        },
                    ],
                    "sSwfPath": "/static/swf/copy_csv_xls_pdf.swf",
                }
            });

            $('#studentcomperformances_filter').attr('style','height:25px;');
            
            //comperformances
            var nEditing = null;
            
            var oTable = $("#comperformances").dataTable({
                "iDisplayLength": 10,
                "aLengthMenu": [[10, 20, 100], [10, 20, "所有"]],
                sPaginationType: "full_numbers",
                "bAutoWidth": false,
                "sScrollX": "100%",
                "bDeferRender": true,//Deferred rendering
                "bProcessing": true,
                "bSort":false,
                "sScrollXInner": "350%",
                "sDom": 'T<"top"f>rt<"bottom"lpi><"clear">',
                "bServerSide": true,
                "sAjaxSource": "/ajax/ajaxcomperformance/",
                "fnRowCallback":function(nRow,aData,iDisplayIndex,iDisplayIndexFull){
                    $('td:last',nRow).html("<button type='button' class='btn'><i class='icon-edit'></i>修改</button>"); 
                },
                "fnCreatedRow":function(nRow,aData,iDataIndex){
                   // $('td:eq(7)',nRow).addClass('little_padding');
                    $('td:last',nRow).attr('style','padding:1px;');
                },
                "oTableTools":{
                    "sRowSelect": "single",
                    "aButtons":[
                        {
                            "sExtends":"print",
                            "sButtonText": "打印"
                        },
                        {
                            "sExtends":"collection",
                            "sButtonText": "保存",
                            "aButtons":    [ 
                                {
                                    "sExtends":"csv",
                                    "sButtonText": "保存为csv",
                                },
                                {
                                    "sExtends":"xls",
                                    "sButtonText": "保存为xls",
                                },
                                {
                                    "sExtends":"pdf",
                                    "sButtonText": "保存为pdf",
                                },
                            ]
                        },
                    ],
                    "sSwfPath": "/static/swf/copy_csv_xls_pdf.swf",
                }
            });

            $('#comperformances_filter').attr('style','height:25px;');
            
            function editRow ( oTable, nRow )
            {
                var i = 0;
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for(i=parseInt($('#behaviorstart').val());i <= parseInt($('#behaviorend').val());i++){
                    jqTds[i].innerHTML = '<input type="text" value="'+aData[i]+'" style="width:80px" >';
                }
                
                jqTds[parseInt($('#physical').val())].innerHTML = '<input type="text" value="'+aData[parseInt($('#physical').val())]+'" style="width:80px" >';
                
                for(i=parseInt($('#developmentstart').val());i <= parseInt($('#developmentend').val());i++){
                    jqTds[i].innerHTML = '<input type="text" value="'+aData[i]+'" style="width:80px" >';
                }
                
                jqTds[i + 1].innerHTML = "<button type='button' class='btn'><i class='icon-plus'></i>保存</button>";
            }
            
            function saveRow ( oTable, nRow )
            {
                var i = 0;
                var j = 0;
                var jqInputs = $('input', nRow);
                
                for(i=parseInt($('#behaviorstart').val());i <= parseInt($('#behaviorend').val());i++,j++){
                    oTable.fnUpdate( jqInputs[j].value, nRow, i, false );
                }
                
                oTable.fnUpdate( jqInputs[j].value, nRow, parseInt($('#physical').val()), false );
                j++;
                for(i=parseInt($('#developmentstart').val());i <= parseInt($('#developmentend').val());i++,j++){
                    oTable.fnUpdate( jqInputs[j].value, nRow, i, false );
                }
                
                oTable.fnUpdate( "<button type='button' class='btn'><i class='icon-edit'></i>修改</button>", nRow, i + 1, false );
            
                oTable.fnDraw();
            }
            
            function ajaxsaverow( oTable, nRow,flag,editnRow )
            {
                var jqInputs = $('input', nRow);
                var requestdata = [];
                var aData = oTable.fnGetData(nRow);
                var result;
                
                for(var i=0;i<jqInputs.length;i++){
                    requestdata.push(jqInputs[i].value);
                }
                
                $.getJSON('/ajax/ajaxupdatecomperformance/', 
                    {
                        data:requestdata,
                        user:aData[2],
                        term:aData[0],
                    },
                    function(data){
                        if(data[0] == "true"){
                            if(flag == 0){
                                saveRow( oTable, nEditing );
                                editRow( oTable, editnRow );
                                nEditing = editnRow;
                            }else if(flag == 1){
                                saveRow( oTable, nEditing );
                                nEditing = null;
                            }
                        }else if(data[0] == "false"){
                            if(flag == 0){
                                $("#select-updatecomperformance-dialog").dialog("open");;
                            }else if(flag == 1){
                                $("#select-updatecomperformance-dialog").dialog("open");;
                            }
                        }
                    }
                );
            }
            
            $('#comperformances button').live('click', function (e) {
                e.preventDefault();
                
                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];
                
                if ( nEditing !== null && nEditing != nRow ) {
                    /* A different row is being edited - the edit should be cancelled and this row edited */
                    ajaxsaverow( oTable, nEditing,0 ,nRow);
                }
                else if ( nEditing == nRow && this.innerHTML == '<i class="icon-plus"></i>保存' ) {
                    /* This row is being edited and should be saved */
                    ajaxsaverow( oTable, nEditing,1 ,null);
                }
                else {
                    /* No row currently being edited */
                    editRow( oTable, nRow );
                    nEditing = nRow;
                }
            });
            
        }
    });

}) (jQuery, window, document);
