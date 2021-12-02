/// - Create DevExpress DataGrid - ///
$(function () {
    const projectGrid = $("#projectsGridContainer").dxDataGrid({
        allowColumnReordering: true,
        allowColumnResizing: true,
        allowEditing: false,
        columnChooser: {
            enabled: true,
            mode: "dragAndDrop" // or "select"
        },
        columnFixing: { enabled: true },
        columns: [{
            dataField: "ID",
            caption: "Sample ID",
            allowColumnResizing: true,
            allowGrouping: false,
            visible: true,
            sortOrder: "asc",
        }, {
            dataField: "Architect",
            allowColumnResizing: true,
            visible: true
        }, {
            dataField: "RequestDate",
            dataType: "date",
            allowColumnResizing: true,
            allowGrouping: false,
            visible: false
        }, {
            dataField: "SampleType",
            lookup: {
                dataSource: [
                    {type: "Edgeband"},
                    {type: "Fabric"},
                    {type: "Laminate"},
                    {type: "Pigmented Paint"},
                    {type: "Stone"},
                    {type: "Wood - Solid"},
                    {type: "Wood - Veneer"},
                    {type: "Other"}
                ],
                displayExpr: "type",
                valueExpr: "type"
            },
            allowEditing: false,
            allowColumnResizing: true,
            visible: true
        }, {
            dataField: "JobNumber",
            allowColumnResizing: true,
            visible: true
        }, {
            dataField: "JobName",
            allowColumnResizing: true,
            visible: true
        }, {
            dataField: "PMStatus",
            lookup: {
                dataSource: [
                    {status: "Ordered"},
                    {status: "Completed"},
                    {status: "Sent"},
                    {status: "Approved"},
                    {status: "Rejected"},
                    {status: "Void"}
                ],
                displayExpr: "status",
                valueExpr: "status"
            },
            allowColumnResizing: true,
            visible: true
        }],
        dataSource: new DevExpress.data.CustomStore({
            key: "ID",
            load: function() {
                return $.getJSON("php/get_sample_data.php")
                    .fail(function() { throw "Data loading error" });
            },
            remove: function(key) {
                $.ajax({
                    type: "GET",
                    url: 'delete_sample.php',
                    data: {sample_id:key},
                    success: function(data) {
                        console.log(data);
                         //alert(data);
                        dataSource.reload();
                    },
                    error: function(data) {
                        console.log(data);
                        alert(data);
                    }
                });
            },
            update: function() {
                $.ajax({
                    type: "POST",
                    url: 'update_sample.php',
                    data: {sample:changes[0]},
                    success: function(data) {
                        console.log(data);
                    },
                    error: function(data) {
                        alert('Problem occured. Contact IT.\r\n' + data);
                        console.log("Edited error");
                        console.log(data);
                    }
                })
            }
        }),
        filterRow: { visible: true },
        groupPanel: { visible: true },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        onToolbarPreparing: function(e) {
            var dataGrid = e.component;

            e.toolbarOptions.items.unshift({
                location: "after",
                locateInMenu: 'auto',
                widget: "dxButton",
                options: {
                    text: "Collapse All",
                    width: 125,
                    onClick: function(e) {
                        var expanding = e.component.option("text") === "Expand All";
                        dataGrid.option("grouping.autoExpandAll", expanding);
                        e.component.option("text", expanding ? "Collapse All" : "Expand All");
                    }
                }
            }, {
                location: "after",
                locateInMenu: 'auto',
                widget: "dxButton",
                options: {
                    icon: "refresh",
                    text: "Refresh",
                    onClick: function() {
                        dataGrid.refresh();
                    }
                }
            }, {
                location: "after",
                locateInMenu: 'auto',
                widget: "dxButton",
                options: {
                    icon: "print",
                    text: "Print",
                onClick: function() {
                    console.log("Printing has been tried.");
                    window.print();
                }
            }
        });
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [25, 50, 100],
            showNavigationButtons: true,
        },
        paging: {
            enabled:true,
            pageSize: 25
        },
        rowAlternationEnabled: true,
        scrolling: {
            mode: "standard" // or "virtual" | "infinite"
        },
        searchPanel: { visible: true },
        selection: { mode: "single" },
        showBorders: true,
    });
        //console.log("After table: " + data);
})