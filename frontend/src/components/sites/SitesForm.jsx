import React, { useEffect } from "react";

import { Button, Form, Input, InputNumber, Select } from "antd";

const { TextArea } = Input;

function SitesForm({ onCreate, onEdit, selectedSite }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedSite) form.setFieldsValue({ ...selectedSite });
  }, [selectedSite]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    if (selectedSite) {
      onEdit({ siteId: selectedSite.id, values });
    } else {
      onCreate({ values });
    }
  };
  return (
    <div
      style={{
        padding: "20px",
        width: "50%",
        background: "gray",
      }}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="Name" name="name">
          <Input placeholder="Diamond Dogs Mother Base" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Longitude" name="longitude">
          <InputNumber placeholder="12.5" />
        </Form.Item>
        <Form.Item label="Latitude" name="latitude">
          <InputNumber placeholder="13.56" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SitesForm;
