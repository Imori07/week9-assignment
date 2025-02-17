import { SignUp } from "@clerk/nextjs";
export default function SignUpPage() {
  return (
    <>
      <h2>Sign up, please, new user!</h2>
      <SignUp />
    </>
  );
}
