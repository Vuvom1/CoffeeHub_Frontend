import React from 'react';
import { Form, Input, Select, DatePicker, Button, Skeleton, Typography, Flex, App } from 'antd';
import { useState, useEffect } from 'react';
import apiInstance from '../../../services/api';
import apiEndpoints from '../../../contants/ApiEndpoints';
import moment from 'moment';

const { Option } = Select;

const SelectedScheduleDetail = ({ scheduleId, onSave }) => {

    const { message } = App.useApp();   

    const [shifts, setShifts] = useState([]);
    const [employee, setEmployee] = useState({});
    const [schedule, setSchedule] = useState(null);

    const fetchShifts = async () => {
        try {
            const response = await apiInstance.get(apiEndpoints.admin.shift.getAll);
            setShifts(response.data.$values);
        } catch (error) {
            console.error('Failed to fetch shifts: ', error);
        }
    }

    const fetchScheduleById = async () => {
        try {
            const response = await apiInstance.get(apiEndpoints.admin.schedule.getById(scheduleId));
            setSchedule(response.data);
            fetchEmployeeById(response.data.employeeId);
        } catch (error) {
            console.error('Failed to fetch schedule by id: ', error);
        }
    }

    const fetchEmployeeById = async (employeeId) => {
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

        await apiInstance.put(apiEndpoints.admin.schedule.update(scheduleId), formattedValues).then((response) => {
            message.success('Schedule updated successfully!');
            onSave();
        }).catch((error) => {
            message.error(error.response.data);
            console.error('Failed to update schedule: ', error);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        fetchShifts();
        fetchScheduleById();
    }, [scheduleId]);

    if (!schedule || !employee || !shifts) {
        return <Skeleton active />;
    }

    return (
        <Form
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 24 }}
            name="selectedScheduleDetail"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
                id: schedule.id,
                employeeId: schedule.employeeId,
                shiftId: schedule.shiftId,
                date: schedule.date ? moment(schedule.date) : null,
                note: schedule.note
            }}
        >
            <Form.Item
                label="Schedule ID"
                name="id"
                style={{ marginBottom: 16 }}
                hidden
            />

            <Form.Item
                label="Employee Name"
                name="employeeId"
                rules={[{ required: true, message: 'Please select the employee!' }]}
                style={{ marginBottom: 16 }}
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
    );
};

export default SelectedScheduleDetail;
