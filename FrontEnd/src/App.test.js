import {queryAllByTestId, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Eharts from './Eharts';
import axios from "axios";

afterEach(() => {
  // jest.restoreAlMocks();
})

test('test charts', async() => {
  const spy=jest.spyOn(window,"fetch");
  const {asFragment, getByText,getByRole} = render(<Eharts />)
  expect(getByText('Male and female statistics')).toBeInTheDocument();
  expect(getByRole("generic",{name:"charts"})).toBeInTheDocument();
});
