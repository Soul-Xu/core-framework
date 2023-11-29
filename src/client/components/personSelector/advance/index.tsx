import { Button, Cascader, Modal } from 'antd';
import React, { useState } from "react";

interface Props {
  onSelect: (params: any) => void,
  placeholder: string
}

// 模拟人员数据
const personData = [
  {
    value: '1',
    label: 'John Doe',
    children: [
      {
        value: '2',
        label: 'Alice Johnson',
      },
      {
        value: '3',
        label: 'Bob Smith',
      },
    ],
  },
  {
    value: '4',
    label: 'Jane Brown',
    children: [
      {
        value: '5',
        label: 'Eve Davis',
      },
      {
        value: '6',
        label: 'Charlie White',
      },
    ],
  },
];

const PersonSelectorAdvance = ({ onSelect, placeholder }: Props) => {
  const [visible, setVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState([]);

  /**
   * @description 弹窗显隐
   */
  const handleOpenModal = () => {
    setVisible(true);
  };

  /**
   * @description 弹窗确认
   */
  const handleOk = () => {
    setVisible(false);
    onSelect(selectedPerson);
  };

  /**
   * @description 弹窗取消
   */
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button onClick={handleOpenModal}>{placeholder}</Button>
      <Modal
        title="Select a Person"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Cascader
          options={personData}
          value={selectedPerson}
          onChange={(value: any) => setSelectedPerson(value)}
          placeholder="Select a person"
        />
      </Modal>
    </>
  );
};

export default PersonSelectorAdvance;
