import { Base_Api_Url } from "../config.js/constants";

const Page = () => {
  return (
    <div>
      <h1>Environmental Variables in Next.js</h1>

      {process.env.NODE_ENV === "development" ? (
        <h2>Development mode on</h2>
      ) : (
        <h2>Production mode on</h2>
      )}

    {Base_Api_Url}
    </div>
  );
};

export default Page;