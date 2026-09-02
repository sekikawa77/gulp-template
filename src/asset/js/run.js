'use strict';

/* ▼ここから下は不要なので削除すること▼
------------------------------------------*/
// function counter () {
//     const now = new Date();
//     const goal = new Date(2025, 3, 20, 10, 30);
//     const millisecond = goal.getTime() - now.getTime();

//     const date = Math.floor(millisecond / (1000 * 60 * 60 * 24));
//     const hour = Math.floor(millisecond  / 1000 / 60 / 60) % 24;
//     const min = Math.floor(millisecond / 1000 / 60) % 60;
//     const sec = Math.floor(millisecond / 1000) % 60;
//     const seconds = Math.floor(millisecond / 1000);


//     document.querySelector('.date').innerHTML = date;
//     document.querySelector('.hour').innerHTML = hour;
//     document.querySelector('.min').innerHTML = min;
//     document.querySelector('.sec').innerHTML = sec;
//     document.querySelector('.seconds').innerHTML = seconds;

//     if(millisecond < 0) {
//         clearInterval(timer);
//         document.querySelector('.date').innerHTML = 0;
//         document.querySelector('.hour').innerHTML = 0;
//         document.querySelector('.min').innerHTML = 0;
//         document.querySelector('.sec').innerHTML = 0;
//         document.querySelector('.seconds').innerHTML = 0;
//     }
// };
// const timer = setInterval(counter, 1000);

