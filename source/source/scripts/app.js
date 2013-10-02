
$(function () {
    var app = new kendo.mobile.Application(document.body, { transition: "slide" });
});

var models;
function loadModels() {
    models = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://localhost:36136/api/models",
                dataType: "json"
            }
        },
        group: "MakeLogoUrl",
    });
    $("#modelsList").kendoMobileListView({
        dataSource: models,
        template: $("#modelsListItemTemplate").html(),
        headerTemplate: $("#modelsListHeaderTemplate").html(),
        fixedHeaders: true
    }).kendoTouch({
        filter: ">li .details",
        tap: navigate
    });
        
}

var itemId;
function navigate(e) {
    itemId = $(e.touch.currentTarget).parent().data("uid");
    kendo.mobile.application.navigate("#modelDetail?uid=" + itemId);
}
    

function detailShow(e) {
    var model = models.getByUid(itemId);
    $("#modelName").text(model["MakeName"] + ': ' + model["Year"] + " " + model["Name"]);
    $("#modelPrice").text(kendo.toString(model["BasePrice"], "c0"));
    $("#modelEngine").text(model["EngineType"]);
    $("#modelDescription").text(model["Description"]);
    $("#modelHorsepower").text(model["BreakHorsepower"]);
    $("#modelZeroToSixty").text(model["ZeroToSixty"] + " secs");
    $("#modelTopSpeed").text(model["TopSpeed"] + " mph");
}
