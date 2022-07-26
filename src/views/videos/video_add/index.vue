<template>

    <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 20 }" autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="视频名称" name="name" :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item label="视频简介" name="brief" :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="分类" name="brief" :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-select v-model:value="formState.categoryId" placeholder="Please select a country">
                <a-select-option v-for="item in categories" :value="item.name">{{ item.name }}</a-select-option>
            </a-select>
        </a-form-item>



        <a-form-item name="cover" label="封面">
            <a-upload v-model:file-list="formState.upload" name="avatar" list-type="picture-card"
                class="avatar-uploader" :show-upload-list="false" :before-upload="beforeUpload" :customRequest="upload">
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                    <loading-outlined v-if="loading"></loading-outlined>
                    <plus-outlined v-else></plus-outlined>
                    <div class="ant-upload-text">Upload</div>
                </div>
            </a-upload>
        </a-form-item>

        <!-- <a-form-item name="url" label="视频">
            <a-upload v-model:fileList="formState.upload" name="logo" action="upload" list-type="picture">
                <a-button>
                    <template #icon>
                        <UploadOutlined />
                    </template>
                    Click to upload
                </a-button>
            </a-upload>
        </a-form-item> -->

        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-form>

</template>
<script setup>
import { defineComponent, reactive, ref } from 'vue';
import { getCategories } from '@/api/home';
const formState = reactive({
    username: '',
    brief: '',
    categoryId: "",
    // upload: "",
    remember: true,
});

const categories = ref([])

getCategories().then((res) => {
    console.log(res)
    res.forEach(element => {
        categories.value.push(element)
    });
})

const onFinish = values => {
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

const upload = (action) => {
    console.log(action)

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
        formState.duration = audioElement.duration;
        console.log("视频的时长为:", duration);//单位：秒
    });

    //   console.log(put)
    //   put(action.file.name, action.file).then(res => {
    //     this.video.imageUrl = res.url
    //   }).catch(err => {
    //     console.log(err)
    //   })
}
</script>