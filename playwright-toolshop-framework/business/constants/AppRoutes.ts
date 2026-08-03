/** Paths of the tested application, relative to the configured base URL. */
export const AppRoutes = {
  catalog: '/',
  login: 'auth/login',
  register: 'auth/register',
  /** The application serves the cart and all checkout steps under the same path. */
  checkout: 'checkout',
} as const;
