import {
  render,
  act,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import SigninForm from '.';
import { theme } from 'themes';

describe('SigninForm', () => {
  let renderResult: RenderResult;
  let handleSignin: jest.Mock;

  beforeEach(() => {
    // ダミー関数
    handleSignin = jest.fn();
    renderResult = render(
      <ThemeProvider theme={theme}>
        <SigninForm onSignin={handleSignin} />
      </ThemeProvider>,
    );
  });

  afterEach(() => {
    renderResult.unmount();
  });

  it('ユーザ名とパスワード入力後、onSigninが呼ばれる', async () => {
    // DOMが更新される事を保証、React Hook FormのhandleSubmitが呼ばれるまで待つ
    await act(async () => {
      // ユーザー名とパスワードを入力
      const inputUsernameNode = screen.getByPlaceholderText(
        /ユーザー名/,
      ) as HTMLInputElement;
      fireEvent.change(inputUsernameNode, { target: { value: 'user' } });

      const inputPasswordNode = screen.getByPlaceholderText(
        /パスワード/,
      ) as HTMLInputElement;
      fireEvent.change(inputPasswordNode, { target: { value: 'password' } });

      // サインインボタンをクリック
      fireEvent.click(screen.getByText('サインイン'));
    });

    expect(handleSignin).toHaveBeenCalledTimes(1);
  });
});
