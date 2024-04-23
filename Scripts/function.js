

	$('.refar').fancybox({  'width' : 450, 'height' : 360, 'autoScale' : false,'centerOnScroll' : true,'type' : 'iframe', 'padding':5,
helpers : {
overlay : {css : {'background' : 'rgba(0,0,0,0.8)'}}
}});

$('.newsletter').fancybox({  'width' : 450, 'height' : 310, 'autoScale' : false,'centerOnScroll' : true,'type' : 'iframe', 'padding':5,
helpers : {
overlay : {css : {'background' : 'rgba(0,0,0,0.8)'}}
}});


$('.forgot-password').fancybox({  'width' : 450, 'height' : 215, 'autoScale' : false,'centerOnScroll' : true,'type' : 'iframe', 'padding':5,
helpers : {
overlay : {css : {'background' : 'rgba(0,0,0,0.8)'}}
}});

$('.address_pup').fancybox({  'width' : 450, 'height' : 600, 'autoScale' : false,'centerOnScroll' : true,'type' : 'iframe', 'padding':5,
helpers : {
overlay : {css : {'background' : 'rgba(0,0,0,0.8)'}}
}});


$('.invoice_pup').fancybox({  'width' :1000, 'height' : 600, 'autoScale' : false,'centerOnScroll' : true,'type' : 'iframe', 'padding':5,
helpers : {
overlay : {css : {'background' : 'rgba(0,0,0,0.8)'}}
}});

$('.add_address_pup').fancybox({  'width' :400, 'height' : 560, 'autoScale' : false,'centerOnScroll' : true,'type' : 'iframe', 'padding':5,
helpers : {
overlay : {css : {'background' : 'rgba(0,0,0,0.8)'}}
}});
	
$('.search_pup').click(function(){$('.search_pup_con').fadeToggle('fast')})

$('.bot-title').click(function(){$(this).next().slideToggle('fast');$(this).toggleClass('open-links');	return false})

$('.filter-title').click(function(){$(this).next().slideToggle('fast');$(this).toggleClass('open-con');	return false})



$("#back-top").hide();	
$(function () {$(window).scroll(function () {if ($(this).scrollTop() > 100) {$('#back-top').fadeIn();} else {$('#back-top').fadeOut();}});
$('#back-top a').click(function () {$('body,html').animate({scrollTop: 0}, 800);return false;});
});



$('.search_toggle').click(function(){$('.search_toggle_con').slideToggle('fast')})
$('.cat_toggle').click(function(){$('.cat_toggle_con').slideToggle('fast')})

	$(window).scroll(function(){
if($(this).scrollTop()>38){$('.top2').addClass('top2_fixer'); $('.top2_spacer').css({'display':'block'})}
else{$('.top2').removeClass('top2_fixer'); $('.top2_spacer').css({'display':'none'})}

})


$(function() {
	$(".pro-scroll").jCarouselLite({btnPrev:".prev",btnNext:".next",vertical:false,visible:4,speed:400});
	});
	
	$('.sliderbtn3').click(function(){$('.mycontent_toggle').slideToggle('fast'),$(this).hide(),$('.sliderbtn3a').show()})
$('.sliderbtn3a').click(function(){$('.mycontent_toggle').slideToggle('fast'),$(this).hide(),$('.sliderbtn3').show()})

	




