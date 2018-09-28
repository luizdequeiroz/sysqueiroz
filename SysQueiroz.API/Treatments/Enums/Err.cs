using System.ComponentModel;

namespace SysQueiroz.API.Treatments.Enums
{
    /// <summary>
    /// 
    /// </summary>
    public enum Err
    {
        /// <summary>
        /// 
        /// </summary>
        [Description("Usuário não existe!")]
        UserDoesNotExist = -1,
        /// <summary>
        /// 
        /// </summary>
        [Description("Senha incorreta!")]
        WrongPassword = -2,
        /// <summary>
        /// 
        /// </summary>
        [Description("Não há usuários!")]
        NoUsers = -3,
        /// <summary>
        /// 
        /// </summary>
        [Description("Funcionário não existe!")]
        EmployeeDoesNotExist = -4,
        /// <summary>
        /// 
        /// </summary>
        [Description("Usuário não pertence a nenhum setor!")]
        UserDoesNotBelongToAnyDepartment = -5,
        /// <summary>
        /// 
        /// </summary>
        [Description("Usuário não possui permissão!")]
        UserDoesNotHavePermission = -6,
        /// <summary>
        /// 
        /// </summary>
        [Description("Usuário ainda não possui acessos!")]
        UserDoesNotHaveAccessYet = -7,
        /// <summary>
        /// 
        /// </summary>
        [Description("Não há clientes!")]
        NoClients = -8,
        /// <summary>
        /// 
        /// </summary>
        [Description("Preenchimento inválido!")]
        InvalidPadding = -9,
        /// <summary>
        /// 
        /// </summary>
        [Description("Não há perfis!")]
        NoProfiles = -10,
        /// <summary>
        /// 
        /// </summary>
        [Description("Múltiplos erros!")]
        MultipleErrors = -11,
        /// <summary>
        /// 
        /// </summary>
        [Description("Não há menus!")]
        NoMenus = -12,
        /// <summary>
        /// 
        /// </summary>
        [Description("Usuário já existe!")]
        UserAlreadyExists = -13,
        /// <summary>
        /// 
        /// </summary>
        [Description("Não há funcionários!")]
        NoEmployees = -14,
        /// <summary>
        /// 
        /// </summary>
        [Description("Não há setores!")]
        NoDepartments = -15,
        /// <summary>
        /// 
        /// </summary>
        [Description("Item de menu já existe!")]
        MenuItemAlreadyExists = -16,
        /// <summary>
        /// 
        /// </summary>
        [Description("Funcionário já existe!")]
        EmployeeAlreadyExists = -17,
        /// <summary>
        /// 
        /// </summary>
        [Description("Item de Menu não existe!")]
        MenuItemDoesNotExist = -18
      }
}
