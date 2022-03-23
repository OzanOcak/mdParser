# mdParser (in development)

I initially aimed to develop a markup to html parser with minimalist lexer analysing and parsing approach.

`const fragment = document.createDocumentFragment();`

createDocumentFragment method is used to handling dom manipulation. I disregard performance and security. There are only some of mark up grammar implemented so far.

![](screenshot.png =100x20)

To run the project
`npm run dev`

control+C to exit,
for unclosed deammon process on localhost (mac only)

```console
    sudo lsof -i :3000
    kill -9 <PID>
```
