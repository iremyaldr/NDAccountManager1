import axios from "axios";

// Backend API URL'si
const baseUrl = "http://localhost:5280/api"; // Eğer HTTPS kullanıyorsanız, 'https://localhost:7023/api' olarak değiştirin

const api = {
  AccountInfo(url = baseUrl + "/accountInfo/") {
    return {
      fetchAll: () => axios.get(url),
      fetchById: (id) => axios.get(url + id),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
    };
  },
};

export default api;