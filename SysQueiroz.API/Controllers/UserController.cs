using System;
using System.Linq;
using SysQueiroz.API.Treatments;
using SysQueiroz.API.Treatments.Enums;
using SysQueiroz.Core;
using SysQueiroz.Core.Entities;
using SysQueiroz.Core.Provider;
using SysQueiroz.Core.Utils;
using SysQueiroz.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SysQueiroz.API.Controllers
{
    [Route("api/[action]")]
    [Authorize(Policy = "User")]
    public class UserController : Controller
    {
        private UserDomain userDomain;

        public UserController(SysQueirozContext context)
        {
            userDomain = new UserDomain(context);
        }

        // POST api/Login
        [HttpPost]
        [AllowAnonymous]
        public Return Login([FromBody]User User)
        {
            try
            {
                var user = userDomain.GetUserByEmail(User.Email);
                if (user != null)
                {
                    if (user.Password == User.Password)
                        return new Return(user.Id, user.NewToken());
                    else
                        return new Error(Err.WrongPassword);
                }
                else
                    return new Error(Err.UserDoesNotExist);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        // GET api/GetUser/1
        [HttpGet("{id}")]
        public Return GetUser(int id)
        {
            try
            {
                var user = userDomain.SelectByID<User>(id);
                if (user == null)
                    return new Error(Err.UserDoesNotExist);
                else
                    return new Return(user.Without("Password"));
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        // GET api/GetAllUsers
        [HttpGet]
        public Return GetAllUsers()
        {
            try
            {
                var users = userDomain.SelectAll<User>().ToList();
                if (users.Count == 0)
                    return new Error(Err.NoUsers);
                else
                    return new Return(users);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpGet("{id}")]
        public Return GetEmployeeByUserId(int id)
        {
            try
            {
                var employee = userDomain.GetEmployeeByUserId(id);
                if (employee != null)
                    return new Return(employee);
                else
                    return new Error(Err.EmployeeDoesNotExist);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpGet("{id}")]
        public Return GetDepartmentByUserId(int id)
        {
            try
            {
                var department = userDomain.GetDepartmentByUserId(id);
                if (department != null)
                    return new Return(department);
                else
                    return new Error(Err.UserDoesNotBelongToAnyDepartment);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpGet("{id}")]
        public Return GetMenuByUserId(int id)
        {
            try
            {
                var menu = userDomain.GetMenuByUserId(id);
                if (menu != null)
                    return new Return(menu);
                else
                    return new Error(Err.UserDoesNotHaveAccessYet);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpGet]
        public Return GetUsersEmployeesWithDepartments() 
        {
            try
            {
                var usersEmployeesDepartment = userDomain.GetUsersEmployeesWithDepartments();
                
                return new Return(usersEmployeesDepartment);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }
    }
}
