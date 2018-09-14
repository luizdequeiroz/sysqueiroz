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
using System.Collections.Generic;
using System.Dynamic;
using SysQueiroz.API.Bodies.Users;

namespace SysQueiroz.API.Controllers
{
    [Route("api/[action]")]
    [Authorize(Policy = "UserAccess")]
    public class UserController : Controller
    {
        private UserDomain userDomain;
        private ProfileDomain profileDomain;
        private MenuDomain menuDomain;

        public UserController(SysQueirozContext context)
        {
            userDomain = new UserDomain(context);
            profileDomain = new ProfileDomain(context);
            menuDomain = new MenuDomain(context);
        }

        #region Inicializar dados no banco de dados
        [HttpGet]
        [AllowAnonymous]
        public Return EnterInitializationData()
        {
            try
            {
                var user = new User
                {
                    Email = "admin",
                    Password = "admin",
                    Employee = new Employee
                    {
                        Name = "Luiz de Queiroz",
                        Department = new Department
                        {
                            Name = "Desenvolvimento de Sistemas"
                        }
                    },
                    MenuAccesses = new List<MenuAccess>
                    {
                        new MenuAccess
                        {
                            Menu = new Menu
                            {
                                Href = "listofusers",
                                Icon = "users",
                                Name = "Usuários",
                                SuperHref = ""
                            }
                        },
                        new MenuAccess
                        {
                            Menu = new Menu
                            {
                                Href = "listofclients",
                                Icon = "id-card",
                                Name = "Clientes",
                                SuperHref = ""
                            }
                        },
                        new MenuAccess
                        {
                            Menu = new Menu
                            {
                                Href = "systempermissions",
                                Icon = "shield",
                                Name = "Permissões",
                                SuperHref = ""
                            }
                        },
                        new MenuAccess
                        {
                            Menu = new Menu
                            {
                                Href = "profiles",
                                Icon = "user-circle",
                                Name = "Perfis de Usuário",
                                SuperHref = "systempermissions"
                            }
                        },
                        new MenuAccess
                        {
                            Menu = new Menu
                            {
                                Href = "menus",
                                Icon = "bars",
                                Name = "Itens de Menu",
                                SuperHref = "systempermissions"
                            }
                        }
                    },
                    UserProfiles = new List<UserProfile>
                    {
                        new UserProfile
                        {
                            Profile = new Profile
                            {
                                Name = "Gerenciamento de Usuários",
                                Description = "",
                                ProfileMethods = new List<ProfileMethod>
                                {
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "GetAllUsers",
                                            Description = "Listar todos os usuários do sistema."
                                        }
                                    },
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "GetUsersEmployeesWithDepartments",
                                            Description = "Listar todos os funcionários usuários e seus respectivos setores."
                                        }
                                    }
                                }
                            }
                        },
                        // new UserProfile
                        // {
                        //     Profile = new Profile
                        //     {
                        //         Name = "Gerenciamento de Clientes",
                        //         Description = "",
                        //         ProfileMethods = new List<ProfileMethod>
                        //         {
                        //             new ProfileMethod
                        //             {
                        //                 Method = new Method
                        //                 {
                        //                     Name = "GetAllClients",
                        //                     Description = "Listar todos os clientes no sistema."
                        //                 }
                        //             },
                        //             new ProfileMethod
                        //             {
                        //                 Method = new Method
                        //                 {
                        //                     Name = "SetNewClient",
                        //                     Description = "Cadastrar um novo cliente no sistema."
                        //                 }
                        //             }
                        //         }
                        //     }
                        // },
                        new UserProfile
                        {
                            Profile = new Profile
                            {
                                Name = "Gerenciamento de Perfis de Usuários",
                                Description = "",
                                ProfileMethods = new List<ProfileMethod>
                                {
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "GetAllProfiles",
                                            Description = "Listar todos os perfis de usuário do sistema."
                                        }
                                    },
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "UpdateProfile",
                                            Description = "Atualizar alterações nos dados de um perfil de usuário."
                                        }
                                    },
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "DeleteProfile",
                                            Description = "Deletar perfil de usuário do sistema."
                                        }
                                    },
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "AssignProfile",
                                            Description = "Atribuir perfil à usuário(s)"
                                        }
                                    }
                                }
                            }
                        },
                        new UserProfile
                        {
                            Profile = new Profile
                            {
                                Name = "Gerenciamento de Itens de Menu",
                                Description = "",
                                ProfileMethods = new List<ProfileMethod>
                                {
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "GetAllMenusForListMenu",
                                            Description = "Listar todos os itens de menu do sistema, hierarquicamente estruturado."
                                        }
                                    },
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "UpdateMenuItem",
                                            Description = "Atualizar alterações nos dados de um item de menu do sistema."
                                        }
                                    },
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "DeleteMenuItem",
                                            Description = "Deletar item de menu do sistema."
                                        }
                                    },
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "AssignMenuItem",
                                            Description = "Atribuir acesso a item de menu à usuário(s)"
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                var profile = new Profile
                {
                    Name = "Gerenciamento de Clientes",
                    Description = "",
                    ProfileMethods = new List<ProfileMethod>
                    {
                        new ProfileMethod
                        {
                            Method = new Method
                            {
                                Name = "GetAllClients",
                                Description = "Listar todos os clientes no sistema."
                            }
                        },
                        new ProfileMethod
                        {
                            Method = new Method
                            {
                                Name = "SetNewClient",
                                Description = "Cadastrar um novo cliente no sistema."
                            }
                        }
                    }
                };

                userDomain.Insert(user);
                profileDomain.Insert(profile);
                return new Return(Suc.InitializationDataEnteredSuccessfully);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }
        #endregion

        [HttpPost]
        [AllowAnonymous]
        public Return Relogin([FromBody] User User)
        {
            try
            {
                var user = userDomain.GetUserWithMethodsPerProfileByEmail(User.Email);
                if (user != null)
                {
                    if (user.Password == User.Password)
                        return new Return(Suc.SessionRevalidatedSuccessfully, user.Id, user.NewToken());
                    else return new Error(Err.WrongPassword);
                }
                else return new Error(Err.UserDoesNotExist);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
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
                    else return new Error(Err.WrongPassword);
                }
                else return new Error(Err.UserDoesNotExist);
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
                else return new Return(user.Without("Password"));
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
                else return new Return(users);
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
                else return new Return(new { employee, department, menu });
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
                else return new Return(profiles);
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
                profileDomain.DeleteProfile(id);

                return new Return(Suc.ProfileDeletedSuccessfully);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpPost]
        public Return AssignProfile([FromBody] Assigns assigns)
        {
            try
            {
                profileDomain.InsertAssignsAndRemoveUnassigns(assigns.ProfileId, assigns.All, assigns.Selecteds);

                return new Return(Suc.SuccessfullyAssignedProfile);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpGet("{id}")]
        public Return GetUsersIdByProfile(int id)
        {
            try
            {
                var usersId = profileDomain.SelectWhere<UserProfile>(up => up.ProfileId == id).Select(up => up.UserId).ToList();

                return new Return(usersId);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpGet]
        public Return GetAllMenusForListMenu()
        {
            try
            {
                var menus = menuDomain.SelectAll<Menu>().ToList();
                var organizedMenus = menuDomain.OrganizeHierarchically(menus);
                if (menus.Count == 0)
                    return new Error(Err.NoMenus);
                else return new Return(organizedMenus);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpPost]
        public Return UpdateMenuItem([FromBody] Menu m)
        {
            try
            {
                menuDomain.Update(m);

                return new Return(Suc.MenuItemUpdatedSuccessfully);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpPost]
        public Return DeleteMenuItem([FromBody] int id)
        {
            try
            {
                menuDomain.DeleteMenuItem(id);

                return new Return(Suc.MenuItemDeletedSuccessfully);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpPost]
        public Return AssignMenuItem([FromBody] Assigns assigns)
        {
            try
            {
                menuDomain.InsertAssignsAndRemoveUnassigns(assigns.MenuId, assigns.All, assigns.Selecteds);

                return new Return(Suc.SuccessfullyAssignedMenuItem);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpGet("{id}")]
        public Return GetUsersIdByMenu(int id)
        {
            try
            {
                var usersId = menuDomain.SelectWhere<MenuAccess>(ma => ma.MenuId == id).Select(ma => ma.UserId).ToList();

                return new Return(usersId);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpPost]
        public Return SetNewUser([FromBody] User user)
        {
            try
            {
                var ok = userDomain.InsertNewUser(user);
                if (ok) return new Return(Suc.UserSuccessfullyRegistered);
                else return new Error(Err.UserAlreadyExists);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpPost]
        public Return SetNewMenuItem([FromBody] Menu menu)
        {
            try
            {
                var ok = menuDomain.InsertNewMenuItem(menu);
                if (ok) return new Return(Suc.MenuItemSuccessfullyCreated);
                else return new Error(Err.MenuItemAlreadyExists);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        [HttpGet]
        public Return GetAllMenuItensForNewMenuItem() 
        {
            try
            {
                var superMenuItens = menuDomain.SelectAll<Menu>().Where(m => m.IsSuperItem).ToList();
                return new Return(superMenuItens);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }
    }
}
