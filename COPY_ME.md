Before we start, i'd love to get a sense of what everyone's comfort level with React is. So if you've never done any
react coding before joining MainStreet, throw up a "NO" emoji on zoom, and if you have done react before mainstreet, put
up a "YES emoji"

# Add to DOM

```javascript
const div = document.createElement('div');
```

```javascript
const divText = document.createTextNode('For people who like Bob');
```

```javascript
div.appendChild(divText);
```

```javascript
document.getElementById('app').appendChild(div);
```

# Feed - Simple fetch

Hardcoded example:

```tsx
      <ImageCard imageInfo="2utcevwaiRJG.jpg"/>
```

# Use useState

Next, retrieve latest image.
- can we make the render function async?

    _[ Q: Who thinks this will work? ]_
- can we use a global variable?

    _[ Q: What is the bug? ]_
- use a use state!

```tsx
  const [image, setImage] = useState<ImageInfo | null>(null);

  server.retrieveImage().then((retrieved) => {
    setImage(retrieved);
  })
```

_[ Q: Where is the bug? ]_


# Add a useEffect
```typescript
  useEffect(() => {
    server.retrieveImage().then((retrieved) => {
      setImage(retrieved);
    });
  }, []);
```

_[ Q: (before adding dependency array) Where is the bug? ]_

# Highlight Bob's favorites
Add to useEffect - download Bob's favorites

_[ Q: How to add a variable that depends on both? ]_

Show how to use multiple state changes - add a logger showing values on each re-render

# Load latest
Show how to subscribe to updates
- Add on update logger

_[ Q: Where is the bug? ]_

# Show how to unsubscribe
- add a logger to show when its called

# Make it be an array
- Show how setState can take in a function, not just a variable

# IF TIME - show how to add an animation, and why keys are important


