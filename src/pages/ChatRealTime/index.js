import React, { useState } from 'react';
import { Layout } from 'antd';
import './index.style.scss';
import AppHeaderChat from '../../components/AppHeaderChat';
import SidebarChat from './SidebarChat';
import ChatRoom from './ChatRoom';
import { useAuthState } from '../../ProviderContext/AppAuthJWTContext.js';

const { Content } = Layout;


const ChatRealTime = () => {
    const { auth } = useAuthState()
    const [userSelected, setUserSelected] = useState(null);

    return (
        <div className='chat-real-time'>
            <Layout className='sider-layout'>
                <SidebarChat setUserSelected={setUserSelected} />
                <Layout>
                     {userSelected?.id && <AppHeaderChat userSelected={userSelected} /> }
                    
                    <Content className='chat-content'>
                        <ChatRoom roomId={userSelected?.id} userId={auth?.user?.id} />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default ChatRealTime;
