using System;
using System.Collections.Generic;
using System.Linq;
using SysQueiroz.Core;
using SysQueiroz.Core.Entities;
using SysQueiroz.Repository.Base;

namespace SysQueiroz.Company
{
    public class EmployeeDomain : Repository<Employee>
    {
        private readonly SysQueirozContext _context;
        public EmployeeDomain(SysQueirozContext context) : base(context)
        {
            _context = context;
        }

        public IList<dynamic> SelectAllEmployeesWithDepartmentsNameWithoutUser()
        {
            var result = SelectAll<Employee>().Where(e => e.User == null).Select(e => new {
                id = e.Id,
                name = e.Name,
                departmentId = e.DepartmentId,
                departmentName = e.Department.Name
            }).ToList<dynamic>();

            return result;
        }

        public IList<dynamic> SelectAllEmployeesWithDepartments()
        {
            var employees = SelectAll<Department>().Join(SelectAll<Employee>(), d => d.Id, e => e.Department.Id, (d, e) => e);
            var result = employees.Select(e => new {
                id = e.Id,
                name = e.Name,
                departmentName = e.Department.Name
            }).ToList<dynamic>();
            return result;
        }

        public bool InsertNewEmployee(Employee employee)
        {
            var em = SelectWhere<Employee>(e => e.Name == employee.Name).FirstOrDefault();
            if (em != null) return false;

            Insert(employee);
            return true;
        }

        public void UpdateEmployeeWithNewDepartment(Employee employee)
        {
            var newDepartmentId = Insert(employee.Department);
            employee.Department = null;
            employee.DepartmentId = newDepartmentId;
            Update(employee);
        }
    }
}
