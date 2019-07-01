function browserhistory({ updateDataFunc }) {
    this.updateDataFunc = updateDataFunc;
    updateHistory = (data) => {
        const {
            pageTitle,
            url,
            fetchurl,
            docUrl
        } = data;

        /**
         * @property fetchurl [string] full url to fetch data
         * @property url      [string] partial url that is appended in url (in browser)
         *                    if fetch url is missing, then ajax is fired to [host]/url for page data.
         * @property docUrl   [string] full page/browser url
         * @property title    [string] document title
         */
        let pageState = {
            url, // partial url,
            fetchurl, // url to fetch the data for the page
            docUrl: docUrl || window.location.href, //full page url
            title: pageTitle || window.document.title // title of the page
        }

        //attach history listener
        window.addEventListener('popstate', historyListener);

        //update data
        window.history.pushState({ pageState }, pageState.title, pageState.url);
        window.document.title = pageState.title;
    }

    historyListener = (data) => {
        const {
            state
        } = data;

        if (state && typeof (state) !== 'string') {
            const {
                pageState
            } = state;
            fetchPageData(pageState);
        }
    }

    fetchPageData = (stateObj) => {
        const {
            fetchurl, url
        } = stateObj;

        fetch(fetchurl || url)
            .then(response => response.json())
            .then(json => {
                if (this.updateDataFunc) {
                    this.updateDataFunc(json)
                }
            })
    }
    return {
        updateHistory,
        updateDataFunc
    }
}

module.exports = browserhistory;