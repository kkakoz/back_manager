<template>
  <div class=" h-12 w-full flex flex-row">
    <a-button type="primary" @click="addVideo">添加</a-button>
  </div>
  <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
    <template #footer>
      <div>
        <b>ant design vue</b>
        footer part
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <span v-for="{ type, text } in actions" :key="type">
            <component :is="type" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template>
        <template #extra>
          <img width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
        </template>
        <a-list-item-meta :description="item.description">
          <template #title>
            <a :href="item.href">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar :src="item.avatar" />
          </template>
        </a-list-item-meta>
        {{ item.content }}
      </a-list-item>
    </template>
  </a-list>
</template>
<script setup>
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import { getVideos } from '@/api/video';
import router from '../../../router';
const listData = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const pagination = {
  onChange: page => {
    console.log(page);
  },
  pageSize: 3,
};
const actions = [{
  type: 'StarOutlined',
  text: '156',
}, {
  type: 'LikeOutlined',
  text: '156',
}, {
  type: 'MessageOutlined',
  text: '2',
}];


getVideos().then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(err)
})

const addVideo = () => {
  router.push('/videos/add')
}

</script>