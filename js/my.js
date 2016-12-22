(function($){
	var reviewPageNomer 	= 1;
	var reviewPageCount 	= $("#reviewInfo").data("count");
	var reviewPageSize 		= $("#reviewInfo").data("size");
	console.log(1);
	$("#addReview").click(function(){
		var ths = $(this);

		reviewPageNomer++;
		$.ajax({
			type: "GET",
			url: "/ajax/review.php",
			data: "&PAGEN_1=" + reviewPageNomer + "&SIZEN_1=" + reviewPageSize,
			dataType: "html",
			success: function(html){
				var parent = ths.parent("div");
				parent.before(html);
		   	}
		});
		
		if (reviewPageNomer == reviewPageCount) {
			ths.hide();
		}
	});

	if ($("#indexMap").length > 0) {
		ymaps.ready(function () {
		    var myMap = new ymaps.Map('indexMap', {
		            center: [55.759013, 37.666302],
		            zoom: 15
		        }, {
		            searchControlProvider: 'yandex#search'
		        }),
		        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {});
		    myMap.geoObjects.add(myPlacemark);
		});
	}
	

	$(".faq-question").click(function(){
		var answer = $(this).parents(".faq-container").find(".faq-answer");
		answer.slideToggle(500);
	});
	

	$(".faq-container:first-child .faq-question").click();
	function initPowerange()
	{
		console.log(3);
		var element 	= document.querySelector('.js-customized');
		if (element && element.length > 1) {
			var centerLabel = [];
			$(".filter__lable").each(function(){
				centerLabel.push(parseInt($(this).position().left) + parseInt($(this).width()/2));
			})

			var element 	= document.querySelector('.js-customized');
			var init 		= new Powerange(element, {callback: setTime});
			var firstLabel 	= $(".filter__label--0");
			$(".range-handle").html(firstLabel.data('title') + '<br><span>' + firstLabel.data('description') + '</span>');

			function setTime()
			{
				var radius = 45;
				var handleCenter = parseInt($(".range-handle").css("left")) + radius;

				var needIndex = false;
				for (var i = 0; i < centerLabel.length; i++) {
					//Если центр какой-то метки больше, чем центр нашего Handle, то начинаем сравнивать соседние элементы
				    if (centerLabel[i] > handleCenter) {
				    	//Если расстояния от центра метки до центра предыдущего элемента больше, чем расстояние от центра метки справа до центра хендла, то нужный элемент правый, иначе левый
				    	if (handleCenter - centerLabel[i-1] > centerLabel[i] - handleCenter) {
				    		needIndex = i;
				    	} else {
				    		needIndex = i - 1;
				    	}
				    	break;
				    }
				}
				//Если никакой центр не больше, значит берем правый элемент
				if (needIndex === false) {
					needIndex = centerLabel.length - 1;
				}
				
				var needLabel = $(".filter__label--" + needIndex);
				$(".range-handle").html(needLabel.data('title') + '<br><span>' + needLabel.data('description') + '</span>');
				needLabel.click();
			}
		}
	}
	
	initPowerange();
	
	function openTarifModal(){
        var price = 0;
        var $input = $(".form1__input-maxmin");
        var modalContent = $(".modal-content");
        var modalOverlay = $(".modal-overlay");

        $(".form1__minus").click(function() {
            var count = parseInt($input.val()) - 1;
            count = count < 1 ? 1 : count;
            $input.val(count);
            $(".form1__price").html(price * count);
        });
        $(".form1__plus").click(function() {

            var count = parseInt($input.val()) + 1;
            console.log(count);
            console.log($input.val());
            $input.val(count);
            $(".form1__price").html(price * count);
        });

        $(".form1__close").click(function(){
          event.preventDefault();
          modalContent.removeClass("modal-content--show");
          modalOverlay.removeClass("modal-overlay--show");

        });

        $(".table-price__line .btn").click(function(){
            var parent = $(this).parents(".table-price__line");
            var time = parent.data("time");
            price = parent.data("price");




            $(".form1__time").html(time);
            $(".form1__price").html(price);
            $input.val(1);
          modalOverlay.addClass("modal-overlay--show");
          modalContent.addClass("modal-content--show");
        });
    }

    openTarifModal();

    //вкладки в таблице
    $(".table-tab").click(function() {
      $(".table-tab").removeClass("table-tab--checked");
      $(".table-price").hide();

      var elementClass = ".table-price--" + $(this).data("tab");
      $(elementClass).css({display : "table"});
      $(this).addClass("table-tab--checked");

      var elementDesc = $(this).data("description");
      $(".table-attention").html(elementDesc);
    });	
	
	

}) (jQuery);