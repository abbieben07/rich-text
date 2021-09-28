import * as React from 'react';
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from 'react-nativescript-navigation';
import { MainStackParamList } from './NavigationParamList';

import { demos } from '../../../demo-snippets/react/install';
interface MenuProps {
    route: RouteProp<MainStackParamList, 'menu'>;
    navigation: FrameNavigationProp<MainStackParamList, 'menu'>;
}

declare const demoRedirect: string;

export function Menu({ navigation }: MenuProps) {
    function goToDemo(component) {
        navigation.navigate(component);
    }

    if (demoRedirect) {
        const Demo = demos.find(({ path }) => path === demoRedirect);
        if (Demo) {
            setTimeout(() => {
                // @ts-ignore
                navigation.navigate(Demo.path);
            }, 0);
        }
    }

    return (
        <scrollView>
            <stackLayout>
                {demos.map((demo) => (
                    <button
                        key={demo.name}
                        onTap={() => {
                            goToDemo(demo.path);
                        }}
                    >
                        {demo.name}
                    </button>
                ))}
            </stackLayout>
        </scrollView>
    );
}
