using System.Collections.Generic;
using System.Linq;
using SysQueiroz.Core.Entities;

namespace SysQueiroz.Core.Provider
{
    public static class TokenGenerate
    {
        public static string NewToken(this User user)
        {            
            var methods = string.Join('|', user.UserProfiles.Select(up => up.Profile).Select(p => string.Join('|', p.ProfileMethods.Select(pm => pm.Method).Select(m => m.Name))));

            var token = new TokenBuilder
            {
                SecurityKey = SecurityKey.Create("lllc.5y5qu31r0zt3am.dotnetcore"),
                Subject = user.Email,
                Issuer = "security.sysqueirozteam.com.br",
                Audience = "security.sysqueirozteam.com.br",
                ExpiryInMinutes = 5
            }
            .AddClaim("UserId", user.Id.ToString())
            .AddClaim("UserMethods", methods)
            .Build();

            return token.value;
        }
    }
}
