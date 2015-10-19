$(function () {

    $("#addRoom_api").click(function (event) {
        event.preventDefault();

        var room1 = $("#addRoom").val();
        var room = $("[room='" + room1 + "']").attr("room");
        if (room === undefined) {
            var dataToJson = {
                Room: $("#addRoom").val(),
                Device: "",
                Command: "addRom",
                TypeOfReturn: "",
                Value: ""
            };
            var command = $(this).attr("command");

            $("#newRoom").load(command, { addRoom: dataToJson });

            var opt = '<option value="' + dataToJson.Room + '">' + dataToJson.Room + '</option>';
            $("#list_room").append($(opt));

            $("#newRoom").attr("room", dataToJson.Room);
            $("#newRoom").removeAttr("id");
            $("#panHouse").append($("<div id='newRoom'></div>"));
        } else {
            alert("Комната '" + room1 + "' уже существует")
        }

    });

    $("#addDevice_api").click(function (event) {
        event.preventDefault();

        var room = $("#list_room :selected").val();
        var device = $("#addDevice").val();

        var dev = $("[room='" + room + "']").find($("[device='" + device + "']")).attr("device");

        if (dev === undefined) {
            var dataToJson = {
                Room: room,
                Device: device,
                Command: $("#list_device :selected").val(),
                TypeOfReturn: "",
                Value: ""
            };

            var command = $(this).attr("command");
            var id = "#newDevice_" + dataToJson.Room;

            $(id).load(command, { addDevice: dataToJson });

            var sender = $(id);

            $(id).attr("device", dataToJson.Device);
            $(id).removeAttr("id");
            var div = "<div id='" + id.substring(1) + "'></div>";
            $(sender).closest("[room]").append($(div));
        } else {
            alert("Устройство '" + device + "' в комнате ' " + room + " ' уже существует")
        }
    });
});