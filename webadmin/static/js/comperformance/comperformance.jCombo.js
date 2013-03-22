;(function( $, window, document, undefined ) {

    $(document).ready(function() {
        $("#studentaddclass").jCombo("/ajax/select_classes/",{
            initial_text:'-- 请选择 --',
        });

        $("#editstudentaddclass").jCombo("/ajax/select_classes/",{
            initial_text:'-- 请选择 --',
        });
    });

}) (jQuery, window, document);
