(function ($) {
	'use strict';

	// Banner Slider active with navigation
	$('.active-slider-def').slick({
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		adaptiveHeight: true,
		arrows: true,
		prevArrow: '<span class="slider-navigation slider-navigation-left"><i class="icofont-long-arrow-left"></i></span>',
		nextArrow: '<span class="slider-navigation slider-navigation-right"><i class="icofont-long-arrow-right"></i></span>'
	});

	/* Portfolio Active */
	var isotopFilter = $('.portfolio-filters');
	var isotopGrid = $('.portfolios:not(.portfolios-slider-active)');
	var isotopGridItemSelector = $('.portfolio-single');
	var isotopGridItem = '.portfolio-single';

	isotopFilter.find('button:first-child').addClass('active');

	//Images Loaded
	isotopGrid.imagesLoaded(function () {
		/*-- init Isotope --*/
		var initial_items = isotopGrid.data('show');
		var next_items = isotopGrid.data('load');
		var loadMoreBtn = $('.load-more-toggle');



		/*-- Isotop Filter Menu --*/
		isotopFilter.on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');

			isotopFilter.find('button').removeClass('is-checked');
			$(this).addClass('is-checked');
		});

		/*-- Update Filter Counts --*/
		function updateFilterCounts() {
			// get filtered item elements


			if (isotopGridItemSelector.hasClass('hidden')) {
				isotopGridItemSelector.removeClass('hidden');
			}

			var index = 0;

			$(itemElems).each(function () {
				if (index >= initial_items) {
					$(this).addClass('hidden');
				}
				index++;
			});

		}

		/*-- Function that Show items when page is loaded --*/
		function showNextItems(pagination) {
			var itemsMax = $('.hidden').length;
			var itemsCount = 0;

			$('.hidden').each(function () {
				if (itemsCount < pagination) {
					$(this).removeClass('hidden');
					itemsCount++;
				}
			});

			if (itemsCount >= itemsMax) {
				loadMoreBtn.hide();
			}

		}

		/*-- Function that hides items when page is loaded --*/
		function hideItems(pagination) {
			var itemsMax = $(isotopGridItem).length;
			var itemsCount = 0;

			$(isotopGridItem).each(function () {
				if (itemsCount >= pagination) {
					$(this).addClass('hidden');
				}
				itemsCount++;
			});

			if (itemsCount < itemsMax || initial_items >= itemsMax) {
				loadMoreBtn.hide();
			}


		}

		/*-- Function that Load items when Button is Click --*/
		loadMoreBtn.on('click', function (e) {
			e.preventDefault();
			showNextItems(next_items);
		});

		hideItems(initial_items);
	});

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