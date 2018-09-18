//前端页面 单位转换 px 转 rem
function setFontSize(){
    var _self = this;
    _self.width = 750; //设置默认最大宽度
    _self.fontSize = 100; //默认字体大小
    _self.widthProportion = function(){
      var p = (document.body && document.body.clientWidth || document.getElementsByTagName("html" )[0].offsetWidth)/_self.width;
      return p>1?1:p<0.426?0.426:p;
    };
    _self.changePage = function(){
        document.getElementsByTagName("html" )[0].setAttribute("style", "font-size:"+_self.widthProportion()*_self.fontSize+"px !important");
        //  alert(_self.widthProportion());
    };
    //窗口大小改变
    _self.changePage();
    window.addEventListener('resize' ,function(){_self.changePage();}, false);
}
setFontSize();
$(function(){
	// 停止时的定位
	var dice_position = [
		{
			1:{top: '1.8rem',left: '4rem'},
			2:{top: '2.5rem',left: '3.9rem'},
			3:{top: '2.8rem',left: '2.7rem'},
			4:{top: '2rem',left: '2.3rem'},
			5:{top: '2.1rem',left: '3.3rem'},
			6:{top: '1.5rem',left: '3.3rem'},
		},
		{
			1:{top: '2.8rem',left: '3.4rem'},
			2:{top: '2.2rem',left: '3.2rem'},
			3:{top: '2.6rem',left: '2.7rem'},
			4:{top: '2rem',left: '2.3rem'},
			5:{top: '2.2rem',left: '4rem'},
			6:{top: '1.5rem',left: '3.3rem'},
		},
		{
			1:{top: '2.4rem',left: '2rem'},
			2:{top: '2.8rem',left: '2.7rem'},
			3:{top: '2.9rem',left: '3.7rem'},
			4:{top: '2.3rem',left: '3.3rem'},
			5:{top: '2rem',left: '2.7rem'},
			6:{top: '1.8rem',left: '4rem'},
		}
	]

	var time = null;
	var animation_time = null;
	var animation_time_num = 0;
	var animation_end = null;
	var $start_btn = $('.start_btn');
	$start_btn.data('state', true);
	$start_btn.click(function(){
		var _this = $(this);
		if(!$start_btn.data('state')){
			console.log('正在开奖请稍等')
			return false;
		}
		$start_btn.data('state', false)
		// $(this).attr('disabled', true).text('...');
		if($('.bowl').hasClass('active') && !$('.bowl').hasClass('paused')){
				$('.bowl').addClass('paused');
				
				_this.attr('disabled', true).text('正在开奖');
				// 请求调用位置，回调执行callback
				
		}else{

			$(this).text('点我开奖');

			$('.bowl').removeClass('active paused').children().removeClass('paused');
			$('.bowl').addClass('active');

			animation_time = setInterval(function(){
				animation_time_num+=100;
			}, 100)
			setTimeout(function(){
				callback();
			},5000)

		}
	})

	var top_arr = [];
	var obj_arr = [];
	function callback(){
		time = setInterval(function(){
			// 动画效果最少执行2s
			if(animation_time_num >= 2500){
				// Math.floor(Math.random()*(max-min+1)+min);
				// 随机选取定位数据
				var animation_index = Math.floor(Math.random()*(2-1+1)+1);
				$.each($('.dice'), function(i, item){
					// 赋值添加class 'dice-' + number
					 // $('.bowl').children().eq(i).addClass('paused').children().addClass('dice-'+(i+1));
					$('.bowl').children().eq(i).addClass('paused').animate({
						top:dice_position[animation_index][i+1].top,
						left:dice_position[animation_index][i+1].left,
					},1000,function(){
						$.each($('.bowl').children(), function(i, item){
							top_arr[i] = $(item).position().top;
							obj_arr[i] = i;
						});

						for (var i = 0; i < top_arr.length; i++) {
					        for (var j = 0; j < top_arr.length - 1 - i; j++) {
					            if (top_arr[j] > top_arr[j+1]) {        //相邻元素两两对比
					                var temp = top_arr[j+1];        //元素交换
					                top_arr[j+1] = top_arr[j];
					                top_arr[j] = temp;

					                var temp_obj = obj_arr[j+1];
					                obj_arr[j+1] = obj_arr[j];
					                obj_arr[j] = temp_obj;
					            }
					        }
					    }
					    var z_index = 1;
					    for(var i in obj_arr){
					    	$('.bowl').children().eq(obj_arr[i]).css('z-index', i);
					    }

					}).children().addClass('dice-'+(i+1));
				});
				// 清除所有定时器，变量重置
				window.clearInterval(time);
				window.clearInterval(animation_time);
				animation_time_num = 0;

				$start_btn.data('state', true)
			}
		},100);
	}
})