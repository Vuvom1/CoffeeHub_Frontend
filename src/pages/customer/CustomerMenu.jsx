import React, { useState, useEffect } from 'react';
import { Col, Layout, Menu, Row, Typography, Image, Button, Select, Flex, Divider, Slider, Checkbox } from 'antd';
import apiInstance from '../../services/api';
import apiEndpoints from '../../contants/ApiEndpoints';
import { CoffeeOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import { useNavigate } from 'react-router-dom';
import endpoints from '../../contants/Endpoint';
import ProductCard from '../../components/ProductCard';
import Search from 'antd/es/transfer/search';

const CustomerMenu = () => {

    const [categoriesWithItems, setCategoriesWithItems] = useState([]);

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const navigate = useNavigate()

    const [minFilteredPrice, setMinFilteredPrice] = useState(0);
    const [maxFilteredPrice, setMaxFilteredPrice] = useState(200000);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [sorting, setSorting] = useState('default');
    const [searchValue, setSearchValue] = useState('');

    const fetchCategoriesWithItems = async () => {
        await apiInstance.get(apiEndpoints.customer.categories.getAllWithItems).then(response => {
            setCategoriesWithItems(response.data);
        }
        ).catch(error => {
            console.log(error);
        });
    }

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    }

    const handleNavigateDetail = (id) => {
        navigate(endpoints.customer.menuItemDetail(id))
    }

    const handleCheckboxChange = (checkedValues) => {
        setFilteredCategories(checkedValues);
    }

    const handleChangeRange = (rangeValues) => {
        setMinFilteredPrice(rangeValues[0]);
        setMaxFilteredPrice(rangeValues[1]);
    }

    useEffect(() => {
        if (filteredCategories.length === 0 || filteredCategories.includes('all')) {
            let allItems = [];
            categoriesWithItems.forEach(category => {
                allItems = allItems.concat(category.menuItems.$values);
            });
            allItems = allItems.filter(item => item.price >= minFilteredPrice && item.price <= maxFilteredPrice);
            setFilteredItems(allItems);
            return;
        }
        let items = [];

        categoriesWithItems.forEach(category => {
            if (filteredCategories.includes(category.id)) {
                items = items.concat(category.menuItems.$values);
            }
        });
        items = items.filter(item => item.price >= minFilteredPrice && item.price <= maxFilteredPrice);
        setFilteredItems(items);
    }, [filteredCategories, minFilteredPrice, maxFilteredPrice, categoriesWithItems]);

    useEffect(() => {
        fetchCategoriesWithItems();
    }
        , []);

    const handleSearch = (value) => {
        setSearchValue(value);        
    };

    useEffect(() => {
        let items = filteredItems.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredItems(items);
    }, [searchValue]);

    const handleSelectSorting = (value) => {
        setSorting(value);

        if (value === 'default') {
            return;
        }

        let items = filteredItems;
        if (value === 'name') {
            items.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        } else if (value === 'asc') {
            items.sort((a, b) => a.price - b.price);
        } else if (value === 'desc') {
            items.sort((a, b) => b.price - a.price);
        }
        setFilteredItems(items);
    };

    return (
        <>
            <Row >
                <Col span={24} style={{ marginBottom: 24, position: 'relative' }}>
                    <Image
                        style={{ filter: 'brightness(60%)' }}
                        preview={false}
                        src="https://firebasestorage.googleapis.com/v0/b/martialartconnect.appspot.com/o/banners%2Ffreepik__adjust__10697.png?alt=media&token=6a695eb8-a250-44b2-b7f2-80ac24cb1f45"
                        width={'100%'}
                        height={300} />
                    <Typography style={{ position: 'absolute', transform: 'translate(-50%, -50%)', top: '35%', left: '50%', color: 'white', fontSize: 48, fontWeight: 700 }}>Menu</Typography>
                </Col>
                <Col offset={1} xs={0} md={0} lg={5}>
                    <Row style={{ textAlign: 'start' }}>
                        <Col span={24}>
                            <Search placeholder="Search menu" onSearch={handleSearch} />
                            <Typography style={{ fontSize: 24, fontWeight: 500, marginBottom: 16 }}>Categories</Typography>
                            <Divider />
                            <Checkbox.Group style={{ width: '100%' }} onChange={(checkedValues) => handleCheckboxChange(checkedValues)}>
                                <Row>
                                    <Col span={24}>
                                        <Checkbox value="all">All</Checkbox>
                                    </Col>
                                    {
                                        categoriesWithItems.map((category, index) => (
                                            <Col span={24}>
                                                <Checkbox key={index} value={category.id}>{category.name}</Checkbox>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Checkbox.Group>
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'start', marginTop: 20 }}>
                        <Col span={24}>
                            <Typography style={{ fontSize: 24, fontWeight: 500, marginBottom: 16, marginTop: 20 }}>Filter by price</Typography>
                            <Divider />
                            <Slider max={200000} onChange={(rangeValues) => handleChangeRange(rangeValues)} value={[minFilteredPrice, maxFilteredPrice]} range defaultValue={[0, 200000]} />
                            <Typography style={{ marginTop: 20, textAlign: 'center' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(minFilteredPrice)} - {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(maxFilteredPrice)}</Typography>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} lg={17} offset={1} style={{marginLeft: 20}}>
                    <Row style={{ textAlign: 'start', marginTop: 20 }}>
                        <Col span={24}>
                            <Flex gap={10} justify='space-between'>
                            <Typography style={{  marginBottom: 16 }}>Showing all {filteredItems.length} items</Typography>
                            <Select defaultValue="default" style={{ width: 120 }} onChange={handleSelectSorting}>
                                <Select.Option value="default">Default</Select.Option>
                                <Select.Option value="name">Name</Select.Option>
                                <Select.Option value="asc">Ascending Price</Select.Option>
                                <Select.Option value="desc">Descending Price</Select.Option>
                            </Select>
                            </Flex>
                            <Divider />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ paddingLeft: 20, paddingRight: 20 }}>
                        {
                            filteredItems.length > 0 ? (
                                filteredItems.map((item, index) => (
                                    <Col key={index} xs={12} sm={12} md={8} lg={8} xl={8}>
                                        <ProductCard key={index} item={item} />
                                    </Col>
                                ))
                            ) : (
                                <Col span={24}>
                                    <Typography.Title level={5}>No items found</Typography.Title>
                                </Col>
                            )
                        }
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default CustomerMenu;