'use strict';

//ここから下は不要なので削除すること
function counter () {
    const now = new Date();
    const goal = new Date(2025, 3, 20, 10, 30);
    const millisecond = goal.getTime() - now.getTime();

    const date = Math.floor(millisecond / (1000 * 60 * 60 * 24));
    const hour = Math.floor(millisecond  / 1000 / 60 / 60) % 24;
    const min = Math.floor(millisecond / 1000 / 60) % 60;
    const sec = Math.floor(millisecond / 1000) % 60;
    const seconds = Math.floor(millisecond / 1000);


    document.querySelector('.date').innerHTML = date;
    document.querySelector('.hour').innerHTML = hour;
    document.querySelector('.min').innerHTML = min;
    document.querySelector('.sec').innerHTML = sec;
    document.querySelector('.seconds').innerHTML = seconds;

    if(millisecond < 0) {
        clearInterval(timer);
        document.querySelector('.date').innerHTML = 0;
        document.querySelector('.hour').innerHTML = 0;
        document.querySelector('.min').innerHTML = 0;
        document.querySelector('.sec').innerHTML = 0;
        document.querySelector('.seconds').innerHTML = 0;
    }
};
const timer = setInterval(counter, 1000);

$(function(){
	//要素のコピー
	const $jsCopyButton = $('.js-copy-button');
	let html;
	const doneText = '<p class="c-done__text">コピーしました</p>';

	$jsCopyButton.on('click', function() {
		html = $(this).next().html();
		navigator.clipboard.writeText(html);

		$(this).parent().append(doneText);

		$(document).on('click', '.c-done__text', function(){
			$(this).remove();
		});
	});

	//目次
	const $jsContents = $('.js-contents');
	const $contentsList = $('.c-contents__list');

	$jsContents.each(function(index) {

		$(this).attr('id', 'anc-'+ index)
		$contentsList.append('<li><a href="#anc-' + index + '">' + $jsContents.eq(index).text() +'</a></li>');
	});
});

(function ($, window, document) {
    'use strict';

    const $win = $(window);
    const $doc = $(document);
    const $body = $('body');

    //別ページへのアンカーリンク有りsp-navi
    // (function () {
    //     const $header = $('.l-header');
    //     const $headerButton = $('.sp__btn');
    //     const $globalNavigation = $('.l-header__gnav');
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

    //     $(document).on('click', '.l-header__gnav.is-sp a', function () {
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
        const $header = $('.l-header');
        const $headerButton = $('.sp__btn');
        const $globalNavigation = $('.l-header__gnav');
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

        $('.l-header__gnav a[href^="#"]').on('click', function (event) {
            flag = true;
			$headerButton.trigger('click');
        });

        $win.on('customMatchMedia', function (event, mqBool) {
            if (mqBool) {
            	//mqBool値がtrueの場合、767pxまでのSP
            } else {
				//mqBool値がfalseの場合、768px以上のPC
                $body.removeClass(isActive);
                $globalNavigation.removeAttr('style').removeClass(isOpen);
                $headerButton.removeClass(isActive).closest($header).removeClass(isActive);
			}
        });
    }());

    // smooth scroll
    (function () {
        let headerHeight;
		const easing = "linear";
		const duration = 100;

        $('a[href^="#"]').click(function(){
            const href= $(this).attr("href");
			const target = $(href == "#" || href == "#top" ? 'html' : href);

			if(window.matchMedia("(min-width: 768px)").matches){
        		headerHeight = 150;
			} else {
				headerHeight = 70;
			}

			const position = target.offset().top - headerHeight;
            $("html, body").animate({scrollTop:position}, duration, easing);
               return false;
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
        const $pagetop = $('.l-pagetop');
        const $footer = $('.l-footer');
        const isActive = 'is-active';

        $pagetop.hide();

        // 500px スクロールしたらボタン表示
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
		const $tabList = $('.tab__list');
		const $tabPanel = $('.tab__panel');
		const $jsTabButton = $('.js-tab-button');
        const isActive = 'is-active';

		$tabList.each(function() {
			$tabList.find('li:first-child').addClass(isActive);
			$tabPanel.find('.panel:first-child').addClass(isActive)
		});

        $jsTabButton.on('click', function() {
            var index = $(this).parent('li').index();

            $(this).parent('li').addClass(isActive).siblings('li').removeClass(isActive);
            $(this).parents('.tab__list').next().children().removeClass(isActive).eq(index).addClass(isActive);
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
