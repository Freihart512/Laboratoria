import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Home from "../components/Home/Home";



const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe("Test UseNavigate",() => {

  afterEach(()=>{
    jest.restoreAllMocks()
  })


  it("Test With Mock", async () => {
    render(<Home />);
    expect(screen.getByText(/Un bloc de notas a tu alcance ¡Toma nota ahora!/i)).toBeInTheDocument()
    await userEvent.click(screen.getByText(/Registrarse/i))
    expect(mockNavigate).toHaveBeenCalledWith("/Register")
  });

})

