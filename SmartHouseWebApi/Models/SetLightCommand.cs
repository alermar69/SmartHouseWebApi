using System;
using SmartHouseDll;

namespace SmartHouseWebApi.Models
{
    public class SetLightCommand :ICommand
    {
        public SetLightCommand()
        {
            Name = "light";
            Inform = "Установить яркость";
        }

        public void Execute(IDataCommand dataCommand)
        {
            if (!string.IsNullOrEmpty(dataCommand.Value))
            {
                ILight light = dataCommand.GetDevice() as ILight;
                if (light != null)
                {
                    light.Brightness = (LightsState) Enum.Parse(typeof (LightsState), dataCommand.Value);

                }
            }
        }

        public void Undo(IDataCommand dataCommand)
        {
            throw new NotImplementedException();
        }

        public string Name { get; private set; }
        public string Inform { get; private set; }
    }
}