/*  JavaScript Document                      */
/*  Written by Chris Converse for lynda.com  */
/*  Modified by Tony Calarco */

var clicked;
clicked="false";

$(document).ready(function(){
	$('.tooltipCustom').mouseover(function(e){			
			  var elementToGet = '#' + $(this).attr('data-tip-source');
			  var newHTML = $(elementToGet).html();			
			  $('#tooltip_container').html(newHTML);
								  
			  $('#tooltip_container').css('z-index', '300000000');
			  $('#tooltip_container').css({'display': 'block','opacity':0}).animate({opacity:1},250);
			
				
		
		}).mousemove(function(e){
				var tooltipWidth = $('#tooltip_container').outerWidth();
				var tooltipHeight = $('#tooltip_container').outerHeight();
				
				var pageWidth = $('body').width();
				
				if(e.pageX>pageWidth/2){
					$('#tooltip_container').css('left',(e.pageX-tooltipWidth + 20)+'px');
				}else{
					$('#tooltip_container').css('left', (e.pageX-20)+'px');	
				}
				if(e.pageY>300){
					$('#tooltip_container').css('top', (e.pageY-(tooltipHeight+20))+'px');
				}else{
					$('#tooltip_container').css('top', (e.pageY+20)+'px');
				}
			
				
				
		}).mouseout(function(e){
			
			$('#tooltip_container').css('display','none').html('');	
				
		}).mousedown(function(e){
			if(clicked=="false"){
			clicked ="true";				
			var elementToGet = '#' + $(this).attr('data-tip-source');
			var newHTML = $(elementToGet).html();					
			$('#tooltip_container').html(newHTML);
			$('#tooltip_container').css({'display': 'block','opacity':0}).animate({opacity:1},250);
			}
			else{
				clicked ="false";
				$('#tooltip_container').animate({opacity:0},250, function(){
					$('#tooltip_container').css('display','none').html('');	
				});
			}
		});
	

	
});


