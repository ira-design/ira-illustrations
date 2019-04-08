var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;

$(document).ready(function(){
    window_width = $(window).width();

    burger_menu = $('nav[role="navigation"]').hasClass('navbar-burger') ? true : false;

    // Init navigation toggle for small screens
    if(window_width < 768 || burger_menu){
        gsdk.initRightMenu();
    }

    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

    $('.form-control').on("focus", function(){
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function(){
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    if($('.alert-auto-close').length != 0){
        setTimeout(function(){
            $('.alert-auto-close').fadeOut(function(){
                $(this).remove();
            });
        }, 5000);
    }

    $('.dropdown a').click(function(event){
        // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
          if($(this).hasClass('switch-trigger')){
              if(event.stopPropagation){
                  event.stopPropagation();
              }
              else if(window.event){
                 window.event.cancelBubble = true;
              }
          }
      });

    $('.change-colors .badge-colors-trousers span').click(function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        var new_color = $(this).data('color');

        if($('.gradient-trousers').length != 0){
            $('.gradient-trousers').attr('data-color',new_color);
            $("#crowbar-workspace").empty();
        }
    });

    $('.change-colors .badge-colors-tshirt span').click(function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        var new_color = $(this).data('color');

        if($('.gradient-shirt').length != 0){
            $('.gradient-shirt').attr('data-color',new_color);
            $("#crowbar-workspace").empty();
        }
    });

    $('.change-colors .badge-colors-hair span').click(function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        var new_color = $(this).data('color');

        if($('.gradient-hair').length != 0){
            $('.gradient-hair').attr('data-color',new_color);
            $("#crowbar-workspace").empty();
        }
    });

    $('.change-colors .badge-colors-objects span').click(function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        var new_color = $(this).data('color');

        if($('.gradient-object').length != 0){
            $('.gradient-object').attr('data-color',new_color);
            $("#crowbar-workspace").empty();
        }
    });

});

// activate collapse right menu when the windows is resized
$(window).resize(function(){
    if($(window).width() < 768){
        gsdk.initRightMenu();
    } else if(!burger_menu && gsdk.misc.navbar_menu_visible){
        gsdk.toggleSidebarMenu();
    }
});

