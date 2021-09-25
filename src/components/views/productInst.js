import { Checkbox, Descriptions, Divider, Space, Typography } from "antd"
import { useContext, useState } from "react"
import ReactMarkdown from "react-markdown"
import { AppStateContext } from "../state"


const Header = ({title, subtitle}) => {
    const [pinned, setPinned] = useState(true);
    return <Space direction="horizontal" align="center">
        <Typography.Title level={2}>{title}</Typography.Title>
        <Typography.Title level={5}>{subtitle}</Typography.Title>
        <Checkbox checked={pinned} style={{ paddingLeft: "20px" }} onChange={e => setPinned(e.target.checked)}>Pin</Checkbox>
    </Space>
}

const List = ({elements=[], ordered}) => {
    const els = elements.map(e => <li>e</li>);
    return ordered ? <ol>{els}</ol> : <ul>{els}</ul>
}

const TitledSection = ({title, children}) => 
    children
        ?  <Divider title={title} orientation="left">
            {children}
            </Divider>
        : <></>;

const { Title } = Typography;

export const ProductInstanceView = ({title, manual}) => {
    const appState = useContext(AppStateContext);
    // Will be stored for every user at some point, only si m ulated so far
    return <>
        <Header title={title} subtitle={manual?.Description?.title} />

        <TitledSection title="Use Cases">
            <List elements={manual?.Description?.uses} ordered />
        </TitledSection>

        <TitledSection title="Administration">
            {Object.entries(manual?.Administration ?? {}).map(([key, val]) => 
                <><Title>{key}</Title>{val}</>)}
        </TitledSection>
        
        </>
}