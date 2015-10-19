
$(function () {

    function setData(sender) {

        var room = $(sender).closest("[room]").attr("room");
        var device = $(sender).closest("[device]").attr("device");
        var command = $(sender).attr("command");
        var typeOfReturn = $(sender).attr("typeOfReturn");

        var p = {
            Room: room,
            Device: device,
            Command: command,
            TypeOfReturn: typeOfReturn,
            Value: ""
        };
        return p;
    }

    $("a.tools_api").click(function (event) {
        event.preventDefault();
        var command = $(this).attr("command");
        $("#resTools").load(command);
    });

    $("select.enumLight").change(function (event) {
        event.preventDefault();
        var dataToJson = setData(this);
        var filtr = "#" + $(this).attr("id") + " :selected";
        dataToJson.Value = $(filtr).val();
        var th = $(this);

        $.ajax({
            url: "/api/values",
            type: "POST",
            data: JSON.stringify(dataToJson),
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                $(th).val(data.Values[0]);
            }
        });
    });

    $("a.bt_api").click(function (event) {
        event.preventDefault();
        var dataToJson = setData(this);
        var th = $(this);

        $.ajax({
            url: "/api/values",
            type: "POST",
            data: JSON.stringify(dataToJson),
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                for (var i = 0; i < data.Atrs.length; i++) {
                    var elemId;
                    if (data.Ids[i] === "0") {
                        elemId = "#" + $(th).attr("elemId");
                        $(elemId).html(data.Values[i]);
                    } else if (data.Ids[i] === "") {
                        $(th).attr(data.Atrs[i], data.Values[i]);
                    } else if (data.Ids[i] === "100") {
                        elemId = "#" + $(th).attr("elemId" + data.Ids[i]);
                        $(elemId).attr("src", $(elemId).attr("img" + dataToJson.Command));
                    } else {
                        elemId = "#" + $(th).attr("elemId" + data.Ids[i]);
                        $(elemId).attr(data.Atrs[i], data.Values[i]);
                    }
                }
            }
        });

    });
    
});


