namespace SmartHouseDll
{
    public class AddClimatControlCommand : ICommand
    {
        public AddClimatControlCommand()
        {
            Name = "addClContr";
            Inform = "�������� ������-��������";
        }

        public string Name { get; private set; }
        public string Inform { get; private set; }

        public void Execute(IDataCommand dataCommand)
        {
            Room room = dataCommand.GetRoom();
            if (room != null)
            {
                room.AddDevice(new ClimatControl(dataCommand.DeviceData));
            }

        }
        public void Undo(IDataCommand dataCommand)
        {
            dataCommand.Home.DeleteDevice(dataCommand.RoomData, dataCommand.DeviceData);
        }
    }
}