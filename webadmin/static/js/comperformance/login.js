;(function( $, window, document, undefined ) {

    $(document).ready(function() {
        $('#id_captcha_1').attr('style','width:87px;');
        $('#id_captcha_1').addClass('login-captcha');

        $('.captcha').click(function(){
            $.getJSON('/captcha/refresh/',function(data){
                $('#id_captcha_0').val(data.key);
                $('.captcha').attr('src',data.image_url);
            });
        });

		$.fn.placeholder && $('[placeholder]').placeholder();
    });

}) (jQuery, window, document);
