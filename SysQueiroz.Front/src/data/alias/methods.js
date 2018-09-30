//#region Module User

//#region Públicos
export const GetUserSessionDatasByUserId = 'GetUserSessionDatasByUserId' // carregar dados básico de sessão de usuário
//#endregion

//#region Acesso livre
export const Login = 'Login' // acessar sistema, gerando token válido
export const Relogin = 'Relogin' // revalidar sessão no sistema, gerando novo token válido
//#endregion

//#region Perfil Gerenciamento de Usuários
export const GetAllUsers = 'GetAllUsers' // Listar todos os usuários
export const GetUsersEmployeesWithDepartments = 'GetUsersEmployeesWithDepartments' // Listar todos os usuários que são funcionários com nome de seus setores
export const SetNewUser = 'SetNewUser' // Inserir novo usuário

export const GetUser = 'GetUser' // Carregar usuário pelo id 
export const GetAllEmployeesForNewUser = 'GetAllEmployeesForNewUser' // Listar funcionários que não possuem usuário (para cadastro de usuário)
//#endregion

//#region Perfil Gerenciamento de Perfil de Usuário
export const GetAllProfiles = 'GetAllProfiles' // Listar todos os perfis de usuário
export const UpdateProfile = 'UpdateProfile' // Atualizar perfil de usuário
export const DeleteProfile = 'DeleteProfile' // Deletar perfil de usuário
export const AssignProfileMethod = 'AssignProfile' // Atribuir perfil de usuário à usuários marcados
export const GetUsersIdByProfile = 'GetUsersIdByProfile' // Listar usuários que possuem perfil de usuário informado (id)
//#endregion

//#region Perfil Gerenciamento de Itens de Menu
export const GetAllHierarchicallyOrganizedMenuItems = 'GetAllHierarchicallyOrganizedMenuItems' // Listar todos os itens de menu hierarquicamente organizados
export const UpdateMenuItem = 'UpdateMenuItem' // Atualizar item de menu
export const DeleteMenuItem = 'DeleteMenuItem' // Deletar item de menu
export const AssignMenuItem = 'AssignMenuItem' // Atribuir acesso a item de menu à usuários marcados
export const GetProfilesIdByMenu = 'GetProfilesIdByMenu' // Listar usuários que possuem acesso à item de menu informado (id)
export const GetAllMenuItemsWhereSuperItems = 'GetAllMenuItemsWhereSuperItems' // Listar itens de menu que são hierarquicamente superiores
export const SetNewMenuItem = 'SetNewMenuItem' // Inserir novo item de menu

export const GetMenuItem = 'GetMenuItem' // Carregar item de menu pelo id
//#endregion

//#endregion

//#region Modulo Company

//#region Perfil Gerencimento de Funcionários
export const GetAllDepartments = 'GetAllDepartments' // Listar todos os setores
export const GetEmployeesWithDepartments = 'GetEmployeesWithDepartments' // Listar todos os funcionários com nomes de seus setores
export const SetNewEmployee = 'SetNewEmployee' // Inserir novo funcionário

export const GetEmployee = 'GetEmployee' // Carregar funcionário pelo id
//#endregion

//#endregion

//#region Modulo Client

//#region Perfil Gerenciamento de Cleintes
export const GetAllClients = 'GetAllClients' // Listar todos os clientes
export const SetNewClient = 'SetNewClient' // Inserir novo cliente
//#endregion

//#endregion