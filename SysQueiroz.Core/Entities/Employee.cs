﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SysQueiroz.Core.Entities
{
    public class Employee : GenericEntity
    {
        public string Name { get; set; }        
        public User User { get; set; }
        [ForeignKey("Department")] public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
