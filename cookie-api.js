(function (undefined) {
    'use strict';

    // Polyfill
    // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FString%2FstartsWith
    if (!String.prototype.startsWith) {
        Object.defineProperty(String.prototype, 'startsWith', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function startsWith(searchString, position) {
                position = position || 0;
                return this.indexOf(searchString, position) === position;
            }
        });
    }

    window.Cookie = Cookie;
    // TODO:
    //      - let the user specify 'expires', 'path', 'domain', 'max-age'
    //        and the secure flag
    //      - name identifier validation

    function Cookie(name, value) {
        // TODO: name identifier validation
        this.name = name;

        if (value !== undefined) {
            this.setValue(value);
        }
    }
    Cookie.prototype.setValue = function setValue(newValue) {
        updateCookie(this.name, newValue);
        this.value = getCookieValue(this.name);
    };
    Cookie.prototype.getValue = function getValue() {
        this.value = getCookieValue(this.name);
        return this.value;
    }
    Cookie.prototype.remove = function remove() {
        removeCookie(this.name, this.getValue());
    }
    Cookie.prototype.valueOf = function valueOf() {
        this.value = getCookieValue(this.name);
        return this;
    }

    function removeCookie(name, value) {
        var expDate = new Date();
        expDate.setDate(expDate.getDate() - 1);
        document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expDate.toGMTString();
    }

    function updateCookie(name, value) {
        document.cookie = name + '=' + encodeURIComponent(value);
    }

    function getCookieValue(name) {
        var cookies = document.cookie.split(';'),
            value = null,
            cookie, i;

        for (i = 0; i < cookies.length; ++i) {
            cookie = cookies[i];
            if (cookie.startsWith(name)) {
                if (cookie.startsWith('=', name.length)) {
                    value = decodeURIComponent(cookie.substring(cookie.indexOf('=') + 1));
                }
                break;
            }
        }

        return value;
    }
}());
