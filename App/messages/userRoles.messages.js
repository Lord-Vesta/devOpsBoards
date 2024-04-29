import {errorMessages,successMessages} from '../../constants/resMessages.js'
import {errorStatusCodes,successStatusCodes} from '../../constants/statusCodes.js'
import {messageHandler} from '../../common/handlers.js'

const{badRequestMessage,unauthorizedMessage,forbiddenMessage,notFoundMessage,conflictMessage} = errorMessages

const {createdMessage,updatedMessage,deletedMessage,loginSuccessMessage,successfullyFetchMessage} = successMessages

const {badRequest,unauthorized,forbidden,notFound,methodNotAllowed,conflict} = errorStatusCodes

const {ok,created,accepted,noContent,notModified} = successStatusCodes

export const userRoleMessages = {
    roleOfUsersFetchedSuccessfully: new messageHandler(ok,successfullyFetchMessage),
    roleOfUserDeletedSuccessfully : new messageHandler(ok,deletedMessage)
}