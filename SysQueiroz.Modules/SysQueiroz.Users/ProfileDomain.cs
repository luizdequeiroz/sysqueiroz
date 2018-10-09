using SysQueiroz.Core;
using SysQueiroz.Core.Entities;
using SysQueiroz.Repository.Base;
using System.Collections.Generic;
using System.Linq;

namespace SysQueiroz.Users
{
    public class ProfileDomain : Repository<Profile>
    {
        private readonly SysQueirozContext _context;
        public ProfileDomain(SysQueirozContext context) : base(context)
        {
            _context = context;
        }

        public void DeleteProfile(int id)
        {
            var profile = SelectByID<Profile>(id);
            Delete(profile);
        }

        public void InsertAssignsAndRemoveUnassigns(int profileId, List<int> all, IList<int> selecteds)
        {
            foreach (var userId in selecteds)
            {
                var userProfile = new UserProfile
                {
                    UserId = userId,
                    ProfileId = profileId
                };

                var uProfile = SelectWhere<UserProfile>(up => up.UserId == userId && up.ProfileId == profileId).FirstOrDefault();
                if (uProfile == null) Insert(userProfile);
                all.Remove(userId);
            }

            foreach (var userId in all)
            {
                var uProfile = SelectWhere<UserProfile>(up => up.UserId == userId && up.ProfileId == profileId).FirstOrDefault();
                if (uProfile != null) Delete(uProfile);
            }
        }
    }
}
