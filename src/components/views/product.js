import { useContext, useState } from "react"
import { AppStateContext } from "../state"

import { ProductClassView } from './productClass';
import { ProductInstanceView} from './productInstance'

import { Checkbox, Descriptions, Divider, Space, Typography, List, Alert, Collapse, Badge } from "antd"
import _ from "lodash"



export const ProductTitle = ({ classData, instanceData }) => {
    const [pinned, setPinned] = useState(true);
    const title = classData?.title;
    const subtitle = classData?.manual?.Description?.Title ?? "";
    const updateState = classData?.manual?.update_state;
    const expiry = instanceData?.expiry_date;
    return <Space direction="vertical" style={{width: "100%"}}>
        {updateState ? <Badge.Ribbon text={updateState} color="orange"/> : <></>}
        <Badge.Ribbon style={{marginTop: "25px"}} text={`Safe until ${expiry}`} color="green" />
        <Typography.Title level={2}>{title}</Typography.Title>
        <Typography.Text>{subtitle}</Typography.Text>
    </Space>
}


export const ProductView = ({}) =>{
    const appState = useContext(AppStateContext);
    return <><ProductTitle classData={appState.productClass} user={appState.userData} instanceData={appState.product}/>
            <ProductInstanceView data={appState.product} />
            <ProductClassView data={appState.productClass} user={appState.userData} />
            </>
}

