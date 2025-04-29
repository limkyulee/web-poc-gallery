export function navigateToUpcoming(router: ReturnType<typeof useRouter>){
  router.push('/common/upcoming')
}

export function navigateToHome(router: ReturnType<typeof useRouter>){
  router.push('/')
}

export function navigateToLogin(router: ReturnType<typeof useRouter>){
  router.push('/auth/login')
}
