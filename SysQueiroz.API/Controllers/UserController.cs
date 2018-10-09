using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SysQueiroz.API.Bodies.Users;
using SysQueiroz.API.Treatments;
using SysQueiroz.API.Treatments.Enums;
using SysQueiroz.Core;
using SysQueiroz.Core.Entities;
using SysQueiroz.Core.Provider;
using SysQueiroz.Core.Utils;
using SysQueiroz.Users;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SysQueiroz.API.Controllers
{
    /// <summary>
    /// Controller referente ao Módulo Usuário
    /// </summary>
    [Route("api/[action]")]
    [Authorize(Policy = "UserAccess")]
    public class UserController : Controller
    {
        private UserDomain userDomain;
        private ProfileDomain profileDomain;
        private MenuDomain menuDomain;

        /// <summary>
        /// Construtor referente ao controller do Módulo Usuário
        /// </summary>
        public UserController(SysQueirozContext context)
        {
            userDomain = new UserDomain(context);
            profileDomain = new ProfileDomain(context);
            menuDomain = new MenuDomain(context);
        }

        #region Inicializar dados no banco de dados
        /// <summary>
        /// Método de iniciaçização dos dados básicos de sistema
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public Return EnterInitializationData()
        {
            try
            {
                if (userDomain.SelectAll<User>().Count() == 0)
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
                                        Name = "GetAllEmployeesWithoutUser",
                                        Description = "Listar funcionários que não possuem usuário (para cadastro de usuário)."
                                    }
                                },
                                new ProfileMethod
                                {
                                    Method = new Method
                                    {
                                        Name = "GetUserWithEmployee",
                                        Description = "Carregar usuário com dados de funcionário."
                                    }
                                },
                                new ProfileMethod
                                {
                                    Method = new Method
                                    {
                                        Name = "UpdateUser",
                                        Description = "Atualizar usuário."
                                    }
                                },
                                new ProfileMethod
                                {
                                    Method = new Method
                                    {
                                        Name = "DeleteUser",
                                        Description = "Deletar usuário."
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
                                        Name = "GetAllHierarchicallyOrganizedMenuItems",
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
                                        Name = "GetProfilesIdByMenu",
                                        Description = "Listar perfis de usuário que possuem acesso à item de menu informado (id)."
                                    }
                                },
                                new ProfileMethod
                                {
                                    Method = new Method
                                    {
                                        Name = "GetAllMenuItemsWhereSuperItems",
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
                                },
                                new ProfileMethod
                                {
                                    Method = new Method
                                    {
                                        Name = "DeleteEmployee",
                                        Description = "Deletar funcionário."
                                    }
                                },
                                new ProfileMethod
                                {
                                    Method = new Method
                                    {
                                        Name = "UpdateEmployee",
                                        Description = "Atualizar funcionário."
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
                }

                return new Success(Suc.InitializationDataEnteredSuccessfully);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }
        #endregion

        /// <summary>
        /// Revalidar sessão de usuário. Gerando um novo token de acesso.
        /// </summary>
        /// <param name="user">Dados do usuário. Bastando informar os valores das propriedades Email e Senha.</param>
        [HttpPost]
        [AllowAnonymous]
        public Return Relogin([FromBody] User user)
        {
            try
            {
                var _user = userDomain.SelectUserWithMethodsPerProfileByEmail(user.Email);
                if (_user != null)
                {
                    if (_user.Password == user.Password)
                        return new Success(Suc.SessionRevalidatedSuccessfully, _user.Id, _user.NewToken());
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
        /// Validar sessão de usuário. Gerando um token de acesso.
        /// </summary>
        /// <param name="user">Dados do usuário. Bastando informar os valores das propriedades Email e Senha.</param>
        [HttpPost]
        [AllowAnonymous]
        public Return Login([FromBody] User user)
        {
            try
            {
                var _user = userDomain.SelectUserWithMethodsPerProfileByEmail(user.Email);
                if (_user != null)
                {
                    if (_user.Password == user.Password)
                        return new Success(_user.Id, _user.NewToken());
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
        /// Consultar dados de um usuário pelo id.
        /// </summary>
        /// <param name="id">Id do usuário a ser consultado.</param>
        [HttpGet("{id}")]
        public Return GetUser(int id)
        {
            try
            {
                var user = userDomain.SelectByID<User>(id);
                if (user == null)
                    return new Error(Err.UserDoesNotExist);
                else return new Success(user.Without("Password"));
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Listar todos os usuários.
        /// </summary>
        [HttpGet]
        public Return GetAllUsers()
        {
            try
            {
                var users = userDomain.SelectAllUsersEmployeesOrNot();
                if (users.Count == 0)
                    return new Error(Err.NoUsers);
                else return new Success(users);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Consultar dados de sessão de usuário pelo id de usuário.
        /// </summary>
        /// <param name="id">Id do usuário pelo qual se consultará os dados de sessão.</param>
        [HttpGet("{id}")]
        public Return GetUserSessionDatasByUserId(int id)
        {
            try
            {
                var employee = userDomain.SelectEmployeeByUserId(id);
                var department = userDomain.SelectDepartmentByUserId(id);
                var menu = menuDomain.SelectMenuByUserId(id);

                if (employee == null)
                    return new Error(Err.EmployeeDoesNotExist);
                else if (department == null)
                    return new Error(Err.UserDoesNotBelongToAnyDepartment);
                else if (menu == null)
                    return new Error(Err.UserDoesNotHaveAccessYet);
                else return new Success(new { employee, department, menu });
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Listar usuários funcionários e seus respectivos setores.
        /// </summary>
        [HttpGet]
        public Return GetUsersEmployeesWithDepartments()
        {
            try
            {
                var usersEmployeesDepartment = userDomain.SelectUsersEmployeesWithDepartments();

                return new Success(usersEmployeesDepartment);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Listar todos os perfis de usuário.
        /// </summary>
        [HttpGet]
        public Return GetAllProfiles()
        {
            try
            {
                var profiles = profileDomain.SelectAll<Profile>().ToList();
                if (profiles.Count == 0)
                    return new Error(Err.NoProfiles);
                else return new Success(profiles);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Atualizar dados de um perfil de usuário.
        /// </summary>
        /// <param name="profile">Dados do perfil de usuário. Identificado pela propriedade Id.</param>
        [HttpPost]
        public Return UpdateProfile([FromBody] Profile profile)
        {
            try
            {
                profileDomain.Update(profile);

                return new Success(Suc.ProfileUpdatedSuccessfully);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Deletar um perfil de usuário.
        /// </summary>
        /// <param name="id">Id do perfil de usuário a ser deletado.</param>
        [HttpPost]
        public Return DeleteProfile([FromBody] int id)
        {
            try
            {
                profileDomain.DeleteProfile(id);

                return new Success(Suc.ProfileDeletedSuccessfully);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Atribuir perfil à usuários contidos na propriedade dos selecionados e desatribuir perfil dos não contidos na propriedade dos selecionados.
        /// </summary>
        /// <param name="assigns">Propriedade com a configuração das atribuições, bem como das não atribuições.</param>
        [HttpPost]
        public Return AssignProfile([FromBody] Assigns assigns)
        {
            try
            {
                profileDomain.InsertAssignsAndRemoveUnassigns(assigns.ProfileId, assigns.All, assigns.Selecteds);

                return new Success(Suc.SuccessfullyAssignedProfile);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Listar ids de usuários com atribuição do perfil de usuário pelo id do perfil de usuário.
        /// </summary>
        /// <param name="id">Id do perfil de usuário pelo qual se listará os ids dos usuários com atribuição do perfil de usuário.</param>
        [HttpGet("{id}")]
        public Return GetUsersIdByProfile(int id)
        {
            try
            {
                var usersId = profileDomain.SelectWhere<UserProfile>(up => up.ProfileId == id).Select(up => up.UserId).ToList();

                return new Success(usersId);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Listar todos os itens de menus hierarquicamente organizados.
        /// </summary>
        [HttpGet]
        public Return GetAllHierarchicallyOrganizedMenuItems()
        {
            try
            {
                var menus = menuDomain.SelectAll<Menu>().ToList();
                var organizedMenus = menuDomain.OrganizeHierarchically(menus);
                if (menus.Count == 0)
                    return new Error(Err.NoMenus);
                else return new Success(organizedMenus);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Atualizar dados de um item de menu.
        /// </summary>
        /// <param name="menu">Dados do item de menu. Identificado pela propriedade Id.</param>
        [HttpPost]
        public Return UpdateMenuItem([FromBody] Menu menu)
        {
            try
            {
                menuDomain.Update(menu);

                return new Success(Suc.MenuItemUpdatedSuccessfully);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Deletar um item de menu.
        /// </summary>
        /// <param name="id">Id do item de menu a ser deletado.</param>
        [HttpPost]
        public Return DeleteMenuItem([FromBody] int id)
        {
            try
            {
                menuDomain.DeleteMenuItem(id);

                return new Success(Suc.MenuItemDeletedSuccessfully);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Atribuir acesso a item de menu à usuários contidos na propriedade dos selecionados e desatribuir acesso a item de menu dos não contidos na propriedade dos selecionados.
        /// </summary>
        /// <param name="assigns">Propriedade com a configuração das atribuições, bem como das não atribuições.</param>
        [HttpPost]
        public Return AssignMenuItem([FromBody] Assigns assigns)
        {
            try
            {
                menuDomain.InsertAssignsAndRemoveUnassigns(assigns.MenuId, assigns.All, assigns.Selecteds);

                return new Success(Suc.SuccessfullyAssignedMenuItem);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Listar ids de perfis de usuário com atribuição de acesso a item de menu pelo id do item de menu.
        /// </summary>
        /// <param name="id">Id do item de menu pelo qual se listará os ids dos perfis de usuário com atribuição de acesso a item de menu.</param>
        [HttpGet("{id}")]
        public Return GetProfilesIdByMenu(int id)
        {
            try
            {
                var profileId = menuDomain.SelectWhere<MenuAccess>(ma => ma.MenuId == id).Select(ma => ma.ProfileId).ToList();

                return new Success(profileId);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Registrar um novo usuário.
        /// </summary>
        /// <param name="user">Dados do novo usuário a ser registrado.</param>
        [HttpPost]
        public Return SetNewUser([FromBody] User user)
        {
            try
            {
                var ok = userDomain.InsertNewUser(user);
                if (ok) return new Success(Suc.UserSuccessfullyRegistered);
                else return new Error(Err.UserAlreadyExists);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Registrar um novo item de menu.
        /// </summary>
        /// <param name="menu">Dados do novo item de menu a ser registrado.</param>
        [HttpPost]
        public Return SetNewMenuItem([FromBody] Menu menu)
        {
            try
            {
                var ok = menuDomain.InsertNewMenuItem(menu);
                if (ok) return new Success(Suc.MenuItemSuccessfullyCreated);
                else return new Error(Err.MenuItemAlreadyExists);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Listar todos os itens de menu que são hierarquicamente superiores, ou seja, que possuem ou podem possuir submenus.
        /// </summary>
        [HttpGet]
        [AllowAnonymous]
        public Return GetAllMenuItemsWhereSuperItems()
        {
            try
            {
                var superMenuItens = menuDomain.SelectAll<Menu>().Where(m => m.IsSuperItem).ToList();
                return new Success(superMenuItens);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Consultar dados de um item de menu pelo id.
        /// </summary>
        /// <param name="id">Id do item de menu a ser consultado.</param>
        [HttpGet("{id}")]
        public Return GetMenuItem(int id)
        {
            try
            {
                var menu = menuDomain.SelectByID<Menu>(id);
                if (menu == null)
                    return new Error(Err.MenuItemDoesNotExist);
                else return new Success(menu);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Deletar um usuário.
        /// </summary>
        /// <param name="id">Id do usuário a ser deletado.</param>
        [HttpPost]
        public Return DeleteUser([FromBody] int id)
        {
            try
            {
                userDomain.DeleteUser(id);

                return new Success(Suc.UserDeletedSuccessfully);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }
        
        /// <summary>
        /// Consultar dados de um usuário com dados de funcionário pelo id.
        /// </summary>
        /// <param name="id">Id do usuário a ser consultado.</param>
        [HttpGet("{id}")]
        public Return GetUserWithEmployee(int id)
        {
            try
            {
                var user = userDomain.SelectUserWithEmployee(id);
                if (user == null)
                    return new Error(Err.UserDoesNotExist);
                else return new Success(user);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }

        /// <summary>
        /// Atualizar dados de um usuário.
        /// </summary>
        /// <param name="user">Dados do usuário. Identificado pela propriedade Id.</param>
        [HttpPost]
        public Return UpdateUser([FromBody] User user)
        {
            try
            {
                if (user.EmployeeId == 0)
                    userDomain.UpdateUserWithNewEmployee(user);
                else userDomain.Update(user);

                return new Success(Suc.EmployeeUpdatedSuccessfully);
            }
            catch (Exception ex)
            {
                return new Error(ex);
            }
        }
    }
}