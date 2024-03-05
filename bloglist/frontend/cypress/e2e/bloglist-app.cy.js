describe("BLOG APP", function () {
  beforeEach(function () {
    cy.request("POST", "testing/reset");
    cy.visit("http://localhost:5173");
  });

  it("login form is shown", function () {
    cy.get("form").contains("button", /log in/i);
  });

  describe("LOGIN", function () {
    const correctCredentials = {
      username: "alekarhis",
      password: "porkkana",
    };

    beforeEach(function () {
      cy.request("POST", "users", correctCredentials);
    });

    it("correct credentials >> successful login", function () {
      const form = cy.get("form").contains("button", /log in/i);

      form.get('input[name="username"]').type("alekarhis");
      form.get('input[type="password"]').type("porkkana");
      form.get('button[type="submit"]').click();

      form.should("not.exist");
      cy.contains(`Logged in as ${correctCredentials.username}`);
    });

    it("incorrect credentials >> fail login", function () {
      const form = cy.get("form").contains("button", /log in/i);

      form.get('input[name="username"]').type("alekarhis");
      form.get('input[type="password"]').type("orxata");
      form.get('button[type="submit"]').click();

      form.should("exist");
      cy.contains("Wrong credentials!");
    });
  });

  describe("WHEN LOGGED IN", function () {
    const mainUser = {
      username: "alekarhis",
      password: "porkkana",
    };

    beforeEach(function () {
      cy.request("POST", "users", mainUser);
      cy.request("POST", "login", mainUser).then(function (res) {
        localStorage.setItem("user", JSON.stringify(res.body));
        cy.visit("http://localhost:5173");
      });
    });

    it("can open create new form", function () {
      cy.get('button:contains("+ New")').click();
      cy.get("form").contains("label", /author/i);
    });

    it("can create new blog", function () {
      cy.get('button:contains("+ New")').click();
      cy.contains("label", /author/i)
        .parent()
        .as("form");
      const testBlog = {
        title: "Go to statement considered harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider…",
      };

      cy.get("@form").contains("label", /title/i).next("input").as("title");
      cy.get("@form")
        .contains("label", /author/i)
        .next("input")
        .as("author");
      cy.get("@form").contains("label", /url/i).next("input").as("url");

      cy.get("@title").type(testBlog.title);
      cy.get("@author").type(testBlog.author);
      cy.get("@url").type(testBlog.url);
      cy.get('button[type="submit"]').click();

      cy.get('a:contains("Go to statement considered harmful")').should(
        "exist",
      );
    });

    describe("BLOGLIST POPULATED", function () {
      const blogs = [
        {
          title: "Go to statement considered harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider…",
        },
        {
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 8,
        },
        {
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 5,
        },
        {
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 3,
        },
      ];

      beforeEach(function () {
        blogs.forEach(function (blog) {
          cy.createBlog(blog);
        });
        cy.visit("http://localhost:5173");
      });

      it("can like blog", function () {
        cy.get('p:contains("TDD harms architecture")').parent().as("blog");
        cy.get("@blog").find('button:contains("show")').click();
        cy.get("@blog").find('button:contains("Like")').as("likeButton");
        cy.get("@likeButton").click();
        cy.get("@likeButton").parent().should("contain", "6");
      });

      it.only("blogs in like order", function () {
        cy.get('button:contains("show")').parent().as("blog");
        cy.get("@blog").eq(0).should("contain", "First class tests");
        cy.get("@blog")
          .eq(3)
          .should("contain", "Go to statement considered harmful");
      });

      it("can delete own blog", function () {
        cy.get('p:contains("TDD harms architecture")').parent().as("blog");
        cy.get("@blog").find('button:contains("show")').click();
        cy.get("@blog").find('button:contains("Delete")').click();
        cy.get('p:contains("TDD harms architecture")').should("not.exist");
      });

      it("wrong user cannot see delete button on other users blogs", function () {
        const unauthorizedUser = {
          username: "arnauserra",
          password: "peruna",
        };
        cy.request("POST", "users", unauthorizedUser);
        cy.request("POST", "login", unauthorizedUser).then(function (res) {
          localStorage.setItem("user", JSON.stringify(res.body));
          cy.visit("http://localhost:5173");
        });
        cy.get('p:contains("TDD harms architecture")').parent().as("blog");
        cy.get("@blog").find('button:contains("show")').click();
        cy.get("@blog").find('button:contains("Delete")').should("not.exist");
      });
    });
  });
});
