---
sidebar_position: 6
title: Live Coding Example Page
description: How to implement a live coding example page in Docusaurus.
---

## Live Coding Example with React in Docusaurus

This page demonstrates how to implement a live coding example in Docusaurus using React.

```jsx live
function ExampleLive(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <button onClick={() => setCount(count - 1)}>Subtract</button>
    </div>
  );
}
```
