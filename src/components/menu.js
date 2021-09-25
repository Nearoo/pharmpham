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
        const productId = url.searchParams.get("productId");
        const productClassId = url.searchParams.get("classId");
        
        appState.loadUserData();
        
        if (productId) {
            appState.loadProductInstance(productId);
            appState.setView("product");
        } else if (productClassId) {
            appState.loadProductClass(productClassId);
            appState.setView("product");
        } else {
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