import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Skeleton, Typography, Flex, App, Modal } from 'antd';
import apiInstance from '../../../services/api';
import apiEndpoints from '../../../contants/ApiEndpoints';
import moment from 'moment';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const CreateSchedule = ({ defaultDate, employeeId, onSave }) => {
    const [form] = Form.useForm();
    const { message } = App.useApp();   

    const [shifts, setShifts] = useState([]);
    const [employee, setEmployee] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const fetchShifts = async () => {
        try {
            const response = await apiInstance.get(apiEndpoints.admin.shift.getAll);
            setShifts(response.data.$values);
        } catch (error) {
            console.error('Failed to fetch shifts: ', error);
        }
    }

    const fetchEmployeeById = async () => {
        try {
            const response = await apiInstance.get(apiEndpoints.admin.employee.getById(employeeId));
            setEmployee(response.data);
        } catch (error) {
            console.error('Failed to fetch employee by id: ', error);
        }
    }

    const onFinish = async (values) => {
        const formattedValues = {
            ...values,
            date: values.date.format('YYYY-MM-DDTHH:mm:ss.sssZ')
        };

        await apiInstance.post(apiEndpoints.admin.schedule.add, formattedValues).then((response) => {
            message.success('Schedule created successfully!');
            onSave();
            handleCloseModal();
        }).catch((error) => {
            message.error(error.response.data);
            console.error('Failed to create schedule: ', error);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    useEffect(() => {
        fetchShifts();
        fetchEmployeeById();
    }, []);

    if (!employee && !shifts) {
        return <Skeleton active />;
    }

    return (
        <>
            <Button type="outlined" onClick={handleOpenModal}>
            <PlusCircleOutlined />
            </Button>
            <Modal
                title="Create Schedule"
                open={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <Form
                    form={form}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 24 }}
                    name="createSchedule"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ employeeId: employeeId, date: defaultDate ? moment(defaultDate) : null }}
                >
                    <Form.Item
                        label="Employee Name"
                        name="employeeId"
                        rules={[{ required: true, message: 'Please select the employee!' }]}
                        style={{ marginBottom: 16 }}
                        value={employeeId}
                    >
                        <Typography.Text>{employee.name}</Typography.Text>
                    </Form.Item>
                    <Form.Item
                        label="Shift"
                        name="shiftId"
                        rules={[{ required: true, message: 'Please select the shift!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <Select placeholder="Select Shift">
                            {shifts.map(shift => (
                                <Option key={shift.id} value={shift.id}>
                                    <Flex justify="space-between">  
                                        <Typography.Text>{shift.name}</Typography.Text>
                                        <Typography.Text>{shift.startTime} - {shift.endTime}</Typography.Text>
                                    </Flex>
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: 'Please select the date of the schedule!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
                    </Form.Item>
                    <Form.Item
                        label="Notes"
                        name="note"
                        rules={[{ required: true, message: 'Please input the notes for the schedule!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <Input.TextArea placeholder="Enter Notes" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 24 }}>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateSchedule;
