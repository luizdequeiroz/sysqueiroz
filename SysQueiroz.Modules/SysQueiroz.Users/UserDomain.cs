using System.Collections.Generic;
using System.Linq;
using SysQueiroz.Core;
using SysQueiroz.Core.Entities;
using SysQueiroz.Repository.Base;

namespace SysQueiroz.Users
{
    public class UserDomain : Repository<User>
    {
        private readonly SysQueirozContext _context;
        public UserDomain(SysQueirozContext context) : base(context)
        {
            _context = context;
        }

        public User GetUserWithMethodsPerProfileByEmail(string email)
        {
            return SelectWhere<User>(u => u.Email == email).Select(u => new User 
            {
                Id = u.Id,
                Password = u.Password,
                Email = u.Email,
                UserProfiles = u.UserProfiles.Select(up => new UserProfile
                {
                    Profile = new Profile
                    {
                        ProfileMethods = up.Profile.ProfileMethods.Select(pm => new ProfileMethod
                        {
                            Method = new Method
                            {
                                Name = pm.Method.Name
                            }
                        }).ToList()
                    }
                }).ToList()
            }).FirstOrDefault();
        }

        public Employee GetEmployeeByUserId(int id)
        {
            var user = SelectWhere<User>(u => u.Id == id);
            var employee = user.Select(u => u.Employee).FirstOrDefault();

            return employee;
        }

        public Department GetDepartmentByUserId(int id)
        {
            var user = SelectWhere<User>(u => u.Id == id);
            var employee = user.Select(u => u.Employee);
            var department = employee.Select(e => e.Department).FirstOrDefault();

            return department;
        }

        public IList<Menu> GetMenuByUserId(int id)
        {
            var authorizations = SelectWhere<MenuAccess>(a => a.User.Id == id);
            var menus = authorizations.Select(a => a.Menu).ToList();
            return menus;
        }

        public IList<dynamic> GetUsersEmployeesWithDepartments()
        {
            var result = SelectAll<Department>().Join(SelectAll<Employee>(), d => d.Id, e => e.Department.Id, (d, e) => new
                {            
                    name = e.Name,
                    email = e.User.Email,
                    departmentName = d.Name
                }
            ).ToList<dynamic>();

            return result;
        }
    }
}