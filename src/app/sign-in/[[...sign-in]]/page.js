import { SignIn } from "@clerk/nextjs";
export default function SignInPage() {
  return (
    <>
      <h2>Sign in, please!</h2>
      <SignIn />
    </>
  );
}
