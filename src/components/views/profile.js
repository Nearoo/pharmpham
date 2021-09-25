import { Avatar, Divider, Image, List, Row, Space, Typography, Col } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { useContext, useEffect } from "react";
import { AppStateContext } from "../state";
import { SimpleList } from "./productClass";


const { Text } = Typography;

const ProductList = ({}) => {
    const appState = useContext(AppStateContext);
    return <List
        dataSource={appState?.userData?.pinned}
        bordered
        renderItem={item => {
            return <List.Item>
                <List.Item.Meta title={item.title} description={item.description} onClick={() => {
                    appState.setView("product");
                    appState.loadProductInstance(item.instance);
                    window.history.pushState({}, "Product", `/?productId=${item.instance}`)
                    }} />
                <Text type="warning" >{item?.update_state}</Text>
            </List.Item>
        }} />
}


export const ProfileView = ({ imagePath ="https://i.imgur.com/JiOArmf.png"}) => {
    const appState = useContext(AppStateContext);
    const userData = appState.userData ?? {};
    console.log(userData);
    return <>
        <Space direction="vertical" style={{width: "100%"}}>
            <Row>
                <Col>
                    <Avatar size={64} icon={<UserOutlined />} src={imagePath ? <Image src={imagePath} /> : null} /><br />
                </Col>
                <Col style={{paddingLeft: "20px"}}>
                <Space direction="vertical">
                    <Text>{userData.firstname} {userData.lastname}</Text>
                    <Text>{userData.birthday}</Text>
                </Space>
                </Col>
            </Row>
        
        <Divider orientation="left"></Divider>

        <ProductList />
        
        </Space>
        
    </>
}
