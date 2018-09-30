using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SysQueiroz.Core.Entities
{
    public class MenuAccess : GenericEntity
    {
        [ForeignKey("Profile")] public int ProfileId { get; set; }
        public Profile Profile { get; set; }
        [ForeignKey("Menu")] public int MenuId { get; set; }
        public Menu Menu { get; set; }
    }
}