import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import KeyCloakProvider from 'next-auth/providers/keycloak'

export const options: NextAuthOptions = {
    providers: [
        
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = { id: "42", name: "Dave", password: "nextauth" }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        }),
        KeyCloakProvider({
            clientId: "gui",
            clientSecret: "aOaJHKT1Cxnew0TYYWCqHlBpF2RIZvD8",
            issuer: "http://localhost:8080/Realms/nik_enterprise_software_system",
            authorization: "http://localhost:8080/realms/nik_enterprise_software_system/protocol/openid-connect/auth",
            wellKnown: "http://localhost:8080/realms/nik_enterprise_software_system/.well-known/openid-configuration"
        })
    ],
    callbacks: {

    },
    secret: "HZcAr2r4rrnJyfgrAtbEYVA/WC8QafJL7CWzQ8SyOfc="
}