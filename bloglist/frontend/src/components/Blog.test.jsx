import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import h from "../utils/Component_test_helper";
import queries from "../utils/Component_test_queries";

import Blog from "./Blog";

let blog = {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 18,
  user: {
    username: "alekarhis",
  },
};

const showDetails = async (user) => {
  const showDetails = h.get("show-details");
  await user.click(showDetails);
};

h.setup(queries.blog(blog));

describe("user owns blog", () => {
  const userProp = {
    username: "alekarhis",
  };

  const element = <Blog blog={blog} user={userProp} />;

  beforeEach(() => {
    render(element);
  });

  test("default > render collapsed", () => {
    const title = h.get("title");
    const link = h.get("link");
    const author = h.get("author");
    const showDetails = h.get("show-details");

    const likes = h.query("likes");
    const username = h.query("username");
    const remove = h.query("remove");

    expect(likes).toBeNull();
    expect(username).toBeNull();
    expect(remove).toBeNull();
  });

  test("click show details > render details", async () => {
    const user = userEvent.setup();
    await showDetails(user);

    const likes = h.get("likes");
    expect(likes.innerHTML).toContain(blog.likes.toString());
    const username = h.get("username");
  });

  test("click show details > render delete button", async () => {
    const user = userEvent.setup();
    await showDetails(user);

    const remove = h.get("remove");
  });
});

describe("click show details > user does not own blog", () => {
  const userProp = {
    username: "arnauserra",
  };

  const mockFunction = jest.fn();
  const element = (
    <Blog blog={blog} user={userProp} updateBlog={mockFunction} />
  );

  let user;

  beforeEach(async () => {
    user = userEvent.setup();
    render(element);
    await showDetails(user);
  });

  test("render delete button", async () => {
    const remove = h.query("remove");
    expect(remove).toBeNull();
  });

  test("click like x2 > call update x2", async () => {
    const likeButton = h.get("like-button");

    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockFunction.mock.calls).toHaveLength(2);
  });
});
