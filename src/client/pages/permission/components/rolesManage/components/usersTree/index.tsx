import React, { useState } from 'react';
import { Modal, Button, Divider } from 'antd';
import UsersSelector from './select'; // 请根据你的项目结构调整路径

/** css */
import classnames from 'classnames/bind';
import style from './index.module.scss';
const classNames = classnames.bind(style);

const UsersTree = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className={classNames("users-select")}>
      <Button type="primary" onClick={showModal}>
        人员选择器
      </Button>
      <Modal
        width={760}
        title="人员选择"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Divider style={{ marginTop: "14px", marginBottom: "16px" }}/>
        <UsersSelector />
      </Modal>
    </div>
  );
};

export default UsersTree;
