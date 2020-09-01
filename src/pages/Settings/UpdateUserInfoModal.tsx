import React, { useCallback, useContext, useState } from 'react';
import { DatePicker, Form, Input, message, Modal } from 'antd';
import * as api from './api';
import { AxiosResponse } from 'axios';
import { StoreContext } from '../../store';

type Props = {
  visible: boolean;
  setVisible: (setVisible: boolean) => void;
  onCancel?: () => void;
  onSuccess?: (data: AxiosResponse) => void;
};
const UpdateUserInfoModal: React.FC<Props> = ({ visible, setVisible, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const { state } = useContext(StoreContext);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onFinish = useCallback(
    async (formData) => {
      setConfirmLoading(true);
      const hide = message.loading('正在修改基本信息...');
      const response = await api.updateUserInfo(formData).finally(() => {
        setConfirmLoading(false);
        hide();
      });
      message.success('修改成功！');
      setVisible(false);
      onSuccess && onSuccess(response);
    },
    [setVisible, onSuccess]
  );
  const handleCancel = useCallback(() => {
    setVisible(false);
    onCancel && onCancel();
  }, [setVisible, onCancel]);
  return (
    <Modal maskClosable={false} title="更新会员信息" visible={visible} onOk={() => form.submit()} confirmLoading={confirmLoading} onCancel={handleCancel}>
      <Form form={form} onFinish={onFinish} labelCol={{ span: 4 }}>
        <Form.Item label="会员昵称" name="nickname" rules={[{ required: true, message: '请输入会员昵称!' }]} initialValue={state.user.nickname}>
          <Input placeholder={'请输入会员昵称'} />
        </Form.Item>
        <Form.Item label="联系方式" name="phone" initialValue={state.user.mobile}>
          <Input placeholder={'请输入联系方式'} />
        </Form.Item>
        <Form.Item label="出生日期" name="birthday">
          <DatePicker format={'YYYY-MM-DD'} disabledDate={(currentDate) => currentDate.get('second') > Date.now()} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUserInfoModal;
