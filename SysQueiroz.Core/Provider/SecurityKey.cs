using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace SysQueiroz.Core.Provider
{
    public class SecurityKey
    {
        public static SymmetricSecurityKey Create(string secret) => 
            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
    }
}