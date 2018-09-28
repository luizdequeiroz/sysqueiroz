using System;
using SysQueiroz.API.Treatments.Enums;

namespace SysQueiroz.API.Treatments
{
    /// <summary>
    /// Objeto de retorno genérico padrão da API.
    /// </summary>
    public abstract class Return { }
    /// <summary>
    /// Objeto de retorno padrão da API para resposta bem sucedidas.
    /// </summary>
    public class Success : Return
    {
        /// <summary>
        /// Construtor que recebe os dados de retorno.
        /// </summary>
        /// <param name="data">Dado referente à informações a serem retornadas na resposta de sucesso.</param>
        public Success(dynamic data)
        {
            Status = 0;
            Data = data;
        }
        /// <summary>
        /// Construtor que recebe os dados de retorno e token de acesso.
        /// </summary>
        /// <param name="data">Dado referente à informações a serem retornadas na resposta de sucesso.</param>
        /// <param name="token">Token de acesso que deverá ser informado no cabeçalho das requisições que requerem validação da sessão.</param>
        public Success(dynamic data, string token)
        {
            Status = 0;
            Data = data;
            Token = token;
        }
        /// <summary>
        /// Construtor que recebe informação de sucesso específico.
        /// </summary>
        /// <param name="suc">Informação de sucesso específico, definido na enum Suc.</param>
        public Success(Suc suc)
        {
            Status = (int)suc;
            Data = suc.ToDescription();
        }
        /// <summary>
        /// Construtor que recebe informação de sucesso específico, além dos dados de retorno, e ainda, o token de acesso.
        /// </summary>
        /// <param name="suc">Informação de sucesso específico, definido na enum Suc.</param>
        /// <param name="data">Dado referente à informações a serem retornadas na resposta de sucesso.</param>
        /// <param name="token">Token de acesso que deverá ser informado no cabeçalho das requisições que requerem validação da sessão.</param>
        public Success(Suc suc, dynamic data, string token)
        {
            Status = (int)suc;
            Data = data;
            Token = token;
            Message = suc.ToDescription();
        }
        /// <summary>
        /// Propriedade que identifica o código de retorno definido pelo construtor do objeto de retorno.
        /// </summary>
        public int Status;
        /// <summary>
        /// Propriedade referente às informações a serem retornadas na resposta.
        /// </summary>
        public object Data;
        /// <summary>
        /// Propriedade referente ao token de acesso que deverá ser informado no cabeçalho das requisições que requerem validação da sessão.
        /// </summary>
        public string Token;
        /// <summary>
        /// Propriedade que descreve em formato de texto o retorno definido pelo construtor do objeto de retorno, equivalente ao códito no Status.
        /// </summary>
        public string Message;
    }

    /// <summary>
    /// Objeto de retorno padrão da API para resposta mal sucedidas.
    /// </summary>
    public class Error : Success
    {
        /// <summary>
        /// Construtor que recebe informações de exceção de sistema.
        /// </summary>
        /// <param name="ex">Exceção de sistema a definir estrutura de retorno de erro.</param>
        public Error(Exception ex) : base(ex.Message)
        {
            Status = ex.HResult;
            StackTrace = ex.StackTrace;
        }
        /// <summary>
        /// Construtor que recebe informação de erro específico (ou falha).
        /// </summary>
        /// <param name="err">Informação de erro ou falha específico, definido na enum Err.</param>
        public Error(Err err) : base(err.ToDescription())
        {
            Status = (int)err;
        }
        /// <summary>
        /// Propriedade referente às informações de exceção detalhada a ser retornada na resposta em conjunto.
        /// </summary>
        /// <value></value>
        public string StackTrace { get; set; }
    }
}
