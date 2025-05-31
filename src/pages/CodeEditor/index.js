import React, { useState } from 'react';
import { Button, Tabs, Space } from 'antd'; // Import các thành phần từ Ant Design
import AppCodeEditor from '../../components/AppCodeEditor';
import AppPreviewCode from '../../components/AppPreviewEditor';
import { PlayCircleOutlined } from '@ant-design/icons';
import './index.style.scss'
const { TabPane } = Tabs;

const CodeEditorPage = () => {
  const [html, setHtml] = useState('<h1>Hello codeLab</h1>');
  const [css, setCss] = useState('h1 { color: red; }');
  const [js, setJs] = useState('console.log("Codelab JS")');

  const [runHtml, setRunHtml] = useState(html);
  const [runCss, setRunCss] = useState(css);
  const [runJs, setRunJs] = useState(js);

  const handleRun = () => {
    setRunHtml(html);
    setRunCss(css);
    setRunJs(js);
  };

  return (
    <div style={{ padding: '5px 10px' }}>
      <Tabs defaultActiveKey="1"  className="custom-tabs">
        <TabPane tab="HTML" key="1" >
          <AppCodeEditor language="html" value={html} onChange={setHtml} />
        </TabPane>
        <TabPane tab="CSS" key="2">
          <AppCodeEditor language="css" value={css} onChange={setCss} />
        </TabPane>
        <TabPane tab="JS" key="3">
          <AppCodeEditor language="javascript" value={js} onChange={setJs} />
        </TabPane>
      </Tabs>
      <Space style={{ marginTop: '10px' }}>
        <Button icon ={<PlayCircleOutlined/>} type="primary" onClick={handleRun}>
          Run Code
        </Button>
      </Space>
      {/* Nút "Run Code" */}
     
      {/* Hiển thị preview code */}
      <div style={{ marginTop: '10px' }}>
        <AppPreviewCode html={runHtml} css={runCss} js={runJs} />
      </div>
    </div>
  );
};

export default CodeEditorPage;
