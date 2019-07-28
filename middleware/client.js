export default function ({
  store,
  redirect
}) {
  if (store.getters["auth/authenticated"]) {
     
    if (store.state.auth.user.roles[0] != 'client') {
      return redirect('/');
    }
//     } else if (store.state.auth.user.roles[0] == 'partner') {
//       return redirect("/partner");
//     } else if (store.state.auth.user.permissions.length > 0) {
//       this.$router.push('/dashboard')
//     }
//   }else{
//     return redirect('/login')  
  }
}
