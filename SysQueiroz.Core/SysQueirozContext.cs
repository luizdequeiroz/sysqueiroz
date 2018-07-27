using SysQueiroz.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace SysQueiroz.Core 
{
    public class SysQueirozContext : DbContext 
    {
        public SysQueirozContext(DbContextOptions<SysQueirozContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<MenuAccess> MenuAccesses { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Method> Methods { get; set; }
        public DbSet<UserRole> UserRoles { get;set; }
    }
}