$(function(){
	//要素のコピー
	const $jsCopyButton = $('.js-copy-button');
	let html;
	const doneText = '<p class="c-done__text">コピーしました</p>';

	$jsCopyButton.one('click', function() {
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

/* ▲ここまで削除▲
------------------------------------------*/

(() => {
	'use strict';

	const win = window;
	const doc = document;
	const body = doc.body;

	/* =========================
		sp-navi
	========================= */
	(() => {
		const header = doc.querySelector('.l-header');
		const headerButton = doc.querySelector('.sp__btn');
		const globalNavigation = doc.querySelector('.l-header__gnav');

		const isActive = 'is-active';
		const isOpen = 'is-open';

		headerButton.addEventListener('click', () => {
			body.classList.toggle(isActive);
			globalNavigation.classList.toggle(isOpen);
			headerButton.classList.toggle(isActive);
			header.classList.toggle(isActive);
		});

		// アンカークリックで閉じる
		// doc.querySelectorAll('.l-header__gnav a[href^="#"]').forEach(link => {
		// 	link.addEventListener('click', () => {
		// 		headerButton.click();
		// 	});
		// });

		// メディアクエリ変化
		win.addEventListener('customMatchMedia', (e) => {
			const mqBool = e.detail;

			//pc画面なら
			if (!mqBool) {
				body.classList.remove(isActive);
				globalNavigation.classList.remove(isOpen);
				headerButton.classList.remove(isActive);
				header.classList.remove(isActive);
			}
		});
	})();

	/* =========================
		smooth scroll
	========================= */
	(() => {
		doc.querySelectorAll('a[href^="#"]').forEach(anchor => {


		anchor.addEventListener('click', (e) => {
			e.preventDefault();

			const href = anchor.getAttribute('href');
			const target = (href === '#' || href === '#top')
			? doc.documentElement //true
			: doc.querySelector(href); //false

			if (!target) return;

			const headerHeight = win.matchMedia('(min-width: 768px)').matches
			? 150 //ヘッダーの高さPC
			: 70; //ヘッダーの高さSP

			const position = target.getBoundingClientRect().top + win.scrollY - headerHeight;

			win.scrollTo({
				top: position,
				behavior: 'smooth'
			});
		});
		});
	})();

	/* =========================
		IntersectionObserver
	========================= */
	(() => {
		const option = {
			root: null,
			rootMargin: "0px",
			threshold: 0.3,
		};

		// インスタンス生成
		// コールバック関数とオプションを渡します
		const observer = new IntersectionObserver(doWhenIntersect, option);

		// 監視対象にしたい要素を渡す
		$('.js-anime, .js-anime-left, .js-anime-scale').each(function() {
			observer.observe(this);
		});

		// コールバック関数
		function doWhenIntersect(entries) {
			entries.forEach(entry => {
				 // 要素が交差したら…
				if(entry.isIntersecting) {
					// クラスをつける
					$(entry.target).addClass('is-anime');

					// 一度表示された要素は、再び監視する必要がないため、
					// クラス付与後に unobserve で監視対象から外します
					observer.unobserve(entry.target);
				}
			});
		}
	})();

	/* =========================
		pagetop
	========================= */
	(() => {
		const pagetop = doc.querySelector('.l-pagetop');
		const footer = doc.querySelector('.l-footer');
		const isActive = 'is-active';

		if (!pagetop) return;

		pagetop.style.display = 'none';

		win.addEventListener('scroll', () => {
			if (win.scrollY > 500) {
				pagetop.style.display = 'block';
			} else {
				pagetop.style.display = 'none';
			}

			const scrollHeight = doc.documentElement.scrollHeight;
			const scrollPosition = win.innerHeight + win.scrollY;
			const footHeight = footer.offsetHeight || 0;

			if (scrollHeight - scrollPosition <= footHeight) {
				pagetop.classList.add(isActive);
			} else {
				pagetop.classList.remove(isActive);
			}
			});
	})();

	/* =========================
		splide
	========================= */
	(() => {
		const splide = new Splide( '.splide-slide', {
			autoplay: true, // 自動再生
			type: "loop", // ループ
			perPage : 1, //中央に何枚表示するか
			pauseOnHover: false, // カーソルが乗ってもスクロールを停止させない
			pauseOnFocus: false, // 矢印をクリックしてもスクロールを停止させない
			interval: 4000, // 自動再生の間隔
			speed: 500, // スライダーの移動時間
			padding: "30%", // スライダーの左右の余白
			gap: '20px', //余白
			focus: 'center', //中央寄せ
			breakpoints: {
				767: {
					padding: "0%",
					perPage : 1,
				}
			}
		});

		splide.mount();
	})();

	/* =========================
		scroll-hint
	========================= */
	(() => {
		new ScrollHint(".js-scroll-hint", {
			i18n: {
				scrollable: "横スクロール",
			},
		});
	})();

	/* =========================
		modal
	========================= */
	(() => {
		const modalOverlay = document.querySelector('.modal__overlay');
		const modal = document.querySelector('.modal');
		const jsModalOpen = document.querySelector('.js-modal-open');
		const jsCloseButton = document.querySelector('.js-close-button');
		const modalContent = document.querySelector('.modal__content');
		const isOpen = 'is-open';

		jsModalOpen.addEventListener('click', ()=> {
			modalContent.classList.add(isOpen);
			modalOverlay.classList.add(isOpen);
			modal.classList.add(isOpen);
		});

		jsCloseButton.addEventListener('click', modalRemove);
		modalOverlay.addEventListener('click', modalRemove);

		function modalRemove() {
			modalContent.classList.remove(isOpen);
			modalOverlay.classList.remove(isOpen);
			modal.classList.remove(isOpen);
		}
	})();

	/* =========================
		tab
	========================= */
	(() => {
		const tabs = doc.querySelectorAll('.tab');
		const isActive = 'is-active';

		tabs.forEach((tab) => {
			const tabList = tab.querySelector('.tab__list');
			const jsTabButtons = tabList.querySelectorAll('.js-tab-button');
			const tabPanels = tab.querySelectorAll('.panel');

			jsTabButtons.forEach((jsTabButton, index) => {
				jsTabButton.addEventListener('click', () => {

					// すべてのタブを非active
					jsTabButtons.forEach((button) => {
						button.classList.remove(isActive);
					});

					// このタブ内のパネルをすべて非active
					tabPanels.forEach((panel) => {
						panel.classList.remove(isActive);
					});

					// クリックしたタブをactive
					jsTabButton.classList.add(isActive);

					// 対応するパネルをactive
					tabPanels[index].classList.add(isActive);
				});
			});
		});


	})();

	/* =========================
		絞り込み
	========================= */
	(() => {
		const filterButtons = doc.querySelectorAll('[data-filter]');
		const categoryContents = doc.querySelectorAll('[data-category]');
        const isActive = 'is-active';
        const isHidden = 'is-hidden';

		filterButtons.forEach((filterButton) => {
			filterButton.addEventListener('click', () => {

				filterButtons.forEach((button) => {
					button.classList.remove(isActive);
				});

				filterButton.classList.add(isActive);

				const buttonCategory = filterButton.dataset.filter;

				//絞り込み解除
				if(buttonCategory === 'all') {
					categoryContents.forEach((categoryContent) => {
						const parent = categoryContent.parentElement;


						console.log(categoryContent);

						parent.classList.remove(isHidden);
					});

					return;
				}


				//通常の絞り込み
				categoryContents.forEach((categoryContent) => {
					const parent = categoryContent.parentElement;
					const categories = categoryContent.dataset.category.split(' ');

					parent.classList.add(isHidden);

					//該当カテゴリーのみ表示
					if(categories.includes(buttonCategory)) {
						parent.classList.remove(isHidden);
					}
				});
			});
		});

	})();

	/* =========================
		toggle
	========================= */
	(() => {
		const faqButton = document.querySelectorAll('.faq__button');
		const faqAnswer = document.querySelectorAll('.faq__answer');

		faqButton.forEach(btn => {
			btn.addEventListener('click', () => {
				const content = btn.nextElementSibling;

				if (!content) return;

				if (content.style.maxHeight) {
					content.style.maxHeight = null;
				} else {
					content.style.maxHeight = content.scrollHeight + 'px';
				}
			});
		});

		//アンサー部分の高さのリサイズ
		const observer = new ResizeObserver(entries => {
			entries.forEach(entry => {
				const el = entry.target;
				if (el.style.maxHeight) {
				el.style.maxHeight = el.scrollHeight + 'px';
				}
			});
		});

		faqAnswer.forEach(el => {
			observer.observe(el);
		});

	})();

	/* =========================
		fix__block
	========================= */
	(() => {
		const fixBlock = doc.querySelector('.fix__block');

		const isActive = 'is-active';
		const isOpen = 'is-open';
		const isStatic = 'is-static'

		const blockFixed = () => {
			const positionStart = doc.querySelector('.is-position-start');
			const positionEnd = doc.querySelector('.is-position-end');

			const scrollY = win.scrollY;// 現在のスクロール量
			const positionTop = positionStart.getBoundingClientRect().top + scrollY;
			const positionBottom = positionEnd.getBoundingClientRect().bottom;

			//.is-position-startの上が画面の上を過ぎたら
			if(scrollY >= positionTop) {
				fixBlock.classList.add(isActive);
			} else {
				fixBlock.classList.remove(isActive);
				fixBlock.classList.remove(isOpen);
			}

			//.is-position-endが下が画面の下を過ぎたら
			if(positionBottom >= win.innerHeight) {
				fixBlock.classList.remove(isStatic);
			} else {
				fixBlock.classList.add(isStatic);
			}
		}

		blockFixed();
		doc.addEventListener('scroll', blockFixed);
})();
	/* =========================
		media query event
	========================= */
	(() => {
		const mediaQueryList = win.matchMedia('(max-width: 767px)');

		const mediaChange = (e) => {
			const event = new CustomEvent('customMatchMedia', {
				detail: e.matches
			});
			win.dispatchEvent(event);
		};

		mediaQueryList.addEventListener('change', mediaChange);

		// 初期実行
		mediaChange(mediaQueryList);
	})();
})();

/* jQueryコード
------------------------------------------*/
// (function ($, window, document) {
//     'use strict';

//     const $win = $(window);
//     const $doc = $(document);
//     const $body = $('body');

//     //別ページへのアンカーリンク有りsp-navi
//     // (function () {
//     //     const $header = $('.l-header');
//     //     const $headerButton = $('.sp__btn');
//     //     const $globalNavigation = $('.l-header__gnav');
//     //     const isActive = 'is-active';
//     //     const isOpen = 'is-open';
//     //     let flag = false;


//     //     $headerButton.on('click', function () {
//     //         const $this = $(this);

//     //         if (flag === false) {
//     //             $body.addClass(isActive);
//     //             $globalNavigation.addClass(isOpen).slideDown();
//     //             $this.addClass(isActive).closest($header).addClass(isActive);

//     //             flag = true;
//     //         } else {
//     //             $body.removeClass(isActive);
//     //             $globalNavigation.removeClass(isOpen).slideUp();
//     //             $this.removeClass(isActive).closest($header).removeClass(isActive);

//     //             flag = false;
//     //         }

//     //     });

//     //     $win.on('customMatchMedia', function (event, bool) {
//     //         if (!bool) {
//     //         //for pc
//     //             $body.removeClass(isActive);
//     //             $globalNavigation.removeAttr('style').removeClass(isOpen).addClass('is-pc').removeClass('is-sp');
//     //             $headerButton.removeClass(isActive).closest($header).removeClass(isActive);

//     //         } else {
//     //             $globalNavigation.addClass('is-sp').removeClass('is-pc');
//     //         }
//     //     });

//     //     $(document).on('click', '.l-header__gnav.is-sp a', function () {
//     //         flag = true;
//     //         $headerButton.trigger('click');

//     //     });
//     // }());

//     // smooth scroll
//     // (function () {
//     //     var headerHight = 80;
//     //     var urlHash = location.hash;

//     //     $('a[href^="#"], a[href^="/#"]').click(function(){
//     //         var href= $(this).attr("href");

//     //         if(href === '#anc-06'){
//     //             var str = href;
//     //         } else {

//     //             var str = href.slice(1);
//     //         }

//     //         var target = $(str == "#" || str == "" ? 'html' : str);
//     //         var position = target.offset().top-headerHight;

//     //         $("html, body").animate({scrollTop:position}, 550, "swing");

//     //     });

//     //     if (urlHash) {
//     //         $("html, body").stop().scrollTop(0);
//     //         setTimeout(function(){
//     //             var target = $(urlHash);
//     //             var position = target.offset().top-headerHight;
//     //             $('body,html').stop().animate({scrollTop:position}, 550);
//     //         }, 100);
//     //     }

//     // }());


//     //sp-navi
//     (function () {
//         const $header = $('.l-header');
//         const $headerButton = $('.sp__btn');
//         const $globalNavigation = $('.l-header__gnav');
//         const isActive = 'is-active';
//         const isOpen = 'is-open';
//         let flag = false;


//         $headerButton.on('click', function () {
//             const $this = $(this);

//             if (flag === false) {
//                 $body.addClass(isActive);
//                 $globalNavigation.addClass(isOpen).slideDown();
//                 $this.addClass(isActive).closest($header).addClass(isActive);

//                 flag = true;
//             } else {
//                 $body.removeClass(isActive);
//                 $globalNavigation.removeClass(isOpen).slideUp();
//                 $this.removeClass(isActive).closest($header).removeClass(isActive);

//                 flag = false;
//             }

//         });

//         $('.l-header__gnav a[href^="#"]').on('click', function (event) {
//             flag = true;
// 			$headerButton.trigger('click');
//         });

//         $win.on('customMatchMedia', function (event, mqBool) {
//             if (mqBool) {
//             	//mqBool値がtrueの場合、767pxまでのSP
//             } else {
// 				//mqBool値がfalseの場合、768px以上のPC
//                 $body.removeClass(isActive);
//                 $globalNavigation.removeAttr('style').removeClass(isOpen);
//                 $headerButton.removeClass(isActive).closest($header).removeClass(isActive);
// 			}
//         });
//     }());

//     // smooth scroll
//     (function () {
//         let headerHeight;
// 		const easing = "linear";
// 		const duration = 100;

//         $('a[href^="#"]').click(function(){
//             const href= $(this).attr("href");
// 			const target = $(href == "#" || href == "#top" ? 'html' : href);

// 			if(window.matchMedia("(min-width: 768px)").matches){
//         		headerHeight = 150;
// 			} else {
// 				headerHeight = 70;
// 			}

// 			const position = target.offset().top - headerHeight;
//             $("html, body").animate({scrollTop:position}, duration, easing);
//                return false;
//         });
//     }());


//     // //scrollしたらclassを付与
//     // (function () {

//     //     let jsAnime = function(){
//     //         $('.js-anime').each(function(){
//     //             let position = $(this).offset().top;
//     //             let scroll = $win.scrollTop();
//     //             let winheight = $win.height();

//     //             // この要素のスクロール位置 - ウインドウの縦幅
//     //             if(scroll > position - winheight) {
//     //                 $(this).addClass('is-active');
//     //             }
//     //         });
//     //     };

//     //     $win.on('scroll', function(){
//     //         jsAnime();
//     //     });

//     //     $win.on('load', function(){
//     //         jsAnime();
//     //     });
//     // }());

//     // scrollしたらclassを付与
//     (function () {
// 		// オプション設定
// 		// 条件：
// 		// ターゲット要素の3割が画面に入ったら
// 		// 補足：
// 		// rootMarginをマイナスにしすぎると、
// 		// ページ最下部でスクロールできる余白が足りずに
// 		// 監視対象が一生交差しないままになってしまうことがあります。
// 		const option = {
// 			root: null,
// 			rootMargin: "0px",
// 			threshold: 0.3, //0〜1まで
// 		}

// 		// インスタンス生成
// 		// コールバック関数とオプションを渡します
// 		const observer = new IntersectionObserver(doWhenIntersect, option);

// 		// 監視対象にしたい要素を渡す
// 		$('.js-fade').each(function() {
// 			observer.observe(this);
// 		});

// 		// コールバック関数
// 		function doWhenIntersect(entries) {
// 			console.log(entries);

// 			entries.forEach(entry => {
// 				 // 要素が交差したら…
// 				if(entry.isIntersecting) {
// 					// クラスをつける
// 					$(entry.target).addClass('is-fade');

// 					// 一度表示された要素は、再び監視する必要がないため、
// 					// クラス付与後に unobserve で監視対象から外します
// 					observer.unobserve(entry.target);
// 				}
// 			});
// 		}
// 	}());

//     // totop
//     (function () {
//         const $pagetop = $('.l-pagetop');
//         const $footer = $('.l-footer');
//         const isActive = 'is-active';

//         $pagetop.hide();

//         // 500px スクロールしたらボタン表示
//         $(window).scroll(function () {
//             if ($(this).scrollTop() > 500) {
//                 $pagetop.fadeIn();
//             } else {
//                 $pagetop.fadeOut();
//             }

//             const scrollHeight = $doc.height();
//             const scrollPosition = $win.height() + $win.scrollTop();
//             const footHeight = $footer.innerHeight();

//             if (scrollHeight - scrollPosition <= footHeight) {
//                 $pagetop.addClass(isActive);
//             } else {
//                 $pagetop.removeClass(isActive);
//             }

//         });
//     }());

//     // tab
//     (function () {
// 		const $tabList = $('.tab__list');
// 		const $tabPanel = $('.tab__panel');
// 		const $jsTabButton = $('.js-tab-button');
//         const isActive = 'is-active';

// 		$tabList.each(function() {
// 			$tabList.find('li:first-child').addClass(isActive);
// 			$tabPanel.find('.panel:first-child').addClass(isActive)
// 		});

//         $jsTabButton.on('click', function() {
//             var index = $(this).parent('li').index();

//             $(this).parent('li').addClass(isActive).siblings('li').removeClass(isActive);
//             $(this).parents('.tab__list').next().children().removeClass(isActive).eq(index).addClass(isActive);
//           });
//     }());

//     //Magnific Popup
//     (function () {
//         $('.gallery').magnificPopup({
//             delegate: 'a',
//             type: 'image',
//             gallery: { //ギャラリー表示にする
//               enabled:true
//             }
//         });

//     }());

//     // メディアクエリのイベントセット
//     (function () {
//         const mediaQueryList = window.matchMedia('(max-width: 767px)');

//         // イベントリスナの定義
//         function mediaChange(mql) {
//             // カスタムイベントを呼び出す
//             $win.trigger('customMatchMedia', [mql.matches]);
//         }
//         // MediaQueryListにイベントリスナを登録
//         mediaQueryList.addEventListener('change', mediaChange);

//         // 初期状態の評価のためイベントリスナを一度実行
//         mediaChange(mediaQueryList);
//     }());
// }(window.jQuery, window, document));
