import React from "react";
import { render, screen } from "@testing-library/react";

import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Home from "../components/Home/Home";
import * as Router  from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom'

describe("Test UseNavigate",() => {
  it("test With Router", async () => {
    render(
    <Router.Routes>
      <Router.Route exact path="/" element={<Home />} />
      <Router.Route path="/Register" element={<div>HOLA</div>} />
    </Router.Routes>,{wrapper: BrowserRouter}
    );
    expect(screen.getByText(/Un bloc de notas a tu alcance ¡Toma nota ahora!/i)).toBeInTheDocument()
    await userEvent.click(screen.getByText(/Registrarse/i))
    expect(await screen.findByText("HOLA")).toBeInTheDocument()
  });

})

