(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

menuHoverMoving = () => {
		var items = $('#js-navBarHover .navBar-item'),
				item_width = null,
				move_ele = $('#_hoverShadow'),
				ORGIN_POI = 0.6,
				_left = null,
				interval = 150,
				k = null,
				n = 0

		items.each(function (i) {
		    $(this).css('left', 0.6 + 46 / 4 * i + 'vw')
		    $(this).bind('mouseenter', () => {
		        k = i
		        _left = _left + 46 / 4 * (i - n)
		    		$('._hoverShadow').animate({left: _left + ORGIN_POI + 'vw'}, interval, 'linear')

		        $(this).addClass('--hover').siblings().removeClass('--hover')
		        if ($(this).hasClass('--hover')) {
		    				n = $(this).index()
		    		}
		    })

		    $(this).bind('click', () => {
		        $(this).addClass('--active').siblings().removeClass('--active')
		    })

		    $('#js-navBarHover').bind('mouseleave', () => {
		    		items.removeClass('--hover')
		    		if (!items.hasClass('--hover')) {
		    				move_ele.stop(true).css('left', -46 / 4 - 1.5 + 'vw')
		    		}
		    })
		});
}

hoverTopNavBar = () => {
		var items = $('#topNavBar a'),
				unfold = '--unfolded',
				folded = '--folded',
				k = null

		items.each(function (i) {
			  $(this).bind('mouseenter', () => {
			  	  $(this).addClass(unfold).removeClass(folded).find('.__label').fadeIn()
			  })
			  $(this).bind('mouseleave', () => {
			      $(this).addClass(folded).removeClass(unfold).find('.__label').fadeOut()
			  })
		})
}

menuHoverMoving() // 底部菜单函数
hoverTopNavBar() // 顶部快捷菜单函数