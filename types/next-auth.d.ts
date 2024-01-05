import NextAuth from "next-auth"

/**
 * 
 *You need to use module augmentation, like it says in their typescript 
 *docs: https://next-auth.js.org/getting-started/typescript#module-augmentation
 *This overrides the default session values with the ones that you specify.
 * You are adding the values, but typescript doesn’t know about them.
 * 
 *  To extend/augment this type, create a types/next-auth.d.ts file in your project: */

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string,
      userId: string
    }
  }
}