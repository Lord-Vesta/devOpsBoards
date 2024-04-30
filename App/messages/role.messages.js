import {errorMessages,successMessages} from '../../constants/resMessages.js'
import {errorStatusCodes,successStatusCodes} from '../../constants/statusCodes.js'
import {messageHandler} from '../../common/handlers.js'

const{badRequestMessage,unauthorizedMessage,forbiddenMessage,notFoundMessage,conflictMessage} = errorMessages

const {createdMessage,updatedMessage,deletedMessage,loginSuccessMessage,successfullyFetchMessage} = successMessages

const {badRequest,unauthorized,forbidden,notFound,methodNotAllowed,conflict} = errorStatusCodes

const {ok,created,accepted,noContent,notModified} = successStatusCodes


export const RoleMessages = {
    ROLE_ALREADY_EXISTS : new messageHandler(conflict,conflictMessage),
    ROLE_ADDED_SUCCESSFULLY : new messageHandler(created,createdMessage),
    UPDATE_RESTRICTED : new messageHandler(forbidden,forbiddenMessage),
    UPDATE_ROLE: new messageHandler(ok,updatedMessage),
    ROLE_NOT_FOUND: new messageHandler(notFound,notFoundMessage),
    ROLE_DELETED_SUCCESSFULLY: new messageHandler(ok,deletedMessage)
}