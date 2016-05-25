function TopicHandler() {

}

/**
 * Returns a summarization sentence for the given topic
 * @param {type} topic
 * @returns {undefined}
 */
TopicHandler.getSentence = function (topic, i) {
    if (i === undefined) {
        i = 0;
    }
    var sentences = TopicHandler.getSentencesScores(topic);
    //console.log(topic.id);
    //console.log(sentences);
    return sentences[i].value;
};

TopicHandler.getSentencesScores = function (topic) {
    return  topic.attributes.Summaries.summaries.TITLE.topSentences;
};

/**
 * Returns the number of cells this topic is involved.
 * @param {type} topic
 * @returns {unresolved}
 */
TopicHandler.getCellCount = function (topic) {
    return topic.cellCount;
};

TopicHandler.calculateTopicOverlap = function (topicIds) {
    _.each(topicIds, function (topicId) {
        var curTopic = cellInformationManager.getCellInfo().topics[topicId];
        var curTopicTopDocs = curTopic.attributes.Summaries.topDocumentIds;

        console.log("=======================================");

        _.each(topicIds, function (topicIdMerge) {
            if (topicId === topicIdMerge)
                return; // continue with next topic (skip this one, i.e., 'continue')

            var mergeCandidateTopic = cellInformationManager.getCellInfo().topics[topicIdMerge];
            var mergeCandidateTopicTopDocs = mergeCandidateTopic.attributes.Summaries.topDocumentIds;

            var intersectedTopDocs = _.intersection(curTopicTopDocs, mergeCandidateTopicTopDocs);

            //console.log(topicId + " | " + topicIdMerge + " : " + intersectedTopDocs.toString());

            var maxNumberOfIntersectedTopDocs = Math.min(curTopicTopDocs.length, mergeCandidateTopicTopDocs.length);
            var actualNumberOfIntersectedTopDocs = intersectedTopDocs.length;
            var ratioIntersectedTopDocs = actualNumberOfIntersectedTopDocs / maxNumberOfIntersectedTopDocs;
            if (ratioIntersectedTopDocs > 0)
                console.log(topicId + " | " + topicIdMerge + " : " + ratioIntersectedTopDocs);

            //  console.log("===================");

        });
    });
};