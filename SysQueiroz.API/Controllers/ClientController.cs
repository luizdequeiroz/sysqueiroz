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
    [Route("api/[action]")]
    [Authorize(Policy = "User")]
    public class ClientController : Controller
    {
        private ClientDomain clientDomain;

        public ClientController(SysQueirozContext context)
        {
            clientDomain = new ClientDomain(context);
        }

        // GET api/GetAllClients
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

        [HttpPost]
        public Return SetNewClient([FromBody] Client client)
        {
            try
            {
                clientDomain.Insert(client);

                return new Return(Suc.ClientSuccessfullyRegistered);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }
    }
}