<script setup lang="ts">
const props = withDefaults(defineProps<{
  visibleModal: boolean
  noTitle?: boolean
  noFooter?: boolean
  useCloseBtn?: boolean
  title?: string
  size?: string | number
  modalWidth?: string | number
  alert?: boolean
  className?:string
}>(), {
  visibleModal: false,
  useCloseBtn: true,
  noTitle: false,
  noFooter: false,
  title: '',
  size: 'sm',
  alert: false,
  className: '',
})

const emits = defineEmits<{
  (e: 'closeModal'): void
  (e: 'update:modalShow', val: boolean): void
}>()

const visible = computed({
  get() {
    return props.visibleModal
  },
  set(value) {
    emits('update:modalShow', value)
  },
})

const handleModal = () => {
  emits('closeModal')
}

const modalWidth = computed(() => {
  if (props.size === 'sm')
    return 'var(--modal-sm-width)'
  else if (props.size === 'md')
    return 'var(--modal-md-width)'
  else if (props.size === 'lg')
    return 'var(--modal-lg-width)'
})

</script>

<template>
  <div>
    <el-dialog v-model="visible" :show-close="false" center :close-on-click-modal="false" :width="modalWidth"
      :close-on-press-escape="false" align-center destroy-on-close>
      <template #header>
        <h1 v-if="!noTitle && !alert">
          {{ title }}
        </h1>
      </template>
      <slot name="content" />
      <template v-if="!noFooter" #footer>
        <slot name="footer">
          <button type="button" class="button" @click="handleModal">
            취소
          </button>
          <button type="button" class="button" @click="handleModal">
            확인
          </button>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
