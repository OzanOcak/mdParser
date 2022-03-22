const lineGrammar = {
  H1: {
    htmlTag: "h1",
    tillRead: /$/m,
    markdownElement: "#",
  },
  H2: {
    htmlTag: "h2",
    tillRead: /$/m,
    markdownElement: /##/,
  },
  H3: {
    htmlTag: "h3",
    tillRead: /$/m,
    markdownElement: "###",
  },
  H4: {
    htmlTag: "h4",
    tillRead: /$/m,
    markdownElement: "####",
  },
  H5: {
    htmlTag: "h5",
    tillRead: /$/m,
    markdownElement: "#####",
  },
  H6: {
    htmlTag: "h6",
    tillRead: /$/m,
    markdownElement: "######",
  },
  BACKTICK: {
    htmlTag: "code",
    tillRead: /`$/,
    markdownElement: /^`/, //  `s?.*s?`
  },
  BACKTICK3: {
    htmlTag: "code",
    tillRead: /```$/m,
    markdownElement: /^```/,
  },
  BLOCKQUOTE: {
    htmlTag: "blockquote",
    tillRead: /\*\*$/m,
    markdownElement: /^>/,
  },
  TD: {
    htmlTag: "table",
    tillRead: /|/m,
    markdownElement: "td",
  },
  /*
  Bold: {
    htmlTag: "b",
    tillRead: /\*\*s$/m,
    markdownElement: /^\*\*/
  //},
  /* H2: {
    htmlTag: "h2",
    tillRead: /$/m,
    markdownElement: "##",
  },
  H3: {
    htmlTag: "h3",
    tillRead: /$/m,
    markdownElement: "###",
  },
  H4: {
    htmlTag: "h4",
    tillRead: /$/m,
    markdownElement: "#",
  },
  H5: {
    htmlTag: "h5",
    tillRead: /$/m,
    markdownElement: "##",
  },
  H6: {
    htmlTag: "h6",
    tillRead: /$/m,
    markdownElement: "###",
  }, */
};

export { lineGrammar };
