"use-client";
import { useState } from "react";
import "./App.css";
//import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom";
import Home from "./Pages/Home";
import NotFoundPage from "./Pages/NotFoundPage";
import About from "./Pages/About";
import Vans, { loader as vansLoader } from "./Pages/Vans/Vans";
import VansDetail, {
  loader as VansDetailLoader,
} from "./Pages/Vans/VansDetail";
import Layout from "./Component/Layout";
import Dashboard from "./Pages/Host/Dashboard";
import Income from "./Pages/Host/Income";
import HostLayout from "./Pages/Host/HostLayout";
import Reviews from "./Pages/Host/Reviews";
import HostVans, { loader as hostVansLoader } from "./Pages/Host/HostVans";
import HostVanDetail, {
  loader as hostVanDetailLoader,
} from "./Pages/Host/HostVanDetail";
import HostVanInfo from "./Pages/Host/HostVanInfo";
import HostVanPhotos from "./Pages/Host/HostVanPhotos";
import HostVanPricing from "./Pages/Host/HostVanPricing";
import Error from "./Pages/Vans/Error";
import "../src/server";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./Pages/login";
import { requireAuth } from "./utils";
//localStorage.removeItem("isLoggedIn");
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route
          path="login"
          element={<Login />}
          loader={loginLoader}
          action={loginAction}
        />
        <Route
          path="vans"
          element={<Vans />}
          loader={vansLoader}
          errorElement={<Error />}
        />
        <Route
          path="/vans/:id"
          element={<VansDetail />}
          errorElement={<Error />}
          loader={VansDetailLoader}
        />

        <Route path="/host" element={<HostLayout />}>
          <Route
            index
            element={<Dashboard />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="income"
            element={<Income />}
            errorElement={<Error />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="reviews"
            element={<Reviews />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="vans"
            element={<HostVans />}
            errorElement={<Error />}
            loader={hostVansLoader}
          />
          <Route
            path="vans/:id"
            element={<HostVanDetail />}
            errorElement={<Error />}
            loader={hostVanDetailLoader}
          >
            <Route index element={<HostVanInfo />} />
            <Route
              path="pricing"
              element={<HostVanPricing />}
              loader={async ({ request }) => await requireAuth(request)}
            />
            <Route
              path="photos"
              element={<HostVanPhotos />}
              loader={async ({ request }) => await requireAuth(request)}
              /* loader={async () => {
                return null;
              }} */
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />

      {/* <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="vans" element={<Vans />} />
            <Route path="/vans/:id" element={<VansDetail />} />

            <Route path="/host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVanDetail />}>
                <Route index element={<HostVanInfo />} />
                <Route path="pricing" element={<HostVanPricing />} />
                <Route path="photos" element={<HostVanPhotos />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
