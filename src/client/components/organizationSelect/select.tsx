import React, { useState } from 'react';
import { Cascader, Tree } from 'antd';
// import 'antd/dist/antd.css';

const { TreeNode } = Tree;

const treeData = [
  {
    title: '公司总部',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: '技术部',
        value: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '前端团队', value: '0-0-0-0', key: '0-0-0-0', children: [
            { title: '张三', value: '0-0-0-0-0', key: '0-0-0-0-0' },
            { title: '李四', value: '0-0-0-0-1', key: '0-0-0-0-1' },
          ] },
          { title: '后端团队', value: '0-0-0-1', key: '0-0-0-1', children: [
            { title: '王五', value: '0-0-0-1-0', key: '0-0-0-1-0' },
            { title: '赵六', value: '0-0-0-1-1', key: '0-0-0-1-1' },
          ] },
        ],
      },
      {
        title: '市场部',
        value: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '销售团队', value: '0-0-1-0', key: '0-0-1-0' },
          { title: '市场推广团队', value: '0-0-1-1', key: '0-0-1-1' },
        ],
      },
    ],
  },
];

const OrganizationSelector = () => {
  const [selectedOrg, setSelectedOrg] = useState([]);

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onChange = (value, selectedOptions) => {
    console.log('onChange', value, selectedOptions);
    setSelectedOrg(value);
  };

  return (
    <div>
      <Tree onSelect={onSelect}>
        {renderTreeNodes(treeData)}
      </Tree>
      <Cascader
        options={treeData}
        onChange={onChange}
        placeholder="请选择组织"
        value={selectedOrg}
      />
    </div>
  );
};

const renderTreeNodes = data => {
  return data.map(item => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} value={item.value}>
          {renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.title} key={item.key} value={item.value} />;
  });
};

export default OrganizationSelector;
