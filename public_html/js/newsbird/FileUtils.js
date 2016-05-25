/* 
 * Author: Felix Hamborg <felix.hamborg@uni-konstanz.de>
 */

function FileUtils() {

    /**
     * Downloads the given jsonData as a stringified (multiline) text file.
     * @param {type} jsonData
     * @param {type} filename
     * @returns {undefined}
     */
    FileUtils.prototype.downloadAsJSON = function (jsonData, filename) {
        var content = JSON.stringify(jsonData, null, "\t");
        var jsonHandler = document.createElement('a');

        jsonHandler.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(content);
        jsonHandler.target = '_blank';
        jsonHandler.download = filename;
        document.body.appendChild(jsonHandler);
        jsonHandler.click();
    };
}

