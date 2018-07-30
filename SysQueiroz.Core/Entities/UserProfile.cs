using System.ComponentModel.DataAnnotations.Schema;

namespace SysQueiroz.Core.Entities
{
    public class UserProfile : GenericEntity
    {
        [ForeignKey("User")] public int UserId { get; set; }
        public User User { get; set; }
        [ForeignKey("Profile")] public int ProfileId { get; set; }
        public Profile Profile { get; set; }
    }
}