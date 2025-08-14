import axios from "axios";
import { ServerConstants } from "../constants/serverContants";

// Instância do Axios com a URL base correta
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}${ServerConstants.short_url}`,
});

export const shortenUrl = async (originalUrl: string) => {
  try {
    // Faz a requisição POST com a URL original no corpo da requisição
    const response = await api.post("/", { originalUrl });

    return response.data.shortUrl;
  } catch (error) {
    console.error("Erro ao encurtar a URL:", error);
    throw error;
  }
};
