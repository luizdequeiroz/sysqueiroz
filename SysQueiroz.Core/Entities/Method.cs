namespace SysQueiroz.Core.Entities
{
      public class Method : GenericEntity
      {
            public string Name { get; set; }
            public string Description { get; set; }
            public Role Role { get; set; }
      }
}