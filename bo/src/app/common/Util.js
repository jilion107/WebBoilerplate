/**
 * Created by jilion.chen on 3/6/2017.
 */

class Util {
    constructor() {
    }

    redirect(url, search = "") {
        search = (search == "?") ? "" : search;
        var location = window.location;
        var pathname = location.pathname;
        window.location.href = pathname + search + '#' +  url;
    }

    changLocation(url) {
        window.location.href = url;
    }

    writeCookie(name, value, path, duration) {
        var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

        if (path) {
            cookie += '; path=' + path;
        }

        if (duration) {
            let date = new Date();
            date.setTime(date.getTime() + duration * 24 * 60 * 60 * 1000);
            cookie += '; expires=' + date.toUTCString();
        }

        document.cookie = cookie;
    }

    readCookie(name) {
        var value = document.cookie.match(new RegExp('(?:^|;)\\s*' + name + '=([^;]*)'));
        return (value) ? decodeURIComponent(value[1]) : null;
    }
}

export default new Util();