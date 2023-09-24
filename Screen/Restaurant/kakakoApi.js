import axios from "axios";

const KAKAO_API_KEY = "4d531186b3bd2d6add236f3a6093fd18"; // 여기에 Kakao API 키를 입력하세요

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
