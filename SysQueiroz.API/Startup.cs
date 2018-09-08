using System;
using System.Threading.Tasks;
using SysQueiroz.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SecurityKeyFromCore = SysQueiroz.Core.Provider.SecurityKey;
using System.Text;
using SysQueiroz.Core.Entities;
using SysQueiroz.API.Treatments.Enums;
using System.Linq;

namespace SysQueiroz.API
{
    public class Startup
    {
        //private static string connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=dbtest;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"; //"Server=(localdb)\mssqllocaldb;Database=dbtest;Trusted_Connection=True;ConnectRetryCount=0";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(
                options => options.AddPolicy(
                    "AllowAll", p =>
                    {
                        p.AllowAnyOrigin();
                        p.AllowAnyMethod();
                        p.AllowAnyHeader();
                    }
                )
            );

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(option =>
                {
                    option.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = "security.sysqueirozteam.com.br",
                        ValidAudience = "security.sysqueirozteam.com.br",
                        IssuerSigningKey = SecurityKeyFromCore.Create("lllc.5y5qu31r0zt3am.dotnetcore")
                    };

                    option.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = context =>
                        {
                            Console.WriteLine($"OnAuthenticationFailed: {context.Exception.Message}");

                            return Task.CompletedTask;
                        },
                        OnTokenValidated = context =>
                        {
                            Console.WriteLine($"OnTokenValidated {context.SecurityToken}");

                            if(context.IsPublicMethod(Configuration))
                                context.Success();
                            else if (context.ItsAllowed()) 
                                context.Success();                            
                            else context.Fail(Err.UserDoesNotHavePermission.ToDescription());

                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("UserAccess",
                    policy => {
                        policy.RequireClaim("UserId");
                        policy.RequireClaim("UserMethods");
                    });
            });

            services.AddMvc();

            StartupRepository.Init(Configuration.GetConnectionString("development"));
            StartupRepository.Configure(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("AllowAll");

            app.UseAuthentication();
            app.UseStaticFiles();

            app.UseMvc();
        }        
    }
}
