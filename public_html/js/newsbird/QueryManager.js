/* 
 * Author: Felix Hamborg <felix.hamborg@uni-konstanz.de>
 */
"use strict";

function QueryManager() {
    this.url = mainController.getServerUrl() + "/query";
    var that = this;
    var uiBuilder = new UiBuilder();
    var rowLabelTexts = [];
    var colLabelTexts = [];
    var matrixEntries = [];
    var optionsForm = undefined;
    // stores the name of each option category (as key) and the jquery object where we can read the selected value (as value)
    var optionCategories = {};

    QueryManager.prototype.getRows = function () {
        return rowLabelTexts;
    };
    QueryManager.prototype.getColumns = function () {
        return colLabelTexts;
    };
    QueryManager.prototype.getCells = function () {
        return matrixEntries;
    };

    QueryManager.prototype.loadTemplate = function (onSuccess) {
        $('#sidebarQuery').load('menu_query.html', onSuccess);
    };

    QueryManager.prototype.initGui = function () {
        optionsForm = $("#queryOptionsForm");
        $('#sidebarQuery')
                .sidebar('setting', 'transition', 'push');
        $('#toggleQueryBtn').click(function () {
            $('#sidebarQuery')
                    .sidebar('toggle');
        });
        $(document).bind('keydown', 'q', function () {
            $('#sidebarQuery').sidebar('toggle');
        });
        $('.ui.dropdown').dropdown();
     
       /* $.getJSON(this.url + "/options", null, function (data) {
            uiBuilder.buildForm(optionsForm, data, optionCategories, function () {
                console.log('dynamic query option changed');
            });
            // end dynamic part

            // this is more or less hardcoded, but in future added fields will be done automatically (see above)
            $.each(data.filterDimensionClasses, function (i, item) {
                $('#rowDimTypeSelect_container').append($('<div>', {
                    class: "item",
                    value: item,
                    text: item,
                    "data-value": item
                }));
                $('#colDimTypeSelect_container').append($('<div>', {
                    class: "item",
                    value: item,
                    text: item,
                    "data-value": item
                }));
            });
        });*/

        $('#rowDimSelectedValues').tagsInput({
            'defaultText': 'add a value',
            'height': '100%',
            'width': '100%'
        });
        $('#colDimSelectedValues').tagsInput({
            'defaultText': 'add a value',
            'height': '100%',
            'width': '100%'
        });
        $("#from").datepicker({
         dateFormat: "yymmdd",
         changeMonth: true,
         numberOfMonths: 2,
         onClose: function (selectedDate) {
         $("#to").datepicker("option", "minDate", selectedDate);
         }
         });
         $("#to").datepicker({
         dateFormat: "yymmdd",
         changeMonth: true,
         numberOfMonths: 2,
         onClose: function (selectedDate) {
         $("#from").datepicker("option", "maxDate", selectedDate);
         }
         });

        $('#queryBtn').click(function () {
            that.onSubmitQuery();
        });
        
        $('#cancelBtn').click(function () {
            that.onCancelQuery();
        });
        
        $('#defaultsBtnQuery1').click(function () {
            // set defaults 1
            $('#rowDimTypeSelect').parent()
                    .data()
                    .moduleDropdown
                    .action
                    .activate(undefined, "CountryCodeFilterDimension");
            $('#colDimTypeSelect').parent()
                    .data()
                    .moduleDropdown
                    .action
                    .activate(undefined, 'DescriptionContainsFilterDimension');
            $('#rowDimSelectedValues').importTags('US,RU,GB,DE,FR,UA');
            $('#colDimSelectedValues').importTags('usa "united states",russia,britain england,germany,france,ukraine,ALL_DOCS');
            $('#from').val('20141107');
            $('#to').val('20141107');
        });
        $('#defaultsBtnQuery2').click(function () {
            // set defaults 1
            $('#rowDimTypeSelect').parent()
                    .data()
                    .moduleDropdown
                    .action
                    .activate(undefined, "CountryCodeFilterDimension");
            $('#colDimTypeSelect').parent()
                    .data()
                    .moduleDropdown
                    .action
                    .activate(undefined, 'ContentContainsFilterDimension');
            $('#rowDimSelectedValues').importTags('US,RU');
            $('#colDimSelectedValues').importTags('ALL_DOCS');
            $('#from').val('20141107');
            $('#to').val('20141107');
        });
        $('#defaultsBtnQuery3').click(function () {
            // set defaults 1
            $('#rowDimTypeSelect').parent()
                    .data()
                    .moduleDropdown
                    .action
                    .activate(undefined, "CountryCodeFilterDimension");
            $('#colDimTypeSelect').parent()
                    .data()
                    .moduleDropdown
                    .action
                    .activate(undefined, 'DescriptionContainsFilterDimension');
            $('#rowDimSelectedValues').importTags('US,GB,DE,FR,UA,GR');
            $('#colDimSelectedValues').importTags('greece,greek,tsipras,ALL_DOCS');
            $('#from').val('20150625');
            $('#to').val('20150625');
        });
    };

    QueryManager.prototype.getGuiQuery = function () {
        // build query and sent to server
        var query = {
            dateFromIncl: $('#from').val(),
            dateToIncl: $('#to').val(),
            // rowDimSelectedValues: $('#rowDimSelectedValues').val(),
            // colDimSelectedValues: $('#colDimSelectedValues').val(),
            //rowDimTypeSelect: $('#rowDimTypeSelect').val(),
            //colDimTypeSelect: $('#colDimTypeSelect').val(),
            
            rowDimSelectedValues: $('#PublisherCountryDropdown').val(),
            colDimSelectedValues: $('#MentionedCountryDropdown').val(),
            
            userFilterAdditionalTerms: $('#searchTerms').val(),
            
            numberOfTopicsPerCell: "1",
            userFilterFewRequiredTerms: "",
            summarization_OrderSentencesByFirstOccurenceInDoc: "false",
            summarization_Lin2002Single_FirstSentencesOnly: "true",
            topicCellDocumentMergeType: "ONE_DOC_ONE_INSTANCE",
            topicField: "contentStemmed"
            
            
        };
        console.log(query);
        // also add the dynamic fields
        //$.each(optionCategories, function (optionCategory, selectField) {
        //    query[optionCategory] = selectField.val();
        //});

        return query;
    };

    QueryManager.prototype.sendQueryToServer = function (query) {
        $('#cancelBtn').show();
        console.log("sending query: " + JSON.stringify(query));
        $.getJSON(that.url, "query=" + JSON.stringify(query), function (data) {
            $('#queryOptionsForm').toggleClass('loading');
            $('#cancelBtn').hide();

            console.log("retrieved data from server (by query)");

            rowLabelTexts = data.rows;
            colLabelTexts = data.columns;
            //    matrixEntries = data.matrixEntries;

            //matrixVisualization.updateVisualization();
            mainController.onQueryResults();
        });
    };

    QueryManager.prototype.onSubmitQuery = function () {
        $('#queryOptionsForm').toggleClass('loading');
        var query = this.getGuiQuery();

        this.sendQueryToServer(query);
    };
    
    QueryManager.prototype.onCancelQuery = function () {
        $('#queryOptionsForm').toggleClass('loading');
        $('#cancelBtn').hide();
    };

    QueryManager.prototype.setUserQuery = function (fewRequiredTerms, additionalTerms) {
        $('#userFilterFewRequiredTerms_textinput').val(fewRequiredTerms);
        $('#userFilterAdditionalTerms_textinput').val(additionalTerms);
        
        $('#searchTerms').val(fewRequiredTerms);
    };


    this.loadTemplate(function () {
        that.initGui();
    });
}