import {errorMessages,successMessages} from '../../constants/resMessages.js'
import {errorStatusCodes,successStatusCodes} from '../../constants/statusCodes.js'
import {messageHandler} from '../../common/handlers.js'

const{badRequestMessage,unauthorizedMessage,forbiddenMessage,notFoundMessage,conflictMessage} = errorMessages

const {createdMessage,updatedMessage,deletedMessage,loginSuccessMessage} = successMessages

const {badRequest,unauthorized,forbidden,notFound,methodNotAllowed,conflict} = errorStatusCodes

const {ok,created,accepted,noContent,notModified} = successStatusCodes

export const newMessage = {
    conflict_message : new messageHandler(conflict,conflictMessage),
    user_signup: new messageHandler(created, createdMessage),
    login_successfull: new messageHandler(ok, loginSuccessMessage),
    unauthorized: new messageHandler(unauthorized, unauthorizedMessage)
}
