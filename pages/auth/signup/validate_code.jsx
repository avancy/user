import { AuthLayout } from '@/components/layouts/auth';
import SignupLayout from '@/components/layouts/signup';
import SignupValidateCodeView from '@/components/views/auth/signup/validate_code';

export default function Main() {
  return <SignupValidateCodeView />;
}

Main.getLayout = (page) => (
  <AuthLayout>
    <SignupLayout>{page}</SignupLayout>
  </AuthLayout>
);
