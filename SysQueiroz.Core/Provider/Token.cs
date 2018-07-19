using System;
using System.IdentityModel.Tokens.Jwt;

namespace SysQueiroz.Core.Provider
{
    public class Token
    {
        private JwtSecurityToken _token;
        internal Token(JwtSecurityToken token) => this._token = token;
        public DateTime ValidTo => _token.ValidTo;
        public string value => new JwtSecurityTokenHandler().WriteToken(_token);
    }
}