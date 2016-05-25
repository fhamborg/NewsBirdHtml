/* 
 * Author: Felix Hamborg <felix.hamborg@uni-konstanz.de>
 */
"use strict";
function ImageQueryHandler() {
    var that = this;

    var resolver = new ImageResolver();

    // define our own webpage resolver that ignores 404 pages
    function WebpageCustomResolver() {
    }
    WebpageCustomResolver.origResolver = new ImageResolver.Webpage();
    WebpageCustomResolver.prototype.resolve = function (url, clbk, options, utils) {
        utils.fetch(
                url,
                function onSuccess(data, response) {
                    if (response.status !== 200) {
                        clbk(null);
                    } else {
                        WebpageCustomResolver.origResolver.parseHTML(data, url, clbk, options, utils);
                    }
                },
                function onError() {
                    clbk(null);
                }
        );
    };

    resolver.register(new ImageResolver.FileExtension());
    resolver.register(new ImageResolver.MimeType());
    resolver.register(new ImageResolver.Opengraph());
    resolver.register(new WebpageCustomResolver());
    //resolver.register(new ImageResolver.Webpage());

    // public vars
    this.url = mainController.getServerUrl() + "/images";
    var storagePrefix = "images_";
    var storagePrefixForArticleId = storagePrefix + "articleId_";

    ImageQueryHandler.prototype.requestImageForQuery = function (query, callback) {
        var imgPath = $.jStorage.get(storagePrefix + query);
        //imgPath = undefined;
        if (imgPath === undefined || imgPath === null) {
            //console.log("NOT CACHED " + query);

            //    console.log("request image for query " + query);
            $.getJSON(that.url + "/query?query=" + query, function (data) {
                $.jStorage.set(storagePrefix + query, data.imgPath);

                if (data.imgPath === "null") {
                    callback(null);
                } else {
                    callback(mainController.getServerUrl() + data.imgPath);
                }
            });
        } else {
            //console.log("cached " + query + " " + imgPath);
            if (imgPath === null) {
                callback(null);
            } else {
                callback(mainController.getServerUrl() + imgPath);
            }
        }
    };

    ImageQueryHandler.prototype.requestImageForTokenArray = function (array, callback) {
        //   console.log("request image for query " + array);
        var query = array.join(" ");
        imageQueryHandler.requestImageForQuery(query, callback);
    };



    /**
     * Tries to get the main image for the first article. If that fails, the next article is used and so on.
     * @param {type} articleIds
     * @param {type} callback
     * @returns {undefined}
     */
    ImageQueryHandler.prototype.getImageFromArticleIds = function (articleIds, callback, firstArticleId) {
        if (articleIds === undefined) {
            return;
        }

        // shorten the list if necessary, this is for performance reasons
        if (articleIds.length > 10) {
            //console.log("shortening articleIds from " + articleIds.length);
            articleIds = articleIds.slice(0, 10);
        }

        // if the first art id is undefined, call this function with the first article id
        if (firstArticleId === undefined) {
            this.getImageFromArticleIds(articleIds, callback, articleIds[0]);
            return;
        }

        if (articleIds.length === 0) {
            //console.log("reached end of article list, storing null for first article " + firstArticleId);
            $.jStorage.set(storagePrefixForArticleId + firstArticleId, "NOURLFOUND");
            return;
        }

        // remove the first from the list
        articleIds = articleIds.slice();
        var articleId = articleIds.shift();

        // check if cached
        var cachedImgUrl = $.jStorage.get(storagePrefixForArticleId + articleId);
        if (cachedImgUrl !== undefined && cachedImgUrl !== null) {
            //console.log("found cache");
            if (cachedImgUrl === "NOURLFOUND") {
                // we already ran through the list of all articles, and did not find anything, so don't do this again, and just do nothing
                //console.log("QUIT: end of list, no image found before");
                return;
            } else {
                callback(cachedImgUrl);
                return;
            }

            /*if (cachedImgUrl !== "null") {
             callback(cachedImgUrl);
             return;
             }*/
        } else {
            //console.log("found no cache");

            articleHandler.getFullArticleFromId(articleId, function (article) {

                if (article !== null) {
                    //console.log("found article");
                    that.getImageFromWebsite(article.url, function (imgUrl) {
                        console.log(imgUrl);
                        if (imgUrl !== null) {
                            $.jStorage.set(storagePrefixForArticleId + articleId, imgUrl);
                            callback(imgUrl);
                            return;
                        } else {
                            that.getImageFromArticleIds(articleIds, callback, firstArticleId);
                            return;
                        }
                    });
                } else {
                    //console.log("found no article");
                    //console.log(articleIds);
                    that.getImageFromArticleIds(articleIds, callback, firstArticleId);
                    return;
                }
            });
        }
        return;
    };

    ImageQueryHandler.prototype.getImageFromWebsite = function (url, callback) {
        // url = "http://sputniknews.com/politics/20141104/195071871.html";
        resolver.resolve(url, function (res) {
            if (res) {
                callback(res.image);
            } else {
                callback(null);
            }
        });
    };
}
