var app = app || {};

/*-- html5-template
====================================================== */
app.template = function(){};

//swiper
app.template.swiper = function(){};
app.template.swiper.mySwiper = {};
app.template.swiper.init = function(){
	app.template.swiper.bind();
};
app.template.swiper.bind = function(){
    $(".swiper-container").css("display", "block");

    app.template.swiper.mySwiper = new Swiper ('.swiper-container', {
        speed:500,
        lazyLoading : true,
        lazyLoadingInPrevNext : true,
        // direction : 'vertical',
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
            app.template.swiper.on_pageslideend(0);         
        },
        onSlideChangeStart: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            app.template.swiper.on_pageslideend(swiper.activeIndex);
            app.template.swiper.mySwiper.lockSwipes();
        }
    });

    app.template.swiper.lock();
};
app.template.swiper.lock = function(){
	app.template.swiper.mySwiper.lockSwipes();
};
app.template.swiper.on_pageslideend = function(index){};

app.template.swiper.next = function(){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideNext();
    app.template.swiper.mySwiper.lockSwipes();
};

app.template.swiper.prev = function(){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slidePrev();
    app.template.swiper.mySwiper.lockSwipes();
};

app.template.swiper.to = function(index){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideTo(index);
    app.template.swiper.mySwiper.lockSwipes();
};

/* Landscape  引导用户竖屏显示 */
app.template.Landscape = function(){};
app.template.Landscape.init= function(){
	$(document).bind('orientationchange',function(){
        if(window.orientation==90 || window.orientation==-90){
            $(".swiper-container").css("display", "none");
        }else if(window.orientation==0 || window.orientation==180){
        	    $(".swiper-container").css("display", "block");
        	    $(".p1-img,.p2-bg,.p3-bg,.p4-bg,.p5-bg").css({
        	    	   "width":"750px !important",
        	    	   "height":"1212px !important",
        	    	   "position":"absolute",
        	    	   "top":"0",
        	    	   "left":"0",
        	    	   "right":"0",
        	    	   "bottom":"0"
        	    });
        }
    });
    var Landscape = new landscape({
        pic: 'js/landscape.png',
        picZoom: 3,
        mode:'portrait',//portrait,landscape
        prefix:'Shine'
    });   
};
//audio
app.template.audioPlay = function(){};
app.template.audioPlay.init = function(){
	app.template.audioPlay.autoPlay("audio-player");
	app.template.audioPlay.toggle();
};
app.template.audioPlay.autoPlay = function(id){
	var audio = document.getElementById(id),
	play = function(){
		audio.play();
		document.removeEventListener("touchstart",play,false);
	};
	audio.play();
	document.addEventListener("WeixinJSBridgeReady",function(){
		play();
	},false);
	document.addEventListener("touchstart",play,false);
};
app.template.audioPlay.toggle = function(){
	$(".audio-icon").addClass("audio-animation");
	$(".p1-m2,.p1-m3").addClass("music-animation");
	var audio = document.getElementById("audio-player");
	$(".audio-icon").on("touchend",function(){
		$(this).toggleClass("audio-animation");
		$(".p1-m2,.p1-m3").toggleClass("music-animation");
		if(audio!==null){
			if(!audio.paused){
				audio.pause();
			}else {
				audio.play();
			}
		}
	});
}

//touch
app.template.touch = function(){};

app.template.touch.eventlistener_handler = function(e){
    e.preventDefault();     // 阻止浏览器默认动作(网页滚动)
};

app.template.touch.init = function(){
   document.body.addEventListener("touchmove", app.template.touch.eventlistener_handler, false);
   
};

/*-- p1
====================================================== */
app.p1 = function(){};
app.p1.init = function(){
    $(".p1-btn").addClass("p1-btnAnimation");
};
app.p1.bind_touch_event = function(){
	$(".p1-btn").on("touchend",function(){
		app.template.swiper.next();
	})
	$(".p1-btn2").on("touchend",function(){
		$(".p1-cover,.p1-close").show();
	})
	$(".p1-close").on("touchend",function(){
		$(".p1-close,.p1-cover").hide();
	})
};
app.p1.destory = function(){
	$(".p1-btn").removeClass("p1-btnAnimation");
};

/*-- p2
====================================================== */
app.p2 = function(){};
app.p2.init = function(){
	$(".p2-d").addClass("dAnimation");
    $(".p2").append("<img class="+"p2-play"+" src="+"img/play1.png"+" />");
};
app.p2.bind_touch_event = function(){
	$(".p2-btn").on("touchend",function(){
		app.p2.show_cover();
	})
	
	$(".p2-shadow").on("touchend",function(){
		$(this).hide();
		$(".p2-cover,.p2-play").hide();
	})	
	
	$(".p2").on("touchend",".p2-play",function(){
		$(".p2-play").removeClass("playAnimation");
		$(".p2-play").fly({
			start: {top: 678, left: 140},
		    end: {top: 1022, left: 35, width: 169, height: 168},
		    onEnd: function(){
		        setTimeout(app.p2.onEnd,500);		        
		    }
		});
	})		
};
app.p2.onEnd = function(){
	app.template.swiper.to(2);
	app.p2.hide_cover();
	$(".p2-play").remove();
};
app.p2.show_cover = function(){
	$(".p2-shadow").css({"display":"block","width":"100%","height":"100%","position":"absolute","top":"0","left":"0","z-index":"10","background":"#000","opacity":"0.8"});
	$(".p2-cover").css({"display":"block","width":"663px","height":"824px","z-index":"15","position":"absolute","top":"157px","left":"43px"});
    $(".p2-play").css({"display":"block","width":"256px","height":"258px","z-index":"20","position":"absolute","top":"678px","left":"140px"});
    $(".p2-play").addClass("playAnimation");
};
app.p2.hide_cover = function(){
	$(".p2-shadow,.p2-cover").hide();
};
app.p2.destory = function(){};

