//need library access
var $nav = $('nav');
var $containter =$('div#container');
var $mainContent = $('div#main-content');
var base = "/dr-sammy-lee";
var onHomePage = true;
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
		
		page('/*', pageChange);
		page.start();
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
		}
		

	} else {
		if (vid) {
			vid.style.display = 'block';
			if(onHomePage){
			vid.play();
			}
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
		if (window.scrollY > 100 && onHomePage) {
			console.log('window scrollY is greater than 100 : ' + window.scrollY);
			if (!$nav.hasClass('amber')) {
				navOn();
				
			}
		} else if(window.scrollY < 100 && onHomePage){
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
	$mainContent.css('opacity', '1');
	$nav.addClass('nav-on');
	if(vid){
		vid.pause();
		vid.classList.add('video-stop');
	}

}
function navOff() {
	console.log('nav off called');
	$nav.addClass('transparent').removeClass('amber darken-1 ');
	$('img#logoImg', 'header').removeClass('small');
	$mainContent.css('opacity', '0');
	$nav.removeClass('nav-on');

}

function pageChange(ctx){
	console.log(ctx);
	if(ctx.path == base  || ctx.path == '/' && onHomePage){
		showHome();
		return;
	}else{
		
		navOn();
	
		$mainContent.fadeOut();
		onHomePage = false;
		
		
	}
	switch(ctx.path){
	case LINKS.news: showNews();break;
	default: showHome();
	}
}

function showHome() {
	onHomePage = true;
	//hide all the frames or other content
	$('iframe').hide();
	$mainContent.show();
	if(vid){
		vid.classList.remove('video-stop');
		vid.play();
		navOff();
	}
	resizeHome();
	
}


function resizeHome(){
	console.log('resize home called');
	var $img = $('img#logoImg','header');
	if (window.outerWidth < 769
			|| window.outerWidth < (window.outerHeight + window.outerHeight * 0.1)) {
		/*This is landing page only */
		$mainContent.css('opacity', '1').css('top', '5.5em');
		$img.addClass('small');
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

function showNews() {
	
	console.log('show news called');
	$('iframe#page-frame').show().attr('src',
			'https://drsammyleemag.blogspot.com').css({
		display : 'inline-block',
		width : '80vw',
		height : '90vh'
	});
}
