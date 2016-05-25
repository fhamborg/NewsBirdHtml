/* 
 * Author: Felix Hamborg <felix.hamborg@uni-konstanz.de>
 */
function UiBuilder() {
    var that = this;

    /**
     * Builds the complete form
     * @param {type} optionsForm
     * @param {type} options
     * @param {type} optionCategories
     * @param {type} optionChangeListener
     * @returns {undefined}
     */
    UiBuilder.prototype.buildForm = function (optionsForm, options, optionCategories, optionChangeListener) {
        var metaOptions = options.metaOptions;
        $.each(options, function (optionCategory, optionCategoryValues) {
            // check which kind of GUI element we need to create
            if (metaOptions.dropdownNames.indexOf(optionCategory) !== -1) {
                optionCategories[optionCategory] = that.createDropdown(
                        optionsForm,
                        optionCategory,
                        optionCategoryValues,
                        optionChangeListener);
            } else if (metaOptions.textinputNames.indexOf(optionCategory) !== -1) {
                optionCategories[optionCategory] = that.createTextinput(
                        optionsForm,
                        optionCategory,
                        optionCategoryValues,
                        optionChangeListener);
            } else if (metaOptions.buttonNames.indexOf(optionCategory) !== -1) {
                optionCategories[optionCategory] = that.createButtonInput(
                        optionsForm,
                        optionCategory,
                        optionCategoryValues,
                        optionChangeListener);
            }
        });
    };

    /**
     * Creates a dropdown for the category and given values. Also creates an on change listener for this.
     * @param {type} parent
     * @param {type} optionName
     * @param {type} values
     * @returns {undefined} the hidden select field which we can use to read the selected value
     */
    UiBuilder.prototype.createDropdown = function (parent, optionName, values, optionChangeListener) {
        var idCategorySelect = optionName + "_select";
        var idCategorySelectContainer = idCategorySelect + "_container";
        parent.append('\
        <div class="field">\
        <label>' + optionName + '</label>\n\
        <div class="ui selection dropdown">\n\
        <input name="' + idCategorySelect + '" id="' + idCategorySelect + '" type="hidden">\n\
        <div class="default text">' + optionName + '</div><i class="dropdown icon"></i>\n\
        <div class="menu ui transition hidden" id="' + idCategorySelectContainer + '">\n\
        </div></div></div>');
        $.each(values, function (i, item) {
            $('#' + idCategorySelectContainer)
                    .append($('<div>', {
                        class: "item",
                        value: item,
                        text: item,
                        "data-value": item
                    }));
        });
        var selectfield = $('#' + idCategorySelect);
    /*    var dropdown = selectfield.parent();
        dropdown.dropdown();
        dropdown.data()
                .moduleDropdown
                .action
                .activate(undefined, values[0]);
        // create the on change listener
        selectfield.change(optionChangeListener); */

        return selectfield;
    };

    UiBuilder.prototype.createButtonInput = function (parent, optionName, values, optionChangeListener) {
        var idOptionInput = optionName + "_buttoninput";
        parent.append('\
<div class="field">\
    <label>' + optionName + '</label>' +
                '<div class="ui buttons" id="' + idOptionInput + '">' +
                '</div>' +
                '</div>');

        var buttoncontainer = $('#' + idOptionInput);
        _.each(values, function (value) {
            buttoncontainer.append('<button class="ui button">' + value + '</button>')
                    .click(function (evt) {
                        //console.log($('#' + this.id).text());
                        optionChangeListener('button', optionName, $('#' + this.id).text());
                    });
        });

        return buttoncontainer;
    };

    /**
     * Creates a text input field.
     * @param {type} parent
     * @param {type} category
     * @param {type} defaultvalue
     * @returns {undefined} the input field
     */
    UiBuilder.prototype.createTextinput = function (parent, optionName, defaultvalue, optionChangeListener) {
        var idOptionInput = optionName + "_textinput";
        parent.append('\
<div class="field">\
    <label>' + optionName + '</label>\
    <div class="ui input">\n\
        <input type="text" placeholder="' + optionName + '" id="' + idOptionInput + '" >\
    </div>\n\
</div>');

        var input = $('#' + idOptionInput);
        input.val(defaultvalue);

        // create the on change listener
        input.change(optionChangeListener);

        return input;
    };


}
