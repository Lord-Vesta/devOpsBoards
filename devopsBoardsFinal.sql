CREATE TABLE `UserTable` (
  `Id` int PRIMARY KEY auto_increment,
  `emailId` varchar(255),
  `password` varchar(255),
   `isDeleted` bool
);



create Table RolesForUsers (
	Id int primary key auto_increment,
    roleId int,
    userId int,
    FOREIGN KEY (userId) references userTable(Id),
    foreign key (roleId) references Roles(Id) 
);



Create Table Roles (
	Id int primary Key auto_increment,
    Role varchar(255),
    isdeleted bool
);

create Table Permission (
	Id int primary key,
    permission varchar(255),
    isdeleted bool
);

create table permissionForRoles(
	Id int primary key,
    RoleId int,
    permissionId int,
    isdeleted bool,
    FOREIGN KEY (RoleId) REFERENCES Roles(Id),
    FOREIGN KEY (permissionId) REFERENCES Permission(Id)
);

SELECT u.emailId,u.password, u.Id, r.Role
  FROM UserTable u
  JOIN rolesForUsers ru ON u.Id = ru.userId
  JOIN Roles r ON ru.RoleId = r.Id
  WHERE u.emailId = 'user@gmail.com' AND u.isDeleted = false;
  
  
select r.Role
 from Roles r
join RolesForUsers ru on ru.roleId = r.Id
where ru.userId = 5 and ru.isdeleted = false;

select * from RolesForUsers;
  
insert into rolesForUsers (roleId,userId) values (5,5)


