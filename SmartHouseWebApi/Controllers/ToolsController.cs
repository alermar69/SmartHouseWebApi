using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using SmartHouseDll;
using SmartHouseWebApi.Models;

namespace SmartHouseWebApi.Controllers
{
    public class ToolsController : ApiController
    {
        private House _house;


        public IEnumerable<string> Post([FromBody]DataToJson value)
        {
            _house = ReadHouse();

            return _house.GetRoom(value.Room).Devices.Values.Select(c => c.Name);
        }
        public string Delete([FromBody]DataToJson value)
        {
            _house = ReadHouse();

            _house.Remote.Reader.RoomData = value.Room;
            _house.Remote.Reader.DeviceData = value.Device;
            _house.Remote.Reader.CommandData = value.Command;
            _house.Remote.PushButton();
            SaveHouse();
            return "ok";
        }
        public string Put([FromBody]DataToJson value)
        {
            _house = ReadHouse();

            if (value.Device == "")
            {
                if (!_house.HasRoom(value.Room))
                {
                    _house.ChangeNameRoom(value.Value, value.Room);
                    SaveHouse();
                    if (_house.GetRoom(value.Room) != null)
                    {
                        return "ok";
                    } 
                }
                else
                {
                    return "Комната \"" + value.Room + "\" уже существует";
                }
            }
            else
            {
                if (!_house.HasDevice(value.Room, value.Device))
                {
                    _house.ChangeNameDevice(value.Room, value.Value, value.Device);
                    SaveHouse();
                    if (_house.GetDevice(value.Room, value.Device) != null)
                    {
                        return "ok";
                    } 
                }
                else
                {
                    return "Устройство \"" + value.Device + "\" в комнате \" " + value.Room  + " \" уже существует";
                }
            }   
                    
            return "Изменение не произошло!!!";
        }


        private void SaveHouse()
        {
            if (_house != null)
            {
                SerDesHouse.Save(_house);
            }
        }
        private House ReadHouse()
        {
            House house = SerDesHouse.Read();
            if (house.Remote == null)
            {
                house.Remote = new RemoteControl(new WebReader(house), null);
                house.Remote.AddCommand(new SetLightCommand());
            }
            return house;
        }
    }
}
