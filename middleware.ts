export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/clientes/:path*', '/configuracion/:path*', '/diseno/:path*', '/estadisticas/:path*', '/marketing/:path*', '/mensajes/:path*', '/notificaciones/:path*', '/productos/:path*', '/ventas/:path*', '/']
}