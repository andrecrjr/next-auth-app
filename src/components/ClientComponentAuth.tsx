'use client'

import {useSession} from 'next-auth/react';


export default function ClientComponentAuth() {
    const session = useSession()
    console.log(session)
  return <>{
    session?.data && (
        <div className='bg-slate-50 border gap-2 h-60 max-w-md'>
            <h2>Client Component</h2>
            <p>{JSON.stringify(session)}</p>
        </div>
    )
    }</>;
}
