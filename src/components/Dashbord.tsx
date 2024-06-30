import { supabase } from '../supabase'

export default function Dashboard({ user }) {
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error signing out:', error)
  }

  return (
    <div>
      <h2>Welcome, {user.email}!</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}