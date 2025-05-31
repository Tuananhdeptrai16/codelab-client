import React from 'react';
import { Typography} from 'antd';

import Title from 'antd/es/typography/Title';

const { Text } = Typography;

const AppViewBlog = ({ data }) => {
  return (
    <div
      className="view-content"

    >
      <Title level={1}>{data?.title}</Title>
      <div className='view-content-info'>
        <Text type="secondary">
          {data?.duration} phút đọc - 
          Viết bởi <strong  style={{color : '#000'}}>{data?.name_owner || data?.display_name}</strong>
        </Text>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: data?.content }}
      />
    </div>
  );
};

export default AppViewBlog;
