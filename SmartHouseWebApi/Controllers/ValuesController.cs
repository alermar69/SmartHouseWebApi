using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Results;
using SmartHouseDll;
using SmartHouseWebApi.Models;

namespace SmartHouseWebApi.Controllers
{
    public class ValuesController : ApiController
    {
        public JsonResult<DeviceAttrJson> Post([FromBody]DataToJson value)
        {
            House house = SerDesHouse.Read();

            if (house.Remote == null)
            {
                house.Remote = new RemoteControl(new WebReader(house), null);
                house.Remote.AddCommand(new SetLightCommand());
            }

            if (value.Command.Contains("_plus"))
                value.Command = value.Command.Replace("_plus", "+");

            house.Remote.Reader.RoomData = value.Room;
            house.Remote.Reader.DeviceData = value.Device;
            house.Remote.Reader.CommandData = value.Command;

            if (value.Value != "")
            {
                house.Remote.Reader.Value = value.Value;  
            }

            house.Remote.PushButton();

            SerDesHouse.Save(house);

            Device device = house.GetDevice(value.Room, value.Device);

            switch (value.TypeOfReturn)
            {
                case "cl-Auto":
                    return FunSrcElem1(((ClimatControl)device).Auto ? "/Content/Images/AutoOn.png" : "/Content/Images/AutoOff.png");
                case "cl-heat":
                    return FunClassElem1(((ClimatControl)device).Heat.State == StateOnOff.Off ? "imgBt" : "imgBt imgColor");
                case "cl-cond":
                    return FunClassElem1(((ClimatControl)device).Cond.State == StateOnOff.Off ? "imgBt" : "imgBt imgColor");
                case "light":
                    return FunHtmlElem(((ILight)device).Brightness.ToString());
                case "volume":
                    return FunHtmlElem(((IVolume) device).Volume.ToString());
                case "temper": 
                    return FunHtmlElem(((ITemperature)device).Temperature.ToString());
                case "onOff":
                    if (((IOnOff) device).State == StateOnOff.On)
                    {

                        return Json(new DeviceAttrJson()
                        {
                            Ids = new List<string>() {"", "1", "100"},
                            Atrs = new List<string>() { "command", "src", "src" },
                            Values = new List<string>() { "off", "/Content/Images/control_power_blue.png", "" }
                        });
                    }                        
                    else
                    {
                        return Json(new DeviceAttrJson()
                        {
                            Ids = new List<string>() {"", "1", "100"},
                            Atrs = new List<string>() { "command", "src", "src" },
                            Values = new List<string>() { "on", "/Content/Images/control_power.png", "" }
                        });
                    }               
            }

            return null;
        }



        private JsonResult<DeviceAttrJson> FunHtmlElem(string str)
        {
            return Json(new DeviceAttrJson()
            {
                Ids = new List<string>() { "0" },
                Atrs = new List<string>() { "" },
                Values = new List<string>() { str }
            });
        }
        private JsonResult<DeviceAttrJson> FunClassElem1(string str)
        {
            return Json(new DeviceAttrJson()
            {
                Ids = new List<string>() { "1" },
                Atrs = new List<string>() { "class" },
                Values = new List<string>() { str }
            });
        }
        private JsonResult<DeviceAttrJson> FunSrcElem1(string str)
        {
            return Json(new DeviceAttrJson()
            {
                Ids = new List<string>() { "1" },
                Atrs = new List<string>() { "src" },
                Values = new List<string>() { str }
            });
        }       

    }
}
