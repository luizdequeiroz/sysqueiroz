using System;
using SysQueiroz.API.Treatments.Enums;

namespace SysQueiroz.API.Treatments
{
    public class Return
    {
        public Return(dynamic data)
        {
            Status = 0;
            Data = data;
        }
        public Return(dynamic data, string token)
        {
            Status = 0;
            Data = data;
            Token = token;
        }
        public Return(Suc suc)
        {
            Status = (int)suc;
            Data = suc.ToDescription();
        }
        public Return(Suc suc, dynamic data, string token)
        {
            Status = (int)suc;
            Data = data;
            Token = token;
            Message = suc.ToDescription();
        }
        public int Status;
        public object Data;
        public string Token;
        public string Message;
    }

    public class Error : Return
    {
        public Error(Exception ex) : base(ex.Message)
        {
            Status = ex.HResult;
            StackTrace = ex.StackTrace;
        }
        public Error(Err err) : base(err.ToDescription())
        {
            Status = (int)err;
        }
        public string StackTrace { get; set; }
    }
}
