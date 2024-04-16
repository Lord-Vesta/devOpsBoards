CREATE TABLE `Boards` (
  `sprintID` int,
  `Id` int PRIMARY KEY,
  `workItemsId` int AUTO_INCREMENT,
  `title` varchar(255),
  `assignedTo` varchar(255),
  `state` varchar(255),
  `areaPath` varchar(255),
  `projectName` varchar(255),
  `type` varchar(255)
);

CREATE TABLE `UserTable` (
  `Id` int PRIMARY KEY,
  `emailId` varchar(255),
  `password` varchar(255)
);

CREATE TABLE `Task` (
  `taskId` int PRIMARY KEY,
  `title` varchar(255),
  `assignedTo` varchar(255),
  `priority` varchar(255),
  `activity` varchar(255),
  `remainingWork` int,
  `description` text,
  `state` varchar(255),
  `areaPath` varchar(255),
  `iteration` varchar(255),
  `Reason` varchar(255),
  `userStoriesId` int,
  `boardId` int
);

CREATE TABLE `Epic` (
  `boardId` int,
  `epicId` int PRIMARY KEY,
  `title` varchar(255),
  `assignedTo` varchar(255),
  `state` varchar(255),
  `areaPath` varchar(255),
  `iteration` varchar(255),
  `description` text,
  `priority` varchar(255),
  `startDate` date,
  `targetDate` date
);

CREATE TABLE `userStories` (
  `epicId` int,
  `boardId` int,
  `userStoriesId` int PRIMARY KEY,
  `sprintId` int,
  `title` varchar(255),
  `assignedTo` varchar(255),
  `state` varchar(255),
  `areaPath` varchar(255),
  `iteration` varchar(255),
  `description` text,
  `priority` varchar(255),
  `effort` varchar(255)
);

CREATE TABLE `sprintTask` (
  `Id` int PRIMARY KEY,
  `userId` int,
  `name` varchar(255),
  `startDate` date,
  `endDate` date
);

CREATE TABLE `attachments` (
  `attachmentId` int PRIMARY KEY,
  `workItemsId` int,
  `attachmentLink` varchar(255)
);

ALTER TABLE `Boards` ADD FOREIGN KEY (`sprintID`) REFERENCES `sprintTask` (`Id`);

ALTER TABLE `Epic` ADD FOREIGN KEY (`boardId`) REFERENCES `Boards` (`Id`);

ALTER TABLE `userStories` ADD FOREIGN KEY (`epicId`) REFERENCES `Epic` (`epicId`);

ALTER TABLE `Task` ADD FOREIGN KEY (`userStoriesId`) REFERENCES `userStories` (`userStoriesId`);

ALTER TABLE `attachments` ADD FOREIGN KEY (`workItemsId`) REFERENCES `Boards` (`workItemsId`);

ALTER TABLE `userStories` ADD FOREIGN KEY (`boardId`) REFERENCES `Boards` (`Id`);

ALTER TABLE `Task` ADD FOREIGN KEY (`boardId`) REFERENCES `Boards` (`Id`);

ALTER TABLE `sprintTask` ADD FOREIGN KEY (`userId`) REFERENCES `UserTable` (`Id`);
