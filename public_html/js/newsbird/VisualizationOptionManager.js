/* 
 * Author: Felix Hamborg <felix.hamborg@uni-konstanz.de>
 */
"use strict";
function VisOptionManager() {
    // this is also the constructor of the class
    var visOptionsForm = undefined;
    // stores the name of each option category (as key) and the jquery object where we can read the selected value (as value)
    var optionCategories = {};
    var that = this;
    // public vars
    this.url = mainController.getServerUrl() + "/cells";
    var uiBuilder = new UiBuilder();
    /**
     * Returns the visualization options as selected by the user.
     * @returns options
     */
    VisOptionManager.prototype.getVisOptions = function () {
        var options = {};
        $.each(optionCategories, function (optionCategory, selectField) {
            options[optionCategory] = selectField.val();
        });
        // since we do not have the GUI any more, add the settings manually
        // client side options
        options.visOptions_CellImportanceMeasurement = "topicQuery-cellQuery-ratio";
        // server side options
        options.summaryFieldOptions = "TITLE";
        options.summaryElementOptions = "SUMMARY_SENTENCES";
        options.tokenWeightingOptions = "TOKEN_TTFIDF_FROM_SUMMARY_SENTENCES";
        options.elementOrderOptions = "SCORE";
        options.summarizationSentence_Lin2002Single_StartingWithStigmaWords_ReducedScore = "true";
        options.summarizationSentence_FelixScorer = "true";
        options.summarizationSentence_TopChunksOnly = "false";
        //"summarizationToken_HideSynonyms"
        options.summarizationToken_HideStopWords = "true";

        return options;
    };
    /**
     * This is invoked any time an option field is changed. 
     * It triggers a request of information for all cells to the server.
     * @returns {undefined}
     */
    VisOptionManager.prototype.onOptionChanged = function () {
        var newVisOptions = {};
        newVisOptions["options"] = JSON.stringify(this.getVisOptions());
        $.getJSON(that.url + "/getinfo", newVisOptions, function (data) {
            console.log("received new cell info");
            cellInformationManager.setCellInfo(data);
        });
    };
    VisOptionManager.prototype.loadTemplate = function (onSuccess) {
        $('#sidebarVisOptions').load('menu_visualization.html', onSuccess);
    };
    VisOptionManager.prototype.initGui = function () {
        visOptionsForm = $("#visOptionsForm");
        $('#sidebarVisOptions')
                .sidebar('setting', 'transition', 'push');
        $('#toggleVisOptionsBtn').click(function () {
            $('#sidebarVisOptions')
                    .sidebar('toggle');
        });
        $(document).bind('keydown', 'v', function () {
            $('#sidebarVisOptions').sidebar('toggle');
        });
        // get all options from server and initialize GUI
        $.getJSON(this.url + "/options", null, function (data) {
            uiBuilder.buildForm(visOptionsForm, data, optionCategories, function () {
                that.onOptionChanged();
            });
            // once everything is initialized, get the data from the server
            // that.onOptionChanged();
        });
    };
    this.loadTemplate(function () {
        that.initGui();
    });
}
