
create database azureDevops;
use azureDevops;
 
create table UserTable (
  Id int primary key auto_increment,
  emailId varchar(255),
  password varchar(255),
  isDeleted bool
);


select * from boardTable

create table Roles (
	Id int primary Key auto_increment,
    Role varchar(255),
    isdeleted bool
);

insert into Roles (Role,isDeleted) values ("user",false);

create Table RolesForUsers (
	Id int primary key auto_increment,
    roleId int,
    userId int,
    isDeleted bool,
    FOREIGN KEY (userId) references userTable(Id),
    foreign key (roleId) references Roles(Id) 
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

CREATE TABLE BoardTable (
    boardId INT PRIMARY KEY AUTO_INCREMENT,
    userId int not null,
    title VARCHAR(255) NOT NULL,
    assignedTo VARCHAR(255),
    state ENUM('To Do', 'Doing', 'Done'),
    Type VARCHAR(50),
    isDeleted BOOLEAN,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);







CREATE TABLE boardUser (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    boardId INT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (boardId) REFERENCES BoardTable(boardId),
    FOREIGN KEY (userId) REFERENCES UserTable(Id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isDeleted boolean
);
insert into sprintUser (boardId,sprintId,isDeleted) values(78,34,false)


select * from BoardTable as bt  join boardUser as bu on bu.boardId=bt.boardId where bu.userId=5;
SELECT * 
        FROM sprint 
        JOIN SprintUser ON sprint.sprintId = SprintUser.sprintId 
        WHERE sprint.sprintId = 35 
        AND SprintUser.userId = 34
        AND sprint.isDeleted = false;
        
        

CREATE TABLE sprint (
    sprintId INT PRIMARY KEY AUTO_INCREMENT,
    boardId INT NOT NULL,
    sprintName VARCHAR(255) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    isDeleted boolean,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (boardId) REFERENCES BoardTable(boardId)
);
select * from sprint 
select * from sprint where sprintId=35 and boardId=80 and isDeleted=false;
SELECT sprint.*
        FROM sprint
        JOIN SprintUser ON sprint.sprintId = SprintUser.sprintId
        WHERE SprintUser.userId = 29 AND sprint.boardId = 63 and SprintUser.isDeleted=false;

SELECT * FROM mysql.user;
ALTER USER 'root'@'localhost' IDENTIFIED BY '[Keshav@123]';



DELETE FROM sprintUser
WHERE userId = 38 AND sprintId = 34;

CREATE TABLE SprintUser (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    sprintId INT NOT NULL,
    userId INT NOT NULL,
    isDeleted boolean,
    FOREIGN KEY (sprintId) REFERENCES sprint(sprintId),
    FOREIGN KEY (userId) REFERENCES userTable(Id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


SELECT s.*
        FROM SprintUser su
        INNER JOIN sprint s ON su.sprintId = s.sprintId
        WHERE su.sprintId = 83
          AND su.userId = 38;
select * from sprint where boardId=63 and sprintId=26;

insert into sprintUser (userId,sprintId,isDeleted) values(?,?,?)

SELECT bt.* FROM BoardTable bt
      INNER JOIN boardUser bu ON bt.boardId = bu.boardId
      WHERE bu.userId = 34 AND bt.isDeleted = false

select * from boardTable where assignedTo="Fresh@gmail.com"
select * from sprint where boardID=55 and sprintId=31;

CREATE TABLE epic (
    epicId INT PRIMARY KEY AUTO_INCREMENT,
    boardId INT NOT NULL,
    epicName VARCHAR(255) NOT NULL,
    assignedTo varchar(255),
    description TEXT,
    startDate DATE,
    targetDate DATE,
    state ENUM('To Do', 'In Progress', 'Done'),
    isDeleted boolean,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (boardId) REFERENCES boardTable(boardId)
);

CREATE TABLE epicUser (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    epicId INT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (epicId) REFERENCES epic(epicId),
    FOREIGN KEY (userId) REFERENCES userTable(Id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE userStories (
    userStoryId INT PRIMARY KEY AUTO_INCREMENT,
    epicId INT NOT NULL,
    userStoryName VARCHAR(255) NOT NULL,
    description TEXT,
    state ENUM('To Do', 'In Progress', 'Done'),
    priority INT,
    estimateHours INT,
    isDeleted boolean,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (epicId) REFERENCES epic(epicId)
);


CREATE TABLE userStoryUsers (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    userStoryId INT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userStoryId) REFERENCES userStories(userStoryId),
    FOREIGN KEY (userId) REFERENCES userTable(Id),
    isDeleted boolean,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    taskId INT PRIMARY KEY AUTO_INCREMENT,
    userStoryId INT NOT NULL,
    taskName VARCHAR(255) NOT NULL,
    description TEXT,
    state ENUM('To Do', 'In Progress', 'Done'),
    assignedTo varchar(255),
    remainingWork INT,
    isDeleted boolean,
    comments varchar(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userStoryId) REFERENCES userStories(userStoryId)
);

CREATE TABLE taskUser (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    taskId INT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (taskId) REFERENCES tasks(taskId),
    FOREIGN KEY (userId) REFERENCES userTable(Id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
