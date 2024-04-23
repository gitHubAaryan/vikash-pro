 function openNav() {
     document.getElementById("mySidenav").style.left = "0";
     $("#bodyOverlay").fadeIn(800);
 }

 function closeNav() {
     document.getElementById("mySidenav").style.left = "-280px";
     $("#bodyOverlay").fadeOut(800);
 }

 $(function() {
     $(window).scroll(function() {
         if ($(this).scrollTop() > 100) {
             $('#back-top').fadeIn();
         } else {
             $('#back-top').fadeOut();
         }
     });
     $('#back-top a').click(function() {
         $('body,html').animate({
             scrollTop: 0
         }, 800);
         return false;
     });


 });