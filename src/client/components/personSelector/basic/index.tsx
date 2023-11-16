import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

// 模拟一些人员数据
const peopleData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
  { id: 4, name: 'Bob Brown' },
  // 添加更多人员数据...
];

const PersonSelectorBasic = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handlePersonChange = (value) => {
    setSelectedPerson(value);
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="选择人员"
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
