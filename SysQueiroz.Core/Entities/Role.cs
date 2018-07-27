using System.Collections.Generic;

namespace SysQueiroz.Core.Entities
{
      public class Role : GenericEntity
      {
            public string Name { get; set; }
            public IList<Method> Methods { get; set; }
            public string Description { get; set; }
            public IList<UserRole> UserRoles { get; set; }
      }
}