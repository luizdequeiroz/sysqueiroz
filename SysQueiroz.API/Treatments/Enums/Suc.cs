using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SysQueiroz.API.Treatments.Enums
{
    /// <summary>
    /// 
    /// </summary>
    public enum Suc
    {
        /// <summary>
        /// 
        /// </summary>
        [Description("Cliente cadastrado com sucesso!")]
        ClientSuccessfullyRegistered = 1,
        /// <summary>
        /// 
        /// </summary>
        [Description("Perfil atualizado com sucesso!")]
        ProfileUpdatedSuccessfully = 2,
        /// <summary>
        /// 
        /// </summary>
        [Description("Perfil deletado com sucesso!")]
        ProfileDeletedSuccessfully = 3,
        /// <summary>
        /// 
        /// </summary>
        [Description("Perfil atribuido com sucesso!")]
        SuccessfullyAssignedProfile = 4,
        /// <summary>
        /// 
        /// </summary>
        [Description("Dados de inicialização inseridos com sucesso!")]
        InitializationDataEnteredSuccessfully = 5,
        /// <summary>
        /// 
        /// </summary>
        [Description("Item de menu atualizado com sucesso!")]
        MenuItemUpdatedSuccessfully = 6,
        /// <summary>
        /// 
        /// </summary>
        [Description("Item de menu deletado com sucesso!")]
        MenuItemDeletedSuccessfully = 7,
        /// <summary>
        /// 
        /// </summary>
        [Description("Acesso a item de menu atribuido com sucesso!")]
        SuccessfullyAssignedMenuItem = 8,
        /// <summary>
        /// 
        /// </summary>
        [Description("Sessão revalidada com sucesso!")]
        SessionRevalidatedSuccessfully = 9,
        /// <summary>
        /// 
        /// </summary>
        [Description("Usuário cadastrado com sucesso!")]
        UserSuccessfullyRegistered = 10,
        /// <summary>
        /// 
        /// </summary>
        [Description("Item de menu criado com sucesso!")]
        MenuItemSuccessfullyCreated = 11,
        /// <summary>
        /// 
        /// </summary>
        [Description("Funcionário cadastrado com sucesso!")]
        EmployeeSuccessfullyRegistered = 12
    }
}
