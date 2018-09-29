using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SysQueiroz.Core.Entities
{
    public class MenuAccess : GenericEntity
    {
        [ForeignKey("User")] public int UserId { get; set; }
        public User User { get; set; }
        [ForeignKey("Menu")] public int MenuId { get; set; }
        public Menu Menu { get; set; }
    }
}