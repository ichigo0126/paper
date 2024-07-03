import { Flex,Box } from '@chakra-ui/react'
import { supabase } from '../supabase'
import Home from "./Home"


export default function Dashboard({ user }) {
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error signing out:', error)
  }

  return (
    <div>
      <Flex justifyContent="space-between">
        <Box pl="20px">
      <h2>Welcome, {user.email}!</h2>
        </Box>
      <Box pr="20px">
      <button onClick={handleSignOut}>Sign Out</button>
      </Box>
      </Flex>
      <Home />
    </div>
  )
}