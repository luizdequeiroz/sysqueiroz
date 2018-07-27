using System.Collections.Generic;

namespace SysQueiroz.Core.Entities
{
    public class MenuAccess : GenericEntity
    {
        public User User { get; set; }
        public Menu Menu { get; set; }
    }
}