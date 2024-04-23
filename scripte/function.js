$(function () {$(window).scroll(function () {if ($(this).scrollTop() > 100) {$('#back-top').fadeIn();} else {$('#back-top').fadeOut();}});
$('#back-top a').click(function () {$('body,html').animate({scrollTop: 0}, 800);return false;});
});

$('.bot-title').click(function(){$(this).next().slideToggle('fast');$(this).toggleClass('open-links');	return false})



	$(window).scroll(function(){
if($(this).scrollTop()>10){$('header').addClass('header_fixer');}
else{$('header').removeClass('header_fixer');}

})

$('.mob_menu_pup').click(function(){$('.mob_menu_pup_con').fadeToggle('fast')})


 $('#myCarousel').carousel({
    interval: 20000,
	pause: "false"
}); 



	$('.refer_pup').fancybox({  'width' : 500, 'height' : 330, 'autoScale' : false,'centerOnScroll' : true,'type' : 'iframe', 'padding':5,
helpers : {
overlay : {css : {'background' : 'rgba(0,0,0,0.9)'}}
}});





if(top.location!=self.location)
			top.location=self.location;
		    window['_tipoff']=function(){};window['_tipon']=function(a){};
		    function doTranslate(lang_pair) {if(lang_pair.value)lang_pair=lang_pair.value;if(location.hostname=="www.moonlighthotelresort.com" && lang_pair=="en|en")return;else if(location.hostname!="www.moonlighthotelresort.com" && lang_pair=="en|en")location.href=unescape(gfg("u"));else if(location.hostname=="www.moonlighthotelresort.com" && lang_pair!="en|en")location.href="http://translate.google.com/translate?client=tmpg&hl=en&langpair="+lang_pair+"&u="+escape(location.href);else location.href="http://translate.google.com/translate?client=tmpg&hl=en&langpair="+lang_pair+"&u="+unescape(gfg("u"));}
		    function gfg(name) {name=name.replace(/[\[]/,"\[").replace(/[\]]/,"\]");var regexS="[\?&]"+name+"=([^&#]*)";var regex=new RegExp(regexS);var results=regex.exec(location.href);if(results==null)return "";return results[1];}
		    
	
		
$(function () {
		var filterList = {
			init: function () {
				$('#portfoliolist').mixitup({
					targetSelector: '.portfolio',
					filterSelector: '.filter',
					effects: ['fade'],
					easing: 'snap',
				
					onMixEnd: filterList.hoverEffect()
				});				
			},
			hoverEffect: function () {
				//$('#portfoliolist .portfolio').hover(
					//function () {
						//$(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
						//$(this).find('img').stop().animate({top: -40}, 500, 'easeOutQuad');				
					},
					//function () {
						//$(this).find('.label').stop().animate({bottom: -40}, 200, 'easeInQuad');
						//$(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');								
					//}		
				//);				
			//}
		};
		filterList.init();
	});		
	
	
$(document).ready(function() {


 

    // sound-----------  
 $(".sound_slider").click(function() {
        $(".sound_slider").toggleClass("sound_slider_back");
        $(".sampler").toggleClass("footer_hite");

    });



    $("#playpause1").click(function() {
        $(".sound").toggleClass("muted");
    });



    $(".ane_1").hover(function() {
        $(".ane_1").toggleClass("active_li");
        $(".ane_1").toggleClass("active_li1");
    });

});