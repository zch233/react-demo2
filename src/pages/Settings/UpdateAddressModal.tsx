import React, { useCallback, useState } from 'react';
import { Form, Input, message, Modal } from 'antd';
import * as api from './api';
import { AxiosResponse } from 'axios';

type Props = {
  visible: boolean;
  setVisible: (setVisible: boolean) => void;
  onCancel?: () => void;
  onSuccess?: (data: AxiosResponse) => void;
};
const UpdateAddressModal: React.FC<Props> = ({ visible, setVisible, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onFinish = useCallback(
    async (formData) => {
      setConfirmLoading(true);
      const hide = message.loading('正在添加收件地址...');
      const response = await api.addAddress(formData).finally(() => {
        setConfirmLoading(false);
        hide();
      });
      message.success('添加成功！');
      setVisible(false);
      onSuccess && onSuccess(response);
    },
    [onSuccess, setVisible]
  );
  const handleCancel = useCallback(() => {
    setVisible(false);
    onCancel && onCancel();
  }, [setVisible, onCancel]);
  return (
    <Modal title="添加收件地址" visible={visible} onOk={() => form.submit()} confirmLoading={confirmLoading} onCancel={handleCancel}>
      <Form form={form} onFinish={onFinish} labelCol={{ span: 4 }}>
        <Form.Item label="收件人" name="name" rules={[{ required: true, message: '请输入收件人名称!' }]}>
          <Input placeholder={'请输入收件人名称'} />
        </Form.Item>
        <Form.Item label="联系方式" name="phone" rules={[{ required: true, message: '请输入联系方式!' }]}>
          <Input placeholder={'请输入联系方式'} />
        </Form.Item>
        <Form.Item label="具体地址" name="detail" rules={[{ required: true, message: '请输入具体地址!' }]}>
          <Input.TextArea placeholder={'请输入具体地址'} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateAddressModal;
