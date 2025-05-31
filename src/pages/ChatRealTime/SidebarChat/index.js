import { Avatar, List, Tag } from 'antd';
import Search from 'antd/es/input/Search';
import Sider from 'antd/es/layout/Sider';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import useFetch from '../../../services/useFetch';
import API from '../../../services/shared/api';
import AppLoader from '../../../components/AppLoader';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';


const SidebarChat = ({setUserSelected}) => {
    const [dataListUser, setDataListUser] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { data: dataApi, loading: loadingGetRoom } = useFetch(API.API_GET_LIST_ROOM);

    useEffect(() => {
        if (Array.isArray(dataApi)) {
            setDataListUser(dataApi);
        } else {
            setDataListUser([]);
        }
    }, [dataApi]);


  

    const handleSelectChat = (item) => {
        setSelectedChatId(item.id);
        setShowSuggestions(false);
        setSearchTerm('');
        setUserSelected(item)
    };

    const filteredUsers = dataListUser?.filter(user =>
        user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    return (
        <Sider width={400} className='sider'>
            <div>
                <Title level={2} style={{ fontWeight: 800 }}>Chats</Title>
            </div>

            <div style={{ position: 'relative' }}>
                <Search
                    placeholder="Tìm kiếm đoạn chat"
                    allowClear
                    value={searchTerm}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {showSuggestions && searchTerm && (
                    <List
                        className='search-suggestions'
                        size="small"
                        dataSource={filteredUsers}
                        renderItem={(item) => (
                            <List.Item onClick={()=> handleSelectChat(item)} className='suggestion-item'>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar icon={<UserOutlined />} src={item.avatar} size={30} />
                                    }
                                    title={<strong>{item.name}</strong>}
                                    description={
                                        item.is_group === 1 ? (
                                            <>
                                                <TeamOutlined style={{ marginRight: 4 }} />
                                                <Tag color="green">Nhóm</Tag>
                                            </>
                                        ) : (
                                            <>
                                                <UserOutlined style={{ marginRight: 4 }} />
                                                <Tag color="red">Client</Tag>
                                            </>
                                        )
                                    }
                                />
                            </List.Item>
                        )}
                    />
                )}
            </div>

            {loadingGetRoom ? (
                <AppLoader />
            ) : (
                <List

                    className='account-list'
                    itemLayout='horizontal'
                    dataSource={dataListUser}
                    renderItem={(item) => (
                        <List.Item
                            className={`account-item ${selectedChatId === item.id ? 'active' : ''}`}
                            onClick={() => handleSelectChat(item)}
                        >
                            <List.Item.Meta
                                avatar={
                                    item.is_group
                                        ? <Avatar icon={<TeamOutlined />} size={40} />
                                        : <Avatar icon={<UserOutlined />} src={item.avatar} size={40} />
                                }
                                title={<span className='custom-meta-title'>{item.name}</span>}
                                description={
                                    item.is_group ? (
                                        <>
                                            <TeamOutlined style={{ marginRight: 4 }} />
                                            <Tag color="blue">Nhóm</Tag>
                                        </>
                                    ) : (
                                        <>
                                            <UserOutlined style={{ marginRight: 4 }} />
                                            <Tag color="green">1-1</Tag>
                                        </>
                                    )
                                }
                            />
                        </List.Item>
                    )}
                />
            )}
        </Sider>
    );
};

export default SidebarChat;
