---
title: "HTML5 Accessibility"
date: 2022-02-19T14:08:43-05:00
weight: 3
---

Quick checklist to cover most use cases.

## 1. Use named element tags instead of `<div>`.

These tags are more descriptive than `<div>`.

`<header>`
`<nav>`

`<main>`
`<section>`
`<article>`
`<aside>`
`<form>`
`<blockquote>`

`<caption>`
`<figure>`
`<figcaption>`

`<footer>`

For an in-depth guide, please refer to [this article on the semantic meaning of each tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element).

### 1a. Forms and Inputs

If the element functions as a button, use `<button>` (as opposed to just `<a>` or `<div>`). Buttons have inbuilt keyboard controls for focusing, selecting and clicking.

`<label for="MYName">` to assign a label to the input with the same name: `<input name="MYName">`

### 1b. Keyboard Access

`tabIndex="0"` to make an element tabbable.

`tabIndex="-1"` removes an element from default navigation; focus must be assigned with JavaScript (usually for modals or self-contained components).

Setting tabIndex to a value greater than 0 is how you manually set tab order, regardless of the document flow and tree.

```
<div tabIndex="2">Orange</div>
<div tabIndex="1">Banana</div>
<div tabIndex="3">Pear</div>
```

Even if the divs are logically ordered 2,1,3, tab access will follow Banana, Orange, Pear.


### 1c. Image attributes

`<img>` has the attributes `alt="Caption"` and `title="Title of Image Here"`

## 2. Use ARIA Attributes [(complete reference)](https://www.w3.org/TR/wai-aria-1.1/)

If you cannot use HTML tag names for some reason, or you need additional specifications, these attributes can help define the role of each tag.
`role="roletype"`

### 2a. Labels

Use `aria-label="Close"` to label the purpose of interactive elements and buttons without inner text. In this case, `"Close"` for a button that closes something.

`<Element aria-labelledby="idOfAnotherElement" />` if another element contains text that describes this element.

```
<video src="link-to-video" aria-labelledby="caption123"></video>
<p id="caption123">This video is about science</p>
```

### 2b. Validation

For fields that have an asterisk<span style="color:red;">*</span>  `aria-required="true"`

For fields which become greyed and whose attribute is set to disabled: `aria-disabled="true"`

### 2c. Dynamic content

Set `aria-live="off|polite|assertive"` for reactive content updates. See [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) for more details.

`role="alert"` assigns the `aria-live` and `aria-atomic` attributes automatically.

`aria-atomic` indicates whether the component contains nested pieces which will receive updates. If an element is set to `aria-atomic="true"`, screenreaders will read out the entire text. This is common when only changing `<span>` elements:

```
<aside aria-atomic="true" aria-live="polite">
  Status:
  <span id="updateMe">Green.</span>
</aside>
```

If `updateMe`'s inner text changes, the screenreader will say the entirety of the content, "Status: Green."

Without atomicity (`aria-atmoic="false"`), if `updateMe` changes, the screen reader will only say, "Green," which is undesirable behavior in this context.


#### Test it!

1. Copy-paste the below code into an html file, such as **access.html**.

```html
<aside aria-atomic="true" aria-live="polite">
  Status:
  <span id="updateMeA">Green, no problems detected.</span>
</aside>

<aside aria-atomic="false" aria-live="polite">
  Status:
  <span id="updateMeB">Green, no problems detected.</span>
</aside>

<script>
function atomictest(){
  document.getElementById('updateMeA').innerText = 'Red, changes detected.'
}

function nonatomictest(){
  document.getElementById('updateMeB').innerText = 'Yellow, warning.'
}
</script>
```


1. Turn on screen reader for your operating system.
   - If you are running Ubuntu Linux, then the Orca screen reader comes pre-installed and can be activated by pressing **Super + Alt + S** (the [super key](https://help.ubuntu.com/stable/ubuntu-help/keyboard-key-super.html.en) depends on your keyboard's hardware manufacturer).
2. Open the file (**access.html**) in your browser.
3. Press F12 to open DevTools.
4. Go to the **Console** tab.
5. Type `atomictest()`
6. You should hear, "Status: Red, changes detected."
7. Type `nonatomictest()`
8. You should hear, "Yellow, warning." (Note that "Status" is left out of the announcement).