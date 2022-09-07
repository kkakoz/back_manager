
<template>

  <div class=" h-12 w-full flex flex-row">
    <a-button type="primary" @click="toAddVideo">添加视频</a-button>
  </div>

  <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="videos">
    <template #footer>
      <div>

      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item key="item.name">
        <template #actions>
          <span v-for="{ type, text } in actions" :key="type">
            <component :is="type" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template>
        <template #extra>
          <img width="272" alt="logo" :src="item.cover" />
        </template>
        <a-list-item-meta :description="item.user_name">
          <template #title>
            <a :href="item.href">{{ item.name }}</a>
          </template>
          <template #avatar>
            <a-avatar :src="item.user_avatar" />
          </template>
        </a-list-item-meta>
        {{ item.brief }}
      </a-list-item>
    </template>
  </a-list>
</template>
<script setup>
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { getVideos } from '@/api/video';
import router from '@/router';
import { reactive, ref } from 'vue';


const toAddVideo = () => {
  router.push('/video/add')
}

const videos = ref([])
const size = ref(0)
const videoPage = ref(1)

const pagination = {
  onChange: page => {
    videos.value = []
    videoPage.value = page
    getVideos({ page: videoPage.value, pageSize: 10 }).then((res) => {
      console.log("data = ", res)
      res.data.forEach(element => {
        videos.value.push(element)
      });
      pagination.total = res.count
    }).catch((e) => {
      console.log(e)
    })
    console.log(videos)
  },
  pageSize: 10,
  total: 0,
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

getVideos({ page: 1, pageSize: 10 }).then((res) => {
  console.log("data = ", res)
  res.data.forEach(element => {
    videos.value.push(element)
  });
  pagination.total = res.count
}).catch((e) => {
  console.log(e)
})


</script>