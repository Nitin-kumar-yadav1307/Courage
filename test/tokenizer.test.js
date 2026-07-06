const {tokenize} = require('../src/html-tokenizer.js');
const html = `<div class="post">
  <h3 class="user">@Nitin</h3>
  <h4 class="content">i love coding</h4>
  <br>
  <a href="/posts/61a7f948-6a46-456c-812a-c850e98e6004">See details</a>
  <a href="/posts/61a7f948-6a46-456c-812a-c850e98e6004/edit">Edit</a>
  <form method="post"   action="/posts/61a7f948-6a46-456c-812a-c850e98e6004?_method=DELETE">
    <button>DELETE</button>
  </form>
</div>`;
console.log(JSON.stringify(tokenize(html), null, 2));