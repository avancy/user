import { AuthLayout } from '@/components/layouts/auth';
import SignupLayout from '@/components/layouts/signup';
import SignupInfoView from '@/components/views/auth/signup/info';

export default function Main() {
  return <SignupInfoView />;
}

Main.getLayout = (page) => (
  <AuthLayout>
    <SignupLayout>{page}</SignupLayout>
  </AuthLayout>
);
