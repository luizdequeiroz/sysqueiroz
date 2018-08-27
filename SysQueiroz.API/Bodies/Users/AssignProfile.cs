using System;
using System.Collections.Generic;

namespace SysQueiroz.API.Bodies.Users
{
    public class Assigns
    {
        public int ProfileId { get; set; }
        public List<int> All { get; set; }
        public int[] Selecteds { get; set; }
    }
}
