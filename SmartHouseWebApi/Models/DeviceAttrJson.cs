using System.Collections.Generic;

namespace SmartHouseWebApi.Models
{
    public class DeviceAttrJson
    {
        public List<string> Ids { get; set; }
        public List<string> Atrs { get; set; }
        public List<string> Values { get; set; }
    }
}