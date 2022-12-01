import useApi from "src/composables/useApi";

export default function postsService() {
  const { getAll, getById, post, update, remove } = useApi("/posts");

  return {
    getAll,
    getById,
    post,
    update,
    remove,
  };
}
