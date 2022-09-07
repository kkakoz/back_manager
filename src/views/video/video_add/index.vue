<template>


    <a-steps :current="current" size="small">
        <a-step title="添加视频信息" />
        <a-step title="添加视频稿件" />
        <a-step title="审核" />
    </a-steps>

    <div class=" m-10" v-show="current===0">

        <a-form :model="video" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="addVideoInfo" @finishFailed="onFinishFailed">
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

            <a-form-item name="show" :wrapper-col="{ offset: 8, span: 16 }">
                <a-checkbox v-model:checked="video.show">是否展示</a-checkbox>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">提交</a-button>
            </a-form-item>
        </a-form>

    </div>

    <div class=" m-10" v-show="current===1">

        <a-upload-dragger :customRequest="newMember" :show-upload-list="false">
            <p class="ant-upload-drag-icon">
                <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">Click or drag file to this area to upload</p>
            <p class="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
            </p>
        </a-upload-dragger>



        <a-table :columns="columns" :dataSource="dataSource" :pagination="false" class=" pt-5">
            <template #bodyCell="{text, record, index, column}">
                <template v-if="column.dataIndex === 'name'">
                    <div class="editable-cell">
                        <div v-if="record.editable" class="editable-cell-input-wrapper">
                            <a-input v-model:value="record.name" @pressEnter="save(record.key)" />
                            <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
                        </div>
                        <div v-else class="editable-cell-text-wrapper">
                            {{ text || ' ' }}
                            <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
                        </div>
                    </div>
                </template>
                <template v-else>
                    <a-popconfirm v-if="record.editable" title="Sure to delete?" @confirm="onResourceDelete(index)">
                        <a>Delete</a>
                    </a-popconfirm>
                </template>

            </template>

        </a-table>

        <a-button type="primary" html-type="submit" @click="submitResources">提交</a-button>

    </div>

</template>
<script setup>
import { reactive, ref } from 'vue';
import { getCategories } from '@/api/home';
import { put } from '@/api/oss';
import { oss } from '@/api/oss';
import { addVideo } from '@/api/video';
import { message } from 'ant-design-vue';
import { InboxOutlined } from '@ant-design/icons-vue';
import { addResource } from '@/api/resource';
import router from '@/router';


let current = ref(1);

const video = reactive({
    name: '',
    brief: '',
    categoryId: "",
    cover: "",
    duration: 0,
});

const categories = ref([])

let videoId = 0

const columns = [
    {
        title: '单集名',
        dataIndex: 'name',
        key: '单集名',
        width: '60%',
        scopedSlots: { customRender: 'name' }
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width: '40%',
        scopedSlots: { customRender: 'operation' }
    }
]



const dataSource = reactive([])

getCategories().then((res) => {
    console.log(res)
    res.data.forEach(element => {
        categories.value.push(element)
    });
})

const addVideoInfo = (values) => {
    addVideo(video).then((res) => {
        console.log("video = ", res)
        message.info("提交成功")
        videoId = res.id
        current.value++
    }).catch((e) => {
        message.error(e)
    })
    console.log(video)
};

const submitResources = () => {
    let resources = []
    dataSource.forEach((e) => {
        resources.push({
            url: e.url,
            name: e.name.replace(".mp4", ""),
            duration: e.duration,
        })
    })
    console.log(resources)
    addResource({videoId, resources}).then(()=> {
        message.info("添加成功,请等待审核")
        router.push("/video")
    }).catch((e)=> {
        message.error(e)
    })
}

const onResourceDelete = index => {
    delete dataSource[index]
}

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
    console.log("audio = ", audioElement)
    audioElement.addEventListener("loadedmetadata", function (_event) {
        duration = audioElement.duration;
        console.log("视频的时长为:", duration);//单位：秒
        oss().then((res) => {
            console.log("res = ", res)
            put(action.file.name, action.file, res).then((res) => {
                console.log("put res = ", res)
                cur.editable = true
                cur.url = res.url
                cur.duration = duration
                cur.loading = "上传成功"
            }).catch((e) => {
                console.log("put err", e)
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

var cur = reactive({
    key: "100",
    name: "ceshi",
    editable: false,
    loading: "上传中",
    url: "",
    duration: 0,
})
dataSource.push(cur)


var cur = reactive({
    key: "100",
    name: "ceshi",
    editable: true,
    loading: "上传成功",
    url: "",
    duration: 0,
})
dataSource.push(cur)

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
    var cur = reactive({
        key: key,
        name: action.file.name,
        editable: false,
        loading: "上传中",
        url: "",
        duration: 0,
    })
    dataSource.push(cur)
    uploadVideo(action, cur)
}

</script>