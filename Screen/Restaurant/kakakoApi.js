import axios from "axios";
import { KAKAO_API } from "../../api_key";

const KAKAO_API_KEY = KAKAO_API; // 여기에 Kakao API 키를 입력하세요

export const searchImages = async (query) => {
  try {
    const response = await axios.get("https://dapi.kakao.com/v2/search/image", {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
      params: {
        query,
      },
    });

    return response.data.documents;
  } catch (error) {
    throw error;
  }
};
