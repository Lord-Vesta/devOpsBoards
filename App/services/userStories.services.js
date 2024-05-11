
import { error, result } from '@hapi/joi/lib/base.js';
import { db } from '../../connection.js';

const listAlluserStory = async () => {
    try {
        const [rows] = await db.promise().query(`select * from userstories where isDeleted=false`);
        return { result: rows }
    } catch (error) {
        throw error
    }
};

const listUsersUstory = async (epicId, userId) => {
    try {
        const [rows] = await db.promise().query(`SELECT userstories.*
        FROM userstories
        JOIN userstoryusers ON userstories.userStoryId = userstoryusers.userStoryId
        WHERE userstoryusers.userId = ?
        AND userstories.epicId = ?;
        `, [epicId, userId]
        );
        return { result: rows }
    } catch (error) {
        throw error
    }
}

const getMembersOfSpecificUserStoryDb = async (userstoryId) => {
    try {
        const [rows] = await db.promise().query(`SELECT userTable.*
        FROM userTable
        JOIN userstoryusers ON userTable.Id = userstoryusers.userId
        WHERE userstoryusers.userStoryId = ?
        AND userTable.isDeleted = false;
        `, [userstoryId])
        return { result: rows }
    } catch (error) {
        throw error
    }
}

const getMemberSpecificUS = async (userstoryId, userId) => {
    try {
        const [rows] = await db.promise.query
            (`SELECT userTable.*
        FROM userTable
        JOIN userstoryusers ON userTable.Id = userstoryusers.userId
        WHERE userstoryusers.userStoryId = ?
        AND userstoryusers.userId = ?
        AND userTable.isDeleted = false;        
        `, [userstoryId, userId])
        return { result: rows }
    } catch (error) {
        throw error
    }
}


const ifEpicExistsForThatUser = async (epicId, userId) => {
    try {
        const [rows] = await db.promise().query(`select * from epic where epicId=? and epicId IN (select epicId from epicUser where userId=?);`, [epicId, userId]);
        return { result: rows }
    } catch (error) {
        throw error
    }
}



const createUserStoryDb = async (userStoryName, description, state, priority, estimateHours, epicId, userId) => {
    try {
        const newUserStory = {
            epicId: epicId,
            userStoryName: userStoryName,
            description: description,
            state: state,
            priority: priority,
            estimateHours: estimateHours,
            isDeleted: false
        };

        const [userStoryResult] = await db.promise().query(`insert into userstories set ?`, newUserStory);


        if (userStoryResult.affectedRows) {
            const userStoryId = userStoryResult.insertId;
            const [result] = await db.promise().query(`insert into userstoryusers(userStoryId,userId,isDeleted)values(?,?,?)`, [userStoryId, userId, false]);

            if (userStoryResult.affectedRows) {
                return { error: null, Mainresult: userStoryResult, result };
            }
        }

    }catch(error){
        throw error
    }
  
};





const checkUserStoryExistsAdmin = async (userstoryId) => {
    try {
        const [rows] = await db.promise().query(`select * from userstories where userStoryId=? and isDeleted=false`, userstoryId)
        return { result: rows }
    } catch (error) {
        throw error
    }
}

const addAuserToAExistingUserStoryDb = async (userId, userstoryId) => {
    try {
        const [userStoryResult] = await db.promise().query(`insert into userstoryusers (userId,userstoryId,isDeleted) values (?,?,?)`, [userId, userstoryId, false]);
        return { result: rows }
    } catch (error) {
        throw error
    }
}


export {
    listAlluserStory,
    listUsersUstory,
    getMembersOfSpecificUserStoryDb,
    getMemberSpecificUS,
    ifEpicExistsForThatUser,
    checkUserStoryExistsAdmin,
    addAuserToAExistingUserStoryDb,
    createUserStoryDb
}