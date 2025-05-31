import { SendOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import './index.style.scss';
import instanceCore from '../../../services/setUpAxios';
import API from '../../../services/shared/api';
import AppEmpty from '../../../components/AppEmpty';
import { useAuthState } from '../../../ProviderContext/AppAuthJWTContext.js';


const ChatRoom = ({ roomId, userId }) => {
    const [messages, setMessages] = useState([]);
    const { auth } = useAuthState()
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (!roomId) {
            console.warn('⚠️ roomId bị null hoặc undefined');
            return;
        }
        const fetchMessages = async () => {
            try {
                const apiUrl = API.GET_MESSAGE_BY_ROOM_ID(roomId);
                const res = await instanceCore.get(apiUrl);
                const data = res.data;
                setMessages(data);
            } catch (error) {
                console.error('❌ Chi tiết:', error.response?.data);
            }
        };
        fetchMessages();
    }, [roomId]);

    useEffect(() => {
        const newSocket = io(`${process.env.REACT_APP_BASE_URL_API_LOCAL}`);
        setSocket(newSocket);

        newSocket.emit('join_room', roomId);
        console.log(`Joining room: ${roomId}`);

        newSocket.on('new_message', (msg) => {
            console.log('Received message:', msg);
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            newSocket.off('new_message');
            newSocket.disconnect();
        };
    }, [roomId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (input.trim() && socket) {
            const messagePayload = {
                roomId,
                sender_id: userId,
                content: input,
                avatar: auth?.user?.avatar,      
                username: auth?.user?.username,
            };
            socket.emit('send_message', messagePayload);
            setInput('');
        }
    };

    return (
        <div className="chat-room">
            <div className="chat-messages">
                {!roomId || messages.length === 0 ? (
                    <AppEmpty />
                ) : (
                    messages.map((msg, index) => {
                        const isMe = msg.sender_id === userId;
                        return (
                            <div
                                key={index}
                                className={`chat-message ${isMe ? 'me' : 'other'}`}
                            >
                                {!isMe && (
                                    <>
                                        <Avatar src={msg.avatar} icon={<UserOutlined />} className="chat-avatar" />
                                        <div className="message-target">
                                            <div className="chat-bubble">
                                                <p className='chat-name' style={{ fontWeight: 'bold' }}><strong>{msg.username || msg.display_name || 'Người dùng Codelab'}</strong></p>
                                                {msg.content}</div>
                                        </div>
                                    </>
                                )}
                                {isMe && (
                                    <div className="message-content">
                                        <div className="chat-bubble">{msg.content}</div>
                                    </div>
                                )}
                                <div className="chat-time">
                                    {new Date(msg.created_at).toLocaleTimeString('vi-VN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="message-input">
                <TextArea
                    placeholder="Nhập tin nhắn ..."
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onPressEnter={(e) => {
                        e.preventDefault();
                        sendMessage();
                    }}
                />
                <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={() => {
                        sendMessage()
                    }}
                />
            </div>
        </div>
    );
};

export default ChatRoom;
