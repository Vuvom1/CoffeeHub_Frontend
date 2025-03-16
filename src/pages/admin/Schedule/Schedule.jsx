import React, { use, useEffect } from 'react';
import { Table, Typography, Col, Row, Image, Card, Flex, Button, Modal, Skeleton, App } from 'antd';
import { useState } from 'react';
import CreateSchedule from './CreateSchedule';
import ScheduleDetail from './ScheduleDetail';
import moment from 'moment';
import apiInstance from '../../../services/api';
import apiEndpoints from '../../../contants/ApiEndpoints';

const emptySchedule = {
    name: 'Empty',
}

const Schedule = () => {
    const {message} = App.useApp();
    const [selectedScheduleDetailId, setSelectedScheduleDetailId] = useState(null);

    const [currentWeek, setCurrentWeek] = useState(moment().startOf('week'));
    const [employeesWithSchedules, setEmployeesWithSchedules] = useState([]);

    const [daysOfWeek, setDaysOfWeek] = useState([]);

    useEffect(() => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push({
                day: currentWeek.clone().add(i, 'days').format('dddd'),
                date: currentWeek.clone().add(i, 'days').format('YYYY-MM-DD')
            });
        }
        setDaysOfWeek(days);
    }
        , [currentWeek]);

    const fetchEmployeesWithSchedules = async () => {
        try {
            const response = await apiInstance.get(apiEndpoints.admin.employee.getAllWithSchedules);
            setEmployeesWithSchedules(response.data.$values);
        } catch (error) {
            console.error('Failed to fetch employees with schedules: ', error);
        }
    };

    const handleCellClick = (schedule, employeeId, date) => {
        if (schedule) {
            setSelectedScheduleDetailId(schedule.id);
        }
        else {
            setSelectedEmployeeId(employeeId);
            setDefaultScheduleDate(date);
        }
    };

    const handleAddSchedule = () => {
        setDefaultScheduleDate(null);
    };

    const handleCancelEditSchedule = () => {
        setSelectedScheduleDetailId(null);
    };

    const handleCancelAddSchedule = () => {
        setDefaultScheduleDate(null);
    };

    const scheduleCellRenderer = (schedule) => {
        if (!schedule) {
            return scheduleCellRenderer(emptySchedule);
        }


        return <Flex vertical align='center' gap={8} 
            style={{
                borderRadius: 12,
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                cursor: 'pointer',
                borderColor: 'transparent',
                padding: 4,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderColor = '#1890ff';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'transparent';
            }}>
            {schedule.shift?.name}
            <br />
            {
                schedule.shift?.startTime && schedule.shift?.endTime &&
                <Typography.Text style={{ fontSize: 12 }} type="secondary">
                    {moment(schedule.shift?.startTime, 'HH:mm:ss').format('hh:mm A')} - {moment(schedule.shift?.endTime, 'HH:mm:ss').format('hh:mm A')}
                </Typography.Text>
            }

        </Flex>;
    }

    const columns = [
        {
            dataIndex: 'name',
            key: 'employee',
            render: (text, record) => <Flex vertical align='center' gap={8}>

                <Image src="https://i.pinimg.com/236x/e7/b0/3a/e7b03afb99ced026c0091c5c0909a402.jpg" height={50} width={50} />
                <Typography.Text strong>{record.name}</Typography.Text>
            </Flex>,
        },
        ...daysOfWeek.map(day => ({
            title: <Flex vertical align='center' gap={8}>
                <Typography.Text strong>{day.day}</Typography.Text>
                <Typography.Text>{day.date}</Typography.Text>
            </Flex>,
            dataIndex: 'schedules',
            key: day.date,
            render: (text, record) => {
               
                const schedule = record.schedules.$values.find(s => moment(s.date).format('YYYY-MM-DD') === day.date);
                console.log(schedule);
                return schedule ? scheduleCellRenderer(schedule) : <CreateSchedule employeeId={record.id} defaultDate={day.date} onSave={handleAddSchedule} />;
            },
            onCell: (record) => {
                const schedule = record.schedules.$values.find(s => moment(s.date).format('YYYY-MM-DD') === day.date);
                return {
                    onClick: () => handleCellClick(schedule, record.id, day.date),
                };
            },
        })),
    ];

    const handleNextWeek = () => {
        setCurrentWeek(currentWeek.clone().add(7, 'days'));
    }

    const handlePreviousWeek = () => {
        setCurrentWeek(currentWeek.clone().subtract(7, 'days'));
    }

    useEffect(() => {
        fetchEmployeesWithSchedules();
    }
        , []);

    if (daysOfWeek.length === 0) {
        return <Skeleton active />;
    }

    return (
        <>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Flex justify="space-between" align='center' width='100%'>
                    <Typography.Title level={2}>Employee Schedule</Typography.Title>
                    <Flex align='center'>
                        <Button onClick={handlePreviousWeek} type="outlined">Prevous</Button>
                            <Typography.Text strong>{currentWeek.format('DD/MM/YYYY')} - {currentWeek.clone().add(6, 'days').format('DD/MM/YYYY')}</Typography.Text>
                        <Button onClick={handleNextWeek} type="outlined">Next</Button>
                    </Flex>
                </Flex>

                <Table 
                    rowHoverable={false} 
                    columns={columns} 
                    dataSource={employeesWithSchedules} 
                    bordered 
                    scroll={{ y: 500 }} />
            </div>

            {/* <Modal
                title="Add Schedule"
                open={defaultScheduleDate}
                onOk={handleAddSchedule}
                onCancel={handleCancelAddSchedule}
                footer={null}

            >
                <CreateSchedule employeeId={selectedEmployeeId} defaultDate={defaultScheduleDate} onSave={handleAddSchedule}  />
            </Modal> */}
            <Modal
                title="Schedule Detail"
                open={selectedScheduleDetailId}
                onCancel={handleCancelEditSchedule}
            >
                <ScheduleDetail scheduleId={selectedScheduleDetailId} />
            </Modal>
        </>
    );
};

export default Schedule;