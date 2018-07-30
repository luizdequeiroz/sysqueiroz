using SysQueiroz.Core;
using SysQueiroz.Core.Entities;
using SysQueiroz.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace SysQueiroz.Users
{
    public class ProfileDomain : Repository<Profile>
    {
        private readonly SysQueirozContext _context;
        public ProfileDomain(SysQueirozContext context) : base(context)
        {
            _context = context;
        }
    }
}
