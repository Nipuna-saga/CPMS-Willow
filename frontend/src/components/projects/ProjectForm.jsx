import React, { useEffect } from "react";

import { Button, Form, Input, InputNumber, Select, Modal, Space } from "antd";

const { TextArea } = Input;
const { Option } = Select;

function ProjectForm({
  onCreate,
  onEdit,
  selectedProject,
  isModalOpen,
  setIsModalOpen,
  title,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedProject) form.setFieldsValue({ ...selectedProject });
  }, [selectedProject]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    if (selectedProject) {
      onEdit({ id: selectedProject.id, values });
    } else {
      onCreate({ values });
    }
  };
  return (
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
        <Form.Item
          name="phase"
          label="Phase"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select current Phase">
            <Option value="Planning">Planning</Option>
            <Option value="Design">Design</Option>
            <Option value="Site Preparation">Site Preparation</Option>
            <Option value="Foundation Work">Foundation Work</Option>
            <Option value="Structural Construction">
              Structural Construction
            </Option>
            <Option value="Exterior Work">Exterior Work</Option>
            <Option value="Interior Construction">Interior Construction</Option>
            <Option value="Finishing Work">Finishing Work</Option>
            <Option value="Inspection, Testing, and Handover">
              Inspection, Testing, and Handover
            </Option>
            <Option value="Commissioning">Commissioning</Option>
            <Option value="Operational">Operational</Option>
            <Option value="Expansion and Upgrades">
              Expansion and Upgrades
            </Option>
          </Select>
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
              {selectedProject ? "Update" : "Create"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ProjectForm;
