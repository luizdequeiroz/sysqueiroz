using System.Collections.Generic;

namespace SysQueiroz.Core.Entities
{
    public class Menu : GenericEntity
    {
        public string Icon { get; set; }
        public string Name { get; set; }
        public string Href { get; set; }
        public string superHref { get; set; }
        public IList<MenuAccess> MenuAccesses { get; set; }
    }
}