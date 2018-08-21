using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SysQueiroz.Core.Entities
{
    public class MenuMethod : GenericEntity
    {
        [ForeignKey("Menu")] public int MenuId { get; set; }
        public Menu Menu { get; set; }
        [ForeignKey("Method")] public int MethodId { get; set; }
        public Method Method { get; set; }
    }
}
