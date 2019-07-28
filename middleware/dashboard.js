export default function ({
    store,
    redirect
  }) {
    if (store.getters["auth/authenticated"]) {
       
      if (store.state.auth.user.permissions.length <= 0) {
        return redirect('/');
      }
    }
  }