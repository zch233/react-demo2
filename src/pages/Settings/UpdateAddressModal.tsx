import React, { useCallback, useState } from 'react';
import { Form, Input, message, Modal } from 'antd';
import * as api from './api';

type Props = {
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
};
const UpdateAddressModal: React.FC<Props> = ({ visible, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onFinish = useCallback(async (data) => {
    setConfirmLoading(true);
    const hide = message.loading('正在添加收件地址...');
    await api.addAddress(data).finally(() => {
      setConfirmLoading(false);
      hide();
    });
    message.success('添加成功！');
    onSuccess();
  }, []);
  return (
    <Modal title="添加收件地址" visible={visible} onOk={() => form.submit()} confirmLoading={confirmLoading} onCancel={onCancel}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="收件人" name="nickname" rules={[{ required: true, message: '请输入收件人名称!' }]}>
          <Input placeholder={'请输入收件人名称'} />
        </Form.Item>
        <Form.Item label="联系方式" name="phone" rules={[{ required: true, message: '请输入联系方式!' }]}>
          <Input placeholder={'请输入联系方式'} />
        </Form.Item>
        <Form.Item label="具体地址" name="birthday" rules={[{ required: true, message: '请输入具体地址!' }]}>
          <Input.TextArea placeholder={'请输入具体地址'} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateAddressModal;
