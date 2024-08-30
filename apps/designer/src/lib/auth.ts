import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update') {
                return { ...token, user: { ...session.user } };
            }

            if (user) {
                console.log('FOUND JWT USER:::', user)
                // @ts-ignore
                token.user = user?.user;
                // @ts-ignore
                token.token = user?.token;
            }

            return token;
        },
        session({ session, token }) {
            //@ts-ignore
            session.user = token.user;
            //@ts-ignore
            session.token = token.token;
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            name: "Email and Password",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log('I GOT AUTH:::', credentials)
                const { email, password } = credentials as { email: string, password: string};
                const user = { id: "1", name: "Admin", email };
                return user;
            },
        }),
    ],
};

const getSession = () => getServerSession(authOptions)
export { authOptions, getSession }
