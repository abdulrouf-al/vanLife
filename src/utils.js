import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  /* if (isLoggedIn == null) {
    //return redirect("/login?message=You must log in first.");
    const response = redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`
    );
    //console.log(pathname);
    response.body = true; // It's silly, but it works
    return response;
  } else return null; */
  return null;
  /*
  import HostVans, { loader as hostVansLoader } from "./Pages/Host/HostVans"; */
}
/*  // throw redirect("/login"); */
