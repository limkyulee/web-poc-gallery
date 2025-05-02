<script setup lang="ts">

interface ILoginRequest {
    email: string
    password: string
}

const router = useRouter()

const email = ref<string>('');
const password = ref<string>('');


const requestLogin = async (data: ILoginRequest) => {
    try {
        const res = await request.post('/auth/login', data)

        return res.status === 200
    } catch (error) {
        console.error(error)
    }
}

const handleLoginBtnClick = async() => {
    console.info('[LOGIN INFO]', email.value, password.value)
    const data = {
        email: email.value,
        password: password.value
    }
    // 로그인 처리 로직
    const isSuccess = await requestLogin(data)
    if(isSuccess){
        navigateToHome(router)
    }
};
</script>


<template>
    <div class="auth_container">
     <h1 class="auth_title">로그인</h1>
     <div class="auth_form">
       <input v-model="email" type="text" placeholder="이메일을 입력해주세요." class="input" />
       <input v-model="password" type="password" placeholder="비밀번호를 입력해주세요." class="input" />
       <button class="button" @click="handleLoginBtnClick">로그인</button>
     </div>
   </div>
 </template>
  
