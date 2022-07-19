(function ($) {
	'use strict';

	// Banner Slider active with navigation
	$('.active-slider-def').slick({});

	/* Portfolio Active */
	var isotopFilter = $('.portfolio-filters');

	isotopFilter.find('button:first-child').addClass('active');

	/* Sticky Header */
	$(window).on('scroll', function () {
		var scrollPos = $(this).scrollTop();
		if (scrollPos > 300) {
			$('.sticky-header').addClass('is-sticky');
		} else {
			$('.sticky-header').removeClass('is-sticky');
		}
	});

})(jQuery);