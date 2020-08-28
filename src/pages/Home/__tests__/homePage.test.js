import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import HomePage from '../'

describe(`HomePage`, () => {
  afterEach(cleanup)

  const testData = [
    [
      'has correct simple title text',
      {},
      {
        h1: `Hello React!`,
        titleComponent: `Hello Again React!`,
        p: `hi there`,
      },
    ],
  ]

  test.each(testData)(`%p`, (testTitle, testParams, testExpected) => {
    const { asFragment, getByTestId, getByText } = render(<HomePage />)
    expect(getByTestId('HomePage Component')).toHaveTextContent(testExpected.h1)
    expect(getByText(testExpected.h1)).toBeInTheDocument()

    expect(getByTestId('Title Component')).toHaveTextContent(
      testExpected.titleComponent
    )
    expect(getByText(testExpected.titleComponent)).toBeInTheDocument()

    expect(getByText(testExpected.p)).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })
})
