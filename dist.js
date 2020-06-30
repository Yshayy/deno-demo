// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

/**
 *  RxJS - Deno Version 2020

    This product is a modified by DenoBR
    Comunitty for add support for Deno

    This file is modified by DenoBR
 */
System.register(
  "https://deno.land/x/rxjs/src/internal/util/isFunction",
  [],
  function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function isFunction(x) {
      return typeof x === "function";
    }
    exports_1("isFunction", isFunction);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/isArray",
  [],
  function (exports_2, context_2) {
    "use strict";
    var isArray;
    var __moduleName = context_2 && context_2.id;
    return {
      setters: [],
      execute: function () {
        exports_2(
          "isArray",
          isArray =
            (() =>
              Array.isArray || ((x) => x && typeof x.length === "number"))(),
        );
      },
    };
  },
);
/**
 *  RxJS - Deno Version 2020

    This product is a modified by DenoBR
    Comunitty for add support for Deno

    This file is modified by DenoBR
 */
System.register(
  "https://deno.land/x/rxjs/src/internal/util/isObject",
  [],
  function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function isObject(x) {
      return x !== null && typeof x === "object";
    }
    exports_3("isObject", isObject);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/UnsubscriptionError",
  [],
  function (exports_4, context_4) {
    "use strict";
    var UnsubscriptionErrorImpl, UnsubscriptionError;
    var __moduleName = context_4 && context_4.id;
    return {
      setters: [],
      execute: function () {
        UnsubscriptionErrorImpl = (() => {
          function UnsubscriptionErrorImpl(errors) {
            Error.call(this);
            this.message = errors
              ? `${errors.length} errors occurred during unsubscription:
${errors.map((err, i) => `${i + 1}) ${err.toString()}`).join("\n  ")}`
              : ".ts";
            this.name = "UnsubscriptionError.ts";
            this.errors = errors;
            return this;
          }
          UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
          return UnsubscriptionErrorImpl;
        })();
        /**
             * An error thrown when one or more errors have occurred during the
             * `unsubscribe` of a {@link Subscription}.
             */
        exports_4(
          "UnsubscriptionError",
          UnsubscriptionError = UnsubscriptionErrorImpl,
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/Subscription",
  [
    "https://deno.land/x/rxjs/src/internal/util/isArray",
    "https://deno.land/x/rxjs/src/internal/util/isObject",
    "https://deno.land/x/rxjs/src/internal/util/isFunction",
    "https://deno.land/x/rxjs/src/internal/util/UnsubscriptionError",
  ],
  function (exports_5, context_5) {
    "use strict";
    var isArray_ts_1,
      isObject_ts_1,
      isFunction_ts_1,
      UnsubscriptionError_ts_1,
      Subscription;
    var __moduleName = context_5 && context_5.id;
    function isSubscription(value) {
      return value &&
        typeof value.add === "function" &&
        typeof value.unsubscribe === "function";
    }
    exports_5("isSubscription", isSubscription);
    function flattenUnsubscriptionErrors(errors) {
      return errors.reduce((errs, err) =>
        errs.concat(
          (err instanceof UnsubscriptionError_ts_1.UnsubscriptionError)
            ? err.errors
            : err,
        ), []);
    }
    return {
      setters: [
        function (isArray_ts_1_1) {
          isArray_ts_1 = isArray_ts_1_1;
        },
        function (isObject_ts_1_1) {
          isObject_ts_1 = isObject_ts_1_1;
        },
        function (isFunction_ts_1_1) {
          isFunction_ts_1 = isFunction_ts_1_1;
        },
        function (UnsubscriptionError_ts_1_1) {
          UnsubscriptionError_ts_1 = UnsubscriptionError_ts_1_1;
        },
      ],
      execute: function () {
        Subscription = /** @class */ (() => {
          /**
                 * Represents a disposable resource, such as the execution of an Observable. A
                 * Subscription has one important method, `unsubscribe`, that takes no argument
                 * and just disposes the resource held by the subscription.
                 *
                 * Additionally, subscriptions may be grouped together through the `add()`
                 * method, which will attach a child Subscription to the current Subscription.
                 * When a Subscription is unsubscribed, all its children (and its grandchildren)
                 * will be unsubscribed as well.
                 *
                 * @class Subscription
                 */
          class Subscription {
            /**
                     * @param {function(): void} [unsubscribe] A function describing how to
                     * perform the disposal of resources when the `unsubscribe` method is called.
                     */
            constructor(unsubscribe) {
              /**
                         * A flag to indicate whether this Subscription has already been unsubscribed.
                         */
              this.closed = false;
              /** @internal */
              this._parentOrParents = null;
              /** @internal */
              this._subscriptions = null;
              if (unsubscribe) {
                this._unsubscribe = unsubscribe;
              }
            }
            /**
                     * Disposes the resources held by the subscription. May, for instance, cancel
                     * an ongoing Observable execution or cancel any other type of work that
                     * started when the Subscription was created.
                     * @return {void}
                     */
            unsubscribe() {
              let errors;
              if (this.closed) {
                return;
              }
              let { _parentOrParents, _unsubscribe, _subscriptions } = this;
              this.closed = true;
              this._parentOrParents = null;
              // null out _subscriptions first so any child subscriptions that attempt
              // to remove themselves from this subscription will noop
              this._subscriptions = null;
              if (_parentOrParents instanceof Subscription) {
                _parentOrParents.remove(this);
              } else if (_parentOrParents !== null) {
                for (let index = 0; index < _parentOrParents.length; ++index) {
                  const parent = _parentOrParents[index];
                  parent.remove(this);
                }
              }
              if (isFunction_ts_1.isFunction(_unsubscribe)) {
                try {
                  _unsubscribe.call(this);
                } catch (e) {
                  errors =
                    e instanceof UnsubscriptionError_ts_1.UnsubscriptionError
                      ? flattenUnsubscriptionErrors(e.errors)
                      : [e];
                }
              }
              if (isArray_ts_1.isArray(_subscriptions)) {
                let index = -1;
                let len = _subscriptions.length;
                while (++index < len) {
                  const sub = _subscriptions[index];
                  if (isObject_ts_1.isObject(sub)) {
                    try {
                      sub.unsubscribe();
                    } catch (e) {
                      errors = errors || [];
                      if (
                        e instanceof
                          UnsubscriptionError_ts_1.UnsubscriptionError
                      ) {
                        errors = errors.concat(
                          flattenUnsubscriptionErrors(e.errors),
                        );
                      } else {
                        errors.push(e);
                      }
                    }
                  }
                }
              }
              if (errors) {
                throw new UnsubscriptionError_ts_1.UnsubscriptionError(errors);
              }
            }
            /**
                     * Adds a tear down to be called during the unsubscribe() of this
                     * Subscription. Can also be used to add a child subscription.
                     *
                     * If the tear down being added is a subscription that is already
                     * unsubscribed, is the same reference `add` is being called on, or is
                     * `Subscription.EMPTY`, it will not be added.
                     *
                     * If this subscription is already in an `closed` state, the passed
                     * tear down logic will be executed immediately.
                     *
                     * When a parent subscription is unsubscribed, any child subscriptions that were added to it are also unsubscribed.
                     *
                     * @param {TeardownLogic} teardown The additional logic to execute on
                     * teardown.
                     * @return {Subscription} Returns the Subscription used or created to be
                     * added to the inner subscriptions list. This Subscription can be used with
                     * `remove()` to remove the passed teardown logic from the inner subscriptions
                     * list.
                     */
            add(teardown) {
              let subscription = teardown;
              if (!teardown) {
                return Subscription.EMPTY;
              }
              switch (typeof teardown) {
                case "function":
                  subscription = new Subscription(teardown);
                case "object":
                  if (
                    subscription === this || subscription.closed ||
                    typeof subscription.unsubscribe !== "function"
                  ) {
                    // This also covers the case where `subscription` is `Subscription.EMPTY`, which is always in `closed` state.
                    return subscription;
                  } else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                  } else if (!(subscription instanceof Subscription)) {
                    const tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                  }
                  break;
                default: {
                  throw new Error(
                    "unrecognized teardown " + teardown +
                      " added to Subscription.",
                  );
                }
              }
              // Add `this` as parent of `subscription` if that's not already the case.
              let { _parentOrParents } = subscription;
              if (_parentOrParents === null) {
                // If we don't have a parent, then set `subscription._parents` to
                // the `this`, which is the common case that we optimize for.
                subscription._parentOrParents = this;
              } else if (_parentOrParents instanceof Subscription) {
                if (_parentOrParents === this) {
                  // The `subscription` already has `this` as a parent.
                  return subscription;
                }
                // If there's already one parent, but not multiple, allocate an
                // Array to store the rest of the parent Subscriptions.
                subscription._parentOrParents = [_parentOrParents, this];
              } else if (_parentOrParents.indexOf(this) === -1) {
                // Only add `this` to the _parentOrParents list if it's not already there.
                _parentOrParents.push(this);
              } else {
                // The `subscription` already has `this` as a parent.
                return subscription;
              }
              // Optimize for the common case when adding the first subscription.
              const subscriptions = this._subscriptions;
              if (subscriptions === null) {
                this._subscriptions = [subscription];
              } else {
                subscriptions.push(subscription);
              }
              return subscription;
            }
            /**
                     * Removes a Subscription from the internal list of subscriptions that will
                     * unsubscribe during the unsubscribe process of this Subscription.
                     * @param {Subscription} subscription The subscription to remove.
                     * @return {void}
                     */
            remove(subscription) {
              const subscriptions = this._subscriptions;
              if (subscriptions) {
                const subscriptionIndex = subscriptions.indexOf(subscription);
                if (subscriptionIndex !== -1) {
                  subscriptions.splice(subscriptionIndex, 1);
                }
              }
            }
          }
          /** @nocollapse */
          Subscription.EMPTY = (function (empty) {
            empty.closed = true;
            return empty;
          }(new Subscription()));
          return Subscription;
        })();
        exports_5("Subscription", Subscription);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/types",
  [],
  function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/config",
  [],
  function (exports_7, context_7) {
    "use strict";
    var _enable_super_gross_mode_that_will_cause_bad_things, config;
    var __moduleName = context_7 && context_7.id;
    return {
      setters: [],
      execute: function () {
        _enable_super_gross_mode_that_will_cause_bad_things = false;
        /**
             * The global configuration object for RxJS, used to configure things
             * like what Promise contructor should used to create Promises
             */
        exports_7(
          "config",
          config = {
            /**
                 * The promise constructor used by default for methods such as
                 * {@link toPromise} and {@link forEach}
                 */
            Promise: undefined,
            /**
                 * If true, turns on synchronous error rethrowing, which is a deprecated behavior
                 * in v6 and higher. This behavior enables bad patterns like wrapping a subscribe
                 * call in a try/catch block. It also enables producer interference, a nasty bug
                 * where a multicast can be broken for all observers by a downstream consumer with
                 * an unhandled error. DO NOT USE THIS FLAG UNLESS IT'S NEEDED TO BY TIME
                 * FOR MIGRATION REASONS.
                 */
            set useDeprecatedSynchronousErrorHandling(value) {
              if (value) {
                const error = new Error();
                console.warn(
                  "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                    error.stack,
                );
              } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
                console.log(
                  "RxJS: Back to a better error behavior. Thank you. <3",
                );
              }
              _enable_super_gross_mode_that_will_cause_bad_things = value;
            },
            get useDeprecatedSynchronousErrorHandling() {
              return _enable_super_gross_mode_that_will_cause_bad_things;
            },
          },
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/hostReportError",
  [],
  function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    /**
     * Throws an error on another job so that it's picked up by the runtime's
     * uncaught error handling mechanism.
     * @param err the error to throw
     */
    function hostReportError(err) {
      setTimeout(() => {
        throw err;
      }, 0);
    }
    exports_8("hostReportError", hostReportError);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/Observer",
  [
    "https://deno.land/x/rxjs/src/internal/config",
    "https://deno.land/x/rxjs/src/internal/util/hostReportError",
  ],
  function (exports_9, context_9) {
    "use strict";
    var config_ts_1, hostReportError_ts_1, empty;
    var __moduleName = context_9 && context_9.id;
    return {
      setters: [
        function (config_ts_1_1) {
          config_ts_1 = config_ts_1_1;
        },
        function (hostReportError_ts_1_1) {
          hostReportError_ts_1 = hostReportError_ts_1_1;
        },
      ],
      execute: function () {
        exports_9(
          "empty",
          empty = {
            closed: true,
            next(value) {},
            error(err) {
              if (config_ts_1.config.useDeprecatedSynchronousErrorHandling) {
                throw err;
              } else {
                hostReportError_ts_1.hostReportError(err);
              }
            },
            complete() {},
          },
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/symbol/rxSubscriber",
  [],
  function (exports_10, context_10) {
    "use strict";
    var rxSubscriber, $$rxSubscriber;
    var __moduleName = context_10 && context_10.id;
    return {
      setters: [],
      execute: function () {
        /** @deprecated do not use, this is no longer checked by RxJS internals */
        exports_10(
          "rxSubscriber",
          rxSubscriber = (() =>
            typeof Symbol === "function" ? Symbol("rxSubscriber")
            : "@@rxSubscriber_" + Math.random())(),
        );
        /**
             * @deprecated use rxSubscriber instead
             */
        exports_10("$$rxSubscriber", $$rxSubscriber = rxSubscriber);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/Subscriber",
  [
    "https://deno.land/x/rxjs/src/internal/util/isFunction",
    "https://deno.land/x/rxjs/src/internal/Observer",
    "https://deno.land/x/rxjs/src/internal/Subscription",
    "https://deno.land/x/rxjs/src/internal/symbol/rxSubscriber",
    "https://deno.land/x/rxjs/src/internal/config",
    "https://deno.land/x/rxjs/src/internal/util/hostReportError",
  ],
  function (exports_11, context_11) {
    "use strict";
    var isFunction_ts_2,
      Observer_ts_1,
      Subscription_ts_1,
      rxSubscriber_ts_1,
      config_ts_2,
      hostReportError_ts_2,
      Subscriber,
      SafeSubscriber;
    var __moduleName = context_11 && context_11.id;
    return {
      setters: [
        function (isFunction_ts_2_1) {
          isFunction_ts_2 = isFunction_ts_2_1;
        },
        function (Observer_ts_1_1) {
          Observer_ts_1 = Observer_ts_1_1;
        },
        function (Subscription_ts_1_1) {
          Subscription_ts_1 = Subscription_ts_1_1;
        },
        function (rxSubscriber_ts_1_1) {
          rxSubscriber_ts_1 = rxSubscriber_ts_1_1;
        },
        function (config_ts_2_1) {
          config_ts_2 = config_ts_2_1;
        },
        function (hostReportError_ts_2_1) {
          hostReportError_ts_2 = hostReportError_ts_2_1;
        },
      ],
      execute: function () {
        /**
             * Implements the {@link Observer} interface and extends the
             * {@link Subscription} class. While the {@link Observer} is the public API for
             * consuming the values of an {@link Observable}, all Observers get converted to
             * a Subscriber, in order to provide Subscription-like capabilities such as
             * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
             * implementing operators, but it is rarely used as a public API.
             *
             * @class Subscriber<T>
             */
        Subscriber = class Subscriber extends Subscription_ts_1.Subscription {
          /**
                 * @param {Observer|function(value: T): void} [destinationOrNext] A partially
                 * defined Observer or a `next` callback function.
                 * @param {function(e: ?any): void} [error] The `error` callback of an
                 * Observer.
                 * @param {function(): void} [complete] The `complete` callback of an
                 * Observer.
                 */
          constructor(destinationOrNext, error, complete) {
            super();
            /** @internal */ this.syncErrorValue = null;
            /** @internal */ this.syncErrorThrown = false;
            /** @internal */ this.syncErrorThrowable = false;
            this.isStopped = false;
            switch (arguments.length) {
              case 0:
                this.destination = Observer_ts_1.empty;
                break;
              case 1:
                if (!destinationOrNext) {
                  this.destination = Observer_ts_1.empty;
                  break;
                }
                if (typeof destinationOrNext === "object") {
                  if (destinationOrNext instanceof Subscriber) {
                    this.syncErrorThrowable =
                      destinationOrNext.syncErrorThrowable;
                    this.destination = destinationOrNext;
                    destinationOrNext.add(this);
                  } else {
                    this.syncErrorThrowable = true;
                    this.destination = new SafeSubscriber(
                      this,
                      destinationOrNext,
                    );
                  }
                  break;
                }
              default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(
                  this,
                  destinationOrNext,
                  error,
                  complete,
                );
                break;
            }
          }
          [rxSubscriber_ts_1.rxSubscriber]() {
            return this;
          }
          /**
                 * A static factory for a Subscriber, given a (potentially partial) definition
                 * of an Observer.
                 * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
                 * @param {function(e: ?any): void} [error] The `error` callback of an
                 * Observer.
                 * @param {function(): void} [complete] The `complete` callback of an
                 * Observer.
                 * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
                 * Observer represented by the given arguments.
                 * @nocollapse
                 */
          static create(next, error, complete) {
            const subscriber = new Subscriber(next, error, complete);
            subscriber.syncErrorThrowable = false;
            return subscriber;
          }
          /**
                 * The {@link Observer} callback to receive notifications of type `next` from
                 * the Observable, with a value. The Observable may call this method 0 or more
                 * times.
                 * @param {T} [value] The `next` value.
                 * @return {void}
                 */
          next(value) {
            if (!this.isStopped) {
              this._next(value);
            }
          }
          /**
                 * The {@link Observer} callback to receive notifications of type `error` from
                 * the Observable, with an attached `Error`. Notifies the Observer that
                 * the Observable has experienced an error condition.
                 * @param {any} [err] The `error` exception.
                 * @return {void}
                 */
          error(err) {
            if (!this.isStopped) {
              this.isStopped = true;
              this._error(err);
            }
          }
          /**
                 * The {@link Observer} callback to receive a valueless notification of type
                 * `complete` from the Observable. Notifies the Observer that the Observable
                 * has finished sending push-based notifications.
                 * @return {void}
                 */
          complete() {
            if (!this.isStopped) {
              this.isStopped = true;
              this._complete();
            }
          }
          unsubscribe() {
            if (this.closed) {
              return;
            }
            this.isStopped = true;
            super.unsubscribe();
          }
          _next(value) {
            this.destination.next(value);
          }
          _error(err) {
            this.destination.error(err);
            this.unsubscribe();
          }
          _complete() {
            this.destination.complete();
            this.unsubscribe();
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _unsubscribeAndRecycle() {
            const { _parentOrParents } = this;
            this._parentOrParents = null;
            this.unsubscribe();
            this.closed = false;
            this.isStopped = false;
            this._parentOrParents = _parentOrParents;
            return this;
          }
        };
        exports_11("Subscriber", Subscriber);
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        SafeSubscriber = class SafeSubscriber extends Subscriber {
          constructor(_parentSubscriber, observerOrNext, error, complete) {
            super();
            this._parentSubscriber = _parentSubscriber;
            let next;
            let context = this;
            if (isFunction_ts_2.isFunction(observerOrNext)) {
              next = observerOrNext;
            } else if (observerOrNext) {
              next = observerOrNext.next;
              error = observerOrNext.error;
              complete = observerOrNext.complete;
              if (observerOrNext !== Observer_ts_1.empty) {
                context = Object.create(observerOrNext);
                if (Subscription_ts_1.isSubscription(observerOrNext)) {
                  observerOrNext.add(this.unsubscribe.bind(this));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
              }
            }
            this._context = context;
            this._next = next;
            this._error = error;
            this._complete = complete;
          }
          next(value) {
            if (!this.isStopped && this._next) {
              const { _parentSubscriber } = this;
              if (
                !config_ts_2.config.useDeprecatedSynchronousErrorHandling ||
                !_parentSubscriber.syncErrorThrowable
              ) {
                this.__tryOrUnsub(this._next, value);
              } else if (
                this.__tryOrSetError(_parentSubscriber, this._next, value)
              ) {
                this.unsubscribe();
              }
            }
          }
          error(err) {
            if (!this.isStopped) {
              const { _parentSubscriber } = this;
              const { useDeprecatedSynchronousErrorHandling } =
                config_ts_2.config;
              if (this._error) {
                if (
                  !useDeprecatedSynchronousErrorHandling ||
                  !_parentSubscriber.syncErrorThrowable
                ) {
                  this.__tryOrUnsub(this._error, err);
                  this.unsubscribe();
                } else {
                  this.__tryOrSetError(_parentSubscriber, this._error, err);
                  this.unsubscribe();
                }
              } else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                if (useDeprecatedSynchronousErrorHandling) {
                  throw err;
                }
                hostReportError_ts_2.hostReportError(err);
              } else {
                if (useDeprecatedSynchronousErrorHandling) {
                  _parentSubscriber.syncErrorValue = err;
                  _parentSubscriber.syncErrorThrown = true;
                } else {
                  hostReportError_ts_2.hostReportError(err);
                }
                this.unsubscribe();
              }
            }
          }
          complete() {
            if (!this.isStopped) {
              const { _parentSubscriber } = this;
              if (this._complete) {
                const wrappedComplete = () =>
                  this._complete.call(this._context);
                if (
                  !config_ts_2.config.useDeprecatedSynchronousErrorHandling ||
                  !_parentSubscriber.syncErrorThrowable
                ) {
                  this.__tryOrUnsub(wrappedComplete);
                  this.unsubscribe();
                } else {
                  this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                  this.unsubscribe();
                }
              } else {
                this.unsubscribe();
              }
            }
          }
          __tryOrUnsub(fn, value) {
            try {
              fn.call(this._context, value);
            } catch (err) {
              this.unsubscribe();
              if (config_ts_2.config.useDeprecatedSynchronousErrorHandling) {
                throw err;
              } else {
                hostReportError_ts_2.hostReportError(err);
              }
            }
          }
          __tryOrSetError(parent, fn, value) {
            if (!config_ts_2.config.useDeprecatedSynchronousErrorHandling) {
              throw new Error("bad call");
            }
            try {
              fn.call(this._context, value);
            } catch (err) {
              if (config_ts_2.config.useDeprecatedSynchronousErrorHandling) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
              } else {
                hostReportError_ts_2.hostReportError(err);
                return true;
              }
            }
            return false;
          }
          /** @internal This is an internal implementation detail, do not use. */
          _unsubscribe() {
            const { _parentSubscriber } = this;
            this._context = null;
            this._parentSubscriber = null;
            _parentSubscriber.unsubscribe();
          }
        };
        exports_11("SafeSubscriber", SafeSubscriber);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/Operator",
  [],
  function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/ObjectUnsubscribedError",
  [],
  function (exports_13, context_13) {
    "use strict";
    var ObjectUnsubscribedErrorImpl, ObjectUnsubscribedError;
    var __moduleName = context_13 && context_13.id;
    return {
      setters: [],
      execute: function () {
        ObjectUnsubscribedErrorImpl = (() => {
          function ObjectUnsubscribedErrorImpl() {
            Error.call(this);
            this.message = "object unsubscribed.ts";
            this.name = "ObjectUnsubscribedError.ts";
            return this;
          }
          ObjectUnsubscribedErrorImpl.prototype = Object.create(
            Error.prototype,
          );
          return ObjectUnsubscribedErrorImpl;
        })();
        /**
             * An error thrown when an action is invalid because the object has been
             * unsubscribed.
             *
             * @see {@link Subject}
             * @see {@link BehaviorSubject}
             *
             * @class ObjectUnsubscribedError
             */
        exports_13(
          "ObjectUnsubscribedError",
          ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl,
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/SubjectSubscription",
  ["https://deno.land/x/rxjs/src/internal/Subscription"],
  function (exports_14, context_14) {
    "use strict";
    var Subscription_ts_2, SubjectSubscription;
    var __moduleName = context_14 && context_14.id;
    return {
      setters: [
        function (Subscription_ts_2_1) {
          Subscription_ts_2 = Subscription_ts_2_1;
        },
      ],
      execute: function () {
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        SubjectSubscription = class SubjectSubscription
          extends Subscription_ts_2.Subscription {
          constructor(subject, subscriber) {
            super();
            this.subject = subject;
            this.subscriber = subscriber;
            this.closed = false;
          }
          unsubscribe() {
            if (this.closed) {
              return;
            }
            this.closed = true;
            const subject = this.subject;
            const observers = subject.observers;
            this.subject = null;
            if (
              !observers || observers.length === 0 || subject.isStopped ||
              subject.closed
            ) {
              return;
            }
            const subscriberIndex = observers.indexOf(this.subscriber);
            if (subscriberIndex !== -1) {
              observers.splice(subscriberIndex, 1);
            }
          }
        };
        exports_14("SubjectSubscription", SubjectSubscription);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/Subject",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/Subscription",
    "https://deno.land/x/rxjs/src/internal/util/ObjectUnsubscribedError",
    "https://deno.land/x/rxjs/src/internal/SubjectSubscription",
    "https://deno.land/x/rxjs/src/internal/symbol/rxSubscriber",
  ],
  function (exports_15, context_15) {
    "use strict";
    var Observable_ts_1,
      Subscriber_ts_1,
      Subscription_ts_3,
      ObjectUnsubscribedError_ts_1,
      SubjectSubscription_ts_1,
      rxSubscriber_ts_2,
      SubjectSubscriber,
      Subject,
      AnonymousSubject;
    var __moduleName = context_15 && context_15.id;
    return {
      setters: [
        function (Observable_ts_1_1) {
          Observable_ts_1 = Observable_ts_1_1;
        },
        function (Subscriber_ts_1_1) {
          Subscriber_ts_1 = Subscriber_ts_1_1;
        },
        function (Subscription_ts_3_1) {
          Subscription_ts_3 = Subscription_ts_3_1;
        },
        function (ObjectUnsubscribedError_ts_1_1) {
          ObjectUnsubscribedError_ts_1 = ObjectUnsubscribedError_ts_1_1;
        },
        function (SubjectSubscription_ts_1_1) {
          SubjectSubscription_ts_1 = SubjectSubscription_ts_1_1;
        },
        function (rxSubscriber_ts_2_1) {
          rxSubscriber_ts_2 = rxSubscriber_ts_2_1;
        },
      ],
      execute: function () {
        /**
             * @class SubjectSubscriber<T>
             */
        SubjectSubscriber = class SubjectSubscriber
          extends Subscriber_ts_1.Subscriber {
          constructor(destination) {
            super(destination);
            this.destination = destination;
          }
        };
        exports_15("SubjectSubscriber", SubjectSubscriber);
        Subject = /** @class */ (() => {
          /**
                 * A Subject is a special type of Observable that allows values to be
                 * multicasted to many Observers. Subjects are like EventEmitters.
                 *
                 * Every Subject is an Observable and an Observer. You can subscribe to a
                 * Subject, and you can call next to feed values as well as error and complete.
                 *
                 * @class Subject<T>
                 */
          class Subject extends Observable_ts_1.Observable {
            constructor() {
              super(...arguments);
              this.observers = [];
              this.closed = false;
              this.isStopped = false;
              this.hasError = false;
              this.thrownError = null;
            }
            [rxSubscriber_ts_2.rxSubscriber]() {
              return new SubjectSubscriber(this);
            }
            lift(operator) {
              const subject = new AnonymousSubject(this, this);
              subject.operator = operator;
              return subject;
            }
            next(value) {
              if (this.closed) {
                throw new ObjectUnsubscribedError_ts_1
                  .ObjectUnsubscribedError();
              }
              if (!this.isStopped) {
                const { observers } = this;
                const len = observers.length;
                const copy = observers.slice();
                for (let i = 0; i < len; i++) {
                  copy[i].next(value);
                }
              }
            }
            error(err) {
              if (this.closed) {
                throw new ObjectUnsubscribedError_ts_1
                  .ObjectUnsubscribedError();
              }
              this.hasError = true;
              this.thrownError = err;
              this.isStopped = true;
              const { observers } = this;
              const len = observers.length;
              const copy = observers.slice();
              for (let i = 0; i < len; i++) {
                copy[i].error(err);
              }
              this.observers.length = 0;
            }
            complete() {
              if (this.closed) {
                throw new ObjectUnsubscribedError_ts_1
                  .ObjectUnsubscribedError();
              }
              this.isStopped = true;
              const { observers } = this;
              const len = observers.length;
              const copy = observers.slice();
              for (let i = 0; i < len; i++) {
                copy[i].complete();
              }
              this.observers.length = 0;
            }
            unsubscribe() {
              this.isStopped = true;
              this.closed = true;
              this.observers = null;
            }
            /** @deprecated This is an internal implementation detail, do not use. */
            _trySubscribe(subscriber) {
              if (this.closed) {
                throw new ObjectUnsubscribedError_ts_1
                  .ObjectUnsubscribedError();
              } else {
                return super._trySubscribe(subscriber);
              }
            }
            /** @deprecated This is an internal implementation detail, do not use. */
            _subscribe(subscriber) {
              if (this.closed) {
                throw new ObjectUnsubscribedError_ts_1
                  .ObjectUnsubscribedError();
              } else if (this.hasError) {
                subscriber.error(this.thrownError);
                return Subscription_ts_3.Subscription.EMPTY;
              } else if (this.isStopped) {
                subscriber.complete();
                return Subscription_ts_3.Subscription.EMPTY;
              } else {
                this.observers.push(subscriber);
                return new SubjectSubscription_ts_1.SubjectSubscription(
                  this,
                  subscriber,
                );
              }
            }
            /**
                     * Creates a new Observable with this Subject as the source. You can do this
                     * to create customize Observer-side logic of the Subject and conceal it from
                     * code that uses the Observable.
                     * @return {Observable} Observable that the Subject casts to
                     */
            asObservable() {
              const observable = new Observable_ts_1.Observable();
              observable.source = this;
              return observable;
            }
          }
          /**
                 * @nocollapse
                 * @deprecated use new Subject() instead
                 */
          Subject.create = (destination, source) => {
            return new AnonymousSubject(destination, source);
          };
          return Subject;
        })();
        exports_15("Subject", Subject);
        /**
             * @class AnonymousSubject<T>
             */
        AnonymousSubject = class AnonymousSubject extends Subject {
          constructor(destination, source) {
            super();
            this.destination = destination;
            this.source = source;
          }
          next(value) {
            const { destination } = this;
            if (destination && destination.next) {
              destination.next(value);
            }
          }
          error(err) {
            const { destination } = this;
            if (destination && destination.error) {
              this.destination.error(err);
            }
          }
          complete() {
            const { destination } = this;
            if (destination && destination.complete) {
              this.destination.complete();
            }
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _subscribe(subscriber) {
            const { source } = this;
            if (source) {
              return this.source.subscribe(subscriber);
            } else {
              return Subscription_ts_3.Subscription.EMPTY;
            }
          }
        };
        exports_15("AnonymousSubject", AnonymousSubject);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/canReportError",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_16, context_16) {
    "use strict";
    var Subscriber_ts_2;
    var __moduleName = context_16 && context_16.id;
    /**
     * Determines whether the ErrorObserver is closed or stopped or has a
     * destination that is closed or stopped - in which case errors will
     * need to be reported via a different mechanism.
     * @param observer the observer
     */
    function canReportError(observer) {
      while (observer) {
        const { closed, destination, isStopped } = observer;
        if (closed || isStopped) {
          return false;
        } else if (
          destination && destination instanceof Subscriber_ts_2.Subscriber
        ) {
          observer = destination;
        } else {
          observer = null;
        }
      }
      return true;
    }
    exports_16("canReportError", canReportError);
    return {
      setters: [
        function (Subscriber_ts_2_1) {
          Subscriber_ts_2 = Subscriber_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/toSubscriber",
  [
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/symbol/rxSubscriber",
    "https://deno.land/x/rxjs/src/internal/Observer",
  ],
  function (exports_17, context_17) {
    "use strict";
    var Subscriber_ts_3, rxSubscriber_ts_3, Observer_ts_2;
    var __moduleName = context_17 && context_17.id;
    function toSubscriber(nextOrObserver, error, complete) {
      if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_ts_3.Subscriber) {
          return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_ts_3.rxSubscriber]) {
          return nextOrObserver[rxSubscriber_ts_3.rxSubscriber]();
        }
      }
      if (!nextOrObserver && !error && !complete) {
        return new Subscriber_ts_3.Subscriber(Observer_ts_2.empty);
      }
      return new Subscriber_ts_3.Subscriber(nextOrObserver, error, complete);
    }
    exports_17("toSubscriber", toSubscriber);
    return {
      setters: [
        function (Subscriber_ts_3_1) {
          Subscriber_ts_3 = Subscriber_ts_3_1;
        },
        function (rxSubscriber_ts_3_1) {
          rxSubscriber_ts_3 = rxSubscriber_ts_3_1;
        },
        function (Observer_ts_2_1) {
          Observer_ts_2 = Observer_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/subscribeToArray",
  [],
  function (exports_18, context_18) {
    "use strict";
    var subscribeToArray;
    var __moduleName = context_18 && context_18.id;
    return {
      setters: [],
      execute: function () {
        /**
             * Subscribes to an ArrayLike with a subscriber
             * @param array The array or array-like to subscribe to
             */
        exports_18(
          "subscribeToArray",
          subscribeToArray = (array) =>
            (subscriber) => {
              for (
                let i = 0, len = array.length;
                i < len && !subscriber.closed;
                i++
              ) {
                subscriber.next(array[i]);
              }
              subscriber.complete();
            },
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/subscribeToPromise",
  ["https://deno.land/x/rxjs/src/internal/util/hostReportError"],
  function (exports_19, context_19) {
    "use strict";
    var hostReportError_ts_3, subscribeToPromise;
    var __moduleName = context_19 && context_19.id;
    return {
      setters: [
        function (hostReportError_ts_3_1) {
          hostReportError_ts_3 = hostReportError_ts_3_1;
        },
      ],
      execute: function () {
        exports_19(
          "subscribeToPromise",
          subscribeToPromise = (promise) =>
            (subscriber) => {
              promise.then((value) => {
                if (!subscriber.closed) {
                  subscriber.next(value);
                  subscriber.complete();
                }
              }, (err) => subscriber.error(err))
                .then(null, hostReportError_ts_3.hostReportError);
              return subscriber;
            },
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/symbol/iterator",
  [],
  function (exports_20, context_20) {
    "use strict";
    var iterator, $$iterator;
    var __moduleName = context_20 && context_20.id;
    function getSymbolIterator() {
      if (typeof Symbol !== "function" || !Symbol.iterator) {
        return "@@iterator";
      }
      return Symbol.iterator;
    }
    exports_20("getSymbolIterator", getSymbolIterator);
    return {
      setters: [],
      execute: function () {
        exports_20("iterator", iterator = getSymbolIterator());
        /**
             * @deprecated use {@link iterator} instead
             */
        exports_20("$$iterator", $$iterator = iterator);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/subscribeToIterable",
  ["https://deno.land/x/rxjs/src/internal/symbol/iterator"],
  function (exports_21, context_21) {
    "use strict";
    var iterator_ts_1, subscribeToIterable;
    var __moduleName = context_21 && context_21.id;
    return {
      setters: [
        function (iterator_ts_1_1) {
          iterator_ts_1 = iterator_ts_1_1;
        },
      ],
      execute: function () {
        exports_21(
          "subscribeToIterable",
          subscribeToIterable = (iterable) =>
            (subscriber) => {
              const iterator = iterable[iterator_ts_1.iterator]();
              do {
                let item;
                try {
                  item = iterator.next();
                } catch (err) {
                  subscriber.error(err);
                  return;
                }
                if (item.done) {
                  subscriber.complete();
                  break;
                }
                subscriber.next(item.value);
                if (subscriber.closed) {
                  break;
                }
              } while (true);
              // Finalize the iterator if it happens to be a Generator
              if (typeof iterator.return === "function") {
                subscriber.add(() => {
                  if (iterator.return) {
                    iterator.return();
                  }
                });
              }
              return subscriber;
            },
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/symbol/observable",
  [],
  function (exports_22, context_22) {
    "use strict";
    var observable;
    var __moduleName = context_22 && context_22.id;
    return {
      setters: [],
      execute: function () {
        /** Symbol.observable or a string "@@observable". Used for interop */
        exports_22(
          "observable",
          observable =
            (() =>
              typeof Symbol === "function" && Symbol.observable ||
              "@@observable")(),
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/subscribeToObservable",
  ["https://deno.land/x/rxjs/src/internal/symbol/observable"],
  function (exports_23, context_23) {
    "use strict";
    var observable_ts_1, subscribeToObservable;
    var __moduleName = context_23 && context_23.id;
    return {
      setters: [
        function (observable_ts_1_1) {
          observable_ts_1 = observable_ts_1_1;
        },
      ],
      execute: function () {
        /**
             * Subscribes to an object that implements Symbol.observable with the given
             * Subscriber.
             * @param obj An object that implements Symbol.observable
             */
        exports_23(
          "subscribeToObservable",
          subscribeToObservable = (obj) =>
            (subscriber) => {
              const obs = obj[observable_ts_1.observable]();
              if (typeof obs.subscribe !== "function") {
                // Should be caught by observable subscribe function error handling.
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable",
                );
              } else {
                return obs.subscribe(subscriber);
              }
            },
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/isArrayLike",
  [],
  function (exports_24, context_24) {
    "use strict";
    var isArrayLike;
    var __moduleName = context_24 && context_24.id;
    return {
      setters: [],
      execute: function () {
        exports_24(
          "isArrayLike",
          isArrayLike =
            ((x) =>
              x && typeof x.length === "number" && typeof x !== "function"),
        );
      },
    };
  },
);
/**
 *  RxJS - Deno Version 2020

    This product is a modified by DenoBR
    Comunitty for add support for Deno

    This file is modified by DenoBR
 */
System.register(
  "https://deno.land/x/rxjs/src/internal/util/isPromise",
  [],
  function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    /**
     * Tests to see if the object is an ES2015 (ES6) Promise
     * @see {@link https://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects}
     * @param value the object to test
     */
    function isPromise(value) {
      return !!value && typeof value.subscribe !== "function" &&
        typeof value.then === "function";
    }
    exports_25("isPromise", isPromise);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/subscribeToAsyncIterable",
  [],
  function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    function subscribeToAsyncIterable(asyncIterable) {
      return (subscriber) => {
        process(asyncIterable, subscriber).catch((err) =>
          subscriber.error(err)
        );
      };
    }
    exports_26("subscribeToAsyncIterable", subscribeToAsyncIterable);
    async function process(asyncIterable, subscriber) {
      for await (const value of asyncIterable) {
        subscriber.next(value);
      }
      subscriber.complete();
    }
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/subscribeTo",
  [
    "https://deno.land/x/rxjs/src/internal/util/subscribeToArray",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToPromise",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToIterable",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToObservable",
    "https://deno.land/x/rxjs/src/internal/util/isArrayLike",
    "https://deno.land/x/rxjs/src/internal/util/isPromise",
    "https://deno.land/x/rxjs/src/internal/util/isObject",
    "https://deno.land/x/rxjs/src/internal/symbol/iterator",
    "https://deno.land/x/rxjs/src/internal/symbol/observable",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToAsyncIterable",
  ],
  function (exports_27, context_27) {
    "use strict";
    var subscribeToArray_ts_1,
      subscribeToPromise_ts_1,
      subscribeToIterable_ts_1,
      subscribeToObservable_ts_1,
      isArrayLike_ts_1,
      isPromise_ts_1,
      isObject_ts_2,
      iterator_ts_2,
      observable_ts_2,
      subscribeToAsyncIterable_ts_1,
      subscribeTo;
    var __moduleName = context_27 && context_27.id;
    return {
      setters: [
        function (subscribeToArray_ts_1_1) {
          subscribeToArray_ts_1 = subscribeToArray_ts_1_1;
        },
        function (subscribeToPromise_ts_1_1) {
          subscribeToPromise_ts_1 = subscribeToPromise_ts_1_1;
        },
        function (subscribeToIterable_ts_1_1) {
          subscribeToIterable_ts_1 = subscribeToIterable_ts_1_1;
        },
        function (subscribeToObservable_ts_1_1) {
          subscribeToObservable_ts_1 = subscribeToObservable_ts_1_1;
        },
        function (isArrayLike_ts_1_1) {
          isArrayLike_ts_1 = isArrayLike_ts_1_1;
        },
        function (isPromise_ts_1_1) {
          isPromise_ts_1 = isPromise_ts_1_1;
        },
        function (isObject_ts_2_1) {
          isObject_ts_2 = isObject_ts_2_1;
        },
        function (iterator_ts_2_1) {
          iterator_ts_2 = iterator_ts_2_1;
        },
        function (observable_ts_2_1) {
          observable_ts_2 = observable_ts_2_1;
        },
        function (subscribeToAsyncIterable_ts_1_1) {
          subscribeToAsyncIterable_ts_1 = subscribeToAsyncIterable_ts_1_1;
        },
      ],
      execute: function () {
        exports_27(
          "subscribeTo",
          subscribeTo = (result) => {
            if (
              !!result &&
              typeof result[observable_ts_2.observable] === "function"
            ) {
              return subscribeToObservable_ts_1.subscribeToObservable(result);
            } else if (isArrayLike_ts_1.isArrayLike(result)) {
              return subscribeToArray_ts_1.subscribeToArray(result);
            } else if (isPromise_ts_1.isPromise(result)) {
              return subscribeToPromise_ts_1.subscribeToPromise(result);
            } else if (
              !!result && typeof result[iterator_ts_2.iterator] === "function"
            ) {
              return subscribeToIterable_ts_1.subscribeToIterable(result);
            } else if (
              Symbol && Symbol.asyncIterator &&
              !!result && typeof result[Symbol.asyncIterator] === "function"
            ) {
              return subscribeToAsyncIterable_ts_1.subscribeToAsyncIterable(
                result,
              );
            } else {
              const value = isObject_ts_2.isObject(result) ? "an invalid object"
              : `'${result}'`;
              const msg = `You provided ${value} where a stream was expected.` +
                " You can provide an Observable, Promise, Array, or Iterable..ts";
              throw new TypeError(msg);
            }
          },
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduled/scheduleObservable",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/Subscription",
    "https://deno.land/x/rxjs/src/internal/symbol/observable",
  ],
  function (exports_28, context_28) {
    "use strict";
    var Observable_ts_2, Subscription_ts_4, observable_ts_3;
    var __moduleName = context_28 && context_28.id;
    function scheduleObservable(input, scheduler) {
      return new Observable_ts_2.Observable((subscriber) => {
        const sub = new Subscription_ts_4.Subscription();
        sub.add(scheduler.schedule(() => {
          const observable = input[observable_ts_3.observable]();
          sub.add(observable.subscribe({
            next(value) {
              sub.add(scheduler.schedule(() => subscriber.next(value)));
            },
            error(err) {
              sub.add(scheduler.schedule(() => subscriber.error(err)));
            },
            complete() {
              sub.add(scheduler.schedule(() => subscriber.complete()));
            },
          }));
        }));
        return sub;
      });
    }
    exports_28("scheduleObservable", scheduleObservable);
    return {
      setters: [
        function (Observable_ts_2_1) {
          Observable_ts_2 = Observable_ts_2_1;
        },
        function (Subscription_ts_4_1) {
          Subscription_ts_4 = Subscription_ts_4_1;
        },
        function (observable_ts_3_1) {
          observable_ts_3 = observable_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduled/schedulePromise",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/Subscription",
  ],
  function (exports_29, context_29) {
    "use strict";
    var Observable_ts_3, Subscription_ts_5;
    var __moduleName = context_29 && context_29.id;
    function schedulePromise(input, scheduler) {
      return new Observable_ts_3.Observable((subscriber) => {
        const sub = new Subscription_ts_5.Subscription();
        sub.add(scheduler.schedule(() =>
          input.then((value) => {
            sub.add(scheduler.schedule(() => {
              subscriber.next(value);
              sub.add(scheduler.schedule(() => subscriber.complete()));
            }));
          }, (err) => {
            sub.add(scheduler.schedule(() => subscriber.error(err)));
          })
        ));
        return sub;
      });
    }
    exports_29("schedulePromise", schedulePromise);
    return {
      setters: [
        function (Observable_ts_3_1) {
          Observable_ts_3 = Observable_ts_3_1;
        },
        function (Subscription_ts_5_1) {
          Subscription_ts_5 = Subscription_ts_5_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduled/scheduleArray",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/Subscription",
  ],
  function (exports_30, context_30) {
    "use strict";
    var Observable_ts_4, Subscription_ts_6;
    var __moduleName = context_30 && context_30.id;
    function scheduleArray(input, scheduler) {
      return new Observable_ts_4.Observable((subscriber) => {
        const sub = new Subscription_ts_6.Subscription();
        let i = 0;
        sub.add(scheduler.schedule(function () {
          if (i === input.length) {
            subscriber.complete();
            return;
          }
          subscriber.next(input[i++]);
          if (!subscriber.closed) {
            sub.add(this.schedule());
          }
        }));
        return sub;
      });
    }
    exports_30("scheduleArray", scheduleArray);
    return {
      setters: [
        function (Observable_ts_4_1) {
          Observable_ts_4 = Observable_ts_4_1;
        },
        function (Subscription_ts_6_1) {
          Subscription_ts_6 = Subscription_ts_6_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduled/scheduleIterable",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/Subscription",
    "https://deno.land/x/rxjs/src/internal/symbol/iterator",
  ],
  function (exports_31, context_31) {
    "use strict";
    var Observable_ts_5, Subscription_ts_7, iterator_ts_3;
    var __moduleName = context_31 && context_31.id;
    function scheduleIterable(input, scheduler) {
      if (!input) {
        throw new Error("Iterable cannot be null");
      }
      return new Observable_ts_5.Observable((subscriber) => {
        const sub = new Subscription_ts_7.Subscription();
        let iterator;
        sub.add(() => {
          // Finalize generators
          if (iterator && typeof iterator.return === "function") {
            iterator.return();
          }
        });
        sub.add(scheduler.schedule(() => {
          iterator = input[iterator_ts_3.iterator]();
          sub.add(scheduler.schedule(function () {
            if (subscriber.closed) {
              return;
            }
            let value;
            let done;
            try {
              const result = iterator.next();
              value = result.value;
              done = result.done;
            } catch (err) {
              subscriber.error(err);
              return;
            }
            if (done) {
              subscriber.complete();
            } else {
              subscriber.next(value);
              this.schedule();
            }
          }));
        }));
        return sub;
      });
    }
    exports_31("scheduleIterable", scheduleIterable);
    return {
      setters: [
        function (Observable_ts_5_1) {
          Observable_ts_5 = Observable_ts_5_1;
        },
        function (Subscription_ts_7_1) {
          Subscription_ts_7 = Subscription_ts_7_1;
        },
        function (iterator_ts_3_1) {
          iterator_ts_3 = iterator_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
/**
 *  RxJS - Deno Version 2020

    This product is a modified by DenoBR
    Comunitty for add support for Deno

    This file is modified by DenoBR
 */
System.register(
  "https://deno.land/x/rxjs/src/internal/util/isInteropObservable",
  ["https://deno.land/x/rxjs/src/internal/symbol/observable"],
  function (exports_32, context_32) {
    "use strict";
    var observable_ts_4;
    var __moduleName = context_32 && context_32.id;
    /** Identifies an input as being Observable (but not necessary an Rx Observable) */
    function isInteropObservable(input) {
      return input && typeof input[observable_ts_4.observable] === "function";
    }
    exports_32("isInteropObservable", isInteropObservable);
    return {
      setters: [
        function (observable_ts_4_1) {
          observable_ts_4 = observable_ts_4_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
/**
 *  RxJS - Deno Version 2020

    This product is a modified by DenoBR
    Comunitty for add support for Deno

    This file is modified by DenoBR
 */
System.register(
  "https://deno.land/x/rxjs/src/internal/util/isIterable",
  ["https://deno.land/x/rxjs/src/internal/symbol/iterator"],
  function (exports_33, context_33) {
    "use strict";
    var iterator_ts_4;
    var __moduleName = context_33 && context_33.id;
    /** Identifies an input as being an Iterable */
    function isIterable(input) {
      return input && typeof input[iterator_ts_4.iterator] === "function";
    }
    exports_33("isIterable", isIterable);
    return {
      setters: [
        function (iterator_ts_4_1) {
          iterator_ts_4 = iterator_ts_4_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduled/scheduleAsyncIterable",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/Subscription",
  ],
  function (exports_34, context_34) {
    "use strict";
    var Observable_ts_6, Subscription_ts_8;
    var __moduleName = context_34 && context_34.id;
    function scheduleAsyncIterable(input, scheduler) {
      if (!input) {
        throw new Error("Iterable cannot be null");
      }
      return new Observable_ts_6.Observable((subscriber) => {
        const sub = new Subscription_ts_8.Subscription();
        sub.add(scheduler.schedule(() => {
          const iterator = input[Symbol.asyncIterator]();
          sub.add(scheduler.schedule(function () {
            iterator.next().then((result) => {
              if (result.done) {
                subscriber.complete();
              } else {
                subscriber.next(result.value);
                this.schedule();
              }
            });
          }));
        }));
        return sub;
      });
    }
    exports_34("scheduleAsyncIterable", scheduleAsyncIterable);
    return {
      setters: [
        function (Observable_ts_6_1) {
          Observable_ts_6 = Observable_ts_6_1;
        },
        function (Subscription_ts_8_1) {
          Subscription_ts_8 = Subscription_ts_8_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduled/scheduled",
  [
    "https://deno.land/x/rxjs/src/internal/scheduled/scheduleObservable",
    "https://deno.land/x/rxjs/src/internal/scheduled/schedulePromise",
    "https://deno.land/x/rxjs/src/internal/scheduled/scheduleArray",
    "https://deno.land/x/rxjs/src/internal/scheduled/scheduleIterable",
    "https://deno.land/x/rxjs/src/internal/util/isInteropObservable",
    "https://deno.land/x/rxjs/src/internal/util/isPromise",
    "https://deno.land/x/rxjs/src/internal/util/isArrayLike",
    "https://deno.land/x/rxjs/src/internal/util/isIterable",
    "https://deno.land/x/rxjs/src/internal/scheduled/scheduleAsyncIterable",
  ],
  function (exports_35, context_35) {
    "use strict";
    var scheduleObservable_ts_1,
      schedulePromise_ts_1,
      scheduleArray_ts_1,
      scheduleIterable_ts_1,
      isInteropObservable_ts_1,
      isPromise_ts_2,
      isArrayLike_ts_2,
      isIterable_ts_1,
      scheduleAsyncIterable_ts_1;
    var __moduleName = context_35 && context_35.id;
    /**
     * Converts from a common {@link ObservableInput} type to an observable where subscription and emissions
     * are scheduled on the provided scheduler.
     *
     * @see {@link from}
     * @see {@link of}
     *
     * @param input The observable, array, promise, iterable, etc you would like to schedule
     * @param scheduler The scheduler to use to schedule the subscription and emissions from
     * the returned observable.
     */
    function scheduled(input, scheduler) {
      if (input != null) {
        if (isInteropObservable_ts_1.isInteropObservable(input)) {
          return scheduleObservable_ts_1.scheduleObservable(input, scheduler);
        } else if (isPromise_ts_2.isPromise(input)) {
          return schedulePromise_ts_1.schedulePromise(input, scheduler);
        } else if (isArrayLike_ts_2.isArrayLike(input)) {
          return scheduleArray_ts_1.scheduleArray(input, scheduler);
        } else if (
          isIterable_ts_1.isIterable(input) || typeof input === "string"
        ) {
          return scheduleIterable_ts_1.scheduleIterable(input, scheduler);
        } else if (
          Symbol && Symbol.asyncIterator &&
          typeof input[Symbol.asyncIterator] === "function"
        ) {
          return scheduleAsyncIterable_ts_1.scheduleAsyncIterable(
            input,
            scheduler,
          );
        }
      }
      throw new TypeError(
        (input !== null && typeof input || input) + " is not observable",
      );
    }
    exports_35("scheduled", scheduled);
    return {
      setters: [
        function (scheduleObservable_ts_1_1) {
          scheduleObservable_ts_1 = scheduleObservable_ts_1_1;
        },
        function (schedulePromise_ts_1_1) {
          schedulePromise_ts_1 = schedulePromise_ts_1_1;
        },
        function (scheduleArray_ts_1_1) {
          scheduleArray_ts_1 = scheduleArray_ts_1_1;
        },
        function (scheduleIterable_ts_1_1) {
          scheduleIterable_ts_1 = scheduleIterable_ts_1_1;
        },
        function (isInteropObservable_ts_1_1) {
          isInteropObservable_ts_1 = isInteropObservable_ts_1_1;
        },
        function (isPromise_ts_2_1) {
          isPromise_ts_2 = isPromise_ts_2_1;
        },
        function (isArrayLike_ts_2_1) {
          isArrayLike_ts_2 = isArrayLike_ts_2_1;
        },
        function (isIterable_ts_1_1) {
          isIterable_ts_1 = isIterable_ts_1_1;
        },
        function (scheduleAsyncIterable_ts_1_1) {
          scheduleAsyncIterable_ts_1 = scheduleAsyncIterable_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/from",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/util/subscribeTo",
    "https://deno.land/x/rxjs/src/internal/scheduled/scheduled",
  ],
  function (exports_36, context_36) {
    "use strict";
    var Observable_ts_7, subscribeTo_ts_1, scheduled_ts_1;
    var __moduleName = context_36 && context_36.id;
    /**
     * Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.
     *
     * <span class="informal">Converts almost anything to an Observable.</span>
     *
     * ![](from.png)
     *
     * `from` converts various other objects and data types into Observables. It also converts a Promise, an array-like, or an
     * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable" target="_blank">iterable</a>
     * object into an Observable that emits the items in that promise, array, or iterable. A String, in this context, is treated
     * as an array of characters. Observable-like objects (contains a function named with the ES2015 Symbol for Observable) can also be
     * converted through this operator.
     *
     * ## Examples
     *
     * ### Converts an array to an Observable
     *
     * ```ts
     * import { from } from 'rxjs.ts';
     *
     * const array = [10, 20, 30];
     * const result = from(array);
     *
     * result.subscribe(x => console.log(x));
     *
     * // Logs:
     * // 10
     * // 20
     * // 30
     * ```
     *
     * ---
     *
     * ### Convert an infinite iterable (from a generator) to an Observable
     *
     * ```ts
     * import { from } from 'rxjs.ts';
     * import { take } from 'rxjs/operators.ts';
     *
     * function* generateDoubles(seed) {
     *    let i = seed;
     *    while (true) {
     *      yield i;
     *      i = 2 * i; // double it
     *    }
     * }
     *
     * const iterator = generateDoubles(3);
     * const result = from(iterator).pipe(take(10));
     *
     * result.subscribe(x => console.log(x));
     *
     * // Logs:
     * // 3
     * // 6
     * // 12
     * // 24
     * // 48
     * // 96
     * // 192
     * // 384
     * // 768
     * // 1536
     * ```
     *
     * ---
     *
     * ### With async scheduler
     *
     * ```ts
     * import { from, asyncScheduler } from 'rxjs.ts';
     *
     * console.log('start');
     *
     * const array = [10, 20, 30];
     * const result = from(array, asyncScheduler);
     *
     * result.subscribe(x => console.log(x));
     *
     * console.log('end');
     *
     * // Logs:
     * // start
     * // end
     * // 10
     * // 20
     * // 30
     * ```
     *
     * @see {@link fromEvent}
     * @see {@link fromEventPattern}
     *
     * @param {ObservableInput<T>} A subscription object, a Promise, an Observable-like,
     * an Array, an iterable, or an array-like object to be converted.
     * @param {SchedulerLike} An optional {@link SchedulerLike} on which to schedule the emission of values.
     * @return {Observable<T>}
     * @name from
     * @owner Observable
     */
    function from(input, scheduler) {
      if (!scheduler) {
        if (input instanceof Observable_ts_7.Observable) {
          return input;
        }
        return new Observable_ts_7.Observable(
          subscribeTo_ts_1.subscribeTo(input),
        );
      } else {
        return scheduled_ts_1.scheduled(input, scheduler);
      }
    }
    exports_36("from", from);
    return {
      setters: [
        function (Observable_ts_7_1) {
          Observable_ts_7 = Observable_ts_7_1;
        },
        function (subscribeTo_ts_1_1) {
          subscribeTo_ts_1 = subscribeTo_ts_1_1;
        },
        function (scheduled_ts_1_1) {
          scheduled_ts_1 = scheduled_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/empty",
  ["https://deno.land/x/rxjs/src/internal/Observable"],
  function (exports_37, context_37) {
    "use strict";
    var Observable_ts_8, EMPTY;
    var __moduleName = context_37 && context_37.id;
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.</span>
     *
     * ![](empty.png)
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * ## Examples
     *
     * ### Emit the number 7, then complete
     *
     * ```ts
     * import { empty } from 'rxjs.ts';
     * import { startWith } from 'rxjs/operators.ts';
     *
     * const result = empty().pipe(startWith(7));
     * result.subscribe(x => console.log(x));
     *
     * // Outputs
     * // 7
     * ```
     *
     * ### Map and flatten only odd numbers to the sequence 'a', 'b', 'c'
     *
     * ```ts
     * import { empty, interval, of } from 'rxjs.ts';
     * import { mergeMap } from 'rxjs/operators.ts';
     *
     * const interval$ = interval(1000);
     * const result = interval$.pipe(
     *   mergeMap(x => x % 2 === 1 ? of('a', 'b', 'c') : empty()),
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following to the console:
     * // x is equal to the count on the interval, e.g. (0, 1, 2, 3, ...)
     * // x will occur every 1000ms
     * // if x % 2 is equal to 1, print a, b, c (each on its own)
     * // if x % 2 is not equal to 1, nothing will be output
     * ```
     *
     * @see {@link Observable}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throwError}
     *
     * @param scheduler A {@link SchedulerLike} to use for scheduling
     * the emission of the complete notification.
     * @return An "empty" Observable: emits only the complete
     * notification.
     * @deprecated Deprecated in favor of using {@link index/EMPTY} constant, or {@link scheduled} (e.g. `scheduled([], scheduler)`)
     */
    function empty(scheduler) {
      return scheduler ? emptyScheduled(scheduler) : EMPTY;
    }
    exports_37("empty", empty);
    function emptyScheduled(scheduler) {
      return new Observable_ts_8.Observable((subscriber) =>
        scheduler.schedule(() => subscriber.complete())
      );
    }
    return {
      setters: [
        function (Observable_ts_8_1) {
          Observable_ts_8 = Observable_ts_8_1;
        },
      ],
      execute: function () {
        /**
             * The same Observable instance returned by any call to {@link empty} without a
             * `scheduler`. It is preferable to use this over `empty()`.
             *
             * <span class="informal">Just emits 'complete', and nothing else.</span>
             *
             * ![](empty.png)
             *
             * ## Examples
             *
             * ### Log complete notification
             *
             * ```ts
             * import { EMPTY } from 'rxjs.ts';
             *
             * EMPTY.subscribe({
             *   next: () => console.log('Next'),
             *   complete: () => console.log('Complete!')
             * });
             *
             * // Outputs
             * // Complete!
             * ```
             */
        exports_37(
          "EMPTY",
          EMPTY = new Observable_ts_8.Observable((subscriber) =>
            subscriber.complete()
          ),
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/defer",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/observable/from",
    "https://deno.land/x/rxjs/src/internal/observable/empty",
  ],
  function (exports_38, context_38) {
    "use strict";
    var Observable_ts_9, from_ts_1, empty_ts_1;
    var __moduleName = context_38 && context_38.id;
    /**
     * Creates an Observable that, on subscribe, calls an Observable factory to
     * make an Observable for each new Observer.
     *
     * <span class="informal">Creates the Observable lazily, that is, only when it
     * is subscribed.
     * </span>
     *
     * ![](defer.png)
     *
     * `defer` allows you to create an Observable only when the Observer
     * subscribes. It waits until an Observer subscribes to it, calls the given
     * factory function to get an Observable -- where a factory function typically
     * generates a new Observable -- and subscribes the Observer to this Observable.
     * In case the factory function returns a falsy value, then EMPTY is used as
     * Observable instead. Last but not least, an exception during the factory
     * function call is transferred to the Observer by calling `error`.
     *
     * ## Example
     * ### Subscribe to either an Observable of clicks or an Observable of interval, at random
     * ```ts
     * import { defer, fromEvent, interval } from 'rxjs.ts';
     *
     * const clicksOrInterval = defer(function () {
     *   return Math.random() > 0.5
     *     ? fromEvent(document, 'click')
     *     : interval(1000);
     * });
     * clicksOrInterval.subscribe(x => console.log(x));
     *
     * // Results in the following behavior:
     * // If the result of Math.random() is greater than 0.5 it will listen
     * // for clicks anywhere on the "document"; when document is clicked it
     * // will log a MouseEvent object to the console. If the result is less
     * // than 0.5 it will emit ascending numbers, one every second(1000ms).
     * ```
     *
     * @see {@link Observable}
     *
     * @param {function(): SubscribableOrPromise} observableFactory The Observable
     * factory function to invoke for each Observer that subscribes to the output
     * Observable. May also return a Promise, which will be converted on the fly
     * to an Observable.
     * @return {Observable} An Observable whose Observers' subscriptions trigger
     * an invocation of the given Observable factory function.
     * @static true
     * @name defer
     * @owner Observable
     */
    function defer(observableFactory) {
      return new Observable_ts_9.Observable((subscriber) => {
        let input;
        try {
          input = observableFactory();
        } catch (err) {
          subscriber.error(err);
          return undefined;
        }
        const source = input ? from_ts_1.from(input) : empty_ts_1.EMPTY;
        return source.subscribe(subscriber);
      });
    }
    exports_38("defer", defer);
    return {
      setters: [
        function (Observable_ts_9_1) {
          Observable_ts_9 = Observable_ts_9_1;
        },
        function (from_ts_1_1) {
          from_ts_1 = from_ts_1_1;
        },
        function (empty_ts_1_1) {
          empty_ts_1 = empty_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/iif",
  [
    "https://deno.land/x/rxjs/src/internal/observable/defer",
    "https://deno.land/x/rxjs/src/internal/observable/empty",
  ],
  function (exports_39, context_39) {
    "use strict";
    var defer_ts_1, empty_ts_2;
    var __moduleName = context_39 && context_39.id;
    /**
     * Decides at subscription time which Observable will actually be subscribed.
     *
     * <span class="informal">`If` statement for Observables.</span>
     *
     * `iif` accepts a condition function and two Observables. When
     * an Observable returned by the operator is subscribed, condition function will be called.
     * Based on what boolean it returns at that moment, consumer will subscribe either to
     * the first Observable (if condition was true) or to the second (if condition was false). Condition
     * function may also not return anything - in that case condition will be evaluated as false and
     * second Observable will be subscribed.
     *
     * Note that Observables for both cases (true and false) are optional. If condition points to an Observable that
     * was left undefined, resulting stream will simply complete immediately. That allows you to, rather
     * than controlling which Observable will be subscribed, decide at runtime if consumer should have access
     * to given Observable or not.
     *
     * If you have more complex logic that requires decision between more than two Observables, {@link defer}
     * will probably be a better choice. Actually `iif` can be easily implemented with {@link defer}
     * and exists only for convenience and readability reasons.
     *
     *
     * ## Examples
     * ### Change at runtime which Observable will be subscribed
     * ```ts
     * import { iif, of } from 'rxjs.ts';
     *
     * let subscribeToFirst;
     * const firstOrSecond = iif(
     *   () => subscribeToFirst,
     *   of('first'),
     *   of('second'),
     * );
     *
     * subscribeToFirst = true;
     * firstOrSecond.subscribe(value => console.log(value));
     *
     * // Logs:
     * // "first"
     *
     * subscribeToFirst = false;
     * firstOrSecond.subscribe(value => console.log(value));
     *
     * // Logs:
     * // "second"
     *
     * ```
     *
     * ### Control an access to an Observable
     * ```ts
     * let accessGranted;
     * const observableIfYouHaveAccess = iif(
     *   () => accessGranted,
     *   of('It seems you have an access...'), // Note that only one Observable is passed to the operator.
     * );
     *
     * accessGranted = true;
     * observableIfYouHaveAccess.subscribe(
     *   value => console.log(value),
     *   err => {},
     *   () => console.log('The end'),
     * );
     *
     * // Logs:
     * // "It seems you have an access..."
     * // "The end"
     *
     * accessGranted = false;
     * observableIfYouHaveAccess.subscribe(
     *   value => console.log(value),
     *   err => {},
     *   () => console.log('The end'),
     * );
     *
     * // Logs:
     * // "The end"
     * ```
     *
     * @see {@link defer}
     *
     * @param {function(): boolean} condition Condition which Observable should be chosen.
     * @param {Observable} [trueObservable] An Observable that will be subscribed if condition is true.
     * @param {Observable} [falseObservable] An Observable that will be subscribed if condition is false.
     * @return {Observable} Either first or second Observable, depending on condition.
     * @static true
     * @name iif
     * @owner Observable
    */
    function iif(
      condition,
      trueResult = empty_ts_2.EMPTY,
      falseResult = empty_ts_2.EMPTY,
    ) {
      return defer_ts_1.defer(() => condition() ? trueResult : falseResult);
    }
    exports_39("iif", iif);
    return {
      setters: [
        function (defer_ts_1_1) {
          defer_ts_1 = defer_ts_1_1;
        },
        function (empty_ts_2_1) {
          empty_ts_2 = empty_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/throwError",
  ["https://deno.land/x/rxjs/src/internal/Observable"],
  function (exports_40, context_40) {
    "use strict";
    var Observable_ts_10;
    var __moduleName = context_40 && context_40.id;
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits an error notification.
     *
     * <span class="informal">Just emits 'error', and nothing else.
     * </span>
     *
     * ![](throw.png)
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the error notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * ## Examples
     * ### Emit the number 7, then emit an error
     * ```ts
     * import { throwError, concat, of } from 'rxjs.ts';
     *
     * const result = concat(of(7), throwError(new Error('oops!')));
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * // Logs:
     * // 7
     * // Error: oops!
     * ```
     *
     * ---
     *
     * ### Map and flatten numbers to the sequence 'a', 'b', 'c', but throw an error for 2
     * ```ts
     * import { throwError, interval, of } from 'rxjs.ts';
     * import { mergeMap } from 'rxjs/operators.ts';
     *
     * interval(1000).pipe(
     *   mergeMap(x => x === 2
     *     ? throwError('Twos are bad')
     *     : of('a', 'b', 'c')
     *   ),
     * ).subscribe(x => console.log(x), e => console.error(e));
     *
     * // Logs:
     * // a
     * // b
     * // c
     * // a
     * // b
     * // c
     * // Twos are bad
     * ```
     *
     * @see {@link Observable}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link of}
     *
     * @param {any} error The particular Error to pass to the error notification.
     * @param {SchedulerLike} [scheduler] A {@link SchedulerLike} to use for scheduling
     * the emission of the error notification.
     * @return {Observable} An error Observable: emits only the error notification
     * using the given error argument.
     * @static true
     * @name throwError
     * @owner Observable
     */
    function throwError(error, scheduler) {
      if (!scheduler) {
        return new Observable_ts_10.Observable((subscriber) =>
          subscriber.error(error)
        );
      } else {
        return new Observable_ts_10.Observable((subscriber) =>
          scheduler.schedule(dispatch, 0, { error, subscriber })
        );
      }
    }
    exports_40("throwError", throwError);
    function dispatch({ error, subscriber }) {
      subscriber.error(error);
    }
    return {
      setters: [
        function (Observable_ts_10_1) {
          Observable_ts_10 = Observable_ts_10_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/identity",
  [],
  function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    function identity(x) {
      return x;
    }
    exports_41("identity", identity);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/pipe",
  ["https://deno.land/x/rxjs/src/internal/util/identity"],
  function (exports_42, context_42) {
    "use strict";
    var identity_ts_1;
    var __moduleName = context_42 && context_42.id;
    /* tslint:enable:max-line-length */
    function pipe(...fns) {
      return pipeFromArray(fns);
    }
    exports_42("pipe", pipe);
    /** @internal */
    function pipeFromArray(fns) {
      if (fns.length === 0) {
        return identity_ts_1.identity;
      }
      if (fns.length === 1) {
        return fns[0];
      }
      return function piped(input) {
        return fns.reduce((prev, fn) => fn(prev), input);
      };
    }
    exports_42("pipeFromArray", pipeFromArray);
    return {
      setters: [
        function (identity_ts_1_1) {
          identity_ts_1 = identity_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/deferred",
  [],
  function (exports_43, context_43) {
    "use strict";
    var Deferred;
    var __moduleName = context_43 && context_43.id;
    return {
      setters: [],
      execute: function () {
        Deferred = class Deferred {
          constructor() {
            this.resolve = null;
            this.reject = null;
            this.promise = new Promise((a, b) => {
              this.resolve = a;
              this.reject = b;
            });
          }
        };
        exports_43("Deferred", Deferred);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/asyncIteratorFrom",
  ["https://deno.land/x/rxjs/src/internal/util/deferred"],
  function (exports_44, context_44) {
    "use strict";
    var deferred_ts_1;
    var __moduleName = context_44 && context_44.id;
    function asyncIteratorFrom(source) {
      return coroutine(source);
    }
    exports_44("asyncIteratorFrom", asyncIteratorFrom);
    async function* coroutine(source) {
      const deferreds = [];
      const values = [];
      let hasError = false;
      let error = null;
      let completed = false;
      const subs = source.subscribe({
        next: (value) => {
          if (deferreds.length > 0) {
            deferreds.shift().resolve({ value, done: false });
          } else {
            values.push(value);
          }
        },
        error: (err) => {
          hasError = true;
          error = err;
          while (deferreds.length > 0) {
            deferreds.shift().reject(err);
          }
        },
        complete: () => {
          completed = true;
          while (deferreds.length > 0) {
            deferreds.shift().resolve({ value: undefined, done: true });
          }
        },
      });
      try {
        while (true) {
          if (values.length > 0) {
            yield values.shift();
          } else if (completed) {
            return;
          } else if (hasError) {
            throw error;
          } else {
            const d = new deferred_ts_1.Deferred();
            deferreds.push(d);
            const result = await d.promise;
            if (result.done) {
              return;
            } else {
              yield result.value;
            }
          }
        }
      } catch (err) {
        throw err;
      } finally {
        subs.unsubscribe();
      }
    }
    return {
      setters: [
        function (deferred_ts_1_1) {
          deferred_ts_1 = deferred_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/Observable",
  [
    "https://deno.land/x/rxjs/src/internal/util/canReportError",
    "https://deno.land/x/rxjs/src/internal/util/toSubscriber",
    "https://deno.land/x/rxjs/src/internal/symbol/observable",
    "https://deno.land/x/rxjs/src/internal/util/pipe",
    "https://deno.land/x/rxjs/src/internal/config",
    "https://deno.land/x/rxjs/src/internal/asyncIteratorFrom",
  ],
  function (exports_45, context_45) {
    "use strict";
    var canReportError_ts_1,
      toSubscriber_ts_1,
      observable_ts_5,
      pipe_ts_1,
      config_ts_3,
      asyncIteratorFrom_ts_1,
      Observable;
    var __moduleName = context_45 && context_45.id;
    /**
     * Decides between a passed promise constructor from consuming code,
     * A default configured promise constructor, and the native promise
     * constructor and returns it. If nothing can be found, it will throw
     * an error.
     * @param promiseCtor The optional promise constructor to passed by consuming code
     */
    function getPromiseCtor(promiseCtor) {
      if (!promiseCtor) {
        promiseCtor = config_ts_3.config.Promise || Promise;
      }
      if (!promiseCtor) {
        throw new Error("no Promise impl found");
      }
      return promiseCtor;
    }
    return {
      setters: [
        function (canReportError_ts_1_1) {
          canReportError_ts_1 = canReportError_ts_1_1;
        },
        function (toSubscriber_ts_1_1) {
          toSubscriber_ts_1 = toSubscriber_ts_1_1;
        },
        function (observable_ts_5_1) {
          observable_ts_5 = observable_ts_5_1;
        },
        function (pipe_ts_1_1) {
          pipe_ts_1 = pipe_ts_1_1;
        },
        function (config_ts_3_1) {
          config_ts_3 = config_ts_3_1;
        },
        function (asyncIteratorFrom_ts_1_1) {
          asyncIteratorFrom_ts_1 = asyncIteratorFrom_ts_1_1;
        },
      ],
      execute: function () {
        Observable = /** @class */ (() => {
          /**
                 * A representation of any set of values over any amount of time. This is the most basic building block
                 * of RxJS.
                 *
                 * @class Observable<T>
                 */
          class Observable {
            /**
                     * @constructor
                     * @param {Function} subscribe the function that is called when the Observable is
                     * initially subscribed to. This function is given a Subscriber, to which new values
                     * can be `next`ed, or an `error` method can be called to raise an error, or
                     * `complete` can be called to notify of a successful completion.
                     */
            constructor(subscribe) {
              /** Internal implementation detail, do not use directly. */
              this._isScalar = false;
              if (subscribe) {
                this._subscribe = subscribe;
              }
            }
            /**
                     * Creates a new Observable, with this Observable as the source, and the passed
                     * operator defined as the new observable's operator.
                     * @method lift
                     * @param {Operator} operator the operator defining the operation to take on the observable
                     * @return {Observable} a new observable with the Operator applied
                     */
            lift(operator) {
              const observable = new Observable();
              observable.source = this;
              observable.operator = operator;
              return observable;
            }
            /**
                     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
                     *
                     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
                     *
                     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
                     * might be for example a function that you passed to Observable's constructor, but most of the time it is
                     * a library implementation, which defines what will be emitted by an Observable, and when it be will emitted. This means
                     * that calling `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
                     * the thought.
                     *
                     * Apart from starting the execution of an Observable, this method allows you to listen for values
                     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
                     * of the following ways.
                     *
                     * The first way is creating an object that implements {@link Observer} interface. It should have methods
                     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
                     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
                     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
                     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
                     * do anything, you can simply omit it. Note however, if the `error` method is not provided, all errors will
                     * be left uncaught.
                     *
                     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
                     * This means you can provide three functions as arguments to `subscribe`, where the first function is equivalent
                     * of a `next` method, the second of an `error` method and the third of a `complete` method. Just as in case of Observer,
                     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
                     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
                     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
                     *
                     * Whichever style of calling `subscribe` you use, in both cases it returns a Subscription object.
                     * This object allows you to call `unsubscribe` on it, which in turn will stop the work that an Observable does and will clean
                     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
                     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
                     *
                     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
                     * It is an Observable itself that decides when these functions will be called. For example {@link of}
                     * by default emits all its values synchronously. Always check documentation for how given Observable
                     * will behave when subscribed and if its default behavior can be modified with a `scheduler`.
                     *
                     * ## Example
                     * ### Subscribe with an Observer
                     * ```ts
                     * import { of } from 'rxjs.ts';
                     *
                     * const sumObserver = {
                     *   sum: 0,
                     *   next(value) {
                     *     console.log('Adding: ' + value);
                     *     this.sum = this.sum + value;
                     *   },
                     *   error() {
                     *     // We actually could just remove this method,
                     *     // since we do not really care about errors right now.
                     *   },
                     *   complete() {
                     *     console.log('Sum equals: ' + this.sum);
                     *   }
                     * };
                     *
                     * of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
                     *   .subscribe(sumObserver);
                     *
                     * // Logs:
                     * // "Adding: 1"
                     * // "Adding: 2"
                     * // "Adding: 3"
                     * // "Sum equals: 6"
                     * ```
                     *
                     * ### Subscribe with functions
                     * ```ts
                     * import { of } from 'rxjs'
                     *
                     * let sum = 0;
                     *
                     * of(1, 2, 3).subscribe(
                     *   value => {
                     *     console.log('Adding: ' + value);
                     *     sum = sum + value;
                     *   },
                     *   undefined,
                     *   () => console.log('Sum equals: ' + sum)
                     * );
                     *
                     * // Logs:
                     * // "Adding: 1"
                     * // "Adding: 2"
                     * // "Adding: 3"
                     * // "Sum equals: 6"
                     * ```
                     *
                     * ### Cancel a subscription
                     * ```ts
                     * import { interval } from 'rxjs.ts';
                     *
                     * const subscription = interval(1000).subscribe(
                     *   num => console.log(num),
                     *   undefined,
                     *   () => {
                     *     // Will not be called, even when cancelling subscription.
                     *     console.log('completed!');
                     *   }
                     * );
                     *
                     * setTimeout(() => {
                     *   subscription.unsubscribe();
                     *   console.log('unsubscribed!');
                     * }, 2500);
                     *
                     * // Logs:
                     * // 0 after 1s
                     * // 1 after 2s
                     * // "unsubscribed!" after 2.5s
                     * ```
                     *
                     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
                     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
                     *  Observable.
                     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
                     *  the error will be thrown as unhandled.
                     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
                     * @return {ISubscription} a subscription reference to the registered handlers
                     * @method subscribe
                     */
            subscribe(observerOrNext, error, complete) {
              const { operator } = this;
              const sink = toSubscriber_ts_1.toSubscriber(
                observerOrNext,
                error,
                complete,
              );
              if (operator) {
                sink.add(operator.call(sink, this.source));
              } else {
                sink.add(
                  this.source ||
                  (config_ts_3.config.useDeprecatedSynchronousErrorHandling &&
                    !sink.syncErrorThrowable)
                    ? this._subscribe(sink)
                    : this._trySubscribe(sink),
                );
              }
              if (config_ts_3.config.useDeprecatedSynchronousErrorHandling) {
                if (sink.syncErrorThrowable) {
                  sink.syncErrorThrowable = false;
                  if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                  }
                }
              }
              return sink;
            }
            /** @deprecated This is an internal implementation detail, do not use. */
            _trySubscribe(sink) {
              try {
                return this._subscribe(sink);
              } catch (err) {
                if (config_ts_3.config.useDeprecatedSynchronousErrorHandling) {
                  sink.syncErrorThrown = true;
                  sink.syncErrorValue = err;
                }
                if (canReportError_ts_1.canReportError(sink)) {
                  sink.error(err);
                } else {
                  console.warn(err);
                }
              }
            }
            /**
                     * @method forEach
                     * @param next a handler for each value emitted by the observable
                     * @param [promiseCtor] a constructor function used to instantiate the Promise
                     * @return a promise that either resolves on observable completion or
                     *  rejects with the handled error
                     */
            forEach(next, promiseCtor) {
              promiseCtor = getPromiseCtor(promiseCtor);
              return new promiseCtor((resolve, reject) => {
                // Must be declared in a separate statement to avoid a ReferenceError when
                // accessing subscription below in the closure due to Temporal Dead Zone.
                let subscription;
                subscription = this.subscribe(
                  (value) => {
                    try {
                      next(value);
                    } catch (err) {
                      reject(err);
                      if (subscription) {
                        subscription.unsubscribe();
                      }
                    }
                  },
                  reject,
                  resolve,
                );
              });
            }
            /** @internal This is an internal implementation detail, do not use. */
            _subscribe(subscriber) {
              const { source } = this;
              return source && source.subscribe(subscriber);
            }
            /**
                     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
                     * @method Symbol.observable
                     * @return {Observable} this instance of the observable
                     */
            [observable_ts_5.observable]() {
              return this;
            }
            /* tslint:enable:max-line-length */
            /**
                     * Used to stitch together functional operators into a chain.
                     * @method pipe
                     * @return {Observable} the Observable result of all of the operators having
                     * been called in the order they were passed in.
                     *
                     * ### Example
                     * ```ts
                     * import { interval } from 'rxjs.ts';
                     * import { map, filter, scan } from 'rxjs/operators.ts';
                     *
                     * interval(1000)
                     *   .pipe(
                     *     filter(x => x % 2 === 0),
                     *     map(x => x + x),
                     *     scan((acc, x) => acc + x)
                     *   )
                     *   .subscribe(x => console.log(x))
                     * ```
                     */
            pipe(...operations) {
              if (operations.length === 0) {
                return this;
              }
              return pipe_ts_1.pipeFromArray(operations)(this);
            }
            /* tslint:enable:max-line-length */
            /**
                     * Subscribe to this Observable and get a Promise resolving on
                     * `complete` with the last emission (if any).
                     *
                     * @method toPromise
                     * @param [promiseCtor] a constructor function used to instantiate
                     * the Promise
                     * @return A Promise that resolves with the last value emit, or
                     * rejects on an error. If there were no emissions, Promise
                     * resolves with undefined.
                     * @deprecated Deprecated use {@link firstValueFrom} or {@link lastValueFrom} instead
                     */
            toPromise(promiseCtor) {
              promiseCtor = getPromiseCtor(promiseCtor);
              return new promiseCtor((resolve, reject) => {
                let value;
                this.subscribe((x) => value = x, (err) => reject(err), () =>
                  resolve(value));
              });
            }
          }
          // HACK: Since TypeScript inherits static properties too, we have to
          // fight against TypeScript here so Subject can have a different static create signature
          /**
                 * Creates a new cold Observable by calling the Observable constructor
                 * @static true
                 * @owner Observable
                 * @method create
                 * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
                 * @return {Observable} a new cold observable
                 * @nocollapse
                 * @deprecated use new Observable() instead
                 */
          Observable.create = (subscribe) => {
            return new Observable(subscribe);
          };
          return Observable;
        })();
        exports_45("Observable", Observable);
        (function () {
          /**
                 * We only add this symbol if the runtime supports it.
                 * Adding this adds support for subscribing to observables
                 * via `for await(const value of source$) {}`
                 *
                 * This passes muster in Node 9, which does not support
                 * async iterators. As well as working in Node 12, which does
                 * support the symbol.
                 */
          if (Symbol && Symbol.asyncIterator) {
            Observable.prototype[Symbol.asyncIterator] = function () {
              return asyncIteratorFrom_ts_1.asyncIteratorFrom(this);
            };
          }
        })();
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/refCount",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_46, context_46) {
    "use strict";
    var Subscriber_ts_4, RefCountOperator, RefCountSubscriber;
    var __moduleName = context_46 && context_46.id;
    /**
     * Make a {@link ConnectableObservable} behave like a ordinary observable and automates the way
     * you can connect to it.
     *
     * Internally it counts the subscriptions to the observable and subscribes (only once) to the source if
     * the number of subscriptions is larger than 0. If the number of subscriptions is smaller than 1, it
     * unsubscribes from the source. This way you can make sure that everything before the *published*
     * refCount has only a single subscription independently of the number of subscribers to the target
     * observable.
     *
     * Note that using the {@link share} operator is exactly the same as using the *publish* operator
     * (making the observable hot) and the *refCount* operator in a sequence.
     *
     * ![](refCount.png)
     *
     * ## Example
     *
     * In the following example there are two intervals turned into connectable observables
     * by using the *publish* operator. The first one uses the *refCount* operator, the
     * second one does not use it. You will notice that a connectable observable does nothing
     * until you call its connect function.
     *
     * ```ts
     * import { interval } from 'rxjs.ts';
     * import { tap, publish, refCount } from 'rxjs/operators.ts';
     *
     * // Turn the interval observable into a ConnectableObservable (hot)
     * const refCountInterval = interval(400).pipe(
     *   tap((num) => console.log(`refCount ${num}`)),
     *   publish(),
     *   refCount()
     * );
     *
     * const publishedInterval = interval(400).pipe(
     *   tap((num) => console.log(`publish ${num}`)),
     *   publish()
     * );
     *
     * refCountInterval.subscribe();
     * refCountInterval.subscribe();
     * // 'refCount 0' -----> 'refCount 1' -----> etc
     * // All subscriptions will receive the same value and the tap (and
     * // every other operator) before the publish operator will be executed
     * // only once per event independently of the number of subscriptions.
     *
     * publishedInterval.subscribe();
     * // Nothing happens until you call .connect() on the observable.
     * ```
     *
     * @see {@link ConnectableObservable}
     * @see {@link share}
     * @see {@link publish}
     */
    function refCount() {
      return function refCountOperatorFunction(source) {
        return source.lift(new RefCountOperator(source));
      };
    }
    exports_46("refCount", refCount);
    return {
      setters: [
        function (Subscriber_ts_4_1) {
          Subscriber_ts_4 = Subscriber_ts_4_1;
        },
      ],
      execute: function () {
        RefCountOperator = class RefCountOperator {
          constructor(connectable) {
            this.connectable = connectable;
          }
          call(subscriber, source) {
            const { connectable } = this;
            connectable._refCount++;
            const refCounter = new RefCountSubscriber(subscriber, connectable);
            const subscription = source.subscribe(refCounter);
            if (!refCounter.closed) {
              refCounter.connection = connectable.connect();
            }
            return subscription;
          }
        };
        RefCountSubscriber = class RefCountSubscriber
          extends Subscriber_ts_4.Subscriber {
          constructor(destination, connectable) {
            super(destination);
            this.connectable = connectable;
            this.connection = null;
          }
          _unsubscribe() {
            const { connectable } = this;
            if (!connectable) {
              this.connection = null;
              return;
            }
            this.connectable = null;
            const refCount = connectable._refCount;
            if (refCount <= 0) {
              this.connection = null;
              return;
            }
            connectable._refCount = refCount - 1;
            if (refCount > 1) {
              this.connection = null;
              return;
            }
            ///
            // Compare the local RefCountSubscriber's connection Subscription to the
            // connection Subscription on the shared ConnectableObservable. In cases
            // where the ConnectableObservable source synchronously emits values, and
            // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
            // execution continues to here before the RefCountOperator has a chance to
            // supply the RefCountSubscriber with the shared connection Subscription.
            // For example:
            // ```
            // range(0, 10).pipe(
            //   publish(),
            //   refCount(),
            //   take(5),
            // )
            // .subscribe();
            // ```
            // In order to account for this case, RefCountSubscriber should only dispose
            // the ConnectableObservable's shared connection Subscription if the
            // connection Subscription exists, *and* either:
            //   a. RefCountSubscriber doesn't have a reference to the shared connection
            //      Subscription yet, or,
            //   b. RefCountSubscriber's connection Subscription reference is identical
            //      to the shared connection Subscription
            ///
            const { connection } = this;
            const sharedConnection = connectable._connection;
            this.connection = null;
            if (
              sharedConnection &&
              (!connection || sharedConnection === connection)
            ) {
              sharedConnection.unsubscribe();
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/ConnectableObservable",
  [
    "https://deno.land/x/rxjs/src/internal/Subject",
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/Subscription",
    "https://deno.land/x/rxjs/src/internal/operators/refCount",
  ],
  function (exports_47, context_47) {
    "use strict";
    var Subject_ts_1,
      Observable_ts_11,
      Subscriber_ts_5,
      Subscription_ts_9,
      refCount_ts_1,
      ConnectableObservable,
      connectableObservableDescriptor,
      ConnectableSubscriber,
      RefCountOperator,
      RefCountSubscriber;
    var __moduleName = context_47 && context_47.id;
    return {
      setters: [
        function (Subject_ts_1_1) {
          Subject_ts_1 = Subject_ts_1_1;
        },
        function (Observable_ts_11_1) {
          Observable_ts_11 = Observable_ts_11_1;
        },
        function (Subscriber_ts_5_1) {
          Subscriber_ts_5 = Subscriber_ts_5_1;
        },
        function (Subscription_ts_9_1) {
          Subscription_ts_9 = Subscription_ts_9_1;
        },
        function (refCount_ts_1_1) {
          refCount_ts_1 = refCount_ts_1_1;
        },
      ],
      execute: function () {
        /**
             * @class ConnectableObservable<T>
             */
        ConnectableObservable = class ConnectableObservable
          extends Observable_ts_11.Observable {
          constructor(source, subjectFactory) {
            super();
            this.source = source;
            this.subjectFactory = subjectFactory;
            this._refCount = 0;
            /** @internal */
            this._isComplete = false;
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _subscribe(subscriber) {
            return this.getSubject().subscribe(subscriber);
          }
          getSubject() {
            const subject = this._subject;
            if (!subject || subject.isStopped) {
              this._subject = this.subjectFactory();
            }
            return this._subject;
          }
          connect() {
            let connection = this._connection;
            if (!connection) {
              this._isComplete = false;
              connection = this._connection = new Subscription_ts_9
                .Subscription();
              connection.add(this.source
                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
              if (connection.closed) {
                this._connection = null;
                connection = Subscription_ts_9.Subscription.EMPTY;
              }
            }
            return connection;
          }
          refCount() {
            return refCount_ts_1.refCount()(this);
          }
        };
        exports_47("ConnectableObservable", ConnectableObservable);
        exports_47(
          "connectableObservableDescriptor",
          connectableObservableDescriptor = (() => {
            const connectableProto = ConnectableObservable.prototype;
            return {
              operator: { value: null },
              _refCount: { value: 0, writable: true },
              _subject: { value: null, writable: true },
              _connection: { value: null, writable: true },
              _subscribe: { value: connectableProto._subscribe },
              _isComplete: {
                value: connectableProto._isComplete,
                writable: true,
              },
              getSubject: { value: connectableProto.getSubject },
              connect: { value: connectableProto.connect },
              refCount: { value: connectableProto.refCount },
            };
          })(),
        );
        ConnectableSubscriber = class ConnectableSubscriber
          extends Subject_ts_1.SubjectSubscriber {
          constructor(destination, connectable) {
            super(destination);
            this.connectable = connectable;
          }
          _error(err) {
            this._unsubscribe();
            super._error(err);
          }
          _complete() {
            this.connectable._isComplete = true;
            this._unsubscribe();
            super._complete();
          }
          _unsubscribe() {
            const connectable = this.connectable;
            if (connectable) {
              this.connectable = null;
              const connection = connectable._connection;
              connectable._refCount = 0;
              connectable._subject = null;
              connectable._connection = null;
              if (connection) {
                connection.unsubscribe();
              }
            }
          }
        };
        RefCountOperator = class RefCountOperator {
          constructor(connectable) {
            this.connectable = connectable;
          }
          call(subscriber, source) {
            const { connectable } = this;
            connectable._refCount++;
            const refCounter = new RefCountSubscriber(subscriber, connectable);
            const subscription = source.subscribe(refCounter);
            if (!refCounter.closed) {
              refCounter.connection = connectable.connect();
            }
            return subscription;
          }
        };
        RefCountSubscriber = class RefCountSubscriber
          extends Subscriber_ts_5.Subscriber {
          constructor(destination, connectable) {
            super(destination);
            this.connectable = connectable;
          }
          _unsubscribe() {
            const { connectable } = this;
            if (!connectable) {
              this.connection = null;
              return;
            }
            this.connectable = null;
            const refCount = connectable._refCount;
            if (refCount <= 0) {
              this.connection = null;
              return;
            }
            connectable._refCount = refCount - 1;
            if (refCount > 1) {
              this.connection = null;
              return;
            }
            ///
            // Compare the local RefCountSubscriber's connection Subscription to the
            // connection Subscription on the shared ConnectableObservable. In cases
            // where the ConnectableObservable source synchronously emits values, and
            // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
            // execution continues to here before the RefCountOperator has a chance to
            // supply the RefCountSubscriber with the shared connection Subscription.
            // For example:
            // ```
            // range(0, 10).pipe(
            //   publish(),
            //   refCount(),
            //   take(5),
            // ).subscribe();
            // ```
            // In order to account for this case, RefCountSubscriber should only dispose
            // the ConnectableObservable's shared connection Subscription if the
            // connection Subscription exists, *and* either:
            //   a. RefCountSubscriber doesn't have a reference to the shared connection
            //      Subscription yet, or,
            //   b. RefCountSubscriber's connection Subscription reference is identical
            //      to the shared connection Subscription
            ///
            const { connection } = this;
            const sharedConnection = connectable._connection;
            this.connection = null;
            if (
              sharedConnection &&
              (!connection || sharedConnection === connection)
            ) {
              sharedConnection.unsubscribe();
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/groupBy",
  [
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/Subscription",
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/Subject",
  ],
  function (exports_48, context_48) {
    "use strict";
    var Subscriber_ts_6,
      Subscription_ts_10,
      Observable_ts_12,
      Subject_ts_2,
      GroupByOperator,
      GroupBySubscriber,
      GroupDurationSubscriber,
      GroupedObservable,
      InnerRefCountSubscription;
    var __moduleName = context_48 && context_48.id;
    /* tslint:enable:max-line-length */
    /**
     * Groups the items emitted by an Observable according to a specified criterion,
     * and emits these grouped items as `GroupedObservables`, one
     * {@link GroupedObservable} per group.
     *
     * ![](groupBy.png)
     *
     * When the Observable emits an item, a key is computed for this item with the keySelector function.
     *
     * If a {@link GroupedObservable} for this key exists, this {@link GroupedObservable} emits. Otherwise, a new
     * {@link GroupedObservable} for this key is created and emits.
     *
     * A {@link GroupedObservable} represents values belonging to the same group represented by a common key. The common
     * key is available as the `key` field of a {@link GroupedObservable} instance.
     *
     * The elements emitted by {@link GroupedObservable}s are by default the items emitted by the Observable, or elements
     * returned by the elementSelector function.
     *
     * ## Examples
     *
     * ### Group objects by id and return as array
     *
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { mergeMap, groupBy, reduce } from 'rxjs/operators.ts';
     *
     * of(
     *   {id: 1, name: 'JavaScript'},
     *   {id: 2, name: 'Parcel'},
     *   {id: 2, name: 'webpack'},
     *   {id: 1, name: 'TypeScript'},
     *   {id: 3, name: 'TSLint'}
     * ).pipe(
     *   groupBy(p => p.id),
     *   mergeMap((group$) => group$.pipe(reduce((acc, cur) => [...acc, cur], [])))
     * )
     * .subscribe(p => console.log(p));
     *
     * // displays:
     * // [ { id: 1, name: 'JavaScript'},
     * //   { id: 1, name: 'TypeScript'} ]
     * //
     * // [ { id: 2, name: 'Parcel'},
     * //   { id: 2, name: 'webpack'} ]
     * //
     * // [ { id: 3, name: 'TSLint'} ]
     * ```
     *
     * ### Pivot data on the id field
     *
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { groupBy, map, mergeMap, reduce } from 'rxjs/operators.ts';
     *
     * of(
     *   { id: 1, name: 'JavaScript' },
     *   { id: 2, name: 'Parcel' },
     *   { id: 2, name: 'webpack' },
     *   { id: 1, name: 'TypeScript' },
     *   { id: 3, name: 'TSLint' }
     * )
     *   .pipe(
     *     groupBy(p => p.id, p => p.name),
     *     mergeMap(group$ =>
     *       group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))
     *     ),
     *     map(arr => ({ id: parseInt(arr[0], 10), values: arr.slice(1) }))
     *  )
     *  .subscribe(p => console.log(p));
     *
     * // displays:
     * // { id: 1, values: [ 'JavaScript', 'TypeScript' ] }
     * // { id: 2, values: [ 'Parcel', 'webpack' ] }
     * // { id: 3, values: [ 'TSLint' ] }
     * ```
     *
     * @param {function(value: T): K} keySelector A function that extracts the key
     * for each item.
     * @param {function(value: T): R} [elementSelector] A function that extracts the
     * return element for each item.
     * @param {function(grouped: GroupedObservable<K,R>): Observable<any>} [durationSelector]
     * A function that returns an Observable to determine how long each group should
     * exist.
     * @param {function(): Subject<R>} [subjectSelector] Factory function to create an
     * intermediate Subject through which grouped elements are emitted.
     * @return {Observable<GroupedObservable<K,R>>} An Observable that emits
     * GroupedObservables, each of which corresponds to a unique key value and each
     * of which emits those items from the source Observable that share that key
     * value.
     * @name groupBy
     */
    function groupBy(
      keySelector,
      elementSelector,
      durationSelector,
      subjectSelector,
    ) {
      return (source) =>
        source.lift(
          new GroupByOperator(
            keySelector,
            elementSelector,
            durationSelector,
            subjectSelector,
          ),
        );
    }
    exports_48("groupBy", groupBy);
    return {
      setters: [
        function (Subscriber_ts_6_1) {
          Subscriber_ts_6 = Subscriber_ts_6_1;
        },
        function (Subscription_ts_10_1) {
          Subscription_ts_10 = Subscription_ts_10_1;
        },
        function (Observable_ts_12_1) {
          Observable_ts_12 = Observable_ts_12_1;
        },
        function (Subject_ts_2_1) {
          Subject_ts_2 = Subject_ts_2_1;
        },
      ],
      execute: function () {
        GroupByOperator = class GroupByOperator {
          constructor(
            keySelector,
            elementSelector,
            durationSelector,
            subjectSelector,
          ) {
            this.keySelector = keySelector;
            this.elementSelector = elementSelector;
            this.durationSelector = durationSelector;
            this.subjectSelector = subjectSelector;
          }
          call(subscriber, source) {
            return source.subscribe(
              new GroupBySubscriber(
                subscriber,
                this.keySelector,
                this.elementSelector,
                this.durationSelector,
                this.subjectSelector,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        GroupBySubscriber = class GroupBySubscriber
          extends Subscriber_ts_6.Subscriber {
          constructor(
            destination,
            keySelector,
            elementSelector,
            durationSelector,
            subjectSelector,
          ) {
            super(destination);
            this.keySelector = keySelector;
            this.elementSelector = elementSelector;
            this.durationSelector = durationSelector;
            this.subjectSelector = subjectSelector;
            this.groups = null;
            this.attemptedToUnsubscribe = false;
            this.count = 0;
          }
          _next(value) {
            let key;
            try {
              key = this.keySelector(value);
            } catch (err) {
              this.error(err);
              return;
            }
            this._group(value, key);
          }
          _group(value, key) {
            let groups = this.groups;
            if (!groups) {
              groups = this.groups = new Map();
            }
            let group = groups.get(key);
            let element;
            if (this.elementSelector) {
              try {
                element = this.elementSelector(value);
              } catch (err) {
                this.error(err);
              }
            } else {
              element = value;
            }
            if (!group) {
              group =
                (this.subjectSelector ? this.subjectSelector()
                : new Subject_ts_2.Subject());
              groups.set(key, group);
              const groupedObservable = new GroupedObservable(key, group, this);
              this.destination.next(groupedObservable);
              if (this.durationSelector) {
                let duration;
                try {
                  duration = this.durationSelector(
                    new GroupedObservable(key, group),
                  );
                } catch (err) {
                  this.error(err);
                  return;
                }
                this.add(
                  duration.subscribe(
                    new GroupDurationSubscriber(key, group, this),
                  ),
                );
              }
            }
            if (!group.closed) {
              group.next(element);
            }
          }
          _error(err) {
            const groups = this.groups;
            if (groups) {
              groups.forEach((group, key) => {
                group.error(err);
              });
              groups.clear();
            }
            this.destination.error(err);
          }
          _complete() {
            const groups = this.groups;
            if (groups) {
              groups.forEach((group, key) => {
                group.complete();
              });
              groups.clear();
            }
            this.destination.complete();
          }
          removeGroup(key) {
            this.groups.delete(key);
          }
          unsubscribe() {
            if (!this.closed) {
              this.attemptedToUnsubscribe = true;
              if (this.count === 0) {
                super.unsubscribe();
              }
            }
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        GroupDurationSubscriber = class GroupDurationSubscriber
          extends Subscriber_ts_6.Subscriber {
          constructor(key, group, parent) {
            super(group);
            this.key = key;
            this.group = group;
            this.parent = parent;
          }
          _next(value) {
            this.complete();
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _unsubscribe() {
            const { parent, key } = this;
            this.key = this.parent = null;
            if (parent) {
              parent.removeGroup(key);
            }
          }
        };
        /**
             * An Observable representing values belonging to the same group represented by
             * a common key. The values emitted by a GroupedObservable come from the source
             * Observable. The common key is available as the field `key` on a
             * GroupedObservable instance.
             *
             * @class GroupedObservable<K, T>
             */
        GroupedObservable = class GroupedObservable
          extends Observable_ts_12.Observable {
          /** @deprecated Do not construct this type. Internal use only */
          constructor(key, groupSubject, refCountSubscription) {
            super();
            this.key = key;
            this.groupSubject = groupSubject;
            this.refCountSubscription = refCountSubscription;
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _subscribe(subscriber) {
            const subscription = new Subscription_ts_10.Subscription();
            const { refCountSubscription, groupSubject } = this;
            if (refCountSubscription && !refCountSubscription.closed) {
              subscription.add(
                new InnerRefCountSubscription(refCountSubscription),
              );
            }
            subscription.add(groupSubject.subscribe(subscriber));
            return subscription;
          }
        };
        exports_48("GroupedObservable", GroupedObservable);
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        InnerRefCountSubscription = class InnerRefCountSubscription
          extends Subscription_ts_10.Subscription {
          constructor(parent) {
            super();
            this.parent = parent;
            parent.count++;
          }
          unsubscribe() {
            const parent = this.parent;
            if (!parent.closed && !this.closed) {
              super.unsubscribe();
              parent.count -= 1;
              if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                parent.unsubscribe();
              }
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/requestFrame",
  [],
  function (exports_49, context_49) {
    "use strict";
    var RequestFrame;
    var __moduleName = context_49 && context_49.id;
    return {
      setters: [],
      execute: function () {
        exports_49(
          "RequestFrame",
          RequestFrame = () => {
            var lastTime = 0;
            let window = {
              requestAnimationFrame: (callback) => {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = setTimeout(function () {
                  callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
              },
              cancelAnimationFrame: (id) => {
                clearTimeout(id);
              },
            };
            return window;
          },
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/dom/animationFrames",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/util/requestFrame",
  ],
  function (exports_50, context_50) {
    "use strict";
    var Observable_ts_13, requestFrame_ts_1, window, DEFAULT_ANIMATION_FRAMES;
    var __moduleName = context_50 && context_50.id;
    /**
     * An observable of animation frames
     *
     * Emits the the amount of time elapsed since subscription on each animation frame. Defaults to elapsed
     * milliseconds. Does not end on its own.
     *
     * Every subscription will start a separate animation loop. Since animation frames are always scheduled
     * by the browser to occur directly before a repaint, scheduling more than one animation frame synchronously
     * should not be much different or have more overhead than looping over an array of events during
     * a single animation frame. However, if for some reason the developer would like to ensure the
     * execution of animation-related handlers are all executed during the same task by the engine,
     * the `share` operator can be used.
     *
     * This is useful for setting up animations with RxJS.
     *
     * ### Example
     *
     * Tweening a div to move it on the screen
     *
     * ```ts
     * import { animationFrames } from 'rxjs.ts';
     * import { map, takeWhile, endWith } from 'rxjs/operators.ts';
     *
     * function tween(start: number, end: number, duration: number) {
     *   const diff = end - start;
     *   return animationFrames().pipe(
     *     // Figure out what percentage of time has passed
     *     map(elapsed => elapsed / duration),
     *     // Take the vector while less than 100%
     *     takeWhile(v => v < 1),
     *     // Finish with 100%
     *     endWith(1),
     *     // Calculate the distance traveled between start and end
     *     map(v => v * diff + start)
     *   );
     * }
     *
     * // Setup a div for us to move around
     * const div = document.createElement('div');
     * document.body.appendChild(div);
     * div.style.position = 'absolute.ts';
     * div.style.width = '40px.ts';
     * div.style.height = '40px.ts';
     * div.style.backgroundColor = 'lime.ts';
     * div.style.transform = 'translate3d(10px, 0, 0).ts';
     *
     * tween(10, 200, 4000).subscribe(x => {
     *   div.style.transform = `translate3d(${x}px, 0, 0)`;
     * });
     * ```
     *
     * ### Example
     *
     * Providing a custom timestamp provider
     *
     * ```ts
     * import { animationFrames, TimestampProvider } from 'rxjs.ts';
     *
     * // A custom timestamp provider
     * let now = 0;
     * const customTSProvider: TimestampProvider = {
     *   now() { return now++; }
     * };
     *
     * const source$ = animationFrames(customTSProvider);
     *
     * // Log increasing numbers 0...1...2... on every animation frame.
     * source$.subscribe(x => console.log(x));
     * ```
     *
     * @param timestampProvider An object with a `now` method that provides a numeric timestamp
     */
    function animationFrames(timestampProvider = Date) {
      return timestampProvider === Date
        ? DEFAULT_ANIMATION_FRAMES
        : animationFramesFactory(timestampProvider);
    }
    exports_50("animationFrames", animationFrames);
    /**
     * Does the work of creating the observable for `animationFrames`.
     * @param timestampProvider The timestamp provider to use to create the observable
     */
    function animationFramesFactory(timestampProvider) {
      return new Observable_ts_13.Observable((subscriber) => {
        let id;
        const start = timestampProvider.now();
        const run = () => {
          subscriber.next(timestampProvider.now() - start);
          if (!subscriber.closed) {
            id = window.requestAnimationFrame(run);
          }
        };
        id = window.requestAnimationFrame(run);
        return () => window.cancelAnimationFrame(id);
      });
    }
    return {
      setters: [
        function (Observable_ts_13_1) {
          Observable_ts_13 = Observable_ts_13_1;
        },
        function (requestFrame_ts_1_1) {
          requestFrame_ts_1 = requestFrame_ts_1_1;
        },
      ],
      execute: function () {
        window = requestFrame_ts_1.RequestFrame();
        /**
             * In the common case, where `Date` is passed to `animationFrames` as the default,
             * we use this shared observable to reduce overhead.
             */
        DEFAULT_ANIMATION_FRAMES = animationFramesFactory(Date);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/BehaviorSubject",
  [
    "https://deno.land/x/rxjs/src/internal/Subject",
    "https://deno.land/x/rxjs/src/internal/util/ObjectUnsubscribedError",
  ],
  function (exports_51, context_51) {
    "use strict";
    var Subject_ts_3, ObjectUnsubscribedError_ts_2, BehaviorSubject;
    var __moduleName = context_51 && context_51.id;
    return {
      setters: [
        function (Subject_ts_3_1) {
          Subject_ts_3 = Subject_ts_3_1;
        },
        function (ObjectUnsubscribedError_ts_2_1) {
          ObjectUnsubscribedError_ts_2 = ObjectUnsubscribedError_ts_2_1;
        },
      ],
      execute: function () {
        /**
             * A variant of Subject that requires an initial value and emits its current
             * value whenever it is subscribed to.
             *
             * @class BehaviorSubject<T>
             */
        BehaviorSubject = class BehaviorSubject extends Subject_ts_3.Subject {
          constructor(_value) {
            super();
            this._value = _value;
          }
          get value() {
            return this.getValue();
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _subscribe(subscriber) {
            const subscription = super._subscribe(subscriber);
            if (subscription && !subscription.closed) {
              subscriber.next(this._value);
            }
            return subscription;
          }
          getValue() {
            if (this.hasError) {
              throw this.thrownError;
            } else if (this.closed) {
              throw new ObjectUnsubscribedError_ts_2.ObjectUnsubscribedError();
            } else {
              return this._value;
            }
          }
          next(value) {
            super.next(this._value = value);
          }
        };
        exports_51("BehaviorSubject", BehaviorSubject);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/ReplaySubject",
  [
    "https://deno.land/x/rxjs/src/internal/Subject",
    "https://deno.land/x/rxjs/src/internal/Subscription",
    "https://deno.land/x/rxjs/src/internal/util/ObjectUnsubscribedError",
    "https://deno.land/x/rxjs/src/internal/SubjectSubscription",
  ],
  function (exports_52, context_52) {
    "use strict";
    var Subject_ts_4,
      Subscription_ts_11,
      ObjectUnsubscribedError_ts_3,
      SubjectSubscription_ts_2,
      ReplaySubject;
    var __moduleName = context_52 && context_52.id;
    return {
      setters: [
        function (Subject_ts_4_1) {
          Subject_ts_4 = Subject_ts_4_1;
        },
        function (Subscription_ts_11_1) {
          Subscription_ts_11 = Subscription_ts_11_1;
        },
        function (ObjectUnsubscribedError_ts_3_1) {
          ObjectUnsubscribedError_ts_3 = ObjectUnsubscribedError_ts_3_1;
        },
        function (SubjectSubscription_ts_2_1) {
          SubjectSubscription_ts_2 = SubjectSubscription_ts_2_1;
        },
      ],
      execute: function () {
        /**
             * A variant of {@link Subject} that "replays" old values to new subscribers by emitting them when they first subscribe.
             *
             * `ReplaySubject` has an internal buffer that will store a specified number of values that it has observed. Like `Subject`,
             * `ReplaySubject` "observes" values by having them passed to its `next` method. When it observes a value, it will store that
             * value for a time determined by the configuration of the `ReplaySubject`, as passed to its constructor.
             *
             * When a new subscriber subscribes to the `ReplaySubject` instance, it will synchronously emit all values in its buffer in
             * a First-In-First-Out (FIFO) manner. The `ReplaySubject` will also complete, if it has observed completion; and it will
             * error if it has observed an error.
             *
             * There are two main configuration items to be concerned with:
             *
             * 1. `bufferSize` - This will determine how many items are stored in the buffer, defaults to infinite.
             * 2. `windowTime` - The amount of time to hold a value in the buffer before removing it from the buffer.
             *
             * Both configurations may exist simultaneously. So if you would like to buffer a maximum of 3 values, as long as the values
             * are less than 2 seconds old, you could do so with a `new ReplaySubject(3, 2000)`.
             *
             * ### Differences with BehaviorSubject
             *
             * `BehaviorSubject` is similar to `new ReplaySubject(1)`, with a couple fo exceptions:
             *
             * 1. `BehaviorSubject` comes "primed" with a single value upon construction.
             * 2. `ReplaySubject` will replay values, even after observing an error, where `BehaviorSubject` will not.
             *
             * {@see Subject}
             * {@see BehaviorSubject}
             * {@see shareReplay}
             */
        ReplaySubject = class ReplaySubject extends Subject_ts_4.Subject {
          /**
                 * @param bufferSize The size of the buffer to replay on subscription
                 * @param windowTime The amount of time the buffered items will say buffered
                 * @param timestampProvider An object with a `now()` method that provides the current timestamp. This is used to
                 * calculate the amount of time something has been buffered.
                 */
          constructor(
            bufferSize = Infinity,
            windowTime = Infinity,
            timestampProvider = Date,
          ) {
            super();
            this.timestampProvider = timestampProvider;
            this._events = [];
            this._infiniteTimeWindow = false;
            this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
            this._windowTime = windowTime < 1 ? 1 : windowTime;
            if (windowTime === Infinity) {
              this._infiniteTimeWindow = true;
              /** @override */
              this.next = this.nextInfiniteTimeWindow;
            } else {
              this.next = this.nextTimeWindow;
            }
          }
          nextInfiniteTimeWindow(value) {
            const _events = this._events;
            _events.push(value);
            // Since this method is invoked in every next() call than the buffer
            // can overgrow the max size only by one item
            if (_events.length > this._bufferSize) {
              _events.shift();
            }
            super.next(value);
          }
          nextTimeWindow(value) {
            this._events.push({ time: this._getNow(), value });
            this._trimBufferThenGetEvents();
            super.next(value);
          }
          /** @deprecated Remove in v8. This is an internal implementation detail, do not use. */
          _subscribe(subscriber) {
            // When `_infiniteTimeWindow === true` then the buffer is already trimmed
            const _infiniteTimeWindow = this._infiniteTimeWindow;
            const _events = _infiniteTimeWindow ? this._events
            : this._trimBufferThenGetEvents();
            const len = _events.length;
            let subscription;
            if (this.closed) {
              throw new ObjectUnsubscribedError_ts_3.ObjectUnsubscribedError();
            } else if (this.isStopped || this.hasError) {
              subscription = Subscription_ts_11.Subscription.EMPTY;
            } else {
              this.observers.push(subscriber);
              subscription = new SubjectSubscription_ts_2.SubjectSubscription(
                this,
                subscriber,
              );
            }
            if (_infiniteTimeWindow) {
              for (let i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i]);
              }
            } else {
              for (let i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i].value);
              }
            }
            if (this.hasError) {
              subscriber.error(this.thrownError);
            } else if (this.isStopped) {
              subscriber.complete();
            }
            return subscription;
          }
          _getNow() {
            const { timestampProvider: scheduler } = this;
            return scheduler ? scheduler.now() : Date.now();
          }
          _trimBufferThenGetEvents() {
            const now = this._getNow();
            const _bufferSize = this._bufferSize;
            const _windowTime = this._windowTime;
            const _events = this._events;
            const eventsCount = _events.length;
            let spliceCount = 0;
            // Trim events that fall out of the time window.
            // Start at the front of the list. Break early once
            // we encounter an event that falls within the window.
            while (spliceCount < eventsCount) {
              if ((now - _events[spliceCount].time) < _windowTime) {
                break;
              }
              spliceCount++;
            }
            if (eventsCount > _bufferSize) {
              spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
            }
            if (spliceCount > 0) {
              _events.splice(0, spliceCount);
            }
            return _events;
          }
        };
        exports_52("ReplaySubject", ReplaySubject);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/AsyncSubject",
  [
    "https://deno.land/x/rxjs/src/internal/Subject",
    "https://deno.land/x/rxjs/src/internal/Subscription",
  ],
  function (exports_53, context_53) {
    "use strict";
    var Subject_ts_5, Subscription_ts_12, AsyncSubject;
    var __moduleName = context_53 && context_53.id;
    return {
      setters: [
        function (Subject_ts_5_1) {
          Subject_ts_5 = Subject_ts_5_1;
        },
        function (Subscription_ts_12_1) {
          Subscription_ts_12 = Subscription_ts_12_1;
        },
      ],
      execute: function () {
        /**
             * A variant of Subject that only emits a value when it completes. It will emit
             * its latest value to all its observers on completion.
             *
             * @class AsyncSubject<T>
             */
        AsyncSubject = class AsyncSubject extends Subject_ts_5.Subject {
          constructor() {
            super(...arguments);
            this.value = null;
            this.hasNext = false;
            this.hasCompleted = false;
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _subscribe(subscriber) {
            if (this.hasError) {
              subscriber.error(this.thrownError);
              return Subscription_ts_12.Subscription.EMPTY;
            } else if (this.hasCompleted && this.hasNext) {
              subscriber.next(this.value);
              subscriber.complete();
              return Subscription_ts_12.Subscription.EMPTY;
            }
            return super._subscribe(subscriber);
          }
          next(value) {
            if (!this.hasCompleted) {
              this.value = value;
              this.hasNext = true;
            }
          }
          error(error) {
            if (!this.hasCompleted) {
              super.error(error);
            }
          }
          complete() {
            this.hasCompleted = true;
            if (this.hasNext) {
              super.next(this.value);
            }
            super.complete();
          }
        };
        exports_53("AsyncSubject", AsyncSubject);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/Immediate",
  [],
  function (exports_54, context_54) {
    "use strict";
    var nextHandle, resolved, activeHandles, Immediate, TestTools;
    var __moduleName = context_54 && context_54.id;
    /**
     * Finds the handle in the list of active handles, and removes it.
     * Returns `true` if found, `false` otherwise. Used both to clear
     * Immediate scheduled tasks, and to identify if a task should be scheduled.
     */
    function findAndClearHandle(handle) {
      if (handle in activeHandles) {
        delete activeHandles[handle];
        return true;
      }
      return false;
    }
    return {
      setters: [],
      execute: function () {
        nextHandle = 1;
        activeHandles = {};
        /**
             * Helper functions to schedule and unschedule microtasks.
             */
        exports_54(
          "Immediate",
          Immediate = {
            setImmediate(cb) {
              const handle = nextHandle++;
              activeHandles[handle] = true;
              if (!resolved) {
                resolved = Promise.resolve();
              }
              resolved.then(() => findAndClearHandle(handle) && cb());
              return handle;
            },
            clearImmediate(handle) {
              findAndClearHandle(handle);
            },
          },
        );
        /**
             * Used for internal testing purposes only. Do not export from library.
             */
        exports_54(
          "TestTools",
          TestTools = {
            pending() {
              return Object.keys(activeHandles).length;
            },
          },
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/Scheduler",
  [],
  function (exports_55, context_55) {
    "use strict";
    var Scheduler;
    var __moduleName = context_55 && context_55.id;
    return {
      setters: [],
      execute: function () {
        Scheduler = /** @class */ (() => {
          /**
                 * An execution context and a data structure to order tasks and schedule their
                 * execution. Provides a notion of (potentially virtual) time, through the
                 * `now()` getter method.
                 *
                 * Each unit of work in a Scheduler is called an `Action`.
                 *
                 * ```ts
                 * class Scheduler {
                 *   now(): number;
                 *   schedule(work, delay?, state?): Subscription;
                 * }
                 * ```
                 *
                 * @class Scheduler
                 * @deprecated Scheduler is an internal implementation detail of RxJS, and
                 * should not be used directly. Rather, create your own class and implement
                 * {@link SchedulerLike}
                 */
          class Scheduler {
            constructor(SchedulerAction, now = Scheduler.now) {
              this.SchedulerAction = SchedulerAction;
              this.now = now;
            }
            /**
                     * Schedules a function, `work`, for execution. May happen at some point in
                     * the future, according to the `delay` parameter, if specified. May be passed
                     * some context object, `state`, which will be passed to the `work` function.
                     *
                     * The given arguments will be processed an stored as an Action object in a
                     * queue of actions.
                     *
                     * @param {function(state: ?T): ?Subscription} work A function representing a
                     * task, or some unit of work to be executed by the Scheduler.
                     * @param {number} [delay] Time to wait before executing the work, where the
                     * time unit is implicit and defined by the Scheduler itself.
                     * @param {T} [state] Some contextual data that the `work` function uses when
                     * called by the Scheduler.
                     * @return {Subscription} A subscription in order to be able to unsubscribe
                     * the scheduled work.
                     */
            schedule(work, delay = 0, state) {
              return new this.SchedulerAction(this, work).schedule(
                state,
                delay,
              );
            }
          }
          /**
                 * Note: the extra arrow function wrapper is to make testing by overriding
                 * Date.now easier.
                 * @nocollapse
                 */
          Scheduler.now = () => Date.now();
          return Scheduler;
        })();
        exports_55("Scheduler", Scheduler);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduler/Action",
  ["https://deno.land/x/rxjs/src/internal/Subscription"],
  function (exports_56, context_56) {
    "use strict";
    var Subscription_ts_13, Action;
    var __moduleName = context_56 && context_56.id;
    return {
      setters: [
        function (Subscription_ts_13_1) {
          Subscription_ts_13 = Subscription_ts_13_1;
        },
      ],
      execute: function () {
        /**
             * A unit of work to be executed in a `scheduler`. An action is typically
             * created from within a {@link SchedulerLike} and an RxJS user does not need to concern
             * themselves about creating and manipulating an Action.
             *
             * ```ts
             * class Action<T> extends Subscription {
             *   new (scheduler: Scheduler, work: (state?: T) => void);
             *   schedule(state?: T, delay: number = 0): Subscription;
             * }
             * ```
             *
             * @class Action<T>
             */
        Action = class Action extends Subscription_ts_13.Subscription {
          constructor(scheduler, work) {
            super();
          }
          /**
                 * Schedules this action on its parent {@link SchedulerLike} for execution. May be passed
                 * some context object, `state`. May happen at some point in the future,
                 * according to the `delay` parameter, if specified.
                 * @param {T} [state] Some contextual data that the `work` function uses when
                 * called by the Scheduler.
                 * @param {number} [delay] Time to wait before executing the work, where the
                 * time unit is implicit and defined by the Scheduler.
                 * @return {void}
                 */
          schedule(state, delay = 0) {
            return this;
          }
        };
        exports_56("Action", Action);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduler/AsyncScheduler",
  ["https://deno.land/x/rxjs/src/internal/Scheduler"],
  function (exports_57, context_57) {
    "use strict";
    var Scheduler_ts_1, AsyncScheduler;
    var __moduleName = context_57 && context_57.id;
    return {
      setters: [
        function (Scheduler_ts_1_1) {
          Scheduler_ts_1 = Scheduler_ts_1_1;
        },
      ],
      execute: function () {
        AsyncScheduler = class AsyncScheduler extends Scheduler_ts_1.Scheduler {
          constructor(SchedulerAction, now = Scheduler_ts_1.Scheduler.now) {
            super(SchedulerAction, () => {
              if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
                return AsyncScheduler.delegate.now();
              } else {
                return now();
              }
            });
            this.actions = [];
            /**
                     * A flag to indicate whether the Scheduler is currently executing a batch of
                     * queued actions.
                     * @type {boolean}
                     * @deprecated internal use only
                     */
            this.active = false;
            /**
                     * An internal ID used to track the latest asynchronous task such as those
                     * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
                     * others.
                     * @type {any}
                     * @deprecated internal use only
                     */
            this.scheduled = undefined;
          }
          schedule(work, delay = 0, state) {
            if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
              return AsyncScheduler.delegate.schedule(work, delay, state);
            } else {
              return super.schedule(work, delay, state);
            }
          }
          flush(action) {
            const { actions } = this;
            if (this.active) {
              actions.push(action);
              return;
            }
            let error;
            this.active = true;
            do {
              if (error = action.execute(action.state, action.delay)) {
                break;
              }
            } while (action = actions.shift()); // exhaust the scheduler queue
            this.active = false;
            if (error) {
              while (action = actions.shift()) {
                action.unsubscribe();
              }
              throw error;
            }
          }
        };
        exports_57("AsyncScheduler", AsyncScheduler);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduler/AsyncAction",
  ["https://deno.land/x/rxjs/src/internal/scheduler/Action"],
  function (exports_58, context_58) {
    "use strict";
    var Action_ts_1, AsyncAction;
    var __moduleName = context_58 && context_58.id;
    return {
      setters: [
        function (Action_ts_1_1) {
          Action_ts_1 = Action_ts_1_1;
        },
      ],
      execute: function () {
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        AsyncAction = class AsyncAction extends Action_ts_1.Action {
          constructor(scheduler, work) {
            super(scheduler, work);
            this.scheduler = scheduler;
            this.work = work;
            this.pending = false;
          }
          schedule(state, delay = 0) {
            if (this.closed) {
              return this;
            }
            // Always replace the current state with the new state.
            this.state = state;
            const id = this.id;
            const scheduler = this.scheduler;
            //
            // Important implementation note:
            //
            // Actions only execute once by default, unless rescheduled from within the
            // scheduled callback. This allows us to implement single and repeat
            // actions via the same code path, without adding API surface area, as well
            // as mimic traditional recursion but across asynchronous boundaries.
            //
            // However, JS runtimes and timers distinguish between intervals achieved by
            // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
            // serial `setTimeout` calls can be individually delayed, which delays
            // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
            // guarantee the interval callback will be invoked more precisely to the
            // interval period, regardless of load.
            //
            // Therefore, we use `setInterval` to schedule single and repeat actions.
            // If the action reschedules itself with the same delay, the interval is not
            // canceled. If the action doesn't reschedule, or reschedules with a
            // different delay, the interval will be canceled after scheduled callback
            // execution.
            //
            if (id != null) {
              this.id = this.recycleAsyncId(scheduler, id, delay);
            }
            // Set the pending flag indicating that this action has been scheduled, or
            // has recursively rescheduled itself.
            this.pending = true;
            this.delay = delay;
            // If this action has already an async Id, don't request a new one.
            this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
            return this;
          }
          requestAsyncId(scheduler, id, delay = 0) {
            return setInterval(scheduler.flush.bind(scheduler, this), delay);
          }
          recycleAsyncId(scheduler, id, delay = 0) {
            // If this action is rescheduled with the same delay time, don't clear the interval id.
            if (
              delay !== null && this.delay === delay && this.pending === false
            ) {
              return id;
            }
            // Otherwise, if the action's delay time is different from the current delay,
            // or the action has been rescheduled before it's executed, clear the interval id
            clearInterval(id);
            return undefined;
          }
          /**
                 * Immediately executes this action and the `work` it contains.
                 * @return {any}
                 */
          execute(state, delay) {
            if (this.closed) {
              return new Error("executing a cancelled action");
            }
            this.pending = false;
            const error = this._execute(state, delay);
            if (error) {
              return error;
            } else if (this.pending === false && this.id != null) {
              // Dequeue if the action didn't reschedule itself. Don't call
              // unsubscribe(), because the action could reschedule later.
              // For example:
              // ```
              // scheduler.schedule(function doWork(counter) {
              //   /* ... I'm a busy worker bee ... */
              //   var originalAction = this;
              //   /* wait 100ms before rescheduling the action */
              //   setTimeout(function () {
              //     originalAction.schedule(counter + 1);
              //   }, 100);
              // }, 1000);
              // ```
              this.id = this.recycleAsyncId(this.scheduler, this.id, null);
            }
          }
          _execute(state, delay) {
            let errored = false;
            let errorValue = undefined;
            try {
              this.work(state);
            } catch (e) {
              errored = true;
              errorValue = !!e && e || new Error(e);
            }
            if (errored) {
              this.unsubscribe();
              return errorValue;
            }
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _unsubscribe() {
            const id = this.id;
            const scheduler = this.scheduler;
            const actions = scheduler.actions;
            const index = actions.indexOf(this);
            this.work = null;
            this.state = null;
            this.pending = false;
            this.scheduler = null;
            if (index !== -1) {
              actions.splice(index, 1);
            }
            if (id != null) {
              this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
          }
        };
        exports_58("AsyncAction", AsyncAction);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduler/AsapScheduler",
  ["https://deno.land/x/rxjs/src/internal/scheduler/AsyncScheduler"],
  function (exports_59, context_59) {
    "use strict";
    var AsyncScheduler_ts_1, AsapScheduler;
    var __moduleName = context_59 && context_59.id;
    return {
      setters: [
        function (AsyncScheduler_ts_1_1) {
          AsyncScheduler_ts_1 = AsyncScheduler_ts_1_1;
        },
      ],
      execute: function () {
        AsapScheduler = class AsapScheduler
          extends AsyncScheduler_ts_1.AsyncScheduler {
          flush(action) {
            this.active = true;
            this.scheduled = undefined;
            const { actions } = this;
            let error;
            let index = -1;
            action = action || actions.shift();
            let count = actions.length;
            do {
              if (error = action.execute(action.state, action.delay)) {
                break;
              }
            } while (++index < count && (action = actions.shift()));
            this.active = false;
            if (error) {
              while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
              }
              throw error;
            }
          }
        };
        exports_59("AsapScheduler", AsapScheduler);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduler/AsapAction",
  [
    "https://deno.land/x/rxjs/src/internal/util/Immediate",
    "https://deno.land/x/rxjs/src/internal/scheduler/AsyncAction",
  ],
  function (exports_60, context_60) {
    "use strict";
    var Immediate_ts_1, AsyncAction_ts_1, AsapAction;
    var __moduleName = context_60 && context_60.id;
    return {
      setters: [
        function (Immediate_ts_1_1) {
          Immediate_ts_1 = Immediate_ts_1_1;
        },
        function (AsyncAction_ts_1_1) {
          AsyncAction_ts_1 = AsyncAction_ts_1_1;
        },
      ],
      execute: function () {
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        AsapAction = class AsapAction extends AsyncAction_ts_1.AsyncAction {
          constructor(scheduler, work) {
            super(scheduler, work);
            this.scheduler = scheduler;
            this.work = work;
          }
          requestAsyncId(scheduler, id, delay = 0) {
            // If delay is greater than 0, request as an async action.
            if (delay !== null && delay > 0) {
              return super.requestAsyncId(scheduler, id, delay);
            }
            // Push the action to the end of the scheduler queue.
            scheduler.actions.push(this);
            // If a microtask has already been scheduled, don't schedule another
            // one. If a microtask hasn't been scheduled yet, schedule one now. Return
            // the current scheduled microtask id.
            return scheduler.scheduled ||
              (scheduler.scheduled = Immediate_ts_1.Immediate.setImmediate(
                scheduler.flush.bind(scheduler, undefined),
              ));
          }
          recycleAsyncId(scheduler, id, delay = 0) {
            // If delay exists and is greater than 0, or if the delay is null (the
            // action wasn't rescheduled) but was originally scheduled as an async
            // action, then recycle as an async action.
            if (
              (delay !== null && delay > 0) ||
              (delay === null && this.delay > 0)
            ) {
              return super.recycleAsyncId(scheduler, id, delay);
            }
            // If the scheduler queue is empty, cancel the requested microtask and
            // set the scheduled flag to undefined so the next AsapAction will schedule
            // its own.
            if (scheduler.actions.length === 0) {
              Immediate_ts_1.Immediate.clearImmediate(id);
              scheduler.scheduled = undefined;
            }
            // Return undefined so the action knows to request a new async id if it's rescheduled.
            return undefined;
          }
        };
        exports_60("AsapAction", AsapAction);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduler/asap",
  [
    "https://deno.land/x/rxjs/src/internal/scheduler/AsapAction",
    "https://deno.land/x/rxjs/src/internal/scheduler/AsapScheduler",
  ],
  function (exports_61, context_61) {
    "use strict";
    var AsapAction_ts_1, AsapScheduler_ts_1, asap;
    var __moduleName = context_61 && context_61.id;
    return {
      setters: [
        function (AsapAction_ts_1_1) {
          AsapAction_ts_1 = AsapAction_ts_1_1;
        },
        function (AsapScheduler_ts_1_1) {
          AsapScheduler_ts_1 = AsapScheduler_ts_1_1;
        },
      ],
      execute: function () {
        /**
             *
             * Asap Scheduler
             *
             * <span class="informal">Perform task as fast as it can be performed asynchronously</span>
             *
             * `asap` scheduler behaves the same as {@link asyncScheduler} scheduler when you use it to delay task
             * in time. If however you set delay to `0`, `asap` will wait for current synchronously executing
             * code to end and then it will try to execute given task as fast as possible.
             *
             * `asap` scheduler will do its best to minimize time between end of currently executing code
             * and start of scheduled task. This makes it best candidate for performing so called "deferring".
             * Traditionally this was achieved by calling `setTimeout(deferredTask, 0)`, but that technique involves
             * some (although minimal) unwanted delay.
             *
             * Note that using `asap` scheduler does not necessarily mean that your task will be first to process
             * after currently executing code. In particular, if some task was also scheduled with `asap` before,
             * that task will execute first. That being said, if you need to schedule task asynchronously, but
             * as soon as possible, `asap` scheduler is your best bet.
             *
             * ## Example
             * Compare async and asap scheduler<
             * ```ts
             * import { asapScheduler, asyncScheduler } from 'rxjs.ts';
             *
             * asyncScheduler.schedule(() => console.log('async')); // scheduling 'async' first...
             * asapScheduler.schedule(() => console.log('asap'));
             *
             * // Logs:
             * // "asap"
             * // "async"
             * // ... but 'asap' goes first!
             * ```
             * @static true
             * @name asap
             * @owner Scheduler
             */
        exports_61(
          "asap",
          asap = new AsapScheduler_ts_1.AsapScheduler(
            AsapAction_ts_1.AsapAction,
          ),
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduler/async",
  [
    "https://deno.land/x/rxjs/src/internal/scheduler/AsyncAction",
    "https://deno.land/x/rxjs/src/internal/scheduler/AsyncScheduler",
  ],
  function (exports_62, context_62) {
    "use strict";
    var AsyncAction_ts_2, AsyncScheduler_ts_2, async;
    var __moduleName = context_62 && context_62.id;
    return {
      setters: [
        function (AsyncAction_ts_2_1) {
          AsyncAction_ts_2 = AsyncAction_ts_2_1;
        },
        function (AsyncScheduler_ts_2_1) {
          AsyncScheduler_ts_2 = AsyncScheduler_ts_2_1;
        },
      ],
      execute: function () {
        /**
             *
             * Async Scheduler
             *
             * <span class="informal">Schedule task as if you used setTimeout(task, duration)</span>
             *
             * `async` scheduler schedules tasks asynchronously, by putting them on the JavaScript
             * event loop queue. It is best used to delay tasks in time or to schedule tasks repeating
             * in intervals.
             *
             * If you just want to "defer" task, that is to perform it right after currently
             * executing synchronous code ends (commonly achieved by `setTimeout(deferredTask, 0)`),
             * better choice will be the {@link asapScheduler} scheduler.
             *
             * ## Examples
             * Use async scheduler to delay task
             * ```ts
             * import { asyncScheduler } from 'rxjs.ts';
             *
             * const task = () => console.log('it works!');
             *
             * asyncScheduler.schedule(task, 2000);
             *
             * // After 2 seconds logs:
             * // "it works!"
             * ```
             *
             * Use async scheduler to repeat task in intervals
             * ```ts
             * import { asyncScheduler } from 'rxjs.ts';
             *
             * function task(state) {
             *   console.log(state);
             *   this.schedule(state + 1, 1000); // `this` references currently executing Action,
             *                                   // which we reschedule with new state and delay
             * }
             *
             * asyncScheduler.schedule(task, 3000, 0);
             *
             * // Logs:
             * // 0 after 3s
             * // 1 after 4s
             * // 2 after 5s
             * // 3 after 6s
             * ```
             *
             * @static true
             * @name async
             * @owner Scheduler
             */
        exports_62(
          "async",
          async = new AsyncScheduler_ts_2.AsyncScheduler(
            AsyncAction_ts_2.AsyncAction,
          ),
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduler/QueueScheduler",
  ["https://deno.land/x/rxjs/src/internal/scheduler/AsyncScheduler"],
  function (exports_63, context_63) {
    "use strict";
    var AsyncScheduler_ts_3, QueueScheduler;
    var __moduleName = context_63 && context_63.id;
    return {
      setters: [
        function (AsyncScheduler_ts_3_1) {
          AsyncScheduler_ts_3 = AsyncScheduler_ts_3_1;
        },
      ],
      execute: function () {
        QueueScheduler = class QueueScheduler
          extends AsyncScheduler_ts_3.AsyncScheduler {
        };
        exports_63("QueueScheduler", QueueScheduler);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduler/QueueAction",
  ["https://deno.land/x/rxjs/src/internal/scheduler/AsyncAction"],
  function (exports_64, context_64) {
    "use strict";
    var AsyncAction_ts_3, QueueAction;
    var __moduleName = context_64 && context_64.id;
    return {
      setters: [
        function (AsyncAction_ts_3_1) {
          AsyncAction_ts_3 = AsyncAction_ts_3_1;
        },
      ],
      execute: function () {
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        QueueAction = class QueueAction extends AsyncAction_ts_3.AsyncAction {
          constructor(scheduler, work) {
            super(scheduler, work);
            this.scheduler = scheduler;
            this.work = work;
          }
          schedule(state, delay = 0) {
            if (delay > 0) {
              return super.schedule(state, delay);
            }
            this.delay = delay;
            this.state = state;
            this.scheduler.flush(this);
            return this;
          }
          execute(state, delay) {
            return (delay > 0 || this.closed)
              ? super.execute(state, delay)
              : this._execute(state, delay);
          }
          requestAsyncId(scheduler, id, delay = 0) {
            // If delay exists and is greater than 0, or if the delay is null (the
            // action wasn't rescheduled) but was originally scheduled as an async
            // action, then recycle as an async action.
            if (
              (delay !== null && delay > 0) ||
              (delay === null && this.delay > 0)
            ) {
              return super.requestAsyncId(scheduler, id, delay);
            }
            // Otherwise flush the scheduler starting with this action.
            return scheduler.flush(this);
          }
        };
        exports_64("QueueAction", QueueAction);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduler/queue",
  [
    "https://deno.land/x/rxjs/src/internal/scheduler/QueueAction",
    "https://deno.land/x/rxjs/src/internal/scheduler/QueueScheduler",
  ],
  function (exports_65, context_65) {
    "use strict";
    var QueueAction_ts_1, QueueScheduler_ts_1, queue;
    var __moduleName = context_65 && context_65.id;
    return {
      setters: [
        function (QueueAction_ts_1_1) {
          QueueAction_ts_1 = QueueAction_ts_1_1;
        },
        function (QueueScheduler_ts_1_1) {
          QueueScheduler_ts_1 = QueueScheduler_ts_1_1;
        },
      ],
      execute: function () {
        /**
             *
             * Queue Scheduler
             *
             * <span class="informal">Put every next task on a queue, instead of executing it immediately</span>
             *
             * `queue` scheduler, when used with delay, behaves the same as {@link asyncScheduler} scheduler.
             *
             * When used without delay, it schedules given task synchronously - executes it right when
             * it is scheduled. However when called recursively, that is when inside the scheduled task,
             * another task is scheduled with queue scheduler, instead of executing immediately as well,
             * that task will be put on a queue and wait for current one to finish.
             *
             * This means that when you execute task with `queue` scheduler, you are sure it will end
             * before any other task scheduled with that scheduler will start.
             *
             * ## Examples
             * Schedule recursively first, then do something
             * ```ts
             * import { queueScheduler } from 'rxjs.ts';
             *
             * queueScheduler.schedule(() => {
             *   queueScheduler.schedule(() => console.log('second')); // will not happen now, but will be put on a queue
             *
             *   console.log('first');
             * });
             *
             * // Logs:
             * // "first"
             * // "second"
             * ```
             *
             * Reschedule itself recursively
             * ```ts
             * import { queueScheduler } from 'rxjs.ts';
             *
             * queueScheduler.schedule(function(state) {
             *   if (state !== 0) {
             *     console.log('before', state);
             *     this.schedule(state - 1); // `this` references currently executing Action,
             *                               // which we reschedule with new state
             *     console.log('after', state);
             *   }
             * }, 0, 3);
             *
             * // In scheduler that runs recursively, you would expect:
             * // "before", 3
             * // "before", 2
             * // "before", 1
             * // "after", 1
             * // "after", 2
             * // "after", 3
             *
             * // But with queue it logs:
             * // "before", 3
             * // "after", 3
             * // "before", 2
             * // "after", 2
             * // "before", 1
             * // "after", 1
             * ```
             *
             * @static true
             * @name queue
             * @owner Scheduler
             */
        exports_65(
          "queue",
          queue = new QueueScheduler_ts_1.QueueScheduler(
            QueueAction_ts_1.QueueAction,
          ),
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduler/AnimationFrameScheduler",
  ["https://deno.land/x/rxjs/src/internal/scheduler/AsyncScheduler"],
  function (exports_66, context_66) {
    "use strict";
    var AsyncScheduler_ts_4, AnimationFrameScheduler;
    var __moduleName = context_66 && context_66.id;
    return {
      setters: [
        function (AsyncScheduler_ts_4_1) {
          AsyncScheduler_ts_4 = AsyncScheduler_ts_4_1;
        },
      ],
      execute: function () {
        AnimationFrameScheduler = class AnimationFrameScheduler
          extends AsyncScheduler_ts_4.AsyncScheduler {
          flush(action) {
            this.active = true;
            this.scheduled = undefined;
            const { actions } = this;
            let error;
            let index = -1;
            action = action || actions.shift();
            let count = actions.length;
            do {
              if (error = action.execute(action.state, action.delay)) {
                break;
              }
            } while (++index < count && (action = actions.shift()));
            this.active = false;
            if (error) {
              while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
              }
              throw error;
            }
          }
        };
        exports_66("AnimationFrameScheduler", AnimationFrameScheduler);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduler/AnimationFrameAction",
  [
    "https://deno.land/x/rxjs/src/internal/scheduler/AsyncAction",
    "https://deno.land/x/rxjs/src/internal/util/requestFrame",
  ],
  function (exports_67, context_67) {
    "use strict";
    var AsyncAction_ts_4, requestFrame_ts_2, AnimationFrameAction;
    var __moduleName = context_67 && context_67.id;
    return {
      setters: [
        function (AsyncAction_ts_4_1) {
          AsyncAction_ts_4 = AsyncAction_ts_4_1;
        },
        function (requestFrame_ts_2_1) {
          requestFrame_ts_2 = requestFrame_ts_2_1;
        },
      ],
      execute: function () {
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        AnimationFrameAction = class AnimationFrameAction
          extends AsyncAction_ts_4.AsyncAction {
          constructor(scheduler, work) {
            super(scheduler, work);
            this.scheduler = scheduler;
            this.work = work;
            this.window = requestFrame_ts_2.RequestFrame();
          }
          requestAsyncId(scheduler, id, delay = 0) {
            // If delay is greater than 0, request as an async action.
            if (delay !== null && delay > 0) {
              return super.requestAsyncId(scheduler, id, delay);
            }
            // Push the action to the end of the scheduler queue.
            scheduler.actions.push(this);
            // If an animation frame has already been requested, don't request another
            // one. If an animation frame hasn't been requested yet, request one. Return
            // the current animation frame request id.
            return scheduler.scheduled ||
              (scheduler.scheduled = this.window.requestAnimationFrame(() =>
                scheduler.flush(undefined)
              ));
          }
          recycleAsyncId(scheduler, id, delay = 0) {
            // If delay exists and is greater than 0, or if the delay is null (the
            // action wasn't rescheduled) but was originally sched'uled as an async
            // action, then recycle as an async action.
            if (
              (delay !== null && delay > 0) ||
              (delay === null && this.delay > 0)
            ) {
              return super.recycleAsyncId(scheduler, id, delay);
            }
            // If the scheduler queue is empty, cancel the requested animation frame and
            // set the scheduled flag to undefined so the next AnimationFrameAction will
            // request its own.
            if (scheduler.actions.length === 0) {
              this.window.cancelAnimationFrame(id);
              scheduler.scheduled = undefined;
            }
            // Return undefined so the action knows to request a new async id if it's rescheduled.
            return undefined;
          }
        };
        exports_67("AnimationFrameAction", AnimationFrameAction);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduler/animationFrame",
  [
    "https://deno.land/x/rxjs/src/internal/scheduler/AnimationFrameAction",
    "https://deno.land/x/rxjs/src/internal/scheduler/AnimationFrameScheduler",
  ],
  function (exports_68, context_68) {
    "use strict";
    var AnimationFrameAction_ts_1, AnimationFrameScheduler_ts_1, animationFrame;
    var __moduleName = context_68 && context_68.id;
    return {
      setters: [
        function (AnimationFrameAction_ts_1_1) {
          AnimationFrameAction_ts_1 = AnimationFrameAction_ts_1_1;
        },
        function (AnimationFrameScheduler_ts_1_1) {
          AnimationFrameScheduler_ts_1 = AnimationFrameScheduler_ts_1_1;
        },
      ],
      execute: function () {
        /**
             *
             * Animation Frame Scheduler
             *
             * <span class="informal">Perform task when `window.requestAnimationFrame` would fire</span>
             *
             * When `animationFrame` scheduler is used with delay, it will fall back to {@link asyncScheduler} scheduler
             * behaviour.
             *
             * Without delay, `animationFrame` scheduler can be used to create smooth browser animations.
             * It makes sure scheduled task will happen just before next browser content repaint,
             * thus performing animations as efficiently as possible.
             *
             * ## Example
             * Schedule div height animation
             * ```ts
             * // html: <div style="background: #0ff;"></div>
             * import { animationFrameScheduler } from 'rxjs.ts';
             *
             * const div = document.querySelector('div');
             *
             * animationFrameScheduler.schedule(function(height) {
             *   div.style.height = height + "px";
             *
             *   this.schedule(height + 1);  // `this` references currently executing Action,
             *                               // which we reschedule with new state
             * }, 0, 0);
             *
             * // You will see a div element growing in height
             * ```
             *
             * @static true
             * @name animationFrame
             * @owner Scheduler
             */
        exports_68(
          "animationFrame",
          animationFrame = new AnimationFrameScheduler_ts_1
            .AnimationFrameScheduler(
            AnimationFrameAction_ts_1.AnimationFrameAction,
          ),
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/scheduler/VirtualTimeScheduler",
  [
    "https://deno.land/x/rxjs/src/internal/scheduler/AsyncAction",
    "https://deno.land/x/rxjs/src/internal/scheduler/AsyncScheduler",
  ],
  function (exports_69, context_69) {
    "use strict";
    var AsyncAction_ts_5,
      AsyncScheduler_ts_5,
      VirtualTimeScheduler,
      VirtualAction;
    var __moduleName = context_69 && context_69.id;
    return {
      setters: [
        function (AsyncAction_ts_5_1) {
          AsyncAction_ts_5 = AsyncAction_ts_5_1;
        },
        function (AsyncScheduler_ts_5_1) {
          AsyncScheduler_ts_5 = AsyncScheduler_ts_5_1;
        },
      ],
      execute: function () {
        VirtualTimeScheduler = /** @class */ (() => {
          class VirtualTimeScheduler
            extends AsyncScheduler_ts_5.AsyncScheduler {
            /**
                     * This creates an instance of a `VirtualTimeScheduler`. Experts only. The signature of
                     * this constructor is likely to change in the long run.
                     *
                     * @param SchedulerAction The type of Action to initialize when initializing actions during scheduling.
                     * @param maxFrames The maximum number of frames to process before stopping. Used to prevent endless flush cycles.
                     */
            constructor(SchedulerAction = VirtualAction, maxFrames = Infinity) {
              super(SchedulerAction, () => this.frame);
              this.maxFrames = maxFrames;
              /**
                         * The current frame for the state of the virtual scheduler instance. The the difference
                         * between two "frames" is synonymous with the passage of "virtual time units". So if
                         * you record `scheduler.frame` to be `1`, then later, observe `scheduler.frame` to be at `11`,
                         * that means `10` virtual time units have passed.
                         */
              this.frame = 0;
              /**
                         * Used internally to examine the current virtual action index being processed.
                         * @deprecated remove in v8. Should be a private API.
                         */
              this.index = -1;
            }
            /**
                     * Prompt the Scheduler to execute all of its queued actions, therefore
                     * clearing its queue.
                     * @return {void}
                     */
            flush() {
              const { actions, maxFrames } = this;
              let error, action;
              while ((action = actions[0]) && action.delay <= maxFrames) {
                actions.shift();
                this.frame = action.delay;
                if (error = action.execute(action.state, action.delay)) {
                  break;
                }
              }
              if (error) {
                while (action = actions.shift()) {
                  action.unsubscribe();
                }
                throw error;
              }
            }
          }
          /** @deprecated remove in v8. `frameTimeFactor` is not used in VirtualTimeScheduler directly. */
          VirtualTimeScheduler.frameTimeFactor = 10;
          return VirtualTimeScheduler;
        })();
        exports_69("VirtualTimeScheduler", VirtualTimeScheduler);
        VirtualAction = class VirtualAction
          extends AsyncAction_ts_5.AsyncAction {
          constructor(scheduler, work, index = scheduler.index += 1) {
            super(scheduler, work);
            this.scheduler = scheduler;
            this.work = work;
            this.index = index;
            this.active = true;
            this.index = scheduler.index = index;
          }
          schedule(state, delay = 0) {
            if (!this.id) {
              return super.schedule(state, delay);
            }
            this.active = false;
            // If an action is rescheduled, we save allocations by mutating its state,
            // pushing it to the end of the scheduler queue, and recycling the action.
            // But since the VirtualTimeScheduler is used for testing, VirtualActions
            // must be immutable so they can be inspected later.
            const action = new VirtualAction(this.scheduler, this.work);
            this.add(action);
            return action.schedule(state, delay);
          }
          requestAsyncId(scheduler, id, delay = 0) {
            this.delay = scheduler.frame + delay;
            const { actions } = scheduler;
            actions.push(this);
            actions.sort(VirtualAction.sortActions);
            return true;
          }
          recycleAsyncId(scheduler, id, delay = 0) {
            return undefined;
          }
          _execute(state, delay) {
            if (this.active === true) {
              return super._execute(state, delay);
            }
          }
          static sortActions(a, b) {
            if (a.delay === b.delay) {
              if (a.index === b.index) {
                return 0;
              } else if (a.index > b.index) {
                return 1;
              } else {
                return -1;
              }
            } else if (a.delay > b.delay) {
              return 1;
            } else {
              return -1;
            }
          }
        };
        exports_69("VirtualAction", VirtualAction);
      },
    };
  },
);
/**
 *  RxJS - Deno Version 2020

    This product is a modified by DenoBR
    Comunitty for add support for Deno

    This file is modified by DenoBR
 */
System.register(
  "https://deno.land/x/rxjs/src/internal/util/isScheduler",
  [],
  function (exports_70, context_70) {
    "use strict";
    var __moduleName = context_70 && context_70.id;
    function isScheduler(value) {
      return value && typeof value.schedule === "function";
    }
    exports_70("isScheduler", isScheduler);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/fromArray",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToArray",
    "https://deno.land/x/rxjs/src/internal/scheduled/scheduleArray",
  ],
  function (exports_71, context_71) {
    "use strict";
    var Observable_ts_14, subscribeToArray_ts_2, scheduleArray_ts_2;
    var __moduleName = context_71 && context_71.id;
    function fromArray(input, scheduler) {
      if (!scheduler) {
        return new Observable_ts_14.Observable(
          subscribeToArray_ts_2.subscribeToArray(input),
        );
      } else {
        return scheduleArray_ts_2.scheduleArray(input, scheduler);
      }
    }
    exports_71("fromArray", fromArray);
    return {
      setters: [
        function (Observable_ts_14_1) {
          Observable_ts_14 = Observable_ts_14_1;
        },
        function (subscribeToArray_ts_2_1) {
          subscribeToArray_ts_2 = subscribeToArray_ts_2_1;
        },
        function (scheduleArray_ts_2_1) {
          scheduleArray_ts_2 = scheduleArray_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/of",
  [
    "https://deno.land/x/rxjs/src/internal/util/isScheduler",
    "https://deno.land/x/rxjs/src/internal/observable/fromArray",
    "https://deno.land/x/rxjs/src/internal/scheduled/scheduleArray",
  ],
  function (exports_72, context_72) {
    "use strict";
    var isScheduler_ts_1, fromArray_ts_1, scheduleArray_ts_3;
    var __moduleName = context_72 && context_72.id;
    /* tslint:enable:max-line-length */
    /**
     * Converts the arguments to an observable sequence.
     *
     * <span class="informal">Each argument becomes a `next` notification.</span>
     *
     * ![](of.png)
     *
     * Unlike {@link from}, it does not do any flattening and emits each argument in whole
     * as a separate `next` notification.
     *
     * ## Examples
     *
     * Emit the values `10, 20, 30`
     *
     * ```ts
     * import { of } from 'rxjs.ts';
     *
     * of(10, 20, 30)
     * .subscribe(
     *   next => console.log('next:', next),
     *   err => console.log('error:', err),
     *   () => console.log('the end'),
     * );
     *
     * // Outputs
     * // next: 10
     * // next: 20
     * // next: 30
     * // the end
     * ```
     *
     * Emit the array `[1, 2, 3]`
     *
     * ```ts
     * import { of } from 'rxjs.ts';
     *
     * of([1, 2, 3])
     * .subscribe(
     *   next => console.log('next:', next),
     *   err => console.log('error:', err),
     *   () => console.log('the end'),
     * );
     *
     * // Outputs
     * // next: [1, 2, 3]
     * // the end
     * ```
     *
     * @see {@link from}
     * @see {@link range}
     *
     * @param {...T} values A comma separated list of arguments you want to be emitted
     * @return {Observable} An Observable that emits the arguments
     * described above and then completes.
     * @name of
     */
    function of(...args) {
      let scheduler = args[args.length - 1];
      if (isScheduler_ts_1.isScheduler(scheduler)) {
        args.pop();
        return scheduleArray_ts_3.scheduleArray(args, scheduler);
      } else {
        return fromArray_ts_1.fromArray(args);
      }
    }
    exports_72("of", of);
    return {
      setters: [
        function (isScheduler_ts_1_1) {
          isScheduler_ts_1 = isScheduler_ts_1_1;
        },
        function (fromArray_ts_1_1) {
          fromArray_ts_1 = fromArray_ts_1_1;
        },
        function (scheduleArray_ts_3_1) {
          scheduleArray_ts_3 = scheduleArray_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/Notification",
  [
    "https://deno.land/x/rxjs/src/internal/observable/empty",
    "https://deno.land/x/rxjs/src/internal/observable/of",
    "https://deno.land/x/rxjs/src/internal/observable/throwError",
  ],
  function (exports_73, context_73) {
    "use strict";
    var empty_ts_3, of_ts_1, throwError_ts_1, NotificationKind, Notification;
    var __moduleName = context_73 && context_73.id;
    return {
      setters: [
        function (empty_ts_3_1) {
          empty_ts_3 = empty_ts_3_1;
        },
        function (of_ts_1_1) {
          of_ts_1 = of_ts_1_1;
        },
        function (throwError_ts_1_1) {
          throwError_ts_1 = throwError_ts_1_1;
        },
      ],
      execute: function () {
        // TODO: When this enum is removed, replace it with a type alias. See #4556.
        /**
             * @deprecated NotificationKind is deprecated as const enums are not compatible with isolated modules. Use a string literal instead.
             */
        (function (NotificationKind) {
          NotificationKind["NEXT"] = "N";
          NotificationKind["ERROR"] = "E";
          NotificationKind["COMPLETE"] = "C";
        })(NotificationKind || (NotificationKind = {}));
        exports_73("NotificationKind", NotificationKind);
        Notification = /** @class */ (() => {
          /**
                 * Represents a push-based event or value that an {@link Observable} can emit.
                 * This class is particularly useful for operators that manage notifications,
                 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
                 * others. Besides wrapping the actual delivered value, it also annotates it
                 * with metadata of, for instance, what type of push message it is (`next`,
                 * `error`, or `complete`).
                 *
                 * @see {@link materialize}
                 * @see {@link dematerialize}
                 * @see {@link observeOn}
                 *
                 * @class Notification<T>
                 */
          class Notification {
            constructor(kind, value, error) {
              this.kind = kind;
              this.value = value;
              this.error = error;
              this.hasValue = kind === "N";
            }
            /**
                     * Delivers to the given `observer` the value wrapped by this Notification.
                     * @param {Observer} observer
                     * @return
                     */
            observe(observer) {
              switch (this.kind) {
                case "N":
                  return observer.next && observer.next(this.value);
                case "E":
                  return observer.error && observer.error(this.error);
                case "C":
                  return observer.complete && observer.complete();
              }
            }
            /**
                     * Given some {@link Observer} callbacks, deliver the value represented by the
                     * current Notification to the correctly corresponding callback.
                     * @param {function(value: T): void} next An Observer `next` callback.
                     * @param {function(err: any): void} [error] An Observer `error` callback.
                     * @param {function(): void} [complete] An Observer `complete` callback.
                     * @return {any}
                     */
            do(next, error, complete) {
              const kind = this.kind;
              switch (kind) {
                case "N":
                  return next && next(this.value);
                case "E":
                  return error && error(this.error);
                case "C":
                  return complete && complete();
              }
            }
            /**
                     * Takes an Observer or its individual callback functions, and calls `observe`
                     * or `do` methods accordingly.
                     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
                     * the `next` callback.
                     * @param {function(err: any): void} [error] An Observer `error` callback.
                     * @param {function(): void} [complete] An Observer `complete` callback.
                     * @return {any}
                     */
            accept(nextOrObserver, error, complete) {
              if (nextOrObserver && typeof nextOrObserver.next === "function") {
                return this.observe(nextOrObserver);
              } else {
                return this.do(nextOrObserver, error, complete);
              }
            }
            /**
                     * Returns a simple Observable that just delivers the notification represented
                     * by this Notification instance.
                     * @return {any}
                     */
            toObservable() {
              const kind = this.kind;
              switch (kind) {
                case "N":
                  return of_ts_1.of(this.value);
                case "E":
                  return throwError_ts_1.throwError(this.error);
                case "C":
                  return empty_ts_3.EMPTY;
              }
              throw new Error("unexpected notification kind value");
            }
            /**
                     * A shortcut to create a Notification instance of the type `next` from a
                     * given value.
                     * @param {T} value The `next` value.
                     * @return {Notification<T>} The "next" Notification representing the
                     * argument.
                     * @nocollapse
                     */
            static createNext(value) {
              if (typeof value !== "undefined") {
                return new Notification("N", value);
              }
              return Notification.undefinedValueNotification;
            }
            /**
                     * A shortcut to create a Notification instance of the type `error` from a
                     * given error.
                     * @param {any} [err] The `error` error.
                     * @return {Notification<T>} The "error" Notification representing the
                     * argument.
                     * @nocollapse
                     */
            static createError(err) {
              return new Notification("E", undefined, err);
            }
            /**
                     * A shortcut to create a Notification instance of the type `complete`.
                     * @return {Notification<any>} The valueless "complete" Notification.
                     * @nocollapse
                     */
            static createComplete() {
              return Notification.completeNotification;
            }
          }
          Notification.completeNotification = new Notification("C");
          Notification.undefinedValueNotification = new Notification(
            "N",
            undefined,
          );
          return Notification;
        })();
        exports_73("Notification", Notification);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/noop",
  [],
  function (exports_74, context_74) {
    "use strict";
    var __moduleName = context_74 && context_74.id;
    /* tslint:disable:no-empty */
    function noop() {}
    exports_74("noop", noop);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/isObservable",
  ["https://deno.land/x/rxjs/src/internal/Observable"],
  function (exports_75, context_75) {
    "use strict";
    var Observable_ts_15;
    var __moduleName = context_75 && context_75.id;
    /**
     * Tests to see if the object is an RxJS {@link Observable}
     * @param obj the object to test
     */
    function isObservable(obj) {
      return !!obj &&
        (obj instanceof Observable_ts_15.Observable ||
          (typeof obj.lift === "function" &&
            typeof obj.subscribe === "function"));
    }
    exports_75("isObservable", isObservable);
    return {
      setters: [
        function (Observable_ts_15_1) {
          Observable_ts_15 = Observable_ts_15_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/EmptyError",
  [],
  function (exports_76, context_76) {
    "use strict";
    var EmptyErrorImpl, EmptyError;
    var __moduleName = context_76 && context_76.id;
    return {
      setters: [],
      execute: function () {
        EmptyErrorImpl = (() => {
          function EmptyErrorImpl() {
            Error.call(this);
            this.message = "no elements in sequence.ts";
            this.name = "EmptyError.ts";
            return this;
          }
          EmptyErrorImpl.prototype = Object.create(Error.prototype);
          return EmptyErrorImpl;
        })();
        /**
             * An error thrown when an Observable or a sequence was queried but has no
             * elements.
             *
             * @see {@link first}
             * @see {@link last}
             * @see {@link single}
             *
             * @class EmptyError
             */
        exports_76("EmptyError", EmptyError = EmptyErrorImpl);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/lastValueFrom",
  ["https://deno.land/x/rxjs/src/internal/util/EmptyError"],
  function (exports_77, context_77) {
    "use strict";
    var EmptyError_ts_1;
    var __moduleName = context_77 && context_77.id;
    /**
     * Converts an observable to a promise by subscribing to the observable,
     * waiting for it to complete, and resolving the returned promise with the
     * last value from the observed stream.
     *
     * If the observable stream completes before any values were emitted, the
     * returned promise will reject with {@link EmptyError}.
     *
     * If the observable stream emits an error, the returned promise will reject
     * with that error.
     *
     * ### Example
     *
     * Wait for the last value from a stream and emit it from a promise in
     * an async function.
     *
     * ```ts
     * import { interval, lastValueFrom } from 'rxjs.ts';
     * import { take } from 'rxjs/operators.ts';
     *
     * async function execute() {
     *    const source$ = interval(2000).pipe(take(10));
     *    const finalNumber = await lastValueFrom(source$);
     *    console.log(`The final number is ${finalNumber}`);
     * }
     *
     * execute();
     *
     * // Expected output:
     * // "The final number is 9"
     * ```
     *
     * @param source the observable to convert to a promise
     */
    function lastValueFrom(source) {
      return new Promise((resolve, reject) => {
        let _hasValue = false;
        let _value;
        source.subscribe({
          next: (value) => {
            _value = value;
            _hasValue = true;
          },
          error: reject,
          complete: () => {
            if (_hasValue) {
              resolve(_value);
            } else {
              reject(new EmptyError_ts_1.EmptyError());
            }
          },
        });
      });
    }
    exports_77("lastValueFrom", lastValueFrom);
    return {
      setters: [
        function (EmptyError_ts_1_1) {
          EmptyError_ts_1 = EmptyError_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/firstValueFrom",
  [
    "https://deno.land/x/rxjs/src/internal/util/EmptyError",
    "https://deno.land/x/rxjs/src/internal/Subscription",
  ],
  function (exports_78, context_78) {
    "use strict";
    var EmptyError_ts_2, Subscription_ts_14;
    var __moduleName = context_78 && context_78.id;
    /**
     * Converts an observable to a promise by subscribing to the observable,
     * and returning a promise that will resolve as soon as the first value
     * arrives from the observable. The subscription will then be closed.
     *
     * If the observable stream completes before any values were emitted, the
     * returned promise will reject with {@link EmptyError}.
     *
     * If the observable stream emits an error, the returned promise will reject
     * with that error.
     *
     * ### Example
     *
     * Wait for the first value from a stream and emit it from a promise in
     * an async function.
     *
     * ```ts
     * import { interval, firstValueFrom } from 'rxjs.ts';
     *
     * async function execute() {
     *    const source$ = interval(2000);
     *    const firstNumber = await firstValueFrom(source$);
     *    console.log(`The first number is ${firstNumber}`);
     * }
     *
     * execute();
     *
     * // Expected output:
     * // "The first number is 0"
     * ```
     *
     * @param source the observable to convert to a promise
     */
    function firstValueFrom(source) {
      return new Promise((resolve, reject) => {
        const subs = new Subscription_ts_14.Subscription();
        subs.add(source.subscribe({
          next: (value) => {
            resolve(value);
            subs.unsubscribe();
          },
          error: reject,
          complete: () => {
            reject(new EmptyError_ts_2.EmptyError());
          },
        }));
      });
    }
    exports_78("firstValueFrom", firstValueFrom);
    return {
      setters: [
        function (EmptyError_ts_2_1) {
          EmptyError_ts_2 = EmptyError_ts_2_1;
        },
        function (Subscription_ts_14_1) {
          Subscription_ts_14 = Subscription_ts_14_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/ArgumentOutOfRangeError",
  [],
  function (exports_79, context_79) {
    "use strict";
    var ArgumentOutOfRangeErrorImpl, ArgumentOutOfRangeError;
    var __moduleName = context_79 && context_79.id;
    return {
      setters: [],
      execute: function () {
        ArgumentOutOfRangeErrorImpl = (() => {
          function ArgumentOutOfRangeErrorImpl() {
            Error.call(this);
            this.message = "argument out of range.ts";
            this.name = "ArgumentOutOfRangeError.ts";
            return this;
          }
          ArgumentOutOfRangeErrorImpl.prototype = Object.create(
            Error.prototype,
          );
          return ArgumentOutOfRangeErrorImpl;
        })();
        /**
             * An error thrown when an element was queried at a certain index of an
             * Observable, but no such index or position exists in that sequence.
             *
             * @see {@link elementAt}
             * @see {@link take}
             * @see {@link takeLast}
             *
             * @class ArgumentOutOfRangeError
             */
        exports_79(
          "ArgumentOutOfRangeError",
          ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl,
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/NotFoundError",
  [],
  function (exports_80, context_80) {
    "use strict";
    var NotFoundErrorImpl, NotFoundError;
    var __moduleName = context_80 && context_80.id;
    return {
      setters: [],
      execute: function () {
        NotFoundErrorImpl = (() => {
          function NotFoundErrorImpl(message) {
            Error.call(this);
            this.message = message;
            this.name = "NotFoundError.ts";
            return this;
          }
          NotFoundErrorImpl.prototype = Object.create(Error.prototype);
          return NotFoundErrorImpl;
        })();
        /**
             * An error thrown when a value or values are missing from an
             * observable sequence.
             *
             * @see {@link operators/single}
             *
             * @class NotFoundError
             */
        exports_80("NotFoundError", NotFoundError = NotFoundErrorImpl);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/SequenceError",
  [],
  function (exports_81, context_81) {
    "use strict";
    var SequenceErrorImpl, SequenceError;
    var __moduleName = context_81 && context_81.id;
    return {
      setters: [],
      execute: function () {
        SequenceErrorImpl = (() => {
          function SequenceErrorImpl(message) {
            Error.call(this);
            this.message = message;
            this.name = "SequenceError.ts";
            return this;
          }
          SequenceErrorImpl.prototype = Object.create(Error.prototype);
          return SequenceErrorImpl;
        })();
        /**
             * An error thrown when something is wrong with the sequence of
             * values arriving on the observable.
             *
             * @see {@link operators/single}
             *
             * @class SequenceError
             */
        exports_81("SequenceError", SequenceError = SequenceErrorImpl);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/TimeoutError",
  [],
  function (exports_82, context_82) {
    "use strict";
    var TimeoutErrorImpl, TimeoutError;
    var __moduleName = context_82 && context_82.id;
    return {
      setters: [],
      execute: function () {
        TimeoutErrorImpl = (() => {
          function TimeoutErrorImpl() {
            Error.call(this);
            this.message = "Timeout has occurred.ts";
            this.name = "TimeoutError.ts";
            return this;
          }
          TimeoutErrorImpl.prototype = Object.create(Error.prototype);
          return TimeoutErrorImpl;
        })();
        /**
             * An error thrown when duetime elapses.
             *
             * @see {@link operators/timeout}
             *
             * @class TimeoutError
             */
        exports_82("TimeoutError", TimeoutError = TimeoutErrorImpl);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/map",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_83, context_83) {
    "use strict";
    var Subscriber_ts_7, MapOperator, MapSubscriber;
    var __moduleName = context_83 && context_83.id;
    /**
     * Applies a given `project` function to each value emitted by the source
     * Observable, and emits the resulting values as an Observable.
     *
     * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
     * it passes each source value through a transformation function to get
     * corresponding output values.</span>
     *
     * ![](map.png)
     *
     * Similar to the well known `Array.prototype.map` function, this operator
     * applies a projection to each value and emits that projection in the output
     * Observable.
     *
     * ## Example
     * Map every click to the clientX position of that click
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { map } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const positions = clicks.pipe(map(ev => ev.clientX));
     * positions.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link mapTo}
     * @see {@link pluck}
     *
     * @param {function(value: T, index: number): R} project The function to apply
     * to each `value` emitted by the source Observable. The `index` parameter is
     * the number `i` for the i-th emission that has happened since the
     * subscription, starting from the number `0`.
     * @param {any} [thisArg] An optional argument to define what `this` is in the
     * `project` function.
     * @return {Observable<R>} An Observable that emits the values from the source
     * Observable transformed by the given `project` function.
     * @name map
     */
    function map(project, thisArg) {
      return function mapOperation(source) {
        if (typeof project !== "function") {
          throw new TypeError(
            "argument is not a function. Are you looking for `mapTo()`?",
          );
        }
        return source.lift(new MapOperator(project, thisArg));
      };
    }
    exports_83("map", map);
    return {
      setters: [
        function (Subscriber_ts_7_1) {
          Subscriber_ts_7 = Subscriber_ts_7_1;
        },
      ],
      execute: function () {
        MapOperator = class MapOperator {
          constructor(project, thisArg) {
            this.project = project;
            this.thisArg = thisArg;
          }
          call(subscriber, source) {
            return source.subscribe(
              new MapSubscriber(subscriber, this.project, this.thisArg),
            );
          }
        };
        exports_83("MapOperator", MapOperator);
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        MapSubscriber = class MapSubscriber extends Subscriber_ts_7.Subscriber {
          constructor(destination, project, thisArg) {
            super(destination);
            this.project = project;
            this.count = 0;
            this.thisArg = thisArg || this;
          }
          // NOTE: This looks unoptimized, but it's actually purposefully NOT
          // using try/catch optimizations.
          _next(value) {
            let result;
            try {
              result = this.project.call(this.thisArg, value, this.count++);
            } catch (err) {
              this.destination.error(err);
              return;
            }
            this.destination.next(result);
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/bindCallback",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/AsyncSubject",
    "https://deno.land/x/rxjs/src/internal/operators/map",
    "https://deno.land/x/rxjs/src/internal/util/canReportError",
    "https://deno.land/x/rxjs/src/internal/util/isArray",
    "https://deno.land/x/rxjs/src/internal/util/isScheduler",
  ],
  function (exports_84, context_84) {
    "use strict";
    var Observable_ts_16,
      AsyncSubject_ts_1,
      map_ts_1,
      canReportError_ts_2,
      isArray_ts_2,
      isScheduler_ts_2;
    var __moduleName = context_84 && context_84.id;
    // tslint:enable:max-line-length
    /**
     * Converts a callback API to a function that returns an Observable.
     *
     * <span class="informal">Give it a function `f` of type `f(x, callback)` and
     * it will return a function `g` that when called as `g(x)` will output an
     * Observable.</span>
     *
     * `bindCallback` is not an operator because its input and output are not
     * Observables. The input is a function `func` with some parameters. The
     * last parameter must be a callback function that `func` calls when it is
     * done.
     *
     * The output of `bindCallback` is a function that takes the same parameters
     * as `func`, except the last one (the callback). When the output function
     * is called with arguments it will return an Observable. If function `func`
     * calls its callback with one argument, the Observable will emit that value.
     * If on the other hand the callback is called with multiple values the resulting
     * Observable will emit an array with said values as arguments.
     *
     * It is **very important** to remember that input function `func` is not called
     * when the output function is, but rather when the Observable returned by the output
     * function is subscribed. This means if `func` makes an AJAX request, that request
     * will be made every time someone subscribes to the resulting Observable, but not before.
     *
     * The last optional parameter - `scheduler` - can be used to control when the call
     * to `func` happens after someone subscribes to Observable, as well as when results
     * passed to callback will be emitted. By default, the subscription to an Observable calls `func`
     * synchronously, but using {@link asyncScheduler} as the last parameter will defer the call to `func`,
     * just like wrapping the call in `setTimeout` with a timeout of `0` would. If you were to use the async Scheduler
     * and call `subscribe` on the output Observable, all function calls that are currently executing
     * will end before `func` is invoked.
     *
     * By default, results passed to the callback are emitted immediately after `func` invokes the callback.
     * In particular, if the callback is called synchronously, then the subscription of the resulting Observable
     * will call the `next` function synchronously as well.  If you want to defer that call,
     * you may use {@link asyncScheduler} just as before.  This means that by using `Scheduler.async` you can
     * ensure that `func` always calls its callback asynchronously, thus avoiding terrifying Zalgo.
     *
     * Note that the Observable created by the output function will always emit a single value
     * and then complete immediately. If `func` calls the callback multiple times, values from subsequent
     * calls will not appear in the stream. If you need to listen for multiple calls,
     *  you probably want to use {@link fromEvent} or {@link fromEventPattern} instead.
     *
     * If `func` depends on some context (`this` property) and is not already bound, the context of `func`
     * will be the context that the output function has at call time. In particular, if `func`
     * is called as a method of some objec and if `func` is not already bound, in order to preserve the context
     * it is recommended that the context of the output function is set to that object as well.
     *
     * If the input function calls its callback in the "node style" (i.e. first argument to callback is
     * optional error parameter signaling whether the call failed or not), {@link bindNodeCallback}
     * provides convenient error handling and probably is a better choice.
     * `bindCallback` will treat such functions the same as any other and error parameters
     * (whether passed or not) will always be interpreted as regular callback argument.
     *
     * ## Examples
     *
     * ### Convert jQuery's getJSON to an Observable API
     * ```ts
     * import { bindCallback } from 'rxjs.ts';
     * import * as jQuery from 'jquery.ts';
     *
     * // Suppose we have jQuery.getJSON('/my/url', callback)
     * const getJSONAsObservable = bindCallback(jQuery.getJSON);
     * const result = getJSONAsObservable('/my/url');
     * result.subscribe(x => console.log(x), e => console.error(e));
     * ```
     *
     * ### Receive an array of arguments passed to a callback
     * ```ts
     * import { bindCallback } from 'rxjs.ts';
     *
     * const someFunction = (cb) => {
     *   cb(5, 'some string', {someProperty: 'someValue'})
     * };
     *
     * const boundSomeFunction = bindCallback(someFunction);
     * boundSomeFunction(12, 10).subscribe(values => {
     *   console.log(values); // [22, 2]
     * });
     * ```
     *
     * ### Compare behaviour with and without async Scheduler
     * ```ts
     * import { bindCallback, asyncScheduler } from 'rxjs.ts';
     *
     * function iCallMyCallbackSynchronously(cb) {
     *   cb();
     * }
     *
     * const boundSyncFn = bindCallback(iCallMyCallbackSynchronously);
     * const boundAsyncFn = bindCallback(iCallMyCallbackSynchronously, null, asyncScheduler);
     *
     * boundSyncFn().subscribe(() => console.log('I was sync!'));
     * boundAsyncFn().subscribe(() => console.log('I was async!'));
     * console.log('This happened...');
     *
     * // Logs:
     * // I was sync!
     * // This happened...
     * // I was async!
     * ```
     *
     * ### Use bindCallback on an object method
     * ```ts
     * import { bindCallback } from 'rxjs.ts';
     *
     * const boundMethod = bindCallback(someObject.methodWithCallback);
     * boundMethod
     *   .call(someObject) // make sure methodWithCallback has access to someObject
     *   .subscribe(subscriber);
     * ```
     *
     * @see {@link bindNodeCallback}
     * @see {@link from}
     *
     * @param {function} func A function with a callback as the last parameter.
     * @param {SchedulerLike} [scheduler] The scheduler on which to schedule the
     * callbacks.
     * @return {function(...params: *): Observable} A function which returns the
     * Observable that delivers the same values the callback would deliver.
     * @name bindCallback
     */
    function bindCallback(callbackFunc, resultSelector, scheduler) {
      if (resultSelector) {
        if (isScheduler_ts_2.isScheduler(resultSelector)) {
          scheduler = resultSelector;
        } else {
          // DEPRECATED PATH
          return (...args) =>
            bindCallback(callbackFunc, scheduler)(...args).pipe(
              map_ts_1.map((args) =>
                isArray_ts_2.isArray(args)
                  ? resultSelector(...args)
                  : resultSelector(args)
              ),
            );
        }
      }
      return function (...args) {
        const context = this;
        let subject;
        const params = {
          context,
          subject: undefined,
          callbackFunc,
          scheduler: scheduler,
        };
        return new Observable_ts_16.Observable((subscriber) => {
          if (!scheduler) {
            if (!subject) {
              subject = new AsyncSubject_ts_1.AsyncSubject();
              const handler = (...innerArgs) => {
                subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                subject.complete();
              };
              try {
                callbackFunc.apply(context, [...args, handler]);
              } catch (err) {
                if (canReportError_ts_2.canReportError(subject)) {
                  subject.error(err);
                } else {
                  console.warn(err);
                }
              }
            }
            return subject.subscribe(subscriber);
          } else {
            const state = {
              args,
              subscriber,
              params,
            };
            return scheduler.schedule(dispatch, 0, state);
          }
        });
      };
    }
    exports_84("bindCallback", bindCallback);
    function dispatch(state) {
      const self = this;
      const { args, subscriber, params } = state;
      const { callbackFunc, context, scheduler } = params;
      let { subject } = params;
      if (!subject) {
        subject = params.subject = new AsyncSubject_ts_1.AsyncSubject();
        const handler = (...innerArgs) => {
          const value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
          this.add(
            scheduler.schedule(dispatchNext, 0, { value, subject: subject }),
          );
        };
        try {
          callbackFunc.apply(context, [...args, handler]);
        } catch (err) {
          subject.error(err);
        }
      }
      this.add(subject.subscribe(subscriber));
    }
    function dispatchNext(state) {
      const { value, subject } = state;
      subject.next(value);
      subject.complete();
    }
    function dispatchError(state) {
      const { err, subject } = state;
      subject.error(err);
    }
    return {
      setters: [
        function (Observable_ts_16_1) {
          Observable_ts_16 = Observable_ts_16_1;
        },
        function (AsyncSubject_ts_1_1) {
          AsyncSubject_ts_1 = AsyncSubject_ts_1_1;
        },
        function (map_ts_1_1) {
          map_ts_1 = map_ts_1_1;
        },
        function (canReportError_ts_2_1) {
          canReportError_ts_2 = canReportError_ts_2_1;
        },
        function (isArray_ts_2_1) {
          isArray_ts_2 = isArray_ts_2_1;
        },
        function (isScheduler_ts_2_1) {
          isScheduler_ts_2 = isScheduler_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/bindNodeCallback",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/AsyncSubject",
    "https://deno.land/x/rxjs/src/internal/operators/map",
    "https://deno.land/x/rxjs/src/internal/util/canReportError",
    "https://deno.land/x/rxjs/src/internal/util/isScheduler",
    "https://deno.land/x/rxjs/src/internal/util/isArray",
  ],
  function (exports_85, context_85) {
    "use strict";
    var Observable_ts_17,
      AsyncSubject_ts_2,
      map_ts_2,
      canReportError_ts_3,
      isScheduler_ts_3,
      isArray_ts_3;
    var __moduleName = context_85 && context_85.id;
    /**
     * Converts a Node.js-style callback API to a function that returns an
     * Observable.
     *
     * <span class="informal">It's just like {@link bindCallback}, but the
     * callback is expected to be of type `callback(error, result)`.</span>
     *
     * `bindNodeCallback` is not an operator because its input and output are not
     * Observables. The input is a function `func` with some parameters, but the
     * last parameter must be a callback function that `func` calls when it is
     * done. The callback function is expected to follow Node.js conventions,
     * where the first argument to the callback is an error object, signaling
     * whether call was successful. If that object is passed to callback, it means
     * something went wrong.
     *
     * The output of `bindNodeCallback` is a function that takes the same
     * parameters as `func`, except the last one (the callback). When the output
     * function is called with arguments, it will return an Observable.
     * If `func` calls its callback with error parameter present, Observable will
     * error with that value as well. If error parameter is not passed, Observable will emit
     * second parameter. If there are more parameters (third and so on),
     * Observable will emit an array with all arguments, except first error argument.
     *
     * Note that `func` will not be called at the same time output function is,
     * but rather whenever resulting Observable is subscribed. By default call to
     * `func` will happen synchronously after subscription, but that can be changed
     * with proper `scheduler` provided as optional third parameter. {@link SchedulerLike}
     * can also control when values from callback will be emitted by Observable.
     * To find out more, check out documentation for {@link bindCallback}, where
     * {@link SchedulerLike} works exactly the same.
     *
     * As in {@link bindCallback}, context (`this` property) of input function will be set to context
     * of returned function, when it is called.
     *
     * After Observable emits value, it will complete immediately. This means
     * even if `func` calls callback again, values from second and consecutive
     * calls will never appear on the stream. If you need to handle functions
     * that call callbacks multiple times, check out {@link fromEvent} or
     * {@link fromEventPattern} instead.
     *
     * Note that `bindNodeCallback` can be used in non-Node.js environments as well.
     * "Node.js-style" callbacks are just a convention, so if you write for
     * browsers or any other environment and API you use implements that callback style,
     * `bindNodeCallback` can be safely used on that API functions as well.
     *
     * Remember that Error object passed to callback does not have to be an instance
     * of JavaScript built-in `Error` object. In fact, it does not even have to an object.
     * Error parameter of callback function is interpreted as "present", when value
     * of that parameter is truthy. It could be, for example, non-zero number, non-empty
     * string or boolean `true`. In all of these cases resulting Observable would error
     * with that value. This means usually regular style callbacks will fail very often when
     * `bindNodeCallback` is used. If your Observable errors much more often then you
     * would expect, check if callback really is called in Node.js-style and, if not,
     * switch to {@link bindCallback} instead.
     *
     * Note that even if error parameter is technically present in callback, but its value
     * is falsy, it still won't appear in array emitted by Observable.
     *
     * ## Examples
     * ###  Read a file from the filesystem and get the data as an Observable
     * ```ts
     * import * as fs from 'fs.ts';
     * const readFileAsObservable = bindNodeCallback(fs.readFile);
     * const result = readFileAsObservable('./roadNames.txt', 'utf8');
     * result.subscribe(x => console.log(x), e => console.error(e));
     * ```
     *
     * ### Use on function calling callback with multiple arguments
     * ```ts
     * someFunction((err, a, b) => {
     *   console.log(err); // null
     *   console.log(a); // 5
     *   console.log(b); // "some string"
     * });
     * const boundSomeFunction = bindNodeCallback(someFunction);
     * boundSomeFunction()
     * .subscribe(value => {
     *   console.log(value); // [5, "some string"]
     * });
     * ```
     *
     * ### Use on function calling callback in regular style
     * ```ts
     * someFunction(a => {
     *   console.log(a); // 5
     * });
     * const boundSomeFunction = bindNodeCallback(someFunction);
     * boundSomeFunction()
     * .subscribe(
     *   value => {}             // never gets called
     *   err => console.log(err) // 5
     * );
     * ```
     *
     * @see {@link bindCallback}
     * @see {@link from}
     *
     * @param {function} func Function with a Node.js-style callback as the last parameter.
     * @param {SchedulerLike} [scheduler] The scheduler on which to schedule the
     * callbacks.
     * @return {function(...params: *): Observable} A function which returns the
     * Observable that delivers the same values the Node.js callback would
     * deliver.
     * @name bindNodeCallback
     */
    function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
      if (resultSelector) {
        if (isScheduler_ts_3.isScheduler(resultSelector)) {
          scheduler = resultSelector;
        } else {
          // DEPRECATED PATH
          return (...args) =>
            bindNodeCallback(callbackFunc, scheduler)(...args).pipe(
              map_ts_2.map((args) =>
                isArray_ts_3.isArray(args)
                  ? resultSelector(...args)
                  : resultSelector(args)
              ),
            );
        }
      }
      return function (...args) {
        const params = {
          subject: undefined,
          args,
          callbackFunc,
          scheduler: scheduler,
          context: this,
        };
        return new Observable_ts_17.Observable((subscriber) => {
          const { context } = params;
          let { subject } = params;
          if (!scheduler) {
            if (!subject) {
              subject = params.subject = new AsyncSubject_ts_2.AsyncSubject();
              const handler = (...innerArgs) => {
                const err = innerArgs.shift();
                if (err) {
                  subject.error(err);
                  return;
                }
                subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                subject.complete();
              };
              try {
                callbackFunc.apply(context, [...args, handler]);
              } catch (err) {
                if (canReportError_ts_3.canReportError(subject)) {
                  subject.error(err);
                } else {
                  console.warn(err);
                }
              }
            }
            return subject.subscribe(subscriber);
          } else {
            return scheduler.schedule(
              dispatch,
              0,
              { params, subscriber, context },
            );
          }
        });
      };
    }
    exports_85("bindNodeCallback", bindNodeCallback);
    function dispatch(state) {
      const { params, subscriber, context } = state;
      const { callbackFunc, args, scheduler } = params;
      let subject = params.subject;
      if (!subject) {
        subject = params.subject = new AsyncSubject_ts_2.AsyncSubject();
        const handler = (...innerArgs) => {
          const err = innerArgs.shift();
          if (err) {
            this.add(scheduler.schedule(dispatchError, 0, { err, subject }));
          } else {
            const value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
            this.add(scheduler.schedule(dispatchNext, 0, { value, subject }));
          }
        };
        try {
          callbackFunc.apply(context, [...args, handler]);
        } catch (err) {
          this.add(scheduler.schedule(dispatchError, 0, { err, subject }));
        }
      }
      this.add(subject.subscribe(subscriber));
    }
    function dispatchNext(arg) {
      const { value, subject } = arg;
      subject.next(value);
      subject.complete();
    }
    function dispatchError(arg) {
      const { err, subject } = arg;
      subject.error(err);
    }
    return {
      setters: [
        function (Observable_ts_17_1) {
          Observable_ts_17 = Observable_ts_17_1;
        },
        function (AsyncSubject_ts_2_1) {
          AsyncSubject_ts_2 = AsyncSubject_ts_2_1;
        },
        function (map_ts_2_1) {
          map_ts_2 = map_ts_2_1;
        },
        function (canReportError_ts_3_1) {
          canReportError_ts_3 = canReportError_ts_3_1;
        },
        function (isScheduler_ts_3_1) {
          isScheduler_ts_3 = isScheduler_ts_3_1;
        },
        function (isArray_ts_3_1) {
          isArray_ts_3 = isArray_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/InnerSubscriber",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_86, context_86) {
    "use strict";
    var Subscriber_ts_8, InnerSubscriber;
    var __moduleName = context_86 && context_86.id;
    return {
      setters: [
        function (Subscriber_ts_8_1) {
          Subscriber_ts_8 = Subscriber_ts_8_1;
        },
      ],
      execute: function () {
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        InnerSubscriber = class InnerSubscriber
          extends Subscriber_ts_8.Subscriber {
          constructor(parent, outerValue, outerIndex) {
            super();
            this.parent = parent;
            this.outerValue = outerValue;
            this.outerIndex = outerIndex;
            this.index = 0;
          }
          _next(value) {
            this.parent.notifyNext(
              this.outerValue,
              value,
              this.outerIndex,
              this.index++,
              this,
            );
          }
          _error(error) {
            this.parent.notifyError(error, this);
            this.unsubscribe();
          }
          _complete() {
            this.parent.notifyComplete(this);
            this.unsubscribe();
          }
        };
        exports_86("InnerSubscriber", InnerSubscriber);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_87, context_87) {
    "use strict";
    var Subscriber_ts_9, OuterSubscriber;
    var __moduleName = context_87 && context_87.id;
    return {
      setters: [
        function (Subscriber_ts_9_1) {
          Subscriber_ts_9 = Subscriber_ts_9_1;
        },
      ],
      execute: function () {
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        OuterSubscriber = class OuterSubscriber
          extends Subscriber_ts_9.Subscriber {
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.destination.next(innerValue);
          }
          notifyError(error, innerSub) {
            this.destination.error(error);
          }
          notifyComplete(innerSub) {
            this.destination.complete();
          }
        };
        exports_87("OuterSubscriber", OuterSubscriber);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  [
    "https://deno.land/x/rxjs/src/internal/InnerSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeTo",
    "https://deno.land/x/rxjs/src/internal/Observable",
  ],
  function (exports_88, context_88) {
    "use strict";
    var InnerSubscriber_ts_1, subscribeTo_ts_2, Observable_ts_18;
    var __moduleName = context_88 && context_88.id;
    function subscribeToResult(
      outerSubscriber,
      result,
      outerValue,
      outerIndex,
      innerSubscriber = new InnerSubscriber_ts_1.InnerSubscriber(
        outerSubscriber,
        outerValue,
        outerIndex,
      ),
    ) {
      if (innerSubscriber.closed) {
        return undefined;
      }
      if (result instanceof Observable_ts_18.Observable) {
        return result.subscribe(innerSubscriber);
      }
      return subscribeTo_ts_2.subscribeTo(result)(innerSubscriber);
    }
    exports_88("subscribeToResult", subscribeToResult);
    return {
      setters: [
        function (InnerSubscriber_ts_1_1) {
          InnerSubscriber_ts_1 = InnerSubscriber_ts_1_1;
        },
        function (subscribeTo_ts_2_1) {
          subscribeTo_ts_2 = subscribeTo_ts_2_1;
        },
        function (Observable_ts_18_1) {
          Observable_ts_18 = Observable_ts_18_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/combineLatest",
  [
    "https://deno.land/x/rxjs/src/internal/util/isScheduler",
    "https://deno.land/x/rxjs/src/internal/util/isArray",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
    "https://deno.land/x/rxjs/src/internal/observable/fromArray",
  ],
  function (exports_89, context_89) {
    "use strict";
    var isScheduler_ts_4,
      isArray_ts_4,
      OuterSubscriber_ts_1,
      subscribeToResult_ts_1,
      fromArray_ts_2,
      NONE,
      CombineLatestOperator,
      CombineLatestSubscriber;
    var __moduleName = context_89 && context_89.id;
    /* tslint:enable:max-line-length */
    /**
     * Combines multiple Observables to create an Observable whose values are
     * calculated from the latest values of each of its input Observables.
     *
     * <span class="informal">Whenever any input Observable emits a value, it
     * computes a formula using the latest values from all the inputs, then emits
     * the output of that formula.</span>
     *
     * ![](combineLatest.png)
     *
     * `combineLatest` combines the values from all the Observables passed in the
     * observables array. This is done by subscribing to each Observable in order and,
     * whenever any Observable emits, collecting an array of the most recent
     * values from each Observable. So if you pass `n` Observables to this operator,
     * the returned Observable will always emit an array of `n` values, in an order
     * corresponding to the order of the passed Observables (the value from the first Observable
     * will be at index 0 of the array and so on).
     *
     * Static version of `combineLatest` accepts an array of Observables. Note that an array of
     * Observables is a good choice, if you don't know beforehand how many Observables
     * you will combine. Passing an empty array will result in an Observable that
     * completes immediately.
     *
     * To ensure the output array always has the same length, `combineLatest` will
     * actually wait for all input Observables to emit at least once,
     * before it starts emitting results. This means if some Observable emits
     * values before other Observables started emitting, all these values but the last
     * will be lost. On the other hand, if some Observable does not emit a value but
     * completes, resulting Observable will complete at the same moment without
     * emitting anything, since it will now be impossible to include a value from the
     * completed Observable in the resulting array. Also, if some input Observable does
     * not emit any value and never completes, `combineLatest` will also never emit
     * and never complete, since, again, it will wait for all streams to emit some
     * value.
     *
     * If at least one Observable was passed to `combineLatest` and all passed Observables
     * emitted something, the resulting Observable will complete when all combined
     * streams complete. So even if some Observable completes, the result of
     * `combineLatest` will still emit values when other Observables do. In case
     * of a completed Observable, its value from now on will always be the last
     * emitted value. On the other hand, if any Observable errors, `combineLatest`
     * will error immediately as well, and all other Observables will be unsubscribed.
     *
     * ## Examples
     * ### Combine two timer Observables
     * ```ts
     * import { combineLatest, timer } from 'rxjs.ts';
     *
     * const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
     * const secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
     * const combinedTimers = combineLatest([firstTimer, secondTimer]);
     * combinedTimers.subscribe(value => console.log(value));
     * // Logs
     * // [0, 0] after 0.5s
     * // [1, 0] after 1s
     * // [1, 1] after 1.5s
     * // [2, 1] after 2s
     * ```
     *
     * ### Combine an array of Observables
     * ```ts
     * import { combineLatest, of } from 'rxjs.ts';
     * import { delay, startWith } from 'rxjs/operators.ts';
     *
     * const observables = [1, 5, 10].map(
     *   n => of(n).pipe(
     *     delay(n * 1000),   // emit 0 and then emit n after n seconds
     *     startWith(0),
     *   )
     * );
     * const combined = combineLatest(observables);
     * combined.subscribe(value => console.log(value));
     * // Logs
     * // [0, 0, 0] immediately
     * // [1, 0, 0] after 1s
     * // [1, 5, 0] after 5s
     * // [1, 5, 10] after 10s
     * ```
     *
     *
     * ### Use map operator to dynamically calculate the Body-Mass Index
     * ```ts
     * import { combineLatest, of } from 'rxjs.ts';
     * import { map } from 'rxjs/operators.ts';
     *
     * const weight = of(70, 72, 76, 79, 75);
     * const height = of(1.76, 1.77, 1.78);
     * const bmi = combineLatest([weight, height]).pipe(
     *   map(([w, h]) => w / (h * h)),
     * );
     * bmi.subscribe(x => console.log('BMI is ' + x));
     *
     * // With output to console:
     * // BMI is 24.212293388429753
     * // BMI is 23.93948099205209
     * // BMI is 23.671253629592222
     * ```
     *
     * @see {@link combineAll}
     * @see {@link merge}
     * @see {@link withLatestFrom}
     *
     * @param {ObservableInput} [observables] An array of input Observables to combine with each other.
     * An array of Observables must be given as the first argument.
     * @param {function} [project] An optional function to project the values from
     * the combined latest values into a new value on the output Observable.
     * @param {SchedulerLike} [scheduler=null] The {@link SchedulerLike} to use for subscribing to
     * each input Observable.
     * @return {Observable} An Observable of projected values from the most recent
     * values from each input Observable, or an array of the most recent values from
     * each input Observable.
     */
    function combineLatest(...observables) {
      let resultSelector = undefined;
      let scheduler = undefined;
      if (isScheduler_ts_4.isScheduler(observables[observables.length - 1])) {
        scheduler = observables.pop();
      }
      if (typeof observables[observables.length - 1] === "function") {
        resultSelector = observables.pop();
      }
      // if the first and only other argument besides the resultSelector is an array
      // assume it's been called with `combineLatest([obs1, obs2, obs3], resultSelector)`
      if (observables.length === 1 && isArray_ts_4.isArray(observables[0])) {
        observables = observables[0];
      }
      return fromArray_ts_2.fromArray(observables, scheduler).lift(
        new CombineLatestOperator(resultSelector),
      );
    }
    exports_89("combineLatest", combineLatest);
    return {
      setters: [
        function (isScheduler_ts_4_1) {
          isScheduler_ts_4 = isScheduler_ts_4_1;
        },
        function (isArray_ts_4_1) {
          isArray_ts_4 = isArray_ts_4_1;
        },
        function (OuterSubscriber_ts_1_1) {
          OuterSubscriber_ts_1 = OuterSubscriber_ts_1_1;
        },
        function (subscribeToResult_ts_1_1) {
          subscribeToResult_ts_1 = subscribeToResult_ts_1_1;
        },
        function (fromArray_ts_2_1) {
          fromArray_ts_2 = fromArray_ts_2_1;
        },
      ],
      execute: function () {
        NONE = {};
        CombineLatestOperator = class CombineLatestOperator {
          constructor(resultSelector) {
            this.resultSelector = resultSelector;
          }
          call(subscriber, source) {
            return source.subscribe(
              new CombineLatestSubscriber(subscriber, this.resultSelector),
            );
          }
        };
        exports_89("CombineLatestOperator", CombineLatestOperator);
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        CombineLatestSubscriber = class CombineLatestSubscriber
          extends OuterSubscriber_ts_1.OuterSubscriber {
          constructor(destination, resultSelector) {
            super(destination);
            this.resultSelector = resultSelector;
            this.active = 0;
            this.values = [];
            this.observables = [];
          }
          _next(observable) {
            this.values.push(NONE);
            this.observables.push(observable);
          }
          _complete() {
            const observables = this.observables;
            const len = observables.length;
            if (len === 0) {
              this.destination.complete();
            } else {
              this.active = len;
              this.toRespond = len;
              for (let i = 0; i < len; i++) {
                const observable = observables[i];
                this.add(
                  subscribeToResult_ts_1.subscribeToResult(
                    this,
                    observable,
                    observable,
                    i,
                  ),
                );
              }
            }
          }
          notifyComplete(unused) {
            if ((this.active -= 1) === 0) {
              this.destination.complete();
            }
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            const values = this.values;
            const oldVal = values[outerIndex];
            const toRespond = !this.toRespond
              ? 0
              : oldVal === NONE
              ? --this.toRespond
              : this.toRespond;
            values[outerIndex] = innerValue;
            if (toRespond === 0) {
              if (this.resultSelector) {
                this._tryResultSelector(values);
              } else {
                this.destination.next(values.slice());
              }
            }
          }
          _tryResultSelector(values) {
            let result;
            try {
              result = this.resultSelector.apply(this, values);
            } catch (err) {
              this.destination.error(err);
              return;
            }
            this.destination.next(result);
          }
        };
        exports_89("CombineLatestSubscriber", CombineLatestSubscriber);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/mergeMap",
  [
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/InnerSubscriber",
    "https://deno.land/x/rxjs/src/internal/operators/map",
    "https://deno.land/x/rxjs/src/internal/observable/from",
  ],
  function (exports_90, context_90) {
    "use strict";
    var subscribeToResult_ts_2,
      OuterSubscriber_ts_2,
      InnerSubscriber_ts_2,
      map_ts_3,
      from_ts_2,
      MergeMapOperator,
      MergeMapSubscriber;
    var __moduleName = context_90 && context_90.id;
    /* tslint:enable:max-line-length */
    /**
     * Projects each source value to an Observable which is merged in the output
     * Observable.
     *
     * <span class="informal">Maps each value to an Observable, then flattens all of
     * these inner Observables using {@link mergeAll}.</span>
     *
     * ![](mergeMap.png)
     *
     * Returns an Observable that emits items based on applying a function that you
     * supply to each item emitted by the source Observable, where that function
     * returns an Observable, and then merging those resulting Observables and
     * emitting the results of this merger.
     *
     * ## Example
     * Map and flatten each letter to an Observable ticking every 1 second
     * ```ts
     * import { of, interval } from 'rxjs.ts';
     * import { mergeMap, map } from 'rxjs/operators.ts';
     *
     * const letters = of('a', 'b', 'c');
     * const result = letters.pipe(
     *   mergeMap(x => interval(1000).pipe(map(i => x+i))),
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // a0
     * // b0
     * // c0
     * // a1
     * // b1
     * // c1
     * // continues to list a,b,c with respective ascending integers
     * ```
     *
     * @see {@link concatMap}
     * @see {@link exhaustMap}
     * @see {@link merge}
     * @see {@link mergeAll}
     * @see {@link mergeMapTo}
     * @see {@link mergeScan}
     * @see {@link switchMap}
     *
     * @param {function(value: T, ?index: number): ObservableInput} project A function
     * that, when applied to an item emitted by the source Observable, returns an
     * Observable.
     * @param {number} [concurrent=Infinity] Maximum number of input
     * Observables being subscribed to concurrently.
     * @return {Observable} An Observable that emits the result of applying the
     * projection function (and the optional deprecated `resultSelector`) to each item
     * emitted by the source Observable and merging the results of the Observables
     * obtained from this transformation.
     * @name mergeMap
     */
    function mergeMap(project, resultSelector, concurrent = Infinity) {
      if (typeof resultSelector === "function") {
        // DEPRECATED PATH
        return (source) =>
          source.pipe(mergeMap((a, i) =>
            from_ts_2.from(project(a, i)).pipe(
              map_ts_3.map((b, ii) => resultSelector(a, b, i, ii)),
            ), concurrent));
      } else if (typeof resultSelector === "number") {
        concurrent = resultSelector;
      }
      return (source) => source.lift(new MergeMapOperator(project, concurrent));
    }
    exports_90("mergeMap", mergeMap);
    return {
      setters: [
        function (subscribeToResult_ts_2_1) {
          subscribeToResult_ts_2 = subscribeToResult_ts_2_1;
        },
        function (OuterSubscriber_ts_2_1) {
          OuterSubscriber_ts_2 = OuterSubscriber_ts_2_1;
        },
        function (InnerSubscriber_ts_2_1) {
          InnerSubscriber_ts_2 = InnerSubscriber_ts_2_1;
        },
        function (map_ts_3_1) {
          map_ts_3 = map_ts_3_1;
        },
        function (from_ts_2_1) {
          from_ts_2 = from_ts_2_1;
        },
      ],
      execute: function () {
        MergeMapOperator = class MergeMapOperator {
          constructor(project, concurrent = Infinity) {
            this.project = project;
            this.concurrent = concurrent;
          }
          call(observer, source) {
            return source.subscribe(
              new MergeMapSubscriber(observer, this.project, this.concurrent),
            );
          }
        };
        exports_90("MergeMapOperator", MergeMapOperator);
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        MergeMapSubscriber = class MergeMapSubscriber
          extends OuterSubscriber_ts_2.OuterSubscriber {
          constructor(destination, project, concurrent = Infinity) {
            super(destination);
            this.project = project;
            this.concurrent = concurrent;
            this.hasCompleted = false;
            this.buffer = [];
            this.active = 0;
            this.index = 0;
          }
          _next(value) {
            if (this.active < this.concurrent) {
              this._tryNext(value);
            } else {
              this.buffer.push(value);
            }
          }
          _tryNext(value) {
            let result;
            const index = this.index++;
            try {
              result = this.project(value, index);
            } catch (err) {
              this.destination.error(err);
              return;
            }
            this.active++;
            this._innerSub(result, value, index);
          }
          _innerSub(ish, value, index) {
            const innerSubscriber = new InnerSubscriber_ts_2.InnerSubscriber(
              this,
              value,
              index,
            );
            const destination = this.destination;
            destination.add(innerSubscriber);
            subscribeToResult_ts_2.subscribeToResult(
              this,
              ish,
              undefined,
              undefined,
              innerSubscriber,
            );
          }
          _complete() {
            this.hasCompleted = true;
            if (this.active === 0 && this.buffer.length === 0) {
              this.destination.complete();
            }
            this.unsubscribe();
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.destination.next(innerValue);
          }
          notifyComplete(innerSub) {
            const buffer = this.buffer;
            this.remove(innerSub);
            this.active--;
            if (buffer.length > 0) {
              this._next(buffer.shift());
            } else if (this.active === 0 && this.hasCompleted) {
              this.destination.complete();
            }
          }
        };
        exports_90("MergeMapSubscriber", MergeMapSubscriber);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/mergeAll",
  [
    "https://deno.land/x/rxjs/src/internal/operators/mergeMap",
    "https://deno.land/x/rxjs/src/internal/util/identity",
  ],
  function (exports_91, context_91) {
    "use strict";
    var mergeMap_ts_1, identity_ts_2;
    var __moduleName = context_91 && context_91.id;
    /**
     * Converts a higher-order Observable into a first-order Observable which
     * concurrently delivers all values that are emitted on the inner Observables.
     *
     * <span class="informal">Flattens an Observable-of-Observables.</span>
     *
     * ![](mergeAll.png)
     *
     * `mergeAll` subscribes to an Observable that emits Observables, also known as
     * a higher-order Observable. Each time it observes one of these emitted inner
     * Observables, it subscribes to that and delivers all the values from the
     * inner Observable on the output Observable. The output Observable only
     * completes once all inner Observables have completed. Any error delivered by
     * a inner Observable will be immediately emitted on the output Observable.
     *
     * ## Examples
     * Spawn a new interval Observable for each click event, and blend their outputs as one Observable
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { map, mergeAll } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const higherOrder = clicks.pipe(map((ev) => interval(1000)));
     * const firstOrder = higherOrder.pipe(mergeAll());
     * firstOrder.subscribe(x => console.log(x));
     * ```
     *
     * Count from 0 to 9 every second for each click, but only allow 2 concurrent timers
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { take, map, mergeAll } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const higherOrder = clicks.pipe(
     *   map((ev) => interval(1000).pipe(take(10))),
     * );
     * const firstOrder = higherOrder.pipe(mergeAll(2));
     * firstOrder.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link combineAll}
     * @see {@link concatAll}
     * @see {@link exhaust}
     * @see {@link merge}
     * @see {@link mergeMap}
     * @see {@link mergeMapTo}
     * @see {@link mergeScan}
     * @see {@link switchAll}
     * @see {@link switchMap}
     * @see {@link zipAll}
     *
     * @param {number} [concurrent=Infinity] Maximum number of inner
     * Observables being subscribed to concurrently.
     * @return {Observable} An Observable that emits values coming from all the
     * inner Observables emitted by the source Observable.
     * @name mergeAll
     */
    function mergeAll(concurrent = Infinity) {
      return mergeMap_ts_1.mergeMap(identity_ts_2.identity, concurrent);
    }
    exports_91("mergeAll", mergeAll);
    return {
      setters: [
        function (mergeMap_ts_1_1) {
          mergeMap_ts_1 = mergeMap_ts_1_1;
        },
        function (identity_ts_2_1) {
          identity_ts_2 = identity_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/concatAll",
  ["https://deno.land/x/rxjs/src/internal/operators/mergeAll"],
  function (exports_92, context_92) {
    "use strict";
    var mergeAll_ts_1;
    var __moduleName = context_92 && context_92.id;
    /**
     * Converts a higher-order Observable into a first-order Observable by
     * concatenating the inner Observables in order.
     *
     * <span class="informal">Flattens an Observable-of-Observables by putting one
     * inner Observable after the other.</span>
     *
     * ![](../../assets/images/svgs/concatAll.svg)
     *
     * Joins every Observable emitted by the source (a higher-order Observable), in
     * a serial fashion. It subscribes to each inner Observable only after the
     * previous inner Observable has completed, and merges all of their values into
     * the returned observable.
     *
     * __Warning:__ If the source Observable emits Observables quickly and
     * endlessly, and the inner Observables it emits generally complete slower than
     * the source emits, you can run into memory issues as the incoming Observables
     * collect in an unbounded buffer.
     *
     * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
     * to `1`.
     *
     * ## Example
     *
     * For each click event, tick every second from 0 to 3, with no concurrency
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { map, take, concatAll } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const higherOrder = clicks.pipe(
     *   map(ev => interval(1000).pipe(take(4))),
     * );
     * const firstOrder = higherOrder.pipe(concatAll());
     * firstOrder.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // (results are not concurrent)
     * // For every click on the "document" it will emit values 0 to 3 spaced
     * // on a 1000ms interval
     * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
     * ```
     *
     * @see {@link combineAll}
     * @see {@link concat}
     * @see {@link concatMap}
     * @see {@link concatMapTo}
     * @see {@link exhaust}
     * @see {@link mergeAll}
     * @see {@link switchAll}
     * @see {@link switchMap}
     * @see {@link zipAll}
     *
     * @return {Observable} An Observable emitting values from all the inner
     * Observables concatenated.
     * @name concatAll
     */
    function concatAll() {
      return mergeAll_ts_1.mergeAll(1);
    }
    exports_92("concatAll", concatAll);
    return {
      setters: [
        function (mergeAll_ts_1_1) {
          mergeAll_ts_1 = mergeAll_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/concat",
  [
    "https://deno.land/x/rxjs/src/internal/observable/of",
    "https://deno.land/x/rxjs/src/internal/operators/concatAll",
  ],
  function (exports_93, context_93) {
    "use strict";
    var of_ts_2, concatAll_ts_1;
    var __moduleName = context_93 && context_93.id;
    /* tslint:enable:max-line-length */
    /**
     * Creates an output Observable which sequentially emits all values from the first given
     * Observable and then moves on to the next.
     *
     * <span class="informal">Concatenates multiple Observables together by
     * sequentially emitting their values, one Observable after the other.</span>
     *
     * ![](concat.png)
     *
     * `concat` joins multiple Observables together, by subscribing to them one at a time and
     * merging their results into the output Observable. You can pass either an array of
     * Observables, or put them directly as arguments. Passing an empty array will result
     * in Observable that completes immediately.
     *
     * `concat` will subscribe to first input Observable and emit all its values, without
     * changing or affecting them in any way. When that Observable completes, it will
     * subscribe to then next Observable passed and, again, emit its values. This will be
     * repeated, until the operator runs out of Observables. When last input Observable completes,
     * `concat` will complete as well. At any given moment only one Observable passed to operator
     * emits values. If you would like to emit values from passed Observables concurrently, check out
     * {@link merge} instead, especially with optional `concurrent` parameter. As a matter of fact,
     * `concat` is an equivalent of `merge` operator with `concurrent` parameter set to `1`.
     *
     * Note that if some input Observable never completes, `concat` will also never complete
     * and Observables following the one that did not complete will never be subscribed. On the other
     * hand, if some Observable simply completes immediately after it is subscribed, it will be
     * invisible for `concat`, which will just move on to the next Observable.
     *
     * If any Observable in chain errors, instead of passing control to the next Observable,
     * `concat` will error immediately as well. Observables that would be subscribed after
     * the one that emitted error, never will.
     *
     * If you pass to `concat` the same Observable many times, its stream of values
     * will be "replayed" on every subscription, which means you can repeat given Observable
     * as many times as you like. If passing the same Observable to `concat` 1000 times becomes tedious,
     * you can always use {@link repeat}.
     *
     * ## Examples
     * ### Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10
     * ```ts
     * import { concat, interval, range } from 'rxjs.ts';
     * import { take } from 'rxjs/operators.ts';
     *
     * const timer = interval(1000).pipe(take(4));
     * const sequence = range(1, 10);
     * const result = concat(timer, sequence);
     * result.subscribe(x => console.log(x));
     *
     * // results in:
     * // 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
     * ```
     *
     * ### Concatenate 3 Observables
     * ```ts
     * import { concat, interval } from 'rxjs.ts';
     * import { take } from 'rxjs/operators.ts';
     *
     * const timer1 = interval(1000).pipe(take(10));
     * const timer2 = interval(2000).pipe(take(6));
     * const timer3 = interval(500).pipe(take(10));
     *
     * const result = concat(timer1, timer2, timer3);
     * result.subscribe(x => console.log(x));
     *
     * // results in the following:
     * // (Prints to console sequentially)
     * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
     * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
     * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
     * ```
     *
     * ### Concatenate the same Observable to repeat it
     * ```ts
     * import { concat, interval } from 'rxjs.ts';
     * import { take } from 'rxjs/operators.ts';
     *
     * const timer = interval(1000).pipe(take(2));
     *
     * concat(timer, timer) // concatenating the same Observable!
     * .subscribe(
     *   value => console.log(value),
     *   err => {},
     *   () => console.log('...and it is done!')
     * );
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // 0 after 3s
     * // 1 after 4s
     * // "...and it is done!" also after 4s
     * ```
     *
     * @see {@link concatAll}
     * @see {@link concatMap}
     * @see {@link concatMapTo}
     * @see {@link startWith}
     * @see {@link endWith}
     *
     * @param input1 An input Observable to concatenate with others.
     * @param input2 An input Observable to concatenate with others.
     * More than one input Observables may be given as argument.
     * @param scheduler An optional {@link SchedulerLike} to schedule each
     * Observable subscription on.
     */
    function concat(...observables) {
      // The cast with `as` below is due to the SchedulerLike, once this is removed, it will no longer be a problem.
      return concatAll_ts_1.concatAll()(of_ts_2.of(...observables));
    }
    exports_93("concat", concat);
    return {
      setters: [
        function (of_ts_2_1) {
          of_ts_2 = of_ts_2_1;
        },
        function (concatAll_ts_1_1) {
          concatAll_ts_1 = concatAll_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/forkJoin",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/util/isArray",
    "https://deno.land/x/rxjs/src/internal/operators/map",
    "https://deno.land/x/rxjs/src/internal/util/isObject",
    "https://deno.land/x/rxjs/src/internal/observable/from",
  ],
  function (exports_94, context_94) {
    "use strict";
    var Observable_ts_19, isArray_ts_5, map_ts_4, isObject_ts_3, from_ts_3;
    var __moduleName = context_94 && context_94.id;
    /* tslint:enable:max-line-length */
    /**
     * Accepts an `Array` of {@link ObservableInput} or a dictionary `Object` of {@link ObservableInput} and returns
     * an {@link Observable} that emits either an array of values in the exact same order as the passed array,
     * or a dictionary of values in the same shape as the passed dictionary.
     *
     * <span class="informal">Wait for Observables to complete and then combine last values they emitted;
     * complete immediately if an empty array is passed.</span>
     *
     * ![](forkJoin.png)
     *
     * `forkJoin` is an operator that takes any number of input observables which can be passed either as an array
     * or a dictionary of input observables. If no input observables are provided (e.g. an empty array is passed),
     * then the resulting stream will complete immediately.
     *
     * `forkJoin` will wait for all passed observables to emit and complete and then it will emit an array or an object with last
     * values from corresponding observables.
     *
     * If you pass an array of `n` observables to the operator, then the resulting
     * array will have `n` values, where the first value is the last one emitted by the first observable,
     * second value is the last one emitted by the second observable and so on.
     *
     * If you pass a dictionary of observables to the operator, then the resulting
     * objects will have the same keys as the dictionary passed, with their last values they have emitted
     * located at the corresponding key.
     *
     * That means `forkJoin` will not emit more than once and it will complete after that. If you need to emit combined
     * values not only at the end of the lifecycle of passed observables, but also throughout it, try out {@link combineLatest}
     * or {@link zip} instead.
     *
     * In order for the resulting array to have the same length as the number of input observables, whenever any of
     * the given observables completes without emitting any value, `forkJoin` will complete at that moment as well
     * and it will not emit anything either, even if it already has some last values from other observables.
     * Conversely, if there is an observable that never completes, `forkJoin` will never complete either,
     * unless at any point some other observable completes without emitting a value, which brings us back to
     * the previous case. Overall, in order for `forkJoin` to emit a value, all given observables
     * have to emit something at least once and complete.
     *
     * If any given observable errors at some point, `forkJoin` will error as well and immediately unsubscribe
     * from the other observables.
     *
     * Optionally `forkJoin` accepts a `resultSelector` function, that will be called with values which normally
     * would land in the emitted array. Whatever is returned by the `resultSelector`, will appear in the output
     * observable instead. This means that the default `resultSelector` can be thought of as a function that takes
     * all its arguments and puts them into an array. Note that the `resultSelector` will be called only
     * when `forkJoin` is supposed to emit a result.
     *
     * ## Examples
     *
     * ### Use forkJoin with a dictionary of observable inputs
     * ```ts
     * import { forkJoin, of, timer } from 'rxjs.ts';
     *
     * const observable = forkJoin({
     *   foo: of(1, 2, 3, 4),
     *   bar: Promise.resolve(8),
     *   baz: timer(4000),
     * });
     * observable.subscribe({
     *  next: value => console.log(value),
     *  complete: () => console.log('This is how it ends!'),
     * });
     *
     * // Logs:
     * // { foo: 4, bar: 8, baz: 0 } after 4 seconds
     * // "This is how it ends!" immediately after
     * ```
     *
     * ### Use forkJoin with an array of observable inputs
     * ```ts
     * import { forkJoin, of, timer } from 'rxjs.ts';
     *
     * const observable = forkJoin([
     *   of(1, 2, 3, 4),
     *   Promise.resolve(8),
     *   timer(4000),
     * ]);
     * observable.subscribe({
     *  next: value => console.log(value),
     *  complete: () => console.log('This is how it ends!'),
     * });
     *
     * // Logs:
     * // [4, 8, 0] after 4 seconds
     * // "This is how it ends!" immediately after
     * ```
     *
     * @see {@link combineLatest}
     * @see {@link zip}
     *
     * @param {...ObservableInput} sources Any number of Observables provided either as an array or as an arguments
     * passed directly to the operator.
     * @param {function} [project] Function that takes values emitted by input Observables and returns value
     * that will appear in resulting Observable instead of default array.
     * @return {Observable} Observable emitting either an array of last values emitted by passed Observables
     * or value from project function.
     */
    function forkJoin(...sources) {
      if (sources.length === 1) {
        const first = sources[0];
        if (isArray_ts_5.isArray(first)) {
          return forkJoinInternal(first, null);
        }
        if (
          isObject_ts_3.isObject(first) &&
          Object.getPrototypeOf(first) === Object.prototype
        ) {
          const keys = Object.keys(first);
          return forkJoinInternal(keys.map((key) => first[key]), keys);
        }
      }
      // DEPRECATED PATHS BELOW HERE
      if (typeof sources[sources.length - 1] === "function") {
        const resultSelector = sources.pop();
        sources = (sources.length === 1 && isArray_ts_5.isArray(sources[0]))
          ? sources[0] : sources;
        return forkJoinInternal(sources, null).pipe(
          map_ts_4.map((args) => resultSelector(...args)),
        );
      }
      return forkJoinInternal(sources, null);
    }
    exports_94("forkJoin", forkJoin);
    function forkJoinInternal(sources, keys) {
      return new Observable_ts_19.Observable((subscriber) => {
        const len = sources.length;
        if (len === 0) {
          subscriber.complete();
          return;
        }
        const values = new Array(len);
        let completed = 0;
        let emitted = 0;
        for (let i = 0; i < len; i++) {
          const source = from_ts_3.from(sources[i]);
          let hasValue = false;
          subscriber.add(source.subscribe({
            next: (value) => {
              if (!hasValue) {
                hasValue = true;
                emitted++;
              }
              values[i] = value;
            },
            error: (err) => subscriber.error(err),
            complete: () => {
              completed++;
              if (completed === len || !hasValue) {
                if (emitted === len) {
                  subscriber.next(
                    keys
                      ? keys.reduce(
                        (result, key, i) => (result[key] = values[i], result),
                        {},
                      )
                      : values,
                  );
                }
                subscriber.complete();
              }
            },
          }));
        }
      });
    }
    return {
      setters: [
        function (Observable_ts_19_1) {
          Observable_ts_19 = Observable_ts_19_1;
        },
        function (isArray_ts_5_1) {
          isArray_ts_5 = isArray_ts_5_1;
        },
        function (map_ts_4_1) {
          map_ts_4 = map_ts_4_1;
        },
        function (isObject_ts_3_1) {
          isObject_ts_3 = isObject_ts_3_1;
        },
        function (from_ts_3_1) {
          from_ts_3 = from_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/fromEvent",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/util/isArray",
    "https://deno.land/x/rxjs/src/internal/util/isFunction",
    "https://deno.land/x/rxjs/src/internal/operators/map",
  ],
  function (exports_95, context_95) {
    "use strict";
    var Observable_ts_20, isArray_ts_6, isFunction_ts_3, map_ts_5;
    var __moduleName = context_95 && context_95.id;
    /* tslint:enable:max-line-length */
    /**
     * Creates an Observable that emits events of a specific type coming from the
     * given event target.
     *
     * <span class="informal">Creates an Observable from DOM events, or Node.js
     * EventEmitter events or others.</span>
     *
     * ![](fromEvent.png)
     *
     * `fromEvent` accepts as a first argument event target, which is an object with methods
     * for registering event handler functions. As a second argument it takes string that indicates
     * type of event we want to listen for. `fromEvent` supports selected types of event targets,
     * which are described in detail below. If your event target does not match any of the ones listed,
     * you should use {@link fromEventPattern}, which can be used on arbitrary APIs.
     * When it comes to APIs supported by `fromEvent`, their methods for adding and removing event
     * handler functions have different names, but they all accept a string describing event type
     * and function itself, which will be called whenever said event happens.
     *
     * Every time resulting Observable is subscribed, event handler function will be registered
     * to event target on given event type. When that event fires, value
     * passed as a first argument to registered function will be emitted by output Observable.
     * When Observable is unsubscribed, function will be unregistered from event target.
     *
     * Note that if event target calls registered function with more than one argument, second
     * and following arguments will not appear in resulting stream. In order to get access to them,
     * you can pass to `fromEvent` optional project function, which will be called with all arguments
     * passed to event handler. Output Observable will then emit value returned by project function,
     * instead of the usual value.
     *
     * Remember that event targets listed below are checked via duck typing. It means that
     * no matter what kind of object you have and no matter what environment you work in,
     * you can safely use `fromEvent` on that object if it exposes described methods (provided
     * of course they behave as was described above). So for example if Node.js library exposes
     * event target which has the same method names as DOM EventTarget, `fromEvent` is still
     * a good choice.
     *
     * If the API you use is more callback then event handler oriented (subscribed
     * callback function fires only once and thus there is no need to manually
     * unregister it), you should use {@link bindCallback} or {@link bindNodeCallback}
     * instead.
     *
     * `fromEvent` supports following types of event targets:
     *
     * **DOM EventTarget**
     *
     * This is an object with `addEventListener` and `removeEventListener` methods.
     *
     * In the browser, `addEventListener` accepts - apart from event type string and event
     * handler function arguments - optional third parameter, which is either an object or boolean,
     * both used for additional configuration how and when passed function will be called. When
     * `fromEvent` is used with event target of that type, you can provide this values
     * as third parameter as well.
     *
     * **Node.js EventEmitter**
     *
     * An object with `addListener` and `removeListener` methods.
     *
     * **JQuery-style event target**
     *
     * An object with `on` and `off` methods
     *
     * **DOM NodeList**
     *
     * List of DOM Nodes, returned for example by `document.querySelectorAll` or `Node.childNodes`.
     *
     * Although this collection is not event target in itself, `fromEvent` will iterate over all Nodes
     * it contains and install event handler function in every of them. When returned Observable
     * is unsubscribed, function will be removed from all Nodes.
     *
     * **DOM HtmlCollection**
     *
     * Just as in case of NodeList it is a collection of DOM nodes. Here as well event handler function is
     * installed and removed in each of elements.
     *
     *
     * ## Examples
     * ### Emits clicks happening on the DOM document
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * clicks.subscribe(x => console.log(x));
     *
     * // Results in:
     * // MouseEvent object logged to console every time a click
     * // occurs on the document.
     * ```
     *
     * ### Use addEventListener with capture option
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     *
     * const clicksInDocument = fromEvent(document, 'click', true); // note optional configuration parameter
     *                                                              // which will be passed to addEventListener
     * const clicksInDiv = fromEvent(someDivInDocument, 'click');
     *
     * clicksInDocument.subscribe(() => console.log('document'));
     * clicksInDiv.subscribe(() => console.log('div'));
     *
     * // By default events bubble UP in DOM tree, so normally
     * // when we would click on div in document
     * // "div" would be logged first and then "document".
     * // Since we specified optional `capture` option, document
     * // will catch event when it goes DOWN DOM tree, so console
     * // will log "document" and then "div".
     * ```
     *
     * @see {@link bindCallback}
     * @see {@link bindNodeCallback}
     * @see {@link fromEventPattern}
     *
     * @param {FromEventTarget<T>} target The DOM EventTarget, Node.js
     * EventEmitter, JQuery-like event target, NodeList or HTMLCollection to attach the event handler to.
     * @param {string} eventName The event name of interest, being emitted by the
     * `target`.
     * @param {EventListenerOptions} [options] Options to pass through to addEventListener
     * @return {Observable<T>}
     * @name fromEvent
     */
    function fromEvent(target, eventName, options, resultSelector) {
      if (isFunction_ts_3.isFunction(options)) {
        // DEPRECATED PATH
        resultSelector = options;
        options = undefined;
      }
      if (resultSelector) {
        // DEPRECATED PATH
        return fromEvent(target, eventName, options).pipe(map_ts_5.map((args) =>
          isArray_ts_6.isArray(args)
            ? resultSelector(...args)
            : resultSelector(args)
        ));
      }
      return new Observable_ts_20.Observable((subscriber) => {
        function handler(e) {
          if (arguments.length > 1) {
            subscriber.next(Array.prototype.slice.call(arguments));
          } else {
            subscriber.next(e);
          }
        }
        setupSubscription(target, eventName, handler, subscriber, options);
      });
    }
    exports_95("fromEvent", fromEvent);
    function setupSubscription(
      sourceObj,
      eventName,
      handler,
      subscriber,
      options,
    ) {
      let unsubscribe;
      if (isEventTarget(sourceObj)) {
        const source = sourceObj;
        sourceObj.addEventListener(eventName, handler, options);
        unsubscribe = () =>
          source.removeEventListener(eventName, handler, options);
      } else if (isJQueryStyleEventEmitter(sourceObj)) {
        const source = sourceObj;
        sourceObj.on(eventName, handler);
        unsubscribe = () => source.off(eventName, handler);
      } else if (isNodeStyleEventEmitter(sourceObj)) {
        const source = sourceObj;
        sourceObj.addListener(eventName, handler);
        unsubscribe = () => source.removeListener(eventName, handler);
      } else if (sourceObj && sourceObj.length) {
        for (let i = 0, len = sourceObj.length; i < len; i++) {
          setupSubscription(
            sourceObj[i],
            eventName,
            handler,
            subscriber,
            options,
          );
        }
      } else {
        throw new TypeError("Invalid event target");
      }
      subscriber.add(unsubscribe);
    }
    function isNodeStyleEventEmitter(sourceObj) {
      return sourceObj && typeof sourceObj.addListener === "function" &&
        typeof sourceObj.removeListener === "function";
    }
    function isJQueryStyleEventEmitter(sourceObj) {
      return sourceObj && typeof sourceObj.on === "function" &&
        typeof sourceObj.off === "function";
    }
    function isEventTarget(sourceObj) {
      return sourceObj && typeof sourceObj.addEventListener === "function" &&
        typeof sourceObj.removeEventListener === "function";
    }
    return {
      setters: [
        function (Observable_ts_20_1) {
          Observable_ts_20 = Observable_ts_20_1;
        },
        function (isArray_ts_6_1) {
          isArray_ts_6 = isArray_ts_6_1;
        },
        function (isFunction_ts_3_1) {
          isFunction_ts_3 = isFunction_ts_3_1;
        },
        function (map_ts_5_1) {
          map_ts_5 = map_ts_5_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/fromEventPattern",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/util/isArray",
    "https://deno.land/x/rxjs/src/internal/util/isFunction",
    "https://deno.land/x/rxjs/src/internal/operators/map",
  ],
  function (exports_96, context_96) {
    "use strict";
    var Observable_ts_21, isArray_ts_7, isFunction_ts_4, map_ts_6;
    var __moduleName = context_96 && context_96.id;
    /* tslint:enable:max-line-length */
    /**
     * Creates an Observable from an arbitrary API for registering event handlers.
     *
     * <span class="informal">When that method for adding event handler was something {@link fromEvent}
     * was not prepared for.</span>
     *
     * ![](fromEventPattern.png)
     *
     * `fromEventPattern` allows you to convert into an Observable any API that supports registering handler functions
     * for events. It is similar to {@link fromEvent}, but far
     * more flexible. In fact, all use cases of {@link fromEvent} could be easily handled by
     * `fromEventPattern` (although in slightly more verbose way).
     *
     * This operator accepts as a first argument an `addHandler` function, which will be injected with
     * handler parameter. That handler is actually an event handler function that you now can pass
     * to API expecting it. `addHandler` will be called whenever Observable
     * returned by the operator is subscribed, so registering handler in API will not
     * necessarily happen when `fromEventPattern` is called.
     *
     * After registration, every time an event that we listen to happens,
     * Observable returned by `fromEventPattern` will emit value that event handler
     * function was called with. Note that if event handler was called with more
     * then one argument, second and following arguments will not appear in the Observable.
     *
     * If API you are using allows to unregister event handlers as well, you can pass to `fromEventPattern`
     * another function - `removeHandler` - as a second parameter. It will be injected
     * with the same handler function as before, which now you can use to unregister
     * it from the API. `removeHandler` will be called when consumer of resulting Observable
     * unsubscribes from it.
     *
     * In some APIs unregistering is actually handled differently. Method registering an event handler
     * returns some kind of token, which is later used to identify which function should
     * be unregistered or it itself has method that unregisters event handler.
     * If that is the case with your API, make sure token returned
     * by registering method is returned by `addHandler`. Then it will be passed
     * as a second argument to `removeHandler`, where you will be able to use it.
     *
     * If you need access to all event handler parameters (not only the first one),
     * or you need to transform them in any way, you can call `fromEventPattern` with optional
     * third parameter - project function which will accept all arguments passed to
     * event handler when it is called. Whatever is returned from project function will appear on
     * resulting stream instead of usual event handlers first argument. This means
     * that default project can be thought of as function that takes its first parameter
     * and ignores the rest.
     *
     * ## Example
     * ### Emits clicks happening on the DOM document
     *
     * ```ts
     * import { fromEventPattern } from 'rxjs.ts';
     *
     * function addClickHandler(handler) {
     *   document.addEventListener('click', handler);
     * }
     *
     * function removeClickHandler(handler) {
     *   document.removeEventListener('click', handler);
     * }
     *
     * const clicks = fromEventPattern(
     *   addClickHandler,
     *   removeClickHandler
     * );
     * clicks.subscribe(x => console.log(x));
     *
     * // Whenever you click anywhere in the browser, DOM MouseEvent
     * // object will be logged.
     * ```
     *
     * ## Example
     * ### Use with API that returns cancellation token
     *
     * ```ts
     * import { fromEventPattern } from 'rxjs.ts';
     *
     * const token = someAPI.registerEventHandler(function() {});
     * someAPI.unregisterEventHandler(token); // this APIs cancellation method accepts
     *                                        // not handler itself, but special token.
     *
     * const someAPIObservable = fromEventPattern(
     *   function(handler) { return someAPI.registerEventHandler(handler); }, // Note that we return the token here...
     *   function(handler, token) { someAPI.unregisterEventHandler(token); }  // ...to then use it here.
     * );
     * ```
     *
     * ## Example
     * ### Use with project function
     *
     * ```ts
     * import { fromEventPattern } from 'rxjs.ts';
     *
     * someAPI.registerEventHandler((eventType, eventMessage) => {
     *   console.log(eventType, eventMessage); // Logs "EVENT_TYPE" "EVENT_MESSAGE" to console.
     * });
     *
     * const someAPIObservable = fromEventPattern(
     *   handler => someAPI.registerEventHandler(handler),
     *   handler => someAPI.unregisterEventHandler(handler)
     *   (eventType, eventMessage) => eventType + " --- " + eventMessage // without that function only "EVENT_TYPE"
     * );                                                                // would be emitted by the Observable
     *
     * someAPIObservable.subscribe(value => console.log(value));
     *
     * // Logs:
     * // "EVENT_TYPE --- EVENT_MESSAGE"
     * ```
     *
     * @see {@link fromEvent}
     * @see {@link bindCallback}
     * @see {@link bindNodeCallback}
     *
     * @param {function(handler: Function): any} addHandler A function that takes
     * a `handler` function as argument and attaches it somehow to the actual
     * source of events.
     * @param {function(handler: Function, token?: any): void} [removeHandler] A function that
     * takes a `handler` function as an argument and removes it from the event source. If `addHandler`
     * returns some kind of token, `removeHandler` function will have it as a second parameter.
     * @param {function(...args: any): T} [project] A function to
     * transform results. It takes the arguments from the event handler and
     * should return a single value.
     * @return {Observable<T>} Observable which, when an event happens, emits first parameter
     * passed to registered event handler. Alternatively it emits whatever project function returns
     * at that moment.
     * @static true
     * @name fromEventPattern
     * @owner Observable
     */
    function fromEventPattern(addHandler, removeHandler, resultSelector) {
      if (resultSelector) {
        // DEPRECATED PATH
        return fromEventPattern(addHandler, removeHandler).pipe(
          map_ts_6.map((args) =>
            isArray_ts_7.isArray(args)
              ? resultSelector(...args)
              : resultSelector(args)
          ),
        );
      }
      return new Observable_ts_21.Observable((subscriber) => {
        const handler = (...e) => subscriber.next(e.length === 1 ? e[0] : e);
        let retValue;
        try {
          retValue = addHandler(handler);
        } catch (err) {
          subscriber.error(err);
          return undefined;
        }
        if (!isFunction_ts_4.isFunction(removeHandler)) {
          return undefined;
        }
        return () => removeHandler(handler, retValue);
      });
    }
    exports_96("fromEventPattern", fromEventPattern);
    return {
      setters: [
        function (Observable_ts_21_1) {
          Observable_ts_21 = Observable_ts_21_1;
        },
        function (isArray_ts_7_1) {
          isArray_ts_7 = isArray_ts_7_1;
        },
        function (isFunction_ts_4_1) {
          isFunction_ts_4 = isFunction_ts_4_1;
        },
        function (map_ts_6_1) {
          map_ts_6 = map_ts_6_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/generate",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/util/identity",
    "https://deno.land/x/rxjs/src/internal/util/isScheduler",
  ],
  function (exports_97, context_97) {
    "use strict";
    var Observable_ts_22, identity_ts_3, isScheduler_ts_5;
    var __moduleName = context_97 && context_97.id;
    function generate(
      initialStateOrOptions,
      condition,
      iterate,
      resultSelectorOrScheduler,
      scheduler,
    ) {
      let resultSelector;
      let initialState;
      if (arguments.length == 1) {
        const options = initialStateOrOptions;
        initialState = options.initialState;
        condition = options.condition;
        iterate = options.iterate;
        resultSelector = options.resultSelector || identity_ts_3.identity;
        scheduler = options.scheduler;
      } else if (
        resultSelectorOrScheduler === undefined ||
        isScheduler_ts_5.isScheduler(resultSelectorOrScheduler)
      ) {
        initialState = initialStateOrOptions;
        resultSelector = identity_ts_3.identity;
        scheduler = resultSelectorOrScheduler;
      } else {
        initialState = initialStateOrOptions;
        resultSelector = resultSelectorOrScheduler;
      }
      return new Observable_ts_22.Observable((subscriber) => {
        let state = initialState;
        if (scheduler) {
          return scheduler.schedule(dispatch, 0, {
            subscriber,
            iterate: iterate,
            condition,
            resultSelector,
            state,
          });
        }
        do {
          if (condition) {
            let conditionResult;
            try {
              conditionResult = condition(state);
            } catch (err) {
              subscriber.error(err);
              return undefined;
            }
            if (!conditionResult) {
              subscriber.complete();
              break;
            }
          }
          let value;
          try {
            value = resultSelector(state);
          } catch (err) {
            subscriber.error(err);
            return undefined;
          }
          subscriber.next(value);
          if (subscriber.closed) {
            break;
          }
          try {
            state = iterate(state);
          } catch (err) {
            subscriber.error(err);
            return undefined;
          }
        } while (true);
        return undefined;
      });
    }
    exports_97("generate", generate);
    function dispatch(state) {
      const { subscriber, condition } = state;
      if (subscriber.closed) {
        return undefined;
      }
      if (state.needIterate) {
        try {
          state.state = state.iterate(state.state);
        } catch (err) {
          subscriber.error(err);
          return undefined;
        }
      } else {
        state.needIterate = true;
      }
      if (condition) {
        let conditionResult;
        try {
          conditionResult = condition(state.state);
        } catch (err) {
          subscriber.error(err);
          return undefined;
        }
        if (!conditionResult) {
          subscriber.complete();
          return undefined;
        }
        if (subscriber.closed) {
          return undefined;
        }
      }
      let value;
      try {
        value = state.resultSelector(state.state);
      } catch (err) {
        subscriber.error(err);
        return undefined;
      }
      if (subscriber.closed) {
        return undefined;
      }
      subscriber.next(value);
      if (subscriber.closed) {
        return undefined;
      }
      return this.schedule(state);
    }
    return {
      setters: [
        function (Observable_ts_22_1) {
          Observable_ts_22 = Observable_ts_22_1;
        },
        function (identity_ts_3_1) {
          identity_ts_3 = identity_ts_3_1;
        },
        function (isScheduler_ts_5_1) {
          isScheduler_ts_5 = isScheduler_ts_5_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/isNumeric",
  ["https://deno.land/x/rxjs/src/internal/util/isArray"],
  function (exports_98, context_98) {
    "use strict";
    var isArray_ts_8;
    var __moduleName = context_98 && context_98.id;
    function isNumeric(val) {
      // parseFloat NaNs numeric-cast false positives (null|true|false|"")
      // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
      // subtraction forces infinities to NaN
      // adding 1 corrects loss of precision from parseFloat (#15100)
      return !isArray_ts_8.isArray(val) && (val - parseFloat(val) + 1) >= 0;
    }
    exports_98("isNumeric", isNumeric);
    return {
      setters: [
        function (isArray_ts_8_1) {
          isArray_ts_8 = isArray_ts_8_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/interval",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/scheduler/async",
    "https://deno.land/x/rxjs/src/internal/util/isNumeric",
  ],
  function (exports_99, context_99) {
    "use strict";
    var Observable_ts_23, async_ts_1, isNumeric_ts_1;
    var __moduleName = context_99 && context_99.id;
    /**
     * Creates an Observable that emits sequential numbers every specified
     * interval of time, on a specified {@link SchedulerLike}.
     *
     * <span class="informal">Emits incremental numbers periodically in time.
     * </span>
     *
     * ![](interval.png)
     *
     * `interval` returns an Observable that emits an infinite sequence of
     * ascending integers, with a constant interval of time of your choosing
     * between those emissions. The first emission is not sent immediately, but
     * only after the first period has passed. By default, this operator uses the
     * `async` {@link SchedulerLike} to provide a notion of time, but you may pass any
     * {@link SchedulerLike} to it.
     *
     * ## Example
     * Emits ascending numbers, one every second (1000ms) up to the number 3
     * ```ts
     * import { interval } from 'rxjs.ts';
     * import { take } from 'rxjs/operators.ts';
     *
     * const numbers = interval(1000);
     *
     * const takeFourNumbers = numbers.pipe(take(4));
     *
     * takeFourNumbers.subscribe(x => console.log('Next: ', x));
     *
     * // Logs:
     * // Next: 0
     * // Next: 1
     * // Next: 2
     * // Next: 3
     * ```
     *
     * @see {@link timer}
     * @see {@link delay}
     *
     * @param {number} [period=0] The interval size in milliseconds (by default)
     * or the time unit determined by the scheduler's clock.
     * @param {SchedulerLike} [scheduler=async] The {@link SchedulerLike} to use for scheduling
     * the emission of values, and providing a notion of "time".
     * @return {Observable} An Observable that emits a sequential number each time
     * interval.
     * @static true
     * @name interval
     * @owner Observable
     */
    function interval(period = 0, scheduler = async_ts_1.async) {
      if (!isNumeric_ts_1.isNumeric(period) || period < 0) {
        period = 0;
      }
      if (!scheduler || typeof scheduler.schedule !== "function") {
        scheduler = async_ts_1.async;
      }
      return new Observable_ts_23.Observable((subscriber) => {
        subscriber.add(
          scheduler.schedule(
            dispatch,
            period,
            { subscriber, counter: 0, period },
          ),
        );
        return subscriber;
      });
    }
    exports_99("interval", interval);
    function dispatch(state) {
      const { subscriber, counter, period } = state;
      subscriber.next(counter);
      this.schedule({ subscriber, counter: counter + 1, period }, period);
    }
    return {
      setters: [
        function (Observable_ts_23_1) {
          Observable_ts_23 = Observable_ts_23_1;
        },
        function (async_ts_1_1) {
          async_ts_1 = async_ts_1_1;
        },
        function (isNumeric_ts_1_1) {
          isNumeric_ts_1 = isNumeric_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/merge",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/util/isScheduler",
    "https://deno.land/x/rxjs/src/internal/operators/mergeAll",
    "https://deno.land/x/rxjs/src/internal/observable/fromArray",
  ],
  function (exports_100, context_100) {
    "use strict";
    var Observable_ts_24, isScheduler_ts_6, mergeAll_ts_2, fromArray_ts_3;
    var __moduleName = context_100 && context_100.id;
    /* tslint:enable:max-line-length */
    /**
     * Creates an output Observable which concurrently emits all values from every
     * given input Observable.
     *
     * <span class="informal">Flattens multiple Observables together by blending
     * their values into one Observable.</span>
     *
     * ![](merge.png)
     *
     * `merge` subscribes to each given input Observable (as arguments), and simply
     * forwards (without doing any transformation) all the values from all the input
     * Observables to the output Observable. The output Observable only completes
     * once all input Observables have completed. Any error delivered by an input
     * Observable will be immediately emitted on the output Observable.
     *
     * ## Examples
     * ### Merge together two Observables: 1s interval and clicks
     * ```ts
     * import { merge, fromEvent, interval } from 'rxjs.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const timer = interval(1000);
     * const clicksOrTimer = merge(clicks, timer);
     * clicksOrTimer.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // timer will emit ascending values, one every second(1000ms) to console
     * // clicks logs MouseEvents to console everytime the "document" is clicked
     * // Since the two streams are merged you see these happening
     * // as they occur.
     * ```
     *
     * ### Merge together 3 Observables, but only 2 run concurrently
     * ```ts
     * import { merge, interval } from 'rxjs.ts';
     * import { take } from 'rxjs/operators.ts';
     *
     * const timer1 = interval(1000).pipe(take(10));
     * const timer2 = interval(2000).pipe(take(6));
     * const timer3 = interval(500).pipe(take(10));
     * const concurrent = 2; // the argument
     * const merged = merge(timer1, timer2, timer3, concurrent);
     * merged.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // - First timer1 and timer2 will run concurrently
     * // - timer1 will emit a value every 1000ms for 10 iterations
     * // - timer2 will emit a value every 2000ms for 6 iterations
     * // - after timer1 hits its max iteration, timer2 will
     * //   continue, and timer3 will start to run concurrently with timer2
     * // - when timer2 hits its max iteration it terminates, and
     * //   timer3 will continue to emit a value every 500ms until it is complete
     * ```
     *
     * @see {@link mergeAll}
     * @see {@link mergeMap}
     * @see {@link mergeMapTo}
     * @see {@link mergeScan}
     *
     * @param {...ObservableInput} observables Input Observables to merge together.
     * @param {number} [concurrent=Infinity] Maximum number of input
     * Observables being subscribed to concurrently.
     * @param {SchedulerLike} [scheduler=null] The {@link SchedulerLike} to use for managing
     * concurrency of input Observables.
     * @return {Observable} an Observable that emits items that are the result of
     * every input Observable.
     * @static true
     * @name merge
     * @owner Observable
     */
    function merge(...observables) {
      let concurrent = Infinity;
      let scheduler = undefined;
      let last = observables[observables.length - 1];
      if (isScheduler_ts_6.isScheduler(last)) {
        scheduler = observables.pop();
        if (
          observables.length > 1 &&
          typeof observables[observables.length - 1] === "number"
        ) {
          concurrent = observables.pop();
        }
      } else if (typeof last === "number") {
        concurrent = observables.pop();
      }
      if (
        !scheduler && observables.length === 1 &&
        observables[0] instanceof Observable_ts_24.Observable
      ) {
        return observables[0];
      }
      return mergeAll_ts_2.mergeAll(concurrent)(
        fromArray_ts_3.fromArray(observables, scheduler),
      );
    }
    exports_100("merge", merge);
    return {
      setters: [
        function (Observable_ts_24_1) {
          Observable_ts_24 = Observable_ts_24_1;
        },
        function (isScheduler_ts_6_1) {
          isScheduler_ts_6 = isScheduler_ts_6_1;
        },
        function (mergeAll_ts_2_1) {
          mergeAll_ts_2 = mergeAll_ts_2_1;
        },
        function (fromArray_ts_3_1) {
          fromArray_ts_3 = fromArray_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/never",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/util/noop",
  ],
  function (exports_101, context_101) {
    "use strict";
    var Observable_ts_25, noop_ts_1, NEVER;
    var __moduleName = context_101 && context_101.id;
    /**
     * @deprecated Deprecated in favor of using {@link NEVER} constant.
     */
    function never() {
      return NEVER;
    }
    exports_101("never", never);
    return {
      setters: [
        function (Observable_ts_25_1) {
          Observable_ts_25 = Observable_ts_25_1;
        },
        function (noop_ts_1_1) {
          noop_ts_1 = noop_ts_1_1;
        },
      ],
      execute: function () {
        /**
             * An Observable that emits no items to the Observer and never completes.
             *
             * ![](never.png)
             *
             * A simple Observable that emits neither values nor errors nor the completion
             * notification. It can be used for testing purposes or for composing with other
             * Observables. Please note that by never emitting a complete notification, this
             * Observable keeps the subscription from being disposed automatically.
             * Subscriptions need to be manually disposed.
             *
             * ##  Example
             * ### Emit the number 7, then never emit anything else (not even complete)
             * ```ts
             * import { NEVER } from 'rxjs.ts';
             * import { startWith } from 'rxjs/operators.ts';
             *
             * function info() {
             *   console.log('Will not be called');
             * }
             * const result = NEVER.pipe(startWith(7));
             * result.subscribe(x => console.log(x), info, info);
             *
             * ```
             *
             * @see {@link Observable}
             * @see {@link index/EMPTY}
             * @see {@link of}
             * @see {@link throwError}
             */
        exports_101(
          "NEVER",
          NEVER = new Observable_ts_25.Observable(noop_ts_1.noop),
        );
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/onErrorResumeNext",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/observable/from",
    "https://deno.land/x/rxjs/src/internal/util/isArray",
    "https://deno.land/x/rxjs/src/internal/observable/empty",
  ],
  function (exports_102, context_102) {
    "use strict";
    var Observable_ts_26, from_ts_4, isArray_ts_9, empty_ts_4;
    var __moduleName = context_102 && context_102.id;
    /* tslint:enable:max-line-length */
    /**
     * When any of the provided Observable emits an complete or error notification, it immediately subscribes to the next one
     * that was passed.
     *
     * <span class="informal">Execute series of Observables no matter what, even if it means swallowing errors.</span>
     *
     * ![](onErrorResumeNext.png)
     *
     * `onErrorResumeNext` Will subscribe to each observable source it is provided, in order.
     * If the source it's subscribed to emits an error or completes, it will move to the next source
     * without error.
     *
     * If `onErrorResumeNext` is provided no arguments, or a single, empty array, it will return {@link index/EMPTY}.
     *
     * `onErrorResumeNext` is basically {@link concat}, only it will continue, even if one of its
     * sources emits an error.
     *
     * Note that there is no way to handle any errors thrown by sources via the result of
     * `onErrorResumeNext`. If you want to handle errors thrown in any given source, you can
     * always use the {@link catchError} operator on them before passing them into `onErrorResumeNext`.
     *
     * ## Example
     * Subscribe to the next Observable after map fails</caption>
     * ```ts
     * import { onErrorResumeNext, of } from 'rxjs.ts';
     * import { map } from 'rxjs/operators.ts';
     *
     * onErrorResumeNext(
     *  of(1, 2, 3, 0).pipe(
     *    map(x => {
     *      if (x === 0) throw Error();
     *      return 10 / x;
     *    })
     *  ),
     *  of(1, 2, 3),
     * )
     * .subscribe(
     *   val => console.log(val),
     *   err => console.log(err),          // Will never be called.
     *   () => console.log('done'),
     * );
     *
     * // Logs:
     * // 10
     * // 5
     * // 3.3333333333333335
     * // 1
     * // 2
     * // 3
     * // "done"
     * ```
     *
     * @see {@link concat}
     * @see {@link catchError}
     *
     * @param {...ObservableInput} sources Observables (or anything that *is* observable) passed either directly or as an array.
     * @return {Observable} An Observable that concatenates all sources, one after the other,
     * ignoring all errors, such that any error causes it to move on to the next source.
     */
    function onErrorResumeNext(...sources) {
      if (sources.length === 0) {
        return empty_ts_4.EMPTY;
      }
      const [first, ...remainder] = sources;
      if (sources.length === 1 && isArray_ts_9.isArray(first)) {
        return onErrorResumeNext(...first);
      }
      return new Observable_ts_26.Observable((subscriber) => {
        const subNext = () =>
          subscriber.add(onErrorResumeNext(...remainder).subscribe(subscriber));
        return from_ts_4.from(first).subscribe({
          next(value) {
            subscriber.next(value);
          },
          error: subNext,
          complete: subNext,
        });
      });
    }
    exports_102("onErrorResumeNext", onErrorResumeNext);
    return {
      setters: [
        function (Observable_ts_26_1) {
          Observable_ts_26 = Observable_ts_26_1;
        },
        function (from_ts_4_1) {
          from_ts_4 = from_ts_4_1;
        },
        function (isArray_ts_9_1) {
          isArray_ts_9 = isArray_ts_9_1;
        },
        function (empty_ts_4_1) {
          empty_ts_4 = empty_ts_4_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/pairs",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/Subscription",
  ],
  function (exports_103, context_103) {
    "use strict";
    var Observable_ts_27, Subscription_ts_15;
    var __moduleName = context_103 && context_103.id;
    /**
     * Convert an object into an Observable of `[key, value]` pairs.
     *
     * <span class="informal">Turn entries of an object into a stream.</span>
     *
     * ![](pairs.png)
     *
     * `pairs` takes an arbitrary object and returns an Observable that emits arrays. Each
     * emitted array has exactly two elements - the first is a key from the object
     * and the second is a value corresponding to that key. Keys are extracted from
     * an object via `Object.keys` function, which means that they will be only
     * enumerable keys that are present on an object directly - not ones inherited
     * via prototype chain.
     *
     * By default these arrays are emitted synchronously. To change that you can
     * pass a {@link SchedulerLike} as a second argument to `pairs`.
     *
     * ## Example
     * ### Converts an object to an Observable
     * ```ts
     * import { pairs } from 'rxjs.ts';
     *
     * const obj = {
     *   foo: 42,
     *   bar: 56,
     *   baz: 78
     * };
     *
     * pairs(obj).subscribe({
     *   next: value => console.log(value),
     *   complete: () => console.log('Complete!')
     * });
     *
     * // Logs:
     * // ["foo", 42],
     * // ["bar", 56],
     * // ["baz", 78],
     * // "Complete!"
     * ```
     *
     * @param {Object} obj The object to inspect and turn into an
     * Observable sequence.
     * @param {Scheduler} [scheduler] An optional IScheduler to schedule
     * when resulting Observable will emit values.
     * @returns {(Observable<Array<string|T>>)} An observable sequence of
     * [key, value] pairs from the object.
     */
    function pairs(obj, scheduler) {
      if (!scheduler) {
        return new Observable_ts_27.Observable((subscriber) => {
          const keys = Object.keys(obj);
          for (let i = 0; i < keys.length && !subscriber.closed; i++) {
            const key = keys[i];
            if (obj.hasOwnProperty(key)) {
              subscriber.next([key, obj[key]]);
            }
          }
          subscriber.complete();
        });
      } else {
        return new Observable_ts_27.Observable((subscriber) => {
          const keys = Object.keys(obj);
          const subscription = new Subscription_ts_15.Subscription();
          subscription.add(
            scheduler.schedule(
              dispatch,
              0,
              { keys, index: 0, subscriber, subscription, obj },
            ),
          );
          return subscription;
        });
      }
    }
    exports_103("pairs", pairs);
    /** @internal */
    function dispatch(state) {
      const { keys, index, subscriber, subscription, obj } = state;
      if (!subscriber.closed) {
        if (index < keys.length) {
          const key = keys[index];
          subscriber.next([key, obj[key]]);
          subscription.add(
            this.schedule(
              { keys, index: index + 1, subscriber, subscription, obj },
            ),
          );
        } else {
          subscriber.complete();
        }
      }
    }
    exports_103("dispatch", dispatch);
    return {
      setters: [
        function (Observable_ts_27_1) {
          Observable_ts_27 = Observable_ts_27_1;
        },
        function (Subscription_ts_15_1) {
          Subscription_ts_15 = Subscription_ts_15_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/not",
  [],
  function (exports_104, context_104) {
    "use strict";
    var __moduleName = context_104 && context_104.id;
    function not(pred, thisArg) {
      function notPred() {
        return !(notPred.pred.apply(notPred.thisArg, arguments));
      }
      notPred.pred = pred;
      notPred.thisArg = thisArg;
      return notPred;
    }
    exports_104("not", not);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/filter",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_105, context_105) {
    "use strict";
    var Subscriber_ts_10, FilterOperator, FilterSubscriber;
    var __moduleName = context_105 && context_105.id;
    /* tslint:enable:max-line-length */
    /**
     * Filter items emitted by the source Observable by only emitting those that
     * satisfy a specified predicate.
     *
     * <span class="informal">Like
     * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
     * it only emits a value from the source if it passes a criterion function.</span>
     *
     * ![](filter.png)
     *
     * Similar to the well-known `Array.prototype.filter` method, this operator
     * takes values from the source Observable, passes them through a `predicate`
     * function and only emits those values that yielded `true`.
     *
     * ## Example
     * Emit only click events whose target was a DIV element
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { filter } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const clicksOnDivs = clicks.pipe(filter(ev => ev.target.tagName === 'DIV'));
     * clicksOnDivs.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link distinct}
     * @see {@link distinctUntilChanged}
     * @see {@link distinctUntilKeyChanged}
     * @see {@link ignoreElements}
     * @see {@link partition}
     * @see {@link skip}
     *
     * @param predicate A function that
     * evaluates each value emitted by the source Observable. If it returns `true`,
     * the value is emitted, if `false` the value is not passed to the output
     * Observable. The `index` parameter is the number `i` for the i-th source
     * emission that has happened since the subscription, starting from the number
     * `0`.
     * @param thisArg An optional argument to determine the value of `this`
     * in the `predicate` function.
     */
    function filter(predicate, thisArg) {
      return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
      };
    }
    exports_105("filter", filter);
    return {
      setters: [
        function (Subscriber_ts_10_1) {
          Subscriber_ts_10 = Subscriber_ts_10_1;
        },
      ],
      execute: function () {
        FilterOperator = class FilterOperator {
          constructor(predicate, thisArg) {
            this.predicate = predicate;
            this.thisArg = thisArg;
          }
          call(subscriber, source) {
            return source.subscribe(
              new FilterSubscriber(subscriber, this.predicate, this.thisArg),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        FilterSubscriber = class FilterSubscriber
          extends Subscriber_ts_10.Subscriber {
          constructor(destination, predicate, thisArg) {
            super(destination);
            this.predicate = predicate;
            this.thisArg = thisArg;
            this.count = 0;
          }
          // the try catch block below is left specifically for
          // optimization and perf reasons. a tryCatcher is not necessary here.
          _next(value) {
            let result;
            try {
              result = this.predicate.call(this.thisArg, value, this.count++);
            } catch (err) {
              this.destination.error(err);
              return;
            }
            if (result) {
              this.destination.next(value);
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/partition",
  [
    "https://deno.land/x/rxjs/src/internal/util/not",
    "https://deno.land/x/rxjs/src/internal/util/subscribeTo",
    "https://deno.land/x/rxjs/src/internal/operators/filter",
    "https://deno.land/x/rxjs/src/internal/Observable",
  ],
  function (exports_106, context_106) {
    "use strict";
    var not_ts_1, subscribeTo_ts_3, filter_ts_1, Observable_ts_28;
    var __moduleName = context_106 && context_106.id;
    /**
     * Splits the source Observable into two, one with values that satisfy a
     * predicate, and another with values that don't satisfy the predicate.
     *
     * <span class="informal">It's like {@link filter}, but returns two Observables:
     * one like the output of {@link filter}, and the other with values that did not
     * pass the condition.</span>
     *
     * ![](partition.png)
     *
     * `partition` outputs an array with two Observables that partition the values
     * from the source Observable through the given `predicate` function. The first
     * Observable in that array emits source values for which the predicate argument
     * returns true. The second Observable emits source values for which the
     * predicate returns false. The first behaves like {@link filter} and the second
     * behaves like {@link filter} with the predicate negated.
     *
     * ## Example
     * Partition a set of numbers into odds and evens observables
     * ```ts
     * import { of, partition } from 'rxjs.ts';
     *
     * const observableValues = of(1, 2, 3, 4, 5, 6);
     * const [evens$, odds$] = partition(observableValues, (value, index) => value % 2 === 0);
     *
     * odds$.subscribe(x => console.log('odds', x));
     * evens$.subscribe(x => console.log('evens', x));
     *
     * // Logs:
     * // odds 1
     * // odds 3
     * // odds 5
     * // evens 2
     * // evens 4
     * // evens 6
     * ```
     *
     * @see {@link filter}
     *
     * @param {function(value: T, index: number): boolean} predicate A function that
     * evaluates each value emitted by the source Observable. If it returns `true`,
     * the value is emitted on the first Observable in the returned array, if
     * `false` the value is emitted on the second Observable in the array. The
     * `index` parameter is the number `i` for the i-th source emission that has
     * happened since the subscription, starting from the number `0`.
     * @param {any} [thisArg] An optional argument to determine the value of `this`
     * in the `predicate` function.
     * @return {[Observable<T>, Observable<T>]} An array with two Observables: one
     * with values that passed the predicate, and another with values that did not
     * pass the predicate.
     */
    function partition(source, predicate, thisArg) {
      return [
        filter_ts_1.filter(predicate, thisArg)(
          new Observable_ts_28.Observable(subscribeTo_ts_3.subscribeTo(source)),
        ),
        filter_ts_1.filter(not_ts_1.not(predicate, thisArg))(
          new Observable_ts_28.Observable(subscribeTo_ts_3.subscribeTo(source)),
        ),
      ];
    }
    exports_106("partition", partition);
    return {
      setters: [
        function (not_ts_1_1) {
          not_ts_1 = not_ts_1_1;
        },
        function (subscribeTo_ts_3_1) {
          subscribeTo_ts_3 = subscribeTo_ts_3_1;
        },
        function (filter_ts_1_1) {
          filter_ts_1 = filter_ts_1_1;
        },
        function (Observable_ts_28_1) {
          Observable_ts_28 = Observable_ts_28_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/race",
  [
    "https://deno.land/x/rxjs/src/internal/util/isArray",
    "https://deno.land/x/rxjs/src/internal/observable/from",
    "https://deno.land/x/rxjs/src/internal/observable/fromArray",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_107, context_107) {
    "use strict";
    var isArray_ts_10,
      from_ts_5,
      fromArray_ts_4,
      OuterSubscriber_ts_3,
      subscribeToResult_ts_3,
      RaceOperator,
      RaceSubscriber;
    var __moduleName = context_107 && context_107.id;
    /**
     * Returns an observable that mirrors the first source observable to emit an item.
     *
     * ![](race.png)
     *
     * `race` returns an observable, that when subscribed to, subscribes to all source observables immediately.
     * As soon as one of the source observables emits a value, the result unsubscribes from the other sources.
     * The resulting observable will forward all notifications, including error and completion, from the "winning"
     * source observable.
     *
     * If one of the used source observable throws an errors before a first notification
     * the race operator will also throw an error, no matter if another source observable
     * could potentially win the race.
     *
     * `race` can be useful for selecting the response from the fastest network connection for
     * HTTP or WebSockets. `race` can also be useful for switching observable context based on user
     * input.
     *
     * ## Example
     * ### Subscribes to the observable that was the first to start emitting.
     *
     * ```ts
     * import { race, interval } from 'rxjs.ts';
     * import { mapTo } from 'rxjs/operators.ts';
     *
     * const obs1 = interval(1000).pipe(mapTo('fast one'));
     * const obs2 = interval(3000).pipe(mapTo('medium one'));
     * const obs3 = interval(5000).pipe(mapTo('slow one'));
     *
     * race(obs3, obs1, obs2)
     * .subscribe(
     *   winner => console.log(winner)
     * );
     *
     * // Outputs
     * // a series of 'fast one'
     * ```
     *
     * @param {...Observables} ...observables sources used to race for which Observable emits first.
     * @return {Observable} an Observable that mirrors the output of the first Observable to emit an item.
     */
    function race(...observables) {
      // if the only argument is an array, it was most likely called with
      // `race([obs1, obs2, ...])`
      if (observables.length === 1) {
        if (isArray_ts_10.isArray(observables[0])) {
          observables = observables[0];
        } else {
          return from_ts_5.from(observables[0]);
        }
      }
      return fromArray_ts_4.fromArray(observables, undefined).lift(
        new RaceOperator(),
      );
    }
    exports_107("race", race);
    return {
      setters: [
        function (isArray_ts_10_1) {
          isArray_ts_10 = isArray_ts_10_1;
        },
        function (from_ts_5_1) {
          from_ts_5 = from_ts_5_1;
        },
        function (fromArray_ts_4_1) {
          fromArray_ts_4 = fromArray_ts_4_1;
        },
        function (OuterSubscriber_ts_3_1) {
          OuterSubscriber_ts_3 = OuterSubscriber_ts_3_1;
        },
        function (subscribeToResult_ts_3_1) {
          subscribeToResult_ts_3 = subscribeToResult_ts_3_1;
        },
      ],
      execute: function () {
        RaceOperator = class RaceOperator {
          call(subscriber, source) {
            return source.subscribe(new RaceSubscriber(subscriber));
          }
        };
        exports_107("RaceOperator", RaceOperator);
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        RaceSubscriber = class RaceSubscriber
          extends OuterSubscriber_ts_3.OuterSubscriber {
          constructor(destination) {
            super(destination);
            this.hasFirst = false;
            this.observables = [];
            this.subscriptions = [];
          }
          _next(observable) {
            this.observables.push(observable);
          }
          _complete() {
            const observables = this.observables;
            const len = observables.length;
            if (len === 0) {
              this.destination.complete();
            } else {
              for (let i = 0; i < len && !this.hasFirst; i++) {
                let observable = observables[i];
                let subscription = subscribeToResult_ts_3.subscribeToResult(
                  this,
                  observable,
                  observable,
                  i,
                );
                if (this.subscriptions) {
                  this.subscriptions.push(subscription);
                }
                this.add(subscription);
              }
              this.observables = null;
            }
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            if (!this.hasFirst) {
              this.hasFirst = true;
              for (let i = 0; i < this.subscriptions.length; i++) {
                if (i !== outerIndex) {
                  let subscription = this.subscriptions[i];
                  subscription.unsubscribe();
                  this.remove(subscription);
                }
              }
              this.subscriptions = null;
            }
            this.destination.next(innerValue);
          }
          notifyComplete(innerSub) {
            this.hasFirst = true;
            super.notifyComplete(innerSub);
          }
          notifyError(error, innerSub) {
            this.hasFirst = true;
            super.notifyError(error, innerSub);
          }
        };
        exports_107("RaceSubscriber", RaceSubscriber);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/range",
  ["https://deno.land/x/rxjs/src/internal/Observable"],
  function (exports_108, context_108) {
    "use strict";
    var Observable_ts_29;
    var __moduleName = context_108 && context_108.id;
    /**
     * Creates an Observable that emits a sequence of numbers within a specified
     * range.
     *
     * <span class="informal">Emits a sequence of numbers in a range.</span>
     *
     * ![](range.png)
     *
     * `range` operator emits a range of sequential integers, in order, where you
     * select the `start` of the range and its `length`. By default, uses no
     * {@link SchedulerLike} and just delivers the notifications synchronously, but may use
     * an optional {@link SchedulerLike} to regulate those deliveries.
     *
     * ## Example
     *
     * ### Produce a range of numbers
     *
     * ```ts
     * import { range } from 'rxjs.ts';
     *
     * const numbers = range(1, 3);
     *
     * numbers.subscribe({
     *  next: value => { console.log(value) },
     *  complete: () => { console.log('Complete!') }
     * });
     *
     * // Logs:
     * // 1
     * // 2
     * // 3
     * // "Complete!"
     * ```
     *
     * @see {@link timer}
     * @see {@link index/interval}
     *
     * @param {number} [start=0] The value of the first integer in the sequence.
     * @param {number} count The number of sequential integers to generate.
     * @param {SchedulerLike} [scheduler] A {@link SchedulerLike} to use for scheduling
     * the emissions of the notifications.
     * @return {Observable} An Observable of numbers that emits a finite range of
     * sequential integers.
     * @static true
     * @name range
     * @owner Observable
     */
    function range(start = 0, count, scheduler) {
      return new Observable_ts_29.Observable((subscriber) => {
        if (count === undefined) {
          count = start;
          start = 0;
        }
        let index = 0;
        let current = start;
        if (scheduler) {
          return scheduler.schedule(dispatch, 0, {
            index,
            count,
            start,
            subscriber,
          });
        } else {
          do {
            if (index++ >= count) {
              subscriber.complete();
              break;
            }
            subscriber.next(current++);
            if (subscriber.closed) {
              break;
            }
          } while (true);
        }
        return undefined;
      });
    }
    exports_108("range", range);
    /** @internal */
    function dispatch(state) {
      const { start, index, count, subscriber } = state;
      if (index >= count) {
        subscriber.complete();
        return;
      }
      subscriber.next(start);
      if (subscriber.closed) {
        return;
      }
      state.index = index + 1;
      state.start = start + 1;
      this.schedule(state);
    }
    exports_108("dispatch", dispatch);
    return {
      setters: [
        function (Observable_ts_29_1) {
          Observable_ts_29 = Observable_ts_29_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/timer",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/scheduler/async",
    "https://deno.land/x/rxjs/src/internal/util/isNumeric",
    "https://deno.land/x/rxjs/src/internal/util/isScheduler",
  ],
  function (exports_109, context_109) {
    "use strict";
    var Observable_ts_30, async_ts_2, isNumeric_ts_2, isScheduler_ts_7;
    var __moduleName = context_109 && context_109.id;
    /**
     * Creates an Observable that starts emitting after an `dueTime` and
     * emits ever increasing numbers after each `period` of time thereafter.
     *
     * <span class="informal">Its like {@link index/interval}, but you can specify when
     * should the emissions start.</span>
     *
     * ![](timer.png)
     *
     * `timer` returns an Observable that emits an infinite sequence of ascending
     * integers, with a constant interval of time, `period` of your choosing
     * between those emissions. The first emission happens after the specified
     * `dueTime`. The initial delay may be a `Date`. By default, this
     * operator uses the {@link asyncScheduler} {@link SchedulerLike} to provide a notion of time, but you
     * may pass any {@link SchedulerLike} to it. If `period` is not specified, the output
     * Observable emits only one value, `0`. Otherwise, it emits an infinite
     * sequence.
     *
     * ## Examples
     * ### Emits ascending numbers, one every second (1000ms), starting after 3 seconds
     * ```ts
     * import { timer } from 'rxjs.ts';
     *
     * const numbers = timer(3000, 1000);
     * numbers.subscribe(x => console.log(x));
     * ```
     *
     * ### Emits one number after five seconds
     * ```ts
     * import { timer } from 'rxjs.ts';
     *
     * const numbers = timer(5000);
     * numbers.subscribe(x => console.log(x));
     * ```
     * @see {@link index/interval}
     * @see {@link delay}
     *
     * @param {number|Date} [dueTime] The initial delay time specified as a Date object or as an integer denoting
     * milliseconds to wait before emitting the first value of `0`.
     * @param {number|SchedulerLike} [periodOrScheduler] The period of time between emissions of the
     * subsequent numbers.
     * @param {SchedulerLike} [scheduler=async] The {@link SchedulerLike} to use for scheduling
     * the emission of values, and providing a notion of "time".
     * @return {Observable} An Observable that emits a `0` after the
     * `dueTime` and ever increasing numbers after each `period` of time
     * thereafter.
     * @static true
     * @name timer
     * @owner Observable
     */
    function timer(dueTime = 0, periodOrScheduler, scheduler) {
      let period = -1;
      if (isNumeric_ts_2.isNumeric(periodOrScheduler)) {
        period = Number(periodOrScheduler) < 1 && 1 ||
          Number(periodOrScheduler);
      } else if (isScheduler_ts_7.isScheduler(periodOrScheduler)) {
        scheduler = periodOrScheduler;
      }
      if (!isScheduler_ts_7.isScheduler(scheduler)) {
        scheduler = async_ts_2.async;
      }
      return new Observable_ts_30.Observable((subscriber) => {
        const due = isNumeric_ts_2.isNumeric(dueTime)
          ? dueTime
          : (+dueTime - scheduler.now());
        return scheduler.schedule(dispatch, due, {
          index: 0,
          period,
          subscriber,
        });
      });
    }
    exports_109("timer", timer);
    function dispatch(state) {
      const { index, period, subscriber } = state;
      subscriber.next(index);
      if (subscriber.closed) {
        return;
      } else if (period === -1) {
        return subscriber.complete();
      }
      state.index = index + 1;
      this.schedule(state, period);
    }
    return {
      setters: [
        function (Observable_ts_30_1) {
          Observable_ts_30 = Observable_ts_30_1;
        },
        function (async_ts_2_1) {
          async_ts_2 = async_ts_2_1;
        },
        function (isNumeric_ts_2_1) {
          isNumeric_ts_2 = isNumeric_ts_2_1;
        },
        function (isScheduler_ts_7_1) {
          isScheduler_ts_7 = isScheduler_ts_7_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/using",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/observable/from",
    "https://deno.land/x/rxjs/src/internal/observable/empty",
  ],
  function (exports_110, context_110) {
    "use strict";
    var Observable_ts_31, from_ts_6, empty_ts_5;
    var __moduleName = context_110 && context_110.id;
    /**
     * Creates an Observable that uses a resource which will be disposed at the same time as the Observable.
     *
     * <span class="informal">Use it when you catch yourself cleaning up after an Observable.</span>
     *
     * `using` is a factory operator, which accepts two functions. First function returns a disposable resource.
     * It can be an arbitrary object that implements `unsubscribe` method. Second function will be injected with
     * that object and should return an Observable. That Observable can use resource object during its execution.
     * Both functions passed to `using` will be called every time someone subscribes - neither an Observable nor
     * resource object will be shared in any way between subscriptions.
     *
     * When Observable returned by `using` is subscribed, Observable returned from the second function will be subscribed
     * as well. All its notifications (nexted values, completion and error events) will be emitted unchanged by the output
     * Observable. If however someone unsubscribes from the Observable or source Observable completes or errors by itself,
     * the `unsubscribe` method on resource object will be called. This can be used to do any necessary clean up, which
     * otherwise would have to be handled by hand. Note that complete or error notifications are not emitted when someone
     * cancels subscription to an Observable via `unsubscribe`, so `using` can be used as a hook, allowing you to make
     * sure that all resources which need to exist during an Observable execution will be disposed at appropriate time.
     *
     * @see {@link defer}
     *
     * @param {function(): ISubscription} resourceFactory A function which creates any resource object
     * that implements `unsubscribe` method.
     * @param {function(resource: ISubscription): Observable<T>} observableFactory A function which
     * creates an Observable, that can use injected resource object.
     * @return {Observable<T>} An Observable that behaves the same as Observable returned by `observableFactory`, but
     * which - when completed, errored or unsubscribed - will also call `unsubscribe` on created resource object.
     */
    function using(resourceFactory, observableFactory) {
      return new Observable_ts_31.Observable((subscriber) => {
        let resource;
        try {
          resource = resourceFactory();
        } catch (err) {
          subscriber.error(err);
          return undefined;
        }
        let result;
        try {
          result = observableFactory(resource);
        } catch (err) {
          subscriber.error(err);
          return undefined;
        }
        const source = result ? from_ts_6.from(result) : empty_ts_5.EMPTY;
        const subscription = source.subscribe(subscriber);
        return () => {
          subscription.unsubscribe();
          if (resource) {
            resource.unsubscribe();
          }
        };
      });
    }
    exports_110("using", using);
    return {
      setters: [
        function (Observable_ts_31_1) {
          Observable_ts_31 = Observable_ts_31_1;
        },
        function (from_ts_6_1) {
          from_ts_6 = from_ts_6_1;
        },
        function (empty_ts_5_1) {
          empty_ts_5 = empty_ts_5_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/zip",
  [
    "https://deno.land/x/rxjs/src/internal/observable/fromArray",
    "https://deno.land/x/rxjs/src/internal/util/isArray",
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
    "https://deno.land/x/rxjs/src/internal/symbol/iterator",
  ],
  function (exports_111, context_111) {
    "use strict";
    var fromArray_ts_5,
      isArray_ts_11,
      Subscriber_ts_11,
      OuterSubscriber_ts_4,
      subscribeToResult_ts_4,
      iterator_ts_5,
      ZipOperator,
      ZipSubscriber,
      StaticIterator,
      StaticArrayIterator,
      ZipBufferIterator;
    var __moduleName = context_111 && context_111.id;
    /* tslint:enable:max-line-length */
    /**
     * Combines multiple Observables to create an Observable whose values are calculated from the values, in order, of each
     * of its input Observables.
     *
     * If the last parameter is a function, this function is used to compute the created value from the input values.
     * Otherwise, an array of the input values is returned.
     *
     * ## Example
     *
     * Combine age and name from different sources
     *
     * ```ts
     * import { zip, of } from 'rxjs.ts';
     * import { map } from 'rxjs/operators.ts';
     *
     * let age$ = of(27, 25, 29);
     * let name$ = of('Foo', 'Bar', 'Beer');
     * let isDev$ = of(true, true, false);
     *
     * zip(age$, name$, isDev$).pipe(
     *   map(([age, name, isDev]) => ({ age, name, isDev }))
     * )
     * .subscribe(x => console.log(x));
     *
     * // Outputs
     * // { age: 27, name: 'Foo', isDev: true }
     * // { age: 25, name: 'Bar', isDev: true }
     * // { age: 29, name: 'Beer', isDev: false }
     * ```
     * @param observables
     * @return {Observable<R>}
     * @static true
     * @name zip
     * @owner Observable
     */
    function zip(...observables) {
      const last = observables[observables.length - 1];
      let resultSelector = undefined;
      if (typeof last === "function") {
        resultSelector = observables.pop();
      }
      return fromArray_ts_5.fromArray(observables, undefined).lift(
        new ZipOperator(resultSelector),
      );
    }
    exports_111("zip", zip);
    return {
      setters: [
        function (fromArray_ts_5_1) {
          fromArray_ts_5 = fromArray_ts_5_1;
        },
        function (isArray_ts_11_1) {
          isArray_ts_11 = isArray_ts_11_1;
        },
        function (Subscriber_ts_11_1) {
          Subscriber_ts_11 = Subscriber_ts_11_1;
        },
        function (OuterSubscriber_ts_4_1) {
          OuterSubscriber_ts_4 = OuterSubscriber_ts_4_1;
        },
        function (subscribeToResult_ts_4_1) {
          subscribeToResult_ts_4 = subscribeToResult_ts_4_1;
        },
        function (iterator_ts_5_1) {
          iterator_ts_5 = iterator_ts_5_1;
        },
      ],
      execute: function () {
        ZipOperator = class ZipOperator {
          constructor(resultSelector) {
            this.resultSelector = resultSelector;
          }
          call(subscriber, source) {
            return source.subscribe(
              new ZipSubscriber(subscriber, this.resultSelector),
            );
          }
        };
        exports_111("ZipOperator", ZipOperator);
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        ZipSubscriber = class ZipSubscriber
          extends Subscriber_ts_11.Subscriber {
          constructor(
            destination,
            resultSelector,
            values = Object.create(null),
          ) {
            super(destination);
            this.iterators = [];
            this.active = 0;
            this.resultSelector = resultSelector;
            this.values = values;
          }
          _next(value) {
            const iterators = this.iterators;
            if (isArray_ts_11.isArray(value)) {
              iterators.push(new StaticArrayIterator(value));
            } else if (typeof value[iterator_ts_5.iterator] === "function") {
              iterators.push(
                new StaticIterator(value[iterator_ts_5.iterator]()),
              );
            } else {
              iterators.push(
                new ZipBufferIterator(this.destination, this, value),
              );
            }
          }
          _complete() {
            const iterators = this.iterators;
            const len = iterators.length;
            this.unsubscribe();
            if (len === 0) {
              this.destination.complete();
              return;
            }
            this.active = len;
            for (let i = 0; i < len; i++) {
              let iterator = iterators[i];
              if (iterator.stillUnsubscribed) {
                const destination = this.destination;
                destination.add(iterator.subscribe(iterator, i));
              } else {
                this.active--; // not an observable
              }
            }
          }
          notifyInactive() {
            this.active--;
            if (this.active === 0) {
              this.destination.complete();
            }
          }
          checkIterators() {
            const iterators = this.iterators;
            const len = iterators.length;
            const destination = this.destination;
            // abort if not all of them have values
            for (let i = 0; i < len; i++) {
              let iterator = iterators[i];
              if (
                typeof iterator.hasValue === "function" &&
                !iterator.hasValue()
              ) {
                return;
              }
            }
            let shouldComplete = false;
            const args = [];
            for (let i = 0; i < len; i++) {
              let iterator = iterators[i];
              let result = iterator.next();
              // check to see if it's completed now that you've gotten
              // the next value.
              if (iterator.hasCompleted()) {
                shouldComplete = true;
              }
              if (result.done) {
                destination.complete();
                return;
              }
              args.push(result.value);
            }
            if (this.resultSelector) {
              this._tryresultSelector(args);
            } else {
              destination.next(args);
            }
            if (shouldComplete) {
              destination.complete();
            }
          }
          _tryresultSelector(args) {
            let result;
            try {
              result = this.resultSelector.apply(this, args);
            } catch (err) {
              this.destination.error(err);
              return;
            }
            this.destination.next(result);
          }
        };
        exports_111("ZipSubscriber", ZipSubscriber);
        StaticIterator = class StaticIterator {
          constructor(iterator) {
            this.iterator = iterator;
            this.nextResult = iterator.next();
          }
          hasValue() {
            return true;
          }
          next() {
            const result = this.nextResult;
            this.nextResult = this.iterator.next();
            return result;
          }
          hasCompleted() {
            const nextResult = this.nextResult;
            return nextResult && !!nextResult.done;
          }
        };
        StaticArrayIterator = class StaticArrayIterator {
          constructor(array) {
            this.array = array;
            this.index = 0;
            this.length = 0;
            this.length = array.length;
          }
          [iterator_ts_5.iterator]() {
            return this;
          }
          next(value) {
            const i = this.index++;
            const array = this.array;
            return i < this.length ? { value: array[i], done: false }
            : { value: null, done: true };
          }
          hasValue() {
            return this.array.length > this.index;
          }
          hasCompleted() {
            return this.array.length === this.index;
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        ZipBufferIterator = class ZipBufferIterator
          extends OuterSubscriber_ts_4.OuterSubscriber {
          constructor(destination, parent, observable) {
            super(destination);
            this.parent = parent;
            this.observable = observable;
            this.stillUnsubscribed = true;
            this.buffer = [];
            this.isComplete = false;
          }
          [iterator_ts_5.iterator]() {
            return this;
          }
          // NOTE: there is actually a name collision here with Subscriber.next and Iterator.next
          //    this is legit because `next()` will never be called by a subscription in this case.
          next() {
            const buffer = this.buffer;
            if (buffer.length === 0 && this.isComplete) {
              return { value: null, done: true };
            } else {
              return { value: buffer.shift(), done: false };
            }
          }
          hasValue() {
            return this.buffer.length > 0;
          }
          hasCompleted() {
            return this.buffer.length === 0 && this.isComplete;
          }
          notifyComplete() {
            if (this.buffer.length > 0) {
              this.isComplete = true;
              this.parent.notifyInactive();
            } else {
              this.destination.complete();
            }
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.buffer.push(innerValue);
            this.parent.checkIterators();
          }
          subscribe(value, index) {
            return subscribeToResult_ts_4.subscribeToResult(
              this,
              this.observable,
              this,
              index,
            );
          }
        };
      },
    };
  },
);
/**
 *  RxJS - Deno Version 2020

    This product is a modified by DenoBR
    Comunitty for add support for Deno

    This file is modified by DenoBR
 */
System.register(
  "https://deno.land/x/rxjs/mod",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/observable/ConnectableObservable",
    "https://deno.land/x/rxjs/src/internal/operators/groupBy",
    "https://deno.land/x/rxjs/src/internal/symbol/observable",
    "https://deno.land/x/rxjs/src/internal/observable/dom/animationFrames",
    "https://deno.land/x/rxjs/src/internal/Subject",
    "https://deno.land/x/rxjs/src/internal/BehaviorSubject",
    "https://deno.land/x/rxjs/src/internal/ReplaySubject",
    "https://deno.land/x/rxjs/src/internal/AsyncSubject",
    "https://deno.land/x/rxjs/src/internal/scheduler/asap",
    "https://deno.land/x/rxjs/src/internal/scheduler/async",
    "https://deno.land/x/rxjs/src/internal/scheduler/queue",
    "https://deno.land/x/rxjs/src/internal/scheduler/animationFrame",
    "https://deno.land/x/rxjs/src/internal/scheduler/VirtualTimeScheduler",
    "https://deno.land/x/rxjs/src/internal/Scheduler",
    "https://deno.land/x/rxjs/src/internal/Subscription",
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/Notification",
    "https://deno.land/x/rxjs/src/internal/util/pipe",
    "https://deno.land/x/rxjs/src/internal/util/noop",
    "https://deno.land/x/rxjs/src/internal/util/identity",
    "https://deno.land/x/rxjs/src/internal/util/isObservable",
    "https://deno.land/x/rxjs/src/internal/lastValueFrom",
    "https://deno.land/x/rxjs/src/internal/firstValueFrom",
    "https://deno.land/x/rxjs/src/internal/util/ArgumentOutOfRangeError",
    "https://deno.land/x/rxjs/src/internal/util/EmptyError",
    "https://deno.land/x/rxjs/src/internal/util/NotFoundError",
    "https://deno.land/x/rxjs/src/internal/util/ObjectUnsubscribedError",
    "https://deno.land/x/rxjs/src/internal/util/SequenceError",
    "https://deno.land/x/rxjs/src/internal/util/TimeoutError",
    "https://deno.land/x/rxjs/src/internal/util/UnsubscriptionError",
    "https://deno.land/x/rxjs/src/internal/observable/bindCallback",
    "https://deno.land/x/rxjs/src/internal/observable/bindNodeCallback",
    "https://deno.land/x/rxjs/src/internal/observable/combineLatest",
    "https://deno.land/x/rxjs/src/internal/observable/concat",
    "https://deno.land/x/rxjs/src/internal/observable/defer",
    "https://deno.land/x/rxjs/src/internal/observable/empty",
    "https://deno.land/x/rxjs/src/internal/observable/forkJoin",
    "https://deno.land/x/rxjs/src/internal/observable/from",
    "https://deno.land/x/rxjs/src/internal/observable/fromEvent",
    "https://deno.land/x/rxjs/src/internal/observable/fromEventPattern",
    "https://deno.land/x/rxjs/src/internal/observable/generate",
    "https://deno.land/x/rxjs/src/internal/observable/iif",
    "https://deno.land/x/rxjs/src/internal/observable/interval",
    "https://deno.land/x/rxjs/src/internal/observable/merge",
    "https://deno.land/x/rxjs/src/internal/observable/never",
    "https://deno.land/x/rxjs/src/internal/observable/of",
    "https://deno.land/x/rxjs/src/internal/observable/onErrorResumeNext",
    "https://deno.land/x/rxjs/src/internal/observable/pairs",
    "https://deno.land/x/rxjs/src/internal/observable/partition",
    "https://deno.land/x/rxjs/src/internal/observable/race",
    "https://deno.land/x/rxjs/src/internal/observable/range",
    "https://deno.land/x/rxjs/src/internal/observable/throwError",
    "https://deno.land/x/rxjs/src/internal/observable/timer",
    "https://deno.land/x/rxjs/src/internal/observable/using",
    "https://deno.land/x/rxjs/src/internal/observable/zip",
    "https://deno.land/x/rxjs/src/internal/scheduled/scheduled",
    "https://deno.land/x/rxjs/src/internal/types",
    "https://deno.land/x/rxjs/src/internal/config",
  ],
  function (exports_112, context_112) {
    "use strict";
    var __moduleName = context_112 && context_112.id;
    var exportedNames_1 = {
      "Observable": true,
      "ConnectableObservable": true,
      "GroupedObservable": true,
      "observable": true,
      "animationFrames": true,
      "Subject": true,
      "BehaviorSubject": true,
      "ReplaySubject": true,
      "AsyncSubject": true,
      "asapScheduler": true,
      "asyncScheduler": true,
      "queueScheduler": true,
      "animationFrameScheduler": true,
      "VirtualTimeScheduler": true,
      "VirtualAction": true,
      "Scheduler": true,
      "Subscription": true,
      "Subscriber": true,
      "Notification": true,
      "NotificationKind": true,
      "pipe": true,
      "noop": true,
      "identity": true,
      "isObservable": true,
      "lastValueFrom": true,
      "firstValueFrom": true,
      "ArgumentOutOfRangeError": true,
      "EmptyError": true,
      "NotFoundError": true,
      "ObjectUnsubscribedError": true,
      "SequenceError": true,
      "TimeoutError": true,
      "UnsubscriptionError": true,
      "bindCallback": true,
      "bindNodeCallback": true,
      "combineLatest": true,
      "concat": true,
      "defer": true,
      "empty": true,
      "forkJoin": true,
      "from": true,
      "fromEvent": true,
      "fromEventPattern": true,
      "generate": true,
      "iif": true,
      "interval": true,
      "merge": true,
      "never": true,
      "of": true,
      "onErrorResumeNext": true,
      "pairs": true,
      "partition": true,
      "race": true,
      "range": true,
      "throwError": true,
      "timer": true,
      "using": true,
      "zip": true,
      "scheduled": true,
      "EMPTY": true,
      "NEVER": true,
      "config": true,
    };
    function exportStar_1(m) {
      var exports = {};
      for (var n in m) {
        if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) {
          exports[n] = m[n];
        }
      }
      exports_112(exports);
    }
    return {
      setters: [
        function (Observable_ts_32_1) {
          exports_112({
            "Observable": Observable_ts_32_1["Observable"],
          });
        },
        function (ConnectableObservable_ts_1_1) {
          exports_112({
            "ConnectableObservable":
              ConnectableObservable_ts_1_1["ConnectableObservable"],
          });
        },
        function (groupBy_ts_1_1) {
          exports_112({
            "GroupedObservable": groupBy_ts_1_1["GroupedObservable"],
          });
        },
        function (observable_ts_6_1) {
          exports_112({
            "observable": observable_ts_6_1["observable"],
          });
        },
        function (animationFrames_ts_1_1) {
          exports_112({
            "animationFrames": animationFrames_ts_1_1["animationFrames"],
          });
        },
        function (Subject_ts_6_1) {
          exports_112({
            "Subject": Subject_ts_6_1["Subject"],
          });
        },
        function (BehaviorSubject_ts_1_1) {
          exports_112({
            "BehaviorSubject": BehaviorSubject_ts_1_1["BehaviorSubject"],
          });
        },
        function (ReplaySubject_ts_1_1) {
          exports_112({
            "ReplaySubject": ReplaySubject_ts_1_1["ReplaySubject"],
          });
        },
        function (AsyncSubject_ts_3_1) {
          exports_112({
            "AsyncSubject": AsyncSubject_ts_3_1["AsyncSubject"],
          });
        },
        function (asap_ts_1_1) {
          exports_112({
            "asapScheduler": asap_ts_1_1["asap"],
          });
        },
        function (async_ts_3_1) {
          exports_112({
            "asyncScheduler": async_ts_3_1["async"],
          });
        },
        function (queue_ts_1_1) {
          exports_112({
            "queueScheduler": queue_ts_1_1["queue"],
          });
        },
        function (animationFrame_ts_1_1) {
          exports_112({
            "animationFrameScheduler": animationFrame_ts_1_1["animationFrame"],
          });
        },
        function (VirtualTimeScheduler_ts_1_1) {
          exports_112({
            "VirtualTimeScheduler":
              VirtualTimeScheduler_ts_1_1["VirtualTimeScheduler"],
            "VirtualAction": VirtualTimeScheduler_ts_1_1["VirtualAction"],
          });
        },
        function (Scheduler_ts_2_1) {
          exports_112({
            "Scheduler": Scheduler_ts_2_1["Scheduler"],
          });
        },
        function (Subscription_ts_16_1) {
          exports_112({
            "Subscription": Subscription_ts_16_1["Subscription"],
          });
        },
        function (Subscriber_ts_12_1) {
          exports_112({
            "Subscriber": Subscriber_ts_12_1["Subscriber"],
          });
        },
        function (Notification_ts_1_1) {
          exports_112({
            "Notification": Notification_ts_1_1["Notification"],
            "NotificationKind": Notification_ts_1_1["NotificationKind"],
          });
        },
        function (pipe_ts_2_1) {
          exports_112({
            "pipe": pipe_ts_2_1["pipe"],
          });
        },
        function (noop_ts_2_1) {
          exports_112({
            "noop": noop_ts_2_1["noop"],
          });
        },
        function (identity_ts_4_1) {
          exports_112({
            "identity": identity_ts_4_1["identity"],
          });
        },
        function (isObservable_ts_1_1) {
          exports_112({
            "isObservable": isObservable_ts_1_1["isObservable"],
          });
        },
        function (lastValueFrom_ts_1_1) {
          exports_112({
            "lastValueFrom": lastValueFrom_ts_1_1["lastValueFrom"],
          });
        },
        function (firstValueFrom_ts_1_1) {
          exports_112({
            "firstValueFrom": firstValueFrom_ts_1_1["firstValueFrom"],
          });
        },
        function (ArgumentOutOfRangeError_ts_1_1) {
          exports_112({
            "ArgumentOutOfRangeError":
              ArgumentOutOfRangeError_ts_1_1["ArgumentOutOfRangeError"],
          });
        },
        function (EmptyError_ts_3_1) {
          exports_112({
            "EmptyError": EmptyError_ts_3_1["EmptyError"],
          });
        },
        function (NotFoundError_ts_1_1) {
          exports_112({
            "NotFoundError": NotFoundError_ts_1_1["NotFoundError"],
          });
        },
        function (ObjectUnsubscribedError_ts_4_1) {
          exports_112({
            "ObjectUnsubscribedError":
              ObjectUnsubscribedError_ts_4_1["ObjectUnsubscribedError"],
          });
        },
        function (SequenceError_ts_1_1) {
          exports_112({
            "SequenceError": SequenceError_ts_1_1["SequenceError"],
          });
        },
        function (TimeoutError_ts_1_1) {
          exports_112({
            "TimeoutError": TimeoutError_ts_1_1["TimeoutError"],
          });
        },
        function (UnsubscriptionError_ts_2_1) {
          exports_112({
            "UnsubscriptionError":
              UnsubscriptionError_ts_2_1["UnsubscriptionError"],
          });
        },
        function (bindCallback_ts_1_1) {
          exports_112({
            "bindCallback": bindCallback_ts_1_1["bindCallback"],
          });
        },
        function (bindNodeCallback_ts_1_1) {
          exports_112({
            "bindNodeCallback": bindNodeCallback_ts_1_1["bindNodeCallback"],
          });
        },
        function (combineLatest_ts_1_1) {
          exports_112({
            "combineLatest": combineLatest_ts_1_1["combineLatest"],
          });
        },
        function (concat_ts_1_1) {
          exports_112({
            "concat": concat_ts_1_1["concat"],
          });
        },
        function (defer_ts_2_1) {
          exports_112({
            "defer": defer_ts_2_1["defer"],
          });
        },
        function (empty_ts_6_1) {
          exports_112({
            "empty": empty_ts_6_1["empty"],
          });
          exports_112({
            "EMPTY": empty_ts_6_1["EMPTY"],
          });
        },
        function (forkJoin_ts_1_1) {
          exports_112({
            "forkJoin": forkJoin_ts_1_1["forkJoin"],
          });
        },
        function (from_ts_7_1) {
          exports_112({
            "from": from_ts_7_1["from"],
          });
        },
        function (fromEvent_ts_1_1) {
          exports_112({
            "fromEvent": fromEvent_ts_1_1["fromEvent"],
          });
        },
        function (fromEventPattern_ts_1_1) {
          exports_112({
            "fromEventPattern": fromEventPattern_ts_1_1["fromEventPattern"],
          });
        },
        function (generate_ts_1_1) {
          exports_112({
            "generate": generate_ts_1_1["generate"],
          });
        },
        function (iif_ts_1_1) {
          exports_112({
            "iif": iif_ts_1_1["iif"],
          });
        },
        function (interval_ts_1_1) {
          exports_112({
            "interval": interval_ts_1_1["interval"],
          });
        },
        function (merge_ts_1_1) {
          exports_112({
            "merge": merge_ts_1_1["merge"],
          });
        },
        function (never_ts_1_1) {
          exports_112({
            "never": never_ts_1_1["never"],
          });
          exports_112({
            "NEVER": never_ts_1_1["NEVER"],
          });
        },
        function (of_ts_3_1) {
          exports_112({
            "of": of_ts_3_1["of"],
          });
        },
        function (onErrorResumeNext_ts_1_1) {
          exports_112({
            "onErrorResumeNext": onErrorResumeNext_ts_1_1["onErrorResumeNext"],
          });
        },
        function (pairs_ts_1_1) {
          exports_112({
            "pairs": pairs_ts_1_1["pairs"],
          });
        },
        function (partition_ts_1_1) {
          exports_112({
            "partition": partition_ts_1_1["partition"],
          });
        },
        function (race_ts_1_1) {
          exports_112({
            "race": race_ts_1_1["race"],
          });
        },
        function (range_ts_1_1) {
          exports_112({
            "range": range_ts_1_1["range"],
          });
        },
        function (throwError_ts_2_1) {
          exports_112({
            "throwError": throwError_ts_2_1["throwError"],
          });
        },
        function (timer_ts_1_1) {
          exports_112({
            "timer": timer_ts_1_1["timer"],
          });
        },
        function (using_ts_1_1) {
          exports_112({
            "using": using_ts_1_1["using"],
          });
        },
        function (zip_ts_1_1) {
          exports_112({
            "zip": zip_ts_1_1["zip"],
          });
        },
        function (scheduled_ts_2_1) {
          exports_112({
            "scheduled": scheduled_ts_2_1["scheduled"],
          });
        },
        function (types_ts_1_1) {
          exportStar_1(types_ts_1_1);
        },
        function (config_ts_4_1) {
          exports_112({
            "config": config_ts_4_1["config"],
          });
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/audit",
  [
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_113, context_113) {
    "use strict";
    var OuterSubscriber_ts_5,
      subscribeToResult_ts_5,
      AuditOperator,
      AuditSubscriber;
    var __moduleName = context_113 && context_113.id;
    /**
     * Ignores source values for a duration determined by another Observable, then
     * emits the most recent value from the source Observable, then repeats this
     * process.
     *
     * <span class="informal">It's like {@link auditTime}, but the silencing
     * duration is determined by a second Observable.</span>
     *
     * ![](audit.png)
     *
     * `audit` is similar to `throttle`, but emits the last value from the silenced
     * time window, instead of the first value. `audit` emits the most recent value
     * from the source Observable on the output Observable as soon as its internal
     * timer becomes disabled, and ignores source values while the timer is enabled.
     * Initially, the timer is disabled. As soon as the first source value arrives,
     * the timer is enabled by calling the `durationSelector` function with the
     * source value, which returns the "duration" Observable. When the duration
     * Observable emits a value or completes, the timer is disabled, then the most
     * recent source value is emitted on the output Observable, and this process
     * repeats for the next source value.
     *
     * ## Example
     *
     * Emit clicks at a rate of at most one click per second
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { audit } from 'rxjs/operators'
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(audit(ev => interval(1000)));
     * result.subscribe(x => console.log(x));
     * ```
     * @see {@link auditTime}
     * @see {@link debounce}
     * @see {@link delayWhen}
     * @see {@link sample}
     * @see {@link throttle}
     *
     * @param {function(value: T): SubscribableOrPromise} durationSelector A function
     * that receives a value from the source Observable, for computing the silencing
     * duration, returned as an Observable or a Promise.
     * @return {Observable<T>} An Observable that performs rate-limiting of
     * emissions from the source Observable.
     * @name audit
     */
    function audit(durationSelector) {
      return function auditOperatorFunction(source) {
        return source.lift(new AuditOperator(durationSelector));
      };
    }
    exports_113("audit", audit);
    return {
      setters: [
        function (OuterSubscriber_ts_5_1) {
          OuterSubscriber_ts_5 = OuterSubscriber_ts_5_1;
        },
        function (subscribeToResult_ts_5_1) {
          subscribeToResult_ts_5 = subscribeToResult_ts_5_1;
        },
      ],
      execute: function () {
        AuditOperator = class AuditOperator {
          constructor(durationSelector) {
            this.durationSelector = durationSelector;
          }
          call(subscriber, source) {
            return source.subscribe(
              new AuditSubscriber(subscriber, this.durationSelector),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        AuditSubscriber = class AuditSubscriber
          extends OuterSubscriber_ts_5.OuterSubscriber {
          constructor(destination, durationSelector) {
            super(destination);
            this.durationSelector = durationSelector;
            this.value = null;
            this.hasValue = false;
            this.throttled = null;
          }
          _next(value) {
            this.value = value;
            this.hasValue = true;
            if (!this.throttled) {
              let duration;
              try {
                const { durationSelector } = this;
                duration = durationSelector(value);
              } catch (err) {
                return this.destination.error(err);
              }
              const innerSubscription = subscribeToResult_ts_5
                .subscribeToResult(this, duration);
              if (!innerSubscription || innerSubscription.closed) {
                this.clearThrottle();
              } else {
                this.add(this.throttled = innerSubscription);
              }
            }
          }
          clearThrottle() {
            const { value, hasValue, throttled } = this;
            if (throttled) {
              this.remove(throttled);
              this.throttled = null;
              throttled.unsubscribe();
            }
            if (hasValue) {
              this.value = null;
              this.hasValue = false;
              this.destination.next(value);
            }
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
            this.clearThrottle();
          }
          notifyComplete() {
            this.clearThrottle();
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/auditTime",
  [
    "https://deno.land/x/rxjs/src/internal/scheduler/async",
    "https://deno.land/x/rxjs/src/internal/operators/audit",
    "https://deno.land/x/rxjs/src/internal/observable/timer",
  ],
  function (exports_114, context_114) {
    "use strict";
    var async_ts_4, audit_ts_1, timer_ts_2;
    var __moduleName = context_114 && context_114.id;
    /**
     * Ignores source values for `duration` milliseconds, then emits the most recent
     * value from the source Observable, then repeats this process.
     *
     * <span class="informal">When it sees a source value, it ignores that plus
     * the next ones for `duration` milliseconds, and then it emits the most recent
     * value from the source.</span>
     *
     * ![](auditTime.png)
     *
     * `auditTime` is similar to `throttleTime`, but emits the last value from the
     * silenced time window, instead of the first value. `auditTime` emits the most
     * recent value from the source Observable on the output Observable as soon as
     * its internal timer becomes disabled, and ignores source values while the
     * timer is enabled. Initially, the timer is disabled. As soon as the first
     * source value arrives, the timer is enabled. After `duration` milliseconds (or
     * the time unit determined internally by the optional `scheduler`) has passed,
     * the timer is disabled, then the most recent source value is emitted on the
     * output Observable, and this process repeats for the next source value.
     * Optionally takes a {@link SchedulerLike} for managing timers.
     *
     * ## Example
     *
     * Emit clicks at a rate of at most one click per second
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { auditTime } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(auditTime(1000));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link audit}
     * @see {@link debounceTime}
     * @see {@link delay}
     * @see {@link sampleTime}
     * @see {@link throttleTime}
     *
     * @param {number} duration Time to wait before emitting the most recent source
     * value, measured in milliseconds or the time unit determined internally
     * by the optional `scheduler`.
     * @param {SchedulerLike} [scheduler=async] The {@link SchedulerLike} to use for
     * managing the timers that handle the rate-limiting behavior.
     * @return {Observable<T>} An Observable that performs rate-limiting of
     * emissions from the source Observable.
     * @name auditTime
     */
    function auditTime(duration, scheduler = async_ts_4.async) {
      return audit_ts_1.audit(() => timer_ts_2.timer(duration, scheduler));
    }
    exports_114("auditTime", auditTime);
    return {
      setters: [
        function (async_ts_4_1) {
          async_ts_4 = async_ts_4_1;
        },
        function (audit_ts_1_1) {
          audit_ts_1 = audit_ts_1_1;
        },
        function (timer_ts_2_1) {
          timer_ts_2 = timer_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/buffer",
  [
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_115, context_115) {
    "use strict";
    var OuterSubscriber_ts_6,
      subscribeToResult_ts_6,
      BufferOperator,
      BufferSubscriber;
    var __moduleName = context_115 && context_115.id;
    /**
     * Buffers the source Observable values until `closingNotifier` emits.
     *
     * <span class="informal">Collects values from the past as an array, and emits
     * that array only when another Observable emits.</span>
     *
     * ![](buffer.png)
     *
     * Buffers the incoming Observable values until the given `closingNotifier`
     * Observable emits a value, at which point it emits the buffer on the output
     * Observable and starts a new buffer internally, awaiting the next time
     * `closingNotifier` emits.
     *
     * ## Example
     *
     * On every click, emit array of most recent interval events
     *
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { buffer } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const intervalEvents = interval(1000);
     * const buffered = intervalEvents.pipe(buffer(clicks));
     * buffered.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link bufferCount}
     * @see {@link bufferTime}
     * @see {@link bufferToggle}
     * @see {@link bufferWhen}
     * @see {@link window}
     *
     * @param {Observable<any>} closingNotifier An Observable that signals the
     * buffer to be emitted on the output Observable.
     * @return {Observable<T[]>} An Observable of buffers, which are arrays of
     * values.
     * @name buffer
     */
    function buffer(closingNotifier) {
      return function bufferOperatorFunction(source) {
        return source.lift(new BufferOperator(closingNotifier));
      };
    }
    exports_115("buffer", buffer);
    return {
      setters: [
        function (OuterSubscriber_ts_6_1) {
          OuterSubscriber_ts_6 = OuterSubscriber_ts_6_1;
        },
        function (subscribeToResult_ts_6_1) {
          subscribeToResult_ts_6 = subscribeToResult_ts_6_1;
        },
      ],
      execute: function () {
        BufferOperator = class BufferOperator {
          constructor(closingNotifier) {
            this.closingNotifier = closingNotifier;
          }
          call(subscriber, source) {
            return source.subscribe(
              new BufferSubscriber(subscriber, this.closingNotifier),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        BufferSubscriber = class BufferSubscriber
          extends OuterSubscriber_ts_6.OuterSubscriber {
          constructor(destination, closingNotifier) {
            super(destination);
            this.buffer = [];
            this.add(
              subscribeToResult_ts_6.subscribeToResult(this, closingNotifier),
            );
          }
          _next(value) {
            this.buffer.push(value);
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            const buffer = this.buffer;
            this.buffer = [];
            this.destination.next(buffer);
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/bufferCount",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_116, context_116) {
    "use strict";
    var Subscriber_ts_13,
      BufferCountOperator,
      BufferCountSubscriber,
      BufferSkipCountSubscriber;
    var __moduleName = context_116 && context_116.id;
    /**
     * Buffers the source Observable values until the size hits the maximum
     * `bufferSize` given.
     *
     * <span class="informal">Collects values from the past as an array, and emits
     * that array only when its size reaches `bufferSize`.</span>
     *
     * ![](bufferCount.png)
     *
     * Buffers a number of values from the source Observable by `bufferSize` then
     * emits the buffer and clears it, and starts a new buffer each
     * `startBufferEvery` values. If `startBufferEvery` is not provided or is
     * `null`, then new buffers are started immediately at the start of the source
     * and when each buffer closes and is emitted.
     *
     * ## Examples
     *
     * Emit the last two click events as an array
     *
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { bufferCount } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const buffered = clicks.pipe(bufferCount(2));
     * buffered.subscribe(x => console.log(x));
     * ```
     *
     * On every click, emit the last two click events as an array
     *
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { bufferCount } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const buffered = clicks.pipe(bufferCount(2, 1));
     * buffered.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link buffer}
     * @see {@link bufferTime}
     * @see {@link bufferToggle}
     * @see {@link bufferWhen}
     * @see {@link pairwise}
     * @see {@link windowCount}
     *
     * @param {number} bufferSize The maximum size of the buffer emitted.
     * @param {number} [startBufferEvery] Interval at which to start a new buffer.
     * For example if `startBufferEvery` is `2`, then a new buffer will be started
     * on every other value from the source. A new buffer is started at the
     * beginning of the source by default.
     * @return {Observable<T[]>} An Observable of arrays of buffered values.
     * @name bufferCount
     */
    function bufferCount(bufferSize, startBufferEvery = null) {
      return function bufferCountOperatorFunction(source) {
        return source.lift(
          new BufferCountOperator(bufferSize, startBufferEvery),
        );
      };
    }
    exports_116("bufferCount", bufferCount);
    return {
      setters: [
        function (Subscriber_ts_13_1) {
          Subscriber_ts_13 = Subscriber_ts_13_1;
        },
      ],
      execute: function () {
        BufferCountOperator = class BufferCountOperator {
          constructor(bufferSize, startBufferEvery) {
            this.bufferSize = bufferSize;
            this.startBufferEvery = startBufferEvery;
            if (!startBufferEvery || bufferSize === startBufferEvery) {
              this.subscriberClass = BufferCountSubscriber;
            } else {
              this.subscriberClass = BufferSkipCountSubscriber;
            }
          }
          call(subscriber, source) {
            return source.subscribe(
              new this.subscriberClass(
                subscriber,
                this.bufferSize,
                this.startBufferEvery,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        BufferCountSubscriber = class BufferCountSubscriber
          extends Subscriber_ts_13.Subscriber {
          constructor(destination, bufferSize) {
            super(destination);
            this.bufferSize = bufferSize;
            this.buffer = [];
          }
          _next(value) {
            const buffer = this.buffer;
            buffer.push(value);
            if (buffer.length == this.bufferSize) {
              this.destination.next(buffer);
              this.buffer = [];
            }
          }
          _complete() {
            const buffer = this.buffer;
            if (buffer.length > 0) {
              this.destination.next(buffer);
            }
            super._complete();
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        BufferSkipCountSubscriber = class BufferSkipCountSubscriber
          extends Subscriber_ts_13.Subscriber {
          constructor(destination, bufferSize, startBufferEvery) {
            super(destination);
            this.bufferSize = bufferSize;
            this.startBufferEvery = startBufferEvery;
            this.buffers = [];
            this.count = 0;
          }
          _next(value) {
            const { bufferSize, startBufferEvery, buffers, count } = this;
            this.count++;
            if (count % startBufferEvery === 0) {
              buffers.push([]);
            }
            for (let i = buffers.length; i--;) {
              const buffer = buffers[i];
              buffer.push(value);
              if (buffer.length === bufferSize) {
                buffers.splice(i, 1);
                this.destination.next(buffer);
              }
            }
          }
          _complete() {
            const { buffers, destination } = this;
            while (buffers.length > 0) {
              let buffer = buffers.shift();
              if (buffer.length > 0) {
                destination.next(buffer);
              }
            }
            super._complete();
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/bufferTime",
  [
    "https://deno.land/x/rxjs/src/internal/scheduler/async",
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/util/isScheduler",
  ],
  function (exports_117, context_117) {
    "use strict";
    var async_ts_5,
      Subscriber_ts_14,
      isScheduler_ts_8,
      BufferTimeOperator,
      Context,
      BufferTimeSubscriber;
    var __moduleName = context_117 && context_117.id;
    /* tslint:enable:max-line-length */
    /**
     * Buffers the source Observable values for a specific time period.
     *
     * <span class="informal">Collects values from the past as an array, and emits
     * those arrays periodically in time.</span>
     *
     * ![](bufferTime.png)
     *
     * Buffers values from the source for a specific time duration `bufferTimeSpan`.
     * Unless the optional argument `bufferCreationInterval` is given, it emits and
     * resets the buffer every `bufferTimeSpan` milliseconds. If
     * `bufferCreationInterval` is given, this operator opens the buffer every
     * `bufferCreationInterval` milliseconds and closes (emits and resets) the
     * buffer every `bufferTimeSpan` milliseconds. When the optional argument
     * `maxBufferSize` is specified, the buffer will be closed either after
     * `bufferTimeSpan` milliseconds or when it contains `maxBufferSize` elements.
     *
     * ## Examples
     *
     * Every second, emit an array of the recent click events
     *
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { bufferTime } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const buffered = clicks.pipe(bufferTime(1000));
     * buffered.subscribe(x => console.log(x));
     * ```
     *
     * Every 5 seconds, emit the click events from the next 2 seconds
     *
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { bufferTime } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const buffered = clicks.pipe(bufferTime(2000, 5000));
     * buffered.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link buffer}
     * @see {@link bufferCount}
     * @see {@link bufferToggle}
     * @see {@link bufferWhen}
     * @see {@link windowTime}
     *
     * @param {number} bufferTimeSpan The amount of time to fill each buffer array.
     * @param {number} [bufferCreationInterval] The interval at which to start new
     * buffers.
     * @param {number} [maxBufferSize] The maximum buffer size.
     * @param {SchedulerLike} [scheduler=async] The scheduler on which to schedule the
     * intervals that determine buffer boundaries.
     * @return {Observable<T[]>} An observable of arrays of buffered values.
     * @name bufferTime
     */
    function bufferTime(bufferTimeSpan) {
      let length = arguments.length;
      let scheduler = async_ts_5.async;
      if (isScheduler_ts_8.isScheduler(arguments[arguments.length - 1])) {
        scheduler = arguments[arguments.length - 1];
        length--;
      }
      let bufferCreationInterval = null;
      if (length >= 2) {
        bufferCreationInterval = arguments[1];
      }
      let maxBufferSize = Infinity;
      if (length >= 3) {
        maxBufferSize = arguments[2];
      }
      return function bufferTimeOperatorFunction(source) {
        return source.lift(
          new BufferTimeOperator(
            bufferTimeSpan,
            bufferCreationInterval,
            maxBufferSize,
            scheduler,
          ),
        );
      };
    }
    exports_117("bufferTime", bufferTime);
    function dispatchBufferTimeSpanOnly(state) {
      const subscriber = state.subscriber;
      const prevContext = state.context;
      if (prevContext) {
        subscriber.closeContext(prevContext);
      }
      if (!subscriber.closed) {
        state.context = subscriber.openContext();
        state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
      }
    }
    function dispatchBufferCreation(state) {
      const { bufferCreationInterval, bufferTimeSpan, subscriber, scheduler } =
        state;
      const context = subscriber.openContext();
      const action = this;
      if (!subscriber.closed) {
        subscriber.add(
          context.closeAction = scheduler.schedule(
            dispatchBufferClose,
            bufferTimeSpan,
            { subscriber, context },
          ),
        );
        action.schedule(state, bufferCreationInterval);
      }
    }
    function dispatchBufferClose(arg) {
      const { subscriber, context } = arg;
      subscriber.closeContext(context);
    }
    return {
      setters: [
        function (async_ts_5_1) {
          async_ts_5 = async_ts_5_1;
        },
        function (Subscriber_ts_14_1) {
          Subscriber_ts_14 = Subscriber_ts_14_1;
        },
        function (isScheduler_ts_8_1) {
          isScheduler_ts_8 = isScheduler_ts_8_1;
        },
      ],
      execute: function () {
        BufferTimeOperator = class BufferTimeOperator {
          constructor(
            bufferTimeSpan,
            bufferCreationInterval,
            maxBufferSize,
            scheduler,
          ) {
            this.bufferTimeSpan = bufferTimeSpan;
            this.bufferCreationInterval = bufferCreationInterval;
            this.maxBufferSize = maxBufferSize;
            this.scheduler = scheduler;
          }
          call(subscriber, source) {
            return source.subscribe(
              new BufferTimeSubscriber(
                subscriber,
                this.bufferTimeSpan,
                this.bufferCreationInterval,
                this.maxBufferSize,
                this.scheduler,
              ),
            );
          }
        };
        Context = class Context {
          constructor() {
            this.buffer = [];
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        BufferTimeSubscriber = class BufferTimeSubscriber
          extends Subscriber_ts_14.Subscriber {
          constructor(
            destination,
            bufferTimeSpan,
            bufferCreationInterval,
            maxBufferSize,
            scheduler,
          ) {
            super(destination);
            this.bufferTimeSpan = bufferTimeSpan;
            this.bufferCreationInterval = bufferCreationInterval;
            this.maxBufferSize = maxBufferSize;
            this.scheduler = scheduler;
            this.contexts = [];
            const context = this.openContext();
            this.timespanOnly = bufferCreationInterval == null ||
              bufferCreationInterval < 0;
            if (this.timespanOnly) {
              const timeSpanOnlyState = {
                subscriber: this,
                context,
                bufferTimeSpan,
              };
              this.add(
                context.closeAction = scheduler.schedule(
                  dispatchBufferTimeSpanOnly,
                  bufferTimeSpan,
                  timeSpanOnlyState,
                ),
              );
            } else {
              const closeState = { subscriber: this, context };
              const creationState = {
                bufferTimeSpan,
                bufferCreationInterval,
                subscriber: this,
                scheduler,
              };
              this.add(
                context.closeAction = scheduler.schedule(
                  dispatchBufferClose,
                  bufferTimeSpan,
                  closeState,
                ),
              );
              this.add(
                scheduler.schedule(
                  dispatchBufferCreation,
                  bufferCreationInterval,
                  creationState,
                ),
              );
            }
          }
          _next(value) {
            const contexts = this.contexts;
            const len = contexts.length;
            let filledBufferContext;
            for (let i = 0; i < len; i++) {
              const context = contexts[i];
              const buffer = context.buffer;
              buffer.push(value);
              if (buffer.length == this.maxBufferSize) {
                filledBufferContext = context;
              }
            }
            if (filledBufferContext) {
              this.onBufferFull(filledBufferContext);
            }
          }
          _error(err) {
            this.contexts.length = 0;
            super._error(err);
          }
          _complete() {
            const { contexts, destination } = this;
            while (contexts.length > 0) {
              const context = contexts.shift();
              destination.next(context.buffer);
            }
            super._complete();
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _unsubscribe() {
            this.contexts = null;
          }
          onBufferFull(context) {
            this.closeContext(context);
            const closeAction = context.closeAction;
            closeAction.unsubscribe();
            this.remove(closeAction);
            if (!this.closed && this.timespanOnly) {
              context = this.openContext();
              const bufferTimeSpan = this.bufferTimeSpan;
              const timeSpanOnlyState = {
                subscriber: this,
                context,
                bufferTimeSpan,
              };
              this.add(
                context.closeAction = this.scheduler.schedule(
                  dispatchBufferTimeSpanOnly,
                  bufferTimeSpan,
                  timeSpanOnlyState,
                ),
              );
            }
          }
          openContext() {
            const context = new Context();
            this.contexts.push(context);
            return context;
          }
          closeContext(context) {
            this.destination.next(context.buffer);
            const contexts = this.contexts;
            const spliceIndex = contexts ? contexts.indexOf(context) : -1;
            if (spliceIndex >= 0) {
              contexts.splice(contexts.indexOf(context), 1);
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/bufferToggle",
  [
    "https://deno.land/x/rxjs/src/internal/Subscription",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
  ],
  function (exports_118, context_118) {
    "use strict";
    var Subscription_ts_17,
      subscribeToResult_ts_7,
      OuterSubscriber_ts_7,
      BufferToggleOperator,
      BufferToggleSubscriber;
    var __moduleName = context_118 && context_118.id;
    /**
     * Buffers the source Observable values starting from an emission from
     * `openings` and ending when the output of `closingSelector` emits.
     *
     * <span class="informal">Collects values from the past as an array. Starts
     * collecting only when `opening` emits, and calls the `closingSelector`
     * function to get an Observable that tells when to close the buffer.</span>
     *
     * ![](bufferToggle.png)
     *
     * Buffers values from the source by opening the buffer via signals from an
     * Observable provided to `openings`, and closing and sending the buffers when
     * a Subscribable or Promise returned by the `closingSelector` function emits.
     *
     * ## Example
     *
     * Every other second, emit the click events from the next 500ms
     *
     * ```ts
     * import { fromEvent, interval, EMPTY } from 'rxjs.ts';
     * import { bufferToggle } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const openings = interval(1000);
     * const buffered = clicks.pipe(bufferToggle(openings, i =>
     *   i % 2 ? interval(500) : EMPTY
     * ));
     * buffered.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link buffer}
     * @see {@link bufferCount}
     * @see {@link bufferTime}
     * @see {@link bufferWhen}
     * @see {@link windowToggle}
     *
     * @param {SubscribableOrPromise<O>} openings A Subscribable or Promise of notifications to start new
     * buffers.
     * @param {function(value: O): SubscribableOrPromise} closingSelector A function that takes
     * the value emitted by the `openings` observable and returns a Subscribable or Promise,
     * which, when it emits, signals that the associated buffer should be emitted
     * and cleared.
     * @return {Observable<T[]>} An observable of arrays of buffered values.
     * @name bufferToggle
     */
    function bufferToggle(openings, closingSelector) {
      return function bufferToggleOperatorFunction(source) {
        return source.lift(new BufferToggleOperator(openings, closingSelector));
      };
    }
    exports_118("bufferToggle", bufferToggle);
    return {
      setters: [
        function (Subscription_ts_17_1) {
          Subscription_ts_17 = Subscription_ts_17_1;
        },
        function (subscribeToResult_ts_7_1) {
          subscribeToResult_ts_7 = subscribeToResult_ts_7_1;
        },
        function (OuterSubscriber_ts_7_1) {
          OuterSubscriber_ts_7 = OuterSubscriber_ts_7_1;
        },
      ],
      execute: function () {
        BufferToggleOperator = class BufferToggleOperator {
          constructor(openings, closingSelector) {
            this.openings = openings;
            this.closingSelector = closingSelector;
          }
          call(subscriber, source) {
            return source.subscribe(
              new BufferToggleSubscriber(
                subscriber,
                this.openings,
                this.closingSelector,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        BufferToggleSubscriber = class BufferToggleSubscriber
          extends OuterSubscriber_ts_7.OuterSubscriber {
          constructor(destination, openings, closingSelector) {
            super(destination);
            this.openings = openings;
            this.closingSelector = closingSelector;
            this.contexts = [];
            this.add(subscribeToResult_ts_7.subscribeToResult(this, openings));
          }
          _next(value) {
            const contexts = this.contexts;
            const len = contexts.length;
            for (let i = 0; i < len; i++) {
              contexts[i].buffer.push(value);
            }
          }
          _error(err) {
            const contexts = this.contexts;
            while (contexts.length > 0) {
              const context = contexts.shift();
              context.subscription.unsubscribe();
              context.buffer = null;
              context.subscription = null;
            }
            this.contexts = null;
            super._error(err);
          }
          _complete() {
            const contexts = this.contexts;
            while (contexts.length > 0) {
              const context = contexts.shift();
              this.destination.next(context.buffer);
              context.subscription.unsubscribe();
              context.buffer = null;
              context.subscription = null;
            }
            this.contexts = null;
            super._complete();
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            outerValue ? this.closeBuffer(outerValue)
            : this.openBuffer(innerValue);
          }
          notifyComplete(innerSub) {
            this.closeBuffer(innerSub.context);
          }
          openBuffer(value) {
            try {
              const closingSelector = this.closingSelector;
              const closingNotifier = closingSelector.call(this, value);
              if (closingNotifier) {
                this.trySubscribe(closingNotifier);
              }
            } catch (err) {
              this._error(err);
            }
          }
          closeBuffer(context) {
            const contexts = this.contexts;
            if (contexts && context) {
              const { buffer, subscription } = context;
              this.destination.next(buffer);
              contexts.splice(contexts.indexOf(context), 1);
              this.remove(subscription);
              subscription.unsubscribe();
            }
          }
          trySubscribe(closingNotifier) {
            const contexts = this.contexts;
            const buffer = [];
            const subscription = new Subscription_ts_17.Subscription();
            const context = { buffer, subscription };
            contexts.push(context);
            const innerSubscription = subscribeToResult_ts_7.subscribeToResult(
              this,
              closingNotifier,
              context,
            );
            if (!innerSubscription || innerSubscription.closed) {
              this.closeBuffer(context);
            } else {
              innerSubscription.context = context;
              this.add(innerSubscription);
              subscription.add(innerSubscription);
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/bufferWhen",
  [
    "https://deno.land/x/rxjs/src/internal/Subscription",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_119, context_119) {
    "use strict";
    var Subscription_ts_18,
      OuterSubscriber_ts_8,
      subscribeToResult_ts_8,
      BufferWhenOperator,
      BufferWhenSubscriber;
    var __moduleName = context_119 && context_119.id;
    /**
     * Buffers the source Observable values, using a factory function of closing
     * Observables to determine when to close, emit, and reset the buffer.
     *
     * <span class="informal">Collects values from the past as an array. When it
     * starts collecting values, it calls a function that returns an Observable that
     * tells when to close the buffer and restart collecting.</span>
     *
     * ![](bufferWhen.png)
     *
     * Opens a buffer immediately, then closes the buffer when the observable
     * returned by calling `closingSelector` function emits a value. When it closes
     * the buffer, it immediately opens a new buffer and repeats the process.
     *
     * ## Example
     *
     * Emit an array of the last clicks every [1-5] random seconds
     *
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { bufferWhen } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const buffered = clicks.pipe(bufferWhen(() =>
     *   interval(1000 + Math.random() * 4000)
     * ));
     * buffered.subscribe(x => console.log(x));
     * ```
     *
     *
     * @see {@link buffer}
     * @see {@link bufferCount}
     * @see {@link bufferTime}
     * @see {@link bufferToggle}
     * @see {@link windowWhen}
     *
     * @param {function(): Observable} closingSelector A function that takes no
     * arguments and returns an Observable that signals buffer closure.
     * @return {Observable<T[]>} An observable of arrays of buffered values.
     * @name bufferWhen
     */
    function bufferWhen(closingSelector) {
      return function (source) {
        return source.lift(new BufferWhenOperator(closingSelector));
      };
    }
    exports_119("bufferWhen", bufferWhen);
    return {
      setters: [
        function (Subscription_ts_18_1) {
          Subscription_ts_18 = Subscription_ts_18_1;
        },
        function (OuterSubscriber_ts_8_1) {
          OuterSubscriber_ts_8 = OuterSubscriber_ts_8_1;
        },
        function (subscribeToResult_ts_8_1) {
          subscribeToResult_ts_8 = subscribeToResult_ts_8_1;
        },
      ],
      execute: function () {
        BufferWhenOperator = class BufferWhenOperator {
          constructor(closingSelector) {
            this.closingSelector = closingSelector;
          }
          call(subscriber, source) {
            return source.subscribe(
              new BufferWhenSubscriber(subscriber, this.closingSelector),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        BufferWhenSubscriber = class BufferWhenSubscriber
          extends OuterSubscriber_ts_8.OuterSubscriber {
          constructor(destination, closingSelector) {
            super(destination);
            this.closingSelector = closingSelector;
            this.subscribing = false;
            this.openBuffer();
          }
          _next(value) {
            this.buffer.push(value);
          }
          _complete() {
            const buffer = this.buffer;
            if (buffer) {
              this.destination.next(buffer);
            }
            super._complete();
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _unsubscribe() {
            this.buffer = null;
            this.subscribing = false;
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.openBuffer();
          }
          notifyComplete() {
            if (this.subscribing) {
              this.complete();
            } else {
              this.openBuffer();
            }
          }
          openBuffer() {
            let { closingSubscription } = this;
            if (closingSubscription) {
              this.remove(closingSubscription);
              closingSubscription.unsubscribe();
            }
            const buffer = this.buffer;
            if (this.buffer) {
              this.destination.next(buffer);
            }
            this.buffer = [];
            let closingNotifier;
            try {
              const { closingSelector } = this;
              closingNotifier = closingSelector();
            } catch (err) {
              return this.error(err);
            }
            closingSubscription = new Subscription_ts_18.Subscription();
            this.closingSubscription = closingSubscription;
            this.add(closingSubscription);
            this.subscribing = true;
            closingSubscription.add(
              subscribeToResult_ts_8.subscribeToResult(this, closingNotifier),
            );
            this.subscribing = false;
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/catchError",
  [
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/InnerSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_120, context_120) {
    "use strict";
    var OuterSubscriber_ts_9,
      InnerSubscriber_ts_3,
      subscribeToResult_ts_9,
      CatchOperator,
      CatchSubscriber;
    var __moduleName = context_120 && context_120.id;
    /* tslint:enable:max-line-length */
    /**
     * Catches errors on the observable to be handled by returning a new observable or throwing an error.
     *
     * <span class="informal">
     * It only listens to the error channel and ignores notifications.
     * Handles errors from the source observable, and maps them to a new observable.
     * The error may also be rethrown, or a new error can be thrown to emit an error from the result.
     * </span>
     *
     * ![](catch.png)
     *
     * This operator handles errors, but forwards along all other events to the resulting observable.
     * If the source observable terminates with an error, it will map that error to a new observable,
     * subscribe to it, and forward all of its events to the resulting observable.
     *
     * ## Examples
     * Continues with a different Observable when there's an error
     *
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { map, catchError } from 'rxjs/operators.ts';
     *
     * of(1, 2, 3, 4, 5).pipe(
     *     map(n => {
     *   	   if (n === 4) {
     * 	       throw 'four!.ts';
     *       }
     *	     return n;
     *     }),
     *     catchError(err => of('I', 'II', 'III', 'IV', 'V')),
     *   )
     *   .subscribe(x => console.log(x));
     *   // 1, 2, 3, I, II, III, IV, V
     * ```
     *
     * Retries the caught source Observable again in case of error, similar to retry() operator
     *
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { map, catchError, take } from 'rxjs/operators.ts';
     *
     * of(1, 2, 3, 4, 5).pipe(
     *     map(n => {
     *   	   if (n === 4) {
     *   	     throw 'four!.ts';
     *       }
     * 	     return n;
     *     }),
     *     catchError((err, caught) => caught),
     *     take(30),
     *   )
     *   .subscribe(x => console.log(x));
     *   // 1, 2, 3, 1, 2, 3, ...
     * ```
     *
     * Throws a new error when the source Observable throws an error
     *
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { map, catchError } from 'rxjs/operators.ts';
     *
     * of(1, 2, 3, 4, 5).pipe(
     *     map(n => {
     *       if (n === 4) {
     *         throw 'four!.ts';
     *       }
     *       return n;
     *     }),
     *     catchError(err => {
     *       throw 'error in source. Details: ' + err;
     *     }),
     *   )
     *   .subscribe(
     *     x => console.log(x),
     *     err => console.log(err)
     *   );
     *   // 1, 2, 3, error in source. Details: four!
     * ```
     *
     * @see {@link onErrorResumeNext}
     * @see {@link repeat}
     * @see {@link repeatWhen}
     * @see {@link retry }
     * @see {@link retryWhen}
     *
     *  @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
     *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
     *  is returned by the `selector` will be used to continue the observable chain.
     * @return {Observable} An observable that originates from either the source or the observable returned by the
     *  catch `selector` function.
     * @name catchError
     */
    function catchError(selector) {
      return function catchErrorOperatorFunction(source) {
        const operator = new CatchOperator(selector);
        const caught = source.lift(operator);
        return (operator.caught = caught);
      };
    }
    exports_120("catchError", catchError);
    return {
      setters: [
        function (OuterSubscriber_ts_9_1) {
          OuterSubscriber_ts_9 = OuterSubscriber_ts_9_1;
        },
        function (InnerSubscriber_ts_3_1) {
          InnerSubscriber_ts_3 = InnerSubscriber_ts_3_1;
        },
        function (subscribeToResult_ts_9_1) {
          subscribeToResult_ts_9 = subscribeToResult_ts_9_1;
        },
      ],
      execute: function () {
        CatchOperator = class CatchOperator {
          constructor(selector) {
            this.selector = selector;
          }
          call(subscriber, source) {
            return source.subscribe(
              new CatchSubscriber(subscriber, this.selector, this.caught),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        CatchSubscriber = class CatchSubscriber
          extends OuterSubscriber_ts_9.OuterSubscriber {
          constructor(destination, selector, caught) {
            super(destination);
            this.selector = selector;
            this.caught = caught;
          }
          // NOTE: overriding `error` instead of `_error` because we don't want
          // to have this flag this subscriber as `isStopped`. We can mimic the
          // behavior of the RetrySubscriber (from the `retry` operator), where
          // we unsubscribe from our source chain, reset our Subscriber flags,
          // then subscribe to the selector result.
          error(err) {
            if (!this.isStopped) {
              let result;
              try {
                result = this.selector(err, this.caught);
              } catch (err2) {
                super.error(err2);
                return;
              }
              this._unsubscribeAndRecycle();
              const innerSubscriber = new InnerSubscriber_ts_3.InnerSubscriber(
                this,
                undefined,
                undefined,
              );
              this.add(innerSubscriber);
              subscribeToResult_ts_9.subscribeToResult(
                this,
                result,
                undefined,
                undefined,
                innerSubscriber,
              );
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/combineAll",
  ["https://deno.land/x/rxjs/src/internal/observable/combineLatest"],
  function (exports_121, context_121) {
    "use strict";
    var combineLatest_ts_2;
    var __moduleName = context_121 && context_121.id;
    /**
     * Flattens an Observable-of-Observables by applying {@link combineLatest} when the Observable-of-Observables completes.
     *
     * ![](combineAll.png)
     *
     * `combineAll` takes an Observable of Observables, and collects all Observables from it. Once the outer Observable completes,
     * it subscribes to all collected Observables and combines their values using the {@link combineLatest}</a> strategy, such that:
     *
     * * Every time an inner Observable emits, the output Observable emits
     * * When the returned observable emits, it emits all of the latest values by:
     *    * If a `project` function is provided, it is called with each recent value from each inner Observable in whatever order they
     *      arrived, and the result of the `project` function is what is emitted by the output Observable.
     *    * If there is no `project` function, an array of all the most recent values is emitted by the output Observable.
     *
     * ---
     *
     * ## Examples
     *
     * ### Map two click events to a finite interval Observable, then apply `combineAll`
     *
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { map, combineAll, take } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const higherOrder = clicks.pipe(
     *   map(ev =>
     *      interval(Math.random() * 2000).pipe(take(3))
     *   ),
     *   take(2)
     * );
     * const result = higherOrder.pipe(
     *   combineAll()
     * );
     *
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link combineLatest}
     * @see {@link mergeAll}
     *
     * @param {function(...values: Array<any>)} An optional function to map the most recent values from each inner Observable into a new result.
     * Takes each of the most recent values from each collected inner Observable as arguments, in order.
     * @return {Observable<T>}
     * @name combineAll
     */
    function combineAll(project) {
      return (source) =>
        source.lift(new combineLatest_ts_2.CombineLatestOperator(project));
    }
    exports_121("combineAll", combineAll);
    return {
      setters: [
        function (combineLatest_ts_2_1) {
          combineLatest_ts_2 = combineLatest_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/combineLatestWith",
  [
    "https://deno.land/x/rxjs/src/internal/util/isArray",
    "https://deno.land/x/rxjs/src/internal/observable/combineLatest",
    "https://deno.land/x/rxjs/src/internal/observable/from",
  ],
  function (exports_122, context_122) {
    "use strict";
    var isArray_ts_12, combineLatest_ts_3, from_ts_8;
    var __moduleName = context_122 && context_122.id;
    /* tslint:enable:max-line-length */
    /**
     * @deprecated Deprecated, use {@link combineLatestWith} or static {@link combineLatest}
     */
    function combineLatest(...observables) {
      let project = undefined;
      if (typeof observables[observables.length - 1] === "function") {
        project = observables.pop();
      }
      // if the first and only other argument besides the resultSelector is an array
      // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
      if (observables.length === 1 && isArray_ts_12.isArray(observables[0])) {
        observables = observables[0].slice();
      }
      return (source) =>
        source.lift.call(
          from_ts_8.from([source, ...observables]),
          new combineLatest_ts_3.CombineLatestOperator(project),
        );
    }
    exports_122("combineLatest", combineLatest);
    /**
     * Create an observable that combines the latest values from all passed observables and the source
     * into arrays and emits them.
     *
     * Returns an observable, that when subscribed to, will subscribe to the source observable and all
     * sources provided as arguments. Once all sources emit at least one value, all of the latest values
     * will be emitted as an array. After that, every time any source emits a value, all of the latest values
     * will be emitted as an array.
     *
     * This is a useful operator for eagerly calculating values based off of changed inputs.
     *
     * ### Example
     *
     * Simple calculation from two inputs.
     *
     * ```
     * // Setup: Add two inputs to the page
     * const input1 = document.createElement('input');
     * document.body.appendChild(input1);
     * const input2 = document.createElement('input');
     * document.body.appendChild(input2);
     *
     * // Get streams of changes
     * const input1Changes$ = fromEvent(input1, 'change');
     * const input2Changes$ = fromEvent(input2, 'change');
     *
     * // Combine the changes by adding them together
     * input1Changes$.pipe(
     *   combineLatestWith(input2Changes$),
     *   map(([e1, e2]) => Number(e1.target.value) + Number(e2.target.value)),
     * )
     * .subscribe(x => console.log(x));
     *
     * ```
     * @param otherSources the other sources to subscribe to.
     */
    function combineLatestWith(...otherSources) {
      return combineLatest(...otherSources);
    }
    exports_122("combineLatestWith", combineLatestWith);
    return {
      setters: [
        function (isArray_ts_12_1) {
          isArray_ts_12 = isArray_ts_12_1;
        },
        function (combineLatest_ts_3_1) {
          combineLatest_ts_3 = combineLatest_ts_3_1;
        },
        function (from_ts_8_1) {
          from_ts_8 = from_ts_8_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/concat",
  ["https://deno.land/x/rxjs/src/internal/observable/concat"],
  function (exports_123, context_123) {
    "use strict";
    var concat_ts_2;
    var __moduleName = context_123 && context_123.id;
    /* tslint:enable:max-line-length */
    /**
     * @deprecated remove in v8. Use {@link concatWith}
     */
    function concat(...observables) {
      return (source) =>
        source.lift.call(concat_ts_2.concat(source, ...observables), undefined);
    }
    exports_123("concat", concat);
    return {
      setters: [
        function (concat_ts_2_1) {
          concat_ts_2 = concat_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/concatMap",
  ["https://deno.land/x/rxjs/src/internal/operators/mergeMap"],
  function (exports_124, context_124) {
    "use strict";
    var mergeMap_ts_2;
    var __moduleName = context_124 && context_124.id;
    /* tslint:enable:max-line-length */
    /**
     * Projects each source value to an Observable which is merged in the output
     * Observable, in a serialized fashion waiting for each one to complete before
     * merging the next.
     *
     * <span class="informal">Maps each value to an Observable, then flattens all of
     * these inner Observables using {@link concatAll}.</span>
     *
     * ![](concatMap.png)
     *
     * Returns an Observable that emits items based on applying a function that you
     * supply to each item emitted by the source Observable, where that function
     * returns an (so-called "inner") Observable. Each new inner Observable is
     * concatenated with the previous inner Observable.
     *
     * __Warning:__ if source values arrive endlessly and faster than their
     * corresponding inner Observables can complete, it will result in memory issues
     * as inner Observables amass in an unbounded buffer waiting for their turn to
     * be subscribed to.
     *
     * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
     * to `1`.
     *
     * ## Example
     * For each click event, tick every second from 0 to 3, with no concurrency
     *
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { concatMap, take } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(
     *   concatMap(ev => interval(1000).pipe(take(4)))
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // (results are not concurrent)
     * // For every click on the "document" it will emit values 0 to 3 spaced
     * // on a 1000ms interval
     * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
     * ```
     *
     * @see {@link concat}
     * @see {@link concatAll}
     * @see {@link concatMapTo}
     * @see {@link exhaustMap}
     * @see {@link mergeMap}
     * @see {@link switchMap}
     *
     * @param {function(value: T, ?index: number): ObservableInput} project A function
     * that, when applied to an item emitted by the source Observable, returns an
     * Observable.
     * @return {Observable} An Observable that emits the result of applying the
     * projection function (and the optional deprecated `resultSelector`) to each item emitted
     * by the source Observable and taking values from each projected inner
     * Observable sequentially.
     * @name concatMap
     */
    function concatMap(project, resultSelector) {
      if (typeof resultSelector === "function") {
        return mergeMap_ts_2.mergeMap(project, resultSelector, 1);
      }
      return mergeMap_ts_2.mergeMap(project, 1);
    }
    exports_124("concatMap", concatMap);
    return {
      setters: [
        function (mergeMap_ts_2_1) {
          mergeMap_ts_2 = mergeMap_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/concatMapTo",
  ["https://deno.land/x/rxjs/src/internal/operators/concatMap"],
  function (exports_125, context_125) {
    "use strict";
    var concatMap_ts_1;
    var __moduleName = context_125 && context_125.id;
    /* tslint:enable:max-line-length */
    /**
     * Projects each source value to the same Observable which is merged multiple
     * times in a serialized fashion on the output Observable.
     *
     * <span class="informal">It's like {@link concatMap}, but maps each value
     * always to the same inner Observable.</span>
     *
     * ![](concatMapTo.png)
     *
     * Maps each source value to the given Observable `innerObservable` regardless
     * of the source value, and then flattens those resulting Observables into one
     * single Observable, which is the output Observable. Each new `innerObservable`
     * instance emitted on the output Observable is concatenated with the previous
     * `innerObservable` instance.
     *
     * __Warning:__ if source values arrive endlessly and faster than their
     * corresponding inner Observables can complete, it will result in memory issues
     * as inner Observables amass in an unbounded buffer waiting for their turn to
     * be subscribed to.
     *
     * Note: `concatMapTo` is equivalent to `mergeMapTo` with concurrency parameter
     * set to `1`.
     *
     * ## Example
     * For each click event, tick every second from 0 to 3, with no concurrency
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { concatMapTo, take } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(
     *   concatMapTo(interval(1000).pipe(take(4))),
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // (results are not concurrent)
     * // For every click on the "document" it will emit values 0 to 3 spaced
     * // on a 1000ms interval
     * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
     * ```
     *
     * @see {@link concat}
     * @see {@link concatAll}
     * @see {@link concatMap}
     * @see {@link mergeMapTo}
     * @see {@link switchMapTo}
     *
     * @param {ObservableInput} innerObservable An Observable to replace each value from
     * the source Observable.
     * @return {Observable} An observable of values merged together by joining the
     * passed observable with itself, one after the other, for each value emitted
     * from the source.
     * @name concatMapTo
     */
    function concatMapTo(innerObservable, resultSelector) {
      if (typeof resultSelector === "function") {
        return concatMap_ts_1.concatMap(() => innerObservable, resultSelector);
      }
      return concatMap_ts_1.concatMap(() => innerObservable);
    }
    exports_125("concatMapTo", concatMapTo);
    return {
      setters: [
        function (concatMap_ts_1_1) {
          concatMap_ts_1 = concatMap_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/concatWith",
  ["https://deno.land/x/rxjs/src/internal/observable/concat"],
  function (exports_126, context_126) {
    "use strict";
    var concat_ts_3;
    var __moduleName = context_126 && context_126.id;
    /**
     * Emits all of the values from the source observable, then, once it completes, subscribes
     * to each observable source provided, one at a time, emitting all of their values, and not subscribing
     * to the next one until it completes.
     *
     * `concat(a$, b$, c$)` is the same as `a$.pipe(concatWith(b$, c$))`.
     *
     * ## Example
     *
     * Listen for one mouse click, then listen for all mouse moves.
     *
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { concatWith } from 'rxjs/operators.ts';
     *
     * const clicks$ = fromEvent(document, 'click');
     * const moves$ = fromEvent(document, 'mousemove');
     *
     * clicks$.pipe(
     *   map(() => 'click'),
     *   take(1),
     *   concatWith(
     *     moves$.pipe(
     *       map(() => 'move')
     *     )
     *   )
     * )
     * .subscribe(x => console.log(x));
     *
     * // 'click'
     * // 'move'
     * // 'move'
     * // 'move'
     * // ...
     * ```
     *
     * @param otherSources Other observable sources to subscribe to, in sequence, after the original source is complete.
     */
    function concatWith(...otherSources) {
      return (source) =>
        source.lift.call(
          concat_ts_3.concat(source, ...otherSources),
          undefined,
        );
    }
    exports_126("concatWith", concatWith);
    return {
      setters: [
        function (concat_ts_3_1) {
          concat_ts_3 = concat_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/count",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_127, context_127) {
    "use strict";
    var Subscriber_ts_15, CountOperator, CountSubscriber;
    var __moduleName = context_127 && context_127.id;
    /**
     * Counts the number of emissions on the source and emits that number when the
     * source completes.
     *
     * <span class="informal">Tells how many values were emitted, when the source
     * completes.</span>
     *
     * ![](count.png)
     *
     * `count` transforms an Observable that emits values into an Observable that
     * emits a single value that represents the number of values emitted by the
     * source Observable. If the source Observable terminates with an error, `count`
     * will pass this error notification along without emitting a value first. If
     * the source Observable does not terminate at all, `count` will neither emit
     * a value nor terminate. This operator takes an optional `predicate` function
     * as argument, in which case the output emission will represent the number of
     * source values that matched `true` with the `predicate`.
     *
     * ## Examples
     *
     * Counts how many seconds have passed before the first click happened
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { count, takeUntil } from 'rxjs/operators.ts';
     *
     * const seconds = interval(1000);
     * const clicks = fromEvent(document, 'click');
     * const secondsBeforeClick = seconds.pipe(takeUntil(clicks));
     * const result = secondsBeforeClick.pipe(count());
     * result.subscribe(x => console.log(x));
     * ```
     *
     * Counts how many odd numbers are there between 1 and 7
     * ```ts
     * import { range } from 'rxjs.ts';
     * import { count } from 'rxjs/operators.ts';
     *
     * const numbers = range(1, 7);
     * const result = numbers.pipe(count(i => i % 2 === 1));
     * result.subscribe(x => console.log(x));
     * // Results in:
     * // 4
     * ```
     *
     * @see {@link max}
     * @see {@link min}
     * @see {@link reduce}
     *
     * @param {function(value: T, i: number, source: Observable<T>): boolean} [predicate] A
     * boolean function to select what values are to be counted. It is provided with
     * arguments of:
     * - `value`: the value from the source Observable.
     * - `index`: the (zero-based) "index" of the value from the source Observable.
     * - `source`: the source Observable instance itself.
     * @return {Observable} An Observable of one number that represents the count as
     * described above.
     * @name count
     */
    function count(predicate) {
      return (source) => source.lift(new CountOperator(predicate, source));
    }
    exports_127("count", count);
    return {
      setters: [
        function (Subscriber_ts_15_1) {
          Subscriber_ts_15 = Subscriber_ts_15_1;
        },
      ],
      execute: function () {
        CountOperator = class CountOperator {
          constructor(predicate, source) {
            this.predicate = predicate;
            this.source = source;
          }
          call(subscriber, source) {
            return source.subscribe(
              new CountSubscriber(subscriber, this.predicate, this.source),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        CountSubscriber = class CountSubscriber
          extends Subscriber_ts_15.Subscriber {
          constructor(destination, predicate, source) {
            super(destination);
            this.predicate = predicate;
            this.source = source;
            this.count = 0;
            this.index = 0;
          }
          _next(value) {
            if (this.predicate) {
              this._tryPredicate(value);
            } else {
              this.count++;
            }
          }
          _tryPredicate(value) {
            let result;
            try {
              result = this.predicate(value, this.index++, this.source);
            } catch (err) {
              this.destination.error(err);
              return;
            }
            if (result) {
              this.count++;
            }
          }
          _complete() {
            this.destination.next(this.count);
            this.destination.complete();
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/debounce",
  [
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_128, context_128) {
    "use strict";
    var OuterSubscriber_ts_10,
      subscribeToResult_ts_10,
      DebounceOperator,
      DebounceSubscriber;
    var __moduleName = context_128 && context_128.id;
    /**
     * Emits a notification from the source Observable only after a particular time span
     * determined by another Observable has passed without another source emission.
     *
     * <span class="informal">It's like {@link debounceTime}, but the time span of
     * emission silence is determined by a second Observable.</span>
     *
     * ![](debounce.png)
     *
     * `debounce` delays notifications emitted by the source Observable, but drops previous
     * pending delayed emissions if a new notification arrives on the source Observable.
     * This operator keeps track of the most recent notification from the source
     * Observable, and spawns a duration Observable by calling the
     * `durationSelector` function. The notification is emitted only when the duration
     * Observable emits a notification or completes, and if no other notification was emitted on
     * the source Observable since the duration Observable was spawned. If a new
     * notification appears before the duration Observable emits, the previous notification will
     * not be emitted and a new duration is scheduled from `durationSelector` is scheduled.
     * If the completing event happens during the scheduled duration the last cached notification
     * is emitted before the completion event is forwarded to the output observable.
     * If the error event happens during the scheduled duration or after it only the error event is
     * forwarded to the output observable. The cache notification is not emitted in this case.
     *
     * Like {@link debounceTime}, this is a rate-limiting operator, and also a
     * delay-like operator since output emissions do not necessarily occur at the
     * same time as they did on the source Observable.
     *
     * ## Example
     * Emit the most recent click after a burst of clicks
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { scan, debounce } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(
     *   scan((i) => ++i, 1),
     *   debounce((i) => interval(200 * i))
     * );
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link audit}
     * @see {@link auditTime}
     * @see {@link debounce}
     * @see {@link delay}
     * @see {@link sample}
     * @see {@link sampleTime}
     * @see {@link throttle}
     * @see {@link throttleTime}
     *
     * @param {function(value: T): SubscribableOrPromise} durationSelector A function
     * that receives a value from the source Observable, for computing the timeout
     * duration for each source value, returned as an Observable or a Promise.
     * @return {Observable} An Observable that delays the emissions of the source
     * Observable by the specified duration Observable returned by
     * `durationSelector`, and may drop some values if they occur too frequently.
     * @name debounce
     */
    function debounce(durationSelector) {
      return (source) => source.lift(new DebounceOperator(durationSelector));
    }
    exports_128("debounce", debounce);
    return {
      setters: [
        function (OuterSubscriber_ts_10_1) {
          OuterSubscriber_ts_10 = OuterSubscriber_ts_10_1;
        },
        function (subscribeToResult_ts_10_1) {
          subscribeToResult_ts_10 = subscribeToResult_ts_10_1;
        },
      ],
      execute: function () {
        DebounceOperator = class DebounceOperator {
          constructor(durationSelector) {
            this.durationSelector = durationSelector;
          }
          call(subscriber, source) {
            return source.subscribe(
              new DebounceSubscriber(subscriber, this.durationSelector),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        DebounceSubscriber = class DebounceSubscriber
          extends OuterSubscriber_ts_10.OuterSubscriber {
          constructor(destination, durationSelector) {
            super(destination);
            this.durationSelector = durationSelector;
            this.value = null;
            this.hasValue = false;
            this.durationSubscription = null;
          }
          _next(value) {
            try {
              const result = this.durationSelector.call(this, value);
              if (result) {
                this._tryNext(value, result);
              }
            } catch (err) {
              this.destination.error(err);
            }
          }
          _complete() {
            this.emitValue();
            this.destination.complete();
          }
          _tryNext(value, duration) {
            let subscription = this.durationSubscription;
            this.value = value;
            this.hasValue = true;
            if (subscription) {
              subscription.unsubscribe();
              this.remove(subscription);
            }
            subscription = subscribeToResult_ts_10.subscribeToResult(
              this,
              duration,
            );
            if (subscription && !subscription.closed) {
              this.add(this.durationSubscription = subscription);
            }
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.emitValue();
          }
          notifyComplete() {
            this.emitValue();
          }
          emitValue() {
            if (this.hasValue) {
              const value = this.value;
              const subscription = this.durationSubscription;
              if (subscription) {
                this.durationSubscription = null;
                subscription.unsubscribe();
                this.remove(subscription);
              }
              // This must be done *before* passing the value
              // along to the destination because it's possible for
              // the value to synchronously re-enter this operator
              // recursively if the duration selector Observable
              // emits synchronously
              this.value = null;
              this.hasValue = false;
              super._next(value);
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/debounceTime",
  [
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/scheduler/async",
  ],
  function (exports_129, context_129) {
    "use strict";
    var Subscriber_ts_16,
      async_ts_6,
      DebounceTimeOperator,
      DebounceTimeSubscriber;
    var __moduleName = context_129 && context_129.id;
    /**
     * Emits a notification from the source Observable only after a particular time span
     * has passed without another source emission.
     *
     * <span class="informal">It's like {@link delay}, but passes only the most
     * recent notification from each burst of emissions.</span>
     *
     * ![](debounceTime.png)
     *
     * `debounceTime` delays notifications emitted by the source Observable, but drops
     * previous pending delayed emissions if a new notification arrives on the source
     * Observable. This operator keeps track of the most recent notification from the
     * source Observable, and emits that only when `dueTime` has passed
     * without any other notification appearing on the source Observable. If a new value
     * appears before `dueTime` silence occurs, the previous notification will be dropped
     * and will not be emitted and a new `dueTime` is scheduled.
     * If the completing event happens during `dueTime` the last cached notification
     * is emitted before the completion event is forwarded to the output observable.
     * If the error event happens during `dueTime` or after it only the error event is
     * forwarded to the output observable. The cache notification is not emitted in this case.
     *
     * This is a rate-limiting operator, because it is impossible for more than one
     * notification to be emitted in any time window of duration `dueTime`, but it is also
     * a delay-like operator since output emissions do not occur at the same time as
     * they did on the source Observable. Optionally takes a {@link SchedulerLike} for
     * managing timers.
     *
     * ## Example
     * Emit the most recent click after a burst of clicks
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { debounceTime } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(debounceTime(1000));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link audit}
     * @see {@link auditTime}
     * @see {@link debounce}
     * @see {@link debounceTime}
     * @see {@link sample}
     * @see {@link sampleTime}
     * @see {@link throttle}
     * @see {@link throttleTime}
     *
     * @param {number} dueTime The timeout duration in milliseconds (or the time
     * unit determined internally by the optional `scheduler`) for the window of
     * time required to wait for emission silence before emitting the most recent
     * source value.
     * @param {SchedulerLike} [scheduler=async] The {@link SchedulerLike} to use for
     * managing the timers that handle the timeout for each value.
     * @return {Observable} An Observable that delays the emissions of the source
     * Observable by the specified `dueTime`, and may drop some values if they occur
     * too frequently.
     * @name debounceTime
     */
    function debounceTime(dueTime, scheduler = async_ts_6.async) {
      return (source) =>
        source.lift(new DebounceTimeOperator(dueTime, scheduler));
    }
    exports_129("debounceTime", debounceTime);
    function dispatchNext(subscriber) {
      subscriber.debouncedNext();
    }
    return {
      setters: [
        function (Subscriber_ts_16_1) {
          Subscriber_ts_16 = Subscriber_ts_16_1;
        },
        function (async_ts_6_1) {
          async_ts_6 = async_ts_6_1;
        },
      ],
      execute: function () {
        DebounceTimeOperator = class DebounceTimeOperator {
          constructor(dueTime, scheduler) {
            this.dueTime = dueTime;
            this.scheduler = scheduler;
          }
          call(subscriber, source) {
            return source.subscribe(
              new DebounceTimeSubscriber(
                subscriber,
                this.dueTime,
                this.scheduler,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        DebounceTimeSubscriber = class DebounceTimeSubscriber
          extends Subscriber_ts_16.Subscriber {
          constructor(destination, dueTime, scheduler) {
            super(destination);
            this.dueTime = dueTime;
            this.scheduler = scheduler;
            this.debouncedSubscription = null;
            this.lastValue = null;
            this.hasValue = false;
          }
          _next(value) {
            this.clearDebounce();
            this.lastValue = value;
            this.hasValue = true;
            this.add(
              this.debouncedSubscription = this.scheduler.schedule(
                dispatchNext,
                this.dueTime,
                this,
              ),
            );
          }
          _complete() {
            this.debouncedNext();
            this.destination.complete();
          }
          debouncedNext() {
            this.clearDebounce();
            if (this.hasValue) {
              const { lastValue } = this;
              // This must be done *before* passing the value
              // along to the destination because it's possible for
              // the value to synchronously re-enter this operator
              // recursively when scheduled with things like
              // VirtualScheduler/TestScheduler.
              this.lastValue = null;
              this.hasValue = false;
              this.destination.next(lastValue);
            }
          }
          clearDebounce() {
            const debouncedSubscription = this.debouncedSubscription;
            if (debouncedSubscription !== null) {
              this.remove(debouncedSubscription);
              debouncedSubscription.unsubscribe();
              this.debouncedSubscription = null;
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/defaultIfEmpty",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_130, context_130) {
    "use strict";
    var Subscriber_ts_17, DefaultIfEmptyOperator, DefaultIfEmptySubscriber;
    var __moduleName = context_130 && context_130.id;
    /* tslint:enable:max-line-length */
    /**
     * Emits a given value if the source Observable completes without emitting any
     * `next` value, otherwise mirrors the source Observable.
     *
     * <span class="informal">If the source Observable turns out to be empty, then
     * this operator will emit a default value.</span>
     *
     * ![](defaultIfEmpty.png)
     *
     * `defaultIfEmpty` emits the values emitted by the source Observable or a
     * specified default value if the source Observable is empty (completes without
     * having emitted any `next` value).
     *
     * ## Example
     * If no clicks happen in 5 seconds, then emit "no clicks"
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { defaultIfEmpty, takeUntil } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const clicksBeforeFive = clicks.pipe(takeUntil(interval(5000)));
     * const result = clicksBeforeFive.pipe(defaultIfEmpty('no clicks'));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link empty}
     * @see {@link last}
     *
     * @param {any} [defaultValue=null] The default value used if the source
     * Observable is empty.
     * @return {Observable} An Observable that emits either the specified
     * `defaultValue` if the source Observable emits no items, or the values emitted
     * by the source Observable.
     * @name defaultIfEmpty
     */
    function defaultIfEmpty(defaultValue = null) {
      return (source) => source.lift(new DefaultIfEmptyOperator(defaultValue));
    }
    exports_130("defaultIfEmpty", defaultIfEmpty);
    return {
      setters: [
        function (Subscriber_ts_17_1) {
          Subscriber_ts_17 = Subscriber_ts_17_1;
        },
      ],
      execute: function () {
        DefaultIfEmptyOperator = class DefaultIfEmptyOperator {
          constructor(defaultValue) {
            this.defaultValue = defaultValue;
          }
          call(subscriber, source) {
            return source.subscribe(
              new DefaultIfEmptySubscriber(subscriber, this.defaultValue),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        DefaultIfEmptySubscriber = class DefaultIfEmptySubscriber
          extends Subscriber_ts_17.Subscriber {
          constructor(destination, defaultValue) {
            super(destination);
            this.defaultValue = defaultValue;
            this.isEmpty = true;
          }
          _next(value) {
            this.isEmpty = false;
            this.destination.next(value);
          }
          _complete() {
            if (this.isEmpty) {
              this.destination.next(this.defaultValue);
            }
            this.destination.complete();
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/util/isDate",
  [],
  function (exports_131, context_131) {
    "use strict";
    var __moduleName = context_131 && context_131.id;
    function isDate(value) {
      return value instanceof Date && !isNaN(+value);
    }
    exports_131("isDate", isDate);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/delay",
  [
    "https://deno.land/x/rxjs/src/internal/scheduler/async",
    "https://deno.land/x/rxjs/src/internal/util/isDate",
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/Notification",
  ],
  function (exports_132, context_132) {
    "use strict";
    var async_ts_7,
      isDate_ts_1,
      Subscriber_ts_18,
      Notification_ts_2,
      DelayOperator,
      DelaySubscriber,
      DelayMessage;
    var __moduleName = context_132 && context_132.id;
    /**
     * Delays the emission of items from the source Observable by a given timeout or
     * until a given Date.
     *
     * <span class="informal">Time shifts each item by some specified amount of
     * milliseconds.</span>
     *
     * ![](delay.png)
     *
     * If the delay argument is a Number, this operator time shifts the source
     * Observable by that amount of time expressed in milliseconds. The relative
     * time intervals between the values are preserved.
     *
     * If the delay argument is a Date, this operator time shifts the start of the
     * Observable execution until the given date occurs.
     *
     * ## Examples
     * Delay each click by one second
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { delay } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const delayedClicks = clicks.pipe(delay(1000)); // each click emitted after 1 second
     * delayedClicks.subscribe(x => console.log(x));
     * ```
     *
     * Delay all clicks until a future date happens
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { delay } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const date = new Date('March 15, 2050 12:00:00'); // in the future
     * const delayedClicks = clicks.pipe(delay(date)); // click emitted only after that date
     * delayedClicks.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link debounceTime}
     * @see {@link delayWhen}
     *
     * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
     * a `Date` until which the emission of the source items is delayed.
     * @param {SchedulerLike} [scheduler=async] The {@link SchedulerLike} to use for
     * managing the timers that handle the time-shift for each item.
     * @return {Observable} An Observable that delays the emissions of the source
     * Observable by the specified timeout or Date.
     * @name delay
     */
    function delay(delay, scheduler = async_ts_7.async) {
      const absoluteDelay = isDate_ts_1.isDate(delay);
      const delayFor = absoluteDelay ? (+delay - scheduler.now())
      : Math.abs(delay);
      return (source) => source.lift(new DelayOperator(delayFor, scheduler));
    }
    exports_132("delay", delay);
    return {
      setters: [
        function (async_ts_7_1) {
          async_ts_7 = async_ts_7_1;
        },
        function (isDate_ts_1_1) {
          isDate_ts_1 = isDate_ts_1_1;
        },
        function (Subscriber_ts_18_1) {
          Subscriber_ts_18 = Subscriber_ts_18_1;
        },
        function (Notification_ts_2_1) {
          Notification_ts_2 = Notification_ts_2_1;
        },
      ],
      execute: function () {
        DelayOperator = class DelayOperator {
          constructor(delay, scheduler) {
            this.delay = delay;
            this.scheduler = scheduler;
          }
          call(subscriber, source) {
            return source.subscribe(
              new DelaySubscriber(subscriber, this.delay, this.scheduler),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        DelaySubscriber = class DelaySubscriber
          extends Subscriber_ts_18.Subscriber {
          constructor(destination, delay, scheduler) {
            super(destination);
            this.delay = delay;
            this.scheduler = scheduler;
            this.queue = [];
            this.active = false;
            this.errored = false;
          }
          static dispatch(state) {
            const source = state.source;
            const queue = source.queue;
            const scheduler = state.scheduler;
            const destination = state.destination;
            while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
              queue.shift().notification.observe(destination);
            }
            if (queue.length > 0) {
              const delay = Math.max(0, queue[0].time - scheduler.now());
              this.schedule(state, delay);
            } else if (source.isStopped) {
              source.destination.complete();
              source.active = false;
            } else {
              this.unsubscribe();
              source.active = false;
            }
          }
          _schedule(scheduler) {
            this.active = true;
            const destination = this.destination;
            destination.add(
              scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
                source: this,
                destination: this.destination,
                scheduler: scheduler,
              }),
            );
          }
          scheduleNotification(notification) {
            if (this.errored === true) {
              return;
            }
            const scheduler = this.scheduler;
            const message = new DelayMessage(
              scheduler.now() + this.delay,
              notification,
            );
            this.queue.push(message);
            if (this.active === false) {
              this._schedule(scheduler);
            }
          }
          _next(value) {
            this.scheduleNotification(
              Notification_ts_2.Notification.createNext(value),
            );
          }
          _error(err) {
            this.errored = true;
            this.queue = [];
            this.destination.error(err);
            this.unsubscribe();
          }
          _complete() {
            if (this.queue.length === 0) {
              this.destination.complete();
            }
            this.unsubscribe();
          }
        };
        DelayMessage = class DelayMessage {
          constructor(time, notification) {
            this.time = time;
            this.notification = notification;
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/delayWhen",
  [
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_133, context_133) {
    "use strict";
    var Subscriber_ts_19,
      Observable_ts_33,
      OuterSubscriber_ts_11,
      subscribeToResult_ts_11,
      DelayWhenOperator,
      DelayWhenSubscriber,
      SubscriptionDelayObservable,
      SubscriptionDelaySubscriber;
    var __moduleName = context_133 && context_133.id;
    /* tslint:disable:max-line-length */
    /**
     * Delays the emission of items from the source Observable by a given time span
     * determined by the emissions of another Observable.
     *
     * <span class="informal">It's like {@link delay}, but the time span of the
     * delay duration is determined by a second Observable.</span>
     *
     * ![](delayWhen.png)
     *
     * `delayWhen` time shifts each emitted value from the source Observable by a
     * time span determined by another Observable. When the source emits a value,
     * the `delayDurationSelector` function is called with the source value as
     * argument, and should return an Observable, called the "duration" Observable.
     * The source value is emitted on the output Observable only when the duration
     * Observable emits a value or completes.
     * The completion of the notifier triggering the emission of the source value
     * is deprecated behavior and will be removed in future versions.
     *
     * Optionally, `delayWhen` takes a second argument, `subscriptionDelay`, which
     * is an Observable. When `subscriptionDelay` emits its first value or
     * completes, the source Observable is subscribed to and starts behaving like
     * described in the previous paragraph. If `subscriptionDelay` is not provided,
     * `delayWhen` will subscribe to the source Observable as soon as the output
     * Observable is subscribed.
     *
     * ## Example
     * Delay each click by a random amount of time, between 0 and 5 seconds
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { delayWhen } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const delayedClicks = clicks.pipe(
     *   delayWhen(event => interval(Math.random() * 5000)),
     * );
     * delayedClicks.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link delay}
     * @see {@link throttle}
     * @see {@link throttleTime}
     * @see {@link debounce}
     * @see {@link debounceTime}
     * @see {@link sample}
     * @see {@link sampleTime}
     * @see {@link audit}
     * @see {@link auditTime}
     *
     * @param {function(value: T, index: number): Observable} delayDurationSelector A function that
     * returns an Observable for each value emitted by the source Observable, which
     * is then used to delay the emission of that item on the output Observable
     * until the Observable returned from this function emits a value.
     * @param {Observable} subscriptionDelay An Observable that triggers the
     * subscription to the source Observable once it emits any value.
     * @return {Observable} An Observable that delays the emissions of the source
     * Observable by an amount of time specified by the Observable returned by
     * `delayDurationSelector`.
     * @name delayWhen
     */
    function delayWhen(delayDurationSelector, subscriptionDelay) {
      if (subscriptionDelay) {
        return (source) =>
          new SubscriptionDelayObservable(source, subscriptionDelay)
            .lift(new DelayWhenOperator(delayDurationSelector));
      }
      return (source) =>
        source.lift(new DelayWhenOperator(delayDurationSelector));
    }
    exports_133("delayWhen", delayWhen);
    return {
      setters: [
        function (Subscriber_ts_19_1) {
          Subscriber_ts_19 = Subscriber_ts_19_1;
        },
        function (Observable_ts_33_1) {
          Observable_ts_33 = Observable_ts_33_1;
        },
        function (OuterSubscriber_ts_11_1) {
          OuterSubscriber_ts_11 = OuterSubscriber_ts_11_1;
        },
        function (subscribeToResult_ts_11_1) {
          subscribeToResult_ts_11 = subscribeToResult_ts_11_1;
        },
      ],
      execute: function () {
        DelayWhenOperator = class DelayWhenOperator {
          constructor(delayDurationSelector) {
            this.delayDurationSelector = delayDurationSelector;
          }
          call(subscriber, source) {
            return source.subscribe(
              new DelayWhenSubscriber(subscriber, this.delayDurationSelector),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        DelayWhenSubscriber = class DelayWhenSubscriber
          extends OuterSubscriber_ts_11.OuterSubscriber {
          constructor(destination, delayDurationSelector) {
            super(destination);
            this.delayDurationSelector = delayDurationSelector;
            this.completed = false;
            this.delayNotifierSubscriptions = [];
            this.index = 0;
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.destination.next(outerValue);
            this.removeSubscription(innerSub);
            this.tryComplete();
          }
          notifyError(error, innerSub) {
            this._error(error);
          }
          notifyComplete(innerSub) {
            const value = this.removeSubscription(innerSub);
            if (value) {
              this.destination.next(value);
            }
            this.tryComplete();
          }
          _next(value) {
            const index = this.index++;
            try {
              const delayNotifier = this.delayDurationSelector(value, index);
              if (delayNotifier) {
                this.tryDelay(delayNotifier, value);
              }
            } catch (err) {
              this.destination.error(err);
            }
          }
          _complete() {
            this.completed = true;
            this.tryComplete();
            this.unsubscribe();
          }
          removeSubscription(subscription) {
            subscription.unsubscribe();
            const subscriptionIdx = this.delayNotifierSubscriptions.indexOf(
              subscription,
            );
            if (subscriptionIdx !== -1) {
              this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
            }
            return subscription.outerValue;
          }
          tryDelay(delayNotifier, value) {
            const notifierSubscription = subscribeToResult_ts_11
              .subscribeToResult(this, delayNotifier, value);
            if (notifierSubscription && !notifierSubscription.closed) {
              const destination = this.destination;
              destination.add(notifierSubscription);
              this.delayNotifierSubscriptions.push(notifierSubscription);
            }
          }
          tryComplete() {
            if (
              this.completed && this.delayNotifierSubscriptions.length === 0
            ) {
              this.destination.complete();
            }
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        SubscriptionDelayObservable = class SubscriptionDelayObservable
          extends Observable_ts_33.Observable {
          constructor(source, subscriptionDelay) {
            super();
            this.source = source;
            this.subscriptionDelay = subscriptionDelay;
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _subscribe(subscriber) {
            this.subscriptionDelay.subscribe(
              new SubscriptionDelaySubscriber(subscriber, this.source),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        SubscriptionDelaySubscriber = class SubscriptionDelaySubscriber
          extends Subscriber_ts_19.Subscriber {
          constructor(parent, source) {
            super();
            this.parent = parent;
            this.source = source;
            this.sourceSubscribed = false;
          }
          _next(unused) {
            this.subscribeToSource();
          }
          _error(err) {
            this.unsubscribe();
            this.parent.error(err);
          }
          _complete() {
            this.unsubscribe();
            this.subscribeToSource();
          }
          subscribeToSource() {
            if (!this.sourceSubscribed) {
              this.sourceSubscribed = true;
              this.unsubscribe();
              this.source.subscribe(this.parent);
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/dematerialize",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_134, context_134) {
    "use strict";
    var Subscriber_ts_20, DeMaterializeOperator, DeMaterializeSubscriber;
    var __moduleName = context_134 && context_134.id;
    /**
     * Converts an Observable of {@link Notification} objects into the emissions
     * that they represent.
     *
     * <span class="informal">Unwraps {@link Notification} objects as actual `next`,
     * `error` and `complete` emissions. The opposite of {@link materialize}.</span>
     *
     * ![](dematerialize.png)
     *
     * `dematerialize` is assumed to operate an Observable that only emits
     * {@link Notification} objects as `next` emissions, and does not emit any
     * `error`. Such Observable is the output of a `materialize` operation. Those
     * notifications are then unwrapped using the metadata they contain, and emitted
     * as `next`, `error`, and `complete` on the output Observable.
     *
     * Use this operator in conjunction with {@link materialize}.
     *
     * ## Example
     * Convert an Observable of Notifications to an actual Observable
     * ```ts
     * import { of, Notification } from 'rxjs.ts';
     * import { dematerialize } from 'rxjs/operators.ts';
     *
     * const notifA = new Notification('N', 'A');
     * const notifB = new Notification('N', 'B');
     * const notifE = new Notification('E', undefined,
     *   new TypeError('x.toUpperCase is not a function')
     * );
     * const materialized = of(notifA, notifB, notifE);
     * const upperCase = materialized.pipe(dematerialize());
     * upperCase.subscribe(x => console.log(x), e => console.error(e));
     *
     * // Results in:
     * // A
     * // B
     * // TypeError: x.toUpperCase is not a function
     * ```
     *
     * @see {@link Notification}
     * @see {@link materialize}
     *
     * @return {Observable} An Observable that emits items and notifications
     * embedded in Notification objects emitted by the source Observable.
     * @name dematerialize
     */
    function dematerialize() {
      return function dematerializeOperatorFunction(source) {
        return source.lift(new DeMaterializeOperator());
      };
    }
    exports_134("dematerialize", dematerialize);
    return {
      setters: [
        function (Subscriber_ts_20_1) {
          Subscriber_ts_20 = Subscriber_ts_20_1;
        },
      ],
      execute: function () {
        DeMaterializeOperator = class DeMaterializeOperator {
          call(subscriber, source) {
            return source.subscribe(new DeMaterializeSubscriber(subscriber));
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        DeMaterializeSubscriber = class DeMaterializeSubscriber
          extends Subscriber_ts_20.Subscriber {
          constructor(destination) {
            super(destination);
          }
          _next(value) {
            value.observe(this.destination);
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/distinct",
  [
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_135, context_135) {
    "use strict";
    var OuterSubscriber_ts_12,
      subscribeToResult_ts_12,
      DistinctOperator,
      DistinctSubscriber;
    var __moduleName = context_135 && context_135.id;
    /**
     * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
     *
     * If a keySelector function is provided, then it will project each value from the source observable into a new value that it will
     * check for equality with previously projected values. If a keySelector function is not provided, it will use each value from the
     * source observable directly with an equality check against previous values.
     *
     * In JavaScript runtimes that support `Set`, this operator will use a `Set` to improve performance of the distinct value checking.
     *
     * In other runtimes, this operator will use a minimal implementation of `Set` that relies on an `Array` and `indexOf` under the
     * hood, so performance will degrade as more values are checked for distinction. Even in newer browsers, a long-running `distinct`
     * use might result in memory leaks. To help alleviate this in some scenarios, an optional `flushes` parameter is also provided so
     * that the internal `Set` can be "flushed", basically clearing it of values.
     *
     * ## Examples
     *
     * A simple example with numbers
     *
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { distinct } from 'rxjs/operators.ts';
     *
     * of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1)
     *   .pipe(
     *     distinct()
     *   )
     *   .subscribe(x => console.log(x));
     *
     * // Outputs
     * // 1
     * // 2
     * // 3
     * // 4
     * ```
     *
     * An example using a keySelector function
     *
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { distinct } from 'rxjs/operators.ts';
     *
     * interface Person {
     *    age: number,
     *    name: string
     * }
     *
     * of(
     *     { age: 4, name: 'Foo'},
     *     { age: 7, name: 'Bar'},
     *     { age: 5, name: 'Foo'}
     *   ).pipe(
     *     distinct((p: Person) => p.name)
     *   )
     *   .subscribe(x => console.log(x));
     *
     * // Outputs
     * // { age: 4, name: 'Foo' }
     * // { age: 7, name: 'Bar' }
     * ```
     * @see {@link distinctUntilChanged}
     * @see {@link distinctUntilKeyChanged}
     *
     * @param {function} [keySelector] Optional function to select which value you want to check as distinct.
     * @param {Observable} [flushes] Optional Observable for flushing the internal HashSet of the operator.
     * @return {Observable} An Observable that emits items from the source Observable with distinct values.
     * @name distinct
     */
    function distinct(keySelector, flushes) {
      return (source) =>
        source.lift(new DistinctOperator(keySelector, flushes));
    }
    exports_135("distinct", distinct);
    return {
      setters: [
        function (OuterSubscriber_ts_12_1) {
          OuterSubscriber_ts_12 = OuterSubscriber_ts_12_1;
        },
        function (subscribeToResult_ts_12_1) {
          subscribeToResult_ts_12 = subscribeToResult_ts_12_1;
        },
      ],
      execute: function () {
        DistinctOperator = class DistinctOperator {
          constructor(keySelector, flushes) {
            this.keySelector = keySelector;
            this.flushes = flushes;
          }
          call(subscriber, source) {
            return source.subscribe(
              new DistinctSubscriber(
                subscriber,
                this.keySelector,
                this.flushes,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        DistinctSubscriber = class DistinctSubscriber
          extends OuterSubscriber_ts_12.OuterSubscriber {
          constructor(destination, keySelector, flushes) {
            super(destination);
            this.keySelector = keySelector;
            this.values = new Set();
            if (flushes) {
              this.add(
                subscribeToResult_ts_12.subscribeToResult(this, flushes),
              );
            }
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.values.clear();
          }
          notifyError(error, innerSub) {
            this._error(error);
          }
          _next(value) {
            if (this.keySelector) {
              this._useKeySelector(value);
            } else {
              this._finalizeNext(value, value);
            }
          }
          _useKeySelector(value) {
            let key;
            const { destination } = this;
            try {
              key = this.keySelector(value);
            } catch (err) {
              destination.error(err);
              return;
            }
            this._finalizeNext(key, value);
          }
          _finalizeNext(key, value) {
            const { values } = this;
            if (!values.has(key)) {
              values.add(key);
              this.destination.next(value);
            }
          }
        };
        exports_135("DistinctSubscriber", DistinctSubscriber);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/distinctUntilChanged",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_136, context_136) {
    "use strict";
    var Subscriber_ts_21,
      DistinctUntilChangedOperator,
      DistinctUntilChangedSubscriber;
    var __moduleName = context_136 && context_136.id;
    /* tslint:enable:max-line-length */
    /**
     * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
     *
     * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
     * The comparator function shourld return true if the values are the same, and false if they are different.
     *
     * If a comparator function is not provided, an equality check is used by default.
     *
     * ## Example
     * A simple example with numbers
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { distinctUntilChanged } from 'rxjs/operators.ts';
     *
     * of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4).pipe(
     *     distinctUntilChanged(),
     *   )
     *   .subscribe(x => console.log(x)); // 1, 2, 1, 2, 3, 4
     * ```
     *
     * An example using a compare function
     * ```typescript
     * import { of } from 'rxjs.ts';
     * import { distinctUntilChanged } from 'rxjs/operators.ts';
     *
     * interface Person {
     *    age: number,
     *    name: string
     * }
     *
     *of(
     *     { age: 4, name: 'Foo'},
     *     { age: 7, name: 'Bar'},
     *     { age: 5, name: 'Foo'},
     *     { age: 6, name: 'Foo'},
     *   ).pipe(
     *     distinctUntilChanged((p: Person, q: Person) => p.name === q.name),
     *   )
     *   .subscribe(x => console.log(x));
     *
     * // displays:
     * // { age: 4, name: 'Foo' }
     * // { age: 7, name: 'Bar' }
     * // { age: 5, name: 'Foo' }
     * ```
     *
     * @see {@link distinct}
     * @see {@link distinctUntilKeyChanged}
     *
     * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
     * A return value of true indicates that it is the same, and a return value of false means they are different.
     * @return {Observable} An Observable that emits items from the source Observable with distinct values.
     * @name distinctUntilChanged
     */
    function distinctUntilChanged(compare, keySelector) {
      return (source) =>
        source.lift(new DistinctUntilChangedOperator(compare, keySelector));
    }
    exports_136("distinctUntilChanged", distinctUntilChanged);
    return {
      setters: [
        function (Subscriber_ts_21_1) {
          Subscriber_ts_21 = Subscriber_ts_21_1;
        },
      ],
      execute: function () {
        DistinctUntilChangedOperator = class DistinctUntilChangedOperator {
          constructor(compare, keySelector) {
            this.compare = compare;
            this.keySelector = keySelector;
          }
          call(subscriber, source) {
            return source.subscribe(
              new DistinctUntilChangedSubscriber(
                subscriber,
                this.compare,
                this.keySelector,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        DistinctUntilChangedSubscriber = class DistinctUntilChangedSubscriber
          extends Subscriber_ts_21.Subscriber {
          constructor(destination, compare, keySelector) {
            super(destination);
            this.keySelector = keySelector;
            this.hasKey = false;
            if (typeof compare === "function") {
              this.compare = compare;
            }
          }
          compare(x, y) {
            return x === y;
          }
          _next(value) {
            let key;
            try {
              const { keySelector } = this;
              key = keySelector ? keySelector(value) : value;
            } catch (err) {
              return this.destination.error(err);
            }
            let result = false;
            if (this.hasKey) {
              try {
                const { compare } = this;
                result = compare(this.key, key);
              } catch (err) {
                return this.destination.error(err);
              }
            } else {
              this.hasKey = true;
            }
            if (!result) {
              this.key = key;
              this.destination.next(value);
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/distinctUntilKeyChanged",
  ["https://deno.land/x/rxjs/src/internal/operators/distinctUntilChanged"],
  function (exports_137, context_137) {
    "use strict";
    var distinctUntilChanged_ts_1;
    var __moduleName = context_137 && context_137.id;
    /* tslint:enable:max-line-length */
    /**
     * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item,
     * using a property accessed by using the key provided to check if the two items are distinct.
     *
     * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
     *
     * If a comparator function is not provided, an equality check is used by default.
     *
     * ## Examples
     * An example comparing the name of persons
     * ```typescript
     * import { of } from 'rxjs.ts';
     * import { distinctUntilKeyChanged } from 'rxjs/operators.ts';
     *
     *  interface Person {
     *     age: number,
     *     name: string
     *  }
     *
     *of(
     *     { age: 4, name: 'Foo'},
     *     { age: 7, name: 'Bar'},
     *     { age: 5, name: 'Foo'},
     *     { age: 6, name: 'Foo'},
     *   ).pipe(
     *     distinctUntilKeyChanged('name'),
     *   )
     *   .subscribe(x => console.log(x));
     *
     * // displays:
     * // { age: 4, name: 'Foo' }
     * // { age: 7, name: 'Bar' }
     * // { age: 5, name: 'Foo' }
     * ```
     *
     * An example comparing the first letters of the name
     * ```typescript
     * import { of } from 'rxjs.ts';
     * import { distinctUntilKeyChanged } from 'rxjs/operators.ts';
     *
     * interface Person {
     *     age: number,
     *     name: string
     *  }
     *
     *of(
     *     { age: 4, name: 'Foo1'},
     *     { age: 7, name: 'Bar'},
     *     { age: 5, name: 'Foo2'},
     *     { age: 6, name: 'Foo3'},
     *   ).pipe(
     *     distinctUntilKeyChanged('name', (x: string, y: string) => x.substring(0, 3) === y.substring(0, 3)),
     *   )
     *   .subscribe(x => console.log(x));
     *
     * // displays:
     * // { age: 4, name: 'Foo1' }
     * // { age: 7, name: 'Bar' }
     * // { age: 5, name: 'Foo2' }
     * ```
     *
     * @see {@link distinct}
     * @see {@link distinctUntilChanged}
     *
     * @param {string} key String key for object property lookup on each item.
     * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
     * @return {Observable} An Observable that emits items from the source Observable with distinct values based on the key specified.
     * @name distinctUntilKeyChanged
     */
    function distinctUntilKeyChanged(key, compare) {
      return distinctUntilChanged_ts_1.distinctUntilChanged((x, y) =>
        compare ? compare(x[key], y[key]) : x[key] === y[key]
      );
    }
    exports_137("distinctUntilKeyChanged", distinctUntilKeyChanged);
    return {
      setters: [
        function (distinctUntilChanged_ts_1_1) {
          distinctUntilChanged_ts_1 = distinctUntilChanged_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/throwIfEmpty",
  [
    "https://deno.land/x/rxjs/src/internal/util/EmptyError",
    "https://deno.land/x/rxjs/src/internal/Subscriber",
  ],
  function (exports_138, context_138) {
    "use strict";
    var EmptyError_ts_4,
      Subscriber_ts_22,
      ThrowIfEmptyOperator,
      ThrowIfEmptySubscriber;
    var __moduleName = context_138 && context_138.id;
    /**
     * If the source observable completes without emitting a value, it will emit
     * an error. The error will be created at that time by the optional
     * `errorFactory` argument, otherwise, the error will be {@link EmptyError}.
     *
     * ![](throwIfEmpty.png)
     *
     * ## Example
     * ```ts
     * import { fromEvent, timer } from 'rxjs.ts';
     * import { throwIfEmpty, takeUntil } from 'rxjs/operators.ts';
     *
     * const click$ = fromEvent(document, 'click');
     *
     * click$.pipe(
     *   takeUntil(timer(1000)),
     *   throwIfEmpty(
     *     () => new Error('the document was not clicked within 1 second')
     *   ),
     * )
     * .subscribe({
     *   next() { console.log('The button was clicked'); },
     *   error(err) { console.error(err); }
     * });
     * ```
     *
     * @param errorFactory A factory function called to produce the
     * error to be thrown when the source observable completes without emitting a
     * value.
     */
    function throwIfEmpty(errorFactory = defaultErrorFactory) {
      return (source) => {
        return source.lift(new ThrowIfEmptyOperator(errorFactory));
      };
    }
    exports_138("throwIfEmpty", throwIfEmpty);
    function defaultErrorFactory() {
      return new EmptyError_ts_4.EmptyError();
    }
    return {
      setters: [
        function (EmptyError_ts_4_1) {
          EmptyError_ts_4 = EmptyError_ts_4_1;
        },
        function (Subscriber_ts_22_1) {
          Subscriber_ts_22 = Subscriber_ts_22_1;
        },
      ],
      execute: function () {
        ThrowIfEmptyOperator = class ThrowIfEmptyOperator {
          constructor(errorFactory) {
            this.errorFactory = errorFactory;
          }
          call(subscriber, source) {
            return source.subscribe(
              new ThrowIfEmptySubscriber(subscriber, this.errorFactory),
            );
          }
        };
        ThrowIfEmptySubscriber = class ThrowIfEmptySubscriber
          extends Subscriber_ts_22.Subscriber {
          constructor(destination, errorFactory) {
            super(destination);
            this.errorFactory = errorFactory;
            this.hasValue = false;
          }
          _next(value) {
            this.hasValue = true;
            this.destination.next(value);
          }
          _complete() {
            if (!this.hasValue) {
              let err;
              try {
                err = this.errorFactory();
              } catch (e) {
                err = e;
              }
              this.destination.error(err);
            } else {
              return this.destination.complete();
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/take",
  [
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/util/ArgumentOutOfRangeError",
    "https://deno.land/x/rxjs/src/internal/observable/empty",
  ],
  function (exports_139, context_139) {
    "use strict";
    var Subscriber_ts_23,
      ArgumentOutOfRangeError_ts_2,
      empty_ts_7,
      TakeOperator,
      TakeSubscriber;
    var __moduleName = context_139 && context_139.id;
    /**
     * Emits only the first `count` values emitted by the source Observable.
     *
     * <span class="informal">Takes the first `count` values from the source, then
     * completes.</span>
     *
     * ![](take.png)
     *
     * `take` returns an Observable that emits only the first `count` values emitted
     * by the source Observable. If the source emits fewer than `count` values then
     * all of its values are emitted. After that, it completes, regardless if the
     * source completes.
     *
     * ## Example
     * Take the first 5 seconds of an infinite 1-second interval Observable
     * ```ts
     * import { interval } from 'rxjs.ts';
     * import { take } from 'rxjs/operators.ts';
     *
     * const intervalCount = interval(1000);
     * const takeFive = intervalCount.pipe(take(5));
     * takeFive.subscribe(x => console.log(x));
     *
     * // Logs:
     * // 0
     * // 1
     * // 2
     * // 3
     * // 4
     * ```
     *
     * @see {@link takeLast}
     * @see {@link takeUntil}
     * @see {@link takeWhile}
     * @see {@link skip}
     *
     * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
     * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
     * @throws {TypeError} when no numeric argument is passed.
     * @param count The maximum number of `next` values to emit.
     * @return An Observable that emits only the first `count`
     * values emitted by the source Observable, or all of the values from the source
     * if the source emits fewer than `count` values.
     */
    function take(count) {
      if (isNaN(count)) {
        throw new TypeError(`'count' is not a number`);
      }
      if (count < 0) {
        throw new ArgumentOutOfRangeError_ts_2.ArgumentOutOfRangeError();
      }
      return (source) =>
        (count === 0) ? empty_ts_7.EMPTY : source.lift(new TakeOperator(count));
    }
    exports_139("take", take);
    return {
      setters: [
        function (Subscriber_ts_23_1) {
          Subscriber_ts_23 = Subscriber_ts_23_1;
        },
        function (ArgumentOutOfRangeError_ts_2_1) {
          ArgumentOutOfRangeError_ts_2 = ArgumentOutOfRangeError_ts_2_1;
        },
        function (empty_ts_7_1) {
          empty_ts_7 = empty_ts_7_1;
        },
      ],
      execute: function () {
        TakeOperator = class TakeOperator {
          constructor(count) {
            this.count = count;
          }
          call(subscriber, source) {
            return source.subscribe(new TakeSubscriber(subscriber, this.count));
          }
        };
        TakeSubscriber = class TakeSubscriber
          extends Subscriber_ts_23.Subscriber {
          constructor(destination, count) {
            super(destination);
            this.count = count;
            this._valueCount = 0;
          }
          _next(value) {
            const total = this.count;
            const count = ++this._valueCount;
            if (count <= total) {
              this.destination.next(value);
              if (count === total) {
                this.destination.complete();
                this.unsubscribe();
              }
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/elementAt",
  [
    "https://deno.land/x/rxjs/src/internal/util/ArgumentOutOfRangeError",
    "https://deno.land/x/rxjs/src/internal/operators/filter",
    "https://deno.land/x/rxjs/src/internal/operators/throwIfEmpty",
    "https://deno.land/x/rxjs/src/internal/operators/defaultIfEmpty",
    "https://deno.land/x/rxjs/src/internal/operators/take",
  ],
  function (exports_140, context_140) {
    "use strict";
    var ArgumentOutOfRangeError_ts_3,
      filter_ts_2,
      throwIfEmpty_ts_1,
      defaultIfEmpty_ts_1,
      take_ts_1;
    var __moduleName = context_140 && context_140.id;
    /**
     * Emits the single value at the specified `index` in a sequence of emissions
     * from the source Observable.
     *
     * <span class="informal">Emits only the i-th value, then completes.</span>
     *
     * ![](elementAt.png)
     *
     * `elementAt` returns an Observable that emits the item at the specified
     * `index` in the source Observable, or a default value if that `index` is out
     * of range and the `default` argument is provided. If the `default` argument is
     * not given and the `index` is out of range, the output Observable will emit an
     * `ArgumentOutOfRangeError` error.
     *
     * ## Example
     * Emit only the third click event
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { elementAt } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(elementAt(2));
     * result.subscribe(x => console.log(x));
     *
     * // Results in:
     * // click 1 = nothing
     * // click 2 = nothing
     * // click 3 = MouseEvent object logged to console
     * ```
     *
     * @see {@link first}
     * @see {@link last}
     * @see {@link skip}
     * @see {@link single}
     * @see {@link take}
     *
     * @throws {ArgumentOutOfRangeError} When using `elementAt(i)`, it delivers an
     * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0` or the
     * Observable has completed before emitting the i-th `next` notification.
     *
     * @param {number} index Is the number `i` for the i-th source emission that has
     * happened since the subscription, starting from the number `0`.
     * @param {T} [defaultValue] The default value returned for missing indices.
     * @return {Observable} An Observable that emits a single item, if it is found.
     * Otherwise, will emit the default value if given. If not, then emits an error.
     * @name elementAt
     */
    function elementAt(index, defaultValue) {
      if (index < 0) {
        throw new ArgumentOutOfRangeError_ts_3.ArgumentOutOfRangeError();
      }
      const hasDefaultValue = arguments.length >= 2;
      return (source) =>
        source.pipe(
          filter_ts_2.filter((v, i) => i === index),
          take_ts_1.take(1),
          hasDefaultValue ? defaultIfEmpty_ts_1.defaultIfEmpty(defaultValue)
          : throwIfEmpty_ts_1.throwIfEmpty(() =>
            new ArgumentOutOfRangeError_ts_3.ArgumentOutOfRangeError()
          ),
        );
    }
    exports_140("elementAt", elementAt);
    return {
      setters: [
        function (ArgumentOutOfRangeError_ts_3_1) {
          ArgumentOutOfRangeError_ts_3 = ArgumentOutOfRangeError_ts_3_1;
        },
        function (filter_ts_2_1) {
          filter_ts_2 = filter_ts_2_1;
        },
        function (throwIfEmpty_ts_1_1) {
          throwIfEmpty_ts_1 = throwIfEmpty_ts_1_1;
        },
        function (defaultIfEmpty_ts_1_1) {
          defaultIfEmpty_ts_1 = defaultIfEmpty_ts_1_1;
        },
        function (take_ts_1_1) {
          take_ts_1 = take_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/endWith",
  [
    "https://deno.land/x/rxjs/src/internal/observable/concat",
    "https://deno.land/x/rxjs/src/internal/observable/of",
  ],
  function (exports_141, context_141) {
    "use strict";
    var concat_ts_4, of_ts_4;
    var __moduleName = context_141 && context_141.id;
    /* tslint:enable:max-line-length */
    /**
     * Returns an observable that will emit all values from the source, then synchronously emit
     * he provided value(s) immediately after the source completes.
     *
     * NOTE: Passing a last argument of a Scheduler is _deprecated_, and may result in incorrect
     * types in TypeScript.
     *
     * This is useful for knowing when an observable ends. Particularly when paired with an
     * operator like {@link takeUntil}
     *
     * ![](endWith.png)
     *
     * ## Example
     *
     * Emit values to know when an interval starts and stops. The interval will
     * stop when a user clicks anywhere on the document.
     *
     * ```ts
     * import { interval, fromEvent } from 'rxjs.ts';
     * import { map, startWith, takeUntil, endWith } from 'rxjs/operators.ts';
     *
     * const ticker$ = interval(5000).pipe(
     *   map(() => 'tick'),
     * );
     *
     * const documentClicks$ = fromEvent(document, 'click');
     *
     * ticker$.pipe(
     *   startWith('interval started'),
     *   takeUntil(documentClicks$),
     *   endWith('interval ended by click'),
     * )
     * .subscribe(
     *   x = console.log(x);
     * )
     *
     * // Result (assuming a user clicks after 15 seconds)
     * // "interval started"
     * // "tick"
     * // "tick"
     * // "tick"
     * // "interval ended by click"
     * ```
     *
     * @param values - Items you want the modified Observable to emit last.
     *
     * @see startWith
     * @see concat
     * @see takeUntil
     */
    function endWith(...values) {
      return (source) => concat_ts_4.concat(source, of_ts_4.of(...values));
    }
    exports_141("endWith", endWith);
    return {
      setters: [
        function (concat_ts_4_1) {
          concat_ts_4 = concat_ts_4_1;
        },
        function (of_ts_4_1) {
          of_ts_4 = of_ts_4_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/every",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_142, context_142) {
    "use strict";
    var Subscriber_ts_24, EveryOperator, EverySubscriber;
    var __moduleName = context_142 && context_142.id;
    /**
     * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
     *
     * <span class="informal">If all values pass predicate before the source completes, emits true before completion,
     * otherwise emit false, then complete.</span>
     *
     * ![](every.png)
     *
     * ## Example
     * A simple example emitting true if all elements are less than 5, false otherwise
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { every } from 'rxjs/operators.ts';
     *
     *  of(1, 2, 3, 4, 5, 6).pipe(
     *     every(x => x < 5),
     * )
     * .subscribe(x => console.log(x)); // -> false
     * ```
     *
     * @param {function} predicate A function for determining if an item meets a specified condition.
     * @param {any} [thisArg] Optional object to use for `this` in the callback.
     * @return {Observable} An Observable of booleans that determines if all items of the source Observable meet the condition specified.
     * @name every
     */
    function every(predicate, thisArg) {
      return (source) =>
        source.lift(new EveryOperator(predicate, thisArg, source));
    }
    exports_142("every", every);
    return {
      setters: [
        function (Subscriber_ts_24_1) {
          Subscriber_ts_24 = Subscriber_ts_24_1;
        },
      ],
      execute: function () {
        EveryOperator = class EveryOperator {
          constructor(predicate, thisArg, source) {
            this.predicate = predicate;
            this.thisArg = thisArg;
            this.source = source;
          }
          call(observer, source) {
            return source.subscribe(
              new EverySubscriber(
                observer,
                this.predicate,
                this.thisArg,
                this.source,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        EverySubscriber = class EverySubscriber
          extends Subscriber_ts_24.Subscriber {
          constructor(destination, predicate, thisArg, source) {
            super(destination);
            this.predicate = predicate;
            this.thisArg = thisArg;
            this.source = source;
            this.index = 0;
            this.thisArg = thisArg || this;
          }
          notifyComplete(everyValueMatch) {
            this.destination.next(everyValueMatch);
            this.destination.complete();
          }
          _next(value) {
            let result = false;
            try {
              result = this.predicate.call(
                this.thisArg,
                value,
                this.index++,
                this.source,
              );
            } catch (err) {
              this.destination.error(err);
              return;
            }
            if (!result) {
              this.notifyComplete(false);
            }
          }
          _complete() {
            this.notifyComplete(true);
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/exhaust",
  [
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_143, context_143) {
    "use strict";
    var OuterSubscriber_ts_13,
      subscribeToResult_ts_13,
      SwitchFirstOperator,
      SwitchFirstSubscriber;
    var __moduleName = context_143 && context_143.id;
    /**
     * Converts a higher-order Observable into a first-order Observable by dropping
     * inner Observables while the previous inner Observable has not yet completed.
     *
     * <span class="informal">Flattens an Observable-of-Observables by dropping the
     * next inner Observables while the current inner is still executing.</span>
     *
     * ![](exhaust.png)
     *
     * `exhaust` subscribes to an Observable that emits Observables, also known as a
     * higher-order Observable. Each time it observes one of these emitted inner
     * Observables, the output Observable begins emitting the items emitted by that
     * inner Observable. So far, it behaves like {@link mergeAll}. However,
     * `exhaust` ignores every new inner Observable if the previous Observable has
     * not yet completed. Once that one completes, it will accept and flatten the
     * next inner Observable and repeat this process.
     *
     * ## Example
     * Run a finite timer for each click, only if there is no currently active timer
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { exhaust, map, take } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const higherOrder = clicks.pipe(
     *   map((ev) => interval(1000).pipe(take(5))),
     * );
     * const result = higherOrder.pipe(exhaust());
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link combineAll}
     * @see {@link concatAll}
     * @see {@link switchAll}
     * @see {@link switchMap}
     * @see {@link mergeAll}
     * @see {@link exhaustMap}
     * @see {@link zipAll}
     *
     * @return {Observable} An Observable that takes a source of Observables and propagates the first observable
     * exclusively until it completes before subscribing to the next.
     * @name exhaust
     */
    function exhaust() {
      return (source) => source.lift(new SwitchFirstOperator());
    }
    exports_143("exhaust", exhaust);
    return {
      setters: [
        function (OuterSubscriber_ts_13_1) {
          OuterSubscriber_ts_13 = OuterSubscriber_ts_13_1;
        },
        function (subscribeToResult_ts_13_1) {
          subscribeToResult_ts_13 = subscribeToResult_ts_13_1;
        },
      ],
      execute: function () {
        SwitchFirstOperator = class SwitchFirstOperator {
          call(subscriber, source) {
            return source.subscribe(new SwitchFirstSubscriber(subscriber));
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        SwitchFirstSubscriber = class SwitchFirstSubscriber
          extends OuterSubscriber_ts_13.OuterSubscriber {
          constructor(destination) {
            super(destination);
            this.hasCompleted = false;
            this.hasSubscription = false;
          }
          _next(value) {
            if (!this.hasSubscription) {
              this.hasSubscription = true;
              this.add(subscribeToResult_ts_13.subscribeToResult(this, value));
            }
          }
          _complete() {
            this.hasCompleted = true;
            if (!this.hasSubscription) {
              this.destination.complete();
            }
          }
          notifyComplete(innerSub) {
            this.remove(innerSub);
            this.hasSubscription = false;
            if (this.hasCompleted) {
              this.destination.complete();
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/exhaustMap",
  [
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/InnerSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
    "https://deno.land/x/rxjs/src/internal/operators/map",
    "https://deno.land/x/rxjs/src/internal/observable/from",
  ],
  function (exports_144, context_144) {
    "use strict";
    var OuterSubscriber_ts_14,
      InnerSubscriber_ts_4,
      subscribeToResult_ts_14,
      map_ts_7,
      from_ts_9,
      ExhaustMapOperator,
      ExhaustMapSubscriber;
    var __moduleName = context_144 && context_144.id;
    /* tslint:enable:max-line-length */
    /**
     * Projects each source value to an Observable which is merged in the output
     * Observable only if the previous projected Observable has completed.
     *
     * <span class="informal">Maps each value to an Observable, then flattens all of
     * these inner Observables using {@link exhaust}.</span>
     *
     * ![](exhaustMap.png)
     *
     * Returns an Observable that emits items based on applying a function that you
     * supply to each item emitted by the source Observable, where that function
     * returns an (so-called "inner") Observable. When it projects a source value to
     * an Observable, the output Observable begins emitting the items emitted by
     * that projected Observable. However, `exhaustMap` ignores every new projected
     * Observable if the previous projected Observable has not yet completed. Once
     * that one completes, it will accept and flatten the next projected Observable
     * and repeat this process.
     *
     * ## Example
     * Run a finite timer for each click, only if there is no currently active timer
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { exhaustMap, take } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(
     *   exhaustMap(ev => interval(1000).pipe(take(5)))
     * );
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link concatMap}
     * @see {@link exhaust}
     * @see {@link mergeMap}
     * @see {@link switchMap}
     *
     * @param {function(value: T, ?index: number): ObservableInput} project A function
     * that, when applied to an item emitted by the source Observable, returns an
     * Observable.
     * @return {Observable} An Observable containing projected Observables
     * of each item of the source, ignoring projected Observables that start before
     * their preceding Observable has completed.
     * @name exhaustMap
     */
    function exhaustMap(project, resultSelector) {
      if (resultSelector) {
        // DEPRECATED PATH
        return (source) =>
          source.pipe(exhaustMap((a, i) =>
            from_ts_9.from(project(a, i)).pipe(
              map_ts_7.map((b, ii) => resultSelector(a, b, i, ii)),
            )
          ));
      }
      return (source) => source.lift(new ExhaustMapOperator(project));
    }
    exports_144("exhaustMap", exhaustMap);
    return {
      setters: [
        function (OuterSubscriber_ts_14_1) {
          OuterSubscriber_ts_14 = OuterSubscriber_ts_14_1;
        },
        function (InnerSubscriber_ts_4_1) {
          InnerSubscriber_ts_4 = InnerSubscriber_ts_4_1;
        },
        function (subscribeToResult_ts_14_1) {
          subscribeToResult_ts_14 = subscribeToResult_ts_14_1;
        },
        function (map_ts_7_1) {
          map_ts_7 = map_ts_7_1;
        },
        function (from_ts_9_1) {
          from_ts_9 = from_ts_9_1;
        },
      ],
      execute: function () {
        ExhaustMapOperator = class ExhaustMapOperator {
          constructor(project) {
            this.project = project;
          }
          call(subscriber, source) {
            return source.subscribe(
              new ExhaustMapSubscriber(subscriber, this.project),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        ExhaustMapSubscriber = class ExhaustMapSubscriber
          extends OuterSubscriber_ts_14.OuterSubscriber {
          constructor(destination, project) {
            super(destination);
            this.project = project;
            this.hasSubscription = false;
            this.hasCompleted = false;
            this.index = 0;
          }
          _next(value) {
            if (!this.hasSubscription) {
              this.tryNext(value);
            }
          }
          tryNext(value) {
            let result;
            const index = this.index++;
            try {
              result = this.project(value, index);
            } catch (err) {
              this.destination.error(err);
              return;
            }
            this.hasSubscription = true;
            this._innerSub(result, value, index);
          }
          _innerSub(result, value, index) {
            const innerSubscriber = new InnerSubscriber_ts_4.InnerSubscriber(
              this,
              value,
              index,
            );
            const destination = this.destination;
            destination.add(innerSubscriber);
            subscribeToResult_ts_14.subscribeToResult(
              this,
              result,
              undefined,
              undefined,
              innerSubscriber,
            );
          }
          _complete() {
            this.hasCompleted = true;
            if (!this.hasSubscription) {
              this.destination.complete();
            }
            this.unsubscribe();
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.destination.next(innerValue);
          }
          notifyError(err) {
            this.destination.error(err);
          }
          notifyComplete(innerSub) {
            const destination = this.destination;
            destination.remove(innerSub);
            this.hasSubscription = false;
            if (this.hasCompleted) {
              this.destination.complete();
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/expand",
  [
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_145, context_145) {
    "use strict";
    var OuterSubscriber_ts_15,
      subscribeToResult_ts_15,
      ExpandOperator,
      ExpandSubscriber;
    var __moduleName = context_145 && context_145.id;
    /* tslint:enable:max-line-length */
    /**
     * Recursively projects each source value to an Observable which is merged in
     * the output Observable.
     *
     * <span class="informal">It's similar to {@link mergeMap}, but applies the
     * projection function to every source value as well as every output value.
     * It's recursive.</span>
     *
     * ![](expand.png)
     *
     * Returns an Observable that emits items based on applying a function that you
     * supply to each item emitted by the source Observable, where that function
     * returns an Observable, and then merging those resulting Observables and
     * emitting the results of this merger. *Expand* will re-emit on the output
     * Observable every source value. Then, each output value is given to the
     * `project` function which returns an inner Observable to be merged on the
     * output Observable. Those output values resulting from the projection are also
     * given to the `project` function to produce new output values. This is how
     * *expand* behaves recursively.
     *
     * ## Example
     * Start emitting the powers of two on every click, at most 10 of them
     * ```ts
     * import { fromEvent, of } from 'rxjs.ts';
     * import { expand, mapTo, delay, take } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const powersOfTwo = clicks.pipe(
     *   mapTo(1),
     *   expand(x => of(2 * x).pipe(delay(1000))),
     *   take(10),
     * );
     * powersOfTwo.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link mergeMap}
     * @see {@link mergeScan}
     *
     * @param {function(value: T, index: number) => Observable} project A function
     * that, when applied to an item emitted by the source or the output Observable,
     * returns an Observable.
     * @param {number} [concurrent=Infinity] Maximum number of input
     * Observables being subscribed to concurrently.
     * @param {SchedulerLike} [scheduler=null] The {@link SchedulerLike} to use for subscribing to
     * each projected inner Observable.
     * @return {Observable} An Observable that emits the source values and also
     * result of applying the projection function to each value emitted on the
     * output Observable and merging the results of the Observables obtained
     * from this transformation.
     * @name expand
     */
    function expand(project, concurrent = Infinity, scheduler) {
      concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
      return (source) =>
        source.lift(new ExpandOperator(project, concurrent, scheduler));
    }
    exports_145("expand", expand);
    return {
      setters: [
        function (OuterSubscriber_ts_15_1) {
          OuterSubscriber_ts_15 = OuterSubscriber_ts_15_1;
        },
        function (subscribeToResult_ts_15_1) {
          subscribeToResult_ts_15 = subscribeToResult_ts_15_1;
        },
      ],
      execute: function () {
        ExpandOperator = class ExpandOperator {
          constructor(project, concurrent, scheduler) {
            this.project = project;
            this.concurrent = concurrent;
            this.scheduler = scheduler;
          }
          call(subscriber, source) {
            return source.subscribe(
              new ExpandSubscriber(
                subscriber,
                this.project,
                this.concurrent,
                this.scheduler,
              ),
            );
          }
        };
        exports_145("ExpandOperator", ExpandOperator);
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        ExpandSubscriber = class ExpandSubscriber
          extends OuterSubscriber_ts_15.OuterSubscriber {
          constructor(destination, project, concurrent, scheduler) {
            super(destination);
            this.project = project;
            this.concurrent = concurrent;
            this.scheduler = scheduler;
            this.index = 0;
            this.active = 0;
            this.hasCompleted = false;
            if (concurrent < Infinity) {
              this.buffer = [];
            }
          }
          static dispatch(arg) {
            const { subscriber, result, value, index } = arg;
            subscriber.subscribeToProjection(result, value, index);
          }
          _next(value) {
            const destination = this.destination;
            if (destination.closed) {
              this._complete();
              return;
            }
            const index = this.index++;
            if (this.active < this.concurrent) {
              destination.next(value);
              try {
                const { project } = this;
                const result = project(value, index);
                if (!this.scheduler) {
                  this.subscribeToProjection(result, value, index);
                } else {
                  const state = { subscriber: this, result, value, index };
                  const destination = this.destination;
                  destination.add(
                    this.scheduler.schedule(
                      ExpandSubscriber.dispatch,
                      0,
                      state,
                    ),
                  );
                }
              } catch (e) {
                destination.error(e);
              }
            } else {
              this.buffer.push(value);
            }
          }
          subscribeToProjection(result, value, index) {
            this.active++;
            const destination = this.destination;
            destination.add(
              subscribeToResult_ts_15.subscribeToResult(
                this,
                result,
                value,
                index,
              ),
            );
          }
          _complete() {
            this.hasCompleted = true;
            if (this.hasCompleted && this.active === 0) {
              this.destination.complete();
            }
            this.unsubscribe();
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this._next(innerValue);
          }
          notifyComplete(innerSub) {
            const buffer = this.buffer;
            const destination = this.destination;
            destination.remove(innerSub);
            this.active--;
            if (buffer && buffer.length > 0) {
              this._next(buffer.shift());
            }
            if (this.hasCompleted && this.active === 0) {
              this.destination.complete();
            }
          }
        };
        exports_145("ExpandSubscriber", ExpandSubscriber);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/finalize",
  [],
  function (exports_146, context_146) {
    "use strict";
    var FinallyOperator;
    var __moduleName = context_146 && context_146.id;
    /**
     * Returns an Observable that mirrors the source Observable, but will call a specified function when
     * the source terminates on complete or error.
     * The specified function will also be called when the subscriber explicitly unsubscribes.
     *
     * ## Examples
     * Execute callback function when the observable completes
     *
     * ```ts
     * import { interval } from 'rxjs.ts';
     * import { take, finalize } from 'rxjs/operators.ts';
     *
     * // emit value in sequence every 1 second
     * const source = interval(1000);
     * const example = source.pipe(
     *   take(5), //take only the first 5 values
     *   finalize(() => console.log('Sequence complete')) // Execute when the observable completes
     * )
     * const subscribe = example.subscribe(val => console.log(val));
     *
     * // results:
     * //   0
     * //   1
     * //   2
     * //   3
     * //   4
     * //   'Sequence complete'
     * ```
     *
     * Execute callback function when the subscriber explicitly unsubscribes
     *
     * ```ts
     * import { interval, timer, noop } from 'rxjs.ts';
     * import { finalize, tap } from 'rxjs/operators.ts';
     *
     * const source = interval(100).pipe(
     *   finalize(() => console.log('[finalize] Called')),
     *    tap(() => console.log('[next] Called'),
     *      () => console.log('[error] Not called'),
     *      () => console.log('[tap] Not called')),
     * );
     *
     * const sub = source.subscribe(x => console.log(x), noop, () => console.log('[complete] Not called'));
     *
     * timer(150).subscribe(() => sub.unsubscribe());
     *
     * // results:
     * //   0
     * //   '[finalize] Called'
     * ```
     *
     * @param {function} callback Function to be called when source terminates.
     * @return {Observable} An Observable that mirrors the source, but will call the specified function on termination.
     * @name finally
     */
    function finalize(callback) {
      return (source) => source.lift(new FinallyOperator(callback));
    }
    exports_146("finalize", finalize);
    return {
      setters: [],
      execute: function () {
        FinallyOperator = class FinallyOperator {
          constructor(callback) {
            this.callback = callback;
          }
          call(subscriber, source) {
            const subscription = source.subscribe(subscriber);
            subscription.add(this.callback);
            return subscription;
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/find",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_147, context_147) {
    "use strict";
    var Subscriber_ts_25, FindValueOperator, FindValueSubscriber;
    var __moduleName = context_147 && context_147.id;
    /**
     * Emits only the first value emitted by the source Observable that meets some
     * condition.
     *
     * <span class="informal">Finds the first value that passes some test and emits
     * that.</span>
     *
     * ![](find.png)
     *
     * `find` searches for the first item in the source Observable that matches the
     * specified condition embodied by the `predicate`, and returns the first
     * occurrence in the source. Unlike {@link first}, the `predicate` is required
     * in `find`, and does not emit an error if a valid value is not found.
     *
     * ## Example
     * Find and emit the first click that happens on a DIV element
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { find } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(find(ev => ev.target.tagName === 'DIV'));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link filter}
     * @see {@link first}
     * @see {@link findIndex}
     * @see {@link take}
     *
     * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
     * A function called with each item to test for condition matching.
     * @param {any} [thisArg] An optional argument to determine the value of `this`
     * in the `predicate` function.
     * @return {Observable<T>} An Observable of the first item that matches the
     * condition.
     * @name find
     */
    function find(predicate, thisArg) {
      if (typeof predicate !== "function") {
        throw new TypeError("predicate is not a function");
      }
      return (source) =>
        source.lift(new FindValueOperator(predicate, source, false, thisArg));
    }
    exports_147("find", find);
    return {
      setters: [
        function (Subscriber_ts_25_1) {
          Subscriber_ts_25 = Subscriber_ts_25_1;
        },
      ],
      execute: function () {
        FindValueOperator = class FindValueOperator {
          constructor(predicate, source, yieldIndex, thisArg) {
            this.predicate = predicate;
            this.source = source;
            this.yieldIndex = yieldIndex;
            this.thisArg = thisArg;
          }
          call(observer, source) {
            return source.subscribe(
              new FindValueSubscriber(
                observer,
                this.predicate,
                this.source,
                this.yieldIndex,
                this.thisArg,
              ),
            );
          }
        };
        exports_147("FindValueOperator", FindValueOperator);
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        FindValueSubscriber = class FindValueSubscriber
          extends Subscriber_ts_25.Subscriber {
          constructor(destination, predicate, source, yieldIndex, thisArg) {
            super(destination);
            this.predicate = predicate;
            this.source = source;
            this.yieldIndex = yieldIndex;
            this.thisArg = thisArg;
            this.index = 0;
          }
          notifyComplete(value) {
            const destination = this.destination;
            destination.next(value);
            destination.complete();
            this.unsubscribe();
          }
          _next(value) {
            const { predicate, thisArg } = this;
            const index = this.index++;
            try {
              const result = predicate.call(
                thisArg || this,
                value,
                index,
                this.source,
              );
              if (result) {
                this.notifyComplete(this.yieldIndex ? index : value);
              }
            } catch (err) {
              this.destination.error(err);
            }
          }
          _complete() {
            this.notifyComplete(this.yieldIndex ? -1 : undefined);
          }
        };
        exports_147("FindValueSubscriber", FindValueSubscriber);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/findIndex",
  ["https://deno.land/x/rxjs/src/internal/operators/find"],
  function (exports_148, context_148) {
    "use strict";
    var find_ts_1;
    var __moduleName = context_148 && context_148.id;
    /**
     * Emits only the index of the first value emitted by the source Observable that
     * meets some condition.
     *
     * <span class="informal">It's like {@link find}, but emits the index of the
     * found value, not the value itself.</span>
     *
     * ![](findIndex.png)
     *
     * `findIndex` searches for the first item in the source Observable that matches
     * the specified condition embodied by the `predicate`, and returns the
     * (zero-based) index of the first occurrence in the source. Unlike
     * {@link first}, the `predicate` is required in `findIndex`, and does not emit
     * an error if a valid value is not found.
     *
     * ## Example
     * Emit the index of first click that happens on a DIV element
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { findIndex } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(findIndex(ev => ev.target.tagName === 'DIV'));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link filter}
     * @see {@link find}
     * @see {@link first}
     * @see {@link take}
     *
     * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
     * A function called with each item to test for condition matching.
     * @param {any} [thisArg] An optional argument to determine the value of `this`
     * in the `predicate` function.
     * @return {Observable} An Observable of the index of the first item that
     * matches the condition.
     * @name find
     */
    function findIndex(predicate, thisArg) {
      return (source) =>
        source.lift(
          new find_ts_1.FindValueOperator(predicate, source, true, thisArg),
        );
    }
    exports_148("findIndex", findIndex);
    return {
      setters: [
        function (find_ts_1_1) {
          find_ts_1 = find_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/first",
  [
    "https://deno.land/x/rxjs/src/internal/util/EmptyError",
    "https://deno.land/x/rxjs/src/internal/operators/filter",
    "https://deno.land/x/rxjs/src/internal/operators/take",
    "https://deno.land/x/rxjs/src/internal/operators/defaultIfEmpty",
    "https://deno.land/x/rxjs/src/internal/operators/throwIfEmpty",
    "https://deno.land/x/rxjs/src/internal/util/identity",
  ],
  function (exports_149, context_149) {
    "use strict";
    var EmptyError_ts_5,
      filter_ts_3,
      take_ts_2,
      defaultIfEmpty_ts_2,
      throwIfEmpty_ts_2,
      identity_ts_5;
    var __moduleName = context_149 && context_149.id;
    /* tslint:enable:max-line-length */
    /**
     * Emits only the first value (or the first value that meets some condition)
     * emitted by the source Observable.
     *
     * <span class="informal">Emits only the first value. Or emits only the first
     * value that passes some test.</span>
     *
     * ![](first.png)
     *
     * If called with no arguments, `first` emits the first value of the source
     * Observable, then completes. If called with a `predicate` function, `first`
     * emits the first value of the source that matches the specified condition. It
     * may also take a deprecated `resultSelector` function to produce the output
     * value from the input value, and a `defaultValue` to emit in case the source
     * completes before it is able to emit a valid value. Throws an error if
     * `defaultValue` was not provided and a matching element is not found.
     *
     * ## Examples
     * Emit only the first click that happens on the DOM
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { first } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(first());
     * result.subscribe(x => console.log(x));
     * ```
     *
     * Emits the first click that happens on a DIV
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { first } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(first(ev => ev.target.tagName === 'DIV'));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link filter}
     * @see {@link find}
     * @see {@link take}
     *
     * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
     * callback if the Observable completes before any `next` notification was sent.
     * This is how `first()` is different from {@link take}(1) which completes instead.
     *
     * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
     * An optional function called with each item to test for condition matching.
     * @param {R} [defaultValue] The default value emitted in case no valid value
     * was found on the source.
     * @return {Observable<T|R>} An Observable of the first item that matches the
     * condition.
     * @name first
     */
    function first(predicate, defaultValue) {
      const hasDefaultValue = arguments.length >= 2;
      return (source) =>
        source.pipe(
          predicate
            ? filter_ts_3.filter((v, i) => predicate(v, i, source))
            : identity_ts_5.identity,
          take_ts_2.take(1),
          hasDefaultValue ? defaultIfEmpty_ts_2.defaultIfEmpty(defaultValue)
          : throwIfEmpty_ts_2.throwIfEmpty(() =>
            new EmptyError_ts_5.EmptyError()
          ),
        );
    }
    exports_149("first", first);
    return {
      setters: [
        function (EmptyError_ts_5_1) {
          EmptyError_ts_5 = EmptyError_ts_5_1;
        },
        function (filter_ts_3_1) {
          filter_ts_3 = filter_ts_3_1;
        },
        function (take_ts_2_1) {
          take_ts_2 = take_ts_2_1;
        },
        function (defaultIfEmpty_ts_2_1) {
          defaultIfEmpty_ts_2 = defaultIfEmpty_ts_2_1;
        },
        function (throwIfEmpty_ts_2_1) {
          throwIfEmpty_ts_2 = throwIfEmpty_ts_2_1;
        },
        function (identity_ts_5_1) {
          identity_ts_5 = identity_ts_5_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/ignoreElements",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_150, context_150) {
    "use strict";
    var Subscriber_ts_26, IgnoreElementsOperator, IgnoreElementsSubscriber;
    var __moduleName = context_150 && context_150.id;
    /**
     * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
     *
     * ![](ignoreElements.png)
     *
     * The _IgnoreElements_ operator suppresses all of the items emitted by the source Observable,
     * but allows its termination notification (either `error` or `complete`) to pass through unchanged.
     *
     * If you do not care about the items being emitted by an Observable, but you do want to be notified
     * when it completes or when it terminates with an error, you can apply the `ignoreElements` operator
     * to the Observable, which will ensure that it will never call its observers’ `next` handlers.
     *
     * ## Examples
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { ignoreElements } from 'rxjs/operators.ts';
     *
     * of('you', 'talking', 'to', 'me').pipe(
     *   ignoreElements(),
     * )
     * .subscribe(
     *   word => console.log(word),
     *   err => console.log('error:', err),
     *   () => console.log('the end'),
     * );
     * // result:
     * // 'the end'
     * ```
     * @return {Observable} An empty Observable that only calls `complete`
     * or `error`, based on which one is called by the source Observable.
     * @name ignoreElements
     */
    function ignoreElements() {
      return function ignoreElementsOperatorFunction(source) {
        return source.lift(new IgnoreElementsOperator());
      };
    }
    exports_150("ignoreElements", ignoreElements);
    return {
      setters: [
        function (Subscriber_ts_26_1) {
          Subscriber_ts_26 = Subscriber_ts_26_1;
        },
      ],
      execute: function () {
        IgnoreElementsOperator = class IgnoreElementsOperator {
          call(subscriber, source) {
            return source.subscribe(new IgnoreElementsSubscriber(subscriber));
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        IgnoreElementsSubscriber = class IgnoreElementsSubscriber
          extends Subscriber_ts_26.Subscriber {
          _next(unused) {
            // Do nothing
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/isEmpty",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_151, context_151) {
    "use strict";
    var Subscriber_ts_27, IsEmptyOperator, IsEmptySubscriber;
    var __moduleName = context_151 && context_151.id;
    /**
     * Emits `false` if the input Observable emits any values, or emits `true` if the
     * input Observable completes without emitting any values.
     *
     * <span class="informal">Tells whether any values are emitted by an Observable.</span>
     *
     * ![](isEmpty.png)
     *
     * `isEmpty` transforms an Observable that emits values into an Observable that
     * emits a single boolean value representing whether or not any values were
     * emitted by the source Observable. As soon as the source Observable emits a
     * value, `isEmpty` will emit a `false` and complete.  If the source Observable
     * completes having not emitted anything, `isEmpty` will emit a `true` and
     * complete.
     *
     * A similar effect could be achieved with {@link count}, but `isEmpty` can emit
     * a `false` value sooner.
     *
     * ## Examples
     *
     * Emit `false` for a non-empty Observable.
     *
     * ```ts
     * import { Subject } from 'rxjs.ts';
     * import { isEmpty } from 'rxjs/operators.ts';
     *
     * const source = new Subject<string>();
     * const result = source.pipe(isEmpty());
     *
     * source.subscribe(x => console.log(x));
     * result.subscribe(x => console.log(x));
     *
     * source.next('a');
     * source.next('b');
     * source.next('c');
     * source.complete();
     *
     * // Outputs
     * // a
     * // false
     * // b
     * // c
     * ```
     *
     * Emit `true` for an empty Observable.
     *
     * ```ts
     * import { EMPTY } from 'rxjs.ts';
     * import { isEmpty } from 'rxjs/operators.ts';
     *
     * const result = EMPTY.pipe(isEmpty());
     * result.subscribe(x => console.log(x));
     *
     * // Outputs
     * // true
     * ```
     *
     * @see {@link count}
     * @see {@link index/EMPTY}
     *
     * @return {OperatorFunction<T, boolean>} An Observable of a boolean value indicating whether observable was empty or not.
     * @name isEmpty
     */
    function isEmpty() {
      return (source) => source.lift(new IsEmptyOperator());
    }
    exports_151("isEmpty", isEmpty);
    return {
      setters: [
        function (Subscriber_ts_27_1) {
          Subscriber_ts_27 = Subscriber_ts_27_1;
        },
      ],
      execute: function () {
        IsEmptyOperator = class IsEmptyOperator {
          call(observer, source) {
            return source.subscribe(new IsEmptySubscriber(observer));
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        IsEmptySubscriber = class IsEmptySubscriber
          extends Subscriber_ts_27.Subscriber {
          constructor(destination) {
            super(destination);
          }
          notifyComplete(isEmpty) {
            const destination = this.destination;
            destination.next(isEmpty);
            destination.complete();
          }
          _next(value) {
            this.notifyComplete(false);
          }
          _complete() {
            this.notifyComplete(true);
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/takeLast",
  [
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/util/ArgumentOutOfRangeError",
    "https://deno.land/x/rxjs/src/internal/observable/empty",
  ],
  function (exports_152, context_152) {
    "use strict";
    var Subscriber_ts_28,
      ArgumentOutOfRangeError_ts_4,
      empty_ts_8,
      TakeLastOperator,
      TakeLastSubscriber;
    var __moduleName = context_152 && context_152.id;
    /**
     * Emits only the last `count` values emitted by the source Observable.
     *
     * <span class="informal">Remembers the latest `count` values, then emits those
     * only when the source completes.</span>
     *
     * ![](takeLast.png)
     *
     * `takeLast` returns an Observable that emits at most the last `count` values
     * emitted by the source Observable. If the source emits fewer than `count`
     * values then all of its values are emitted. This operator must wait until the
     * `complete` notification emission from the source in order to emit the `next`
     * values on the output Observable, because otherwise it is impossible to know
     * whether or not more values will be emitted on the source. For this reason,
     * all values are emitted synchronously, followed by the complete notification.
     *
     * ## Example
     * Take the last 3 values of an Observable with many values
     * ```ts
     * import { range } from 'rxjs.ts';
     * import { takeLast } from 'rxjs/operators.ts';
     *
     * const many = range(1, 100);
     * const lastThree = many.pipe(takeLast(3));
     * lastThree.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link take}
     * @see {@link takeUntil}
     * @see {@link takeWhile}
     * @see {@link skip}
     *
     * @throws {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an
     * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
     * @throws {TypeError} If the count is not provided or is not a number.
     *
     * @param count The maximum number of values to emit from the end of
     * the sequence of values emitted by the source Observable.
     * @return An Observable that emits at most the last count
     * values emitted by the source Observable.
     */
    function takeLast(count) {
      if (isNaN(count)) {
        throw new TypeError(`'count' is not a number`);
      }
      if (count < 0) {
        throw new ArgumentOutOfRangeError_ts_4.ArgumentOutOfRangeError();
      }
      return function takeLastOperatorFunction(source) {
        if (count === 0) {
          return empty_ts_8.EMPTY;
        } else {
          return source.lift(new TakeLastOperator(count));
        }
      };
    }
    exports_152("takeLast", takeLast);
    return {
      setters: [
        function (Subscriber_ts_28_1) {
          Subscriber_ts_28 = Subscriber_ts_28_1;
        },
        function (ArgumentOutOfRangeError_ts_4_1) {
          ArgumentOutOfRangeError_ts_4 = ArgumentOutOfRangeError_ts_4_1;
        },
        function (empty_ts_8_1) {
          empty_ts_8 = empty_ts_8_1;
        },
      ],
      execute: function () {
        TakeLastOperator = class TakeLastOperator {
          constructor(total) {
            this.total = total;
          }
          call(subscriber, source) {
            return source.subscribe(
              new TakeLastSubscriber(subscriber, this.total),
            );
          }
        };
        TakeLastSubscriber = class TakeLastSubscriber
          extends Subscriber_ts_28.Subscriber {
          constructor(destination, total) {
            super(destination);
            this.total = total;
            this.ring = new Array();
            this.count = 0;
          }
          _next(value) {
            const ring = this.ring;
            const total = this.total;
            const count = this.count++;
            if (ring.length < total) {
              ring.push(value);
            } else {
              const index = count % total;
              ring[index] = value;
            }
          }
          _complete() {
            const destination = this.destination;
            let count = this.count;
            if (count > 0) {
              const total = this.count >= this.total ? this.total : this.count;
              const ring = this.ring;
              for (let i = 0; i < total; i++) {
                const idx = (count++) % total;
                destination.next(ring[idx]);
              }
            }
            destination.complete();
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/last",
  [
    "https://deno.land/x/rxjs/src/internal/util/EmptyError",
    "https://deno.land/x/rxjs/src/internal/operators/filter",
    "https://deno.land/x/rxjs/src/internal/operators/takeLast",
    "https://deno.land/x/rxjs/src/internal/operators/throwIfEmpty",
    "https://deno.land/x/rxjs/src/internal/operators/defaultIfEmpty",
    "https://deno.land/x/rxjs/src/internal/util/identity",
  ],
  function (exports_153, context_153) {
    "use strict";
    var EmptyError_ts_6,
      filter_ts_4,
      takeLast_ts_1,
      throwIfEmpty_ts_3,
      defaultIfEmpty_ts_3,
      identity_ts_6;
    var __moduleName = context_153 && context_153.id;
    /* tslint:enable:max-line-length */
    /**
     * Returns an Observable that emits only the last item emitted by the source Observable.
     * It optionally takes a predicate function as a parameter, in which case, rather than emitting
     * the last item from the source Observable, the resulting Observable will emit the last item
     * from the source Observable that satisfies the predicate.
     *
     * ![](last.png)
     *
     * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
     * callback if the Observable completes before any `next` notification was sent.
     * @param {function} [predicate] - The condition any source emitted item has to satisfy.
     * @param {any} [defaultValue] - An optional default value to provide if last
     * predicate isn't met or no values were emitted.
     * @return {Observable} An Observable that emits only the last item satisfying the given condition
     * from the source, or an NoSuchElementException if no such items are emitted.
     * @throws - Throws if no items that match the predicate are emitted by the source Observable.
     */
    function last(predicate, defaultValue) {
      const hasDefaultValue = arguments.length >= 2;
      return (source) =>
        source.pipe(
          predicate
            ? filter_ts_4.filter((v, i) => predicate(v, i, source))
            : identity_ts_6.identity,
          takeLast_ts_1.takeLast(1),
          hasDefaultValue ? defaultIfEmpty_ts_3.defaultIfEmpty(defaultValue)
          : throwIfEmpty_ts_3.throwIfEmpty(() =>
            new EmptyError_ts_6.EmptyError()
          ),
        );
    }
    exports_153("last", last);
    return {
      setters: [
        function (EmptyError_ts_6_1) {
          EmptyError_ts_6 = EmptyError_ts_6_1;
        },
        function (filter_ts_4_1) {
          filter_ts_4 = filter_ts_4_1;
        },
        function (takeLast_ts_1_1) {
          takeLast_ts_1 = takeLast_ts_1_1;
        },
        function (throwIfEmpty_ts_3_1) {
          throwIfEmpty_ts_3 = throwIfEmpty_ts_3_1;
        },
        function (defaultIfEmpty_ts_3_1) {
          defaultIfEmpty_ts_3 = defaultIfEmpty_ts_3_1;
        },
        function (identity_ts_6_1) {
          identity_ts_6 = identity_ts_6_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/mapTo",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_154, context_154) {
    "use strict";
    var Subscriber_ts_29, MapToOperator, MapToSubscriber;
    var __moduleName = context_154 && context_154.id;
    /**
     * Emits the given constant value on the output Observable every time the source
     * Observable emits a value.
     *
     * <span class="informal">Like {@link map}, but it maps every source value to
     * the same output value every time.</span>
     *
     * ![](mapTo.png)
     *
     * Takes a constant `value` as argument, and emits that whenever the source
     * Observable emits a value. In other words, ignores the actual source value,
     * and simply uses the emission moment to know when to emit the given `value`.
     *
     * ## Example
     * Map every click to the string 'Hi'
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { mapTo } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const greetings = clicks.pipe(mapTo('Hi'));
     * greetings.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link map}
     *
     * @param {any} value The value to map each source value to.
     * @return {Observable} An Observable that emits the given `value` every time
     * the source Observable emits something.
     * @name mapTo
     */
    function mapTo(value) {
      return (source) => source.lift(new MapToOperator(value));
    }
    exports_154("mapTo", mapTo);
    return {
      setters: [
        function (Subscriber_ts_29_1) {
          Subscriber_ts_29 = Subscriber_ts_29_1;
        },
      ],
      execute: function () {
        MapToOperator = class MapToOperator {
          constructor(value) {
            this.value = value;
          }
          call(subscriber, source) {
            return source.subscribe(
              new MapToSubscriber(subscriber, this.value),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        MapToSubscriber = class MapToSubscriber
          extends Subscriber_ts_29.Subscriber {
          constructor(destination, value) {
            super(destination);
            this.value = value;
          }
          _next(x) {
            this.destination.next(this.value);
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/materialize",
  [
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/Notification",
  ],
  function (exports_155, context_155) {
    "use strict";
    var Subscriber_ts_30,
      Notification_ts_3,
      MaterializeOperator,
      MaterializeSubscriber;
    var __moduleName = context_155 && context_155.id;
    /**
     * Represents all of the notifications from the source Observable as `next`
     * emissions marked with their original types within {@link Notification}
     * objects.
     *
     * <span class="informal">Wraps `next`, `error` and `complete` emissions in
     * {@link Notification} objects, emitted as `next` on the output Observable.
     * </span>
     *
     * ![](materialize.png)
     *
     * `materialize` returns an Observable that emits a `next` notification for each
     * `next`, `error`, or `complete` emission of the source Observable. When the
     * source Observable emits `complete`, the output Observable will emit `next` as
     * a Notification of type "complete", and then it will emit `complete` as well.
     * When the source Observable emits `error`, the output will emit `next` as a
     * Notification of type "error", and then `complete`.
     *
     * This operator is useful for producing metadata of the source Observable, to
     * be consumed as `next` emissions. Use it in conjunction with
     * {@link dematerialize}.
     *
     * ## Example
     * Convert a faulty Observable to an Observable of Notifications
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { materialize, map } from 'rxjs/operators.ts';
     *
     * const letters = of('a', 'b', 13, 'd');
     * const upperCase = letters.pipe(map(x => x.toUpperCase()));
     * const materialized = upperCase.pipe(materialize());
     * materialized.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // - Notification {kind: "N", value: "A", error: undefined, hasValue: true}
     * // - Notification {kind: "N", value: "B", error: undefined, hasValue: true}
     * // - Notification {kind: "E", value: undefined, error: TypeError:
     * //   x.toUpperCase is not a function at MapSubscriber.letters.map.x
     * //   [as project] (http://1…, hasValue: false}
     * ```
     *
     * @see {@link Notification}
     * @see {@link dematerialize}
     *
     * @return {Observable<Notification<T>>} An Observable that emits
     * {@link Notification} objects that wrap the original emissions from the source
     * Observable with metadata.
     * @name materialize
     */
    function materialize() {
      return function materializeOperatorFunction(source) {
        return source.lift(new MaterializeOperator());
      };
    }
    exports_155("materialize", materialize);
    return {
      setters: [
        function (Subscriber_ts_30_1) {
          Subscriber_ts_30 = Subscriber_ts_30_1;
        },
        function (Notification_ts_3_1) {
          Notification_ts_3 = Notification_ts_3_1;
        },
      ],
      execute: function () {
        MaterializeOperator = class MaterializeOperator {
          call(subscriber, source) {
            return source.subscribe(new MaterializeSubscriber(subscriber));
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        MaterializeSubscriber = class MaterializeSubscriber
          extends Subscriber_ts_30.Subscriber {
          constructor(destination) {
            super(destination);
          }
          _next(value) {
            this.destination.next(
              Notification_ts_3.Notification.createNext(value),
            );
          }
          _error(err) {
            const destination = this.destination;
            destination.next(Notification_ts_3.Notification.createError(err));
            destination.complete();
          }
          _complete() {
            const destination = this.destination;
            destination.next(Notification_ts_3.Notification.createComplete());
            destination.complete();
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/scan",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_156, context_156) {
    "use strict";
    var Subscriber_ts_31, ScanOperator, ScanSubscriber;
    var __moduleName = context_156 && context_156.id;
    /* tslint:enable:max-line-length */
    /**
     * Applies an accumulator function over the source Observable, and returns each
     * intermediate result, with an optional seed value.
     *
     * <span class="informal">It's like {@link reduce}, but emits the current
     * accumulation whenever the source emits a value.</span>
     *
     * ![](scan.png)
     *
     * Combines together all values emitted on the source, using an accumulator
     * function that knows how to join a new source value into the accumulation from
     * the past. Is similar to {@link reduce}, but emits the intermediate
     * accumulations.
     *
     * Returns an Observable that applies a specified `accumulator` function to each
     * item emitted by the source Observable. If a `seed` value is specified, then
     * that value will be used as the initial value for the accumulator. If no seed
     * value is specified, the first item of the source is used as the seed.
     *
     * ## Example
     * Count the number of click events
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { scan, mapTo } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const ones = clicks.pipe(mapTo(1));
     * const seed = 0;
     * const count = ones.pipe(scan((acc, one) => acc + one, seed));
     * count.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link expand}
     * @see {@link mergeScan}
     * @see {@link reduce}
     *
     * @param {function(acc: A, value: V, index: number): A} accumulator
     * The accumulator function called on each source value.
     * @param {V|A} [seed] The initial accumulation value.
     * @return {Observable<A>} An observable of the accumulated values.
     * @name scan
     */
    function scan(accumulator, seed) {
      let hasSeed = false;
      // providing a seed of `undefined` *should* be valid and trigger
      // hasSeed! so don't use `seed !== undefined` checks!
      // For this reason, we have to check it here at the original call site
      // otherwise inside Operator/Subscriber we won't know if `undefined`
      // means they didn't provide anything or if they literally provided `undefined`
      if (arguments.length >= 2) {
        hasSeed = true;
      }
      return function scanOperatorFunction(source) {
        return source.lift(new ScanOperator(accumulator, seed, hasSeed));
      };
    }
    exports_156("scan", scan);
    return {
      setters: [
        function (Subscriber_ts_31_1) {
          Subscriber_ts_31 = Subscriber_ts_31_1;
        },
      ],
      execute: function () {
        ScanOperator = class ScanOperator {
          constructor(accumulator, seed, hasSeed = false) {
            this.accumulator = accumulator;
            this.seed = seed;
            this.hasSeed = hasSeed;
          }
          call(subscriber, source) {
            return source.subscribe(
              new ScanSubscriber(
                subscriber,
                this.accumulator,
                this.seed,
                this.hasSeed,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        ScanSubscriber = class ScanSubscriber
          extends Subscriber_ts_31.Subscriber {
          constructor(destination, accumulator, _state, _hasState) {
            super(destination);
            this.accumulator = accumulator;
            this._state = _state;
            this._hasState = _hasState;
            this.index = 0;
          }
          _next(value) {
            const { destination } = this;
            if (!this._hasState) {
              this._state = value;
              this._hasState = true;
              destination.next(value);
            } else {
              const index = this.index++;
              let result;
              try {
                result = this.accumulator(this._state, value, index);
              } catch (err) {
                destination.error(err);
                return;
              }
              this._state = result;
              destination.next(result);
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/reduce",
  [
    "https://deno.land/x/rxjs/src/internal/operators/scan",
    "https://deno.land/x/rxjs/src/internal/operators/takeLast",
    "https://deno.land/x/rxjs/src/internal/operators/defaultIfEmpty",
    "https://deno.land/x/rxjs/src/internal/util/pipe",
  ],
  function (exports_157, context_157) {
    "use strict";
    var scan_ts_1, takeLast_ts_2, defaultIfEmpty_ts_4, pipe_ts_3;
    var __moduleName = context_157 && context_157.id;
    /* tslint:enable:max-line-length */
    /**
     * Applies an accumulator function over the source Observable, and returns the
     * accumulated result when the source completes, given an optional seed value.
     *
     * <span class="informal">Combines together all values emitted on the source,
     * using an accumulator function that knows how to join a new source value into
     * the accumulation from the past.</span>
     *
     * ![](reduce.png)
     *
     * Like
     * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
     * `reduce` applies an `accumulator` function against an accumulation and each
     * value of the source Observable (from the past) to reduce it to a single
     * value, emitted on the output Observable. Note that `reduce` will only emit
     * one value, only when the source Observable completes. It is equivalent to
     * applying operator {@link scan} followed by operator {@link last}.
     *
     * Returns an Observable that applies a specified `accumulator` function to each
     * item emitted by the source Observable. If a `seed` value is specified, then
     * that value will be used as the initial value for the accumulator. If no seed
     * value is specified, the first item of the source is used as the seed.
     *
     * ## Example
     * Count the number of click events that happened in 5 seconds
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { reduce, takeUntil, mapTo } from 'rxjs/operators.ts';
     *
     * const clicksInFiveSeconds = fromEvent(document, 'click').pipe(
     *   takeUntil(interval(5000)),
     * );
     * const ones = clicksInFiveSeconds.pipe(mapTo(1));
     * const seed = 0;
     * const count = ones.pipe(reduce((acc, one) => acc + one, seed));
     * count.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link count}
     * @see {@link expand}
     * @see {@link mergeScan}
     * @see {@link scan}
     *
     * @param {function(acc: A, value: V, index: number): A} accumulator The accumulator function
     * called on each source value.
     * @param {A} [seed] The initial accumulation value.
     * @return {Observable<A>} An Observable that emits a single value that is the
     * result of accumulating the values emitted by the source Observable.
     * @name reduce
     */
    function reduce(accumulator, seed) {
      // providing a seed of `undefined` *should* be valid and trigger
      // hasSeed! so don't use `seed !== undefined` checks!
      // For this reason, we have to check it here at the original call site
      // otherwise inside Operator/Subscriber we won't know if `undefined`
      // means they didn't provide anything or if they literally provided `undefined`
      if (arguments.length >= 2) {
        return function reduceOperatorFunctionWithSeed(source) {
          return pipe_ts_3.pipe(
            scan_ts_1.scan(accumulator, seed),
            takeLast_ts_2.takeLast(1),
            defaultIfEmpty_ts_4.defaultIfEmpty(seed),
          )(source);
        };
      }
      return function reduceOperatorFunction(source) {
        return pipe_ts_3.pipe(
          scan_ts_1.scan((acc, value, index) =>
            accumulator(acc, value, index + 1)
          ),
          takeLast_ts_2.takeLast(1),
        )(source);
      };
    }
    exports_157("reduce", reduce);
    return {
      setters: [
        function (scan_ts_1_1) {
          scan_ts_1 = scan_ts_1_1;
        },
        function (takeLast_ts_2_1) {
          takeLast_ts_2 = takeLast_ts_2_1;
        },
        function (defaultIfEmpty_ts_4_1) {
          defaultIfEmpty_ts_4 = defaultIfEmpty_ts_4_1;
        },
        function (pipe_ts_3_1) {
          pipe_ts_3 = pipe_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/max",
  ["https://deno.land/x/rxjs/src/internal/operators/reduce"],
  function (exports_158, context_158) {
    "use strict";
    var reduce_ts_1;
    var __moduleName = context_158 && context_158.id;
    /**
     * The Max operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
     * and when source Observable completes it emits a single item: the item with the largest value.
     *
     * ![](max.png)
     *
     * ## Examples
     * Get the maximal value of a series of numbers
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { max } from 'rxjs/operators.ts';
     *
     * of(5, 4, 7, 2, 8).pipe(
     *   max(),
     * )
     * .subscribe(x => console.log(x)); // -> 8
     * ```
     *
     * Use a comparer function to get the maximal item
     * ```typescript
     * import { of } from 'rxjs.ts';
     * import { max } from 'rxjs/operators.ts';
     *
     * interface Person {
     *   age: number,
     *   name: string
     * }
     *of(
     *   {age: 7, name: 'Foo'},
     *   {age: 5, name: 'Bar'},
     *   {age: 9, name: 'Beer'},
     * ).pipe(
     *   max<Person>((a: Person, b: Person) => a.age < b.age ? -1 : 1),
     * )
     * .subscribe((x: Person) => console.log(x.name)); // -> 'Beer'
     * ```
     *
     * @see {@link min}
     *
     * @param {Function} [comparer] - Optional comparer function that it will use instead of its default to compare the
     * value of two items.
     * @return {Observable} An Observable that emits item with the largest value.
     * @name max
     */
    function max(comparer) {
      const max = (typeof comparer === "function")
        ? (x, y) => comparer(x, y) > 0 ? x : y
        : (x, y) => x > y ? x : y;
      return reduce_ts_1.reduce(max);
    }
    exports_158("max", max);
    return {
      setters: [
        function (reduce_ts_1_1) {
          reduce_ts_1 = reduce_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/mergeWith",
  ["https://deno.land/x/rxjs/src/internal/observable/merge"],
  function (exports_159, context_159) {
    "use strict";
    var merge_ts_2;
    var __moduleName = context_159 && context_159.id;
    /* tslint:enable:max-line-length */
    /**
     * @deprecated use {@link mergeWith} or static {@link merge}
     */
    function merge(...observables) {
      return (source) =>
        source.lift.call(merge_ts_2.merge(source, ...observables), undefined);
    }
    exports_159("merge", merge);
    /**
     * Merge the values from all observables to an single observable result.
     *
     * Creates an observable, that when subscribed to, subscribes to the source
     * observable, and all other sources provided as arguments. All values from
     * every source are emitted from the resulting subscription.
     *
     * When all sources complete, the resulting observable will complete.
     *
     * When any one source errors, the resulting observable will error.
     *
     *
     * ### Example
     *
     * Joining all outputs from multiple user input event streams:
     *
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { map, mergeWith } from 'rxjs/operators.ts';
     *
     * const clicks$ = fromEvent(document, 'click').pipe(map(() => 'click'));
     * const mousemoves$ = fromEvent(document, 'mousemove').pipe(map(() => 'mousemove'));
     * const dblclicks$ = fromEvent(document, 'dblclick').pipe(map(() => 'dblclick'));
     *
     * mousemoves$.pipe(
     *   mergeWith(clicks$, dblclicks$),
     * )
     * .subscribe(x => console.log(x));
     *
     * // result (assuming user interactions)
     * // "mousemove"
     * // "mousemove"
     * // "mousemove"
     * // "click"
     * // "click"
     * // "dblclick"
     * ```
     * @param otherSources the sources to combine the current source with.
     */
    function mergeWith(...otherSources) {
      return merge(...otherSources);
    }
    exports_159("mergeWith", mergeWith);
    return {
      setters: [
        function (merge_ts_2_1) {
          merge_ts_2 = merge_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/mergeMapTo",
  ["https://deno.land/x/rxjs/src/internal/operators/mergeMap"],
  function (exports_160, context_160) {
    "use strict";
    var mergeMap_ts_3;
    var __moduleName = context_160 && context_160.id;
    /* tslint:enable:max-line-length */
    /**
     * Projects each source value to the same Observable which is merged multiple
     * times in the output Observable.
     *
     * <span class="informal">It's like {@link mergeMap}, but maps each value always
     * to the same inner Observable.</span>
     *
     * ![](mergeMapTo.png)
     *
     * Maps each source value to the given Observable `innerObservable` regardless
     * of the source value, and then merges those resulting Observables into one
     * single Observable, which is the output Observable.
     *
     * ## Example
     * For each click event, start an interval Observable ticking every 1 second
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { mergeMapTo } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(mergeMapTo(interval(1000)));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link concatMapTo}
     * @see {@link merge}
     * @see {@link mergeAll}
     * @see {@link mergeMap}
     * @see {@link mergeScan}
     * @see {@link switchMapTo}
     *
     * @param {ObservableInput} innerObservable An Observable to replace each value from
     * the source Observable.
     * @param {number} [concurrent=Infinity] Maximum number of input
     * Observables being subscribed to concurrently.
     * @return {Observable} An Observable that emits items from the given
     * `innerObservable`
     * @name mergeMapTo
     */
    function mergeMapTo(
      innerObservable,
      resultSelector,
      concurrent = Infinity,
    ) {
      if (typeof resultSelector === "function") {
        return mergeMap_ts_3.mergeMap(
          () => innerObservable,
          resultSelector,
          concurrent,
        );
      }
      if (typeof resultSelector === "number") {
        concurrent = resultSelector;
      }
      return mergeMap_ts_3.mergeMap(() => innerObservable, concurrent);
    }
    exports_160("mergeMapTo", mergeMapTo);
    return {
      setters: [
        function (mergeMap_ts_3_1) {
          mergeMap_ts_3 = mergeMap_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/mergeScan",
  [
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/InnerSubscriber",
  ],
  function (exports_161, context_161) {
    "use strict";
    var subscribeToResult_ts_16,
      OuterSubscriber_ts_16,
      InnerSubscriber_ts_5,
      MergeScanOperator,
      MergeScanSubscriber;
    var __moduleName = context_161 && context_161.id;
    /**
     * Applies an accumulator function over the source Observable where the
     * accumulator function itself returns an Observable, then each intermediate
     * Observable returned is merged into the output Observable.
     *
     * <span class="informal">It's like {@link scan}, but the Observables returned
     * by the accumulator are merged into the outer Observable.</span>
     *
     * ## Example
     * Count the number of click events
     * ```ts
     * import { fromEvent, of } from 'rxjs.ts';
     * import { mapTo, mergeScan } from 'rxjs/operators.ts';
     *
     * const click$ = fromEvent(document, 'click');
     * const one$ = click$.pipe(mapTo(1));
     * const seed = 0;
     * const count$ = one$.pipe(
     *   mergeScan((acc, one) => of(acc + one), seed),
     * );
     * count$.subscribe(x => console.log(x));
     *
     * // Results:
     * // 1
     * // 2
     * // 3
     * // 4
     * // ...and so on for each click
     * ```
     *
     * @param {function(acc: R, value: T): Observable<R>} accumulator
     * The accumulator function called on each source value.
     * @param seed The initial accumulation value.
     * @param {number} [concurrent=Infinity] Maximum number of
     * input Observables being subscribed to concurrently.
     * @return {Observable<R>} An observable of the accumulated values.
     * @name mergeScan
     */
    function mergeScan(accumulator, seed, concurrent = Infinity) {
      return (source) =>
        source.lift(new MergeScanOperator(accumulator, seed, concurrent));
    }
    exports_161("mergeScan", mergeScan);
    return {
      setters: [
        function (subscribeToResult_ts_16_1) {
          subscribeToResult_ts_16 = subscribeToResult_ts_16_1;
        },
        function (OuterSubscriber_ts_16_1) {
          OuterSubscriber_ts_16 = OuterSubscriber_ts_16_1;
        },
        function (InnerSubscriber_ts_5_1) {
          InnerSubscriber_ts_5 = InnerSubscriber_ts_5_1;
        },
      ],
      execute: function () {
        MergeScanOperator = class MergeScanOperator {
          constructor(accumulator, seed, concurrent) {
            this.accumulator = accumulator;
            this.seed = seed;
            this.concurrent = concurrent;
          }
          call(subscriber, source) {
            return source.subscribe(
              new MergeScanSubscriber(
                subscriber,
                this.accumulator,
                this.seed,
                this.concurrent,
              ),
            );
          }
        };
        exports_161("MergeScanOperator", MergeScanOperator);
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        MergeScanSubscriber = class MergeScanSubscriber
          extends OuterSubscriber_ts_16.OuterSubscriber {
          constructor(destination, accumulator, acc, concurrent) {
            super(destination);
            this.accumulator = accumulator;
            this.acc = acc;
            this.concurrent = concurrent;
            this.hasValue = false;
            this.hasCompleted = false;
            this.buffer = [];
            this.active = 0;
            this.index = 0;
          }
          _next(value) {
            if (this.active < this.concurrent) {
              const index = this.index++;
              const destination = this.destination;
              let ish;
              try {
                const { accumulator } = this;
                ish = accumulator(this.acc, value, index);
              } catch (e) {
                return destination.error(e);
              }
              this.active++;
              this._innerSub(ish, value, index);
            } else {
              this.buffer.push(value);
            }
          }
          _innerSub(ish, value, index) {
            const innerSubscriber = new InnerSubscriber_ts_5.InnerSubscriber(
              this,
              value,
              index,
            );
            const destination = this.destination;
            destination.add(innerSubscriber);
            subscribeToResult_ts_16.subscribeToResult(
              this,
              ish,
              undefined,
              undefined,
              innerSubscriber,
            );
          }
          _complete() {
            this.hasCompleted = true;
            if (this.active === 0 && this.buffer.length === 0) {
              if (this.hasValue === false) {
                this.destination.next(this.acc);
              }
              this.destination.complete();
            }
            this.unsubscribe();
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            const { destination } = this;
            this.acc = innerValue;
            this.hasValue = true;
            destination.next(innerValue);
          }
          notifyComplete(innerSub) {
            const buffer = this.buffer;
            const destination = this.destination;
            destination.remove(innerSub);
            this.active--;
            if (buffer.length > 0) {
              this._next(buffer.shift());
            } else if (this.active === 0 && this.hasCompleted) {
              if (this.hasValue === false) {
                this.destination.next(this.acc);
              }
              this.destination.complete();
            }
          }
        };
        exports_161("MergeScanSubscriber", MergeScanSubscriber);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/min",
  ["https://deno.land/x/rxjs/src/internal/operators/reduce"],
  function (exports_162, context_162) {
    "use strict";
    var reduce_ts_2;
    var __moduleName = context_162 && context_162.id;
    /**
     * The Min operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
     * and when source Observable completes it emits a single item: the item with the smallest value.
     *
     * ![](min.png)
     *
     * ## Examples
     * Get the minimal value of a series of numbers
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { min } from 'rxjs/operators.ts';
     *
     * of(5, 4, 7, 2, 8).pipe(
     *   min(),
     * )
     * .subscribe(x => console.log(x)); // -> 2
     * ```
     *
     * Use a comparer function to get the minimal item
     * ```typescript
     * import { of } from 'rxjs.ts';
     * import { min } from 'rxjs/operators.ts';
     *
     * interface Person {
     *   age: number,
     *   name: string
     * }
     *of(
     *   {age: 7, name: 'Foo'},
     *   {age: 5, name: 'Bar'},
     *   {age: 9, name: 'Beer'},
     * ).pipe(
     *   min<Person>( (a: Person, b: Person) => a.age < b.age ? -1 : 1),
     * )
     * .subscribe((x: Person) => console.log(x.name)); // -> 'Bar'
     * ```
     * @see {@link max}
     *
     * @param {Function} [comparer] - Optional comparer function that it will use instead of its default to compare the
     * value of two items.
     * @return {Observable<R>} An Observable that emits item with the smallest value.
     * @name min
     */
    function min(comparer) {
      const min = (typeof comparer === "function")
        ? (x, y) => comparer(x, y) < 0 ? x : y
        : (x, y) => x < y ? x : y;
      return reduce_ts_2.reduce(min);
    }
    exports_162("min", min);
    return {
      setters: [
        function (reduce_ts_2_1) {
          reduce_ts_2 = reduce_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/multicast",
  ["https://deno.land/x/rxjs/src/internal/observable/ConnectableObservable"],
  function (exports_163, context_163) {
    "use strict";
    var ConnectableObservable_ts_2, MulticastOperator;
    var __moduleName = context_163 && context_163.id;
    /* tslint:enable:max-line-length */
    /**
     * Returns an Observable that emits the results of invoking a specified selector on items
     * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
     *
     * ![](multicast.png)
     *
     * @param {Function|Subject} subjectOrSubjectFactory - Factory function to create an intermediate subject through
     * which the source sequence's elements will be multicasted to the selector function
     * or Subject to push source elements into.
     * @param {Function} [selector] - Optional selector function that can use the multicasted source stream
     * as many times as needed, without causing multiple subscriptions to the source stream.
     * Subscribers to the given source will receive all notifications of the source from the
     * time of the subscription forward.
     * @return {Observable} An Observable that emits the results of invoking the selector
     * on the items emitted by a `ConnectableObservable` that shares a single subscription to
     * the underlying stream.
     * @name multicast
     */
    function multicast(subjectOrSubjectFactory, selector) {
      return function multicastOperatorFunction(source) {
        let subjectFactory;
        if (typeof subjectOrSubjectFactory === "function") {
          subjectFactory = subjectOrSubjectFactory;
        } else {
          subjectFactory = function subjectFactory() {
            return subjectOrSubjectFactory;
          };
        }
        if (typeof selector === "function") {
          return source.lift(new MulticastOperator(subjectFactory, selector));
        }
        const connectable = Object.create(
          source,
          ConnectableObservable_ts_2.connectableObservableDescriptor,
        );
        connectable.source = source;
        connectable.subjectFactory = subjectFactory;
        return connectable;
      };
    }
    exports_163("multicast", multicast);
    return {
      setters: [
        function (ConnectableObservable_ts_2_1) {
          ConnectableObservable_ts_2 = ConnectableObservable_ts_2_1;
        },
      ],
      execute: function () {
        MulticastOperator = class MulticastOperator {
          constructor(subjectFactory, selector) {
            this.subjectFactory = subjectFactory;
            this.selector = selector;
          }
          call(subscriber, source) {
            const { selector } = this;
            const subject = this.subjectFactory();
            const subscription = selector(subject).subscribe(subscriber);
            subscription.add(source.subscribe(subject));
            return subscription;
          }
        };
        exports_163("MulticastOperator", MulticastOperator);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/observeOn",
  [
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/Notification",
  ],
  function (exports_164, context_164) {
    "use strict";
    var Subscriber_ts_32,
      Notification_ts_4,
      ObserveOnOperator,
      ObserveOnSubscriber,
      ObserveOnMessage;
    var __moduleName = context_164 && context_164.id;
    /**
     *
     * Re-emits all notifications from source Observable with specified scheduler.
     *
     * <span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>
     *
     * `observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
     * notifications emitted by the source Observable. It might be useful, if you do not have control over
     * internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.
     *
     * Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
     * but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
     * scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
     * notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
     * An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
     * that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
     * Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
     * little bit more, to ensure that they are emitted at expected moments.
     *
     * As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
     * will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
     * will delay all notifications - including error notifications - while `delay` will pass through error
     * from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
     * for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
     * for notification emissions in general.
     *
     * ## Example
     * Ensure values in subscribe are called just before browser repaint.
     * ```ts
     * import { interval, animationFrameScheduler } from 'rxjs.ts';
     * import { observeOn } from 'rxjs/operators.ts';
     *
     * const someDiv = document.querySelector("#someDiv");
     * const intervals = interval(10);                // Intervals are scheduled
     *                                                // with async scheduler by default...
     * intervals.pipe(
     *   observeOn(animationFrameScheduler),          // ...but we will observe on animationFrame
     * )                                              // scheduler to ensure smooth animation.
     * .subscribe(val => {
     *   someDiv.style.height = val + 'px.ts';
     * });
     * ```
     *
     * @see {@link delay}
     *
     * @param {SchedulerLike} scheduler Scheduler that will be used to reschedule notifications from source Observable.
     * @param {number} [delay] Number of milliseconds that states with what delay every notification should be rescheduled.
     * @return {Observable<T>} Observable that emits the same notifications as the source Observable,
     * but with provided scheduler.
     *
     * @name observeOn
     */
    function observeOn(scheduler, delay = 0) {
      return function observeOnOperatorFunction(source) {
        return source.lift(new ObserveOnOperator(scheduler, delay));
      };
    }
    exports_164("observeOn", observeOn);
    return {
      setters: [
        function (Subscriber_ts_32_1) {
          Subscriber_ts_32 = Subscriber_ts_32_1;
        },
        function (Notification_ts_4_1) {
          Notification_ts_4 = Notification_ts_4_1;
        },
      ],
      execute: function () {
        ObserveOnOperator = class ObserveOnOperator {
          constructor(scheduler, delay = 0) {
            this.scheduler = scheduler;
            this.delay = delay;
          }
          call(subscriber, source) {
            return source.subscribe(
              new ObserveOnSubscriber(subscriber, this.scheduler, this.delay),
            );
          }
        };
        exports_164("ObserveOnOperator", ObserveOnOperator);
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        ObserveOnSubscriber = class ObserveOnSubscriber
          extends Subscriber_ts_32.Subscriber {
          constructor(destination, scheduler, delay = 0) {
            super(destination);
            this.scheduler = scheduler;
            this.delay = delay;
          }
          /** @nocollapse */
          static dispatch(arg) {
            const { notification, destination } = arg;
            notification.observe(destination);
            this.unsubscribe();
          }
          scheduleMessage(notification) {
            const destination = this.destination;
            destination.add(
              this.scheduler.schedule(
                ObserveOnSubscriber.dispatch,
                this.delay,
                new ObserveOnMessage(notification, this.destination),
              ),
            );
          }
          _next(value) {
            this.scheduleMessage(
              Notification_ts_4.Notification.createNext(value),
            );
          }
          _error(err) {
            this.scheduleMessage(
              Notification_ts_4.Notification.createError(err),
            );
            this.unsubscribe();
          }
          _complete() {
            this.scheduleMessage(
              Notification_ts_4.Notification.createComplete(),
            );
            this.unsubscribe();
          }
        };
        exports_164("ObserveOnSubscriber", ObserveOnSubscriber);
        ObserveOnMessage = class ObserveOnMessage {
          constructor(notification, destination) {
            this.notification = notification;
            this.destination = destination;
          }
        };
        exports_164("ObserveOnMessage", ObserveOnMessage);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/onErrorResumeNext",
  [
    "https://deno.land/x/rxjs/src/internal/observable/from",
    "https://deno.land/x/rxjs/src/internal/util/isArray",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/InnerSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_165, context_165) {
    "use strict";
    var from_ts_10,
      isArray_ts_13,
      OuterSubscriber_ts_17,
      InnerSubscriber_ts_6,
      subscribeToResult_ts_17,
      OnErrorResumeNextOperator,
      OnErrorResumeNextSubscriber;
    var __moduleName = context_165 && context_165.id;
    /* tslint:enable:max-line-length */
    /**
     * When any of the provided Observable emits an complete or error notification, it immediately subscribes to the next one
     * that was passed.
     *
     * <span class="informal">Execute series of Observables, subscribes to next one on error or complete.</span>
     *
     * ![](onErrorResumeNext.png)
     *
     * `onErrorResumeNext` is an operator that accepts a series of Observables, provided either directly as
     * arguments or as an array. If no single Observable is provided, returned Observable will simply behave the same
     * as the source.
     *
     * `onErrorResumeNext` returns an Observable that starts by subscribing and re-emitting values from the source Observable.
     * When its stream of values ends - no matter if Observable completed or emitted an error - `onErrorResumeNext`
     * will subscribe to the first Observable that was passed as an argument to the method. It will start re-emitting
     * its values as well and - again - when that stream ends, `onErrorResumeNext` will proceed to subscribing yet another
     * Observable in provided series, no matter if previous Observable completed or ended with an error. This will
     * be happening until there is no more Observables left in the series, at which point returned Observable will
     * complete - even if the last subscribed stream ended with an error.
     *
     * `onErrorResumeNext` can be therefore thought of as version of {@link concat} operator, which is more permissive
     * when it comes to the errors emitted by its input Observables. While `concat` subscribes to the next Observable
     * in series only if previous one successfully completed, `onErrorResumeNext` subscribes even if it ended with
     * an error.
     *
     * Note that you do not get any access to errors emitted by the Observables. In particular do not
     * expect these errors to appear in error callback passed to {@link Observable#subscribe}. If you want to take
     * specific actions based on what error was emitted by an Observable, you should try out {@link catchError} instead.
     *
     *
     * ## Example
     * Subscribe to the next Observable after map fails
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { onErrorResumeNext, map } from 'rxjs/operators.ts';
     *
     * of(1, 2, 3, 0).pipe(
     *   map(x => {
     *       if (x === 0) { throw Error(); }
     *        return 10 / x;
     *   }),
     *   onErrorResumeNext(of(1, 2, 3)),
     * )
     * .subscribe(
     *   val => console.log(val),
     *   err => console.log(err),          // Will never be called.
     *   () => console.log('that\'s it!')
     * );
     *
     * // Logs:
     * // 10
     * // 5
     * // 3.3333333333333335
     * // 1
     * // 2
     * // 3
     * // "that's it!"
     * ```
     *
     * @see {@link concat}
     * @see {@link catchError}
     *
     * @param {...ObservableInput} observables Observables passed either directly or as an array.
     * @return {Observable} An Observable that emits values from source Observable, but - if it errors - subscribes
     * to the next passed Observable and so on, until it completes or runs out of Observables.
     * @name onErrorResumeNext
     */
    function onErrorResumeNext(...nextSources) {
      if (nextSources.length === 1 && isArray_ts_13.isArray(nextSources[0])) {
        nextSources = nextSources[0];
      }
      return (source) =>
        source.lift(new OnErrorResumeNextOperator(nextSources));
    }
    exports_165("onErrorResumeNext", onErrorResumeNext);
    /* tslint:enable:max-line-length */
    function onErrorResumeNextStatic(...nextSources) {
      let source = null;
      if (nextSources.length === 1 && isArray_ts_13.isArray(nextSources[0])) {
        nextSources = nextSources[0];
      }
      source = nextSources.shift();
      return from_ts_10.from(source, null).lift(
        new OnErrorResumeNextOperator(nextSources),
      );
    }
    exports_165("onErrorResumeNextStatic", onErrorResumeNextStatic);
    return {
      setters: [
        function (from_ts_10_1) {
          from_ts_10 = from_ts_10_1;
        },
        function (isArray_ts_13_1) {
          isArray_ts_13 = isArray_ts_13_1;
        },
        function (OuterSubscriber_ts_17_1) {
          OuterSubscriber_ts_17 = OuterSubscriber_ts_17_1;
        },
        function (InnerSubscriber_ts_6_1) {
          InnerSubscriber_ts_6 = InnerSubscriber_ts_6_1;
        },
        function (subscribeToResult_ts_17_1) {
          subscribeToResult_ts_17 = subscribeToResult_ts_17_1;
        },
      ],
      execute: function () {
        OnErrorResumeNextOperator = class OnErrorResumeNextOperator {
          constructor(nextSources) {
            this.nextSources = nextSources;
          }
          call(subscriber, source) {
            return source.subscribe(
              new OnErrorResumeNextSubscriber(subscriber, this.nextSources),
            );
          }
        };
        OnErrorResumeNextSubscriber = class OnErrorResumeNextSubscriber
          extends OuterSubscriber_ts_17.OuterSubscriber {
          constructor(destination, nextSources) {
            super(destination);
            this.destination = destination;
            this.nextSources = nextSources;
          }
          notifyError(error, innerSub) {
            this.subscribeToNextSource();
          }
          notifyComplete(innerSub) {
            this.subscribeToNextSource();
          }
          _error(err) {
            this.subscribeToNextSource();
            this.unsubscribe();
          }
          _complete() {
            this.subscribeToNextSource();
            this.unsubscribe();
          }
          subscribeToNextSource() {
            const next = this.nextSources.shift();
            if (!!next) {
              const innerSubscriber = new InnerSubscriber_ts_6.InnerSubscriber(
                this,
                undefined,
                undefined,
              );
              const destination = this.destination;
              destination.add(innerSubscriber);
              subscribeToResult_ts_17.subscribeToResult(
                this,
                next,
                undefined,
                undefined,
                innerSubscriber,
              );
            } else {
              this.destination.complete();
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/pairwise",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_166, context_166) {
    "use strict";
    var Subscriber_ts_33, PairwiseOperator, PairwiseSubscriber;
    var __moduleName = context_166 && context_166.id;
    /**
     * Groups pairs of consecutive emissions together and emits them as an array of
     * two values.
     *
     * <span class="informal">Puts the current value and previous value together as
     * an array, and emits that.</span>
     *
     * ![](pairwise.png)
     *
     * The Nth emission from the source Observable will cause the output Observable
     * to emit an array [(N-1)th, Nth] of the previous and the current value, as a
     * pair. For this reason, `pairwise` emits on the second and subsequent
     * emissions from the source Observable, but not on the first emission, because
     * there is no previous value in that case.
     *
     * ## Example
     * On every click (starting from the second), emit the relative distance to the previous click
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { pairwise, map } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const pairs = clicks.pipe(pairwise());
     * const distance = pairs.pipe(
     *   map(pair => {
     *     const x0 = pair[0].clientX;
     *     const y0 = pair[0].clientY;
     *     const x1 = pair[1].clientX;
     *     const y1 = pair[1].clientY;
     *     return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
     *   }),
     * );
     * distance.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link buffer}
     * @see {@link bufferCount}
     *
     * @return {Observable<Array<T>>} An Observable of pairs (as arrays) of
     * consecutive values from the source Observable.
     * @name pairwise
     */
    function pairwise() {
      return (source) => source.lift(new PairwiseOperator());
    }
    exports_166("pairwise", pairwise);
    return {
      setters: [
        function (Subscriber_ts_33_1) {
          Subscriber_ts_33 = Subscriber_ts_33_1;
        },
      ],
      execute: function () {
        PairwiseOperator = class PairwiseOperator {
          call(subscriber, source) {
            return source.subscribe(new PairwiseSubscriber(subscriber));
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        PairwiseSubscriber = class PairwiseSubscriber
          extends Subscriber_ts_33.Subscriber {
          constructor(destination) {
            super(destination);
            this.hasPrev = false;
          }
          _next(value) {
            let pair;
            if (this.hasPrev) {
              pair = [this.prev, value];
            } else {
              this.hasPrev = true;
            }
            this.prev = value;
            if (pair) {
              this.destination.next(pair);
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/partition",
  [
    "https://deno.land/x/rxjs/src/internal/util/not",
    "https://deno.land/x/rxjs/src/internal/operators/filter",
  ],
  function (exports_167, context_167) {
    "use strict";
    var not_ts_2, filter_ts_5;
    var __moduleName = context_167 && context_167.id;
    /**
     * Splits the source Observable into two, one with values that satisfy a
     * predicate, and another with values that don't satisfy the predicate.
     *
     * <span class="informal">It's like {@link filter}, but returns two Observables:
     * one like the output of {@link filter}, and the other with values that did not
     * pass the condition.</span>
     *
     * ![](partition.png)
     *
     * `partition` outputs an array with two Observables that partition the values
     * from the source Observable through the given `predicate` function. The first
     * Observable in that array emits source values for which the predicate argument
     * returns true. The second Observable emits source values for which the
     * predicate returns false. The first behaves like {@link filter} and the second
     * behaves like {@link filter} with the predicate negated.
     *
     * ## Example
     * Partition click events into those on DIV elements and those elsewhere
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { partition } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const parts = clicks.pipe(partition(ev => ev.target.tagName === 'DIV'));
     * const clicksOnDivs = parts[0];
     * const clicksElsewhere = parts[1];
     * clicksOnDivs.subscribe(x => console.log('DIV clicked: ', x));
     * clicksElsewhere.subscribe(x => console.log('Other clicked: ', x));
     * ```
     *
     * @see {@link filter}
     *
     * @param {function(value: T, index: number): boolean} predicate A function that
     * evaluates each value emitted by the source Observable. If it returns `true`,
     * the value is emitted on the first Observable in the returned array, if
     * `false` the value is emitted on the second Observable in the array. The
     * `index` parameter is the number `i` for the i-th source emission that has
     * happened since the subscription, starting from the number `0`.
     * @param {any} [thisArg] An optional argument to determine the value of `this`
     * in the `predicate` function.
     * @return {[Observable<T>, Observable<T>]} An array with two Observables: one
     * with values that passed the predicate, and another with values that did not
     * pass the predicate.
     * @name partition
     * @deprecated use `partition` static creation function instead
     */
    function partition(predicate, thisArg) {
      return (source) => [
        filter_ts_5.filter(predicate, thisArg)(source),
        filter_ts_5.filter(not_ts_2.not(predicate, thisArg))(source),
      ];
    }
    exports_167("partition", partition);
    return {
      setters: [
        function (not_ts_2_1) {
          not_ts_2 = not_ts_2_1;
        },
        function (filter_ts_5_1) {
          filter_ts_5 = filter_ts_5_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/pluck",
  ["https://deno.land/x/rxjs/src/internal/operators/map"],
  function (exports_168, context_168) {
    "use strict";
    var map_ts_8;
    var __moduleName = context_168 && context_168.id;
    /* tslint:enable:max-line-length */
    /**
     * Maps each source value to its specified nested property.
     *
     * <span class="informal">Like {@link map}, but meant only for picking one of
     * the nested properties of every emitted value.</span>
     *
     * ![](pluck.png)
     *
     * Given a list of strings or numbers describing a path to a property, retrieves
     * the value of a specified nested property from all values in the source
     * Observable. If a property can't be resolved, it will return `undefined` for
     * that value.
     *
     * ## Example
     * Map every click to the tagName of the clicked target element
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { pluck } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const tagNames = clicks.pipe(pluck('target', 'tagName'));
     * tagNames.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link map}
     *
     * @param properties The nested properties to pluck from each source
     * value.
     * @return A new Observable of property values from the source values.
     * @deprecated Remove in v8. Use {@link map} and optional chaining: `pluck('foo', 'bar')` is `map(x => x?.foo?.bar)`.
     */
    function pluck(...properties) {
      const length = properties.length;
      if (length === 0) {
        throw new Error("list of properties cannot be empty.");
      }
      return map_ts_8.map((x) => {
        let currentProp = x;
        for (let i = 0; i < length; i++) {
          const p = currentProp[properties[i]];
          if (typeof p !== "undefined") {
            currentProp = p;
          } else {
            return undefined;
          }
        }
        return currentProp;
      });
    }
    exports_168("pluck", pluck);
    return {
      setters: [
        function (map_ts_8_1) {
          map_ts_8 = map_ts_8_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/publish",
  [
    "https://deno.land/x/rxjs/src/internal/Subject",
    "https://deno.land/x/rxjs/src/internal/operators/multicast",
  ],
  function (exports_169, context_169) {
    "use strict";
    var Subject_ts_7, multicast_ts_1;
    var __moduleName = context_169 && context_169.id;
    /* tslint:enable:max-line-length */
    /**
     * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
     * before it begins emitting items to those Observers that have subscribed to it.
     *
     * <span class="informal">Makes a cold Observable hot</span>
     *
     * ![](publish.png)
     *
     * ## Examples
     * Make source$ hot by applying publish operator, then merge each inner observable into a single one
     * and subscribe.
     * ```ts
     * import { of, zip, interval, merge } from "rxjs";
     * import { map, publish, tap } from "rxjs/operators";
     *
     * const source$ = zip(interval(2000), of(1, 2, 3, 4, 5, 6, 7, 8, 9)).pipe(
     *   map(values => values[1])
     * );
     *
     * source$
     *   .pipe(
     *     publish(multicasted$ =>
     *       merge(
     *         multicasted$.pipe(tap(x => console.log('Stream 1:', x))),
     *         multicasted$.pipe(tap(x => console.log('Stream 2:', x))),
     *         multicasted$.pipe(tap(x => console.log('Stream 3:', x))),
     *       )
     *     )
     *   )
     *   .subscribe();
     *
     * // Results every two seconds
     * // Stream 1: 1
     * // Stream 2: 1
     * // Stream 3: 1
     * // ...
     * // Stream 1: 9
     * // Stream 2: 9
     * // Stream 3: 9
     * ```
     *
     * @param {Function} [selector] - Optional selector function which can use the multicasted source sequence as many times
     * as needed, without causing multiple subscriptions to the source sequence.
     * Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
     * @return A ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
     * @name publish
     */
    function publish(selector) {
      return selector
        ? multicast_ts_1.multicast(() => new Subject_ts_7.Subject(), selector)
        : multicast_ts_1.multicast(new Subject_ts_7.Subject());
    }
    exports_169("publish", publish);
    return {
      setters: [
        function (Subject_ts_7_1) {
          Subject_ts_7 = Subject_ts_7_1;
        },
        function (multicast_ts_1_1) {
          multicast_ts_1 = multicast_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/publishBehavior",
  [
    "https://deno.land/x/rxjs/src/internal/BehaviorSubject",
    "https://deno.land/x/rxjs/src/internal/operators/multicast",
  ],
  function (exports_170, context_170) {
    "use strict";
    var BehaviorSubject_ts_2, multicast_ts_2;
    var __moduleName = context_170 && context_170.id;
    /**
     * @param value
     * @return {ConnectableObservable<T>}
     * @name publishBehavior
     */
    function publishBehavior(value) {
      return (source) =>
        multicast_ts_2.multicast(
          new BehaviorSubject_ts_2.BehaviorSubject(value),
        )(source);
    }
    exports_170("publishBehavior", publishBehavior);
    return {
      setters: [
        function (BehaviorSubject_ts_2_1) {
          BehaviorSubject_ts_2 = BehaviorSubject_ts_2_1;
        },
        function (multicast_ts_2_1) {
          multicast_ts_2 = multicast_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/publishLast",
  [
    "https://deno.land/x/rxjs/src/internal/AsyncSubject",
    "https://deno.land/x/rxjs/src/internal/operators/multicast",
  ],
  function (exports_171, context_171) {
    "use strict";
    var AsyncSubject_ts_4, multicast_ts_3;
    var __moduleName = context_171 && context_171.id;
    /**
     * Returns a connectable observable sequence that shares a single subscription to the
     * underlying sequence containing only the last notification.
     *
     * ![](publishLast.png)
     *
     * Similar to {@link publish}, but it waits until the source observable completes and stores
     * the last emitted value.
     * Similarly to {@link publishReplay} and {@link publishBehavior}, this keeps storing the last
     * value even if it has no more subscribers. If subsequent subscriptions happen, they will
     * immediately get that last stored value and complete.
     *
     * ## Example
     *
     * ```ts
     * import { interval } from 'rxjs.ts';
     * import { publishLast, tap, take } from 'rxjs/operators.ts';
     *
     * const connectable =
     *   interval(1000)
     *     .pipe(
     *       tap(x => console.log("side effect", x)),
     *       take(3),
     *       publishLast());
     *
     * connectable.subscribe(
     *   x => console.log(  "Sub. A", x),
     *   err => console.log("Sub. A Error", err),
     *   () => console.log( "Sub. A Complete"));
     *
     * connectable.subscribe(
     *   x => console.log(  "Sub. B", x),
     *   err => console.log("Sub. B Error", err),
     *   () => console.log( "Sub. B Complete"));
     *
     * connectable.connect();
     *
     * // Results:
     * //    "side effect 0"
     * //    "side effect 1"
     * //    "side effect 2"
     * //    "Sub. A 2"
     * //    "Sub. B 2"
     * //    "Sub. A Complete"
     * //    "Sub. B Complete"
     * ```
     *
     * @see {@link ConnectableObservable}
     * @see {@link publish}
     * @see {@link publishReplay}
     * @see {@link publishBehavior}
     *
     * @return {ConnectableObservable} An observable sequence that contains the elements of a
     * sequence produced by multicasting the source sequence.
     * @name publishLast
     */
    function publishLast() {
      return (source) =>
        multicast_ts_3.multicast(new AsyncSubject_ts_4.AsyncSubject())(source);
    }
    exports_171("publishLast", publishLast);
    return {
      setters: [
        function (AsyncSubject_ts_4_1) {
          AsyncSubject_ts_4 = AsyncSubject_ts_4_1;
        },
        function (multicast_ts_3_1) {
          multicast_ts_3 = multicast_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/publishReplay",
  [
    "https://deno.land/x/rxjs/src/internal/ReplaySubject",
    "https://deno.land/x/rxjs/src/internal/operators/multicast",
  ],
  function (exports_172, context_172) {
    "use strict";
    var ReplaySubject_ts_2, multicast_ts_4;
    var __moduleName = context_172 && context_172.id;
    /* tslint:enable:max-line-length */
    function publishReplay(
      bufferSize,
      windowTime,
      selectorOrScheduler,
      scheduler,
    ) {
      if (selectorOrScheduler && typeof selectorOrScheduler !== "function") {
        scheduler = selectorOrScheduler;
      }
      const selector = typeof selectorOrScheduler === "function"
        ? selectorOrScheduler : undefined;
      const subject = new ReplaySubject_ts_2.ReplaySubject(
        bufferSize,
        windowTime,
        scheduler,
      );
      return (source) =>
        multicast_ts_4.multicast(() => subject, selector)(source);
    }
    exports_172("publishReplay", publishReplay);
    return {
      setters: [
        function (ReplaySubject_ts_2_1) {
          ReplaySubject_ts_2 = ReplaySubject_ts_2_1;
        },
        function (multicast_ts_4_1) {
          multicast_ts_4 = multicast_ts_4_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/raceWith",
  [
    "https://deno.land/x/rxjs/src/internal/util/isArray",
    "https://deno.land/x/rxjs/src/internal/observable/race",
  ],
  function (exports_173, context_173) {
    "use strict";
    var isArray_ts_14, race_ts_2;
    var __moduleName = context_173 && context_173.id;
    /* tslint:enable:max-line-length */
    /**
     * Returns an Observable that mirrors the first source Observable to emit a next,
     * error or complete notification from the combination of this Observable and supplied Observables.
     * @param {...Observables} ...observables Sources used to race for which Observable emits first.
     * @return {Observable} An Observable that mirrors the output of the first Observable to emit an item.
     * @deprecated Deprecated use {@link raceWith}
     */
    function race(...observables) {
      return function raceOperatorFunction(source) {
        // if the only argument is an array, it was most likely called with
        // `pair([obs1, obs2, ...])`
        if (observables.length === 1 && isArray_ts_14.isArray(observables[0])) {
          observables = observables[0];
        }
        return source.lift.call(
          race_ts_2.race(source, ...observables),
          undefined,
        );
      };
    }
    exports_173("race", race);
    /**
     * Creates an Observable that mirrors the first source Observable to emit a next,
     * error or complete notification from the combination of the Observable to which
     * the operator is applied and supplied Observables.
     *
     * ## Example
     *
     * ```ts
     * import { interval } from 'rxjs.ts';
     * import { mapTo, raceWith } from 'rxjs/operators.ts';
     *
     * const obs1 = interval(1000).pipe(mapTo('fast one'));
     * const obs2 = interval(3000).pipe(mapTo('medium one'));
     * const obs3 = interval(5000).pipe(mapTo('slow one'));
     *
     * obs2.pipe(
     *   raceWith(obs3, obs1)
     * ).subscribe(
     *   winner => console.log(winner)
     * );
     *
     * // Outputs
     * // a series of 'fast one'
     * ```
     *
     * @param otherSources Sources used to race for which Observable emits first.
     */
    function raceWith(...otherSources) {
      return function raceWithOperatorFunction(source) {
        return source.lift.call(
          race_ts_2.race(source, ...otherSources),
          undefined,
        );
      };
    }
    exports_173("raceWith", raceWith);
    return {
      setters: [
        function (isArray_ts_14_1) {
          isArray_ts_14 = isArray_ts_14_1;
        },
        function (race_ts_2_1) {
          race_ts_2 = race_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/repeat",
  [
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/observable/empty",
  ],
  function (exports_174, context_174) {
    "use strict";
    var Subscriber_ts_34, empty_ts_9, RepeatOperator, RepeatSubscriber;
    var __moduleName = context_174 && context_174.id;
    /**
     * Returns an Observable that will resubscribe to the source stream when the source stream completes, at most count times.
     *
     * <span class="informal">Repeats all values emitted on the source. It's like {@link retry}, but for non error cases.</span>
     *
     * ![](repeat.png)
     *
     * Similar to {@link retry}, this operator repeats the stream of items emitted by the source for non error cases.
     * Repeat can be useful for creating observables that are meant to have some repeated pattern or rhythm.
     *
     * Note: `repeat(0)` returns an empty observable and `repeat()` will repeat forever
     *
     * ## Example
     * Repeat a message stream
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { repeat, delay } from 'rxjs/operators.ts';
     *
     * const source = of('Repeat message');
     * const example = source.pipe(repeat(3));
     * example.subscribe(x => console.log(x));
     *
     * // Results
     * // Repeat message
     * // Repeat message
     * // Repeat message
     * ```
     *
     * Repeat 3 values, 2 times
     * ```ts
     * import { interval } from 'rxjs.ts';
     * import { repeat, take } from 'rxjs/operators.ts';
     *
     * const source = interval(1000);
     * const example = source.pipe(take(3), repeat(2));
     * example.subscribe(x => console.log(x));
     *
     * // Results every second
     * // 0
     * // 1
     * // 2
     * // 0
     * // 1
     * // 2
     * ```
     *
     * @see {@link repeatWhen}
     * @see {@link retry}
     *
     * @param {number} [count] The number of times the source Observable items are repeated, a count of 0 will yield
     * an empty Observable.
     * @return {Observable} An Observable that will resubscribe to the source stream when the source stream completes
     * , at most count times.
     * @name repeat
     */
    function repeat(count = -1) {
      return (source) => {
        if (count === 0) {
          return empty_ts_9.EMPTY;
        } else if (count < 0) {
          return source.lift(new RepeatOperator(-1, source));
        } else {
          return source.lift(new RepeatOperator(count - 1, source));
        }
      };
    }
    exports_174("repeat", repeat);
    return {
      setters: [
        function (Subscriber_ts_34_1) {
          Subscriber_ts_34 = Subscriber_ts_34_1;
        },
        function (empty_ts_9_1) {
          empty_ts_9 = empty_ts_9_1;
        },
      ],
      execute: function () {
        RepeatOperator = class RepeatOperator {
          constructor(count, source) {
            this.count = count;
            this.source = source;
          }
          call(subscriber, source) {
            return source.subscribe(
              new RepeatSubscriber(subscriber, this.count, this.source),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        RepeatSubscriber = class RepeatSubscriber
          extends Subscriber_ts_34.Subscriber {
          constructor(destination, count, source) {
            super(destination);
            this.count = count;
            this.source = source;
          }
          complete() {
            if (!this.isStopped) {
              const { source, count } = this;
              if (count === 0) {
                return super.complete();
              } else if (count > -1) {
                this.count = count - 1;
              }
              source.subscribe(this._unsubscribeAndRecycle());
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/repeatWhen",
  [
    "https://deno.land/x/rxjs/src/internal/Subject",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_175, context_175) {
    "use strict";
    var Subject_ts_8,
      OuterSubscriber_ts_18,
      subscribeToResult_ts_18,
      RepeatWhenOperator,
      RepeatWhenSubscriber;
    var __moduleName = context_175 && context_175.id;
    /**
     * Returns an Observable that mirrors the source Observable with the exception of a `complete`. If the source
     * Observable calls `complete`, this method will emit to the Observable returned from `notifier`. If that Observable
     * calls `complete` or `error`, then this method will call `complete` or `error` on the child subscription. Otherwise
     * this method will resubscribe to the source Observable.
     *
     * ![](repeatWhen.png)
     *
     * ## Example
     * Repeat a message stream on click
     * ```ts
     * import { of, fromEvent } from 'rxjs.ts';
     * import { repeatWhen } from 'rxjs/operators.ts';
     *
     * const source = of('Repeat message');
     * const documentClick$ = fromEvent(document, 'click');
     *
     * source.pipe(repeatWhen(() => documentClick$)
     * ).subscribe(data => console.log(data))
     * ```
     * @see {@link repeat}
     * @see {@link retry}
     * @see {@link retryWhen}
     *
     * @param {function(notifications: Observable): Observable} notifier - Receives an Observable of notifications with
     * which a user can `complete` or `error`, aborting the repetition.
     * @return {Observable} The source Observable modified with repeat logic.
     * @name repeatWhen
     */
    function repeatWhen(notifier) {
      return (source) => source.lift(new RepeatWhenOperator(notifier));
    }
    exports_175("repeatWhen", repeatWhen);
    return {
      setters: [
        function (Subject_ts_8_1) {
          Subject_ts_8 = Subject_ts_8_1;
        },
        function (OuterSubscriber_ts_18_1) {
          OuterSubscriber_ts_18 = OuterSubscriber_ts_18_1;
        },
        function (subscribeToResult_ts_18_1) {
          subscribeToResult_ts_18 = subscribeToResult_ts_18_1;
        },
      ],
      execute: function () {
        RepeatWhenOperator = class RepeatWhenOperator {
          constructor(notifier) {
            this.notifier = notifier;
          }
          call(subscriber, source) {
            return source.subscribe(
              new RepeatWhenSubscriber(subscriber, this.notifier, source),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        RepeatWhenSubscriber = class RepeatWhenSubscriber
          extends OuterSubscriber_ts_18.OuterSubscriber {
          constructor(destination, notifier, source) {
            super(destination);
            this.notifier = notifier;
            this.source = source;
            this.notifications = null;
            this.retries = null;
            this.retriesSubscription = null;
            this.sourceIsBeingSubscribedTo = true;
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.sourceIsBeingSubscribedTo = true;
            this.source.subscribe(this);
          }
          notifyComplete(innerSub) {
            if (this.sourceIsBeingSubscribedTo === false) {
              return super.complete();
            }
          }
          complete() {
            this.sourceIsBeingSubscribedTo = false;
            if (!this.isStopped) {
              if (!this.retries) {
                this.subscribeToRetries();
              }
              if (
                !this.retriesSubscription || this.retriesSubscription.closed
              ) {
                return super.complete();
              }
              this._unsubscribeAndRecycle();
              this.notifications.next();
            }
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _unsubscribe() {
            const { notifications, retriesSubscription } = this;
            if (notifications) {
              notifications.unsubscribe();
              this.notifications = null;
            }
            if (retriesSubscription) {
              retriesSubscription.unsubscribe();
              this.retriesSubscription = null;
            }
            this.retries = null;
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _unsubscribeAndRecycle() {
            const { _unsubscribe } = this;
            this._unsubscribe = null;
            super._unsubscribeAndRecycle();
            this._unsubscribe = _unsubscribe;
            return this;
          }
          subscribeToRetries() {
            this.notifications = new Subject_ts_8.Subject();
            let retries;
            try {
              const { notifier } = this;
              retries = notifier(this.notifications);
            } catch (e) {
              return super.complete();
            }
            this.retries = retries;
            this.retriesSubscription = subscribeToResult_ts_18
              .subscribeToResult(this, retries);
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/retry",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_176, context_176) {
    "use strict";
    var Subscriber_ts_35, RetryOperator, RetrySubscriber;
    var __moduleName = context_176 && context_176.id;
    function retry(configOrCount = -1) {
      let config;
      if (configOrCount && typeof configOrCount === "object") {
        config = configOrCount;
      } else {
        config = {
          count: configOrCount,
        };
      }
      return (source) =>
        source.lift(
          new RetryOperator(config.count, !!config.resetOnSuccess, source),
        );
    }
    exports_176("retry", retry);
    return {
      setters: [
        function (Subscriber_ts_35_1) {
          Subscriber_ts_35 = Subscriber_ts_35_1;
        },
      ],
      execute: function () {
        RetryOperator = class RetryOperator {
          constructor(count, resetOnSuccess, source) {
            this.count = count;
            this.resetOnSuccess = resetOnSuccess;
            this.source = source;
          }
          call(subscriber, source) {
            return source.subscribe(
              new RetrySubscriber(
                subscriber,
                this.count,
                this.resetOnSuccess,
                this.source,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        RetrySubscriber = class RetrySubscriber
          extends Subscriber_ts_35.Subscriber {
          constructor(destination, count, resetOnSuccess, source) {
            super(destination);
            this.count = count;
            this.resetOnSuccess = resetOnSuccess;
            this.source = source;
            this.initialCount = this.count;
          }
          next(value) {
            super.next(value);
            if (this.resetOnSuccess) {
              this.count = this.initialCount;
            }
          }
          error(err) {
            if (!this.isStopped) {
              const { source, count } = this;
              if (count === 0) {
                return super.error(err);
              } else if (count > -1) {
                this.count = count - 1;
              }
              source.subscribe(this._unsubscribeAndRecycle());
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/retryWhen",
  [
    "https://deno.land/x/rxjs/src/internal/Subject",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_177, context_177) {
    "use strict";
    var Subject_ts_9,
      OuterSubscriber_ts_19,
      subscribeToResult_ts_19,
      RetryWhenOperator,
      RetryWhenSubscriber;
    var __moduleName = context_177 && context_177.id;
    /**
     * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
     * calls `error`, this method will emit the Throwable that caused the error to the Observable returned from `notifier`.
     * If that Observable calls `complete` or `error` then this method will call `complete` or `error` on the child
     * subscription. Otherwise this method will resubscribe to the source Observable.
     *
     * ![](retryWhen.png)
     *
     * Retry an observable sequence on error based on custom criteria.
     *
     * ## Example
     * ```ts
     * import { timer, interval } from 'rxjs.ts';
     * import { map, tap, retryWhen, delayWhen } from 'rxjs/operators.ts';
     *
     * const source = interval(1000);
     * const example = source.pipe(
     *   map(val => {
     *     if (val > 5) {
     *       // error will be picked up by retryWhen
     *       throw val;
     *     }
     *     return val;
     *   }),
     *   retryWhen(errors =>
     *     errors.pipe(
     *       // log error message
     *       tap(val => console.log(`Value ${val} was too high!`)),
     *       // restart in 5 seconds
     *       delayWhen(val => timer(val * 1000))
     *     )
     *   )
     * );
     *
     * const subscribe = example.subscribe(val => console.log(val));
     *
     * // results:
     * //   0
     * //   1
     * //   2
     * //   3
     * //   4
     * //   5
     * //   "Value 6 was too high!"
     * //  --Wait 5 seconds then repeat
     * ```
     *
     * @param {function(errors: Observable): Observable} notifier - Receives an Observable of notifications with which a
     * user can `complete` or `error`, aborting the retry.
     * @return {Observable} The source Observable modified with retry logic.
     * @name retryWhen
     */
    function retryWhen(notifier) {
      return (source) => source.lift(new RetryWhenOperator(notifier, source));
    }
    exports_177("retryWhen", retryWhen);
    return {
      setters: [
        function (Subject_ts_9_1) {
          Subject_ts_9 = Subject_ts_9_1;
        },
        function (OuterSubscriber_ts_19_1) {
          OuterSubscriber_ts_19 = OuterSubscriber_ts_19_1;
        },
        function (subscribeToResult_ts_19_1) {
          subscribeToResult_ts_19 = subscribeToResult_ts_19_1;
        },
      ],
      execute: function () {
        RetryWhenOperator = class RetryWhenOperator {
          constructor(notifier, source) {
            this.notifier = notifier;
            this.source = source;
          }
          call(subscriber, source) {
            return source.subscribe(
              new RetryWhenSubscriber(subscriber, this.notifier, this.source),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        RetryWhenSubscriber = class RetryWhenSubscriber
          extends OuterSubscriber_ts_19.OuterSubscriber {
          constructor(destination, notifier, source) {
            super(destination);
            this.notifier = notifier;
            this.source = source;
            this.errors = null;
            this.retries = null;
            this.retriesSubscription = null;
          }
          error(err) {
            if (!this.isStopped) {
              let errors = this.errors;
              let retries = this.retries;
              let retriesSubscription = this.retriesSubscription;
              if (!retries) {
                errors = new Subject_ts_9.Subject();
                try {
                  const { notifier } = this;
                  retries = notifier(errors);
                } catch (e) {
                  return super.error(e);
                }
                retriesSubscription = subscribeToResult_ts_19.subscribeToResult(
                  this,
                  retries,
                );
              } else {
                this.errors = null;
                this.retriesSubscription = null;
              }
              this._unsubscribeAndRecycle();
              this.errors = errors;
              this.retries = retries;
              this.retriesSubscription = retriesSubscription;
              errors.next(err);
            }
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _unsubscribe() {
            const { errors, retriesSubscription } = this;
            if (errors) {
              errors.unsubscribe();
              this.errors = null;
            }
            if (retriesSubscription) {
              retriesSubscription.unsubscribe();
              this.retriesSubscription = null;
            }
            this.retries = null;
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            const { _unsubscribe } = this;
            this._unsubscribe = null;
            this._unsubscribeAndRecycle();
            this._unsubscribe = _unsubscribe;
            this.source.subscribe(this);
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/sample",
  [
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_178, context_178) {
    "use strict";
    var OuterSubscriber_ts_20,
      subscribeToResult_ts_20,
      SampleOperator,
      SampleSubscriber;
    var __moduleName = context_178 && context_178.id;
    /**
     * Emits the most recently emitted value from the source Observable whenever
     * another Observable, the `notifier`, emits.
     *
     * <span class="informal">It's like {@link sampleTime}, but samples whenever
     * the `notifier` Observable emits something.</span>
     *
     * ![](sample.png)
     *
     * Whenever the `notifier` Observable emits a value or completes, `sample`
     * looks at the source Observable and emits whichever value it has most recently
     * emitted since the previous sampling, unless the source has not emitted
     * anything since the previous sampling. The `notifier` is subscribed to as soon
     * as the output Observable is subscribed.
     *
     * ## Example
     * On every click, sample the most recent "seconds" timer
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { sample } from 'rxjs/operators.ts';
     *
     * const seconds = interval(1000);
     * const clicks = fromEvent(document, 'click');
     * const result = seconds.pipe(sample(clicks));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link audit}
     * @see {@link debounce}
     * @see {@link sampleTime}
     * @see {@link throttle}
     *
     * @param {Observable<any>} notifier The Observable to use for sampling the
     * source Observable.
     * @return {Observable<T>} An Observable that emits the results of sampling the
     * values emitted by the source Observable whenever the notifier Observable
     * emits value or completes.
     * @name sample
     */
    function sample(notifier) {
      return (source) => source.lift(new SampleOperator(notifier));
    }
    exports_178("sample", sample);
    return {
      setters: [
        function (OuterSubscriber_ts_20_1) {
          OuterSubscriber_ts_20 = OuterSubscriber_ts_20_1;
        },
        function (subscribeToResult_ts_20_1) {
          subscribeToResult_ts_20 = subscribeToResult_ts_20_1;
        },
      ],
      execute: function () {
        SampleOperator = class SampleOperator {
          constructor(notifier) {
            this.notifier = notifier;
          }
          call(subscriber, source) {
            const sampleSubscriber = new SampleSubscriber(subscriber);
            const subscription = source.subscribe(sampleSubscriber);
            subscription.add(
              subscribeToResult_ts_20.subscribeToResult(
                sampleSubscriber,
                this.notifier,
              ),
            );
            return subscription;
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        SampleSubscriber = class SampleSubscriber
          extends OuterSubscriber_ts_20.OuterSubscriber {
          constructor() {
            super(...arguments);
            this.hasValue = false;
          }
          _next(value) {
            this.value = value;
            this.hasValue = true;
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.emitValue();
          }
          notifyComplete() {
            this.emitValue();
          }
          emitValue() {
            if (this.hasValue) {
              this.hasValue = false;
              this.destination.next(this.value);
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/sampleTime",
  [
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/scheduler/async",
  ],
  function (exports_179, context_179) {
    "use strict";
    var Subscriber_ts_36, async_ts_8, SampleTimeOperator, SampleTimeSubscriber;
    var __moduleName = context_179 && context_179.id;
    /**
     * Emits the most recently emitted value from the source Observable within
     * periodic time intervals.
     *
     * <span class="informal">Samples the source Observable at periodic time
     * intervals, emitting what it samples.</span>
     *
     * ![](sampleTime.png)
     *
     * `sampleTime` periodically looks at the source Observable and emits whichever
     * value it has most recently emitted since the previous sampling, unless the
     * source has not emitted anything since the previous sampling. The sampling
     * happens periodically in time every `period` milliseconds (or the time unit
     * defined by the optional `scheduler` argument). The sampling starts as soon as
     * the output Observable is subscribed.
     *
     * ## Example
     * Every second, emit the most recent click at most once
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { sampleTime } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(sampleTime(1000));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link auditTime}
     * @see {@link debounceTime}
     * @see {@link delay}
     * @see {@link sample}
     * @see {@link throttleTime}
     *
     * @param {number} period The sampling period expressed in milliseconds or the
     * time unit determined internally by the optional `scheduler`.
     * @param {SchedulerLike} [scheduler=async] The {@link SchedulerLike} to use for
     * managing the timers that handle the sampling.
     * @return {Observable<T>} An Observable that emits the results of sampling the
     * values emitted by the source Observable at the specified time interval.
     * @name sampleTime
     */
    function sampleTime(period, scheduler = async_ts_8.async) {
      return (source) => source.lift(new SampleTimeOperator(period, scheduler));
    }
    exports_179("sampleTime", sampleTime);
    function dispatchNotification(state) {
      let { subscriber, period } = state;
      subscriber.notifyNext();
      this.schedule(state, period);
    }
    return {
      setters: [
        function (Subscriber_ts_36_1) {
          Subscriber_ts_36 = Subscriber_ts_36_1;
        },
        function (async_ts_8_1) {
          async_ts_8 = async_ts_8_1;
        },
      ],
      execute: function () {
        SampleTimeOperator = class SampleTimeOperator {
          constructor(period, scheduler) {
            this.period = period;
            this.scheduler = scheduler;
          }
          call(subscriber, source) {
            return source.subscribe(
              new SampleTimeSubscriber(subscriber, this.period, this.scheduler),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        SampleTimeSubscriber = class SampleTimeSubscriber
          extends Subscriber_ts_36.Subscriber {
          constructor(destination, period, scheduler) {
            super(destination);
            this.period = period;
            this.scheduler = scheduler;
            this.hasValue = false;
            this.add(
              scheduler.schedule(
                dispatchNotification,
                period,
                { subscriber: this, period },
              ),
            );
          }
          _next(value) {
            this.lastValue = value;
            this.hasValue = true;
          }
          notifyNext() {
            if (this.hasValue) {
              this.hasValue = false;
              this.destination.next(this.lastValue);
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/sequenceEqual",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_180, context_180) {
    "use strict";
    var Subscriber_ts_37,
      SequenceEqualOperator,
      SequenceEqualSubscriber,
      SequenceEqualCompareToSubscriber;
    var __moduleName = context_180 && context_180.id;
    /**
     * Compares all values of two observables in sequence using an optional comparator function
     * and returns an observable of a single boolean value representing whether or not the two sequences
     * are equal.
     *
     * <span class="informal">Checks to see of all values emitted by both observables are equal, in order.</span>
     *
     * ![](sequenceEqual.png)
     *
     * `sequenceEqual` subscribes to two observables and buffers incoming values from each observable. Whenever either
     * observable emits a value, the value is buffered and the buffers are shifted and compared from the bottom
     * up; If any value pair doesn't match, the returned observable will emit `false` and complete. If one of the
     * observables completes, the operator will wait for the other observable to complete; If the other
     * observable emits before completing, the returned observable will emit `false` and complete. If one observable never
     * completes or emits after the other completes, the returned observable will never complete.
     *
     * ## Example
     * figure out if the Konami code matches
     * ```ts
     * import { from, fromEvent } from 'rxjs.ts';
     * import { sequenceEqual, bufferCount, mergeMap, map } from 'rxjs/operators.ts';
     *
     * const codes = from([
     *   'ArrowUp',
     *   'ArrowUp',
     *   'ArrowDown',
     *   'ArrowDown',
     *   'ArrowLeft',
     *   'ArrowRight',
     *   'ArrowLeft',
     *   'ArrowRight',
     *   'KeyB',
     *   'KeyA',
     *   'Enter', // no start key, clearly.
     * ]);
     *
     * const keys = fromEvent(document, 'keyup').pipe(map(e => e.code));
     * const matches = keys.pipe(
     *   bufferCount(11, 1),
     *   mergeMap(
     *     last11 => from(last11).pipe(sequenceEqual(codes)),
     *   ),
     * );
     * matches.subscribe(matched => console.log('Successful cheat at Contra? ', matched));
     * ```
     *
     * @see {@link combineLatest}
     * @see {@link zip}
     * @see {@link withLatestFrom}
     *
     * @param {Observable} compareTo The observable sequence to compare the source sequence to.
     * @param {function} [comparator] An optional function to compare each value pair
     * @return {Observable} An Observable of a single boolean value representing whether or not
     * the values emitted by both observables were equal in sequence.
     * @name sequenceEqual
     */
    function sequenceEqual(compareTo, comparator) {
      return (source) =>
        source.lift(new SequenceEqualOperator(compareTo, comparator));
    }
    exports_180("sequenceEqual", sequenceEqual);
    return {
      setters: [
        function (Subscriber_ts_37_1) {
          Subscriber_ts_37 = Subscriber_ts_37_1;
        },
      ],
      execute: function () {
        SequenceEqualOperator = class SequenceEqualOperator {
          constructor(compareTo, comparator) {
            this.compareTo = compareTo;
            this.comparator = comparator;
          }
          call(subscriber, source) {
            return source.subscribe(
              new SequenceEqualSubscriber(
                subscriber,
                this.compareTo,
                this.comparator,
              ),
            );
          }
        };
        exports_180("SequenceEqualOperator", SequenceEqualOperator);
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        SequenceEqualSubscriber = class SequenceEqualSubscriber
          extends Subscriber_ts_37.Subscriber {
          constructor(destination, compareTo, comparator) {
            super(destination);
            this.compareTo = compareTo;
            this.comparator = comparator;
            this._a = [];
            this._b = [];
            this._oneComplete = false;
            this.destination.add(
              compareTo.subscribe(
                new SequenceEqualCompareToSubscriber(destination, this),
              ),
            );
          }
          _next(value) {
            if (this._oneComplete && this._b.length === 0) {
              this.emit(false);
            } else {
              this._a.push(value);
              this.checkValues();
            }
          }
          _complete() {
            if (this._oneComplete) {
              this.emit(this._a.length === 0 && this._b.length === 0);
            } else {
              this._oneComplete = true;
            }
            this.unsubscribe();
          }
          checkValues() {
            const { _a, _b, comparator } = this;
            while (_a.length > 0 && _b.length > 0) {
              let a = _a.shift();
              let b = _b.shift();
              let areEqual = false;
              try {
                areEqual = comparator ? comparator(a, b) : a === b;
              } catch (e) {
                this.destination.error(e);
              }
              if (!areEqual) {
                this.emit(false);
              }
            }
          }
          emit(value) {
            const { destination } = this;
            destination.next(value);
            destination.complete();
          }
          nextB(value) {
            if (this._oneComplete && this._a.length === 0) {
              this.emit(false);
            } else {
              this._b.push(value);
              this.checkValues();
            }
          }
          completeB() {
            if (this._oneComplete) {
              this.emit(this._a.length === 0 && this._b.length === 0);
            } else {
              this._oneComplete = true;
            }
          }
        };
        exports_180("SequenceEqualSubscriber", SequenceEqualSubscriber);
        SequenceEqualCompareToSubscriber =
          class SequenceEqualCompareToSubscriber
            extends Subscriber_ts_37.Subscriber {
            constructor(destination, parent) {
              super(destination);
              this.parent = parent;
            }
            _next(value) {
              this.parent.nextB(value);
            }
            _error(err) {
              this.parent.error(err);
              this.unsubscribe();
            }
            _complete() {
              this.parent.completeB();
              this.unsubscribe();
            }
          };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/share",
  [
    "https://deno.land/x/rxjs/src/internal/operators/multicast",
    "https://deno.land/x/rxjs/src/internal/operators/refCount",
    "https://deno.land/x/rxjs/src/internal/Subject",
  ],
  function (exports_181, context_181) {
    "use strict";
    var multicast_ts_5, refCount_ts_2, Subject_ts_10;
    var __moduleName = context_181 && context_181.id;
    function shareSubjectFactory() {
      return new Subject_ts_10.Subject();
    }
    /**
     * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
     * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
     * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
     * This is an alias for `multicast(() => new Subject()), refCount()`.
     *
     * ![](share.png)
     *
     * ## Example
     * Generate new multicast Observable from the source Observable value
     * ```typescript
     * import { interval } from 'rxjs.ts';
     * import { share, map } from 'rxjs/operators.ts';
     *
     * const source = interval(1000)
     *   .pipe(
     *         map((x: number) => {
     *             console.log('Processing: ', x);
     *             return x*x;
     *         }),
     *         share()
     * );
     *
     * source.subscribe(x => console.log('subscription 1: ', x));
     * source.subscribe(x => console.log('subscription 1: ', x));
     *
     * // Logs:
     * // Processing:  0
     * // subscription 1:  0
     * // subscription 1:  0
     * // Processing:  1
     * // subscription 1:  1
     * // subscription 1:  1
     * // Processing:  2
     * // subscription 1:  4
     * // subscription 1:  4
     * // Processing:  3
     * // subscription 1:  9
     * // subscription 1:  9
     * // ... and so on
     * ```
     *
     * @see {@link api/index/function/interval}
     * @see {@link map}
     *
     * @return {Observable<T>} An Observable that upon connection causes the source Observable to emit items to its Observers.
     * @name share
     */
    function share() {
      return (source) =>
        refCount_ts_2.refCount()(
          multicast_ts_5.multicast(shareSubjectFactory)(source),
        );
    }
    exports_181("share", share);
    return {
      setters: [
        function (multicast_ts_5_1) {
          multicast_ts_5 = multicast_ts_5_1;
        },
        function (refCount_ts_2_1) {
          refCount_ts_2 = refCount_ts_2_1;
        },
        function (Subject_ts_10_1) {
          Subject_ts_10 = Subject_ts_10_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/shareReplay",
  ["https://deno.land/x/rxjs/src/internal/ReplaySubject"],
  function (exports_182, context_182) {
    "use strict";
    var ReplaySubject_ts_3;
    var __moduleName = context_182 && context_182.id;
    /**
     * Share source and replay specified number of emissions on subscription.
     *
     * This operator is a specialization of `replay` that connects to a source observable
     * and multicasts through a `ReplaySubject` constructed with the specified arguments.
     * A successfully completed source will stay cached in the `shareReplayed observable` forever,
     * but an errored source can be retried.
     *
     * ## Why use shareReplay?
     * You generally want to use `shareReplay` when you have side-effects or taxing computations
     * that you do not wish to be executed amongst multiple subscribers.
     * It may also be valuable in situations where you know you will have late subscribers to
     * a stream that need access to previously emitted values.
     * This ability to replay values on subscription is what differentiates {@link share} and `shareReplay`.
     *
     * ![](shareReplay.png)
     *
     * ## Reference counting
     * As of RXJS version 6.4.0 a new overload signature was added to allow for manual control over what
     * happens when the operators internal reference counter drops to zero.
     * If `refCount` is true, the source will be unsubscribed from once the reference count drops to zero, i.e.
     * the inner `ReplaySubject` will be unsubscribed. All new subscribers will receive value emissions from a
     * new `ReplaySubject` which in turn will cause a new subscription to the source observable.
     * If `refCount` is false on the other hand, the source will not be unsubscribed meaning that the inner
     * `ReplaySubject` will still be subscribed to the source (and potentially run for ever).
     *
     * ## Example
     * ```ts
     * import { interval } from 'rxjs.ts';
     * import { shareReplay, take } from 'rxjs/operators.ts';
     *
     * const obs$ = interval(1000);
     * const shared$ = obs$.pipe(
     *   take(4),
     *   shareReplay(3)
     * );
     * shared$.subscribe(x => console.log('sub A: ', x));
     * shared$.subscribe(y => console.log('sub B: ', y));
     *
     * ```
     *
     * ## Example for refCount usage
     * ```ts
     * // Code take from https://blog.angularindepth.com/rxjs-whats-changed-with-sharereplay-65c098843e95
     * // and adapted to showcase the refCount property.
     * import { interval, Observable, defer } from 'rxjs.ts';
     * import { shareReplay, take, tap, finalize } from 'rxjs/operators.ts';
     *
     * const log = <T>(source: Observable<T>, name: string) => defer(() => {
     *   console.log(`${name}: subscribed`);
     *   return source.pipe(
     *     tap({
     *       next: value => console.log(`${name}: ${value}`),
     *       complete: () => console.log(`${name}: complete`)
     *     }),
     *     finalize(() => console.log(`${name}: unsubscribed`))
     *   );
     * });
     *
     * const obs$ = log(interval(1000), 'source');
     *
     * const shared$ = log(obs$.pipe(
     *   shareReplay({bufferSize: 1, refCount: true }),
     *   take(2),
     * ), 'shared');
     *
     * shared$.subscribe(x => console.log('sub A: ', x));
     * shared$.subscribe(y => console.log('sub B: ', y));
     *
     * // PRINTS:
     * // shared: subscribed <-- reference count = 1
     * // source: subscribed
     * // shared: subscribed <-- reference count = 2
     * // source: 0
     * // shared: 0
     * // sub A: 0
     * // shared: 0
     * // sub B: 0
     * // source: 1
     * // shared: 1
     * // sub A: 1
     * // shared: complete <-- take(2) completes the subscription for sub A
     * // shared: unsubscribed <-- reference count = 1
     * // shared: 1
     * // sub B: 1
     * // shared: complete <-- take(2) completes the subscription for sub B
     * // shared: unsubscribed <-- reference count = 0
     * // source: unsubscribed <-- replaySubject unsubscribes from source observable because the reference count dropped to 0 and refCount is true
     *
     * // In case of refCount being false, the unsubscribe is never called on the source and the source would keep on emitting, even if no subscribers
     * // are listening.
     * // source: 2
     * // source: 3
     * // source: 4
     * // ...
     * ```
     *
     * @see {@link publish}
     * @see {@link share}
     * @see {@link publishReplay}
     *
     * @param {Number} [bufferSize=Infinity] Maximum element count of the replay buffer.
     * @param {Number} [windowTime=Infinity] Maximum time length of the replay buffer in milliseconds.
     * @param {Scheduler} [scheduler] Scheduler where connected observers within the selector function
     * will be invoked on.
     * @return {Observable} An observable sequence that contains the elements of a sequence produced
     * by multicasting the source sequence within a selector function.
     * @name shareReplay
     */
    function shareReplay(configOrBufferSize, windowTime, scheduler) {
      let config;
      if (configOrBufferSize && typeof configOrBufferSize === "object") {
        config = configOrBufferSize;
      } else {
        config = {
          bufferSize: configOrBufferSize,
          windowTime,
          refCount: false,
          scheduler,
        };
      }
      return (source) => source.lift(shareReplayOperator(config));
    }
    exports_182("shareReplay", shareReplay);
    function shareReplayOperator(
      {
        bufferSize = Infinity,
        windowTime = Infinity,
        refCount: useRefCount,
        scheduler,
      },
    ) {
      let subject;
      let refCount = 0;
      let subscription;
      let hasError = false;
      return function shareReplayOperation(source) {
        refCount++;
        if (!subject || hasError) {
          hasError = false;
          subject = new ReplaySubject_ts_3.ReplaySubject(
            bufferSize,
            windowTime,
            scheduler,
          );
          subscription = source.subscribe({
            next(value) {
              subject.next(value);
            },
            error(err) {
              hasError = true;
              subject.error(err);
            },
            complete() {
              subscription = undefined;
              subject.complete();
            },
          });
        }
        const innerSub = subject.subscribe(this);
        this.add(() => {
          refCount--;
          innerSub.unsubscribe();
          if (subscription && useRefCount && refCount === 0) {
            subscription.unsubscribe();
            subscription = undefined;
            subject = undefined;
          }
        });
      };
    }
    return {
      setters: [
        function (ReplaySubject_ts_3_1) {
          ReplaySubject_ts_3 = ReplaySubject_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/single",
  [
    "https://deno.land/x/rxjs/src/internal/util/EmptyError",
    "https://deno.land/x/rxjs/src/internal/util/SequenceError",
    "https://deno.land/x/rxjs/src/internal/util/NotFoundError",
  ],
  function (exports_183, context_183) {
    "use strict";
    var EmptyError_ts_7,
      SequenceError_ts_2,
      NotFoundError_ts_2,
      defaultPredicate;
    var __moduleName = context_183 && context_183.id;
    /**
     * Returns an observable that asserts that only one value is
     * emitted from the observable that matches the predicate. If no
     * predicate is provided, then it will assert that the observable
     * only emits one value.
     *
     * In the event that the observable is empty, it will throw an
     * {@link EmptyError}.
     *
     * In the event that two values are found that match the predicate,
     * or when there are two values emitted and no predicate, it will
     * throw a {@link SequenceError}
     *
     * In the event that no values match the predicate, if one is provided,
     * it will throw a {@link NotFoundError}
     *
     * ## Example
     *
     * Expect only name beginning with 'B':
     *
     * ```ts
     * import { of } from 'rxjs.ts';
     * import { single } from 'rxjs/operators.ts';
     *
     * const source1 = of(
     *  { name: 'Ben' },
     *  { name: 'Tracy' },
     *  { name: 'Laney' },
     *  { name: 'Lily' }
     * );
     *
     * source1.pipe(
     *   single(x => x.name.startsWith('B'))
     * )
     * .subscribe(x => console.log(x));
     * // Emits "Ben"
     *
     *
     * const source2 = of(
     *  { name: 'Ben' },
     *  { name: 'Tracy' },
     *  { name: 'Bradley' },
     *  { name: 'Lincoln' }
     * );
     *
     * source2.pipe(
     *   single(x => x.name.startsWith('B'))
     * )
     * .subscribe(x => console.log(x));
     * // Error emitted: SequenceError('Too many values match')
     *
     *
     * const source3 = of(
     *  { name: 'Laney' },
     *  { name: 'Tracy' },
     *  { name: 'Lily' },
     *  { name: 'Lincoln' }
     * );
     *
     * source3.pipe(
     *   single(x => x.name.startsWith('B'))
     * )
     * .subscribe(x => console.log(x));
     * // Error emitted: NotFoundError('No values match')
     * ```
     *
     * @see {@link first}
     * @see {@link find}
     * @see {@link findIndex}
     * @see {@link elementAt}
     *
     * @throws {NotFoundError} Delivers an NotFoundError to the Observer's `error`
     * callback if the Observable completes before any `next` notification was sent.
     * @throws {SequenceError} Delivers a SequenceError if more than one value is emitted that matches the
     * provided predicate. If no predicate is provided, will deliver a SequenceError if more
     * that one value comes from the source
     * @param {Function} predicate - A predicate function to evaluate items emitted by the source Observable.
     * @return {Observable<T>} An Observable that emits the single item emitted by the source Observable that matches
     * the predicate or `undefined` when no items match.
     */
    function single(predicate = defaultPredicate) {
      return (source) => source.lift(singleOperator(predicate));
    }
    exports_183("single", single);
    function singleOperator(predicate) {
      return function (source) {
        let _hasValue = false;
        let _seenValue = false;
        let _value;
        let _i = 0;
        const _destination = this;
        return source.subscribe({
          next: (value) => {
            _seenValue = true;
            let match = false;
            try {
              match = predicate(value, _i++, source);
            } catch (err) {
              _destination.error(err);
              return;
            }
            if (match) {
              if (_hasValue) {
                _destination.error(
                  new SequenceError_ts_2.SequenceError(
                    "Too many matching values",
                  ),
                );
              } else {
                _hasValue = true;
                _value = value;
              }
            }
          },
          error: (err) => _destination.error(err),
          complete: () => {
            if (_hasValue) {
              _destination.next(_value);
              _destination.complete();
            } else {
              _destination.error(
                _seenValue
                  ? new NotFoundError_ts_2.NotFoundError("No matching values")
                  : new EmptyError_ts_7.EmptyError(),
              );
            }
          },
        });
      };
    }
    return {
      setters: [
        function (EmptyError_ts_7_1) {
          EmptyError_ts_7 = EmptyError_ts_7_1;
        },
        function (SequenceError_ts_2_1) {
          SequenceError_ts_2 = SequenceError_ts_2_1;
        },
        function (NotFoundError_ts_2_1) {
          NotFoundError_ts_2 = NotFoundError_ts_2_1;
        },
      ],
      execute: function () {
        defaultPredicate = () => true;
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/skip",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_184, context_184) {
    "use strict";
    var Subscriber_ts_38, SkipOperator, SkipSubscriber;
    var __moduleName = context_184 && context_184.id;
    /**
     * Returns an Observable that skips the first `count` items emitted by the source Observable.
     *
     * ![](skip.png)
     *
     * @param {Number} count - The number of times, items emitted by source Observable should be skipped.
     * @return {Observable} An Observable that skips values emitted by the source Observable.
     * @name skip
     */
    function skip(count) {
      return (source) => source.lift(new SkipOperator(count));
    }
    exports_184("skip", skip);
    return {
      setters: [
        function (Subscriber_ts_38_1) {
          Subscriber_ts_38 = Subscriber_ts_38_1;
        },
      ],
      execute: function () {
        SkipOperator = class SkipOperator {
          constructor(total) {
            this.total = total;
          }
          call(subscriber, source) {
            return source.subscribe(new SkipSubscriber(subscriber, this.total));
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        SkipSubscriber = class SkipSubscriber
          extends Subscriber_ts_38.Subscriber {
          constructor(destination, total) {
            super(destination);
            this.total = total;
            this.count = 0;
          }
          _next(x) {
            if (++this.count > this.total) {
              this.destination.next(x);
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/skipLast",
  [
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/util/ArgumentOutOfRangeError",
  ],
  function (exports_185, context_185) {
    "use strict";
    var Subscriber_ts_39,
      ArgumentOutOfRangeError_ts_5,
      SkipLastOperator,
      SkipLastSubscriber;
    var __moduleName = context_185 && context_185.id;
    /**
     * Skip the last `count` values emitted by the source Observable.
     *
     * ![](skipLast.png)
     *
     * `skipLast` returns an Observable that accumulates a queue with a length
     * enough to store the first `count` values. As more values are received,
     * values are taken from the front of the queue and produced on the result
     * sequence. This causes values to be delayed.
     *
     * ## Example
     * Skip the last 2 values of an Observable with many values
     * ```ts
     * import { range } from 'rxjs.ts';
     * import { skipLast } from 'rxjs/operators.ts';
     *
     * const many = range(1, 5);
     * const skipLastTwo = many.pipe(skipLast(2));
     * skipLastTwo.subscribe(x => console.log(x));
     *
     * // Results in:
     * // 1 2 3
     * ```
     *
     * @see {@link skip}
     * @see {@link skipUntil}
     * @see {@link skipWhile}
     * @see {@link take}
     *
     * @throws {ArgumentOutOfRangeError} When using `skipLast(i)`, it throws
     * ArgumentOutOrRangeError if `i < 0`.
     *
     * @param {number} count Number of elements to skip from the end of the source Observable.
     * @returns {Observable<T>} An Observable that skips the last count values
     * emitted by the source Observable.
     * @name skipLast
     */
    function skipLast(count) {
      return (source) => source.lift(new SkipLastOperator(count));
    }
    exports_185("skipLast", skipLast);
    return {
      setters: [
        function (Subscriber_ts_39_1) {
          Subscriber_ts_39 = Subscriber_ts_39_1;
        },
        function (ArgumentOutOfRangeError_ts_5_1) {
          ArgumentOutOfRangeError_ts_5 = ArgumentOutOfRangeError_ts_5_1;
        },
      ],
      execute: function () {
        SkipLastOperator = class SkipLastOperator {
          constructor(_skipCount) {
            this._skipCount = _skipCount;
            if (this._skipCount < 0) {
              throw new ArgumentOutOfRangeError_ts_5.ArgumentOutOfRangeError();
            }
          }
          call(subscriber, source) {
            if (this._skipCount === 0) {
              // If we don't want to skip any values then just subscribe
              // to Subscriber without any further logic.
              return source.subscribe(
                new Subscriber_ts_39.Subscriber(subscriber),
              );
            } else {
              return source.subscribe(
                new SkipLastSubscriber(subscriber, this._skipCount),
              );
            }
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        SkipLastSubscriber = class SkipLastSubscriber
          extends Subscriber_ts_39.Subscriber {
          constructor(destination, _skipCount) {
            super(destination);
            this._skipCount = _skipCount;
            this._count = 0;
            this._ring = new Array(_skipCount);
          }
          _next(value) {
            const skipCount = this._skipCount;
            const count = this._count++;
            if (count < skipCount) {
              this._ring[count] = value;
            } else {
              const currentIndex = count % skipCount;
              const ring = this._ring;
              const oldValue = ring[currentIndex];
              ring[currentIndex] = value;
              this.destination.next(oldValue);
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/skipUntil",
  [
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/InnerSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_186, context_186) {
    "use strict";
    var OuterSubscriber_ts_21,
      InnerSubscriber_ts_7,
      subscribeToResult_ts_21,
      SkipUntilOperator,
      SkipUntilSubscriber;
    var __moduleName = context_186 && context_186.id;
    /**
     * Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
     *
     * The `skipUntil` operator causes the observable stream to skip the emission of values ​​until the passed in observable emits the first value.
     * This can be particularly useful in combination with user interactions, responses of http requests or waiting for specific times to pass by.
     *
     * ![](skipUntil.png)
     *
     * Internally the `skipUntil` operator subscribes to the passed in observable (in the following called *notifier*) in order to recognize the emission
     * of its first value. When this happens, the operator unsubscribes from the *notifier* and starts emitting the values of the *source*
     * observable. It will never let the *source* observable emit any values if the *notifier* completes or throws an error without emitting
     * a value before.
     *
     * ## Example
     *
     * In the following example, all emitted values ​​of the interval observable are skipped until the user clicks anywhere within the page.
     *
     * ```ts
     * import { interval, fromEvent } from 'rxjs.ts';
     * import { skipUntil } from 'rxjs/operators.ts';
     *
     * const intervalObservable = interval(1000);
     * const click = fromEvent(document, 'click');
     *
     * const emitAfterClick = intervalObservable.pipe(
     *   skipUntil(click)
     * );
     * // clicked at 4.6s. output: 5...6...7...8........ or
     * // clicked at 7.3s. output: 8...9...10..11.......
     * const subscribe = emitAfterClick.subscribe(value => console.log(value));
     * ```
     *
     * @param {Observable} notifier - The second Observable that has to emit an item before the source Observable's elements begin to
     * be mirrored by the resulting Observable.
     * @return {Observable<T>} An Observable that skips items from the source Observable until the second Observable emits
     * an item, then emits the remaining items.
     * @name skipUntil
     */
    function skipUntil(notifier) {
      return (source) => source.lift(new SkipUntilOperator(notifier));
    }
    exports_186("skipUntil", skipUntil);
    return {
      setters: [
        function (OuterSubscriber_ts_21_1) {
          OuterSubscriber_ts_21 = OuterSubscriber_ts_21_1;
        },
        function (InnerSubscriber_ts_7_1) {
          InnerSubscriber_ts_7 = InnerSubscriber_ts_7_1;
        },
        function (subscribeToResult_ts_21_1) {
          subscribeToResult_ts_21 = subscribeToResult_ts_21_1;
        },
      ],
      execute: function () {
        SkipUntilOperator = class SkipUntilOperator {
          constructor(notifier) {
            this.notifier = notifier;
          }
          call(destination, source) {
            return source.subscribe(
              new SkipUntilSubscriber(destination, this.notifier),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        SkipUntilSubscriber = class SkipUntilSubscriber
          extends OuterSubscriber_ts_21.OuterSubscriber {
          constructor(destination, notifier) {
            super(destination);
            this.hasValue = false;
            const innerSubscriber = new InnerSubscriber_ts_7.InnerSubscriber(
              this,
              undefined,
              undefined,
            );
            this.add(innerSubscriber);
            this.innerSubscription = innerSubscriber;
            subscribeToResult_ts_21.subscribeToResult(
              this,
              notifier,
              undefined,
              undefined,
              innerSubscriber,
            );
          }
          _next(value) {
            if (this.hasValue) {
              super._next(value);
            }
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.hasValue = true;
            if (this.innerSubscription) {
              this.innerSubscription.unsubscribe();
            }
          }
          notifyComplete() {
            /* do nothing */
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/skipWhile",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_187, context_187) {
    "use strict";
    var Subscriber_ts_40, SkipWhileOperator, SkipWhileSubscriber;
    var __moduleName = context_187 && context_187.id;
    /**
     * Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds
     * true, but emits all further source items as soon as the condition becomes false.
     *
     * ![](skipWhile.png)
     *
     * @param {Function} predicate - A function to test each item emitted from the source Observable.
     * @return {Observable<T>} An Observable that begins emitting items emitted by the source Observable when the
     * specified predicate becomes false.
     * @name skipWhile
     */
    function skipWhile(predicate) {
      return (source) => source.lift(new SkipWhileOperator(predicate));
    }
    exports_187("skipWhile", skipWhile);
    return {
      setters: [
        function (Subscriber_ts_40_1) {
          Subscriber_ts_40 = Subscriber_ts_40_1;
        },
      ],
      execute: function () {
        SkipWhileOperator = class SkipWhileOperator {
          constructor(predicate) {
            this.predicate = predicate;
          }
          call(subscriber, source) {
            return source.subscribe(
              new SkipWhileSubscriber(subscriber, this.predicate),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        SkipWhileSubscriber = class SkipWhileSubscriber
          extends Subscriber_ts_40.Subscriber {
          constructor(destination, predicate) {
            super(destination);
            this.predicate = predicate;
            this.skipping = true;
            this.index = 0;
          }
          _next(value) {
            const destination = this.destination;
            if (this.skipping) {
              this.tryCallPredicate(value);
            }
            if (!this.skipping) {
              destination.next(value);
            }
          }
          tryCallPredicate(value) {
            try {
              const result = this.predicate(value, this.index++);
              this.skipping = Boolean(result);
            } catch (err) {
              this.destination.error(err);
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/startWith",
  [
    "https://deno.land/x/rxjs/src/internal/observable/concat",
    "https://deno.land/x/rxjs/src/internal/util/isScheduler",
  ],
  function (exports_188, context_188) {
    "use strict";
    var concat_ts_5, isScheduler_ts_9;
    var __moduleName = context_188 && context_188.id;
    /**
     * Returns an observable that, at the moment of subscription, will synchronously emit all
     * values provided to this operator, then subscribe to the source and mirror all of its emissions
     * to subscribers.
     *
     * This is a useful way to know when subscription has occurred on an existing observable.
     *
     * <span class="informal">First emits its arguments in order, and then any
     * emissions from the source.</span>
     *
     * ![](startWith.png)
     *
     * ## Examples
     *
     * Emit a value when a timer starts.
     *
     * ```ts
     * import { timer } from 'rxjs.ts';
     * import { startWith, map } from 'rxjs/operators.ts';
     *
     * timer(1000)
     *   .pipe(
     *     map(() => 'timer emit'),
     *     startWith('timer start')
     *   )
     *   .subscribe(x => console.log(x));
     *
     * // results:
     * // "timer start"
     * // "timer emit"
     * ```
     *
     * @param values Items you want the modified Observable to emit first.
     *
     * @see endWith
     * @see finalize
     * @see concat
     */
    function startWith(...values) {
      const scheduler = values[values.length - 1];
      if (isScheduler_ts_9.isScheduler(scheduler)) {
        // deprecated path
        values.pop();
        return (source) => concat_ts_5.concat(values, source, scheduler);
      } else {
        return (source) => concat_ts_5.concat(values, source);
      }
    }
    exports_188("startWith", startWith);
    return {
      setters: [
        function (concat_ts_5_1) {
          concat_ts_5 = concat_ts_5_1;
        },
        function (isScheduler_ts_9_1) {
          isScheduler_ts_9 = isScheduler_ts_9_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/observable/SubscribeOnObservable",
  [
    "https://deno.land/x/rxjs/src/internal/Observable",
    "https://deno.land/x/rxjs/src/internal/scheduler/asap",
    "https://deno.land/x/rxjs/src/internal/util/isNumeric",
  ],
  function (exports_189, context_189) {
    "use strict";
    var Observable_ts_34, asap_ts_2, isNumeric_ts_3, SubscribeOnObservable;
    var __moduleName = context_189 && context_189.id;
    return {
      setters: [
        function (Observable_ts_34_1) {
          Observable_ts_34 = Observable_ts_34_1;
        },
        function (asap_ts_2_1) {
          asap_ts_2 = asap_ts_2_1;
        },
        function (isNumeric_ts_3_1) {
          isNumeric_ts_3 = isNumeric_ts_3_1;
        },
      ],
      execute: function () {
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
        SubscribeOnObservable = class SubscribeOnObservable
          extends Observable_ts_34.Observable {
          constructor(source, delayTime = 0, scheduler = asap_ts_2.asap) {
            super();
            this.source = source;
            this.delayTime = delayTime;
            this.scheduler = scheduler;
            if (!isNumeric_ts_3.isNumeric(delayTime) || delayTime < 0) {
              this.delayTime = 0;
            }
            if (!scheduler || typeof scheduler.schedule !== "function") {
              this.scheduler = asap_ts_2.asap;
            }
          }
          /** @nocollapse */
          static create(source, delay = 0, scheduler = asap_ts_2.asap) {
            return new SubscribeOnObservable(source, delay, scheduler);
          }
          /** @nocollapse */
          static dispatch(arg) {
            const { source, subscriber } = arg;
            return this.add(source.subscribe(subscriber));
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _subscribe(subscriber) {
            const delay = this.delayTime;
            const source = this.source;
            const scheduler = this.scheduler;
            return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
              source,
              subscriber,
            });
          }
        };
        exports_189("SubscribeOnObservable", SubscribeOnObservable);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/subscribeOn",
  ["https://deno.land/x/rxjs/src/internal/observable/SubscribeOnObservable"],
  function (exports_190, context_190) {
    "use strict";
    var SubscribeOnObservable_ts_1, SubscribeOnOperator;
    var __moduleName = context_190 && context_190.id;
    /**
     * Asynchronously subscribes Observers to this Observable on the specified {@link SchedulerLike}.
     *
     * With `subscribeOn` you can decide what type of scheduler a specific Observable will be using when it is subscribed to.
     *
     * Schedulers control the speed and order of emissions to observers from an Observable stream.
     *
     * ![](subscribeOn.png)
     *
     * ## Example
     *
     * Given the following code:
     *
     * ```ts
     * import { of, merge } from 'rxjs.ts';
     *
     * const a = of(1, 2, 3);
     * const b = of(4, 5, 6);
     *
     * merge(a, b).subscribe(console.log);
     *
     * // Outputs
     * // 1
     * // 2
     * // 3
     * // 4
     * // 5
     * // 6
     * ```
     *
     * Both Observable `a` and `b` will emit their values directly and synchronously once they are subscribed to.
     *
     * If we instead use the `subscribeOn` operator declaring that we want to use the {@link asyncScheduler} for values emited by Observable `a`:
     *
     * ```ts
     * import { of, merge, asyncScheduler } from 'rxjs.ts';
     * import { subscribeOn } from 'rxjs/operators.ts';
     *
     * const a = of(1, 2, 3).pipe(subscribeOn(asyncScheduler));
     * const b = of(4, 5, 6);
     *
     * merge(a, b).subscribe(console.log);
     *
     * // Outputs
     * // 4
     * // 5
     * // 6
     * // 1
     * // 2
     * // 3
     * ```
     *
     * The reason for this is that Observable `b` emits its values directly and synchronously like before
     * but the emissions from `a` are scheduled on the event loop because we are now using the {@link asyncScheduler} for that specific Observable.
     *
     * @param {SchedulerLike} scheduler - The {@link SchedulerLike} to perform subscription actions on.
     * @return {Observable<T>} The source Observable modified so that its subscriptions happen on the specified {@link SchedulerLike}.
     * @name subscribeOn
     */
    function subscribeOn(scheduler, delay = 0) {
      return function subscribeOnOperatorFunction(source) {
        return source.lift(new SubscribeOnOperator(scheduler, delay));
      };
    }
    exports_190("subscribeOn", subscribeOn);
    return {
      setters: [
        function (SubscribeOnObservable_ts_1_1) {
          SubscribeOnObservable_ts_1 = SubscribeOnObservable_ts_1_1;
        },
      ],
      execute: function () {
        SubscribeOnOperator = class SubscribeOnOperator {
          constructor(scheduler, delay) {
            this.scheduler = scheduler;
            this.delay = delay;
          }
          call(subscriber, source) {
            return new SubscribeOnObservable_ts_1.SubscribeOnObservable(
              source,
              this.delay,
              this.scheduler,
            ).subscribe(subscriber);
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/switchMap",
  [
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/InnerSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
    "https://deno.land/x/rxjs/src/internal/operators/map",
    "https://deno.land/x/rxjs/src/internal/observable/from",
  ],
  function (exports_191, context_191) {
    "use strict";
    var OuterSubscriber_ts_22,
      InnerSubscriber_ts_8,
      subscribeToResult_ts_22,
      map_ts_9,
      from_ts_11,
      SwitchMapOperator,
      SwitchMapSubscriber;
    var __moduleName = context_191 && context_191.id;
    /* tslint:enable:max-line-length */
    /**
     * Projects each source value to an Observable which is merged in the output
     * Observable, emitting values only from the most recently projected Observable.
     *
     * <span class="informal">Maps each value to an Observable, then flattens all of
     * these inner Observables.</span>
     *
     * ![](switchMap.png)
     *
     * Returns an Observable that emits items based on applying a function that you
     * supply to each item emitted by the source Observable, where that function
     * returns an (so-called "inner") Observable. Each time it observes one of these
     * inner Observables, the output Observable begins emitting the items emitted by
     * that inner Observable. When a new inner Observable is emitted, `switchMap`
     * stops emitting items from the earlier-emitted inner Observable and begins
     * emitting items from the new one. It continues to behave like this for
     * subsequent inner Observables.
     *
     * ## Example
     * Generate new Observable according to source Observable values
     * ```typescript
     * import { of } from 'rxjs.ts';
     * import { switchMap } from 'rxjs/operators.ts';
     *
     * const switched = of(1, 2, 3).pipe(switchMap((x: number) => of(x, x ** 2, x ** 3)));
     * switched.subscribe(x => console.log(x));
     * // outputs
     * // 1
     * // 1
     * // 1
     * // 2
     * // 4
     * // 8
     * // ... and so on
     * ```
     *
     * Rerun an interval Observable on every click event
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { switchMap } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(switchMap((ev) => interval(1000)));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link concatMap}
     * @see {@link exhaustMap}
     * @see {@link mergeMap}
     * @see {@link switchAll}
     * @see {@link switchMapTo}
     *
     * @param {function(value: T, ?index: number): ObservableInput} project A function
     * that, when applied to an item emitted by the source Observable, returns an
     * Observable.
     * @return {Observable} An Observable that emits the result of applying the
     * projection function (and the optional deprecated `resultSelector`) to each item
     * emitted by the source Observable and taking only the values from the most recently
     * projected inner Observable.
     * @name switchMap
     */
    function switchMap(project, resultSelector) {
      if (typeof resultSelector === "function") {
        return (source) =>
          source.pipe(switchMap((a, i) =>
            from_ts_11.from(project(a, i)).pipe(
              map_ts_9.map((b, ii) => resultSelector(a, b, i, ii)),
            )
          ));
      }
      return (source) => source.lift(new SwitchMapOperator(project));
    }
    exports_191("switchMap", switchMap);
    return {
      setters: [
        function (OuterSubscriber_ts_22_1) {
          OuterSubscriber_ts_22 = OuterSubscriber_ts_22_1;
        },
        function (InnerSubscriber_ts_8_1) {
          InnerSubscriber_ts_8 = InnerSubscriber_ts_8_1;
        },
        function (subscribeToResult_ts_22_1) {
          subscribeToResult_ts_22 = subscribeToResult_ts_22_1;
        },
        function (map_ts_9_1) {
          map_ts_9 = map_ts_9_1;
        },
        function (from_ts_11_1) {
          from_ts_11 = from_ts_11_1;
        },
      ],
      execute: function () {
        SwitchMapOperator = class SwitchMapOperator {
          constructor(project) {
            this.project = project;
          }
          call(subscriber, source) {
            return source.subscribe(
              new SwitchMapSubscriber(subscriber, this.project),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        SwitchMapSubscriber = class SwitchMapSubscriber
          extends OuterSubscriber_ts_22.OuterSubscriber {
          constructor(destination, project) {
            super(destination);
            this.project = project;
            this.index = 0;
          }
          _next(value) {
            let result;
            const index = this.index++;
            try {
              result = this.project(value, index);
            } catch (error) {
              this.destination.error(error);
              return;
            }
            this._innerSub(result, value, index);
          }
          _innerSub(result, value, index) {
            const innerSubscription = this.innerSubscription;
            if (innerSubscription) {
              innerSubscription.unsubscribe();
            }
            const innerSubscriber = new InnerSubscriber_ts_8.InnerSubscriber(
              this,
              value,
              index,
            );
            const destination = this.destination;
            destination.add(innerSubscriber);
            this.innerSubscription = subscribeToResult_ts_22.subscribeToResult(
              this,
              result,
              undefined,
              undefined,
              innerSubscriber,
            );
          }
          _complete() {
            const { innerSubscription } = this;
            if (!innerSubscription || innerSubscription.closed) {
              super._complete();
            }
            this.unsubscribe();
          }
          _unsubscribe() {
            this.innerSubscription = null;
          }
          notifyComplete(innerSub) {
            const destination = this.destination;
            destination.remove(innerSub);
            this.innerSubscription = null;
            if (this.isStopped) {
              super._complete();
            }
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.destination.next(innerValue);
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/switchAll",
  [
    "https://deno.land/x/rxjs/src/internal/operators/switchMap",
    "https://deno.land/x/rxjs/src/internal/util/identity",
  ],
  function (exports_192, context_192) {
    "use strict";
    var switchMap_ts_1, identity_ts_7;
    var __moduleName = context_192 && context_192.id;
    /**
     * Converts a higher-order Observable into a first-order Observable
     * producing values only from the most recent observable sequence
     *
     * <span class="informal">Flattens an Observable-of-Observables.</span>
     *
     * ![](switchAll.png)
     *
     * `switchAll` subscribes to a source that is an observable of observables, also known as a
     * "higher-order observable" (or `Observable<Observable<T>>`). It subscribes to the most recently
     * provided "inner observable" emitted by the source, unsubscribing from any previously subscribed
     * to inner observable, such that only the most recent inner observable may be subscribed to at
     * any point in time. The resulting observable returned by `switchAll` will only complete if the
     * source observable completes, *and* any currently subscribed to inner observable also has completed,
     * if there are any.
     *
     * ## Examples
     * Spawn a new interval observable for each click event, but for every new
     * click, cancel the previous interval and subscribe to the new one.
     *
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { switchAll, map, tap } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click').pipe(tap(() => console.log('click')));
     * const source = clicks.pipe(map((ev) => interval(1000)));
     *
     * source.pipe(
     *   switchAll()
     * ).subscribe(x => console.log(x));
     *
     * // Output
     * // click
     * // 1
     * // 2
     * // 3
     * // 4
     * // ...
     * // click
     * // 1
     * // 2
     * // 3
     * // ...
     * // click
     * // ...
     * ```
     *
     * @see {@link combineAll}
     * @see {@link concatAll}
     * @see {@link exhaust}
     * @see {@link switchMap}
     * @see {@link switchMapTo}
     * @see {@link mergeAll}
     */
    function switchAll() {
      return switchMap_ts_1.switchMap(identity_ts_7.identity);
    }
    exports_192("switchAll", switchAll);
    return {
      setters: [
        function (switchMap_ts_1_1) {
          switchMap_ts_1 = switchMap_ts_1_1;
        },
        function (identity_ts_7_1) {
          identity_ts_7 = identity_ts_7_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/switchMapTo",
  ["https://deno.land/x/rxjs/src/internal/operators/switchMap"],
  function (exports_193, context_193) {
    "use strict";
    var switchMap_ts_2;
    var __moduleName = context_193 && context_193.id;
    /* tslint:enable:max-line-length */
    /**
     * Projects each source value to the same Observable which is flattened multiple
     * times with {@link switchMap} in the output Observable.
     *
     * <span class="informal">It's like {@link switchMap}, but maps each value
     * always to the same inner Observable.</span>
     *
     * ![](switchMapTo.png)
     *
     * Maps each source value to the given Observable `innerObservable` regardless
     * of the source value, and then flattens those resulting Observables into one
     * single Observable, which is the output Observable. The output Observables
     * emits values only from the most recently emitted instance of
     * `innerObservable`.
     *
     * ## Example
     * Rerun an interval Observable on every click event
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { switchMapTo } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(switchMapTo(interval(1000)));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link concatMapTo}
     * @see {@link switchAll}
     * @see {@link switchMap}
     * @see {@link mergeMapTo}
     *
     * @param {ObservableInput} innerObservable An Observable to replace each value from
     * the source Observable.
     * @return {Observable} An Observable that emits items from the given
     * `innerObservable` (and optionally transformed through the deprecated `resultSelector`)
     * every time a value is emitted on the source Observable, and taking only the values
     * from the most recently projected inner Observable.
     * @name switchMapTo
     */
    function switchMapTo(innerObservable, resultSelector) {
      return resultSelector
        ? switchMap_ts_2.switchMap(() => innerObservable, resultSelector)
        : switchMap_ts_2.switchMap(() => innerObservable);
    }
    exports_193("switchMapTo", switchMapTo);
    return {
      setters: [
        function (switchMap_ts_2_1) {
          switchMap_ts_2 = switchMap_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/takeUntil",
  [
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_194, context_194) {
    "use strict";
    var OuterSubscriber_ts_23,
      subscribeToResult_ts_23,
      TakeUntilOperator,
      TakeUntilSubscriber;
    var __moduleName = context_194 && context_194.id;
    /**
     * Emits the values emitted by the source Observable until a `notifier`
     * Observable emits a value.
     *
     * <span class="informal">Lets values pass until a second Observable,
     * `notifier`, emits a value. Then, it completes.</span>
     *
     * ![](takeUntil.png)
     *
     * `takeUntil` subscribes and begins mirroring the source Observable. It also
     * monitors a second Observable, `notifier` that you provide. If the `notifier`
     * emits a value, the output Observable stops mirroring the source Observable
     * and completes. If the `notifier` doesn't emit any value and completes
     * then `takeUntil` will pass all values.
     *
     * ## Example
     * Tick every second until the first click happens
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { takeUntil } from 'rxjs/operators.ts';
     *
     * const source = interval(1000);
     * const clicks = fromEvent(document, 'click');
     * const result = source.pipe(takeUntil(clicks));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link take}
     * @see {@link takeLast}
     * @see {@link takeWhile}
     * @see {@link skip}
     *
     * @param {Observable} notifier The Observable whose first emitted value will
     * cause the output Observable of `takeUntil` to stop emitting values from the
     * source Observable.
     * @return {Observable<T>} An Observable that emits the values from the source
     * Observable until such time as `notifier` emits its first value.
     * @name takeUntil
     */
    function takeUntil(notifier) {
      return (source) => source.lift(new TakeUntilOperator(notifier));
    }
    exports_194("takeUntil", takeUntil);
    return {
      setters: [
        function (OuterSubscriber_ts_23_1) {
          OuterSubscriber_ts_23 = OuterSubscriber_ts_23_1;
        },
        function (subscribeToResult_ts_23_1) {
          subscribeToResult_ts_23 = subscribeToResult_ts_23_1;
        },
      ],
      execute: function () {
        TakeUntilOperator = class TakeUntilOperator {
          constructor(notifier) {
            this.notifier = notifier;
          }
          call(subscriber, source) {
            const takeUntilSubscriber = new TakeUntilSubscriber(subscriber);
            const notifierSubscription = subscribeToResult_ts_23
              .subscribeToResult(takeUntilSubscriber, this.notifier);
            if (notifierSubscription && !takeUntilSubscriber.seenValue) {
              takeUntilSubscriber.add(notifierSubscription);
              return source.subscribe(takeUntilSubscriber);
            }
            return takeUntilSubscriber;
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        TakeUntilSubscriber = class TakeUntilSubscriber
          extends OuterSubscriber_ts_23.OuterSubscriber {
          constructor(destination) {
            super(destination);
            this.seenValue = false;
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.seenValue = true;
            this.complete();
          }
          notifyComplete() {
            // noop
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/takeWhile",
  ["https://deno.land/x/rxjs/src/internal/Subscriber"],
  function (exports_195, context_195) {
    "use strict";
    var Subscriber_ts_41, TakeWhileOperator, TakeWhileSubscriber;
    var __moduleName = context_195 && context_195.id;
    /**
     * Emits values emitted by the source Observable so long as each value satisfies
     * the given `predicate`, and then completes as soon as this `predicate` is not
     * satisfied.
     *
     * <span class="informal">Takes values from the source only while they pass the
     * condition given. When the first value does not satisfy, it completes.</span>
     *
     * ![](takeWhile.png)
     *
     * `takeWhile` subscribes and begins mirroring the source Observable. Each value
     * emitted on the source is given to the `predicate` function which returns a
     * boolean, representing a condition to be satisfied by the source values. The
     * output Observable emits the source values until such time as the `predicate`
     * returns false, at which point `takeWhile` stops mirroring the source
     * Observable and completes the output Observable.
     *
     * ## Example
     * Emit click events only while the clientX property is greater than 200
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { takeWhile } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(takeWhile(ev => ev.clientX > 200));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link take}
     * @see {@link takeLast}
     * @see {@link takeUntil}
     * @see {@link skip}
     *
     * @param {function(value: T, index: number): boolean} predicate A function that
     * evaluates a value emitted by the source Observable and returns a boolean.
     * Also takes the (zero-based) index as the second argument.
     * @param {boolean} inclusive When set to `true` the value that caused
     * `predicate` to return `false` will also be emitted.
     * @return {Observable<T>} An Observable that emits the values from the source
     * Observable so long as each value satisfies the condition defined by the
     * `predicate`, then completes.
     * @name takeWhile
     */
    function takeWhile(predicate, inclusive = false) {
      return (source) =>
        source.lift(new TakeWhileOperator(predicate, inclusive));
    }
    exports_195("takeWhile", takeWhile);
    return {
      setters: [
        function (Subscriber_ts_41_1) {
          Subscriber_ts_41 = Subscriber_ts_41_1;
        },
      ],
      execute: function () {
        TakeWhileOperator = class TakeWhileOperator {
          constructor(predicate, inclusive) {
            this.predicate = predicate;
            this.inclusive = inclusive;
          }
          call(subscriber, source) {
            return source.subscribe(
              new TakeWhileSubscriber(
                subscriber,
                this.predicate,
                this.inclusive,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        TakeWhileSubscriber = class TakeWhileSubscriber
          extends Subscriber_ts_41.Subscriber {
          constructor(destination, predicate, inclusive) {
            super(destination);
            this.predicate = predicate;
            this.inclusive = inclusive;
            this.index = 0;
          }
          _next(value) {
            const destination = this.destination;
            let result;
            try {
              result = this.predicate(value, this.index++);
            } catch (err) {
              destination.error(err);
              return;
            }
            this.nextOrComplete(value, result);
          }
          nextOrComplete(value, predicateResult) {
            const destination = this.destination;
            if (Boolean(predicateResult)) {
              destination.next(value);
            } else {
              if (this.inclusive) {
                destination.next(value);
              }
              destination.complete();
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/tap",
  [
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/util/noop",
    "https://deno.land/x/rxjs/src/internal/util/isFunction",
  ],
  function (exports_196, context_196) {
    "use strict";
    var Subscriber_ts_42, noop_ts_3, isFunction_ts_5, DoOperator, TapSubscriber;
    var __moduleName = context_196 && context_196.id;
    /* tslint:enable:max-line-length */
    /**
     * Perform a side effect for every emission on the source Observable, but return
     * an Observable that is identical to the source.
     *
     * <span class="informal">Intercepts each emission on the source and runs a
     * function, but returns an output which is identical to the source as long as errors don't occur.</span>
     *
     * ![](tap.png)
     *
     * Returns a mirrored Observable of the source Observable, but modified so that
     * the provided Observer is called to perform a side effect for every value,
     * error, and completion emitted by the source. Any errors that are thrown in
     * the aforementioned Observer or handlers are safely sent down the error path
     * of the output Observable.
     *
     * This operator is useful for debugging your Observables for the correct values
     * or performing other side effects.
     *
     * Note: this is different to a `subscribe` on the Observable. If the Observable
     * returned by `tap` is not subscribed, the side effects specified by the
     * Observer will never happen. `tap` therefore simply spies on existing
     * execution, it does not trigger an execution to happen like `subscribe` does.
     *
     * ## Example
     * Map every click to the clientX position of that click, while also logging the click event
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { tap, map } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const positions = clicks.pipe(
     *   tap(ev => console.log(ev)),
     *   map(ev => ev.clientX),
     * );
     * positions.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link map}
     * @see {@link Observable#subscribe}
     *
     * @param {Observer|function} [nextOrObserver] A normal Observer object or a
     * callback for `next`.
     * @param {function} [error] Callback for errors in the source.
     * @param {function} [complete] Callback for the completion of the source.
     * @return {Observable} An Observable identical to the source, but runs the
     * specified Observer or callback(s) for each item.
     * @name tap
     */
    function tap(nextOrObserver, error, complete) {
      return function tapOperatorFunction(source) {
        return source.lift(new DoOperator(nextOrObserver, error, complete));
      };
    }
    exports_196("tap", tap);
    return {
      setters: [
        function (Subscriber_ts_42_1) {
          Subscriber_ts_42 = Subscriber_ts_42_1;
        },
        function (noop_ts_3_1) {
          noop_ts_3 = noop_ts_3_1;
        },
        function (isFunction_ts_5_1) {
          isFunction_ts_5 = isFunction_ts_5_1;
        },
      ],
      execute: function () {
        DoOperator = class DoOperator {
          constructor(nextOrObserver, error, complete) {
            this.nextOrObserver = nextOrObserver;
            this.error = error;
            this.complete = complete;
          }
          call(subscriber, source) {
            return source.subscribe(
              new TapSubscriber(
                subscriber,
                this.nextOrObserver,
                this.error,
                this.complete,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        TapSubscriber = class TapSubscriber
          extends Subscriber_ts_42.Subscriber {
          constructor(destination, observerOrNext, error, complete) {
            super(destination);
            this._tapNext = noop_ts_3.noop;
            this._tapError = noop_ts_3.noop;
            this._tapComplete = noop_ts_3.noop;
            this._tapError = error || noop_ts_3.noop;
            this._tapComplete = complete || noop_ts_3.noop;
            if (isFunction_ts_5.isFunction(observerOrNext)) {
              this._context = this;
              this._tapNext = observerOrNext;
            } else if (observerOrNext) {
              this._context = observerOrNext;
              this._tapNext = observerOrNext.next || noop_ts_3.noop;
              this._tapError = observerOrNext.error || noop_ts_3.noop;
              this._tapComplete = observerOrNext.complete || noop_ts_3.noop;
            }
          }
          _next(value) {
            try {
              this._tapNext.call(this._context, value);
            } catch (err) {
              this.destination.error(err);
              return;
            }
            this.destination.next(value);
          }
          _error(err) {
            try {
              this._tapError.call(this._context, err);
            } catch (err) {
              this.destination.error(err);
              return;
            }
            this.destination.error(err);
          }
          _complete() {
            try {
              this._tapComplete.call(this._context);
            } catch (err) {
              this.destination.error(err);
              return;
            }
            return this.destination.complete();
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/throttle",
  [
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_197, context_197) {
    "use strict";
    var OuterSubscriber_ts_24,
      subscribeToResult_ts_24,
      defaultThrottleConfig,
      ThrottleOperator,
      ThrottleSubscriber;
    var __moduleName = context_197 && context_197.id;
    /**
     * Emits a value from the source Observable, then ignores subsequent source
     * values for a duration determined by another Observable, then repeats this
     * process.
     *
     * <span class="informal">It's like {@link throttleTime}, but the silencing
     * duration is determined by a second Observable.</span>
     *
     * ![](throttle.png)
     *
     * `throttle` emits the source Observable values on the output Observable
     * when its internal timer is disabled, and ignores source values when the timer
     * is enabled. Initially, the timer is disabled. As soon as the first source
     * value arrives, it is forwarded to the output Observable, and then the timer
     * is enabled by calling the `durationSelector` function with the source value,
     * which returns the "duration" Observable. When the duration Observable emits a
     * value or completes, the timer is disabled, and this process repeats for the
     * next source value.
     *
     * ## Example
     * Emit clicks at a rate of at most one click per second
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { throttle } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(throttle(ev => interval(1000)));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link audit}
     * @see {@link debounce}
     * @see {@link delayWhen}
     * @see {@link sample}
     * @see {@link throttleTime}
     *
     * @param {function(value: T): SubscribableOrPromise} durationSelector A function
     * that receives a value from the source Observable, for computing the silencing
     * duration for each source value, returned as an Observable or a Promise.
     * @param {Object} config a configuration object to define `leading` and `trailing` behavior. Defaults
     * to `{ leading: true, trailing: false }`.
     * @return {Observable<T>} An Observable that performs the throttle operation to
     * limit the rate of emissions from the source.
     * @name throttle
     */
    function throttle(durationSelector, config = defaultThrottleConfig) {
      return (source) =>
        source.lift(
          new ThrottleOperator(
            durationSelector,
            !!config.leading,
            !!config.trailing,
          ),
        );
    }
    exports_197("throttle", throttle);
    return {
      setters: [
        function (OuterSubscriber_ts_24_1) {
          OuterSubscriber_ts_24 = OuterSubscriber_ts_24_1;
        },
        function (subscribeToResult_ts_24_1) {
          subscribeToResult_ts_24 = subscribeToResult_ts_24_1;
        },
      ],
      execute: function () {
        exports_197(
          "defaultThrottleConfig",
          defaultThrottleConfig = {
            leading: true,
            trailing: false,
          },
        );
        ThrottleOperator = class ThrottleOperator {
          constructor(durationSelector, leading, trailing) {
            this.durationSelector = durationSelector;
            this.leading = leading;
            this.trailing = trailing;
          }
          call(subscriber, source) {
            return source.subscribe(
              new ThrottleSubscriber(
                subscriber,
                this.durationSelector,
                this.leading,
                this.trailing,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc
             * @ignore
             * @extends {Ignored}
             */
        ThrottleSubscriber = class ThrottleSubscriber
          extends OuterSubscriber_ts_24.OuterSubscriber {
          constructor(destination, durationSelector, _leading, _trailing) {
            super(destination);
            this.destination = destination;
            this.durationSelector = durationSelector;
            this._leading = _leading;
            this._trailing = _trailing;
            this._sendValue = null;
            this._hasValue = false;
          }
          _next(value) {
            this._hasValue = true;
            this._sendValue = value;
            if (!this._throttled) {
              if (this._leading) {
                this.send();
              } else {
                this.throttle(value);
              }
            }
          }
          send() {
            const { _hasValue, _sendValue } = this;
            if (_hasValue) {
              this.destination.next(_sendValue);
              this.throttle(_sendValue);
            }
            this._hasValue = false;
            this._sendValue = null;
          }
          throttle(value) {
            const duration = this.tryDurationSelector(value);
            if (!!duration) {
              this.add(
                this._throttled = subscribeToResult_ts_24.subscribeToResult(
                  this,
                  duration,
                ),
              );
            }
          }
          tryDurationSelector(value) {
            try {
              return this.durationSelector(value);
            } catch (err) {
              this.destination.error(err);
              return null;
            }
          }
          throttlingDone() {
            const { _throttled, _trailing } = this;
            if (_throttled) {
              _throttled.unsubscribe();
            }
            this._throttled = null;
            if (_trailing) {
              this.send();
            }
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.throttlingDone();
          }
          notifyComplete() {
            this.throttlingDone();
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/throttleTime",
  [
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/scheduler/async",
    "https://deno.land/x/rxjs/src/internal/operators/throttle",
  ],
  function (exports_198, context_198) {
    "use strict";
    var Subscriber_ts_43,
      async_ts_9,
      throttle_ts_1,
      ThrottleTimeOperator,
      ThrottleTimeSubscriber;
    var __moduleName = context_198 && context_198.id;
    /**
     * Emits a value from the source Observable, then ignores subsequent source
     * values for `duration` milliseconds, then repeats this process.
     *
     * <span class="informal">Lets a value pass, then ignores source values for the
     * next `duration` milliseconds.</span>
     *
     * ![](throttleTime.png)
     *
     * `throttleTime` emits the source Observable values on the output Observable
     * when its internal timer is disabled, and ignores source values when the timer
     * is enabled. Initially, the timer is disabled. As soon as the first source
     * value arrives, it is forwarded to the output Observable, and then the timer
     * is enabled. After `duration` milliseconds (or the time unit determined
     * internally by the optional `scheduler`) has passed, the timer is disabled,
     * and this process repeats for the next source value. Optionally takes a
     * {@link SchedulerLike} for managing timers.
     *
     * ## Examples
     *
     * #### Limit click rate
     *
     * Emit clicks at a rate of at most one click per second
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { throttleTime } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(throttleTime(1000));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * #### Double Click
     *
     * The following example only emits clicks which happen within a subsequent
     * delay of 400ms of the previous click. This for example can emulate a double
     * click. It makes use of the `trailing` parameter of the throttle configuration.
     *
     * ```ts
     * import { fromEvent, asyncScheduler } from 'rxjs.ts';
     * import { throttleTime, withLatestFrom } from 'rxjs/operators.ts';
     *
     * // defaultThottleConfig = { leading: true, trailing: false }
     * const throttleConfig = {
     *   leading: false,
     *   trailing: true
     * }
     *
     * const click = fromEvent(document, 'click');
     * const doubleClick = click.pipe(
     *   throttleTime(400, asyncScheduler, throttleConfig)
     * );
     *
     * doubleClick.subscribe((throttleValue: Event) => {
     *   console.log(`Double-clicked! Timestamp: ${throttleValue.timeStamp}`);
     * });
     * ```
     *
     * If you enable the `leading` parameter in this example, the output would be the primary click and
     * the double click, but restricts additional clicks within 400ms.
     *
     * @see {@link auditTime}
     * @see {@link debounceTime}
     * @see {@link delay}
     * @see {@link sampleTime}
     * @see {@link throttle}
     *
     * @param {number} duration Time to wait before emitting another value after
     * emitting the last value, measured in milliseconds or the time unit determined
     * internally by the optional `scheduler`.
     * @param {SchedulerLike} [scheduler=async] The {@link SchedulerLike} to use for
     * managing the timers that handle the throttling.
     * @param {Object} config a configuration object to define `leading` and
     * `trailing` behavior. Defaults to `{ leading: true, trailing: false }`.
     * @return {Observable<T>} An Observable that performs the throttle operation to
     * limit the rate of emissions from the source.
     * @name throttleTime
     */
    function throttleTime(
      duration,
      scheduler = async_ts_9.async,
      config = throttle_ts_1.defaultThrottleConfig,
    ) {
      return (source) =>
        source.lift(
          new ThrottleTimeOperator(
            duration,
            scheduler,
            !!config.leading,
            !!config.trailing,
          ),
        );
    }
    exports_198("throttleTime", throttleTime);
    function dispatchNext(arg) {
      const { subscriber } = arg;
      subscriber.clearThrottle();
    }
    return {
      setters: [
        function (Subscriber_ts_43_1) {
          Subscriber_ts_43 = Subscriber_ts_43_1;
        },
        function (async_ts_9_1) {
          async_ts_9 = async_ts_9_1;
        },
        function (throttle_ts_1_1) {
          throttle_ts_1 = throttle_ts_1_1;
        },
      ],
      execute: function () {
        ThrottleTimeOperator = class ThrottleTimeOperator {
          constructor(duration, scheduler, leading, trailing) {
            this.duration = duration;
            this.scheduler = scheduler;
            this.leading = leading;
            this.trailing = trailing;
          }
          call(subscriber, source) {
            return source.subscribe(
              new ThrottleTimeSubscriber(
                subscriber,
                this.duration,
                this.scheduler,
                this.leading,
                this.trailing,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        ThrottleTimeSubscriber = class ThrottleTimeSubscriber
          extends Subscriber_ts_43.Subscriber {
          constructor(destination, duration, scheduler, leading, trailing) {
            super(destination);
            this.duration = duration;
            this.scheduler = scheduler;
            this.leading = leading;
            this.trailing = trailing;
            this.throttled = null;
            this._hasTrailingValue = false;
            this._trailingValue = null;
          }
          _next(value) {
            if (this.throttled) {
              if (this.trailing) {
                this._trailingValue = value;
                this._hasTrailingValue = true;
              }
            } else {
              this.add(
                this.throttled = this.scheduler.schedule(
                  dispatchNext,
                  this.duration,
                  { subscriber: this },
                ),
              );
              if (this.leading) {
                this.destination.next(value);
              } else if (this.trailing) {
                this._trailingValue = value;
                this._hasTrailingValue = true;
              }
            }
          }
          _complete() {
            if (this._hasTrailingValue) {
              this.destination.next(this._trailingValue);
              this.destination.complete();
            } else {
              this.destination.complete();
            }
          }
          clearThrottle() {
            const throttled = this.throttled;
            if (throttled) {
              if (this.trailing && this._hasTrailingValue) {
                this.destination.next(this._trailingValue);
                this._trailingValue = null;
                this._hasTrailingValue = false;
              }
              throttled.unsubscribe();
              this.remove(throttled);
              this.throttled = null;
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/timeInterval",
  [
    "https://deno.land/x/rxjs/src/internal/scheduler/async",
    "https://deno.land/x/rxjs/src/internal/operators/scan",
    "https://deno.land/x/rxjs/src/internal/observable/defer",
    "https://deno.land/x/rxjs/src/internal/operators/map",
  ],
  function (exports_199, context_199) {
    "use strict";
    var async_ts_10, scan_ts_2, defer_ts_3, map_ts_10, TimeInterval;
    var __moduleName = context_199 && context_199.id;
    /**
     *
     * Emits an object containing the current value, and the time that has
     * passed between emitting the current value and the previous value, which is
     * calculated by using the provided `scheduler`'s `now()` method to retrieve
     * the current time at each emission, then calculating the difference. The `scheduler`
     * defaults to {@link asyncScheduler}, so by default, the `interval` will be in
     * milliseconds.
     *
     * <span class="informal">Convert an Observable that emits items into one that
     * emits indications of the amount of time elapsed between those emissions.</span>
     *
     * ![](timeinterval.png)
     *
     * ## Examples
     * Emit interval between current value with the last value
     *
     * ```ts
     * const seconds = interval(1000);
     *
     * seconds.pipe(timeInterval())
     * .subscribe(
     *     value => console.log(value),
     *     err => console.log(err),
     * );
     *
     * seconds.pipe(timeout(900))
     * .subscribe(
     *     value => console.log(value),
     *     err => console.log(err),
     * );
     *
     * // NOTE: The values will never be this precise,
     * // intervals created with `interval` or `setInterval`
     * // are non-deterministic.
     *
     * // {value: 0, interval: 1000}
     * // {value: 1, interval: 1000}
     * // {value: 2, interval: 1000}
     * ```
     *
     * @param {SchedulerLike} [scheduler] Scheduler used to get the current time.
     * @return {Observable<{ interval: number, value: T }>} Observable that emit infomation about value and interval
     * @name timeInterval
     */
    function timeInterval(scheduler = async_ts_10.async) {
      return (source) =>
        defer_ts_3.defer(() => {
          return source.pipe(
            // TODO(benlesh): correct these typings.
            scan_ts_2.scan(
              ({ current }, value) => ({
                value,
                current: scheduler.now(),
                last: current,
              }),
              { current: scheduler.now(), value: undefined, last: undefined },
            ),
            map_ts_10.map(({ current, last, value }) =>
              new TimeInterval(value, current - last)
            ),
          );
        });
    }
    exports_199("timeInterval", timeInterval);
    return {
      setters: [
        function (async_ts_10_1) {
          async_ts_10 = async_ts_10_1;
        },
        function (scan_ts_2_1) {
          scan_ts_2 = scan_ts_2_1;
        },
        function (defer_ts_3_1) {
          defer_ts_3 = defer_ts_3_1;
        },
        function (map_ts_10_1) {
          map_ts_10 = map_ts_10_1;
        },
      ],
      execute: function () {
        // TODO(benlesh): make this an interface, export the interface, but not the implemented class,
        // there's no reason users should be manually creating this type.
        /**
             * @deprecated exposed API, use as interface only.
             */
        TimeInterval = class TimeInterval {
          constructor(value, interval) {
            this.value = value;
            this.interval = interval;
          }
        };
        exports_199("TimeInterval", TimeInterval);
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/timeoutWith",
  [
    "https://deno.land/x/rxjs/src/internal/scheduler/async",
    "https://deno.land/x/rxjs/src/internal/util/isDate",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_200, context_200) {
    "use strict";
    var async_ts_11,
      isDate_ts_2,
      OuterSubscriber_ts_25,
      subscribeToResult_ts_25,
      TimeoutWithOperator,
      TimeoutWithSubscriber;
    var __moduleName = context_200 && context_200.id;
    /* tslint:enable:max-line-length */
    /**
     *
     * Errors if Observable does not emit a value in given time span, in case of which
     * subscribes to the second Observable.
     *
     * <span class="informal">It's a version of `timeout` operator that let's you specify fallback Observable.</span>
     *
     * ![](timeoutWith.png)
     *
     * `timeoutWith` is a variation of `timeout` operator. It behaves exactly the same,
     * still accepting as a first argument either a number or a Date, which control - respectively -
     * when values of source Observable should be emitted or when it should complete.
     *
     * The only difference is that it accepts a second, required parameter. This parameter
     * should be an Observable which will be subscribed when source Observable fails any timeout check.
     * So whenever regular `timeout` would emit an error, `timeoutWith` will instead start re-emitting
     * values from second Observable. Note that this fallback Observable is not checked for timeouts
     * itself, so it can emit values and complete at arbitrary points in time. From the moment of a second
     * subscription, Observable returned from `timeoutWith` simply mirrors fallback stream. When that
     * stream completes, it completes as well.
     *
     * Scheduler, which in case of `timeout` is provided as as second argument, can be still provided
     * here - as a third, optional parameter. It still is used to schedule timeout checks and -
     * as a consequence - when second Observable will be subscribed, since subscription happens
     * immediately after failing check.
     *
     * ## Example
     * Add fallback observable
     * ```ts
     * import { interval } from 'rxjs.ts';
     * import { timeoutWith } from 'rxjs/operators.ts';
     *
     * const seconds = interval(1000);
     * const minutes = interval(60 * 1000);
     *
     * seconds.pipe(timeoutWith(900, minutes))
     *   .subscribe(
     *     value => console.log(value), // After 900ms, will start emitting `minutes`,
     *                                  // since first value of `seconds` will not arrive fast enough.
     *     err => console.log(err),     // Would be called after 900ms in case of `timeout`,
     *                                  // but here will never be called.
     *   );
     * ```
     *
     * @param {number|Date} due Number specifying period within which Observable must emit values
     *                          or Date specifying before when Observable should complete
     * @param {Observable<T>} withObservable Observable which will be subscribed if source fails timeout check.
     * @param {SchedulerLike} [scheduler] Scheduler controlling when timeout checks occur.
     * @return {Observable<T>} Observable that mirrors behaviour of source or, when timeout check fails, of an Observable
     *                          passed as a second parameter.
     * @name timeoutWith
     */
    function timeoutWith(due, withObservable, scheduler = async_ts_11.async) {
      return (source) => {
        let absoluteTimeout = isDate_ts_2.isDate(due);
        let waitFor = absoluteTimeout ? (+due - scheduler.now())
        : Math.abs(due);
        return source.lift(
          new TimeoutWithOperator(
            waitFor,
            absoluteTimeout,
            withObservable,
            scheduler,
          ),
        );
      };
    }
    exports_200("timeoutWith", timeoutWith);
    return {
      setters: [
        function (async_ts_11_1) {
          async_ts_11 = async_ts_11_1;
        },
        function (isDate_ts_2_1) {
          isDate_ts_2 = isDate_ts_2_1;
        },
        function (OuterSubscriber_ts_25_1) {
          OuterSubscriber_ts_25 = OuterSubscriber_ts_25_1;
        },
        function (subscribeToResult_ts_25_1) {
          subscribeToResult_ts_25 = subscribeToResult_ts_25_1;
        },
      ],
      execute: function () {
        TimeoutWithOperator = class TimeoutWithOperator {
          constructor(waitFor, absoluteTimeout, withObservable, scheduler) {
            this.waitFor = waitFor;
            this.absoluteTimeout = absoluteTimeout;
            this.withObservable = withObservable;
            this.scheduler = scheduler;
          }
          call(subscriber, source) {
            return source.subscribe(
              new TimeoutWithSubscriber(
                subscriber,
                this.absoluteTimeout,
                this.waitFor,
                this.withObservable,
                this.scheduler,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        TimeoutWithSubscriber = class TimeoutWithSubscriber
          extends OuterSubscriber_ts_25.OuterSubscriber {
          constructor(
            destination,
            absoluteTimeout,
            waitFor,
            withObservable,
            scheduler,
          ) {
            super(destination);
            this.absoluteTimeout = absoluteTimeout;
            this.waitFor = waitFor;
            this.withObservable = withObservable;
            this.scheduler = scheduler;
            this.action = null;
            this.scheduleTimeout();
          }
          static dispatchTimeout(subscriber) {
            const { withObservable } = subscriber;
            subscriber._unsubscribeAndRecycle();
            subscriber.add(
              subscribeToResult_ts_25.subscribeToResult(
                subscriber,
                withObservable,
              ),
            );
          }
          scheduleTimeout() {
            const { action } = this;
            if (action) {
              // Recycle the action if we've already scheduled one. All the production
              // Scheduler Actions mutate their state/delay time and return themeselves.
              // VirtualActions are immutable, so they create and return a clone. In this
              // case, we need to set the action reference to the most recent VirtualAction,
              // to ensure that's the one we clone from next time.
              this.action = action.schedule(this, this.waitFor);
            } else {
              this.add(
                this.action = this.scheduler.schedule(
                  TimeoutWithSubscriber.dispatchTimeout,
                  this.waitFor,
                  this,
                ),
              );
            }
          }
          _next(value) {
            if (!this.absoluteTimeout) {
              this.scheduleTimeout();
            }
            super._next(value);
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _unsubscribe() {
            this.action = null;
            this.scheduler = null;
            this.withObservable = null;
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/timeout",
  [
    "https://deno.land/x/rxjs/src/internal/scheduler/async",
    "https://deno.land/x/rxjs/src/internal/util/TimeoutError",
    "https://deno.land/x/rxjs/src/internal/operators/timeoutWith",
    "https://deno.land/x/rxjs/src/internal/observable/throwError",
  ],
  function (exports_201, context_201) {
    "use strict";
    var async_ts_12, TimeoutError_ts_2, timeoutWith_ts_1, throwError_ts_3;
    var __moduleName = context_201 && context_201.id;
    /**
     *
     * Errors if Observable does not emit a value in given time span.
     *
     * <span class="informal">Timeouts on Observable that doesn't emit values fast enough.</span>
     *
     * ![](timeout.png)
     *
     * `timeout` operator accepts as an argument either a number or a Date.
     *
     * If number was provided, it returns an Observable that behaves like a source
     * Observable, unless there is a period of time where there is no value emitted.
     * So if you provide `100` as argument and first value comes after 50ms from
     * the moment of subscription, this value will be simply re-emitted by the resulting
     * Observable. If however after that 100ms passes without a second value being emitted,
     * stream will end with an error and source Observable will be unsubscribed.
     * These checks are performed throughout whole lifecycle of Observable - from the moment
     * it was subscribed to, until it completes or errors itself. Thus every value must be
     * emitted within specified period since previous value.
     *
     * If provided argument was Date, returned Observable behaves differently. It throws
     * if Observable did not complete before provided Date. This means that periods between
     * emission of particular values do not matter in this case. If Observable did not complete
     * before provided Date, source Observable will be unsubscribed. Other than that, resulting
     * stream behaves just as source Observable.
     *
     * `timeout` accepts also a Scheduler as a second parameter. It is used to schedule moment (or moments)
     * when returned Observable will check if source stream emitted value or completed.
     *
     * ## Examples
     * Check if ticks are emitted within certain timespan
     * ```ts
     * import { interval } from 'rxjs.ts';
     * import { timeout } from 'rxjs/operators.ts';
     *
     * const seconds = interval(1000);
     *
     * seconds.pipe(timeout(1100))      // Let's use bigger timespan to be safe,
     *                                  // since `interval` might fire a bit later then scheduled.
     * .subscribe(
     *     value => console.log(value), // Will emit numbers just as regular `interval` would.
     *     err => console.log(err),     // Will never be called.
     * );
     *
     * seconds.pipe(timeout(900))
     * .subscribe(
     *     value => console.log(value), // Will never be called.
     *     err => console.log(err),     // Will emit error before even first value is emitted,
     *                                  // since it did not arrive within 900ms period.
     * );
     * ```
     *
     * Use Date to check if Observable completed
     * ```ts
     * import { interval } from 'rxjs.ts';
     * import { timeout } from 'rxjs/operators.ts';
     *
     * const seconds = interval(1000);
     *
     * seconds.pipe(
     *   timeout(new Date("December 17, 2020 03:24:00")),
     * )
     * .subscribe(
     *     value => console.log(value), // Will emit values as regular `interval` would
     *                                  // until December 17, 2020 at 03:24:00.
     *     err => console.log(err)      // On December 17, 2020 at 03:24:00 it will emit an error,
     *                                  // since Observable did not complete by then.
     * );
     * ```
     * @see {@link timeoutWith}
     *
     * @param {number|Date} due Number specifying period within which Observable must emit values
     *                          or Date specifying before when Observable should complete
     * @param {SchedulerLike} [scheduler] Scheduler controlling when timeout checks occur.
     * @return {Observable<T>} Observable that mirrors behaviour of source, unless timeout checks fail.
     * @name timeout
     */
    function timeout(due, scheduler = async_ts_12.async) {
      return timeoutWith_ts_1.timeoutWith(
        due,
        throwError_ts_3.throwError(new TimeoutError_ts_2.TimeoutError()),
        scheduler,
      );
    }
    exports_201("timeout", timeout);
    return {
      setters: [
        function (async_ts_12_1) {
          async_ts_12 = async_ts_12_1;
        },
        function (TimeoutError_ts_2_1) {
          TimeoutError_ts_2 = TimeoutError_ts_2_1;
        },
        function (timeoutWith_ts_1_1) {
          timeoutWith_ts_1 = timeoutWith_ts_1_1;
        },
        function (throwError_ts_3_1) {
          throwError_ts_3 = throwError_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/timestamp",
  ["https://deno.land/x/rxjs/src/internal/operators/map"],
  function (exports_202, context_202) {
    "use strict";
    var map_ts_11;
    var __moduleName = context_202 && context_202.id;
    /**
     * Attaches a timestamp to each item emitted by an observable indicating when it was emitted
     *
     * The `timestamp` operator maps the *source* observable stream to an object of type
     * `{value: T, timestamp: R}`. The properties are generically typed. The `value` property contains the value
     * and type of the *source* observable. The `timestamp` is generated by the schedulers `now` function. By
     * default it uses the *async* scheduler which simply returns `Date.now()` (milliseconds since 1970/01/01
     * 00:00:00:000) and therefore is of type `number`.
     *
     * ![](timestamp.png)
     *
     * ## Example
     *
     * In this example there is a timestamp attached to the documents click event.
     *
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { timestamp } from 'rxjs/operators.ts';
     *
     * const clickWithTimestamp = fromEvent(document, 'click').pipe(
     *   timestamp()
     * );
     *
     * // Emits data of type {value: MouseEvent, timestamp: number}
     * clickWithTimestamp.subscribe(data => {
     *   console.log(data);
     * });
     * ```
     *
     * @param timestampProvider An object with a `now()` method used to get the current timestamp.
     */
    function timestamp(timestampProvider = Date) {
      return map_ts_11.map((value) => ({
        value,
        timestamp: timestampProvider.now(),
      }));
    }
    exports_202("timestamp", timestamp);
    return {
      setters: [
        function (map_ts_11_1) {
          map_ts_11 = map_ts_11_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/toArray",
  ["https://deno.land/x/rxjs/src/internal/operators/reduce"],
  function (exports_203, context_203) {
    "use strict";
    var reduce_ts_3;
    var __moduleName = context_203 && context_203.id;
    function toArrayReducer(arr, item, index) {
      if (index === 0) {
        return [item];
      }
      arr.push(item);
      return arr;
    }
    /**
     * Collects all source emissions and emits them as an array when the source completes.
     *
     * <span class="informal">Get all values inside an array when the source completes</span>
     *
     * ![](toArray.png)
     *
     * `toArray` will wait until the source Observable completes before emitting
     * the array containing all emissions. When the source Observable errors no
     * array will be emitted.
     *
     *  ## Example
     * ```ts
     * import { interval } from 'rxjs.ts';
     * import { toArray, take } from 'rxjs/operators.ts';
     *
     * const source = interval(1000);
     * const example = source.pipe(
     *   take(10),
     *   toArray()
     * );
     *
     * const subscribe = example.subscribe(val => console.log(val));
     *
     * // output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
     *
     * ```
    * @return An array from an observable sequence.
    * @name toArray
    */
    function toArray() {
      return reduce_ts_3.reduce(toArrayReducer, []);
    }
    exports_203("toArray", toArray);
    return {
      setters: [
        function (reduce_ts_3_1) {
          reduce_ts_3 = reduce_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/window",
  [
    "https://deno.land/x/rxjs/src/internal/Subject",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_204, context_204) {
    "use strict";
    var Subject_ts_11,
      OuterSubscriber_ts_26,
      subscribeToResult_ts_26,
      WindowOperator,
      WindowSubscriber;
    var __moduleName = context_204 && context_204.id;
    /**
     * Branch out the source Observable values as a nested Observable whenever
     * `windowBoundaries` emits.
     *
     * <span class="informal">It's like {@link buffer}, but emits a nested Observable
     * instead of an array.</span>
     *
     * ![](window.png)
     *
     * Returns an Observable that emits windows of items it collects from the source
     * Observable. The output Observable emits connected, non-overlapping
     * windows. It emits the current window and opens a new one whenever the
     * Observable `windowBoundaries` emits an item. Because each window is an
     * Observable, the output is a higher-order Observable.
     *
     * ## Example
     * In every window of 1 second each, emit at most 2 click events
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { window, mergeAll, map, take } from 'rxjs/operators.ts';
     *
     *  const clicks = fromEvent(document, 'click');
     *  const sec = interval(1000);
     *  const result = clicks.pipe(
     *      window(sec),
     *      map(win => win.pipe(take(2))), // each window has at most 2 emissions
     *      mergeAll(),              // flatten the Observable-of-Observables
     *  );
     *  result.subscribe(x => console.log(x));
     * ```
     * @see {@link windowCount}
     * @see {@link windowTime}
     * @see {@link windowToggle}
     * @see {@link windowWhen}
     * @see {@link buffer}
     *
     * @param {Observable<any>} windowBoundaries An Observable that completes the
     * previous window and starts a new window.
     * @return {Observable<Observable<T>>} An Observable of windows, which are
     * Observables emitting values of the source Observable.
     * @name window
     */
    function window(windowBoundaries) {
      return function windowOperatorFunction(source) {
        return source.lift(new WindowOperator(windowBoundaries));
      };
    }
    exports_204("window", window);
    return {
      setters: [
        function (Subject_ts_11_1) {
          Subject_ts_11 = Subject_ts_11_1;
        },
        function (OuterSubscriber_ts_26_1) {
          OuterSubscriber_ts_26 = OuterSubscriber_ts_26_1;
        },
        function (subscribeToResult_ts_26_1) {
          subscribeToResult_ts_26 = subscribeToResult_ts_26_1;
        },
      ],
      execute: function () {
        WindowOperator = class WindowOperator {
          constructor(windowBoundaries) {
            this.windowBoundaries = windowBoundaries;
          }
          call(subscriber, source) {
            const windowSubscriber = new WindowSubscriber(subscriber);
            const sourceSubscription = source.subscribe(windowSubscriber);
            if (!sourceSubscription.closed) {
              windowSubscriber.add(
                subscribeToResult_ts_26.subscribeToResult(
                  windowSubscriber,
                  this.windowBoundaries,
                ),
              );
            }
            return sourceSubscription;
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        WindowSubscriber = class WindowSubscriber
          extends OuterSubscriber_ts_26.OuterSubscriber {
          constructor(destination) {
            super(destination);
            this.window = new Subject_ts_11.Subject();
            destination.next(this.window);
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.openWindow();
          }
          notifyError(error, innerSub) {
            this._error(error);
          }
          notifyComplete(innerSub) {
            this._complete();
          }
          _next(value) {
            this.window.next(value);
          }
          _error(err) {
            this.window.error(err);
            this.destination.error(err);
          }
          _complete() {
            this.window.complete();
            this.destination.complete();
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _unsubscribe() {
            this.window = null;
          }
          openWindow() {
            const prevWindow = this.window;
            if (prevWindow) {
              prevWindow.complete();
            }
            const destination = this.destination;
            const newWindow = this.window = new Subject_ts_11.Subject();
            destination.next(newWindow);
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/windowCount",
  [
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/Subject",
  ],
  function (exports_205, context_205) {
    "use strict";
    var Subscriber_ts_44,
      Subject_ts_12,
      WindowCountOperator,
      WindowCountSubscriber;
    var __moduleName = context_205 && context_205.id;
    /**
     * Branch out the source Observable values as a nested Observable with each
     * nested Observable emitting at most `windowSize` values.
     *
     * <span class="informal">It's like {@link bufferCount}, but emits a nested
     * Observable instead of an array.</span>
     *
     * ![](windowCount.png)
     *
     * Returns an Observable that emits windows of items it collects from the source
     * Observable. The output Observable emits windows every `startWindowEvery`
     * items, each containing no more than `windowSize` items. When the source
     * Observable completes or encounters an error, the output Observable emits
     * the current window and propagates the notification from the source
     * Observable. If `startWindowEvery` is not provided, then new windows are
     * started immediately at the start of the source and when each window completes
     * with size `windowSize`.
     *
     * ## Examples
     * Ignore every 3rd click event, starting from the first one
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { windowCount, map, mergeAll, skip } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(
     *   windowCount(3),
     *   map(win => win.pipe(skip(1))), // skip first of every 3 clicks
     *   mergeAll()                     // flatten the Observable-of-Observables
     * );
     * result.subscribe(x => console.log(x));
     * ```
     *
     * Ignore every 3rd click event, starting from the third one
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { windowCount, mergeAll } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(
     *   windowCount(2, 3),
     *   mergeAll(),              // flatten the Observable-of-Observables
     * );
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link window}
     * @see {@link windowTime}
     * @see {@link windowToggle}
     * @see {@link windowWhen}
     * @see {@link bufferCount}
     *
     * @param {number} windowSize The maximum number of values emitted by each
     * window.
     * @param {number} [startWindowEvery] Interval at which to start a new window.
     * For example if `startWindowEvery` is `2`, then a new window will be started
     * on every other value from the source. A new window is started at the
     * beginning of the source by default.
     * @return {Observable<Observable<T>>} An Observable of windows, which in turn
     * are Observable of values.
     * @name windowCount
     */
    function windowCount(windowSize, startWindowEvery = 0) {
      return function windowCountOperatorFunction(source) {
        return source.lift(
          new WindowCountOperator(windowSize, startWindowEvery),
        );
      };
    }
    exports_205("windowCount", windowCount);
    return {
      setters: [
        function (Subscriber_ts_44_1) {
          Subscriber_ts_44 = Subscriber_ts_44_1;
        },
        function (Subject_ts_12_1) {
          Subject_ts_12 = Subject_ts_12_1;
        },
      ],
      execute: function () {
        WindowCountOperator = class WindowCountOperator {
          constructor(windowSize, startWindowEvery) {
            this.windowSize = windowSize;
            this.startWindowEvery = startWindowEvery;
          }
          call(subscriber, source) {
            return source.subscribe(
              new WindowCountSubscriber(
                subscriber,
                this.windowSize,
                this.startWindowEvery,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        WindowCountSubscriber = class WindowCountSubscriber
          extends Subscriber_ts_44.Subscriber {
          constructor(destination, windowSize, startWindowEvery) {
            super(destination);
            this.destination = destination;
            this.windowSize = windowSize;
            this.startWindowEvery = startWindowEvery;
            this.windows = [new Subject_ts_12.Subject()];
            this.count = 0;
            destination.next(this.windows[0]);
          }
          _next(value) {
            const startWindowEvery = (this.startWindowEvery > 0)
              ? this.startWindowEvery : this.windowSize;
            const destination = this.destination;
            const windowSize = this.windowSize;
            const windows = this.windows;
            const len = windows.length;
            for (let i = 0; i < len && !this.closed; i++) {
              windows[i].next(value);
            }
            const c = this.count - windowSize + 1;
            if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
              windows.shift().complete();
            }
            if (++this.count % startWindowEvery === 0 && !this.closed) {
              const window = new Subject_ts_12.Subject();
              windows.push(window);
              destination.next(window);
            }
          }
          _error(err) {
            const windows = this.windows;
            if (windows) {
              while (windows.length > 0 && !this.closed) {
                windows.shift().error(err);
              }
            }
            this.destination.error(err);
          }
          _complete() {
            const windows = this.windows;
            if (windows) {
              while (windows.length > 0 && !this.closed) {
                windows.shift().complete();
              }
            }
            this.destination.complete();
          }
          _unsubscribe() {
            this.count = 0;
            this.windows = null;
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/windowTime",
  [
    "https://deno.land/x/rxjs/src/internal/Subject",
    "https://deno.land/x/rxjs/src/internal/scheduler/async",
    "https://deno.land/x/rxjs/src/internal/Subscriber",
    "https://deno.land/x/rxjs/src/internal/util/isNumeric",
    "https://deno.land/x/rxjs/src/internal/util/isScheduler",
  ],
  function (exports_206, context_206) {
    "use strict";
    var Subject_ts_13,
      async_ts_13,
      Subscriber_ts_45,
      isNumeric_ts_4,
      isScheduler_ts_10,
      WindowTimeOperator,
      CountedSubject,
      WindowTimeSubscriber;
    var __moduleName = context_206 && context_206.id;
    /**
     * Branch out the source Observable values as a nested Observable periodically
     * in time.
     *
     * <span class="informal">It's like {@link bufferTime}, but emits a nested
     * Observable instead of an array.</span>
     *
     * ![](windowTime.png)
     *
     * Returns an Observable that emits windows of items it collects from the source
     * Observable. The output Observable starts a new window periodically, as
     * determined by the `windowCreationInterval` argument. It emits each window
     * after a fixed timespan, specified by the `windowTimeSpan` argument. When the
     * source Observable completes or encounters an error, the output Observable
     * emits the current window and propagates the notification from the source
     * Observable. If `windowCreationInterval` is not provided, the output
     * Observable starts a new window when the previous window of duration
     * `windowTimeSpan` completes. If `maxWindowCount` is provided, each window
     * will emit at most fixed number of values. Window will complete immediately
     * after emitting last value and next one still will open as specified by
     * `windowTimeSpan` and `windowCreationInterval` arguments.
     *
     * ## Examples
     * In every window of 1 second each, emit at most 2 click events
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { windowTime, map, mergeAll, take } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(
     *   windowTime(1000),
     *   map(win => win.pipe(take(2))), // each window has at most 2 emissions
     *   mergeAll(),                    // flatten the Observable-of-Observables
     * );
     * result.subscribe(x => console.log(x));
     * ```
     *
     * Every 5 seconds start a window 1 second long, and emit at most 2 click events per window
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { windowTime, map, mergeAll, take } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(
     *   windowTime(1000, 5000),
     *   map(win => win.pipe(take(2))), // each window has at most 2 emissions
     *   mergeAll(),                    // flatten the Observable-of-Observables
     * );
     * result.subscribe(x => console.log(x));
     * ```
     *
     * Same as example above but with maxWindowCount instead of take
     * ```ts
     * import { fromEvent } from 'rxjs.ts';
     * import { windowTime, mergeAll } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(
     *   windowTime(1000, 5000, 2), // each window has still at most 2 emissions
     *   mergeAll(),                // flatten the Observable-of-Observables
     * );
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link window}
     * @see {@link windowCount}
     * @see {@link windowToggle}
     * @see {@link windowWhen}
     * @see {@link bufferTime}
     *
     * @param windowTimeSpan The amount of time to fill each window.
     * @param windowCreationInterval The interval at which to start new
     * windows.
     * @param maxWindowSize Max number of
     * values each window can emit before completion.
     * @param scheduler The scheduler on which to schedule the
     * intervals that determine window boundaries.
     * @returnAn observable of windows, which in turn are Observables.
     */
    function windowTime(windowTimeSpan) {
      let scheduler = async_ts_13.async;
      let windowCreationInterval = null;
      let maxWindowSize = Infinity;
      if (isScheduler_ts_10.isScheduler(arguments[3])) {
        scheduler = arguments[3];
      }
      if (isScheduler_ts_10.isScheduler(arguments[2])) {
        scheduler = arguments[2];
      } else if (isNumeric_ts_4.isNumeric(arguments[2])) {
        maxWindowSize = Number(arguments[2]);
      }
      if (isScheduler_ts_10.isScheduler(arguments[1])) {
        scheduler = arguments[1];
      } else if (isNumeric_ts_4.isNumeric(arguments[1])) {
        windowCreationInterval = Number(arguments[1]);
      }
      return function windowTimeOperatorFunction(source) {
        return source.lift(
          new WindowTimeOperator(
            windowTimeSpan,
            windowCreationInterval,
            maxWindowSize,
            scheduler,
          ),
        );
      };
    }
    exports_206("windowTime", windowTime);
    function dispatchWindowTimeSpanOnly(state) {
      const { subscriber, windowTimeSpan, window } = state;
      if (window) {
        subscriber.closeWindow(window);
      }
      state.window = subscriber.openWindow();
      this.schedule(state, windowTimeSpan);
    }
    function dispatchWindowCreation(state) {
      const { windowTimeSpan, subscriber, scheduler, windowCreationInterval } =
        state;
      const window = subscriber.openWindow();
      const action = this;
      let context = { action, subscription: null };
      const timeSpanState = { subscriber, window, context };
      context.subscription = scheduler.schedule(
        dispatchWindowClose,
        windowTimeSpan,
        timeSpanState,
      );
      action.add(context.subscription);
      action.schedule(state, windowCreationInterval);
    }
    function dispatchWindowClose(state) {
      const { subscriber, window, context } = state;
      if (context && context.action && context.subscription) {
        context.action.remove(context.subscription);
      }
      subscriber.closeWindow(window);
    }
    return {
      setters: [
        function (Subject_ts_13_1) {
          Subject_ts_13 = Subject_ts_13_1;
        },
        function (async_ts_13_1) {
          async_ts_13 = async_ts_13_1;
        },
        function (Subscriber_ts_45_1) {
          Subscriber_ts_45 = Subscriber_ts_45_1;
        },
        function (isNumeric_ts_4_1) {
          isNumeric_ts_4 = isNumeric_ts_4_1;
        },
        function (isScheduler_ts_10_1) {
          isScheduler_ts_10 = isScheduler_ts_10_1;
        },
      ],
      execute: function () {
        WindowTimeOperator = class WindowTimeOperator {
          constructor(
            windowTimeSpan,
            windowCreationInterval,
            maxWindowSize,
            scheduler,
          ) {
            this.windowTimeSpan = windowTimeSpan;
            this.windowCreationInterval = windowCreationInterval;
            this.maxWindowSize = maxWindowSize;
            this.scheduler = scheduler;
          }
          call(subscriber, source) {
            return source.subscribe(
              new WindowTimeSubscriber(
                subscriber,
                this.windowTimeSpan,
                this.windowCreationInterval,
                this.maxWindowSize,
                this.scheduler,
              ),
            );
          }
        };
        CountedSubject = class CountedSubject extends Subject_ts_13.Subject {
          constructor() {
            super(...arguments);
            this._numberOfNextedValues = 0;
          }
          next(value) {
            this._numberOfNextedValues++;
            super.next(value);
          }
          get numberOfNextedValues() {
            return this._numberOfNextedValues;
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        WindowTimeSubscriber = class WindowTimeSubscriber
          extends Subscriber_ts_45.Subscriber {
          constructor(
            destination,
            windowTimeSpan,
            windowCreationInterval,
            maxWindowSize,
            scheduler,
          ) {
            super(destination);
            this.destination = destination;
            this.maxWindowSize = maxWindowSize;
            this.windows = [];
            const window = this.openWindow();
            if (
              windowCreationInterval !== null && windowCreationInterval >= 0
            ) {
              const closeState = { subscriber: this, window, context: null };
              const creationState = {
                windowTimeSpan,
                windowCreationInterval,
                subscriber: this,
                scheduler,
              };
              this.add(
                scheduler.schedule(
                  dispatchWindowClose,
                  windowTimeSpan,
                  closeState,
                ),
              );
              this.add(
                scheduler.schedule(
                  dispatchWindowCreation,
                  windowCreationInterval,
                  creationState,
                ),
              );
            } else {
              const timeSpanOnlyState = {
                subscriber: this,
                window,
                windowTimeSpan,
              };
              this.add(
                scheduler.schedule(
                  dispatchWindowTimeSpanOnly,
                  windowTimeSpan,
                  timeSpanOnlyState,
                ),
              );
            }
          }
          _next(value) {
            // If we have a max window size, we might end up mutating the
            // array while we're iterating over it. If that's the case, we'll
            // copy it, otherwise, we don't just to save memory allocation.
            const windows = this.maxWindowSize < Infinity ? this.windows.slice()
            : this.windows;
            const len = windows.length;
            for (let i = 0; i < len; i++) {
              const window = windows[i];
              if (!window.closed) {
                window.next(value);
                if (this.maxWindowSize <= window.numberOfNextedValues) {
                  // mutation may occur here.
                  this.closeWindow(window);
                }
              }
            }
          }
          _error(err) {
            const windows = this.windows;
            while (windows.length > 0) {
              windows.shift().error(err);
            }
            this.destination.error(err);
          }
          _complete() {
            const windows = this.windows;
            while (windows.length > 0) {
              windows.shift().complete();
            }
            this.destination.complete();
          }
          openWindow() {
            const window = new CountedSubject();
            this.windows.push(window);
            const destination = this.destination;
            destination.next(window);
            return window;
          }
          closeWindow(window) {
            const index = this.windows.indexOf(window);
            // All closed windows should have been removed,
            // we don't need to call complete unless they're found.
            if (index >= 0) {
              window.complete();
              this.windows.splice(index, 1);
            }
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/windowToggle",
  [
    "https://deno.land/x/rxjs/src/internal/Subject",
    "https://deno.land/x/rxjs/src/internal/Subscription",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_207, context_207) {
    "use strict";
    var Subject_ts_14,
      Subscription_ts_19,
      OuterSubscriber_ts_27,
      subscribeToResult_ts_27,
      WindowToggleOperator,
      WindowToggleSubscriber;
    var __moduleName = context_207 && context_207.id;
    /**
     * Branch out the source Observable values as a nested Observable starting from
     * an emission from `openings` and ending when the output of `closingSelector`
     * emits.
     *
     * <span class="informal">It's like {@link bufferToggle}, but emits a nested
     * Observable instead of an array.</span>
     *
     * ![](windowToggle.png)
     *
     * Returns an Observable that emits windows of items it collects from the source
     * Observable. The output Observable emits windows that contain those items
     * emitted by the source Observable between the time when the `openings`
     * Observable emits an item and when the Observable returned by
     * `closingSelector` emits an item.
     *
     * ## Example
     * Every other second, emit the click events from the next 500ms
     * ```ts
     * import { fromEvent, interval, EMPTY } from 'rxjs.ts';
     * import { windowToggle, mergeAll } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const openings = interval(1000);
     * const result = clicks.pipe(
     *   windowToggle(openings, i => i % 2 ? interval(500) : EMPTY),
     *   mergeAll()
     * );
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link window}
     * @see {@link windowCount}
     * @see {@link windowTime}
     * @see {@link windowWhen}
     * @see {@link bufferToggle}
     *
     * @param {Observable<O>} openings An observable of notifications to start new
     * windows.
     * @param {function(value: O): Observable} closingSelector A function that takes
     * the value emitted by the `openings` observable and returns an Observable,
     * which, when it emits (either `next` or `complete`), signals that the
     * associated window should complete.
     * @return {Observable<Observable<T>>} An observable of windows, which in turn
     * are Observables.
     * @name windowToggle
     */
    function windowToggle(openings, closingSelector) {
      return (source) =>
        source.lift(new WindowToggleOperator(openings, closingSelector));
    }
    exports_207("windowToggle", windowToggle);
    return {
      setters: [
        function (Subject_ts_14_1) {
          Subject_ts_14 = Subject_ts_14_1;
        },
        function (Subscription_ts_19_1) {
          Subscription_ts_19 = Subscription_ts_19_1;
        },
        function (OuterSubscriber_ts_27_1) {
          OuterSubscriber_ts_27 = OuterSubscriber_ts_27_1;
        },
        function (subscribeToResult_ts_27_1) {
          subscribeToResult_ts_27 = subscribeToResult_ts_27_1;
        },
      ],
      execute: function () {
        WindowToggleOperator = class WindowToggleOperator {
          constructor(openings, closingSelector) {
            this.openings = openings;
            this.closingSelector = closingSelector;
          }
          call(subscriber, source) {
            return source.subscribe(
              new WindowToggleSubscriber(
                subscriber,
                this.openings,
                this.closingSelector,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        WindowToggleSubscriber = class WindowToggleSubscriber
          extends OuterSubscriber_ts_27.OuterSubscriber {
          constructor(destination, openings, closingSelector) {
            super(destination);
            this.openings = openings;
            this.closingSelector = closingSelector;
            this.contexts = [];
            this.add(
              this.openSubscription = subscribeToResult_ts_27.subscribeToResult(
                this,
                openings,
                openings,
              ),
            );
          }
          _next(value) {
            const { contexts } = this;
            if (contexts) {
              const len = contexts.length;
              for (let i = 0; i < len; i++) {
                contexts[i].window.next(value);
              }
            }
          }
          _error(err) {
            const { contexts } = this;
            this.contexts = null;
            if (contexts) {
              const len = contexts.length;
              let index = -1;
              while (++index < len) {
                const context = contexts[index];
                context.window.error(err);
                context.subscription.unsubscribe();
              }
            }
            super._error(err);
          }
          _complete() {
            const { contexts } = this;
            this.contexts = null;
            if (contexts) {
              const len = contexts.length;
              let index = -1;
              while (++index < len) {
                const context = contexts[index];
                context.window.complete();
                context.subscription.unsubscribe();
              }
            }
            super._complete();
          }
          /** @deprecated This is an internal implementation detail, do not use. */
          _unsubscribe() {
            const { contexts } = this;
            this.contexts = null;
            if (contexts) {
              const len = contexts.length;
              let index = -1;
              while (++index < len) {
                const context = contexts[index];
                context.window.unsubscribe();
                context.subscription.unsubscribe();
              }
            }
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            if (outerValue === this.openings) {
              let closingNotifier;
              try {
                const { closingSelector } = this;
                closingNotifier = closingSelector(innerValue);
              } catch (e) {
                return this.error(e);
              }
              const window = new Subject_ts_14.Subject();
              const subscription = new Subscription_ts_19.Subscription();
              const context = { window, subscription };
              this.contexts.push(context);
              const innerSubscription = subscribeToResult_ts_27
                .subscribeToResult(this, closingNotifier, context);
              if (innerSubscription.closed) {
                this.closeWindow(this.contexts.length - 1);
              } else {
                innerSubscription.context = context;
                subscription.add(innerSubscription);
              }
              this.destination.next(window);
            } else {
              this.closeWindow(this.contexts.indexOf(outerValue));
            }
          }
          notifyError(err) {
            this.error(err);
          }
          notifyComplete(inner) {
            if (inner !== this.openSubscription) {
              this.closeWindow(this.contexts.indexOf(inner.context));
            }
          }
          closeWindow(index) {
            if (index === -1) {
              return;
            }
            const { contexts } = this;
            const context = contexts[index];
            const { window, subscription } = context;
            contexts.splice(index, 1);
            window.complete();
            subscription.unsubscribe();
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/windowWhen",
  [
    "https://deno.land/x/rxjs/src/internal/Subject",
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_208, context_208) {
    "use strict";
    var Subject_ts_15,
      OuterSubscriber_ts_28,
      subscribeToResult_ts_28,
      WindowOperator,
      WindowSubscriber;
    var __moduleName = context_208 && context_208.id;
    /**
     * Branch out the source Observable values as a nested Observable using a
     * factory function of closing Observables to determine when to start a new
     * window.
     *
     * <span class="informal">It's like {@link bufferWhen}, but emits a nested
     * Observable instead of an array.</span>
     *
     * ![](windowWhen.png)
     *
     * Returns an Observable that emits windows of items it collects from the source
     * Observable. The output Observable emits connected, non-overlapping windows.
     * It emits the current window and opens a new one whenever the Observable
     * produced by the specified `closingSelector` function emits an item. The first
     * window is opened immediately when subscribing to the output Observable.
     *
     * ## Example
     * Emit only the first two clicks events in every window of [1-5] random seconds
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { windowWhen, map, mergeAll, take } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(
     *   windowWhen(() => interval(1000 + Math.random() * 4000)),
     *   map(win => win.pipe(take(2))),     // each window has at most 2 emissions
     *   mergeAll()                         // flatten the Observable-of-Observables
     * );
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link window}
     * @see {@link windowCount}
     * @see {@link windowTime}
     * @see {@link windowToggle}
     * @see {@link bufferWhen}
     *
     * @param {function(): Observable} closingSelector A function that takes no
     * arguments and returns an Observable that signals (on either `next` or
     * `complete`) when to close the previous window and start a new one.
     * @return {Observable<Observable<T>>} An observable of windows, which in turn
     * are Observables.
     * @name windowWhen
     */
    function windowWhen(closingSelector) {
      return function windowWhenOperatorFunction(source) {
        return source.lift(new WindowOperator(closingSelector));
      };
    }
    exports_208("windowWhen", windowWhen);
    return {
      setters: [
        function (Subject_ts_15_1) {
          Subject_ts_15 = Subject_ts_15_1;
        },
        function (OuterSubscriber_ts_28_1) {
          OuterSubscriber_ts_28 = OuterSubscriber_ts_28_1;
        },
        function (subscribeToResult_ts_28_1) {
          subscribeToResult_ts_28 = subscribeToResult_ts_28_1;
        },
      ],
      execute: function () {
        WindowOperator = class WindowOperator {
          constructor(closingSelector) {
            this.closingSelector = closingSelector;
          }
          call(subscriber, source) {
            return source.subscribe(
              new WindowSubscriber(subscriber, this.closingSelector),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        WindowSubscriber = class WindowSubscriber
          extends OuterSubscriber_ts_28.OuterSubscriber {
          constructor(destination, closingSelector) {
            super(destination);
            this.destination = destination;
            this.closingSelector = closingSelector;
            this.openWindow();
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.openWindow(innerSub);
          }
          notifyError(error, innerSub) {
            this._error(error);
          }
          notifyComplete(innerSub) {
            this.openWindow(innerSub);
          }
          _next(value) {
            this.window.next(value);
          }
          _error(err) {
            this.window.error(err);
            this.destination.error(err);
            this.unsubscribeClosingNotification();
          }
          _complete() {
            this.window.complete();
            this.destination.complete();
            this.unsubscribeClosingNotification();
          }
          unsubscribeClosingNotification() {
            if (this.closingNotification) {
              this.closingNotification.unsubscribe();
            }
          }
          openWindow(innerSub = null) {
            if (innerSub) {
              this.remove(innerSub);
              innerSub.unsubscribe();
            }
            const prevWindow = this.window;
            if (prevWindow) {
              prevWindow.complete();
            }
            const window = this.window = new Subject_ts_15.Subject();
            this.destination.next(window);
            let closingNotifier;
            try {
              const { closingSelector } = this;
              closingNotifier = closingSelector();
            } catch (e) {
              this.destination.error(e);
              this.window.error(e);
              return;
            }
            this.add(
              this.closingNotification = subscribeToResult_ts_28
                .subscribeToResult(this, closingNotifier),
            );
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/withLatestFrom",
  [
    "https://deno.land/x/rxjs/src/internal/OuterSubscriber",
    "https://deno.land/x/rxjs/src/internal/util/subscribeToResult",
  ],
  function (exports_209, context_209) {
    "use strict";
    var OuterSubscriber_ts_29,
      subscribeToResult_ts_29,
      WithLatestFromOperator,
      WithLatestFromSubscriber;
    var __moduleName = context_209 && context_209.id;
    /* tslint:enable:max-line-length */
    /**
     * Combines the source Observable with other Observables to create an Observable
     * whose values are calculated from the latest values of each, only when the
     * source emits.
     *
     * <span class="informal">Whenever the source Observable emits a value, it
     * computes a formula using that value plus the latest values from other input
     * Observables, then emits the output of that formula.</span>
     *
     * ![](withLatestFrom.png)
     *
     * `withLatestFrom` combines each value from the source Observable (the
     * instance) with the latest values from the other input Observables only when
     * the source emits a value, optionally using a `project` function to determine
     * the value to be emitted on the output Observable. All input Observables must
     * emit at least one value before the output Observable will emit a value.
     *
     * ## Example
     * On every click event, emit an array with the latest timer event plus the click event
     * ```ts
     * import { fromEvent, interval } from 'rxjs.ts';
     * import { withLatestFrom } from 'rxjs/operators.ts';
     *
     * const clicks = fromEvent(document, 'click');
     * const timer = interval(1000);
     * const result = clicks.pipe(withLatestFrom(timer));
     * result.subscribe(x => console.log(x));
     * ```
     *
     * @see {@link combineLatest}
     *
     * @param {ObservableInput} other An input Observable to combine with the source
     * Observable. More than one input Observables may be given as argument.
     * @param {Function} [project] Projection function for combining values
     * together. Receives all values in order of the Observables passed, where the
     * first parameter is a value from the source Observable. (e.g.
     * `a.pipe(withLatestFrom(b, c), map(([a1, b1, c1]) => a1 + b1 + c1))`). If this is not
     * passed, arrays will be emitted on the output Observable.
     * @return {Observable} An Observable of projected values from the most recent
     * values from each input Observable, or an array of the most recent values from
     * each input Observable.
     * @name withLatestFrom
     */
    function withLatestFrom(...args) {
      return (source) => {
        let project;
        if (typeof args[args.length - 1] === "function") {
          project = args.pop();
        }
        const observables = args;
        return source.lift(new WithLatestFromOperator(observables, project));
      };
    }
    exports_209("withLatestFrom", withLatestFrom);
    return {
      setters: [
        function (OuterSubscriber_ts_29_1) {
          OuterSubscriber_ts_29 = OuterSubscriber_ts_29_1;
        },
        function (subscribeToResult_ts_29_1) {
          subscribeToResult_ts_29 = subscribeToResult_ts_29_1;
        },
      ],
      execute: function () {
        WithLatestFromOperator = class WithLatestFromOperator {
          constructor(observables, project) {
            this.observables = observables;
            this.project = project;
          }
          call(subscriber, source) {
            return source.subscribe(
              new WithLatestFromSubscriber(
                subscriber,
                this.observables,
                this.project,
              ),
            );
          }
        };
        /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
        WithLatestFromSubscriber = class WithLatestFromSubscriber
          extends OuterSubscriber_ts_29.OuterSubscriber {
          constructor(destination, observables, project) {
            super(destination);
            this.observables = observables;
            this.project = project;
            this.toRespond = [];
            const len = observables.length;
            this.values = new Array(len);
            for (let i = 0; i < len; i++) {
              this.toRespond.push(i);
            }
            for (let i = 0; i < len; i++) {
              let observable = observables[i];
              this.add(
                subscribeToResult_ts_29.subscribeToResult(
                  this,
                  observable,
                  observable,
                  i,
                ),
              );
            }
          }
          notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.values[outerIndex] = innerValue;
            const toRespond = this.toRespond;
            if (toRespond.length > 0) {
              const found = toRespond.indexOf(outerIndex);
              if (found !== -1) {
                toRespond.splice(found, 1);
              }
            }
          }
          notifyComplete() {
            // noop
          }
          _next(value) {
            if (this.toRespond.length === 0) {
              const args = [value, ...this.values];
              if (this.project) {
                this._tryProject(args);
              } else {
                this.destination.next(args);
              }
            }
          }
          _tryProject(args) {
            let result;
            try {
              result = this.project.apply(this, args);
            } catch (err) {
              this.destination.error(err);
              return;
            }
            this.destination.next(result);
          }
        };
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/zipWith",
  ["https://deno.land/x/rxjs/src/internal/observable/zip"],
  function (exports_210, context_210) {
    "use strict";
    var zip_ts_2;
    var __moduleName = context_210 && context_210.id;
    /* tslint:enable:max-line-length */
    /**
     * @deprecated Deprecated. Use {@link zipWith}.
     */
    function zip(...observables) {
      return function zipOperatorFunction(source) {
        return source.lift.call(
          zip_ts_2.zip(source, ...observables),
          undefined,
        );
      };
    }
    exports_210("zip", zip);
    /**
     * Subscribes to the source, and the observable inputs provided as arguments, and combines their values, by index, into arrays.
     *
     * What is meant by "combine by index": The first value from each will be made into a single array, then emitted,
     * then the second value from each will be combined into a single array and emitted, then the third value
     * from each will be combined into a single array and emitted, and so on.
     *
     * This will continue until it is no longer able to combine values of the same index into an array.
     *
     * After the last value from any one completed source is emitted in an array, the resulting observable will complete,
     * as there is no way to continue "zipping" values together by index.
     *
     * Use-cases for this operator are limited. There are memory concerns if one of the streams is emitting
     * values at a much faster rate than the others. Usage should likely be limited to streams that emit
     * at a similar pace, or finite streams of known length.
     *
     * In many cases, authors want `combineLatestWith` and not `zipWith`.
     *
     * @param otherInputs other observable inputs to collate values from.
     */
    function zipWith(...otherInputs) {
      return zip(...otherInputs);
    }
    exports_210("zipWith", zipWith);
    return {
      setters: [
        function (zip_ts_2_1) {
          zip_ts_2 = zip_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/internal/operators/zipAll",
  ["https://deno.land/x/rxjs/src/internal/observable/zip"],
  function (exports_211, context_211) {
    "use strict";
    var zip_ts_3;
    var __moduleName = context_211 && context_211.id;
    function zipAll(project) {
      return (source) => source.lift(new zip_ts_3.ZipOperator(project));
    }
    exports_211("zipAll", zipAll);
    return {
      setters: [
        function (zip_ts_3_1) {
          zip_ts_3 = zip_ts_3_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/src/operators/index",
  [
    "https://deno.land/x/rxjs/src/internal/operators/audit",
    "https://deno.land/x/rxjs/src/internal/operators/auditTime",
    "https://deno.land/x/rxjs/src/internal/operators/buffer",
    "https://deno.land/x/rxjs/src/internal/operators/bufferCount",
    "https://deno.land/x/rxjs/src/internal/operators/bufferTime",
    "https://deno.land/x/rxjs/src/internal/operators/bufferToggle",
    "https://deno.land/x/rxjs/src/internal/operators/bufferWhen",
    "https://deno.land/x/rxjs/src/internal/operators/catchError",
    "https://deno.land/x/rxjs/src/internal/operators/combineAll",
    "https://deno.land/x/rxjs/src/internal/operators/combineLatestWith",
    "https://deno.land/x/rxjs/src/internal/operators/concat",
    "https://deno.land/x/rxjs/src/internal/operators/concatAll",
    "https://deno.land/x/rxjs/src/internal/operators/concatMap",
    "https://deno.land/x/rxjs/src/internal/operators/concatMapTo",
    "https://deno.land/x/rxjs/src/internal/operators/concatWith",
    "https://deno.land/x/rxjs/src/internal/operators/count",
    "https://deno.land/x/rxjs/src/internal/operators/debounce",
    "https://deno.land/x/rxjs/src/internal/operators/debounceTime",
    "https://deno.land/x/rxjs/src/internal/operators/defaultIfEmpty",
    "https://deno.land/x/rxjs/src/internal/operators/delay",
    "https://deno.land/x/rxjs/src/internal/operators/delayWhen",
    "https://deno.land/x/rxjs/src/internal/operators/dematerialize",
    "https://deno.land/x/rxjs/src/internal/operators/distinct",
    "https://deno.land/x/rxjs/src/internal/operators/distinctUntilChanged",
    "https://deno.land/x/rxjs/src/internal/operators/distinctUntilKeyChanged",
    "https://deno.land/x/rxjs/src/internal/operators/elementAt",
    "https://deno.land/x/rxjs/src/internal/operators/endWith",
    "https://deno.land/x/rxjs/src/internal/operators/every",
    "https://deno.land/x/rxjs/src/internal/operators/exhaust",
    "https://deno.land/x/rxjs/src/internal/operators/exhaustMap",
    "https://deno.land/x/rxjs/src/internal/operators/expand",
    "https://deno.land/x/rxjs/src/internal/operators/filter",
    "https://deno.land/x/rxjs/src/internal/operators/finalize",
    "https://deno.land/x/rxjs/src/internal/operators/find",
    "https://deno.land/x/rxjs/src/internal/operators/findIndex",
    "https://deno.land/x/rxjs/src/internal/operators/first",
    "https://deno.land/x/rxjs/src/internal/operators/groupBy",
    "https://deno.land/x/rxjs/src/internal/operators/ignoreElements",
    "https://deno.land/x/rxjs/src/internal/operators/isEmpty",
    "https://deno.land/x/rxjs/src/internal/operators/last",
    "https://deno.land/x/rxjs/src/internal/operators/map",
    "https://deno.land/x/rxjs/src/internal/operators/mapTo",
    "https://deno.land/x/rxjs/src/internal/operators/materialize",
    "https://deno.land/x/rxjs/src/internal/operators/max",
    "https://deno.land/x/rxjs/src/internal/operators/mergeWith",
    "https://deno.land/x/rxjs/src/internal/operators/mergeAll",
    "https://deno.land/x/rxjs/src/internal/operators/mergeMap",
    "https://deno.land/x/rxjs/src/internal/operators/mergeMapTo",
    "https://deno.land/x/rxjs/src/internal/operators/mergeScan",
    "https://deno.land/x/rxjs/src/internal/operators/min",
    "https://deno.land/x/rxjs/src/internal/operators/multicast",
    "https://deno.land/x/rxjs/src/internal/operators/observeOn",
    "https://deno.land/x/rxjs/src/internal/operators/onErrorResumeNext",
    "https://deno.land/x/rxjs/src/internal/operators/pairwise",
    "https://deno.land/x/rxjs/src/internal/operators/partition",
    "https://deno.land/x/rxjs/src/internal/operators/pluck",
    "https://deno.land/x/rxjs/src/internal/operators/publish",
    "https://deno.land/x/rxjs/src/internal/operators/publishBehavior",
    "https://deno.land/x/rxjs/src/internal/operators/publishLast",
    "https://deno.land/x/rxjs/src/internal/operators/publishReplay",
    "https://deno.land/x/rxjs/src/internal/operators/raceWith",
    "https://deno.land/x/rxjs/src/internal/operators/reduce",
    "https://deno.land/x/rxjs/src/internal/operators/repeat",
    "https://deno.land/x/rxjs/src/internal/operators/repeatWhen",
    "https://deno.land/x/rxjs/src/internal/operators/retry",
    "https://deno.land/x/rxjs/src/internal/operators/retryWhen",
    "https://deno.land/x/rxjs/src/internal/operators/refCount",
    "https://deno.land/x/rxjs/src/internal/operators/sample",
    "https://deno.land/x/rxjs/src/internal/operators/sampleTime",
    "https://deno.land/x/rxjs/src/internal/operators/scan",
    "https://deno.land/x/rxjs/src/internal/operators/sequenceEqual",
    "https://deno.land/x/rxjs/src/internal/operators/share",
    "https://deno.land/x/rxjs/src/internal/operators/shareReplay",
    "https://deno.land/x/rxjs/src/internal/operators/single",
    "https://deno.land/x/rxjs/src/internal/operators/skip",
    "https://deno.land/x/rxjs/src/internal/operators/skipLast",
    "https://deno.land/x/rxjs/src/internal/operators/skipUntil",
    "https://deno.land/x/rxjs/src/internal/operators/skipWhile",
    "https://deno.land/x/rxjs/src/internal/operators/startWith",
    "https://deno.land/x/rxjs/src/internal/operators/subscribeOn",
    "https://deno.land/x/rxjs/src/internal/operators/switchAll",
    "https://deno.land/x/rxjs/src/internal/operators/switchMap",
    "https://deno.land/x/rxjs/src/internal/operators/switchMapTo",
    "https://deno.land/x/rxjs/src/internal/operators/take",
    "https://deno.land/x/rxjs/src/internal/operators/takeLast",
    "https://deno.land/x/rxjs/src/internal/operators/takeUntil",
    "https://deno.land/x/rxjs/src/internal/operators/takeWhile",
    "https://deno.land/x/rxjs/src/internal/operators/tap",
    "https://deno.land/x/rxjs/src/internal/operators/throttle",
    "https://deno.land/x/rxjs/src/internal/operators/throttleTime",
    "https://deno.land/x/rxjs/src/internal/operators/throwIfEmpty",
    "https://deno.land/x/rxjs/src/internal/operators/timeInterval",
    "https://deno.land/x/rxjs/src/internal/operators/timeout",
    "https://deno.land/x/rxjs/src/internal/operators/timeoutWith",
    "https://deno.land/x/rxjs/src/internal/operators/timestamp",
    "https://deno.land/x/rxjs/src/internal/operators/toArray",
    "https://deno.land/x/rxjs/src/internal/operators/window",
    "https://deno.land/x/rxjs/src/internal/operators/windowCount",
    "https://deno.land/x/rxjs/src/internal/operators/windowTime",
    "https://deno.land/x/rxjs/src/internal/operators/windowToggle",
    "https://deno.land/x/rxjs/src/internal/operators/windowWhen",
    "https://deno.land/x/rxjs/src/internal/operators/withLatestFrom",
    "https://deno.land/x/rxjs/src/internal/operators/zipWith",
    "https://deno.land/x/rxjs/src/internal/operators/zipAll",
  ],
  function (exports_212, context_212) {
    "use strict";
    var __moduleName = context_212 && context_212.id;
    return {
      setters: [
        function (audit_ts_2_1) {
          exports_212({
            "audit": audit_ts_2_1["audit"],
          });
        },
        function (auditTime_ts_1_1) {
          exports_212({
            "auditTime": auditTime_ts_1_1["auditTime"],
          });
        },
        function (buffer_ts_1_1) {
          exports_212({
            "buffer": buffer_ts_1_1["buffer"],
          });
        },
        function (bufferCount_ts_1_1) {
          exports_212({
            "bufferCount": bufferCount_ts_1_1["bufferCount"],
          });
        },
        function (bufferTime_ts_1_1) {
          exports_212({
            "bufferTime": bufferTime_ts_1_1["bufferTime"],
          });
        },
        function (bufferToggle_ts_1_1) {
          exports_212({
            "bufferToggle": bufferToggle_ts_1_1["bufferToggle"],
          });
        },
        function (bufferWhen_ts_1_1) {
          exports_212({
            "bufferWhen": bufferWhen_ts_1_1["bufferWhen"],
          });
        },
        function (catchError_ts_1_1) {
          exports_212({
            "catchError": catchError_ts_1_1["catchError"],
          });
        },
        function (combineAll_ts_1_1) {
          exports_212({
            "combineAll": combineAll_ts_1_1["combineAll"],
          });
        },
        function (combineLatestWith_ts_1_1) {
          exports_212({
            "combineLatest": combineLatestWith_ts_1_1["combineLatest"],
            "combineLatestWith": combineLatestWith_ts_1_1["combineLatestWith"],
          });
        },
        function (concat_ts_6_1) {
          exports_212({
            "concat": concat_ts_6_1["concat"],
          });
        },
        function (concatAll_ts_2_1) {
          exports_212({
            "concatAll": concatAll_ts_2_1["concatAll"],
          });
        },
        function (concatMap_ts_2_1) {
          exports_212({
            "concatMap": concatMap_ts_2_1["concatMap"],
          });
        },
        function (concatMapTo_ts_1_1) {
          exports_212({
            "concatMapTo": concatMapTo_ts_1_1["concatMapTo"],
          });
        },
        function (concatWith_ts_1_1) {
          exports_212({
            "concatWith": concatWith_ts_1_1["concatWith"],
          });
        },
        function (count_ts_1_1) {
          exports_212({
            "count": count_ts_1_1["count"],
          });
        },
        function (debounce_ts_1_1) {
          exports_212({
            "debounce": debounce_ts_1_1["debounce"],
          });
        },
        function (debounceTime_ts_1_1) {
          exports_212({
            "debounceTime": debounceTime_ts_1_1["debounceTime"],
          });
        },
        function (defaultIfEmpty_ts_5_1) {
          exports_212({
            "defaultIfEmpty": defaultIfEmpty_ts_5_1["defaultIfEmpty"],
          });
        },
        function (delay_ts_1_1) {
          exports_212({
            "delay": delay_ts_1_1["delay"],
          });
        },
        function (delayWhen_ts_1_1) {
          exports_212({
            "delayWhen": delayWhen_ts_1_1["delayWhen"],
          });
        },
        function (dematerialize_ts_1_1) {
          exports_212({
            "dematerialize": dematerialize_ts_1_1["dematerialize"],
          });
        },
        function (distinct_ts_1_1) {
          exports_212({
            "distinct": distinct_ts_1_1["distinct"],
          });
        },
        function (distinctUntilChanged_ts_2_1) {
          exports_212({
            "distinctUntilChanged":
              distinctUntilChanged_ts_2_1["distinctUntilChanged"],
          });
        },
        function (distinctUntilKeyChanged_ts_1_1) {
          exports_212({
            "distinctUntilKeyChanged":
              distinctUntilKeyChanged_ts_1_1["distinctUntilKeyChanged"],
          });
        },
        function (elementAt_ts_1_1) {
          exports_212({
            "elementAt": elementAt_ts_1_1["elementAt"],
          });
        },
        function (endWith_ts_1_1) {
          exports_212({
            "endWith": endWith_ts_1_1["endWith"],
          });
        },
        function (every_ts_1_1) {
          exports_212({
            "every": every_ts_1_1["every"],
          });
        },
        function (exhaust_ts_1_1) {
          exports_212({
            "exhaust": exhaust_ts_1_1["exhaust"],
          });
        },
        function (exhaustMap_ts_1_1) {
          exports_212({
            "exhaustMap": exhaustMap_ts_1_1["exhaustMap"],
          });
        },
        function (expand_ts_1_1) {
          exports_212({
            "expand": expand_ts_1_1["expand"],
          });
        },
        function (filter_ts_6_1) {
          exports_212({
            "filter": filter_ts_6_1["filter"],
          });
        },
        function (finalize_ts_1_1) {
          exports_212({
            "finalize": finalize_ts_1_1["finalize"],
          });
        },
        function (find_ts_2_1) {
          exports_212({
            "find": find_ts_2_1["find"],
          });
        },
        function (findIndex_ts_1_1) {
          exports_212({
            "findIndex": findIndex_ts_1_1["findIndex"],
          });
        },
        function (first_ts_1_1) {
          exports_212({
            "first": first_ts_1_1["first"],
          });
        },
        function (groupBy_ts_2_1) {
          exports_212({
            "groupBy": groupBy_ts_2_1["groupBy"],
          });
        },
        function (ignoreElements_ts_1_1) {
          exports_212({
            "ignoreElements": ignoreElements_ts_1_1["ignoreElements"],
          });
        },
        function (isEmpty_ts_1_1) {
          exports_212({
            "isEmpty": isEmpty_ts_1_1["isEmpty"],
          });
        },
        function (last_ts_1_1) {
          exports_212({
            "last": last_ts_1_1["last"],
          });
        },
        function (map_ts_12_1) {
          exports_212({
            "map": map_ts_12_1["map"],
          });
        },
        function (mapTo_ts_1_1) {
          exports_212({
            "mapTo": mapTo_ts_1_1["mapTo"],
          });
        },
        function (materialize_ts_1_1) {
          exports_212({
            "materialize": materialize_ts_1_1["materialize"],
          });
        },
        function (max_ts_1_1) {
          exports_212({
            "max": max_ts_1_1["max"],
          });
        },
        function (mergeWith_ts_1_1) {
          exports_212({
            "mergeWith": mergeWith_ts_1_1["mergeWith"],
            "merge": mergeWith_ts_1_1["merge"],
          });
        },
        function (mergeAll_ts_3_1) {
          exports_212({
            "mergeAll": mergeAll_ts_3_1["mergeAll"],
          });
        },
        function (mergeMap_ts_4_1) {
          exports_212({
            "mergeMap": mergeMap_ts_4_1["mergeMap"],
          });
          exports_212({
            "flatMap": mergeMap_ts_4_1["mergeMap"],
          });
        },
        function (mergeMapTo_ts_1_1) {
          exports_212({
            "mergeMapTo": mergeMapTo_ts_1_1["mergeMapTo"],
          });
        },
        function (mergeScan_ts_1_1) {
          exports_212({
            "mergeScan": mergeScan_ts_1_1["mergeScan"],
          });
        },
        function (min_ts_1_1) {
          exports_212({
            "min": min_ts_1_1["min"],
          });
        },
        function (multicast_ts_6_1) {
          exports_212({
            "multicast": multicast_ts_6_1["multicast"],
          });
        },
        function (observeOn_ts_1_1) {
          exports_212({
            "observeOn": observeOn_ts_1_1["observeOn"],
          });
        },
        function (onErrorResumeNext_ts_2_1) {
          exports_212({
            "onErrorResumeNext": onErrorResumeNext_ts_2_1["onErrorResumeNext"],
          });
        },
        function (pairwise_ts_1_1) {
          exports_212({
            "pairwise": pairwise_ts_1_1["pairwise"],
          });
        },
        function (partition_ts_2_1) {
          exports_212({
            "partition": partition_ts_2_1["partition"],
          });
        },
        function (pluck_ts_1_1) {
          exports_212({
            "pluck": pluck_ts_1_1["pluck"],
          });
        },
        function (publish_ts_1_1) {
          exports_212({
            "publish": publish_ts_1_1["publish"],
          });
        },
        function (publishBehavior_ts_1_1) {
          exports_212({
            "publishBehavior": publishBehavior_ts_1_1["publishBehavior"],
          });
        },
        function (publishLast_ts_1_1) {
          exports_212({
            "publishLast": publishLast_ts_1_1["publishLast"],
          });
        },
        function (publishReplay_ts_1_1) {
          exports_212({
            "publishReplay": publishReplay_ts_1_1["publishReplay"],
          });
        },
        function (raceWith_ts_1_1) {
          exports_212({
            "race": raceWith_ts_1_1["race"],
            "raceWith": raceWith_ts_1_1["raceWith"],
          });
        },
        function (reduce_ts_4_1) {
          exports_212({
            "reduce": reduce_ts_4_1["reduce"],
          });
        },
        function (repeat_ts_1_1) {
          exports_212({
            "repeat": repeat_ts_1_1["repeat"],
          });
        },
        function (repeatWhen_ts_1_1) {
          exports_212({
            "repeatWhen": repeatWhen_ts_1_1["repeatWhen"],
          });
        },
        function (retry_ts_1_1) {
          exports_212({
            "retry": retry_ts_1_1["retry"],
          });
        },
        function (retryWhen_ts_1_1) {
          exports_212({
            "retryWhen": retryWhen_ts_1_1["retryWhen"],
          });
        },
        function (refCount_ts_3_1) {
          exports_212({
            "refCount": refCount_ts_3_1["refCount"],
          });
        },
        function (sample_ts_1_1) {
          exports_212({
            "sample": sample_ts_1_1["sample"],
          });
        },
        function (sampleTime_ts_1_1) {
          exports_212({
            "sampleTime": sampleTime_ts_1_1["sampleTime"],
          });
        },
        function (scan_ts_3_1) {
          exports_212({
            "scan": scan_ts_3_1["scan"],
          });
        },
        function (sequenceEqual_ts_1_1) {
          exports_212({
            "sequenceEqual": sequenceEqual_ts_1_1["sequenceEqual"],
          });
        },
        function (share_ts_1_1) {
          exports_212({
            "share": share_ts_1_1["share"],
          });
        },
        function (shareReplay_ts_1_1) {
          exports_212({
            "shareReplay": shareReplay_ts_1_1["shareReplay"],
          });
        },
        function (single_ts_1_1) {
          exports_212({
            "single": single_ts_1_1["single"],
          });
        },
        function (skip_ts_1_1) {
          exports_212({
            "skip": skip_ts_1_1["skip"],
          });
        },
        function (skipLast_ts_1_1) {
          exports_212({
            "skipLast": skipLast_ts_1_1["skipLast"],
          });
        },
        function (skipUntil_ts_1_1) {
          exports_212({
            "skipUntil": skipUntil_ts_1_1["skipUntil"],
          });
        },
        function (skipWhile_ts_1_1) {
          exports_212({
            "skipWhile": skipWhile_ts_1_1["skipWhile"],
          });
        },
        function (startWith_ts_1_1) {
          exports_212({
            "startWith": startWith_ts_1_1["startWith"],
          });
        },
        function (subscribeOn_ts_1_1) {
          exports_212({
            "subscribeOn": subscribeOn_ts_1_1["subscribeOn"],
          });
        },
        function (switchAll_ts_1_1) {
          exports_212({
            "switchAll": switchAll_ts_1_1["switchAll"],
          });
        },
        function (switchMap_ts_3_1) {
          exports_212({
            "switchMap": switchMap_ts_3_1["switchMap"],
          });
        },
        function (switchMapTo_ts_1_1) {
          exports_212({
            "switchMapTo": switchMapTo_ts_1_1["switchMapTo"],
          });
        },
        function (take_ts_3_1) {
          exports_212({
            "take": take_ts_3_1["take"],
          });
        },
        function (takeLast_ts_3_1) {
          exports_212({
            "takeLast": takeLast_ts_3_1["takeLast"],
          });
        },
        function (takeUntil_ts_1_1) {
          exports_212({
            "takeUntil": takeUntil_ts_1_1["takeUntil"],
          });
        },
        function (takeWhile_ts_1_1) {
          exports_212({
            "takeWhile": takeWhile_ts_1_1["takeWhile"],
          });
        },
        function (tap_ts_1_1) {
          exports_212({
            "tap": tap_ts_1_1["tap"],
          });
        },
        function (throttle_ts_2_1) {
          exports_212({
            "throttle": throttle_ts_2_1["throttle"],
          });
        },
        function (throttleTime_ts_1_1) {
          exports_212({
            "throttleTime": throttleTime_ts_1_1["throttleTime"],
          });
        },
        function (throwIfEmpty_ts_4_1) {
          exports_212({
            "throwIfEmpty": throwIfEmpty_ts_4_1["throwIfEmpty"],
          });
        },
        function (timeInterval_ts_1_1) {
          exports_212({
            "timeInterval": timeInterval_ts_1_1["timeInterval"],
          });
        },
        function (timeout_ts_1_1) {
          exports_212({
            "timeout": timeout_ts_1_1["timeout"],
          });
        },
        function (timeoutWith_ts_2_1) {
          exports_212({
            "timeoutWith": timeoutWith_ts_2_1["timeoutWith"],
          });
        },
        function (timestamp_ts_1_1) {
          exports_212({
            "timestamp": timestamp_ts_1_1["timestamp"],
          });
        },
        function (toArray_ts_1_1) {
          exports_212({
            "toArray": toArray_ts_1_1["toArray"],
          });
        },
        function (window_ts_1_1) {
          exports_212({
            "window": window_ts_1_1["window"],
          });
        },
        function (windowCount_ts_1_1) {
          exports_212({
            "windowCount": windowCount_ts_1_1["windowCount"],
          });
        },
        function (windowTime_ts_1_1) {
          exports_212({
            "windowTime": windowTime_ts_1_1["windowTime"],
          });
        },
        function (windowToggle_ts_1_1) {
          exports_212({
            "windowToggle": windowToggle_ts_1_1["windowToggle"],
          });
        },
        function (windowWhen_ts_1_1) {
          exports_212({
            "windowWhen": windowWhen_ts_1_1["windowWhen"],
          });
        },
        function (withLatestFrom_ts_1_1) {
          exports_212({
            "withLatestFrom": withLatestFrom_ts_1_1["withLatestFrom"],
          });
        },
        function (zipWith_ts_1_1) {
          exports_212({
            "zip": zipWith_ts_1_1["zip"],
            "zipWith": zipWith_ts_1_1["zipWith"],
          });
        },
        function (zipAll_ts_1_1) {
          exports_212({
            "zipAll": zipAll_ts_1_1["zipAll"],
          });
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "https://deno.land/x/rxjs/operators",
  ["https://deno.land/x/rxjs/src/operators/index"],
  function (exports_213, context_213) {
    "use strict";
    var __moduleName = context_213 && context_213.id;
    function exportStar_2(m) {
      var exports = {};
      for (var n in m) {
        if (n !== "default") exports[n] = m[n];
      }
      exports_213(exports);
    }
    return {
      setters: [
        function (index_ts_1_1) {
          exportStar_2(index_ts_1_1);
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "file:///Users/yshay/Code/deno-demo/rx-example",
  ["https://deno.land/x/rxjs/mod", "https://deno.land/x/rxjs/operators"],
  function (exports_214, context_214) {
    "use strict";
    var mod_ts_1, operators_ts_1;
    var __moduleName = context_214 && context_214.id;
    return {
      setters: [
        function (mod_ts_1_1) {
          mod_ts_1 = mod_ts_1_1;
        },
        function (operators_ts_1_1) {
          operators_ts_1 = operators_ts_1_1;
        },
      ],
      execute: function () {
        mod_ts_1.range(1, 200)
          .pipe(
            operators_ts_1.filter((x) => {
              return x % 2 === 1;
            }),
            operators_ts_1.map((x) => x + x),
          )
          .subscribe((x) => console.log(x));
      },
    };
  },
);

__instantiate("file:///Users/yshay/Code/deno-demo/rx-example", false);
