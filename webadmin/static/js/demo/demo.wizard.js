/*
 * MWS Admin v2.1 - Wizard Demo JS
 * This file is part of MWS Admin, an Admin template build for sale at ThemeForest.
 * All copyright to this file is hold by Mairel Theafila <maimairel@yahoo.com> a.k.a nagaemas on ThemeForest.
 * Last Updated:
 * December 08, 2012
 *
 */

;(function( $, window, document, undefined ) {

    $(document).ready(function() {

        if( $.fn.wizard ) {
            
            $( '.wzd-default' ).wizard({
                buttonContainerClass: 'mws-button-row'
            });
            
            if( $.fn.validate ) {
                $wzd_form = $( '.wzd-validate' ).validate({ onsubmit: false });
                
                $( '.wzd-validate' ).wizard({
                    buttonContainerClass: 'mws-button-row', 
                    onStepLeave: function(wizard, step) {
                        return $wzd_form.form();
                    }, 
                    onBeforeSubmit: function() {
                        return $wzd_form.form();
                    }
                });
                
                $wzd_v_form = $( '.wzd-vertical' ).validate({ onsubmit: false });
                
                $( '.wzd-vertical' ).wizard({
                    orientation: 'vertical', 
                    buttonContainerClass: 'mws-button-row', 
                    onStepLeave: function(wizard, step) {
                        return $wzd_v_form.form();
                    }, 
                    onBeforeSubmit: function() {
                        return $wzd_v_form.form();
                    }
                });

                $wzd_v1_form = $( '.wzd-ajax' ).validate({ onsubmit: false });

                $( '.wzd-ajax' ).wizard({
                    buttonContainerClass: 'mws-button-row', 
                    onStepLeave: function(wizard, step) {
                        return $wzd_v1_form.form();
                    }, 
                    onBeforeSubmit: function() {
                        return $wzd_v1_form.form();
                    }, 
                    ajaxSubmit: true, 
                    ajaxOptions: {
                        dataType: 'text', 
                        beforeSubmit: function(formData) {
                            alert( 'You\'re about to submit:\n\n' + $.param(formData) );
                            return true;
                        }, 
                        success: function(response, status, xhr, form) {
                            if( confirm( 'Form successfully submitted.\nServer Response:\n' + response + '\n\nReset Wizard?' ) ) {
                                form.wizard( 'reset' );
                                $wzd_v1_form.resetForm();
                            }
                        }
                    }
                });
            }           
        }
    });

}) (jQuery, window, document);