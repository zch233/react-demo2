import React, { useCallback, useContext, useState } from 'react';
import { Form, Input, message, Modal } from 'antd';
import * as api from './api';
import useCaptcha from '../../hooks/useCaptcha';
import { AxiosResponse } from 'axios';
import { StoreContext } from '../../index';

type Props = {
  visible: boolean;
  setVisible: (setVisible: boolean) => void;
  onCancel?: () => void;
  onSuccess?: (data: AxiosResponse) => void;
};
const UpdatePasswordModal: React.FC<Props> = ({ visible, setVisible, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const { state } = useContext(StoreContext);
  const addonAfter = useCaptcha({ phone: state.user.account as string });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onFinish = useCallback(
    async (formData) => {
      setConfirmLoading(true);
      const hide = message.loading('正在更新密码...');
      const response = await api.updateUserInfo(formData).finally(() => {
        setConfirmLoading(false);
        hide();
      });
      setVisible(false);
      message.success('更新成功！');
      onSuccess && onSuccess(response);
    },
    [onSuccess, setVisible]
  );
  const handleCancel = useCallback(() => {
    setVisible(false);
    onCancel && onCancel();
  }, [setVisible, onCancel]);
  return (
    <Modal title="更新密码" visible={visible} onOk={() => form.submit()} confirmLoading={confirmLoading} onCancel={handleCancel}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="会员账号">{state.user.account}</Form.Item>
        <Form.Item label="新密码" name="newPassword" rules={[{ required: true, message: '请输入新密码!' }]}>
          <Input placeholder={'请输入新密码'} type={'password'} />
        </Form.Item>
        <Form.Item label="验证码" name="captcha" rules={[{ required: true, message: '请输入验证码!' }]}>
          <Input className={'input captcha'} placeholder={'请输入验证码'} addonAfter={addonAfter} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePasswordModal;
