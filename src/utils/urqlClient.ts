import { dedupExchange, fetchExchange } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  LoginUserMutation,
  MeQuery,
  MeDocument,
  RegisterUserMutation,
  LogoutMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterCacheUpdate";
import { createClient } from "@urql/core";
import { SSRExchange } from "next-urql";

export default function createUrqlClient() {
  return (_ssrExchange: SSRExchange) =>
    createClient({
      url: "http://localhost:5000/graphql",
      fetchOptions: {
        credentials: "include",
      },
      exchanges: [
        _ssrExchange,
        dedupExchange,
        fetchExchange,
        cacheExchange({
          updates: {
            Mutation: {
              login: (_result, args, cache, info) => {
                betterUpdateQuery<LoginUserMutation, MeQuery>(
                  cache,
                  { query: MeDocument },
                  _result,
                  (result, query) => {
                    if (result.login?.errors) {
                      return query;
                    } else {
                      return {
                        me: result.login?.user,
                      };
                    }
                  }
                );
              },
              register: (_result, args, cache, info) => {
                betterUpdateQuery<RegisterUserMutation, MeQuery>(
                  cache,
                  { query: MeDocument },
                  _result,
                  (result, query) => {
                    if (result.register?.errors) {
                      return query;
                    } else {
                      return {
                        me: result.register?.user,
                      };
                    }
                  }
                );
              },
              logout: (_result, args, cache, info) => {
                betterUpdateQuery<LogoutMutation, MeQuery>(
                  cache,
                  { query: MeDocument },
                  _result,
                  (result, query) => {
                    if (!result.logout) {
                      return query;
                    } else {
                      return {
                        me: null,
                      };
                    }
                  }
                );
              },
            },
          },
        }),
      ],
    });
}
