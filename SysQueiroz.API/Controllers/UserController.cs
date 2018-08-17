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
    [Authorize(Policy = "UserAccess")]
    public class UserController : Controller
    {
        private UserDomain userDomain;
        private ProfileDomain profileDomain;

        public UserController(SysQueirozContext context)
        {
            userDomain = new UserDomain(context);
            profileDomain = new ProfileDomain(context);
        }

        // POST api/Login
        [HttpPost]
        [AllowAnonymous]
        public Return Login([FromBody] User User)
        {
            try
            {
                var user = userDomain.GetUserWithMethodsPerProfileByEmail(User.Email);
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
        public Return GetUserSessionDatasByUserId(int id)
        {
            try
            {
                var employee = userDomain.GetEmployeeByUserId(id);
                var department = userDomain.GetDepartmentByUserId(id);
                var menu = userDomain.GetMenuByUserId(id);
                if (employee == null)
                    return new Error(Err.EmployeeDoesNotExist);
                else if (department == null)
                    return new Error(Err.UserDoesNotBelongToAnyDepartment);
                else if (menu == null)
                    return new Error(Err.UserDoesNotHaveAccessYet);
                else
                    return new Return(new { employee, department, menu });
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

        [HttpGet]
        public Return GetAllProfiles()
        {
            try
            {
                var profiles = profileDomain.SelectAll<Profile>().ToList();
                if (profiles.Count == 0)
                    return new Error(Err.NoProfiles);
                else
                    return new Return(profiles);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpPost]
        public Return UpdateProfile([FromBody] Profile p)
        {
            try
            {
                profileDomain.Update(p);

                return new Return(Suc.ProfileUpdatedSuccessfully);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpPost]
        public Return DeleteProfile([FromBody] int id)
        {
            try
            {
                var profile = profileDomain.SelectByID<Profile>(id);
                profileDomain.Delete(profile);

                return new Return(Suc.ProfileDeletedSuccessfully);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }
    }
}
