using System.Collections.Generic;

namespace SysQueiroz.Core.Entities
{
    public class Method : GenericEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public IList<ProfileMethod> ProfileMethods { get; set; }
    }
}