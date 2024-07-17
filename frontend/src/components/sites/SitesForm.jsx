import React, { useEffect } from "react";

import { Button, Form, Input, InputNumber, Modal, Space } from "antd";

const { TextArea } = Input;

function SitesForm({
  onCreate,
  onEdit,
  selectedSite,
  isModalOpen,
  setIsModalOpen,
  title,
}) {
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
    // <div
    //   style={{
    //     padding: "20px",
    //     width: "50%",
    //     background: "gray",
    //   }}
    // >
    <Modal
      title={<p>{title}</p>}
      footer={<></>}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
      >
        <Form.Item label="Name" name="name">
          <Input placeholder="Diamond Dogs Mother Base" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Longitude" name="longitude">
          <InputNumber placeholder="12.5" min={-180} max={180} />
        </Form.Item>
        <Form.Item label="Latitude" name="latitude">
          <InputNumber placeholder="13.56" min={-90} max={90} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 12,
          }}
        >
          <Space>
            <Button htmlType="reset">Reset</Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {selectedSite ? "Update" : "Submit"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SitesForm;
