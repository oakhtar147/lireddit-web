import Navbar from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/urqlClient";
import { useGetPostsQuery } from "../generated/graphql";

function Home() {
  const [{ data }] = useGetPostsQuery();

  return (
    <>
      <Navbar />
      Hello world
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map(p => <div>{p.title}</div>)
      )}
    </>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
