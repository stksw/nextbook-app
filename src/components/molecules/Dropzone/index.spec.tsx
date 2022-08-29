import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Dropzone from '.';
import { theme } from 'themes';

describe('Dropzone', () => {
  let renderResult: RenderResult;
  let handleDrop: jest.Mock;

  beforeEach(() => {
    handleDrop = jest.fn();
    renderResult = render(
      <ThemeProvider theme={theme}>
        <Dropzone onDrop={handleDrop} />
      </ThemeProvider>
    );
  });

  afterEach(() => {
    renderResult.unmount();
  });

  it('onDrop is called when file is dropped', async () => {
    const element = await screen.findByTestId('dropzone');

    fireEvent.drop(element, {
      // ファイルをドロップ
      dataTransfer: {
        files: [new File(['(□_□)'], 'chucknorris.png', { type: 'image/png' })],
      },
    });

    // ファイルが入力されたか確認
    expect(handleDrop).toHaveBeenCalledTimes(1);
  });
});
