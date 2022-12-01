<script lang="ts" setup>
import { onMounted, reactive, ref, watch, toRef } from "vue";

import postsService from "src/services/posts";

interface Props {
  id: number;
}
const props = defineProps<Props>();

const { getById } = postsService();

const dialog = ref(false);
const data = reactive({
  course: {
    id: 0,
    title: "",
    author: "",
    category: "",
    description: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
const onCancel = () => {
  dialog.value = false;
  emit("update:modelValue", dialog.value);
};

watch(
  () => props.id,
  async () => {
    const response = await getById(props.id);
    data.course = response;
  }
);
</script>

<template>
  <q-dialog v-model="dialog" persistent>
    <q-card>
      <q-card-section class="items-center">
        <div class="text-h6">{{ data.course.title }}</div>
        <div class="text-subtitle">
          {{ data.course.category }} | {{ data.course.author }}
        </div>
      </q-card-section>
      <q-separator dark inset />
      <q-card-section>
        <div>
          {{ data.course.description }}
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="onCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
