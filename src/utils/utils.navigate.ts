
export function navigateToUpcoming(router: ReturnType<typeof useRouter>){
  router.push('/common/upcoming')
}

export function navigateToNotFound(router: ReturnType<typeof useRouter>){
  router.push('/common/not-found')
}