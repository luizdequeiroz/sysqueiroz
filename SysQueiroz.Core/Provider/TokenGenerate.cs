using SysQueiroz.Core.Entities;

namespace SysQueiroz.Core.Provider
{
    public static class TokenGenerate
    {
        public static string NewToken(this User user)
        {
            var token = new TokenBuilder
            {
                SecurityKey = SecurityKey.Create("lllc.5y5qu31r0zt3am.dotnetcore"),
                Subject = user.AccessLevel.ToString(),
                Issuer = "security.sysqueirozteam.com.br",
                Audience = "security.sysqueirozteam.com.br",
                ExpiryInMinutes = 5
            }
            .AddClaim("UserId", user.Id.ToString())
            .Build();

            return token.value;
        }
    }
}
