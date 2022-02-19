
# Use named element tags:
`<main>`
`<header>`
`<nav>`

`<section>`
`<article>`
`<aside>`
`<form>`
`<blockquote>`

`<footer>`

`<caption>`

`<figure>`
`<figcaption>`

## Forms and Inputs
`<button>` has inbult keyboard controls

`<label for="inputName">` to assign a label for a particular input
`<input name="inputName">`

## Keyboard Access
`tabIndex="0"` to make an element tabbable

`tabIndex="-1"` removes an element from default navigation; focus must be assigned with JavaScript (usually for modals or self-contained components)

`tabIndex > "0"` manually sets the tab order despite document flow

## Native attributes
Images have attributes `alt="Caption"`

and `title="Titl of Image Here"`

# ARIA Attributes [(complete reference)](https://www.w3.org/TR/wai-aria-1.1/)

If you cannot use HTML tag names for some reason, or you need additional specifications, these attributes can help define the role of each tag.
`role="roletype"`

## Validation
Role
- "alert" will assign the aria-live and aria-atomic automatically

`aria-required="true"`

`aria-disabled="false"`

`aria-label` for invisible tags

`<Element aria-labelledby="idOfAnotherElement />` if another element contains text that describes this element

such as `<p id="idOfAnotherElement>This video is about science</p>`


## Dynamic content
`aria-live="off|polite|assertive"` for reactive content updates

`aria-atomic="true"` reads out the whole section and not just the updates
