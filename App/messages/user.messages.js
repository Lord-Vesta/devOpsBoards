import {errorMessages,successMessages} from '../../constants/resMessages.js'
import {errorStatusCodes,successStatusCodes} from '../../constants/statusCodes.js'
import {messageHandler} from '../../common/handlers.js'

const{unauthorizedMessage,conflictMessage} = errorMessages

const {createdMessage,loginSuccessMessage} = successMessages

const {unauthorized,conflict} = errorStatusCodes

const {ok,created} = successStatusCodes

export const newMessage = {
    conflict_message : new messageHandler(conflict,conflictMessage),
    user_signup: new messageHandler(created, createdMessage),
    login_successfull: new messageHandler(ok, loginSuccessMessage),
    unauthorized: new messageHandler(unauthorized, unauthorizedMessage)
}
