import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Row, Col, Typography, Statistic, Table, Button, Radio } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { Bar, Line, Pie } from '@ant-design/charts';
import ButtonGroup from 'antd/es/button/button-group';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Dashboard extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;
        return (
            <>
            <Row style={{ marginBottom: '16px', justifyContent: 'space-between' }} > 
            <Typography.Title level={2}>Dashboard</Typography.Title>
            <Radio.Group style={{alignContent: 'center'}} defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">Week</Radio.Button>
                <Radio.Button value="b">Month</Radio.Button>
                <Radio.Button value="c">Year</Radio.Button>
            </Radio.Group>
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
            <Col span={8}>
            <Card style={{ width: '100%' }}>
                <Statistic title="Active Users" value={112893} />
            </Card>
            </Col>
            <Col span={8}>
            <Card>
                <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
            </Card>
            </Col>
            <Col span={8}>
            <Card>
                <Statistic title="Active Users" value={112893} />
            </Card>
            </Col>
            </Row>
            <Row style={{marginBottom: 16}} gutter={[16, 16]}>
               
            <Col span={8}>
            <Card>
            <Pie 
                height={400}
                data={[
                { type: '分类一', value: 27 },
                { type: '分类二', value: 25 },
                { type: '分类三', value: 18 },
                { type: '分类四', value: 15 },
                { type: '分类五', value: 10 },
                { type: 'Other', value: 5 },
                ]}
                angleField='value'
                colorField='type'
                radius={0.8}
                label={{
                type: 'inner',
                offset: '-30%',
                content: function content(_ref) {
                var percent = _ref.percent;
                return ''.concat(percent * 100, '%');
                },
                style: {
                fontSize: 14,
                textAlign: 'center',
                },
                }}
                interactions={[{ type: 'element-active' }]}
            />
            </Card>
            </Col>
            <Col span={16}>
            <Card>
                <Bar
                height={400}
                data={[
                { item: 'Coffee Beans', value: 300 },
                { item: 'Milk', value: 200 },
                { item: 'Sugar', value: 150 },
                { item: 'Cups', value: 100 },
                { item: 'Lids', value: 80 },
                ]}
                xField='item'
                yField='value'
                label={{ position: 'middle', style: { fill: '#aaa' } }}
                seriesField='item'
                />
            </Card>
            </Col>
            </Row>
            
            <Row gutter={[16, 16]}>
            <Col span={16}>
            <Card>
                <Line
                height={400}
                data={[
                { year: '1991', value: 3 },
                { year: '1992', value: 4 },
                { year: '1993', value: 3.5 },
                { year: '1994', value: 5 },
                { year: '1995', value: 4.9 },
                { year: '1996', value: 6 },
                { year: '1997', value: 7 },
                { year: '1998', value: 9 },
                { year: '1999', value: 13 },
                ]}
                xField='year'
                yField='value'
                point={{ size: 5, shape: 'diamond' }}
                label={{ style: { fill: '#aaa' } }}
                />
            </Card>
            </Col>
            <Col span={8}>
            <Card title="Trending Items">
            <Table
                showHeader={false}
                columns={[
                {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                },
                {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                },
                ]}
                dataSource={[
                {
                key: '1',
                name: 'John Brown',
                price: 32,
                },
                {
                key: '2',
                name: 'Jim Green',
                price: 42,
                },
                {
                key: '3',
                name: 'Joe Black',
                price: 32,
                },
                ]}
                pagination={false}
            />
            </Card>
            </Col>
            </Row>
            </>
        );
    }
}

export default Dashboard;
