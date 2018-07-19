﻿using System.ComponentModel;

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
        UserDoesNotHaveAccessYet = 0
      }
}