/*-- p3
====================================================== */
app.p3 = function(){};
app.p3.init = function(){
    $(".p3-d").addClass("dAnimation");
    $(".p3").append("<img class="+"p3-play"+" src="+"img/play2.png"+" />");
};
app.p3.bind_touch_event = function(){
	$(".p3-btn").on("touchend",function(){
		app.p3.show_cover();
	});
	
	$(".p3-shadow").on("touchend",function(){
		$(this).hide();
		$(".p3-cover,.p3-play").hide();
	});
	
	$(".p3").on("touchend",".p3-play",function(){
		$(".p3-play").removeClass("playAnimation");
		$(".p3-play").fly({
			start: {top: 646, left: 241},
		    end: {top: 1015, left: 267, width: 216, height: 187},
		    onEnd: function(){
		        setTimeout(app.p3.onEnd,500);
		    }
		});
	})	
};
app.p3.onEnd = function(){
	app.template.swiper.to(3);
	app.p3.hide_cover();
	$(".p3-play").remove();
};
app.p3.show_cover = function(){
	$(".p3-shadow").css({"display":"block","width":"100%","height":"100%","position":"absolute","top":"0","left":"0","z-index":"10","background":"#000","opacity":"0.8"})
	$(".p3-cover").css({"display":"block","width":"663px","height":"824px","z-index":"15","position":"absolute","top":"157px","left":"43px"})
	$(".p3-play").css({"display":"block","width":"366px","height":"307px","z-index":"20","position":"absolute","top":"646px","left":"241px"})
	$(".p3-play").addClass("playAnimation");	
};
app.p3.hide_cover = function(){
	$(".p3-shadow,.p3-cover").hide();
};

app.p3.destory = function(){};

/*-- p4
====================================================== */
app.p4 = function(){};
app.p4.init = function(){
    $(".p3-d").removeClass("p3-dAnimation");
    $(".p4-d").addClass("p4-dAnimation");
    $(".p4").append("<img class="+"p4-play"+" src="+"img/play3.png"+" />");
};
app.p4.bind_touch_event = function(){
	$(".p4-btn").on("touchend",function(){
		app.p4.show_cover();
	})
	
	$(".p4-shadow").on("touchend",function(){
		$(this).hide();
		$(".p4-cover,.p4-play").hide();
	})
	
	$(".p4").on("touchend",".p4-play",function(){
		$(".p4-play").removeClass("playAnimation");
		$(".p4-play").fly({
			start: {top: 665, left: 375},
		    end: {top: 1000, left: 527, width: 217, height: 198}, 
		    onEnd: function(){		    	    
		        setTimeout(app.p4.onEnd,500);
		    }
		});
	})	
};
app.p4.show_cover = function(){
	$(".p4-shadow").css({"display":"block","width":"100%","height":"100%","position":"absolute","top":"0","left":"0","z-index":"10","background":"#000","opacity":"0.8"});
	$(".p4-cover").css({"display":"block","width":"663px","height":"824px","z-index":"15","position":"absolute","top":"157px","left":"43px"});
	$(".p4-play").css({"display":"block","width":"295px","height":"273px","z-index":"20","position":"absolute","top":"665px","left":"375px"});
	$(".p4-play").addClass("playAnimation");	
};
app.p4.hide_cover = function(){
	$(".p4-shadow,.p4-cover").hide();
};
app.p4.onEnd = function(){
	app.template.swiper.next();
	app.p4.hide_cover();
	$(".p2-play,.p3-play,.p4-play").remove();
};
app.p4.destory = function(){};

/*-- p5
====================================================== */
app.p5 = function(){};
app.p5.init = function(){
    $(".p4-d").removeClass("p4-dAnimation");
};
app.p5.bind_touch_event = function(){
	$(".p5-btn1").on("touchend",function(){
		app.template.swiper.to(0);
	})
	$(".p5-btn2").on("touchend",function(){
		app.p5.show_cover();
	})
	$(".p5-shadow,.p5-cover").on("touchend",function(){
		app.p5.hide_cover();
	})
	
};
app.p5.show_cover = function(){
	$(".p5-shadow").css({"display":"block","width":"100%","height":"100%","position":"absolute","top":"0","left":"0","z-index":"10","background":"#000","opacity":"0.8"});
	$(".p5-cover").attr("src", $(".p5-cover").attr("data-src"));
	$(".p5-cover").css({"display":"block","width":"691px","height":"810px","z-index":"15","position":"absolute","top":"100px","left":"32px"});
};
app.p5.hide_cover = function(){
	$(".p5-shadow,.p5-cover").hide();
};
app.p5.destory = function(){};


// init
(function(){
	 // 框架
	app.template.Landscape.init();
    app.template.swiper.init();
    app.template.touch.init();
    app.template.audioPlay.init();
	
	/* page init */
    app.template.swiper.on_pageslideend = function(index){
        switch(index)
        {
            case 0:
                app.p1.init();
                break;
            case 1:
                app.p1.destory();
                app.p2.init();
                break;
            case 2:
                app.p2.destory();
                app.p3.init();
                break;
            case 3:
                app.p3.destory();
                app.p4.init();
                break;
            case 4:
                app.p5.init();
                break;
        }
    };
   
    app.p1.init();
	//点击事件初始化	
	app.p1.bind_touch_event();
	app.p2.bind_touch_event();
	app.p3.bind_touch_event();
	app.p4.bind_touch_event();
	app.p5.bind_touch_event();
	
})();