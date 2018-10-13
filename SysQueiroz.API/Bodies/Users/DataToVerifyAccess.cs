using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SysQueiroz.API.Bodies.Users
{
    /// <summary>
    /// 
    /// </summary>
    public class DataToVerifyAccess
    {
        /// <summary>
        /// 
        /// </summary>
        public int SessionId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Parent { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Name { get; set; }
    }
}
