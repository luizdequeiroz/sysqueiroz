using SysQueiroz.Core;
using SysQueiroz.Core.Entities;
using SysQueiroz.Repository.Base;
using System;
using System.Collections.Generic;

namespace SysQueiroz.Clients
{
    public class ClientDomain : Repository<Client>
    {
        private readonly SysQueirozContext _context;
        public ClientDomain(SysQueirozContext context) : base(context)
        {
            _context = context;
        }
    }
}
