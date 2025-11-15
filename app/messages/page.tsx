'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getUser } from '@/lib/auth';
import { getConversations, getMessages, sendMessage, markAsRead, type Conversation, type Message } from '@/lib/messaging';
import { Send, MessageSquare } from 'lucide-react';

export default function MessagesPage() {
  const router = useRouter();
  const [user, setUser] = useState(getUser());
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadConversations();
  }, [user, router]);

  useEffect(() => {
    if (selectedConv && user) {
      loadMessages(selectedConv);
      markAsRead(selectedConv, user.id);
    }
  }, [selectedConv, user]);

  const loadConversations = () => {
    if (!user) return;
    const convs = getConversations(user.id);
    setConversations(convs.sort((a, b) => b.lastMessageTime - a.lastMessageTime));
  };

  const loadMessages = (convId: string) => {
    const msgs = getMessages(convId);
    setMessages(msgs);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConv || !user) return;

    const conv = conversations.find(c => c.id === selectedConv);
    if (!conv) return;

    const receiverId = conv.participants.find(p => p !== user.id) || '';
    
    sendMessage(selectedConv, user.id, user.name, receiverId, newMessage);
    setNewMessage('');
    loadMessages(selectedConv);
    loadConversations();
  };

  if (!user) return null;

  const selectedConversation = conversations.find(c => c.id === selectedConv);
  const otherParticipantName = selectedConversation 
    ? selectedConversation.participantNames[selectedConversation.participants.find(p => p !== user.id) || '']
    : '';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl h-[calc(100vh-200px)]">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Messages</h1>
          </div>

          <div className="grid md:grid-cols-3 gap-4 h-full">
            <Card className="md:col-span-1 overflow-auto">
              <CardContent className="p-0">
                {conversations.length === 0 ? (
                  <div className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No conversations yet</p>
                  </div>
                ) : (
                  conversations.map(conv => {
                    const otherUserId = conv.participants.find(p => p !== user.id) || '';
                    const otherUserName = conv.participantNames[otherUserId];
                    const unread = conv.unreadCount[user.id] || 0;

                    return (
                      <div
                        key={conv.id}
                        className={`p-4 border-b cursor-pointer hover:bg-muted transition-colors ${
                          selectedConv === conv.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => setSelectedConv(conv.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-semibold flex items-center gap-2">
                              {otherUserName}
                              {unread > 0 && (
                                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                                  {unread}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {conv.lastMessage || 'Start a conversation'}
                            </p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(conv.lastMessageTime).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2 flex flex-col">
              {selectedConv ? (
                <>
                  <div className="p-4 border-b">
                    <h2 className="font-semibold">{otherParticipantName}</h2>
                  </div>

                  <CardContent className="flex-1 overflow-auto p-4 space-y-4">
                    {messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            msg.senderId === user.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <div className="text-xs opacity-70 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>

                  <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
