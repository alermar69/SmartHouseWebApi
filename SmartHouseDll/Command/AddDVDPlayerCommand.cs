namespace SmartHouseDll
{
    public class AddDVDPlayerCommand : ICommand
    {
        public AddDVDPlayerCommand()
        {
            Name = "addDVD";
            Inform = "�������� DVD �����";
        }

        public string Name { get; private set; }
        public string Inform { get; private set; }

        public void Execute(IDataCommand dataCommand)
        {
            Room room = dataCommand.GetRoom();
            if (room != null)
            {
                room.AddDevice(new DVDPlayer(dataCommand.DeviceData));
            }

        }
        public void Undo(IDataCommand dataCommand)
        {
            dataCommand.Home.DeleteDevice(dataCommand.RoomData, dataCommand.DeviceData);
        }
    }
}