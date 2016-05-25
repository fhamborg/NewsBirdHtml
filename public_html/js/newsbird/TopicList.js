/* 
 * Author: Felix Hamborg <felix.hamborg@uni-konstanz.de>
 */

function TopicList() {
    
    var topicExpanded = false;
    var expandedTopic = null;
    var that = this;
    this.selectedTopicIds = new Set();
    this.sortType = "topic frequency";
    this.backgroundColor = "topic id";
    this.currentTopicIds = null;
    var colorsForCellBackgroundTopicLikeliness = colorbrewer.RdYlGn["11"];
    var scaleTopicLikeliness = d3
            .scale.sqrt().domain([-10, 10])
            .rangeRound([0, colorsForCellBackgroundTopicLikeliness.length - 1]).clamp(true);
    this.menu = [
        {
            title: 'Sort matrix by this topic',
            action: function (elm, d, i) {
                
                matrixVisualization.onChangeSorting("by_topic_frequency", parseInt(d));
            }
        },
        {
            title: 'Search for this Topic',
            action: function (elm, d, i) {
                var topicId = d;
                var topic = cellInformationManager.getCellInfo().topics[topicId];
                //console.log(topic);

                var topicField = queryManager.getGuiQuery()["topicField"];

                //var topTerms = "+" + topicField + ":(" + topic.topTerms.join(" ") + ")^1000";
                //var terms = "+" + topicField + ":(" + topic.allTerms.join(" ") + ")";
                //var query = topTerms + " " + terms;

                var fewRequired = topic.topTerms.join(" ");
                var additional = topic.allTerms.join(" ");

                // add to userFilter
                queryManager.setUserQuery(fewRequired, additional);
                //queryManager.setUserQuery(topic.topTerms.join(" ") + " " + topic.allTerms.join(" "));
                //queryManager.setUserQuery(topic.topTerms.join(" "));
                // send query
                queryManager.onSubmitQuery();
            }
        },
        {
            title: 'Show Articles',
            action: function (elm, d, i) {
                var topicId = d;
                var topic = cellInformationManager.getCellInfo().topics[topicId];
                articleListView.showArticleIds(topic.attributes.Summaries.topDocumentIds, topic.topTerms.join(" | "));
            }
        }
    ];


    var createHtmlForDescription = function (topic, showOtherTopSentences) {
        var otherTopSentences = "";
        if (showOtherTopSentences === true) {
            otherTopSentences = '<div class="bulleted list">';

            _.each(TopicHandler.getSentencesScores(topic), function (value, index) {
                if (index === 0)
                    return;

                otherTopSentences += '<div class="item">' + value.value + '</div>';
            });

            otherTopSentences += '</div>';
        }

        /*var topTerms = "";
         _.each(topic.topTerms, function (item) {
         topTerms += '<div class="ui label">' + item + '</div>';
         });*/

        return "<p>" + topic.topTerms.join(" | ") + "</p>"
                //+ TopicHandler.getCellCount(topic) + ' <i class="grid layout icon"></i> '
                //+ topic.id + ' <i class="code icon"></i>'
                + otherTopSentences;
    };
    /**
     * 
     * @param {type} a topic id
     * @param {type} b topic id
     * @returns {Number}
     */
    
    TopicList.sortByCellFrequency = function (a, b) {
        var acount = TopicHandler.getCellCount(cellInformationManager.getCellInfo().topics[a]);
        var bcount = TopicHandler.getCellCount(cellInformationManager.getCellInfo().topics[b]);
        if (acount < bcount)
            return 1;
        if (acount > bcount)
            return -1;
        return 0;
    };
    TopicList.sortByTimeLikeliness = function (a, b) {
        var vala = cellInformationManager.getCellInfo().topics[a].attributes.timeOccurrenceLikeliness;
        var valb = cellInformationManager.getCellInfo().topics[b].attributes.timeOccurrenceLikeliness;
        if (Math.abs(vala) < Math.abs(valb))
            return 1;
        if (Math.abs(vala) > Math.abs(valb))
            return -1;
        return 0;
    };
    
    TopicList.prototype.initialize = function () {
        $('#infoTopicListSortDropdown').change(function () {
            that.onListSortingChanged();
        });
        $('#infoTopicListBackgroundColorDropdown').change(function () {
            that.onBackgroundColorChanged();
        });
    };
    TopicList.prototype.onBackgroundColorChanged = function () {
        this.backgroundColor = $('#infoTopicListBackgroundColorDropdown').val();
        console.log("changed sorting to " + this.backgroundColor);
        this.showTopics(this.currentTopicIds);
    };
    TopicList.prototype.onListSortingChanged = function () {
        this.sortType = $('#infoTopicListSortDropdown').val();
        console.log("changed sorting to " + this.sortType);
        this.showTopics(this.currentTopicIds);
    };
    /**
     * Invoked when there is a change in the selection of topics.
     * @returns {undefined}
     */
    TopicList.prototype.onTopicSelectionChanged = function () {
        console.log("onTopicSelectionChanged");
        //matrixVisualization.onTopicSelectionChanged(this.selectedTopicIds);
    };
    /**
     * Shows topics in the topic list view.
     * @param {type} topicsWithId Map of topic ids with topic.
     * @returns {undefined}
     */
    TopicList.prototype.showTopics = function (topicIds) {
        try{
        //console.log("SHOWTOPICS "+topicIds.toString());
    }catch(e){
        //console.log("SHOWTOPICS all");
    }
        var cellBackgroundColor = clientSideOptionManager.getVisOptions().cellBackgroundColor;
        var cellImportanceMeasurement = clientSideOptionManager.getVisOptions().cellImportanceMeasurement;
        // if topic ids are given, display them
        if (topicIds !== null) {
            // remove everything
            d3.select("#infoTopicList").html("");
            this.currentTopicIds = topicIds.slice(0);
            if (this.sortType === "topic frequency") {
                topicIds = topicIds.sort(TopicList.sortByCellFrequency);
            } else if (this.sortType === "topic time likeliness") {
                topicIds = topicIds.sort(TopicList.sortByTimeLikeliness);
            }

            // create new list
            var topicListWaitIconIdBase = "topicListWaitIconId";
            var topicListElementIdBase = "topicListElementId";
            var topicList = d3.select("#infoTopicList");
            var topicListElement = topicList.selectAll("div")
                    .data(topicIds)
                    .enter()
                    .append("div")
                    .attr("class", "item")
                    .attr("id", function (d) {
                        var curTopic = cellInformationManager.getCellInfo().topics[d];
                        //  console.log(curTopic.attributes.Summaries.topDocumentIds);
                        return topicListElementIdBase + curTopic.id;
                    })
                    .style("background-color", function (d) {
                        if (that.backgroundColor === "topic id") {
                            if (cellBackgroundColor === "topicId") {
                                var curTopic = cellInformationManager.getCellInfo().topics[d];
                                var topicPos = cellInformationManager.getTopicPosByTopicId(curTopic.id);
                                return matrixVisualization.getColorsForCellBackgroundTopicColor()[topicPos];
                            }
                        }
                        else if (that.backgroundColor === "topic time likeliness") {
                            var curTopic = cellInformationManager.getCellInfo().topics[d];
                            //console.log(curTopic.id);
                            //console.log(scaleTopicLikeliness(curTopic.attributes.timeOccurrenceLikeliness));
                            return colorsForCellBackgroundTopicLikeliness[scaleTopicLikeliness(curTopic.attributes.timeOccurrenceLikeliness)];
                        }
                        return;
                    })
                    /*.on("click", function (d) {              
                        var topicId = d;
                        var topic = cellInformationManager.getCellInfo().topics[topicId];
                        articleListView.showArticleIds(topic.attributes.Summaries.topDocumentIds, "Articles for the Keywords " + topic.topTerms.join(" | "));
                        /*
                        var curTopic = cellInformationManager.getCellInfo().topics[d];
                        //var wasSelected = d3.select(this).classed("isSelected");
                        d3.select(this).classed("isSelected", !wasSelected);
                        console.log(curTopic);
                        if (wasSelected) {
                            // is not selected anymore
                            that.selectedTopicIds.delete(curTopic.id);
                        } else {
                            that.selectedTopicIds.add(curTopic.id);
                        }

                        that.onTopicSelectionChanged();
                    }) */
                    .on("click", function (d) {
                        var curTopic = cellInformationManager.getCellInfo().topics[d];
                        // no topic is expanded
                        if (!topicExpanded)
                        {
                            that.currentTopicIdHovered = curTopic;
                            d3.select("#" + topicListElementIdBase + curTopic.id).select(".content .description").html(createHtmlForDescription(curTopic, true));
                            matrixVisualization.onTopicHoverChanged(curTopic.id, true);
                            topicExpanded = true;
                            expandedTopic = curTopic;
                        }
                        // topic is already expanded
                        else
                        {
                            var curTopic = cellInformationManager.getCellInfo().topics[d];
                            
                            // click is on same topic
                            if (expandedTopic === curTopic)
                            {
                                d3.select("#" + topicListElementIdBase + curTopic.id).select(".content .description").html(createHtmlForDescription(curTopic, false));
                                matrixVisualization.onTopicHoverChanged(curTopic.id, false);
                                topicExpanded = false;
                            }
                            
                            // click is on different topic
                            else
                            {
                                d3.select("#" + topicListElementIdBase + expandedTopic.id).select(".content .description").html(createHtmlForDescription(expandedTopic, false));
                                matrixVisualization.onTopicHoverChanged(expandedTopic.id, false);
                                that.currentTopicIdHovered = curTopic;
                                d3.select("#" + topicListElementIdBase + curTopic.id).select(".content .description").html(createHtmlForDescription(curTopic, true));
                                matrixVisualization.onTopicHoverChanged(curTopic.id, true);
                                topicExpanded = true;
                                expandedTopic = curTopic;
                            }
                        }
                    })
                    /*.on("mouseleave", function (d) {
                        var curTopic = cellInformationManager.getCellInfo().topics[d];
                        d3.select("#" + topicListElementIdBase + curTopic.id).select(".content .description").html(createHtmlForDescription(curTopic, false));
                        matrixVisualization.onTopicHoverChanged(curTopic.id, false);
                        
   //console.log("mouseleave");                     
                    })*/
                  //  .on("contextmenu", d3.contextMenu(that.menu))
                  //  ;
            var topicListElementContent = topicListElement.append("div").attr("class", "middle aligned content");
            
            topicListElementContent
                    .append("div")
                    .attr("class", "header")
                    .text(function (d) {
                        var curTopic = cellInformationManager.getCellInfo().topics[d];
                        var topTerms = curTopic.topTerms.slice(0, 3);
                        //return topTerms.join(" | ");
                        return TopicHandler.getSentence(curTopic);
                    });

        /*    topicListElementContent
                    .append("div")
                    .attr("class", "sidebar icon")
                    .html("<i class='sidebar icon'></i>");*/
            
            topicListElementContent
                    .append("div")
                    .attr("class", "description")
                    .html(function (d) {
                        //"<i class='code icon'></i>";
                        var curTopic = cellInformationManager.getCellInfo().topics[d];
                        //console.log("WTF ="+curTopic.id);
                        // try to get an image for this topic
                        // get the image from the top articles
                        imageQueryHandler.getImageFromArticleIds(curTopic.attributes.Summaries.topDocumentIds, function (imgUrl) {
                            //console.log(curTopic.id);
                            //console.log(curTopic.attributes.Summaries.topDocumentIds);
                            //console.log("img = "+imgUrl);
                            // remove icon and add image
                            topicListElement.select("#" + topicListWaitIconIdBase + curTopic.id).remove();
                            //d3.select("#" + topicListElementIdBase + curTopic.id).selectAll("img").remove();

                            // sometimes it might occur that the images are inserted multiply (probably due to network problems)
                            // thus remove all old images -> this is a very dirty hack, because actually the problem should be solved somewhere else
                            //d3.select("#" + topicListElementIdBase + curTopic.id)
                             //       .selectAll(".image")
                              //      .remove();
                            d3.select("#" + topicListElementIdBase + curTopic.id)
                                .insert("div", ":first-child")
                                .attr("class", "sidebar icon")
                                .attr("horizontal-align", "top")
                                .attr("border", "1px black solid")
                                .html("<i class='sidebar icon'></i><br/><br/>")
                                .on("click",d3.contextMenu(that.menu))

                                .style("vertical-align","top")
                                .attr("class", "ui tiny bordered image")
                                .insert("img")
                                .attr("src", imgUrl);
                                
                      /*      d3.select("#" + topicListElementIdBase + curTopic.id)
                                    .insert("div")
                                    .attr("class", "ui tiny bordered image")
                                    .append("img")
                                    .attr("src", imgUrl)*/

                        });

                        // use topic terms on google image search
                        /*var topTerms = curTopic.topTerms.slice(0, 3);
                         imageQueryHandler.requestImageForTokenArray(topTerms, function (data) {
                         //console.log(data);
                         if (data === null) {
                         //    console.log("server returned no icon for " + topTerms.toString());
                         } else {
                         // remove icon and add image
                         topicListElement.select("#" + topicListWaitIconIdBase + curTopic.id).remove();
                         //d3.select("#" + topicListElementIdBase + curTopic.id).selectAll("img").remove();
                         
                         d3.select("#" + topicListElementIdBase + curTopic.id)
                         .insert("div", ":first-child")
                         .attr("class", "ui tiny image")
                         .append("img")
                         .attr("src", data);
                         }
                         });*/

                        return createHtmlForDescription(curTopic, false);
                    });

        } else {
            // if no topics are given, we show as default all topics
            //console.log(cellInformationManager.getCellInfo().topics);
            this.showTopics(Object.keys(cellInformationManager.getCellInfo().topics));
        }
    };
    
    this.initialize();
}

