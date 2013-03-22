/*
 * MWS Admin v2.1 - Table Demo JS
 * This file is part of MWS Admin, an Admin template build for sale at ThemeForest.
 * All copyright to this file is hold by Mairel Theafila <maimairel@yahoo.com> a.k.a nagaemas on ThemeForest.
 * Last Updated:
 * December 08, 2012
 *
 */

;(function( $, window, document, undefined ) {

    $(document).ready(function() {


        // Data Tables
        if( $.fn.dataTable ) {
            $(".mws-datatable").dataTable();
            $(".mws-datatable-fn").dataTable({
                sPaginationType: "full_numbers"
            });
        }

    });

}) (jQuery, window, document);