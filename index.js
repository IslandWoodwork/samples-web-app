// GLOBAL VARIABLES
var IS_EDITING_FLAG = false;

/// - Home page - ///
$(function() {
    $("#content").load( "pages\\home.html" );
});

/// - Website sidebar/drawer - ///
$(function() {
    const btnNavPane = $("#nav-menu-button").dxButton({
        icon: "chevronprev",
        onClick: function(e) {
            var button = e.component;
            if (button.option("icon") == "chevronprev") {
          		button.option("icon", "chevronright");
            } else {
          		button.option("icon", "chevronprev");
            }
            drawer.toggle();
        }
    });

    const drawer = $("#drawer").dxDrawer({
         //closeOnOutsideClick: true,
        height: "100vh",
        opened: true,
        openedStateMode: "shrink",
        template: function() {
            const $list = $("<div/>").dxList({
                items: [
                    { id: 0, html: "<img src='img\\company_logo.png' style='height: 100%; width: 100%;'>", filePath: "home"},
                    { id: 1, text: "Sample Management", icon: "rowproperties", filePath: "samples" },
                    { id: 2, text: "Project Management", icon: "group", filePath: "projects" },
                    { id: 3, text: "Shop (WIP)", icon: "fill", filePath: "wip" },
                    //{ id: 4, text: "Innergy API Test", icon: "isblank", filePath: "innergypush" },
                    { id: 5, text: "Diagram Test", icon: "checklist", filePath: "diagram" }
                ],
                width: 200,
                height: "100vh",
                selectionMode: "single",
                elementAttr: { class: "drawer-items" },
                onSelectionChanged: function(e) {
                    if(IS_EDITING_FLAG) {
                        // TODO: Change selected
                        console.log("You are editing.");
                        DevExpress.ui.notify("You have unsaved changes to the grid.");
                    } else {
                        $("#content").load( "pages\\" + e.addedItems[0].filePath + ".html" );
                    }
                }
            });
            return $list;
        }
    }).dxDrawer("instance");
});