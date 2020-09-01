import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Checkbox, Form, Input, message, Modal } from 'antd';
import * as api from './api';
import { AxiosResponse } from 'axios';

type Props = {
  visible: boolean;
  setVisible: (setVisible: boolean) => void;
  onCancel?: () => void;
  onSuccess?: (data: AxiosResponse) => void;
  params?: any;
};
const UpdateAddressModal: React.FC<Props> = ({ visible, setVisible, onSuccess, onCancel, params }) => {
  const [form] = Form.useForm();
  const currentAddress = useMemo(() => params.address, [params]);
  const addressOptionMode = useMemo(() => (currentAddress.id ? '修改' : '添加'), [currentAddress]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onFinish = useCallback(
    async (formData) => {
      setConfirmLoading(true);
      const hide = message.loading(`正在${addressOptionMode}收件地址...`);
      const fetchData = { ...formData };
      if (currentAddress.id) fetchData.id = currentAddress.id;
      const response = await api[currentAddress.id ? 'updateAddress' : 'addAddress'](fetchData).finally(() => {
        setConfirmLoading(false);
        hide();
      });
      message.success(`${addressOptionMode}成功！`);
      setVisible(false);
      onSuccess && onSuccess(response);
    },
    [onSuccess, setVisible, currentAddress, addressOptionMode]
  );
  const handleCancel = useCallback(() => {
    setVisible(false);
    onCancel && onCancel();
  }, [setVisible, onCancel]);
  useEffect(() => {
    if (visible) currentAddress.id ? form.setFieldsValue(currentAddress) : form.resetFields();
  }, [visible, form, currentAddress]);
  return (
    <Modal
      maskClosable={false}
      title={`${addressOptionMode}收件地址`}
      visible={visible}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
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
        <Form.Item valuePropName={'checked'} label="默认地址" name="defaultAddress">
          <Checkbox />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateAddressModal;
