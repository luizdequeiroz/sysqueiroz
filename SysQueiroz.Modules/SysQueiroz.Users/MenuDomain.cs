using SysQueiroz.Core;
using SysQueiroz.Core.Entities;
using SysQueiroz.Repository.Base;
using SysQueiroz.Users.Objects;
using System.Collections.Generic;
using System.Linq;

namespace SysQueiroz.Users
{
    public class MenuDomain : Repository<Menu>
    {
        private readonly SysQueirozContext _context;
        public MenuDomain(SysQueirozContext context) : base(context)
        {
            _context = context;
        }

        public void DeleteMenuItem(int id)
        {
            var menu = SelectByID<Menu>(id);
            Delete(menu);
        }

        public void InsertAssignsAndRemoveUnassigns(int menuId, List<int> all, IList<int> selecteds)
        {
            foreach (var profileId in selecteds)
            {
                var MenuAccess = new MenuAccess
                {
                    ProfileId = profileId,
                    MenuId = menuId
                };

                var mAccess = SelectWhere<MenuAccess>(ma => ma.ProfileId == profileId && ma.MenuId == menuId).FirstOrDefault();
                if (mAccess == null) Insert(MenuAccess);
                all.Remove(profileId);
            }

            foreach (var profileId in all)
            {
                var mAccess = SelectWhere<MenuAccess>(ma => ma.ProfileId == profileId && ma.MenuId == menuId).FirstOrDefault();
                if (mAccess != null) Delete(mAccess);
            }
        }

        private IList<SuMenu> OrganizeHierarchically(string href, List<SuMenu> suMenus)
        {
            var subMenus = suMenus.Where(m => m.SuperHref != href).Select(m => new SuMenu(m)).ToList();
            var superMenus = suMenus.Where(m => m.SuperHref == href).Select(m => new SuMenu(m) {
                SubMenus = OrganizeHierarchically(m.Href, subMenus)
            }).ToList();

            return superMenus;
        }

        public IList<SuMenu> OrganizeHierarchically(List<Menu> menus)
        {
            var subMenus = menus.Where(m => !string.IsNullOrEmpty(m.SuperHref)).Select(m => new SuMenu(m)).ToList();
            var superMenus = menus.Where(m => string.IsNullOrEmpty(m.SuperHref)).Select(m => new SuMenu(m) {
                SubMenus = OrganizeHierarchically(m.Href, subMenus) 
            }).ToList();

            return superMenus;
        }

        public bool InsertNewMenuItem(Menu menu)
        {
            var mi = SelectWhere<Menu>(m => m.Href == menu.Href && m.Name == menu.Name).FirstOrDefault();
            if (mi != null) return false;

            Insert(menu);
            return true;
        }

        public IList<Menu> SelectMenuByUserId(int id)
        {
            var userProfiles = SelectWhere<UserProfile>(up => up.UserId == id);
            var profiles = userProfiles.Select(up => up.Profile);
            var menuAccesses = profiles.Select(p => p.MenuAccesses);

            var menus = menuAccesses.SelectMany(ma => ma.Select(m => m.Menu)).Distinct().OrderBy(m => m.Name).ToList();

            return menus;
        }
    }
}
