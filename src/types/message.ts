export type MessageMeta = {
  attachmentUrl?: string;
  attachmentType?: string;
  [key: string]: any;
};

export type MessageParams = {
  _id: string;
  senderId: string;
  recipientId: string;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
  meta?: MessageMeta;
};
