using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SysQueiroz.API.Treatments;
using SysQueiroz.API.Treatments.Enums;
using SysQueiroz.Company;
using SysQueiroz.Core;
using SysQueiroz.Core.Entities;

namespace SysQueiroz.API.Controllers
{    
    [Route("api/[action]")]
    [Authorize(Policy = "UserAccess")]
    public class CompanyController : Controller
    {
        private EmployeeDomain employeeDomain;

        public CompanyController(SysQueirozContext context)
        {
            employeeDomain = new EmployeeDomain(context);
        }

        [HttpGet]
        [AllowAnonymous]
        public Return GetAllEmployeesForNewUser()
        {
            try
            {
                var employees = employeeDomain.SelectAllWithDepartmentsNameForNewUser();
                if (employees.Count == 0)
                    return new Error(Err.NoEmployees);
                else return new Return(employees);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public Return GetAllDepartments() 
        {
            try
            {
                var departments = employeeDomain.SelectAll<Department>().ToList();
                if (departments.Count == 0)
                    return new Error(Err.NoDepartments);
                else return new Return(departments);
            }
            catch (Exception ex)    
            {
                return new Error(ex);
            }
        }
    }
}