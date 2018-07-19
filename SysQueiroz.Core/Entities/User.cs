using System;
using System.Collections.Generic;
using System.Text;

namespace SysQueiroz.Core.Entities
{
    public class User : GenericEntity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public Employee Employee { get; set; }
        public IList<Authorization> Authorizations { get; set; }
    }
}
