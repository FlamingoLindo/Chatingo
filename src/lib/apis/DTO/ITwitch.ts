export interface ITwitch {
    myUser: MyUser
}

export interface MyUser {
    username: string
    color: string
    myChannels: IChannel[]
}

export interface IChannel {
    id: number
    channel: string
    isLive: boolean
    newMessages: boolean
    isSelected: boolean
    messages: IMessage[]
}

export interface IMessage {
    time: string
    sender: ISender
    content: string
}

export interface ISender {
    badges: string[]
    username: string
    color: string
}

export type MyChannels = ITwitch["myUser"]["myChannels"];