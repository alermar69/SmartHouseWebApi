$(function () {
    $("#list_room").change(function (event) {
        event.preventDefault();
        var room = $("#list_room :selected").val();
        $("#redactRoom").val(room);
    });

    $("#list_device").change(function (event) {
        event.preventDefault();
        var device = $("#list_device :selected").val();
        $("#redactDevice").val(device);
    });

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

    $("#redDevice_api").click(function (event) {
        event.preventDefault();
        if ($("#redactDevice").val() !== $("#list_device :selected").val()) {
            var dataToJson = {
                Room: $("#list_room_device :selected").val(),
                Device: $("#redactDevice").val(),
                Command: "",
                TypeOfReturn: "",
                Value: $("#list_device :selected").val()
            };


            $.ajax({
                url: "/api/tools",
                type: "PUT",
                data: JSON.stringify(dataToJson),
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data === "ok") {
                        var redlElem = "[room='" + dataToJson.Room + "'] [device='" + dataToJson.Value + "']";
                        $(redlElem).find(".nameDevice").html(dataToJson.Device);
                        $(redlElem).
                            find("[id*='_" + dataToJson.Value.toLowerCase() + "_']").
                            each(function (index, elem) {
                                elem.id = elem.id.replace("_" + dataToJson.Value.toLowerCase() + "_", "_" + dataToJson.Device.toLowerCase() + "_");
                            });
                        $(redlElem).
                            find("[elemid*='_" + dataToJson.Value.toLowerCase() + "_']").
                            each(function (index, elem) {
                                elem.setAttribute("elemid", elem.getAttribute("elemid").replace("_" + dataToJson.Value.toLowerCase() + "_", "_" + dataToJson.Device.toLowerCase() + "_"));
                            });
                        $(redlElem).
                            find("[elemid1*='_" + dataToJson.Value.toLowerCase() + "_']").
                            each(function (index, elem) {
                                elem.setAttribute("elemid1", elem.getAttribute("elemid1").replace("_" + dataToJson.Value.toLowerCase() + "_", "_" + dataToJson.Device.toLowerCase() + "_"));
                            });
                        $(redlElem).
                            find("[elemid2*='_" + dataToJson.Value.toLowerCase() + "_']").
                            each(function (index, elem) {
                                elem.setAttribute("elemid2", elem.getAttribute("elemid2").replace("_" + dataToJson.Value.toLowerCase() + "_", "_" + dataToJson.Device.toLowerCase() + "_"));
                            });
                        $(redlElem).
                            find("[elemid100*='_" + dataToJson.Value.toLowerCase() + "_']").
                            each(function (index, elem) {
                                elem.setAttribute("elemid100", elem.getAttribute("elemid100").replace("_" + dataToJson.Value.toLowerCase() + "_", "_" + dataToJson.Device.toLowerCase() + "_"));
                            });

                        $("[room='" + dataToJson.Room + "'] [device='" + dataToJson.Value.toLowerCase() + "']").attr("device", dataToJson.Device.toLowerCase());
                        $(redlElem).attr("device", dataToJson.Device);

                        $("#list_device :selected").val(dataToJson.Device);
                        $("#list_device :selected").html(dataToJson.Device);
                    } else {
                        alert(data);
                    }
                }
            });
        }
    });

    $("#redRoom_api").click(function (event) {
        event.preventDefault();


        if ($("#redactRoom").val() !== $("#list_room :selected").val()) {
            var dataToJson = {
                Room: $("#redactRoom").val(),
                Device: "",
                Command: "",
                TypeOfReturn: "",
                Value: $("#list_room :selected").val()
            };

            $.ajax({
                url: "/api/tools",
                type: "PUT",
                data: JSON.stringify(dataToJson),
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data === "ok") {
                        var redlElem = "[room='" + dataToJson.Value + "']";
                        $(redlElem).find(".labelRoom").html(dataToJson.Room);
                        $(redlElem).
                            find("[id^='" + dataToJson.Value.toLowerCase() + "_']").
                            each(function (index, elem) {
                                elem.id = elem.id.replace(dataToJson.Value.toLowerCase() + "_", dataToJson.Room.toLowerCase() + "_");
                            });
                        $(redlElem).
                            find("[elemid^='" + dataToJson.Value.toLowerCase() + "_']").
                            each(function (index, elem) {
                                elem.setAttribute("elemid", elem.getAttribute("elemid").replace(dataToJson.Value.toLowerCase() + "_", dataToJson.Room.toLowerCase() + "_"));
                            });
                        $(redlElem).
                            find("[elemid1^='" + dataToJson.Value.toLowerCase() + "_']").
                            each(function (index, elem) {
                                elem.setAttribute("elemid1", elem.getAttribute("elemid1").replace(dataToJson.Value.toLowerCase() + "_", dataToJson.Room.toLowerCase() + "_"));
                            });
                        $(redlElem).
                            find("[elemid2^='" + dataToJson.Value.toLowerCase() + "_']").
                            each(function (index, elem) {
                                elem.setAttribute("elemid2", elem.getAttribute("elemid2").replace(dataToJson.Value.toLowerCase() + "_", dataToJson.Room.toLowerCase() + "_"));
                            });
                        $(redlElem).
                            find("[elemid100^='" + dataToJson.Value.toLowerCase() + "_']").
                            each(function (index, elem) {
                                elem.setAttribute("elemid100", elem.getAttribute("elemid100").replace(dataToJson.Value.toLowerCase() + "_", dataToJson.Room.toLowerCase() + "_"));
                            });
                        $(redlElem).
                            find("[id='newDevice_" + dataToJson.Value + "']").
                            each(function (index, elem) {
                                elem.setAttribute("id", elem.getAttribute("id").replace("_" + dataToJson.Value, "_" + dataToJson.Room));
                            });
                        $(redlElem).attr("room", dataToJson.Room);

                        $("#list_room :selected").val(dataToJson.Room);
                        $("#list_room :selected").html(dataToJson.Room);

                        $("#list_room_device option[value='" + dataToJson.Value + "']").html(dataToJson.Room);
                        $("#list_room_device option[value='" + dataToJson.Value + "']").val(dataToJson.Room);                        
                    } else {
                        alert(data);
                    }
                }
            });
        }
    });
});