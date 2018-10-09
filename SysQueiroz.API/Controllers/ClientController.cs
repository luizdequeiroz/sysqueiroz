using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SysQueiroz.API.Treatments;
using SysQueiroz.API.Treatments.Enums;
using SysQueiroz.Clients;
using SysQueiroz.Core;
using SysQueiroz.Core.Entities;
using System;
using System.Linq;

namespace SysQueiroz.API.Controllers
{
    /// <summary>
    /// Controller referente ao Módulo Cliente
    /// </summary>
    [Route("api/[action]")]
    [Authorize(Policy = "UserAccess")]
    public class ClientController : Controller
    {
        private ClientDomain clientDomain;
        
        /// <summary>
        /// Construtor referente ao controller do Módulo Cliente
        /// </summary>
        public ClientController(SysQueirozContext context)
        {
            clientDomain = new ClientDomain(context);
        }

        /// <summary>
        /// Listar todos os clientes
        /// </summary>
        [HttpGet]
        public Return GetAllClients()
        {
            try
            {
                var clients = clientDomain.SelectAll<Client>().ToList();
                if (clients.Count == 0)
                    return new Error(Err.NoClients);
                else
                    return new Success(clients);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Insere um novo cliente.
        /// </summary>
        /// <param name="client">Dados do cliente.</param>
        [HttpPost]
        public Return SetNewClient([FromBody] Client client)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    clientDomain.Insert(client);

                    return new Success(Suc.ClientSuccessfullyRegistered);
                }
                else
                {
                    return new Error(Err.InvalidPadding);
                }
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }
    }
}