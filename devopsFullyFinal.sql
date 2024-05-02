
use azureDevops;
create table usertable (
  Id int primary key auto_increment,
  emailId varchar(255),
  password varchar(255),
  isDeleted bool
);

create table roles (
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
    userId int,
    title VARCHAR(255) NOT NULL,
    assignedTo VARCHAR(255),
    state ENUM('To Do', 'Doing', 'Done'),
    Type VARCHAR(50),
    isDeleted BOOLEAN,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

select * from boardTable

CREATE TABLE boarduser (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    boardId INT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (boardId) REFERENCES BoardTable(boardId),
    FOREIGN KEY (userId) REFERENCES UserTable(Id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

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



CREATE TABLE sprintuser (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    sprintId INT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (sprintId) REFERENCES sprint(sprintId),
    FOREIGN KEY (userId) REFERENCES userTable(Id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


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


CREATE TABLE epicuser (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    epicId INT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (epicId) REFERENCES epic(epicId),
    FOREIGN KEY (userId) REFERENCES userTable(Id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



CREATE TABLE userstories (
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


CREATE TABLE userstoryusers (
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


CREATE TABLE taskuser (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    taskId INT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (taskId) REFERENCES tasks(taskId),
    FOREIGN KEY (userId) REFERENCES userTable(Id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

