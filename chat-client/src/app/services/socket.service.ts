import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Subject, Observable } from 'rxjs';

export interface ChatMessage {
  username: string;
  text: string;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket?: Socket;
  private currentUser = '';
  private message$ = new Subject<ChatMessage>();
  private userConnected$ = new Subject<string>();

  connect(username: string) {
    this.currentUser = username;
    this.socket = io(environment.SOCKET_URL, {
      transports: ['websocket', 'polling'],
    });

    this.socket.on('connect', () => {
      this.socket?.emit('user_connected', username);
    });

    this.socket.on('message', (m: ChatMessage) => this.message$.next(m));
    this.socket.on('user_connected', (u: string) => this.userConnected$.next(u));
  }

  sendMessage(text: string) {
    const payload: ChatMessage = {
      username: this.currentUser || 'Invitado',
      text: text.trim(),
      timestamp: Date.now(),
    };
    if (!payload.text) return;
    this.socket?.emit('message', payload);
  }

  onMessage(): Observable<ChatMessage> {
    return this.message$.asObservable();
  }
  onUserConnected(): Observable<string> {
    return this.userConnected$.asObservable();
  }
}
