using System.ComponentModel;

namespace SysQueiroz.API.Treatments.Enums
{
    public enum Err
    {
        [Description("Usuário não existe!")]
        UserDoesNotExist = -1,
        [Description("Senha incorreta!")]
        WrongPassword = -2,
        [Description("Não há usuários!")]
        NoUsers = -3,
        [Description("Funcionário não existe!")]
        EmployeeDoesNotExist = -4,
        [Description("Usuário não pertence a nenhum setor!")]
        UserDoesNotBelongToAnyDepartment = -5,
        [Description("Usuário não possui permissão!")]
        UserDoesNotHavePermission = -6,
        [Description("Usuário ainda não possui acessos!")]
        UserDoesNotHaveAccessYet = -7,
        [Description("Não há clientes!")]
        NoClients = -8,
        [Description("Preenchimento inválido!")]
        InvalidPadding = -9,
        [Description("Não há perfis!")]
        NoProfiles = -10,
        [Description("Múltiplos erros!")]
        MultipleErrors = -11,
        [Description("Não há menus!")]
        NoMenus = -12,
        [Description("Usuário já existe!")]
        UserAlreadyExists = -13
    }
}
