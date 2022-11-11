<template>
  <div class="flex justify-center items-center h-full">
    <div
      class=" block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg">
      <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
              autocomplete="off" @finish="onFinish" @finishFailed="onFailed">
        <a-form-item label="用onFailed名" name="username"
                     :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="密码" name="password"
                     :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>


<script setup>
import { reactive } from "vue"
import { login, current } from "@/api/user"
import router from "@/router"
import { useStore } from "vuex"
import { message } from "ant-design-vue"

const formState = reactive({
  username: "",
  password: "",
  remember: true
})


let store = useStore()
const onFinish = values => {
  console.log("Success:", values)
  login({ name: formState.username, password: formState.password }).then((res) => {
    console.log("res = ", res)
    localStorage.setItem("user:token", res)
    console.log("token = ", localStorage.getItem("user:token"))
    store.commit("setToken", res.token)
    current().then(res => {
      store.commit("setUser", res)
    })
    message.success("登录成功")

    router.push("/")

  }).catch((e) => {
    console.log("e = ", e)
  })
}


const onFailed = errorInfo => {

  console.log("Failed:", errorInfo)
}

</script>