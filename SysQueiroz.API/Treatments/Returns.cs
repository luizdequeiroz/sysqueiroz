using System;
using SysQueiroz.API.Treatments.Enums;

namespace SysQueiroz.API.Treatments
{
    /// <summary>
    /// 
    /// </summary>
    public class Return
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        public Return(dynamic data)
        {
            Status = 0;
            Data = data;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <param name="token"></param>
        public Return(dynamic data, string token)
        {
            Status = 0;
            Data = data;
            Token = token;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="suc"></param>
        public Return(Suc suc)
        {
            Status = (int)suc;
            Data = suc.ToDescription();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="suc"></param>
        /// <param name="data"></param>
        /// <param name="token"></param>
        public Return(Suc suc, dynamic data, string token)
        {
            Status = (int)suc;
            Data = data;
            Token = token;
            Message = suc.ToDescription();
        }
        /// <summary>
        /// 
        /// </summary>
        public int Status;
        /// <summary>
        /// 
        /// </summary>
        public object Data;
        /// <summary>
        /// 
        /// </summary>
        public string Token;
        /// <summary>
        /// 
        /// </summary>
        public string Message;
    }

    /// <summary>
    /// 
    /// </summary>
    public class Error : Return
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ex"></param>
        /// <returns></returns>
        public Error(Exception ex) : base(ex.Message)
        {
            Status = ex.HResult;
            StackTrace = ex.StackTrace;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="err"></param>
        /// <returns></returns>
        public Error(Err err) : base(err.ToDescription())
        {
            Status = (int)err;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <value></value>
        public string StackTrace { get; set; }
    }
}
