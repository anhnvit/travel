import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Trang không tồn tại!"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Về Trang chủ
      </Button>
    }
  />
);

export default NoFoundPage;
