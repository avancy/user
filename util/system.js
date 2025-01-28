import { api } from '@/lib/api';

export default async function getSysTemplate(name, type) {
  try {
    const { data } = await api.get(`/system/templates/name/${name}/type/${type}`);
    const res = await api.get(`/file/${data.file_id}`);
    return res.data?.url || '';
  } catch (e) {
    console.error(e);
    return '';
  }
}
