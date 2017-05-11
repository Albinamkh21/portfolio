var slider = (function () {
    var counter = 0,
        duration = 300,
        inProcess = false;


    var moveSlide =  function (direction) {
        var upList = $('.slider__item', '.slider__btns__up'),
            upActiveItem = upList.filter('.active'),
            downList = $('.slider__item', '.slider__btns__down'),
            downActiveItem = downList.filter('.active'),
            displayList = $('.slider__item', '.slider__display'),
            displayActiveItem = displayList.filter('.active'),
            descList = $('.slider-description__item', '.slider-description__list'),
            descActiveItem = descList.filter('.active'),

            downBtnIndex = downActiveItem.index(),
            upBtnIndex =  upActiveItem.index(),
            displayIndex = displayActiveItem.index(),
            directionCounter = direction == 'down' ? -1 : +1;

        console.log(`downBtnIndex:${downBtnIndex}`);

        console.log(`displayIndex:${displayIndex}`);
        console.log(`upBtnIndex:${upBtnIndex}`);
        console.log(direction);

        if(direction=='up') {
            displayIndex = displayIndex+1 >= displayList.length? 0: displayIndex+1;
            upBtnIndex = upBtnIndex+1 >= upList.length ? 0: upBtnIndex+1;
            downBtnIndex = downBtnIndex+1 >= downList.length ? 0 : downBtnIndex+1;
        } else {//down
            displayIndex = displayIndex==0? displayList.length-1: displayIndex-1;
            upBtnIndex = upBtnIndex == 0 ? downList.length-1 :upBtnIndex-1;
            downBtnIndex = downBtnIndex == 0? downList.length-1 : downBtnIndex-1;
        }
        var regItemForDisplay = displayList.eq(displayIndex);
        var regItemUp = upList.eq(upBtnIndex);
        var regItemDown = downList.eq(downBtnIndex);
        var regItemForDesc = descList.eq(displayIndex);
        console.log(`downBtnIndex:${downBtnIndex}`);
        console.log(`displayIndex:${displayIndex}`);
        console.log(`upBtnIndex:${upBtnIndex}`);



        //обновитть картнку в контролах
        var display = $('.slider__display-pic', '.slider'),
            nextDisplaySrc = $('img', regItemForDisplay).attr('src'),
            fadedOut = $.Deferred();
        display.fadeOut(function() {
            fadedOut.resolve();

        });
        fadedOut.done(function () {
            //preloader.show();

            display.attr('src', nextDisplaySrc).on('load', function(){
                //loaded.resolve();
                display.fadeIn(300);
            });

        });
        displayActiveItem.removeClass('active');
        regItemForDisplay.addClass('active');

        //Поменяем описание слайдера
        descActiveItem.removeClass('active');
        regItemForDesc.addClass('active');


        //обновитть картнку в кликнутом контроле
        upActiveItem.animate({
            'top':  '-100%'
        }, duration);

        regItemUp.animate({
            'top': 0
        }, duration, function () {
            upActiveItem.removeClass('active')
                .css('top', '100%');
            $(this).addClass('active');

            inProcess = false;
        });

        //обновитть картнку в пассивном контроле

        downActiveItem.animate({
            'top':  '100%'
        }, duration);

        regItemDown.animate({
            'top': 0
        }, duration, function () {
            downActiveItem.removeClass('active')
                .css('top', '-100%');
            $(this).addClass('active');

            inProcess = false;
        });




    }


    return {
        init: function () { //здесь на родителя нужно навесить
            $('#sliderUpArrow').on('click', function (e) {
                e.preventDefault();
                if (!inProcess) {
                    inProcess = true;
                    moveSlide('up');
                    counter++;
                }
            });
            $('#sliderDownArrow').on('click', function (e) {
                e.preventDefault();
                if (!inProcess) {
                    inProcess = true;

                    moveSlide('down');
                    counter--;
                }
            });
        }
    }
}());
