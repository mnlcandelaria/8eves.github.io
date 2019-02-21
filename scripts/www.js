jQuery(function($) {
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
    var banner = Math.floor(Math.random() * 4) + 1;
    $('.banner').addClass('banner-' + banner);
});
