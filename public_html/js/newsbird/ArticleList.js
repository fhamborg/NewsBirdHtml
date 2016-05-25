/* 
 * Author: Felix Hamborg <felix.hamborg@uni-konstanz.de>
 */

function ArticleList() {
    var that = this;

    this.currentArticles = null;

    this.menu = [
        {
            title: 'test',
            action: function (elm, d, i) {

            }
        }
    ];

    ArticleList.prototype.initialize = function () {
        $('#infoArticleListBtnClose').click(function () {
            that.currentArticles = null;
            that.showArticles(that.currentArticles);
        });
    };

    /**
     * Invoked when there is a change in the selection of articles.
     * @returns {undefined}
     */
    ArticleList.prototype.onArticleSelectionChanged = function () {

    };

    ArticleList.prototype.showArticles = function (articles, title) {
        // remove everything
        d3.select("#infoArticleList").html("");
        d3.select("#infoArticleListTitle").text("");

        if (articles === null) {
            d3.select("#infoArticle").style("display", "none");
            return;
        }

        d3.select("#infoArticle").style("display", "block");
        d3.select("#infoArticleListTitle").text(title);
        this.currentArticles = articles.slice(0);

        // create new list
        var articleListElementIdBase = "articleListElementId";
        var articleList = d3.select("#infoArticleList");
        var articleListElement = articleList.selectAll("div")
                .data(articles)
                .enter()
                .append("div")
                .attr("class", "item")
                .attr("id", function (d, i) {
                    return articleListElementIdBase + i;
                })
                .on("click", function (d) {
                    window.open(d.url);
                })
                .on("mouseover", function (d) {
                    d3.select(this).select(".longtext").select("p").style("display", "inline");
                })
                .on("mouseout", function (d) {
                    d3.select(this).select(".longtext").select("p").style("display", "none");
                })
                ;
        var articleListElementContent = articleListElement.append("div").attr("class", "middle aligned content");
        articleListElementContent
                .append("div")
                .attr("class", "header")
                .text(function (d, i) {
                    imageQueryHandler.getImageFromWebsite(d.url, function (imgUrl) {
                        if (imgUrl !== null) {
                            // remove icon and add image
                            //articleListElement.select("#" + topicListWaitIconIdBase + curTopic.id).remove();
                            //d3.select("#" + topicListElementIdBase + curTopic.id).selectAll("img").remove();

                            d3.select("#" + articleListElementIdBase + i)
                                    .insert("div", ":first-child")
                                    .attr("class", "ui small image")
                                    .append("img")
                                    .attr("src", imgUrl);
                        }
                    });
                    return d.title;
                })
                ;
        articleListElementContent
                .append("div")
                .attr("class", "description")
                .append("p")
                .text(function (d) {
                    return d.channelGuid + " - "
                            //+ moment(d.pubDate).fromNow() + " - "
                            + moment(d.pubDate).format("DD.MM.YY, hh:mm");
                });

        articleListElementContent
                .append("div")
                .attr("class", "longtext")
                .append("p")
                .style("display", "none")
                .text(function (d) {
                    return d.description;
                });



    };

    /**
     * Shows articles in the article list view.
     * @param {type} topicsWithId Map of topic ids with topic.
     * @returns {undefined}
     */
    ArticleList.prototype.showArticleIds = function (articleIds, title) {
        articleHandler.getFullArticleFromId(articleIds, function (articleList) {
            that.showArticles(articleList, title);
        });


    };

    this.initialize();
}
