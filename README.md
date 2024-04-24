Entry interface
```ts
interface Entry {
  title: string
  description: string
  imageUrl: string
}
```

Example
```ts
const target = document.querySelector<HTMLDivElement>('#canvas-container')!
const entries: Entry[] = [
  {
    title: 'Title 1',
    description: 'Description 1',
    imageUrl: 'img/1.jpg',
  },
  {
    title: 'Title 2',
    description: 'Description 2',
    imageUrl: 'img/2.jpg',
  },
  {
    title: 'Title 3',
    description: 'Description 3',
    imageUrl: 'img/3.jpg',
  },
]
// Create new WebGLGallery instance.
// Will create canvas inside target element and start rendering.
new WebGLGallery(target, entries)
```
