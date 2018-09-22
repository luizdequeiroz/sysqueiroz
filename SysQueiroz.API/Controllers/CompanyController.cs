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
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[action]")]
    [Authorize(Policy = "UserAccess")]
    public class CompanyController : Controller
    {
        private EmployeeDomain employeeDomain;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public CompanyController(SysQueirozContext context)
        {
            employeeDomain = new EmployeeDomain(context);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
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

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
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

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Return GetEmployeesWithDepartments()
        {
            try
            {
                var employeesDepartment = employeeDomain.GetEmployeesWithDepartments();

                return new Return(employeesDepartment);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public Return GetEmployee(int id)
        {
            try
            {
                var employee = employeeDomain.SelectByID<Employee>(id);
                if (employee == null)
                    return new Error(Err.EmployeeDoesNotExist);
                else return new Return(employee);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        [HttpPost]
        public Return SetNewEmployee([FromBody] Employee employee)
        {
            try
            {
                var ok = employeeDomain.InsertNewEmployee(employee);
                if (ok) return new Return(Suc.EmployeeSuccessfullyRegistered);
                else return new Error(Err.EmployeeAlreadyExists);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }
    }
}