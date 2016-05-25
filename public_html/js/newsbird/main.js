/* 
 * Author: Felix Hamborg <felix.hamborg@uni-konstanz.de>
 */
//"use strict";
function MainController() {
    MainController.serverUrl = 'http://localhost:8080';
    var activeMainVis = matrixVisualization;
    var that = this;

    /**
     * Returns the server base url
     * @returns {String}
     */
    MainController.prototype.getServerUrl = function () {
        return MainController.serverUrl;
    };
    /**
     * Returns the active main visualization.
     * @returns {unresolved}
     */
    MainController.prototype.getActiveVis = function () {
        return activeMainVis;
    };
    /**
     * Invoked if new query information is retrieved.
     * @returns {undefined}
     */
    MainController.prototype.onQueryResults = function () {
        visOptionManager.onOptionChanged();
    };
    /**
     * Initialize the GUI elements
     * @returns {undefined}
     */
    MainController.prototype.guiInit = function () {
        $('.ui.dropdown').dropdown();
        $('#newsbirdtitle').sticky({
            context: '#bodyContent'
        });
        $('.ui.checkbox').checkbox();
        /* $('#visDisplay_table_sentences').on('change', function () {
         tableDisplayOptions.showCellInformation = 'sentences';
         initMatrixVis();
         });
         $('#visDisplay_table_words').on('change', function () {
         tableDisplayOptions.showCellInformation = 'words';
         initMatrixVis();
         });
         $('#visDisplay_table_topicwords').on('change', function () {
         tableDisplayOptions.showCellInformation = 'topicwords';
         initMatrixVis();
         });
         $('#visDisplay_tokenWeighting_none').on('change', function () {
         tableDisplayOptions.tokenWeighting = 'none';
         initMatrixVis();
         });
         $('#visDisplay_tokenWeighting_summarySentences').on('change', function () {
         tableDisplayOptions.tokenWeighting = 'summarySentences';
         initMatrixVis();
         });*/


        $('#downloadCellsBtn').click(function () {
            new FileUtils()
                    .downloadAsJSON(cellInformationManager.getCellInfo(), "cells.json");
        });
        
        $('#clearCacheBtn').click(function () {
            $.jStorage.flush();
        });

        $('#dropdownVisualization').change(function () {
            that.changeMainVis($('#dropdownVisualization').val());
        });
    };

    MainController.prototype.changeMainVis = function (name) {
        console.log("changed vis to " + name);
        switch (name) {
            case "matrix":
                activeMainVis = matrixVisualization;
                break;
            case "geo":
                activeMainVis = geoVisualization;
                break;
        }

        activeMainVis.updateVisualization();
    };
}


$(function () {
// see here: http://stackoverflow.com/a/10618640/1455800
    jQuery.support.cors = true;
    var visElement = d3.select('#vis');
    matrixVisualization = new MatrixVisualization(visElement);
    //geoVisualization = new Geo(visElement);
    mainController = new MainController();

    countryNames = new CountryNames();
    visOptionManager = new VisOptionManager();
    queryManager = new QueryManager();
    cellInformationManager = new CellInformationManager();
    clientSideOptionManager = new ClientSideOptionManager();
    imageQueryHandler = new ImageQueryHandler();
    articleHandler = new ArticleHandler();
    articleListView = new ArticleList();
    mainController.guiInit();

    $.getJSON("cells.json", null, function (data) {
        console.log("using offline cells.json");
        //console.log(cells);
        cellInformationManager.setCellInfo(data);
    });
});