import React, { useEffect, useState, useCallback } from 'react';
import {  Button, Divider, Layout, Menu, message, Modal } from 'antd';
import {  CloseCircleOutlined,  ProjectOutlined } from '@ant-design/icons';
import API from '../../services/shared/api';
import instanceCore from '../../services/setUpAxios';
import useFetch from '../../services/useFetch';
import BoardMoreMenu from './BoardMoreMenu';
import './index.style.scss';
import Title from 'antd/es/typography/Title';
import AddBoardAction from './AddBoardAction';
import AddColumnAction from './AddColumnAction';
import SafeBoard from './SafeBoard';
import LaneHeaderActions from './CustomLaneHeader';
import Input from 'antd/es/input/Input';
import AppEmpty from '../../components/AppEmpty';

const { Sider, Content } = Layout;

const TrelloPage = () => {
  const { data, loading } = useFetch(API.API_LIST_BOARD);
  const [allBoards, setAllBoards] = useState([]);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [currentBoardData, setCurrentBoardData] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  useEffect(() => {
    if (data?.boards) {
      const fetchColumns = async () => {
        const boardsWithColumns = await Promise.all(
          data.boards.map(async (board) => {
            try {
              const columnRes = await instanceCore.get(API.API_GET_COLUMN(board.id));
              const columns = await Promise.all(
                (columnRes?.data || []).map(async (column) => {
                  try {
                    const cardRes = await instanceCore.get(API.API_GET_CARD(board.id, column.id));
                    const cards = Array.isArray(cardRes?.data)
                      ? cardRes.data
                      : cardRes?.data ? [cardRes.data] : [];

                    return {
                      id: String(column.id),
                      title: column.title,
                      cards: cards.map(card => ({
                        id: String(card.id),
                        title: card.title,
                        description: card.description || '',
                      })),
                    };
                  } catch {
                    return {
                      id: String(column.id),
                      title: column.title,
                      cards: [],
                    };
                  }
                })
              );

              return {
                id: String(board.id),
                title: board.title,
                lanes: columns,
              };
            } catch {
              return {
                id: String(board.id),
                title: board.title,
                lanes: [],
              };
            }
          })
        );

        setAllBoards(boardsWithColumns);
        if (!currentBoardId && boardsWithColumns.length > 0) {
          setCurrentBoardId(boardsWithColumns[0].id);
          setCurrentBoardData(boardsWithColumns[0]);
        }
      };
      fetchColumns();
    }
  }, [data, reloadTrigger]);

  const handleReload = useCallback(() => {
    setReloadTrigger(prev => !prev);
  }, []);

  const handleBoardSelect = useCallback((id) => {
    const selected = allBoards.find(b => b.id === id);
    setCurrentBoardId(id);
    setCurrentBoardData(selected);
  }, [allBoards]);

  const handleCardMove = useCallback(async (cardId, sourceLaneId, targetLaneId) => {
    try {
      if (!currentBoardData) return;
      const updateData = {
        column_id: targetLaneId
      };
      const response = await instanceCore.put(
        API.API_UPDATE_CARD(currentBoardId, cardId),
        updateData
      );
      if (response) {
        const clonedLanes = currentBoardData.lanes.map(lane => ({
          ...lane,
          cards: [...lane.cards],
        }));

        const sourceLane = clonedLanes.find(lane => lane.id === sourceLaneId);
        const targetLane = clonedLanes.find(lane => lane.id === targetLaneId);

        if (!sourceLane || !targetLane) return;

        const card = sourceLane.cards.find(c => c.id === cardId);
        if (!card) return;

        sourceLane.cards = sourceLane.cards.filter(c => c.id !== cardId);
        targetLane.cards.push({ ...card });

        setCurrentBoardData({
          ...currentBoardData,
          lanes: clonedLanes,
        });
      }

    } catch (error) {
      console.error('Error adding card:', error);
      return null;
    }
  }, [currentBoardData]);


  const handleCardAdd = useCallback(async (card, laneId) => {
    try {
      const newCard = {
        board_id: currentBoardId,
        column_id: laneId,
        title: card.title,
        description: card.description || '',
      };
      const response = await instanceCore.post(
        API.API_ADD_CARD,
        newCard
      );

      if (response.data) {
        const updatedBoard = { ...currentBoardData };
        const lane = updatedBoard.lanes.find(l => l.id === laneId);
        lane.cards.push({
          id: String(response.data.id),
          title: response.data.title,
          description: response.data.description || '',
        });

        setCurrentBoardData(updatedBoard);
        return {
          id: String(response.data.id),
          title: response.data.title,
          description: response.data.description || '',
        };
      }
    } catch (error) {
      console.error('Error adding card:', error);
      return null;
    }
  }, [currentBoardId, currentBoardData]);

  //hàm xóa card 
  const handleCardDelete = useCallback(async (cardId, laneId) => {
    try {
      await instanceCore.delete(API.API_DELETE_CARD(cardId), {
        data: {
          ids: [cardId] 
        }
      });
      const updatedBoard = { ...currentBoardData };
      const lane = updatedBoard.lanes.find(l => l.id === laneId);
      lane.cards = lane.cards.filter(card => card.id !== cardId);

      setCurrentBoardData(updatedBoard);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  }, [currentBoardData]);
  // hàm xóa cột 
  const handleLaneDelete = useCallback(async (laneId) => {
    try {
      console.log('laneId', laneId);
      await instanceCore.delete(API.API_DELETE_COLUMN(currentBoardId), {
        data: {
          ids: [laneId] 
        }
      });
      const updatedBoard = { ...currentBoardData };
      updatedBoard.lanes = updatedBoard.lanes.filter(lane => lane.id !== laneId);

      setCurrentBoardData(updatedBoard);
    } catch (error) {
      console.error('Error deleting lane:', error);
    }
  }, [currentBoardId, currentBoardData]);

  const handleRenameLane = useCallback((laneId, currentName) => {
    let newName = currentName;
  
    const modal = Modal.confirm({
      title: 'Đổi tên cột',
      content: (
        <Input
          defaultValue={currentName}
          onChange={(e) => {
            newName = e.target.value;
          }}
          onPressEnter={() => modal.update({ okButtonProps: { disabled: !newName.trim() } })}
        />
      ),
      okText: 'Lưu',
      cancelText: 'Hủy',
      onOk: async () => {
        if (!newName.trim()) {
          message.warning('Tên cột không được để trống!');
          return Promise.reject(); 
        }
        try {
          await instanceCore.put(API.API_UPDATE_COLUMN(currentBoardId, laneId), { title: newName });
          setCurrentBoardData(prev => ({
            ...prev,
            lanes: prev.lanes.map(lane =>
              lane.id === laneId ? { ...lane, title: newName } : lane
            )
          }));
          message.info('✔ Đổi tên thành công!');
        } catch (error) {
          message.error('Đổi tên thất bại!');
        }
      },
    });
  }, [currentBoardId]);

  const handleViewLane = useCallback((laneId) => {
    console.log('Xem chi tiết cột:', laneId);
  }, []);

  return (
    <Layout className='layout-trello' style={{ minHeight: '100vh' }}>
      <Sider width={300} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[String(currentBoardId)]}
          onClick={({ key }) => handleBoardSelect(key)}
          style={{ height: '100%', padding: 5 }}
        >
          <Title level={4} className='title-layout' style={{ fontWeight: 700, marginBottom: 20 }}>
            Danh sách Boards
          </Title>
          {allBoards.map(board => (
            <Menu.Item
              key={String(board.id)}
              className='menu-item'
              icon={<ProjectOutlined />}
            >
              <div className='board-item-wrap'>
                <p style={{ fontWeight: 500, fontSize: 14 }}>{board.title}</p>
                <BoardMoreMenu
                  board={board}
                  onView={handleBoardSelect}
                />
              </div>
            </Menu.Item>
          ))}
          <AddBoardAction handleReload={handleReload} />
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <div className="content-trello-wrap" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            {loading || !currentBoardData ? (
              <AppEmpty size="large" />
            ) :  <SafeBoard
                data={{ lanes: currentBoardData.lanes }}
                draggable
                handleDragEnd={handleCardMove}
                onCardAdd={handleCardAdd}
                onCardDelete={handleCardDelete}
                onLaneDelete={handleLaneDelete}
                style={{ paddingTop: 50, flex: 1 }}
                editable
                canAddLanes={false}
                components={{
                  Card: (props) => (
                    <div className="custom-trello-card">
                      <div className="card-title">
                        <p>{props.title}</p>
                      </div>
                      <Divider/>
                      {props.description && (
                        <div className="card-description">
                          <p>{props.description}</p>
                        </div>
                      )}
              
                      <div className="card-labels">
                        {props.labels &&
                          props.labels.map((label, index) => (
                            <span key={index} className="label" style={{ backgroundColor: label.color }}>
                              {label.text}
                            </span>
                          ))}
                      </div>
              
                      <div className="card-actions">
                        <Button icon={<CloseCircleOutlined/>} danger onClick={() => props.onDelete(props.id)} className="delete-button">
                         
                        </Button>
                      </div>
                    </div>
                  ),
                  LaneHeader: (props) => (
                    <div className='lane-header-custom'>
                      <p className='lane-title'>{props.title}</p>
                      <LaneHeaderActions
                        laneId={props.id}
                        title={props.title}
                        onRename={handleRenameLane}
                        onView={handleViewLane}
                        onDelete={props.onDelete}
                      />
                    </div>
                  )
                }}

              />}
           
            <AddColumnAction handleReload={handleReload} boardId={currentBoardId} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TrelloPage;