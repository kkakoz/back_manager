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

        <a-form-item name="url" label="视频">
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
        </a-form-item>

        <a-form-item name="show" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="video.show">是否展示</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-form>

</template>
<script setup>
import { defineComponent, reactive, ref } from 'vue';
import { getCategories } from '@/api/home';
import { put } from '@/api/oss';
import { oss } from '@/api/oss';
import { addVideo } from '@/api/video';
import { message } from 'ant-design-vue';
import router from '@/router';

const video = reactive({
    name: '',
    brief: '',
    categoryId: "",
    // upload: "",
    cover: "",
    duration: 0,
    url: "",
    show: false,
});

const categories = ref([])

getCategories().then((res) => {
    console.log(res)
    res.forEach(element => {
        categories.value.push(element)
    });
})

const onFinish = values => {
    let req = {
        name: video.name,
        brief: video.brief,
        category_id: video.categoryId,
        cover: video.cover,
        duration: video.duration,
        url: video.url,
        show: video.show,
    }
    console.log(req)
    addVideo(req).then(() => {
        message.info("上传成功")
        router.push('/videos')
    }).catch((e) => {
        message.error(e)
    })
    console.log(video)
    console.log(values)
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};



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

const uploadVideo = (action) => {
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
        video.duration = audioElement.duration;
        console.log("视频的时长为:", duration);//单位：秒
        oss().then((res) => {
            console.log("res = ", res)
            put(action.file.name, action.file, res).then((res) => {
                console.log("put res = ", res)
                video.url = res.url
            }).catch((e) => {
                console / log("put err", e)
            })
        }).catch((e) => {
            console.log(e)
        })
    })

}

var right_type = new Array("avi", "wmv", "mpg", "mpeg", "mov", "rm", "ram", "swf", "flv", "mp4", "mp3", "wma", "avi", "rm", "rmvb", "flv", "mpg", "mkv")    
</script>