// JavaScript Document

var audioVisible=false;
var firstTime=true;
var displayPopUps=true;
var API=null;
var vle=false;
var podcastPosition="-400px"
var eportPath;
var blogPath;

$(function(){

	//Grab settings from the settings page change filepath to ../../settings/settings.html
	$( "#settingsPopUps" ).load( "../../settings/settings.html" , function(response, status, xhr){
		if (status=="error"){

			displayPopUps=false;//reset to true
			vle=false;
			$('.onlyVisibleInLMS').css('visibility','hidden');
		}
		else{

			if($( "#popUps" ).html()=="YES"){
				displayPopUps=true;
			}
			else{
				displayPopUps=false;
			}

			if($( "#inVLE" ).html()=="YES"){
				vle=true;
			}
			else{
				vle=false;
				$('.onlyVisibleInLMS').css('visibility','hidden');
			}

			if(vle==true){

				if(localStorage.getItem("ou")) {
					  ouNumber=localStorage.getItem("ou");
					  // after setting remember to remove it, if it's not required
					  localStorage.removeItem("ou");
				  }
				else{

					  var urlString=window.parent.location.href;

					  var position=urlString.indexOf("content/");
					  var toNextSlash= urlString.substr(position+8);
					  var position2=toNextSlash.indexOf("/");
					  var ouNumber=urlString.substr(position+8,position2);

					  //var position3=urlString.indexOf('/d2l');
					  //var org=urlString.substr(0,position3);
				}
				dropboxPath="/d2l/common/dialogs/quickLink/quickLink.d2l?ou="+ouNumber+"&type=dropbox&rcode="
				discussPath="/d2l/common/dialogs/quickLink/quickLink.d2l?ou="+ouNumber+"&type=discuss&rcode="
				eportPath = "/d2l/ep/"+ouNumber+"/dashboard/index";
				blogPath= "/d2l/lms/blog/main.d2l?ou="+ouNumber;
			}






	}

		setPopUps();


	});






	//Grab the content from the learning goals page
	 $( "#introLoader" ).load( "_learningGoals.html div#introBox" );
	 $( "#lgLoader" ).load( "_learningGoals.html div#learningGoalsBox" );
	 $( "#expectationLoader" ).load( "_learningGoals.html div#expectationsBox" );
	 $( "#lsLoader" ).load( "_learningGoals.html div#learningSkillsBox" );
	 $( "#rubricLoader" ).load( "_rubric.html div#rubricBox" );
     $( "#rubricLoader2" ).load( "_rubric.html div#rubricBox2" );

	//Code for progress bar
	var winHeight = $(window).height(),
  	docHeight = $(document).height();
  	max = docHeight - winHeight;

	$(".progress-bar").attr('max', max);

	var value = $(window).scrollTop();
	$(".progress-bar").css('width', value);

	$(document).on('scroll', function() {
		  value = $(window).scrollTop();
		  value= (value/max)*100;
		  var percent= value+"%";
		  $(".progress-bar").css('width', percent);
	});

	//End of progress bar code




	var topoffset=70; //Accounts for the width of the nav bar when scrolling to the next section

	$('.carousel').carousel({
		interval:0, //the carousel does not auto advance.
		wrap:false //stops after last slide.
	});

	// Closing the introduction modal opens the Learning Skills modal (first time only).
	$('#introductionModal').on('hidden.bs.modal', function () {
    	if(firstTime){
				setTimeout(function()
			  {
				$('#lsModal').modal('show');
			  }
		,500);
		}

	})

	// Closing the Learning Skills modal opens the Learning Goals modal (first time only).
	$('#lsModal').on('hidden.bs.modal', function () {
    	if(firstTime){


				setTimeout(function()
			  {
				$('#lgModal').modal('show');
			  }
		,500);
		}

	})

	$('#lgModal').on('hidden.bs.modal', function () {
    	if(firstTime){

			firstTime=false;
			$('.frosted').focus();
		}

	})







	$(".defocus").mouseup(function(){
	  $(this).blur();
	})//deselects the nav bar menus after being clicked

	$('body').scrollspy({
		target: 'header .navbar',
		offset: topoffset
	});//tracks body position to update nav bar

	var hash = $(this).find('li.active a').attr('href');
	if(hash!='#featured'){
		$('header nav').addClass('inbody');	//sets nav to fixed position when clicked
		$('header .progress').addClass('inbody');	//sets progress bar to be displayed
	}
	else{
		$('header nav').removeClass('inbody');	//resets full view of the navigation
		$('header .progress').removeClass('inbody');	//hides the progress bar
	}


	$('.navbar-fixed-top').on('activate.bs.scrollspy', function(){
	  var hash = $(this).find('li.active a').attr('href');

	  if(hash!='#featured'){
		  $('header nav').addClass('inbody');//sets nav to fixed position when scrolled
		  $('header .progress').addClass('inbody');	//sets the progress bar to visible
	  }
	  else{
		  $('header nav').removeClass('inbody');//resets full view of the navigation
		  $('header .progress').removeClass('inbody');	//hides the progress bar
	  }
	})


	$('[data-toggle="popover"]').popover();


	//Use smooth scrolling when clicking on navigation
  $('.navbar a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') ===
      this.pathname.replace(/^\//,'') &&
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target: $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset+2
        }, 500);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling


});

//This shows/hides the play controls for the audio
function toggleAudio(){
	if (audioVisible==true){
		audioVisible=false;
		$('.podcast').animate({left: podcastPosition, opacity:0}, 500);

	}
	else{
		audioVisible=true;

		$('.podcast').animate({left: "10px", opacity:1}, 500);
		//document.getElementById("podcast").focus();
	}

}

//checks to see if the screen has touch events in order to fix the nav bar for mobile devices
function isMobile() {
	try{ document.createEvent("TouchEvent");
		return true;
	}
	catch(e){
		return false;
	}
}

function showExpectations(){
	setTimeout(function()
			  {
				$('#expectationModal').modal('show');
			  }
		,1000);
}

function openEportfolio(){
	window.open(eportPath, "_blank");
}

function openBlog(){
	window.open(blogPath, "_blank");
}

function openDropbox(linkNumber){
	var tempPath=dropboxPath;
	tempPath=dropboxPath.concat(linkNumber);
	window.open(tempPath,"_blank")

}

function openDiscussion(linkNumber){
	var tempPath=discussPath;
	tempPath=discussPath.concat(linkNumber);
	window.open(tempPath,"_blank")

}

function setPopUps(){
			//Sees if this is the first time the activity has been displayed
			if(localStorage.getItem("firstTime")) {
				firstTime=localStorage.getItem("firstTime");
				// after setting remember to remove it, if it's not required
				localStorage.removeItem("firstTime");
			}
			else{
				firstTime=true;
			}

			$('[data-tooltip="true"]').tooltip();


			if (firstTime&&displayPopUps){

				setTimeout(function()
					  {
						$('#introductionModal').modal('show');

					  }
				,2000);
				//Sets the Banner image to full screen height the first time the page is loaded.
				var winHeight = $(window).height();
				$('.fullheight').css('height', winHeight);
			}
			else{
				$('.activityTitle h1').css("font-size","2.6em");
				$('.activityTitle').css("top","100px")
			}

}
