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
        InitializationDataEnteredSuccessfully = 5
    }
}
