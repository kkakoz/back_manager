<template>

  <div class=" h-12 w-full flex flex-row">
    <a-button type="primary" @click="toAddVideo">添加视频</a-button>
  </div>
  <!--    :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"-->
  <a-table
    :columns="columns"
    :data-source="videos"

  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'name'">{{ record.name }}</template>
      <template v-if="column.dataIndex === 'cover'">
        <a-image
          :width="100"
          :src="record.cover"
        />
      </template>
      <template v-if="column.dataIndex === 'category'">{{ record.category.name }}</template>
      <template v-if="column.dataIndex === 'createdAt'">{{ dateFormat(record.createdAt) }}</template>
      <template v-if="column.dataIndex === 'duration'">{{ record.duration }}</template>
      <template v-if="column.dataIndex === 'action'">
        <a-button danger>删除</a-button>
        <a-button>审核通过</a-button>
        <a-button>不通过</a-button>
      </template>

    </template>
  </a-table>
  <!--  <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="videos">-->
  <!--    <template #footer>-->
  <!--      <div>-->

  <!--      </div>-->
  <!--    </template>-->
  <!--    <template #renderItem="{ item }">-->
  <!--&lt;!&ndash;      <a-list-item key="item.name">&ndash;&gt;-->
  <!--&lt;!&ndash;        <template #actions>&ndash;&gt;-->
  <!--&lt;!&ndash;          <span v-for="{ type, text } in actions" :key="type">&ndash;&gt;-->
  <!--&lt;!&ndash;            <component :is="type" style="margin-right: 8px" />&ndash;&gt;-->
  <!--&lt;!&ndash;            {{ text }}&ndash;&gt;-->
  <!--&lt;!&ndash;          </span>&ndash;&gt;-->
  <!--&lt;!&ndash;        </template>&ndash;&gt;-->
  <!--&lt;!&ndash;        <template #extra>&ndash;&gt;-->
  <!--&lt;!&ndash;          <img width="272" alt="logo" :src="item.cover" />&ndash;&gt;-->
  <!--&lt;!&ndash;        </template>&ndash;&gt;-->
  <!--&lt;!&ndash;        <a-list-item-meta :description="item.user_name">&ndash;&gt;-->
  <!--&lt;!&ndash;          <template #title>&ndash;&gt;-->
  <!--&lt;!&ndash;            <a :href="item.href">{{ item.name }}</a>&ndash;&gt;-->
  <!--&lt;!&ndash;          </template>&ndash;&gt;-->
  <!--&lt;!&ndash;          <template #avatar>&ndash;&gt;-->
  <!--&lt;!&ndash;            <a-avatar :src="item.user_avatar" />&ndash;&gt;-->
  <!--&lt;!&ndash;          </template>&ndash;&gt;-->
  <!--&lt;!&ndash;        </a-list-item-meta>&ndash;&gt;-->
  <!--&lt;!&ndash;        {{ item.brief }}&ndash;&gt;-->
  <!--&lt;!&ndash;      </a-list-item>&ndash;&gt;-->
  <!--    </template>-->
  <!--  </a-list>-->
</template>
<script setup>
import { StarOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons-vue"
import { getVideos } from "@/api/video"
import router from "@/router"
import { reactive, ref } from "vue"
import { dateFormat } from "@/utils/date"


const toAddVideo = () => {
  router.push("/video/add")
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
      })
      pagination.total = res.count
    }).catch((e) => {
      console.log(e)
    })
    console.log(videos)
  },
  pageSize: 10,
  total: 0
}

const columns = [
  {
    title: "ID",
    dataIndex: "id"
  },
  {
    title: "名字",
    dataIndex: "name"
  }, {
    title: "封面",
    dataIndex: "cover",
    width: "20%"
  }, {
    title: "简介",
    dataIndex: "brief"
  }, {
    title: "分类",
    dataIndex: "category"
  },
  {
    title: "上传时间",
    dataIndex: "createdAt"
  },
  {
    title: "时长",
    dataIndex: "duration"
  },
  {
    title: "操作",
    dataIndex: "action"
  }
]


getVideos({ page: 1, pageSize: 10 }).then((res) => {
  console.log("data = ", res)
  res.data.forEach(element => {
    videos.value.push(element)
  })
  pagination.total = res.count
}).catch((e) => {
  console.log(e)
})


</script>