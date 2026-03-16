import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { DashboardLayout } from './components/layouts/dashboard_layout.tsx'
import { Home } from './features/dashboard/routes/home.tsx'
import LoginPage from './features/auth/routes/login-page.tsx'
import { AuthProvide } from './features/auth/auth-context.tsx'
import { ProtectedRoutes } from './features/auth/components/auth-guard.tsx'
import { SignUpPage } from './features/auth/routes/sign-up.tsx'
import Overview from './components/overview.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvide>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoutes />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<Home />} />
              <Route path="overview" element={<Overview />} />
            </Route>
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvide>
  </StrictMode>,
)
