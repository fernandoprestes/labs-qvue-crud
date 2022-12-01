<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

import postsService from "src/services/posts";
import DialogDetails from "src/components/DialogDetails.vue";

const $q = useQuasar();
const router = useRouter();
const { getAll, remove } = postsService();

interface Columns {
  name: string;
  label: string;
  field: string;
  align?: "left" | "right" | "center" | undefined;
}

const dataTable = reactive({
  posts: [],
  columns: [
    {
      name: "id",
      label: "id",
      field: "id",
      align: "left",
    },
    {
      name: "title",
      label: "Titulo",
      field: "title",
      align: "left",
    },
    {
      name: "author",
      label: "Autor",
      field: "author",
      align: "left",
    },
    {
      name: "category",
      label: "Categoria",
      field: "category",
      align: "left",
    },
    {
      name: "actions",
      label: "Ações",
      field: "actions",
      align: "right",
    },
  ] as Columns[],
});

const dialog = reactive({
  open: false,
  id: 0,
});

const getPosts = async () => {
  try {
    dataTable.posts = await getAll();
  } catch (err) {
    console.log(err);
  }
};

const handleDetailsCurse = async (id: number) => {
  dialog.id = id;
  dialog.open = true;
};

const handleEditCurse = async (id: string) => {
  router.push({ name: "form", params: { id } });
};

const handleDeleteCurse = async (id: number) => {
  try {
    $q.dialog({
      title: "Deletar um curso",
      message: "Realmente deseja remover este curso?",
      cancel: true,
    }).onOk(async () => {
      await remove(id);
      $q.notify({
        message: "Removido com sucesso!",
        position: "top",
        color: "positive",
        icon: "check",
      });
    });

    dataTable.posts = await getAll();
  } catch (error) {
    $q.notify({
      message: "Erro ao deletar um curso",
      position: "top",
      color: "negative",
      icon: "times",
    });
  }
};

onMounted(async () => {
  await getPosts();
});
</script>
<template>
  <q-page padding>
    <q-table
      :rows="dataTable.posts"
      :columns="dataTable.columns"
      row-key="name"
    >
      <template v-slot:top>
        <h2 class="text-h5">Lista de Cursos</h2>
        <q-space />
        <q-btn color="primary" label="Novo" :to="{ name: 'form' }" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="visibility"
            color="accent"
            size="sm"
            dense
            @click="handleDetailsCurse(props.row.id)"
          ></q-btn>
          <q-btn
            icon="edit"
            color="primary"
            size="sm"
            dense
            @click="handleEditCurse(props.row.id)"
          ></q-btn>
          <q-btn
            icon="delete"
            color="negative"
            size="sm"
            dense
            @click="handleDeleteCurse(props.row.id)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
    <div>
      <DialogDetails :id="dialog.id" v-model="dialog.open" />
    </div>
  </q-page>
</template>
