import React, { useCallback, useState } from 'react';
import { Form, Input, message, Modal } from 'antd';
import * as api from './api';
import useCaptcha from '../../hooks/useCaptcha';

type Props = {
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
};
const UpdatePasswordModal: React.FC<Props> = ({ visible, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const addonAfter = useCaptcha({ phone: '15915919519' });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onFinish = useCallback(async (data) => {
    setConfirmLoading(true);
    const hide = message.loading('正在更新密码...');
    await api.updatePassword(data).finally(() => {
      setConfirmLoading(false);
      hide();
    });
    message.success('更新成功！');
    onSuccess();
  }, []);
  return (
    <Modal title="更新密码" visible={visible} onOk={() => form.submit()} confirmLoading={confirmLoading} onCancel={onCancel}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="会员账号">15915919519</Form.Item>
        <Form.Item label="新密码" name="newPassword" rules={[{ required: true, message: '请输入新密码!' }]}>
          <Input placeholder={'请输入新密码'} />
        </Form.Item>
        <Form.Item label="验证码" name="captcha" rules={[{ required: true, message: '请输入验证码!' }]}>
          <Input className={'input captcha'} placeholder={'请输入验证码'} addonAfter={addonAfter} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePasswordModal;
