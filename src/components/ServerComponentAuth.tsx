import { getCurrentUser } from "@/lib/session";

export default async function ServerComponentAuth() {
  const user = await getCurrentUser()
  console.log(user)
  return <>{
    user.session !== undefined && (
        <div className='bg-slate-500 border gap-2 h-60 max-w-md'>
            <h2>Server Component</h2>
            <p>{JSON.stringify(user)}</p>
        </div>
    )
    }</>;
}
