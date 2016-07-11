(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    // FireShell
  });

})(jQuery, window, document);

/*====@MegaMenu Start====*/
$(function(event){
    if($(window).width() < 1005 ){
        // First Click
        $("[first-click]").slice(0,1).addClass("active").next().show();
        $(document).on("click", "a[first-click]", function(){
            $("a[first-click]").next().slideUp(400);
            $(this).next().stop(true, false).slideToggle(400);

            if( $(this).hasClass("active") ){
                //console.log("active if");
                //$("a[click-menu]").removeClass("active");
                $(this).removeClass("active");
            } else{
                //console.log("active Else");
                $("a[first-click]").removeClass("active");
                $(this).addClass("active");
            };
        });
        // Second Click
        $(document).on("click", "a[click-menu]", function(){
            $("a[click-menu]").next().slideUp(200);
            //$("a[click-menu]").removeClass("active");
            //$(this).addClass("active");
            $(this).next().stop(true, false).slideToggle(200);

            if( $(this).hasClass("active") ){
                //console.log("active if");
                //$("a[click-menu]").removeClass("active");
                $(this).removeClass("active");
            } else{
                //console.log("active Else");
                $("a[click-menu]").removeClass("active");
                $(this).addClass("active");
            };
        });
        /*========*/
        $(".mobile-navbar, span[data-shop-by-close], div[mob-menu-overlay]").on("click", function(event){
            event.stopPropagation();
            $("body").toggleClass("animate-menu");
            $("div[mob-menu-overlay]").fadeToggle( "slow", "linear" );
            //$("#custom-header-dropdown").toggleClass("sumanta");
        });
    } else {
      // Mouse Delay Start
      var t, o = !1;
      $("ul[data-mega-menu] > li").mouseenter(function(e) {
          if (o) clearTimeout(t),
          $(e.currentTarget).removeClass("active").addClass("active"),
          o = !0;
          else {
              var a = setTimeout(function() {
                  clearTimeout(t),
                  console.log("it will be displayed"),
                  $(e.currentTarget).removeClass("active").addClass("active"),
                  console.log("timer celled: ", a), o = !0
              }, 400);
              $(e.currentTarget).attr("timer", a),
              console.log("timer created :", a)
          }
      }).mouseleave(function(e) {
          var a = $(e.currentTarget).attr("timer");
          clearTimeout(a),
          console.log("timer destroyed :", a),
          $(e.currentTarget).removeClass("active").removeAttr("timer"),
          o && (clearTimeout(t),
          t = setTimeout(function() {
              o = !1
          }, 100))
      });
      // Mouse Delay End
        // Window Scroll Start
        var _animated = false;
        $(window).scroll(function(){
            var scroll_val = $(window).scrollTop();
            if(scroll_val > 90 && !_animated){
                $("#top-nav").hide();
                _animated = true ;
            }
            if(scroll_val < 90 && _animated) {
                $("#top-nav").show();
                _animated = false;
            };
        });
        // Window Scroll End
    };
});
/*====@MegaMenu ends====*/
