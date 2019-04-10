export class Message {
  content: string;
  timestamp: Date;
  avatar: string;
  sentBy: string;

  constructor(content: string, avatar: string, timestamp: Date, sentBy: string){
    this.content = content;
    this.timestamp = timestamp;
    this.avatar = avatar;
    this.sentBy = sentBy
  }
}