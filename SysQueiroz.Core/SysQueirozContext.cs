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
        public DbSet<Authorization> Authorizations { get; set; }
        public DbSet<Client> Clients { get; set; }
    }
}