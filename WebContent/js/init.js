//need library access
var $nav = $('nav');
var $containter =$('div#container');
var base = "/dr-sammy-lee";
var mainContentTop ;
var vid;
var LINKS = {
	news : base + '/news',
	schoolInfo : base + "/school-info",
	officeHours : base + '/office-hours',
	bellSchedule : base + 'bell-schedule',
	menu : base + '/menu'
};

(function($) {
	$(function() {
		
		//here we put the pages
		//define the url for the page
		//school links
		page('/', showHome);
		page('/dr-sammy-lee', showHome);
		page(LINKS.news, showNews);
		/* page('/dr-sammy-lee/school-info', showSchoolInfo)
		 page('/dr-sammy-lee/office-hours', showOfficeHours);
		 page('/dr-sammy-lee/bell-schedule', showBellSchedule);
		page('/dr-sammy-lee/food-cal',showFoodCal);
		page('/dr-sammy-lee/bus-routes', showBusRoutes);
		page('/dr-sammy-lee/curriculum', showCurriculim);
		page('/dr-sammy-lee/apply', showApply);
		page('/dr-sammy-lee/about', showAbout);
		//student links
		 page('/dr-sammy-lee/schoology-info', showSchoologyInfo);
		 page('/dr-sammy-lee/expectations', showExpectations);
		 page('/dr-sammy-lee/devices' , showDevices);
		 page('/dr-sammy-lee/learning', showLearning);*/
		page.start();
			page(window.location.pathname);
		

		//what happens on resize
		$(window).resize(function() {
			windowCheck();
		});
		//so here we put nav stuff
		$('.sidenav').sidenav();
		$('.dropdown-trigger').dropdown({
			constrainWidth : false
		});
		$('.collapsible').collapsible();

		///this is only if window more than 600px
		var platform = window.navigator.platform;
		if (screen.availWidth > 767 && screen.availHeight > 767) {
			$('body')
					.append(
							'\
    			<video role="presentation" preload="auto" loop id="schoolVid" muted\
    				 src="https://storage.googleapis.com/drsammyleemag.appspot.com/SchoolVid.mp4"\
    				style="position: fixed; z-index: 0; width: 100%; height: auto; left: 0px; top:0px;vertical-align: baseline"\
    			></video>\
    			');
			vid = document.getElementById('schoolVid');
			vid.play();
			bannerScrollOn();
		}
		windowCheck();

		//set link
		$('a.news-link').click(function() {
			window.location
		});
	}); // end of document ready
})(jQuery); // end of jQuery name space


function windowCheck() {
	
	var $footer = $('footer');
	if (window.outerWidth < 769
			|| window.outerWidth < (window.outerHeight + window.outerHeight * 0.1)) {
		//hide the video element
		if (vid) {
			vid.pause();
			vid.style.display = 'none';
		}
		
		
		$footer.css('position', 'relative');
		if (!$nav.hasClass('amber')) {
			$nav.removeClass('transparent').addClass('amber darken-1 ');
			$img.addClass('small');
		}
		

	} else {
		if (vid) {
			vid.style.display = 'block';
			vid.play();
		}
		
		$footer.css('position', 'fixed');

		
	}//end else
	
	if(onHomePage){
		resizeHome();
	}
}

function bannerScrollOn() {
	/* scrolling to sephiaSmall */
console.log('call banner scroll on');
	
	$(document).on('scroll', function() {
		if (window.scrollY > 100) {
			console.log('window scrollY is greater than 100 : ' + window.scrollY);
			if (!$nav.hasClass('amber')) {
				navOn();
				if(vid){
				vid.pause();
				vid.classList.add('video-stop');
			}
			}
		} else {
			console.log('window scrollY is less than 100 : ' + window.scrollY);
			if ($nav.hasClass('amber')) {
				navOff();
				if(vid){
				vid.classList.remove('video-stop');
				vid.play();
				}
			}
		}
	});//end document on scroll
}

function bannerScrollOff() {
	$(document).off('scroll');
}

function navOn() {
	console.log('nav on called');
	$nav.removeClass('transparent').addClass('amber darken-1 ');
	$('img#logoImg', 'header').addClass('small');
	$('#main-content').css('opacity', '1');
	$nav.addClass('nav-on');

}
function navOff() {
	console.log('nav off called');
	$nav.addClass('transparent').removeClass('amber darken-1 ');
	$('img#logoImg', 'header').removeClass('small');
	$('#main-content').css('opacity', '0');
	$nav.removeClass('nav-on');

}

function pageChange(ctx) {
	console.log('page change called');
	
	
	if(ctx.pathname == '/' || ctx.pathname == '/dr-sammy-lee'){
		onHomePage = true;
	}else{
		onHomePage = false;
	}
	
	if (!$nav.hasClass('nav-on') && !onHomePage) {
		navOn();
		var $mainContent = $('#main-content');
		if($mainContent){
			$mainContent.hide();
		}
		
		if (vid && vid.style.display != 'hidden') {
			vid.style.display = 'hidden';
			vid.pause();
		}
	}
}

function showHome(ctx) {
	
	pageChange(ctx);
	//hide all the frames or other content
	$('iframe').hide();
	$('#main-content').show();
	resizeHome();
	
}
function resizeHome(){
	var $mainContent = $('#main-content');
	var $img = $('img#logoImg','header');
	if (window.outerWidth < 769
			|| window.outerWidth < (window.outerHeight + window.outerHeight * 0.1)) {
		/*This is landing page only */
		$mainContent.addClass('mainContentHigh').css('opacity', '1');
		bannerScrollOff();
		/*end landing page only */
	}else{
		/*landing page only */
		$mainContent.removeClass('mainContentHigh').css('top', screen.availHeight + 20 + "px");
		if ($nav.hasClass('amber') && window.scrollY > 100) {
			if ($vid) {
				$vid.addClass('video-stop').get(0).pause();
			}
		} else {
			$nav.addClass('transparent').removeClass('amber darken-1 ');
			$img.removeClass('small');
		}//end else
		bannerScrollOn();
		/*end landing page only */
	}
}

function showNews(ctx) {
	
	console.log('show news called');
	onHomePage = false;
	pageChange(ctx);
	$('iframe#page-frame').show().attr('src',
			'https://drsammyleemag.blogspot.com').css({
		display : 'inline-block',
		width : '80vw',
		height : '90vh'
	});
}
