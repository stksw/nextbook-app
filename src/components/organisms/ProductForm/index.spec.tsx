import { render, act, screen, fireEvent, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import ProductForm from '.'
import { theme } from 'themes'

describe('Product Form', () => {
  let renderResult: RenderResult
  let handleProductSave: jest.Mock

  beforeEach(() => {
    handleProductSave = jest.fn()
    renderResult = render(
      <ThemeProvider theme={theme}>
        <ProductForm onProductSave={handleProductSave} />
      </ThemeProvider>
    )
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('onProductSave called when form submit', async () => {
    await act(async () => {
      const element = await screen.findByTestId('dropzone')
      fireEvent.drop(element, {
        dataTransfer: {
          files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })],
        },
      })
      // 商品のタイトルを入力
      const inputUsernameNode = screen.getByPlaceholderText(/商品のタイトル/) as HTMLInputElement
      fireEvent.change(inputUsernameNode, { target: { value: '商品' } })

      // 商品情報を入力
      const inputPasswordNode = screen.getByPlaceholderText(/最高の商品です/) as HTMLInputElement
      fireEvent.change(inputPasswordNode, { target: { value: 'テストテスト' } })

      // 価格を入力
      const inputPriceNode = screen.getByPlaceholderText(/100/) as HTMLInputElement
      fireEvent.change(inputPriceNode, { target: { value: '100' } })

      // 出品ボタンをクリック
      fireEvent.click(screen.getByText('出品'))
    })

    // handleProductSaveが呼ばれていることを確認
    expect(handleProductSave).toHaveBeenCalledTimes(1)
  })

  it('商品タイトル入力だけでは、バリデーションエラーでonProductSaveが呼ばれない', async () => {
    // DOMが更新される事を保証、React Hook FormのhandleSubmitが呼ばれるまで待つ
    await act(async () => {
      // 商品のタイトルを入力
      const inputUsernameNode = screen.getByPlaceholderText(/商品のタイトル/) as HTMLInputElement
      fireEvent.change(inputUsernameNode, { target: { value: '商品' } })

      // 出品ボタンをクリック
      fireEvent.click(screen.getByText('出品'))
    })

    // handleProductSaveが呼ばれていないことを確認
    expect(handleProductSave).toHaveBeenCalledTimes(0)
  })
})
