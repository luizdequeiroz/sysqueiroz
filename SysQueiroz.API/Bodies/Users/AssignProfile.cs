using System.Collections.Generic;

namespace SysQueiroz.API.Bodies.Users
{
    /// <summary>
    /// 
    /// </summary>
    public class Assigns
    {
        /// <summary>
        /// 
        /// </summary>
        public int ProfileId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <value></value>
        public int MenuId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public List<int> All { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int[] Selecteds { get; set; }
    }
}
