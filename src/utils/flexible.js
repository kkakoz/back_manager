import {
  useWindowSize
} from "@vueuse/core"
import {
  PC_DEVICE_WIDTH
} from "@/constants"
import {
  computed
} from "vue"

const {
  width
} = useWindowSize()

// 判断是否为移动设备,根据当前屏幕宽度是否大于指定宽度
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})