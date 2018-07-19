using SysQueiroz.Core.Entities;

namespace SysQueiroz.Core.Provider
{
    public static class TokenGenerate
    {
        public static string NewToken(this User user)
        {
            var token = new TokenBuilder
            {
                SecurityKey = SecurityKey.Create("ljfb.4c0d3t3am.dotnetcore"),
                Subject = user.Email,
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
