import React, { useCallback, useState } from 'react';
import { DatePicker, Form, Input, message, Modal } from 'antd';
import * as api from './api';

type Props = {
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
};
const UpdateUserInfoModal: React.FC<Props> = ({ visible, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onFinish = useCallback(async (data) => {
    setConfirmLoading(true);
    const hide = message.loading('正在修改基本信息...');
    await api.updateUsername(data).finally(() => {
      setConfirmLoading(false);
      hide();
    });
    message.success('修改成功！');
    onSuccess();
  }, []);
  return (
    <Modal title="更新会员信息" visible={visible} onOk={() => form.submit()} confirmLoading={confirmLoading} onCancel={onCancel}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="会员昵称" name="nickname" rules={[{ required: true, message: '请输入会员昵称!' }]}>
          <Input placeholder={'请输入会员昵称'} />
        </Form.Item>
        <Form.Item label="联系方式" name="phone" rules={[{ required: true, message: '请输入联系方式!' }]}>
          <Input placeholder={'请输入联系方式'} />
        </Form.Item>
        <Form.Item label="出生日期" name="birthday" rules={[{ required: true, message: '请输入出生日期!' }]}>
          <DatePicker format={'YYYY-MM-DD'} disabledDate={(currentDate) => currentDate.get('second') > Date.now()} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUserInfoModal;
