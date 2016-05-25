/* 
 * Author: Felix Hamborg <felix.hamborg@uni-konstanz.de>
 */
function CellInformationManager() {
    var that = this;
    this.cellInfo = {};
    var topicIdToTopicPos = {};


    var updateData = function () {
        // remove unused rows and columns
        var usedRows = [], usedColumns = [];
        _.each(that.cellInfo.cells, function (cell, index) {
            if (cell.value.length > 0) {
                usedRows.push(cell.row);
                usedColumns.push(cell.column);
            }
        });
        that.cellInfo.rows = that.cellInfo.rows.filter(function (el) {
            return usedRows.indexOf(el) >= 0;
        });
        that.cellInfo.columns = that.cellInfo.columns.filter(function (el) {
            return usedColumns.indexOf(el) >= 0;
        });

        // remove cells that are in an unused row and column
        var tmpCells = [];
        _.each(that.cellInfo.cells, function (cell) {
            if (usedRows.indexOf(cell.row) >= 0 && usedColumns.indexOf(cell.column) >= 0) {
                tmpCells.push(cell);
            }
        });
        that.cellInfo.cells = tmpCells;

        // perform topic to topic position assignment
        var topicIds = Object.keys(that.cellInfo.topics).slice(0);
        topicIds = topicIds.sort(TopicList.sortByCellFrequency);

        $.each(topicIds, function (index, topicId) {
            topicIdToTopicPos[topicId] = index;
        });

        // TopicHandler.calculateTopicOverlap(topicIds);
    };

    CellInformationManager.prototype.setCellInfo = function (cellinfo) {
        this.cellInfo = cellinfo;
        console.log("got new cell information");
        updateData();
        matrixVisualization.updateVisualization();
    };
    CellInformationManager.prototype.getCellInfo = function () {
        return this.cellInfo;
    };
    CellInformationManager.prototype.getTopicPosByTopicId = function (topicId) {
        return topicIdToTopicPos[topicId];
    };
    CellInformationManager.prototype.getCellsOfColumn = function (colName) {
        var cellsOfColumn = [];
        $.each(this.cellInfo.cells, function (index, cell) {
            if (cell.column === colName) {
                cellsOfColumn.push(cell);
            }
        });
        return cellsOfColumn;
    };
    CellInformationManager.prototype.getCellsOfRow = function (rowName) {
        var cellsOfRow = [];
        $.each(this.cellInfo.cells, function (index, cell) {
            if (cell.row === rowName) {
                cellsOfRow.push(cell);
            }
        });
        return cellsOfRow;
    };
}

