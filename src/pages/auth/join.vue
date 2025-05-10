<script setup lang="ts">

interface IJoinRequest {
    userNm: string
    email: string
    password: string
}

const router = useRouter()

const email = ref<string>('');
const userNm = ref<string>('');
const password = ref<string>('');


const requestJoin = async (data: IJoinRequest) => {
    try {
        const res = await request.post('/auth/join', data)

        return res.status === 200
    } catch (error) {
        console.error(error)
    }
}

const handleJoinBtnClick = async() => {
    console.info('[JOIN INFO]', email.value, password.value)
    const data = {
        userNm: userNm.value,
        email: email.value,
        password: password.value
    }
    // 회원가입 처리 로직
    const isSuccess = await requestJoin(data)
    if(isSuccess){
        navigateToLogin(router)
    }
};
</script>

<template>
  <div class="auth_container">
    <h1 class="auth_title">회원가입</h1>
    <div class="auth_form">
      <input v-model="email" type="email" placeholder="이메일을 입력해주세요." class="input" />
      <input v-model="userNm" type="text" placeholder="아이디를 입력해주세요." class="input" />
      <input v-model="password" type="password" placeholder="비밀번호를 압력해주세요." class="input" />
      <button class="button" @click="handleJoinBtnClick">회원가입</button>
    </div>
  </div>
</template>
  
 
  