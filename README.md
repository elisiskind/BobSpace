# BobSpace

This is a simple project to teach React! To run BobSpace, use `yarn start`.

# Part 1 - How does the DOM work?

Run the project. Now we are going to add a subtitle to our screen manually, using javascript. Enter the following in the
chrome console:

```javascript
const div = document.createElement('div');
const divText = document.createTextNode('For people who like Bob');
div.appendChild(divText);
document.getElementById('app').appendChild(div);
```

This is actually very similar to what React is doing, except that it also keeps track of state for us as well. The magic
of React and other frontend frameworks is that the source of truth for project state is no longer the DOM - React keeps
a copy of your entire element tree and all the state that it needs to display it correctly, and rerenders each relevant
part if any of the state it depends on changes.

# Part 2 - Manipulating state in our React App

As you go through the tutorial, you can use the provided loggers to see what happens and in what order. I recommend
adding a log at the top of each render function so you can see every time the component is rerendered. If you put this
log after the useState declarations, you can even log the values of each state for each render.

If you want to slow things down, you can initialize server with slow mode in `api.ts`:

```typescript
export const server = new Server({ slowMode: true });
```

### 1. Hardcoded image

Delete the code in index.html and replace it with the commented out code. This is the app we can play around with: a
simple empty page with a nav bar that allows the user to navigate to Feed or Messaging, and display the corresponding
component.

Let's start off by editing Feed.tsx. First let's just add a hardcoded image:

```tsx
import { ImageCard } from '../../components/image-card/ImageCard';
// ...
return <div className="feed">
  <ImageCard imageInfo="2utcevwaiRJG.jpg" />
</div>
```

### 2. Add a useState

Instead of hardcoding an image, we can download it when the page renders:

```typescript
import { server } from '../../api/api';
```

...

```tsx
const [image, setImage] = useState<ImageInfo | null>(null);

server.retrieveImage().then((retrieved) => {
  setImage(retrieved);
})
```

Unfortunately, this will cause an infinite loop, as `retrieveImage` will be called every time the component renders, and
every time it will call `setImage`, which will then trigger a rerender, forever.

### 3. Add a useEffect

Instead of calling `retrieveImage()` directly in our function body, call it in a `useEffect()` function instead. If we
pass an empty dependency array to `useEffect`, it will only be called the first time this component is rendered.

```typescript
useEffect(() => {
  server.retrieveImage().then((retrieved) => {
    setImage(retrieved);
  });
}, []);
```

# Highlight Bob's favorites

Try loading Bob's favorites using the server API call:

```typescript
server.retrieveBobsFavorites()
```

Compare the url of the image you load to the list of Bob's favorite urls. If it is in the list, you can highlight it
using the `favorite=true` parameter accepted by `ImageCard`.

Make sure that the image is only rendered once both the favorite list and the url are retrieved from the server. Can you
do it with just two calls to `useState` in your component?

### 4. Subscribe to updates

You can also subscribe to updates using `server.subscribeToImageUpdates()`. Pass in a function you want to be called
every time a new image is available. That function can either set the image, or, if you replace the single image object
with an array of images, prepend to the array so that you end up with a live feed.

In order to enable updates on the server side, edit `api.ts` to instantiate the server with scheduled uploads enabled:

```typescript
export const server = new Server({scheduleUploads: true});
```

Note that if you switch to the other route (Messages) and back, a new subscription is created each time but the old one
is never closed. To close it, add a return statement to your useEffect that returns a function that
calls `server.unsubscribeFromImageUpdates()`.

### 5. Use useEffect for an animation

If you have an array of images for your feed, you can make the newest one appear by expanding. To do this,
edit `ImageCard.tsx`. Add a new call to `useState` to create a new state representing whether the component should be
displayed as hidden:

```tsx
const [hidden, setHidden] = useState<boolean>(true);
```

It starts off true, because when you initially render the component, it should be collapsed.

Next, add a `useEffect` function that has an empty dependency array, and sets the hidden state to false. Now add some
code to add a new css class to the root image card div. If the component is hidden, `image-card--hidden` should be
appended. Make sure you add a space between it and the other classes too.

In order for this to work, you must have unique keys for each item in your array of `<ImageCard>` components
in `Feed.tsx`. An easy way to do this is:`

```tsx
<ImageCard imageInfo={image} key={JSON.stringify(image)}/>
```
