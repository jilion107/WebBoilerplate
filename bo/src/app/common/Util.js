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
}

export default new Util();