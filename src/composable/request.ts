import axios from 'axios'
import AxiosMockAdapter from "axios-mock-adapter";

const baseUrl: string = import.meta.env.VITE_API_CONTEXT_PATH

const service = axios.create({
  baseURL: baseUrl,
  headers: {
  },
})

// create mock api
const mock = new AxiosMockAdapter(service); 
const getMockData = async (uri: string): Promise<any> => {
  try {
    // URI에서 파일명을 추출합니다. 예: "/infinity" → "infinity"
    const fileName = uri.replace(/^\//, ''); // 파일 이름 변환 (필요하면 수정 가능)

    // 동적으로 파일을 가져옵니다.
    const mock = await import(`../mock/${fileName}.ts`);

    return mock.data
  } catch (error) {
    throw new Error(`해당 파일에 맞는 데이터를 찾을 수 없습니다 : ${uri}`);
  }
};

// Mock API 설정
mock.onGet(new RegExp('.*')).reply(async (config) => {
  try {
    const uri = config.url || ''; // 요청 URL
    const results = await getMockData(uri);

    // 응답 지연 시간 생성 (0.1초 ~ 1초)
    const delay = Math.random() * 900 + 100; // 100ms ~ 1000ms
    console.info('API RESPONSE DELAY :::', delay);
    await new Promise((resolve) => setTimeout(resolve, delay));

    return [200, results];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// 단일 사용 시 Mock API 선언
// mock.onGet("/infinity-data").reply(async() => {
//   try {
//     const results = infinifyMock
//     // 응답 지연 시간 생성 (0.1초 ~ 1초)
//     const delay = Math.random() * 900 + 100; // 100ms ~ 1000ms
//     // 지연 처리
//     await new Promise(resolve => setTimeout(resolve, delay));

//     return [200, results];
//   } catch (error) {
//     console.error(error);
//     return [500, { message: "Internal server error" }];
//   }
// });

service.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    return Promise.reject(error)
  },
)



export default service
