import { Routes } from "@angular/router";
import { Home } from "./pages/home/home";
import { Details } from "./pages/details/details";
import { Form } from "./pages/form/form";
import { NotFound } from "./pages/not-found/not-found";
import { Login } from "./pages/login/login";
import { authGuard } from "./auth-guard";

export const routes: Routes = [
    {
        path: '',
        canActivateChild: [authGuard],
        children: [
            {path: '', component: Home, pathMatch: 'full'},
            {path: 'details/:id', component: Details},
            {path: 'form/:id', component: Form},
            {path: 'form', component: Form}
        ]
    },
    {
        path: 'login', 
        component: Login
    },
    {
        path:'**', 
        component: NotFound
    }
]