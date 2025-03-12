import React from 'react';
import { Table, Typography, Col, Row, Image, Card, Flex, Button, Modal } from 'antd';
import { useState } from 'react';
import CreateSchedule from './CreateSchedule';

const Schedule = () => {
    const [isModalAddScheduleVisible, setIsModalAddScheduleVisible] = useState(false);
    const [isScheduleDetailVisible, setIsScheduleDetailVisible] = useState(false);

    const handleCellClick = (record, rowIndex, columnKey) => {
        if (record[columnKey].shiftName === 'Empty') {
            setIsModalAddScheduleVisible(true);
        } else {
            setIsScheduleDetailVisible(true);
        }
       
    };

    const handleAddSchedule = () => {
        setIsModalAddScheduleVisible(false);
    };

    const handleCancelAddSchedule = () => {
        setIsModalAddScheduleVisible(false);
    };



    const scheduleCellRenderer = (text) => {

        return <Card
            style={{
                borderRadius: 12,
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                cursor: 'pointer',
                borderColor: 'transparent',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderColor = '#1890ff'; 
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'transparent'; 
            }}>
            {text.shiftName}
            <br />
            <Typography.Text style={{ fontSize: 12 }} type="secondary">{text.startTime} - {text.endTime}</Typography.Text>
        </Card>;
    }

    const columns = [
        {
            dataIndex: 'employee',
            key: 'employee',
            render: (text) => <Flex vertical align='center' gap={8}>
            
                    <Image src="https://i.pinimg.com/236x/e7/b0/3a/e7b03afb99ced026c0091c5c0909a402.jpg" height={50} width={50} />
                    <Typography.Text strong>{text.Name}</Typography.Text>
            </Flex>,
            onCell: (record, rowIndex) => ({
                onClick: () => handleCellClick(record, rowIndex, 'employee'),
            }),
        },
        {
            title: 'Monday',
            dataIndex: 'monday',
            key: 'monday',
            onCell: (record, rowIndex) => ({
                onClick: () => handleCellClick(record, rowIndex, 'monday'),
                
            }),
            render: (text) => scheduleCellRenderer(text),
        },
        {
            title: 'Tuesday',
            dataIndex: 'tuesday',
            key: 'tuesday',
            onCell: (record, rowIndex) => ({
                onClick: () => handleCellClick(record, rowIndex, 'tuesday'),
            }),
            render: (text) => scheduleCellRenderer(text),

        },
        {
            title: 'Wednesday',
            dataIndex: 'wednesday',
            key: 'wednesday',
            onCell: (record, rowIndex) => ({
                onClick: () => handleCellClick(record, rowIndex, 'wednesday'),
            }),
            render: (text) => scheduleCellRenderer(text),

        },
        {
            title: 'Thursday',
            dataIndex: 'thursday',
            key: 'thursday',
            onCell: (record, rowIndex) => ({
                onClick: () => handleCellClick(record, rowIndex, 'thursday'),
            }),
            render: (text) => scheduleCellRenderer(text),
        },
        {
            title: 'Friday',
            dataIndex: 'friday',
            key: 'friday',
            onCell: (record, rowIndex) => ({
                onClick: () => handleCellClick(record, rowIndex, 'friday'),
            }),
            render: (text) => scheduleCellRenderer(text),
        },
        {
            title: 'Saturday',
            dataIndex: 'saturday',
            key: 'saturday',
            onCell: (record, rowIndex) => ({
                onClick: () => handleCellClick(record, rowIndex, 'saturday'),
            }),
            render: (text) => scheduleCellRenderer(text),
        },
        {
            title: 'Sunday',
            dataIndex: 'sunday',
            key: 'sunday',
            onCell: (record, rowIndex) => ({
                onClick: () => handleCellClick(record, rowIndex, 'sunday'),
            }),
            render: (text) => scheduleCellRenderer(text),
        },
    ];

    const data = [
        {
            key: '1',
            employee: {
                Name: 'John Doe',
            },
            sunday: { shiftName: 'Empty', startTime: '', endTime: '' },
            monday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            tuesday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            wednesday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            thursday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            friday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            saturday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
        },
        {
            key: '2',
            employee: {
                Name: 'Jane Smith',
            },
            sunday: { shiftName: 'Empty', startTime: '', endTime: '' },
            monday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            tuesday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            wednesday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            thursday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            friday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            saturday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
        },
        {
            key: '3',
            employee: {
                Name: 'Alice Johnson',
            },
            sunday: { shiftName: 'Empty', startTime: '', endTime: '' },
            monday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            tuesday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            wednesday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            thursday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            friday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            saturday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
        },
         {
            key: '3',
            employee: {
                Name: 'Alice Johnson',
            },
            sunday: { shiftName: 'Empty', startTime: '', endTime: '' },
            monday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            tuesday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            wednesday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            thursday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            friday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
            saturday: { shiftName: 'Morning Shift', startTime: '8:00 AM', endTime: '5:00 PM' },
        },
    ];

    return (
        <>
       
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Flex justify="space-between" align='center' width='100%'>
                <Typography.Title level={2}>Employee Schedule</Typography.Title>
                <Flex align='center'>
                    <Button type="outlined">Prevous</Button>
                    <Typography.Text strong>Week 1</Typography.Text>
                    <Button type="outlined">Next</Button>
                </Flex>
            </Flex>

            <Table rowHoverable={false} columns={columns} dataSource={data} bordered scroll={{y: 500}} />
        </div>

        <Modal
            title="Add Schedule"
            open={isModalAddScheduleVisible}
            onOk={handleAddSchedule}
            onCancel={handleCancelAddSchedule}
            
            >
                <CreateSchedule />
            </Modal>
        </>
    );
};

export default Schedule;