import { api } from "boot/axios";

export default function useApi(url: string) {
  const getAll = async () => {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const getById = async (id: number) => {
    try {
      const response = await api.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const post = async (data: any) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const update = async (data: any) => {
    try {
      const response = await api.put(`${url}/${data.id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const remove = async (id: number) => {
    try {
      const response = await api.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  return {
    getAll,
    getById,
    post,
    update,
    remove,
  };
}
