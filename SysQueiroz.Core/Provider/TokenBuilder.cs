using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using SecurityKeyFromMicrosoft = Microsoft.IdentityModel.Tokens.SecurityKey;

namespace SysQueiroz.Core.Provider
{
    public class TokenBuilder
    {
        public SecurityKeyFromMicrosoft SecurityKey { get; set; }
        public string Subject { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }     
        public int ExpiryInMinutes { get; set; } = 60;
        private Dictionary<string, string> Claims { get; set; } = new Dictionary<string, string>();

        public TokenBuilder AddClaim(string type, string value)
        {
            this.Claims.Add(type, value);
            return this;
        }

        public Token Build()
        {
            EnsureArguments();

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, this.Subject),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            }.Union(this.Claims.Select(c => new Claim(c.Key, c.Value)));

            var token = new JwtSecurityToken
            (
                issuer: this.Issuer,
                audience: this.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(ExpiryInMinutes),
                signingCredentials: new SigningCredentials
                (
                    this.SecurityKey,
                    SecurityAlgorithms.HmacSha256
                )
            );

            return new Token(token);
        }

        private void EnsureArguments()
        {
            if (this.SecurityKey == null)
                throw new ArgumentNullException("Security Key is required.");
            if (string.IsNullOrEmpty(Subject))
                throw new ArgumentNullException("Subject is required.");
            if (string.IsNullOrEmpty(Issuer))
                throw new ArgumentNullException("Issuer is required.");
            if (string.IsNullOrEmpty(Audience))
                throw new ArgumentNullException("Audience is required.");
        }
    }
}