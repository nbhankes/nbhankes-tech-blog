/* INSERT MARKDOWN POST HERE */
export const post = `
# Responsive Sizing With rem CSS Units

By using rem CSS units, components will change size when the root font size changes, giving developers another method of responsive design.

The CSS unit "rem" stands for "root em." The scale of a rem is dependent on the root html font size. While most browsers default the html font size at 16px (meaning 1 rem = 16 pixels), we can adjust the root font size in order to achieve our desired outcome.

#####Study the CodePen example below as the JavaScript function cycles through root font sizes ranging between 12px and 28px.


<iframe height="400" style="width: 100%;" scrolling="no" title="Responsive Container and Text" src="https://codepen.io/nbhankes/embed/gOpzqJN?default-tab=result%2Cresult" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/nbhankes/pen/gOpzqJN">
  Responsive Container and Text</a> by Nate Hankes (<a href="https://codepen.io/nbhankes">@nbhankes</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


##Using @media for responsive design

By using @media to adjust the html font-size, you can design responsive components without worrying about how they will behave as they shrink and expand.

The example below changes the root font-size from 28px to 12px when the screen width is 600px or less. So when the screen width is 600px or less, the component in the CodePen example above would be the smallest size you see. And in a a screen larger than 600px, the component and font size will appear at the largest size you see.

\`\`\`css
html {
  	font-size: 28px;
}

@media only screen and (max-width: 600px) {
  	html {
    	font-size: 12px;
  	}
}
\`\`\`

`