export default function ({
    store, redirect
  }) {
    if (store.getters["auth/authenticated"]) {
       
      if (store.state.auth.user.roles[0] != 'partner') {
        return redirect('/');
      }
    }
  }