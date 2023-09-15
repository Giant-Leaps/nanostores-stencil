import { forceUpdate, getRenderingRef } from "@stencil/core";
import { Store } from "nanostores";
import { MultiStoreSubscription } from "./MultiStoreSubscription";

/**
 * A subscription that subscribes a Stencil Component to several `nanostores` atoms and updates the host element when any of the atoms changes.
 *
 * @example
 * ```ts
 * import { Component } from '@stencil/core';
 * import { atom } from 'nanostores';
 * import { StoreSubscription } from '@giant-leaps/nanostores-stencil';
 *
 * const count = atom(0);
 *
 * @Component({
 *  tag: 'my-element',
 *   // additional options
 * })
 * class MyElement {
 *
 * private countSubscription = new StoreSubscription(this, count);
 *
 *  render() {
 *   return html\`Count: \${countSubscription.value}\`;
 *  }
 * }
 * ```
 */
export class StoreSubscription<AtomType> extends MultiStoreSubscription<
  ReadonlyArray<Store<unknown>>
> {
  constructor(hostElement: object, atom: Store<AtomType>) {
    super(hostElement, [atom]);
  }

  /**
   * The current value of the atom.
   * @readonly
   */
  get value(): AtomType {
    return super.values[0] as AtomType;
  }
}
