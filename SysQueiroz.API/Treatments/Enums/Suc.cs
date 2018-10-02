using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SysQueiroz.API.Treatments.Enums
{
    /// <summary>
    /// Enum que cataloga e descreve os sucessos predefinidos de retorno da API.
    /// </summary>
    public enum Suc
    {
        /// <summary>
        /// Código de sucesso: 1; Descrição do erro: "Cliente cadastrado com sucesso!"
        /// </summary>
        [Description("Cliente cadastrado com sucesso!")]
        ClientSuccessfullyRegistered = 1,
        /// <summary>
        /// Código de sucesso: 2; Descrição do erro: "Perfil atualizado com sucesso!"
        /// </summary>
        [Description("Perfil atualizado com sucesso!")]
        ProfileUpdatedSuccessfully = 2,
        /// <summary>
        /// Código de sucesso: 3; Descrição do erro: "Perfil deletado com sucesso!"
        /// </summary>
        [Description("Perfil deletado com sucesso!")]
        ProfileDeletedSuccessfully = 3,
        /// <summary>
        /// Código de sucesso: 4; Descrição do erro: "Perfil atribuido com sucesso!"
        /// </summary>
        [Description("Perfil atribuido com sucesso!")]
        SuccessfullyAssignedProfile = 4,
        /// <summary>
        /// Código de sucesso: 5; Descrição do erro: "Dados de inicialização inseridos com sucesso!"
        /// </summary>
        [Description("Dados de inicialização inseridos com sucesso!")]
        InitializationDataEnteredSuccessfully = 5,
        /// <summary>
        /// Código de sucesso: 6; Descrição do erro: "Item de menu atualizado com sucesso!"
        /// </summary>
        [Description("Item de menu atualizado com sucesso!")]
        MenuItemUpdatedSuccessfully = 6,
        /// <summary>
        /// Código de sucesso: 7; Descrição do erro: "Item de menu deletado com sucesso!"
        /// </summary>
        [Description("Item de menu deletado com sucesso!")]
        MenuItemDeletedSuccessfully = 7,
        /// <summary>
        /// Código de sucesso: 8; Descrição do erro: "Acesso a item de menu atribuido com sucesso!"
        /// </summary>
        [Description("Acesso a item de menu atribuido com sucesso!")]
        SuccessfullyAssignedMenuItem = 8,
        /// <summary>
        /// Código de sucesso: 9; Descrição do erro: "Sessão revalidada com sucesso!"
        /// </summary>
        [Description("Sessão revalidada com sucesso!")]
        SessionRevalidatedSuccessfully = 9,
        /// <summary>
        /// Código de sucesso: 10; Descrição do erro: "Usuário cadastrado com sucesso!"
        /// </summary>
        [Description("Usuário cadastrado com sucesso!")]
        UserSuccessfullyRegistered = 10,
        /// <summary>
        /// Código de sucesso: 11; Descrição do erro: "Item de menu criado com sucesso!"
        /// </summary>
        [Description("Item de menu criado com sucesso!")]
        MenuItemSuccessfullyCreated = 11,
        /// <summary>
        /// Código de sucesso: 12; Descrição do erro: "Funcionário cadastrado com sucesso!"
        /// </summary>
        [Description("Funcionário cadastrado com sucesso!")]
        EmployeeSuccessfullyRegistered = 12,
        /// <summary>
        /// Código de sucesso: 13; Descrição do erro: "Funcionário atualizado com sucesso!"
        /// </summary>
        [Description("Funcionário atualizado com sucesso!")]
        EmployeeUpdatedSuccessfully = 13,
        /// <summary>
        /// Código de sucesso: 14; Descrição do erro: "Funcionário deletado com sucesso!"
        /// </summary>
        [Description("Funcionário deletado com sucesso!")]
        EmployeeDeletedSuccessfully = 14
    }
}
