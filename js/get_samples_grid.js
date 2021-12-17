// GLOBAL VARIABLES
var INNERGY_JOBS;

/// - Populate INNERGY_JOBS global variable - ///
$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: 'php/get_innergy_jobs.php',
    success: function(jobs_data) {
        INNERGY_JOBS = jobs_data;
    },
    error: function(error_data) {
        console.log("Error loading Innergy opportunities data.\n");
        console.log("ERROR LOG:\n"+error_data.responseText+"\n");
        alert('An error has occured. Contact IT and do not close this window.');
    }
})

/// - Create custom DataStore - ///
var sampleStore = new DevExpress.data.CustomStore({
    insert: function (key) {
        $.ajax({
            type: "POST",
            url: "php/insert_sample.php",
            data: {sample:CHANGES[0]},
            success: function(data) {
                console.log("Insert successful.");
                    //console.log(data);
            },
            error: function(data) {
                console.log(data);
                alert('Problem occured. Contact IT.\r\n' + data);
                alert(data);
            }
        });
    },
    key: "ID",
    load: function(loadOptions) {
        console.log("sampleStore loaded with:");
        console.log(loadOptions);
        return $.getJSON("php/get_sample_data.php", loadOptions)
            .fail(function() { throw "Data loading error" });

        /// REDACTED: SERVER-SIDE PROCESSING CODE
        var d = $.Deferred();
        var params = {};
        $.getJSON("php/get_sample_data.php", params)
        .done(function(response) {
            d.resolve(response.data, { 
                totalCount: response.totalCount,
                summary: response.summary,
                groupCount: response.groupCount
            });
        })
        .fail(function() { throw "Data loading error" });
        return d.promise();

        return $.getJSON('php/get_sample_data.php', loadOptions).done(function (response) {
            console.log("Response:\n");
            console.log(response);
            console.log(typeof response);
            console.log(response.length);
        }).fail(function() { throw "Data loading error" });;
    },
    remove: function(key) {
        $.ajax({
            type: "GET",
            url: 'php/delete_sample.php',
            data: {sample_id:key},
            success: function(data) {
                console.log(data);
            },
            error: function(data) {
                alert('Problem occured. Contact IT.\r\n' + data);
                console.log(data);
                alert(data);
            }
        });
    },
    update: function(key) {
        $.ajax({
            type: "POST",
            url: 'php/update_sample.php',
            data: {sample:CHANGES[0]},
            success: function(data) {
                console.log("Update successful.");
                //console.log("Data (typeof: " + typeof(data) + ") :");
                //console.log(data);
            },
            error: function(data) {
                alert('Problem occured. Contact IT.\r\n' + data);
                console.log("Edited error");
                console.log(data);
            }
        })
    }
});

/// - Bind DataStore to DataSource - ///
var sampleData = new DevExpress.data.DataSource({
    store: sampleStore
});

