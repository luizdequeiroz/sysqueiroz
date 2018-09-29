using System.Collections.Generic;

namespace SysQueiroz.Core.Entities
{
      public class Profile : GenericEntity
      {
            public string Name { get; set; }
            public IList<ProfileMethod> ProfileMethods { get; set; }
            public string Description { get; set; }
            public IList<UserProfile> UserProfiles { get; set; }
      }
}