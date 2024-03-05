import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";

import blogsService from "../services/blogsService";

const BlogsContext = createContext();

export const BlogsContextProvider = (props) => {
  const { data: blogs, ...query } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogsService.getAll,
  });

  return (
    <BlogsContext.Provider value={{ query, blogs }}>
      {props.children}
    </BlogsContext.Provider>
  );
};

export default BlogsContext;
