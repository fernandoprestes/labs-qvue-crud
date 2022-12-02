<script lang="ts" setup>
import { reactive, watch } from "vue";

import postsService from "src/services/posts";

interface Props {
  id: number;
}
const props = defineProps<Props>();

const { getById } = postsService();

const data = reactive({
  course: {
    id: 0,
    title: "",
    author: "",
    category: "",
    description: "",
  },
});

watch(
  () => props.id,
  async () => {
    const response = await getById(props.id);
    data.course = response;
  }
);
</script>

<template>
  <q-dialog persistent>
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
        <q-btn flat label="Cancel" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
