import React, { useState } from 'react';
import { Button, Select, Typography, Space, Dropdown, Menu, Tooltip } from 'antd';
import {
  MinusOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import './index.style.scss';
import Title from 'antd/es/typography/Title';

const { Text } = Typography;
const { Option } = Select;

const AppViewContent = ({ data }) => {
  console.log('data', data);
  const [fontSize, setFontSize] = useState(16);
  const [fontStyle, setFontStyle] = useState('default');
  const [showSettings, setShowSettings] = useState(false);
  const increaseFontSize = () => setFontSize((size) => size + 2);
  const decreaseFontSize = () => setFontSize((size) => Math.max(size - 2, 12));
  const handleFontStyleChange = (value) => setFontStyle(value);

  const fontStyles = {
    default: 'Arial, sans-serif',
    serif: 'Georgia, serif',
    monospace: 'Courier New, monospace',
    cursive: 'Comic Sans MS, cursive',
  };

  // Create dropdown menu for font settings
  const menu = (
    <Menu>
      <Menu.Item key="fontSize">
        <Space direction="vertical" size="middle">
          <Text strong>Cỡ chữ:</Text>
          <Space>
            <Button icon={<MinusOutlined />} onClick={decreaseFontSize} />
            <Text>{fontSize}px</Text>
            <Button icon={<PlusOutlined />} onClick={increaseFontSize} />
          </Space>
        </Space>
      </Menu.Item>

      <Menu.Item key="fontStyle">
        <Space direction="vertical" size="middle">
          <Text strong>Kiểu chữ:</Text>
          <Select
            value={fontStyle}
            onChange={handleFontStyleChange}
            style={{ width: 160 }}
          >
            <Option value="default">Mặc định</Option>
            <Option value="serif">Serif</Option>
            <Option value="monospace">Monospace</Option>
            <Option value="cursive">Cursive</Option>
          </Select>
        </Space>
      </Menu.Item>
    </Menu>
  );

  // Toggling settings visibility when clicking the button
  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div
      className="view-content"
      style={{
        fontSize: `${fontSize}px`,
        fontFamily: fontStyles[fontStyle],
      }}
    >
      <Title level={1}>{data?.title}</Title>
      <div className='view-content-info'>
        <Text type="secondary">
          {data?.duration} phút đọc
          {/* Viết bởi {data.author} -  */}
        </Text>

        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <Dropdown overlay={menu} trigger={['click']} visible={showSettings} onVisibleChange={handleSettingsClick}>
            <Tooltip title={'Cài đặt font chữ'}>
              <Button
                icon={<SettingOutlined />}
                onClick={() => setShowSettings(!showSettings)}
              >
              </Button>
            </Tooltip>
          </Dropdown>
        </div>
      </div>

      <div
        style={{
          fontSize: `${fontSize}px`,
          fontFamily: fontStyles[fontStyle],
        }}
        dangerouslySetInnerHTML={{ __html: data?.content }}
      />
      <div className='button-complete'>
        <Button type='primary'>Hoàn thành bài học</Button>
      </div>
    </div>
  );
};

export default AppViewContent;