gsdk = {
    misc:{
        navbar_menu_visible: 0
    },


    initRightMenu: function(){
         if(!navbar_initialized){
             $navbar = $('nav').find('.navbar-collapse').first().clone(true);

             ul_content = '';

             $navbar.children('ul').each(function(){
                content_buff = $(this).html();
                ul_content = ul_content + content_buff;
             });

             ul_content = '<ul class="nav navbar-nav">' + ul_content + '</ul>';
             $navbar.html(ul_content);

             $('body').append($navbar);

             background_image = $navbar.data('nav-image');
             if(background_image != undefined){
                $navbar.css('background',"url('" + background_image + "')")
                       .removeAttr('data-nav-image')
                       .css('background-size',"cover")
                       .addClass('has-image');
             }


             $toggle = $('.navbar-toggle');

             $navbar.find('a').removeClass('btn btn-round btn-default');
             $navbar.find('button').removeClass('btn-round btn-fill btn-info btn-primary btn-success btn-danger btn-warning btn-neutral');
             $navbar.find('button').addClass('btn-simple btn-block');

            $toggle.click(gsdk.toggleSidebarMenu);

            navbar_initialized = true;
        }

    },

    toggleSidebarMenu: function(){
        if(gsdk.misc.navbar_menu_visible == 1) {
            $('html').removeClass('nav-open');
            gsdk.misc.navbar_menu_visible = 0;
            $('.body-click').remove();
             setTimeout(function(){
                $toggle.removeClass('toggled');
             }, 400);

        } else {
            setTimeout(function(){
                $toggle.addClass('toggled');
            }, 430);

            div = '<div class="body-click"></div>';
            $(div).appendTo("body").click(function() {
                $('html').removeClass('nav-open');
                gsdk.misc.navbar_menu_visible = 0;
                $('.body-click').remove();
                 setTimeout(function(){
                    $toggle.removeClass('toggled');
                 }, 400);
            });

            $('html').addClass('nav-open');
            gsdk.misc.navbar_menu_visible = 1;
        }
    },

    checkScrollForTransparentNavbar: debounce(function() {
        	if($(document).scrollTop() > 260 ) {
                if(transparent) {
                    transparent = false;
                    $('nav[role="navigation"]').removeClass('navbar-transparent');
                }
            } else {
                if( !transparent ) {
                    transparent = true;
                    $('nav[role="navigation"]').addClass('navbar-transparent');
                }
            }
    }, 17),

    fitBackgroundForCards: function(){
         $('.card').each(function(){
            if(!$(this).hasClass('card-product') && !$(this).hasClass('card-user')){
                image = $(this).find('.image img');

                image.hide();
                image_src = image.attr('src');

                $(this).find('.image').css({
                    "background-image": "url('" + image_src + "')",
                    "background-position": "center center",
                    "background-size": "cover"
                });
            }
        });
    },

    initPopovers: function(){
        if($('[data-toggle="popover"]').length != 0){
            $('body').append('<div class="popover-filter"></div>');

            //    Activate Popovers
           $('[data-toggle="popover"]').popover().on('show.bs.popover', function () {
                $('.popover-filter').click(function(){
                    $(this).removeClass('in');
                    $('[data-toggle="popover"]').popover('hide');
                });
                $('.popover-filter').addClass('in');
            }).on('hide.bs.popover', function(){
                $('.popover-filter').removeClass('in');
            });

        }
    },
    initCollapseArea: function(){
        $('[data-toggle="gsdk-collapse"]').each(function () {
            var thisdiv = $(this).attr("data-target");
            $(thisdiv).addClass("gsdk-collapse");
        });

        $('[data-toggle="gsdk-collapse"]').hover(function(){
            var thisdiv = $(this).attr("data-target");
            if(!$(this).hasClass('state-open')){
                $(this).addClass('state-hover');
                $(thisdiv).css({
                    'height':'30px'
                });
            }

        },
        function(){
            var thisdiv = $(this).attr("data-target");
            $(this).removeClass('state-hover');

            if(!$(this).hasClass('state-open')){
                $(thisdiv).css({
                    'height':'0px'
                });
            }
        }).click(function(event){
                event.preventDefault();

                var thisdiv = $(this).attr("data-target");
                var height = $(thisdiv).children('.panel-body').height();

                if($(this).hasClass('state-open')){
                    $(thisdiv).css({
                        'height':'0px',
                    });
                    $(this).removeClass('state-open');
                } else {
                    $(thisdiv).css({
                        'height':height + 30,
                    });
                    $(this).addClass('state-open');
                }
            });
    },
    initSliders: function(){
        // Sliders for demo purpose in refine cards section
        if($('#slider-range').length != 0){
            $( "#slider-range" ).slider({
        		range: true,
        		min: 0,
        		max: 500,
        		values: [ 75, 300 ],
        	});
        }
        if($('#refine-price-range').length != 0){
        	 $( "#refine-price-range" ).slider({
        		range: true,
        		min: 0,
        		max: 999,
        		values: [ 100, 850 ],
        		slide: function( event, ui ) {
        		    min_price = ui.values[0];
        		    max_price = ui.values[1];
            		$(this).siblings('.price-left').html('&euro; ' + min_price);
            		$(this).siblings('.price-right').html('&euro; ' + max_price)
        		}
        	});
        }
        if($('#slider-default').length != 0 || $('#slider-default2').length != 0){
        	$( "#slider-default, #slider-default2" ).slider({
        			value: 70,
        			orientation: "horizontal",
        			range: "min",
        			animate: true
        	});
        }
    },
    initVideoCards: function(){
        $('[data-toggle="video"]').click(function(){
            id_video = $(this).data('video');
            video = $('#' + id_video).get(0);

            card_parent = $(this).closest('.card');

            if(video.paused){
                video.play();
                $(this).html('<i class="fa fa-pause"></i> Pause');
                card_parent.addClass('state-play');
            } else {
                video.pause();
                $(this).html('<i class="fa fa-play"></i> Play');
                card_parent.removeClass('state-play');
            }
        });
    },
    initNavbarSearch: function(){
        $('[data-toggle="search"]').click(function(){
            if(searchVisible == 0){
                searchVisible = 1;
                $(this).parent().addClass('active');
                $('.navbar-search-form').fadeIn(function(){
                    $('.navbar-search-form input').focus();
                });
            } else {
                searchVisible = 0;
                $(this).parent().removeClass('active');
                $(this).blur();
                $('.navbar-search-form').fadeOut(function(){
                    $('.navbar-search-form input').blur();
                });
            }
        });
    }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};

// svg to png

// var btn = document.querySelector('.btn-download');
// var svg = document.querySelector('.wmn');
// console.log(svg);
// var canvas = document.querySelector('canvas');
//
// function triggerDownload (imgURI) {
//   var evt = new MouseEvent('click', {
//     view: window,
//     bubbles: false,
//     cancelable: true
//   });
//
//   var a = document.createElement('a');
//   a.setAttribute('download', 'MY_COOL_IMAGE.png');
//   a.setAttribute('href', imgURI);
//   a.setAttribute('target', '_blank');
//
//   a.dispatchEvent(evt);
// }
//
// btn.addEventListener('click', function () {
//   var canvas = document.getElementById('canvas');
//   var ctx = canvas.getContext('2d');
//   var data = (new XMLSerializer()).serializeToString(svg);
//   var DOMURL = window.URL || window.webkitURL || window;
//
//   var img = new Image();
//   var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
//   var url = DOMURL.createObjectURL(svgBlob);
//
//   img.onload = function () {
//     ctx.drawImage(img, 0, 0);
//     DOMURL.revokeObjectURL(url);
//
//     var imgURI = canvas
//         .toDataURL('image/png')
//         .replace('image/png', 'image/octet-stream');
//
//     triggerDownload(imgURI);
//   };
//
//   img.src = url;
// });
