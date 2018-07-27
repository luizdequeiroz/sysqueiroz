using System.ComponentModel.DataAnnotations.Schema;

namespace SysQueiroz.Core.Entities
{
      public class Method : GenericEntity
      {
            public string Name { get; set; }
            public string Description { get; set; }
            [ForeignKey("Role")] public int RoleId { get; set; }
            public Role Role { get; set; }
      }
}