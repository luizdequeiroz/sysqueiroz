SELECT        SQLTEXT.text, STATS.last_execution_time
FROM          sys.dm_exec_query_stats STATS
CROSS APPLY   sys.dm_exec_sql_text(STATS.sql_handle) AS SQLTEXT
WHERE         STATS.last_execution_time > GETDATE()-1
ORDER BY      STATS.last_execution_time DESC

SELECT [u.Employee].[Name] AS [name0], [u].[Email], [d].[Name] AS [departmentName]  
FROM [Users] AS [u]  LEFT JOIN [Employees] AS [u.Employee] 
ON [u].[EmployeeId] = [u.Employee].[Id]  LEFT JOIN [Departments] AS [u.Employee.Department] 
ON [u.Employee].[DepartmentId] = [u.Employee.Department].[Id]  INNER JOIN [Departments] AS [d] 
ON [u.Employee.Department].[Id] = [d].[Id]

SELECT [e].[Name] AS [name0], [e.User].[Email], [d].[Name] AS [departmentName]  
FROM [Departments] AS [d]  INNER JOIN [Employees] AS [e] 
ON [d].[Id] = [e].[DepartmentId]  LEFT JOIN [Users] AS [e.User] 
ON [e].[Id] = [e.User].[EmployeeId]

SELECT [e].[Name] AS [name0], [e.User].[Email], [e.Department].[Name] AS [departmentName]  
FROM [Departments] AS [d]  INNER JOIN [Employees] AS [e] 
ON [d].[Id] = [e].[DepartmentId]  LEFT JOIN [Departments] AS [e.Department] 
ON [e].[DepartmentId] = [e.Department].[Id]  LEFT JOIN [Users] AS [e.User] 
ON [e].[Id] = [e.User].[EmployeeId]