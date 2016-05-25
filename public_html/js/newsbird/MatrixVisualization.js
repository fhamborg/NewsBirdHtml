/* 
 * Author: Felix Hamborg <felix.hamborg@uni-konstanz.de>
 */
function MatrixVisualization(par) {
    var that = this;
    // constants
    var margin = {top: 50, right: 50, bottom: 50, left: 50};
    var cellSize = 180;
    var cellTextSize = "7em";
    // our actual data values
    var rowDimension = null;
    var columnDimension = null;
    var rowLabelTexts = [];
    var colLabelTexts = [];
    var colNumber = colLabelTexts.length;
    var rowNumber = rowLabelTexts.length;
    var matrixEntries = {};
    this.topicListView = new TopicList();
    //this.articleListView = new ArticleList();

    var timeout;

    // visual variables
    var parent = par;
    var width = -1;
    var height = -1;
    var colorsForCellBackgroundTopicImportance = colorbrewer.Greens["9"];
    var colorsForCellBackgroundTopicColor = colorbrewer.Set3["12"];
    var menu = [
        {
            title: 'Open Top Article',
            action: function (elm, d, i) {
                getTopArticleOfCellByTopSummarizationSentence(d, function (article) {
                    window.open(article.url);
                });
            }
        },
        {
            title: 'Show All Topic Articles',
            action: function (elm, d, i) {
                articleListView.showArticleIds(d.topSummarizationDocumentIds, + 'Top Topics for' + d.row + " | " + d.column);
            }
        },
        {
            title: 'Show Country Related Articles',
            action: function (elm, d, i) {
                articleListView.showArticleIds(d.cellDocumentIds, 'All Topics for' + d.row + " | " + d.column);
            }
        }
    ];
    /**
     * Returns the color for the background of a cell mapped to a topic id.
     * @returns {colorbrewerSet3.12}
     */
    MatrixVisualization.prototype.getColorsForCellBackgroundTopicColor = function () {
        return colorsForCellBackgroundTopicColor;
    };
    // behavior
    var zoom = d3.behavior.zoom()
            .scaleExtent([0, 10])
            .on("zoom", zoomed);
    this.container = undefined;
    // components

    // accessors for cell data
    var countTotalDocsMatchingCellQueryAccessor = function (d) {
        return d.countTotalDocsMatchingCellQuery;
    };
    var countTotalCellDocsAccessor = function (d) {
        return d.countDocs;
    };
    // is called on zooming and panning (god knows why)
    var zoomOldTranslate = undefined;
    var zoomOldScale = undefined;
    function zoomed() {
        if (d3.event !== null && d3.event.translate !== undefined) {
            zoomOldTranslate = d3.event.translate;
        }
        if (d3.event !== null && d3.event.scale !== undefined) {
            zoomOldScale = d3.event.scale;
        }
        if (zoomOldTranslate === undefined) {
            zoomOldTranslate = 0;
        }
        if (zoomOldScale === undefined) {
            zoomOldScale = 1;
        }
        that.container.attr("transform", "translate(" + zoomOldTranslate + ")scale(" + zoomOldScale + ")");
    }

    var calculateSortingByFullRowsAndCols = function () {
        rowLabelTexts.sort(function (a, b) {
            var cellsA = cellInformationManager.getCellsOfRow(a);
            var cellsB = cellInformationManager.getCellsOfRow(b);
            var counta = 0, countb = 0;
            _.each(cellsA, function (cell) {
                if (cell.value.length > 0) {
                    counta++;
                }
            });
            _.each(cellsB, function (cell) {
                if (cell.value.length > 0) {
                    countb++;
                }
            });

            return countb - counta;
        });
        colLabelTexts.sort(function (a, b) {
            var cellsA = cellInformationManager.getCellsOfColumn(a);
            var cellsB = cellInformationManager.getCellsOfColumn(b);
            var counta = 0, countb = 0;
            _.each(cellsA, function (cell) {
                if (cell.value.length > 0) {
                    counta++;
                }
            });
            _.each(cellsB, function (cell) {
                if (cell.value.length > 0) {
                    countb++;
                }
            });

            return countb - counta;
        });
        rowDimension.domain(rowLabelTexts);
        columnDimension.domain(colLabelTexts);
    };

    var calculateSortingByTopicFrequency = function (topicId) {
        rowLabelTexts.sort(function (a, b) {
            var cellsA = cellInformationManager.getCellsOfRow(a);
            var cellsB = cellInformationManager.getCellsOfRow(b);
            var topicCountA = 0;
            var topicCountB = 0;
            $.each(cellsA, function (index, cell) {
                if (_.contains(cell.topicIds, topicId)) {
                    topicCountA++;
                }
            });
            $.each(cellsB, function (index, cell) {
                if (_.contains(cell.topicIds, topicId)) {
                    topicCountB++;
                }
            });
            return topicCountB - topicCountA;
        });
        colLabelTexts.sort(function (a, b) {
            var cellsA = cellInformationManager.getCellsOfColumn(a);
            var cellsB = cellInformationManager.getCellsOfColumn(b);
            var topicCountA = 0;
            var topicCountB = 0;
            $.each(cellsA, function (index, cell) {
                if (_.contains(cell.topicIds, topicId)) {
                    topicCountA++;
                }
            });
            $.each(cellsB, function (index, cell) {
                if (_.contains(cell.topicIds, topicId)) {
                    topicCountB++;
                }
            });
            return topicCountB - topicCountA;
        });
        rowDimension.domain(rowLabelTexts);
        columnDimension.domain(colLabelTexts);
        //console.log(colLabelTexts);
    };
    MatrixVisualization.prototype.onCellClicked = function (d) {
        console.log("clicked on: ");
        console.log(d.sentenceScoreByMatrixLM);
        console.log(d);
    };
    MatrixVisualization.prototype.onTopicHoverChanged = function (topicId, isHover) {
        //console.log("LOL");
        var topicIds = topicId;
        if (Object.prototype.toString.call(topicId) !== '[object Array]') {
            topicIds = [topicId];
        }

        d3.select("#vis").selectAll(".cell").each(function (d) {
            // check if this cell has this topic as a cell-topic
            if (_.intersection(d.topicIds, topicIds).length > 0) {
                d3.select(this).classed("cell-hover", isHover);
            } else {
                d3.select(this).classed("cell-hover", false);
            }
        });
    };
    MatrixVisualization.prototype.onCellHoverChanged = function (uiElement, d, isHover) {
        //console.log("onCellHoverChanged");
        //highlight text
        d3.select(uiElement).select("rect").classed("cell-hover", isHover);
        d3.selectAll(".rowLabel").classed("text-highlight", function (r, ri) {
            return isHover && ri == (d.row - 1);
        });
        d3.selectAll(".colLabel").classed("text-highlight", function (c, ci) {
            return isHover && ci == (d.col - 1);
        });
        // according to http://stackoverflow.com/questions/18554224/getting-screen-positions-of-d3-nodes-after-transform/18561829 
        // we get the "absolute" position of the ui element (which is the transformed g which contains the rect etc)
        // by calling getBoundingClientRect()
        var coords = uiElement.getBoundingClientRect();
        //Update the tooltip position and value
        that.showCellTooltip(d, isHover, coords);
        that.showCellTopics(d, isHover);
        this.onTopicHoverChanged(d.topicIds, isHover);
    };
    /**
     * Is invoked by TopicList when a topic / multiple topics is / are selected
     * @returns {undefined}
     */
    MatrixVisualization.prototype.onTopicSelectionChanged = function (topicIds) {
        var arrayTopicIds = [];
        topicIds.forEach(function (d) {
            arrayTopicIds[arrayTopicIds.length] = d;
        });
        d3.select("#vis").selectAll(".cell").each(function (d) {
            // check if this cell has this topic as a cell-topic
            if (_.intersection(d.topicIds, arrayTopicIds).length > 0) {
                d3.select(this).classed("cell-selected", true);
            } else {
                d3.select(this).classed("cell-selected", false);
            }
        }
        );
    };
  /*  var createInfoTableForCell = function (cell) {
        var row = function (name, info) {
            return '<tr><td>' + name + '</td><td>' + info + '</td></tr>';
        };
        var html = '<table class="ui very basic collapsing celled table">'
                /*+ '<thead>'
                 + '<tr><th>Key</th>'
                 + '<th>Val</th>'
                 + '</tr></thead>'
                + '<tbody>';
        html += row('Topic-IDs', cell.topicIds.join(", "))
                + row('# Cell-Documents', cell.countDocs)
                + row('# Cell-Summarization-Docs', cell.topSummarizationDocumentIds.length)
                ;
        html += '</tbody></table>';
        return html;
    };*/
    var getTopArticleOfCellByTopSummarizationSentence = function (cell, callback) {
        var topSentence = cell.fullSentences[0].value;
        var topArticleId = cell.topSentencesToLightDocIds[topSentence][0];
        articleHandler.getFullArticleFromId(topArticleId, callback);
    };
    var createInfoOfTopArticle = function (article, imgUrl) {
        var html = '<b><h5>' + article.title + '</h5></b><br>';
        if (imgUrl !== null) {
            html += '<div class="ui grid">'
                    + '<div class="ten wide column">' + '<p>' + article.description + '</p>' + '</div>'
                    + '<div class="four wide column"><img class="ui large image" src="' + imgUrl + '"></div>';
        } else {
            html += '<p>' + article.description + '</p>';
        }

        //imageQueryHandler.getImageFromWebsite()

        return html;
    };
    MatrixVisualization.prototype.showCellTooltip = function (cell, isShow, coords) {
        if (isShow) {
            var tooltip = d3.select("#tooltip")
                    //.style("left", (d3.event.pageX + 10) + "px")
                    .style("left", (coords.left + coords.width + 10) + "px")
                    //.style("top", (d3.event.pageY - 10) + "px");
                    .style("top", (coords.top - 36 + 18) + "px"); // the 36px is exactly the same amount as the margin of #bodyContent (which we need to use due to the sticky menubar on the top)
            // edit: looks like we also need another 18 px, dont ask me why

            // clear old content
            tooltip.html("");
            // create tooltip
            tooltip.append("div")
                    .attr("class", "ui huge header")
                    .text(cell.row + " | " + cell.column);
            // show table with some information
            /*tooltip.append("div")
                    .attr("class", "content")
                    .html(function () {
                        //'<div class="ui label">Topics<div class="detail">' + cell.countTopics + '</div></div>'+
                        return createInfoTableForCell(cell);
                    });*/
            // show top article information
            tooltip.append("div")
                    .attr("class", "content")
                    .text(function () {
                        var uiElement = this;
                        getTopArticleOfCellByTopSummarizationSentence(cell, function (article) {
                            imageQueryHandler.getImageFromWebsite(article.url, function (imgUrl) {
                                d3.select(uiElement).html(createInfoOfTopArticle(article, imgUrl));
                            });
                        });
                    });
            //Show the tooltip
            d3.select("#tooltip").classed("visible", true);
        } else {
            d3.select("#tooltip").classed("visible", false);
        }
    };
    MatrixVisualization.prototype.showCellTopics = function (cell, isShow) {
        if (isShow) {
            this.topicListView.showTopics(cell.topicIds);
        } else {
            this.topicListView.showTopics(null);
        }
    };
    /**
     * For a given cell this creates DOM element(s) that contain the visual information.
     * @param {type} cell
     * @returns {unresolved}
     */
    MatrixVisualization.prototype.createTextForCell = function (cell) {
        try {
            var array = cell.value;
            var minfontsize = 1;
            var maxfontsize = 2; // 2em
            var minscore = array[array.length - 1].score;
            var maxscore = array[0].score;
            if (minscore === maxscore)
                minscore -= 1;
            var parent = $('<div />');
            var doccount = $('<span />')
                    .css('font-size', maxfontsize + "em")
                    .html("#" + cell.countDocs + " "
                            + "[" + cell.topicIds + "] ");
            //parent.append(doccount);

            var fontscale = d3
                    .scale.linear().domain([minscore, maxscore])
                    .range([minfontsize, maxfontsize]);
            $.each(array, function (i, tokenscore) {
                //console.log(tokenscore);
                var span = $('<span />').css('font-size', fontscale(tokenscore.score) + "em").html(tokenscore.value + " ");
                parent.append(span);
            });
            //console.log(parent.html());
            //return parent.html();
            var test = "";
            $.each(array, function (i, tokenscore) {
                test += tokenscore.value + " ";
            });
            
            var trimmedString = test.replace(/^(.{70}[^\s]*).*/, "$1");
            if (trimmedString.length < test.length){
                trimmedString += "...";
            }
            return trimmedString;
        } catch (e) {
            //return e;
            return "";
        }
    };
    
    /**
     * Renders the row axis labels.
     * @returns the created selection
     */
    MatrixVisualization.prototype.renderAxisLabels = function (isRowLabels) {
        var myData = rowLabelTexts;
        //var myCounts = cellInformationManager.getCellInfo().rowDocCounts;
        if (!isRowLabels) {
            myData = colLabelTexts;
            //myCounts = cellInformationManager.getCellInfo().columnDocCounts;
        }
        var labels = null;
        if (isRowLabels)
            labels = this.container.append("g")
                    .attr("id", "rowLabelsg")
                    .selectAll(".rowLabelg")
                    .data(myData)
                    .enter()
                    .append("g")
                    .attr("class", ".rowLabelg");
        else
            labels = this.container.append("g")
                    .attr("id", "colLabelsg")
                    .selectAll(".colLabelg")
                    .data(myData)
                    .enter()
                    .append("g")
                    .attr("class", ".colLabelg");
        // place labels in rows / columns
        labels.attr("transform", function (d, i) {
            if (isRowLabels) {
                return "translate(-30,"
                        + (rowDimension(d) + 0.5 * cellSize)
                        + ")";
            } else {
                return "translate("
                        + (columnDimension(d) + 0.5 * cellSize)
                        + ",-30)";
            }
        })
                .attr("x", 0)
                .attr("y", 0)
                ;
        // display labels
        labels.append("text")
                .style("text-anchor", "middle")
                .text(function (d, i) {
                    return d;
                })
                ;
                
        // append flags
        labels.append("foreignObject")
                .attr("x", -12)
                .attr("y", 2)
                .attr("width", 30)
                .attr("height", 30)
                .append("xhtml:span")
                .attr("class", function (d) {
                    // try to get the code from the name
                    var code = countryNames.getCodeFromName(d);
                    // if d is not a country name, code will be undefined
                    if (code === undefined) {
                        // set code to d (which makes sense if d is a country code itself)
                        code = d;
                    }
                    code = code.toLowerCase();
                    // catch known cases without flags
                    
                    if (code === "britain|england"){
                        code = "gb";
                    }
                    if (code === "usa|united states"){
                        code = "us";
                    }
                    if (code === "usa'united states'"){
                        code = "us";
                    }
                    if (code.length === 2) {
                        // we might have a country code in here, if not, the css class will not be defined and no icon is displayed
                        return "flag-icon flag-icon-" + code;
                    } else {
                        return "";
                    }
                })
                ;
        return labels;
    };
    MatrixVisualization.prototype.initializeScales = function () {
        // get the minimum and maximum total docs matching query for the scale
        var maxCountTotalCellDocs = countTotalCellDocsAccessor(_.max(matrixEntries, countTotalCellDocsAccessor));
        var maxCountTotalDocsMatchingQuery = countTotalDocsMatchingCellQueryAccessor(_.max(matrixEntries, countTotalDocsMatchingCellQueryAccessor));
        var maxTopicCommonality = _.max(cellInformationManager.getCellInfo().topics, function (topic) {
            return topic.cellCount;
        }).cellCount;
        // base scales
        this.scaleSentenceProbability = d3
                .scale.linear().domain([-100, 1]).rangeRound([0, colorsForCellBackgroundTopicImportance.length - 3]);
        this.scaleCountTotalDocsMatchingQuery = d3
                .scale.linear().domain([0, maxCountTotalDocsMatchingQuery]).range([1, 100]);
        this.scaleCountTopicDocs = d3
                .scale.linear().domain([0, maxCountTotalCellDocs]).range([1, 100]);
        // abstracted scales
        this.scaleTopicQueryCellQueryRatioInCell = d3
                .scale.log().domain([1 / 100, 100 / 1])
                .rangeRound([colorsForCellBackgroundTopicImportance.length - 3, 0]);
        this.scaleTopicCommonalityInCell = d3
                .scale.log().domain([1, maxTopicCommonality])
                .rangeRound([0, colorsForCellBackgroundTopicImportance.length - 3]);
        console.warn("scales are log()");
    };
    var getTopicById = function (topicId) {
        return cellInformationManager.getCellInfo().topics[topicId];
    };
    var getMostFrequentTopicIdInCell = function (cell) {
        // if the cell has actually no summarization cell docs, then we conclude it also has no topic (even though for whatever reason it could actually have a topic)
        if (cell.topSummarizationDocumentIds.length === 0) {
            return null;
        }

        return _.max(cell.topicIds, function (topicId) {
            return cellInformationManager.getCellInfo().topics[topicId].cellCount;
        });
    };
    MatrixVisualization.prototype.calcCellBackground = function (d) {
        var cellBackgroundColor = clientSideOptionManager.getVisOptions().cellBackgroundColor;
        switch (cellBackgroundColor) {
            case "cellImportanceMeasurement":
                var cellImportanceMeasurement = clientSideOptionManager.getVisOptions().cellImportanceMeasurement;
                switch (cellImportanceMeasurement) {
                    case "topicQuery-cellQuery-ratio":
                        var normalizedCountTotalDocsMatchingQuery = that.scaleCountTotalDocsMatchingQuery(countTotalDocsMatchingCellQueryAccessor(d));
                        var normalizedCountTopicDocs = that.scaleCountTopicDocs(d.countDocs);
                        // console.log(normalizedCountTotalDocsMatchingQuery + "  |  " + normalizedCountTopicDocs);

                        var topicImportanceInCellValue = normalizedCountTotalDocsMatchingQuery / normalizedCountTopicDocs;
                        //  console.log(topicImportanceInCellValue);
                        var t = that.scaleTopicQueryCellQueryRatioInCell(topicImportanceInCellValue);
                        //  console.log(t);
                        return colorsForCellBackgroundTopicImportance[ t];
                    case "maxTopicFrequencyInCell":
                        var maxTopicCount = getTopicById(getMostFrequentTopicIdInCell(d)).cellCount;
                        var t = that.scaleTopicCommonalityInCell(maxTopicCount);
                        return colorsForCellBackgroundTopicImportance[ t];
                    case "sentenceProbability":
                        var t = that.scaleSentenceProbability(d.sentenceScoreByMatrixLM);
                        console.log(t);
                        return colorsForCellBackgroundTopicImportance[ t];
                }
            case "topicId":
                var topicPos = cellInformationManager.getTopicPosByTopicId(
                        getMostFrequentTopicIdInCell(d));
                return colorsForCellBackgroundTopicColor[topicPos];
        }
    };
    /**
     * initializes the matrix visualization
     * @returns {undefined}
     */
    MatrixVisualization.prototype.draw = function () {
        $('#' + parent.attr('id')).empty();
        this.container = parent.append("svg")
                .attr("width", '100%')//width + margin.left + margin.right)
                .attr("height", '100%')//height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")scale(.75)")
                .call(zoom)
                .append("g")
                ;
        this.renderAxisLabels(true);
        this.renderAxisLabels(false);
        var cell = this.container.append("g").attr("id", "matrixGrid")
                .selectAll(".cellg")
                .data(matrixEntries)
                .enter()
                .append("g")
                .attr("transform", function (d, i) {
                    return "translate("
                            + columnDimension(d.column)
                            + ","
                            + rowDimension(d.row)
                            + ")";
                })
                .on("contextmenu", d3.contextMenu(menu));
        ;
        var cellRectangle = cell
                .append("rect")
                .attr("id", function (d) {
                    return "cell_" + d.row + "_" + d.column;
                })
                .attr("class", "cell cell-border")
                .attr("width", cellSize)
                .attr("height", cellSize)
                .style("fill", that.calcCellBackground);
        var cellContent = cell
                .append("foreignObject")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", cellSize)
                .attr("height", cellSize)
                .append("xhtml:div")
                .attr("class", "cell-content")
                .on("click", function (d) {
                    that.onCellClicked(d);
                })
                .style("background-size", "100% auto")
                .style("background-repeat", "no-repeat")
                .style("background-position", "center")
                /*.style("background-image", function (d) {
                 if (clientSideOptionManager.getVisOptions().cellBackgroundImage === "true") {
                 var imgElement = this;
                 
                 imageQueryHandler.getImageFromArticleIds(d.topSummarizationDocumentIds, function (imgUrl) {
                 console.log(d.row + " | " + d.column + " | " + imgUrl);
                 console.log(d3.select(imgElement));
                 d3.select(imgElement).style("background-image", "url(" + imgUrl + ")");
                 });
                 } else {
                 console.log("non");
                 return "none";
                 }
                 })*/
                ;
        // create a small bar
        /*cell
         .append("rect")
         .attr("x", 10)
         .attr("y", 10)
         .attr("width", 10)
         .attr("height", function (d) {
         return cellSize * scaleCountTopicDocs(d.countDocs) * 0.8;
         })
         .style("fill", "gray");*/

        /*cellContent
         .append("div")
         .append("img")
         .style("width", "100%")
         .style("height", "100%")
         .attr("src", function (d) {
         
         })
         ;*/

        var textContainer = cellContent
                .append("div")
                .attr("class", "textcontainer")
                .style("height", cellSize + "px"); // needs to be done so that vertical centering works, we are in html space again, so we need px
        textContainer
                .append("p")
                // the following two lines are used to avoid text overflowing out of the cell
                //.style("max-height", cellTextSize)
                //.style("overflow", "hidden")
                .text(function (d) {
                    return that.createTextForCell(d);
                });

        // it is critical to use mouseenter instead of mouseover, and mouseleave instead of mouseout!! otherwise, for each children of these cells a separate mouse event may be fired
        // resulting in multiple events and causing finally the topic view to be built multiple times, which reduces performance and also causes multiple images to be shown.
        cell.on("mouseenter", function (d) {
            //console.log("matrix-mouseovercell");
            //console.log(d);
            var tmp = this;
            timeout = setTimeout(function(){that.onCellHoverChanged(tmp, d, true);}, 500);
            //that.onCellHoverChanged(this, d, true);
        });
        cell.on("mouseleave", function (d) {
            //console.log("matrix-mouseoutcell");
            //console.log(d);
            clearTimeout(timeout);
            that.onCellHoverChanged(this, d, false);
        });
        /* cell
         .append("text")
         .attr("x", function (d) {
         return 0;
         })
         .attr("y", cellSize / 2)
         .attr("width", cellSize)
         .attr("heigth", cellSize)
         .text(function (d) {
         //return d.cell.humanReadableId;
         return d.cell.attributes.Summary.topSentences[0].value;
         });*/

        // call the zoom listener to activate the previous zoom status
        zoomed();
        // draw topics
        this.topicListView.showTopics(null);
        // reset articles
        articleListView.showArticles(null);
    };
    /**
     * 
     * @param {type} type
     * @param {type} value
     * @returns {undefined}
     */
    MatrixVisualization.prototype.onChangeSorting = function (type, value) {
        console.log("sorting changed");
        if (type === "by_topic_frequency") {
            // value is the topicId
            calculateSortingByTopicFrequency(value);
            //  this.draw();
        } else if (type === "fullRowsAndCols") {
            calculateSortingByFullRowsAndCols();
        }

        var t = this.container.transition().duration(2000);
        t.select("g#rowLabelsg")
                .selectAll("g")
                .attr("transform", function (d) {
                    return "translate(-30,"
                            + (rowDimension(d) + 0.5 * cellSize)
                            + ")";
                });
        t.select("g#colLabelsg")
                .selectAll("g")
                .attr("transform", function (d) {
                    return "translate("
                            + (columnDimension(d) + 0.5 * cellSize)
                            + ",-30)";
                });
        t.select("g#matrixGrid")
                .selectAll("g")
                .attr("transform", function (d) {
                    return "translate("
                            + columnDimension(d.column)
                            + ","
                            + rowDimension(d.row)
                            + ")";
                });

    };
    
    function mapCountryCodes (countryarray){
        
        var arrayLength = countryarray.length;
        for (var i = 0; i < arrayLength; i++) {
            switch(countryarray[i]) {
                case "US":
                    countryarray[i] = "United States";
                break;
                case "RU":
                    countryarray[i] = "Russia";
                break;
                default:
                    //default code block
            }
        }
    }
    
    /**
     * If anything changes which influences the visualization, this needs to be invoked. 
     * This will update the visualization.
     * @returns {undefined}
     */
    MatrixVisualization.prototype.updateVisualization = function () {
        console.log("need to refresh matrix visualization");
        // do some data preparations
        matrixEntries = cellInformationManager.getCellInfo().cells;
        rowLabelTexts = cellInformationManager.getCellInfo().rows;
        colLabelTexts = cellInformationManager.getCellInfo().columns;
        colNumber = colLabelTexts.length;
        rowNumber = rowLabelTexts.length;
        width = colNumber * cellSize;
        height = rowNumber * cellSize;
        rowDimension = d3.scale.ordinal()
                .domain(cellInformationManager.getCellInfo().rows)
                .rangeBands([0, height]);
        columnDimension = d3.scale.ordinal()
                .domain(cellInformationManager.getCellInfo().columns)
                .rangeBands([0, width]);
        this.initializeScales();
        // render it        
        this.draw();
    };
}
