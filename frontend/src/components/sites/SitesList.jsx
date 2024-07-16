import React from "react";
import { Table, Space, Button } from "antd";

import { useNavigate, useLocation } from "react-router-dom";

function SitesList({ data, onDelete, onEdit }) {
  const navigate = useNavigate();
  let location = useLocation();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Location",
      
      key: "location",
      render: (_, record) => (
        <Space size="middle">
        <span>{record.latitude}</span>
        <span>{record.longitude}</span>
        </Space>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            onClick={() => navigate(`${location.pathname}/${record.id}`)}
          >
            View
          </Button>

          <Button type="primary" size="small" onClick={() => onEdit(record.id)}>
            Edit
          </Button>

          <Button danger size="small" onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Table dataSource={data} columns={columns} rowKey={(record) => record.id} />
  );
}

export default SitesList;
