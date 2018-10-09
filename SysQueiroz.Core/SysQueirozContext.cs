using Microsoft.EntityFrameworkCore;
using SysQueiroz.Core.Entities;

namespace SysQueiroz.Core
{
    public class SysQueirozContext : DbContext 
    {
        public SysQueirozContext(DbContextOptions<SysQueirozContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<MenuAccess> MenuAccesses { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Method> Methods { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<ProfileMethod> ProfileMethods { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Client> Clients { get; set; }
    }
}