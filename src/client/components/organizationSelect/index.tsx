import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import OrganizationSelector from './select'; // 请根据你的项目结构调整路径

const OrganizationTree = () => {
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
    <div>
      <Button type="primary" onClick={showModal}>
        组织选择器
      </Button>
      <Modal
        title="选择组织"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <OrganizationSelector />
      </Modal>
    </div>
  );
};

export default OrganizationTree;
