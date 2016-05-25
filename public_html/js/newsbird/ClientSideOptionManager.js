/* 
 * Author: Felix Hamborg <felix.hamborg@uni-konstanz.de>
 */
"use strict";
function ClientSideOptionManager() {
    // this is also the constructor of the class
    var optionsForm = undefined;
    // stores the name of each option category (as key) and the jquery object where we can read the selected value (as value)
    var optionCategories = {};
    var that = this;
    // public vars
    this.url = mainController.getServerUrl() + "/cells";
    var uiBuilder = new UiBuilder();
    
    var lastSortingType = "";


    /**
     * Returns the visualization options as selected by the user.
     * @returns options
     */
    ClientSideOptionManager.prototype.getVisOptions = function () {
        var options = {};
        $.each(optionCategories, function (optionCategory, selectField) {
            options[optionCategory] = selectField.val();
        });
        options.cellBackgroundColor = "topicId";
        return options;
    };
    /**
     * This is invoked any time an option field is changed. 
     * @returns {undefined}
     */
    ClientSideOptionManager.prototype.onOptionChanged = function (uiType, name, value) {
        var newVisOptions = this.getVisOptions();

        if (uiType !== undefined) {
            if (uiType === "button") {
                if (name === "sortMatrixBy") {
                    if (value === "fullRowsAndCols") {
                        matrixVisualization.onChangeSorting(value);
                    }
                }
                return;
            }
        }

        //console.log("client option changed");
        if (newVisOptions.sortMatrixBy !== lastSortingType) {
            lastSortingType = newVisOptions.sortMatrixBy;

            matrixVisualization.onChangeSorting(newVisOptions.sortMatrixBy);
            return;
        }

        matrixVisualization.updateVisualization();
        //matrixVisualization.onClientOptionsChanged();
    };
    ClientSideOptionManager.prototype.loadTemplate = function (onSuccess) {
        $('#sidebarClientOptions').load('menu_clientside.html', onSuccess);
    };
    ClientSideOptionManager.prototype.initGui = function () {
        optionsForm = $("#clientOptionsForm");
        $('#sidebarClientOptions')
                .sidebar('setting', 'transition', 'push');
        $('#toggleClientOptionsBtn').click(function () {
            $('#sidebarClientOptions')
                    .sidebar('toggle');
        });
        $(document).bind('keydown', 'c', function () {
            $('#sidebarClientOptions').sidebar('toggle');
        });
        // get all options from server and initialize GUI
        $.getJSON(this.url + "/clientoptions", null, function (data) {
            uiBuilder.buildForm(optionsForm, data, optionCategories, function (uiType, name, value) {
                that.onOptionChanged(uiType, name, value);
            });
            // once everything is initialized, get the data from the server
            // that.onOptionChanged();
        });
    };

    this.loadTemplate(function () {
        that.initGui();
    });
}
