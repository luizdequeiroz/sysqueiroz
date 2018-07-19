using System;
using System.Collections.Generic;
using System.Text;

namespace SysQueiroz.Core.Entities
{
    public class Department : GenericEntity
    {
        public string Name { get; set; }
        public IList<Employee> Employees { get; set; }
    }
}
