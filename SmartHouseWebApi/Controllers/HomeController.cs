using System.Linq;
using System.Web.Mvc;
using SmartHouseDll;
using SmartHouseWebApi.Models;

namespace SmartHouseWebApi.Controllers
{
    public class HomeController : Controller
    {
        private House _house;


        public ActionResult Index()
        {
            _house = ReadHouse();

            if (Request.IsAjaxRequest())
                return PartialView(_house);
            else
                return View(_house);  
        }
        public ActionResult AddTools()
        {
            _house = ReadHouse();
            return PartialView(_house);
        }
        public ActionResult AddRoom()
        {
            _house = ReadHouse();

            _house.Remote.Reader.RoomData = Request.Params["addRoom[Room]"];
            _house.Remote.Reader.CommandData = Request.Params["addRoom[Command]"];
            _house.Remote.PushButton();

            SaveHouse();
            return PartialView("Device/Room", _house.GetRoom(_house.Remote.Reader.RoomData));
        }
        public ActionResult AddDevice()
        {
            _house = ReadHouse();

            _house.Remote.Reader.RoomData = Request.Params["addDevice[Room]"];
            _house.Remote.Reader.DeviceData = Request.Params["addDevice[Device]"];
            _house.Remote.Reader.CommandData = Request.Params["addDevice[Command]"];

            _house.Remote.Reader.CommandData = _house.Remote.Commands.Values.
                Where(c => c.Inform.Contains("Добавить " + Request.Params["addDevice[Command]"])).
                Select(c => c.Name).First();

            _house.Remote.PushButton();

            SaveHouse();

            Device device = _house.GetDevice(_house.Remote.Reader.RoomData, _house.Remote.Reader.DeviceData);

            ViewBag.room = Request.Params["addDevice[Room]"].ToLower();

            if (device != null)
            {
                if (device is Lamp)
                {
                    return PartialView("Device/Lamp", device as Lamp);
                }
                if (device is ClimatControl)
                {
                    return PartialView("Device/ClimatControl", device as ClimatControl);
                }
                if (device is Tv)
                {
                    return PartialView("Device/Tv", device as Tv);
                }
            }

            return new EmptyResult();
        }
        public ActionResult DelTools()
        {
            _house = ReadHouse();           
            return PartialView(_house);
        }
        public ActionResult RedactTools()
        {
            _house = ReadHouse();
            return PartialView(_house);
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
