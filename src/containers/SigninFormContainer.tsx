import SigninForm from 'components/organisms/SigninForm';
import { useAuthContext } from 'contexts/AuthContext';
import { useGlobalSpinnerActionsContext } from 'contexts/GlobalSpinnerContext';

interface SigninFormContainerProps {
  onSignin: (error?: Error) => void; // サインインした時に呼ばれるイベントハンドラ
}

/**
 * サインインフォームコンテナ
 */
const SigninFormContainer = ({ onSignin }: SigninFormContainerProps) => {
  const { signin } = useAuthContext();
  const setGlobalSpinner = useGlobalSpinnerActionsContext();

  const handleSignin = async (username: string, password: string) => {
    try {
      setGlobalSpinner(true);
      await signin(username, password);
      onSignin();
    } catch (err) {
      if (err instanceof Error) {
        window.alert(err.message);
        onSignin(err);
      }
    } finally {
      setGlobalSpinner(false);
    }
  };

  return <SigninForm onSignin={handleSignin}></SigninForm>;
};

export default SigninFormContainer;
