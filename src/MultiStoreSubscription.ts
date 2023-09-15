import { forceUpdate, getRenderingRef } from '@stencil/core';
import { Store } from "nanostores";

/**
 * A subscription that subscribes a Stencil Component to several `nanostores` atoms and updates the host element when any of the atoms changes.
 *
 * @example
 * ```ts
 * import { Component } from '@stencil/core';
 * import { atom } from 'nanostores';
 * import { MultiStoreSubscription } from '@gls/nanostores-stencil';
 *
 * const count1 = atom(0);
 * const count2 = atom(0);
 *  
 * @Component({
 *  tag: 'my-element',
 *   // additional options
 * })
 * class MyElement {
 * 
 * private countsSubscription = new MultiStoreSubscription(this, [count1, count2]);
 * 
 *  render() {
 *   const [$count1, $count2] = countsSubscription.values;
 *   return html\`Count 1: \${count1}\, Count 2: \${count2}\`;
 *  }
 * }
 * ```
 */
export class MultiStoreSubscription<
  TAtoms extends [] | ReadonlyArray<Store<unknown>>
>
{
  private unsubscribes: (() => void)[] = [];

  constructor(private hostElement: object, private atoms: TAtoms) {
    if (typeof getRenderingRef !== 'function') {
      console.warn("You are not in a stencil project. UseStores will do nothing.");
      return;
    }

    this.unsubscribes = atoms.map((atom) => {
      return atom.subscribe(() => {
        forceUpdate(hostElement);
      })
    }
    );
  }

  destructor() {
    this.unsubscribes.forEach((unsubscribe) => unsubscribe());
 }

  /**
   * The current values of the atoms.
   * @readonly
   */
  get values(): {
    [K in keyof TAtoms]: ReturnType<TAtoms[K]["get"]>;
  } {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.atoms.map(<T>(atom: Store<T>) => atom.get()) as any;
  }
}
