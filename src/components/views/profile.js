import { Avatar, Divider, Image, List, Row, Space, Typography, Col } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { useContext } from "react";
import { AppStateContext } from "../state";


const { Text } = Typography;

const ProductList = ({}) => {
    const appState = useContext(AppStateContext);
    console.log(appState.pinned);
    return <List
        dataSource={appState.pinned}
        bordered
        renderItem={item => {
            return <List.Item>
                <List.Item.Meta title={item.title} description={item.description} onClick={() => {
                    appState.setView("product");
                    appState.loadProduct(item.class);
                    window.history.pushState({}, "Product", `/?productId=${item.class}`)
                    }} />
                <Text italic>Up to Date</Text>
            </List.Item>
        }} />
}


export const  ProfileView = ({imagePath="/profile.png"}) => {
    const appState = useContext(AppStateContext);
    return <>
        <Space direction="vertical" style={{width: "100%"}}>
            <Row>
                <Col>
                    <Avatar size={64} icon={<UserOutlined />} src={imagePath ? <Image src={imagePath} /> : null} /><br />
                </Col>
                <Col style={{paddingLeft: "20px"}}>
                <Space direction="vertical">
                    <Text>{appState.firstname} {appState.lastname}</Text>
                    <Text>{appState.birthday}</Text>
                </Space>
                </Col>
            </Row>
        
        <Divider orientation="left">Pinned</Divider>
        <ProductList />
        <Divider orientation="left">Recents</Divider>
        </Space>
        
    </>
}