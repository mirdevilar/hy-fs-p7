import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import h from "../utils/Component_test_helper";
import queries from "../utils/Component_test_queries";

import CreateForm from "./CreateForm";

h.setup(queries.createForm());

test("click submit > createBlog() called with correct parameters", async () => {
  const input = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  };

  const mockFunction = jest.fn();

  render(<CreateForm createBlog={mockFunction} />);

  const user = userEvent.setup();

  const title = h.get("title");
  const author = h.get("author");
  const url = h.get("url");
  const submit = h.get("submit");

  await user.type(title, input.title);
  await user.type(author, input.author);
  await user.type(url, input.url);
  await user.click(submit);

  const sentObject = mockFunction.mock.calls[0][0];
  expect(sentObject.title).toBe(input.title);
  expect(sentObject.author).toBe(input.author);
  expect(sentObject.url).toBe(input.url);
});
