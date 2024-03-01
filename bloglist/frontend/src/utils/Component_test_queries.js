const blog = (blog) => (
  {
    'title': ['text', blog.title, { exact: false }],
    'link': ['role', 'link', { href: blog.url }],
    'author': ['text', blog.author, { exact: false }],
    'show-details': ['role', 'button', { name: /show/i, exact: false }],

    'likes': ['testid'],
    'like-button': ['role', 'button', { name: /like/i }],
    'username': ['text', blog.user.username, { exact: false }],
    'remove': ['role', 'button', { name: /delete/i, exact: false }],
    'hide-details': ['role', 'button', { name: /hide/i, exact: false }],
  }
)

const createForm = () => (
  {
    'title': ['role', 'textbox', { name: 'title' }],
    'author': ['role', 'textbox', { name: 'author' }],
    'url': ['role', 'textbox', { name: 'url' }],
    'submit': ['role', 'button', { name: /submit/i }],
  }
)

export default { blog, createForm }