using System.ComponentModel;

namespace SysQueiroz.API.Treatments.Enums
{
    /// <summary>
    /// Enum que cataloga e descreve os erros predefinidos de retorno da API.
    /// </summary>
    public enum Err
    {
        /// <summary>
        /// Código de erro: -1; Descrição do erro: "Usuário não existe!"
        /// </summary>
        [Description("Usuário não existe!")]
        UserDoesNotExist = -1,
        /// <summary>
        /// Código de erro: -2; Descrição do erro: "Senha incorreta!"
        /// </summary>
        [Description("Senha incorreta!")]
        WrongPassword = -2,
        /// <summary>
        /// Código de erro: -3; Descrição do erro: "Não há usuários!"
        /// </summary>
        [Description("Não há usuários!")]
        NoUsers = -3,
        /// <summary>
        /// Código de erro: -4; Descrição do erro: "Funcionário não existe!"
        /// </summary>
        [Description("Funcionário não existe!")]
        EmployeeDoesNotExist = -4,
        /// <summary>
        /// Código de erro: -5; Descrição do erro: "Usuário não pertence a nenhum setor!"
        /// </summary>
        [Description("Usuário não pertence a nenhum setor!")]
        UserDoesNotBelongToAnyDepartment = -5,
        /// <summary>
        /// Código de erro: -6; Descrição do erro: "Usuário não possui permissão!"
        /// </summary>
        [Description("Usuário não possui permissão!")]
        UserDoesNotHavePermission = -6,
        /// <summary>
        /// Código de erro: -7; Descrição do erro: "Usuário ainda não possui acessos!"
        /// </summary>
        [Description("Usuário ainda não possui acessos!")]
        UserDoesNotHaveAccessYet = -7,
        /// <summary>
        /// Código de erro: -8; Descrição do erro: "Não há clientes!"
        /// </summary>
        [Description("Não há clientes!")]
        NoClients = -8,
        /// <summary>
        /// Código de erro: -9; Descrição do erro: "Não há perfis!"
        /// </summary>
        [Description("Não há perfis!")]
        NoProfiles = -9,
        /// <summary>
        /// Código de erro: -10; Descrição do erro: "Múltiplos erros!"
        /// </summary>
        [Description("Múltiplos erros!")]
        MultipleErrors = -10,
        /// <summary>
        /// Código de erro: -11; Descrição do erro: "Não há menus!"
        /// </summary>
        [Description("Não há menus!")]
        NoMenus = -11,
        /// <summary>
        /// Código de erro: -12; Descrição do erro: "Usuário já existe!"
        /// </summary>
        [Description("Usuário já existe!")]
        UserAlreadyExists = -12,
        /// <summary>
        /// Código de erro: -13; Descrição do erro: "Não há funcionários!"
        /// </summary>
        [Description("Não há funcionários!")]
        NoEmployees = -13,
        /// <summary>
        /// Código de erro: -14; Descrição do erro: "Não há setores!"
        /// </summary>
        [Description("Não há setores!")]
        NoDepartments = -14,
        /// <summary>
        /// Código de erro: -15; Descrição do erro: "Item de menu já existe!"
        /// </summary>
        [Description("Item de menu já existe!")]
        MenuItemAlreadyExists = -15,
        /// <summary>
        /// Código de erro: -16; Descrição do erro: "Funcionário já existe!"
        /// </summary>
        [Description("Funcionário já existe!")]
        EmployeeAlreadyExists = -16,
        /// <summary>
        /// Código de erro: -17; Descrição do erro: "Item de Menu não existe!"
        /// </summary>
        [Description("Item de Menu não existe!")]
        MenuItemDoesNotExist = -17,
        /// <summary>
        /// Código de erro: -18; Descrição do erro: "Perfil de usuário já existe!"
        /// </summary>
        [Description("Perfil de usuário já existe!")]
        ProfileAlreadyExists = -18
    }
}
