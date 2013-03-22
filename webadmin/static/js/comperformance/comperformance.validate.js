;(function( $, window, document, undefined ) {

    $(document).ready(function() {

        if( $.validator ) {
            jQuery.validator.addMethod("username", function( value, element ) {
                var result = this.optional(element) || /^([\w]{9}|[a-zA-Z]{1}[\w]+?)$/.test(value);

                return result;
            }, "Your username is invalid.");

            jQuery.validator.addMethod("password", function( value, element ) {
                var result = this.optional(element) || /^[\w]+?$/.test(value);

                return result;
            }, "Your password is invalid.");
            
            jQuery.validator.addMethod("classid", function( value, element ) {
                var result = this.optional(element) || /^[\w]{7}$/.test(value);

                return result;
            }, "Your classid is invalid.");

            jQuery.validator.addMethod("classname", function( value, element ) {
                var result = this.optional(element) || /^[\u4e00-\u9fa5]{2,6}$/.test(value);

                return result;
            }, "Your classname is invalid.");

            jQuery.validator.addMethod("studentid", function( value, element ) {
                var result = this.optional(element) || /^[\w]{9}$/.test(value);

                return result;
            }, "Your studentid is invalid.");

            jQuery.validator.addMethod("studentname", function( value, element ) {
                var result = this.optional(element) || /^[\u4e00-\u9fa5]{2,4}$/.test(value);

                return result;
            }, "Your studentname is invalid.");

            jQuery.validator.addMethod("term", function( value, element ) {
                var result = this.optional(element) || /^[\w]{4,4}[\u4e00-\u9fa5]{2,2}$/.test(value);

                return result;
            }, "Your term is invalid.");

            /*login*/
            $('#login-form').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    username:{
                        required:true,
                        minlength:6,
                        maxlength:12,
                        username:true,
                    },
                    password:{
                        required:true,
                        minlength:6,
                        maxlength:12,
                        password:true,
                    },
                    captcha_1:{
                        required:true,
                        remote:{
                            url:'/captcha/verify/',
                            type:'get',
                            dataType:'json',
                            data:{
                                verify_data:function(){
                                        return $('#id_captcha_1').val();
                                    },
                                key:function(){
                                        return $('#id_captcha_0').val();
                                    },
                            },
                        }
                    },
                },
                messages:{
                    username:{
                        required:"用户名必须要填(学生:您的学号,管理员:6-12位,由字母数字下划线组成,首字母为字母)",
                        minlength:"管理员用户名至少为6位",
                        maxlength:"管理员用户名至多为12位",
                        username:'学生:您的学号,管理员:6-12位,由字母数字下划线组成,首字母为字母',
                    },
                    password:{
                        required:"密码必须要填(由字母数字下划线组成的字符串，最少为6位)", 
                        minlength:"密码至少为6位",
                        maxlength:"密码至多为12位",
                        password:"密码由字母数字下划线组成的字符串，最少为6位",
                    },
                    captcha_1:{
                        required:"验证码必须要填",  
                        remote:"输入验证码错误",
                    },
                },
                invalidHandler: function(form, validator) {
                    if($.fn.effect) {
                        $("#mws-login").effect("shake", {distance: 6, times: 2}, 35);
                    }
                }
            });

            /*changepassword*/
            $('#change-password-form').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    newpassword:{
                        required:true,
                        minlength:6,
                        maxlength:12,
                        password:true,
                    },
                    renewpassword:{
                        required:true,
                        equalTo:'#newpassword',
                    },
                },
                messages:{
                    newpassword:{
                        required:"密码必须要填(由字母数字下划线组成的字符串，最少为6位)", 
                        minlength:"密码至少为6位",
                        maxlength:"密码至多为12位",
                        password:"密码由字母数字下划线组成的字符串，最少为6位",
                    },
                    renewpassword:{
                        required:'重复密码必须要填',  
                        equalTo:'此处必须输入和上栏密码相同的内容',
                    },
                },
                invalidHandler: function(form, validator) {
                    ;
                }
            });

            /*add class*/
            $('#add-class-form').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    classid:{
                        required:true,
                        classid:true,
                    },
                    classname:{
                        required:true,
                        classname:true,
                    },
                },
                messages:{
                    classid:{
                        required:"班号必须要填(7位数数字)", 
                        classid:"班号由7位数数字组成",
                    },
                    classname:{
                        required:'班级姓名必须要填（2-6个汉字）',  
                        classname:'班级姓名必须是2-6个汉字',
                    },
                },
                invalidHandler: function(form, validator) {
                    ;
                }
            });

            /*edit class*/
            $('#edit-class-form').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    classid:{
                        required:true,
                        classid:true,
                    },
                    classname:{
                        required:true,
                        classname:true,
                    },
                },
                messages:{
                    classid:{
                        required:"班号必须要填(7位数数字)", 
                        classid:"班号由7位数数字组成",
                    },
                    classname:{
                        required:'班级姓名必须要填（2-6个汉字）',  
                        classname:'班级姓名必须是2-6个汉字',
                    },
                },
                invalidHandler: function(form, validator) {
                    ;
                }
            });
            
            
            /*add student*/
            $('#add-student-form').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    studentid:{
                        required:true,
                        studentid:true,
                    },
                    studentname:{
                        required:true,
                        studentname:true,
                    },
                    studentsex:{
                        required:true,
                    },
                    studentclass:{
                        required:true,
                    },
                },
                messages:{
                    studentid:{
                        required:"学号必须要填(9位数数字)", 
                        studentid:"学号由9位数数字组成",
                    },
                    studentname:{
                        required:'同学姓名必须要填（2-4个汉字）',  
                        studentname:'同学姓名必须是2-4个汉字',
                    },
                    studentsex:{
                        required:"请选择性别",
                    },
                    studentclass:{
                        required:"请选择班级",
                    },
                },
                invalidHandler: function(form, validator) {
                    ;
                }
            });

            /*edit student*/
            $('#edit-student-form').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    studentid:{
                        required:true,
                        studentid:true,
                    },
                    studentname:{
                        required:true,
                        studentname:true,
                    },
                    studentclass:{
                        required:true,
                    },
                },
                messages:{
                    studentid:{
                        required:"学号必须要填(9位数数字)", 
                        studentid:"学号由9位数数字组成",
                    },
                    studentname:{
                        required:'同学姓名必须要填（2-4个汉字）',  
                        studentname:'同学姓名必须是2-4个汉字',
                    },
                    studentclass:{
                        required:"请选择班级",
                    },
                },
                invalidHandler: function(form, validator) {
                    ;
                }
            });
            
            /*add assessment*/
            $('#add-assessment-form').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    term:{
                        required:true,
                        term:true,
                    },
                    begindate:{
                        required:true,
                    },
                    enddate:{
                        required:true,
                    },
                    excellent:{
                        required:true,
                        digits:true,
                        max:100,
                        min:0,
                    },
                    good:{
                        required:true,
                        digits:true,
                        max:100,
                        min:0,
                    },
                    ordinary:{
                        required:true,
                        digits:true,
                        max:100,
                        min:0,
                    },
                },
                messages:{
                    term:{
                        required:"学期必须填",
                        term:"要按照(2012年秋)格式填",
                    },
                    begindate:{
                        required:"开始日期必须填",
                    },
                    enddate:{
                        required:"结束日期学期必须填",
                    },
                    excellent:{
                        required:"优必须填",
                        digits:"请输入数字",
                        max:"优最大为100",
                        min:"优最小为0",
                    },
                    good:{
                        required:"良必须填",
                        digits:"请输入数字",
                        max:"良最大为100",
                        min:"良最小为0",
                    },
                    ordinary:{
                        required:"中必须填",
                        digits:"请输入数字",
                        max:"中最大为100",
                        min:"中最小为0",
                    },
                },
                invalidHandler: function(form, validator) {
                    ;
                }
            });
            
            $('#add-assessment-form').submit(function(eventdata,event){
                if((new Date($('#begindate').val())) > (new Date($('#enddate').val()))){
                    var message = '开始日期必须小于结束日期';
                    $("#mws-validate-error").html(message).show();
                    event.preventDefault();
                }
                    
                if((parseInt($('#excellent').val()) + parseInt($('#good').val()) + parseInt($('#ordinary').val())) != 100){
                    var message = '优良中之和必须为100';
                    $("#mws-validate-error").html(message).show();
                    event.preventDefault();
                }
            });
            
            /*edit assessment*/
            $('#edit-assessment-form').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    term:{
                        required:true,
                        term:true,
                    },
                    begindate:{
                        required:true,
                    },
                    enddate:{
                        required:true,
                    },
                    excellent:{
                        required:true,
                        digits:true,
                        max:100,
                        min:0,
                    },
                    good:{
                        required:true,
                        digits:true,
                        max:100,
                        min:0,
                    },
                    ordinary:{
                        required:true,
                        digits:true,
                        max:100,
                        min:0,
                    },
                },
                messages:{
                    term:{
                        required:"学期必须填",
                        term:"要按照(2012年秋)格式填",
                    },
                    begindate:{
                        required:"开始日期必须填",
                    },
                    enddate:{
                        required:"结束日期学期必须填",
                    },
                    excellent:{
                        required:"优必须填",
                        digits:"请输入数字",
                        max:"优最大为100",
                        min:"优最小为0",
                    },
                    good:{
                        required:"良必须填",
                        digits:"请输入数字",
                        max:"良最大为100",
                        min:"良最小为0",
                    },
                    ordinary:{
                        required:"中必须填",
                        digits:"请输入数字",
                        max:"中最大为100",
                        min:"中最小为0",
                    },
                },
                invalidHandler: function(form, validator) {
                    ;
                }
            });
            
            $('#edit-assessment-form').submit(function(eventdata,event){
                if((new Date($('#editbegindate').val())) > (new Date($('#editenddate').val()))){
                    var message = '开始日期必须小于结束日期';
                    $("#edit-mws-validate-error").html(message).show();
                    event.preventDefault();
                }
                    
                if((parseInt($('#editexcellent').val()) + parseInt($('#editgood').val()) + parseInt($('#editordinary').val())) != 100){
                    var message = '优良中之和必须为100';
                    $("#edit-mws-validate-error").html(message).show();
                    event.preventDefault();
                }
            });
            
            /*import grades*/
            $('#importgrades').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    grades:{
                        required:true,
                        accept:"xls",
                    },
                },
                messages:{
                    grades:{
                        required:"必须选择成绩单",
                        accept:"成绩单为以xls结尾的excel",
                    },
                },
                invalidHandler: function(form, validator) {
                    ;
                }
            });
            
            /*add behavior*/
            $('#add-behavior-form').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    behaviorname:{
                        required:true,
                    },
                    actlevel:{
                        required:true,
                    },
                },
                messages:{
                    behaviorname:{
                        required:"日常活动名称必须要填",
                    },
                    actlevel:{
                        required:"级别必须要填",
                    },
                },
                invalidHandler: function(form, validator) {
                    ;
                }
            });
            
            /*edit behavior*/
            $('#edit-behavior-form').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    behaviorname:{
                        required:true,
                    },
                    actlevel:{
                        required:true,
                    },
                },
                messages:{
                    behaviorname:{
                        required:"日常活动名称必须要填",
                    },
                    actlevel:{
                        required:"级别必须要填",
                    },
                },
                invalidHandler: function(form, validator) {
                    ;
                }
            });
            
            /*add development*/
            $('#add-development-form').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    developmentname:{
                        required:true,
                    },
                    developmentlevel:{
                        required:true,
                    },
                },
                messages:{
                    developmentname:{
                        required:"个性发展名称必须要填",
                    },
                    developmentlevel:{
                        required:"个性发展大类必须要填",
                    },
                },
                invalidHandler: function(form, validator) {
                    ;
                }
            });
            
            /*edit development*/
            $('#edit-development-form').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    developmentname:{
                        required:true,
                    },
                    developmentlevel:{
                        required:true,
                    },
                },
                messages:{
                    developmentname:{
                        required:"个性发展名称必须要填",
                    },
                    developmentlevel:{
                        required:"个性发展大类必须要填",
                    },
                },
                invalidHandler: function(form, validator) {
                    ;
                }
            });
            
            /*add comperformance_setup*/
            $('#add-comperformance_setup-form').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    term:{
                        required:true,
                        term:true,
                    },
                    moral:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                    behaviorup:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                    physical:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                    excellent:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                    good:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                    ordinary:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                    development:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                    behavior:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                },
                messages:{
                    term:{
                        required:"学期必须填",
                        term:"要按照(2012年秋)格式填",
                    },
                    moral:{
                        required:"互评最高分必须要填",
                        number:"互评最高分为数字",
                        max:"互评最高分最大为100",
                        min:"互评最高分最小为0",
                    },
                    behaviorup:{
                        required:"日常行为分最高分必须要填",
                        number:"日常行为分最高分为数字",
                        max:"日常行为分最高分最大为100",
                        min:"日常行为分最高分最小为0",
                    },
                    physical:{
                        required:"体能分数必须要填",
                        number:"体能分数为数字",
                        max:"体能分数最大为100",
                        min:"体能分数最小为0",
                    },
                    excellent:{
                        required:"优分数必须要填",
                        number:"优分数为数字",
                        max:"优分数最大为100",
                        min:"优分数最小为0",
                    },
                    good:{
                        required:"良分数必须要填",
                        number:"良分数为数字",
                        max:"良分数最大为100",
                        min:"良分数最小为0",
                    },
                    ordinary:{
                        required:"中分数必须要填",
                        number:"中分数为数字",
                        max:"中分数最大为100",
                        min:"中分数最小为0",
                    },
                    development:{
                        required:"单项最高分必须要填",
                        number:"单项最高分为数字",
                        max:"单项最高分最大为100",
                        min:"单项最高分最小为0",
                    },
                    behavior:{
                        required:"日常行为分基础分必须要填",
                        number:"日常行为分基础分为数字",
                        max:"日常行为分基础分最大为100",
                        min:"日常行为分基础分最小为0",
                    },
                },
                invalidHandler: function(form, validator) {
                    ;
                }
            });

            $('#add-comperformance_setup-form').submit(function(eventdata,event){
                if((parseInt($('#addmoral').val()) + parseInt($('#addbehaviorup').val()) + parseInt($('#addphysical').val())) != 100){
                    var message = '互评最高分,日常行为分最高分,体能分数之和必须为100';
                    $("#mws-validate-error").html(message).show();
                    event.preventDefault();
                }
            });
            
            /*add comperformance_setup*/
            $('#edit-comperformance_setup-form').validate({
                errorPlacement:function(label,elem){
                    elem.closest('.mws-form-row').find('.error-messages').append(label);
                },
                rules:{
                    term:{
                        required:true,
                        term:true,
                    },
                    moral:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                    behaviorup:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                    physical:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                    excellent:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                    good:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                    ordinary:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                    development:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                    behavior:{
                        required:true,
                        number:true,
                        min:0,
                        max:100,
                    },
                },
                messages:{
                    term:{
                        required:"学期必须填",
                        term:"要按照(2012年秋)格式填",
                    },
                    moral:{
                        required:"互评最高分必须要填",
                        number:"互评最高分为数字",
                        max:"互评最高分最大为100",
                        min:"互评最高分最小为0",
                    },
                    behaviorup:{
                        required:"日常行为分最高分必须要填",
                        number:"日常行为分最高分为数字",
                        max:"日常行为分最高分最大为100",
                        min:"日常行为分最高分最小为0",
                    },
                    physical:{
                        required:"体能分数必须要填",
                        number:"体能分数为数字",
                        max:"体能分数最大为100",
                        min:"体能分数最小为0",
                    },
                    excellent:{
                        required:"优分数必须要填",
                        number:"优分数为数字",
                        max:"优分数最大为100",
                        min:"优分数最小为0",
                    },
                    good:{
                        required:"良分数必须要填",
                        number:"良分数为数字",
                        max:"良分数最大为100",
                        min:"良分数最小为0",
                    },
                    ordinary:{
                        required:"中分数必须要填",
                        number:"中分数为数字",
                        max:"中分数最大为100",
                        min:"中分数最小为0",
                    },
                    development:{
                        required:"单项最高分必须要填",
                        number:"单项最高分为数字",
                        max:"单项最高分最大为100",
                        min:"单项最高分最小为0",
                    },
                    behavior:{
                        required:"日常行为分基础分必须要填",
                        number:"日常行为分基础分为数字",
                        max:"日常行为分基础分最大为100",
                        min:"日常行为分基础分最小为0",
                    },
                },
                invalidHandler: function(form, validator) {
                    ;
                }
            });

            $('#edit-comperformance_setup-form').submit(function(eventdata,event){
                if((parseInt($('#editmoral').val()) + parseInt($('#editbehaviorup').val()) + parseInt($('#editphysical').val())) != 100){
                    var message = '互评最高分,日常行为分最高分,体能分数之和必须为100';
                    $("#edit-mws-validate-error").html(message).show();
                    event.preventDefault();
                }
            });
            
        }
    });
}) (jQuery, window, document);

