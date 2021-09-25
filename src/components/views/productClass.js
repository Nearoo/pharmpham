import { Checkbox, Descriptions, Divider, Space, Typography, List, Alert, Collapse } from "antd"
import _ from "lodash"
import React, { useContext, useState } from "react"
import ReactMarkdown from "react-markdown"
import { AppStateContext } from "../state"


export const SimpleList = ({ elements = [], ordered }) => {
    const els = elements.map(e => <li>{e}</li>);
    return ordered ? <ol>{els}</ol> : <ul>{els}</ul>
}

const KeyVal = ({elements={}, highlightKeys=[]}) => {
    
    return <Collapse>
        {Object.entries(elements).map(element =>
            <Collapse.Panel style={{ backgroundColor: highlightKeys.includes(element[0]) ? "#ffa29c" : ""}} header={element[0]}>
                {highlightKeys.includes(element[0]) ? <Alert message={<ReactMarkdown>{element[1]}</ReactMarkdown>} type="error" /> : <ReactMarkdown>{element[1]}</ReactMarkdown>}
                
                </Collapse.Panel>)}
    </Collapse>
}

const TitledSection = ({ title, children, render=["lol"]}) =>
    !_.isEmpty(render)
        ? <><Divider orientation="left">{title}</Divider>
            {children}</>
        : <></>;
    

const { Title } = Typography;

export const ProductClassView = ({data, user}) => {

    const appState = useContext(AppStateContext);

    const uses = Object.values(data?.manual?.Description?.uses ?? {});
    const adminis = data?.manual?.Administration ?? {};

    const precaus = data?.manual?.Precautions ?? {};
    const precausHighs = Object.values(user?.precautions ?? {});
    return <>
        <TitledSection title="Use Cases" render={uses}>
            <SimpleList elements={uses} ordered />
        </TitledSection>

        <TitledSection title="Administration" render={adminis}>
            <KeyVal elements={adminis} />
        </TitledSection>

        <TitledSection title="Precautions" render={precaus} >
            <KeyVal elements={precaus} highlightKeys={precausHighs}/>
        </TitledSection>

        <TitledSection title="Further Infos" render={precaus} >
            <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header="Leaflet" key='1'><ReactMarkdown>{String(appState.defaultMarkdown) ?? "_loading..._"}</ReactMarkdown></Collapse.Panel>
            </Collapse>
        </TitledSection>
        
    </>
}