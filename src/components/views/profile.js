import { Avatar, Divider, Image, List, Space, Typography } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { useContext } from "react";
import { AppStateContext } from "../state";


const { Text } = Typography;

const ProductList = ({products}) => {
    const appState = useContext(AppStateContext);
    return <List
        dataSource={products}
        bordered
        renderItem={item => {
            return <List.Item>
                <List.Item.Meta title={item.title} description={item.description} onClick={() => {
                    appState.setView("product");
                    appState.loadManual(item.productId);
                    appState.loadProduct(item.productId);
                    }} />
                <Text italic>Up to Date</Text>
            </List.Item>
        }} />
}


export const  ProfileView = ({imagePath="/profile.png"}) => {
    const dataSource = [{
        title: "Betadine",
        productId: "20003892839"
    }];
    return <>
        <Space direction="vertical" style={{width: "100%"}}>
        <Avatar size={128} icon={<UserOutlined />} src={imagePath ? <Image src={imagePath} /> : null}/><br />
        <Divider plain={false} dashed/>

            <Text>Max Mustermann</Text>
            <Text>17.08.1992</Text>
        
        <Divider />
        <Typography.Title level={4} italic>Pinned</Typography.Title>
        <ProductList products={dataSource} />
        </Space>
        
    </>
}