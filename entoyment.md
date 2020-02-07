# Entoyment

## Reveals
### Jenga
JS:
```
init('jenga-reveal');
```
HTML:
```
<section class="jenga-reveal top"> 
  <h2>Header of this Section</h2>
  <div class="outer">
    U can style the outer "cover" as anything you want, or not have it at all
  </div>
  <div class="inner">
    Stuff to be revealed
  </div>
</section>
```

`<section class="jenga-reveal right">`
Can have top|bottom|left|right as a starting position for the handle. Defaults to left if no position is provided.

### Underline

For a simple decorative underline:
```

<section class="underline"></div>
```

To make a reveal:

JS:
```
init('underline-reveal');
```
Since underline presumes you have a header or some text to underline,
if you create an `.underline-reveal` section, the header inside will be relocated outside of the section but accessibly linked

HTML:
```

<section class="underline-reveal">
  <h2>Header</h2>
  HTML and content here
</section>
```

`<section class="underline-reveal auto">`
Will add an automatic reveal when in the top 50% of the viewport. Customizable options later?
