import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/session'
import { getServerSession } from 'next-auth'
import Image from 'next/image'



export default async function Home() {

  const user = await getServerSession()
  return (
    <main className="flex min-h-screen flex-col items-center 
    justify-between p-24">
      {!!user && <p>{JSON.stringify(user)}</p>}
      <Button>Login</Button>
    </main>
  )
}
