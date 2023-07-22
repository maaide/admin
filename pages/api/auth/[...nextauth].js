import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from '../../../database/db'
import ShopLogin from '../../../models/ShopLogin'
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Contraseña', type: 'password', placeholder: '******' }
      },
      async authorize(credentials, req) {
        connectDB()

        const shopFound = await ShopLogin.findOne({ email: credentials.email }).select('+password')
        if (!shopFound) throw new Error('Credenciales invalidas')

        const passwordMatch = await bcrypt.compare(credentials.password, shopFound.password)
        if (!passwordMatch) throw new Error('Credenciales invalidas')

        return { email: shopFound.email, _id: shopFound._id }
      }
    })
  ],
  callback: {
    jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    session({ session, token }) {
      session.user = token.user
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}

export default NextAuth(authOptions)