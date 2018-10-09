using SysQueiroz.Core.Entities;
using System.Collections.Generic;

namespace SysQueiroz.Users.Objects
{
    public class SuMenu : Menu
    {

        public SuMenu(Menu m)
        {
            this.Id = m.Id;
            this.Href = m.Href;
            this.Icon = m.Icon;
            this.Name = m.Name;
            this.SuperHref = m.SuperHref;
        }
        public IList<SuMenu> SubMenus { get; set; }
    }
}