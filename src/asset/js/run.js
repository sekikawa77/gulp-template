(function ($, window, document) {
    'use strict';

    var $win = $(window);
    var $doc = $(document);
    var $body = $('body');
    var scrollElement = $(document.scrollingElement || /* IE */ $('html'));
    
    (function () {
        console.log('hogehoge');
    }());



    // メディアクエリのイベントセット
    (function () {
        var mediaQueryList = window.matchMedia('(max-width: 599px)');

        // イベントリスナの定義
        function mediaChange(mql) {
            // カスタムイベントを呼び出す
            $win.trigger('customMatchMedia', [mql.matches]);
        }
        // MediaQueryListにイベントリスナを登録
        mediaQueryList.addListener(mediaChange);

        // 初期状態の評価のためイベントリスナを一度実行
        mediaChange(mediaQueryList);
    }());
}(window.jQuery, window, document));