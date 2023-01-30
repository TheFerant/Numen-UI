import React from 'react'
import { render } from 'enzyme'
import { CssBaseline, NumenProvider } from 'components'

describe('CSSBaseline', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <NumenProvider>
        <CssBaseline />
      </NumenProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render dark mode correctly', () => {
    const wrapper = render(
      <NumenProvider themeType="dark">
        <CssBaseline />
      </NumenProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
