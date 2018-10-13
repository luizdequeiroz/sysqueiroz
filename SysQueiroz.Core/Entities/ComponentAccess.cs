using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SysQueiroz.Core.Entities
{
    public class ComponentAccess : GenericEntity
    {
        [ForeignKey("Profile")] public int ProfileId { get; set; }
        public Profile Profile { get; set; }
        [ForeignKey("Component")] public int ComponentId { get; set; }
        public Component Component { get; set; }
    }
}
