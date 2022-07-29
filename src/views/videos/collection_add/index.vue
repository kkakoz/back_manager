<template>

    <a-form :model="video" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 20 }" autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="视频名称" name="name" :rules="[{ required: true, message: '请添加视频名' }]">
            <a-input v-model:value="video.name" />
        </a-form-item>

        <a-form-item label="视频简介" name="brief">
            <a-input v-model:value="video.brief" />
        </a-form-item>

        <a-form-item label="分类" name="categoryId">
            <a-select v-model:value="video.categoryId" placeholder="Please select a country">
                <a-select-option v-for="item in categories" :value="item.id">{{ item.name }}</a-select-option>
            </a-select>
        </a-form-item>

        <a-form-item name="cover" label="封面">
            <a-upload v-model:file-list="video.upload" name="cover" list-type="picture-card" class="avatar-uploader"
                :show-upload-list="false" :before-upload="beforeUpload" :customRequest="upload">
                <img v-if="video.cover" :src="video.cover" alt="avatar" />
                <div v-else>
                    <loading-outlined v-if="loading"></loading-outlined>
                    <plus-outlined v-else></plus-outlined>
                    <div class="ant-upload-text">Upload</div>
                </div>
            </a-upload>
        </a-form-item>

        <!-- <a-form-item name="url" label="视频">
            <a-upload name="url" :customRequest="uploadVideo" :show-upload-list="false">
                <a-button>
                    <template #icon>
                        <UploadOutlined />
                    </template>
                    <div v-if="video.url === ''">
                        Click to upload
                    </div>
                    <div v-else>
                        上传完成,时长为{{ video.duration }}秒
                    </div>
                </a-button>
            </a-upload>
        </a-form-item> -->

        <a-table :columns="columns" :dataSource="dataSource" :pagination="false">
            <template v-for="(col, i) in ['url', 'name']" :slot="col" slot-scope="text, record">
                <a-input :key="col" v-if="record.editable && i" style="margin: -5px 0" :value="text"
                    :placeholder="columns[i].title" @change="e => handleChange(e.target.value, record.key, col)" />
                <template v-else>
                    {{ text }}</template>
                {{ text }}
            </template>
            <template slot="operation" slot-scope="text, record">
                <template v-if="record.editable">

                    <span v-if="record.isNew">
                        <a @click="saveRow(record.key)">{{ $t('添加') }}</a>
                        <a-divider type="vertical" />
                        <a-popconfirm :title="$t('deleteConfirm')" @confirm="remove(record.key)">
                            <a>{{ $t('delete') }}</a>
                        </a-popconfirm>
                    </span>
                    <span v-else>
                        <a @click="saveRow(record.key)">{{ $t('保存') }}</a>
                        <a-divider type="vertical" />
                        <a @click="cancle(record.key)">{{ $t('取消') }}</a>
                    </span>
                </template>
                <span v-else>
                    <a @click="toggle(record.key)">编辑</a>
                    <a-divider type="vertical" />
                    <a-popconfirm :title="deleteConfirm" @confirm="remove(record.key)">
                        <a>删除</a>
                    </a-popconfirm>
                </span>
            </template>
        </a-table>

        <a-upload :customRequest="newMember" :show-upload-list="false">
            <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed">
                添加稿件</a-button>
        </a-upload>



        <a-form-item name="show" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="video.show">是否展示</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-form>

</template>
<script setup>
import { reactive, ref } from 'vue';
import { getCategories } from '@/api/home';
import { put } from '@/api/oss';
import { oss } from '@/api/oss';
import { addCollection } from '@/api/collection';
import { message } from 'ant-design-vue';
import router from '@/router';



const video = reactive({
    name: '',
    brief: '',
    categoryId: "",
    // upload: "",
    cover: "",
    duration: 0,
    show: false,
});

const categories = ref([])

const columns = [
    {
        title: '视频文件',
        dataIndex: 'loading',
        key: '视频文件',
        width: '30%',
        scopedSlots: { customRender: 'loading' }
    },
    {
        title: '单集名',
        dataIndex: 'name',
        key: '单集名',
        width: '30%',
        scopedSlots: { customRender: 'name' }
    },
    {
        title: '操作',
        key: 'operation',
        scopedSlots: { customRender: 'operation' }
    }
]



const dataSource = reactive([])

getCategories().then((res) => {
    console.log(res)
    res.forEach(element => {
        categories.value.push(element)
    });
})

const onFinish = values => {
    let videos = []
    dataSource.forEach((e) => {
        videos.push({
            url: e.url,
            name: e.name.replace(".mp4", ""),
            duration: e.duration,
        })
    })
    console.log(videos)
    if (videos.length == 0) {
        message.error("稿件数不能为0")
        return
    }
    let req = {
        name: video.name,
        brief: video.brief,
        category_id: video.categoryId,
        cover: video.cover,
        show: video.show,
        videos: videos,
    }
    console.log(req)
    addCollection(req).then(() => {
        message.info("上传成功")
        router.push('/collections')
    }).catch((e) => {
        message.error(e)
    })
    console.log(video)
    console.log(values)
};

const onFinishFailed = errorInfo => {

    console.log('Failed:', errorInfo);
};

const uploadVideo = (action, cur) => {
    var binaryData = [];
    // 传入file
    binaryData.push(action.file);
    //获取视频或者音频时长
    var fileurl = URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }));
    //经测试，发现audio也可获取视频的时长
    var audioElement = new Audio(fileurl);
    var duration;
    audioElement.addEventListener("loadedmetadata", function (_event) {
        duration = audioElement.duration;
        console.log("视频的时长为:", duration);//单位：秒
        oss().then((res) => {
            console.log("res = ", res)
            put(action.file.name, action.file, res).then((res) => {
                console.log("put res = ", res)
                cur.editable = true
                cur.loading = "上传成功"
                cur.url = res.url
        cur.duration = duration
            }).catch((e) => {
                console / log("put err", e)
            })
        }).catch((e) => {
            console.log(e)
        })
    })

}

const upload = (action) => {
    oss().then((res) => {
        console.log("res = ", res)
        put(action.file.name, action.file, res).then((res) => {
            console.log("put res = ", res)
            video.cover = res.url
        })
    }).catch((e) => {
        console.log(e)
    })

};



const newMember = (action) => {
    console.log("action = ", action)
    if (action.file.size > 100 * 1024 * 1024) {
        message.error("请上传100mb以内文件")
        return
    }
    if (action.file.name.indexOf("mp4") == -1) {
        message.error("请上传mp4类型文件")
        return
    }
    var key = dataSource.length + 1
    var cur = {
        key: key,
        name: action.file.name,
        editable: false,
        loading: "上传中",
        url: "",
        duration: 0,
    }
    dataSource.push(cur)
    uploadVideo(action, cur)
}

const remove = (key) => {
    const newData = dataSource.filter(item => item.key !== key)
    dataSource = newData
}
const saveRow = (key) => {
    let target = dataSource.filter(item => item.key === key)[0]
    target.editable = false
    target.isNew = false
}
const toggle = (key) => {
    let target = dataSource.filter(item => item.key === key)[0]
    target.editable = !target.editable
}
const getRowByKey = (key, newData) => {
    const data = dataSource
    return (newData || data).filter(item => item.key === key)[0]
}
const cancle = (key) => {
    let target = dataSource.filter(item => item.key === key)[0]
    target.editable = false
}
const handleChange = (value, key, column) => {
    const newData = [...dataSource]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
        target[column] = value
        dataSource = newData
    }
}

</script>