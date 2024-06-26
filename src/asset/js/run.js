const container = document.querySelector('.scroll_container');
const list_wrap = document.querySelector('.scroll_wrap');

gsap.to(list_wrap, {
  x: () => -(list_wrap.clientWidth -  container.clientWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '.scroll',
    start: 'top top',
    end: () => (list_wrap.clientWidth - container.clientWidth),
    scrub: true,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true
  }
});



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

    (function () {
        const $target = $('.target__item');
        const position = $target.offset().top;
        const winHeight = $win.height();
        const position2 = position - winHeight;
        console.log(position);
        console.log(winHeight);
        console.log(position2);
        // function scrollanime (){

   
        //     $target.each(function(){
        //         const $target = $(this);
        //         const position = $target.offset().top;

        //         // console.log(position);
        //     });
        // };


        // $win.on('scroll', function(){
        //     scrollanime();
        // });

        $win.on('scroll', function(){
            let scroll = $(this).scrollTop();

            console.log(scroll);

            if(scroll > position2) {
                $target.addClass('is-active');
            }
        });
    }());

    //scrollしたらclassを付与
    (function () {

        let jsAnime = function(){
            $('.js-anime').each(function(){
                let position = $(this).offset().top;
                let scroll = $win.scrollTop();
                let winheight = $win.height();

                // この要素のスクロール位置 - ウインドウの縦幅
                if(scroll > position - winheight) {
                    $(this).addClass('is-active');
                }
            });
        };


        $win.on('scroll', function(){
            jsAnime();
        });

        $win.on('load', function(){
            jsAnime();
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
            var index = $('.tab__btn > li').index(this);
            $(this).addClass(isActive).siblings('li').removeClass(isActive);
            
            $(this).parents().next().children().removeClass(isActive);

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
        }
        // MediaQueryListにイベントリスナを登録
        mediaQueryList.addEventListener('change', mediaChange);

        // 初期状態の評価のためイベントリスナを一度実行
        mediaChange(mediaQueryList);
    }());
}(window.jQuery, window, document));
