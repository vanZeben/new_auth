import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
// import { getToken } from "next-auth/jwt";

// Export the `session` prop to use sessions with Server Side Rendering
// export async function getServerSideProps(context) {
//   console.log("goken: ", await getSession(context));
//   return {
//     props: {
//       session: await getSession(context),
//     },
//   };
// }

export default function Happy() {
  const [session, loading] = useSession();
  console.log("session: ", session);
  return <div>Salam</div>;
}
