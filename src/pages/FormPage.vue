<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";

import postsService from "src/services/posts";

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const { post, getById, update } = postsService();

const form = reactive({
  data: {
    title: "",
    author: "",
    category: "",
    description: "",
  },
  isEditMode: false,
  options: ["Front-End", "Back-End", "Mobile", "Design"],
});

const onSubmit = async () => {
  try {
    if (form.isEditMode) {
      await update(form.data);
    } else {
      await post(form.data);
    }
    $q.notify({
      message: "Salvo com sucesso!",
      position: "top",
      color: "positive",
      icon: "done",
    });
    router.push({ name: "home" });
  } catch (error) {
    $q.notify({
      message: "Ops! Aconteceu um erro!",
      position: "top",
      color: "negative",
      icon: "error",
    });
    throw new Error(`Erro: ${error}`);
  }
};

onMounted(async () => {
  const [id] = route.params.id;
  if (id) {
    const response = await getById(+id);
    form.data = response;
    form.isEditMode = true;
  }
});
</script>

<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="row column q-col-gutter-sm">
      <q-input
        outlined
        v-model="form.data.title"
        label="Titulo"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />
      <q-input
        outlined
        v-model="form.data.author"
        label="Nome do autor"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />
      <q-select
        label="Categoria"
        v-model="form.data.category"
        :options="form.options"
        outlined
      />
      <div class="col-lg-6 col-xs-12 q-my-md">
        <q-editor v-model="form.data.description" min-height="5rem" />
      </div>
      <div class="row q-gutter-md justify-end">
        <q-btn label="cancelar" :to="{ name: 'home' }" />
        <q-btn color="primary" icon="save" label="Salvar" type="submit" />
      </div>
    </q-form>
  </q-page>
</template>
