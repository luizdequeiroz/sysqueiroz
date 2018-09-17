using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SysQueiroz.API.Treatments.Enums
{
    public enum Suc
    {
        [Description("Cliente cadastrado com sucesso!")]
        ClientSuccessfullyRegistered = 1,
        [Description("Perfil atualizado com sucesso!")]
        ProfileUpdatedSuccessfully = 2,
        [Description("Perfil deletado com sucesso!")]
        ProfileDeletedSuccessfully = 3,
        [Description("Perfil atribuido com sucesso!")]
        SuccessfullyAssignedProfile = 4,
        [Description("Dados de inicialização inseridos com sucesso!")]
        InitializationDataEnteredSuccessfully = 5,
        [Description("Item de menu atualizado com sucesso!")]
        MenuItemUpdatedSuccessfully = 6,
        [Description("Item de menu deletado com sucesso!")]
        MenuItemDeletedSuccessfully = 7,
        [Description("Acesso a item de menu atribuido com sucesso!")]
        SuccessfullyAssignedMenuItem = 8,
        [Description("Sessão revalidada com sucesso!")]
        SessionRevalidatedSuccessfully = 9,
        [Description("Usuário cadastrado com sucesso!")]
        UserSuccessfullyRegistered = 10,
        [Description("Item de menu criado com sucesso!")]
        MenuItemSuccessfullyCreated = 11,
        [Description("Funcionário cadastrado com sucesso!")]
        EmployeeSuccessfullyRegistered = 12
      }
}
