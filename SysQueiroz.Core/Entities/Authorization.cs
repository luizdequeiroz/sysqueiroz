using System.Collections.Generic;

namespace SysQueiroz.Core.Entities
{
    public class Authorization : GenericEntity
    {
        public User User { get; set; }
        public Menu Menu { get; set; }
    }
}