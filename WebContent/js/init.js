//need library access
var $nav = $('nav');
var scrollable = true;


(function($){
  $(function(){
	  //here we put the pages
	  //define the url for the page
	  //school links
	/*  page('/', showHome);
	  page('/school-info', showSchoolInfo)
	  page('/news',showNews);
	  page('/office-hours', showOfficeHours);
	  page('/bell-schedule', showBellSchedule);
	page('/food-cal',showFoodCal);
	page('/bus-routes', showBusRoutes);
	page('/curriculum', showCurriculim);
	page('/apply', showApply);
	page('/about', showAbout);
	//student links
	  page('/schoology-info', showSchoologyInfo);
	  page('/expectations', showExpectations);
	  page('/devices' , showDevices);
	  page('/learning', showLearning);*/
	  
	  //what happens on resize
	  $(window).resize(function(){
		 windowCheck();
	  });
	  //so here we put nav stuff
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown({constrainWidth:false});
    $('.collapsible').collapsible();
    
    ///this is only if window more than 600px
    if(screen.availWidth > 600 && screen.availHeight > 600){
    	$('body').append('\
    			<video role="presentation" preload="auto" loop id="schoolVid" muted\
    				 src="https://storage.googleapis.com/drsammyleemag.appspot.com/SchoolVid.mp4"\
    				style="position: fixed; z-index: 0; width: 100%; height: auto; left: 0px; top:0px;vertical-align: baseline"\
    			></video>\
    			');
    	    	
    	var vid = document.getElementById('schoolVid');
    	    	vid.play();
    	      bannerScrollOn();   
    }//end if window > 600 
    	windowCheck();
      }); // end of document ready
})(jQuery); // end of jQuery name space

function windowCheck(){
     if(window.outerWidth < 600 ){
			  //hide the video element
              $('video').hide();
              $('#main-content').addClass('mainContentHigh');
              $('footer').css('position', 'relative');
              if(!$nav.hasClass('amber')){
      	  		$nav.removeClass('transparent').addClass('amber darken-1 ');
      	  		$('img#logoImg', 'header').addClass('small');
      	  		}
              bannerScrollOff();
              
		  }else{
			  $('video').show();
              $('#main-content').removeClass('mainContentHigh');
              $('footer').css('position', 'fixed');
              if($nav.hasClass('amber')){
      	  		$nav.addClass('transparent').removeClass('amber darken-1 ');
      	  		$('img#logoImg', 'header').removeClass('small');
      	  		}
              bannerScrollOn();
		  }
}

function bannerScrollOn(){
	 /* scrolling to sephiaSmall */

	  	var vid = document.getElementById('schoolVid');
    $(document).on('scroll',function(){
  	  	if(window.scrollY > 300){
  	  		if(!$nav.hasClass('amber')){
  	  		$nav.removeClass('transparent').addClass('amber darken-1 ');
  	  		$('img#logoImg', 'header').addClass('small');
  	  		vid.pause();
  	  		$(vid).css('filter', 'sepia(100%)');
  	  		}
  	  	}else{
  	  		if($nav.hasClass('amber')){
      	  		$nav.addClass('transparent').removeClass('amber darken-1 ');
      	  		$('img#logoImg', 'header').removeClass('small');
      	  		
      	  		vid.play();
      	  		$(vid).css('filter','sepia(25%)');
      	  		}
  	  	}
    });//end document on scroll
}

function bannerScrollOff(){
	$(document).off('scroll');
}
