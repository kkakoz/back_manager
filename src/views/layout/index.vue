<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="menuClick">
                <a-menu-item key="/user">
                    <pie-chart-outlined />
                    <span>用户管理</span>
                </a-menu-item>
                <a-menu-item key="/resource">
                    <pie-chart-outlined />
                    <span>稿件管理</span>
                </a-menu-item>
                <a-menu-item key="/video">
                    <pie-chart-outlined />
                    <span>视频管理</span>
                </a-menu-item>
                <a-menu-item key="/comments">
                    <pie-chart-outlined />
                    <span>评论管理</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0" >
                
            </a-layout-header>
            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 16px 0">
                    <!-- <a-breadcrumb-item>User</a-breadcrumb-item>
                    <a-breadcrumb-item>Bill</a-breadcrumb-item> -->
                </a-breadcrumb>

                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                    <router-view/>
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script setup>
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
import router from '@/router';

let collapsed = ref(false)
let selectedKeys = ref(['1'])

const menuClick = (data) => {
    console.log(data)
    router.push(data.key)
}

</script>
<style>
#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}
</style>