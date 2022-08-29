import { fireEvent, render, RenderResult, screen, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Dropdown from '.';
import { theme } from 'themes';

describe('Dropdown', () => {
  let renderResult: RenderResult;
  let handleChange: jest.Mock;

  beforeEach(() => {
    handleChange = jest.fn();
    renderResult = render(
      <ThemeProvider theme={theme}>
        <Dropdown
          options={[
            { value: 'new', label: '新品' },
            { value: 'used', label: '中古' },
          ]}
          onChange={handleChange}
        />
      </ThemeProvider>
    );
  });

  afterEach(() => {
    renderResult.unmount();
  });

  it('onChange is called when dropdown is changed', async () => {
    await act(async () => {
      // クリックしてプルダウンを開く
      const element = await screen.findByTestId('dropdown-control');
      element && fireEvent.mouseDown(element);
    });

    // プルダウンから最初のオプションを選択
    const elements = await screen.getAllByTestId('dropdown-option');
    elements && fireEvent.click(elements[0]);

    // オプションを選択したか確認
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
