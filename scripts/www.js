var googleRecaptcha;

var onloadCallback = function() {
   googleRecaptcha = grecaptcha.render('googleRecaptcha', {
     'sitekey' : '6LeTWpQUAAAAAAFXyxeG74AZeUCLIpOXhIxzfZg8'
   });
 };

jQuery(function($) {
     AOS.init();

    $('.scroll-to').click(function(e) {
        var jump = $(this).attr('href');
        var position = $(jump).offset().top;

        // Returns width of browser viewport
        var width = $('html').width();

        if(width < 450){
            position -= 100;
        } else {
            position -= 120;
        }

        $('html, body').stop().animate({ scrollTop: position }, 500);

        $('button.navbar-toggler').addClass('collapsed').attr('aria-expanded', 'false');

        $('nav .navbar-collapse').removeClass('show');

        e.preventDefault();
    });

    $(window).scroll(function() {
		// get vertical position
		var top = $(this).scrollTop();

		if (top > 60) {
            $('header').addClass('header-fixed');
			$('header a.navbar-brand').removeClass('logo-big');
		} else {
            $('header').removeClass('header-fixed');
			$('header a.navbar-brand').addClass('logo-big');
		}
	});

    // random banner
    var banner = Math.floor(Math.random() * 5) + 1;
    $('.banner').addClass('banner-' + banner);

    // call fuction for form contact
    formContact();
});

function formContact() {
    $('#btnSubmit').click(function() {
        var hasError = false;

        $('form[name="form-contact"] input').removeClass('is-invalid');
        $('form[name="form-contact"] textarea').removeClass('is-invalid');
        $('form[name="form-contact"]').find('.alert').remove();

        if (!$('#inputFullName').val() || $('#inputFullName').val().trim() === '') {
            $('#inputFullName')
                .addClass('is-invalid')
                .val('')
                .parent()
                .find('.invalid-feedback')
                .text('Full Name is required.');

            hasError = true;
        }

        if (!$('#inputEmail').val() || $('#inputEmail').val().trim() === '') {
            $('#inputEmail')
                .addClass('is-invalid')
                .val('')
                .parent()
                .find('.invalid-feedback')
                .text('Email is required.');

            hasError = true;
        } else if (!validateEmail($('#inputEmail').val())) {
            $('#inputEmail')
                .addClass('is-invalid')
                .parent()
                .find('.invalid-feedback')
                .text('Invalid Email Address.');

            hasError = true;
        }

        if (!$('#inputContact').val() || $('#inputContact').val().trim() === '') {
            $('#inputContact')
                .addClass('is-invalid')
                .val('')
                .parent()
                .find('.invalid-feedback')
                .text('Contact Number is required.');

            hasError = true;
        }

        if (!$('#textareaMessage').val() || $('#textareaMessage').val().trim() === '') {
            $('#textareaMessage')
                .addClass('is-invalid')
                .val('')
                .parent()
                .find('.invalid-feedback')
                .text('Message is required.');

            hasError = true;
        }

        var recaptcha = grecaptcha.getResponse(googleRecaptcha);
        if(recaptcha.length == 0) {
            $('.recaptcha-field')
                .addClass('is-invalid')
                .find('.invalid-feedback')
                .text('Captcha Failed');

            hasError = true;
        }

        if (!hasError) {
            // submit form
            $('form[name="form-contact"]').submit();
        } else {
            // add message error template
            $('form[name="form-contact"]').prepend(
                '<div class="alert alert-danger">' +
                'Please fill-in the required details.' +
                '</div>'
            );
        }
    });

    $('form[name="form-contact"]').on('submit', function(e) {
        e.preventDefault();

        // submit response
        $.ajax({
            url: $('form[name="form-contact"]').attr('action'),
            type: 'POST',
            data: $('form[name="form-contact"]').serialize()
        });

        // set form fields to readonly
        $('form[name="form-contact"] input').attr('readonly', true);
        $('form[name="form-contact"] textarea').attr('readonly', true);
        $('form[name="form-contact"] button#btnSubmit')
            .removeClass('btn-primary')
            .addClass('btn-secondary')
            .attr('disabled', 'disabled');

        // add message success template
        $('form[name="form-contact"]').prepend(
            '<div class="alert alert-success">' +
            'Your response had been submitted successfully!' +
            '</div>'
        );
    });

    // validate email address
    function validateEmail(email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }
}
