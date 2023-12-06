import { Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

// 模拟一些用户数据
const peopleData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
  { id: 4, name: 'Bob Brown' },
  // 添加更多用户数据...
];

const PersonSelectorBasic = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  /**
   * @description 用户选择器处理函数
   * @param value 
   */
  const handlePersonChange = (value) => {
    setSelectedPerson(value);
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="选择用户"
      value={selectedPerson}
      onChange={handlePersonChange}
    >
      {peopleData.map((person) => (
        <Option key={person.id} value={person.id}>
          {person.name}
        </Option>
      ))}
    </Select>
  );
};

export default PersonSelectorBasic;
