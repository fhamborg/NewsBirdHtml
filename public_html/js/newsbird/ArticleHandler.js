/* 
 * Author: Felix Hamborg <felix.hamborg@uni-konstanz.de>
 */
"use strict";
function ArticleHandler() {
    var that = this;
    // public vars
    this.url = mainController.getServerUrl() + "/articles";

    /**
     * 
     * @param {type} ids Can be an array of IDs or a single ID
     * @param {type} callback
     * @returns {undefined}
     */
    ArticleHandler.prototype.getFullArticleFromId = function (ids, callback) {
        $.getJSON(that.url + "/" + JSON.stringify(ids), function (data) {
            callback(data);
        });
    };
}

