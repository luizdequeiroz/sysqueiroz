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
    /// Controller referente ao Módulo Empresa
    /// </summary>
    [Route("api/[action]")]
    [Authorize(Policy = "UserAccess")]
    public class CompanyController : Controller
    {
        private EmployeeDomain employeeDomain;

        /// <summary>
        /// Construtor referente ao controller do Módulo Empresa
        /// </summary>
        public CompanyController(SysQueirozContext context)
        {
            employeeDomain = new EmployeeDomain(context);
        }

        /// <summary>
        /// Listar todos os funcionários que não possuem conta de usuário no sistema. Geralmente com a finalidade de popular um combobox para criação de usuário para funcionário.
        /// </summary>
        [HttpGet]
        public Return GetAllEmployeesWithoutUser()
        {
            try
            {
                var employees = employeeDomain.SelectAllEmployeesWithDepartmentsNameWithoutUser();
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
        /// Listar todos os setores.
        /// </summary>
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
        /// Listar funcionários e seus respectivos setores.
        /// </summary>
        [HttpGet]
        public Return GetEmployeesWithDepartments()
        {
            try
            {
                var employeesDepartment = employeeDomain.SelectAllEmployeesWithDepartments();

                return new Return(employeesDepartment);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Consultar dados de um funcionário pelo id.
        /// </summary>
        /// <param name="id">Id do funcionário a ser consultado.</param>
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
        /// Inserir um novo funcionário.
        /// </summary>
        /// <param name="employee"></param>
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