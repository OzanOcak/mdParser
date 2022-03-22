class Lexer {
  constructor(text) {
    this.text = text;
    this.file_pointer = 0;
  }
  read() {
    return this.file_pointer < 0 || this.file_pointer >= this.text.length
      ? undefined
      : this.text[this.file_pointer++];
  }
  rewind() {
    this.file_pointer = 0;
  }
  isMatched(token) {
    return this.remainder.search(token) === 0;
  }
  elementMatched(token) {
    const matchedToken = this.remainder.match(token);
    if (matchedToken && matchedToken.length && matchedToken.index == 0) {
      console.log(matchedToken);
      console.log(matchedToken[0]);
      this.file_pointer += matchedToken[0].length;
      console.log(this.file_pointer);
      return true;
    }
    return false;
  }
  //let condition = /^my/i;
  //let whateverString = "My test String";
  //

  readWithRules(condition) {
    let result = condition.test(this);
    if (result === true) {
      console.log(pattern, "pattern matched!");
    } else {
      console.log(pattern, "pattern did NOT match!");
    }
  }
  //read so far elements
  readElementToEnd(condition) {
    const start_pointer = this.file_pointer;
    while (!this.eof && !condition(this)) {
      this.file_pointer++;
    }
    return this.text.substring(start_pointer, this.file_pointer);
  }

  findBlockQuote(condition) {
    let x = this.readElementToEnd((lexer) => lexer.isMatched(condition));
    console.log(x);
    return x;
  }

  readIdentifier() {
    let x = this.readElementToEnd((lexer) => !lexer.isMatched(/\w/));
    console.log("identifier" + x);
    return x;
  }
  skipWhitespace() {
    return this.readElementToEnd((lexer) => !lexer.isMatched(/\s/));
  }

  get eof() {
    return this.file_pointer >= this.text.length;
  }
  get remainder() {
    return this.text.substring(this.file_pointer);
  }
}

export default Lexer;
