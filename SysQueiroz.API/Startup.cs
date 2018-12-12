using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using SysQueiroz.API.Treatments.Enums;
using SysQueiroz.Core;
using System;
using System.IO;
using System.Threading.Tasks;
using SecurityKeyFromCore = SysQueiroz.Core.Provider.SecurityKey;

namespace SysQueiroz.API
{
    class Startup
    {
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

                            if (context.IsPublicMethod(Configuration))
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
                    policy =>
                    {
                        policy.RequireClaim("UserId");
                        policy.RequireClaim("UserMethods");
                    });
            });

            services.AddMvc();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1",
                    new Info
                    {
                        Title = "SysQueiroz API",
                        Version = "1.0.0.0",
                        Description = "Serviço de sistema SysQueiroz em formato API REST ASP.NET Core.",
                        Contact = new Contact
                        {
                            Name = "Luiz de Queiroz",
                            Email = "oluizdequeiroz@gmail.com"
                        }
                    }
                );

                string applicationPath = PlatformServices.Default.Application.ApplicationBasePath;
                string applicationName = PlatformServices.Default.Application.ApplicationName;
                string xmlApplicationDocPath = Path.Combine(applicationPath, $"{applicationName}.xml");

                c.IncludeXmlComments(xmlApplicationDocPath);
            });

            StartupCore.Init(Configuration.GetConnectionString("development"));
            //StartupCore.Init(Configuration.GetConnectionString("production"));
            StartupCore.Configure(services);
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

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "SysQueiroz API");
            });
        }
    }
}
