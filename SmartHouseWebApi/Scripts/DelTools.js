$(function () {
    $("#list_room_device").change(function (event) {
        event.preventDefault();
        var dataToJson = {
            Room: $("#list_room_device :selected").val(),
            Device: "",
            Command: "",
            TypeOfReturn: "",
            Value: ""
        };

        $.ajax({
            url: "/api/tools",
            type: "POST",
            data: JSON.stringify(dataToJson),
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                $("#list_device").empty();
                $.each(data, function (key, value) {
                    var opt = '<option value="' + value + '">' + value + '</option>';
                    $("#list_device").append($(opt));
                });
            }
        });
    });

    $("#delDevice_api").click(function (event) {
        event.preventDefault();
        var dataToJson = {
            Room: $("#list_room_device :selected").val(),
            Device: $("#list_device :selected").val(),
            Command: "delDev",
            TypeOfReturn: "",
            Value: ""
        };

        $.ajax({
            url: "/api/tools",
            type: "DELETE",
            data: JSON.stringify(dataToJson),
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data === "ok") {
                    var delElem = "[room='" + dataToJson.Room + "'] [device='" + dataToJson.Device + "']";
                    $(delElem).remove();
                    $("#list_device :selected").remove();
                }
            }
        });
    });

    $("#delRoom_api").click(function (event) {
        event.preventDefault();
        var dataToJson = {
            Room: $("#list_room :selected").val(),
            Device: "",
            Command: "delRom",
            TypeOfReturn: "",
            Value: ""
        };

        $.ajax({
            url: "/api/tools",
            type: "DELETE",
            data: JSON.stringify(dataToJson),
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data === "ok") {
                    var delElem = "[room='" + dataToJson.Room + "']";
                    $(delElem).eq(0).remove();
                    $("#list_room :selected").remove();
                    $("#list_room_device [value='" + dataToJson.Room + "']").remove();
                }
            }
        });
    });
});