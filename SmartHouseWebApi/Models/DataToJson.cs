namespace SmartHouseWebApi.Models
{
    public class DataToJson
    {
        public string Room { get; set; }
        public string Device { get; set; }
        public string Command { get; set; }
        public string TypeOfReturn { get; set; }
        public string Value { get; set; }
    }
}