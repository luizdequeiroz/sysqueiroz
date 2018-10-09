using System.ComponentModel.DataAnnotations.Schema;

namespace SysQueiroz.Core.Entities
{
    public class ProfileMethod : GenericEntity
    {
        [ForeignKey("Profile")] public int ProfileId { get; set; }
        public Profile Profile { get; set; }
        [ForeignKey("Method")] public int MethodId { get; set; }
        public Method Method { get; set; }
    }
}
