import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Row, Col, Typography, Statistic, Table, Button, Radio, Skeleton, Image } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { Bar, Line, Pie } from '@ant-design/charts';
import ButtonGroup from 'antd/es/button/button-group';
import { useEffect } from 'react';
import { useState } from 'react';
import apiInstance from '../../../services/api';
import apiEndpoints from '../../../contants/ApiEndpoints';
import moment from 'moment-timezone';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
    const now = moment().tz('Asia/Bangkok').endOf('day').add(7, 'hours');
    const startOfDay = moment().tz('Asia/Bangkok').startOf('day');
    const startOfMonth = moment().tz('Asia/Bangkok').startOf('month');
    const startOfYear = moment().tz('Asia/Bangkok').startOf('year');
    const startOfTwelveMonthsAgo = moment().tz('Asia/Bangkok').subtract(12, 'months').startOf('month');
    const startOfTenYearsAgo = moment().tz('Asia/Bangkok').subtract(10, 'years').startOf('year');

    const [finacialStatistics, setFinancialStatistics] = useState([]);
    const [scheduleStatistics, setScheduleStatistics] = useState([]);
    const [stockStatistics, setStockStatistics] = useState({});
    const [periodlyStatistics, setPeriodlyStatistics] = useState([]);
    const [popularItems, setPopularItems] = useState([]);
    const [leastPopularItems, setLeastPopularItems] = useState([]);

    const [period, setPeriod] = useState('daily');

    const [startDate, setStartDate] = useState(startOfDay.toISOString());
    const [endDate, setEndDate] = useState(now.toISOString());
    

    

    const fetchFinancialStatistics = async () => {
        console.log(startDate, endDate);
        await apiInstance.get(apiEndpoints.admin.statistic.finance(startDate, endDate)).then((response) => {
            setFinancialStatistics(response.data);
            console.log(response.data);
        });
    }

    const fetchSheduleStatistics = async () => {
        await apiInstance.get(apiEndpoints.admin.statistic.schedule(startDate, endDate)).then((response) => {
            setScheduleStatistics(response.data.$values);
            console.log(response.data.$values);
        });
    }

    const fetchStockStatistics = async () => {
        await apiInstance.get(apiEndpoints.admin.statistic.stock(5)).then((response) => {
            setStockStatistics(response.data);
        });
    }

    const fetchPeriodlyStatistics = async () => {
        switch (period) {
            case 'daily':
                await apiInstance.get(apiEndpoints.admin.statistic.dailyFinancial(startOfMonth.toISOString(), endDate)).then((response) => {
                    setPeriodlyStatistics(response.data.$values);
                });
                break;
            case 'monthly':
                await apiInstance.get(apiEndpoints.admin.statistic.monthlyFinancial(startOfTwelveMonthsAgo.toISOString(), endDate)).then((response) => {
                    setPeriodlyStatistics(response.data.$values);
                }
                );
                break;
            case 'yearly':
                await apiInstance.get(apiEndpoints.admin.statistic.yearlyFinancial(startOfTenYearsAgo.toISOString(), endDate)).then((response) => {
                    setPeriodlyStatistics(response.data.$values);
                });
                break;
        }
    }

    const fetchPopularItems = async () => {
        await apiInstance.get(apiEndpoints.admin.statistic.popularMenuItems(startDate, endDate, 5)).then((response) => {
            setPopularItems(response.data);
        });
    }

    const fetchLeastPopularItems = async () => {
        await apiInstance.get(apiEndpoints.admin.statistic.leastPopularMenuItems(startDate, endDate, 5)).then((response) => {
            setLeastPopularItems(response.data);
        });
    }

    const handleSelectPeriod = (value) => {
        setPeriod(value);
        
        switch (value) {
            case 'daily':
                setStartDate(startOfDay.toISOString());
                setEndDate(now.toISOString());
                break;
            case 'monthly':
                setStartDate(startOfMonth.toISOString());
                setEndDate(now.toISOString());
                break;
            case 'yearly':
                setStartDate(startOfYear.toISOString());
                setEndDate(now.toISOString());
                break;
            default:
                break;
            
                fetchFinancialStatistics();
                fetchSheduleStatistics();
                fetchStockStatistics();
                fetchPeriodlyStatistics();
                fetchPopularItems();
                fetchLeastPopularItems();
        }
    }

    useEffect(() => {
        handleSelectPeriod('daily');
    }, []);

    useEffect(() => {
        fetchFinancialStatistics();
        fetchSheduleStatistics();
        fetchStockStatistics();
        fetchPeriodlyStatistics();
        fetchPopularItems();
        fetchLeastPopularItems();
    }
        , []);
    useState(() => {
        fetchPeriodlyStatistics();
    }, [period]);

    if (finacialStatistics.length == 0 && scheduleStatistics.length == 0 && stockStatistics == {} && periodlyStatistics.length == 0) {
        return (
            <Skeleton active />
        );
    }

    return (
        <>
            <Row style={{ marginBottom: '16px', justifyContent: 'space-between' }} >
                <Typography.Title level={2}>Dashboard</Typography.Title>
                <Radio.Group style={{ alignContent: 'center' }} defaultValue="daily" buttonStyle="solid" onChange={(e) => handleSelectPeriod(e.target.value)}>
                    <Radio.Button value="daily">Day</Radio.Button>
                    <Radio.Button value="monthly">Month</Radio.Button>
                    <Radio.Button value="yearly">Year</Radio.Button>
                </Radio.Group>
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
                <>
                    <Col span={8}>
                        <Card>
                            <Statistic title="Total Revenue" value={finacialStatistics.totalRevenue} precision={2} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic title="Total Cost" value={finacialStatistics.totalStockCost} precision={2} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic title="Total Profit" value={finacialStatistics.totalProfit} precision={2} />
                        </Card>
                    </Col>
                </>
            </Row>
            <Row style={{ marginBottom: 16 }} gutter={[16, 16]}>
                <Col span={8}>
                    <Card title="Shift Distribution">
                        <Pie
                            height={400}
                            innerRadius={0.5}
                            data={scheduleStatistics?.map((item) => ({ name: item.shift.name, totalTime: item.totalTime }))}
                            angleField='totalTime'
                            colorField='name'
                            radius={0.8}
                            label={{ type: 'inner', offset: '-30%', style: { textAlign: 'center' }, content: '' }}
                        />
                    </Card>
                </Col>
                <Col span={16}>
                    <Card title="Lowest Stock Ingredients">
                        <Bar
                            height={400}
                            data={stockStatistics?.ingredientsWithLowStock?.$values.map((item) => ({ item: item.name, value: item.totalQuantity }))}
                            xField='item'
                            yField='value'
                            seriesField='item'
                            colorField='item'
                            label={null}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <Card title="Financial Statistics">
                        <Line
                            height={400}
                            data={periodlyStatistics?.map((item) => ({ key: item.key, value: item.value }))}
                            xField='key'
                            yField='value'
                            point={{ size: 5, shape: 'diamond' }}
                            label={{ style: { fill: '#aaa' }, content: '' }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Trending Items">
                        <Table
                            showHeader={false}
                            columns={[
                                {
                                    dataIndex: 'imageUrl',
                                    key: 'imageUrl',
                                    render: (text) => (
                                        <Image src={text
                                        } style={{ width: 50, height: 50 }} />
                                    )
                                },
                                {
                                    title: 'Name',
                                    dataIndex: 'name',
                                    key: 'name',
                                },
                                
                            ]}
                            dataSource={popularItems}
                            pagination={false}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;
