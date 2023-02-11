export interface IMessage {
  content: string;
  avatar: string;
  from: 'me' | 'them';
  nickName: string;
  messageId: string;
  parentMessageId?: string;
  conversationId: string;
}

export interface IConversation {
  id: string;
  messages: IMessage[];
}