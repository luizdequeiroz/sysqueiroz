namespace SysQueiroz.Core.Entities
{
    public class UserRole : GenericEntity
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}