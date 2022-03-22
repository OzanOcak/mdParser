import Lexer from "./lexer.js";
import { lineGrammar } from "./markdown_rules.js";

document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.querySelector("textarea[name=source]");
  textarea.addEventListener("input", (e) => {
    print(e.target.value);
  });
  print(textarea.value);
});

function print(html) {
  const output = document.querySelector("pp-output");

  output.innerText = "";
  output.appendChild(markdParse(html));
  //testLexer(html);
}

/* text and fragment are closures  */
function markdParse(html) {
  const lexer = new Lexer(html);
  console.log(lexer.file_pointer);
  console.log(lexer.remainder.length);

  function parseAttribute() {
    const attributeName = lexer.readIdentifier();
    const attribute = document.createAttribute(attributeName);

    if (lexer.elementMatched(/\s*=\s*/)) {
      let value;

      if (lexer.isMatched(/['"]/)) {
        const closingChar = lexer.read();

        value = lexer.readElementToEnd((lexer) => lexer.isMatched(closingChar));
        lexer.elementMatched(closingChar);
      } else {
        value = lexer.readElementToEnd((lexer) => lexer.isMatched(/[\s\/>]/));
      }

      attribute.value = value;
    }

    return attribute;
  }

  function parseElement(el) {
    let tillRead = el.tillRead;
    let htmlTag = el.htmlTag;

    const mdElements = lexer.readElementToEnd((lexer) =>
      lexer.isMatched(tillRead)
    ); //regex or element
    console.log(mdElements);

    const htmlTagName = document.createElement(htmlTag); // tag =h1
    //lexer.elementMatched("#");
    htmlTagName.innerText = mdElements;
    return document.body.appendChild(htmlTagName); //  tegName= header1
  }

  function parseContent() {
    let text = "";
    let el;
    const fragment = document.createDocumentFragment();

    function flushText() {
      console.log("flushed......\n" + text);
      //let b = /\*\*\w+\*\*/;
      // if (text.match(b)) {

      // }
      //let word = /\w+/;
      if (text.length) {
        const p = document.createElement("p");

        const textNode = document.createTextNode(text);
        //const className = document.createAttribute("class");

        p.appendChild(textNode);
        fragment.appendChild(p);
        console.log("hayde.........");
        const pItems = document.querySelectorAll("#html-output p");
        pItems.forEach((p) => console.log(p.textContent));
        Array.from(pItems).map((items) => {
          items.className = "texty";
          return items;
        });
        console.log(pItems);

        /*
        pItems.forEach((items) => {
          items.className = "texty";
        });
        */
        //className.value = "paragraph";
        //document.getElementsByTagName("p")[0].setAttribute(className);

        //fragment.appendChild(p);

        //strongParagraph();
        console.log("here it is........");
        console.log(
          document.getElementsByName("output")[0].getElementsByTagName("p")[0]
          //.innerHTML()
        );
        console.log("this is obvious........");
        //let q = document.getElementById("output").children.console.log(q);
        console.log(document.childNodes[1].childNodes[1]);
        console.log("it is by tag name");
        console.log(document.getElementsByTagName("p").childNodes);

        strongParagraph();

        text = "";
      }
    }

    function strongParagraph(b) {
      const bs = /\*\*\w+\*\*/;
      const word = /\w+/;

      // document.getElementsByTagName("p").createAttribute("class");
      // className.value = "paragraph";
      // document.getElementsByTagName("p")[1].setAttribute(className);

      // b.match(word);
      if (text.match(bs)) {
        let withAsterix = text.match(bs).toString();
        console.log("withAsterix" + withAsterix);
        let withoutAsterix = text.match(bs).toString().match(word);
        console.log("withoutAsterix" + withoutAsterix);
        console.log("in strong : " + text);
        //text.replace(withAsterix, `<strong>${withoutAsterix}</strong>`);
        document
          .querySelector("pp-output")
          .innerHTML.replace(withAsterix, `<strong>${withoutAsterix}</strong>`);
      }
      /*
      let replaceStrong = document
        .getElementById("text")
        .innerHTML.replace(withAsterix, `<strong>${withoutAsterix}</strong>`);
      document.getElementById("text").innerText = replaceStrong;
      */
      // }
      //const strong = document.createElement("strong");
      // let strongtextnode = document.createTextNode(withoutAsterix);
      //let s = strong.appendChild(strongtextnode);
      //let strong = text;
      //p.appendChild(strong);
    }

    while (!lexer.eof) {
      if (
        //  !lexer.isMatched(lineGrammar.H6.tillRead) &&
        lexer.elementMatched(lineGrammar.H6.markdownElement)
      ) {
        elementAppend(lineGrammar.H6);
      } else if (lexer.elementMatched(lineGrammar.H5.markdownElement)) {
        elementAppend(lineGrammar.H5);
      } else if (lexer.elementMatched(lineGrammar.H4.markdownElement)) {
        elementAppend(lineGrammar.H4);
      } else if (lexer.elementMatched(lineGrammar.H3.markdownElement)) {
        elementAppend(lineGrammar.H3);
      } else if (lexer.elementMatched(lineGrammar.H2.markdownElement)) {
        elementAppend(lineGrammar.H2);
      } else if (lexer.elementMatched(lineGrammar.H1.markdownElement)) {
        elementAppend(lineGrammar.H1);
      } else if (lexer.elementMatched(lineGrammar.BACKTICK3.markdownElement)) {
        elementAppend(lineGrammar.BACKTICK3);
      } else if (lexer.elementMatched(lineGrammar.BACKTICK.markdownElement)) {
        elementAppend(lineGrammar.BACKTICK); //`s?.*s?`;
      } /*else if (lexer.elementMatched(lineGrammar.Bold.markdownElement)) {
        text += lexer.read();
      } */ else {
        //lexer.elementMatched(lineGrammar.P.markdownElement);
        text += lexer.read(); //put in a p and go back p with  /**
      }
    }

    function elementAppend(el) {
      flushText();
      fragment.appendChild(parseElement(el));
    }
    // console.log(fragment);
    flushText();
    // console.log(fragment);
    return fragment;
  }

  return parseContent();
}
