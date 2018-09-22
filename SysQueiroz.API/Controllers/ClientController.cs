using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SysQueiroz.API.Treatments;
using SysQueiroz.API.Treatments.Enums;
using SysQueiroz.Clients;
using SysQueiroz.Core;
using SysQueiroz.Core.Entities;

namespace SysQueiroz.API.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[action]")]
    [Authorize(Policy = "UserAccess")]
    public class ClientController : Controller
    {
        private ClientDomain clientDomain;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public ClientController(SysQueirozContext context)
        {
            clientDomain = new ClientDomain(context);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Return GetAllClients()
        {
            try
            {
                var clients = clientDomain.SelectAll<Client>().ToList();
                if (clients.Count == 0)
                    return new Error(Err.NoClients);
                else
                    return new Return(clients);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="client"></param>
        /// <returns></returns>
        [HttpPost]
        public Return SetNewClient([FromBody] Client client)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    clientDomain.Insert(client);

                    return new Return(Suc.ClientSuccessfullyRegistered);
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