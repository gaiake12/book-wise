import NextAuth from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import GitHubProvier, { GithubProfile } from 'next-auth/providers/github'
import { PrismaAdapter } from '@/lib/auth/prisma-adapter'

export const authOptions = {
  adapter: PrismaAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          avatar_url: profile.picture,
        }
      },
    }),

    GitHubProvier({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      profile(profile: GithubProfile) {
        return {
          id: String(profile.id),
          avatar_url: profile.avatar_url,
          name: profile.name ?? '',
          email: profile.email ?? '',
        }
      },
    }),
  ],
}

export default NextAuth(authOptions)
