import {IUser} from '~/utils/interface/user'

export interface ISendMessage {
    'message': String,
    'receiver_id': Number
}

export interface IMessage {
    'id': Number
    'message': String,
    'message_map_id': String,
    'receiver_id': String,
    'sender_id': String,
    'is_self': Boolean,
    'created_at': String,
    'updated_at': String,
}

export interface IMessageGroup {
    messages: IMessage[],
    date:String
}
