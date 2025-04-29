<script setup lang="ts">

interface IJoinRequest {
    username: string
    email: string
    password: string
}

const router = useRouter()

const email = ref<string>('');
const username = ref<string>('');
const password = ref<string>('');


const requestJoin = async (data: IJoinRequest) => {
    try {
        const res = await request.post('/api/join', data)

        return res.status === 200
    } catch (error) {
        console.error(error)
    }
}

const handelJoinBtnClick = async() => {
    console.info('[JOIN INFO]', email, password)
    const data = {
        username: username.value,
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
  <div class="join-container">
    <h1 class="join-title">회원가입</h1>
    <form class="join-form">
      <input v-model="email" type="email" placeholder="이메일을 입력해주세요." class="join-input" />
      <input v-model="username" type="text" placeholder="아이디를 입력해주세요." class="join-input" />
      <input v-model="password" type="password" placeholder="비밀번호를 압력해주세요." class="join-input" />
      <button class="join-button" @click="handelJoinBtnClick">회원가입</button>
    </form>
  </div>
</template>
  
 
  