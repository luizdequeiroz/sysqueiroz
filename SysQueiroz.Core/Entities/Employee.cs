using System;
using System.Collections.Generic;
using System.Text;

namespace SysQueiroz.Core.Entities
{
    public class Employee : GenericEntity
    {
        public string Name { get; set; }
        public User User { get; set; }
        public Department Department { get; set; }
    }
}
