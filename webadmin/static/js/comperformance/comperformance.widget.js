;(function( $, window, document, undefined ) {

    $(document).ready(function() {
        /*change password*/
        if( $.fn.dialog  ) {
            $("#change-password-dialog").dialog({
                autoOpen: false,
                title: "修改密码",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $('#change-password-form').submit();
                    },
                },
            });     
        }
        
        $("#change-password").bind("click", function (event) {
            $("#change-password-dialog").dialog("open");
            event.preventDefault();
        });

        /*add class*/
        if( $.fn.dialog  ) {
            $("#add-class-dialog").dialog({
                autoOpen: false,
                title: "增加班级",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $('#add-class-form').submit();
                    },
                },
            });     
        }

        $("#addclass").bind("click", function (event) {
            $("#add-class-dialog").dialog("open");
            event.preventDefault();
        });

        /*select class*/
        if( $.fn.dialog  ) {
            $("#select-class-dialog").dialog({
                autoOpen: false,
                title: "注意",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#select-class-dialog").dialog("close");
                    },
                },
            });
        }

        /*edit class*/
        if( $.fn.dialog  ) {
            $("#edit-class-dialog").dialog({
                autoOpen: false,
                title: "修改班级",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $('#edit-class-form').submit();
                    },
                },
            });
        }
        
        /*delete class*/
        if( $.fn.dialog  ) {
            $("#delete-class-dialog").dialog({
                autoOpen: false,
                title: "删除班级",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $('#delete-class-form').submit();
                    },
                    "取消":function (event,ui) {
                        $("#delete-class-dialog").dialog('close');
                    },
                },
            });
        }
        
        /*add student*/
        if( $.fn.dialog  ) {
            $("#add-student-dialog").dialog({
                autoOpen: false,
                title: "增加同学",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $('#add-student-form').submit();
                    },
                },
            });     
        }

        if( $.fn.button  ) {
            $("#studentsex").buttonset();
        }

        $("#addstudent").bind("click", function (event) {
            $("#add-student-dialog").dialog("open");
            event.preventDefault();
        });

        /*select student*/
        if( $.fn.dialog  ) {
            $("#select-student-dialog").dialog({
                autoOpen: false,
                title: "注意",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#select-student-dialog").dialog("close");
                    },
                },
            });
        }

        /*edit student*/
        if( $.fn.dialog  ) {
            $("#edit-student-dialog").dialog({
                autoOpen: false,
                title: "修改同学",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $('#edit-student-form').submit();
                    },
                },
            });
        }
        
        if( $.fn.button  ) {
            $("#editstudentsex").buttonset();
        }
        
        /*delete student*/
        if( $.fn.dialog  ) {
            $("#delete-student-dialog").dialog({
                autoOpen: false,
                title: "删除同学",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $('#delete-student-form').submit();
                    },
                    "取消":function (event,ui) {
                        $("#delete-student-dialog").dialog('close');
                    },
                },
            });
        }
        
        /*init student*/
        if( $.fn.dialog  ) {
            $("#init-student-dialog").dialog({
                autoOpen: false,
                title: "初始化密码",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $('#init-student-form').submit();
                    },
                    "取消":function (event,ui) {
                        $("#init-student-dialog").dialog('close');
                    },
                },
            });
        }

        /*add assessment*/
        if( $.fn.dialog  ) {
            $("#add-assessment-dialog").dialog({
                autoOpen: false,
                title: "添加互评设置",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $('#add-assessment-form').submit();
                    },
                },
            });
        }
        
        /*delete assessment*/
        if( $.fn.dialog  ) {
            $("#delete-assessment-dialog").dialog({
                autoOpen: false,
                title: "删除互评设置",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $('#delete-assessment-form').submit();
                    },
                },
            });
        }
        
        /*edit assessment*/
        if( $.fn.dialog  ) {
            $("#edit-assessment-dialog").dialog({
                autoOpen: false,
                title: "修改互评设置",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $('#edit-assessment-form').submit();
                    },
                },
            });
        }
        
        /*select assessment*/
        if( $.fn.dialog  ) {
            $("#select-assessment-dialog").dialog({
                autoOpen: false,
                title: "注意",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#select-assessment-dialog").dialog("close");
                    },
                },
            });
        }
        
        $("#addassessment").bind("click", function (event) {
            $("#add-assessment-dialog").dialog("open");
            event.preventDefault();
        });
        
        if( $.fn.datepicker ) {
            $(".mws-datepicker").datepicker({
                showOtherMonths: true,
                dateFormat: "yy-mm-dd",
                constrainInput: true,
                minDate:"-0d",
            });
        }

        if( $.fn.datepicker ) {
            $(".mws-datepicker").datepicker({
                showOtherMonths: true,
                dateFormat: "yy-mm-dd",
                constrainInput: true,
                minDate:"-0d",
            });
        }
        
        /*num assessment*/
        if( $.fn.dialog  ) {
            $("#num-assessment-dialog").dialog({
                autoOpen: false,
                title: "注意",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#num-assessment-dialog").dialog("close");
                    },
                },
            });
        }
        
        /*add behavior*/
        if( $.fn.dialog  ) {
            $("#add-behavior-dialog").dialog({
                autoOpen: false,
                title: "增加日常行为活动",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#add-behavior-form").submit();
                    },
                },
            });
        }

        if( $.fn.button  ) {
            $("#addactlevel").buttonset();
        }

        $("#addbehavior").bind("click", function (event) {
            $("#add-behavior-dialog").dialog("open");
            event.preventDefault();
        });
        
        /*select behavior*/
        if( $.fn.dialog  ) {
            $("#select-behavior-dialog").dialog({
                autoOpen: false,
                title: "注意",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#select-behavior-dialog").dialog("close");
                    },
                },
            });
        }
        
        /*delete behavior*/
        if( $.fn.dialog  ) {
            $("#delete-behavior-dialog").dialog({
                autoOpen: false,
                title: "删除日常行为活动",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#delete-behavior-form").submit();
                    },
                },
            });
        }
        
        /*edit behavior*/
        if( $.fn.dialog  ) {
            $("#edit-behavior-dialog").dialog({
                autoOpen: false,
                title: "修改日常行为活动",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#edit-behavior-form").submit();
                    },
                },
            });
        }

        if( $.fn.button  ) {
            $("#editactlevel").buttonset();
        }
        
        /*add development*/
        if( $.fn.dialog  ) {
            $("#add-development-dialog").dialog({
                autoOpen: false,
                title: "增加个性发展活动",
                modal: true,
                width: "400",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#add-development-form").submit();
                    },
                },
            });
        }

        if( $.fn.button  ) {
            $("#adddevelopmentlevel").buttonset();
        }

        $("#adddevelopment").bind("click", function (event) {
            $("#add-development-dialog").dialog("open");
            event.preventDefault();
        });
        
        /*select development*/
        if( $.fn.dialog  ) {
            $("#select-development-dialog").dialog({
                autoOpen: false,
                title: "注意",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#select-development-dialog").dialog("close");
                    },
                },
            });
        }
        
        /*delete development*/
        if( $.fn.dialog  ) {
            $("#delete-development-dialog").dialog({
                autoOpen: false,
                title: "删除个性发展活动",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#delete-development-form").submit();
                    },
                },
            });
        }
        
        /*edit development*/
        if( $.fn.dialog  ) {
            $("#edit-development-dialog").dialog({
                autoOpen: false,
                title: "修改个性发展活动",
                modal: true,
                width: "400",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#edit-development-form").submit();
                    },
                },
            });
        }

        if( $.fn.button  ) {
            $("#editdevelopmentlevel").buttonset();
        }
        
        /*add comperformance_setup*/
        if( $.fn.dialog  ) {
            $("#add-comperformance_setup-dialog").dialog({
                autoOpen: false,
                title: "增加互评",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#add-comperformance_setup-form").submit();
                    },
                },
            });
        }
        
        $("#addcomperformance_setup").bind("click", function (event) {
            $("#add-comperformance_setup-dialog").dialog("open");
            event.preventDefault();
        });
        
        /*edit comperformance_setup*/
        if( $.fn.dialog  ) {
            $("#edit-comperformance_setup-dialog").dialog({
                autoOpen: false,
                title: "修改互评",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#edit-comperformance_setup-form").submit();
                    },
                },
            });
        }
        
        /*edit comperformance_setup*/
        if( $.fn.dialog  ) {
            $("#select-comperformance_setup-dialog").dialog({
                autoOpen: false,
                title: "修改互评",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#select-comperformance_setup-dialog").dialog("close");
                    },
                },
            });
        }
        
        /*delete comperformance_setup*/
        if( $.fn.dialog  ) {
            $("#delete-comperformance_setup-dialog").dialog({
                autoOpen: false,
                title: "删除互评",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#delete-comperformance_setup-form").submit();
                    },
                },
            });
        }

        /*select updatecomperformance*/
        if( $.fn.dialog  ) {
            $("#select-updatecomperformance-dialog").dialog({
                autoOpen: false,
                title: "注意",
                modal: true,
                width: "350",
                closeText:"hide",
                buttons: {
                    "确定": function (event,ui) {
                        $("#select-updatecomperformance-dialog").dialog("close");
                    },
                },
            });
        }

    });

}) (jQuery, window, document);
