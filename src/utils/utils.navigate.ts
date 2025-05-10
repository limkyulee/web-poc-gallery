export function navigateToUpcoming(router: ReturnType<typeof useRouter>){
  router.push('/common/upcoming')
}

export function navigateToHome(router: ReturnType<typeof useRouter>){
  router.push('/')
}

export function navigateToJoin(router: ReturnType<typeof useRouter>){
  router.push('/auth/join')
}

export function navigateToLogin(router: ReturnType<typeof useRouter>){
  router.push('/auth/login')
}
