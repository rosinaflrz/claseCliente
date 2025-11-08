import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService, ChatMessage } from './services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Mini Chat en tiempo real';
  username = '';
  isLoggedIn = false;

  newMessage = '';
  messages: ChatMessage[] = [];
  systemNotices: string[] = [];

  private subs: Subscription[] = [];

  constructor(private socketSvc: SocketService) {}

  ngOnInit(): void {
    this.subs.push(
      this.socketSvc.onMessage().subscribe((msg) => {
        this.messages.push(msg);
        setTimeout(() => {
          const box = document.getElementById('messagesBox');
          if (box) box.scrollTop = box.scrollHeight;
        }, 0);
      })
    );

    this.subs.push(
      this.socketSvc.onUserConnected().subscribe((user) => {
        this.systemNotices.push(`${user} se ha conectado`);
        setTimeout(() => {
          const box = document.getElementById('messagesBox');
          if (box) box.scrollTop = box.scrollHeight;
        }, 0);
      })
    );
  }

  join(): void {
    const clean = this.username.trim();
    if (clean.length < 2) {
      alert('Escribe un nombre de al menos 2 caracteres');
      return;
    }
    this.socketSvc.connect(clean);
    this.isLoggedIn = true;
  }

  send(): void {
    const text = this.newMessage.trim();
    if (!text) return;
    this.socketSvc.sendMessage(text);
    this.newMessage = '';
  }

  formatTime(ts: number): string {
    return new Date(ts).toLocaleTimeString();
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
