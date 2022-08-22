import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import React from 'react';
import { useForm } from 'react-hook-form';

export type SigninFormData = {
  username: string;
  password: string;
};

type SigninFormProps = {
  onSignin: (username: string, password: string) => void;
};

const SigninForm = ({ onSignin }: SigninFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();

  const handleForm = (data: SigninFormData) => {
    onSignin && onSignin(data.username, data.password);
  };

  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <Box marginBottom={1}>
        {/* サインインユーザー名の入力 */}
        <Input
          {...register('username', { required: true })}
          name="username"
          type="text"
          placeholder="ユーザ名"
          hasError={!!errors.username}
        />
        {errors.username && (
          <Text color="danger" variant="small" paddingLeft={1}>
            ユーザ名は必須です
          </Text>
        )}
      </Box>
      <Box marginBottom={2}>
        {/* サインインパスワードの入力 */}
        <Input
          {...register('password', { required: true })}
          name="password"
          type="password"
          placeholder="パスワード"
          hasError={!!errors.password}
        />
        {errors.password && (
          <Text color="danger" variant="small" paddingLeft={1}>
            パスワードは必須です
          </Text>
        )}
      </Box>
      <Button width="100%" type="submit">
        サインイン
      </Button>
    </form>
  );
};

export default SigninForm;
