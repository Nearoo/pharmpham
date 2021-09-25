import { useState, useContext, useCallback, useEffect } from 'react';
import { Button, Menu } from 'antd';
import { AppStateContext } from './state';

export const MainMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [selectedKey, setSelectedKey] = useState('1');
    const appState = useContext(AppStateContext);
    const items = [
        {
            viewTarget: "profile",
            title: "Profile"
        }
    ]

    const setView = useCallback(key => {
        const view = items[+key].viewTarget;
        appState.setView(view);
        setSelectedKey(String(key));
        setCollapsed(true);

        if(view === "profile"){
            appState.loadUserData();
        }
    })

    const loadViewfromUrl = useCallback(() => {
        const url = new URL(window.location.href);
        const id = url.searchParams.get("productId");
        if (id) {
            appState.loadProduct(id);
            appState.setView("product");
        } else {
            appState.loadUserData();
            appState.setView("profile");
        }
    })
    // Load file from URL if available, else load profile
    useEffect(() => {
        loadViewfromUrl();
        window.addEventListener('popstate', () => loadViewfromUrl());
    }, [])

    return <>
    <Button onClick={() => setCollapsed(!collapsed)}>Menu</Button>
        {collapsed ? <></> :
            <Menu
                defaultSelectedKeys={[selectedKey]}
                mode="inline"
            >
            {items.map((item, i) => <Menu.Item key={i} onClick={() => setView(i)}>{item.title}</Menu.Item>)}
            </Menu>
        }
    </>
}