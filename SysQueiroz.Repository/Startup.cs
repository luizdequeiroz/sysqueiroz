using System;
using SysQueiroz.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.DependencyInjection;

namespace SysQueiroz.Repository
{
    public class StartupRepository : IDesignTimeDbContextFactory<SysQueirozContext>
    {
        private static string _connectionString;

        public static void Init(string connectionString) 
        {
            _connectionString = connectionString;
        }

        public static void Configure(IServiceCollection services) 
        {           
            services.AddDbContext<SysQueirozContext>(options => options.UseSqlServer(_connectionString));
        }

        public SysQueirozContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<SysQueirozContext>();
            optionsBuilder.UseSqlServer(_connectionString);

            return new SysQueirozContext(optionsBuilder.Options);
        }
    }
}
