import Vue from 'nativescript-vue';
import { installRichText } from '@abbieben/rich-text';

import Demo1 from './Demo1.vue';
import Demo2 from './Demo2.vue';
import Development from './Development.vue';

export function install() {
    installRichText()
}

export const demos = [
    { name: 'Demo 1', path: "demo1", component: Demo1 },
    { name: 'Demo 2', path: "demo2", component: Demo2 },
    { name: 'Development', path: "development", component: Development }
];