/// - Create DevExpress DataGrid - ///
var SELECTED, IS_EDITING_FLAG=false, EDIT_ROW_KEY, CHANGES;
var sampleGrid = $("#samplesGridContainer").dxDataGrid({
    dataSource: sampleData,
    allowColumnReordering: true,
    allowColumnResizing: true,
    columnChooser: {
        enabled: true,
        mode: "dragAndDrop" // or "select"
    },
    columns: [{
        caption: "Sample ID",
        dataField: "ID",
        allowColumnResizing: false,
        allowGrouping: false,
        sortOrder: "asc",
        fixed: true,
        fixedPosition: "left",
        visible: true,
        minWidth: 110,
        width: 110
    }, {
        dataField: "JobNumber",
        // Display values that are not in the dropdown/lookup
        calculateDisplayValue: function (rowData) {
            return rowData.JobNumber;
        },
        // Dropdown box of data pulled from database
        lookup: {
            dataSource: INNERGY_JOBS,
            displayExpr: "JobNumber",
            valueExpr: "JobNumber"
        },
        visible: true,
        width: 110
    }, {
        dataField: "JobName",
        visible: true,
        width: 175
    }, {
        caption: "Project Manager",
        dataField: "RequestedName",
        width: 125
    },
        {
        caption: "ArchTag",
        dataField: "DesignationArchitect",
        allowGrouping: false,
        visible: true,
        width: 90
    },{
        dataField: "SampleType",
        // Make column a dropdown box
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
            valueExpr: "type",
        },
        visible: true,
        width: 125
    },  {
        dataField: "RequestDate",
        dataType: "date",
        allowGrouping: false,
        visible: true,
        width: 120
    },  {
        dataField: "DueDate",
        dataType: "date",
        allowGrouping: false,
        visible: true,
        width: 120
    }, {
        caption: "Status",
        dataField: "PMStatus",
        // Display values that are not in the dropdown/lookup
        calculateDisplayValue: function (rowData) {
            return rowData.PMStatus;
        },
        // Make column a dropdown box
        lookup: {
            dataSource: [
                {status: ""},
                {status: "Ordered"},
                {status: "Completed"},
                {status: "Sent"},
                {status: "Reject/Resubmit"},
                {status: "Approved"},
                {status: "Rejected"},
                {status: "Void"}
            ],
            displayExpr: "status",
            valueExpr: "status"
        },
        allowGrouping: true,
        visible: true,
        width: 135
    }, {
        caption: "Response Date",
        dataField: "ApprovedDate",
        dataType: "date",
        allowGrouping: false,
        visible: true,
        width: 110
    }, {
        caption: "App/Rej Notes",
        dataField: "RejectionReason",
        allowGrouping: false,
        visible: false,
        width: 110
    }, {
        dataField: "Architect",
        allowGrouping: true,
        visible: true,
        width: 175
    }, {
        dataField: "Client",
        allowGrouping: true,
        visible: true,
        width: 175
    }, {
        dataField: "GeneralContractor",
        allowGrouping: false,
        visible: true,
        width: 175
    }, {
        caption: "Send To",
        dataField: "SentTo",
        // Display values that are not in the dropdown/lookup
        calculateDisplayValue: function (rowData) {
            return rowData.SentTo;
        },
        // Make column a dropdown box
        lookup: {
            dataSource: [
                {sent: ""},
                {sent: "Architect"},
                {sent: "Client"},
                {sent: "GC"},
                {sent: "Hand Deliver"},
                {sent: "Job Site"}
            ],
            displayExpr: "sent",
            valueExpr: "sent"
        },
        allowGrouping: false,
        visible: true,
        width: 100
    }, {
        caption: "Send To Name",
        dataField: "SentToName",
        allowGrouping: true,
        visible: true,
        width: 200
    }, {
        caption: "Address",
        dataField: "SentToAddr",
        allowGrouping: false,
        visible: true,
        width: 200
    }, {
        caption: "Phone",
        dataField: "SentToPhone",
        allowGrouping: false,
        visible: true,
        width: 110
    }, {
        dataField: "SentDate",
        dataType: "date",
        allowGrouping: false,
        visible: true,
        width: 110
    }, {
        dataField: "DeliveryMethod",
        allowGrouping: false,
        visible: true,
        width: 125
    }, {
        caption: "FSC",
        dataField: "Fsc",
        allowColumnResizing: false,
        allowGrouping: false,
        visible: false,
        width: 45
    }, {
        caption: "NAUF",
        dataField: "Nauf",
        allowColumnResizing: false,
        allowGrouping: false,
        visible: false,
        width: 45
    }, {
        dataField: "FireResistance",
        allowColumnResizing: false,
        allowGrouping: false,
        visible: false,
        width: 45
    }, {
        dataField: "ChemicalResistance",
        allowColumnResizing: false,
        allowGrouping: false,
        visible: false,
        width: 45
    }, {
        caption: "Filler/Wash Coat/Stain",
        dataField: "Filler",
        allowColumnResizing: false,
        allowGrouping: false,
        visible: false,
        width: 45
    }, {
        dataField: "TransmittalNotes",
        allowGrouping: false,
        visible: false,
        width: 110
    }, {
        dataField: "IntercompanyNotes",
        allowGrouping: false,
        visible: false,
        width: 110
    }, {
        dataField: "Remarks",
        allowGrouping: false,
        visible: false,
        width: 110
    }, {
        caption: "AWI No",
        dataField: "AWISystemNo",
        // Display values that are not in the dropdown/lookup
        calculateDisplayValue: function (rowData) {
            return rowData.PMStatus;
        },
        // Make column a dropdown box
        lookup: {
            dataSource: [
                {awino: ""},
                {awino: "1 - Lacquer, Nitrocellulose"},
                {awino: "2 - Lacquer, Precatalyzed"},
                {awino: "3 - Lacquer, Postcatalyzed"},
                {awino: "4 - Latex Acrylic, Water-based"},
                {awino: "5 - Varnish, Conversion"},
                {awino: "6 - Oil, Synthetic Penetrating (available in transparent only)"},
                {awino: "7 - Vinyl, Catalyzed"},
                {awino: "8 - Acrylic Cross Linking, Water-based"},
                {awino: "9 - UV Curable, Acrylated Epoxy, Polyester or Urethane"},
                {awino: "10 - UV Curable, Water-based"},
                {awino: "11 - Polyurethane, Catalyzed"},
                {awino: "12 - Polyurethane, Water-based"},
                {awino: "13 - Polyester, Catalyzed"}
            ],
            displayExpr: "awino",
            valueExpr: "awino"
        },
        allowGrouping: true,
        visible: false,
        width: 135
    }, {
        caption: "Qty Requested",
        dataField: "QuantityRequested",
        allowColumnResizing: false,
        allowGrouping: false,
        visible: false,
        width: 45
    }, {
        caption: "Qty Sq Ft",
        dataField: "QuantitySF",
        allowColumnResizing: false,
        allowGrouping: false,
        visible: false,
        width: 45
    }, {
        caption: "Send to Shop",
        dataField: "IncludeOnShopList",
        allowColumnResizing: false,
        allowGrouping: false,
        visible: false,
        width: 45
    }], // Ends Columns
    editing: {
        // https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/EditStateManagement/jQuery/Light/
        // https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/editing/
        mode: 'popup',
        allowAdding: true,
        allowUpdating: true,
        allowDeleting: true,
        popup: {
            title: 'Add/Edit Sample',
            showTitle: true
        },
        form: {
            items: [
              { // SAMPLE INFO
                itemType: 'group',
                colCount: 4,
                colSpan: 2,
                items: [
                    'ID',
                    'DesignationArchitect',
                    'RequestDate',
                    'DueDate',
                    'PMStatus',
                    'ApprovedDate',
                    {
                      dataField: 'RejectionReason',
                      editorType: 'dxTextArea',
                      colSpan: 2,
                      editorOptions: {
                        // value: "Wassup bro!",
                        height: 75,
                      },
                    },
                    'SampleType',
                    'Control',
                    {itemType: "empty"},
                    {
                      dataField: 'IncludeOnShopList',
                      editorType: 'dxCheckBox',
                    }
                ]
              },
              { // FABRICATION INFO
                caption: 'Fabrication Info',
                itemType: 'group',
                colCount: 8,
                items: [
                    {
                        dataField: "QuantityRequested",
                        colSpan: 3
                    }, {
                        dataField: "QuantitySF",
                        colSpan: 3
                    }, {
                      itemType: "empty",
                      colSpan: 2
                    }, {
                      dataField: 'Veneer',
                      colSpan: 4
                    }, {
                      dataField: 'FlitchNo',
                      colSpan: 4
                    }, {
                      dataField: 'Hardwood',
                      colSpan: 4
                    }, {
                      dataField: 'Cut',
                      colSpan: 4
                    }, {
                      dataField: 'Match',
                      colSpan: 4
                    }, {
                        dataField: 'Figure',
                        colSpan: 4
                    }, {
                      dataField: 'Finish',
                      colSpan: 4
                    }, {
                      dataField: 'Sheen',
                      colSpan: 4
                    }, {
                      dataField: 'AWISystemNo',
                      colSpan: 8
                    }
                ]
              },
              { // JOB INFORMATION
                caption: 'Job Info',
                itemType: 'group',
                colCount: 2,
                items: [
                    'JobNumber',
                    {
                      dataField: 'JobName',
                      editorOptions: {
                        disabled: true,
                      },
                    },
                    'RequestedName',
                    'Architect',
                    'Client',
                    'GC',
                ]
              },
              { // FABRICATION NOTES
                itemType: 'group',
                colCount: 3,
                colSpan: 2,
                items: [
                    {
                      dataField: 'TransmittalNotes',
                      editorType: 'dxTextArea',
                      editorOptions: {
                        height: 75,
                      },
                    }, {
                      dataField: 'IntercompanyNotes',
                      editorType: 'dxTextArea',
                      editorOptions: {
                        height: 75,
                      },
                    }, {
                      dataField: 'Remarks',
                      editorType: 'dxTextArea',
                      editorOptions: {
                        height: 75,
                      },
                    },
                ]
              },
              { // CHECKBOXES
                caption: 'Special',
                itemType: 'group',
                colCount: 5,
                colSpan: 2,
                items: [
                    {
                      dataField: 'Fsc',
                      editorType: 'dxCheckBox',
                    }, {
                      dataField: 'Nauf',
                      editorType: 'dxCheckBox',
                    }, {
                      dataField: 'FireResistance',
                      editorType: 'dxCheckBox',
                    }, {
                      dataField: 'ChemicalResistance',
                      editorType: 'dxCheckBox',
                    }, {
                      dataField: 'Filler',
                      editorType: 'dxCheckBox',
                    }
                ]
              },
              { // DELIVERY
                itemType: 'group',
                colCount: 3,
                colSpan: 2,
                caption: 'Delivery',
                items: [
                  'SentTo',
                  'SentDate',
                  'DeliveryMethod',
                  'SentToName',
                  'SentToPhone',
                  {
                    dataField: 'SentToAddr',
                    editorType: 'dxTextArea',
                    colSpan: 4,
                    editorOptions: {
                        height: 100,
                    },
                  }
                ],
              },
            ],
        } // Ends form
    }, // Ends editing
    export: {
        enabled: true,
        printingEnabled: true
    },
    onExporting: function(e) { 
        var workbook = new ExcelJS.Workbook(); 
        var worksheet = workbook.addWorksheet('Main sheet'); 
        DevExpress.excelExporter.exportDataGrid({ 
            worksheet: worksheet, 
            component: e.component,
            customizeCell: function(options) {
                var excelCell = options;
                excelCell.font = { name: 'Arial', size: 12 };
                excelCell.alignment = { horizontal: 'left' };
            } 
        }).then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer) { 
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx'); 
            }); 
        }); 
        e.cancel = true; 
    },
    filterRow: { visible: true },
    groupPanel: { visible: true },
    headerFilter: {
        visible: true,
        allowSearch: true
    },
    masterDetail: {
        enabled: true,
        template(container, info) {
            const sampleData = info.data;
            
            $('<div>')
            .text(``)

            $('<div>')
            .text(`Sample #${sampleData.ID}'s Transmittal Notes:`)
            .appendTo(container);
            
            $('<div>')
            .dxTextArea({
                value: `${sampleData.TransmittalNotes}`,
                // textarea height cannot be dynamic because the datagrid height is set //
                height: 70,
                readOnly: true,
            }).addClass('master-detail-textarea').appendTo(container);

            $('<div>')
            .text(`Sample #${sampleData.ID}'s Intercompany Notes:`)
            .appendTo(container);
            
            $('<div>')
            .dxTextArea({
                value: `${sampleData.IntercompanyNotes}`,
                height: 70,
                readOnly: true,
            }).addClass('master-detail-textarea').appendTo(container);

            $('<div>')
            .text(`Sample #${sampleData.ID}'s Remarks:`)
            .appendTo(container);
            
            $('<div>')
            .dxTextArea({
                value: `${sampleData.Remarks}`,
                height: 70,
                readOnly: true,
            }).appendTo(container);             
        },
    }, // Ends Master-Detail
    onEditCanceled: function(e) {
            //console.log("EditCanceled");
        IS_EDITING_FLAG = false;
    },
    onEditingStart: function(e) {
            //console.log("EditingStart");
        IS_EDITING_FLAG = true;
    },
    onEditorPrepared: function(e) {
        
    },
    onEditorPreparing: function(e){
        // Set the checkbox values based on row data (ignore the messy formatting pls thx)
        if (e.dataField === 'IncludeOnShopList' || e.dataField === 'Fsc' ||
         e.dataField === 'Nauf' || e.dataField === 'FireResistance' ||
         e.dataField === 'ChemicalResistance' || e.dataField === 'Filler') {
                e.editorName = "dxCheckBox";
                e.editorOptions = {
                    value: e.value === '1' ? true : false,
                    onValueChanged: function(args ){
                        e.setValue(args.value ? '1' : '0');
                    }
                }
        }
    },
    onInitNewRow: function(e) {
       // e.data.ID = getNewSampleID();
       // Today's date for Request Date on new sample
        e.data.RequestDate = new Date();
    },
    onSaved: function(e) {
            //console.log("Saved");
        IS_EDITING_FLAG = false;
    },
    onSaving: function(e) {
        // If no changes then do nothing
        if (CHANGES[0] === undefined) {
            return;
        }

        // If deleting item then do nothing
        if (CHANGES[0]['data'] === undefined) {
            return;
        }

        // Check if JobNumber was changed and edit JobName automatically
        if (CHANGES[0]['data']['JobNumber'] !== undefined) {
            var jobSelected = CHANGES[0]['data']['JobNumber'];
            var jobIndex = INNERGY_JOBS.findIndex(function (INNERGY_JOB) {
                return INNERGY_JOB.JobNumber === jobSelected;
            });
            CHANGES[0]['data']['JobName'] = INNERGY_JOBS[jobIndex]['JobName'];
        }
    },
    onOptionChanged: function(e) {
        if(e.name === "editing") {
            EDIT_ROW_KEY = e.component.option("editing.editRowKey"),
            CHANGES = e.component.option("editing.changes");
            this.collapseRow(EDIT_ROW_KEY);
            //$("#selected-item").text(JSON.stringify(changes, null, " "));
            // console.log("Changed value: "+e.value);
        }
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
        },{
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
                text: "Print Grid",
                onClick: function() {
                    var getAll = $("#samplesGridContainer").dxDataGrid("instance");
                    var filterExpr = getAll.getCombinedFilter(true);
                    console.log("Filter Exp: ");
                    console.log(filterExpr);
                    
                    // Create temp store
                    var tempStore = new DevExpress.data.CustomStore({
                        insert: function (key) {
                            $.ajax({
                                type: "POST",
                                url: "php/insert_sample.php",
                                data: {sample:CHANGES[0]},
                                success: function(data) {
                                    console.log("Insert successful.");
                                        //console.log(data);
                                },
                                error: function(data) {
                                    console.log(data);
                                    alert('Problem occured. Contact IT.\r\n' + data);
                                    alert(data);
                                }
                            });
                        },
                        key: "ID",
                        load: function(loadOptions) {
                            console.log("tempStore loaded with:");
                            console.log(loadOptions);
                            return $.getJSON("php/get_sample_data.php", loadOptions)
                                .fail(function() { throw "Data loading error" });
                    
                            /// SERVER-SIDE PROCESSING CODE
                            var d = $.Deferred();
                            var params = {};
                            $.getJSON("php/get_sample_data.php", params)
                            .done(function(response) {
                                d.resolve(response.data, { 
                                    totalCount: response.totalCount,
                                    summary: response.summary,
                                    groupCount: response.groupCount
                                });
                            })
                            .fail(function() { throw "Data loading error" });
                            return d.promise();
                    
                            return $.getJSON('php/get_sample_data.php', loadOptions).done(function (response) {
                                console.log("Response:\n");
                                console.log(response);
                                console.log(typeof response);
                                console.log(response.length);
                            }).fail(function() { throw "Data loading error" });;
                        },
                        remove: function(key) {
                            $.ajax({
                                type: "GET",
                                url: 'php/delete_sample.php',
                                data: {sample_id:key},
                                success: function(data) {
                                    console.log(data);
                                },
                                error: function(data) {
                                    alert('Problem occured. Contact IT.\r\n' + data);
                                    console.log(data);
                                    alert(data);
                                }
                            });
                        },
                        update: function(key) {
                            $.ajax({
                                type: "POST",
                                url: 'php/update_sample.php',
                                data: {sample:CHANGES[0]},
                                success: function(data) {
                                    console.log("Update successful.");
                                    //console.log("Data (typeof: " + typeof(data) + ") :");
                                    //console.log(data);
                                },
                                error: function(data) {
                                    alert('Problem occured. Contact IT.\r\n' + data);
                                    console.log("Edited error");
                                    console.log(data);
                                }
                            })
                        }
                    });

                    // Create test datasource with test store
                    var tempDataSource = new DevExpress.data.DataSource({
                        store: tempStore
                    });


                    tempArray = [];
                    tempDataSource.store().load().done(function (res) {
                        for (i = 0; i < res.length; i++) {
                            console.log(res[i]);
                        }
                    });

                     

                    // filter the test datasource
                    // Load the store


                    // testData = getAll.getDataSource();
                    // testData.filter(filterExpr);
                    // testData.store().load().done(function (res) {
                    //     for (i = 0; i < res.length; i++) {
                    //         console.log(res[i]);
                    //     }
                    // })
                }
            }
        }
        );
    },
    pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [50, 100, 250],
        showNavigationButtons: true,
    },
    paging: {
        enabled:true,
        pageSize: 50
    },
    remoteOperations: false,
    rowAlternationEnabled: true,
    scrolling: {
        mode: "native" // or "virtual" | "infinite"
    },
    searchPanel: { visible: true },
    selection: { mode: "single" },
    showBorders: true,
});

/// - Print function for DataGrid - ///
function printGrid() {
    var getAll = $("#samplesGridContainer").dxDataGrid("instance");
    var filterExpr = getAll.getCombinedFilter(true);

    testData = getAll.getDataSource();
    testData.store().load({
        filter: filterExpr
      }).done(function (res) {
        for (i = 0; i < res.length; i++) {
            console.log(res[i]);
        }
    })

    //getAll.filter(filterExpr);
    //getAll.getDataSource().store().load().done(function (result) {
    //    for (i = 0; i < result.length; i++) {
    //        console.log(result[i]);
    //    }
    //});
}





/// CUSTOM STORES FOR LOOKUP DATA - CHECK OUT LOAD MODES TO POSSIBLY REDUCE LAG IN WEB APP
// https://js.devexpress.com/Documentation/21_1/ApiReference/Data_Layer/CustomStore/Configuration/#loadMode
// 
// cacheEnabled(): https://js.devexpress.com/Documentation/21_1/ApiReference/UI_Components/dxDataGrid/Configuration/#cacheEnabled
// clearCache() : https://js.devexpress.com/Documentation/21_1/ApiReference/Data_Layer/CustomStore/Configuration/#cacheRawData
