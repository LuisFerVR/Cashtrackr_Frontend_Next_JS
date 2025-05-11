import { verifySession } from "@/src/auth/dal"
import ProfileForm from "../ProfileForm"
import { UserSchema } from "@/src"

export default async function EditProfilePage() {
  const {user} = await verifySession()
  const safeUser = UserSchema.safeParse(user);
if (!safeUser.success) {
  return <p>Error al cargar los datos del usuario</p>;
}

    return (
      <>
          <h1 className="font-black text-4xl text-purple-950 my-5">Actualizar Perfil</h1>
          <p className="text-xl font-bold">Aquí puedes cambiar los datos de tu {''}
              <span className="text-amber-500">perfil</span>
          </p>

      <ProfileForm 
        user={safeUser.data}
      />
      </>
    )
  }