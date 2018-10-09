using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace SysQueiroz.API
{
    static class Extensions
    {
        public static bool ItsAllowed(this TokenValidatedContext context)
        {
            var methods = context.Principal.FindFirst(c => c.Type == "UserMethods").Value.Split('|');
            return methods.Contains(context.Request.Path.Value.Split('/')[2]);
        }
        public static bool IsPublicMethod(this TokenValidatedContext context, IConfiguration Configuration)
        {
            var publics = Configuration.GetSection("PublicMethods").AsEnumerable();
            return publics.Select(p => p.Value).Contains(context.Request.Path.Value.Split('/')[2]);
        }
    }
}