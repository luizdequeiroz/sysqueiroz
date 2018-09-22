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
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[action]")]
    [Authorize(Policy = "UserAccess")]
    public class UserController : Controller
    {
        private UserDomain userDomain;
        private ProfileDomain profileDomain;
        private MenuDomain menuDomain;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public UserController(SysQueirozContext context)
        {
            userDomain = new UserDomain(context);
            profileDomain = new ProfileDomain(context);
            menuDomain = new MenuDomain(context);
        }

        #region Inicializar dados no banco de dados
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
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
                        Name = "Administrador",
                        Department = new Department
                        {
                            Name = "Administração de Sistema"
                        }
                    },
                    MenuAccesses = new List<MenuAccess>
                    {
                        new MenuAccess
                        {
                            Menu = new Menu
                            {
                                Href = "systempermissions",
                                Icon = "shield",
                                Name = "Permissões",
                                SuperHref = "",
                                IsSuperItem = true
                            }
                        },
                        new MenuAccess
                        {
                            Menu = new Menu
                            {
                                Href = "profiles",
                                Icon = "user-circle",
                                Name = "Perfis de Usuário",
                                SuperHref = "systempermissions",
                                IsSuperItem = false
                            }
                        }
                    },
                    UserProfiles = new List<UserProfile>
                    {
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
                                            Description = "Listar todos os perfis de usuário."
                                        }
                                    },
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "UpdateProfile",
                                            Description = "Atualizar perfil de usuário."
                                        }
                                    },
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "DeleteProfile",
                                            Description = "Deletar perfil de usuário."
                                        }
                                    },
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "AssignProfile",
                                            Description = "Atribuir perfil de usuário à usuários marcados."
                                        }
                                    },
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "GetUsersIdByProfile",
                                            Description = "Listar usuários que possuem perfil de usuário informado (id)."
                                        }
                                    },
                                    new ProfileMethod
                                    {
                                        Method = new Method
                                        {
                                            Name = "GetAllUsers",
                                            Description = "Listar todos os usuários."
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                userDomain.Insert(user);

                var profiles = new List<Profile>{
                    new Profile
                    {
                        Name = "Gerenciamento de Usuários",
                        Description = "",
                        ProfileMethods = new List<ProfileMethod>
                        {
                            new ProfileMethod
                            {
                                MethodId = 6
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "GetAllDepartments",
                                    Description = "Listar todos os setores."
                                }
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "GetUsersEmployeesWithDepartments",
                                    Description = "Listar todos os usuários que são funcionários com nome de seus setores."
                                }
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "SetNewUser",
                                    Description = "Inserir novo usuário."
                                }
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "GetUser",
                                    Description = "Carregar usuário pelo id."
                                }
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "GetAllEmployeesForNewUser",
                                    Description = "Listar funcionários que não possuem usuário (para cadastro de usuário)."
                                }
                            }
                        }
                    },
                    new Profile
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
                                    Description = "Listar todos os itens de menu hierarquicamente organizados."
                                }
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "UpdateMenuItem",
                                    Description = "Atualizar item de menu."
                                }
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "DeleteMenuItem",
                                    Description = "Deletar item de menu."
                                }
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "AssignMenuItem",
                                    Description = "Atribuir acesso a item de menu à usuários marcados."
                                }
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "GetUsersIdByMenu",
                                    Description = "Listar usuários que possuem acesso à item de menu informado (id)."
                                }
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "GetAllMenuItensForNewMenuItem",
                                    Description = "Listar itens de menu que são hierarquicamente superiores."
                                }
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "SetNewMenuItem",
                                    Description = "Inserir novo item de menu."
                                }
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "GetMenuItem",
                                    Description = "Carregar item de menu pelo id."
                                }
                            }
                        }
                    },
                    new Profile
                    {
                        Name = "Gerenciamento de Funcionários",
                        Description = "",
                        ProfileMethods = new List<ProfileMethod>
                        {
                            new ProfileMethod
                            {
                                MethodId = 6
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "GetEmployeesWithDepartments",
                                    Description = "Listar todos os funcionários com nomes de seus setores."
                                }
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "SetNewEmployee",
                                    Description = "Inserir novo funcionário."
                                }
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "GetEmployee",
                                    Description = "Carregar funcionário pelo id."
                                }
                            }
                        }
                    },
                    new Profile
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
                                    Description = "Listar todos os clientes."
                                }
                            },
                            new ProfileMethod
                            {
                                Method = new Method
                                {
                                    Name = "SetNewClient",
                                    Description = "Inserir novo cliente."
                                }
                            }
                        }
                    }
                };
                foreach (var profile in profiles) profileDomain.Insert(profile);

                var menus = new List<Menu>{
                    new Menu
                    {
                        Href = "listofusers",
                        Icon = "users",
                        Name = "Usuários",
                        SuperHref = "",
                        IsSuperItem = false
                    },
                    new Menu
                    {
                        Href = "menus",
                        Icon = "bars",
                        Name = "Itens de Menu",
                        SuperHref = "systempermissions",
                        IsSuperItem = false
                    },
                    new Menu
                    {
                        Href = "systemcompany",
                        Icon = "building",
                        Name = "Empresa",
                        SuperHref = "",
                        IsSuperItem = true
                    },
                    new Menu
                    {
                        Href = "listofclients",
                        Icon = "id-card",
                        Name = "Clientes",
                        SuperHref = "systemcompany",
                        IsSuperItem = false
                    },
                    new Menu
                    {
                        Href = "listofemployees",
                        Icon = "user-circle-o",
                        Name = "Funcionários",
                        SuperHref = "systemcompany",
                        IsSuperItem = false
                    },
                    new Menu
                    {
                        Href = "listofoutsourced",
                        Icon = "outdent",
                        Name = "Terceiros",
                        SuperHref = "systemcompany",
                        IsSuperItem = false
                    }
                };
                foreach (var menu in menus) menuDomain.Insert(menu);

                return new Return(Suc.InitializationDataEnteredSuccessfully);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }
        #endregion

        /// <summary>
        /// 
        /// </summary>
        /// <param name="User"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="User"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Return GetAllUsers()
        {
            try
            {
                var users = userDomain.SelectAllUsersEmployeesOrNot();
                if (users.Count == 0)
                    return new Error(Err.NoUsers);
                else return new Return(users);
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

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="p"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="assigns"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="m"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="assigns"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="menu"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
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
