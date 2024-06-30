import React, { useState } from 'react'
import { supabase } from '../supabase'

export default function Auth() {
  const [error, setError] = useState(null)

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) setError(error.message)
  }

  return (
    <div>
      <button onClick={signInWithGoogle}>
        Sign In with Google
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  )
}