using System;
using System.Collections.Generic;
using System.Text;

namespace SysQueiroz.Core.Entities
{
    public class Component : GenericEntity
    {
        public string Path { get; set; }
        public string Parent { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public IList<ComponentAccess> ComponentAccesses { get; set; }
    }
}
