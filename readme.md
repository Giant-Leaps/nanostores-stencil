# Nano Stores Stencil

<div align=center style="display: grid; grid-auto-flow: column; justify-content: center; align-items: center;">
<img width="92" title="Nano Stores logo"
     src="https://nanostores.github.io/nanostores/logo.svg" />
     <span style="padding:20; font-size: 50">+</span>
<img width="92" title="Stencil JS logo" src="https://raw.githubusercontent.com/ionic-team/stencil/main/stencil-logo.png" />
</div>

**[Stencil]** integration for **[Nano Stores]**, a tiny state manager
with many atomic tree-shakable stores.

- **Small.** Less than 1 KB. Zero dependencies.
- **Fast.** With small atomic and derived stores, you do not need to call
  the selector function for all components on every store change.
- **Tree Shakable.** The chunk contains only stores used by components
  in the chunk.
- Was designed to move logic from components to stores.
- It has good **TypeScript** support.

## Quick start

Install it using one of the following commands:

### npm

```bash
npm add nanostores @gls/nanostores-stencil
```

### bun

```bash
bun add nanostores @gls/nanostores-stencil
```

### pnpm

```bash
pnpm add nanostores @gls/nanostores-stencil
```

### yarn

```bash
yarn add nanostores @gls/nanostores-stencil
```

Use it as a decorator with `@useStores`:

```ts
 import { Component } from '@stencil/core';
 import { atom } from 'nanostores';
 import { MultiStoreSubscription } from '@gls/nanostores-stencil';
 
 const count1 = atom(0);
 const count2 = atom(0);
   
 @Component({
   tag: 'my-element',
    // additional options
  })
  class MyElement {
  
  private countsSubscription = new MultiStoreSubscription(this, [count1, count2]);
 
  render() {
   const [$count1, $count2] = countsSubscription.values;
   return html\`Count 1: \${count1}\, Count 2: \${count2}\`;
  }
 }

```

[Nano Stores]: https://github.com/nanostores/nanostores/
[Stencil]: (https://stenciljs.com/)