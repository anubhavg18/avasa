import { Component, OnInit, Input, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../../models/message'
import { ChatService } from '../../services/chat/chat.service'
import { ChatMessage } from '../../models/chat-message.model';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  coursesObservable: Observable<any[]>;
  user : any;
  public message : Message;
  public messages : Message[];
  oldmessage : any;
  itemValue = '';
  chatmessages: Observable<any[]>;
  userkey : any;
  public show_chatlist : boolean = false;
  public button_name : any = 'Open Chat';

  // Code for Scrolling
  @ViewChild('chatlist', { read: ElementRef }) chatList: ElementRef;
  @ViewChildren(ChatComponent, { read: ElementRef }) chatItems: QueryList<ChatComponent>;

  constructor(
  	private chatService : ChatService,
    private router: Router,
    public db: AngularFireDatabase
  	) { 
  	this.message = new Message('', 'assets/images/user.png', new Date(),'user');
  	this.messages = [
      // new Message('Welcome to chatbot universe', 'assets/images/bot.png', new Date(),'bot')
  	];
  }

  ngOnInit() {
   
    //const userData: string = localStorage.getItem('userData');
    //let email = JSON.parse(userData).email;
    //this.user = JSON.parse(userData).email;
    let email = "spratapsingh11@gmail.com";
    this.user = "spratapsingh11@gmail.com";
    this.showFireMessages(email)
  }
  
  openChat(){
     this.show_chatlist = !this.show_chatlist;
    if(this.show_chatlist) 
      this.button_name = "Close Chat";
    else
      this.button_name = "Open Chat";
  }
  

  showFireMessages(email){
    this.getFireMessages(email).subscribe(res => {
      this.messages = [];
      res.forEach((item) => {
        if(item.responser != 'Agent'){
           this.messages.push(
               new Message(item.question, 'assets/images/bot.png' ,new Date() , 'user')
            );
         }
           this.messages.push(
               new Message(item.answer, 'assets/images/bot.png' ,new Date() , 'bot')
            );
      });
    });
  }

  getFireMessages(email): Observable<any[]> {
    return this.db.list('/chatmessages' , ref => ref.orderByChild('useremail').equalTo(email)).valueChanges();
  }

  fireStore(question,answer,responser , botvalue){
    this.db.list('/chatmessages').push({
     useremail:this.user,
     question:question,
     answer:answer,
     responser:responser,
     isbotresponce: botvalue,
     timestamp: this.getTimeStamp()
   });
    // console.log(this.userkey);
    const itemsRef = this.db.list('/users');
    // itemsRef.update(this.userkey , { unreadmsg: 1 });
    this.itemValue = '';
  }


  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }

  ngAfterViewInit() {
    this.chatItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  sendMessage(){
    this.message["timestamp"] = new Date();
    this.messages.push(this.message);
    this.chatService.getResponse(this.message["content"]).subscribe(res => {
      console.log(res);

    if(res.result.metadata.isFallbackIntent == 'false'){
      this.fireStore(res.result.resolvedQuery,res.result.fulfillment.speech,'Bot' , 1);
      this.messages.push(
         new Message(res.result.fulfillment.speech, 'assets/images/bot.png' ,res.timestamp , 'bot')
      );
    }else if (res.result.metadata.isFallbackIntent == 'true') {
      this.fireStore(res.result.resolvedQuery,"Can't find your answer?Go on our website where you can find the rest of the FAQ's :avasa.io/FAQ's",'manual' , 0);
      this.messages.push(
         new Message("Can't find your answer?Go on our website where you can find the rest of the FAQ's :avasa.io/FAQ's", 'assets/images/bot.png' ,res.timestamp , 'bot'));
    }
    this.scrollToBottom();
    });
    this.message = new Message('', 'assets/images/user.png', new Date ,'user');
  }

  private scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    }
    catch (err) {
      console.log('Could not find the "chatList" element.');
    }
  }
}
