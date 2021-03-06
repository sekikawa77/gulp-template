

(function ($, window, document) {
    'use strict';

    var $win = $(window);
    var $doc = $(document);
    var $body = $('body');
    var scrollElement = $(document.scrollingElement || /* IE */ $('html'));



    //sp-navi
    $(function(){
        var $header = $('.header');
        var $headerButton = $('.sp__btn');
        var $globalNavigation = $('.header__gnav');
        var isActive = 'is-active';
        var isOpen = 'is-open';
        var flag = false;


        $headerButton.on('click', function () {
            var $this = $(this);

            if (flag === false) {
                $body.addClass(isActive);
                $globalNavigation.addClass(isOpen).slideDown();
                $this.addClass(isActive).closest($header).addClass(isActive);

                flag = true;
            } else {
                $body.removeClass(isActive);
                $globalNavigation.removeClass(isOpen).slideUp();
                $this.removeClass(isActive).closest($header).removeClass(isActive);

                flag = false;
            }

        });

        $('.header__gnav a[href^="#"]').on('click', function (event) {
            flag = true;
			$headerButton.trigger('click');
        });

        $win.on('customMatchMedia', function (event, bool) {
            if (!bool) {
            //for pc
                $body.removeClass(isActive);
                $globalNavigation.removeAttr('style').removeClass(isOpen);
                $headerButton.removeClass(isActive).closest($header).removeClass(isActive);
            }
        });
    });

    // smooth scroll
    (function () {
        //var headerHeight = 120;

        $('a[href^="#"]').click(function(){
            var href= $(this).attr("href");

            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top;

            $("html, body").animate({scrollTop:position}, 550, "swing");
               return false;
        });

    }());

    // totop
    (function () {
        var $pagetop = $('.totop');
        var $footer = $('.footer');
        var isActive = 'is-active';

        $pagetop.hide();

        // 1000px ???????????????????????????????????????
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $pagetop.fadeIn();
            } else {
                $pagetop.fadeOut();
            }

            var scrollHeight = $doc.height();
            var scrollPosition = $win.height() + $win.scrollTop();
            var footHeight = $footer.innerHeight();

            if (scrollHeight - scrollPosition <= footHeight) {
                $pagetop.addClass(isActive);
            } else {
                $pagetop.removeClass(isActive);
            }

        });
    }());

    // ?????????????????????????????????????????????
    (function () {
        var mediaQueryList = window.matchMedia('(max-width: 767px)');

        // ??????????????????????????????
        function mediaChange(mql) {
            // ???????????????????????????????????????
            $win.trigger('customMatchMedia', [mql.matches]);
        }
        // MediaQueryList?????????????????????????????????
        mediaQueryList.addListener(mediaChange);

        // ??????????????????????????????????????????????????????????????????
        mediaChange(mediaQueryList);
    }());
}(window.jQuery, window, document));
