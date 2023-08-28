



(function ($, window, document) {
    'use strict';

    const $win = $(window);
    const $doc = $(document);
    const $body = $('body');
    const scrollElement = $(document.scrollingElement || /* IE */ $('html'));

    //sp-navi
    // (function () {
    //     const $header = $('.header');
    //     const $headerButton = $('.sp__btn');
    //     const $globalNavigation = $('.header__gnav');
    //     const isActive = 'is-active';
    //     const isOpen = 'is-open';
    //     let flag = false;


    //     $headerButton.on('click', function () {
    //         const $this = $(this);

    //         if (flag === false) {
    //             $body.addClass(isActive);
    //             $globalNavigation.addClass(isOpen).slideDown();
    //             $this.addClass(isActive).closest($header).addClass(isActive);

    //             flag = true;
    //         } else {
    //             $body.removeClass(isActive);
    //             $globalNavigation.removeClass(isOpen).slideUp();
    //             $this.removeClass(isActive).closest($header).removeClass(isActive);

    //             flag = false;
    //         }

    //     });

    //     $win.on('customMatchMedia', function (event, bool) {
    //         if (!bool) {
    //         //for pc
    //             $body.removeClass(isActive);
    //             $globalNavigation.removeAttr('style').removeClass(isOpen).addClass('is-pc').removeClass('is-sp');
    //             $headerButton.removeClass(isActive).closest($header).removeClass(isActive);
                
    //         } else {
    //             $globalNavigation.addClass('is-sp').removeClass('is-pc');
    //         }
    //     });

    //     $(document).on('click', '.header__gnav.is-sp a', function () {
    //         flag = true;
    //         $headerButton.trigger('click');

    //     });
    // }());

    // smooth scroll
    // (function () {
    //     var headerHight = 80;
    //     var urlHash = location.hash;

    //     $('a[href^="#"], a[href^="/#"]').click(function(){
    //         var href= $(this).attr("href");

    //         if(href === '#anc-06'){
    //             var str = href;
    //         } else {
    //             var str = href.slice(1);
    //         }

    //         var target = $(str == "#" || str == "" ? 'html' : str);
    //         var position = target.offset().top-headerHight;

    //         $("html, body").animate({scrollTop:position}, 550, "swing");

    //     });

    //     if (urlHash) {
    //         $("html, body").stop().scrollTop(0);
    //         setTimeout(function(){
    //             var target = $(urlHash);
    //             var position = target.offset().top-headerHight;
    //             $('body,html').stop().animate({scrollTop:position}, 550);
    //         }, 100);
    //     }

    // }());

    //sp-navi
    (function () {
        const $header = $('.header');
        const $headerButton = $('.sp__btn');
        const $globalNavigation = $('.header__gnav');
        const isActive = 'is-active';
        const isOpen = 'is-open';
        let flag = false;


        $headerButton.on('click', function () {
            const $this = $(this);

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

        // $('.header__gnav a[href^="#"]').on('click', function (event) {
        //     flag = true;
		// 	$headerButton.trigger('click');
        // });

        $win.on('customMatchMedia', function (event, bool) {
            if (!bool) {
            //for pc
                $body.removeClass(isActive);
                $globalNavigation.removeAttr('style').removeClass(isOpen);
                $headerButton.removeClass(isActive).closest($header).removeClass(isActive);
            }
        });
    }());

    // smooth scroll
    (function () {
        //const headerHeight = 120;

        $('a[href^="#"]').click(function(){
            const href= $(this).attr("href");
            const target = $(href == "#" || href == "" ? 'html' : href);
            const position = target.offset().top;

            $("html, body").animate({scrollTop:position}, 550, "swing");
               return false;
        });

    }());

    // totop
    (function () {
        const $pagetop = $('.totop');
        const $footer = $('.footer');
        const isActive = 'is-active';

        $pagetop.hide();

        // 1000px スクロールしたらボタン表示
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $pagetop.fadeIn();
            } else {
                $pagetop.fadeOut();
            }

            const scrollHeight = $doc.height();
            const scrollPosition = $win.height() + $win.scrollTop();
            const footHeight = $footer.innerHeight();

            if (scrollHeight - scrollPosition <= footHeight) {
                $pagetop.addClass(isActive);
            } else {
                $pagetop.removeClass(isActive);
            }

        });
    }());
    
    // tab
    (function () {
        const isActive = 'is-active';
        
        $('.tab__btn > li').on('click', function() {
            $('.tab__btn > li, .panel').removeClass(isActive);
          
            $(this).addClass(isActive);
             
            var index = $('.tab__btn > li').index(this);
            $('.panel').eq(index).addClass(isActive);
          });

          
    }());

    //Magnific Popup
    (function () {
        $('.gallery').magnificPopup({
            delegate: 'a', 
            type: 'image',
            gallery: { //ギャラリー表示にする
              enabled:true
            }
        });
    }());

    // メディアクエリのイベントセット
    (function () {
        const mediaQueryList = window.matchMedia('(max-width: 767px)');

        // イベントリスナの定義
        function mediaChange(mql) {
            // カスタムイベントを呼び出す
            $win.trigger('customMatchMedia', [mql.matches]);
            console.log(mql);
        }
        // MediaQueryListにイベントリスナを登録
        mediaQueryList.addEventListener('load', mediaChange);

        // 初期状態の評価のためイベントリスナを一度実行
        mediaChange(mediaQueryList);
    }());
}(window.jQuery, window, document));
