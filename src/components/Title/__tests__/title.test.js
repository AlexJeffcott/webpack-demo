import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Title from '../'

describe(`Title Component`, () => {
  afterEach(cleanup)

  const testData = [
    [
      'has correct simple title text',
      {
        title: `Hello React!`,
      },
      `Hello React!`,
    ],
    [
      'has correct tricky title text',
      {
        title: `abcdefghijklmnopqrstuvwxyz1234567890!~#@?,.£$%^&*()-=+|/'"äüößú`,
      },
      `abcdefghijklmnopqrstuvwxyz1234567890!~#@?,.£$%^&*()-=+|/'"äüößú`,
    ],
  ]

  test.each(testData)(`%p`, (testTitle, testParams, testExpected) => {
    const { asFragment, getByTestId } = render(<Title {...testParams} />)
    expect(getByTestId('Title Component')).toHaveTextContent(testExpected)
    expect(asFragment()).toMatchSnapshot()
  })
})
