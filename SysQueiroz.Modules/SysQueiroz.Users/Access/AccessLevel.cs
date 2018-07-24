using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using SysQueiroz.Core.Entities;

namespace SysQueiroz.Users.Access
{
    public class AccessLevelRequirement : IAuthorizationRequirement
    {
        public int Level { get; private set; }
        public AccessLevelRequirement(int level)
        {
            Level = level;
        }
    }

    public class AccessLevel : AuthorizationHandler<AccessLevelRequirement, User>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AccessLevelRequirement requirement, User user)
        {
            if(context.User.HasClaim(c => c.Subject.ToString() == user.AccessLevel.ToString()))
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}