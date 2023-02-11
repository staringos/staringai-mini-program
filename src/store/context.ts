import React from "react";
import { IConversation } from "src/types/message";

export interface IContextState {
  conversationList: Record<string, IConversation>;
}

export interface IContextAction {
  sendMessage: (from: 'me' | 'them', content: string, conversationId: string, parentMessageId: string) => Promise<void>
}

export interface IContext {
  state: IContextState;
  actions: IContextAction;
}

const Context = React.createContext<IContext>({} as any);
export default Context;
