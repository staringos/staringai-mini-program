export interface IMessage {
  content: string;
  avatar: string;
  from: 'me' | 'them';
  nickName: string;
}