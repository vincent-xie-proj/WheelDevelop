//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    function joinValues(templates) {
        var first = templates[0];
        var value = first instanceof eui.Watcher ? first.getValue() : first;
        var length = templates.length;
        for (var i = 1; i < length; i++) {
            var item = templates[i];
            if (item instanceof eui.Watcher) {
                item = item.getValue();
            }
            value += item;
        }
        return value;
    }
    /**
     * @language en_US
     * The Binding class defines utility methods for performing data binding.
     * You can use the methods defined in this class to configure data bindings.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/binding/BindingExample.ts
     */
    /**
     * @language zh_CN
     * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/binding/BindingExample.ts
     */
    var Binding = (function () {
        function Binding() {
        }
        var d = __define,c=Binding,p=c.prototype;
        /**
         * @language en_US
         * Binds a property, <prop>prop</code> on the <code>target</code> Object, to a bindable property or peoperty chain.
         * @param host The object that hosts the property or property chain to be watched.
         * The <code>host</code> maintains a list of <code>targets</code> to update theirs <code>prop</code> when <code>chain</code> changes.
         * @param chain A value specifying the property or chain to be watched. For example, when watch the property <code>host.a.b.c</code>,
         * you need call the method like this: <code>indProperty(host, ["a","b","c"], ...)</code>
         * @param target The Object defining the property to be bound to <code>chain</code>.
         * @param prop The name of the public property defined in the <code>site</code> Object to be bound.
         * @returns A ChangeWatcher instance, if at least one property name has been specified
         * to the <code>chain</code> argument; null otherwise.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????
         * @param host ??????????????????????????????????????????????????????
         * ??? <code>host</code>???<code>chain</code>?????????????????????????????????<code>target</code>??????<code>prop</code>???????????????????????????
         * @param chain ?????????????????????????????????????????????????????????????????? <code>host.a.b.c</code>???????????????????????????????????????<code>bindProperty(host, ["a","b","c"], ...)???</code>
         * @param target ???????????????????????????????????????
         * @param prop ?????????????????????????????????????????????
         * @returns ???????????? chain ??????????????????????????????????????????????????? Watcher ????????????????????? null???
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Binding.bindProperty = function (host, chain, target, prop) {
            var watcher = eui.Watcher.watch(host, chain, null, null);
            if (watcher) {
                var assign = function (value) {
                    target[prop] = value;
                };
                watcher.setHandler(assign, null);
                assign(watcher.getValue());
            }
            return watcher;
        };
        /**
         * @language en_US
         * Binds a callback, <prop>handler</code> on the <code>target</code> Object, to a bindable property or peoperty chain.
         * Callback method to invoke with an argument of the current value of <code>chain</code> when that value changes.
         * @param host The object that hosts the property or property chain to be watched.
         * @param chain A value specifying the property or chain to be watched. For example, when watch the property <code>host.a.b.c</code>,
         * you need call the method like this: <code>indProperty(host, ["a","b","c"], ...)</code>
         * @param handler method to invoke with an argument of the current value of <code>chain</code> when that value changes.
         * @param thisObject <code>this</code> object of binding method
         * @returns A ChangeWatcher instance, if at least one property name has been  specified to the <code>chain</code> argument; null otherwise.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????? host??? chain ?????????????????????????????????handler ???????????????????????????
         * @param host ??????????????????????????????????????????????????????
         * @param chain ?????????????????????????????????????????????????????????????????? host.a.b.c???????????????????????????????????????bindSetter(host, ["a","b","c"], ...)???
         * @param handler ?????????????????????????????????????????????????????????????????????????????????????????????
         * @param thisObject handler ???????????????this??????
         * @returns ???????????? chain ??????????????????????????????????????????????????? Watcher ????????????????????? null???
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Binding.bindHandler = function (host, chain, handler, thisObject) {
            var watcher = eui.Watcher.watch(host, chain, handler, thisObject);
            if (watcher) {
                handler.call(thisObject, watcher.getValue());
            }
            return watcher;
        };
        Binding.$bindProperties = function (host, templates, chainIndex, target, prop) {
            if (templates.length == 1 && chainIndex.length == 1) {
                return Binding.bindProperty(host, templates[0].split("."), target, prop);
            }
            var assign = function () {
                target[prop] = joinValues(templates);
            };
            var length = chainIndex.length;
            var watcher;
            for (var i = 0; i < length; i++) {
                var index = chainIndex[i];
                var chain = templates[index].split(".");
                watcher = eui.Watcher.watch(host, chain, null, null);
                if (watcher) {
                    templates[index] = watcher;
                    watcher.setHandler(assign, null);
                }
            }
            assign();
            return watcher;
        };
        return Binding;
    }());
    eui.Binding = Binding;
    egret.registerClass(Binding,'eui.Binding');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @private
     */
    var listeners = "__listeners__";
    /**
     * @private
     */
    var bindables = "__bindables__";
    /**
     * @private
     */
    var bindableCount = 0;
    /**
     * @private
     *
     * @param host
     * @param property
     * @returns
     */
    function getPropertyDescriptor(host, property) {
        var data = Object.getOwnPropertyDescriptor(host, property);
        if (data) {
            return data;
        }
        var prototype = Object.getPrototypeOf(host);
        if (prototype) {
            return getPropertyDescriptor(prototype, property);
        }
        return null;
    }
    function notifyListener(host, property) {
        var list = host[listeners];
        var length = list.length;
        for (var i = 0; i < length; i += 2) {
            var listener = list[i];
            var target = list[i + 1];
            listener.call(target, property);
        }
    }
    /**
     * @language en_US
     * The Watcher class defines utility method that you can use with bindable properties.
     * These methods let you define an event handler that is executed whenever a bindable property is updated.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/binding/WatcherExample.ts
     */
    /**
     * @language zh_CN
     * Watcher ??????????????????????????????????????????????????????????????????????????????????????? Watcher ??????????????????????????????????????????????????????????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/binding/WatcherExample.ts
     */
    var Watcher = (function () {
        /**
         * @language en_US
         * Constructor.
         * Not for public use. This method is called only from the <code>watch()</code> method.
         * See the <code>watch()</code> method for parameter usage.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????? watch() ????????????????????????????????????????????????????????? watch() ?????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function Watcher(property, handler, thisObject, next) {
            /**
             * @private
             */
            this.isExecuting = false;
            this.property = property;
            this.handler = handler;
            this.next = next;
            this.thisObject = thisObject;
        }
        var d = __define,c=Watcher,p=c.prototype;
        /**
         * @language en_US
         * Creates and starts a Watcher instance.
         * The Watcher can only watch the property of a Object which host is instance of egret.IEventDispatcher.
         * @param host The object that hosts the property or property chain to be watched.
         * You can use the use the <code>reset()</code> method to change the value of the <code>host</code> argument
         * after creating the Watcher instance.
         * The <code>host</code> maintains a list of <code>handlers</code> to invoke when <code>prop</code> changes.
         * @param chain A value specifying the property or chain to be watched.
         * For example, to watch the property <code>host.a.b.c</code>,
         * call the method as: <code>watch(host, ["a","b","c"], ...)</code>.
         * @param handler  An event handler function called when the value of the watched property
         * (or any property in a watched chain) is modified.
         * @param thisObject <code>this</code> object of which binding with handler
         * @returns he ChangeWatcher instance, if at least one property name has been specified to
         * the <code>chain</code> argument; null otherwise.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????? Watcher ??????????????????Watcher ???????????? host ??? egret.IEventDispatcher ??????????????????????????????????????????????????????????????????????????? egret.IEventDispatcher???
         * ???????????????????????????????????????????????????????????????
         * @param host ??????????????????????????????????????????????????????
         * ??????Watcher???????????????????????????<code>reset()</code>????????????<code>host</code>???????????????
         * ???<code>prop</code>???????????????????????????host??????????????????<code>handlers</code>????????????
         * @param chain ?????????????????????????????????????????????????????????????????? host.a.b.c???????????????????????????????????????watch??(host, ["a","b","c"], ...)???
         * @param handler ?????????????????????????????????????????????????????????????????????????????????????????????
         * @param thisObject handler ???????????????this??????
         * @returns ???????????? chain ??????????????????????????????????????????????????? Watcher ????????????????????? null???
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Watcher.watch = function (host, chain, handler, thisObject) {
            if (DEBUG) {
                if (!chain) {
                    egret.$error(1003, "chain");
                }
            }
            if (chain.length > 0) {
                var property = chain.shift();
                var next = Watcher.watch(null, chain, handler, thisObject);
                var watcher = new Watcher(property, handler, thisObject, next);
                watcher.reset(host);
                return watcher;
            }
            else {
                return null;
            }
        };
        /**
         * @private
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????false???
         */
        Watcher.checkBindable = function (host, property) {
            var list = host[bindables];
            if (list && list.indexOf(property) != -1) {
                return true;
            }
            var isEventDispatcher = egret.is(host, "egret.IEventDispatcher");
            if (!isEventDispatcher && !host[listeners]) {
                host[listeners] = [];
            }
            var data = getPropertyDescriptor(host, property);
            if (data && data.set && data.get) {
                var orgSet_1 = data.set;
                data.set = function (value) {
                    if (this[property] != value) {
                        orgSet_1.call(this, value);
                        if (isEventDispatcher) {
                            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, property);
                        }
                        else {
                            notifyListener(this, property);
                        }
                    }
                };
            }
            else if (!data || (!data.get && !data.set)) {
                bindableCount++;
                var newProp_1 = "_" + bindableCount + property;
                host[newProp_1] = data ? data.value : null;
                data = { enumerable: true, configurable: true };
                data.get = function () {
                    return this[newProp_1];
                };
                data.set = function (value) {
                    if (this[newProp_1] != value) {
                        this[newProp_1] = value;
                        if (isEventDispatcher) {
                            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, property);
                        }
                        else {
                            notifyListener(this, property);
                        }
                    }
                };
            }
            else {
                return false;
            }
            Object.defineProperty(host, property, data);
            eui.registerBindable(host, property);
        };
        /**
         * @language en_US
         * Detaches this Watcher instance, and its handler function, from the current host.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????? Watcher ???????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.unwatch = function () {
            this.reset(null);
            this.handler = null;
            if (this.next) {
                this.next.handler = null;
            }
        };
        /**
         * @language en_US
         * Retrieves the current value of the watched property or property chain, or null if the host object is null.
         * @example
         * <pre>
         * watch(obj, ["a","b","c"], ...).getValue() === obj.a.b.c
         * </pre>
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????????
         * @example
         * <pre>
         * watch(obj, ["a","b","c"], ...).getValue() === obj.a.b.c
         * </pre>
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getValue = function () {
            if (this.next) {
                return this.next.getValue();
            }
            return this.getHostPropertyValue();
        };
        /**
         * @language en_US
         * Sets the handler function.s
         * @param handler The handler function. This argument must not be null.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         * @param handler ??????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setHandler = function (handler, thisObject) {
            this.handler = handler;
            this.thisObject = thisObject;
            if (this.next) {
                this.next.setHandler(handler, thisObject);
            }
        };
        /**
         * @language en_US
         * Resets this ChangeWatcher instance to use a new host object.
         * You can call this method to reuse a watcher instance on a different host.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????? Watcher ?????????????????????????????????
         * ????????????????????????????????????Watcher??????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.reset = function (newHost) {
            var oldHost = this.host;
            if (oldHost) {
                if (egret.is(oldHost, "egret.IEventDispatcher")) {
                    oldHost.removeEventListener(eui.PropertyEvent.PROPERTY_CHANGE, this.wrapHandler, this);
                }
                else {
                    var list = oldHost[listeners];
                    var index = list.indexOf(this);
                    list.splice(index - 1, 2);
                }
            }
            this.host = newHost;
            if (newHost) {
                Watcher.checkBindable(newHost, this.property);
                if (egret.is(newHost, "egret.IEventDispatcher")) {
                    newHost.addEventListener(eui.PropertyEvent.PROPERTY_CHANGE, this.wrapHandler, this, false, 100);
                }
                else {
                    var list = newHost[listeners];
                    list.push(this.onPropertyChange);
                    list.push(this);
                }
            }
            if (this.next)
                this.next.reset(this.getHostPropertyValue());
        };
        /**
         * @private
         *
         * @returns
         */
        p.getHostPropertyValue = function () {
            return this.host ? this.host[this.property] : null;
        };
        /**
         * @private
         */
        p.wrapHandler = function (event) {
            this.onPropertyChange(event.property);
        };
        /**
         * @private
         */
        p.onPropertyChange = function (property) {
            if (property == this.property && !this.isExecuting) {
                try {
                    this.isExecuting = true;
                    if (this.next)
                        this.next.reset(this.getHostPropertyValue());
                    this.handler.call(this.thisObject, this.getValue());
                }
                finally {
                    this.isExecuting = false;
                }
            }
        };
        return Watcher;
    }());
    eui.Watcher = Watcher;
    egret.registerClass(Watcher,'eui.Watcher');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * Register a property for a class definition in running,
     * so that the EUI can get type of property accurate when parsing a EXML.
     * This need not be called directly in most of time. Only when you have a custom UI
     * component need to be described in EXML, you may invoke this method explicitly.
     *
     * Contains no following???
     * When the property is the basic data type(boolean, number, string or Array), you only need set a correct initial value
     * for he custom property then the EXML parser can get the correct property type in running.
     *
     * If you can not set the correct initial value (such as <code>null</code>), the EXML parser will treat this property as
     * <code>string</code>. If there is no inital value, EUI will throw an error. But you can invoked this method to register
     * a property in this case.
     *
     *
     * @param classDefinition The class definition need to be registered.
     * @param property The property need to be registered. Note that the property
     * name cannot start with "_" or "$".
     * @param type The type need to be registered,
     * such as ???boolean","number","string","Array","egret.Rectangle" and so on.
     * @param asDefault Whether register this property as a default property of component.
     * One component can register only on default property. And the default property can be spare in an EXML.
     *
     * @example???
     * <pre>
     *      <s:Scroller>
     *          <s:viewport>
     *          <s:Group/>
     *          </e:viewport>
     *      </e:Scroller>
     * </pre>
     * Cuz <code>viewport</code> is the default property of Scroller. So you can write as follow:
     * <pre>
     *      <s:Scroller>
     *          <s:Group/>
     *      </e:Scroller>
     * </pre>
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ??????????????????????????????????????????????????????????????????EXML???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ?????????????????????????????? UI ??????????????????EXML????????????????????????????????????????????????????????????????????????
     * ???????????????????????????????????????boolean,number,string,Array??????????????????????????????????????????????????????????????????????????????????????????
     * ?????????EXML?????????????????????????????????????????????????????????????????????
     * ???????????????????????????????????????????????????(?????????????????????null),?????????EXML??????????????????????????????string???????????????????????????????????????????????????????????????????????????
     * ?????????????????????????????????????????????????????????????????????
     *
     * @param classDefinition ????????????????????????
     * @param property ??????????????????,???????????????????????? _ ??? $ ????????????
     * @param type ??????????????????,????????????boolean","number","string","Array","egret.Rectangle"
     * @param asDefault ????????????????????????????????????????????????,????????????????????????????????????????????????????????????????????????????????????EXML?????????????????????????????????????????????
     * @example???
     * <pre>
     * <s:Scroller>
     *     <s:viewport>
     *         <s:Group/>
     *     </e:viewport>
     * </e:Scroller>
     * </pre>
     * ?????? viewport ??????????????? Scroller ???????????????????????????????????????????????????
     * <pre>
     * <s:Scroller>
     *     <s:Group/>
     * </e:Scroller>
     * </pre>
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    function registerProperty(classDefinition, property, type, asDefault) {
        if (DEBUG) {
            if (!classDefinition) {
                egret.$error(1003, "classDefinition");
            }
            if (!classDefinition.prototype) {
                egret.$error(1012, "classDefinition");
            }
            if (!property) {
                egret.$error(1003, "property");
            }
            if (!type) {
                egret.$error(1003, "type");
            }
        }
        var prototype = classDefinition.prototype;
        prototype.__meta__ = prototype.__meta__ || {};
        prototype.__meta__[property] = type;
        if (asDefault) {
            prototype.__defaultProperty__ = property;
        }
    }
    eui.registerProperty = registerProperty;
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var key = "__bindables__";
    /**
     * @language en_US
     * Register a property of an instance is can be bound.
     * This method is ususally invoked by Watcher class.
     *
     * @param instance the instance to be registered.
     * @param property the property of specified instance to be registered.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ??????????????????????????????????????????,?????????????????? Watcher ????????????
     *
     * @param instance ??????????????????
     * @param property ?????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    function registerBindable(instance, property) {
        if (DEBUG) {
            if (!instance) {
                egret.$error(1003, "instance");
            }
            if (!property) {
                egret.$error(1003, "property");
            }
        }
        if (instance.hasOwnProperty(key)) {
            instance[key].push(property);
        }
        else {
            var list = [property];
            if (instance[key]) {
                list = instance[key].concat(list);
            }
            instance[key] = list;
        }
    }
    eui.registerBindable = registerBindable;
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/// <reference path="../utils/registerProperty.ts" />
/// <reference path="../utils/registerBindable.ts" />
var eui;
(function (eui) {
    /**
     * @language en_US
     * The ArrayCollection class is a wrapper class that exposes an <code>any[]</code> as a collection that can be
     * accessed and manipulated using the methods and properties of the <code>ICollection</code> interfaces.
     * ArrayCollection can notify the view to update item when data source changed.
     *
     * @event eui.CollectionEvent.COLLECTION_CHANGE Dispatched when the ArrayCollection has been updated in some way.
     *
     * @defaultProperty source
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/collections/ArrayCollectionExample.ts
     */
    /**
     * @language zh_CN
     * ArrayCollection ?????????????????????????????????????????????????????????<code>ICollection</code>??????????????????????????????????????????????????????
     * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     *
     * @event eui.CollectionEvent.COLLECTION_CHANGE ??? ArrayCollection ???????????????????????????????????????
     *
     * @defaultProperty source
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/collections/ArrayCollectionExample.ts
     */
    var ArrayCollection = (function (_super) {
        __extends(ArrayCollection, _super);
        /**
         * @language en_US
         * Constructor. <p/>
         * Creates a new ArrayCollection using the specified source array.
         * If no array is specified an empty array will be used.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????<p/>
         * ???????????????????????????????????? ArrayCollection ?????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function ArrayCollection(source) {
            _super.call(this);
            if (source) {
                this._source = source;
            }
            else {
                this._source = [];
            }
        }
        var d = __define,c=ArrayCollection,p=c.prototype;
        d(p, "source"
            /**
             * @language en_US
             * The source of data in the ArrayCollection.
             * The ArrayCollection object does not represent any changes that you make
             * directly to the source array. Always use the ICollection methods to view the collection.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????
             * ????????????????????????????????????Array??????????????????????????????????????????????????????????????????????????????????????????????????????ICollection?????????????????????????????????
             * ????????????????????????????????????????????????refresh()?????????????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._source;
            }
            ,function (value) {
                if (!value)
                    value = [];
                this._source = value;
                this.dispatchCoEvent(eui.CollectionEventKind.RESET);
            }
        );
        /**
         * @language en_US
         * Applies the sort and filter to the view.
         * The ArrayCollection does not detect source data changes automatically,
         * so you must call the <code>refresh()</code>
         * method to update the view after changing the source data.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????,??????????????????
         * ArrayCollection ??????????????????????????????????????????,?????????????????????<code>refresh()</code>????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.refresh = function () {
            this.dispatchCoEvent(eui.CollectionEventKind.REFRESH);
        };
        d(p, "length"
            //--------------------------------------------------------------------------
            //
            // ICollection??????????????????
            //
            //--------------------------------------------------------------------------
            /**
             * @inheritDoc
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._source.length;
            }
        );
        /**
         * @language en_US
         * Adds the specified item to the end of the list.
         * Equivalent to <code>addItemAt(item, length)</code>.
         * @param item The item to add.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????? <code>addItemAt(item, length)</code>???
         * @param item ?????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.addItem = function (item) {
            this._source.push(item);
            this.dispatchCoEvent(eui.CollectionEventKind.ADD, this._source.length - 1, -1, [item]);
        };
        /**
         * @language en_US
         * Adds the item at the specified index.
         * The index of any item greater than the index of the added item is increased by one.
         * If the the specified index is less than zero or greater than the length
         * of the list, a Error which code is 1007 is thrown.
         * @param item The item to place at the index.
         * @param index The index at which to place the item.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????
         * ??????????????????????????????????????????????????????????????? 1???
         * ????????????????????????0?????????????????????????????????????????????1007?????????
         * @param item ???????????????
         * @param index ??????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.addItemAt = function (item, index) {
            if (index < 0 || index > this._source.length) {
                DEBUG && egret.$error(1007);
            }
            this._source.splice(index, 0, item);
            this.dispatchCoEvent(eui.CollectionEventKind.ADD, index, -1, [item]);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getItemAt = function (index) {
            return this._source[index];
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getItemIndex = function (item) {
            var length = this._source.length;
            for (var i = 0; i < length; i++) {
                if (this._source[i] === item) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * @language en_US
         * Notifies the view that an item has been updated.
         * @param item The item within the view that was updated.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????
         * @param item ?????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.itemUpdated = function (item) {
            var index = this.getItemIndex(item);
            if (index != -1) {
                this.dispatchCoEvent(eui.CollectionEventKind.UPDATE, index, -1, [item]);
            }
        };
        /**
         * @language en_US
         * Removes all items from the list.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.removeAll = function () {
            var items = this._source.concat();
            this._source.length = 0;
            this.dispatchCoEvent(eui.CollectionEventKind.REMOVE, 0, -1, items);
        };
        /**
         * @language en_US
         * Removes the item at the specified index and returns it.
         * Any items that were after this index are now one index earlier.
         * @param index The index from which to remove the item.
         * @return The item that was removed.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @param index ??????????????????????????????
         * @return ??????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.removeItemAt = function (index) {
            if (index < 0 || index >= this._source.length) {
                DEBUG && egret.$error(1007);
                return;
            }
            var item = this._source.splice(index, 1)[0];
            this.dispatchCoEvent(eui.CollectionEventKind.REMOVE, index, -1, [item]);
            return item;
        };
        /**
         * @language en_US
         * Replaces the item at the specified index.
         * @param item The new item to be placed at the specified index.
         * @param index The index at which to place the item.
         * @return The item that was replaced, or <code>null</code> if none.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????????????????
         * @param item ???????????????????????????????????????
         * @param index ????????????????????????????????????
         * @return ????????????????????????????????????????????????<code>null</code> ???
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.replaceItemAt = function (item, index) {
            if (index < 0 || index >= this._source.length) {
                DEBUG && egret.$error(1007);
                return;
            }
            var oldItem = this._source.splice(index, 1, item)[0];
            this.dispatchCoEvent(eui.CollectionEventKind.REPLACE, index, -1, [item], [oldItem]);
            return oldItem;
        };
        /**
         * @language en_US
         * Replaces all items with a new source data, this method can not reset the scroller position of view.
         * @param newSource new source data.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????source?????????????????????????????????????????????????????????
         * @param newSource ????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.replaceAll = function (newSource) {
            if (!newSource)
                newSource = [];
            var newLength = newSource.length;
            var oldLength = this._source.length;
            for (var i = newLength; i < oldLength; i++) {
                this.removeItemAt(newLength);
            }
            for (var i = 0; i < newLength; i++) {
                if (i >= oldLength)
                    this.addItemAt(newSource[i], i);
                else
                    this.replaceItemAt(newSource[i], i);
            }
            this._source = newSource;
        };
        /**
         * @private
         * ????????????
         */
        p.dispatchCoEvent = function (kind, location, oldLocation, items, oldItems) {
            eui.CollectionEvent.dispatchCollectionEvent(this, eui.CollectionEvent.COLLECTION_CHANGE, kind, location, oldLocation, items, oldItems);
        };
        return ArrayCollection;
    }(egret.EventDispatcher));
    eui.ArrayCollection = ArrayCollection;
    egret.registerClass(ArrayCollection,'eui.ArrayCollection',["eui.ICollection","egret.IEventDispatcher"]);
    eui.registerProperty(ArrayCollection, "source", "Array", true);
    if (DEBUG) {
        egret.$markReadOnly(ArrayCollection, "length");
    }
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var sys;
    (function (sys) {
        /**
         * @private
         * ?????????????????????
         */
        var Validator = (function (_super) {
            __extends(Validator, _super);
            /**
             * @private
             * ????????????Validator??????
             */
            function Validator() {
                _super.call(this);
                /**
                 * @private
                 */
                this.targetLevel = Number.POSITIVE_INFINITY;
                /**
                 * @private
                 */
                this.invalidatePropertiesFlag = false;
                /**
                 * @private
                 */
                this.invalidateClientPropertiesFlag = false;
                /**
                 * @private
                 */
                this.invalidatePropertiesQueue = new DepthQueue();
                /**
                 * @private
                 */
                this.invalidateSizeFlag = false;
                /**
                 * @private
                 */
                this.invalidateClientSizeFlag = false;
                /**
                 * @private
                 */
                this.invalidateSizeQueue = new DepthQueue();
                /**
                 * @private
                 */
                this.invalidateDisplayListFlag = false;
                /**
                 * @private
                 */
                this.invalidateDisplayListQueue = new DepthQueue();
                /**
                 * @private
                 */
                this.eventDisplay = new egret.Bitmap();
                /**
                 * @private
                 * ?????????????????????????????????
                 */
                this.listenersAttached = false;
            }
            var d = __define,c=Validator,p=c.prototype;
            /**
             * @private
             * ????????????????????????
             */
            p.invalidateProperties = function (client) {
                if (!this.invalidatePropertiesFlag) {
                    this.invalidatePropertiesFlag = true;
                    if (!this.listenersAttached)
                        this.attachListeners();
                }
                if (this.targetLevel <= client.$nestLevel)
                    this.invalidateClientPropertiesFlag = true;
                this.invalidatePropertiesQueue.insert(client);
            };
            /**
             * @private
             * ?????????????????????
             */
            p.validateProperties = function () {
                var queue = this.invalidatePropertiesQueue;
                var client = queue.shift();
                while (client) {
                    if (client.$stage) {
                        client.validateProperties();
                    }
                    client = queue.shift();
                }
                if (queue.isEmpty())
                    this.invalidatePropertiesFlag = false;
            };
            /**
             * @private
             * ??????????????????????????????
             */
            p.invalidateSize = function (client) {
                if (!this.invalidateSizeFlag) {
                    this.invalidateSizeFlag = true;
                    if (!this.listenersAttached)
                        this.attachListeners();
                }
                if (this.targetLevel <= client.$nestLevel)
                    this.invalidateClientSizeFlag = true;
                this.invalidateSizeQueue.insert(client);
            };
            /**
             * @private
             * ????????????
             */
            p.validateSize = function () {
                var queue = this.invalidateSizeQueue;
                var client = queue.pop();
                while (client) {
                    if (client.$stage) {
                        client.validateSize();
                    }
                    client = queue.pop();
                }
                if (queue.isEmpty())
                    this.invalidateSizeFlag = false;
            };
            /**
             * @private
             * ????????????????????????
             */
            p.invalidateDisplayList = function (client) {
                if (!this.invalidateDisplayListFlag) {
                    this.invalidateDisplayListFlag = true;
                    if (!this.listenersAttached)
                        this.attachListeners();
                }
                this.invalidateDisplayListQueue.insert(client);
            };
            /**
             * @private
             * ????????????
             */
            p.validateDisplayList = function () {
                var queue = this.invalidateDisplayListQueue;
                var client = queue.shift();
                while (client) {
                    if (client.$stage) {
                        client.validateDisplayList();
                    }
                    client = queue.shift();
                }
                if (queue.isEmpty())
                    this.invalidateDisplayListFlag = false;
            };
            /**
             * @private
             * ??????????????????
             */
            p.attachListeners = function () {
                this.eventDisplay.addEventListener(egret.Event.ENTER_FRAME, this.doPhasedInstantiationCallBack, this);
                this.eventDisplay.addEventListener(egret.Event.RENDER, this.doPhasedInstantiationCallBack, this);
                egret.sys.$invalidateRenderFlag = true;
                this.listenersAttached = true;
            };
            /**
             * @private
             * ??????????????????
             */
            p.doPhasedInstantiationCallBack = function (event) {
                this.eventDisplay.removeEventListener(egret.Event.ENTER_FRAME, this.doPhasedInstantiationCallBack, this);
                this.eventDisplay.removeEventListener(egret.Event.RENDER, this.doPhasedInstantiationCallBack, this);
                this.doPhasedInstantiation();
            };
            /**
             * @private
             *
             */
            p.doPhasedInstantiation = function () {
                if (this.invalidatePropertiesFlag) {
                    this.validateProperties();
                }
                if (this.invalidateSizeFlag) {
                    this.validateSize();
                }
                if (this.invalidateDisplayListFlag) {
                    this.validateDisplayList();
                }
                if (this.invalidatePropertiesFlag ||
                    this.invalidateSizeFlag ||
                    this.invalidateDisplayListFlag) {
                    this.attachListeners();
                }
                else {
                    this.listenersAttached = false;
                }
            };
            /**
             * @private
             * ????????????????????????????????????????????????????????????
             * @param target ??????????????????????????????
             */
            p.validateClient = function (target) {
                var obj;
                var done = false;
                var oldTargetLevel = this.targetLevel;
                if (this.targetLevel === Number.POSITIVE_INFINITY)
                    this.targetLevel = target.$nestLevel;
                var propertiesQueue = this.invalidatePropertiesQueue;
                var sizeQueue = this.invalidateSizeQueue;
                var displayListQueue = this.invalidateDisplayListQueue;
                while (!done) {
                    done = true;
                    obj = propertiesQueue.removeSmallestChild(target);
                    while (obj) {
                        if (obj.$stage) {
                            obj.validateProperties();
                        }
                        obj = propertiesQueue.removeSmallestChild(target);
                    }
                    if (propertiesQueue.isEmpty()) {
                        this.invalidatePropertiesFlag = false;
                    }
                    this.invalidateClientPropertiesFlag = false;
                    obj = sizeQueue.removeLargestChild(target);
                    while (obj) {
                        if (obj.$stage) {
                            obj.validateSize();
                        }
                        if (this.invalidateClientPropertiesFlag) {
                            obj = (propertiesQueue.removeSmallestChild(target));
                            if (obj) {
                                propertiesQueue.insert(obj);
                                done = false;
                                break;
                            }
                        }
                        obj = sizeQueue.removeLargestChild(target);
                    }
                    if (sizeQueue.isEmpty()) {
                        this.invalidateSizeFlag = false;
                    }
                    this.invalidateClientPropertiesFlag = false;
                    this.invalidateClientSizeFlag = false;
                    obj = displayListQueue.removeSmallestChild(target);
                    while (obj) {
                        if (obj.$stage) {
                            obj.validateDisplayList();
                        }
                        if (this.invalidateClientPropertiesFlag) {
                            obj = propertiesQueue.removeSmallestChild(target);
                            if (obj) {
                                propertiesQueue.insert(obj);
                                done = false;
                                break;
                            }
                        }
                        if (this.invalidateClientSizeFlag) {
                            obj = sizeQueue.removeLargestChild(target);
                            if (obj) {
                                sizeQueue.insert(obj);
                                done = false;
                                break;
                            }
                        }
                        obj = displayListQueue.removeSmallestChild(target);
                    }
                    if (displayListQueue.isEmpty()) {
                        this.invalidateDisplayListFlag = false;
                    }
                }
                if (oldTargetLevel === Number.POSITIVE_INFINITY) {
                    this.targetLevel = Number.POSITIVE_INFINITY;
                }
            };
            return Validator;
        }(egret.EventDispatcher));
        sys.Validator = Validator;
        egret.registerClass(Validator,'eui.sys.Validator');
        /**
         * @private
         * ????????????????????????????????????
         */
        var DepthQueue = (function () {
            function DepthQueue() {
                /**
                 * ????????????
                 */
                this.depthBins = {};
                /**
                 * ????????????
                 */
                this.minDepth = 0;
                /**
                 * ????????????
                 */
                this.maxDepth = -1;
            }
            var d = __define,c=DepthQueue,p=c.prototype;
            /**
             * ??????????????????
             */
            p.insert = function (client) {
                var depth = client.$nestLevel;
                if (this.maxDepth < this.minDepth) {
                    this.minDepth = this.maxDepth = depth;
                }
                else {
                    if (depth < this.minDepth)
                        this.minDepth = depth;
                    if (depth > this.maxDepth)
                        this.maxDepth = depth;
                }
                var bin = this.depthBins[depth];
                if (!bin) {
                    bin = this.depthBins[depth] = new DepthBin();
                }
                bin.insert(client);
            };
            /**
             * ?????????????????????????????????????????????
             */
            p.pop = function () {
                var client;
                var minDepth = this.minDepth;
                if (minDepth <= this.maxDepth) {
                    var bin = this.depthBins[this.maxDepth];
                    while (!bin || bin.length === 0) {
                        this.maxDepth--;
                        if (this.maxDepth < minDepth)
                            return null;
                        bin = this.depthBins[this.maxDepth];
                    }
                    client = bin.pop();
                    while (!bin || bin.length == 0) {
                        this.maxDepth--;
                        if (this.maxDepth < minDepth)
                            break;
                        bin = this.depthBins[this.maxDepth];
                    }
                }
                return client;
            };
            /**
             * ?????????????????????????????????????????????
             */
            p.shift = function () {
                var client;
                var maxDepth = this.maxDepth;
                if (this.minDepth <= maxDepth) {
                    var bin = this.depthBins[this.minDepth];
                    while (!bin || bin.length === 0) {
                        this.minDepth++;
                        if (this.minDepth > maxDepth)
                            return null;
                        bin = this.depthBins[this.minDepth];
                    }
                    client = bin.pop();
                    while (!bin || bin.length == 0) {
                        this.minDepth++;
                        if (this.minDepth > maxDepth)
                            break;
                        bin = this.depthBins[this.minDepth];
                    }
                }
                return client;
            };
            /**
             * ???????????????????????????????????????????????????????????????
             */
            p.removeLargestChild = function (client) {
                var hashCode = client.$hashCode;
                var nestLevel = client.$nestLevel;
                var max = this.maxDepth;
                var min = nestLevel;
                while (min <= max) {
                    var bin = this.depthBins[max];
                    if (bin && bin.length > 0) {
                        if (max === nestLevel) {
                            if (bin.map[hashCode]) {
                                bin.remove(client);
                                return client;
                            }
                        }
                        else if (egret.is(client, "egret.DisplayObjectContainer")) {
                            var items = bin.items;
                            var length_1 = bin.length;
                            for (var i = 0; i < length_1; i++) {
                                var value = items[i];
                                if (client.contains(value)) {
                                    bin.remove(value);
                                    return value;
                                }
                            }
                        }
                        else {
                            break;
                        }
                        max--;
                    }
                    else {
                        if (max == this.maxDepth) {
                            this.maxDepth--;
                        }
                        max--;
                        if (max < min)
                            break;
                    }
                }
                return null;
            };
            /**
             * ???????????????????????????????????????????????????????????????
             */
            p.removeSmallestChild = function (client) {
                var nestLevel = client.$nestLevel;
                var min = nestLevel;
                var max = this.maxDepth;
                var hashCode = client.$hashCode;
                while (min <= max) {
                    var bin = this.depthBins[min];
                    if (bin && bin.length > 0) {
                        if (min === nestLevel) {
                            if (bin.map[hashCode]) {
                                bin.remove(client);
                                return client;
                            }
                        }
                        else if (egret.is(client, "egret.DisplayObjectContainer")) {
                            var items = bin.items;
                            var length_2 = bin.length;
                            for (var i = 0; i < length_2; i++) {
                                var value = items[i];
                                if (client.contains(value)) {
                                    bin.remove(value);
                                    return value;
                                }
                            }
                        }
                        else {
                            break;
                        }
                        min++;
                    }
                    else {
                        if (min == this.minDepth)
                            this.minDepth++;
                        min++;
                        if (min > max)
                            break;
                    }
                }
                return null;
            };
            /**
             * ??????????????????
             */
            p.isEmpty = function () {
                return this.minDepth > this.maxDepth;
            };
            return DepthQueue;
        }());
        egret.registerClass(DepthQueue,'DepthQueue');
        /**
         * @private
         * ?????????
         */
        var DepthBin = (function () {
            function DepthBin() {
                this.map = {};
                this.items = [];
                this.length = 0;
            }
            var d = __define,c=DepthBin,p=c.prototype;
            p.insert = function (client) {
                var hashCode = client.$hashCode;
                if (this.map[hashCode]) {
                    return;
                }
                this.map[hashCode] = true;
                this.length++;
                this.items.push(client);
            };
            p.pop = function () {
                var client = this.items.pop(); //??????pop??????shift????????????????????????????????????????????????
                if (client) {
                    this.length--;
                    if (this.length === 0) {
                        this.map = {}; //????????????key??????????????????
                    }
                    else {
                        this.map[client.$hashCode] = false;
                    }
                }
                return client;
            };
            p.remove = function (client) {
                var index = this.items.indexOf(client);
                if (index >= 0) {
                    this.items.splice(index, 1);
                    this.length--;
                    if (this.length === 0) {
                        this.map = {}; //????????????key??????????????????
                    }
                    else {
                        this.map[client.$hashCode] = false;
                    }
                }
            };
            return DepthBin;
        }());
        egret.registerClass(DepthBin,'DepthBin');
    })(sys = eui.sys || (eui.sys = {}));
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/// <reference path="Validator.ts" />
var eui;
(function (eui) {
    var sys;
    (function (sys) {
        var UIComponentClass = "eui.UIComponent";
        function isDeltaIdentity(m) {
            return (m.a === 1 && m.b === 0 && m.c === 0 && m.d === 1);
        }
        var validator = new sys.Validator();
        /**
         * @private
         * EUI ???????????????????????????????????? UIComponent ?????????????????????egret.sys.implemenetUIComponenet()???????????????????????????
         * ??????????????????????????????????????????super??????????????????????????????????????????this.$super???????????????
         */
        var UIComponentImpl = (function (_super) {
            __extends(UIComponentImpl, _super);
            /**
             * @private
             * ????????????
             */
            function UIComponentImpl() {
                _super.call(this);
                this.initializeUIValues();
            }
            var d = __define,c=UIComponentImpl,p=c.prototype;
            /**
             * @private
             * UIComponentImpl ???????????????????????????????????????????????????????????????????????????????????????
             */
            p.initializeUIValues = function () {
                this.$UIComponent = {
                    0: NaN,
                    1: NaN,
                    2: NaN,
                    3: NaN,
                    4: NaN,
                    5: NaN,
                    6: NaN,
                    7: NaN,
                    8: NaN,
                    9: NaN,
                    10: 0,
                    11: 0,
                    12: 0,
                    13: 100000,
                    14: 0,
                    15: 100000,
                    16: 0,
                    17: 0,
                    18: NaN,
                    19: NaN,
                    20: 0,
                    21: 0,
                    22: 0,
                    23: 0,
                    24: true,
                    25: true,
                    26: true,
                    27: false,
                    28: false,
                    29: false,
                };
                this.$includeInLayout = true;
                //if egret
                this.$touchEnabled = true;
                //endif*/
            };
            /**
             * @private
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
             * ???????????????super.createChildren()?????????????????????????????????
             */
            p.createChildren = function () {
            };
            /**
             * @private
             * ??????????????????,????????????createChildren()???????????????
             */
            p.childrenCreated = function () {
            };
            /**
             * @private
             * ?????????????????????????????????invalidateProperties()?????????????????????????????????????????????
             */
            p.commitProperties = function () {
                var values = this.$UIComponent;
                if (values[22 /* oldWidth */] != values[10 /* width */] || values[23 /* oldHeight */] != values[11 /* height */]) {
                    this.dispatchEventWith(egret.Event.RESIZE);
                    values[22 /* oldWidth */] = values[10 /* width */];
                    values[23 /* oldHeight */] = values[11 /* height */];
                }
                if (values[20 /* oldX */] != this.$getX() || values[21 /* oldY */] != this.$getY()) {
                    eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.MOVE);
                    values[20 /* oldX */] = this.$getX();
                    values[21 /* oldY */] = this.$getY();
                }
            };
            /**
             * @private
             * ??????????????????
             */
            p.measure = function () {
            };
            /**
             * @private
             * ??????????????????
             */
            p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            };
            d(p, "includeInLayout"
                /**
                 * @private
                 * ????????????????????????????????????????????????????????????false???????????????????????????????????????????????????????????????????????????true???
                 * ?????????visible?????????????????????????????????visible???false????????????????????????????????????
                 */
                ,function () {
                    return this.$includeInLayout;
                }
                ,function (value) {
                    value = !!value;
                    if (this.$includeInLayout === value)
                        return;
                    this.$includeInLayout = true;
                    this.invalidateParentLayout();
                    this.$includeInLayout = value;
                }
            );
            /**
             * @private
             *
             * @param stage
             * @param nestLevel
             */
            p.$onAddToStage = function (stage, nestLevel) {
                this.$super.$onAddToStage.call(this, stage, nestLevel);
                this.checkInvalidateFlag();
                var values = this.$UIComponent;
                if (!values[29 /* initialized */]) {
                    values[29 /* initialized */] = true;
                    this.createChildren();
                    this.childrenCreated();
                    eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CREATION_COMPLETE);
                }
            };
            /**
             * @private
             * ?????????????????????????????????
             */
            p.checkInvalidateFlag = function (event) {
                var values = this.$UIComponent;
                if (values[24 /* invalidatePropertiesFlag */]) {
                    validator.invalidateProperties(this);
                }
                if (values[25 /* invalidateSizeFlag */]) {
                    validator.invalidateSize(this);
                }
                if (values[26 /* invalidateDisplayListFlag */]) {
                    validator.invalidateDisplayList(this);
                }
            };
            d(p, "left"
                /**
                 * @private
                 * ??????????????????????????????
                 */
                ,function () {
                    return this.$UIComponent[0 /* left */];
                }
                ,function (value) {
                    if (!value || typeof value == "number") {
                        value = +value;
                    }
                    else {
                        value = value.toString().trim();
                    }
                    var values = this.$UIComponent;
                    if (values[0 /* left */] === value)
                        return;
                    values[0 /* left */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "right"
                /**
                 * @private
                 * ???????????????????????????
                 */
                ,function () {
                    return this.$UIComponent[1 /* right */];
                }
                ,function (value) {
                    if (!value || typeof value == "number") {
                        value = +value;
                    }
                    else {
                        value = value.toString().trim();
                    }
                    var values = this.$UIComponent;
                    if (values[1 /* right */] === value)
                        return;
                    values[1 /* right */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "top"
                /**
                 * @private
                 * ???????????????????????????
                 */
                ,function () {
                    return this.$UIComponent[2 /* top */];
                }
                ,function (value) {
                    if (!value || typeof value == "number") {
                        value = +value;
                    }
                    else {
                        value = value.toString().trim();
                    }
                    var values = this.$UIComponent;
                    if (values[2 /* top */] === value)
                        return;
                    values[2 /* top */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "bottom"
                /**
                 * @private
                 * ???????????????????????????
                 */
                ,function () {
                    return this.$UIComponent[3 /* bottom */];
                }
                ,function (value) {
                    if (!value || typeof value == "number") {
                        value = +value;
                    }
                    else {
                        value = value.toString().trim();
                    }
                    var values = this.$UIComponent;
                    if (values[3 /* bottom */] == value)
                        return;
                    values[3 /* bottom */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "horizontalCenter"
                /**
                 * @private
                 * ????????????????????????????????????????????????
                 */
                ,function () {
                    return this.$UIComponent[4 /* horizontalCenter */];
                }
                ,function (value) {
                    if (!value || typeof value == "number") {
                        value = +value;
                    }
                    else {
                        value = value.toString().trim();
                    }
                    var values = this.$UIComponent;
                    if (values[4 /* horizontalCenter */] === value)
                        return;
                    values[4 /* horizontalCenter */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "verticalCenter"
                /**
                 * @private
                 * ????????????????????????????????????????????????
                 */
                ,function () {
                    return this.$UIComponent[5 /* verticalCenter */];
                }
                ,function (value) {
                    if (!value || typeof value == "number") {
                        value = +value;
                    }
                    else {
                        value = value.toString().trim();
                    }
                    var values = this.$UIComponent;
                    if (values[5 /* verticalCenter */] === value)
                        return;
                    values[5 /* verticalCenter */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "percentWidth"
                /**
                 * @private
                 * ????????????????????????????????????
                 */
                ,function () {
                    return this.$UIComponent[6 /* percentWidth */];
                }
                ,function (value) {
                    value = +value;
                    var values = this.$UIComponent;
                    if (values[6 /* percentWidth */] === value)
                        return;
                    values[6 /* percentWidth */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "percentHeight"
                /**
                 * @private
                 * ????????????????????????????????????
                 */
                ,function () {
                    return this.$UIComponent[7 /* percentHeight */];
                }
                ,function (value) {
                    value = +value;
                    var values = this.$UIComponent;
                    if (values[7 /* percentHeight */] === value)
                        return;
                    values[7 /* percentHeight */] = value;
                    this.invalidateParentLayout();
                }
            );
            d(p, "explicitWidth"
                /**
                 * @private
                 * ???????????????????????????
                 */
                ,function () {
                    return this.$UIComponent[8 /* explicitWidth */];
                }
            );
            d(p, "explicitHeight"
                /**
                 * @private
                 * ???????????????????????????
                 */
                ,function () {
                    return this.$UIComponent[9 /* explicitHeight */];
                }
            );
            /**
             * @private
             * ????????????,????????????egret.NaN,?????????NaN??????????????????measure()????????????????????????
             */
            p.$getWidth = function () {
                this.validateSizeNow();
                return this.$UIComponent[10 /* width */];
            };
            /**
             * @private
             *
             * @param value
             */
            p.$setWidth = function (value) {
                value = +value;
                var values = this.$UIComponent;
                if (value < 0 || values[10 /* width */] === value && values[8 /* explicitWidth */] === value)
                    return false;
                values[8 /* explicitWidth */] = value;
                if (isNaN(value))
                    this.invalidateSize();
                this.invalidateProperties();
                this.invalidateDisplayList();
                this.invalidateParentLayout();
                return true;
            };
            /**
             * @private
             * ??????????????????????????????
             */
            p.validateSizeNow = function () {
                this.validateSize(true);
                this.updateFinalSize();
            };
            /**
             * @private
             * ????????????,????????????NaN,?????????NaN??????????????????measure()????????????????????????
             */
            p.$getHeight = function () {
                this.validateSizeNow();
                return this.$UIComponent[11 /* height */];
            };
            /**
             * @private
             *
             * @param value
             */
            p.$setHeight = function (value) {
                value = +value;
                var values = this.$UIComponent;
                if (value < 0 || values[11 /* height */] === value && values[9 /* explicitHeight */] === value)
                    return false;
                values[9 /* explicitHeight */] = value;
                if (isNaN(value))
                    this.invalidateSize();
                this.invalidateProperties();
                this.invalidateDisplayList();
                this.invalidateParentLayout();
                return true;
            };
            d(p, "minWidth"
                /**
                 * @private
                 * ?????????????????????,????????????????????????maxWidth???????????????????????????????????????????????????????????????
                 */
                ,function () {
                    return this.$UIComponent[12 /* minWidth */];
                }
                ,function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (value < 0 || values[12 /* minWidth */] === value) {
                        return;
                    }
                    values[12 /* minWidth */] = value;
                    this.invalidateSize();
                    this.invalidateParentLayout();
                }
            );
            d(p, "maxWidth"
                /**
                 * @private
                 * ?????????????????????????????????????????????????????????????????????
                 */
                ,function () {
                    return this.$UIComponent[13 /* maxWidth */];
                }
                ,function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (value < 0 || values[13 /* maxWidth */] === value) {
                        return;
                    }
                    values[13 /* maxWidth */] = value;
                    this.invalidateSize();
                    this.invalidateParentLayout();
                }
            );
            d(p, "minHeight"
                /**
                 * @private
                 * ?????????????????????,????????????????????????maxHeight???????????????????????????????????????????????????????????????
                 */
                ,function () {
                    return this.$UIComponent[14 /* minHeight */];
                }
                ,function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (value < 0 || values[14 /* minHeight */] === value) {
                        return;
                    }
                    values[14 /* minHeight */] = value;
                    this.invalidateSize();
                    this.invalidateParentLayout();
                }
            );
            d(p, "maxHeight"
                /**
                 * @private
                 * ?????????????????????,?????????????????????????????????????????????
                 */
                ,function () {
                    return this.$UIComponent[15 /* maxHeight */];
                }
                ,function (value) {
                    value = +value || 0;
                    var values = this.$UIComponent;
                    if (value < 0 || values[15 /* maxHeight */] === value) {
                        return;
                    }
                    values[15 /* maxHeight */] = value;
                    this.invalidateSize();
                    this.invalidateParentLayout();
                }
            );
            /**
             * @private
             * ?????????????????????
             * @param width ????????????
             * @param height ????????????
             */
            p.setMeasuredSize = function (width, height) {
                var values = this.$UIComponent;
                values[16 /* measuredWidth */] = Math.ceil(+width || 0);
                values[17 /* measuredHeight */] = Math.ceil(+height || 0);
            };
            /**
             * @private
             * ??????????????????????????????????????????????????????width,height?????????
             * ????????????????????????????????????
             */
            p.setActualSize = function (w, h) {
                var change = false;
                var values = this.$UIComponent;
                if (values[10 /* width */] !== w) {
                    values[10 /* width */] = w;
                    change = true;
                }
                if (values[11 /* height */] !== h) {
                    values[11 /* height */] = h;
                    change = true;
                }
                if (change) {
                    this.invalidateDisplayList();
                    this.dispatchEventWith(egret.Event.RESIZE);
                }
            };
            /**
             * @private
             */
            p.$invalidateMatrix = function () {
                this.$super.$invalidateMatrix.call(this);
                this.invalidateParentLayout();
            };
            /**
             * @private
             */
            p.$setMatrix = function (matrix, needUpdateProperties) {
                if (needUpdateProperties === void 0) { needUpdateProperties = true; }
                this.$super.$setMatrix.call(this, matrix, needUpdateProperties);
                this.invalidateParentLayout();
                return true;
            };
            /**
             * @private
             */
            p.$setAnchorOffsetX = function (value) {
                this.$super.$setAnchorOffsetX.call(this, value);
                this.invalidateParentLayout();
                return true;
            };
            /**
             * @private
             */
            p.$setAnchorOffsetY = function (value) {
                this.$super.$setAnchorOffsetY.call(this, value);
                this.invalidateParentLayout();
                return true;
            };
            /**
             * @private
             *
             * @param value
             * @returns
             */
            p.$setX = function (value) {
                var change = this.$super.$setX.call(this, value);
                if (change) {
                    this.invalidateParentLayout();
                    this.invalidateProperties();
                }
                return change;
            };
            /**
             * @private
             *
             * @param value
             * @returns
             */
            p.$setY = function (value) {
                var change = this.$super.$setY.call(this, value);
                if (change) {
                    this.invalidateParentLayout();
                    this.invalidateProperties();
                }
                return change;
            };
            /**
             * @private
             * ??????????????????
             */
            p.invalidateProperties = function () {
                var values = this.$UIComponent;
                if (!values[24 /* invalidatePropertiesFlag */]) {
                    values[24 /* invalidatePropertiesFlag */] = true;
                    if (this.$stage)
                        validator.invalidateProperties(this);
                }
            };
            /**
             * @private
             * ?????????????????????
             */
            p.validateProperties = function () {
                var values = this.$UIComponent;
                if (values[24 /* invalidatePropertiesFlag */]) {
                    this.commitProperties();
                    values[24 /* invalidatePropertiesFlag */] = false;
                }
            };
            /**
             * @private
             * ???????????????????????????????????????
             */
            p.invalidateSize = function () {
                var values = this.$UIComponent;
                if (!values[25 /* invalidateSizeFlag */]) {
                    values[25 /* invalidateSizeFlag */] = true;
                    if (this.$stage)
                        validator.invalidateSize(this);
                }
            };
            /**
             * @private
             * ?????????????????????
             */
            p.validateSize = function (recursive) {
                if (recursive) {
                    var children = this.$children;
                    if (children) {
                        var length_3 = children.length;
                        for (var i = 0; i < length_3; i++) {
                            var child = children[i];
                            if (egret.is(child, UIComponentClass)) {
                                child.validateSize(true);
                            }
                        }
                    }
                }
                var values = this.$UIComponent;
                if (values[25 /* invalidateSizeFlag */]) {
                    var changed = this.measureSizes();
                    if (changed) {
                        this.invalidateDisplayList();
                        this.invalidateParentLayout();
                    }
                    values[25 /* invalidateSizeFlag */] = false;
                }
            };
            /**
             * @private
             * ???????????????????????????????????????????????????
             */
            p.measureSizes = function () {
                var changed = false;
                var values = this.$UIComponent;
                if (!values[25 /* invalidateSizeFlag */])
                    return changed;
                if (isNaN(values[8 /* explicitWidth */]) || isNaN(values[9 /* explicitHeight */])) {
                    this.measure();
                    if (values[16 /* measuredWidth */] < values[12 /* minWidth */]) {
                        values[16 /* measuredWidth */] = values[12 /* minWidth */];
                    }
                    if (values[16 /* measuredWidth */] > values[13 /* maxWidth */]) {
                        values[16 /* measuredWidth */] = values[13 /* maxWidth */];
                    }
                    if (values[17 /* measuredHeight */] < values[14 /* minHeight */]) {
                        values[17 /* measuredHeight */] = values[14 /* minHeight */];
                    }
                    if (values[17 /* measuredHeight */] > values[15 /* maxHeight */]) {
                        values[17 /* measuredHeight */] = values[15 /* maxHeight */];
                    }
                }
                var preferredW = this.getPreferredUWidth();
                var preferredH = this.getPreferredUHeight();
                if (preferredW !== values[18 /* oldPreferWidth */] ||
                    preferredH !== values[19 /* oldPreferHeight */]) {
                    values[18 /* oldPreferWidth */] = preferredW;
                    values[19 /* oldPreferHeight */] = preferredH;
                    changed = true;
                }
                return changed;
            };
            /**
             * @private
             * ??????????????????????????????
             */
            p.invalidateDisplayList = function () {
                var values = this.$UIComponent;
                if (!values[26 /* invalidateDisplayListFlag */]) {
                    values[26 /* invalidateDisplayListFlag */] = true;
                    if (this.$stage)
                        validator.invalidateDisplayList(this);
                }
            };
            /**
             * @private
             * ????????????????????????????????????????????????????????????
             */
            p.validateDisplayList = function () {
                var values = this.$UIComponent;
                if (values[26 /* invalidateDisplayListFlag */]) {
                    this.updateFinalSize();
                    this.updateDisplayList(values[10 /* width */], values[11 /* height */]);
                    values[26 /* invalidateDisplayListFlag */] = false;
                }
            };
            /**
             * @private
             * ???????????????????????????
             */
            p.updateFinalSize = function () {
                var unscaledWidth = 0;
                var unscaledHeight = 0;
                var values = this.$UIComponent;
                if (values[27 /* layoutWidthExplicitlySet */]) {
                    unscaledWidth = values[10 /* width */];
                }
                else if (!isNaN(values[8 /* explicitWidth */])) {
                    unscaledWidth = values[8 /* explicitWidth */];
                }
                else {
                    unscaledWidth = values[16 /* measuredWidth */];
                }
                if (values[28 /* layoutHeightExplicitlySet */]) {
                    unscaledHeight = values[11 /* height */];
                }
                else if (!isNaN(values[9 /* explicitHeight */])) {
                    unscaledHeight = values[9 /* explicitHeight */];
                }
                else {
                    unscaledHeight = values[17 /* measuredHeight */];
                }
                this.setActualSize(unscaledWidth, unscaledHeight);
            };
            /**
             * @private
             * ?????????????????????????????????????????????
             */
            p.validateNow = function () {
                if (this.$stage)
                    validator.validateClient(this);
            };
            /**
             * @private
             * ???????????????????????????????????????????????????
             */
            p.invalidateParentLayout = function () {
                var parent = this.$parent;
                if (!parent || !this.$includeInLayout || !egret.is(parent, UIComponentClass))
                    return;
                parent.invalidateSize();
                parent.invalidateDisplayList();
            };
            /**
             * @private
             * ???????????????????????????
             */
            p.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
                layoutHeight = +layoutHeight;
                layoutWidth = +layoutWidth;
                if (layoutHeight < 0 || layoutWidth < 0) {
                    return;
                }
                var values = this.$UIComponent;
                var maxWidth = values[13 /* maxWidth */];
                var maxHeight = values[15 /* maxHeight */];
                var minWidth = Math.min(values[12 /* minWidth */], maxWidth);
                var minHeight = Math.min(values[14 /* minHeight */], maxHeight);
                var width;
                var height;
                if (isNaN(layoutWidth)) {
                    values[27 /* layoutWidthExplicitlySet */] = false;
                    width = this.getPreferredUWidth();
                }
                else {
                    values[27 /* layoutWidthExplicitlySet */] = true;
                    width = Math.max(minWidth, Math.min(maxWidth, layoutWidth));
                }
                if (isNaN(layoutHeight)) {
                    values[28 /* layoutHeightExplicitlySet */] = false;
                    height = this.getPreferredUHeight();
                }
                else {
                    values[28 /* layoutHeightExplicitlySet */] = true;
                    height = Math.max(minHeight, Math.min(maxHeight, layoutHeight));
                }
                var matrix = this.getAnchorMatrix();
                if (isDeltaIdentity(matrix)) {
                    this.setActualSize(width, height);
                    return;
                }
                var fitSize = sys.MatrixUtil.fitBounds(layoutWidth, layoutHeight, matrix, values[8 /* explicitWidth */], values[9 /* explicitHeight */], this.getPreferredUWidth(), this.getPreferredUHeight(), minWidth, minHeight, maxWidth, maxHeight);
                if (!fitSize) {
                    fitSize = egret.Point.create(minWidth, minHeight);
                }
                this.setActualSize(fitSize.x, fitSize.y);
                egret.Point.release(fitSize);
            };
            /**
             * @private
             * ???????????????????????????
             */
            p.setLayoutBoundsPosition = function (x, y) {
                var matrix = this.$getMatrix();
                if (!isDeltaIdentity(matrix) || this.anchorOffsetX != 0 || this.anchorOffsetY != 0) {
                    var bounds = egret.$TempRectangle;
                    this.getLayoutBounds(bounds);
                    x += this.$getX() - bounds.x;
                    y += this.$getY() - bounds.y;
                }
                var changed = this.$super.$setX.call(this, x);
                if (this.$super.$setY.call(this, y) || changed) {
                    eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.MOVE);
                }
            };
            /**
             * @private
             * ?????????????????????,??????????????????updateDisplayList()?????????
             * ?????????????????????>????????????????????????>???????????? ??????????????????????????????,
             * ????????????????????????????????????scale???rotation???
             */
            p.getLayoutBounds = function (bounds) {
                var values = this.$UIComponent;
                var w;
                if (values[27 /* layoutWidthExplicitlySet */]) {
                    w = values[10 /* width */];
                }
                else if (!isNaN(values[8 /* explicitWidth */])) {
                    w = values[8 /* explicitWidth */];
                }
                else {
                    w = values[16 /* measuredWidth */];
                }
                var h;
                if (values[28 /* layoutHeightExplicitlySet */]) {
                    h = values[11 /* height */];
                }
                else if (!isNaN(values[9 /* explicitHeight */])) {
                    h = values[9 /* explicitHeight */];
                }
                else {
                    h = values[17 /* measuredHeight */];
                }
                this.applyMatrix(bounds, w, h);
            };
            /**
             * @private
             *
             * @returns
             */
            p.getPreferredUWidth = function () {
                var values = this.$UIComponent;
                return isNaN(values[8 /* explicitWidth */]) ?
                    values[16 /* measuredWidth */] : values[8 /* explicitWidth */];
            };
            /**
             * @private
             *
             * @returns
             */
            p.getPreferredUHeight = function () {
                var values = this.$UIComponent;
                return isNaN(values[9 /* explicitHeight */]) ?
                    values[17 /* measuredHeight */] : values[9 /* explicitHeight */];
            };
            /**
             * @private
             * ???????????????????????????,??????????????????measure()?????????
             * ?????????????????????????????????>???????????? ?????????????????????????????????
             * ????????????????????????????????????scale???rotation???
             */
            p.getPreferredBounds = function (bounds) {
                var w = this.getPreferredUWidth();
                var h = this.getPreferredUHeight();
                this.applyMatrix(bounds, w, h);
            };
            /**
             * @private
             */
            p.applyMatrix = function (bounds, w, h) {
                bounds.setTo(0, 0, w, h);
                var matrix = this.getAnchorMatrix();
                if (isDeltaIdentity(matrix)) {
                    bounds.x += matrix.tx;
                    bounds.y += matrix.ty;
                }
                else {
                    matrix.$transformBounds(bounds);
                }
            };
            /**
             * @private
             */
            p.getAnchorMatrix = function () {
                var matrix = this.$getMatrix();
                var offsetX = this.anchorOffsetX;
                var offsetY = this.anchorOffsetY;
                if (offsetX != 0 || offsetY != 0) {
                    var tempM = egret.$TempMatrix;
                    matrix.$preMultiplyInto(tempM.setTo(1, 0, 0, 1, -offsetX, -offsetY), tempM);
                    return tempM;
                }
                return matrix;
            };
            return UIComponentImpl;
        }(egret.DisplayObject));
        sys.UIComponentImpl = UIComponentImpl;
        egret.registerClass(UIComponentImpl,'eui.sys.UIComponentImpl',["eui.UIComponent"]);
        /**
         * ?????????????????????????????????????????????
         */
        function isEmptyFunction(prototype, key) {
            if (typeof prototype[key] != "function") {
                return false;
            }
            var body = prototype[key].toString();
            var index = body.indexOf("{");
            var lastIndex = body.lastIndexOf("}");
            body = body.substring(index + 1, lastIndex);
            return body.trim() == "";
        }
        /**
         * @private
         * ??????????????????????????????????????????????????????
         * @param target ?????????
         * @param template ?????????
         */
        function mixin(target, template) {
            for (var property in template) {
                if (property != "prototype" && template.hasOwnProperty(property)) {
                    target[property] = template[property];
                }
            }
            var prototype = target.prototype;
            var protoBase = template.prototype;
            var keys = Object.keys(protoBase);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var key = keys[i];
                if (key == "__meta__") {
                    continue;
                }
                if (!prototype.hasOwnProperty(key) || isEmptyFunction(prototype, key)) {
                    var value = Object.getOwnPropertyDescriptor(protoBase, key);
                    Object.defineProperty(prototype, key, value);
                }
            }
        }
        sys.mixin = mixin;
        /**
         * @private
         * ??????????????????UIComponent????????????
         * 1.??????????????????????????????????????????this.initializeUIValues();
         * 2.??????UIComponent???????????????????????????(??????????????????protected??????)?????????????????????????????????????????????????????????????????????????????????
         * 3.?????????????????????????????????sys.implementUIComponent()???????????????????????????
         * 4.??????????????????UIComponent??????????????????????????????UIComponentImpl.prototype["?????????"].call(this);
         * @param descendant ????????????UIComponent??????
         * @param base ??????????????????????????????
         */
        function implementUIComponent(descendant, base, isContainer) {
            mixin(descendant, UIComponentImpl);
            var prototype = descendant.prototype;
            prototype.$super = base.prototype;
            eui.registerProperty(descendant, "left", "Percentage");
            eui.registerProperty(descendant, "right", "Percentage");
            eui.registerProperty(descendant, "top", "Percentage");
            eui.registerProperty(descendant, "bottom", "Percentage");
            eui.registerProperty(descendant, "horizontalCenter", "Percentage");
            eui.registerProperty(descendant, "verticalCenter", "Percentage");
            if (isContainer) {
                prototype.$childAdded = function (child, index) {
                    this.invalidateSize();
                    this.invalidateDisplayList();
                };
                prototype.$childRemoved = function (child, index) {
                    this.invalidateSize();
                    this.invalidateDisplayList();
                };
            }
            if (DEBUG) {
                egret.$markReadOnly(descendant, "explicitWidth");
                egret.$markReadOnly(descendant, "explicitHeight");
                Object.defineProperty(prototype, "preferredWidth", {
                    get: function () {
                        var bounds = egret.$TempRectangle;
                        this.getPreferredBounds(bounds);
                        return bounds.width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "preferredHeight", {
                    get: function () {
                        var bounds = egret.$TempRectangle;
                        this.getPreferredBounds(bounds);
                        return bounds.height;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "preferredX", {
                    get: function () {
                        var bounds = egret.$TempRectangle;
                        this.getPreferredBounds(bounds);
                        return bounds.x;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "preferredY", {
                    get: function () {
                        var bounds = egret.$TempRectangle;
                        this.getPreferredBounds(bounds);
                        return bounds.y;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "layoutBoundsX", {
                    get: function () {
                        var bounds = egret.$TempRectangle;
                        this.getLayoutBounds(bounds);
                        return bounds.x;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "layoutBoundsY", {
                    get: function () {
                        var bounds = egret.$TempRectangle;
                        this.getLayoutBounds(bounds);
                        return bounds.y;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "layoutBoundsWidth", {
                    get: function () {
                        var bounds = egret.$TempRectangle;
                        this.getLayoutBounds(bounds);
                        return bounds.width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "layoutBoundsHeight", {
                    get: function () {
                        var bounds = egret.$TempRectangle;
                        this.getLayoutBounds(bounds);
                        return bounds.height;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "measuredWidth", {
                    get: function () {
                        return this.$UIComponent[16 /* measuredWidth */];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "measuredHeight", {
                    get: function () {
                        return this.$UIComponent[17 /* measuredHeight */];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "layoutWidthExplicitlySet", {
                    get: function () {
                        return this.$UIComponent[27 /* layoutWidthExplicitlySet */];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "layoutHeightExplicitlySet", {
                    get: function () {
                        return this.$UIComponent[28 /* layoutHeightExplicitlySet */];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "invalidatePropertiesFlag", {
                    get: function () {
                        return this.$UIComponent[24 /* invalidatePropertiesFlag */];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "invalidateSizeFlag", {
                    get: function () {
                        return this.$UIComponent[25 /* invalidateSizeFlag */];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(prototype, "invalidateDisplayListFlag", {
                    get: function () {
                        return this.$UIComponent[26 /* invalidateDisplayListFlag */];
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        }
        sys.implementUIComponent = implementUIComponent;
    })(sys = eui.sys || (eui.sys = {}));
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/// <reference path="../core/UIComponent.ts" />
var eui;
(function (eui) {
    var UIImpl = eui.sys.UIComponentImpl;
    /**
     * @language en_US
     * BitmapLabel is one line or multiline uneditable BitmapText
     * @version Egret 2.5.3
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * BitmapLabel ???????????????????????????????????????????????????
     * @version Egret 2.5.3
     * @version eui 1.0
     * @platform Web,Native
     */
    var BitmapLabel = (function (_super) {
        __extends(BitmapLabel, _super);
        function BitmapLabel(text) {
            _super.call(this);
            this.$createChildrenCalled = false;
            this.$fontChanged = false;
            /**
             * @private
             */
            this._widthConstraint = NaN;
            this.initializeUIValues();
            this.text = text;
        }
        var d = __define,c=BitmapLabel,p=c.prototype;
        /**
         * @private
         *
         */
        p.$invalidateContentBounds = function () {
            _super.prototype.$invalidateContentBounds.call(this);
            this.invalidateSize();
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setWidth = function (value) {
            var result1 = _super.prototype.$setWidth.call(this, value);
            var result2 = UIImpl.prototype.$setWidth.call(this, value);
            return result1 && result2;
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setHeight = function (value) {
            var result1 = _super.prototype.$setHeight.call(this, value);
            var result2 = UIImpl.prototype.$setHeight.call(this, value);
            return result1 && result2;
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setText = function (value) {
            var result = _super.prototype.$setText.call(this, value);
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "text");
            return result;
        };
        p.$setFont = function (value) {
            var values = this.$BitmapText;
            if (this.$font == value) {
                return false;
            }
            this.$font = value;
            if (this.$createChildrenCalled) {
                this.$parseFont();
            }
            else {
                this.$fontChanged = true;
            }
            this.$BitmapText[6 /* fontStringChanged */] = true;
            return true;
        };
        /**
         * ??????source
         */
        p.$parseFont = function () {
            this.$fontChanged = false;
            if (this.$font && typeof this.$font == "string") {
                var adapter = egret.getImplementation("eui.IAssetAdapter");
                if (!adapter) {
                    adapter = new eui.DefaultAssetAdapter();
                }
                adapter.getAsset(this.$font, this.$onFontChanged, this);
            }
            else {
                this.$setFontData(this.$font);
            }
        };
        /**
         * ??????????????????
         */
        p.$onFontChanged = function (bitmapFont, font) {
            if (font !== this.$font) {
                return;
            }
            this.$setFontData(bitmapFont);
        };
        p.$setFontData = function (value) {
            if (value == this.$BitmapText[5 /* font */]) {
                return false;
            }
            this.$BitmapText[5 /* font */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        /**
         * @copy eui.UIComponent#createChildren
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.createChildren = function () {
            if (this.$fontChanged) {
                this.$parseFont();
            }
            this.$createChildrenCalled = true;
        };
        /**
         * @copy eui.UIComponent#childrenCreated
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.childrenCreated = function () {
        };
        /**
         * @copy eui.UIComponent#commitProperties
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitProperties = function () {
        };
        /**
         * @copy eui.UIComponent#measure
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measure = function () {
            var values = this.$UIComponent;
            var textValues = this.$BitmapText;
            var oldWidth = textValues[0 /* textFieldWidth */];
            var availableWidth = NaN;
            if (!isNaN(this._widthConstraint)) {
                availableWidth = this._widthConstraint;
                this._widthConstraint = NaN;
            }
            else if (!isNaN(values[8 /* explicitWidth */])) {
                availableWidth = values[8 /* explicitWidth */];
            }
            else if (values[13 /* maxWidth */] != 100000) {
                availableWidth = values[13 /* maxWidth */];
            }
            _super.prototype.$setWidth.call(this, availableWidth);
            this.setMeasuredSize(this.textWidth, this.textHeight);
            _super.prototype.$setWidth.call(this, oldWidth);
        };
        /**
         * @copy eui.UIComponent#updateDisplayList
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.$setWidth.call(this, unscaledWidth);
            _super.prototype.$setHeight.call(this, unscaledHeight);
        };
        /**
         * @copy eui.UIComponent#invalidateParentLayout
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateParentLayout = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setMeasuredSize = function (width, height) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateSize = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateSize = function (recursive) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateNow = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
            UIImpl.prototype.setLayoutBoundsSize.call(this, layoutWidth, layoutHeight);
            if (isNaN(layoutWidth) || layoutWidth === this._widthConstraint || layoutWidth == 0) {
                return;
            }
            var values = this.$UIComponent;
            if (!isNaN(values[9 /* explicitHeight */])) {
                return;
            }
            if (layoutWidth == values[16 /* measuredWidth */]) {
                return;
            }
            this._widthConstraint = layoutWidth;
            this.invalidateSize();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getLayoutBounds = function (bounds) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getPreferredBounds = function (bounds) {
        };
        return BitmapLabel;
    }(egret.BitmapText));
    eui.BitmapLabel = BitmapLabel;
    egret.registerClass(BitmapLabel,'eui.BitmapLabel',["eui.UIComponent","eui.IDisplayText"]);
    eui.sys.implementUIComponent(BitmapLabel, egret.BitmapText);
    eui.registerBindable(BitmapLabel.prototype, "text");
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/// <reference path="../core/UIComponent.ts" />
/// <reference path="../utils/registerProperty.ts" />
var eui;
(function (eui) {
    /**
     * @language en_US
     * The Component class defines the base class for skinnable components.
     * The skins used by a Component class are typically child classes of
     * the Skin class.<p/>
     *
     * Associate a skin class with a component class by setting the <code>skinName</code> property of the
     * component class.
     * @event egret.Event.COMPLETE Dispatch when <code>skinName</code> property is set the path of external EXML file and the EXML file is resolved.
     *
     * @includeExample  extension/eui/components/ComponentExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Component ?????????????????????????????????????????????Component ?????????????????????????????? Skin ???????????????<p/>
     * ???????????? component ?????? skinName ???????????? skin ?????? component ???????????????
     * @event egret.Event.COMPLETE ?????????skinName?????????exml?????????????????????????????????EXML??????????????????
     *
     * @includeExample  extension/eui/components/ComponentExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var Component = (function (_super) {
        __extends(Component, _super);
        /**
         * Constructor.
         *
         * @language en_US
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * ???????????????
         *
         * @language zh_CN
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function Component() {
            _super.call(this);
            this.initializeUIValues();
            this.$Component = {
                0: null,
                1: null,
                2: "",
                3: true,
                4: false,
                5: false,
                6: true,
                7: true,
                8: null //skin
            };
            //if egret
            this.$touchEnabled = true;
            //endif*/
        }
        var d = __define,c=Component,p=c.prototype;
        d(p, "hostComponentKey"
            /**
             * @language en_US
             * A identifier of host component which can determine only one component names.
             * Usually used for quering a default skin name in theme.
             * @default null
             * @see eui.Theme#getSkinName()
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
             *
             * @default null
             * @see eui.Theme#getSkinName()
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Component[0 /* hostComponentKey */];
            }
            ,function (value) {
                this.$Component[0 /* hostComponentKey */] = value;
            }
        );
        d(p, "skinName"
            /**
             * @language en_US
             * Identifier of skin. Valid values: class definition of skin,
             * class name of skin, instance of skin, EXML or external EXML file path.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????,????????????,????????????,EXML????????????,?????????EXML???????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Component[1 /* skinName */];
            }
            ,function (value) {
                var values = this.$Component;
                values[5 /* skinNameExplicitlySet */] = true;
                if (values[1 /* skinName */] == value)
                    return;
                if (value) {
                    values[1 /* skinName */] = value;
                }
                else {
                    var theme = egret.getImplementation("eui.Theme");
                    if (theme) {
                        var skinName = theme.getSkinName(this);
                        if (skinName) {
                            values[1 /* skinName */] = skinName;
                        }
                    }
                }
                this.$parseSkinName();
            }
        );
        /**
         * @private
         * ??????skinName
         */
        p.$parseSkinName = function () {
            var skinName = this.skinName;
            var skin;
            if (skinName) {
                if (skinName.prototype) {
                    skin = new skinName();
                }
                else if (typeof (skinName) == "string") {
                    var clazz = void 0;
                    var text = skinName.trim();
                    if (text.charAt(0) == "<") {
                        clazz = EXML.parse(text);
                    }
                    else {
                        clazz = egret.getDefinitionByName(skinName);
                        if (!clazz && text.toLowerCase().indexOf(".exml") != -1) {
                            EXML.load(skinName, this.onExmlLoaded, this, true);
                            return;
                        }
                    }
                    if (clazz) {
                        skin = new clazz();
                    }
                }
                else {
                    skin = skinName;
                }
            }
            this.setSkin(skin);
        };
        /**
         * @private
         * @param clazz
         * @param url
         */
        p.onExmlLoaded = function (clazz, url) {
            if (this.skinName != url) {
                return;
            }
            var skin = new clazz();
            this.setSkin(skin);
        };
        d(p, "skin"
            /**
             * @language en_US
             * The instance of the skin class for this component instance.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Component[8 /* skin */];
            }
        );
        /**
         * @language en_US
         * Setter for the skin instance.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setSkin = function (skin) {
            if (skin && !(skin instanceof eui.Skin)) {
                skin = null;
                DEBUG && egret.$error(2202);
            }
            var values = this.$Component;
            var oldSkin = values[8 /* skin */];
            if (oldSkin) {
                var skinParts = oldSkin.skinParts;
                var length_4 = skinParts.length;
                for (var i = 0; i < length_4; i++) {
                    var partName = skinParts[i];
                    if (this[partName]) {
                        this.setSkinPart(partName, null);
                    }
                }
                var children = oldSkin.$elementsContent;
                if (children) {
                    length_4 = children.length;
                    for (var i = 0; i < length_4; i++) {
                        var child = children[i];
                        if (child.$parent == this) {
                            this.removeChild(child);
                        }
                    }
                }
                oldSkin.hostComponent = null;
            }
            values[8 /* skin */] = skin;
            if (skin) {
                var skinParts = skin.skinParts;
                var length_5 = skinParts.length;
                for (var i = 0; i < length_5; i++) {
                    var partName = skinParts[i];
                    var instance = skin[partName];
                    if (instance) {
                        this.setSkinPart(partName, instance);
                    }
                }
                var children = skin.$elementsContent;
                if (children) {
                    for (var i = children.length - 1; i >= 0; i--) {
                        this.addChildAt(children[i], 0);
                    }
                }
                skin.hostComponent = this;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
            this.dispatchEventWith(egret.Event.COMPLETE);
        };
        /**
         * @language en_US
         * Find the skin parts in the skin class and assign them to the properties of the component.
         * You do not call this method directly. This method will be invoked automatically when using a EXML as skin.
         * The ID for a tag in an EXML will be passed in as <code>partName</code>, and the instance of the tag will be
         * passed in as <code>instance</code>.
         * @param partName name of a skin part
         * @param instance instance of a skin part
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????EXML????????????????????????????????????????????????????????????
         * ???????????????EXML??????????????????id???????????????????????????partName????????????id????????????????????????????????????????????????instance????????????????????????
         * @param partName ??????????????????
         * @param instance ??????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setSkinPart = function (partName, instance) {
            var oldInstance = this[partName];
            if (oldInstance) {
                this.partRemoved(partName, oldInstance);
            }
            this[partName] = instance;
            if (instance) {
                this.partAdded(partName, instance);
            }
        };
        /**
         * @language en_US
         * Called when a skin part is added.
         * You do not call this method directly.
         * EUI calls it automatically when it calls the <code>setSkinPart()</code> method.<p/>
         *
         * Override this function to attach behavior to the part, such as add event listener or
         * assign property values cached.
         * @param partName name of a skin part to add.
         * @param instance instance of a skin part to add.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????
         * ?????????????????????????????????
         * EUI ???????????? setSkinPart()?????????????????????????????????<p/>
         *
         * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @param partName ?????????????????????????????????
         * @param instance ?????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.partAdded = function (partName, instance) {
        };
        /**
         * @language en_US
         * Called when an instance of a skin part is being removed.
         * You do not call this method directly.
         * EUI calls it automatically when it calls the <code>setSkinPart()</code> method.<p/>
         *
         * Override this function to clean behavior of the part, such as remove event listener or
         * disconnect the cache reference
         * @param partName name of a skin part to remove.
         * @param instance instance of a skin part to remove.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????
         * ?????????????????????????????????
         * EUI ???????????? setSkinPart()?????????????????????????????????<p/>
         *
         * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @param partName ??????????????????????????????
         * @param instance ??????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.partRemoved = function (partName, instance) {
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setTouchChildren = function (value) {
            value = !!value;
            var values = this.$Component;
            values[6 /* explicitTouchChildren */] = value;
            if (values[3 /* enabled */]) {
                values[6 /* explicitTouchChildren */] = value;
                return _super.prototype.$setTouchChildren.call(this, value);
            }
            else {
                return true;
            }
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setTouchEnabled = function (value) {
            value = !!value;
            var values = this.$Component;
            values[7 /* explicitTouchEnabled */] = value;
            if (values[3 /* enabled */]) {
                return _super.prototype.$setTouchEnabled.call(this, value);
            }
            else {
                return true;
            }
        };
        d(p, "enabled"
            /**
             * @language en_US
             * Whether the component can accept user interaction.
             * After setting the <code>enabled</code> property to <code>false</code>, components will disabled touch event
             * (set <code>touchEnabled</code> and <code>touchChildren</code> to false) and set state of skin to "disabled".
             *
             * @default true
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????
             * ??? enabled ??????????????? false ??????
             * ?????????????????????????????????(??? touchEnabled ??? touchChildren ??????????????? false)???
             * ?????????????????????????????????????????????????????????"disabled",????????????????????????????????????
             *
             * @default true
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Component[3 /* enabled */];
            }
            ,function (value) {
                value = !!value;
                this.$setEnabled(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setEnabled = function (value) {
            var values = this.$Component;
            if (value === values[3 /* enabled */]) {
                return false;
            }
            values[3 /* enabled */] = value;
            if (value) {
                this.$touchEnabled = values[7 /* explicitTouchEnabled */];
                this.$touchChildren = values[6 /* explicitTouchChildren */];
            }
            else {
                this.$touchEnabled = false;
                this.$touchChildren = false;
            }
            this.invalidateState();
            return true;
        };
        d(p, "currentState"
            //========================??????????????????=====================start=======================
            /**
             * @language en_US
             * The current view state of the component. When you use this property to set a component's state,
             * EUI will explicit update state of skin and ignore the return of <code>getCurrentState()</code>.
             *
             * Set to <code>""</code> or <code>null</code> to reset the component back to its base state.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????
             * ???????????????????????????????????????????????????????????????????????? getCurrentState() ?????????????????????
             *
             * ??????????????? "" ??? null ?????????????????????????????????????????????????????????????????????????????? getCurrentState() ????????????????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                var values = this.$Component;
                return values[2 /* explicitState */] ?
                    values[2 /* explicitState */] : this.getCurrentState();
            }
            ,function (value) {
                var values = this.$Component;
                if (value == values[2 /* explicitState */]) {
                    return;
                }
                values[2 /* explicitState */] = value;
                this.invalidateState();
            }
        );
        /**
         * @language en_US
         * Marks the component so that the new state of the skin is set during a later screen update.
         * A subclass of SkinnableComponent must override <code>getCurrentState()</code> to return a value.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????????????? <code>getCurrentState()</code> ?????????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateState = function () {
            var values = this.$Component;
            if (values[4 /* stateIsDirty */])
                return;
            values[4 /* stateIsDirty */] = true;
            this.invalidateProperties();
        };
        /**
         * @language en_US
         * Returns the name of the state to be applied to the skin.<p/>
         * A subclass of SkinnableComponent must override this method to return a value.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????,??????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getCurrentState = function () {
            return "";
        };
        /**
         * @language en_US
         * Create child objects of the component. This is an advanced method that you might override
         * when creating a subclass of Component. This method will be called once it be added to stage.
         * You must invoke <code>super.createChildren()</code> to complete initialization of the parent class
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * ???????????????super.createChildren()?????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.createChildren = function () {
            var values = this.$Component;
            if (!values[1 /* skinName */]) {
                var theme = egret.getImplementation("eui.Theme");
                if (theme) {
                    var skinName = theme.getSkinName(this);
                    if (skinName) {
                        values[1 /* skinName */] = skinName;
                        this.$parseSkinName();
                    }
                }
            }
        };
        /**
         * @language en_US
         * Performs any final processing after child objects are created.
         * This is an advanced method that you might override
         * when creating a subclass of Component.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????? Component ?????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.childrenCreated = function () {
        };
        /**
         * @language en_US
         * Processes the properties set on the component.
         * You can override this method when creating a subclass of Component.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????invalidateProperties()?????????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitProperties = function () {
            eui.sys.UIComponentImpl.prototype["commitProperties"].call(this);
            var values = this.$Component;
            if (values[4 /* stateIsDirty */]) {
                values[4 /* stateIsDirty */] = false;
                if (values[8 /* skin */]) {
                    values[8 /* skin */].currentState = this.currentState;
                }
            }
        };
        /**
         * @language en_US
         * Calculates the default size.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measure = function () {
            eui.sys.measure(this);
            var skin = this.$Component[8 /* skin */];
            if (!skin) {
                return;
            }
            var values = this.$UIComponent;
            if (!isNaN(skin.width)) {
                values[16 /* measuredWidth */] = skin.width;
            }
            else {
                if (values[16 /* measuredWidth */] < skin.minWidth) {
                    values[16 /* measuredWidth */] = skin.minWidth;
                }
                if (values[16 /* measuredWidth */] > skin.maxWidth) {
                    values[16 /* measuredWidth */] = skin.maxWidth;
                }
            }
            if (!isNaN(skin.height)) {
                values[17 /* measuredHeight */] = skin.height;
            }
            else {
                if (values[17 /* measuredHeight */] < skin.minHeight) {
                    values[17 /* measuredHeight */] = skin.minHeight;
                }
                if (values[17 /* measuredHeight */] > skin.maxHeight) {
                    values[17 /* measuredHeight */] = skin.maxHeight;
                }
            }
        };
        /**
         * @language en_US
         * Draws the object and/or sizes and positions its children.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            eui.sys.updateDisplayList(this, unscaledWidth, unscaledHeight);
        };
        /**
         * @language en_US
         * Method to invalidate parent size and display list if
         * this object affects its layout (includeInLayout is true).
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????includeInLayout ??? true??????????????????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateParentLayout = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setMeasuredSize = function (width, height) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateSize = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateSize = function (recursive) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateNow = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getLayoutBounds = function (bounds) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getPreferredBounds = function (bounds) {
        };
        return Component;
    }(egret.DisplayObjectContainer));
    eui.Component = Component;
    egret.registerClass(Component,'eui.Component',["eui.UIComponent"]);
    eui.registerProperty(Component, "skinName", "Class");
    eui.sys.implementUIComponent(Component, egret.DisplayObjectContainer, true);
    if (DEBUG) {
        egret.$markReadOnly(Component, "skin");
    }
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The Button component is a commonly used rectangular button.
     * The Button component looks like it can be pressed.
     * The default skin has a text label and a icon display object.
     *
     * @event egret.TouchEvent.TOUCH_CANCEL canceled the touch
     *
     * @state up Button up state
     * @state down Button down state
     * @state disabled Button disabled state
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/components/ButtonExample.ts
     */
    /**
     * @language zh_CN
     * Button ?????????????????????????????????Button ??????????????????????????????????????????????????????????????????????????????????????????
     *
     * @event egret.TouchEvent.TOUCH_CANCEL ??????????????????
     *
     * @state up ??????????????????
     * @state down ??????????????????
     * @state disabled ??????????????????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/components/ButtonExample.ts
     */
    var Button = (function (_super) {
        __extends(Button, _super);
        /**
         * @language en_US
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function Button() {
            _super.call(this);
            /**
             * @language en_US
             * [SkinPart] A skin part that defines the label of the button.
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * [SkinPart] ???????????????????????????
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.labelDisplay = null;
            /**
             * @private
             */
            this._label = "";
            /**
             * @language en_US
             * [SkinPart] A skin part that defines an optional icon for the button.
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * [SkinPart] ?????????????????????????????????
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.iconDisplay = null;
            /**
             * @private
             */
            this._icon = null;
            /**
             * @private
             * ????????????????????? TouchEvent.TOUCH_BEGIN ????????????????????????????????????
             */
            this.touchCaptured = false;
            this.touchChildren = false;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }
        var d = __define,c=Button,p=c.prototype;
        d(p, "label"
            /**
             * @language en_US
             * Text to appear on the Button control.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._label;
            }
            ,function (value) {
                this._label = value;
                if (this.labelDisplay) {
                    this.labelDisplay.text = value;
                }
            }
        );
        d(p, "icon"
            /**
             * @language en_US
             * Icon to appear on the Button control.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._icon;
            }
            ,function (value) {
                this._icon = value;
                if (this.iconDisplay) {
                    this.iconDisplay.source = value;
                }
            }
        );
        /**
         * @language en_US
         * This method handles the touchCancle events
         * @param  The <code>egret.TouchEvent</code> object.
         * @version Egret 3.0.1
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????
         * @param event ?????? <code>egret.TouchEvent</code> ????????????
         * @version Egret 3.0.1
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onTouchCancle = function (event) {
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.touchCaptured = false;
            this.invalidateState();
        };
        /**
         * @language en_US
         * This method handles the touch events
         * @param  The <code>egret.TouchEvent</code> object.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         * @param event ?????? <code>egret.TouchEvent</code> ????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onTouchBegin = function (event) {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.touchCaptured = true;
            this.invalidateState();
            event.updateAfterEvent();
        };
        /**
         * @private
         * ???????????????????????????
         */
        p.onStageTouchEnd = function (event) {
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            if (this.contains(event.target)) {
                this.buttonReleased();
            }
            this.touchCaptured = false;
            this.invalidateState();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getCurrentState = function () {
            if (!this.enabled)
                return "disabled";
            if (this.touchCaptured)
                return "down";
            return "up";
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.partAdded = function (partName, instance) {
            if (instance === this.labelDisplay) {
                this.labelDisplay.text = this._label;
            }
            else if (instance == this.iconDisplay) {
                this.iconDisplay.source = this._icon;
            }
        };
        /**
         * @language en_US
         * This method is called when handling a <code>egret.TouchEvent.TOUCH_END</code> event
         * when the user touches on the button. It is only called when the button
         * is the target and when <code>touchCaptured</code> is <code>true</code>.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????? <code>egret.TouchEvent.TOUCH_END</code> ?????????????????????????????????
         * ????????????????????????????????? <code>touchCaptured</code> ??? <code>true</code> ??????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.buttonReleased = function () {
        };
        return Button;
    }(eui.Component));
    eui.Button = Button;
    egret.registerClass(Button,'eui.Button');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The ToggleButton component defines a toggle button.
     * Clicking the button toggles it between the up and an down states.
     * If you click the button while it is in the up state,
     * it toggles to the down state. You must click the button again
     * to toggle it back to the up state.
     * <p>You can get or set this state programmatically
     * by using the <code>selected</code> property.</p>
     *
     * @event egret.Event.CHANGE Dispatched when the <code>selected</code> property
     * changes for the ToggleButton control.
     * This event is dispatched only when the
     * user interacts with the control by touching.
     *
     * @state up Button up state
     * @state down Button down state
     * @state disabled Button disabled state
     * @state upAndSelected Up state when the button is selected
     * @state downAndSelected Down state when the button is selected
     * @state disabledAndSelected Disabled state when the button is selected
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ToggleButtonExample.ts
     */
    /**
     * @language zh_CN
     * ToggleButton ????????????????????????????????????????????????????????????????????????????????????????????????
     * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * <p>???????????? <code>selected</code> ????????????????????????????????????????????????</p>
     *
     * @event egret.Event.CHANGE ToggleButtonBase ????????? <code>selected</code> ????????????????????????
     * ??????????????????????????????????????????????????????????????????
     *
     * @state up ??????????????????
     * @state down ??????????????????
     * @state disabled ??????????????????
     * @state upAndSelected ??????????????????????????????
     * @state downAndSelected ??????????????????????????????
     * @state disabledAndSelected ??????????????????????????????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ToggleButtonExample.ts
     */
    var ToggleButton = (function (_super) {
        __extends(ToggleButton, _super);
        function ToggleButton() {
            _super.apply(this, arguments);
            /**
             * @private
             */
            this.$selected = false;
            /**
             * @private
             * ????????????????????????????????????????????????,??????true????????????????????????
             */
            this.$autoSelected = true;
        }
        var d = __define,c=ToggleButton,p=c.prototype;
        d(p, "selected"
            /**
             * @language en_US
             * Contains <code>true</code> if the button is in the down state,
             * and <code>false</code> if it is in the up state.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????? <code>true</code>???????????????????????????????????? <code>false</code>???
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$selected;
            }
            ,function (value) {
                this.$setSelected(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setSelected = function (value) {
            value = !!value;
            if (value === this.$selected)
                return false;
            this.$selected = value;
            this.invalidateState();
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "selected");
            return true;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getCurrentState = function () {
            var state = _super.prototype.getCurrentState.call(this);
            if (!this.$selected) {
                return state;
            }
            else {
                var selectedState = state + "AndSelected";
                var skin = this.skin;
                if (skin && skin.hasState(selectedState)) {
                    return selectedState;
                }
                return state == "disabled" ? "disabled" : "down";
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.buttonReleased = function () {
            if (!this.$autoSelected)
                return;
            this.selected = !this.$selected;
            this.dispatchEventWith(egret.Event.CHANGE);
        };
        return ToggleButton;
    }(eui.Button));
    eui.ToggleButton = ToggleButton;
    egret.registerClass(ToggleButton,'eui.ToggleButton');
    eui.registerBindable(ToggleButton.prototype, "selected");
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The CheckBox component consists of an optional label and a small box
     * that can contain a check mark or not.<p/>
     *
     * When a user clicks a CheckBox component or its associated text,
     * the CheckBox component sets its <code>selected</code> property
     * to <code>true</code> for checked, and to <code>false</code> for unchecked.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/components/CheckboxExample.ts
     */
    /**
     * @language zh_CN
     * CheckBox ???????????????????????????????????????????????????????????????????????????/????????????????????????<p/>
     * ???????????? CheckBox ??????????????????????????????CheckBox ??????????????? selected ??????????????? true????????????????????? false???????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/components/CheckboxExample.ts
     */
    var CheckBox = (function (_super) {
        __extends(CheckBox, _super);
        /**
         * @language en_US
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????CheckBox
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function CheckBox() {
            _super.call(this);
        }
        var d = __define,c=CheckBox,p=c.prototype;
        return CheckBox;
    }(eui.ToggleButton));
    eui.CheckBox = CheckBox;
    egret.registerClass(CheckBox,'eui.CheckBox');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The State class defines a view state, a particular view of a component.
     *
     * For example, a product thumbnail could have two view states;
     * a base view state with minimal information, and a rich view state with
     * additional information.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * State ???????????????????????????????????????????????????
     *
     * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var State = (function (_super) {
        __extends(State, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @param name The name of the view state.
         * State names must be unique for a given component.
         * This property must be set.
         * @param overrides The overrides for this view state, as an Array of objects that implement
         * the IOverride interface. These overrides are applied in order when the
         * state is entered, and removed in reverse order when the state is exited.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????State?????????
         *
         * @param name ??????????????????????????????????????????????????????????????????????????????????????????
         * @param overrides ?????????????????????????????????????????? IOverride ???????????????????????????
         * ?????????????????????????????????????????????????????????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function State(name, overrides) {
            if (overrides === void 0) { overrides = []; }
            _super.call(this);
            this.name = name;
            this.overrides = overrides;
        }
        var d = __define,c=State,p=c.prototype;
        /**
         * @language en_US
         * Initialize this state and all of its overrides.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.initialize = function (host, stage) {
            var overrides = this.overrides;
            var length = overrides.length;
            for (var i = 0; i < length; i++) {
                var addItems = overrides[i];
                if (addItems instanceof eui.AddItems) {
                    var target = host[addItems.target];
                    if (target && target instanceof eui.Image && !target.$parent) {
                        stage.addChild(target);
                        stage.removeChild(target);
                    }
                }
            }
        };
        return State;
    }(egret.HashObject));
    eui.State = State;
    egret.registerClass(State,'eui.State');
})(eui || (eui = {}));
var eui;
(function (eui) {
    var sys;
    (function (sys) {
        /**
         * @private
         */
        var StateClient = (function () {
            function StateClient() {
            }
            var d = __define,c=StateClient,p=c.prototype;
            d(p, "states"
                /**
                 * @private
                 * ????????????????????????????????????
                 */
                ,function () {
                    return this.$stateValues.states;
                }
                ,function (value) {
                    if (!value)
                        value = [];
                    var values = this.$stateValues;
                    values.states = value;
                    var statesMap = {};
                    var length = value.length;
                    for (var i = 0; i < length; i++) {
                        var state = value[i];
                        statesMap[state.name] = state;
                    }
                    values.statesMap = statesMap;
                    if (values.parent) {
                        this.commitCurrentState();
                    }
                }
            );
            d(p, "currentState"
                /**
                 * @private
                 * ????????????????????????????????????????????? "" ??? null ???????????????????????????????????????
                 */
                ,function () {
                    return this.$stateValues.currentState;
                }
                ,function (value) {
                    var values = this.$stateValues;
                    values.explicitState = value;
                    values.currentState = value;
                    this.commitCurrentState();
                }
            );
            /**
             * @private
             * ????????????????????????????????????????????????????????????????????????????????????????????????????????????
             */
            p.commitCurrentState = function () {
                var values = this.$stateValues;
                if (!values.parent) {
                    return;
                }
                var destination = values.statesMap[values.currentState];
                if (!destination) {
                    if (values.states.length > 0) {
                        values.currentState = values.states[0].name;
                    }
                    else {
                        return;
                    }
                }
                if (values.oldState == values.currentState) {
                    return;
                }
                var parent = values.parent;
                var state = values.statesMap[values.oldState];
                if (state) {
                    var overrides = state.overrides;
                    var length_6 = overrides.length;
                    for (var i = 0; i < length_6; i++) {
                        overrides[i].remove(this, parent);
                    }
                }
                values.oldState = values.currentState;
                state = values.statesMap[values.currentState];
                if (state) {
                    var overrides = state.overrides;
                    var length_7 = overrides.length;
                    for (var i = 0; i < length_7; i++) {
                        overrides[i].apply(this, parent);
                    }
                }
            };
            /**
             * @private
             * ?????????????????????????????????????????????
             * @param stateName ??????????????????????????????
             */
            p.hasState = function (stateName) {
                return !!this.$stateValues.statesMap[stateName];
            };
            /**
             * @private
             * ???????????????????????????
             */
            p.initializeStates = function (stage) {
                this.$stateValues.intialized = true;
                var states = this.states;
                var length = states.length;
                for (var i = 0; i < length; i++) {
                    states[i].initialize(this, stage);
                }
            };
            return StateClient;
        }());
        sys.StateClient = StateClient;
        egret.registerClass(StateClient,'eui.sys.StateClient');
        /**
         * @private
         */
        var StateValues = (function () {
            function StateValues() {
                /**
                 * @private
                 */
                this.intialized = false;
                /**
                 * @private
                 */
                this.statesMap = {};
                /**
                 * @private
                 */
                this.states = [];
                /**
                 * @private
                 */
                this.oldState = null;
                /**
                 * @private
                 */
                this.explicitState = null;
                /**
                 * @private
                 */
                this.currentState = null;
                /**
                 * @private
                 */
                this.parent = null;
                /**
                 * @private
                 */
                this.stateIsDirty = false;
            }
            var d = __define,c=StateValues,p=c.prototype;
            return StateValues;
        }());
        sys.StateValues = StateValues;
        egret.registerClass(StateValues,'eui.sys.StateValues');
    })(sys = eui.sys || (eui.sys = {}));
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/// <reference path="../states/State.ts" />
/// <reference path="../core/UIComponent.ts" />
/// <reference path="../utils/registerProperty.ts" />
var eui;
(function (eui) {
    /**
     * @language en_US
     * The Group class is defines the base class for layout component.
     * If the contents of the sub items are too large to scroll to show, you can wrap a Scroller component outside the
     * group (Give the instance of Group to <code>viewport</code> property of Scroller component).
     * The scroller component can adds a scrolling touch operation for the Group.
     *
     * @see http://edn.egret.com/cn/article/index/id/608 Simple container
     * @defaultProperty elementsContent
     * @includeExample  extension/eui/components/GroupExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Group ??????????????????????????????????????????????????????????????????????????????????????????????????? Group ?????????????????? Scroller ??????
     * (??? Group ??????????????? Scroller ????????? viewport ??????)???Scroller ?????? Group ???????????????????????????????????????????????????????????????????????????
     *
     * @see http://edn.egret.com/cn/article/index/id/608 ????????????
     * @defaultProperty elementsContent
     * @includeExample  extension/eui/components/GroupExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var Group = (function (_super) {
        __extends(Group, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function Group() {
            _super.call(this);
            /**
             * @private
             */
            this.$layout = null;
            /**
             * @private
             */
            this.$stateValues = new eui.sys.StateValues();
            this.initializeUIValues();
            this.$Group = {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: false,
                5: false,
            };
            this.$stateValues.parent = this;
        }
        var d = __define,c=Group,p=c.prototype;
        d(p, "elementsContent",undefined
            /**
             * @language en_US
             * This property is Usually invoked in resolving an EXML for adding multiple children quickly.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????? EXML ?????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function (value) {
                if (value) {
                    var length_8 = value.length;
                    for (var i = 0; i < length_8; i++) {
                        this.addChild(value[i]);
                    }
                }
            }
        );
        d(p, "layout"
            /**
             * @language en_US
             * The layout object for this container.
             * This object is responsible for the measurement and layout of
             * the UIcomponent in the container.
             *
             * @default eui.BasicLayout
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????
             *
             * s@default eui.BasicLayout
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$layout;
            }
            ,function (value) {
                this.$setLayout(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setLayout = function (value) {
            if (this.$layout == value)
                return false;
            if (this.$layout) {
                this.$layout.target = null;
            }
            this.$layout = value;
            if (value) {
                value.target = this;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
            return true;
        };
        d(p, "contentWidth"
            /**
             * @copy eui.IViewport#contentWidth
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Group[0 /* contentWidth */];
            }
        );
        d(p, "contentHeight"
            /**
             * @copy eui.IViewport#contentHeight
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Group[1 /* contentHeight */];
            }
        );
        /**
         * @language en_US
         *
         * Sets the <code>contentWidth</code> and <code>contentHeight</code>
         * properties.
         *
         * This method is intended for layout class developers who should
         * call it from <code>updateDisplayList()</code> methods.
         *
         * @param width The new value of <code>contentWidth</code>.
         * @param height The new value of <code>contentHeight</code>.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *
         * ?????? <code>contentWidth</code> ??? <code>contentHeight</code> ?????????
         * ???????????????????????????????????????????????????????????? <code>updateDisplayList()</code> ??????????????????????????????
         *
         * @param width <code>contentWidth</code> ????????????
         * @param height <code>contentHeight</code> ????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setContentSize = function (width, height) {
            width = Math.ceil(+width || 0);
            height = Math.ceil(+height || 0);
            var values = this.$Group;
            var wChange = (values[0 /* contentWidth */] !== width);
            var hChange = (values[1 /* contentHeight */] !== height);
            if (!wChange && !hChange) {
                return;
            }
            values[0 /* contentWidth */] = width;
            values[1 /* contentHeight */] = height;
            if (wChange) {
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "contentWidth");
            }
            if (hChange) {
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "contentHeight");
            }
        };
        d(p, "scrollEnabled"
            /**
             * @copy eui.IViewport#scrollEnabled
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Group[4 /* scrollEnabled */];
            }
            ,function (value) {
                value = !!value;
                var values = this.$Group;
                if (value === values[4 /* scrollEnabled */])
                    return;
                values[4 /* scrollEnabled */] = value;
                this.updateScrollRect();
            }
        );
        d(p, "scrollH"
            /**
             * @copy eui.IViewport#scrollH
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Group[2 /* scrollH */];
            }
            ,function (value) {
                value = +value || 0;
                var values = this.$Group;
                if (value === values[2 /* scrollH */])
                    return;
                values[2 /* scrollH */] = value;
                if (this.updateScrollRect() && this.$layout) {
                    this.$layout.scrollPositionChanged();
                }
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "scrollH");
            }
        );
        d(p, "scrollV"
            /**
             * @copy eui.IViewport#scrollV
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Group[3 /* scrollV */];
            }
            ,function (value) {
                value = +value || 0;
                var values = this.$Group;
                if (value == values[3 /* scrollV */])
                    return;
                values[3 /* scrollV */] = value;
                if (this.updateScrollRect() && this.$layout) {
                    this.$layout.scrollPositionChanged();
                }
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "scrollV");
            }
        );
        /**
         * @private
         *
         * @returns
         */
        p.updateScrollRect = function () {
            var values = this.$Group;
            var hasClip = values[4 /* scrollEnabled */];
            if (hasClip) {
                var uiValues = this.$UIComponent;
                this.scrollRect = egret.$TempRectangle.setTo(values[2 /* scrollH */], values[3 /* scrollV */], uiValues[10 /* width */], uiValues[11 /* height */]);
            }
            else if (this.$scrollRect) {
                this.scrollRect = null;
            }
            return hasClip;
        };
        d(p, "numElements"
            /**
             * @language en_US
             * The number of layout element in this container.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$children.length;
            }
        );
        /**
         * @language en_US
         * Returns the layout element at the specified index.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getElementAt = function (index) {
            return this.$children[index];
        };
        p.getVirtualElementAt = function (index) {
            return this.getElementAt(index);
        };
        /**
         * @language en_US
         * Set the index range of the sub Visual element in container which support virtual layout.
         * This method is invalid in container which do not support virtual layout.
         * This method is usually invoked before layout. Override this method to release the invisible elements.
         *
         * @param startIndex the start index of sub visual elements???include???
         * @param endIndex the end index of sub visual elements???include???
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         *
         * @param startIndex ????????????????????????????????????
         * @param endIndex ????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setVirtualElementIndicesInView = function (startIndex, endIndex) {
        };
        d(p, "touchThrough"
            /**
             * @language en_US
             * When <code>true</code>, this property
             * ensures that the entire bounds of the Group respond to
             * touch events such as begin.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????true???????????????????????????????????????????????????????????????????????? false???
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Group[5 /* touchThrough */];
            }
            ,function (value) {
                this.$Group[5 /* touchThrough */] = !!value;
            }
        );
        /**
         * @private
         */
        p.$hitTest = function (stageX, stageY) {
            var target = _super.prototype.$hitTest.call(this, stageX, stageY);
            if (target || this.$Group[5 /* touchThrough */]) {
                return target;
            }
            if (!this.$visible || !this.touchEnabled) {
                return null;
            }
            var point = this.globalToLocal(stageX, stageY, egret.$TempPoint);
            var values = this.$UIComponent;
            var bounds = egret.$TempRectangle.setTo(0, 0, values[10 /* width */], values[11 /* height */]);
            var scrollRect = this.$scrollRect;
            if (scrollRect) {
                bounds.x = scrollRect.x;
                bounds.y = scrollRect.y;
            }
            if (bounds.contains(point.x, point.y)) {
                return this;
            }
            return null;
        };
        /**
         * @copy eui.Component#invalidateState()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateState = function () {
            var values = this.$stateValues;
            if (values.stateIsDirty) {
                return;
            }
            values.stateIsDirty = true;
            this.invalidateProperties();
        };
        /**
         * @copy eui.Component#getCurrentState()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getCurrentState = function () {
            return "";
        };
        /**
         * @copy eui.Component#createChildren()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.createChildren = function () {
            if (!this.$layout) {
                this.$setLayout(new eui.BasicLayout());
            }
            this.initializeStates(this.$stage);
        };
        /**
         * @copy eui.Component#childrenCreated()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.childrenCreated = function () {
        };
        /**
         * @copy eui.Component#commitProperties()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitProperties = function () {
            eui.sys.UIComponentImpl.prototype["commitProperties"].call(this);
            var values = this.$stateValues;
            if (values.stateIsDirty) {
                values.stateIsDirty = false;
                if (!values.explicitState) {
                    values.currentState = this.getCurrentState();
                    this.commitCurrentState();
                }
            }
        };
        /**
         * @copy eui.Component#measure()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measure = function () {
            if (!this.$layout) {
                this.setMeasuredSize(0, 0);
                return;
            }
            this.$layout.measure();
        };
        /**
         * @copy eui.Component#updateDisplayList()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            if (this.$layout) {
                this.$layout.updateDisplayList(unscaledWidth, unscaledHeight);
            }
            this.updateScrollRect();
        };
        /**
         * @copy eui.Component#invalidateParentLayout()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateParentLayout = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setMeasuredSize = function (width, height) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateSize = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateSize = function (recursive) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateNow = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getLayoutBounds = function (bounds) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getPreferredBounds = function (bounds) {
        };
        return Group;
    }(egret.DisplayObjectContainer));
    eui.Group = Group;
    egret.registerClass(Group,'eui.Group',["eui.IViewport","eui.UIComponent"]);
    eui.sys.implementUIComponent(Group, egret.DisplayObjectContainer, true);
    eui.sys.mixin(Group, eui.sys.StateClient);
    eui.registerProperty(Group, "elementsContent", "Array", true);
    eui.registerProperty(Group, "states", "State[]");
    if (DEBUG) {
        egret.$markReadOnly(Group, "contentWidth");
        egret.$markReadOnly(Group, "contentHeight");
        egret.$markReadOnly(Group, "numElements");
    }
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The DataGroup class is the base container class for data items.
     * The DataGroup class converts data items to visual elements for display.
     * While this container can hold visual elements, it is often used only
     * to hold data items as children.
     *
     * @see eui.Group
     * @see http://edn.egret.com/cn/article/index/id/527 Data container
     * @see http://edn.egret.com/cn/article/index/id/528 Array collection
     * @defaultProperty dataProvider
     * @includeExample  extension/eui/components/DataGroupExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * DataGroup ?????????????????????????????????????????????????????????
     * ???????????????????????????????????????????????????????????????????????????????????????????????????
     *
     * @see eui.Group
     * @see http://edn.egret.com/cn/article/index/id/527 ????????????
     * @see http://edn.egret.com/cn/article/index/id/528 ????????????
     * @defaultProperty dataProvider
     * @includeExample  extension/eui/components/DataGroupExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var DataGroup = (function (_super) {
        __extends(DataGroup, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function DataGroup() {
            _super.call(this);
            /**
             * @private
             */
            this.$dataProviderChanged = false;
            /**
             * @private
             */
            this.$dataProvider = null;
            /**
             * @private
             * ????????????????????????????????????
             */
            this.$indexToRenderer = [];
            this.$DataGroup = {
                0: true,
                1: false,
                2: {},
                3: {},
                4: false,
                5: false,
                6: null,
                7: null,
                8: false,
                9: null,
                10: false,
                11: false,
                12: null,
                13: null,
                14: false,
            };
        }
        var d = __define,c=DataGroup,p=c.prototype;
        d(p, "useVirtualLayout"
            /**
             * @copy eui.LayoutBase#useVirtualLayout
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$layout ? this.$layout.$useVirtualLayout :
                    this.$DataGroup[0 /* useVirtualLayout */];
            }
            ,function (value) {
                value = !!value;
                var values = this.$DataGroup;
                if (value === values[0 /* useVirtualLayout */])
                    return;
                values[0 /* useVirtualLayout */] = value;
                if (this.$layout)
                    this.$layout.useVirtualLayout = value;
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setLayout = function (value) {
            if (value == this.$layout)
                return false;
            if (this.$layout) {
                this.$layout.setTypicalSize(0, 0);
                this.$layout.removeEventListener("useVirtualLayoutChanged", this.onUseVirtualLayoutChanged, this);
            }
            if (this.$layout && value && (this.$layout.$useVirtualLayout != value.$useVirtualLayout))
                this.onUseVirtualLayoutChanged();
            var result = _super.prototype.$setLayout.call(this, value);
            if (value) {
                var rect = this.$DataGroup[9 /* typicalLayoutRect */];
                if (rect) {
                    value.setTypicalSize(rect.width, rect.height);
                }
                value.useVirtualLayout = this.$DataGroup[0 /* useVirtualLayout */];
                value.addEventListener("useVirtualLayoutChanged", this.onUseVirtualLayoutChanged, this);
            }
            return result;
        };
        /**
         * @private
         * ????????????????????????????????????
         */
        p.onUseVirtualLayoutChanged = function (event) {
            var values = this.$DataGroup;
            values[1 /* useVirtualLayoutChanged */] = true;
            values[10 /* cleanFreeRenderer */] = true;
            this.removeDataProviderListener();
            this.invalidateProperties();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setVirtualElementIndicesInView = function (startIndex, endIndex) {
            if (!this.$layout || !this.$layout.$useVirtualLayout) {
                return;
            }
            var indexToRenderer = this.$indexToRenderer;
            var keys = Object.keys(indexToRenderer);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var index = +keys[i];
                if (index < startIndex || index > endIndex) {
                    this.freeRendererByIndex(index);
                }
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getElementAt = function (index) {
            return this.$indexToRenderer[index];
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.5.2
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getVirtualElementAt = function (index) {
            index = +index | 0;
            if (index < 0 || index >= this.$dataProvider.length)
                return null;
            var renderer = this.$indexToRenderer[index];
            if (!renderer) {
                var item = this.$dataProvider.getItemAt(index);
                renderer = this.createVirtualRenderer(item);
                this.$indexToRenderer[index] = renderer;
                this.updateRenderer(renderer, index, item);
                var values = this.$DataGroup;
                if (values[4 /* createNewRendererFlag */]) {
                    renderer.validateNow();
                    values[4 /* createNewRendererFlag */] = false;
                    this.rendererAdded(renderer, index, item);
                }
            }
            return renderer;
        };
        /**
         * @private
         * ????????????????????????????????????
         */
        p.freeRendererByIndex = function (index) {
            var renderer = this.$indexToRenderer[index];
            if (renderer) {
                delete this.$indexToRenderer[index];
                this.doFreeRenderer(renderer);
            }
        };
        /**
         * @private
         *
         * @param renderer
         */
        p.doFreeRenderer = function (renderer) {
            var values = this.$DataGroup;
            var rendererClass = values[2 /* rendererToClassMap */][renderer.$hashCode];
            var hashCode = rendererClass.$hashCode;
            if (!values[3 /* freeRenderers */][hashCode]) {
                values[3 /* freeRenderers */][hashCode] = [];
            }
            values[3 /* freeRenderers */][hashCode].push(renderer);
            renderer.visible = false;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateSize = function () {
            if (!this.$DataGroup[4 /* createNewRendererFlag */]) {
                _super.prototype.invalidateSize.call(this);
            }
        };
        /**
         * @private
         * ??????????????????????????????????????????
         */
        p.createVirtualRenderer = function (item) {
            var renderer;
            var rendererClass = this.itemToRendererClass(item);
            var hashCode = rendererClass.$hashCode;
            var values = this.$DataGroup;
            var freeRenderers = values[3 /* freeRenderers */];
            if (freeRenderers[hashCode] && freeRenderers[hashCode].length > 0) {
                renderer = freeRenderers[hashCode].pop();
                renderer.visible = true;
                this.invalidateDisplayList();
                return renderer;
            }
            values[4 /* createNewRendererFlag */] = true;
            return this.createOneRenderer(rendererClass);
        };
        /**
         * @private
         * ??????rendererClass????????????Renderer,????????????????????????
         */
        p.createOneRenderer = function (rendererClass) {
            var renderer = (new rendererClass());
            var values = this.$DataGroup;
            values[2 /* rendererToClassMap */][renderer.$hashCode] = rendererClass;
            if (!egret.is(renderer, "eui.IItemRenderer")) {
                return null;
            }
            if (values[13 /* itemRendererSkinName */]) {
                this.setItemRenderSkinName(renderer, values[13 /* itemRendererSkinName */]);
            }
            this.addChild(renderer);
            return renderer;
        };
        /**
         * @private
         * ?????????????????????????????????
         */
        p.setItemRenderSkinName = function (renderer, skinName) {
            if (renderer && renderer instanceof eui.Component) {
                var comp = renderer;
                if (!comp.$Component[5 /* skinNameExplicitlySet */]) {
                    comp.skinName = skinName;
                    comp.$Component[5 /* skinNameExplicitlySet */] = false;
                }
            }
        };
        d(p, "dataProvider"
            /**
             * @language en_US
             * The data provider for this DataGroup.
             * It must be an ICollection, such as ArrayCollection
             *
             * @see eui.ICollection
             * @see eui.ArrayCollection
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????ICollection?????????????????????????????? ArrayCollection
             *
             * @see eui.ICollection
             * @see eui.ArrayCollection
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$dataProvider;
            }
            ,function (value) {
                this.$setDataProvider(value);
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setDataProvider = function (value) {
            if (this.$dataProvider == value)
                return false;
            this.removeDataProviderListener();
            this.$dataProvider = value;
            this.$dataProviderChanged = true;
            this.$DataGroup[10 /* cleanFreeRenderer */] = true;
            this.invalidateProperties();
            this.invalidateSize();
            this.invalidateDisplayList();
            return true;
        };
        /**
         * @private
         * ?????????????????????
         */
        p.removeDataProviderListener = function () {
            if (this.$dataProvider)
                this.$dataProvider.removeEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
        };
        /**
         * @language en_US
         * Called when contents within the dataProvider changes.  We will catch certain
         * events and update our children based on that.
         *
         * @param event ??????<code>eui.CollectionEvent</code>????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????
         *
         * @param event ??????<code>eui.CollectionEvent</code>????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onCollectionChange = function (event) {
            switch (event.kind) {
                case eui.CollectionEventKind.ADD:
                    this.itemAddedHandler(event.items, event.location);
                    break;
                case eui.CollectionEventKind.REMOVE:
                    this.itemRemovedHandler(event.items, event.location);
                    break;
                case eui.CollectionEventKind.UPDATE:
                case eui.CollectionEventKind.REPLACE:
                    this.itemUpdatedHandler(event.items[0], event.location);
                    break;
                case eui.CollectionEventKind.RESET:
                case eui.CollectionEventKind.REFRESH:
                    if (this.$layout && this.$layout.$useVirtualLayout) {
                        var indexToRenderer = this.$indexToRenderer;
                        var keys = Object.keys(indexToRenderer);
                        var length_9 = keys.length;
                        for (var i = length_9 - 1; i >= 0; i--) {
                            var index = +keys[i];
                            this.freeRendererByIndex(index);
                        }
                    }
                    this.$dataProviderChanged = true;
                    this.invalidateProperties();
                    break;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
        };
        /**
         * @private
         * ?????????????????????????????????
         */
        p.itemAddedHandler = function (items, index) {
            var length = items.length;
            for (var i = 0; i < length; i++) {
                this.itemAdded(items[i], index + i);
            }
            this.resetRenderersIndices();
        };
        /**
         * @private
         * ?????????????????????????????????
         */
        p.itemRemovedHandler = function (items, location) {
            var length = items.length;
            for (var i = length - 1; i >= 0; i--) {
                this.itemRemoved(items[i], location + i);
            }
            this.resetRenderersIndices();
        };
        /**
         * @language en_US
         * Adds the item for the specified dataProvider item to this DataGroup.
         *
         * This method is called as needed by the DataGroup implementation,
         * it should not be called directly.
         *
         * @param item The item that was added, the value of dataProvider[index].
         * @param index The index where the dataProvider item was added.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????
         *
         * ?????????????????????????????????????????????????????????????????????????????????
         *
         * @param item ?????????????????????
         * @param index ????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.itemAdded = function (item, index) {
            if (this.$layout)
                this.$layout.elementAdded(index);
            if (this.$layout && this.$layout.$useVirtualLayout) {
                this.$indexToRenderer.splice(index, 0, null);
                return;
            }
            var renderer = this.createVirtualRenderer(item);
            this.$indexToRenderer.splice(index, 0, renderer);
            if (renderer) {
                this.updateRenderer(renderer, index, item);
                var values = this.$DataGroup;
                if (values[4 /* createNewRendererFlag */]) {
                    values[4 /* createNewRendererFlag */] = false;
                    this.rendererAdded(renderer, index, item);
                }
            }
        };
        /**
         * @language en_US
         * Removes the itemRenderer for the specified dataProvider item from this DataGroup.
         *
         * This method is called as needed by the DataGroup implementation,
         * it should not be called directly.
         *
         * @param item The item that is being removed.
         * @param index The index of the item that is being removed.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         *
         * ?????????????????????????????????????????????????????????????????????????????????
         *
         * @param item ?????????????????????
         * @param index ?????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.itemRemoved = function (item, index) {
            if (this.$layout)
                this.$layout.elementRemoved(index);
            var oldRenderer = this.$indexToRenderer[index];
            if (this.$indexToRenderer.length > index)
                this.$indexToRenderer.splice(index, 1);
            if (oldRenderer) {
                if (this.$layout && this.$layout.$useVirtualLayout) {
                    this.doFreeRenderer(oldRenderer);
                }
                else {
                    this.rendererRemoved(oldRenderer, index, item);
                    this.removeChild(oldRenderer);
                }
            }
        };
        /**
         * @private
         * ??????????????????????????????
         */
        p.resetRenderersIndices = function () {
            var indexToRenderer = this.$indexToRenderer;
            if (indexToRenderer.length == 0)
                return;
            if (this.$layout && this.$layout.$useVirtualLayout) {
                var keys = Object.keys(indexToRenderer);
                var length_10 = keys.length;
                for (var i = 0; i < length_10; i++) {
                    var index = +keys[i];
                    this.resetRendererItemIndex(index);
                }
            }
            else {
                var indexToRendererLength = indexToRenderer.length;
                for (var index = 0; index < indexToRendererLength; index++) {
                    this.resetRendererItemIndex(index);
                }
            }
        };
        /**
         * @private
         * ??????????????????????????????????????????
         */
        p.itemUpdatedHandler = function (item, location) {
            if (this.$DataGroup[11 /* renderersBeingUpdated */]) {
                return; //??????????????????
            }
            var renderer = this.$indexToRenderer[location];
            if (renderer)
                this.updateRenderer(renderer, location, item);
        };
        /**
         * @private
         * ????????????????????????????????????
         */
        p.resetRendererItemIndex = function (index) {
            var renderer = this.$indexToRenderer[index];
            if (renderer)
                renderer.itemIndex = index;
        };
        d(p, "itemRenderer"
            /**
             * @language en_US
             * The item renderer to use for data items.
             * The class must implement the IItemRenderer interface.
             * If defined, the <code>itemRendererFunction</code> property
             * takes precedence over this property.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? IItemRenderer ?????????<br/>
             * rendererClass???????????????itemRendererFunction > itemRenderer > ??????ItemRenerer???
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$DataGroup[6 /* itemRenderer */];
            }
            ,function (value) {
                var values = this.$DataGroup;
                if (values[6 /* itemRenderer */] == value)
                    return;
                values[6 /* itemRenderer */] = value;
                values[5 /* itemRendererChanged */] = true;
                values[8 /* typicalItemChanged */] = true;
                values[10 /* cleanFreeRenderer */] = true;
                this.removeDataProviderListener();
                this.invalidateProperties();
            }
        );
        d(p, "itemRendererSkinName"
            /**
             * @language en_US
             * The skinName property of the itemRenderer.This property will be passed to itemRenderer.skinName as default value,if you
             * did not set it explicitly.<br>
             * Note: This property is invalid if the itemRenderer is not a subclass of the Component class.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????itemRenderer?????????????????????????????????skinName,????????????????????????????????????skinName???
             * ??????:??? itemRenderer ?????? Component ?????????????????????????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$DataGroup[13 /* itemRendererSkinName */];
            }
            ,function (value) {
                var values = this.$DataGroup;
                if (values[13 /* itemRendererSkinName */] == value)
                    return;
                values[13 /* itemRendererSkinName */] = value;
                if (this.$UIComponent[29 /* initialized */]) {
                    values[14 /* itemRendererSkinNameChange */] = true;
                    this.invalidateProperties();
                }
            }
        );
        d(p, "itemRendererFunction"
            /**
             * @language en_US
             * Function that returns an item renderer for a
             * specific item.
             *
             * If defined, this property
             * takes precedence over the <code>itemRenderer</code> property.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????????????????????????????????????????
             * rendererClass???????????????itemRendererFunction > itemRenderer > ??????ItemRenerer???
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$DataGroup[7 /* itemRendererFunction */];
            }
            ,function (value) {
                var values = this.$DataGroup;
                if (values[7 /* itemRendererFunction */] == value)
                    return;
                values[7 /* itemRendererFunction */] = value;
                values[5 /* itemRendererChanged */] = true;
                values[8 /* typicalItemChanged */] = true;
                this.removeDataProviderListener();
                this.invalidateProperties();
            }
        );
        /**
         * @private
         * ??????????????????????????????????????????????????????
         */
        p.itemToRendererClass = function (item) {
            var rendererClass;
            var values = this.$DataGroup;
            if (values[7 /* itemRendererFunction */]) {
                rendererClass = values[7 /* itemRendererFunction */](item);
            }
            if (!rendererClass) {
                rendererClass = values[6 /* itemRenderer */];
            }
            if (!rendererClass) {
                rendererClass = eui.ItemRenderer;
            }
            if (!rendererClass.$hashCode) {
                rendererClass.$hashCode = egret.$hashCount++;
            }
            return rendererClass;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.createChildren = function () {
            if (!this.$layout) {
                var layout = new eui.VerticalLayout();
                layout.gap = 0;
                layout.horizontalAlign = eui.JustifyAlign.CONTENT_JUSTIFY;
                this.$setLayout(layout);
            }
            _super.prototype.createChildren.call(this);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitProperties = function () {
            var values = this.$DataGroup;
            if (values[5 /* itemRendererChanged */] || this.$dataProviderChanged || values[1 /* useVirtualLayoutChanged */]) {
                this.removeAllRenderers();
                if (this.$layout)
                    this.$layout.clearVirtualLayoutCache();
                this.setTypicalLayoutRect(null);
                values[1 /* useVirtualLayoutChanged */] = false;
                values[5 /* itemRendererChanged */] = false;
                if (this.$dataProvider)
                    this.$dataProvider.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
                if (this.$layout && this.$layout.$useVirtualLayout) {
                    this.invalidateSize();
                    this.invalidateDisplayList();
                }
                else {
                    this.createRenderers();
                }
                if (this.$dataProviderChanged) {
                    this.$dataProviderChanged = false;
                    this.scrollV = this.scrollH = 0;
                }
            }
            _super.prototype.commitProperties.call(this);
            if (values[8 /* typicalItemChanged */]) {
                values[8 /* typicalItemChanged */] = false;
                if (this.$dataProvider && this.$dataProvider.length > 0) {
                    values[12 /* typicalItem */] = this.$dataProvider.getItemAt(0);
                    this.measureRendererSize();
                }
            }
            if (values[14 /* itemRendererSkinNameChange */]) {
                values[14 /* itemRendererSkinNameChange */] = false;
                var skinName = values[13 /* itemRendererSkinName */];
                var indexToRenderer = this.$indexToRenderer;
                var keys = Object.keys(indexToRenderer);
                var length_11 = keys.length;
                for (var i = 0; i < length_11; i++) {
                    var index = keys[i];
                    this.setItemRenderSkinName(indexToRenderer[index], skinName);
                }
                var freeRenderers = values[3 /* freeRenderers */];
                keys = Object.keys(freeRenderers);
                length_11 = keys.length;
                for (var i = 0; i < length_11; i++) {
                    var hashCode = keys[i];
                    var list = freeRenderers[hashCode];
                    var length_12 = list.length;
                    for (var i_1 = 0; i_1 < length_12; i_1++) {
                        this.setItemRenderSkinName(list[i_1], skinName);
                    }
                }
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measure = function () {
            if (this.$layout && this.$layout.$useVirtualLayout) {
                this.ensureTypicalLayoutElement();
            }
            _super.prototype.measure.call(this);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            var useVirtualLayout = (this.$layout && this.$layout.$useVirtualLayout);
            if (useVirtualLayout) {
                this.ensureTypicalLayoutElement();
            }
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var values = this.$DataGroup;
            if (useVirtualLayout) {
                //???????????? 0 ?????????????????????????????????????????????????????????????????? typicalLayoutRect
                var rect = values[9 /* typicalLayoutRect */];
                if (rect) {
                    var renderer = this.$indexToRenderer[0];
                    if (renderer) {
                        var bounds = egret.$TempRectangle;
                        renderer.getPreferredBounds(bounds);
                        if (bounds.width != rect.width || bounds.height != rect.height) {
                            values[9 /* typicalLayoutRect */] = null;
                        }
                    }
                }
            }
        };
        /**
         * @private
         * ????????????????????????????????????
         */
        p.ensureTypicalLayoutElement = function () {
            if (this.$DataGroup[9 /* typicalLayoutRect */])
                return;
            if (this.$dataProvider && this.$dataProvider.length > 0) {
                this.$DataGroup[12 /* typicalItem */] = this.$dataProvider.getItemAt(0);
                this.measureRendererSize();
            }
        };
        /**
         * @private
         * ??????????????????????????????
         */
        p.measureRendererSize = function () {
            var values = this.$DataGroup;
            if (!values[12 /* typicalItem */]) {
                this.setTypicalLayoutRect(null);
                return;
            }
            var typicalRenderer = this.createVirtualRenderer(values[12 /* typicalItem */]);
            if (!typicalRenderer) {
                this.setTypicalLayoutRect(null);
                return;
            }
            this.updateRenderer(typicalRenderer, 0, values[12 /* typicalItem */]);
            typicalRenderer.validateNow();
            var bounds = egret.$TempRectangle;
            typicalRenderer.getPreferredBounds(bounds);
            var rect = new egret.Rectangle(0, 0, bounds.width, bounds.height);
            if (this.$layout && this.$layout.$useVirtualLayout) {
                if (values[4 /* createNewRendererFlag */]) {
                    this.rendererAdded(typicalRenderer, 0, values[12 /* typicalItem */]);
                }
                this.doFreeRenderer(typicalRenderer);
            }
            else {
                this.removeChild(typicalRenderer);
            }
            this.setTypicalLayoutRect(rect);
            values[4 /* createNewRendererFlag */] = false;
        };
        /**
         * @private
         * ????????????????????????
         */
        p.setTypicalLayoutRect = function (rect) {
            this.$DataGroup[9 /* typicalLayoutRect */] = rect;
            if (this.$layout) {
                if (rect) {
                    this.$layout.setTypicalSize(rect.width, rect.height);
                }
                else {
                    this.$layout.setTypicalSize(0, 0);
                }
            }
        };
        /**
         * @private
         * ????????????????????????
         */
        p.removeAllRenderers = function () {
            var indexToRenderer = this.$indexToRenderer;
            var keys = Object.keys(indexToRenderer);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var index = keys[i];
                var renderer = indexToRenderer[index];
                if (renderer) {
                    this.rendererRemoved(renderer, renderer.itemIndex, renderer.data);
                    this.removeChild(renderer);
                }
            }
            this.$indexToRenderer = [];
            var values = this.$DataGroup;
            if (values[10 /* cleanFreeRenderer */]) {
                var freeRenderers = values[3 /* freeRenderers */];
                var keys_1 = Object.keys(freeRenderers);
                var length_13 = keys_1.length;
                for (var i = 0; i < length_13; i++) {
                    var hashCode = keys_1[i];
                    var list = freeRenderers[hashCode];
                    var length_14 = list.length;
                    for (var i_2 = 0; i_2 < length_14; i_2++) {
                        var renderer = list[i_2];
                        this.rendererRemoved(renderer, renderer.itemIndex, renderer.data);
                        this.removeChild(renderer);
                    }
                }
                values[3 /* freeRenderers */] = {};
                values[2 /* rendererToClassMap */] = {};
                values[10 /* cleanFreeRenderer */] = false;
            }
        };
        /**
         * @private
         * ??????????????????????????????
         */
        p.createRenderers = function () {
            if (!this.$dataProvider)
                return;
            var index = 0;
            var length = this.$dataProvider.length;
            for (var i = 0; i < length; i++) {
                var item = this.$dataProvider.getItemAt(i);
                var rendererClass = this.itemToRendererClass(item);
                var renderer = this.createOneRenderer(rendererClass);
                if (!renderer)
                    continue;
                this.$indexToRenderer[index] = renderer;
                this.updateRenderer(renderer, index, item);
                this.rendererAdded(renderer, index, item);
                index++;
            }
        };
        /**
         * @language en_US
         * Updates the renderer for reuse.
         * This method first prepares the item
         * renderer for reuse by cleaning out any stale properties
         * as well as updating it with new properties.<p/>
         *
         * The last thing this method should do is set the <code>data</code> property
         * of the item renderer.
         *
         * @param renderer The item renderer.
         * @param itemIndex The index of the data in the data provider.
         * @param data The data object this item renderer is representing.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????<p/>
         *
         * ?????????????????????????????????????????? data ?????????
         *
         * @param renderer ???????????????
         * @param itemIndex ???????????????????????????????????????
         * @param data ?????????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateRenderer = function (renderer, itemIndex, data) {
            var values = this.$DataGroup;
            values[11 /* renderersBeingUpdated */] = true;
            renderer.itemIndex = itemIndex;
            renderer.data = data;
            values[11 /* renderersBeingUpdated */] = false;
            return renderer;
        };
        d(p, "numElements"
            /**
             * @inheritDoc
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (!this.$dataProvider)
                    return 0;
                return this.$dataProvider.length;
            }
        );
        /**
         * @language en_US
         * Adds the itemRenderer for the specified dataProvider item to this DataGroup.
         *
         * This method is called as needed by the DataGroup implementation,
         * it should not be called directly.
         *
         * @param renderer The renderer that was added.
         * @param index The index where the dataProvider item was added.
         * @param item The item that was added, the value of dataProvider[index].
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????.
         *
         * ????????????????????????????????????????????????????????????????????????
         *
         * @param renderer ?????????????????????
         * @param index ?????????????????????
         * @param item ???????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.rendererAdded = function (renderer, index, item) {
        };
        /**
         * @language en_US
         * Removes the itemRenderer for the specified dataProvider item from this DataGroup.
         *
         * This method is called as needed by the DataGroup implementation,
         * it should not be called directly.
         *
         * @param renderer The renderer that is being removed.
         * @param index The index of the item that is being removed.
         * @param item The item that is being removed.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         * ????????????????????????????????????????????????????????????????????????
         *
         * @param renderer ?????????????????????
         * @param index ?????????????????????
         * @param item ???????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.rendererRemoved = function (renderer, index, item) {
        };
        return DataGroup;
    }(eui.Group));
    eui.DataGroup = DataGroup;
    egret.registerClass(DataGroup,'eui.DataGroup');
    eui.registerProperty(DataGroup, "itemRenderer", "Class");
    eui.registerProperty(DataGroup, "itemRendererSkinName", "Class");
    eui.registerProperty(DataGroup, "dataProvider", "eui.ICollection", true);
    if (DEBUG) {
        egret.$markReadOnly(DataGroup, "numElements");
    }
})(eui || (eui = {}));
var eui;
(function (eui) {
    var UIImpl = eui.sys.UIComponentImpl;
    /**
     * @language en_US
     * Editable text for displaying,
     * scrolling, selecting, and editing text.
     * @includeExample  extension/eui/components/EditablTextExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ??????????????????????????????????????????????????????????????????
     * @includeExample  extension/eui/components/EditablTextExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var EditableText = (function (_super) {
        __extends(EditableText, _super);
        /**
         * @language en_US
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function EditableText() {
            _super.call(this);
            /**
             * @private
             */
            this._widthConstraint = NaN;
            /**
             * @private
             */
            this.$isShowPrompt = false;
            /**
             * @private
             */
            this.$promptColor = 0x666666;
            /**
             * @private
             */
            this.$isFocusIn = false;
            this.initializeUIValues();
            this.type = egret.TextFieldType.INPUT;
            this.$EditableText = {
                0: null,
                1: 0xffffff,
                2: false //asPassword
            };
        }
        var d = __define,c=EditableText,p=c.prototype;
        /**
         * @private
         *
         */
        p.$invalidateContentBounds = function () {
            _super.prototype.$invalidateContentBounds.call(this);
            this.invalidateSize();
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setWidth = function (value) {
            var result1 = _super.prototype.$setWidth.call(this, value);
            var result2 = UIImpl.prototype.$setWidth.call(this, value);
            return result1 && result2;
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setHeight = function (value) {
            var result1 = _super.prototype.$setHeight.call(this, value);
            var result2 = UIImpl.prototype.$setHeight.call(this, value);
            return result1 && result2;
        };
        /**
         * @private
         *
         * @param value
         */
        p.$getText = function () {
            var value = _super.prototype.$getText.call(this);
            if (value == this.$EditableText[0 /* promptText */]) {
                value = "";
            }
            return value;
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setText = function (value) {
            var promptText = this.$EditableText[0 /* promptText */];
            if (promptText != value || promptText == null) {
                this.$isShowPrompt = false;
                this.textColor = this.$EditableText[1 /* textColorUser */];
                this.displayAsPassword = this.$EditableText[2 /* asPassword */];
            }
            if (!this.$isFocusIn) {
                if (value == "" || value == null) {
                    value = promptText;
                    this.$isShowPrompt = true;
                    _super.prototype.$setTextColor.call(this, this.$promptColor);
                    _super.prototype.$setDisplayAsPassword.call(this, false);
                }
            }
            var result = _super.prototype.$setText.call(this, value);
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "text");
            return result;
        };
        /**
         * @private
         *
         * @param stage
         * @param nestLevel
         */
        p.$onAddToStage = function (stage, nestLevel) {
            eui.sys.UIComponentImpl.prototype["$onAddToStage"].call(this, stage, nestLevel);
            this.addEventListener(egret.FocusEvent.FOCUS_IN, this.onfocusIn, this);
            this.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onfocusOut, this);
        };
        /**
         * @private
         *
         */
        p.$onRemoveFromStage = function () {
            eui.sys.UIComponentImpl.prototype["$onRemoveFromStage"].call(this);
            this.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onfocusIn, this);
            this.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onfocusOut, this);
        };
        d(p, "prompt"
            /**
             * @language en_US
             * When the property of the text is empty, it will show the defalut string.
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???text???????????????????????????????????????????????????
             * ????????????????????????????????????????????????????????????????????????????????? text ??????????????????????????????????????????????????????
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????<p/>
             * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
             * ???????????????????????????????????????????????? text ?????????????????????????????????????????????????????????
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$EditableText[0 /* promptText */];
            }
            ,function (value) {
                var values = this.$EditableText;
                var promptText = values[0 /* promptText */];
                if (promptText == value)
                    return;
                values[0 /* promptText */] = value;
                var text = this.text;
                if (!text || text == promptText) {
                    this.showPromptText();
                }
            }
        );
        d(p, "promptColor"
            ,function () {
                return this.$promptColor;
            }
            /**
             * @language en_US
             * The color of the defalut string.
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function (value) {
                value = +value | 0;
                if (this.$promptColor != value) {
                    this.$promptColor = value;
                    var text = this.text;
                    if (!text || text == this.$EditableText[0 /* promptText */]) {
                        this.showPromptText();
                    }
                }
            }
        );
        /**
         * @private
         */
        p.onfocusOut = function () {
            this.$isFocusIn = false;
            if (!this.text) {
                this.showPromptText();
            }
        };
        /**
         * @private
         */
        p.onfocusIn = function () {
            this.$isFocusIn = true;
            this.$isShowPrompt = false;
            this.displayAsPassword = this.$EditableText[2 /* asPassword */];
            var values = this.$EditableText;
            var text = this.text;
            if (!text || text == values[0 /* promptText */]) {
                this.textColor = values[1 /* textColorUser */];
                this.text = "";
            }
        };
        /**
         * @private
         */
        p.showPromptText = function () {
            var values = this.$EditableText;
            this.$isShowPrompt = true;
            _super.prototype.$setTextColor.call(this, this.$promptColor);
            _super.prototype.$setDisplayAsPassword.call(this, false);
            this.text = values[0 /* promptText */];
        };
        /**
         * @private
         */
        p.$setTextColor = function (value) {
            value = +value | 0;
            this.$EditableText[1 /* textColorUser */] = value;
            if (!this.$isShowPrompt) {
                _super.prototype.$setTextColor.call(this, value);
            }
            return true;
        };
        /**
         * @private
         */
        p.$setDisplayAsPassword = function (value) {
            this.$EditableText[2 /* asPassword */] = value;
            if (!this.$isShowPrompt) {
                _super.prototype.$setDisplayAsPassword.call(this, value);
            }
            return true;
        };
        /**
         * @copy eui.Component#createChildren()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.createChildren = function () {
            this.onfocusOut();
        };
        /**
         * @copy eui.Component#childrenCreated()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.childrenCreated = function () {
        };
        /**
         * @copy eui.Component#commitProperties()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitProperties = function () {
        };
        /**
         * @copy eui.Component#measure()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measure = function () {
            var values = this.$UIComponent;
            var textValues = this.$TextField;
            var oldWidth = textValues[3 /* textFieldWidth */];
            var availableWidth = NaN;
            if (!isNaN(this._widthConstraint)) {
                availableWidth = this._widthConstraint;
                this._widthConstraint = NaN;
            }
            else if (!isNaN(values[8 /* explicitWidth */])) {
                availableWidth = values[8 /* explicitWidth */];
            }
            else if (values[13 /* maxWidth */] != 100000) {
                availableWidth = values[13 /* maxWidth */];
            }
            _super.prototype.$setWidth.call(this, availableWidth);
            this.setMeasuredSize(this.textWidth, this.textHeight);
            _super.prototype.$setWidth.call(this, oldWidth);
        };
        /**
         * @copy eui.Component#updateDisplayList()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.$setWidth.call(this, unscaledWidth);
            _super.prototype.$setHeight.call(this, unscaledHeight);
        };
        /**
         * @copy eui.Component#invalidateParentLayout()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateParentLayout = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setMeasuredSize = function (width, height) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateSize = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateSize = function (recursive) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateNow = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
            UIImpl.prototype.setLayoutBoundsSize.call(this, layoutWidth, layoutHeight);
            if (isNaN(layoutWidth) || layoutWidth === this._widthConstraint || layoutWidth == 0) {
                return;
            }
            var values = this.$UIComponent;
            if (!isNaN(values[9 /* explicitHeight */])) {
                return;
            }
            if (layoutWidth == values[16 /* measuredWidth */]) {
                return;
            }
            this._widthConstraint = layoutWidth;
            this.invalidateSize();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getLayoutBounds = function (bounds) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getPreferredBounds = function (bounds) {
        };
        return EditableText;
    }(egret.TextField));
    eui.EditableText = EditableText;
    egret.registerClass(EditableText,'eui.EditableText',["eui.UIComponent","eui.IDisplayText"]);
    eui.sys.implementUIComponent(EditableText, egret.TextField);
    eui.registerBindable(EditableText.prototype, "text");
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The ScrollBarBase class helps to position
     * the portion of data that is displayed when there is too much data
     * to fit in a display area.
     * The ScrollBarBase class displays a pair of viewport and a thumb.
     * viewport is a instance that implements IViewport.
     *
     * @see eui.IViewport
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * <code>ScrollBarBase</code> ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ScrollBarBase ???????????????????????????????????????????????????
     * ???????????????IViewport????????????????????????
     *
     * @see eui.IViewport
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var ScrollBarBase = (function (_super) {
        __extends(ScrollBarBase, _super);
        /**
         * @language en_US
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????ScrollBarBase?????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function ScrollBarBase() {
            _super.call(this);
            /**
             * @language en_US
             * [SkinPart] Thumb display object.
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * [SkinPart]?????????????????????
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.thumb = null;
            /**
             * @private
             */
            this.$viewport = null;
            /**
             * @language en_US
             * Whether the scrollbar can be autohide.
             * @version Egret 3.0.2
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????? scrollbar
             * @version Egret 3.0.2
             * @version eui 1.0
             * @platform Web,Native
             */
            this.autoVisibility = true;
        }
        var d = __define,c=ScrollBarBase,p=c.prototype;
        d(p, "viewport"
            /**
             * @language en_US
             * The viewport controlled by this scrollbar.
             *
             * If a viewport is specified, then changes to its actual size, content
             * size, and scroll position cause the corresponding ScrollBarBase methods to
             * run:
             * <ul>
             *     <li><code>onViewportResize()</code></li>
             *     <li><code>onPropertyChanged()</code></li>
             * </ul><p/>
             *
             * The VScrollBar and HScrollBar classes override these methods to keep their properties in
             * sync with the viewport.
             *
             * @default null
             * @see eui.VScrollBar
             * @see eui.HScrollBar
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????
             *
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????? ScrollBarBase ?????????
             * <ul>
             *     <li><code>onViewportResize()</code></li>
             *     <li><code>onPropertyChanged()</code></li>
             * </ul><p/>
             *
             * VScrollBar ??? HScrollBar ???????????????????????????????????????????????????????????????
             *
             * @default null
             * @see eui.VScrollBar
             * @see eui.HScrollBar
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$viewport;
            }
            ,function (value) {
                if (value == this.$viewport) {
                    return;
                }
                var viewport = this.$viewport;
                if (viewport) {
                    viewport.removeEventListener(eui.PropertyEvent.PROPERTY_CHANGE, this.onPropertyChanged, this);
                    viewport.removeEventListener(egret.Event.RESIZE, this.onViewportResize, this);
                }
                this.$viewport = value;
                if (value) {
                    value.addEventListener(eui.PropertyEvent.PROPERTY_CHANGE, this.onPropertyChanged, this);
                    value.addEventListener(egret.Event.RESIZE, this.onViewportResize, this);
                }
                this.invalidateDisplayList();
            }
        );
        /**
         * @private
         *
         * @param event
         */
        p.onViewportResize = function (event) {
            this.invalidateDisplayList();
        };
        /**
         * @language en_US
         * Properties of viewport changed.
         * @param event
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????
         * @param event
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onPropertyChanged = function (event) {
        };
        return ScrollBarBase;
    }(eui.Component));
    eui.ScrollBarBase = ScrollBarBase;
    egret.registerClass(ScrollBarBase,'eui.ScrollBarBase');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The HScrollBar (horizontal scrollbar) control lets you control
     * the portion of data that is displayed when there is too much data
     * to fit horizontally in a display area.
     *
     * <p>Although you can use the HScrollBar control as a stand-alone control,
     * you usually combine it as part of another group of components to
     * provide scrolling functionality.</p>
     *
     * @includeExample  extension/eui/components/HScrollBarExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * HScrollBar????????? ScrollBar????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * <p>?????? HScrollBar ?????????????????????????????????????????????????????????????????????????????????????????????</p>
     *
     * @includeExample  extension/eui/components/HScrollBarExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var HScrollBar = (function (_super) {
        __extends(HScrollBar, _super);
        function HScrollBar() {
            _super.apply(this, arguments);
        }
        var d = __define,c=HScrollBar,p=c.prototype;
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var thumb = this.thumb;
            var viewport = this.$viewport;
            if (!thumb || !viewport) {
                return;
            }
            var bounds = egret.$TempRectangle;
            thumb.getPreferredBounds(bounds);
            var thumbWidth = bounds.width;
            var thumbY = bounds.y;
            var hsp = viewport.scrollH;
            var contentWidth = viewport.contentWidth;
            var width = viewport.width;
            if (hsp <= 0) {
                var scaleWidth = thumbWidth * (1 - (-hsp) / (width * 0.5));
                scaleWidth = Math.max(5, Math.round(scaleWidth));
                thumb.setLayoutBoundsSize(scaleWidth, NaN);
                thumb.setLayoutBoundsPosition(0, thumbY);
            }
            else if (hsp >= contentWidth - width) {
                var scaleWidth = thumbWidth * (1 - (hsp - contentWidth + width) / (width * 0.5));
                scaleWidth = Math.max(5, Math.round(scaleWidth));
                thumb.setLayoutBoundsSize(scaleWidth, NaN);
                thumb.setLayoutBoundsPosition(unscaledWidth - scaleWidth, thumbY);
            }
            else {
                var thumbX = (unscaledWidth - thumbWidth) * hsp / (contentWidth - width);
                thumb.setLayoutBoundsSize(NaN, NaN);
                thumb.setLayoutBoundsPosition(thumbX, thumbY);
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onPropertyChanged = function (event) {
            switch (event.property) {
                case "scrollH":
                case "contentWidth":
                    this.invalidateDisplayList();
                    break;
            }
        };
        return HScrollBar;
    }(eui.ScrollBarBase));
    eui.HScrollBar = HScrollBar;
    egret.registerClass(HScrollBar,'eui.HScrollBar');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The Range class holds a value and an allowed range for that
     * value, defined by <code>minimum</code> and <code>maximum</code> properties.
     *
     * The <code>value</code> property
     * is always constrained to be between the current <code>minimum</code> and
     * <code>maximum</code>, and the <code>minimum</code>,
     * and <code>maximum</code> are always constrained
     * to be in the proper numerical order, such that
     * <code>(minimum <= value <= maximum)</code> is <code>true</code>.
     *
     * If the value of the <code>snapInterval</code> property is not 0,
     * then the <code>value</code> property is also constrained to be a multiple of
     * <code>snapInterval</code>.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/components/supportClasses/RangeExample.ts
     */
    /**
     * @language zh_CN
     * ??????????????????,???????????????????????????????????????????????????????????????????????????
     *
     * <code>value</code>???????????????????????????????????????<code>minimum</code>???
     * <code>maximum</code>???????????????<code>minimum</code>??? <code>maximum</code>????????????????????????????????????
     * ???<code>(minimum <= value <= maximum)</code> ?????????
     *
     * ??????<code>snapInterval</code>??????????????????0?????????<code>value</code>???????????????<code>snapInterval</code>????????????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/components/supportClasses/RangeExample.ts
     */
    var Range = (function (_super) {
        __extends(Range, _super);
        /**
         * @language en_US
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? Range ?????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function Range() {
            _super.call(this);
            this.$Range = {
                0: 100,
                1: false,
                2: 0,
                3: false,
                4: 0,
                5: 0,
                6: false,
                7: 1,
                8: false,
                9: false,
            };
        }
        var d = __define,c=Range,p=c.prototype;
        d(p, "maximum"
            /**
             * @language en_US
             * The maximum valid <code>value</code>.<p/>
             *
             * Changes to the value property are constrained
             * by <code>commitProperties()</code> to be less than or equal to
             * maximum with the <code>nearestValidValue()</code> method.
             *
             * @default 100
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????<p/>
             *
             * ??????<code>value</code>?????????????????????????????????????????????????????????
             * ??????<code>nearestValidValue()</code>??????????????????
             *
             * @default 100
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Range[0 /* maximum */];
            }
            ,function (value) {
                value = +value || 0;
                var values = this.$Range;
                if (value === values[0 /* maximum */])
                    return;
                values[0 /* maximum */] = value;
                values[1 /* maxChanged */] = true;
                this.invalidateProperties();
                this.invalidateDisplayList();
            }
        );
        d(p, "minimum"
            /**
             * @language en_US
             * The minimum valid <code>value</code>.<p/>
             *
             * Changes to the value property are constrained
             * by <code>commitProperties()</code> to be greater than or equal to
             * minimum with the <code>nearestValidValue()</code> method.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????<p/>
             *
             * ??????<code>value</code>?????????????????????????????????????????????????????????
             * ??????<code>nearestValidValue()</code>??????????????????
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Range[2 /* minimum */];
            }
            ,function (value) {
                value = +value || 0;
                var values = this.$Range;
                if (value === values[2 /* minimum */])
                    return;
                values[2 /* minimum */] = value;
                values[3 /* minChanged */] = true;
                this.invalidateProperties();
                this.invalidateDisplayList();
            }
        );
        d(p, "value"
            /**
             * @language en_US
             * The current value for this range.<p/>
             *
             * Changes to the value property are constrained
             * by <code>commitProperties()</code> to be greater than or equal to
             * the <code>minimum</code> property, less than or equal to the <code>maximum</code> property, and a
             * multiple of <code>snapInterval</code> with the <code>nearestValidValue()</code>
             * method.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????<p/>
             *
             * ?????????<code>value</code>????????????<code>commitProperties()</code>????????????<code>minimum</code>??????
             * ???<code>minimum</code>???????????????????????????????????????<code>nearestValidValue()</code>??????????????????
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                var values = this.$Range;
                return values[6 /* valueChanged */] ?
                    values[5 /* changedValue */] : values[4 /* value */];
            }
            ,function (newValue) {
                newValue = +newValue || 0;
                this.$setValue(newValue);
            }
        );
        /**
         * @private
         *
         * @param newValue
         */
        p.$setValue = function (newValue) {
            if (newValue === this.value)
                return false;
            var values = this.$Range;
            values[5 /* changedValue */] = newValue;
            values[6 /* valueChanged */] = true;
            this.invalidateProperties();
            return true;
        };
        d(p, "snapInterval"
            /**
             * @language en_US
             * The snapInterval property controls the valid values of the <code>value</code> property.
             *
             * If nonzero, valid values are the sum of the <code>minimum</code> and integer multiples
             * of this property, for all sums that are less than or equal to the <code>maximum</code>.<p/>
             *
             * For example, if <code>minimum</code> is 10, <code>maximum</code> is 20, and this property is 3, then the
             * valid values of this Range are 10, 13, 16, 19, and 20.<p/>
             *
             * If the value of this property is zero, then valid values are only constrained
             * to be between minimum and maximum inclusive.
             *
             * @default 1
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * snapInterval ???????????? value ?????????????????????
             * ????????????????????????????????? minimum ?????????????????????????????????????????????????????? maximum???</p>
             *
             * ??????????????? minimum ??? 10???maximum ??? 20?????????????????? 3??????????????????????????? 10???13???16???19 ??? 20.</p>
             *
             * ?????????????????????????????????????????????????????????????????? minimum ??? maximum ???????????????????????????
             *
             * @default 1
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Range[7 /* snapInterval */];
            }
            ,function (value) {
                var values = this.$Range;
                values[9 /* explicitSnapInterval */] = true;
                value = +value || 0;
                if (value === values[7 /* snapInterval */])
                    return;
                if (isNaN(value)) {
                    values[7 /* snapInterval */] = 1;
                    values[9 /* explicitSnapInterval */] = false;
                }
                else {
                    values[7 /* snapInterval */] = value;
                }
                values[8 /* snapIntervalChanged */] = true;
                this.invalidateProperties();
            }
        );
        /**
         * @language en_US
         * Processes the properties set on the component.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            var values = this.$Range;
            if (values[2 /* minimum */] > values[0 /* maximum */]) {
                if (!values[1 /* maxChanged */])
                    values[2 /* minimum */] = values[0 /* maximum */];
                else
                    values[0 /* maximum */] = values[2 /* minimum */];
            }
            if (values[6 /* valueChanged */] || values[1 /* maxChanged */] ||
                values[3 /* minChanged */] || values[8 /* snapIntervalChanged */]) {
                var currentValue = values[6 /* valueChanged */] ?
                    values[5 /* changedValue */] : values[4 /* value */];
                values[6 /* valueChanged */] = false;
                values[1 /* maxChanged */] = false;
                values[3 /* minChanged */] = false;
                values[8 /* snapIntervalChanged */] = false;
                this.setValue(this.nearestValidValue(currentValue, values[7 /* snapInterval */]));
            }
        };
        /**
         * @private
         * ??????size????????????snapInterval????????????
         */
        p.nearestValidSize = function (size) {
            var interval = this.snapInterval;
            if (interval == 0)
                return size;
            var validSize = Math.round(size / interval) * interval;
            return (Math.abs(validSize) < interval) ? interval : validSize;
        };
        /**
         * @language en_US
         * Returns the sum of the minimum with an integer multiple of <code>interval</code> that's
         * closest to <code>value</code>, unless <code>value</code> is closer to the maximum limit,
         * in which case the maximum is returned.<p/>
         *
         * If <code>interval</code> is equal to 0, the value is clipped to the minimum and maximum
         * limits.<p/>
         *
         * The valid values for a range are defined by the sum of the <code>minimum</code> property
         * with multiples of the <code>interval</code> and also defined to be less than or equal to the
         * <code>maximum</code> property.
         * The maximum need not be a multiple of <code>snapInterval</code>.<p/>
         *
         * For example, if <code>minimum</code> is equal to 1, <code>maximum</code> is equal to 6,
         * and <code>snapInterval</code> is equal to 2, the valid
         * values for the Range are 1, 3, 5, 6.
         *
         * Similarly, if <code>minimum</code> is equal to 2, <code>maximum</code> is equal to 9,
         * and <code>snapInterval</code> is equal to 1.5, the valid
         * values for the Range are 2, 3.5, 5, 6.5, 8, and 9.
         *
         * @param value The input value.
         * @param interval The value of snapInterval or an integer multiple of snapInterval.
         * @return The valid value that's closest to the input.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????? <code>minimum</code> ???????????? <code>value</code> ??? <code>interval</code> ????????????????????????
         * ?????? <code>value</code> ??????????????????????????????????????? maximum???<p/>
         *
         * ?????? <code>interval</code> ?????? 0????????????????????????????????????????????????????????????<p/>
         *
         * ????????????????????? <code>minimum</code> ????????? <code>interval</code> ????????????????????????
         * ?????????????????????????????? <code>maximum</code> ?????????
         * ?????????????????? <code>snapInterval</code> ??????????????????<p/>
         *
         * ??????????????? <code>minimum</code> ?????? 1???<code>maximum</code> ?????? 6?????? <code>snapInterval</code> ?????? 3???
         * ??? Range ??????????????? 1???2???5???6???
         *
         * ?????????????????? <code>minimum</code> ?????? 2???<code>maximum</code> ?????? 9???
         * ??? <code>snapInterval</code> ?????? 1.5?????? Range ??????????????? 2???3.5???5???6.5???8 ??? 9???
         *
         *
         * @param value ????????????
         * @param interval snapInterval ???????????? snapInterval ??????????????????
         * @return ?????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.nearestValidValue = function (value, interval) {
            var values = this.$Range;
            if (interval == 0)
                return Math.max(values[2 /* minimum */], Math.min(values[0 /* maximum */], value));
            var maxValue = values[0 /* maximum */] - values[2 /* minimum */];
            var scale = 1;
            value -= values[2 /* minimum */];
            if (interval != Math.round(interval)) {
                var parts = ((1 + interval).toString()).split(".");
                scale = Math.pow(10, parts[1].length);
                maxValue *= scale;
                value = Math.round(value * scale);
                interval = Math.round(interval * scale);
            }
            var lower = Math.max(0, Math.floor(value / interval) * interval);
            var upper = Math.min(maxValue, Math.floor((value + interval) / interval) * interval);
            var validValue = ((value - lower) >= ((upper - lower) / 2)) ? upper : lower;
            return (validValue / scale) + values[2 /* minimum */];
        };
        /**
         * @language en_US
         * Sets the current value for the <code>value</code> property.<p/>
         *
         * This method assumes that the caller has already used the <code>nearestValidValue()</code> method
         * to constrain the value parameter
         *
         * @param value The new value of the <code>value</code> property.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????<p/>
         *
         * ??????????????????????????????????????? nearestValidValue() ??????????????? value ?????????
         *
         * @param value value???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setValue = function (value) {
            var values = this.$Range;
            if (values[4 /* value */] === value)
                return;
            if (values[0 /* maximum */] > values[2 /* minimum */])
                values[4 /* value */] = Math.min(values[0 /* maximum */], Math.max(values[2 /* minimum */], value));
            else
                values[4 /* value */] = value;
            values[6 /* valueChanged */] = false;
            this.invalidateDisplayList();
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "value");
        };
        /**
         * @language en_US
         * Draws the object and/or sizes and positions its children.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????/????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (w, h) {
            _super.prototype.updateDisplayList.call(this, w, h);
            this.updateSkinDisplayList();
        };
        /**
         * @language en_US
         * Update size and visible of skin parts.<p/>
         * Subclasses override this method to update skin parts display based on <code>minimum</code>, <code>maximum</code>
         * and <code>value</code> properties.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????<p/>
         * ?????????????????????????????? minimum???maximum ??? value ???????????????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateSkinDisplayList = function () {
        };
        return Range;
    }(eui.Component));
    eui.Range = Range;
    egret.registerClass(Range,'eui.Range');
    eui.registerBindable(Range.prototype, "value");
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The SliderBase class lets users select a value by moving a slider thumb between
     * the end points of the slider track.
     * The current value of the slider is determined by the relative location of
     * the thumb between the end points of the slider,
     * corresponding to the slider's minimum and maximum values.
     * The SliderBase class is a base class for HSlider and VSlider.
     *
     * @event eui.UIEvent.CHANGE_START Dispatched when the scroll position is going to change
     * @event eui.UIEvent.CHANGE_END Dispatched when the scroll position changed complete
     * @event egret.Event.CHANGE Dispatched when the scroll position is changing
     *
     * @see eui.HSlider
     * @see eui.VSlider
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ????????????????????????????????? SliderBase ???????????????????????????????????????????????????????????????????????????
     * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * SliderBase ?????? HSlider ??? VSlider ????????????
     *
     * @event eui.UIEvent.CHANGE_START ????????????????????????
     * @event eui.UIEvent.CHANGE_END ????????????????????????
     * @event egret.Event.CHANGE ???????????????????????????
     *
     * @see eui.HSlider
     * @see eui.VSlider
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var SliderBase = (function (_super) {
        __extends(SliderBase, _super);
        /**
         * @language en_US
         * Constructor
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? SliderBase ??????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function SliderBase() {
            _super.call(this);
            /**
             * @language en_US
             * [SkinPart] Highlight of track.
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * [SkinPart] ???????????????????????????
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.trackHighlight = null;
            /**
             * @language en_US
             * [SkinPart] Thumb display object.
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * [SkinPart]?????????????????????
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.thumb = null;
            /**
             * @language en_US
             * [SkinPart] Track display object.
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * [SkinPart]?????????????????????
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.track = null;
            this.$SliderBase = {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: null,
                5: null,
                6: 300,
                7: 0,
                8: 0,
                9: true,
            };
            this.maximum = 10;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }
        var d = __define,c=SliderBase,p=c.prototype;
        d(p, "slideDuration"
            /**
             * @language en_US
             * Duration in milliseconds for the sliding animation when you tap on the track to move a thumb.
             *
             * @default 300
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????0?????????????????????
             *
             * @default 300
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$SliderBase[6 /* slideDuration */];
            }
            ,function (value) {
                this.$SliderBase[6 /* slideDuration */] = +value || 0;
            }
        );
        /**
         * @language en_US
         * Converts a track-relative x,y pixel location into a value between
         * the minimum and maximum, inclusive.
         *
         * @param x The x coordinate of the location relative to the track's origin.
         * @param y The y coordinate of the location relative to the track's origin.
         * @return A value between the minimum and maximum, inclusive.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????? x,y ???????????????????????????????????????????????????????????????????????????????????????
         *
         * @param x ?????????????????????????????????x?????????
         * @param y ?????????????????????????????????y?????????
         * @return ??????????????????????????????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.pointToValue = function (x, y) {
            return this.minimum;
        };
        d(p, "liveDragging"
            /**
             * @language en_US
             * Specifies whether live dragging is enabled for the slider. If true, sets the value
             * and values properties and dispatches the change event continuously as
             * the user moves the thumb.
             *
             * @default true
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????? true??????????????????????????????????????????????????????????????????????????????????????????????????????
             *
             * @default true
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$SliderBase[9 /* liveDragging */];
            }
            ,function (value) {
                this.$SliderBase[9 /* liveDragging */] = !!value;
            }
        );
        d(p, "pendingValue"
            /**
             * @language en_US
             * The value the slider will have when the touch is end.
             * This property is updated when the slider thumb moves, even if <code>liveDragging</code> is false.<p/>
             * If the <code>liveDragging</code> style is false, then the slider's value is only set
             * when the touch is end.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????
             * ?????? liveDragging ????????? true????????????????????????????????????????????????
             * ??? value ???????????? liveDragging ??? false ??????????????????????????????????????????
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$SliderBase[7 /* pendingValue */];
            }
            ,function (value) {
                value = +value || 0;
                var values = this.$SliderBase;
                if (value === values[7 /* pendingValue */])
                    return;
                values[7 /* pendingValue */] = value;
                this.invalidateDisplayList();
            }
        );
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setValue = function (value) {
            this.$SliderBase[7 /* pendingValue */] = value;
            _super.prototype.setValue.call(this, value);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance == this.thumb) {
                this.thumb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onThumbTouchBegin, this);
                this.thumb.addEventListener(egret.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
            else if (instance == this.track) {
                this.track.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTrackTouchBegin, this);
                this.track.addEventListener(egret.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
            else if (instance === this.trackHighlight) {
                this.trackHighlight.touchEnabled = false;
                if (egret.is(this.trackHighlight, "egret.DisplayObjectContainer")) {
                    this.trackHighlight.touchChildren = false;
                }
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            if (instance == this.thumb) {
                this.thumb.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onThumbTouchBegin, this);
                this.thumb.removeEventListener(egret.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
            else if (instance == this.track) {
                this.track.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTrackTouchBegin, this);
                this.track.removeEventListener(egret.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
        };
        /**
         * @private
         * ?????????????????????????????????
         */
        p.onTrackOrThumbResize = function (event) {
            this.updateSkinDisplayList();
        };
        /**
         * @language en_US
         * Handle touch-begin events on the scroll thumb. Records the touch begin point in clickOffset.
         *
         * @param The <code>egret.TouchEvent</code> object.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????
         *
         * @param event ?????? <code>egret.TouchEvent</code> ?????????.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onThumbTouchBegin = function (event) {
            var values = this.$SliderBase;
            if (values[5 /* animation */] && values[5 /* animation */].isPlaying)
                this.stopAnimation();
            var stage = this.$stage;
            stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageTouchMove, this);
            stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            var clickOffset = this.thumb.globalToLocal(event.stageX, event.stageY, egret.$TempPoint);
            values[0 /* clickOffsetX */] = clickOffset.x;
            values[1 /* clickOffsetY */] = clickOffset.y;
            eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_START);
        };
        /**
         * @private
         * ???????????????????????????
         */
        p.onStageTouchMove = function (event) {
            var values = this.$SliderBase;
            values[2 /* moveStageX */] = event.$stageX;
            values[3 /* moveStageY */] = event.$stageY;
            var track = this.track;
            if (!track)
                return;
            var p = track.globalToLocal(values[2 /* moveStageX */], values[3 /* moveStageY */], egret.$TempPoint);
            var newValue = this.pointToValue(p.x - values[0 /* clickOffsetX */], p.y - values[1 /* clickOffsetY */]);
            newValue = this.nearestValidValue(newValue, this.snapInterval);
            this.updateWhenTouchMove(newValue);
            event.updateAfterEvent();
        };
        /**
         * @language en_US
         * Capture touch-move events anywhere on or off the stage.
         * @param newValue new value
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????
         * @param newValue ?????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateWhenTouchMove = function (newValue) {
            if (newValue != this.$SliderBase[7 /* pendingValue */]) {
                if (this.liveDragging) {
                    this.setValue(newValue);
                    this.dispatchEventWith(egret.Event.CHANGE);
                }
                else {
                    this.pendingValue = newValue;
                }
            }
        };
        /**
         * @language en_US
         * Handle touch-end events anywhere on or off the stage.
         *
         * @param The <code>egret.Event</code> object.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????
         *
         * @param event ?????? <code>egret.Event</code> ????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onStageTouchEnd = function (event) {
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageTouchMove, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_END);
            var values = this.$SliderBase;
            if (!this.liveDragging && this.value != values[7 /* pendingValue */]) {
                this.setValue(values[7 /* pendingValue */]);
                this.dispatchEventWith(egret.Event.CHANGE);
            }
        };
        /**
         * @private
         * ?????????????????????????????????????????????????????????
         */
        p.onTouchBegin = function (event) {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stageTouchEndHandler, this);
            this.$SliderBase[4 /* touchDownTarget */] = (event.$target);
        };
        /**
         * @private
         * ??????????????????????????? touchDownTarget ????????????????????????????????????????????????????????????????????????????????????????????????
         */
        p.stageTouchEndHandler = function (event) {
            var target = event.$target;
            var values = this.$SliderBase;
            event.$currentTarget.removeEventListener(egret.TouchEvent.TOUCH_END, this.stageTouchEndHandler, this);
            if (values[4 /* touchDownTarget */] != target && this.contains((target))) {
                egret.TouchEvent.dispatchTouchEvent(this, egret.TouchEvent.TOUCH_TAP, true, true, event.$stageX, event.$stageY, event.touchPointID);
            }
            values[4 /* touchDownTarget */] = null;
        };
        /**
         * @private
         * ????????????????????????
         */
        p.$animationUpdateHandler = function (animation) {
            this.pendingValue = animation.currentValue;
        };
        /**
         * @private
         * ??????????????????
         */
        p.animationEndHandler = function (animation) {
            this.setValue(this.$SliderBase[8 /* slideToValue */]);
            this.dispatchEventWith(egret.Event.CHANGE);
            eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_END);
        };
        /**
         * @private
         * ??????????????????
         */
        p.stopAnimation = function () {
            this.$SliderBase[5 /* animation */].stop();
            this.setValue(this.nearestValidValue(this.pendingValue, this.snapInterval));
            this.dispatchEventWith(egret.Event.CHANGE);
            eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_END);
        };
        /**
         * @language en_US
         * Handle touch-begin events for the slider track. We
         * calculate the value based on the new position and then
         * move the thumb to the correct location as well as
         * commit the value.
         * @param The <code>egret.TouchEvent</code> object.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????value???????????????????????????????????????
         *
         * @param event ?????? <code>egret.TouchEvent</code> ?????????.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onTrackTouchBegin = function (event) {
            var thumbW = this.thumb ? this.thumb.width : 0;
            var thumbH = this.thumb ? this.thumb.height : 0;
            var offsetX = event.$stageX - (thumbW / 2);
            var offsetY = event.$stageY - (thumbH / 2);
            var p = this.track.globalToLocal(offsetX, offsetY, egret.$TempPoint);
            var rangeValues = this.$Range;
            var newValue = this.pointToValue(p.x, p.y);
            newValue = this.nearestValidValue(newValue, rangeValues[7 /* snapInterval */]);
            var values = this.$SliderBase;
            if (newValue != values[7 /* pendingValue */]) {
                if (values[6 /* slideDuration */] != 0) {
                    if (!values[5 /* animation */]) {
                        values[5 /* animation */] = new eui.sys.Animation(this.$animationUpdateHandler, this);
                        values[5 /* animation */].endFunction = this.animationEndHandler;
                    }
                    var animation = values[5 /* animation */];
                    if (animation.isPlaying)
                        this.stopAnimation();
                    values[8 /* slideToValue */] = newValue;
                    animation.duration = values[6 /* slideDuration */] *
                        (Math.abs(values[7 /* pendingValue */] - values[8 /* slideToValue */]) / (rangeValues[0 /* maximum */] - rangeValues[2 /* minimum */]));
                    animation.from = values[7 /* pendingValue */];
                    animation.to = values[8 /* slideToValue */];
                    eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_START);
                    animation.play();
                }
                else {
                    this.setValue(newValue);
                    this.dispatchEventWith(egret.Event.CHANGE);
                }
            }
        };
        return SliderBase;
    }(eui.Range));
    eui.SliderBase = SliderBase;
    egret.registerClass(SliderBase,'eui.SliderBase');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The HSlider (horizontal slider) control lets users select a value
     * by moving a slider thumb between the end points of the slider track.
     * The current value of the slider is determined by the relative location of the thumb between
     * the end points of the slider, corresponding to the slider's minimum and maximum values.
     *
     * @includeExample  extension/eui/components/HSliderExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ?????? HSlider???????????????????????????????????????????????????????????????????????????????????????????????????
     * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     *
     * @includeExample  extension/eui/components/HSliderExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var HSlider = (function (_super) {
        __extends(HSlider, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function HSlider() {
            _super.call(this);
        }
        var d = __define,c=HSlider,p=c.prototype;
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.pointToValue = function (x, y) {
            if (!this.thumb || !this.track)
                return 0;
            var values = this.$Range;
            var range = values[0 /* maximum */] - values[2 /* minimum */];
            var thumbRange = this.getThumbRange();
            return values[2 /* minimum */] + (thumbRange != 0 ? (x / thumbRange) * range : 0);
        };
        /**
         * @private
         *
         * @returns
         */
        p.getThumbRange = function () {
            var bounds = egret.$TempRectangle;
            this.track.getLayoutBounds(bounds);
            var thumbRange = bounds.width;
            this.thumb.getLayoutBounds(bounds);
            return thumbRange - bounds.width;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateSkinDisplayList = function () {
            if (!this.thumb || !this.track)
                return;
            var values = this.$Range;
            var thumbRange = this.getThumbRange();
            var range = values[0 /* maximum */] - values[2 /* minimum */];
            var thumbPosTrackX = (range > 0) ? ((this.pendingValue - values[2 /* minimum */]) / range) * thumbRange : 0;
            var thumbPos = this.track.localToGlobal(thumbPosTrackX, 0, egret.$TempPoint);
            var thumbPosX = thumbPos.x;
            var thumbPosY = thumbPos.y;
            var thumbPosParentX = this.thumb.$parent.globalToLocal(thumbPosX, thumbPosY, egret.$TempPoint).x;
            var bounds = egret.$TempRectangle;
            this.thumb.getLayoutBounds(bounds);
            this.thumb.setLayoutBoundsPosition(Math.round(thumbPosParentX), bounds.y);
            if (this.trackHighlight && this.trackHighlight.$parent) {
                var trackHighlightX = this.trackHighlight.$parent.globalToLocal(thumbPosX, thumbPosY, egret.$TempPoint).x - thumbPosTrackX;
                this.trackHighlight.x = Math.round(trackHighlightX);
                this.trackHighlight.width = Math.round(thumbPosTrackX);
            }
        };
        return HSlider;
    }(eui.SliderBase));
    eui.HSlider = HSlider;
    egret.registerClass(HSlider,'eui.HSlider');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var loaderPool = [];
    var callBackMap = {};
    var loaderMap = {};
    /**
     * @language en_US
     * Default instance of interface <code>IAssetAdapter</code>.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/components/supportClasses/DefaultAssetAdapterExample.ts
     */
    /**
     * @language zh_CN
     * ?????????IAssetAdapter???????????????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/components/supportClasses/DefaultAssetAdapterExample.ts
     */
    var DefaultAssetAdapter = (function () {
        function DefaultAssetAdapter() {
        }
        var d = __define,c=DefaultAssetAdapter,p=c.prototype;
        /**
         * @language en_US
         * resolve asset.
         * @param source the identifier of new asset need to be resolved
         * @param callBack callback function when resolving complete
         * example???callBack(content:any,source:string):void;
         * @param thisObject <code>this</code> object of callback method
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????
         * @param source ??????????????????????????????
         * @param callBack ????????????????????????????????????callBack(content:any,source:string):void;
         * @param thisObject callBack??? this ??????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getAsset = function (source, callBack, thisObject) {
            var list = callBackMap[source];
            if (list) {
                list.push([callBack, thisObject]);
                return;
            }
            var loader = loaderPool.pop();
            if (!loader) {
                loader = new egret.ImageLoader();
            }
            callBackMap[source] = [[callBack, thisObject]];
            loaderMap[loader.$hashCode] = source;
            loader.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            loader.load(source);
        };
        /**
         * @private
         *
         * @param event
         */
        p.onLoadFinish = function (event) {
            var loader = event.currentTarget;
            loader.removeEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
            loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            var data;
            if (event.$type == egret.Event.COMPLETE) {
                data = new egret.Texture();
                data._setBitmapData(loader.data);
                loader.data = null;
            }
            loaderPool.push(loader);
            var source = loaderMap[loader.$hashCode];
            delete loaderMap[loader.$hashCode];
            var list = callBackMap[source];
            delete callBackMap[source];
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var arr = list[i];
                arr[0].call(arr[1], data, source);
            }
        };
        return DefaultAssetAdapter;
    }());
    eui.DefaultAssetAdapter = DefaultAssetAdapter;
    egret.registerClass(DefaultAssetAdapter,'eui.DefaultAssetAdapter',["eui.IAssetAdapter"]);
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/// <reference path="supportClasses/DefaultAssetAdapter.ts" />
var eui;
(function (eui) {
    /**
     * @private
     * ????????????????????????
     */
    var assetAdapter = new eui.DefaultAssetAdapter();
    /**
     * @language en_US
     * The Image control lets you show JPEG, PNG, and GIF files
     * at runtime. Image inherit Bitmap???so you can set the <code>bitmapData</code> property
     * to show the data. you can also set the <code>source</code> property, Image will auto load
     * and show the url image or the bitmapData.
     *
     * @event egret.Event.COMPLETE Dispatched when the image loaded complete.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ImageExample.ts
     */
    /**
     * @language zh_CN
     * Image ????????????????????????????????? JPEG???PNG ????????????????????????Image ????????? Bitmap?????????????????????????????? bitmapData ?????????
     * ???????????????????????????????????????????????????????????????????????????Image ??????????????????????????? source ?????????source ????????????????????????????????????url????????????
     * ?????????url???????????????????????????????????????????????????????????????????????????????????? BitmapData ??????????????? source ????????????????????????
     *
     * @event egret.Event.COMPLETE ??????????????????????????????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ImageExample.ts
     */
    var Image = (function (_super) {
        __extends(Image, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @param source The source used for the bitmap fill. the value can be
         * a string or an instance of <code>egret.Texture</code>
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @param source ????????????????????????????????????????????????????????? <code>egret.Texture</code> ??????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function Image(source) {
            _super.call(this);
            //endif*/
            /**
             * @private
             */
            this.sourceChanged = false;
            /**
             * @private
             */
            this._source = null;
            this.initializeUIValues();
            if (source) {
                this.source = source;
            }
        }
        var d = __define,c=Image,p=c.prototype;
        d(p, "scale9Grid"
            /**
             * @language en_US
             * Represent a Rectangle Area that the 9 scale area of Image.
             * Notice: This property is valid only when <code>fillMode</code>
             * is <code>BitmapFillMode.SCALE</code>.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????????????????
             * ??????:???????????????<code>fillMode</code>???<code>BitmapFillMode.SCALE</code>????????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$scale9Grid;
            }
            ,function (value) {
                this.$scale9Grid = value;
                this.$invalidateContentBounds();
                this.invalidateDisplayList();
            }
        );
        d(p, "fillMode"
            /**
             * @language en_US
             * Determines how the bitmap fills in the dimensions.
             * <p>When set to <code>BitmapFillMode.CLIP</code>, the bitmap
             * ends at the edge of the region.</p>
             * <p>When set to <code>BitmapFillMode.REPEAT</code>, the bitmap
             * repeats to fill the region.</p>
             * <p>When set to <code>BitmapFillMode.SCALE</code>, the bitmap
             * stretches to fill the region.</p>
             *
             * @default <code>BitmapFillMode.SCALE</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????
             * <p>????????? <code>BitmapFillMode.CLIP</code>???????????????????????????????????????</p>
             * <p>????????? <code>BitmapFillMode.REPEAT</code>???????????????????????????????????????</p>
             * <p>????????? <code>BitmapFillMode.SCALE</code>???????????????????????????????????????</p>
             *
             * @default <code>BitmapFillMode.SCALE</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$fillMode;
            }
            ,function (value) {
                if (value == this.$fillMode) {
                    return;
                }
                this.$fillMode = value;
                this.invalidateDisplayList();
            }
        );
        //if egret
        p.$setFillMode = function (value) {
            var result = _super.prototype.$setFillMode.call(this, value);
            this.invalidateDisplayList();
            return result;
        };
        d(p, "source"
            /**
             * @language en_US
             * The source used for the bitmap fill. the value can be
             * a string or an instance of <code>egret.Texture</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????????????? <code>egret.Texture</code> ??????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._source;
            }
            ,function (value) {
                if (value == this._source) {
                    return;
                }
                this._source = value;
                if (this.$stage) {
                    this.parseSource();
                }
                else {
                    this.sourceChanged = true;
                    this.invalidateProperties();
                }
            }
        );
        p.$setBitmapData = function (value) {
            if (value == this.$Bitmap[0 /* bitmapData */]) {
                return false;
            }
            var result = _super.prototype.$setBitmapData.call(this, value);
            this.sourceChanged = false;
            this.invalidateSize();
            this.invalidateDisplayList();
            return result;
        };
        /**
         * @private
         * ??????source
         */
        p.parseSource = function () {
            this.sourceChanged = false;
            var source = this._source;
            if (source && typeof source == "string") {
                var adapter = egret.getImplementation("eui.IAssetAdapter");
                if (!adapter) {
                    adapter = assetAdapter;
                }
                adapter.getAsset(this._source, this.contentChanged, this);
            }
            else {
                this.$setBitmapData(source);
            }
        };
        /**
         * @private
         * ??????????????????
         */
        p.contentChanged = function (data, source) {
            if (source !== this._source)
                return;
            if (!egret.is(data, "egret.Texture")) {
                return;
            }
            this.$setBitmapData(data);
            if (data) {
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
            else if (DEBUG) {
                egret.$warn(2301, source);
            }
        };
        p.$measureContentBounds = function (bounds) {
            var values = this.$Bitmap;
            var image = this.$Bitmap[0 /* bitmapData */];
            if (image) {
                var uiValues = this.$UIComponent;
                var width = uiValues[10 /* width */];
                var height = uiValues[11 /* height */];
                if (isNaN(width) || isNaN(height)) {
                    bounds.setEmpty();
                    return;
                }
                if (this.$fillMode == "clip") {
                    if (width > image.$getTextureWidth()) {
                        width = image.$getTextureWidth();
                    }
                    if (height > image.$getTextureHeight()) {
                        height = image.$getTextureHeight();
                    }
                }
                bounds.setTo(0, 0, width, height);
            }
            else {
                bounds.setEmpty();
            }
        };
        /**
         * @private
         *
         * @param context
         */
        p.$render = function () {
            var image = this.$Bitmap[0 /* bitmapData */];
            if (!image) {
                return;
            }
            var uiValues = this.$UIComponent;
            var width = uiValues[10 /* width */];
            var height = uiValues[11 /* height */];
            if (width === 0 || height === 0) {
                return;
            }
            var values = this.$Bitmap;
            egret.sys.BitmapNode.$updateTextureData(this.$renderNode, values[1 /* image */], values[2 /* bitmapX */], values[3 /* bitmapY */], values[4 /* bitmapWidth */], values[5 /* bitmapHeight */], values[6 /* offsetX */], values[7 /* offsetY */], values[8 /* textureWidth */], values[9 /* textureHeight */], width, height, values[13 /* sourceWidth */], values[14 /* sourceHeight */], this.scale9Grid || values[0 /* bitmapData */]["scale9Grid"], this.$fillMode, values[10 /* smoothing */]);
        };
        /**
         * @copy eui.UIComponent#createChildren
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.createChildren = function () {
            if (this.sourceChanged) {
                this.parseSource();
            }
        };
        /**
         * @copy eui.UIComponent#childrenCreated
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.childrenCreated = function () {
        };
        /**
         * @copy eui.UIComponent#commitProperties
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitProperties = function () {
            eui.sys.UIComponentImpl.prototype["commitProperties"].call(this);
            if (this.sourceChanged) {
                this.parseSource();
            }
        };
        /**
         * @copy eui.UIComponent#measure
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measure = function () {
            var bitmapData = this.$Bitmap[0 /* bitmapData */];
            if (bitmapData) {
                this.setMeasuredSize(bitmapData.$getTextureWidth(), bitmapData.$getTextureHeight());
            }
            else {
                this.setMeasuredSize(0, 0);
            }
        };
        /**
         * @copy eui.UIComponent#updateDisplayList
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            this.$invalidateContentBounds();
        };
        /**
         * @copy eui.UIComponent#invalidateParentLayout
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateParentLayout = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setMeasuredSize = function (width, height) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateSize = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateSize = function (recursive) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateNow = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getLayoutBounds = function (bounds) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getPreferredBounds = function (bounds) {
        };
        return Image;
    }(egret.Bitmap));
    eui.Image = Image;
    egret.registerClass(Image,'eui.Image',["eui.UIComponent"]);
    eui.sys.implementUIComponent(Image, egret.Bitmap);
    eui.registerProperty(Image, "scale9Grid", "egret.Rectangle");
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/// <reference path="../utils/registerBindable.ts" />
var eui;
(function (eui) {
    /**
     * @language en_US
     * The ItemRenderer class is the base class for item renderers.
     *
     * @state up Up state
     * @state down Down state
     * @state upAndSelected Up state when the button is selected
     * @state downAndSelected Down state when the button is selected
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ItemRendererExample.ts
     */
    /**
     * @language zh_CN
     * ItemRenderer ??????????????????????????????
     *
     * @state up ????????????
     * @state down ????????????
     * @state upAndSelected ????????????????????????
     * @state downAndSelected ????????????????????????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ItemRendererExample.ts
     */
    var ItemRenderer = (function (_super) {
        __extends(ItemRenderer, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function ItemRenderer() {
            _super.call(this);
            /**
             * @private
             */
            this._data = null;
            /**
             * @private
             */
            this._selected = false;
            /**
             * @language en_US
             * The index of the item in the data provider
             * of the host component of the item renderer.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.itemIndex = -1;
            /**
             * @private
             * ????????????????????? TouchEvent.TOUCH_BEGIN ????????????????????????????????????
             */
            this.touchCaptured = false;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }
        var d = __define,c=ItemRenderer,p=c.prototype;
        d(p, "data"
            /**
             * @language en_US
             * The data to render or edit.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._data;
            }
            ,function (value) {
                this._data = value;
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "data");
                this.dataChanged();
            }
        );
        /**
         * @language en_US
         * Update the view when the <code>data</code> property changes.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.dataChanged = function () {
        };
        d(p, "selected"
            /**
             * @language en_US
             * Contains <code>true</code> if the item renderer
             * can show itself as selected.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????? true???
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._selected;
            }
            ,function (value) {
                if (this._selected == value)
                    return;
                this._selected = value;
                this.invalidateState();
            }
        );
        /**
         * @language en_US
         * Dispatched when an event of some kind occurred that canceled the touch.
         * @version Egret 3.0.1
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????
         * @version Egret 3.0.1
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onTouchCancle = function (event) {
            this.touchCaptured = false;
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.invalidateState();
        };
        /**
         * @language en_US
         * Handles <code>TouchEvent.TOUCH_BEGIN</code> events
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onTouchBegin = function (event) {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.touchCaptured = true;
            this.invalidateState();
            event.updateAfterEvent();
        };
        /**
         * @private
         * ???????????????????????????
         */
        p.onStageTouchEnd = function (event) {
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.touchCaptured = false;
            this.invalidateState();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getCurrentState = function () {
            var state = "up";
            if (this.touchCaptured) {
                state = "down";
            }
            if (this._selected) {
                var selectedState = state + "AndSelected";
                var skin = this.skin;
                if (skin && skin.hasState(selectedState)) {
                    return selectedState;
                }
                return state == "disabled" ? "disabled" : "down";
            }
            return state;
        };
        return ItemRenderer;
    }(eui.Component));
    eui.ItemRenderer = ItemRenderer;
    egret.registerClass(ItemRenderer,'eui.ItemRenderer',["eui.IItemRenderer","eui.UIComponent"]);
    eui.registerBindable(ItemRenderer.prototype, "data");
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var UIImpl = eui.sys.UIComponentImpl;
    /**
     * @language en_US
     * Label is an UIComponent that can render one or more lines of text.
     * The text to be displayed is determined by the <code>text</code> property.
     * The formatting of the text is specified by the styles???
     * such as <code>fontFamily</code> and <code>size</code>.
     *
     * <p>Because Label is fast and lightweight, it is especially suitable
     * for use cases that involve rendering many small pieces of non-interactive
     * text, such as item renderers and labels in Button skins.</p>
     *
     * <p>In Label, three character sequences are recognized
     * as explicit line breaks: CR (<code>"\r"</code>), LF (<code>"\n"</code>),
     * and CR+LF (<code>"\r\n"</code>).</p>
     *
     * <p>If you don't specify any kind of width for a Label,
     * then the longest line, as determined by these explicit line breaks,
     * determines the width of the Label.</p>
     *
     * <p>If you do specify some kind of width, then the specified text is
     * word-wrapped at the right edge of the component's bounds.
     * If the text extends below the bottom of the component,
     * it is clipped.</p>
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/LabelExample.ts
     */
    /**
     * @language zh_CN
     * Label ???????????????????????????????????????????????????UI?????????????????????????????? text ????????????????????????????????????????????????????????? fontFamily ??? size???
     * ?????? Label ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? Button ?????????????????????
     * ??? Label ????????????????????????????????????????????????????????????CR??????\r?????????LF??????\n????????? CR+LF??????\r\n?????????
     * ??????????????? Label ?????????????????????????????????????????????????????????????????? Label ????????????
     * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/LabelExample.ts
     */
    var Label = (function (_super) {
        __extends(Label, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @param text The text displayed by this text component.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @param text ????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function Label(text) {
            _super.call(this);
            this.$style = null;
            /**
             * @private
             */
            this._widthConstraint = NaN;
            this.initializeUIValues();
            this.text = text;
        }
        var d = __define,c=Label,p=c.prototype;
        d(p, "style"
            /**
             * @language en_US
             * Horizontal alignment of text.
             * @default???egret.HorizontalAlign.LEFT
             * @version Egret 2.4
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????
             * @default???egret.HorizontalAlign.LEFT
             * @version Egret 2.4
             * @platform Web,Native
             */
            ,function () {
                return this.$style;
            }
            ,function (value) {
                this.$setStyle(value);
            }
        );
        p.$setStyle = function (value) {
            if (this.$style == value) {
                return;
            }
            var theme = egret.getImplementation("eui.Theme");
            if (theme) {
                var config = theme.$getStyleConfig(value);
                if (config) {
                    for (var key in config) {
                        this[key] = config[key];
                    }
                }
            }
        };
        /**
         * @private
         *
         */
        p.$invalidateContentBounds = function () {
            _super.prototype.$invalidateContentBounds.call(this);
            this.invalidateSize();
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setWidth = function (value) {
            var result1 = _super.prototype.$setWidth.call(this, value);
            var result2 = UIImpl.prototype.$setWidth.call(this, value);
            return result1 && result2;
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setHeight = function (value) {
            var result1 = _super.prototype.$setHeight.call(this, value);
            var result2 = UIImpl.prototype.$setHeight.call(this, value);
            return result1 && result2;
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setText = function (value) {
            var result = _super.prototype.$setText.call(this, value);
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "text");
            return result;
        };
        /**
         * @copy eui.UIComponent#createChildren
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.createChildren = function () {
        };
        /**
         * @copy eui.UIComponent#childrenCreated
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.childrenCreated = function () {
        };
        /**
         * @copy eui.UIComponent#commitProperties
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitProperties = function () {
        };
        /**
         * @copy eui.UIComponent#measure
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measure = function () {
            var values = this.$UIComponent;
            var textValues = this.$TextField;
            var oldWidth = textValues[3 /* textFieldWidth */];
            var availableWidth = NaN;
            if (!isNaN(this._widthConstraint)) {
                availableWidth = this._widthConstraint;
                this._widthConstraint = NaN;
            }
            else if (!isNaN(values[8 /* explicitWidth */])) {
                availableWidth = values[8 /* explicitWidth */];
            }
            else if (values[13 /* maxWidth */] != 100000) {
                availableWidth = values[13 /* maxWidth */];
            }
            _super.prototype.$setWidth.call(this, availableWidth);
            this.setMeasuredSize(this.textWidth, this.textHeight);
            _super.prototype.$setWidth.call(this, oldWidth);
        };
        /**
         * @copy eui.UIComponent#updateDisplayList
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.$setWidth.call(this, unscaledWidth);
            _super.prototype.$setHeight.call(this, unscaledHeight);
        };
        /**
         * @copy eui.UIComponent#invalidateParentLayout
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateParentLayout = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setMeasuredSize = function (width, height) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateSize = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateSize = function (recursive) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.validateNow = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
            UIImpl.prototype.setLayoutBoundsSize.call(this, layoutWidth, layoutHeight);
            if (isNaN(layoutWidth) || layoutWidth === this._widthConstraint || layoutWidth == 0) {
                this._widthConstraint = layoutWidth;
                return;
            }
            this._widthConstraint = layoutWidth;
            var values = this.$UIComponent;
            if (!isNaN(values[9 /* explicitHeight */])) {
                return;
            }
            if (layoutWidth == values[16 /* measuredWidth */]) {
                return;
            }
            this.invalidateSize();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getLayoutBounds = function (bounds) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getPreferredBounds = function (bounds) {
        };
        return Label;
    }(egret.TextField));
    eui.Label = Label;
    egret.registerClass(Label,'eui.Label',["eui.UIComponent","eui.IDisplayText"]);
    eui.sys.implementUIComponent(Label, egret.TextField);
    eui.registerBindable(Label.prototype, "text");
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The ListBase class is the base class for list component.
     * It can display items of list as vertical or horizontal such as SELECT of HTML.
     * @event egret.Event.CHANGE Dispatched after the selection has changed.
     * This event is dispatched when the user interacts with the control.
     * @event egret.Event.CHANGING Dispatched when the selection is going to change.
     * Calling the <code>preventDefault()</code> method
     * on the event prevents the selection from changing.<p/>
     * This event is dispatched when the user interacts with the control.
     *
     * @event eui.ItemTapEvent.ITEM_TAP dispatched when the user tap an item in the control.
     * @event egret.TouchEvent.TOUCH_CANCEL canceled the touch
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ListBase ?????????????????????????????????????????????????????????????????????????????? HTML ?????? SELECT ??????????????????????????????
     * @event egret.Event.CHANGE ?????????????????????????????????,?????????????????????????????????????????????????????????????????????????????????
     * @event egret.Event.CHANGING ????????????????????????????????????????????????????????????????????? preventDefault() ????????????????????????<p/>
     * ?????????????????????????????????????????????????????????????????????????????????
     *
     * @event eui.ItemTapEvent.ITEM_TAP ???????????????????????????
     * @event egret.TouchEvent.TOUCH_CANCEL ??????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var ListBase = (function (_super) {
        __extends(ListBase, _super);
        /**
         * @language en_US
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function ListBase() {
            _super.call(this);
            this.$ListBase = {
                0: false,
                1: false,
                2: -2,
                3: -1,
                4: false,
                5: undefined,
                6: false,
                7: null,
                8: false //touchCancle
            };
        }
        var d = __define,c=ListBase,p=c.prototype;
        d(p, "requireSelection"
            /**
             * @language en_US
             * If <code>true</code>, a data item must always be selected in the control.
             * If the value is <code>true</code>, the <code>selectedIndex</code> property
             * is always set to a value between 0 and (<code>dataProvider.length</code> - 1).
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????? true???????????????????????????????????????????????????
             * ??????????????? true??????????????? selectedIndex ??????????????? 0 ??? (dataProvider.length - 1) ?????????????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$ListBase[0 /* requireSelection */];
            }
            ,function (value) {
                value = !!value;
                var values = this.$ListBase;
                if (value === values[0 /* requireSelection */]) {
                    return;
                }
                values[0 /* requireSelection */] = value;
                if (value) {
                    values[1 /* requireSelectionChanged */] = true;
                    this.invalidateProperties();
                }
            }
        );
        d(p, "selectedIndex"
            /**
             * @language en_US
             * he 0-based index of the selected item, or -1 if no item is selected.
             * Setting the <code>selectedIndex</code> property deselects the currently selected
             * item and selects the data item at the specified index.<p/>
             *
             * The value is always between -1 and (<code>dataProvider.length</code> - 1).
             * If items at a lower index than <code>selectedIndex</code> are
             * removed from the component, the selected index is adjusted downward
             * accordingly. <p/>
             *
             * If the selected item is removed, the selected index is set to:<p/>
             *
             * <ul>
             *   <li>-1 if <code>requireSelection == false</code> or there are no remaining items.</li>
             *   <li>0 if <code>requireSelection == true</code> and there is at least one item.</li>
             * </ul><p/>
             *
             * When the user changes the <code>selectedIndex</code> property by interacting with the control,
             * the control dispatches the <code>change</code> and <code>changing</code> events.
             * When you change the value of the <code>selectedIndex</code> property programmatically,
             * it does not dispatches the <code>change</code> and <code>changing</code> events.</p>
             *
             * @default -1
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????? 0 ????????????
             * ????????????????????????????????????-1????????? selectedIndex ???????????????????????????????????????????????????????????????????????????????????????<p/>
             *
             * ?????????????????????-1???<code>(dataProvider.length - 1)</code>????????????????????????????????????????????????
             * <code>selectedIndex</code>????????????<code>selectedIndex</code>???????????????????????????????????????<p/>
             *
             * ????????????????????????????????????????????????????????????<p/>
             *
             * <ul>
             *    <li>-1: ?????? <code>requireSelection == false</code> ?????????????????????????????????</li>
             *    <li> 0: ?????? <code>requireSelection == true</code> ?????????????????????????????????????????????</li>
             * </ul><p/>
             * ??????????????????????????????????????? selectedIndex ?????????????????????????????? change ??? changing ?????????
             * ???????????????????????? selectedIndex ???????????????????????????????????? change ??? changing ?????????
             *
             * @default -1
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$getSelectedIndex();
            }
            ,function (value) {
                value = +value | 0;
                this.setSelectedIndex(value, false);
            }
        );
        /**
         * @private
         *
         * @returns
         */
        p.$getSelectedIndex = function () {
            var values = this.$ListBase;
            if (values[2 /* proposedSelectedIndex */] != ListBase.NO_PROPOSED_SELECTION)
                return values[2 /* proposedSelectedIndex */];
            return values[3 /* selectedIndex */];
        };
        /**
         * @language en_US
         * Used internally to specify whether the selectedIndex changed programmatically or due to
         * user interaction.
         * @param value the new index need to select.
         * @param dispatchChangeEvent if true, the component will dispatch a "change" event if the
         * value has changed.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????
         * @param value ????????????
         * @param dispatchChangeEvent ??????????????????????????????????????????true????????????????????????????????????change????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setSelectedIndex = function (value, dispatchChangeEvent) {
            if (value == this.selectedIndex) {
                return;
            }
            var values = this.$ListBase;
            if (dispatchChangeEvent)
                values[4 /* dispatchChangeAfterSelection */] =
                    (values[4 /* dispatchChangeAfterSelection */] || dispatchChangeEvent);
            values[2 /* proposedSelectedIndex */] = value;
            this.invalidateProperties();
        };
        d(p, "selectedItem"
            /**
             * @language en_US
             * The item that is currently selected.
             * Setting this property deselects the currently selected
             * item and selects the newly specified item.<p/>
             *
             * Setting <code>selectedItem</code> to an item that is not
             * in this component results in no selection,
             * and <code>selectedItem</code> being set to <code>undefined</code>.<p/>
             *
             * If the selected item is removed, the selected item is set to:<p/>
             * <ul>
             *   <li><code>undefined</code> if <code>requireSelection == false</code>
             *     or there are no remaining items.</li>
             *   <li>The first item if <code>requireSelection</code> = <code>true</code>
             *     and there is at least one item.</li>
             * </ul><p/>
             *
             * When the user changes the <code>selectedItem</code> property by interacting with the control,
             * the control dispatches the <code>change</code> and <code>changing</code> events.
             * When you change the value of the <code>selectedIndex</code> property programmatically,
             * it does not dispatches the <code>change</code> and <code>changing</code> events.</p>
             *
             * @default undefined
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????????????????????????????????????????????????????????????????<p/>
             *
             * ???????????????<code>selectedItem</code>???????????????????????????<code>selectedItem</code>????????????
             * ???<code>undefined</code>???<p/>
             *
             * ????????????????????????????????????????????????????????????<p/>
             * <ul>
             *   <li><code>undefined</code>: ?????? <code>requireSelection == false</code>
             *     ??????????????????????????????</li>
             *   <li>?????????: ??? <code>requireSelection == true</code>
             *     ????????????????????????????????????.</li>
             * </ul><p/>
             *
             * ??????????????????????????????????????? selectedItem ?????????????????????????????? change ??? changing ?????????
             * ???????????????????????? selectedItem ???????????????????????????????????? change ??? changing ?????????<p/>
             *
             * @default undefined
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                var values = this.$ListBase;
                if (values[5 /* pendingSelectedItem */] !== undefined)
                    return values[5 /* pendingSelectedItem */];
                var selectedIndex = this.$getSelectedIndex();
                if (selectedIndex == ListBase.NO_SELECTION || this.$dataProvider == null)
                    return undefined;
                return this.$dataProvider.length > selectedIndex ? this.$dataProvider.getItemAt(selectedIndex) : undefined;
            }
            ,function (value) {
                this.setSelectedItem(value, false);
            }
        );
        /**
         * @language en_US
         * Used internally to specify whether the selectedItem changed programmatically or due to
         * user interaction.
         * @param value the new item need to select.
         * @param dispatchChangeEvent if true, the component will dispatch a "change" event if the
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????
         * @param value ??????????????????
         * @param dispatchChangeEvent ??????????????????????????????????????????true????????????????????????????????????change????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setSelectedItem = function (value, dispatchChangeEvent) {
            if (dispatchChangeEvent === void 0) { dispatchChangeEvent = false; }
            if (this.selectedItem === value)
                return;
            var values = this.$ListBase;
            if (dispatchChangeEvent)
                values[4 /* dispatchChangeAfterSelection */] =
                    (values[4 /* dispatchChangeAfterSelection */] || dispatchChangeEvent);
            values[5 /* pendingSelectedItem */] = value;
            this.invalidateProperties();
        };
        /**
         * @language en_US
         * Processes the properties set on the component.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitProperties = function () {
            var dataProviderChanged = this.$dataProviderChanged;
            _super.prototype.commitProperties.call(this);
            var values = this.$ListBase;
            var selectedIndex = this.$getSelectedIndex();
            var dataProvider = this.$dataProvider;
            if (dataProviderChanged) {
                if (selectedIndex >= 0 && dataProvider && selectedIndex < dataProvider.length)
                    this.itemSelected(selectedIndex, true);
                else if (this.requireSelection)
                    values[2 /* proposedSelectedIndex */] = 0;
                else
                    this.setSelectedIndex(-1, false);
            }
            if (values[1 /* requireSelectionChanged */]) {
                values[1 /* requireSelectionChanged */] = false;
                if (values[0 /* requireSelection */] &&
                    selectedIndex == ListBase.NO_SELECTION &&
                    dataProvider &&
                    dataProvider.length > 0) {
                    values[2 /* proposedSelectedIndex */] = 0;
                }
            }
            if (values[5 /* pendingSelectedItem */] !== undefined) {
                if (dataProvider)
                    values[2 /* proposedSelectedIndex */] =
                        dataProvider.getItemIndex(values[5 /* pendingSelectedItem */]);
                else
                    values[2 /* proposedSelectedIndex */] = ListBase.NO_SELECTION;
                values[5 /* pendingSelectedItem */] = undefined;
            }
            var changedSelection = false;
            if (values[2 /* proposedSelectedIndex */] != ListBase.NO_PROPOSED_SELECTION)
                changedSelection = this.commitSelection();
            if (values[6 /* selectedIndexAdjusted */]) {
                values[6 /* selectedIndexAdjusted */] = false;
                if (!changedSelection) {
                    eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "selectedIndex");
                }
            }
        };
        /**
         * @language en_US
         * Updates an item renderer for use or reuse.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateRenderer = function (renderer, itemIndex, data) {
            this.itemSelected(itemIndex, this.$isItemIndexSelected(itemIndex));
            return _super.prototype.updateRenderer.call(this, renderer, itemIndex, data);
        };
        /**
         * @language en_US
         * Called when an item is selected or deselected.
         * Subclasses must override this method to display the selection.
         * @param index The item index that was selected.
         * @param selected <code>true</code> if the item is selected,
         * and <code>false</code> if it is deselected.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????
         * @param index ???????????????????????????
         * @param selected <code>true</code>????????????<code>false</code>????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.itemSelected = function (index, selected) {
            var renderer = this.$indexToRenderer[index];
            if (renderer) {
                renderer.selected = selected;
            }
        };
        /**
         * @private
         * ????????????????????????????????????????????????
         */
        p.$isItemIndexSelected = function (index) {
            return index == this.selectedIndex;
        };
        /**
         * @language en_US
         * The selection validation and commitment workhorse method.
         * Called to commit the pending selected index. This method dispatches
         * the "changing" event, and if the event is not cancelled,
         * commits the selection change and then dispatches the "change"
         * event.
         * @param dispatchChangedEvents if dispatch a "changed" event.
         * @return true if the selection was committed, or false if the selection
         * was cancelled.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????changing?????????????????????????????????????????????
         * ??????????????????????????????????????????????????????change????????????
         * @param dispatchChangedEvents ?????????????????????changed????????????
         * @return true ??????????????????, false???????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitSelection = function (dispatchChangedEvents) {
            if (dispatchChangedEvents === void 0) { dispatchChangedEvents = true; }
            var dataProvider = this.$dataProvider;
            var values = this.$ListBase;
            var maxIndex = dataProvider ? dataProvider.length - 1 : -1;
            var oldSelectedIndex = values[3 /* selectedIndex */];
            var tmpProposedIndex = values[2 /* proposedSelectedIndex */];
            if (tmpProposedIndex < ListBase.NO_SELECTION)
                tmpProposedIndex = ListBase.NO_SELECTION;
            if (tmpProposedIndex > maxIndex)
                tmpProposedIndex = maxIndex;
            if (values[0 /* requireSelection */] && tmpProposedIndex == ListBase.NO_SELECTION &&
                dataProvider && dataProvider.length > 0) {
                values[2 /* proposedSelectedIndex */] = ListBase.NO_PROPOSED_SELECTION;
                values[4 /* dispatchChangeAfterSelection */] = false;
                return false;
            }
            if (values[4 /* dispatchChangeAfterSelection */]) {
                var result = this.dispatchEventWith(egret.Event.CHANGING, false, true, true);
                if (!result) {
                    this.itemSelected(values[2 /* proposedSelectedIndex */], false);
                    values[2 /* proposedSelectedIndex */] = ListBase.NO_PROPOSED_SELECTION;
                    values[4 /* dispatchChangeAfterSelection */] = false;
                    return false;
                }
            }
            values[3 /* selectedIndex */] = tmpProposedIndex;
            values[2 /* proposedSelectedIndex */] = ListBase.NO_PROPOSED_SELECTION;
            if (oldSelectedIndex != ListBase.NO_SELECTION)
                this.itemSelected(oldSelectedIndex, false);
            if (values[3 /* selectedIndex */] != ListBase.NO_SELECTION)
                this.itemSelected(values[3 /* selectedIndex */], true);
            //???????????????????????????Change????????????????????????????????????????????????dispatchChangedEvents???false
            if (dispatchChangedEvents) {
                if (values[4 /* dispatchChangeAfterSelection */]) {
                    this.dispatchEventWith(egret.Event.CHANGE);
                    values[4 /* dispatchChangeAfterSelection */] = false;
                }
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "selectedIndex");
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "selectedItem");
            }
            return true;
        };
        /**
         * @language en_US
         * Adjusts the selected index to account for items being added to or
         * removed from this component.
         * It does not dispatch a <code>change</code> event because the change did not
         * occur as a direct result of user-interaction.  Moreover,
         * it does not dispatch a <code>changing</code> event
         * or allow the cancellation of the selection.
         * It also does not call the <code>itemSelected()</code> method,
         * since the same item is selected;
         * @param newIndex The new index.
         * @param add <code>true</code> if an item was added to the component,
         *  and <code>false</code> if an item was removed.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????,????????????????????????itemSelected???????????????????????????????????????changing???change?????????
         * @param newIndex ????????????
         * @param add ??????????????????????????????????????????<code>true</code>?????????????????????????????????<code>false</code>???
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.adjustSelection = function (newIndex, add) {
            if (add === void 0) { add = false; }
            var values = this.$ListBase;
            if (values[2 /* proposedSelectedIndex */] != ListBase.NO_PROPOSED_SELECTION)
                values[2 /* proposedSelectedIndex */] = newIndex;
            else
                values[3 /* selectedIndex */] = newIndex;
            values[6 /* selectedIndexAdjusted */] = true;
            this.invalidateProperties();
        };
        /**
         * @language en_US
         * Called when an item has been added to this component. Selection
         * and caret related properties are adjusted accordingly.
         * @param item The item being added.
         * @param index The index of the item being added.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         * @param item ??????????????????
         * @param index ???????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.itemAdded = function (item, index) {
            _super.prototype.itemAdded.call(this, item, index);
            var selectedIndex = this.$getSelectedIndex();
            if (selectedIndex == ListBase.NO_SELECTION) {
                if (this.$ListBase[0 /* requireSelection */])
                    this.adjustSelection(index, true);
            }
            else if (index <= selectedIndex) {
                this.adjustSelection(selectedIndex + 1, true);
            }
        };
        /**
         * @language en_US
         * Called when an item has been removed from this component.
         * Selection and caret related properties are adjusted
         * accordingly.
         * @param item The item being removed.
         * @param index The index of the item being removed.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         * @param item ??????????????????
         * @param index ???????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.itemRemoved = function (item, index) {
            _super.prototype.itemRemoved.call(this, item, index);
            if (this.selectedIndex == ListBase.NO_SELECTION)
                return;
            var selectedIndex = this.$getSelectedIndex();
            if (index == selectedIndex) {
                if (this.requireSelection && this.$dataProvider && this.$dataProvider.length > 0) {
                    if (index == 0) {
                        this.$ListBase[2 /* proposedSelectedIndex */] = 0;
                        this.invalidateProperties();
                    }
                    else
                        this.setSelectedIndex(0, false);
                }
                else
                    this.adjustSelection(-1, false);
            }
            else if (index < selectedIndex) {
                this.adjustSelection(selectedIndex - 1, false);
            }
        };
        /**
         * @language en_US
         * Event Listener of source data changed.
         * @param The <code>egret.gui.CollectionEvent</code> object.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????
         * @param event ?????? <code>egret.gui.CollectionEvent</code> ????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onCollectionChange = function (event) {
            _super.prototype.onCollectionChange.call(this, event);
            if (event.kind == eui.CollectionEventKind.RESET) {
                if (this.$dataProvider.length == 0) {
                    this.setSelectedIndex(ListBase.NO_SELECTION, false);
                }
            }
            else if (event.kind == eui.CollectionEventKind.REFRESH) {
                this.dataProviderRefreshed();
            }
        };
        /**
         * @language en_US
         * Default response to dataProvider refresh events: clear the selection and caret.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.dataProviderRefreshed = function () {
            this.setSelectedIndex(ListBase.NO_SELECTION, false);
        };
        /**
         * @language en_US
         * Called when an item has been added to this component.
         * @param renderer the renderer being added.
         * @param index the index of renderer
         * @param item the data of renderer
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         * @param renderer ?????????????????????
         * @param index ?????????????????????
         * @param item ???????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.rendererAdded = function (renderer, index, item) {
            renderer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRendererTouchBegin, this);
            renderer.addEventListener(egret.TouchEvent.TOUCH_END, this.onRendererTouchEnd, this);
            renderer.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onRendererTouchCancle, this);
        };
        /**
         * @language en_US
         * Called when an item has been removed to this component.
         * @param renderer the renderer being removed.
         * @param index the index of renderer.
         * @param item the data of renderer.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         * @param renderer ?????????????????????
         * @param index ?????????????????????
         * @param item ???????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.rendererRemoved = function (renderer, index, item) {
            renderer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRendererTouchBegin, this);
            renderer.removeEventListener(egret.TouchEvent.TOUCH_END, this.onRendererTouchEnd, this);
            renderer.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onRendererTouchCancle, this);
        };
        /**
         * @language en_US
         * Handles <code>egret.TouchEvent.TOUCH_BEGIN</code> events from any of the
         * item renderers. This method handles <code>egret.TouchEvent.TOUCH_END</code>.
         * @param event The <code>egret.TouchEvent</code> object.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????<code>egret.TouchEvent.TOUCH_BEGIN</code>??????????????????????????????????????????<code>egret.TouchEvent.TOUCH_END</code>
         * ??????????????????
         * @param event ??????<code>egret.TouchEvent</code>????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onRendererTouchBegin = function (event) {
            var values = this.$ListBase;
            if (event.$isDefaultPrevented)
                return;
            values[8 /* touchCancle */] = false;
            values[7 /* touchDownItemRenderer */] = (event.$currentTarget);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this);
        };
        /**
         * @language en_US
         * Handles <code>egret.TouchEvent.TOUCH_CANCEL</code> events from any of the
         * item renderers. This method will cancel the handles <code>egret.TouchEvent.TOUCH_END</code> and <code>egret.TouchEvent.TOUCH_TAP</code>.
         * @param event The <code>egret.TouchEvent</code> object.
         * @version Egret 3.0.1
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????<code>egret.TouchEvent.TOUCH_CANCEL</code>?????????????????????????????????????????????<code>egret.TouchEvent.TOUCH_END</code>
         * ???<code>egret.TouchEvent.TOUCH_TAP</code>??????????????????
         * @param event ??????<code>egret.TouchEvent</code>????????????
         * @version Egret 3.0.1
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onRendererTouchCancle = function (event) {
            var values = this.$ListBase;
            values[7 /* touchDownItemRenderer */] = null;
            values[8 /* touchCancle */] = true;
            if (this.$stage) {
                this.$stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this);
            }
        };
        /**
         * @language en_US
         * Handles <code>egret.TouchEvent.TOUCH_END</code> events and dispatch <code>ItemTapEvent.ITEM_TAP</code> event.
         * @param event The <code>egret.TouchEvent</code> object.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????<code>ItemTapEvent.ITEM_TAP</code>?????????
         * @param event ??????<code>egret.TouchEvent</code>????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onRendererTouchEnd = function (event) {
            var values = this.$ListBase;
            var itemRenderer = (event.$currentTarget);
            var touchDownItemRenderer = values[7 /* touchDownItemRenderer */];
            if (itemRenderer != touchDownItemRenderer)
                return;
            if (!values[8 /* touchCancle */]) {
                this.setSelectedIndex(itemRenderer.itemIndex, true);
                eui.ItemTapEvent.dispatchItemTapEvent(this, eui.ItemTapEvent.ITEM_TAP, itemRenderer);
            }
            values[8 /* touchCancle */] = false;
        };
        /**
         * @private
         * ????????????????????????
         */
        p.stage_touchEndHandler = function (event) {
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this);
            this.$ListBase[7 /* touchDownItemRenderer */] = null;
        };
        /**
         * @language en_US
         * Static constant representing the value "no selection".
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        ListBase.NO_SELECTION = -1;
        /**
         * @language en_US
         * Static constant representing no proposed selection.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        ListBase.NO_PROPOSED_SELECTION = -2;
        return ListBase;
    }(eui.DataGroup));
    eui.ListBase = ListBase;
    egret.registerClass(ListBase,'eui.ListBase');
    eui.registerBindable(ListBase.prototype, "selectedIndex");
    eui.registerBindable(ListBase.prototype, "selectedItem");
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The List control displays a vertical or horizontal list of items.
     * The user can select one or more items from the list, depending
     * on the value of the <code>allowMultipleSelection</code> property.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ListExample.ts
     */
    /**
     * @language zh_CN
     * List ?????????????????????????????????????????????????????????????????? <code>allowMultipleSelection</code> ??????????????????????????????????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ListExample.ts
     */
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            var _this = this;
            _super.apply(this, arguments);
            /**
             * @language en_US
             * whether are allowed to multiple selection.
             * If <code>true</code> tap an unselected item will be selected,
             * and tap the item again will cancel selection.
             *
             * @default false
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????,????????? <code>true</code> ?????????????????????????????????????????????????????????????????????????????????????????????????????????
             * ????????????????????????????????????
             *
             * @default false
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.allowMultipleSelection = false;
            /**
             * @private
             */
            this._selectedIndices = [];
            /**
             * @private
             * ????????????????????????
             */
            this.isValidIndex = function (item, index, v) {
                return _this.$dataProvider && (item >= 0) && (item < _this.$dataProvider.length) && item % 1 == 0;
            };
        }
        var d = __define,c=List,p=c.prototype;
        d(p, "selectedIndices"
            /**
             * @language en_US
             * An Array of numbers representing the indices of the currently selected
             * item or items.
             *
             * @default []
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????
             *
             * @default []
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (this._proposedSelectedIndices)
                    return this._proposedSelectedIndices;
                return this._selectedIndices;
            }
            ,function (value) {
                this.setSelectedIndices(value, false);
            }
        );
        d(p, "selectedIndex"
            /**
             * @inheritDoc
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (this._proposedSelectedIndices) {
                    if (this._proposedSelectedIndices.length > 0)
                        return this._proposedSelectedIndices[0];
                    return -1;
                }
                return this.$getSelectedIndex();
            }
            ,function (value) {
                this.setSelectedIndex(value);
            }
        );
        d(p, "selectedItems"
            /**
             * @language en_US
             * An Array representing the currently selected data items.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                var result = [];
                var list = this.selectedIndices;
                if (list) {
                    var count = list.length;
                    for (var i = 0; i < count; i++) {
                        result[i] = this.$dataProvider.getItemAt(list[i]);
                    }
                }
                return result;
            }
            ,function (value) {
                var indices = [];
                if (value) {
                    var count = value.length;
                    for (var i = 0; i < count; i++) {
                        var index = this.$dataProvider.getItemIndex(value[i]);
                        if (index != -1) {
                            indices.splice(0, 0, index);
                        }
                        if (index == -1) {
                            indices = [];
                            break;
                        }
                    }
                }
                this.setSelectedIndices(indices, false);
            }
        );
        /**
         * @language en_US
         * Specify whether the selectedIndices changed programmatically or due to
         * user interaction.
         *
         * @param value An array of numbers representing the indices of the selected
         * @param dispatchChangeEvent whether dispatched a change event.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         *
         * @param value ????????????????????????
         * @param dispatchChangeEvent ????????????changed??????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setSelectedIndices = function (value, dispatchChangeEvent) {
            var values = this.$ListBase;
            if (dispatchChangeEvent)
                values[4 /* dispatchChangeAfterSelection */] =
                    (values[4 /* dispatchChangeAfterSelection */] || dispatchChangeEvent);
            if (value)
                this._proposedSelectedIndices = value;
            else
                this._proposedSelectedIndices = [];
            this.invalidateProperties();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this._proposedSelectedIndices) {
                this.commitSelection();
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitSelection = function (dispatchChangedEvents) {
            if (dispatchChangedEvents === void 0) { dispatchChangedEvents = true; }
            var values = this.$ListBase;
            var oldSelectedIndex = values[3 /* selectedIndex */];
            if (this._proposedSelectedIndices) {
                this._proposedSelectedIndices = this._proposedSelectedIndices.filter(this.isValidIndex);
                if (!this.allowMultipleSelection && this._proposedSelectedIndices.length > 0) {
                    var temp = [];
                    temp.push(this._proposedSelectedIndices[0]);
                    this._proposedSelectedIndices = temp;
                }
                if (this._proposedSelectedIndices.length > 0) {
                    values[2 /* proposedSelectedIndex */] = this._proposedSelectedIndices[0];
                }
                else {
                    values[2 /* proposedSelectedIndex */] = -1;
                }
            }
            var retVal = _super.prototype.commitSelection.call(this, false);
            if (!retVal) {
                this._proposedSelectedIndices = null;
                return false;
            }
            var selectedIndex = this.$getSelectedIndex();
            if (selectedIndex > eui.ListBase.NO_SELECTION) {
                if (this._proposedSelectedIndices) {
                    if (this._proposedSelectedIndices.indexOf(selectedIndex) == -1)
                        this._proposedSelectedIndices.push(selectedIndex);
                }
                else {
                    this._proposedSelectedIndices = [selectedIndex];
                }
            }
            if (this._proposedSelectedIndices) {
                if (this._proposedSelectedIndices.indexOf(oldSelectedIndex) != -1)
                    this.itemSelected(oldSelectedIndex, true);
                this.commitMultipleSelection();
            }
            if (dispatchChangedEvents && retVal) {
                if (values[4 /* dispatchChangeAfterSelection */]) {
                    this.dispatchEventWith(egret.Event.CHANGE);
                    values[4 /* dispatchChangeAfterSelection */] = false;
                }
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "selectedIndex");
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "selectedItem");
            }
            return retVal;
        };
        /**
         * @language en_US
         * Given a new selection interval, figure out which
         * items are newly added/removed from the selection interval and update
         * selection properties and view accordingly.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitMultipleSelection = function () {
            var removedItems = [];
            var addedItems = [];
            var i;
            var count;
            var selectedIndices = this._selectedIndices;
            var proposedSelectedIndices = this._proposedSelectedIndices;
            if (selectedIndices.length > 0 && proposedSelectedIndices.length > 0) {
                count = proposedSelectedIndices.length;
                for (i = 0; i < count; i++) {
                    if (selectedIndices.indexOf(proposedSelectedIndices[i]) == -1)
                        addedItems.push(proposedSelectedIndices[i]);
                }
                count = selectedIndices.length;
                for (i = 0; i < count; i++) {
                    if (proposedSelectedIndices.indexOf(selectedIndices[i]) == -1)
                        removedItems.push(selectedIndices[i]);
                }
            }
            else if (selectedIndices.length > 0) {
                removedItems = selectedIndices;
            }
            else if (proposedSelectedIndices.length > 0) {
                addedItems = proposedSelectedIndices;
            }
            this._selectedIndices = proposedSelectedIndices;
            if (removedItems.length > 0) {
                count = removedItems.length;
                for (i = 0; i < count; i++) {
                    this.itemSelected(removedItems[i], false);
                }
            }
            if (addedItems.length > 0) {
                count = addedItems.length;
                for (i = 0; i < count; i++) {
                    this.itemSelected(addedItems[i], true);
                }
            }
            this._proposedSelectedIndices = null;
        };
        /**
         * @private
         *
         * @param index
         * @returns
         */
        p.$isItemIndexSelected = function (index) {
            if (this.allowMultipleSelection)
                return this._selectedIndices.indexOf(index) != -1;
            return _super.prototype.$isItemIndexSelected.call(this, index);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.dataProviderRefreshed = function () {
            if (this.allowMultipleSelection) {
                return;
            }
            _super.prototype.dataProviderRefreshed.call(this);
        };
        /**
         * @private
         * ??????????????????????????????
         */
        p.calculateSelectedIndices = function (index) {
            var interval = [];
            var selectedIndices = this._selectedIndices;
            var length = selectedIndices.length;
            if (length > 0) {
                if (length == 1 && (selectedIndices[0] == index)) {
                    if (!this.$ListBase[0 /* requireSelection */]) {
                        return interval;
                    }
                    interval.splice(0, 0, selectedIndices[0]);
                    return interval;
                }
                else {
                    var found = false;
                    for (var i = 0; i < length; i++) {
                        if (selectedIndices[i] == index) {
                            found = true;
                        }
                        else if (selectedIndices[i] != index) {
                            interval.splice(0, 0, selectedIndices[i]);
                        }
                    }
                    if (!found) {
                        interval.splice(0, 0, index);
                    }
                    return interval;
                }
            }
            else {
                interval.splice(0, 0, index);
                return interval;
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onRendererTouchEnd = function (event) {
            if (this.allowMultipleSelection) {
                var itemRenderer = (event.currentTarget);
                var touchDownItemRenderer = this.$ListBase[7 /* touchDownItemRenderer */];
                if (itemRenderer != touchDownItemRenderer)
                    return;
                this.setSelectedIndices(this.calculateSelectedIndices(itemRenderer.itemIndex), true);
                eui.ItemTapEvent.dispatchItemTapEvent(this, eui.ItemTapEvent.ITEM_TAP, itemRenderer);
            }
            else {
                _super.prototype.onRendererTouchEnd.call(this, event);
            }
        };
        return List;
    }(eui.ListBase));
    eui.List = List;
    egret.registerClass(List,'eui.List');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The Panel class defines a container that includes a title bar,
     * a closeButton, a moveArea, and a content area for its children.
     *
     * @event eui.UIEvent.CLOSING Dispatched when the close button is taped
     * you can use <code>event.preventDefault()</code> to prevent close.
     *
     * @defaultProperty elementsContent
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/PanelExample.ts
     */
    /**
     * @language zh_CN
     * Panel ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
     *
     * @event eui.UIEvent.CLOSING ???????????????????????????????????????????????????????????????
     * ????????????????????????<code>event.preventDefault()</code>??????????????????????????????
     *
     * @defaultProperty elementsContent
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/PanelExample.ts
     */
    var Panel = (function (_super) {
        __extends(Panel, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function Panel() {
            _super.call(this);
            /**
             * @language en_US
             * The skin part that defines the appearance of the close button.
             * When taped, the close button dispatches a <code>closing</code> event.
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.closeButton = null;
            /**
             * @language en_US
             * The area where the user must drag to move the window.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.moveArea = null;
            /**
             * @language en_US
             * The skin part that defines the appearance of the
             * title text in the container.
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.titleDisplay = null;
            /**
             * @private
             */
            this._title = "";
            /**
             * @private
             * ???????????????????????????
             */
            this.offsetPointX = 0;
            /**
             * @private
             */
            this.offsetPointY = 0;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onWindowTouchBegin, this, false, 100);
        }
        var d = __define,c=Panel,p=c.prototype;
        /**
         * @private
         * ?????????????????????????????????
         */
        p.onWindowTouchBegin = function (event) {
            this.$parent.addChild(this);
        };
        d(p, "elementsContent",undefined
            /**
             * @language en_US
             * write-only property,This property is Usually invoked in resolving an EXML for adding multiple children quickly.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????? EXML ?????????????????????????????????????????????????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function (value) {
                if (value) {
                    var length_15 = value.length;
                    for (var i = 0; i < length_15; i++) {
                        this.addChild(value[i]);
                    }
                }
            }
        );
        d(p, "title"
            /**
             * @language en_US
             * Title or caption displayed in the title bar.
             *
             * @default ""
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????
             *
             * @default ""
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._title;
            }
            ,function (value) {
                this._title = value;
                if (this.titleDisplay)
                    this.titleDisplay.text = this.title;
            }
        );
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance == this.titleDisplay) {
                this.titleDisplay.text = this._title;
            }
            else if (instance == this.moveArea) {
                this.moveArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            else if (instance == this.closeButton) {
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this);
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            if (instance == this.moveArea) {
                this.moveArea.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            else if (instance == this.closeButton) {
                this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this);
            }
        };
        /**
         * @language en_US
         * Dispatch the "closing" event when the closeButton is clicked.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??? closeButton ?????????????????? ???closing??? ??????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onCloseButtonClick = function (event) {
            if (eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CLOSING, true, true)) {
                this.close();
            }
        };
        /**
         * @language en_US
         * Close the panel and remove from the parent container.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.close = function () {
            if (!this.$parent) {
                return;
            }
            this.$parent.removeChild(this);
        };
        /**
         * @language en_US
         * Called when the user starts dragging a Panel.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onTouchBegin = function (event) {
            this.$includeInLayout = false;
            this.offsetPointX = this.x - event.$stageX;
            this.offsetPointY = this.y - event.$stageY;
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        /**
         * @language en_US
         * Called when the user drags a Panel.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onTouchMove = function (event) {
            this.x = event.$stageX + this.offsetPointX;
            this.y = event.$stageY + this.offsetPointY;
        };
        /**
         * @language en_US
         * Called when the user releases the Panel.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onTouchEnd = function (event) {
            this.$stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.$stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        return Panel;
    }(eui.Component));
    eui.Panel = Panel;
    egret.registerClass(Panel,'eui.Panel');
    eui.registerProperty(Panel, "elementsContent", "Array", true);
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The ProgressBar control provides a visual representation of the progress of a task over time.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ProgressBarExample.ts
     */
    /**
     * @language zh_CN
     * ProgressBar ?????????????????????????????????????????????????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ProgressBarExample.ts
     */
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function ProgressBar() {
            _super.call(this);
            /**
             * @language en_US
             * this hightlight component of the progressbar.
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.thumb = null;
            /**
             * @language en_US
             * the label of the progressbar.
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.labelDisplay = null;
            /**
             * @private
             */
            this._labelFunction = null;
            /**
             * @private
             */
            this._slideDuration = 500;
            /**
             * @private
             */
            this._direction = eui.Direction.LTR;
            /**
             * @private
             * ?????????????????????????????????value???
             */
            this.slideToValue = 0;
            /**
             * @private
             */
            this.animationValue = 0;
            /**
             * @private
             */
            this.thumbInitX = 0;
            /**
             * @private
             */
            this.thumbInitY = 0;
            this.animation = new eui.sys.Animation(this.animationUpdateHandler, this);
        }
        var d = __define,c=ProgressBar,p=c.prototype;
        d(p, "labelFunction"
            /**
             * @language en_US
             * a text format callback function???example???
             * <code>labelFunction(value:Number,maximum:Number):String;</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????
             * <code>labelFunction(value:Number,maximum:Number):String;</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._labelFunction;
            }
            ,function (value) {
                if (this._labelFunction == value)
                    return;
                this._labelFunction = value;
                this.invalidateDisplayList();
            }
        );
        /**
         * @language en_US
         * Convert the current value to display text
         *
         * @param value the current value
         * @param maximum the maximum value
         *
         * @return a converted text
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????value???????????????
         *
         * @param value ?????????
         * @param maximum ?????????
         *
         * @return ??????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.valueToLabel = function (value, maximum) {
            if (this.labelFunction != null) {
                return this._labelFunction(value, maximum);
            }
            return value + " / " + maximum;
        };
        d(p, "slideDuration"
            /**
             * @language en_US
             * Duration in milliseconds for a sliding animation
             * when the value changing. If the vlaue is 0, no animation will be done.
             *
             * @default 500
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * value??????????????????????????????????????????(???????????????)????????????0?????????????????????
             *
             * @default 500
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._slideDuration;
            }
            ,function (value) {
                value = +value | 0;
                if (this._slideDuration === value)
                    return;
                this._slideDuration = value;
                if (this.animation.isPlaying) {
                    this.animation.stop();
                    this.setValue(this.slideToValue);
                }
            }
        );
        d(p, "direction"
            /**
             * @language en_US
             * Direction in which the fill of the ProgressBar expands toward completion.
             * you should use the <code>Direction</code> class constants to set the property.
             *
             * @default Direction.LTR
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ProgressBar ?????????????????????????????????????????????????????? <code>Direction</code> ?????????????????????
             *
             * @default Direction.LTR
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._direction;
            }
            ,function (value) {
                if (this._direction == value)
                    return;
                if (this.thumb)
                    this.thumb.x = this.thumbInitX;
                if (this.thumb)
                    this.thumb.y = this.thumbInitY;
                this._direction = value;
                this.invalidateDisplayList();
            }
        );
        /**
         * @private
         *
         * @param newValue
         */
        p.$setValue = function (newValue) {
            if (this.value === newValue)
                return false;
            var values = this.$Range;
            var result = _super.prototype.$setValue.call(this, newValue);
            if (this._slideDuration > 0 && this.$stage) {
                this.validateProperties(); //????????????????????????????????????????????????????????????????????????????????????
                var animation = this.animation;
                if (animation.isPlaying) {
                    this.animationValue = this.slideToValue;
                    this.invalidateDisplayList();
                    animation.stop();
                }
                this.slideToValue = this.nearestValidValue(newValue, values[7 /* snapInterval */]);
                if (this.slideToValue === this.animationValue)
                    return result;
                var duration = this._slideDuration *
                    (Math.abs(this.animationValue - this.slideToValue) / (values[0 /* maximum */] - values[2 /* minimum */]));
                animation.duration = duration === Infinity ? 0 : duration;
                animation.from = this.animationValue;
                animation.to = this.slideToValue;
                animation.play();
            }
            else {
                this.animationValue = this.value;
            }
            return result;
        };
        /**
         * @private
         * ????????????????????????
         */
        p.animationUpdateHandler = function (animation) {
            var values = this.$Range;
            var value = this.nearestValidValue(animation.currentValue, values[7 /* snapInterval */]);
            this.animationValue = Math.min(values[0 /* maximum */], Math.max(values[2 /* minimum */], value));
            this.invalidateDisplayList();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance === this.thumb) {
                if (this.thumb.x)
                    this.thumbInitX = this.thumb.x;
                if (this.thumb.y)
                    this.thumbInitY = this.thumb.y;
                this.thumb.addEventListener(egret.Event.RESIZE, this.onThumbResize, this);
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            if (instance === this.thumb) {
                this.thumb.removeEventListener(egret.Event.RESIZE, this.onThumbResize, this);
            }
        };
        /**
         * @private
         * thumb??????????????????????????????
         */
        p.onThumbResize = function (event) {
            this.updateSkinDisplayList();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateSkinDisplayList = function () {
            var currentValue = this.animation.isPlaying ? this.animationValue : this.value;
            var maxValue = this.maximum;
            var thumb = this.thumb;
            if (thumb) {
                var thumbWidth = thumb.width;
                var thumbHeight = thumb.height;
                var clipWidth = Math.round((currentValue / maxValue) * thumbWidth);
                if (clipWidth < 0 || clipWidth === Infinity)
                    clipWidth = 0;
                var clipHeight = Math.round((currentValue / maxValue) * thumbHeight);
                if (clipHeight < 0 || clipHeight === Infinity)
                    clipHeight = 0;
                var rect = thumb.$scrollRect;
                if (!rect) {
                    rect = egret.$TempRectangle;
                }
                rect.setTo(0, 0, thumbWidth, thumbHeight);
                var thumbPosX = thumb.x - rect.x;
                var thumbPosY = thumb.y - rect.y;
                switch (this._direction) {
                    case eui.Direction.LTR:
                        rect.width = clipWidth;
                        thumb.x = thumbPosX;
                        break;
                    case eui.Direction.RTL:
                        rect.width = clipWidth;
                        rect.x = thumbWidth - clipWidth;
                        thumb.x = rect.x;
                        break;
                    case eui.Direction.TTB:
                        rect.height = clipHeight;
                        thumb.y = thumbPosY;
                        break;
                    case eui.Direction.BTT:
                        rect.height = clipHeight;
                        rect.y = thumbHeight - clipHeight;
                        thumb.y = rect.y;
                        break;
                }
                thumb.scrollRect = rect;
            }
            if (this.labelDisplay) {
                this.labelDisplay.text = this.valueToLabel(currentValue, maxValue);
            }
        };
        return ProgressBar;
    }(eui.Range));
    eui.ProgressBar = ProgressBar;
    egret.registerClass(ProgressBar,'eui.ProgressBar');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @private
     * ????????????groupName???????????????RadioButtonGroup??????
     */
    var automaticRadioButtonGroups = {};
    /**
     * @language en_US
     * The RadioButton component allows the user make a single choice
     * within a set of mutually exclusive choices.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/RadioButtonExample.ts
     */
    /**
     * @language zh_CN
     * RadioButton ?????????????????????????????????????????????????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/RadioButtonExample.ts
     */
    var RadioButton = (function (_super) {
        __extends(RadioButton, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function RadioButton() {
            _super.call(this);
            /**
             * @private
             * ???RadioButtonGroup????????????
             */
            this.$indexNumber = 0;
            /**
             * @private
             * ?????????RadioButtonGroup
             */
            this.$radioButtonGroup = null;
            /**
             * @private
             */
            this._group = null;
            /**
             * @private
             */
            this.groupChanged = false;
            /**
             * @private
             */
            this._groupName = "radioGroup";
            /**
             * @private
             */
            this._value = null;
            this.groupName = "radioGroup";
        }
        var d = __define,c=RadioButton,p=c.prototype;
        d(p, "enabled"
            /**
             * @language en_US
             * The RadioButton component is enabled if the
             * RadioButtonGroup is enabled and the RadioButton itself is enabled.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????? RadioButtonGroup ????????? RadioButton ????????????????????? RadioButton ???????????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (!this.$Component[3 /* enabled */]) {
                    return false;
                }
                return !this.$radioButtonGroup ||
                    this.$radioButtonGroup.$enabled;
            }
            ,function (value) {
                this.$setEnabled(value);
            }
        );
        d(p, "group"
            /**
             * @language en_US
             * The RadioButtonGroup component to which this RadioButton belongs.
             * If this property is not set,
             * a unique RadioButtonGroup is created automatically based on the groupName property.
             *
             * @see eui.RadioButton#groupName
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??? RadioButton ????????? RadioButtonGroup ?????????
             * ?????????????????????????????????groupName?????????????????????????????????RadioButtonGroup???
             *
             * @see eui.RadioButton#groupName
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (!this._group && this._groupName) {
                    var g = automaticRadioButtonGroups[this._groupName];
                    if (!g) {
                        g = new eui.RadioButtonGroup();
                        g.$name = this._groupName;
                        automaticRadioButtonGroups[this._groupName] = g;
                    }
                    this._group = g;
                }
                return this._group;
            }
            ,function (value) {
                if (this._group == value)
                    return;
                if (this.$radioButtonGroup)
                    this.$radioButtonGroup.$removeInstance(this, false);
                this._group = value;
                this._groupName = value ? this.group.$name : "radioGroup";
                this.groupChanged = true;
                this.invalidateProperties();
                this.invalidateDisplayList();
            }
        );
        d(p, "groupName"
            /**
             * @language en_US
             * Specifies the name of the group to which this RadioButton component belongs
             *
             * @default ???radioGroup???
             *
             * @see eui.RadioButton#group
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * RadioButton ???????????????????????????
             *
             * @default ???radioGroup???
             *
             * @see eui.RadioButton#group
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._groupName;
            }
            ,function (value) {
                if (!value || value == "")
                    return;
                this._groupName = value;
                if (this.$radioButtonGroup)
                    this.$radioButtonGroup.$removeInstance(this, false);
                this._group = null;
                this.groupChanged = true;
                this.invalidateProperties();
                this.invalidateDisplayList();
            }
        );
        /**
         * @private
         *
         * @param value
         */
        p.$setSelected = function (value) {
            var result = _super.prototype.$setSelected.call(this, value);
            this.invalidateDisplayList();
            return result;
        };
        d(p, "value"
            /**
             * @language en_US
             * Optional user-defined value
             * that is associated with a RadioButton component.
             *
             * @default null
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??? RadioButton ???????????????????????????????????????
             *
             * @default null
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._value;
            }
            ,function (value) {
                if (this._value == value)
                    return;
                this._value = value;
                if (this.$selected && this.group) {
                    eui.PropertyEvent.dispatchPropertyEvent(this.group, eui.PropertyEvent.PROPERTY_CHANGE, "selectedValue");
                }
            }
        );
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitProperties = function () {
            if (this.groupChanged) {
                this.addToGroup();
                this.groupChanged = false;
            }
            _super.prototype.commitProperties.call(this);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            if (this.group) {
                if (this.$selected)
                    this._group.$setSelection(this, false);
                else if (this.group.selection == this)
                    this._group.$setSelection(null, false);
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.buttonReleased = function () {
            if (!this.enabled || this.selected)
                return;
            if (!this.$radioButtonGroup)
                this.addToGroup();
            _super.prototype.buttonReleased.call(this);
            this.group.$setSelection(this, true);
        };
        /**
         * @private
         * ???????????????????????????
         */
        p.addToGroup = function () {
            var g = this.group;
            if (g)
                g.$addInstance(this);
            return g;
        };
        return RadioButton;
    }(eui.ToggleButton));
    eui.RadioButton = RadioButton;
    egret.registerClass(RadioButton,'eui.RadioButton');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var groupCount = 0;
    /**
     * @private
     * ????????????????????????
     */
    function breadthOrderCompare(a, b) {
        var aParent = a.parent;
        var bParent = b.parent;
        if (!aParent || !bParent)
            return 0;
        var aNestLevel = a.$nestLevel;
        var bNestLevel = b.$nestLevel;
        var aIndex = 0;
        var bIndex = 0;
        if (aParent == bParent) {
            aIndex = aParent.getChildIndex(a);
            bIndex = bParent.getChildIndex(b);
        }
        if (aNestLevel > bNestLevel || aIndex > bIndex)
            return 1;
        if (aNestLevel < bNestLevel || bIndex > aIndex)
            return -1;
        if (a == b)
            return 0;
        return breadthOrderCompare(aParent, bParent);
    }
    /**
     * @language en_US
     * The RadioButtonGroup component defines a group of RadioButton components
     * that act as a single mutually exclusive component; therefore,
     * a user can select only one RadioButton component at a time.
     *
     * @event egret.Event.CHANGE Dispatched when the value of the selected RadioButton component in
     * this group changes.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/RadioButtonGroupExample.ts
     */
    /**
     * @language zh_CN
     * RadioButtonGroup ?????????????????? RadioButton ??????????????????????????????????????????????????????????????????????????? RadioButton ??????
     *
     * @event egret.Event.CHANGE ??????????????? RadioButton ??????????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/RadioButtonGroupExample.ts
     */
    var RadioButtonGroup = (function (_super) {
        __extends(RadioButtonGroup, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function RadioButtonGroup() {
            _super.call(this);
            /**
             * @private
             * ??????
             */
            this.$name = null;
            /**
             * @private
             * ??????????????????
             */
            this.radioButtons = [];
            /**
             * @private
             */
            this.$enabled = true;
            /**
             * @private
             */
            this._selectedValue = null;
            /**
             * @private
             */
            this._selection = null;
            this.$name = "_radioButtonGroup" + groupCount++;
        }
        var d = __define,c=RadioButtonGroup,p=c.prototype;
        /**
         * @language en_US
         * Returns the RadioButton component at the specified index.
         *
         * @param index The 0-based index of the RadioButton in the
         * RadioButtonGroup.
         *
         * @return The specified RadioButton component if index is between
         * 0 and <code>numRadioButtons</code> - 1.  Returns
         * <code>null</code> if the index is invalid.
         *
         * @see eui.RadioButtonGroup#numRadioButtons
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????? RadioButton ?????????
         *
         * @param index RadioButtonGroup ?????? RadioButton ???????????????????????????
         *
         * @return ??????????????? 0 ??? <code>numRadioButtons</code> ????????????????????? RadioButton ????????? 1???
         * ?????????????????????????????? <code>null</code>???
         *
         * @see eui.RadioButtonGroup#numRadioButtons
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getRadioButtonAt = function (index) {
            return this.radioButtons[index];
        };
        d(p, "enabled"
            /**
             * @language en_US
             * Determines whether selection is allowed.  Note that the value returned
             * only reflects the value that was explicitly set on the
             * <code>RadioButtonGroup</code> and does not reflect any values explicitly
             * set on the individual RadioButtons.
             *
             * @default true
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????? <code>RadioButtonGroup</code> ?????????????????????
             * ????????????????????? RadioButton ???????????????????????????
             *
             * @default true
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$enabled;
            }
            ,function (value) {
                value = !!value;
                if (this.$enabled === value)
                    return;
                this.$enabled = value;
                var buttons = this.radioButtons;
                var length = buttons.length;
                for (var i = 0; i < length; i++)
                    buttons[i].invalidateState();
            }
        );
        d(p, "numRadioButtons"
            /**
             * @language en_US
             * The number of RadioButtons that belong to this RadioButtonGroup.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             *  ????????? RadioButtonGroup ??? RadioButton ??????
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.radioButtons.length;
            }
        );
        d(p, "selectedValue"
            /**
             * @language en_US
             * The <code>value</code> property of the selected
             * RadioButton component in the group, if it has been set,
             * otherwise, the <code>label</code> property of the selected RadioButton.
             * If no RadioButton is selected, this property is <code>null</code>.
             *
             * <p>If you set <code>selectedValue</code>, selects the
             * first RadioButton component whose <code>value</code> or
             * <code>label</code> property matches this value.</p>
             *
             * @default null
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????? RadioButton ????????? <code>value</code> ??????????????????????????????
             * ??????????????? RadioButton ????????? <code>label</code> ?????????
             * ????????????????????? RadioButton?????????????????? <code>null</code>???
             *
             * <p>??????????????? <code>selectedValue</code>??????????????? <code>value</code> ??? <code>label</code> ??????
             * ??????????????????????????? RadioButton ?????????</p>
             *
             * @default null
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (this.selection) {
                    return this.selection.value != null ?
                        this.selection.value :
                        this.selection.label;
                }
                return null;
            }
            ,function (value) {
                this._selectedValue = value;
                if (value == null) {
                    this.$setSelection(null, false);
                    return;
                }
                var n = this.numRadioButtons;
                for (var i = 0; i < n; i++) {
                    var radioButton = this.radioButtons[i];
                    if (radioButton.value == value ||
                        radioButton.label == value) {
                        this.changeSelection(i, false);
                        this._selectedValue = null;
                        eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "selectedValue");
                        break;
                    }
                }
            }
        );
        d(p, "selection"
            /**
             * @language en_US
             * Contains a reference to the currently selected
             * RadioButton component in the group.This property is valid only
             * when the target RadioButton is displayed on the display list
             *
             * @default null
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????????????????RadioButton???????????????????????????
             *
             * @default null
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._selection;
            }
            ,function (value) {
                if (this._selection == value)
                    return;
                this.$setSelection(value, false);
            }
        );
        /**
         * @private
         * ???????????????????????????
         */
        p.$addInstance = function (instance) {
            instance.addEventListener(egret.Event.REMOVED, this.removedHandler, this);
            var buttons = this.radioButtons;
            buttons.push(instance);
            buttons.sort(breadthOrderCompare);
            var length = buttons.length;
            for (var i = 0; i < length; i++) {
                buttons[i].$indexNumber = i;
            }
            if (this._selectedValue)
                this.selectedValue = this._selectedValue;
            if (instance.selected == true)
                this.selection = instance;
            instance.$radioButtonGroup = this;
            instance.invalidateState();
        };
        /**
         * @private
         * ???????????????????????????
         */
        p.$removeInstance = function (instance, addListener) {
            if (instance) {
                var foundInstance = false;
                var buttons = this.radioButtons;
                var length_16 = buttons.length;
                for (var i = 0; i < length_16; i++) {
                    var rb = buttons[i];
                    if (foundInstance) {
                        rb.$indexNumber = rb.$indexNumber - 1;
                    }
                    else if (rb == instance) {
                        if (addListener)
                            instance.addEventListener(egret.Event.ADDED, this.addedHandler, this);
                        if (instance == this._selection)
                            this._selection = null;
                        instance.$radioButtonGroup = null;
                        instance.invalidateState();
                        this.radioButtons.splice(i, 1);
                        foundInstance = true;
                        i--;
                        length_16--;
                    }
                }
            }
        };
        /**
         * @private
         * ???????????????????????????
         */
        p.$setSelection = function (value, fireChange) {
            if (this._selection == value)
                return false;
            if (!value) {
                if (this._selection) {
                    this._selection.selected = false;
                    this._selection = null;
                    if (fireChange)
                        this.dispatchEventWith(egret.Event.CHANGE);
                }
            }
            else {
                var n = this.numRadioButtons;
                for (var i = 0; i < n; i++) {
                    if (value == this.getRadioButtonAt(i)) {
                        this.changeSelection(i, fireChange);
                        break;
                    }
                }
            }
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "selectedValue");
            return true;
        };
        /**
         * @private
         * ???????????????
         */
        p.changeSelection = function (index, fireChange) {
            var rb = this.getRadioButtonAt(index);
            if (rb && rb != this._selection) {
                if (this._selection)
                    this._selection.selected = false;
                this._selection = rb;
                this._selection.selected = true;
                if (fireChange)
                    this.dispatchEventWith(egret.Event.CHANGE);
            }
        };
        /**
         * @private
         * ?????????????????????????????????
         */
        p.addedHandler = function (event) {
            var rb = event.target;
            if (rb) {
                rb.removeEventListener(egret.Event.ADDED, this.addedHandler, this);
                this.$addInstance(rb);
            }
        };
        /**
         * @private
         * ?????????????????????????????????
         */
        p.removedHandler = function (event) {
            var rb = event.target;
            if (rb) {
                rb.removeEventListener(egret.Event.REMOVED, this.removedHandler, this);
                this.$removeInstance(rb, true);
            }
        };
        return RadioButtonGroup;
    }(egret.EventDispatcher));
    eui.RadioButtonGroup = RadioButtonGroup;
    egret.registerClass(RadioButtonGroup,'eui.RadioButtonGroup');
    eui.registerBindable(RadioButtonGroup.prototype, "selectedValue");
    if (DEBUG) {
        egret.$markReadOnly(RadioButtonGroup, "numRadioButtons");
    }
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The Rect component is a rectangular shape. It can be touched.
     * @version Egret 2.5.5
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Rect ????????????????????????????????????????????????????????????
     * @version Egret 2.5.5
     * @version eui 1.0
     * @platform Web,Native
     */
    var Rect = (function (_super) {
        __extends(Rect, _super);
        function Rect(width, height, fillColor) {
            _super.call(this);
            this.$fillColor = 0x000000;
            this.$fillAlpha = 1;
            this.$strokeColor = 0x444444;
            this.$strokeAlpha = 1;
            this.$strokeWeight = 0;
            this.$ellipseWidth = 0;
            this.$ellipseHeight = 0;
            this.touchChildren = false;
            this.$graphics = new egret.Graphics();
            this.$graphics.$setTarget(this);
            this.width = width;
            this.height = height;
            this.fillColor = fillColor;
        }
        var d = __define,c=Rect,p=c.prototype;
        d(p, "graphics"
            ,function () {
                return this.$graphics;
            }
        );
        /**
         * @private
         */
        p.$measureContentBounds = function (bounds) {
            if (this.$graphics) {
                bounds.setTo(0, 0, this.width, this.height);
            }
        };
        d(p, "fillColor"
            /**
             * @language en_US
             * Fill color
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$fillColor;
            }
            ,function (value) {
                if (value == undefined || this.$fillColor == value)
                    return;
                this.$fillColor = value;
                this.invalidateDisplayList();
            }
        );
        d(p, "fillAlpha"
            /**
             * @language en_US
             * Fill alpha
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????,????????????1???
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$fillAlpha;
            }
            ,function (value) {
                if (this.$fillAlpha == value)
                    return;
                this.$fillAlpha = value;
                this.invalidateDisplayList();
            }
        );
        d(p, "strokeColor"
            /**
             * @language en_US
             * The line's color inside the rect border. Caution: when the strokeWeight is 0, a line is not drawn
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????,???????????? strokeWeight ??? 0 ????????????????????????
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$strokeColor;
            }
            ,function (value) {
                if (this.$strokeColor == value)
                    return;
                this.$strokeColor = value;
                this.invalidateDisplayList();
            }
        );
        d(p, "strokeAlpha"
            /**
             * @language en_US
             * The line's alpha inside the rect border. Caution: when the strokeWeight is 0, a line is not drawn
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????,???????????? strokeWeight ???0????????????????????????
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$strokeAlpha;
            }
            ,function (value) {
                if (this.$strokeAlpha == value)
                    return;
                this.$strokeAlpha = value;
                this.invalidateDisplayList();
            }
        );
        d(p, "strokeWeight"
            /**
             * @language en_US
             * The line's thickness inside the rect border. Caution: when the strokeWeight is 0, a line is not drawn
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????(??????),???????????? strokeWeight ??? 0 ????????????????????????
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$strokeWeight;
            }
            ,function (value) {
                if (this.$strokeWeight == value)
                    return;
                this.$strokeWeight = value;
                this.invalidateDisplayList();
            }
        );
        d(p, "ellipseWidth"
            /**
             * @language en_US
             * Width used to draw an ellipse with rounded corners (in pixels).
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????(??????????????????)
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$ellipseWidth;
            }
            ,function (value) {
                if (this.$ellipseWidth == value)
                    return;
                this.$ellipseWidth = value;
                this.invalidateDisplayList();
            }
        );
        d(p, "ellipseHeight"
            /**
             * @language en_US
             * Height used to draw an ellipse with rounded corners (in pixels). If no value is specified, the default value matches the value of the ellipseWidth parameter.
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????? (??????????????????)?????????????????????????????????????????? ellipseWidth ??????????????????????????????
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$ellipseHeight;
            }
            ,function (value) {
                if (this.$ellipseHeight == value)
                    return;
                this.$ellipseHeight = value;
                this.invalidateDisplayList();
            }
        );
        /**
         * @copy eui.UIComponent#updateDisplayList
         *
         * @version Egret 2.5.5
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            var g = this.graphics;
            g.clear();
            if (this.$strokeWeight > 0) {
                g.beginFill(this.$fillColor, 0);
                g.lineStyle(this.$strokeWeight, this.$strokeColor, this.$strokeAlpha, true, "normal", "square", "miter");
                if (this.$ellipseWidth == 0 && this.$ellipseHeight == 0) {
                    g.drawRect(this.$strokeWeight / 2, this.$strokeWeight / 2, unscaledWidth - this.$strokeWeight, unscaledHeight - this.$strokeWeight);
                }
                else {
                    g.drawRoundRect(this.$strokeWeight / 2, this.$strokeWeight / 2, unscaledWidth - this.$strokeWeight, unscaledHeight - this.$strokeWeight, this.$ellipseWidth, this.$ellipseHeight);
                }
                g.endFill();
            }
            g.beginFill(this.$fillColor, this.$fillAlpha);
            g.lineStyle(this.$strokeWeight, this.$strokeColor, 0, true, "normal", "square", "miter");
            if (this.$ellipseWidth == 0 && this.$ellipseHeight == 0) {
                g.drawRect(this.$strokeWeight, this.$strokeWeight, unscaledWidth - this.$strokeWeight * 2, unscaledHeight - this.$strokeWeight * 2);
            }
            else {
                g.drawRoundRect(this.$strokeWeight, this.$strokeWeight, unscaledWidth - this.$strokeWeight * 2, unscaledHeight - this.$strokeWeight * 2, this.$ellipseWidth, this.$ellipseHeight);
            }
            g.endFill();
            this.$invalidateContentBounds();
        };
        return Rect;
    }(eui.Component));
    eui.Rect = Rect;
    egret.registerClass(Rect,'eui.Rect');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var scrollerThrowEvent;
    /**
     * @language en_US
     * The Scroller component displays a single scrollable component,
     * called a viewport, and horizontal and vertical scroll bars.
     * The viewport must implement the IViewport interface.
     * <p>The Group components implement the IViewport interface
     * and can be used as the children of the Scroller control,
     * as the following example shows:</p>
     * <pre>
     *       <s:Scroller width="100" height="100">
     *           <s:Group>
     *               <s:Image width="300" height="400" source="assets/logo.jpg"/>
     *           </s:Group>
     *       </s:Scroller>
     * </pre>
     * <p>The size of the Image control is set larger than that of its parent Group container.
     * By default, the child extends past the boundaries of the parent container.
     * Rather than allow the child to extend past the boundaries of the parent container,
     * the Scroller specifies to clip the child to the boundaries and display scroll bars.</p>
     *
     * @event eui.UIEvent.CHANGE_START Dispatched when the scroll position is going to change
     * @event eui.UIEvent.CHANGE_END Dispatched when the scroll position changed complete
     * @event egret.Event.CHANGE Dispatched when the scroll position is changing
     * @event egret.TouchEvent.TOUCH_CANCEL canceled the touch
     *
     * @defaultProperty viewport
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ScrollerExample.ts
     */
    /**
     * @language zh_CN
     * Scroller ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? IViewport ?????????
     * <p>Group ???????????? IViewport ???????????????????????? Scroller ????????????????????????????????????</p>
     * <pre>
     *       <s:Scroller width="100" height="100">
     *           <s:Group>
     *               <s:Image width="300" height="400" source="assets/logo.jpg"/>
     *           </s:Group>
     *       </s:Scroller>
     * </pre>
     * Image ???????????????????????? Group ????????????????????????????????????????????????????????????????????????
     * Scroller ???????????????????????????????????????????????????????????????????????????????????????????????????
     *
     * @event eui.UIEvent.CHANGE_START ????????????????????????
     * @event eui.UIEvent.CHANGE_END ????????????????????????
     * @event egret.Event.CHANGE ???????????????????????????
     * @event egret.TouchEvent.TOUCH_CANCEL ??????????????????
     *
     * @defaultProperty viewport
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ScrollerExample.ts
     */
    var Scroller = (function (_super) {
        __extends(Scroller, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function Scroller() {
            _super.call(this);
            this.$bounces = true;
            /**
             * @language en_US
             * the horizontal scroll bar
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.horizontalScrollBar = null;
            /**
             * @language en_US
             * the vertical scroll bar
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.verticalScrollBar = null;
            var touchScrollH = new eui.sys.TouchScroll(this.horizontalUpdateHandler, this.horizontalEndHandler, this);
            var touchScrollV = new eui.sys.TouchScroll(this.verticalUpdateHandler, this.verticalEndHanlder, this);
            this.$Scroller = {
                0: "auto",
                1: "auto",
                2: null,
                3: 0,
                4: 0,
                5: false,
                6: false,
                7: false,
                8: touchScrollH,
                9: touchScrollV,
                10: null,
                11: false,
                12: false //touchCancle
            };
        }
        var d = __define,c=Scroller,p=c.prototype;
        d(p, "bounces"
            /**
             * @language en_US
             * Whether to enable rebound, rebound When enabled, ScrollView contents allowed to continue to drag the border after arriving at the end user drag operation, and then bounce back boundary position
             * @default true
             * @version Egret 2.5.6
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????ScrollView?????????????????????????????????????????????????????????????????????????????????????????????????????????
             * @default true
             * @version Egret 2.5.6
             */
            ,function () {
                return this.$bounces;
            }
            ,function (value) {
                this.$bounces = !!value;
                var touchScrollH = this.$Scroller[8 /* touchScrollH */];
                if (touchScrollH) {
                    touchScrollH.$bounces = this.$bounces;
                }
                var touchScrollV = this.$Scroller[9 /* touchScrollV */];
                if (touchScrollV) {
                    touchScrollV.$bounces = this.$bounces;
                }
            }
        );
        d(p, "throwSpeed"
            ,function () {
                return this.$Scroller[8 /* touchScrollH */].$scrollFactor;
            }
            /**
             * @language en_US
             * Adjust the speed to get out of the slide end.When equal to 0,the scroll animation will not be play.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????????????????0????????????????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function (val) {
                val = +val;
                if (val < 0)
                    val = 0;
                this.$Scroller[8 /* touchScrollH */].$scrollFactor = val;
                this.$Scroller[9 /* touchScrollV */].$scrollFactor = val;
            }
        );
        /**
         * @private
         */
        p.$getThrowInfo = function (currentPos, toPos) {
            if (!scrollerThrowEvent) {
                scrollerThrowEvent = new eui.ScrollerThrowEvent(eui.ScrollerThrowEvent.THROW, false, false, currentPos, toPos);
            }
            else {
                scrollerThrowEvent.currentPos = currentPos;
                scrollerThrowEvent.toPos = toPos;
            }
            return scrollerThrowEvent;
        };
        d(p, "scrollPolicyV"
            /**
             * @language en_US
             * Indicates under what conditions the scroller can be moved and the vertical scroll bar is displayed.
             * <p><code>ScrollPolicy.ON</code> - the scroller can be moved, and the scroll bar is displayed when it's move.</p>
             * <p><code>ScrollPolicy.OFF</code> - the scroller can not be moved, the scroll bar is never displayed.</p>
             * <p><code>ScrollPolicy.AUTO</code> - the scroller can not be moved when
             *  the viewport's contentHeight is larger than its height. the scroll bar is displayed when it's move.
             *
             * @default ScrollPolicy.AUTO
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????
             * <p><code>ScrollPolicy.ON</code> - ??????????????????????????????????????????</p>
             * <p><code>ScrollPolicy.OFF</code> - ??????????????????????????????????????????</p>
             * <p><code>ScrollPolicy.AUTO</code> - ???????????? contentHeight ?????????????????????????????????????????????????????????????????????</p>
             *
             * @default ScrollPolicy.AUTO
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Scroller[0 /* scrollPolicyV */];
            }
            ,function (value) {
                var values = this.$Scroller;
                if (values[0 /* scrollPolicyV */] == value) {
                    return;
                }
                values[0 /* scrollPolicyV */] = value;
                this.checkScrollPolicy();
            }
        );
        d(p, "scrollPolicyH"
            /**
             * @language en_US
             * Indicates under what conditions the scroller can be moved and the horizontal scroll bar is displayed.
             * <p><code>ScrollPolicy.ON</code> - the scroller can be moved, and the scroll bar is displayed when it's move.</p>
             * <p><code>ScrollPolicy.OFF</code> - the scroller can not be moved, the scroll bar is never displayed.</p>
             * <p><code>ScrollPolicy.AUTO</code> - the can not be moved  when
             *  the viewport's contentWidth is larger than its width. the scroll bar is displayed when it's move.
             *
             * @default ScrollPolicy.AUTO
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????
             * <p><code>ScrollPolicy.ON</code> - ??????????????????????????????????????????</p>
             * <p><code>ScrollPolicy.OFF</code> - ??????????????????????????????????????????</p>
             * <p><code>ScrollPolicy.AUTO</code> - ???????????? contentWidth ?????????????????????????????????????????????????????????????????????</p>
             *
             * @default ScrollPolicy.AUTO
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Scroller[1 /* scrollPolicyH */];
            }
            ,function (value) {
                var values = this.$Scroller;
                if (values[1 /* scrollPolicyH */] == value) {
                    return;
                }
                values[1 /* scrollPolicyH */] = value;
                this.checkScrollPolicy();
            }
        );
        /**
         * @language en_US
         * Stop the scroller animation
         * @version Egret 3.0.2
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         *
         * @version Egret 3.0.2
         * @version eui 1.0
         * @platform Web,Native
         */
        p.stopAnimation = function () {
            var values = this.$Scroller;
            var scrollV = values[9 /* touchScrollV */];
            var scrollH = values[8 /* touchScrollH */];
            if (scrollV.animation.isPlaying) {
                eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_END);
            }
            else if (scrollH.animation.isPlaying) {
                eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_END);
            }
            scrollV.stop();
            scrollH.stop();
            var verticalBar = this.verticalScrollBar;
            var horizontalBar = this.horizontalScrollBar;
            if (verticalBar && verticalBar.autoVisibility) {
                verticalBar.visible = false;
            }
            if (horizontalBar && horizontalBar.autoVisibility) {
                horizontalBar.visible = false;
            }
        };
        d(p, "viewport"
            /**
             * @language en_US
             * The viewport component to be scrolled.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$Scroller[10 /* viewport */];
            }
            ,function (value) {
                var values = this.$Scroller;
                if (value == values[10 /* viewport */])
                    return;
                this.uninstallViewport();
                values[10 /* viewport */] = value;
                values[11 /* viewprotRemovedEvent */] = false;
                this.installViewport();
            }
        );
        /**
         * @private
         * ??????????????????????????????
         */
        p.installViewport = function () {
            var viewport = this.viewport;
            if (viewport) {
                this.addChildAt(viewport, 0);
                viewport.scrollEnabled = true;
                viewport.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, true);
                viewport.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, true);
                viewport.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapCapture, this, true);
                viewport.addEventListener(egret.Event.REMOVED, this.onViewPortRemove, this);
            }
            if (this.horizontalScrollBar) {
                this.horizontalScrollBar.viewport = viewport;
            }
            if (this.verticalScrollBar) {
                this.verticalScrollBar.viewport = viewport;
            }
        };
        /**
         * @private
         * ??????????????????
         */
        p.uninstallViewport = function () {
            if (this.horizontalScrollBar) {
                this.horizontalScrollBar.viewport = null;
            }
            if (this.verticalScrollBar) {
                this.verticalScrollBar.viewport = null;
            }
            var viewport = this.viewport;
            if (viewport) {
                viewport.scrollEnabled = false;
                viewport.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, true);
                viewport.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, true);
                viewport.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapCapture, this, true);
                viewport.removeEventListener(egret.Event.REMOVED, this.onViewPortRemove, this);
                if (this.$Scroller[11 /* viewprotRemovedEvent */] == false) {
                    this.removeChild(viewport);
                }
            }
        };
        p.onViewPortRemove = function (event) {
            if (event.target == this.viewport) {
                this.$Scroller[11 /* viewprotRemovedEvent */] = true;
                this.viewport = null;
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setSkin = function (skin) {
            _super.prototype.setSkin.call(this, skin);
            var viewport = this.viewport;
            if (viewport) {
                this.addChildAt(viewport, 0);
            }
        };
        /**
         * @private
         * @param event
         */
        p.onTouchBeginCapture = function (event) {
            this.$Scroller[12 /* touchCancle */] = false;
            var canScroll = this.checkScrollPolicy();
            if (!canScroll) {
                return;
            }
            this.onTouchBegin(event);
        };
        /**
         * @private
         * @param event
         */
        p.onTouchEndCapture = function (event) {
            if (this.$Scroller[12 /* touchCancle */]) {
                event.stopPropagation();
                this.onTouchEnd(event);
            }
        };
        /**
         * @private
         * @param event
         */
        p.onTouchTapCapture = function (event) {
            if (this.$Scroller[12 /* touchCancle */]) {
                event.stopPropagation();
            }
        };
        /**
         * @private
         * ??????????????????????????????????????????????????????????????????true???
         */
        p.checkScrollPolicy = function () {
            var values = this.$Scroller;
            var viewport = values[10 /* viewport */];
            if (!viewport) {
                return false;
            }
            var hCanScroll;
            var uiValues = viewport.$UIComponent;
            switch (values[1 /* scrollPolicyH */]) {
                case "auto":
                    if (viewport.contentWidth > uiValues[10 /* width */] || viewport.scrollH !== 0) {
                        hCanScroll = true;
                    }
                    else {
                        hCanScroll = false;
                    }
                    break;
                case "on":
                    hCanScroll = true;
                    break;
                case "off":
                    hCanScroll = false;
                    break;
            }
            values[6 /* horizontalCanScroll */] = hCanScroll;
            var vCanScroll;
            switch (values[0 /* scrollPolicyV */]) {
                case "auto":
                    if (viewport.contentHeight > uiValues[11 /* height */] || viewport.scrollV !== 0) {
                        vCanScroll = true;
                    }
                    else {
                        vCanScroll = false;
                    }
                    break;
                case "on":
                    vCanScroll = true;
                    break;
                case "off":
                    vCanScroll = false;
                    break;
            }
            values[7 /* verticalCanScroll */] = vCanScroll;
            return hCanScroll || vCanScroll;
        };
        /**
         * @private
         *
         * @param event
         */
        p.onTouchBegin = function (event) {
            if (event.isDefaultPrevented()) {
                return;
            }
            if (!this.checkScrollPolicy()) {
                return;
            }
            this.downTarget = event.target;
            var values = this.$Scroller;
            this.stopAnimation();
            values[3 /* touchStartX */] = event.$stageX;
            values[4 /* touchStartY */] = event.$stageY;
            if (values[6 /* horizontalCanScroll */]) {
                values[8 /* touchScrollH */].start(event.$stageX);
            }
            if (values[7 /* verticalCanScroll */]) {
                values[9 /* touchScrollV */].start(event.$stageY);
            }
            var stage = this.$stage;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this, true);
            this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveListeners, this);
        };
        /**
         * @private
         *
         * @param event
         */
        p.onTouchMove = function (event) {
            if (event.isDefaultPrevented()) {
                return;
            }
            var values = this.$Scroller;
            if (!values[5 /* touchMoved */]) {
                var outX = void 0;
                if (Math.abs(values[3 /* touchStartX */] - event.$stageX) < Scroller.scrollThreshold) {
                    outX = false;
                }
                else {
                    outX = true;
                }
                var outY = void 0;
                if (Math.abs(values[4 /* touchStartY */] - event.$stageY) < Scroller.scrollThreshold) {
                    outY = false;
                }
                else {
                    outY = true;
                }
                if (!outX && !outY) {
                    return;
                }
                if (!outY && outX && values[1 /* scrollPolicyH */] == 'off') {
                    return;
                }
                if (!outX && outY && values[0 /* scrollPolicyV */] == 'off') {
                    return;
                }
                values[12 /* touchCancle */] = true;
                values[5 /* touchMoved */] = true;
                this.dispatchCancelEvent(event);
                var horizontalBar = this.horizontalScrollBar;
                var verticalBar = this.verticalScrollBar;
                if (horizontalBar && horizontalBar.autoVisibility && values[6 /* horizontalCanScroll */]) {
                    horizontalBar.visible = true;
                }
                if (verticalBar && verticalBar.autoVisibility && values[7 /* verticalCanScroll */]) {
                    verticalBar.visible = true;
                }
                if (values[2 /* autoHideTimer */]) {
                    values[2 /* autoHideTimer */].reset();
                }
                eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_START);
                this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            }
            event.preventDefault();
            var viewport = values[10 /* viewport */];
            var uiValues = viewport.$UIComponent;
            if (values[6 /* horizontalCanScroll */]) {
                values[8 /* touchScrollH */].update(event.$stageX, viewport.contentWidth - uiValues[10 /* width */], viewport.scrollH);
            }
            if (values[7 /* verticalCanScroll */]) {
                values[9 /* touchScrollV */].update(event.$stageY, viewport.contentHeight - uiValues[11 /* height */], viewport.scrollV);
            }
        };
        /**
         * @private
         * @param event
         */
        p.onTouchCancel = function (event) {
            if (!this.$Scroller[5 /* touchMoved */]) {
                this.onRemoveListeners();
            }
        };
        /**
         * @private
         * @param event
         */
        p.dispatchCancelEvent = function (event) {
            var viewport = this.$Scroller[10 /* viewport */];
            if (!viewport) {
                return;
            }
            var cancelEvent = new egret.TouchEvent(egret.TouchEvent.TOUCH_CANCEL, event.bubbles, event.cancelable);
            var target = this.downTarget;
            var list = this.$getPropagationList(target);
            var length = list.length;
            var targetIndex = list.length * 0.5;
            var startIndex = -1;
            for (var i = 0; i < length; i++) {
                if (list[i] === viewport) {
                    startIndex = i;
                    break;
                }
            }
            list.splice(0, startIndex + 1);
            targetIndex -= startIndex + 1;
            this.$dispatchPropagationEvent(cancelEvent, list, targetIndex);
            egret.Event.release(cancelEvent);
        };
        /**
         * @private
         * @param event
         */
        p.onTouchEnd = function (event) {
            var values = this.$Scroller;
            values[5 /* touchMoved */] = false;
            this.onRemoveListeners();
            var viewport = values[10 /* viewport */];
            var uiValues = viewport.$UIComponent;
            if (values[8 /* touchScrollH */].isStarted()) {
                values[8 /* touchScrollH */].finish(viewport.scrollH, viewport.contentWidth - uiValues[10 /* width */]);
            }
            if (values[9 /* touchScrollV */].isStarted()) {
                values[9 /* touchScrollV */].finish(viewport.scrollV, viewport.contentHeight - uiValues[11 /* height */]);
            }
        };
        /**
         * @private
         */
        p.onRemoveListeners = function () {
            var stage = this.$stage;
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this, true);
            stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, true);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveListeners, this);
        };
        /**
         * @private
         *
         * @param scrollPos
         */
        p.horizontalUpdateHandler = function (scrollPos) {
            this.$Scroller[10 /* viewport */].scrollH = scrollPos;
            this.dispatchEventWith(egret.Event.CHANGE);
        };
        /**
         * @private
         *
         * @param scrollPos
         */
        p.verticalUpdateHandler = function (scrollPos) {
            this.$Scroller[10 /* viewport */].scrollV = scrollPos;
            this.dispatchEventWith(egret.Event.CHANGE);
        };
        /**
         * @private
         *
         */
        p.horizontalEndHandler = function () {
            if (!this.$Scroller[9 /* touchScrollV */].isPlaying()) {
                this.onChangeEnd();
            }
        };
        /**
         * @private
         *
         */
        p.verticalEndHanlder = function () {
            if (!this.$Scroller[8 /* touchScrollH */].isPlaying()) {
                this.onChangeEnd();
            }
        };
        /**
         * @private
         *
         */
        p.onChangeEnd = function () {
            var values = this.$Scroller;
            var horizontalBar = this.horizontalScrollBar;
            var verticalBar = this.verticalScrollBar;
            if (horizontalBar && horizontalBar.visible || verticalBar && verticalBar.visible) {
                if (!values[2 /* autoHideTimer */]) {
                    values[2 /* autoHideTimer */] = new egret.Timer(200, 1);
                    values[2 /* autoHideTimer */].addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onAutoHideTimer, this);
                }
                values[2 /* autoHideTimer */].reset();
                values[2 /* autoHideTimer */].start();
            }
            eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_END);
        };
        /**
         * @private
         *
         * @param event
         */
        p.onAutoHideTimer = function (event) {
            var horizontalBar = this.horizontalScrollBar;
            var verticalBar = this.verticalScrollBar;
            if (horizontalBar && horizontalBar.autoVisibility) {
                horizontalBar.visible = false;
            }
            if (verticalBar && verticalBar.autoVisibility) {
                verticalBar.visible = false;
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var viewport = this.viewport;
            if (viewport) {
                //???????????????setLayoutBoundsSize()?????????????????????????????????????????????
                viewport.setLayoutBoundsSize(unscaledWidth, unscaledHeight);
                viewport.setLayoutBoundsPosition(0, 0);
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance == this.horizontalScrollBar) {
                this.horizontalScrollBar.touchChildren = false;
                this.horizontalScrollBar.touchEnabled = false;
                this.horizontalScrollBar.viewport = this.viewport;
                if (this.horizontalScrollBar.autoVisibility) {
                    this.horizontalScrollBar.visible = false;
                }
            }
            else if (instance == this.verticalScrollBar) {
                this.verticalScrollBar.touchChildren = false;
                this.verticalScrollBar.touchEnabled = false;
                this.verticalScrollBar.viewport = this.viewport;
                if (this.verticalScrollBar.autoVisibility) {
                    this.verticalScrollBar.visible = false;
                }
            }
        };
        /**
         * @language en_US
         * The threshold value(in pixels) trigger the rolling.
         * when the touch points deviate from the initial touch point than this value will trigger the rolling.
         *
         * @default 5
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         *
         * @default 5
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Scroller.scrollThreshold = 5;
        return Scroller;
    }(eui.Component));
    eui.Scroller = Scroller;
    egret.registerClass(Scroller,'eui.Scroller');
    eui.registerProperty(Scroller, "viewport", "eui.IViewport", true);
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The Skin class defines the base class for all skins.
     * You typically don't need to manually create the instance of this class.
     * It can be created by resolving a EXML.<p/>
     *
     * @example You typically write the skin classes in EXML, as the followiong example shows:<p/>
     * <pre>
     *      <?xml version="1.0" encoding="utf-8"?>
     *      <s:Skin xmlns:s="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
     *          <states>
     *              <!-- Specify the states controlled by this skin. -->
     *          </states>
     *          <!-- Define skin. -->
     *      </s:Skin>
     * </pre>
     *
     * @defaultProperty elementsContent
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/SkinExample.ts
     */
    /**
     * @language zh_CN
     * ????????????????????????????????????????????????????????????????????????????????????????????????EXML????????????????????????<p/>
     *
     * @example ????????????????????????????????????EXML?????????<p/>
     * <pre>
     *      <?xml version="1.0" encoding="utf-8"?>
     *      <s:Skin xmlns:s="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
     *          <states>
     *              <!-- Specify the states controlled by this skin. -->
     *          </states>
     *          <!-- Define skin. -->
     *      </s:Skin>
     * </pre>
     *
     * @defaultProperty elementsContent
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/SkinExample.ts
     */
    var Skin = (function (_super) {
        __extends(Skin, _super);
        function Skin() {
            _super.apply(this, arguments);
            /**
             * @language en_US
             * The maximum recommended width of the component to be considered.
             * This property can only affect measure result of host component.
             *
             * @default 100000
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????
             *
             * @default 100000
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.maxWidth = 100000;
            /**
             * @language en_US
             * The minimum recommended width of the component to be considered.
             * This property can only affect measure result of host component.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????,????????????????????????maxWidth?????????????????????????????????????????????????????????
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.minWidth = 0;
            /**
             * @language en_US
             * The maximum recommended height of the component to be considered.
             * This property can only affect measure result of host component.
             *
             * @default 100000
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????
             *
             * @default 100000
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.maxHeight = 100000;
            /**
             * @language en_US
             * The minimum recommended height of the component to be considered.
             * This property can only affect measure result of host component.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????,????????????????????????maxHeight?????????????????????????????????????????????????????????
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.minHeight = 0;
            /**
             * @language en_US
             * Number that specifies the explicit width of the skin.
             * This property can only affect measure result of host component.
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????,????????? NaN ???????????????????????????????????????????????????????????????
             *
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.width = NaN;
            /**
             * @language en_US
             * Number that specifies the explicit height of the skin.
             * This property can only affect measure result of host component.
             *
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????,????????? NaN ???????????????????????????????????????????????????????????????
             *
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.height = NaN;
            /**
             * @private
             */
            this.$elementsContent = [];
            /**
             * @private
             */
            this._hostComponent = null;
            /**
             * @private
             */
            this.$stateValues = new eui.sys.StateValues();
        }
        var d = __define,c=Skin,p=c.prototype;
        d(p, "elementsContent",undefined
            ,function (value) {
                this.$elementsContent = value;
            }
        );
        d(p, "hostComponent"
            /**
             * @language en_US
             * The host component which the skin will be attached.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._hostComponent;
            }
            ,function (value) {
                if (this._hostComponent == value)
                    return;
                if (this._hostComponent) {
                    this._hostComponent.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
                }
                this._hostComponent = value;
                var values = this.$stateValues;
                values.parent = value;
                if (value) {
                    this.commitCurrentState();
                    if (!this.$stateValues.intialized) {
                        if (value.$stage) {
                            this.initializeStates(value.$stage);
                        }
                        else {
                            value.once(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
                        }
                    }
                }
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "hostComponent");
            }
        );
        /**
         * @private
         *
         * @param event
         */
        p.onAddedToStage = function (event) {
            this.initializeStates(this._hostComponent.$stage);
        };
        return Skin;
    }(egret.EventDispatcher));
    eui.Skin = Skin;
    egret.registerClass(Skin,'eui.Skin');
    eui.sys.mixin(Skin, eui.sys.StateClient);
    eui.registerProperty(Skin, "elementsContent", "Array", true);
    eui.registerProperty(Skin, "states", "State[]");
    eui.registerBindable(Skin.prototype, "hostComponent");
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The TabBar class displays a set of identical tabs.
     * One tab can be selected at a time, and the first tab is selected by default.
     * <p>The set of tabs is defined by the <code>dataProvider</code> property.
     * The appearance of each tab is defined by the <code>ItemRenderer</code> class.</p>
     * <p>You can use the TabBar control to set the active child of a ViewStack container,
     * as the following example shows:</p>
     * <pre>
     *       <s:TabBar dataProvider="{viewStack}"/>
     *       <s:ViewStack id="viewStack">
     *          <s:Group name="tab1"/>
     *          <s:Group name="tab2"/>
     *          <s:Group name="tab3"/>
     *       </s:ViewStack>
     * </pre>
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/TabBarExample.ts
     */
    /**
     * @language zh_CN
     * TabBar ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * <p>?????????????????? <code>dataProvider</code> ???????????????
     * ??????????????????????????? <code>ItemRenderer</code> ?????????</p>
     * <p>???????????? TabBar ???????????? ViewStack ??????????????????????????????????????????</p>
     * <pre>
     *       <s:TabBar dataProvider="{viewStack}"/>
     *       <s:ViewStack id="viewStack">
     *          <s:Group name="tab1"/>
     *          <s:Group name="tab2"/>
     *          <s:Group name="tab3"/>
     *       </s:ViewStack>
     * </pre>
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/TabBarExample.ts
     */
    var TabBar = (function (_super) {
        __extends(TabBar, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function TabBar() {
            _super.call(this);
            /**
             * @private
             */
            this.indexBeingUpdated = false;
            this.requireSelection = true;
            this.useVirtualLayout = false;
        }
        var d = __define,c=TabBar,p=c.prototype;
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.createChildren = function () {
            if (!this.$layout) {
                var layout = new eui.HorizontalLayout();
                layout.gap = 0;
                layout.horizontalAlign = eui.JustifyAlign.JUSTIFY;
                layout.verticalAlign = eui.JustifyAlign.CONTENT_JUSTIFY;
                this.$setLayout(layout);
            }
            _super.prototype.createChildren.call(this);
        };
        /**
         * @private
         *
         * @param value
         */
        p.$setDataProvider = function (value) {
            var dp = this.$dataProvider;
            if (dp && dp instanceof eui.ViewStack) {
                dp.removeEventListener(eui.PropertyEvent.PROPERTY_CHANGE, this.onViewStackIndexChange, this);
                this.removeEventListener(egret.Event.CHANGE, this.onIndexChanged, this);
            }
            if (value && value instanceof eui.ViewStack) {
                value.addEventListener(eui.PropertyEvent.PROPERTY_CHANGE, this.onViewStackIndexChange, this);
                this.addEventListener(egret.Event.CHANGE, this.onIndexChanged, this);
            }
            return _super.prototype.$setDataProvider.call(this, value);
        };
        /**
         * @private
         * ??????????????????????????????
         */
        p.onIndexChanged = function (event) {
            this.indexBeingUpdated = true;
            (this.$dataProvider).selectedIndex = this.selectedIndex;
            this.indexBeingUpdated = false;
        };
        /**
         * @private
         * ViewStack?????????????????????
         */
        p.onViewStackIndexChange = function (event) {
            if (event.property == "selectedIndex" && !this.indexBeingUpdated) {
                this.setSelectedIndex((this.$dataProvider).selectedIndex, false);
            }
        };
        return TabBar;
    }(eui.ListBase));
    eui.TabBar = TabBar;
    egret.registerClass(TabBar,'eui.TabBar');
})(eui || (eui = {}));
var eui;
(function (eui) {
    var FocusEvent = egret.FocusEvent;
    /**
     *
     */
    /**
     * @language en_US
     * The TextInput is a textfield input component, the user can input and edit the text.
     *
     * @version Egret 2.5.7
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/TextInputExample.ts
     */
    /**
     * @language zh_CN
     * TextInput ????????????????????????????????????????????????????????????????????????
     *
     * @version Egret 2.5.7
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/TextInputExample.ts
     */
    var TextInput = (function (_super) {
        __extends(TextInput, _super);
        function TextInput() {
            _super.call(this);
            /**
             * @private
             */
            this.isFocus = false;
            this.$TextInput = {
                0: null,
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: "",
                7: null,
                8: egret.TextFieldInputType.TEXT //inputType
            };
        }
        var d = __define,c=TextInput,p=c.prototype;
        d(p, "prompt"
            /**
             * @copy eui.EditableText#prompt
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (this.promptDisplay) {
                    return this.promptDisplay.text;
                }
                return this.$TextInput[0 /* prompt */];
            }
            /**
             * @copy eui.EditableText#prompt
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function (value) {
                this.$TextInput[0 /* prompt */] = value;
                if (this.promptDisplay) {
                    this.promptDisplay.text = value;
                }
                this.invalidateProperties();
                this.invalidateState();
            }
        );
        d(p, "displayAsPassword"
            /**
             * @copy egret.TextField#displayAsPassword
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (this.textDisplay) {
                    return this.textDisplay.displayAsPassword;
                }
                var v = this.$TextInput[1 /* displayAsPassword */];
                return v ? v : false;
            }
            /**
             * @copy egret.TextField#displayAsPassword
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function (value) {
                this.$TextInput[1 /* displayAsPassword */] = value;
                if (this.textDisplay) {
                    this.textDisplay.displayAsPassword = value;
                }
                this.invalidateProperties();
            }
        );
        d(p, "inputType"
            /**
             * @copy egret.TextField#inputType
             *
             * @version Egret 3.1.6
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (this.textDisplay) {
                    return this.textDisplay.inputType;
                }
                return this.$TextInput[8 /* inputType */];
            }
            /**
             * @copy egret.TextField#inputType
             *
             * @version Egret 3.1.6
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function (value) {
                this.$TextInput[8 /* inputType */] = value;
                if (this.textDisplay) {
                    this.textDisplay.inputType = value;
                }
                this.invalidateProperties();
            }
        );
        d(p, "textColor"
            /**
             * @copy egret.TextField#textColor
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (this.textDisplay) {
                    return this.textDisplay.textColor;
                }
                return this.$TextInput[2 /* textColor */];
            }
            /**
             * @copy egret.TextField#textColor
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function (value) {
                this.$TextInput[2 /* textColor */] = value;
                if (this.textDisplay) {
                    this.textDisplay.textColor = value;
                }
                this.invalidateProperties();
            }
        );
        d(p, "maxChars"
            /**
             * @copy egret.TextField#maxChars
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (this.textDisplay) {
                    return this.textDisplay.maxChars;
                }
                var v = this.$TextInput[3 /* maxChars */];
                return v ? v : 0;
            }
            /**
             * @copy egret.TextField#maxChars
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function (value) {
                this.$TextInput[3 /* maxChars */] = value;
                if (this.textDisplay) {
                    this.textDisplay.maxChars = value;
                }
                this.invalidateProperties();
            }
        );
        d(p, "maxWidth"
            /**
             * @inheritDoc
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (this.textDisplay) {
                    return this.textDisplay.maxWidth;
                }
                var v = this.$TextInput[4 /* maxWidth */];
                return v ? v : 100000;
            }
            /**
             * @inheritDoc
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function (value) {
                this.$TextInput[4 /* maxWidth */] = value;
                if (this.textDisplay) {
                    this.textDisplay.maxWidth = value;
                }
                this.invalidateProperties();
            }
        );
        d(p, "maxHeight"
            /**
             * @inheritDoc
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (this.textDisplay) {
                }
                var v = this.$TextInput[5 /* maxHeight */];
                return v ? v : 100000;
            }
            /**
             * @inheritDoc
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function (value) {
                this.$TextInput[5 /* maxHeight */] = value;
                if (this.textDisplay) {
                    this.textDisplay.maxHeight = value;
                }
                this.invalidateProperties();
            }
        );
        d(p, "text"
            /**
             * @copy egret.TextField#text
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (this.textDisplay) {
                    return this.textDisplay.text;
                }
                return this.$TextInput[6 /* text */];
            }
            /**
             * @copy egret.TextField#text
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function (value) {
                this.$TextInput[6 /* text */] = value;
                if (this.textDisplay) {
                    this.textDisplay.text = value;
                }
                this.invalidateProperties();
                this.invalidateState();
            }
        );
        d(p, "restrict"
            /**
             * @copy egret.TextField#restrict
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                if (this.textDisplay) {
                    return this.textDisplay.restrict;
                }
                return this.$TextInput[7 /* restrict */];
            }
            /**
             * @copy egret.TextField#restrict
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function (value) {
                this.$TextInput[7 /* restrict */] = value;
                if (this.textDisplay) {
                    this.textDisplay.restrict = value;
                }
                this.invalidateProperties();
            }
        );
        /**
         * @private
         * ????????????
         */
        p.focusInHandler = function (event) {
            this.isFocus = true;
            this.invalidateState();
        };
        /**
         * @private
         * ????????????
         */
        p.focusOutHandler = function (event) {
            this.isFocus = false;
            this.invalidateState();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.5.7
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getCurrentState = function () {
            var skin = this.skin;
            if (this.prompt && !this.isFocus && !this.text) {
                if (this.enabled && skin.hasState("normalWithPrompt")) {
                    return "normalWithPrompt";
                }
                else if (!this.enabled && skin.hasState("disabledWithPrompt")) {
                    return "disabledWithPrompt";
                }
            }
            else {
                if (this.enabled) {
                    return "normal";
                }
                else {
                    return "disabled";
                }
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.5.7
         * @version eui 1.0
         * @platform Web,Native
         */
        p.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            var values = this.$TextInput;
            if (instance == this.textDisplay) {
                this.textDisplayAdded();
                if (this.textDisplay instanceof eui.EditableText) {
                    this.textDisplay.addEventListener(FocusEvent.FOCUS_IN, this.focusInHandler, this);
                    this.textDisplay.addEventListener(FocusEvent.FOCUS_OUT, this.focusOutHandler, this);
                }
            }
            else if (instance == this.promptDisplay) {
                if (values[0 /* prompt */]) {
                    this.promptDisplay.text = values[0 /* prompt */];
                }
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.5.7
         * @version eui 1.0
         * @platform Web,Native
         */
        p.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            if (instance == this.textDisplay) {
                this.textDisplayRemoved();
                if (this.textDisplay instanceof eui.EditableText) {
                    this.textDisplay.removeEventListener(FocusEvent.FOCUS_IN, this.focusInHandler, this);
                    this.textDisplay.removeEventListener(FocusEvent.FOCUS_OUT, this.focusOutHandler, this);
                }
            }
            else if (instance == this.promptDisplay) {
                this.$TextInput[0 /* prompt */] = this.promptDisplay.text;
            }
        };
        /**
         * @private
         */
        p.textDisplayAdded = function () {
            var values = this.$TextInput;
            if (values[1 /* displayAsPassword */]) {
                this.textDisplay.displayAsPassword = values[1 /* displayAsPassword */];
            }
            if (values[2 /* textColor */]) {
                this.textDisplay.textColor = values[2 /* textColor */];
            }
            if (values[3 /* maxChars */]) {
                this.textDisplay.maxChars = values[3 /* maxChars */];
            }
            if (values[4 /* maxWidth */]) {
                this.textDisplay.maxWidth = values[4 /* maxWidth */];
            }
            if (values[5 /* maxHeight */]) {
                this.textDisplay.maxHeight = values[5 /* maxHeight */];
            }
            if (values[6 /* text */]) {
                this.textDisplay.text = values[6 /* text */];
            }
            if (values[7 /* restrict */]) {
                this.textDisplay.restrict = values[7 /* restrict */];
            }
            if (values[8 /* inputType */]) {
                this.textDisplay.inputType = values[8 /* inputType */];
            }
        };
        /**
         * @private
         */
        p.textDisplayRemoved = function () {
            var values = this.$TextInput;
            values[1 /* displayAsPassword */] = this.textDisplay.displayAsPassword;
            values[2 /* textColor */] = this.textDisplay.textColor;
            values[3 /* maxChars */] = this.textDisplay.maxChars;
            values[4 /* maxWidth */] = this.textDisplay.maxWidth;
            values[5 /* maxHeight */] = this.textDisplay.maxHeight;
            values[6 /* text */] = this.textDisplay.text;
            values[7 /* restrict */] = this.textDisplay.restrict;
            values[8 /* inputType */] = this.textDisplay.inputType;
        };
        return TextInput;
    }(eui.Component));
    eui.TextInput = TextInput;
    egret.registerClass(TextInput,'eui.TextInput');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The ToggleSwitch control defines an on-off control.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ToggleSwitchExample.ts
     */
    /**
     * @language zh_CN
     * ToggleSwitch ???????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ToggleSwitchExample.ts
     */
    var ToggleSwitch = (function (_super) {
        __extends(ToggleSwitch, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function ToggleSwitch() {
            _super.call(this);
        }
        var d = __define,c=ToggleSwitch,p=c.prototype;
        return ToggleSwitch;
    }(eui.ToggleButton));
    eui.ToggleSwitch = ToggleSwitch;
    egret.registerClass(ToggleSwitch,'eui.ToggleSwitch');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The UILayer class is the subclass of the Group class.It not only has the standard function of the Group class,but also
     * can keep its size the same to the stage size (Stage.stageWidth,Stage.stageHeight).Its size will changes as the stage size changes.
     * like any normal container class,you can create multiple instance of the UILayer class,but it is usually used as the root of the UI display list.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * UILayer ??? Group ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????Stage.stageWidth,Stage.stageHeight??????
     * ??????????????????????????????????????????????????????????????????UILayer ???????????????????????????????????????????????????????????????????????????UI?????????????????????????????????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var UILayer = (function (_super) {
        __extends(UILayer, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function UILayer() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }
        var d = __define,c=UILayer,p=c.prototype;
        /**
         * @private
         * ???????????????
         */
        p.onAddToStage = function (event) {
            this.$stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.onResize();
        };
        /**
         * @private
         * ???????????????
         */
        p.onRemoveFromStage = function (event) {
            this.$stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
        };
        /**
         * @private
         * ??????????????????
         */
        p.onResize = function (event) {
            var stage = this.$stage;
            this.$setWidth(stage.$stageWidth);
            this.$setHeight(stage.$stageHeight);
        };
        return UILayer;
    }(eui.Group));
    eui.UILayer = UILayer;
    egret.registerClass(UILayer,'eui.UILayer');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The VScrollBar (vertical scrollbar) control lets you control
     * the portion of data that is displayed when there is too much data
     * to fit vertically in a display area.
     *
     * <p>Although you can use the VScrollBar control as a stand-alone control,
     * you usually combine it as part of another group of components to
     * provide scrolling functionality.</p>
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/VScrollBarExample.ts
     */
    /**
     * @language zh_CN
     * VScrollBar????????? ScrollBar????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * <p>?????? VScrollBar ?????????????????????????????????????????????????????????????????????????????????????????????</p>
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/VScrollBarExample.ts
     */
    var VScrollBar = (function (_super) {
        __extends(VScrollBar, _super);
        function VScrollBar() {
            _super.apply(this, arguments);
        }
        var d = __define,c=VScrollBar,p=c.prototype;
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var thumb = this.thumb;
            var viewport = this.$viewport;
            if (!thumb || !viewport) {
                return;
            }
            var bounds = egret.$TempRectangle;
            thumb.getPreferredBounds(bounds);
            var thumbHeight = bounds.height;
            var thumbX = bounds.x;
            var vsp = viewport.scrollV;
            var contentHeight = viewport.contentHeight;
            var height = viewport.height;
            if (vsp <= 0) {
                var scaleHeight = thumbHeight * (1 - (-vsp) / (height * 0.5));
                scaleHeight = Math.max(5, Math.round(scaleHeight));
                thumb.setLayoutBoundsSize(NaN, scaleHeight);
                thumb.setLayoutBoundsPosition(thumbX, 0);
            }
            else if (vsp >= contentHeight - height) {
                var scaleHeight = thumbHeight * (1 - (vsp - contentHeight + height) / (height * 0.5));
                scaleHeight = Math.max(5, Math.round(scaleHeight));
                thumb.setLayoutBoundsSize(NaN, scaleHeight);
                thumb.setLayoutBoundsPosition(thumbX, unscaledHeight - scaleHeight);
            }
            else {
                var thumbY = (unscaledHeight - thumbHeight) * vsp / (contentHeight - height);
                thumb.setLayoutBoundsSize(NaN, NaN);
                thumb.setLayoutBoundsPosition(thumbX, thumbY);
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.onPropertyChanged = function (event) {
            switch (event.property) {
                case "scrollV":
                case "contentHeight":
                    this.invalidateDisplayList();
                    break;
            }
        };
        return VScrollBar;
    }(eui.ScrollBarBase));
    eui.VScrollBar = VScrollBar;
    egret.registerClass(VScrollBar,'eui.VScrollBar');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The VSlider (vertical slider) control lets users select a value
     * by moving a slider thumb between the end points of the slider track.
     * The current value of the slider is determined by the relative location of the thumb between
     * the end points of the slider, corresponding to the slider's minimum and maximum values.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/VSliderExample.ts
     */
    /**
     * @language zh_CN
     * ?????? VSlider???????????????????????????????????????????????????????????????????????????????????????????????????
     * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/VSliderExample.ts
     */
    var VSlider = (function (_super) {
        __extends(VSlider, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function VSlider() {
            _super.call(this);
        }
        var d = __define,c=VSlider,p=c.prototype;
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.pointToValue = function (x, y) {
            if (!this.thumb || !this.track)
                return 0;
            var values = this.$Range;
            var range = values[0 /* maximum */] - values[2 /* minimum */];
            var thumbRange = this.getThumbRange();
            return values[2 /* minimum */] + ((thumbRange != 0) ? ((thumbRange - y) / thumbRange) * range : 0);
        };
        /**
         * @private
         *
         * @returns
         */
        p.getThumbRange = function () {
            var bounds = egret.$TempRectangle;
            this.track.getLayoutBounds(bounds);
            var thumbRange = bounds.height;
            this.thumb.getLayoutBounds(bounds);
            return thumbRange - bounds.height;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateSkinDisplayList = function () {
            if (!this.thumb || !this.track)
                return;
            var values = this.$Range;
            var thumbRange = this.getThumbRange();
            var range = values[0 /* maximum */] - values[2 /* minimum */];
            var thumbPosTrackY = (range > 0) ? thumbRange - (((this.pendingValue - values[2 /* minimum */]) / range) * thumbRange) : 0;
            var thumbPos = this.track.localToGlobal(0, thumbPosTrackY, egret.$TempPoint);
            var thumbPosX = thumbPos.x;
            var thumbPosY = thumbPos.y;
            var thumbPosParentY = this.thumb.$parent.globalToLocal(thumbPosX, thumbPosY, egret.$TempPoint).y;
            var bounds = egret.$TempRectangle;
            var thumbHeight = bounds.height;
            this.thumb.getLayoutBounds(bounds);
            this.thumb.setLayoutBoundsPosition(bounds.x, Math.round(thumbPosParentY));
            if (this.trackHighlight) {
                var trackHighlightY = this.trackHighlight.$parent.globalToLocal(thumbPosX, thumbPosY, egret.$TempPoint).y;
                this.trackHighlight.y = Math.round(trackHighlightY + thumbHeight);
                this.trackHighlight.height = Math.round(thumbRange - trackHighlightY);
            }
        };
        return VSlider;
    }(eui.SliderBase));
    eui.VSlider = VSlider;
    egret.registerClass(VSlider,'eui.VSlider');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * An ViewStack navigator container consists of a collection of child
     * containers stacked on top of each other, where only one child
     * at a time is visible.
     * When a different child container is selected, it seems to replace
     * the old one because it appears in the same location.
     * However, the old child container still exists; it is just invisible.
     *
     * @event eui.CollectionEvent.COLLECTION_CHANGE Dispatched when the ICollection has been updated in some way.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ViewStackExample.ts
     */
    /**
     * @language zh_CN
     * ViewStack ????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ????????????????????????????????????????????????????????????????????????????????????
     *
     * @event eui.CollectionEvent.COLLECTION_CHANGE ????????????????????? ICollection ????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ViewStackExample.ts
     */
    var ViewStack = (function (_super) {
        __extends(ViewStack, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function ViewStack() {
            _super.call(this);
            /**
             * @private
             */
            this._selectedChild = null;
            /**
             * @private
             * ???????????????????????????????????????
             */
            this.proposedSelectedIndex = eui.ListBase.NO_PROPOSED_SELECTION;
            /**
             * @private
             */
            this._selectedIndex = -1;
        }
        var d = __define,c=ViewStack,p=c.prototype;
        d(p, "layout"
            /**
             * @language en_US
             * The layout object for this container.
             * This object is responsible for the measurement and layout of
             * the visual elements in the container.
             *
             * @default eui.BasicLayout
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????? layout ??????????????????????????????????????????????????????????????????
             *
             * @default eui.BasicLayout
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$layout;
            }
        );
        d(p, "selectedChild"
            /**
             * @language en_US
             * A reference to the currently visible child container.
             * The default is a reference to the first child.
             * If there are no children, this property is <code>null</code>.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? <code>null</code>???
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                var index = this.selectedIndex;
                if (index >= 0 && index < this.numChildren)
                    return this.getChildAt(index);
                return null;
            }
            ,function (value) {
                var index = this.getChildIndex(value);
                if (index >= 0 && index < this.numChildren)
                    this.setSelectedIndex(index);
            }
        );
        d(p, "selectedIndex"
            /**
             * @language en_US
             * The zero-based index of the currently visible child container.
             * Child indexes are in the range 0, 1, 2, ..., n - 1,
             * where <code>n</code> is the number of children.
             * The default value is 0, corresponding to the first child.
             * If there are no children, the value of this property is <code>-1</code>.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????????????????????????? 0???1???2???...???n - 1????????? <code>n</code> ?????????????????????
             * ???????????? 0?????????????????????????????????????????????????????????????????????????????? -1???
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.proposedSelectedIndex != eui.ListBase.NO_PROPOSED_SELECTION ? this.proposedSelectedIndex : this._selectedIndex;
            }
            ,function (value) {
                value = +value | 0;
                this.setSelectedIndex(value);
            }
        );
        /**
         * @private
         * ?????????????????????
         */
        p.setSelectedIndex = function (value) {
            if (value == this.selectedIndex) {
                return;
            }
            this.proposedSelectedIndex = value;
            this.invalidateProperties();
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "selectedIndex");
        };
        /**
         * @private
         * ????????????????????????????????????????????????????????????addChild()???????????????????????????setChildIndex()???swapChildren??????????????????
         * ?????????????????????????????????????????????$childRemoved()?????????????????????$childAdded()?????????
         */
        p.$childAdded = function (child, index) {
            _super.prototype.$childAdded.call(this, child, index);
            this.showOrHide(child, false);
            var selectedIndex = this.selectedIndex;
            if (selectedIndex == -1) {
                this.setSelectedIndex(index);
            }
            else if (index <= this.selectedIndex && this.$stage) {
                this.setSelectedIndex(selectedIndex + 1);
            }
            eui.CollectionEvent.dispatchCollectionEvent(this, eui.CollectionEvent.COLLECTION_CHANGE, eui.CollectionEventKind.ADD, index, -1, [child.name]);
        };
        /**
         * @private
         * ?????????????????????????????????????????????????????????removeChild()???????????????????????????setChildIndex()???swapChildren??????????????????
         * ?????????????????????????????????????????????$childRemoved()?????????????????????$childAdded()?????????
         */
        p.$childRemoved = function (child, index) {
            _super.prototype.$childRemoved.call(this, child, index);
            this.showOrHide(child, true);
            var selectedIndex = this.selectedIndex;
            if (index == selectedIndex) {
                if (this.numChildren > 0) {
                    if (index == 0) {
                        this.proposedSelectedIndex = 0;
                        this.invalidateProperties();
                    }
                    else
                        this.setSelectedIndex(0);
                }
                else
                    this.setSelectedIndex(-1);
            }
            else if (index < selectedIndex) {
                this.setSelectedIndex(selectedIndex - 1);
            }
            eui.CollectionEvent.dispatchCollectionEvent(this, eui.CollectionEvent.COLLECTION_CHANGE, eui.CollectionEventKind.REMOVE, index, -1, [child.name]);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.proposedSelectedIndex != eui.ListBase.NO_PROPOSED_SELECTION) {
                this.commitSelection(this.proposedSelectedIndex);
                this.proposedSelectedIndex = eui.ListBase.NO_PROPOSED_SELECTION;
            }
        };
        /**
         * @private
         *
         * @param newIndex
         */
        p.commitSelection = function (newIndex) {
            if (newIndex >= 0 && newIndex < this.numChildren) {
                this._selectedIndex = newIndex;
                if (this._selectedChild) {
                    this.showOrHide(this._selectedChild, false);
                }
                this._selectedChild = this.getElementAt(this._selectedIndex);
                this.showOrHide(this._selectedChild, true);
            }
            else {
                this._selectedChild = null;
                this._selectedIndex = -1;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
        };
        /**
         * @private
         *
         * @param child
         * @param visible
         */
        p.showOrHide = function (child, visible) {
            if (egret.is(child, "eui.UIComponent")) {
                child.includeInLayout = visible;
            }
            child.visible = visible;
        };
        d(p, "length"
            /**
             * @language en_US
             * number of children
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$children.length;
            }
        );
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getItemAt = function (index) {
            var element = this.$children[index];
            return element ? element.name : "";
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getItemIndex = function (item) {
            var list = this.$children;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                if (list[i].name == item) {
                    return i;
                }
            }
            return -1;
        };
        return ViewStack;
    }(eui.Group));
    eui.ViewStack = ViewStack;
    egret.registerClass(ViewStack,'eui.ViewStack',["eui.ICollection","egret.IEventDispatcher"]);
    eui.registerBindable(ViewStack.prototype, "selectedIndex");
    if (DEBUG) {
        egret.$markReadOnly(ViewStack, "length");
        egret.$markReadOnly(ViewStack, "layout");
    }
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var sys;
    (function (sys) {
        /**
         * @private
         *
         * @param fraction
         * @returns
         */
        function sineInOut(fraction) {
            return -0.5 * (Math.cos(Math.PI * fraction) - 1);
        }
        /**
         * @private
         * ?????????????????????
         */
        var Animation = (function () {
            /**
             * @private
             */
            function Animation(updateFunction, thisObject) {
                /**
                 * @private
                 * ????????????????????????????????????null??????????????????????????????????????? sineInOut
                 */
                this.easerFunction = sineInOut;
                /**
                 * @private
                 * ??????????????????????????????????????????????????????????????????
                 */
                this.isPlaying = false;
                /**
                 * @private
                 * ??????????????????,????????????????????????500
                 */
                this.duration = 500;
                /**
                 * @private
                 * ????????????????????????????????????
                 */
                this.currentValue = 0;
                /**
                 * @private
                 * ?????????
                 */
                this.from = 0;
                /**
                 * @private
                 * ????????????
                 */
                this.to = 0;
                /**
                 * @private
                 * ??????????????????
                 */
                this.startTime = 0;
                /**
                 * @private
                 * ????????????????????????????????????
                 */
                this.endFunction = null;
                this.updateFunction = updateFunction;
                this.thisObject = thisObject;
            }
            var d = __define,c=Animation,p=c.prototype;
            /**
             * @private
             * ????????????????????????,??????????????????????????????????????????????????????????????????????????????????????????
             */
            p.play = function () {
                this.stop();
                this.start();
            };
            /**
             * @private
             * ??????????????????
             */
            p.start = function () {
                this.isPlaying = false;
                this.currentValue = 0;
                this.startTime = egret.getTimer();
                this.doInterval(this.startTime);
                egret.startTick(this.doInterval, this);
            };
            /**
             * @private
             * ??????????????????
             */
            p.stop = function () {
                this.isPlaying = false;
                this.startTime = 0;
                egret.stopTick(this.doInterval, this);
            };
            /**
             * @private
             * ??????????????????????????????????????????
             */
            p.doInterval = function (currentTime) {
                var runningTime = currentTime - this.startTime;
                if (!this.isPlaying) {
                    this.isPlaying = true;
                }
                var duration = this.duration;
                var fraction = duration == 0 ? 1 : Math.min(runningTime, duration) / duration;
                if (this.easerFunction) {
                    fraction = this.easerFunction(fraction);
                }
                this.currentValue = this.from + (this.to - this.from) * fraction;
                if (this.updateFunction)
                    this.updateFunction.call(this.thisObject, this);
                var isEnded = runningTime >= duration;
                if (isEnded) {
                    this.stop();
                }
                if (isEnded && this.endFunction) {
                    this.endFunction.call(this.thisObject, this);
                }
                return true;
            };
            return Animation;
        }());
        sys.Animation = Animation;
        egret.registerClass(Animation,'eui.sys.Animation');
    })(sys = eui.sys || (eui.sys = {}));
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * Default instance of interface <code>IThemeAdapter</code>.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ?????????IThemeAdapter???????????????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var DefaultThemeAdapter = (function () {
        function DefaultThemeAdapter() {
        }
        var d = __define,c=DefaultThemeAdapter,p=c.prototype;
        /**
         * ????????????
         * @param url ??????????????????url
         * @param compFunc ????????????????????????????????????compFunc(e:egret.Event):void;
         * @param errorFunc ????????????????????????????????????errorFunc():void;
         * @param thisObject ?????????this??????
         */
        p.getTheme = function (url, compFunc, errorFunc, thisObject) {
            function onGet(event) {
                var loader = (event.target);
                compFunc.call(thisObject, loader.response);
            }
            function onError(event) {
                errorFunc.call(thisObject);
            }
            var loader = new egret.HttpRequest();
            loader.addEventListener(egret.Event.COMPLETE, onGet, thisObject);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, thisObject);
            loader.responseType = egret.HttpResponseType.TEXT;
            loader.open(url);
            loader.send();
        };
        return DefaultThemeAdapter;
    }());
    eui.DefaultThemeAdapter = DefaultThemeAdapter;
    egret.registerClass(DefaultThemeAdapter,'eui.DefaultThemeAdapter',["eui.IThemeAdapter"]);
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var sys;
    (function (sys) {
        /**
         * @private
         * ?????????????????????????????????????????????
         */
        var MAX_VELOCITY_COUNT = 4;
        /**
         * @private
         * ???????????????????????????????????????
         */
        var VELOCITY_WEIGHTS = [1, 1.33, 1.66, 2];
        /**
         * @private
         * ??????????????????????????????
         */
        var CURRENT_VELOCITY_WEIGHT = 2.33;
        /**
         * @private
         * ??????????????????????????????????????????????????????
         */
        var MINIMUM_VELOCITY = 0.02;
        /**
         * @private
         * ????????????????????????????????????????????????
         */
        var FRICTION = 0.998;
        /**
         * @private
         * ?????????????????????????????????????????????????????????????????????????????????????????????
         */
        var EXTRA_FRICTION = 0.95;
        /**
         * @private
         * ???????????????????????????
         */
        var FRICTION_LOG = Math.log(FRICTION);
        /**
         * @private
         *
         * @param ratio
         * @returns
         */
        function easeOut(ratio) {
            var invRatio = ratio - 1.0;
            return invRatio * invRatio * invRatio + 1;
        }
        /**
         * @private
         * ???????????????,??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * ?????????????????????????????????????????? ScrollThrown ??????,???????????????????????????start()?????????????????????????????????????????????update()???????????????????????????
         * ???????????????????????????????????????????????????????????????????????????????????????????????????4???????????????????????????????????????finish()?????????
         * ????????????????????????????????????????????????????????????????????? Thrown.scrollTo ??? Thrown.duration ????????????
         */
        var TouchScroll = (function () {
            /**
             * @private
             * ???????????? TouchScroll ??????
             * @param updateFunction ??????????????????????????????
             */
            function TouchScroll(updateFunction, endFunction, target) {
                /**
                 * @private
                 * ??????????????????????????????????????????
                 */
                this.$scrollFactor = 1.0;
                /**
                 * @private
                 */
                this.previousTime = 0;
                /**
                 * @private
                 */
                this.velocity = 0;
                /**
                 * @private
                 */
                this.previousVelocity = [];
                /**
                 * @private
                 */
                this.currentPosition = 0;
                /**
                 * @private
                 */
                this.previousPosition = 0;
                /**
                 * @private
                 */
                this.currentScrollPos = 0;
                /**
                 * @private
                 */
                this.maxScrollPos = 0;
                /**
                 * @private
                 * ???????????????????????????
                 */
                this.offsetPoint = 0;
                this.$bounces = true;
                this.started = true;
                if (DEBUG && !updateFunction) {
                    egret.$error(1003, "updateFunction");
                }
                this.updateFunction = updateFunction;
                this.endFunction = endFunction;
                this.target = target;
                this.animation = new sys.Animation(this.onScrollingUpdate, this);
                this.animation.endFunction = this.finishScrolling;
                this.animation.easerFunction = easeOut;
            }
            var d = __define,c=TouchScroll,p=c.prototype;
            /**
             * @private
             * ????????????????????????????????????
             */
            p.isPlaying = function () {
                return this.animation.isPlaying;
            };
            /**
             * @private
             * ????????????????????????????????????????????????
             */
            p.stop = function () {
                this.animation.stop();
                egret.stopTick(this.onTick, this);
                this.started = false;
            };
            /**
             * @private
             * true?????????????????????start?????????
             */
            p.isStarted = function () {
                return this.started;
            };
            /**
             * @private
             * ????????????????????????????????????????????????????????????????????? finish() ?????????????????????????????????????????????????????????
             * @param touchPoint ???????????????????????????????????????????????????stageX???stageY???
             */
            p.start = function (touchPoint) {
                this.started = true;
                this.velocity = 0;
                this.previousVelocity.length = 0;
                this.previousTime = egret.getTimer();
                this.previousPosition = this.currentPosition = touchPoint;
                this.offsetPoint = touchPoint;
                egret.startTick(this.onTick, this);
            };
            /**
             * @private
             * ??????????????????????????????
             * @param touchPoint ???????????????????????????????????????????????????stageX???stageY???
             */
            p.update = function (touchPoint, maxScrollValue, scrollValue) {
                maxScrollValue = Math.max(maxScrollValue, 0);
                this.currentPosition = touchPoint;
                this.maxScrollPos = maxScrollValue;
                var disMove = this.offsetPoint - touchPoint;
                var scrollPos = disMove + scrollValue;
                this.offsetPoint = touchPoint;
                if (scrollPos < 0) {
                    if (!this.$bounces) {
                        scrollPos = 0;
                    }
                    else {
                        scrollPos -= disMove * 0.5;
                    }
                }
                if (scrollPos > maxScrollValue) {
                    if (!this.$bounces) {
                        scrollPos = maxScrollValue;
                    }
                    else {
                        scrollPos -= disMove * 0.5;
                    }
                }
                this.currentScrollPos = scrollPos;
                this.updateFunction.call(this.target, scrollPos);
            };
            /**
             * @private
             * ???????????????????????????????????????????????????????????????????????????
             * @param currentScrollPos ???????????????????????????
             * @param maxScrollPos ??????????????????????????????????????????????????? 0~maxValue?????????????????????????????????????????????????????????????????????????????????
             */
            p.finish = function (currentScrollPos, maxScrollPos) {
                egret.stopTick(this.onTick, this);
                this.started = false;
                var sum = this.velocity * CURRENT_VELOCITY_WEIGHT;
                var previousVelocityX = this.previousVelocity;
                var length = previousVelocityX.length;
                var totalWeight = CURRENT_VELOCITY_WEIGHT;
                for (var i = 0; i < length; i++) {
                    var weight = VELOCITY_WEIGHTS[i];
                    sum += previousVelocityX[0] * weight;
                    totalWeight += weight;
                }
                var pixelsPerMS = sum / totalWeight;
                var absPixelsPerMS = Math.abs(pixelsPerMS);
                var duration = 0;
                var posTo = 0;
                if (absPixelsPerMS > MINIMUM_VELOCITY) {
                    posTo = currentScrollPos + (pixelsPerMS - MINIMUM_VELOCITY) / FRICTION_LOG * 2 * this.$scrollFactor;
                    if (posTo < 0 || posTo > maxScrollPos) {
                        posTo = currentScrollPos;
                        while (Math.abs(pixelsPerMS) > MINIMUM_VELOCITY) {
                            posTo -= pixelsPerMS;
                            if (posTo < 0 || posTo > maxScrollPos) {
                                pixelsPerMS *= FRICTION * EXTRA_FRICTION;
                            }
                            else {
                                pixelsPerMS *= FRICTION;
                            }
                            duration++;
                        }
                    }
                    else {
                        duration = Math.log(MINIMUM_VELOCITY / absPixelsPerMS) / FRICTION_LOG;
                    }
                }
                else {
                    posTo = currentScrollPos;
                }
                if (this.target["$getThrowInfo"]) {
                    var event_1 = this.target["$getThrowInfo"](currentScrollPos, posTo);
                    posTo = event_1.toPos;
                }
                if (duration > 0) {
                    //?????????????????????,????????????????????????????????????
                    if (!this.$bounces) {
                        if (posTo < 0) {
                            posTo = 0;
                        }
                        else if (posTo > maxScrollPos) {
                            posTo = maxScrollPos;
                        }
                    }
                    this.throwTo(posTo, duration);
                }
                else {
                    this.finishScrolling();
                }
            };
            /**
             * @private
             *
             * @param timeStamp
             * @returns
             */
            p.onTick = function (timeStamp) {
                var timeOffset = timeStamp - this.previousTime;
                if (timeOffset > 10) {
                    var previousVelocity = this.previousVelocity;
                    if (previousVelocity.length >= MAX_VELOCITY_COUNT) {
                        previousVelocity.shift();
                    }
                    this.velocity = (this.currentPosition - this.previousPosition) / timeOffset;
                    previousVelocity.push(this.velocity);
                    this.previousTime = timeStamp;
                    this.previousPosition = this.currentPosition;
                }
                return true;
            };
            /**
             * @private
             *
             * @param animation
             */
            p.finishScrolling = function (animation) {
                var hsp = this.currentScrollPos;
                var maxHsp = this.maxScrollPos;
                var hspTo = hsp;
                if (hsp < 0) {
                    hspTo = 0;
                }
                if (hsp > maxHsp) {
                    hspTo = maxHsp;
                }
                this.throwTo(hspTo, 300);
            };
            /**
             * @private
             * ???????????????????????????
             */
            p.throwTo = function (hspTo, duration) {
                if (duration === void 0) { duration = 500; }
                var hsp = this.currentScrollPos;
                if (hsp == hspTo) {
                    this.endFunction.call(this.target);
                    return;
                }
                var animation = this.animation;
                animation.duration = duration;
                animation.from = hsp;
                animation.to = hspTo;
                animation.play();
            };
            /**
             * @private
             * ????????????????????????
             */
            p.onScrollingUpdate = function (animation) {
                this.currentScrollPos = animation.currentValue;
                this.updateFunction.call(this.target, animation.currentValue);
            };
            return TouchScroll;
        }());
        sys.TouchScroll = TouchScroll;
        egret.registerClass(TouchScroll,'eui.sys.TouchScroll');
    })(sys = eui.sys || (eui.sys = {}));
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * Defines values for setting the <code>direction</code> property
     * of the <code>ProgressBar</code> class.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/core/DirectionExample.ts
     */
    /**
     * @language zh_CN
     * ?????????????????????????????????????????????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/core/DirectionExample.ts
     */
    var Direction = (function () {
        function Direction() {
        }
        var d = __define,c=Direction,p=c.prototype;
        /**
         * @language en_US
         * Specifies left-to-right direction.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Direction.LTR = "ltr";
        /**
         * @language en_US
         * Specifies right-to-left direction.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Direction.RTL = "rtl";
        /**
         * @language en_US
         * Specifies top-to-bottom direction.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Direction.TTB = "ttb";
        /**
         * @language en_US
         * Specifies bottom-to-top direction.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Direction.BTT = "btt";
        return Direction;
    }());
    eui.Direction = Direction;
    egret.registerClass(Direction,'eui.Direction');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * Values for the <code>horizontalCanScroll</code> and
     * <code>verticalCanScroll</code> properties of the Scroller classes.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/core/ScrollPolicyExample.ts
     */
    /**
     * @language zh_CN
     * ??????????????????????????????
     * Scroller ?????? <code>horizontalCanScroll</code> ??? <code>verticalCanScroll</code> ???????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/core/ScrollPolicyExample.ts
     */
    var ScrollPolicy = (function () {
        function ScrollPolicy() {
        }
        var d = __define,c=ScrollPolicy,p=c.prototype;
        /**
         * @language en_US
         * Show the scrollbar if the children exceed the owner's dimension.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        ScrollPolicy.AUTO = "auto";
        /**
         * @language en_US
         * Never show the scrollbar.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        ScrollPolicy.OFF = "off";
        /**
         * @language en_US
         * Always show the scrollbar.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        ScrollPolicy.ON = "on";
        return ScrollPolicy;
    }());
    eui.ScrollPolicy = ScrollPolicy;
    egret.registerClass(ScrollPolicy,'eui.ScrollPolicy');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * Note: The skin name values in the skin theme are used as default values,which can not be changed while running.
     * You can change the skin of a component with the skinName property.
     * @event egret.Event.COMPLETE Dispatch when EXML used in this theme is loaded and parsed.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/core/ThemeExample.ts
     */
    /**
     * @language zh_CN
     * ??????????????????????????????????????????????????????????????????,???????????????????????????????????????????????????????????????????????????????????????Component.skinName??????????????????
     * @event egret.Event.COMPLETE ??????????????????EXML???????????????????????????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/core/ThemeExample.ts
     */
    var Theme = (function (_super) {
        __extends(Theme, _super);
        /**
         * @language en_US
         * Create an instance of Theme
         * @param configURL the external theme path. if null, you need to register the default skin name with
         * mapSkin() manually.
         * @param stage current stage.
         * If null, you need to register with egret.registerImplementation("eui.Theme",theme)
         * manually.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         * @param configURL ??????????????????????????????????????????????????????????????? null????????????????????????????????????
         * ???????????????????????????????????????????????? mapSkin() ?????????????????????????????????????????????
         * @param stage ?????????????????????
         * ?????????null?????????????????????????????? egret.registerImplementation("eui.Theme",theme) ???????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function Theme(configURL, stage) {
            _super.call(this);
            /**
             * @private
             */
            this.delayList = [];
            /**
             * @private
             */
            this.skinMap = {};
            /**
             * @private
             * styles ????????????
             */
            this.$styles = {};
            this.initialized = !configURL;
            if (stage) {
                egret.registerImplementation("eui.Theme", this);
            }
            this.$configURL = configURL;
            this.load(configURL);
        }
        var d = __define,c=Theme,p=c.prototype;
        /**
         * @private
         *
         * @param url
         */
        p.load = function (url) {
            var adapter = egret.getImplementation("eui.IThemeAdapter");
            if (!adapter) {
                adapter = new eui.DefaultThemeAdapter();
            }
            adapter.getTheme(url, this.onConfigLoaded, this.onConfigLoaded, this);
        };
        /**
         * @private
         *
         * @param str
         */
        p.onConfigLoaded = function (str) {
            var data;
            if (str) {
                if (DEBUG) {
                    try {
                        data = JSON.parse(str);
                    }
                    catch (e) {
                        egret.$error(3000);
                    }
                }
                else {
                    data = JSON.parse(str);
                }
            }
            else if (DEBUG) {
                egret.$error(3000, this.$configURL);
            }
            if (data && data.skins) {
                var skinMap = this.skinMap;
                var skins = data.skins;
                var keys = Object.keys(skins);
                var length_17 = keys.length;
                for (var i = 0; i < length_17; i++) {
                    var key = keys[i];
                    if (!skinMap[key]) {
                        this.mapSkin(key, skins[key]);
                    }
                }
            }
            if (data.styles) {
                this.$styles = data.styles;
            }
            if (!data.exmls || data.exmls.length == 0) {
                this.onLoaded();
            }
            else if (data.exmls[0]['gjs']) {
                data.exmls.forEach(function (exml) { return EXML.$parseURLContentAsJs(exml.path, exml.gjs, exml.className); });
                this.onLoaded();
            }
            else if (data.exmls[0]['content']) {
                data.exmls.forEach(function (exml) { return EXML.$parseURLContent(exml.path, exml.content); });
                this.onLoaded();
            }
            else {
                EXML.$loadAll(data.exmls, this.onLoaded, this, true);
            }
        };
        p.onLoaded = function (classes, urls) {
            this.initialized = true;
            this.handleDelayList();
            this.dispatchEventWith(egret.Event.COMPLETE);
        };
        /**
         * @private
         *
         */
        p.handleDelayList = function () {
            var list = this.delayList;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var client = list[i];
                if (!client.$Component[5 /* skinNameExplicitlySet */]) {
                    var skinName = this.getSkinName(client);
                    if (skinName) {
                        client.$Component[1 /* skinName */] = skinName;
                        client.$parseSkinName();
                    }
                }
            }
            list.length = 0;
        };
        /**
         * @language en_US
         * According to the host component to get the default skin name.
         * Search rules are as follows:
         * <li>1. Use the <code>hostComponentKey</code> of client to search.</li>
         * <li>2. Use the class name of client to search.</li>
         * <li>3. Use the parent class name of client to search.</li>
         * <li>4. Repeat step 3 until find the skin name or the parent is <code>eui.Component</code>.</li>
         * @param client the component need to get the default skin.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????
         * <li>1.??????client???hostComponentKey?????????????????????????????????</li>
         * <li>2.??????client??????????????????????????????????????????</li>
         * <li>3.??????client?????????????????????????????????????????????</li>
         * <li>4.????????????3????????????????????????????????????eui.Component????????????</li>
         * @param client ?????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getSkinName = function (client) {
            if (!this.initialized) {
                if (this.delayList.indexOf(client) == -1) {
                    this.delayList.push(client);
                }
                return "";
            }
            var skinMap = this.skinMap;
            var skinName = skinMap[client.hostComponentKey];
            if (!skinName) {
                skinName = this.findSkinName(client);
            }
            return skinName;
        };
        /**
         * @private
         */
        p.findSkinName = function (prototype) {
            if (!prototype) {
                return "";
            }
            var key = prototype["__class__"];
            if (key === void 0) {
                return "";
            }
            var skinName = this.skinMap[key];
            if (skinName || key == "eui.Component") {
                return skinName;
            }
            return this.findSkinName(Object.getPrototypeOf(prototype));
        };
        /**
         * @language en_US
         * Map a default skin for the specified host component.
         * @param hostComponentKey the name of host component, such as "eui.Button".
         * @param skinName the name of skin, such as "app.MyButtonSkin".
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????
         * @param hostComponentKey ?????????????????????????????????eui.Button??????
         * @param skinName ???????????? ?????????"app.MyButtonSkin"???
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.mapSkin = function (hostComponentKey, skinName) {
            if (DEBUG) {
                if (!hostComponentKey) {
                    egret.$error(1003, "hostComponentKey");
                }
                if (!skinName) {
                    egret.$error(1003, "skinName");
                }
            }
            this.skinMap[hostComponentKey] = skinName;
        };
        p.$getStyleConfig = function (style) {
            return this.$styles[style];
        };
        return Theme;
    }(egret.EventDispatcher));
    eui.Theme = Theme;
    egret.registerClass(Theme,'eui.Theme');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The eui.CollectionEvent class represents an event that is
     * dispatched when the associated collection changes.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/events/CollectionEventExample.ts
     */
    /**
     * @language zh_CN
     * ??????????????????????????????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/events/CollectionEventExample.ts
     */
    var CollectionEvent = (function (_super) {
        __extends(CollectionEvent, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @param type The event type; indicates the action that triggered the event.
         * @param bubbles Specifies whether the event can bubble
         * up the display list hierarchy.
         * @param cancelable Specifies whether the behavior
         * associated with the event can be prevented.
         * @param kind Indicates the kind of event that occured.
         * The parameter value can be one of the values in the CollectionEventKind
         * class, or <code>null</code>, which indicates that the kind is unknown.
         * @param location When the <code>kind</code> is
         * <code>CollectionEventKind.ADD</code>,
         * <code>CollectionEventKind.REMOVE</code>,
         * <code>CollectionEventKind.REPLACE</code>,or
         * <code>CollectionEventKind.UPDATE</code>
         * this value indicates at what location the item(s) specified
         * in the <code>items property</code> can be found
         * within the target collection.
         * @param oldLocation this value indicates
         * the old location within the target collection
         * of the item(s) specified in the <code>items</code> property.
         * @param items Array of objects with information about the items
         * affected by the event.
         * @param oldItems When the <code>kine</code> is <code>CollectionEventKind.REPLACE</code> the value represents
         * a list of items before replaced.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? CollectionEvent ??????
         *
         * @param type ?????????????????????????????????????????????
         * @param bubbles ???????????????????????????????????????????????????????????????????????????
         * @param cancelable ??????????????????????????????????????????????????????
         * @param kind ??????????????????????????????????????????????????? CollectionEventKind ????????????????????????????????? null??????????????????????????????
         * @param location ?????? kind ?????? <code>CollectionEventKind.ADD</code>,
         * <code>CollectionEventKind.REMOVE</code>,
         * <code>CollectionEventKind.REPLACE</code>,???
         * <code>CollectionEventKind.UPDATE</code>
         * ??????????????? items ????????????????????????????????????????????????????????????
         * @param oldLocation ???????????? <code>items</code> ?????????????????????????????????????????????????????????
         * @param items ????????????????????????????????????
         * @param oldItems ??????kind?????????CollectionEventKind.REPLACE???????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function CollectionEvent(type, bubbles, cancelable, kind, location, oldLocation, items, oldItems) {
            _super.call(this, type, bubbles, cancelable);
            this.$initTo(kind, location, oldLocation, items, oldItems);
        }
        var d = __define,c=CollectionEvent,p=c.prototype;
        /**
         * @private
         *
         * @param kind
         * @param location
         * @param oldLocation
         * @param items
         * @param oldItems
         */
        p.$initTo = function (kind, location, oldLocation, items, oldItems) {
            this.kind = kind;
            this.location = +location | 0;
            this.oldLocation = +oldLocation | 0;
            this.items = items || [];
            this.oldItems = oldItems || [];
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.clean = function () {
            _super.prototype.clean.call(this);
            this.items = this.oldItems = null;
        };
        /**
         * @language en_US
         * Dispatch an event with specified EventDispatcher. The dispatched event will be cached in the object pool,
         * for the next cycle of reuse.
         *
         * @param target the target of event dispatcher.
         * @param eventType The event type; indicates the action that triggered the event.
         * @param kind Indicates the kind of event that occured.
         * The parameter value can be one of the values in the CollectionEventKind
         * class, or <code>null</code>, which indicates that the kind is unknown.
         * @param location When the <code>kind</code> is
         * <code>CollectionEventKind.ADD</code>,
         * <code>CollectionEventKind.REMOVE</code>,
         * <code>CollectionEventKind.REPLACE</code>,or
         * <code>CollectionEventKind.UPDATE</code>
         * this value indicates at what location the item(s) specified
         * in the <code>items property</code> can be found
         * within the target collection.
         * @param oldLocation this value indicates
         * the old location within the target collection
         * of the item(s) specified in the <code>items</code> property.
         * @param items Array of objects with information about the items
         * affected by the event.
         * @param oldItems When the <code>kine</code> is <code>CollectionEventKind.REPLACE</code> the value represents
         * a list of items before replaced.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????EventDispatcher???????????????????????????????????????????????????????????????????????????????????????????????????
         *
         * @param target ?????????????????????
         * @param eventType ?????????????????????????????????????????????
         * @param kind ??????????????????????????????????????????????????? CollectionEventKind ????????????????????????????????? null??????????????????????????????
         * @param location ?????? kind ?????? <code>CollectionEventKind.ADD</code>,
         * <code>CollectionEventKind.REMOVE</code>,
         * <code>CollectionEventKind.REPLACE</code>,???
         * <code>CollectionEventKind.UPDATE</code>
         * ??????????????? items ????????????????????????????????????????????????????????????
         * @param oldLocation ???????????? <code>items</code> ?????????????????????????????????????????????????????????
         * @param items ????????????????????????????????????
         * @param oldItems ??????kind?????????CollectionEventKind.REPLACE???????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        CollectionEvent.dispatchCollectionEvent = function (target, eventType, kind, location, oldLocation, items, oldItems) {
            if (!target.hasEventListener(eventType)) {
                return true;
            }
            var event = egret.Event.create(CollectionEvent, eventType);
            event.$initTo(kind, location, oldLocation, items, oldItems);
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * @language en_US
         * Dispatched when a collection has changed.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        CollectionEvent.COLLECTION_CHANGE = "collectionChange";
        return CollectionEvent;
    }(egret.Event));
    eui.CollectionEvent = CollectionEvent;
    egret.registerClass(CollectionEvent,'eui.CollectionEvent');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The CollectionEventKind class contains constants for the valid values
     * of the <code>CollectionEvent</code> class <code>kind</code> property.
     * These constants indicate the kind of change that was made to the collection.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ?????? <code>CollectionEvent</code> ??? <code>kind</code> ??????????????????????????????
     * ???????????????????????????????????????????????????

     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var CollectionEventKind = (function () {
        function CollectionEventKind() {
        }
        var d = __define,c=CollectionEventKind,p=c.prototype;
        /**
         * @language en_US
         * Indicates that the collection added an item or items.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        CollectionEventKind.ADD = "add";
        /**
         * @language en_US
         * Indicates that the collection applied a sort, a filter, or both.
         * This change can potentially be easier to handle than a RESET.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????/????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        CollectionEventKind.REFRESH = "refresh";
        /**
         * @language en_US
         * Indicates that the collection removed an item or items.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        CollectionEventKind.REMOVE = "remove";
        /**
         * @language en_US
         * Indicates that the item at the position identified by the
         * CollectionEvent <code>location</code> property has been replaced.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????? CollectionEvent.location ????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        CollectionEventKind.REPLACE = "replace";
        /**
         * @language en_US
         * Indicates that the collection has changed so drastically that
         * a reset is required.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        CollectionEventKind.RESET = "reset";
        /**
         * @language en_US
         * Indicates that one or more items were updated within the collection.
         * The affected item(s)
         * are stored in the <code>CollectionEvent.items</code> property.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????????????????????????????????????????????????????  CollectionEvent.items ????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        CollectionEventKind.UPDATE = "update";
        return CollectionEventKind;
    }());
    eui.CollectionEventKind = CollectionEventKind;
    egret.registerClass(CollectionEventKind,'eui.CollectionEventKind');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * Represents events that are dispatched when a item has been touched.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/events/ItemTapEventExample.ts
     */
    /**
     * @language zh_CN
     * ?????????????????????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/events/ItemTapEventExample.ts
     */
    var ItemTapEvent = (function (_super) {
        __extends(ItemTapEvent, _super);
        function ItemTapEvent() {
            _super.apply(this, arguments);
            /**
             * @language en_US
             * The item in the data provider of the associated item.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.item = null;
            /**
             * @language en_US
             * The item renderer in the list of the associated item.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.itemRenderer = null;
            /**
             * @language en_US
             * The index of the associated navigation item.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.itemIndex = -1;
        }
        var d = __define,c=ItemTapEvent,p=c.prototype;
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.clean = function () {
            _super.prototype.clean.call(this);
            this.item = this.itemRenderer = null;
        };
        /**
         * @language en_US
         * Dispatch an event with specified EventDispatcher. The dispatched event will be cached in the object pool,
         * for the next cycle of reuse.
         *
         * @param target the target of event dispatcher.
         * @param eventType The event type; indicates the action that triggered the event.
         * @param itemRenderer The item renderer in the list of the associated item.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????? EventDispatcher ???????????????????????????????????????????????????????????????????????????????????????????????????
         *
         * @param target ??????????????????
         * @param eventType ?????????????????????????????????????????????
         * @param itemRenderer ????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        ItemTapEvent.dispatchItemTapEvent = function (target, eventType, itemRenderer) {
            if (!target.hasEventListener(eventType)) {
                return true;
            }
            var event = egret.Event.create(ItemTapEvent, eventType);
            event.item = itemRenderer.data;
            event.itemIndex = itemRenderer.itemIndex;
            event.itemRenderer = itemRenderer;
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * @language en_US
         * The type of the event object for an <code>itemTap</code> event.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * <code>itemTap</code> ????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        ItemTapEvent.ITEM_TAP = "itemTap";
        return ItemTapEvent;
    }(egret.Event));
    eui.ItemTapEvent = ItemTapEvent;
    egret.registerClass(ItemTapEvent,'eui.ItemTapEvent');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The PropertyChangeEvent class represents the event object
     * passed to the event listener when one of the properties of
     * an object has changed, and provides information about the change.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/events/PropertyEventExample.ts
     */
    /**
     * @language zh_CN
     * ????????????????????????????????????????????????????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/events/PropertyEventExample.ts
     */
    var PropertyEvent = (function (_super) {
        __extends(PropertyEvent, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @param type The event type; indicates the action that triggered the event.
         * @param bubbles Specifies whether the event can bubble
         * up the display list hierarchy.
         * @param cancelable Specifies whether the behavior
         * associated with the event can be prevented.
         * @param property Name of the property that changed.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         *
         * @param type ?????????????????????????????????????????????
         * @param bubbles ???????????????????????????????????????????????????????????????????????????
         * @param cancelable ??????????????????????????????????????????????????????
         * @param property ??????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function PropertyEvent(type, bubbles, cancelable, property) {
            _super.call(this, type, bubbles, cancelable);
            this.property = property;
        }
        var d = __define,c=PropertyEvent,p=c.prototype;
        /**
         * @language en_US
         * Dispatch an event with specified EventDispatcher. The dispatched event will be cached in the object pool,
         * for the next cycle of reuse.
         *
         * @param target the target of event dispatcher.
         * @param eventType The event type; indicates the action that triggered the event.
         * @param property Name of the property that changed.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????? EventDispatcher ???????????????????????????????????????????????????????????????????????????????????????????????????
         *
         * @param target ??????????????????
         * @param eventType ?????????????????????????????????????????????
         * @param property ??????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        PropertyEvent.dispatchPropertyEvent = function (target, eventType, property) {
            if (!target.hasEventListener(eventType)) {
                return true;
            }
            var event = egret.Event.create(PropertyEvent, eventType);
            event.property = property;
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * @language en_US
         * Dispatch when a property changed.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        PropertyEvent.PROPERTY_CHANGE = "propertyChange";
        return PropertyEvent;
    }(egret.Event));
    eui.PropertyEvent = PropertyEvent;
    egret.registerClass(PropertyEvent,'eui.PropertyEvent');
})(eui || (eui = {}));
var eui;
(function (eui) {
    /**
     * @private
     */
    var ScrollerThrowEvent = (function (_super) {
        __extends(ScrollerThrowEvent, _super);
        /**
         * ?????????????????????????????????
         */
        //public tween;
        function ScrollerThrowEvent(type, bubbles, cancelable, currentPos, toPos) {
            _super.call(this, type, bubbles, cancelable);
            currentPos = +currentPos;
            toPos = +toPos;
            this.currentPos = currentPos;
            this.toPos = toPos;
        }
        var d = __define,c=ScrollerThrowEvent,p=c.prototype;
        ScrollerThrowEvent.THROW = "throw";
        return ScrollerThrowEvent;
    }(egret.Event));
    eui.ScrollerThrowEvent = ScrollerThrowEvent;
    egret.registerClass(ScrollerThrowEvent,'eui.ScrollerThrowEvent');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The UIEvent class represents the event object passed to
     * the event listener for many UI events.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/events/UIEventExample.ts
     */
    /**
     * @language zh_CN
     * UI??????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/events/UIEventExample.ts
     */
    var UIEvent = (function (_super) {
        __extends(UIEvent, _super);
        /**
         * @language en_US
         * Constructor.
         *
         * @param type The event type; indicates the action that triggered the event.
         * @param bubbles Specifies whether the event can bubble
         * up the display list hierarchy.
         * @param cancelable Specifies whether the behavior
         * associated with the event can be prevented.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????? UIEvent ??????
         *
         * @param type ?????????????????????????????????????????????
         * @param bubbles ???????????????????????????????????????????????????????????????????????????
         * @param cancelable ??????????????????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function UIEvent(type, bubbles, cancelable) {
            _super.call(this, type, bubbles, cancelable);
        }
        var d = __define,c=UIEvent,p=c.prototype;
        /**
         * @language en_US
         * Dispatch an event with specified EventDispatcher. The dispatched event will be cached in the object pool,
         * for the next cycle of reuse.
         *
         * @param target the target of event dispatcher.
         * @param eventType The event type; indicates the action that triggered the event.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????EventDispatcher???????????????????????????????????????????????????????????????????????????????????????????????????
         *
         * @param target ?????????????????????
         * @param eventType ?????????????????????????????????????????????
         * @param bubbles  ?????? Event ????????????????????????????????????????????????????????? false???
         * @param cancelable ???????????????????????? Event ????????????????????? false???
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        UIEvent.dispatchUIEvent = function (target, eventType, bubbles, cancelable) {
            if (!target.hasEventListener(eventType)) {
                return true;
            }
            var event = egret.Event.create(UIEvent, eventType, bubbles, cancelable);
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * @language en_US
         * creation complete of component.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        UIEvent.CREATION_COMPLETE = "creationComplete";
        /**
         * @language en_US
         * the ending of change.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        UIEvent.CHANGE_END = "changeEnd";
        /**
         * @language en_US
         * The beginning of change.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        UIEvent.CHANGE_START = "changeStart";
        /**
         * @language en_US
         * Before close the panel.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        UIEvent.CLOSING = "closing";
        /**
         * @language en_US
         * The coordinates of the UI components changed in it's parent.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * UI???????????????????????????????????????????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        UIEvent.MOVE = "move";
        return UIEvent;
    }(egret.Event));
    eui.UIEvent = UIEvent;
    egret.registerClass(UIEvent,'eui.UIEvent');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var sys;
    (function (sys) {
        var STATE = "eui.State";
        var ADD_ITEMS = "eui.AddItems";
        var SET_PROPERTY = "eui.SetProperty";
        var SET_STATEPROPERTY = "eui.SetStateProperty";
        var BINDING_PROPERTIES = "eui.Binding.$bindProperties";
        /**
         * @private
         * ????????????????????????
         */
        var CodeBase = (function () {
            function CodeBase() {
                /**
                 * @private
                 */
                this.indent = 0;
            }
            var d = __define,c=CodeBase,p=c.prototype;
            /**
             * @private
             *
             * @returns
             */
            p.toCode = function () {
                return "";
            };
            /**
             * @private
             * ?????????????????????
             */
            p.getIndent = function (indent) {
                if (indent === void 0)
                    indent = this.indent;
                var str = "";
                for (var i = 0; i < indent; i++) {
                    str += "	";
                }
                return str;
            };
            return CodeBase;
        }());
        sys.CodeBase = CodeBase;
        egret.registerClass(CodeBase,'eui.sys.CodeBase');
        /**
         * @private
         */
        var EXClass = (function (_super) {
            __extends(EXClass, _super);
            function EXClass() {
                _super.apply(this, arguments);
                /**
                 * @private
                 * ??????,??????????????????
                 */
                this.className = "";
                /**
                 * @private
                 * ????????????,?????????????????????
                 */
                this.superClass = "";
                /**
                 * @private
                 * ???????????????
                 */
                this.innerClassBlock = [];
                /**
                 * @private
                 * ??????????????????
                 */
                this.variableBlock = [];
                /**
                 * @private
                 * ??????????????????
                 */
                this.functionBlock = [];
            }
            var d = __define,c=EXClass,p=c.prototype;
            /**
             * @private
             * ?????????????????????
             */
            p.addInnerClass = function (clazz) {
                if (this.innerClassBlock.indexOf(clazz) == -1) {
                    this.innerClassBlock.push(clazz);
                }
            };
            /**
             * @private
             * ????????????
             */
            p.addVariable = function (variableItem) {
                if (this.variableBlock.indexOf(variableItem) == -1) {
                    this.variableBlock.push(variableItem);
                }
            };
            /**
             * @private
             * ?????????????????????????????????
             */
            p.getVariableByName = function (name) {
                var list = this.variableBlock;
                var length = list.length;
                for (var i = 0; i < length; i++) {
                    var item = list[i];
                    if (item.name == name) {
                        return item;
                    }
                }
                return null;
            };
            /**
             * @private
             * ????????????
             */
            p.addFunction = function (functionItem) {
                if (this.functionBlock.indexOf(functionItem) == -1) {
                    this.functionBlock.push(functionItem);
                }
            };
            /**
             * @private
             * ????????????????????????????????????
             */
            p.getFuncByName = function (name) {
                var list = this.functionBlock;
                var length = list.length;
                for (var i = 0; i < length; i++) {
                    var item = list[i];
                    if (item.name == name) {
                        return item;
                    }
                }
                return null;
            };
            /**
             * @private
             *
             * @returns
             */
            p.toCode = function () {
                var indent = this.indent;
                var indentStr = this.getIndent(indent);
                var indent1Str = this.getIndent(indent + 1);
                var indent2Str = this.getIndent(indent + 2);
                //??????????????????
                var returnStr = indentStr + "(function (";
                if (this.superClass) {
                    returnStr += "_super) {\n" + indent1Str + "__extends(" + this.className + ", _super);\n";
                }
                else {
                    returnStr += ") {\n";
                }
                //?????????????????????
                var innerClasses = this.innerClassBlock;
                var length = innerClasses.length;
                for (var i = 0; i < length; i++) {
                    var clazz = innerClasses[i];
                    clazz.indent = indent + 1;
                    returnStr += indent1Str + "var " + clazz.className + " = " + clazz.toCode() + "\n\n";
                }
                returnStr += indent1Str + "function " + this.className + "() {\n";
                if (this.superClass) {
                    returnStr += indent2Str + "_super.call(this);\n";
                }
                //??????????????????
                var variables = this.variableBlock;
                length = variables.length;
                for (var i = 0; i < length; i++) {
                    var variable = variables[i];
                    if (variable.defaultValue) {
                        returnStr += indent2Str + variable.toCode() + "\n";
                    }
                }
                //??????????????????
                if (this.constructCode) {
                    var codes = this.constructCode.toCode().split("\n");
                    length = codes.length;
                    for (var i = 0; i < length; i++) {
                        var code = codes[i];
                        returnStr += indent2Str + code + "\n";
                    }
                }
                returnStr += indent1Str + "}\n";
                returnStr += indent1Str + "var _proto = " + this.className + ".prototype;\n\n";
                //??????????????????
                var functions = this.functionBlock;
                length = functions.length;
                for (var i = 0; i < length; i++) {
                    var functionItem = functions[i];
                    functionItem.indent = indent + 1;
                    returnStr += functionItem.toCode() + "\n";
                }
                //???????????????
                returnStr += indent1Str + "return " + this.className + ";\n" + indentStr;
                if (this.superClass) {
                    returnStr += "})(" + this.superClass + ");";
                }
                else {
                    returnStr += "})();";
                }
                return returnStr;
            };
            return EXClass;
        }(CodeBase));
        sys.EXClass = EXClass;
        egret.registerClass(EXClass,'eui.sys.EXClass');
        /**
         * @private
         */
        var EXCodeBlock = (function (_super) {
            __extends(EXCodeBlock, _super);
            function EXCodeBlock() {
                _super.apply(this, arguments);
                /**
                 * @private
                 */
                this.lines = [];
            }
            var d = __define,c=EXCodeBlock,p=c.prototype;
            /**
             * @private
             * ????????????????????????
             * @param name ?????????
             * @param value ???????????????
             */
            p.addVar = function (name, value) {
                var valueStr = value ? " = " + value : "";
                this.addCodeLine("var " + name + valueStr + ";");
            };
            /**
             * @private
             * ??????????????????
             * @param target ??????????????????
             * @param value ???
             * @param prop ???????????????(??????.?????????)??????????????????????????????
             */
            p.addAssignment = function (target, value, prop) {
                var propStr = prop ? "." + prop : "";
                this.addCodeLine(target + propStr + " = " + value + ";");
            };
            /**
             * @private
             * ?????????????????????
             */
            p.addReturn = function (data) {
                this.addCodeLine("return " + data + ";");
            };
            /**
             * @private
             * ??????????????????
             */
            p.addEmptyLine = function () {
                this.addCodeLine("");
            };
            /**
             * @private
             * ????????????if?????????,????????????startBlock();
             */
            p.startIf = function (expression) {
                this.addCodeLine("if(" + expression + ")");
                this.startBlock();
            };
            /**
             * @private
             * ??????else?????????,????????????startBlock();
             */
            p.startElse = function () {
                this.addCodeLine("else");
                this.startBlock();
            };
            /**
             * @private
             * ??????else if?????????,????????????startBlock();
             */
            p.startElseIf = function (expression) {
                this.addCodeLine("else if(" + expression + ")");
                this.startBlock();
            };
            /**
             * @private
             * ????????????????????????????????????????????????
             */
            p.startBlock = function () {
                this.addCodeLine("{");
                this.indent++;
            };
            /**
             * @private
             * ????????????????????????,????????????????????????
             */
            p.endBlock = function () {
                this.indent--;
                this.addCodeLine("}");
            };
            /**
             * @private
             * ???????????????????????????
             * @param functionName ????????????????????????
             * @param args ??????????????????
             */
            p.doFunction = function (functionName, args) {
                var argsStr = args.join(",");
                this.addCodeLine(functionName + "(" + argsStr + ")");
            };
            /**
             * @private
             * ??????????????????
             */
            p.addCodeLine = function (code) {
                this.lines.push(this.getIndent() + code);
            };
            /**
             * @private
             * ??????????????????????????????
             */
            p.addCodeLineAt = function (code, index) {
                this.lines.splice(index, 0, this.getIndent() + code);
            };
            /**
             * @private
             * ??????????????????????????????
             */
            p.containsCodeLine = function (code) {
                return this.lines.indexOf(code) != -1;
            };
            /**
             * @private
             * ??????????????????????????????????????????
             */
            p.concat = function (cb) {
                this.lines = this.lines.concat(cb.lines);
            };
            /**
             * @private
             *
             * @returns
             */
            p.toCode = function () {
                return this.lines.join("\n");
            };
            return EXCodeBlock;
        }(CodeBase));
        sys.EXCodeBlock = EXCodeBlock;
        egret.registerClass(EXCodeBlock,'eui.sys.EXCodeBlock');
        /**
         * @private
         */
        var EXFunction = (function (_super) {
            __extends(EXFunction, _super);
            function EXFunction() {
                _super.apply(this, arguments);
                /**
                 * @private
                 * ?????????
                 */
                this.codeBlock = null;
                /**
                 * @private
                 */
                this.isGet = false;
                /**
                 * @private
                 * ?????????
                 */
                this.name = "";
            }
            var d = __define,c=EXFunction,p=c.prototype;
            /**
             * @private
             *
             * @returns
             */
            p.toCode = function () {
                var indentStr = this.getIndent();
                var indent1Str = this.getIndent(this.indent + 1);
                var codeIndent;
                var returnStr = indentStr;
                if (this.isGet) {
                    codeIndent = this.getIndent(this.indent + 2);
                    returnStr += 'Object.defineProperty(_proto, "skinParts", {\n';
                    returnStr += indent1Str + "get: function () {\n";
                }
                else {
                    codeIndent = indent1Str;
                    returnStr += "_proto." + this.name + " = function () {\n";
                }
                if (this.codeBlock) {
                    var lines = this.codeBlock.toCode().split("\n");
                    var length_18 = lines.length;
                    for (var i = 0; i < length_18; i++) {
                        var line = lines[i];
                        returnStr += codeIndent + line + "\n";
                    }
                }
                if (this.isGet) {
                    returnStr += indent1Str + "},\n" + indent1Str + "enumerable: true,\n" +
                        indent1Str + "configurable: true\n" + indentStr + "});";
                }
                else {
                    returnStr += indentStr + "};";
                }
                return returnStr;
            };
            return EXFunction;
        }(CodeBase));
        sys.EXFunction = EXFunction;
        egret.registerClass(EXFunction,'eui.sys.EXFunction');
        /**
         * @private
         */
        var EXVariable = (function (_super) {
            __extends(EXVariable, _super);
            /**
             * @private
             */
            function EXVariable(name, defaultValue) {
                _super.call(this);
                this.indent = 2;
                this.name = name;
                this.defaultValue = defaultValue;
            }
            var d = __define,c=EXVariable,p=c.prototype;
            /**
             * @private
             *
             * @returns
             */
            p.toCode = function () {
                if (!this.defaultValue) {
                    return "";
                }
                return "this." + this.name + " = " + this.defaultValue + ";";
            };
            return EXVariable;
        }(CodeBase));
        sys.EXVariable = EXVariable;
        egret.registerClass(EXVariable,'eui.sys.EXVariable');
        /**
         * @private
         */
        var EXState = (function (_super) {
            __extends(EXState, _super);
            /**
             * @private
             */
            function EXState(name, stateGroups) {
                _super.call(this);
                /**
                 * @private
                 * ??????????????????
                 */
                this.name = "";
                /**
                 * @private
                 */
                this.stateGroups = [];
                /**
                 * @private
                 */
                this.addItems = [];
                /**
                 * @private
                 */
                this.setProperty = [];
                this.name = name;
                if (stateGroups)
                    this.stateGroups = stateGroups;
            }
            var d = __define,c=EXState,p=c.prototype;
            /**
             * @private
             * ??????????????????
             */
            p.addOverride = function (item) {
                if (item instanceof EXAddItems)
                    this.addItems.push(item);
                else
                    this.setProperty.push(item);
            };
            /**
             * @private
             *
             * @returns
             */
            p.toCode = function () {
                var indentStr = this.getIndent(1);
                var returnStr = "new " + STATE + " (\"" + this.name + "\",\n" + indentStr + "[\n";
                var index = 0;
                var isFirst = true;
                var overrides = this.addItems.concat(this.setProperty);
                while (index < overrides.length) {
                    if (isFirst)
                        isFirst = false;
                    else
                        returnStr += ",\n";
                    var item = overrides[index];
                    var codes = item.toCode().split("\n");
                    var length_19 = codes.length;
                    for (var i = 0; i < length_19; i++) {
                        var code = codes[i];
                        codes[i] = indentStr + indentStr + code;
                    }
                    returnStr += codes.join("\n");
                    index++;
                }
                returnStr += "\n" + indentStr + "])";
                return returnStr;
            };
            return EXState;
        }(CodeBase));
        sys.EXState = EXState;
        egret.registerClass(EXState,'eui.sys.EXState');
        /**
         * @private
         */
        var EXAddItems = (function (_super) {
            __extends(EXAddItems, _super);
            /**
             * @private
             */
            function EXAddItems(target, property, position, relativeTo) {
                _super.call(this);
                this.target = target;
                this.property = property;
                this.position = position;
                this.relativeTo = relativeTo;
            }
            var d = __define,c=EXAddItems,p=c.prototype;
            /**
             * @private
             *
             * @returns
             */
            p.toCode = function () {
                var returnStr = "new " + ADD_ITEMS + "(\"" + this.target + "\",\"" + this.property + "\"," + this.position + ",\"" + this.relativeTo + "\")";
                return returnStr;
            };
            return EXAddItems;
        }(CodeBase));
        sys.EXAddItems = EXAddItems;
        egret.registerClass(EXAddItems,'eui.sys.EXAddItems');
        /**
         * @private
         */
        var EXSetProperty = (function (_super) {
            __extends(EXSetProperty, _super);
            /**
             * @private
             */
            function EXSetProperty(target, name, value) {
                _super.call(this);
                this.target = target;
                this.name = name;
                this.value = value;
            }
            var d = __define,c=EXSetProperty,p=c.prototype;
            /**
             * @private
             *
             * @returns
             */
            p.toCode = function () {
                return "new " + SET_PROPERTY + "(\"" + this.target + "\",\"" + this.name + "\"," + this.value + ")";
            };
            return EXSetProperty;
        }(CodeBase));
        sys.EXSetProperty = EXSetProperty;
        egret.registerClass(EXSetProperty,'eui.sys.EXSetProperty');
        /**
         * @private
         */
        var EXSetStateProperty = (function (_super) {
            __extends(EXSetStateProperty, _super);
            /**
             * @private
             */
            function EXSetStateProperty(target, property, templates, chainIndex) {
                _super.call(this);
                if (target) {
                    target = "this." + target;
                }
                else {
                    target = "this";
                }
                this.target = target;
                this.property = property;
                this.templates = templates;
                this.chainIndex = chainIndex;
            }
            var d = __define,c=EXSetStateProperty,p=c.prototype;
            /**
             * @private
             *
             * @returns
             */
            p.toCode = function () {
                var expression = this.templates.join(",");
                var chain = this.chainIndex.join(",");
                return "new " + SET_STATEPROPERTY + "(this, [" + expression + "]," + "[" + chain + "]," +
                    this.target + ",\"" + this.property + "\")";
            };
            return EXSetStateProperty;
        }(CodeBase));
        sys.EXSetStateProperty = EXSetStateProperty;
        egret.registerClass(EXSetStateProperty,'eui.sys.EXSetStateProperty');
        /**
         * @private
         */
        var EXBinding = (function (_super) {
            __extends(EXBinding, _super);
            /**
             * @private
             */
            function EXBinding(target, property, templates, chainIndex) {
                _super.call(this);
                this.target = target;
                this.property = property;
                this.templates = templates;
                this.chainIndex = chainIndex;
            }
            var d = __define,c=EXBinding,p=c.prototype;
            /**
             * @private
             *
             * @returns
             */
            p.toCode = function () {
                var expression = this.templates.join(",");
                var chain = this.chainIndex.join(",");
                return BINDING_PROPERTIES + "(this, [" + expression + "]," + "[" + chain + "]," +
                    this.target + ",\"" + this.property + "\")";
            };
            return EXBinding;
        }(CodeBase));
        sys.EXBinding = EXBinding;
        egret.registerClass(EXBinding,'eui.sys.EXBinding');
    })(sys = eui.sys || (eui.sys = {}));
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var sys;
    (function (sys) {
        var exmlParserPool = [];
        var parsedClasses = {};
        var innerClassCount = 1;
        var HOST_COMPONENT = "hostComponent";
        var SKIN_CLASS = "eui.Skin";
        var DECLARATIONS = "Declarations";
        var RECTANGLE = "egret.Rectangle";
        var TYPE_CLASS = "Class";
        var TYPE_ARRAY = "Array";
        var TYPE_PERCENTAGE = "Percentage";
        var TYPE_STATE = "State[]";
        var SKIN_NAME = "skinName";
        var ELEMENTS_CONTENT = "elementsContent";
        var basicTypes = [TYPE_ARRAY, "boolean", "string", "number"];
        var wingKeys = ["id", "locked", "includeIn", "excludeFrom"];
        var htmlEntities = [["<", "&lt;"], [">", "&gt;"], ["&", "&amp;"], ["\"", "&quot;"], ["'", "&apos;"]];
        var jsKeyWords = ["null", "NaN", "undefined", "true", "false"];
        /**
         * @private
         */
        var EXMLParser = (function () {
            /**
             * @private
             */
            function EXMLParser() {
                /**
                 * @private
                 * ??????????????????
                 */
                this.delayAssignmentDic = {};
                if (DEBUG) {
                    this.repeatedIdMap = {};
                    this.getRepeatedIds = getRepeatedIds;
                    this.getIds = getIds;
                    this.checkDeclarations = checkDeclarations;
                }
            }
            var d = __define,c=EXMLParser,p=c.prototype;
            /**
             * @private
             * ?????????javascript????????????
             * @param codeText ?????????javascript??????
             * @param classStr ??????
             */
            p.$parseCode = function (codeText, classStr) {
                //????????????????????????js?????????
                var className = classStr ? classStr : "$exmlClass" + innerClassCount++;
                var clazz = eval(codeText);
                var hasClass = true;
                if (hasClass && clazz) {
                    egret.registerClass(clazz, className);
                    var paths = className.split(".");
                    var length_20 = paths.length;
                    var definition = __global;
                    for (var i = 0; i < length_20 - 1; i++) {
                        var path = paths[i];
                        definition = definition[path] || (definition[path] = {});
                    }
                    if (definition[paths[length_20 - 1]]) {
                        if (DEBUG && !parsedClasses[className]) {
                            egret.$warn(2101, className, codeText);
                        }
                    }
                    else {
                        if (DEBUG) {
                            parsedClasses[className] = true;
                        }
                        definition[paths[length_20 - 1]] = clazz;
                    }
                }
                return clazz;
            };
            /**
             * @private
             * ???????????????XML?????????JavaScript?????????
             * @param xmlData ????????????EXML????????????
             *
             */
            p.parse = function (text) {
                if (DEBUG) {
                    if (!text) {
                        egret.$error(1003, "text");
                    }
                }
                var xmlData = null;
                if (DEBUG) {
                    try {
                        xmlData = egret.XML.parse(text);
                    }
                    catch (e) {
                        egret.$error(2002, text + "\n" + e.message);
                    }
                }
                else {
                    xmlData = egret.XML.parse(text);
                }
                var hasClass = false;
                var className = "";
                if (xmlData.attributes["class"]) {
                    className = xmlData.attributes["class"];
                    delete xmlData.attributes["class"];
                    hasClass = !!className;
                }
                else {
                    className = "$exmlClass" + innerClassCount++;
                }
                var exClass = this.parseClass(xmlData, className);
                var code = exClass.toCode();
                var clazz = null;
                if (DEBUG) {
                    try {
                        clazz = eval(code);
                    }
                    catch (e) {
                        egret.log(code);
                        return null;
                    }
                }
                else {
                    clazz = eval(code);
                }
                if (hasClass && clazz) {
                    egret.registerClass(clazz, className);
                    var paths = className.split(".");
                    var length_21 = paths.length;
                    var definition = __global;
                    for (var i = 0; i < length_21 - 1; i++) {
                        var path = paths[i];
                        definition = definition[path] || (definition[path] = {});
                    }
                    if (definition[paths[length_21 - 1]]) {
                        if (DEBUG && !parsedClasses[className]) {
                            egret.$warn(2101, className, toXMLString(xmlData));
                        }
                    }
                    else {
                        if (DEBUG) {
                            parsedClasses[className] = true;
                        }
                        definition[paths[length_21 - 1]] = clazz;
                    }
                }
                return clazz;
            };
            /**
             * @private
             * ???????????????XML?????????CpClass?????????
             */
            p.parseClass = function (xmlData, className) {
                if (!sys.exmlConfig) {
                    sys.exmlConfig = new sys.EXMLConfig();
                }
                this.currentXML = xmlData;
                this.currentClassName = className;
                this.delayAssignmentDic = {};
                this.idDic = {};
                this.stateCode = [];
                this.stateNames = [];
                this.skinParts = [];
                this.bindings = [];
                this.declarations = null;
                this.currentClass = new sys.EXClass();
                this.stateIds = [];
                var index = className.lastIndexOf(".");
                if (index != -1) {
                    this.currentClass.className = className.substring(index + 1);
                }
                else {
                    this.currentClass.className = className;
                }
                this.startCompile();
                var clazz = this.currentClass;
                this.currentClass = null;
                return clazz;
            };
            /**
             * @private
             * ????????????
             */
            p.startCompile = function () {
                if (DEBUG) {
                    var result = this.getRepeatedIds(this.currentXML);
                    if (result.length > 0) {
                        egret.$error(2004, this.currentClassName, result.join("\n"));
                    }
                }
                var superClass = this.getClassNameOfNode(this.currentXML);
                this.isSkinClass = (superClass == SKIN_CLASS);
                this.currentClass.superClass = superClass;
                this.getStateNames();
                var children = this.currentXML.children;
                if (children) {
                    var length_22 = children.length;
                    for (var i = 0; i < length_22; i++) {
                        var node = children[i];
                        if (node.nodeType === 1 && node.namespace == sys.NS_W &&
                            node.localName == DECLARATIONS) {
                            this.declarations = node;
                            break;
                        }
                    }
                }
                if (DEBUG) {
                    var list = [];
                    this.checkDeclarations(this.declarations, list);
                    if (list.length > 0) {
                        egret.$error(2020, this.currentClassName, list.join("\n"));
                    }
                }
                if (!this.currentXML.namespace) {
                    if (DEBUG) {
                        egret.$error(2017, this.currentClassName, toXMLString(this.currentXML));
                    }
                    return;
                }
                this.addIds(this.currentXML.children);
                this.createConstructFunc();
            };
            /**
             * @private
             * ???????????????id
             */
            p.addIds = function (items) {
                if (!items) {
                    return;
                }
                var length = items.length;
                for (var i = 0; i < length; i++) {
                    var node = items[i];
                    if (node.nodeType != 1) {
                        continue;
                    }
                    if (!node.namespace) {
                        if (DEBUG) {
                            egret.$error(2017, this.currentClassName, toXMLString(node));
                        }
                        continue;
                    }
                    if (this.isInnerClass(node)) {
                        continue;
                    }
                    this.addIds(node.children);
                    if (node.namespace == sys.NS_W || !node.localName) {
                    }
                    else if (this.isProperty(node)) {
                        var prop = node.localName;
                        var index = prop.indexOf(".");
                        var children = node.children;
                        if (index == -1 || !children || children.length == 0) {
                            continue;
                        }
                        var firstChild = children[0];
                        this.stateIds.push(firstChild.attributes.id);
                    }
                    else if (node.nodeType === 1) {
                        var id = node.attributes["id"];
                        if (id) {
                            var first = parseInt(id.slice(0, 1));
                            if (!isNaN(first)) {
                                egret.$warn(2023, id);
                            }
                            if (id.indexOf(" ") > -1) {
                                egret.$warn(2022, id);
                            }
                            if (this.skinParts.indexOf(id) == -1) {
                                this.skinParts.push(id);
                            }
                            this.createVarForNode(node);
                            if (this.isStateNode(node))
                                this.stateIds.push(id);
                        }
                        else {
                            this.createIdForNode(node);
                            if (this.isStateNode(node))
                                this.stateIds.push(node.attributes.id);
                        }
                    }
                }
            };
            /**
             * @private
             * ?????????????????????
             */
            p.isInnerClass = function (node) {
                if (node.hasOwnProperty("isInnerClass")) {
                    return node["isInnerClass"];
                }
                var result = (node.localName == "Skin" && node.namespace == sys.NS_S);
                if (!result) {
                    if (this.isProperty(node)) {
                        result = false;
                    }
                    else {
                        var prop = void 0;
                        var parent_1 = node.parent;
                        if (this.isProperty(parent_1)) {
                            prop = parent_1.localName;
                            var index = prop.indexOf(".");
                            if (index != -1) {
                                var stateName = prop.substring(index + 1);
                                prop = prop.substring(0, index);
                            }
                            parent_1 = parent_1.parent;
                        }
                        else {
                            prop = sys.exmlConfig.getDefaultPropById(parent_1.localName, parent_1.namespace);
                        }
                        var className = sys.exmlConfig.getClassNameById(parent_1.localName, parent_1.namespace);
                        result = (sys.exmlConfig.getPropertyType(prop, className) == TYPE_CLASS);
                    }
                }
                node["isInnerClass"] = result;
                return result;
            };
            /**
             * @private
             * ???????????????????????????????????????????????????
             */
            p.containsState = function (node) {
                var attributes = node.attributes;
                if (attributes["includeIn"] || attributes["excludeFrom"]) {
                    return true;
                }
                var keys = Object.keys(attributes);
                var length = keys.length;
                for (var i = 0; i < length; i++) {
                    var name_1 = keys[i];
                    if (name_1.indexOf(".") != -1) {
                        return true;
                    }
                }
                return false;
            };
            /**
             * @private
             * ?????????????????????id??????
             */
            p.createIdForNode = function (node) {
                var idName = this.getNodeId(node);
                if (!this.idDic[idName])
                    this.idDic[idName] = 1;
                else
                    this.idDic[idName]++;
                idName += this.idDic[idName];
                node.attributes.id = idName;
            };
            /**
             * @private
             * ????????????ID
             */
            p.getNodeId = function (node) {
                if (node.attributes["id"])
                    return node.attributes.id;
                return "_" + node.localName;
            };
            /**
             * @private
             * ???????????????????????????
             */
            p.createVarForNode = function (node) {
                var moduleName = this.getClassNameOfNode(node);
                if (moduleName == "")
                    return;
                if (!this.currentClass.getVariableByName(node.attributes.id))
                    this.currentClass.addVariable(new sys.EXVariable(node.attributes.id));
            };
            /**
             * @private
             * ????????????????????????????????????,?????????????????????
             */
            p.createFuncForNode = function (node) {
                var className = node.localName;
                var isBasicType = this.isBasicTypeData(className);
                if (isBasicType)
                    return this.createBasicTypeForNode(node);
                var moduleName = this.getClassNameOfNode(node);
                var func = new sys.EXFunction();
                var tailName = "_i";
                var id = node.attributes.id;
                func.name = id + tailName;
                this.currentClass.addFunction(func);
                var cb = new sys.EXCodeBlock();
                func.codeBlock = cb;
                var varName = "t";
                if (className == "Object") {
                    cb.addVar(varName, "{}");
                }
                else {
                    cb.addVar(varName, "new " + moduleName + "()");
                }
                var containsId = !!this.currentClass.getVariableByName(id);
                if (containsId) {
                    cb.addAssignment("this." + id, varName);
                }
                this.addAttributesToCodeBlock(cb, varName, node);
                this.initlizeChildNode(node, cb, varName);
                var delayAssignments = this.delayAssignmentDic[id];
                if (delayAssignments) {
                    var length_23 = delayAssignments.length;
                    for (var i = 0; i < length_23; i++) {
                        var codeBlock = delayAssignments[i];
                        cb.concat(codeBlock);
                    }
                }
                cb.addReturn(varName);
                return "this." + func.name + "()";
            };
            /**
             * @private
             * ?????????????????????????????????????????????
             */
            p.isBasicTypeData = function (className) {
                return basicTypes.indexOf(className) != -1;
            };
            /**
             * @private
             * ??????????????????????????????????????????,???????????????????????????
             */
            p.createBasicTypeForNode = function (node) {
                var className = node.localName;
                var returnValue = "";
                var varItem = this.currentClass.getVariableByName(node.attributes.id);
                var children = node.children;
                var text = "";
                if (children && children.length > 0) {
                    var firstChild = children[0];
                    if (firstChild.nodeType == 3) {
                        text = firstChild.text.trim();
                    }
                }
                switch (className) {
                    case TYPE_ARRAY:
                        var values = [];
                        if (children) {
                            var length_24 = children.length;
                            for (var i = 0; i < length_24; i++) {
                                var child = children[i];
                                if (child.nodeType == 1) {
                                    values.push(this.createFuncForNode(child));
                                }
                            }
                        }
                        returnValue = "[" + values.join(",") + "]";
                        break;
                    case "boolean":
                        returnValue = (text == "false" || !text) ? "false" : "true";
                        break;
                    case "number":
                        returnValue = text;
                        if (returnValue.indexOf("%") != -1)
                            returnValue = returnValue.substring(0, returnValue.length - 1);
                        break;
                    case "string":
                        returnValue = this.formatString(text);
                        break;
                }
                if (varItem)
                    varItem.defaultValue = returnValue;
                return returnValue;
            };
            /**
             * @private
             * ?????????????????????????????????????????????
             */
            p.addAttributesToCodeBlock = function (cb, varName, node) {
                var key;
                var value;
                var attributes = node.attributes;
                var keyList = Object.keys(attributes);
                keyList.sort(); //????????????????????????????????????
                //??? style ??????????????????
                var styleIndex = keyList.indexOf("style");
                if (styleIndex > 0) {
                    keyList.splice(styleIndex, 1);
                    keyList.unshift("style");
                }
                var length = keyList.length;
                for (var i = 0; i < length; i++) {
                    key = keyList[i];
                    if (!this.isNormalKey(key)) {
                        continue;
                    }
                    value = attributes[key];
                    key = this.formatKey(key, value);
                    value = this.formatValue(key, value, node);
                    if (!value) {
                        continue;
                    }
                    if (this.currentClass.getVariableByName(value)) {
                        var THIS = "this.";
                        var id = attributes.id;
                        var codeLine = THIS + id + " = t;";
                        if (!this.currentClass.getVariableByName(id))
                            this.createVarForNode(node);
                        if (!cb.containsCodeLine(codeLine)) {
                            cb.addCodeLineAt(codeLine, 1);
                        }
                        var delayCb = new sys.EXCodeBlock();
                        if (varName == "this") {
                            delayCb.addAssignment(varName, THIS + value, key);
                        }
                        else {
                            delayCb.startIf(THIS + id);
                            delayCb.addAssignment(THIS + id, THIS + value, key);
                            delayCb.endBlock();
                        }
                        if (!this.delayAssignmentDic[value]) {
                            this.delayAssignmentDic[value] = [];
                        }
                        this.delayAssignmentDic[value].push(delayCb);
                        value = THIS + value;
                    }
                    cb.addAssignment(varName, value, key);
                }
            };
            /**
             * @private
             * ???????????????
             */
            p.initlizeChildNode = function (node, cb, varName) {
                var children = node.children;
                if (!children || children.length == 0)
                    return;
                var className = sys.exmlConfig.getClassNameById(node.localName, node.namespace);
                var directChild = [];
                var length = children.length;
                var propList = [];
                var errorInfo;
                for (var i = 0; i < length; i++) {
                    var child = children[i];
                    if (child.nodeType != 1 || child.namespace == sys.NS_W) {
                        continue;
                    }
                    if (this.isInnerClass(child)) {
                        if (child.localName == "Skin") {
                            var innerClassName = this.parseInnerClass(child);
                            var type = sys.exmlConfig.getPropertyType(SKIN_NAME, className);
                            if (type) {
                                cb.addAssignment(varName, innerClassName, SKIN_NAME);
                            }
                            else {
                                egret.$error(2005, this.currentClassName, SKIN_NAME, getPropertyStr(child));
                            }
                        }
                        continue;
                    }
                    var prop = child.localName;
                    if (this.isProperty(child)) {
                        if (!this.isNormalKey(prop)) {
                            continue;
                        }
                        var type = sys.exmlConfig.getPropertyType(child.localName, className);
                        if (!type) {
                            if (DEBUG) {
                                egret.$error(2005, this.currentClassName, child.localName, getPropertyStr(child));
                            }
                            continue;
                        }
                        if (!child.children || child.children.length == 0) {
                            if (DEBUG) {
                                egret.$warn(2102, this.currentClassName, getPropertyStr(child));
                            }
                            continue;
                        }
                        if (DEBUG) {
                            errorInfo = getPropertyStr(child);
                        }
                        this.addChildrenToProp(child.children, type, prop, cb, varName, errorInfo, propList, node);
                    }
                    else {
                        directChild.push(child);
                    }
                }
                if (directChild.length == 0)
                    return;
                var defaultProp = sys.exmlConfig.getDefaultPropById(node.localName, node.namespace);
                var defaultType = sys.exmlConfig.getPropertyType(defaultProp, className);
                if (DEBUG) {
                    errorInfo = getPropertyStr(directChild[0]);
                }
                if (!defaultProp || !defaultType) {
                    if (DEBUG) {
                        egret.$error(2012, this.currentClassName, errorInfo);
                    }
                    return;
                }
                this.addChildrenToProp(directChild, defaultType, defaultProp, cb, varName, errorInfo, propList, node);
            };
            /**
             * @private
             * ??????????????????????????????????????????
             */
            p.parseInnerClass = function (node) {
                var parser = exmlParserPool.pop();
                if (!parser) {
                    parser = new EXMLParser();
                }
                var innerClassName = this.currentClass.className + "$" + node.localName + innerClassCount++;
                var innerClass = parser.parseClass(node, innerClassName);
                this.currentClass.addInnerClass(innerClass);
                exmlParserPool.push(parser);
                return innerClassName;
            };
            /**
             * @private
             * ???????????????????????????????????????
             */
            p.addChildrenToProp = function (children, type, prop, cb, varName, errorInfo, propList, node) {
                var childFunc = "";
                var childLength = children.length;
                if (childLength > 1) {
                    if (type != TYPE_ARRAY) {
                        if (DEBUG) {
                            egret.$error(2011, this.currentClassName, prop, errorInfo);
                        }
                        return;
                    }
                    var values = [];
                    for (var j = 0; j < childLength; j++) {
                        var item = children[j];
                        if (item.nodeType != 1) {
                            continue;
                        }
                        childFunc = this.createFuncForNode(item);
                        var childClassName = this.getClassNameOfNode(item);
                        if (!this.isStateNode(item))
                            values.push(childFunc);
                    }
                    childFunc = "[" + values.join(",") + "]";
                }
                else {
                    var firstChild = children[0];
                    if (type == TYPE_ARRAY) {
                        if (firstChild.localName == TYPE_ARRAY) {
                            var values = [];
                            if (firstChild.children) {
                                var len = firstChild.children.length;
                                for (var k = 0; k < len; k++) {
                                    var item = firstChild.children[k];
                                    if (item.nodeType != 1) {
                                        continue;
                                    }
                                    childFunc = this.createFuncForNode(item);
                                    var childClassName = this.getClassNameOfNode(item);
                                    if (!this.isStateNode(item))
                                        values.push(childFunc);
                                }
                            }
                            childFunc = "[" + values.join(",") + "]";
                        }
                        else {
                            childFunc = this.createFuncForNode(firstChild);
                            var childClassName = this.getClassNameOfNode(firstChild);
                            if (!this.isStateNode(firstChild))
                                childFunc = "[" + childFunc + "]";
                            else
                                childFunc = "[]";
                        }
                    }
                    else if (firstChild.nodeType == 1) {
                        if (type == TYPE_CLASS) {
                            if (childLength > 1) {
                                if (DEBUG) {
                                    egret.$error(2011, this.currentClassName, prop, errorInfo);
                                }
                                return;
                            }
                            childFunc = this.parseInnerClass(children[0]);
                        }
                        else {
                            var targetClass = this.getClassNameOfNode(firstChild);
                            childFunc = this.createFuncForNode(firstChild);
                        }
                    }
                    else {
                        childFunc = this.formatValue(prop, firstChild.text, node);
                    }
                }
                if (childFunc != "") {
                    if (childFunc.indexOf("()") == -1)
                        prop = this.formatKey(prop, childFunc);
                    if (propList.indexOf(prop) == -1) {
                        propList.push(prop);
                    }
                    else if (DEBUG) {
                        egret.$warn(2103, this.currentClassName, prop, errorInfo);
                    }
                    cb.addAssignment(varName, childFunc, prop);
                }
            };
            /**
             * @private
             * ?????????????????????????????????
             */
            p.isProperty = function (node) {
                if (node.hasOwnProperty("isProperty")) {
                    return node["isProperty"];
                }
                var result;
                var name = node.localName;
                if (!name || node.nodeType !== 1 || !node.parent || this.isBasicTypeData(name)) {
                    result = false;
                }
                else {
                    var parent_2 = node.parent;
                    var index = name.indexOf(".");
                    if (index != -1) {
                        name = name.substr(0, index);
                    }
                    var className = sys.exmlConfig.getClassNameById(parent_2.localName, parent_2.namespace);
                    result = !!sys.exmlConfig.getPropertyType(name, className);
                }
                node["isProperty"] = result;
                return result;
            };
            /**
             * @private
             * ????????????????????????key
             */
            p.isNormalKey = function (key) {
                if (!key || key.indexOf(".") != -1
                    || key.indexOf(":") != -1 || wingKeys.indexOf(key) != -1)
                    return false;
                return true;
            };
            /**
             * @private
             * ?????????key
             */
            p.formatKey = function (key, value) {
                if (value.indexOf("%") != -1) {
                    if (key == "height")
                        key = "percentHeight";
                    else if (key == "width")
                        key = "percentWidth";
                }
                return key;
            };
            /**
             * @private
             * ????????????
             */
            p.formatValue = function (key, value, node) {
                if (!value) {
                    value = "";
                }
                var stringValue = value; //????????????????????????????????????????????????????????????
                value = value.trim();
                var className = this.getClassNameOfNode(node);
                var type = sys.exmlConfig.getPropertyType(key, className);
                if (DEBUG && !type) {
                    egret.$error(2005, this.currentClassName, key, toXMLString(node));
                }
                var bindingValue = this.formatBinding(key, value, node);
                if (bindingValue) {
                    this.checkIdForState(node);
                    var target = "this";
                    if (node !== this.currentXML) {
                        target += "." + node.attributes["id"];
                    }
                    this.bindings.push(new sys.EXBinding(target, key, bindingValue.templates, bindingValue.chainIndex));
                    value = "";
                }
                else if (type == RECTANGLE) {
                    if (DEBUG) {
                        var rect = value.split(",");
                        if (rect.length != 4 || isNaN(parseInt(rect[0])) || isNaN(parseInt(rect[1])) ||
                            isNaN(parseInt(rect[2])) || isNaN(parseInt(rect[3]))) {
                            egret.$error(2016, this.currentClassName, toXMLString(node));
                        }
                    }
                    value = "new " + RECTANGLE + "(" + value + ")";
                }
                else if (type == TYPE_PERCENTAGE) {
                    if (value.indexOf("%") != -1) {
                        value = this.formatString(value);
                        ;
                    }
                }
                else {
                    var orgValue = value;
                    switch (type) {
                        case TYPE_CLASS:
                            if (key == SKIN_NAME) {
                                value = this.formatString(stringValue);
                            }
                            break;
                        case "number":
                            if (value.indexOf("#") == 0) {
                                if (DEBUG && isNaN(value.substring(1))) {
                                    egret.$warn(2021, this.currentClassName, key, value);
                                }
                                value = "0x" + value.substring(1);
                            }
                            else if (value.indexOf("%") != -1) {
                                if (DEBUG && isNaN(value.substr(0, value.length - 1))) {
                                    egret.$warn(2021, this.currentClassName, key, value);
                                }
                                value = (parseFloat(value.substr(0, value.length - 1))).toString();
                            }
                            else if (DEBUG && isNaN(value)) {
                                egret.$warn(2021, this.currentClassName, key, value);
                            }
                            break;
                        case "boolean":
                            value = (value == "false" || !value) ? "false" : "true";
                            break;
                        case "string":
                        case "any":
                            value = this.formatString(stringValue);
                            break;
                        default:
                            if (DEBUG) {
                                egret.$error(2008, this.currentClassName, "string", key + ":" + type, toXMLString(node));
                            }
                            break;
                    }
                }
                return value;
            };
            /**
             * @private
             * ??????????????????
             */
            p.formatString = function (value) {
                value = this.unescapeHTMLEntity(value);
                value = value.split("\n").join("\\n");
                value = value.split("\r").join("\\n");
                value = value.split("\"").join("\\\"");
                value = "\"" + value + "\"";
                return value;
            };
            p.formatBinding = function (key, value, node) {
                if (!value) {
                    return null;
                }
                value = value.trim();
                if (value.charAt(0) != "{" || value.charAt(value.length - 1) != "}") {
                    return null;
                }
                value = value.substring(1, value.length - 1).trim();
                var templates = value.indexOf("+") == -1 ? [value] : this.parseTemplates(value);
                var chainIndex = [];
                var length = templates.length;
                for (var i = 0; i < length; i++) {
                    var item = templates[i].trim();
                    if (!item) {
                        templates.splice(i, 1);
                        i--;
                        length--;
                        continue;
                    }
                    var first = item.charAt(0);
                    if (first == "'" || first == "\"" || first >= "0" && first <= "9") {
                        continue;
                    }
                    if (item.indexOf(".") == -1 && jsKeyWords.indexOf(item) != -1) {
                        continue;
                    }
                    if (item.indexOf("this.") == 0) {
                        item = item.substring(5);
                    }
                    var firstKey = item.split(".")[0];
                    if (firstKey != HOST_COMPONENT && this.skinParts.indexOf(firstKey) == -1) {
                        item = HOST_COMPONENT + "." + item;
                    }
                    templates[i] = "\"" + item + "\"";
                    chainIndex.push(i);
                }
                return { templates: templates, chainIndex: chainIndex };
            };
            p.parseTemplates = function (value) {
                //???????????????????????? ???:{a.b+c.d}
                if (value.indexOf("'") == -1) {
                    return value.split("+");
                }
                //?????????????????????????????????????????????????????????
                var isSingleQuoteLeak = false; //?????????????????????
                var trimText = "";
                value = value.split("\\\'").join("\v0\v");
                while (value.length > 0) {
                    //'???????????? ???????????????
                    var index = value.indexOf("'");
                    if (index == -1) {
                        trimText += value;
                        break;
                    }
                    trimText += value.substring(0, index + 1);
                    value = value.substring(index + 1);
                    //'???????????? ???????????????
                    index = value.indexOf("'");
                    if (index == -1) {
                        index = value.length - 1;
                        isSingleQuoteLeak = true;
                    }
                    var quote = value.substring(0, index + 1);
                    trimText += quote.split("+").join("\v1\v");
                    value = value.substring(index + 1);
                }
                value = trimText.split("\v0\v").join("\\\'");
                //????????????????????????
                if (isSingleQuoteLeak) {
                    value += "'";
                }
                var templates = value.split("+");
                var length = templates.length;
                for (var i = 0; i < length; i++) {
                    templates[i] = templates[i].split("\v1\v").join("+");
                }
                return templates;
            };
            /**
             * @private
             /**
             * ??????HTML???????????????????????????
             */
            p.unescapeHTMLEntity = function (str) {
                if (!str)
                    return "";
                var length = htmlEntities.length;
                for (var i = 0; i < length; i++) {
                    var arr = htmlEntities[i];
                    var key = arr[0];
                    var value = arr[1];
                    str = str.split(value).join(key);
                }
                return str;
            };
            /**
             * @private
             * ??????????????????
             */
            p.createConstructFunc = function () {
                var cb = new sys.EXCodeBlock;
                cb.addEmptyLine();
                var varName = "this";
                this.addAttributesToCodeBlock(cb, varName, this.currentXML);
                if (this.declarations) {
                    var children = this.declarations.children;
                    if (children && children.length > 0) {
                        var length_25 = children.length;
                        for (var i = 0; i < length_25; i++) {
                            var decl = children[i];
                            if (decl.nodeType != 1) {
                                continue;
                            }
                            var funcName = this.createFuncForNode(decl);
                            if (funcName) {
                                cb.addCodeLine(funcName + ";");
                            }
                        }
                    }
                }
                this.initlizeChildNode(this.currentXML, cb, varName);
                var id;
                var length;
                var stateIds = this.stateIds;
                if (stateIds.length > 0) {
                    length = stateIds.length;
                    for (var i = 0; i < length; i++) {
                        id = stateIds[i];
                        cb.addCodeLine("this." + id + "_i();");
                    }
                    cb.addEmptyLine();
                }
                var skinParts = this.skinParts;
                var skinPartStr = "[]";
                length = skinParts.length;
                if (length > 0) {
                    for (var i = 0; i < length; i++) {
                        skinParts[i] = "\"" + skinParts[i] + "\"";
                    }
                    skinPartStr = "[" + skinParts.join(",") + "]";
                }
                var skinPartFunc = new sys.EXFunction();
                skinPartFunc.name = "skinParts";
                skinPartFunc.isGet = true;
                var skinPartCB = new sys.EXCodeBlock();
                skinPartCB.addReturn(skinPartStr);
                skinPartFunc.codeBlock = skinPartCB;
                this.currentClass.addFunction(skinPartFunc);
                this.currentXML.attributes.id = "";
                //????????????????????????
                this.createStates(this.currentXML);
                var states;
                var node = this.currentXML;
                var nodeClassName = this.getClassNameOfNode(node);
                var attributes = node.attributes;
                var keys = Object.keys(attributes);
                var keysLength = keys.length;
                for (var m = 0; m < keysLength; m++) {
                    var itemName = keys[m];
                    var value = attributes[itemName];
                    var index = itemName.indexOf(".");
                    if (index != -1) {
                        var key = itemName.substring(0, index);
                        key = this.formatKey(key, value);
                        var itemValue = this.formatValue(key, value, node);
                        if (!itemValue) {
                            continue;
                        }
                        var stateName = itemName.substr(index + 1);
                        states = this.getStateByName(stateName, node);
                        var stateLength = states.length;
                        if (stateLength > 0) {
                            for (var i = 0; i < stateLength; i++) {
                                var state = states[i];
                                state.addOverride(new sys.EXSetProperty("", key, itemValue));
                            }
                        }
                    }
                }
                //?????????????????????????????????
                var stateCode = this.stateCode;
                length = stateCode.length;
                if (length > 0) {
                    var indentStr = "	";
                    cb.addCodeLine("this.states = [");
                    var first = true;
                    for (var i = 0; i < length; i++) {
                        var state = stateCode[i];
                        if (first)
                            first = false;
                        else
                            cb.addCodeLine(indentStr + ",");
                        var codes = state.toCode().split("\n");
                        var codeIndex = 0;
                        while (codeIndex < codes.length) {
                            var code = codes[codeIndex];
                            if (code)
                                cb.addCodeLine(indentStr + code);
                            codeIndex++;
                        }
                    }
                    cb.addCodeLine("];");
                }
                //??????????????????
                var bindings = this.bindings;
                length = bindings.length;
                if (length > 0) {
                    cb.addEmptyLine();
                    for (var i = 0; i < length; i++) {
                        var binding = bindings[i];
                        cb.addCodeLine(binding.toCode());
                    }
                }
                this.currentClass.constructCode = cb;
            };
            /**
             * @private
             * ????????????includeIn???excludeFrom??????
             */
            p.isStateNode = function (node) {
                var attributes = node.attributes;
                return attributes.hasOwnProperty("includeIn") || attributes.hasOwnProperty("excludeFrom");
            };
            /**
             * @private
             * ??????????????????????????????
             */
            p.getStateNames = function () {
                var root = this.currentXML;
                var className = sys.exmlConfig.getClassNameById(root.localName, root.namespace);
                var type = sys.exmlConfig.getPropertyType("states", className);
                if (type != TYPE_STATE) {
                    return;
                }
                var statesValue = root.attributes["states"];
                if (statesValue) {
                    delete root.attributes["states"];
                }
                var stateNames = this.stateNames;
                var stateChildren;
                var children = root.children;
                var item;
                if (children) {
                    var length_26 = children.length;
                    for (var i = 0; i < length_26; i++) {
                        item = children[i];
                        if (item.nodeType == 1 &&
                            item.localName == "states") {
                            item.namespace = sys.NS_W;
                            stateChildren = item.children;
                            break;
                        }
                    }
                }
                if (!stateChildren && !statesValue) {
                    return;
                }
                if (DEBUG) {
                    if (stateChildren && stateChildren.length == 0) {
                        egret.$warn(2102, this.currentClassName, getPropertyStr(item));
                    }
                    if (stateChildren && statesValue) {
                        egret.$warn(2103, this.currentClassName, "states", getPropertyStr(item));
                    }
                }
                if (statesValue) {
                    var states = statesValue.split(",");
                    var length_27 = states.length;
                    for (var i = 0; i < length_27; i++) {
                        var stateName = states[i].trim();
                        if (!stateName) {
                            continue;
                        }
                        if (stateNames.indexOf(stateName) == -1) {
                            stateNames.push(stateName);
                        }
                        this.stateCode.push(new sys.EXState(stateName));
                    }
                    return;
                }
                var length = stateChildren.length;
                for (var i = 0; i < length; i++) {
                    var state = stateChildren[i];
                    if (state.nodeType != 1) {
                        continue;
                    }
                    var stateGroups = [];
                    var attributes = state.attributes;
                    if (attributes["stateGroups"]) {
                        var groups = attributes.stateGroups.split(",");
                        var len = groups.length;
                        for (var j = 0; j < len; j++) {
                            var group = groups[j].trim();
                            if (group) {
                                if (stateNames.indexOf(group) == -1) {
                                    stateNames.push(group);
                                }
                                stateGroups.push(group);
                            }
                        }
                    }
                    var stateName = attributes.name;
                    if (stateNames.indexOf(stateName) == -1) {
                        stateNames.push(stateName);
                    }
                    this.stateCode.push(new sys.EXState(stateName, stateGroups));
                }
            };
            /**
             * @private
             * ????????????????????????
             */
            p.createStates = function (parentNode) {
                var items = parentNode.children;
                if (!items) {
                    return;
                }
                var length = items.length;
                for (var i = 0; i < length; i++) {
                    var node = items[i];
                    if (node.nodeType != 1 || this.isInnerClass(node)) {
                        continue;
                    }
                    this.createStates(node);
                    if (node.namespace == sys.NS_W || !node.localName) {
                        continue;
                    }
                    if (this.isProperty(node)) {
                        var prop = node.localName;
                        var index = prop.indexOf(".");
                        var children = node.children;
                        if (index == -1 || !children || children.length == 0) {
                            continue;
                        }
                        var stateName = prop.substring(index + 1);
                        prop = prop.substring(0, index);
                        var className = this.getClassNameOfNode(parentNode);
                        var type = sys.exmlConfig.getPropertyType(prop, className);
                        if (DEBUG) {
                            if (type == TYPE_ARRAY) {
                                egret.$error(2013, this.currentClassName, getPropertyStr(node));
                            }
                            if (children.length > 1) {
                                egret.$error(2011, this.currentClassName, prop, getPropertyStr(node));
                            }
                        }
                        var firstChild = children[0];
                        var value = void 0;
                        if (firstChild.nodeType == 1) {
                            this.createFuncForNode(firstChild);
                            this.checkIdForState(firstChild);
                            value = "this." + firstChild.attributes.id;
                        }
                        else {
                            value = this.formatValue(prop, firstChild.text, parentNode);
                        }
                        var states = this.getStateByName(stateName, node);
                        var l = states.length;
                        if (l > 0) {
                            for (var j = 0; j < l; j++) {
                                var state = states[j];
                                state.addOverride(new sys.EXSetProperty(parentNode.attributes.id, prop, value));
                            }
                        }
                    }
                    else if (this.containsState(node)) {
                        var attributes = node.attributes;
                        var id = attributes.id;
                        var nodeClassName = this.getClassNameOfNode(node);
                        this.checkIdForState(node);
                        var stateName = void 0;
                        var states = void 0;
                        var state = void 0;
                        if (this.isStateNode(node)) {
                            var propertyName = "";
                            var parent_3 = node.parent;
                            if (parent_3.localName == TYPE_ARRAY)
                                parent_3 = parent_3.parent;
                            if (parent_3 && parent_3.parent) {
                                if (this.isProperty(parent_3))
                                    parent_3 = parent_3.parent;
                            }
                            if (parent_3 && parent_3 != this.currentXML) {
                                propertyName = parent_3.attributes.id;
                                this.checkIdForState(parent_3);
                            }
                            var positionObj = this.findNearNodeId(node);
                            var stateNames = [];
                            if (attributes.includeIn) {
                                stateNames = attributes.includeIn.split(",");
                            }
                            else {
                                var excludeNames = attributes.excludeFrom.split(",");
                                var stateLength = excludeNames.length;
                                for (var j = 0; j < stateLength; j++) {
                                    var name_2 = excludeNames[j];
                                    this.getStateByName(name_2, node); //??????exlcudeFrom???????????????????????????????????????
                                }
                                stateLength = this.stateCode.length;
                                for (var j = 0; j < stateLength; j++) {
                                    state = this.stateCode[j];
                                    if (excludeNames.indexOf(state.name) == -1) {
                                        stateNames.push(state.name);
                                    }
                                }
                            }
                            var len = stateNames.length;
                            for (var k = 0; k < len; k++) {
                                stateName = stateNames[k];
                                states = this.getStateByName(stateName, node);
                                if (states.length > 0) {
                                    var l = states.length;
                                    for (var j = 0; j < l; j++) {
                                        state = states[j];
                                        state.addOverride(new sys.EXAddItems(id, propertyName, positionObj.position, positionObj.relativeTo));
                                    }
                                }
                            }
                        }
                        var names = Object.keys(attributes);
                        var namesLength = names.length;
                        for (var m = 0; m < namesLength; m++) {
                            var name_3 = names[m];
                            var value = attributes[name_3];
                            var index = name_3.indexOf(".");
                            if (index != -1) {
                                var key = name_3.substring(0, index);
                                key = this.formatKey(key, value);
                                var bindingValue = this.formatBinding(key, value, node);
                                if (!bindingValue) {
                                    value = this.formatValue(key, value, node);
                                    if (!value) {
                                        continue;
                                    }
                                }
                                stateName = name_3.substr(index + 1);
                                states = this.getStateByName(stateName, node);
                                var l = states.length;
                                if (l > 0) {
                                    for (var j = 0; j < l; j++) {
                                        state = states[j];
                                        if (bindingValue) {
                                            state.addOverride(new sys.EXSetStateProperty(id, key, bindingValue.templates, bindingValue.chainIndex));
                                        }
                                        else {
                                            state.addOverride(new sys.EXSetProperty(id, key, value));
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };
            /**
             * @private
             * ???????????????ID???????????????????????????????????????????????????????????????
             */
            p.checkIdForState = function (node) {
                if (!node || this.currentClass.getVariableByName(node.attributes.id)) {
                    return;
                }
                this.createVarForNode(node);
                var id = node.attributes.id;
                var funcName = id + "_i";
                var func = this.currentClass.getFuncByName(funcName);
                if (!func)
                    return;
                var codeLine = "this." + id + " = t;";
                var cb = func.codeBlock;
                if (!cb)
                    return;
                if (!cb.containsCodeLine(codeLine)) {
                    cb.addCodeLineAt(codeLine, 1);
                }
            };
            /**
             * @private
             * ???????????????????????????????????????????????????
             */
            p.getStateByName = function (name, node) {
                var states = [];
                var stateCode = this.stateCode;
                var length = stateCode.length;
                for (var i = 0; i < length; i++) {
                    var state = stateCode[i];
                    if (state.name == name) {
                        if (states.indexOf(state) == -1)
                            states.push(state);
                    }
                    else if (state.stateGroups.length > 0) {
                        var found = false;
                        var len = state.stateGroups.length;
                        for (var j = 0; j < len; j++) {
                            var g = state.stateGroups[j];
                            if (g == name) {
                                found = true;
                                break;
                            }
                        }
                        if (found) {
                            if (states.indexOf(state) == -1)
                                states.push(state);
                        }
                    }
                }
                if (DEBUG && states.length == 0) {
                    egret.$error(2006, this.currentClassName, name, toXMLString(node));
                }
                return states;
            };
            /**
             * @private
             * ???????????????????????????ID?????????
             */
            p.findNearNodeId = function (node) {
                var parentNode = node.parent;
                var targetId = "";
                var position;
                var index = -1;
                var preItem;
                var afterItem;
                var found = false;
                var children = parentNode.children;
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var item = children[i];
                    if (this.isProperty(item))
                        continue;
                    if (item == node) {
                        found = true;
                        index = i;
                    }
                    else {
                        if (found && !afterItem && !this.isStateNode(item)) {
                            afterItem = item;
                        }
                    }
                    if (!found && !this.isStateNode(item))
                        preItem = item;
                }
                if (index == 0) {
                    position = 0 /* FIRST */;
                    return { position: position, relativeTo: targetId };
                }
                if (index == length - 1) {
                    position = 1 /* LAST */;
                    return { position: position, relativeTo: targetId };
                }
                if (afterItem) {
                    position = 2 /* BEFORE */;
                    targetId = afterItem.attributes.id;
                    if (targetId) {
                        this.checkIdForState(afterItem);
                        return { position: position, relativeTo: targetId };
                    }
                }
                return { position: 1 /* LAST */, relativeTo: targetId };
            };
            /**
             * @private
             * ?????????????????????????????????????????????
             */
            p.getClassNameOfNode = function (node) {
                var className = sys.exmlConfig.getClassNameById(node.localName, node.namespace);
                if (DEBUG && !className) {
                    egret.$error(2003, this.currentClassName, toXMLString(node));
                }
                return className;
            };
            return EXMLParser;
        }());
        sys.EXMLParser = EXMLParser;
        egret.registerClass(EXMLParser,'eui.sys.EXMLParser');
        if (DEBUG) {
            /**
             * ???????????????ID???
             */
            function getRepeatedIds(xml) {
                var result = [];
                this.repeatedIdMap = {};
                this.getIds(xml, result);
                return result;
            }
            function getIds(xml, result) {
                if (xml.namespace != sys.NS_W && xml.attributes.id) {
                    var id = xml.attributes.id;
                    if (this.repeatedIdMap[id]) {
                        result.push(toXMLString(xml));
                    }
                    else {
                        this.repeatedIdMap[id] = true;
                    }
                }
                var children = xml.children;
                if (children) {
                    var length_28 = children.length;
                    for (var i = 0; i < length_28; i++) {
                        var node = children[i];
                        if (node.nodeType !== 1 || this.isInnerClass(node)) {
                            continue;
                        }
                        this.getIds(node, result);
                    }
                }
            }
            function toXMLString(node) {
                if (!node) {
                    return "";
                }
                var str = "  at <" + node.name;
                var attributes = node.attributes;
                var keys = Object.keys(attributes);
                var length = keys.length;
                for (var i = 0; i < length; i++) {
                    var key = keys[i];
                    var value = attributes[key];
                    if (key == "id" && value.substring(0, 2) == "__") {
                        continue;
                    }
                    str += " " + key + "=\"" + value + "\"";
                }
                if (node.children.length == 0) {
                    str += "/>";
                }
                else {
                    str += ">";
                }
                return str;
            }
            /**
             * ????????????????????????????????????
             */
            function checkDeclarations(declarations, list) {
                if (!declarations) {
                    return;
                }
                var children = declarations.children;
                if (children) {
                    var length_29 = children.length;
                    for (var i = 0; i < length_29; i++) {
                        var node = children[i];
                        if (node.nodeType != 1) {
                            continue;
                        }
                        if (node.attributes.includeIn) {
                            list.push(toXMLString(node));
                        }
                        if (node.attributes.excludeFrom) {
                            list.push(toXMLString(node));
                        }
                        checkDeclarations(node, list);
                    }
                }
            }
            function getPropertyStr(child) {
                var parentStr = toXMLString(child.parent);
                var childStr = toXMLString(child).substring(5);
                return parentStr + "\n      \t" + childStr;
            }
        }
    })(sys = eui.sys || (eui.sys = {}));
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var sys;
    (function (sys) {
        /**
         * @private
         * EUI ????????????
         */
        sys.NS_S = "http://ns.egret.com/eui";
        /**
         * @private
         * Wing????????????
         */
        sys.NS_W = "http://ns.egret.com/wing";
        var coreClasses = ["Point", "Matrix", "Rectangle"];
        var basicTypes = ["Array", "boolean", "string", "number"];
        var MODULE_NAME = "eui.";
        var hashCount = 0;
        var properties = {};
        /**
         * @private
         */
        var EXMLConfig = (function () {
            function EXMLConfig() {
            }
            var d = __define,c=EXMLConfig,p=c.prototype;
            /**
             * @private
             */
            p.$describe = function (instance) {
                if (!instance) {
                    return null;
                }
                var prototype = Object.getPrototypeOf(instance);
                if (!prototype) {
                    return null;
                }
                var info;
                if (prototype.hasOwnProperty("__hashCode__")) {
                    info = properties[prototype.__hashCode__];
                    if (info) {
                        return info;
                    }
                }
                var superProto = Object.getPrototypeOf(prototype);
                if (!superProto) {
                    return null;
                }
                var superInstance = getInstanceOf(superProto.constructor);
                var superInfo = this.$describe(superInstance);
                if (superInfo) {
                    function factory() {
                    }
                    factory.prototype = superInfo;
                    info = new factory();
                }
                else {
                    info = {};
                }
                if (DEBUG) {
                    info.__class__ = prototype.constructor.name;
                }
                var keys = Object.keys(prototype).concat(Object.keys(instance));
                var length = keys.length;
                var meta = instance.__meta__;
                for (var i = 0; i < length; i++) {
                    var key = keys[i];
                    if (key == "constructor" || key.charAt(0) == "_" || key.charAt(0) == "$") {
                        continue;
                    }
                    var resultType = void 0;
                    if (meta && meta[key]) {
                        resultType = meta[key];
                    }
                    else if (isArray(instance[key])) {
                        resultType = "Array";
                    }
                    else {
                        resultType = typeof instance[key];
                        if (resultType == "function") {
                            continue;
                        }
                        if (basicTypes.indexOf(resultType) == -1) {
                            resultType = "any";
                        }
                    }
                    info[key] = resultType;
                }
                if (Object.getPrototypeOf(superProto)) {
                    prototype.__hashCode__ = hashCount++;
                    properties[prototype.__hashCode__] = info;
                }
                return info;
            };
            /**
             * @private
             * ??????????????????ID?????????????????????????????????(???"."??????)
             * @param id ????????????ID
             * @param ns ????????????
             */
            p.getClassNameById = function (id, ns) {
                if (ns == sys.NS_S) {
                    if (id == "Object") {
                        return id;
                    }
                    if (coreClasses.indexOf(id) != -1) {
                        return "egret." + id;
                    }
                }
                var name = "";
                if (basicTypes.indexOf(id) != -1) {
                    return id;
                }
                if (ns == sys.NS_W) {
                }
                else if (!ns || ns == sys.NS_S) {
                    name = MODULE_NAME + id;
                }
                else {
                    name = ns.substring(0, ns.length - 1) + id;
                }
                if (!getPrototypeOf(name)) {
                    name = "";
                }
                return name;
            };
            /**
             * @private
             * ??????ID???????????????????????????
             * @param id ????????????ID
             * @param ns ????????????
             * @return ???????????????
             */
            p.getDefaultPropById = function (id, ns) {
                var className = this.getClassNameById(id, ns);
                var prototype = getPrototypeOf(className);
                var property;
                if (prototype) {
                    property = prototype.__defaultProperty__;
                }
                return property ? property : "";
            };
            /**
             * @private
             * ???????????????????????????,???????????????????????????"boolean","string","number","any"???
             * @param property ?????????
             * @param className ????????????????????????
             */
            p.getPropertyType = function (property, className) {
                if (className == "Object") {
                    return "any";
                }
                var resultType = "";
                var prototype = getPrototypeOf(className);
                if (prototype) {
                    if (!prototype.hasOwnProperty("__hashCode__")) {
                        var clazz = egret.getDefinitionByName(className);
                        var instance = getInstanceOf(clazz);
                        if (!instance) {
                            if (DEBUG) {
                                egret.$warn(2104, className);
                            }
                            return resultType;
                        }
                        this.$describe(instance);
                    }
                    var info = properties[prototype.__hashCode__];
                    if (info) {
                        resultType = info[property];
                    }
                }
                return resultType;
            };
            return EXMLConfig;
        }());
        sys.EXMLConfig = EXMLConfig;
        egret.registerClass(EXMLConfig,'eui.sys.EXMLConfig');
        /**
         * @private
         * ???????????????????????????
         */
        function isArray(o) {
            return Object.prototype.toString.call(o) === '[object Array]';
        }
        /**
         * @private
         * ???????????????????????????prototype??????
         */
        function getPrototypeOf(className) {
            var clazz = egret.getDefinitionByName(className);
            if (!clazz) {
                return null;
            }
            return clazz.prototype;
        }
        /**
         * @private
         * ?????????????????????????????????
         */
        function getInstanceOf(clazz) {
            if (!clazz) {
                return null;
            }
            var instance;
            if (DEBUG) {
                try {
                    instance = new clazz();
                }
                catch (e) {
                    egret.error(e);
                    return null;
                }
            }
            else {
                instance = new clazz();
            }
            return instance;
        }
    })(sys = eui.sys || (eui.sys = {}));
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/// <reference path="EXMLParser.ts" />
var EXML;
(function (EXML) {
    var parser = new eui.sys.EXMLParser();
    var requestPool = [];
    var callBackMap = {};
    var parsedClasses = {};
    var $prefixURL = "";
    Object.defineProperty(EXML, "prefixURL", {
        get: function () { return $prefixURL; },
        set: function (value) { $prefixURL = value; },
        enumerable: true,
        configurable: true
    });
    /**
     * @language en_US
     * Parsing a text of EXML file for a definition of class. You can declare the <code>class</code> property in the root
     * node of the EXML to register to the global as a class name.
     *
     * It will be fail to register and output a warning if the specified name already exists. You can get a definition
     * of a class through <code>egret.getDefinitionByName(className)</code>.
     *
     * @param text the text of a EXML file.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ???????????? EXML ?????????????????????????????????????????????????????? EXML ??????????????????????????? class ??????????????????????????????????????????
     * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????? egret.getDefinitionByName(className) ?????????????????? EXML ???????????????????????????
     *
     * @param text ???????????? EXML ???????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    function parse(text) {
        return parser.parse(text);
    }
    EXML.parse = parse;
    /**
     * @language en_US
     * Load and parse an external EXML file for a class definition. You can declare the <code>class</code> property in the root
     * node of the EXML to register to the global as a class name.
     *
     * It will be fail to register and output a warning if the specified name already exists. You can get a definition
     * of a class through <code>egret.getDefinitionByName(className)</code>.
     *
     * @param url the path of an EXML file
     * @param callBack method to invoke with an argument of the result when load and parse completed or failed. The argument will be
     * <code>undefined</code> if load or parse failed.
     * @param thisObject <code>this</code> object of callBack
     * @param useCache use cached EXML
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ?????????????????????????????? EXML ??????????????????????????????????????? EXML ??????????????????????????? class ??????????????????????????????????????????
     * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????? egret.getDefinitionByName(className) ?????????????????? EXML ???????????????????????????
     *
     * @param url ???????????? EXML ????????????
     * @param callBack ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? undefined ???????????????????????????
     * @param thisObject ??????????????? this ?????????
     * @param useCache ???????????????EXML
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    function load(url, callBack, thisObject, useCache) {
        if (useCache === void 0) { useCache = false; }
        if (DEBUG) {
            if (!url) {
                egret.$error(1003, "url");
            }
        }
        if (useCache && (url in parsedClasses)) {
            callBack && callBack.call(thisObject, parsedClasses[url], url);
            return;
        }
        var list = callBackMap[url];
        if (list) {
            list.push([callBack, thisObject]);
            return;
        }
        callBackMap[url] = [[callBack, thisObject]];
        request(url, $parseURLContent);
    }
    EXML.load = load;
    /**
     * @private
     */
    function $loadAll(urls, callBack, thisObject, useCache) {
        if (useCache === void 0) { useCache = false; }
        if (!urls || urls.length == 0) {
            callBack && callBack.call(thisObject, [], urls);
            return;
        }
        var exmlContents = [];
        urls.forEach(function (url) {
            if (useCache && (url in parsedClasses)) {
                exmlContents[url] = "";
                exmlContents.push(url);
                return;
            }
            var loaded = function (url, text) {
                exmlContents[url] = text;
                exmlContents.push(url);
                if (exmlContents.length == urls.length)
                    onLoadAllFinished(urls, exmlContents, callBack, thisObject);
            };
            request(url, loaded);
        });
    }
    EXML.$loadAll = $loadAll;
    /**
     * @private
     */
    function onLoadAllFinished(urls, exmlContents, callBack, thisObject) {
        var clazzes = [];
        urls.forEach(function (url, i) {
            if ((url in parsedClasses) && !exmlContents[url]) {
                clazzes[i] = parsedClasses[url];
                return;
            }
            var text = exmlContents[url];
            var clazz = $parseURLContent(url, text);
            clazzes[i] = clazz;
        });
        callBack && callBack.call(thisObject, clazzes, urls);
    }
    /**
     * @private
     * @param url
     * @param text
     */
    function $parseURLContentAsJs(url, text, className) {
        var clazz = null;
        if (text) {
            clazz = parser.$parseCode(text, className);
        }
        if (url) {
            parsedClasses[url] = clazz;
            var list = callBackMap[url];
            delete callBackMap[url];
            var length_30 = list ? list.length : 0;
            for (var i = 0; i < length_30; i++) {
                var arr = list[i];
                if (arr[0] && arr[1])
                    arr[0].call(arr[1], clazz, url);
            }
        }
        return clazz;
    }
    EXML.$parseURLContentAsJs = $parseURLContentAsJs;
    /**
     * @private
     */
    function $parseURLContent(url, text) {
        var clazz = null;
        if (text) {
            clazz = parse(text);
        }
        if (url) {
            parsedClasses[url] = clazz;
            var list = callBackMap[url];
            delete callBackMap[url];
            var length_31 = list ? list.length : 0;
            for (var i = 0; i < length_31; i++) {
                var arr = list[i];
                if (arr[0] && arr[1])
                    arr[0].call(arr[1], clazz, url);
            }
        }
        return clazz;
    }
    EXML.$parseURLContent = $parseURLContent;
    /**
     * @private
     */
    function request(url, callback) {
        var openUrl = url;
        if (url.indexOf("://") == -1) {
            openUrl = $prefixURL + url;
        }
        var onConfigLoaded = function (str) {
            if (!str) {
                str = "";
            }
            callback(url, str);
        };
        var adapter = egret.getImplementation("eui.IThemeAdapter");
        if (!adapter) {
            adapter = new eui.DefaultThemeAdapter();
        }
        adapter.getTheme(openUrl, onConfigLoaded, onConfigLoaded, this);
    }
})(EXML || (EXML = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present; Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms; with or without
//  modification; are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice; this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice; this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES; INCLUDING; BUT NOT LIMITED TO; THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT; INDIRECT;
//  INCIDENTAL; SPECIAL; EXEMPLARY; OR CONSEQUENTIAL DAMAGES (INCLUDING; BUT NOT
//  LIMITED TO; PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE; DATA;
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY; WHETHER IN CONTRACT; STRICT LIABILITY; OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE;
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    egret.$locale_strings = egret.$locale_strings || {};
    egret.$locale_strings["en_US"] = egret.$locale_strings["en_US"] || {};
    var locale_strings = egret.$locale_strings["en_US"];
    //2000-2999
    locale_strings[2001] = "EXML parsing error {0}: EXML file can't be found ";
    locale_strings[2002] = "EXML parsing error : invalid XML file:\n{0}";
    locale_strings[2003] = "EXML parsing error {0}: the class definitions corresponding to nodes can't be found  \n {1}";
    locale_strings[2004] = "EXML parsing error {0}: nodes cannot contain id property with the same name \n {1}";
    locale_strings[2005] = "EXML parsing error {0}: property with the name of '{1}' does not exist on the node, or the property does not have a default value: \n {2}";
    locale_strings[2006] = "EXML parsing error {0}: undefined view state name: '{1}' \n {2}";
    locale_strings[2007] = "EXML parsing error {0}: only UIComponent objects within the container can use the includeIn and excludeFrom properties\n {1}";
    locale_strings[2008] = "EXML parsing error {0}: fail to assign values of '{1}' class to property: '{2}' \n {3}";
    locale_strings[2009] = "EXML parsing error {0}: only one ID can be referenced in the node property value '{}' label; and complex expression is not allowed to use \n {1}";
    locale_strings[2010] = "EXML parsing error {0}: ID referenced by property: '{1}':  '{2}' does not exist \n {3}";
    locale_strings[2011] = "EXML parsing error {0}: fail to assign more than one child nodes to the same property: '{1}' \n {2}";
    locale_strings[2012] = "EXML parsing error {0}: no default property exists on the node; and you must explicitly declare the property name that the child node  is assigned to \n {1}";
    locale_strings[2013] = "EXML parsing error {0}: view state grammar is not allowed to use on property nodes of Array class \n {1} ";
    locale_strings[2014] = "EXML parsing error {0}: assigning the skin class itself to the node property is not allowed \n {1}";
    locale_strings[2015] = "EXML parsing error {0}: class definition referenced by node: {1} does not exist \n {2}";
    locale_strings[2016] = "EXML parsing error {0}: format error of 'scale9Grid' property value on the node: {1}";
    locale_strings[2017] = "EXML parsing error {0}: namespace prefix missing on the node: {1}";
    locale_strings[2018] = "EXML parsing error {0}: format error of 'skinName' property value on the node: {1}";
    locale_strings[2019] = "EXML parsing error {0}: the container???s child item must be visible nodes: {1}";
    locale_strings[2020] = "EXML parsing error {0}: for child nodes in w: Declarations, the includeIn and excludeFrom properties are not allowed to use \n {1}";
    locale_strings[2021] = "Compile errors in {0}, the attribute name: {1}, the attribute value: {2}.";
    locale_strings[2022] = "EXML parsing error: there can be no Spaces in the id `{0}`";
    locale_strings[2023] = "EXML parsing error: the first character in id `{0}`,can not be a number";
    locale_strings[2101] = "EXML parsing warnning : fail to register the class property : {0},there is already a class with the same name in the global,please try to rename the class name for the exml. \n {1}";
    locale_strings[2102] = "EXML parsing warnning {0}: no child node can be found on the property code \n {1}";
    locale_strings[2103] = "EXML parsing warnning {0}: the same property '{1}' on the node is assigned multiple times \n {2}";
    locale_strings[2104] = "EXML parsing warnning, Instantiate class {0} error???the parameters of its constructor method must be empty.";
    locale_strings[2201] = "BasicLayout doesn't support virtualization.";
    locale_strings[2202] = "parse skinName error???the parsing result of skinName must be a instance of eui.Skin.";
    locale_strings[2203] = "Could not find the skin class '{0}'???";
    locale_strings[2301] = "parse source failed???could not find asset from URL???{0} .";
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present; Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms; with or without
//  modification; are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice; this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice; this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES; INCLUDING; BUT NOT LIMITED TO; THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT; INDIRECT;
//  INCIDENTAL; SPECIAL; EXEMPLARY; OR CONSEQUENTIAL DAMAGES (INCLUDING; BUT NOT
//  LIMITED TO; PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE; DATA;
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY; WHETHER IN CONTRACT; STRICT LIABILITY; OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE;
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    egret.$locale_strings = egret.$locale_strings || {};
    egret.$locale_strings["zh_CN"] = egret.$locale_strings["zh_CN"] || {};
    var locale_strings = egret.$locale_strings["zh_CN"];
    //2000-2999
    //EXML????????????
    locale_strings[2001] = "EXML???????????? {0}: ?????????EXML??????";
    locale_strings[2002] = "EXML????????????: ???????????????XML??????:\n{0}";
    locale_strings[2003] = "EXML???????????? {0}: ???????????????????????????????????????\n{1}";
    locale_strings[2004] = "EXML???????????? {0}: ???????????????????????????id??????\n{1}";
    locale_strings[2005] = "EXML???????????? {0}: ????????????????????????'{1}'??????????????????????????????????????????:\n{2}";
    locale_strings[2006] = "EXML???????????? {0}: ??????????????????????????????:'{1}'\n{2}";
    locale_strings[2007] = "EXML???????????? {0}: ???????????????????????? UIComponent ??????????????????includeIn???excludeFrom??????\n{1}";
    locale_strings[2008] = "EXML???????????? {0}: ?????????'{1}'????????????????????????:'{2}'\n{3}";
    locale_strings[2009] = "EXML???????????? {0}: ????????????????????????{}??????????????????????????????ID?????????????????????????????????\n{1}";
    locale_strings[2010] = "EXML???????????? {0}: ??????:'{1}'????????????ID: '{2}'?????????\n{3}";
    locale_strings[2011] = "EXML???????????? {0}: ????????????????????????????????????????????????:'{1}'\n{2}";
    locale_strings[2012] = "EXML???????????? {0}: ????????????????????????????????????????????????????????????????????????????????????\n{1}";
    locale_strings[2013] = "EXML???????????? {0}: ?????????Array???????????????????????????????????????????????????\n{1}";
    locale_strings[2014] = "EXML???????????? {0}: ????????????????????????????????????????????????\n{1}";
    locale_strings[2015] = "EXML???????????? {0}: ????????????????????????:{1}?????????\n{2}";
    locale_strings[2016] = "EXML???????????? {0}: ?????????'scale9Grid'????????????????????????:{1}";
    locale_strings[2017] = "EXML???????????? {0}: ?????????????????????????????????:{1}";
    locale_strings[2018] = "EXML???????????? {0}: ?????????'skinName'????????????????????????:{1}";
    locale_strings[2019] = "EXML???????????? {0}: ????????????????????????????????????:{1}";
    locale_strings[2020] = "EXML???????????? {0}: ???w:Declarations?????????????????????????????????includeIn???excludeFrom??????\n{1}";
    locale_strings[2021] = "{0} ????????????????????????????????? : {1}???????????? : {2}";
    locale_strings[2022] = "EXML????????????: id `{0}` ?????????????????????";
    locale_strings[2023] = "EXML????????????: id `{0}` ?????????????????????????????????";
    //EXML????????????
    locale_strings[2101] = "EXML????????????: ???EXML????????????????????? class ??????: {0} ????????????????????????????????????????????????????????????????????????????????????\n{1}";
    locale_strings[2102] = "EXML???????????? {0}: ??????????????????????????????????????????\n{1}";
    locale_strings[2103] = "EXML???????????? {0}: ???????????????????????????'{1}'???????????????\n{2}";
    locale_strings[2104] = "EXML??????????????????????????????????????????????????????{0} ??????EXML????????????????????????????????????????????????????????????????????????????????????EXML???????????????";
    //EUI ?????????????????????
    locale_strings[2201] = "BasicLayout ?????????????????????";
    locale_strings[2202] = "??????????????????????????? skinName ???????????????????????????????????? eui.Skin ????????????";
    locale_strings[2203] = "??????????????????????????? '{0}'???";
    locale_strings[2301] = "??????????????????????????????URL???{0} ?????????????????????";
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The LayoutBase class defines the base class for all Spark layouts.
     * To create a custom layout that works with the Spark containers,
     * you must extend <code>LayoutBase</code> or one of its subclasses.
     *
     * <p>Subclasses must implement the <code>updateDisplayList()</code>
     * method, which positions and sizes the <code>target</code> GroupBase's elements, and
     * the <code>measure()</code> method, which calculates the default
     * size of the <code>target</code>.</p>
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ??????????????????????????????????????? Group ??????????????????????????????????????? <code>LayoutBase</code> ?????????????????????
     *
     * <p>?????????????????? <code>updateDisplayList()</code> ??????
     * ????????? <code>target</code> Group ????????????????????????????????????????????? <code>measure()</code> ??????
     * ????????? <code>target</code> ?????????????????????</p>
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var LayoutBase = (function (_super) {
        __extends(LayoutBase, _super);
        /**
         * @language en_US
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function LayoutBase() {
            _super.call(this);
            /**
             * @private
             */
            this.$target = null;
            /**
             * @private
             */
            this.$useVirtualLayout = false;
            /**
             * @private
             */
            this.$typicalWidth = 71;
            /**
             * @private
             */
            this.$typicalHeight = 22;
        }
        var d = __define,c=LayoutBase,p=c.prototype;
        d(p, "target"
            /**
             * @language en_US
             * The Group container whose elements are measured, sized and positioned
             * by this layout.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????????????? Group ?????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$target;
            }
            ,function (value) {
                if (this.$target === value)
                    return;
                this.$target = value;
                this.clearVirtualLayoutCache();
            }
        );
        d(p, "useVirtualLayout"
            /**
             * @language en_US
             * To configure a container to use virtual layout, set the <code>useVirtualLayout</code> property
             * to <code>true</code> for the layout associated with the container.
             * Only DataGroup with layout set to VerticalLayout,
             * HorizontalLayout, or TileLayout supports virtual layout.
             * Layout subclasses that do not support virtualization must prevent changing
             * this property.
             *
             * @default false
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????????????? <code>useVirtualLayout</code> ??????????????? <code>true</code>???
             * ????????????????????? VerticalLayout???HorizontalLayout ??? TileLayout ??? DataGroup ????????????????????????
             * ???????????????????????????????????????????????????????????????
             *
             * @default false
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$useVirtualLayout;
            }
            ,function (value) {
                value = !!value;
                if (this.$useVirtualLayout == value)
                    return;
                this.$useVirtualLayout = value;
                this.dispatchEventWith("useVirtualLayoutChanged");
                if (this.$useVirtualLayout && !value)
                    this.clearVirtualLayoutCache();
                if (this.target)
                    this.target.invalidateDisplayList();
            }
        );
        /**
         * @language en_US
         * Set this size of a typical element
         *
         * @param width the height of element
         * @param height the width of element
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         *
         * @param width ????????????
         * @param height ????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.setTypicalSize = function (width, height) {
            width = +width || 71;
            height = +height || 22;
            if (width !== this.$typicalWidth || height !== this.$typicalHeight) {
                this.$typicalWidth = width;
                this.$typicalHeight = height;
                if (this.$target) {
                    this.$target.invalidateSize();
                }
            }
        };
        /**
         * @language en_US
         * Called when the <code>verticalScrollPosition</code> or
         * <code>horizontalScrollPosition</code> properties change.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * <code>verticalScrollPosition</code> ??? <code>horizontalScrollPosition</code>
         * ????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.scrollPositionChanged = function () {
        };
        /**
         * @language en_US
         * When <code>useVirtualLayout</code> is <code>true</code>,
         * this method can be used by the layout target
         * to clear cached layout information when the target changes.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????? <code>useVirtualLayout</code> ??? <code>true</code>???
         * ????????????????????????????????????????????????????????????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.clearVirtualLayoutCache = function () {
        };
        /**
         * @language en_US
         * Called by the target after a layout element
         * has been added and before the target's size and display list are
         * validated.
         * Layouts that cache per element state, like virtual layouts, can
         * override this method to update their cache.
         *
         * @param index The index of the element that was added.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????????????????????
         * ????????????????????????????????????????????????????????????????????????????????????????????????
         *
         * @param index ???????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.elementAdded = function (index) {
        };
        /**
         * @language en_US
         * This method must is called by the target after a layout element
         * has been removed and before the target's size and display list are
         * validated.
         * Layouts that cache per element state, like virtual layouts, can
         * override this method to update their cache.
         *
         * @param index The index of the element that was added.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
         * ????????????????????????????????????????????????????????????????????????????????????????????????
         *
         * @param index ???????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.elementRemoved = function (index) {
        };
        /**
         * @language en_US
         * Return the indices of the element visible within this Group.
         *
         * @return The indices of the visible element.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????? Group ??????????????????????????????
         *
         * @return ???????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getElementIndicesInView = function () {
            return null;
        };
        /**
         * @language en_US
         * Measures the target's default size based on its content.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measure = function () {
        };
        /**
         * @language en_US
         * Sizes and positions the target's elements.
         *
         * @param unscaledWidth Specifies the width of the target, in pixels,
         * in the targets's coordinates.
         *
         * @param unscaledHeight Specifies the height of the component, in pixels,
         * in the target's coordinates.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????
         *
         * @param unscaledWidth ??????????????????????????????????????????????????????????????????
         * @param unscaledHeight ??????????????????????????????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (width, height) {
        };
        return LayoutBase;
    }(egret.EventDispatcher));
    eui.LayoutBase = LayoutBase;
    egret.registerClass(LayoutBase,'eui.LayoutBase');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The BasicLayout class arranges the layout elements according to their individual settings,
     * independent of each-other. BasicLayout, also called absolute layout, requires that you
     * explicitly position each container child.
     * You can use the <code>x</code> and <code>y</code> properties of the child,
     * or constraints to position each child.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/BasicLayoutExample.ts
     */
    /**
     * @language zh_CN
     * BasicLayout ????????????????????????????????????????????????????????????
     * BasicLayout??????????????????????????????????????????????????????????????????
     * ????????????????????? <code>x</code> ??? <code>y</code> ????????????????????????????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/BasicLayoutExample.ts
     */
    var BasicLayout = (function (_super) {
        __extends(BasicLayout, _super);
        /**
         * @language en_US
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function BasicLayout() {
            _super.call(this);
        }
        var d = __define,c=BasicLayout,p=c.prototype;
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measure = function () {
            _super.prototype.measure.call(this);
            eui.sys.measure(this.$target);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var target = this.$target;
            var pos = eui.sys.updateDisplayList(target, unscaledWidth, unscaledHeight);
            target.setContentSize(Math.ceil(pos.x), Math.ceil(pos.y));
        };
        return BasicLayout;
    }(eui.LayoutBase));
    eui.BasicLayout = BasicLayout;
    egret.registerClass(BasicLayout,'eui.BasicLayout');
    if (DEBUG) {
        Object.defineProperty(BasicLayout.prototype, "useVirtualLayout", {
            /**
             * ?????????????????????????????????????????????????????????
             */
            get: function () {
                return this.$useVirtualLayout;
            },
            set: function (value) {
                egret.$error(2201);
            },
            enumerable: true,
            configurable: true
        });
    }
})(eui || (eui = {}));
var eui;
(function (eui) {
    var sys;
    (function (sys) {
        var UIComponentClass = "eui.UIComponent";
        /**
         * @private
         * @param value ????????????????????????
         * @param total ??????????????????????????????
         */
        function formatRelative(value, total) {
            if (!value || typeof value == "number") {
                return value;
            }
            var str = value;
            var index = str.indexOf("%");
            if (index == -1) {
                return +str;
            }
            var percent = +str.substring(0, index);
            return percent * 0.01 * total;
        }
        /**
         * @private
         * ???????????????????????????BasicLayout???????????????????????????
         */
        function measure(target) {
            if (!target) {
                return;
            }
            var width = 0;
            var height = 0;
            var bounds = egret.$TempRectangle;
            var count = target.numChildren;
            for (var i = 0; i < count; i++) {
                var layoutElement = (target.getChildAt(i));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                    continue;
                }
                var values = layoutElement.$UIComponent;
                var hCenter = +values[4 /* horizontalCenter */];
                var vCenter = +values[5 /* verticalCenter */];
                var left = +values[0 /* left */];
                var right = +values[1 /* right */];
                var top_1 = +values[2 /* top */];
                var bottom = +values[3 /* bottom */];
                var extX = void 0;
                var extY = void 0;
                layoutElement.getPreferredBounds(bounds);
                if (!isNaN(left) && !isNaN(right)) {
                    extX = left + right;
                }
                else if (!isNaN(hCenter)) {
                    extX = Math.abs(hCenter) * 2;
                }
                else if (!isNaN(left) || !isNaN(right)) {
                    extX = isNaN(left) ? 0 : left;
                    extX += isNaN(right) ? 0 : right;
                }
                else {
                    extX = bounds.x;
                }
                if (!isNaN(top_1) && !isNaN(bottom)) {
                    extY = top_1 + bottom;
                }
                else if (!isNaN(vCenter)) {
                    extY = Math.abs(vCenter) * 2;
                }
                else if (!isNaN(top_1) || !isNaN(bottom)) {
                    extY = isNaN(top_1) ? 0 : top_1;
                    extY += isNaN(bottom) ? 0 : bottom;
                }
                else {
                    extY = bounds.y;
                }
                var preferredWidth = bounds.width;
                var preferredHeight = bounds.height;
                width = Math.ceil(Math.max(width, extX + preferredWidth));
                height = Math.ceil(Math.max(height, extY + preferredHeight));
            }
            target.setMeasuredSize(width, height);
        }
        sys.measure = measure;
        /**
         * @private
         * ???????????????????????????BasicLayout???????????????????????????
         */
        function updateDisplayList(target, unscaledWidth, unscaledHeight) {
            if (!target)
                return;
            var count = target.numChildren;
            var maxX = 0;
            var maxY = 0;
            var bounds = egret.$TempRectangle;
            for (var i = 0; i < count; i++) {
                var layoutElement = (target.getChildAt(i));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                    continue;
                }
                var values = layoutElement.$UIComponent;
                var hCenter = formatRelative(values[4 /* horizontalCenter */], unscaledWidth * 0.5);
                var vCenter = formatRelative(values[5 /* verticalCenter */], unscaledHeight * 0.5);
                var left = formatRelative(values[0 /* left */], unscaledWidth);
                var right = formatRelative(values[1 /* right */], unscaledWidth);
                var top_2 = formatRelative(values[2 /* top */], unscaledHeight);
                var bottom = formatRelative(values[3 /* bottom */], unscaledHeight);
                var percentWidth = values[6 /* percentWidth */];
                var percentHeight = values[7 /* percentHeight */];
                var childWidth = NaN;
                var childHeight = NaN;
                if (!isNaN(left) && !isNaN(right)) {
                    childWidth = unscaledWidth - right - left;
                }
                else if (!isNaN(percentWidth)) {
                    childWidth = Math.round(unscaledWidth * Math.min(percentWidth * 0.01, 1));
                }
                if (!isNaN(top_2) && !isNaN(bottom)) {
                    childHeight = unscaledHeight - bottom - top_2;
                }
                else if (!isNaN(percentHeight)) {
                    childHeight = Math.round(unscaledHeight * Math.min(percentHeight * 0.01, 1));
                }
                layoutElement.setLayoutBoundsSize(childWidth, childHeight);
                layoutElement.getLayoutBounds(bounds);
                var elementWidth = bounds.width;
                var elementHeight = bounds.height;
                var childX = NaN;
                var childY = NaN;
                if (!isNaN(hCenter))
                    childX = Math.round((unscaledWidth - elementWidth) / 2 + hCenter);
                else if (!isNaN(left))
                    childX = left;
                else if (!isNaN(right))
                    childX = unscaledWidth - elementWidth - right;
                else
                    childX = bounds.x;
                if (!isNaN(vCenter))
                    childY = Math.round((unscaledHeight - elementHeight) / 2 + vCenter);
                else if (!isNaN(top_2))
                    childY = top_2;
                else if (!isNaN(bottom))
                    childY = unscaledHeight - elementHeight - bottom;
                else
                    childY = bounds.y;
                layoutElement.setLayoutBoundsPosition(childX, childY);
                maxX = Math.max(maxX, childX + elementWidth);
                maxY = Math.max(maxY, childY + elementHeight);
            }
            return egret.$TempPoint.setTo(maxX, maxY);
        }
        sys.updateDisplayList = updateDisplayList;
    })(sys = eui.sys || (eui.sys = {}));
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The ColumnAlign class defines the possible values for the
     * <code>columnAlign</code> property of the TileLayout class.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/ColumnAlignExample.ts
     */
    /**
     * @language zh_CN
     * ColumnAlign ?????? TileLayout ?????? <code>columnAlign</code> ???????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/ColumnAlignExample.ts
     */
    var ColumnAlign = (function () {
        function ColumnAlign() {
        }
        var d = __define,c=ColumnAlign,p=c.prototype;
        /**
         * @language en_US
         * Do not justify the rows.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        ColumnAlign.LEFT = "left";
        /**
         * @language en_US
         * Justify the rows by increasing the vertical gap.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        ColumnAlign.JUSTIFY_USING_GAP = "justifyUsingGap";
        /**
         * @language en_US
         * Justify the rows by increasing the row height.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        ColumnAlign.JUSTIFY_USING_WIDTH = "justifyUsingWidth";
        return ColumnAlign;
    }());
    eui.ColumnAlign = ColumnAlign;
    egret.registerClass(ColumnAlign,'eui.ColumnAlign');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * Linear layout base class, usually as the parent class of
     * <code>HorizontalLayout</code> and <code>VerticalLayout</code>.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ????????????????????????????????? <code>HorizontalLayout</code> ??? <code>VerticalLayout</code> ????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var LinearLayoutBase = (function (_super) {
        __extends(LinearLayoutBase, _super);
        function LinearLayoutBase() {
            _super.apply(this, arguments);
            /**
             * @private
             */
            this.$horizontalAlign = "left";
            /**
             * @private
             */
            this.$verticalAlign = "top";
            /**
             * @private
             */
            this.$gap = 6;
            /**
             * @private
             */
            this.$paddingLeft = 0;
            /**
             * @private
             */
            this.$paddingRight = 0;
            /**
             * @private
             */
            this.$paddingTop = 0;
            /**
             * @private
             */
            this.$paddingBottom = 0;
            /**
             * @language en_US
             * An Array of the virtual layout elements size cache.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.elementSizeTable = [];
            /**
             * @language en_US
             * The first element index in the view of the virtual layout
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????????????????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.startIndex = -1;
            /**
             * @language en_US
             * The last element index in the view of the virtual layout
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.endIndex = -1;
            /**
             * @language en_US
             * A Flag of the first element and the end element has been calculated.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????????????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.indexInViewCalculated = false;
            /**
             * @language en_US
             * The maximum size of elements
             *
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            this.maxElementSize = 0;
        }
        var d = __define,c=LinearLayoutBase,p=c.prototype;
        d(p, "horizontalAlign"
            /**
             * @language en_US
             * The horizontal alignment of layout elements.
             * <p>The <code>egret.HorizontalAlign</code> and <code>eui.JustifyAlign</code> class
             * defines the possible values for this property.</p>
             *
             * @default "left"
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????
             * <p><code>egret.HorizontalAlign</code> ???
             * <code>eui.JustifyAlign</code>?????????????????????????????????<p>
             *
             * @default "left"
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$horizontalAlign;
            }
            ,function (value) {
                if (this.$horizontalAlign == value)
                    return;
                this.$horizontalAlign = value;
                if (this.$target)
                    this.$target.invalidateDisplayList();
            }
        );
        d(p, "verticalAlign"
            /**
             * @language en_US
             * The vertical alignment of layout elements.
             * <p>The <code>egret.VerticalAlign</code> and <code>eui.JustifyAlign</code> class
             * defines the possible values for this property.</p>
             *
             * @default "top"
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ????????????????????????????????????????????? VerticalAlign ??????????????????
             * <p><code>egret.VerticalAlign</code> ???
             * <code>eui.JustifyAlign</code>?????????????????????????????????<p>
             *
             * @default "top"
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$verticalAlign;
            }
            ,function (value) {
                if (this.$verticalAlign == value)
                    return;
                this.$verticalAlign = value;
                if (this.$target)
                    this.$target.invalidateDisplayList();
            }
        );
        d(p, "gap"
            /**
             * @language en_US
             * The space between layout elements, in pixels.
             *
             * @default 6
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????
             *
             * @default 6
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$gap;
            }
            ,function (value) {
                value = +value || 0;
                if (this.$gap === value)
                    return;
                this.$gap = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingLeft"
            /**
             * @language en_US
             * Number of pixels between the container's left edge
             * and the left edge of the first layout element.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????????????????
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$paddingLeft;
            }
            ,function (value) {
                value = +value || 0;
                if (this.$paddingLeft === value)
                    return;
                this.$paddingLeft = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingRight"
            /**
             * @language en_US
             * Number of pixels between the container's right edge
             * and the right edge of the last layout element.
             *
             *  @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????????????????????????????
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$paddingRight;
            }
            ,function (value) {
                value = +value || 0;
                if (this.$paddingRight === value)
                    return;
                this.$paddingRight = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingTop"
            /**
             * @language en_US
             * The minimum number of pixels between the container's top edge and
             * the top of all the container's layout elements.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????????????????????????????
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$paddingTop;
            }
            ,function (value) {
                value = +value || 0;
                if (this.$paddingTop === value)
                    return;
                this.$paddingTop = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingBottom"
            /**
             * @language en_US
             * The minimum number of pixels between the container's bottom edge and
             * the bottom of all the container's layout elements.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????????????????????????????
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$paddingBottom;
            }
            ,function (value) {
                value = +value || 0;
                if (this.$paddingBottom === value)
                    return;
                this.$paddingBottom = value;
                this.invalidateTargetLayout();
            }
        );
        /**
         * @language en_US
         * Convenience function for subclasses that invalidates the
         * target's size and displayList so that both layout's <code>measure()</code>
         * and <code>updateDisplayList</code> methods get called.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????????????????????????????????????????
         * <code>measure()</code>???<code>updateDisplayList</code>??????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.invalidateTargetLayout = function () {
            var target = this.$target;
            if (target) {
                target.invalidateSize();
                target.invalidateDisplayList();
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measure = function () {
            if (!this.$target)
                return;
            if (this.$useVirtualLayout) {
                this.measureVirtual();
            }
            else {
                this.measureReal();
            }
        };
        /**
         * @language en_US
         * Compute exact values for measuredWidth and measuredHeight.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????? measuredWidth ??? measuredHeight ????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measureReal = function () {
        };
        /**
         * @language en_US
         * Compute potentially approximate values for measuredWidth and measuredHeight.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????? measuredWidth ??? measuredHeight ????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measureVirtual = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (width, height) {
            var target = this.$target;
            if (!target)
                return;
            if (target.numElements == 0) {
                target.setContentSize(Math.ceil(this.$paddingLeft + this.$paddingRight), Math.ceil(this.$paddingTop + this.$paddingBottom));
                return;
            }
            if (this.$useVirtualLayout) {
                this.updateDisplayListVirtual(width, height);
            }
            else {
                this.updateDisplayListReal(width, height);
            }
        };
        /**
         * @language en_US
         * Gets the starting position of the specified index element
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getStartPosition = function (index) {
            return 0;
        };
        /**
         * @language en_US
         * Gets the size of the specified index element
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getElementSize = function (index) {
            return 0;
        };
        /**
         * @language en_US
         * Gets the sum of the size of cached elements
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getElementTotalSize = function () {
            return 0;
        };
        /**
         * @inheritDoc
         *
         * @param index
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.elementRemoved = function (index) {
            if (!this.$useVirtualLayout)
                return;
            _super.prototype.elementRemoved.call(this, index);
            this.elementSizeTable.splice(index, 1);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.clearVirtualLayoutCache = function () {
            if (!this.$useVirtualLayout)
                return;
            this.elementSizeTable = [];
            this.maxElementSize = 0;
        };
        /**
         * @language en_US
         * The binary search to find the specified index position of the display object
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.findIndexAt = function (x, i0, i1) {
            var index = ((i0 + i1) * 0.5) | 0;
            var elementX = this.getStartPosition(index);
            var elementWidth = this.getElementSize(index);
            if ((x >= elementX) && (x < elementX + elementWidth + this.$gap))
                return index;
            else if (i0 == i1)
                return -1;
            else if (x < elementX)
                return this.findIndexAt(x, i0, Math.max(i0, index - 1));
            else
                return this.findIndexAt(x, Math.min(index + 1, i1), i1);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.scrollPositionChanged = function () {
            _super.prototype.scrollPositionChanged.call(this);
            if (this.$useVirtualLayout) {
                var changed = this.getIndexInView();
                if (changed) {
                    this.indexInViewCalculated = true;
                    this.target.invalidateDisplayList();
                }
            }
        };
        /**
         * @language en_US
         * Get the index of the first and last element in the view,
         * and to return whether or not to change.
         *
         * @return has the index changed
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????,???????????????????????????
         *
         * @return ?????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getIndexInView = function () {
            return false;
        };
        /**
         * @language en_US
         * Update the layout of the virtualized elements
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayListVirtual = function (width, height) {
        };
        /**
         * @language en_US
         * Update the layout of the reality elements
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayListReal = function (width, height) {
        };
        /**
         * @language en_US
         * Allocate blank area for each variable size element.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.flexChildrenProportionally = function (spaceForChildren, spaceToDistribute, totalPercent, childInfoArray) {
            var numElements = childInfoArray.length;
            var done;
            do {
                done = true;
                var unused = spaceToDistribute -
                    (spaceForChildren * totalPercent / 100);
                if (unused > 0)
                    spaceToDistribute -= unused;
                else
                    unused = 0;
                var spacePerPercent = spaceToDistribute / totalPercent;
                for (var i = 0; i < numElements; i++) {
                    var childInfo = childInfoArray[i];
                    var size = childInfo.percent * spacePerPercent;
                    if (size < childInfo.min) {
                        var min = childInfo.min;
                        childInfo.size = min;
                        childInfoArray[i] = childInfoArray[--numElements];
                        childInfoArray[numElements] = childInfo;
                        totalPercent -= childInfo.percent;
                        if (unused >= min) {
                            unused -= min;
                        }
                        else {
                            spaceToDistribute -= min - unused;
                            unused = 0;
                        }
                        done = false;
                        break;
                    }
                    else if (size > childInfo.max) {
                        var max = childInfo.max;
                        childInfo.size = max;
                        childInfoArray[i] = childInfoArray[--numElements];
                        childInfoArray[numElements] = childInfo;
                        totalPercent -= childInfo.percent;
                        if (unused >= max) {
                            unused -= max;
                        }
                        else {
                            spaceToDistribute -= max - unused;
                            unused = 0;
                        }
                        done = false;
                        break;
                    }
                    else {
                        childInfo.size = size;
                    }
                }
            } while (!done);
        };
        return LinearLayoutBase;
    }(eui.LayoutBase));
    eui.LinearLayoutBase = LinearLayoutBase;
    egret.registerClass(LinearLayoutBase,'eui.LinearLayoutBase');
})(eui || (eui = {}));
var eui;
(function (eui) {
    var sys;
    (function (sys) {
        /**
         * @private
         */
        var ChildInfo = (function () {
            function ChildInfo() {
                /**
                 * @private
                 */
                this.layoutElement = null;
                /**
                 * @private
                 */
                this.size = 0;
                /**
                 * @private
                 */
                this.percent = NaN;
                /**
                 * @private
                 */
                this.min = NaN;
                /**
                 * @private
                 */
                this.max = NaN;
            }
            var d = __define,c=ChildInfo,p=c.prototype;
            return ChildInfo;
        }());
        sys.ChildInfo = ChildInfo;
        egret.registerClass(ChildInfo,'eui.sys.ChildInfo');
    })(sys = eui.sys || (eui.sys = {}));
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var UIComponentClass = "eui.UIComponent";
    /**
     * @language en_US
     * The HorizontalLayout class arranges the layout elements in a horizontal sequence,
     * left to right, with optional gaps between the elements and optional padding
     * around the elements.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/HorizontalLayoutExample.ts
     */
    /**
     * @language zh_CN
     * HorizontalLayout ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/HorizontalLayoutExample.ts
     */
    var HorizontalLayout = (function (_super) {
        __extends(HorizontalLayout, _super);
        function HorizontalLayout() {
            _super.apply(this, arguments);
        }
        var d = __define,c=HorizontalLayout,p=c.prototype;
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measureReal = function () {
            var target = this.$target;
            var count = target.numElements;
            var numElements = count;
            var measuredWidth = 0;
            var measuredHeight = 0;
            var bounds = egret.$TempRectangle;
            for (var i = 0; i < count; i++) {
                var layoutElement = (target.getElementAt(i));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                    numElements--;
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                measuredWidth += bounds.width;
                measuredHeight = Math.max(measuredHeight, bounds.height);
            }
            measuredWidth += (numElements - 1) * this.$gap;
            var hPadding = this.$paddingLeft + this.$paddingRight;
            var vPadding = this.$paddingTop + this.$paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measureVirtual = function () {
            var target = this.$target;
            var typicalWidth = this.$typicalWidth;
            var measuredWidth = this.getElementTotalSize();
            var measuredHeight = Math.max(this.maxElementSize, this.$typicalHeight);
            var bounds = egret.$TempRectangle;
            var endIndex = this.endIndex;
            var elementSizeTable = this.elementSizeTable;
            for (var index = this.startIndex; index < endIndex; index++) {
                var layoutElement = (target.getElementAt(index));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                measuredWidth += bounds.width;
                measuredWidth -= isNaN(elementSizeTable[index]) ? typicalWidth : elementSizeTable[index];
                measuredHeight = Math.max(measuredHeight, bounds.height);
            }
            var hPadding = this.$paddingLeft + this.$paddingRight;
            var vPadding = this.$paddingTop + this.$paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayListReal = function (width, height) {
            var target = this.$target;
            var paddingL = this.$paddingLeft;
            var paddingR = this.$paddingRight;
            var paddingT = this.$paddingTop;
            var paddingB = this.$paddingBottom;
            var gap = this.$gap;
            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var targetHeight = Math.max(0, height - paddingT - paddingB);
            var hJustify = this.$horizontalAlign == eui.JustifyAlign.JUSTIFY;
            var vJustify = this.$verticalAlign == eui.JustifyAlign.JUSTIFY || this.$verticalAlign == eui.JustifyAlign.CONTENT_JUSTIFY;
            var vAlign = 0;
            if (!vJustify) {
                if (this.$verticalAlign == egret.VerticalAlign.MIDDLE) {
                    vAlign = 0.5;
                }
                else if (this.$verticalAlign == egret.VerticalAlign.BOTTOM) {
                    vAlign = 1;
                }
            }
            var count = target.numElements;
            var numElements = count;
            var x = paddingL;
            var y = paddingT;
            var i;
            var layoutElement;
            var totalPreferredWidth = 0;
            var totalPercentWidth = 0;
            var childInfoArray = [];
            var childInfo;
            var widthToDistribute = targetWidth;
            var maxElementHeight = this.maxElementSize;
            var bounds = egret.$TempRectangle;
            for (i = 0; i < count; i++) {
                var layoutElement_1 = (target.getElementAt(i));
                if (!egret.is(layoutElement_1, UIComponentClass) || !layoutElement_1.$includeInLayout) {
                    numElements--;
                    continue;
                }
                layoutElement_1.getPreferredBounds(bounds);
                maxElementHeight = Math.max(maxElementHeight, bounds.height);
                if (hJustify) {
                    totalPreferredWidth += bounds.width;
                }
                else {
                    var values = layoutElement_1.$UIComponent;
                    if (!isNaN(values[6 /* percentWidth */])) {
                        totalPercentWidth += values[6 /* percentWidth */];
                        childInfo = new eui.sys.ChildInfo();
                        childInfo.layoutElement = layoutElement_1;
                        childInfo.percent = values[6 /* percentWidth */];
                        childInfo.min = values[12 /* minWidth */];
                        childInfo.max = values[13 /* maxWidth */];
                        childInfoArray.push(childInfo);
                    }
                    else {
                        widthToDistribute -= bounds.width;
                    }
                }
            }
            widthToDistribute -= gap * (numElements - 1);
            widthToDistribute = widthToDistribute > 0 ? widthToDistribute : 0;
            var excessSpace = targetWidth - totalPreferredWidth - gap * (numElements - 1);
            var averageWidth;
            var largeChildrenCount = numElements;
            var widthDic = {};
            if (hJustify) {
                if (excessSpace < 0) {
                    averageWidth = widthToDistribute / numElements;
                    for (i = 0; i < count; i++) {
                        layoutElement = (target.getElementAt(i));
                        if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                            continue;
                        }
                        layoutElement.getPreferredBounds(bounds);
                        if (bounds.width <= averageWidth) {
                            widthToDistribute -= bounds.width;
                            largeChildrenCount--;
                            continue;
                        }
                    }
                    widthToDistribute = widthToDistribute > 0 ? widthToDistribute : 0;
                }
            }
            else {
                if (totalPercentWidth > 0) {
                    this.flexChildrenProportionally(targetWidth, widthToDistribute, totalPercentWidth, childInfoArray);
                    var roundOff_1 = 0;
                    var length_32 = childInfoArray.length;
                    for (i = 0; i < length_32; i++) {
                        childInfo = childInfoArray[i];
                        var childSize = Math.round(childInfo.size + roundOff_1);
                        roundOff_1 += childInfo.size - childSize;
                        widthDic[childInfo.layoutElement.$hashCode] = childSize;
                        widthToDistribute -= childSize;
                    }
                    widthToDistribute = widthToDistribute > 0 ? widthToDistribute : 0;
                }
            }
            if (this.$horizontalAlign == egret.HorizontalAlign.CENTER) {
                x = paddingL + widthToDistribute * 0.5;
            }
            else if (this.$horizontalAlign == egret.HorizontalAlign.RIGHT) {
                x = paddingL + widthToDistribute;
            }
            var maxX = paddingL;
            var maxY = paddingT;
            var dx = 0;
            var dy = 0;
            var justifyHeight = Math.ceil(targetHeight);
            if (this.$verticalAlign == eui.JustifyAlign.CONTENT_JUSTIFY)
                justifyHeight = Math.ceil(Math.max(targetHeight, maxElementHeight));
            var roundOff = 0;
            var layoutElementWidth;
            var childWidth;
            for (i = 0; i < count; i++) {
                var exceesHeight = 0;
                layoutElement = (target.getElementAt(i));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                layoutElementWidth = NaN;
                if (hJustify) {
                    childWidth = NaN;
                    if (excessSpace > 0) {
                        childWidth = widthToDistribute * bounds.width / totalPreferredWidth;
                    }
                    else if (excessSpace < 0 && bounds.width > averageWidth) {
                        childWidth = widthToDistribute / largeChildrenCount;
                    }
                    if (!isNaN(childWidth)) {
                        layoutElementWidth = Math.round(childWidth + roundOff);
                        roundOff += childWidth - layoutElementWidth;
                    }
                }
                else {
                    layoutElementWidth = widthDic[layoutElement.$hashCode];
                }
                if (vJustify) {
                    y = paddingT;
                    layoutElement.setLayoutBoundsSize(layoutElementWidth, justifyHeight);
                    layoutElement.getLayoutBounds(bounds);
                }
                else {
                    var layoutElementHeight = NaN;
                    var values = layoutElement.$UIComponent;
                    if (!isNaN(layoutElement.percentHeight)) {
                        var percent = Math.min(100, values[7 /* percentHeight */]);
                        layoutElementHeight = Math.round(targetHeight * percent * 0.01);
                    }
                    layoutElement.setLayoutBoundsSize(layoutElementWidth, layoutElementHeight);
                    layoutElement.getLayoutBounds(bounds);
                    exceesHeight = (targetHeight - bounds.height) * vAlign;
                    exceesHeight = exceesHeight > 0 ? exceesHeight : 0;
                    y = paddingT + exceesHeight;
                }
                layoutElement.setLayoutBoundsPosition(Math.round(x), Math.round(y));
                dx = Math.ceil(bounds.width);
                dy = Math.ceil(bounds.height);
                maxX = Math.max(maxX, x + dx);
                maxY = Math.max(maxY, y + dy);
                x += dx + gap;
            }
            this.maxElementSize = maxElementHeight;
            target.setContentSize(maxX + paddingR, maxY + paddingB);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayListVirtual = function (width, height) {
            var target = this.$target;
            if (this.indexInViewCalculated)
                this.indexInViewCalculated = false;
            else
                this.getIndexInView();
            var paddingR = this.$paddingRight;
            var paddingT = this.$paddingTop;
            var paddingB = this.$paddingBottom;
            var gap = this.$gap;
            var contentWidth;
            var numElements = target.numElements;
            if (this.startIndex == -1 || this.endIndex == -1) {
                contentWidth = this.getStartPosition(numElements) - gap + paddingR;
                target.setContentSize(contentWidth, target.contentHeight);
                return;
            }
            var endIndex = this.endIndex;
            target.setVirtualElementIndicesInView(this.startIndex, endIndex);
            //????????????????????????
            var justify = this.$verticalAlign == eui.JustifyAlign.JUSTIFY || this.$verticalAlign == eui.JustifyAlign.CONTENT_JUSTIFY;
            var contentJustify = this.$verticalAlign == eui.JustifyAlign.CONTENT_JUSTIFY;
            var vAlign = 0;
            if (!justify) {
                if (this.$verticalAlign == egret.VerticalAlign.MIDDLE) {
                    vAlign = 0.5;
                }
                else if (this.$verticalAlign == egret.VerticalAlign.BOTTOM) {
                    vAlign = 1;
                }
            }
            var bounds = egret.$TempRectangle;
            var targetHeight = Math.max(0, height - paddingT - paddingB);
            var justifyHeight = Math.ceil(targetHeight);
            var layoutElement;
            var typicalHeight = this.$typicalHeight;
            var typicalWidth = this.$typicalWidth;
            var maxElementHeight = this.maxElementSize;
            var oldMaxH = Math.max(typicalHeight, this.maxElementSize);
            if (contentJustify) {
                for (var index = this.startIndex; index <= endIndex; index++) {
                    layoutElement = (target.getVirtualElementAt(index));
                    if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                        continue;
                    }
                    layoutElement.getPreferredBounds(bounds);
                    maxElementHeight = Math.max(maxElementHeight, bounds.height);
                }
                justifyHeight = Math.ceil(Math.max(targetHeight, maxElementHeight));
            }
            var x = 0;
            var y = 0;
            var contentHeight = 0;
            var oldElementSize;
            var needInvalidateSize = false;
            var elementSizeTable = this.elementSizeTable;
            //???????????????????????????
            for (var i = this.startIndex; i <= endIndex; i++) {
                var exceesHeight = 0;
                layoutElement = (target.getVirtualElementAt(i));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                if (!contentJustify) {
                    maxElementHeight = Math.max(maxElementHeight, bounds.height);
                }
                if (justify) {
                    y = paddingT;
                    layoutElement.setLayoutBoundsSize(NaN, justifyHeight);
                    layoutElement.getLayoutBounds(bounds);
                }
                else {
                    layoutElement.getLayoutBounds(bounds);
                    exceesHeight = (targetHeight - bounds.height) * vAlign;
                    exceesHeight = exceesHeight > 0 ? exceesHeight : 0;
                    y = paddingT + exceesHeight;
                }
                contentHeight = Math.max(contentHeight, bounds.height);
                if (!needInvalidateSize) {
                    oldElementSize = isNaN(elementSizeTable[i]) ? typicalWidth : elementSizeTable[i];
                    if (oldElementSize != bounds.width)
                        needInvalidateSize = true;
                }
                elementSizeTable[i] = bounds.width;
                x = this.getStartPosition(i);
                layoutElement.setLayoutBoundsPosition(Math.round(x), Math.round(y));
            }
            contentHeight += paddingT + paddingB;
            contentWidth = this.getStartPosition(numElements) - gap + paddingR;
            this.maxElementSize = maxElementHeight;
            target.setContentSize(contentWidth, contentHeight);
            if (needInvalidateSize || oldMaxH < this.maxElementSize) {
                target.invalidateSize();
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getStartPosition = function (index) {
            if (!this.$useVirtualLayout) {
                if (this.$target) {
                    var element = this.$target.getElementAt(index);
                    if (element) {
                        return element.x;
                    }
                }
            }
            var typicalWidth = this.$typicalWidth;
            var startPos = this.$paddingLeft;
            var gap = this.$gap;
            var elementSizeTable = this.elementSizeTable;
            for (var i = 0; i < index; i++) {
                var w = elementSizeTable[i];
                if (isNaN(w)) {
                    w = typicalWidth;
                }
                startPos += w + gap;
            }
            return startPos;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getElementSize = function (index) {
            if (this.$useVirtualLayout) {
                var size = this.elementSizeTable[index];
                if (isNaN(size)) {
                    size = this.$typicalWidth;
                }
                return size;
            }
            if (this.$target) {
                return this.$target.getElementAt(index).width;
            }
            return 0;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getElementTotalSize = function () {
            var typicalWidth = this.$typicalWidth;
            var gap = this.$gap;
            var totalSize = 0;
            var length = this.$target.numElements;
            var elementSizeTable = this.elementSizeTable;
            for (var i = 0; i < length; i++) {
                var w = elementSizeTable[i];
                if (isNaN(w)) {
                    w = typicalWidth;
                }
                totalSize += w + gap;
            }
            totalSize -= gap;
            return totalSize;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.elementAdded = function (index) {
            if (!this.useVirtualLayout)
                return;
            _super.prototype.elementAdded.call(this, index);
            this.elementSizeTable.splice(index, 0, this.$typicalWidth);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getIndexInView = function () {
            var target = this.$target;
            if (!target || target.numElements == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var values = target.$UIComponent;
            if (values[10 /* width */] <= 0 || values[11 /* height */] <= 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var numElements = target.numElements;
            var contentWidth = this.getStartPosition(numElements - 1) +
                this.elementSizeTable[numElements - 1] + this.$paddingRight;
            var minVisibleX = target.scrollH;
            if (minVisibleX > contentWidth - this.$paddingRight) {
                this.startIndex = -1;
                this.endIndex = -1;
                return false;
            }
            var maxVisibleX = target.scrollH + values[10 /* width */];
            if (maxVisibleX < this.$paddingLeft) {
                this.startIndex = -1;
                this.endIndex = -1;
                return false;
            }
            var oldStartIndex = this.startIndex;
            var oldEndIndex = this.endIndex;
            this.startIndex = this.findIndexAt(minVisibleX, 0, numElements - 1);
            if (this.startIndex == -1)
                this.startIndex = 0;
            this.endIndex = this.findIndexAt(maxVisibleX, 0, numElements - 1);
            if (this.endIndex == -1)
                this.endIndex = numElements - 1;
            return oldStartIndex != this.startIndex || oldEndIndex != this.endIndex;
        };
        return HorizontalLayout;
    }(eui.LinearLayoutBase));
    eui.HorizontalLayout = HorizontalLayout;
    egret.registerClass(HorizontalLayout,'eui.HorizontalLayout');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The JustifyAlign class defines the possible values for the
     * <code>horizontalAlign</code> ??? <code>verticalAlign</code> property of
     * Layout class.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/JustifyAlignExample.ts
     */
    /**
     * @language zh_CN
     * JustifyAlign ?????????????????? horizontalAlign ??? verticalAlign ???????????????????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/JustifyAlignExample.ts
     */
    var JustifyAlign = (function () {
        function JustifyAlign() {
        }
        var d = __define,c=JustifyAlign,p=c.prototype;
        /**
         * @language en_US
         * Justify the children with respect to the container.
         * This uniformly sizes all children to be the same size as the
         * container.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????????????????????????????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        JustifyAlign.JUSTIFY = "justify";
        /**
         * @language en_US
         * Content justify the children width/height respect to the container.
         * This uniformly sizes all children to be the content width/height of the container.
         * The content width/height of the container is the size of the largest child.
         * If all children are smaller than the width/height of the container, then
         * all the children will be sized to the width/height of the container.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????/?????????
         * ?????????????????????/???????????????????????????????????????????????????????????????????????????/???????????????????????????????????????????????????????????????/?????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        JustifyAlign.CONTENT_JUSTIFY = "contentJustify";
        return JustifyAlign;
    }());
    eui.JustifyAlign = JustifyAlign;
    egret.registerClass(JustifyAlign,'eui.JustifyAlign');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The RowAlign class defines the possible values for the
     * <code>rowAlign</code> property of the TileLayout class.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/RowAlignExample.ts
     */
    /**
     * @language zh_CN
     * RowAlign ?????? TileLayout ?????? <code>rowAlign</code> ???????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/RowAlignExample.ts
     */
    var RowAlign = (function () {
        function RowAlign() {
        }
        var d = __define,c=RowAlign,p=c.prototype;
        /**
         * @language en_US
         * Do not justify the rows.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        RowAlign.TOP = "top";
        /**
         * @language en_US
         * Justify the rows by increasing the vertical gap.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        RowAlign.JUSTIFY_USING_GAP = "justifyUsingGap";
        /**
         * @language en_US
         * Justify the rows by increasing the row height.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ??????????????????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        RowAlign.JUSTIFY_USING_HEIGHT = "justifyUsingHeight";
        return RowAlign;
    }());
    eui.RowAlign = RowAlign;
    egret.registerClass(RowAlign,'eui.RowAlign');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var UIComponentClass = "eui.UIComponent";
    /**
     * @language en_US
     * The TileLayout class arranges layout elements in columns and rows
     * of equally-sized cells.
     * The TileLayout class uses a number of properties that control orientation,
     * count, size, gap and justification of the columns and the rows
     * as well as element alignment within the cells.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/TileLayoutExample.ts
     */
    /**
     * @language zh_CN
     * TileLayout ???????????????????????????????????????????????????????????????
     * TileLayout ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/TileLayoutExample.ts
     */
    var TileLayout = (function (_super) {
        __extends(TileLayout, _super);
        /**
         * @language en_US
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ???????????????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function TileLayout() {
            _super.call(this);
            /**
             * @private
             * ??????horizontalGap??????????????????
             */
            this.explicitHorizontalGap = NaN;
            /**
             * @private
             */
            this._horizontalGap = 6;
            /**
             * @private
             * ??????verticalGap??????????????????
             */
            this.explicitVerticalGap = NaN;
            /**
             * @private
             */
            this._verticalGap = 6;
            /**
             * @private
             */
            this._columnCount = -1;
            /**
             * @private
             */
            this._requestedColumnCount = 0;
            /**
             * @private
             */
            this._rowCount = -1;
            /**
             * @private
             */
            this._requestedRowCount = 0;
            /**
             * @private
             * ???????????????????????????
             */
            this.explicitColumnWidth = NaN;
            /**
             * @private
             */
            this._columnWidth = NaN;
            /**
             * @private
             * ???????????????????????????
             */
            this.explicitRowHeight = NaN;
            /**
             * @private
             */
            this._rowHeight = NaN;
            /**
             * @private
             */
            this._paddingLeft = 0;
            /**
             * @private
             */
            this._paddingRight = 0;
            /**
             * @private
             */
            this._paddingTop = 0;
            /**
             * @private
             */
            this._paddingBottom = 0;
            /**
             * @private
             */
            this._horizontalAlign = eui.JustifyAlign.JUSTIFY;
            /**
             * @private
             */
            this._verticalAlign = eui.JustifyAlign.JUSTIFY;
            /**
             * @private
             */
            this._columnAlign = eui.ColumnAlign.LEFT;
            /**
             * @private
             */
            this._rowAlign = eui.RowAlign.TOP;
            /**
             * @private
             */
            this._orientation = eui.TileOrientation.ROWS;
            /**
             * @private
             * ??????????????????????????????
             */
            this.maxElementWidth = 0;
            /**
             * @private
             * ??????????????????????????????
             */
            this.maxElementHeight = 0;
            /**
             * @private
             * ???????????????????????????????????????
             */
            this.startIndex = -1;
            /**
             * @private
             * ?????????????????????????????????????????????
             */
            this.endIndex = -1;
            /**
             * @private
             * ???????????????????????????????????????????????????????????????????????????
             */
            this.indexInViewCalculated = false;
        }
        var d = __define,c=TileLayout,p=c.prototype;
        d(p, "horizontalGap"
            /**
             * @language en_US
             * Horizontal space between columns, in pixels.
             *
             * @default 6
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????
             *
             * @default 6
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._horizontalGap;
            }
            ,function (value) {
                value = +value;
                if (value === this._horizontalGap)
                    return;
                this.explicitHorizontalGap = value;
                this._horizontalGap = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "verticalGap"
            /**
             * @language en_US
             * Vertical space between rows, in pixels.
             *
             * @default 6
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????
             *
             * @default 6
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._verticalGap;
            }
            ,function (value) {
                value = +value;
                if (value === this._verticalGap)
                    return;
                this.explicitVerticalGap = value;
                this._verticalGap = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "columnCount"
            /**
             * @language en_US
             * Contain the actual column count.
             *
             * @default -1
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             *  ??????????????????
             *
             * @default -1
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._columnCount;
            }
        );
        d(p, "requestedColumnCount"
            /**
             * @language en_US
             * Number of columns to be displayed.
             * <p>Set to 0 to allow the TileLayout to determine
             * the column count automatically.</p>
             * <p>If the <code>orientation</code> property is set to <code>TileOrientation.ROWS</code>,
             * then setting this property has no effect
             * In this case, the <code>rowCount</code> is explicitly set, and the
             * container width is explicitly set. </p>
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????
             * <p>????????? 0 ????????? TileLayout ????????????????????????</p>
             * <p>????????? <code>orientation</code> ??????????????? <code>TileOrientation.ROWS</code>???
             * ?????????????????????????????????????????????????????????????????????????????? code>rowCount</code>?????????????????????????????????</p>
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._requestedColumnCount;
            }
            ,function (value) {
                value = +value || 0;
                if (this._requestedColumnCount === value)
                    return;
                this._requestedColumnCount = value;
                this._columnCount = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "rowCount"
            /**
             * @language en_US
             * The row count.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             *  ????????????
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._rowCount;
            }
        );
        d(p, "requestedRowCount"
            /**
             * @language en_US
             * Number of rows to be displayed.
             * <p>Set to 0 to remove explicit override and allow the TileLayout to determine
             * the row count automatically.</p>
             * <p>If the <code>orientation</code> property is set to
             * <code>TileOrientation.COLUMNS</code>, setting this property has no effect.
             * in this case, <code>columnCount</code> is explicitly set, and the
             * container height is explicitly set.</p>
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????
             * <code>????????? -1 ?????????????????????????????? TileLayout ????????????????????????</code>
             * <code>????????? <code>orientation</code> ??????????????? <code>TileOrientation.COLUMNS</code>???
             * ?????????????????????????????????????????????????????????????????????????????? <code>columnCount</code>?????????????????????????????????</code>
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._requestedRowCount;
            }
            ,function (value) {
                value = +value || 0;
                if (this._requestedRowCount == value)
                    return;
                this._requestedRowCount = value;
                this._rowCount = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "columnWidth"
            /**
             * @language en_US
             * Contain the actual column width, in pixels.
             * <p>If not explicitly set, the column width is
             * determined from the width of the widest element. </p>
             *
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????????????????
             * <p>???????????????????????????????????????????????????????????????????????????</p>
             *
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._columnWidth;
            }
            ,function (value) {
                value = +value;
                if (value === this._columnWidth)
                    return;
                this.explicitColumnWidth = value;
                this._columnWidth = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "rowHeight"
            /**
             * @language en_US
             * The row height, in pixels.
             * <p>If not explicitly set, the row height is
             * determined from the maximum of elements' height.</p>
             *
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ?????????????????????????????????
             * <p>???????????????????????????????????????????????????????????????????????????<p>
             *
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._rowHeight;
            }
            ,function (value) {
                value = +value;
                if (value === this._rowHeight)
                    return;
                this.explicitRowHeight = value;
                this._rowHeight = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingLeft"
            /**
             * @copy eui.LinearLayoutBase#paddingLeft
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._paddingLeft;
            }
            ,function (value) {
                value = +value || 0;
                if (this._paddingLeft == value)
                    return;
                this._paddingLeft = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingRight"
            /**
             * @copy eui.LinearLayoutBase#paddingRight
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._paddingRight;
            }
            ,function (value) {
                value = +value || 0;
                if (this._paddingRight === value)
                    return;
                this._paddingRight = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingTop"
            /**
             * @copy eui.LinearLayoutBase#paddingTop
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._paddingTop;
            }
            ,function (value) {
                value = +value || 0;
                if (this._paddingTop == value)
                    return;
                this._paddingTop = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "paddingBottom"
            /**
             * @copy eui.LinearLayoutBase#paddingBottom
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._paddingBottom;
            }
            ,function (value) {
                value = +value || 0;
                if (this._paddingBottom === value)
                    return;
                this._paddingBottom = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "horizontalAlign"
            /**
             * @language en_US
             * Specifies how to align the elements within the cells in the horizontal direction.
             * Supported values are
             * HorizontalAlign.LEFT???HorizontalAlign.CENTER???
             * HorizontalAlign.RIGHT???JustifyAlign.JUSTIFY???
             *
             * @default <code>JustifyAlign.JUSTIFY</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ???????????????????????????????????????????????????????????????????????????
             * HorizontalAlign.LEFT???HorizontalAlign.CENTER???
             * HorizontalAlign.RIGHT???JustifyAlign.JUSTIFY???
             *
             * @default <code>JustifyAlign.JUSTIFY</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._horizontalAlign;
            }
            ,function (value) {
                if (this._horizontalAlign == value)
                    return;
                this._horizontalAlign = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "verticalAlign"
            /**
             * @language en_US
             * ????????????????????????????????????????????????????????????
             * ??????????????? VerticalAlign.TOP???VerticalAlign.MIDDLE???
             * VerticalAlign.BOTTOM???JustifyAlign.JUSTIFY???
             * ????????????JustifyAlign.JUSTIFY???
             *
             * @default <code>eui.JustifyAlign.JUSTIFY</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * Specifies how to align the elements within the cells in the vertical direction.
             * Supported values are
             * VerticalAlign.TOP???VerticalAlign.MIDDLE???
             * VerticalAlign.BOTTOM???JustifyAlign.JUSTIFY???
             *
             * @default <code>eui.JustifyAlign.JUSTIFY</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._verticalAlign;
            }
            ,function (value) {
                if (this._verticalAlign == value)
                    return;
                this._verticalAlign = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "columnAlign"
            /**
             * @language en_US
             * Specifies how to justify the fully visible columns to the container width.
             *
             * <p>When set to <code>ColumnAlign.LEFT</code> it turns column justification off.
             *  There may be partially visible columns or whitespace between the last column and
             *  the right edge of the container.  This is the default value.</p>
             *
             * <p>When set to <code>ColumnAlign.JUSTIFY_USING_GAP</code> the <code>horizontalGap</code>
             * actual value increases so that
             * the last fully visible column right edge aligns with the container's right edge.
             * In case there is only a single fully visible column, the <code>horizontalGap</code> actual value
             * increases so that it pushes any partially visible column beyond the right edge
             * of the container.
             * Note that explicitly setting the <code>horizontalGap</code> property does not turn off
             * justification. It only determines the initial gap value.
             * Justification may increases it.</p>
             *
             * <p>When set to <code>ColumnAlign.JUSTIFY_USING_WIDTH</code> the <code>columnWidth</code>
             * actual value increases so that
             * the last fully visible column right edge aligns with the container's right edge.
             * Note that explicitly setting the <code>columnWidth</code> property does not turn off justification.
             * It only determines the initial column width value.
             * Justification may increases it.</p>
             *
             * @default ColumnAlign.LEFT
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????
             *
             * <p>????????? <code>ColumnAlign.LEFT</code> ????????????????????????????????????
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????</p>
             *
             * <p>????????? <code>ColumnAlign.JUSTIFY_USING_GAP</code> ??????<code>horizontalGap</code> ????????????????????????
             * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
             * <code>horizontalGap</code> ?????????????????????????????????????????????????????????????????????????????????????????????
             * ????????????????????? <code>horizontalGap</code> ????????????????????????????????????????????????????????????????????????????????????????????????</p>
             *
             * <p>????????? <code>ColumnAlign.JUSTIFY_USING_WIDTH</code> ??????<code>columnWidth</code> ????????????????????????
             * ???????????????????????????????????????????????????????????????????????????????????????????????? <code>columnWidth</code> ?????????????????????????????????
             * ??????????????????????????????????????????????????????????????????</p>
             *
             * @default ColumnAlign.LEFT
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._columnAlign;
            }
            ,function (value) {
                if (this._columnAlign == value)
                    return;
                this._columnAlign = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "rowAlign"
            /**
             * @language en_US
             * Specifies how to justify the fully visible rows to the container height.
             *
             * <p>When set to <code>RowAlign.TOP</code> it turns column justification off.
             * There might be partially visible rows or whitespace between the last row and
             * the bottom edge of the container.  This is the default value.</p>
             *
             * <p>When set to <code>RowAlign.JUSTIFY_USING_GAP</code> the <code>verticalGap</code>
             * actual value increases so that
             * the last fully visible row bottom edge aligns with the container's bottom edge.
             * In case there is only a single fully visible row, the value of <code>verticalGap</code>
             * increases so that it pushes any partially visible row beyond the bottom edge
             * of the container.  Note that explicitly setting the <code>verticalGap</code> does not turn off
             * justification, but just determines the initial gap value.
             * Justification can then increases it.</p>
             *
             * <p>When set to <code>RowAlign.JUSTIFY_USING_HEIGHT</code> the <code>rowHeight</code>
             * actual value increases so that
             * the last fully visible row bottom edge aligns with the container's bottom edge.  Note that
             * explicitly setting the <code>rowHeight</code> does not turn off justification, but
             * determines the initial row height value.
             * Justification can then increase it.</p>
             *
             * @default RowAlign.TOP
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????????????????
             *
             * <p>????????? <code>RowAlign.TOP</code> ????????????????????????????????????
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????</p>
             *
             * <p>????????? <code>RowAlign.JUSTIFY_USING_GAP</code> ??????<code>verticalGap</code> ????????????????????????
             * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????<code>verticalGap</code> ??????????????????
             * ????????????????????????????????????????????????????????????????????????????????????????????? <code>verticalGap</code>
             * ????????????????????????????????????????????????????????????????????????????????????????????????</p>
             *
             * <p>????????? <code>RowAlign.JUSTIFY_USING_HEIGHT</code> ??????<code>rowHeight</code> ????????????????????????
             * ??????????????????????????????????????????????????????????????????????????????????????????????????? <code>rowHeight</code>
             * ???????????????????????????????????????????????????????????????????????????????????????????????????</p>
             *
             * @default RowAlign.TOP
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._rowAlign;
            }
            ,function (value) {
                if (this._rowAlign == value)
                    return;
                this._rowAlign = value;
                this.invalidateTargetLayout();
            }
        );
        d(p, "orientation"
            /**
             * @language en_US
             * Specifies whether elements are arranged row by row or
             * column by column.
             *
             * @default TileOrientation.ROWS
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * ??????????????????????????????????????????
             *
             * @default TileOrientation.ROWS
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._orientation;
            }
            ,function (value) {
                if (this._orientation == value)
                    return;
                this._orientation = value;
                this.invalidateTargetLayout();
            }
        );
        /**
         * @private
         * ????????????????????????????????????????????????
         */
        p.invalidateTargetLayout = function () {
            var target = this.$target;
            if (target) {
                target.invalidateSize();
                target.invalidateDisplayList();
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measure = function () {
            var target = this.$target;
            if (!target)
                return;
            var savedColumnCount = this._columnCount;
            var savedRowCount = this._rowCount;
            var savedColumnWidth = this._columnWidth;
            var savedRowHeight = this._rowHeight;
            var measuredWidth = 0;
            var measuredHeight = 0;
            var values = target.$UIComponent;
            this.calculateRowAndColumn(values[8 /* explicitWidth */], values[9 /* explicitHeight */]);
            var columnCount = this._requestedColumnCount > 0 ? this._requestedColumnCount : this._columnCount;
            var rowCount = this._requestedRowCount > 0 ? this._requestedRowCount : this._rowCount;
            var horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            if (columnCount > 0) {
                measuredWidth = columnCount * (this._columnWidth + horizontalGap) - horizontalGap;
            }
            if (rowCount > 0) {
                measuredHeight = rowCount * (this._rowHeight + verticalGap) - verticalGap;
            }
            var hPadding = this._paddingLeft + this._paddingRight;
            var vPadding = this._paddingTop + this._paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
            this._columnCount = savedColumnCount;
            this._rowCount = savedRowCount;
            this._columnWidth = savedColumnWidth;
            this._rowHeight = savedRowHeight;
        };
        /**
         * @private
         * ?????????????????????????????????
         */
        p.calculateRowAndColumn = function (explicitWidth, explicitHeight) {
            var target = this.$target;
            var horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            this._rowCount = this._columnCount = -1;
            var numElements = target.numElements;
            var count = numElements;
            for (var index = 0; index < count; index++) {
                var layoutElement = (target.getElementAt(index));
                if (layoutElement && (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout)) {
                    numElements--;
                    continue;
                }
            }
            if (numElements == 0) {
                this._rowCount = this._columnCount = 0;
                return;
            }
            if (isNaN(this.explicitColumnWidth) || isNaN(this.explicitRowHeight))
                this.updateMaxElementSize();
            if (isNaN(this.explicitColumnWidth)) {
                this._columnWidth = this.maxElementWidth;
            }
            else {
                this._columnWidth = this.explicitColumnWidth;
            }
            if (isNaN(this.explicitRowHeight)) {
                this._rowHeight = this.maxElementHeight;
            }
            else {
                this._rowHeight = this.explicitRowHeight;
            }
            var itemWidth = this._columnWidth + horizontalGap;
            //?????????????????????????????????
            if (itemWidth <= 0)
                itemWidth = 1;
            var itemHeight = this._rowHeight + verticalGap;
            if (itemHeight <= 0)
                itemHeight = 1;
            var orientedByColumns = (this._orientation == eui.TileOrientation.COLUMNS);
            var widthHasSet = !isNaN(explicitWidth);
            var heightHasSet = !isNaN(explicitHeight);
            var paddingL = this._paddingLeft;
            var paddingR = this._paddingRight;
            var paddingT = this._paddingTop;
            var paddingB = this._paddingBottom;
            if (this._requestedColumnCount > 0 || this._requestedRowCount > 0) {
                if (this._requestedRowCount > 0)
                    this._rowCount = Math.min(this._requestedRowCount, numElements);
                if (this._requestedColumnCount > 0)
                    this._columnCount = Math.min(this._requestedColumnCount, numElements);
            }
            else if (!widthHasSet && !heightHasSet) {
                var side = Math.sqrt(numElements * itemWidth * itemHeight);
                if (orientedByColumns) {
                    this._rowCount = Math.max(1, Math.round(side / itemHeight));
                }
                else {
                    this._columnCount = Math.max(1, Math.round(side / itemWidth));
                }
            }
            else if (widthHasSet && (!heightHasSet || !orientedByColumns)) {
                var targetWidth = Math.max(0, explicitWidth - paddingL - paddingR);
                this._columnCount = Math.floor((targetWidth + horizontalGap) / itemWidth);
                this._columnCount = Math.max(1, Math.min(this._columnCount, numElements));
            }
            else {
                var targetHeight = Math.max(0, explicitHeight - paddingT - paddingB);
                this._rowCount = Math.floor((targetHeight + verticalGap) / itemHeight);
                this._rowCount = Math.max(1, Math.min(this._rowCount, numElements));
            }
            if (this._rowCount == -1)
                this._rowCount = Math.max(1, Math.ceil(numElements / this._columnCount));
            if (this._columnCount == -1)
                this._columnCount = Math.max(1, Math.ceil(numElements / this._rowCount));
            if (this._requestedColumnCount > 0 && this._requestedRowCount > 0) {
                if (this._orientation == eui.TileOrientation.ROWS)
                    this._rowCount = Math.max(1, Math.ceil(numElements / this._requestedColumnCount));
                else
                    this._columnCount = Math.max(1, Math.ceil(numElements / this._requestedRowCount));
            }
        };
        /**
         * @private
         * ???????????????????????????
         */
        p.updateMaxElementSize = function () {
            if (!this.$target)
                return;
            if (this.$useVirtualLayout) {
                this.maxElementWidth = Math.max(this.maxElementWidth, this.$typicalWidth);
                this.maxElementHeight = Math.max(this.maxElementHeight, this.$typicalHeight);
                this.doUpdateMaxElementSize(this.startIndex, this.endIndex);
            }
            else {
                this.doUpdateMaxElementSize(0, this.$target.numElements - 1);
            }
        };
        /**
         * @private
         * ??????????????????????????????????????????
         */
        p.doUpdateMaxElementSize = function (startIndex, endIndex) {
            var maxElementWidth = this.maxElementWidth;
            var maxElementHeight = this.maxElementHeight;
            var bounds = egret.$TempRectangle;
            var target = this.$target;
            if ((startIndex != -1) && (endIndex != -1)) {
                for (var index = startIndex; index <= endIndex; index++) {
                    var elt = target.getVirtualElementAt(index);
                    if (!egret.is(elt, UIComponentClass) || !elt.$includeInLayout) {
                        continue;
                    }
                    elt.getPreferredBounds(bounds);
                    maxElementWidth = Math.max(maxElementWidth, bounds.width);
                    maxElementHeight = Math.max(maxElementHeight, bounds.height);
                }
            }
            this.maxElementWidth = maxElementWidth;
            this.maxElementHeight = maxElementHeight;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.clearVirtualLayoutCache = function () {
            _super.prototype.clearVirtualLayoutCache.call(this);
            this.maxElementWidth = 0;
            this.maxElementHeight = 0;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.scrollPositionChanged = function () {
            if (this.$useVirtualLayout) {
                var changed = this.getIndexInView();
                if (changed) {
                    this.indexInViewCalculated = true;
                    this.$target.invalidateDisplayList();
                }
            }
        };
        /**
         * @private
         * ??????????????????????????????????????????????????????,????????????????????????
         */
        p.getIndexInView = function () {
            if (!this.$target || this.$target.numElements == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var target = this.$target;
            var numElements = target.numElements;
            if (!this.$useVirtualLayout) {
                this.startIndex = 0;
                this.endIndex = numElements - 1;
                return false;
            }
            var values = target.$UIComponent;
            if (values[10 /* width */] == 0 || values[11 /* height */] == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var oldStartIndex = this.startIndex;
            var oldEndIndex = this.endIndex;
            var paddingL = this._paddingLeft;
            var paddingT = this._paddingTop;
            var horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            if (this._orientation == eui.TileOrientation.COLUMNS) {
                var itemWidth = this._columnWidth + horizontalGap;
                if (itemWidth <= 0) {
                    this.startIndex = 0;
                    this.endIndex = numElements - 1;
                    return false;
                }
                var minVisibleX = target.scrollH;
                var maxVisibleX = minVisibleX + values[10 /* width */];
                var startColumn = Math.floor((minVisibleX - paddingL) / itemWidth);
                if (startColumn < 0)
                    startColumn = 0;
                var endColumn = Math.ceil((maxVisibleX - paddingL) / itemWidth);
                if (endColumn < 0)
                    endColumn = 0;
                this.startIndex = Math.min(numElements - 1, Math.max(0, startColumn * this._rowCount));
                this.endIndex = Math.min(numElements - 1, Math.max(0, endColumn * this._rowCount - 1));
            }
            else {
                var itemHeight = this._rowHeight + verticalGap;
                if (itemHeight <= 0) {
                    this.startIndex = 0;
                    this.endIndex = numElements - 1;
                    return false;
                }
                var minVisibleY = target.scrollV;
                var maxVisibleY = minVisibleY + values[11 /* height */];
                var startRow = Math.floor((minVisibleY - paddingT) / itemHeight);
                if (startRow < 0)
                    startRow = 0;
                var endRow = Math.ceil((maxVisibleY - paddingT) / itemHeight);
                if (endRow < 0)
                    endRow = 0;
                this.startIndex = Math.min(numElements - 1, Math.max(0, startRow * this._columnCount));
                this.endIndex = Math.min(numElements - 1, Math.max(0, endRow * this._columnCount - 1));
            }
            return this.startIndex != oldStartIndex || this.endIndex != oldEndIndex;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayList = function (width, height) {
            _super.prototype.updateDisplayList.call(this, width, height);
            if (!this.$target)
                return;
            var target = this.$target;
            var paddingL = this._paddingLeft;
            var paddingR = this._paddingRight;
            var paddingT = this._paddingTop;
            var paddingB = this._paddingBottom;
            if (this.indexInViewCalculated) {
                this.indexInViewCalculated = false;
            }
            else {
                this.calculateRowAndColumn(width, height);
                if (this._rowCount == 0 || this._columnCount == 0) {
                    target.setContentSize(paddingL + paddingR, paddingT + paddingB);
                    return;
                }
                this.adjustForJustify(width, height);
                this.getIndexInView();
            }
            if (this.$useVirtualLayout) {
                this.calculateRowAndColumn(width, height);
                this.adjustForJustify(width, height);
            }
            if (this.startIndex == -1 || this.endIndex == -1) {
                target.setContentSize(0, 0);
                return;
            }
            var endIndex = this.endIndex;
            target.setVirtualElementIndicesInView(this.startIndex, endIndex);
            var elt;
            var x;
            var y;
            var columnIndex;
            var rowIndex;
            var orientedByColumns = (this._orientation == eui.TileOrientation.COLUMNS);
            var index = this.startIndex;
            var horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            var rowCount = this._rowCount;
            var columnCount = this._columnCount;
            var columnWidth = this._columnWidth;
            var rowHeight = this._rowHeight;
            for (var i = this.startIndex; i <= endIndex; i++) {
                if (this.$useVirtualLayout) {
                    elt = (this.target.getVirtualElementAt(i));
                }
                else {
                    elt = (this.target.getElementAt(i));
                }
                if (!egret.is(elt, UIComponentClass) || !elt.$includeInLayout) {
                    continue;
                }
                if (orientedByColumns) {
                    columnIndex = Math.ceil((index + 1) / rowCount) - 1;
                    rowIndex = Math.ceil((index + 1) % rowCount) - 1;
                    if (rowIndex == -1)
                        rowIndex = rowCount - 1;
                }
                else {
                    columnIndex = Math.ceil((index + 1) % columnCount) - 1;
                    if (columnIndex == -1)
                        columnIndex = columnCount - 1;
                    rowIndex = Math.ceil((index + 1) / columnCount) - 1;
                }
                x = columnIndex * (columnWidth + horizontalGap) + paddingL;
                y = rowIndex * (rowHeight + verticalGap) + paddingT;
                this.sizeAndPositionElement(elt, x, y, columnWidth, rowHeight);
                index++;
            }
            var hPadding = paddingL + paddingR;
            var vPadding = paddingT + paddingB;
            var contentWidth = (columnWidth + horizontalGap) * columnCount - horizontalGap;
            var contentHeight = (rowHeight + verticalGap) * rowCount - verticalGap;
            target.setContentSize(contentWidth + hPadding, contentHeight + vPadding);
        };
        /**
         * @private
         * ?????????????????????
         */
        p.sizeAndPositionElement = function (element, cellX, cellY, cellWidth, cellHeight) {
            var elementWidth = NaN;
            var elementHeight = NaN;
            var values = element.$UIComponent;
            if (this._horizontalAlign == eui.JustifyAlign.JUSTIFY)
                elementWidth = cellWidth;
            else if (!isNaN(values[6 /* percentWidth */]))
                elementWidth = cellWidth * values[6 /* percentWidth */] * 0.01;
            if (this._verticalAlign == eui.JustifyAlign.JUSTIFY)
                elementHeight = cellHeight;
            else if (!isNaN(values[7 /* percentHeight */]))
                elementHeight = cellHeight * values[7 /* percentHeight */] * 0.01;
            element.setLayoutBoundsSize(Math.round(elementWidth), Math.round(elementHeight));
            var x = cellX;
            var bounds = egret.$TempRectangle;
            element.getLayoutBounds(bounds);
            switch (this._horizontalAlign) {
                case egret.HorizontalAlign.RIGHT:
                    x += cellWidth - bounds.width;
                    break;
                case egret.HorizontalAlign.CENTER:
                    x = cellX + (cellWidth - bounds.width) / 2;
                    break;
            }
            var y = cellY;
            switch (this._verticalAlign) {
                case egret.VerticalAlign.BOTTOM:
                    y += cellHeight - bounds.height;
                    break;
                case egret.VerticalAlign.MIDDLE:
                    y += (cellHeight - bounds.height) / 2;
                    break;
            }
            element.setLayoutBoundsPosition(Math.round(x), Math.round(y));
        };
        /**
         * @private
         * ??????????????????????????????????????????
         */
        p.adjustForJustify = function (width, height) {
            var paddingL = this._paddingLeft;
            var paddingR = this._paddingRight;
            var paddingT = this._paddingTop;
            var paddingB = this._paddingBottom;
            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var targetHeight = Math.max(0, height - paddingT - paddingB);
            if (!isNaN(this.explicitVerticalGap))
                this._verticalGap = this.explicitVerticalGap;
            if (!isNaN(this.explicitHorizontalGap))
                this._horizontalGap = this.explicitHorizontalGap;
            this._verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            this._horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var offsetY = targetHeight - this._rowHeight * this._rowCount;
            var offsetX = targetWidth - this._columnWidth * this._columnCount;
            var gapCount;
            if (offsetY > 0) {
                if (this._rowAlign == eui.RowAlign.JUSTIFY_USING_GAP) {
                    gapCount = Math.max(1, this._rowCount - 1);
                    this._verticalGap = offsetY / gapCount;
                }
                else if (this._rowAlign == eui.RowAlign.JUSTIFY_USING_HEIGHT) {
                    if (this._rowCount > 0) {
                        this._rowHeight += (offsetY - (this._rowCount - 1) * this._verticalGap) / this._rowCount;
                    }
                }
            }
            if (offsetX > 0) {
                if (this._columnAlign == eui.ColumnAlign.JUSTIFY_USING_GAP) {
                    gapCount = Math.max(1, this._columnCount - 1);
                    this._horizontalGap = offsetX / gapCount;
                }
                else if (this._columnAlign == eui.ColumnAlign.JUSTIFY_USING_WIDTH) {
                    if (this._columnCount > 0) {
                        this._columnWidth += (offsetX - (this._columnCount - 1) * this._horizontalGap) / this._columnCount;
                    }
                }
            }
        };
        return TileLayout;
    }(eui.LayoutBase));
    eui.TileLayout = TileLayout;
    egret.registerClass(TileLayout,'eui.TileLayout');
    if (DEBUG) {
        egret.$markReadOnly(TileLayout, "columnCount");
        egret.$markReadOnly(TileLayout, "rowCount");
    }
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The TileOrientation class defines the possible values for the
     * <code>orientation</code> property of the TileLayout class.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/TileOrientationExample.ts
     */
    /**
     * @language zh_CN
     * TileOrientation ?????? TileLayout ?????? <code>orientation</code> ???????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/TileOrientationExample.ts
     */
    var TileOrientation = (function () {
        function TileOrientation() {
        }
        var d = __define,c=TileOrientation,p=c.prototype;
        /**
         * @language en_US
         * Arranges elements row by row.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        TileOrientation.ROWS = "rows";
        /**
         * @language en_US
         * Arranges elements column by column.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ?????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        TileOrientation.COLUMNS = "columns";
        return TileOrientation;
    }());
    eui.TileOrientation = TileOrientation;
    egret.registerClass(TileOrientation,'eui.TileOrientation');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var UIComponentClass = "eui.UIComponent";
    /**
     * @language en_US
     * The VerticalLayout class arranges the layout elements in a vertical sequence,
     * top to bottom, with optional gaps between the elements and optional padding
     * around the sequence of elements.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/VerticalLayoutExample.ts
     */
    /**
     * @language zh_CN
     * VerticalLayout ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/VerticalLayoutExample.ts
     */
    var VerticalLayout = (function (_super) {
        __extends(VerticalLayout, _super);
        function VerticalLayout() {
            _super.apply(this, arguments);
        }
        var d = __define,c=VerticalLayout,p=c.prototype;
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measureReal = function () {
            var target = this.$target;
            var count = target.numElements;
            var numElements = count;
            var measuredWidth = 0;
            var measuredHeight = 0;
            var bounds = egret.$TempRectangle;
            for (var i = 0; i < count; i++) {
                var layoutElement = (target.getElementAt(i));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                    numElements--;
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                measuredHeight += bounds.height;
                measuredWidth = Math.max(measuredWidth, bounds.width);
            }
            measuredHeight += (numElements - 1) * this.$gap;
            var hPadding = this.$paddingLeft + this.$paddingRight;
            var vPadding = this.$paddingTop + this.$paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.measureVirtual = function () {
            var target = this.$target;
            var typicalHeight = this.$typicalHeight;
            var measuredHeight = this.getElementTotalSize();
            var measuredWidth = Math.max(this.maxElementSize, this.$typicalWidth);
            var bounds = egret.$TempRectangle;
            var endIndex = this.endIndex;
            var elementSizeTable = this.elementSizeTable;
            for (var index = this.startIndex; index < endIndex; index++) {
                var layoutElement = (target.getElementAt(index));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                measuredHeight += bounds.height;
                measuredHeight -= isNaN(elementSizeTable[index]) ? typicalHeight : elementSizeTable[index];
                measuredWidth = Math.max(measuredWidth, bounds.width);
            }
            var hPadding = this.$paddingLeft + this.$paddingRight;
            var vPadding = this.$paddingTop + this.$paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayListReal = function (width, height) {
            var target = this.$target;
            var paddingL = this.$paddingLeft;
            var paddingR = this.$paddingRight;
            var paddingT = this.$paddingTop;
            var paddingB = this.$paddingBottom;
            var gap = this.$gap;
            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var targetHeight = Math.max(0, height - paddingT - paddingB);
            var vJustify = this.$verticalAlign == eui.JustifyAlign.JUSTIFY;
            var hJustify = this.$horizontalAlign == eui.JustifyAlign.JUSTIFY || this.$horizontalAlign == eui.JustifyAlign.CONTENT_JUSTIFY;
            var hAlign = 0;
            if (!hJustify) {
                if (this.$horizontalAlign == egret.HorizontalAlign.CENTER) {
                    hAlign = 0.5;
                }
                else if (this.$horizontalAlign == egret.HorizontalAlign.RIGHT) {
                    hAlign = 1;
                }
            }
            var count = target.numElements;
            var numElements = count;
            var x = paddingL;
            var y = paddingT;
            var i;
            var layoutElement;
            var totalPreferredHeight = 0;
            var totalPercentHeight = 0;
            var childInfoArray = [];
            var childInfo;
            var heightToDistribute = targetHeight;
            var maxElementWidth = this.maxElementSize;
            var bounds = egret.$TempRectangle;
            for (i = 0; i < count; i++) {
                var layoutElement_2 = (target.getElementAt(i));
                if (!egret.is(layoutElement_2, UIComponentClass) || !layoutElement_2.$includeInLayout) {
                    numElements--;
                    continue;
                }
                layoutElement_2.getPreferredBounds(bounds);
                maxElementWidth = Math.max(maxElementWidth, bounds.width);
                if (vJustify) {
                    totalPreferredHeight += bounds.height;
                }
                else {
                    var values = layoutElement_2.$UIComponent;
                    if (!isNaN(values[7 /* percentHeight */])) {
                        totalPercentHeight += values[7 /* percentHeight */];
                        childInfo = new eui.sys.ChildInfo();
                        childInfo.layoutElement = layoutElement_2;
                        childInfo.percent = values[7 /* percentHeight */];
                        childInfo.min = values[14 /* minHeight */];
                        childInfo.max = values[15 /* maxHeight */];
                        childInfoArray.push(childInfo);
                    }
                    else {
                        heightToDistribute -= bounds.height;
                    }
                }
            }
            heightToDistribute -= gap * (numElements - 1);
            heightToDistribute = heightToDistribute > 0 ? heightToDistribute : 0;
            var excessSpace = targetHeight - totalPreferredHeight - gap * (numElements - 1);
            var averageHeight;
            var largeChildrenCount = numElements;
            var heightDic = {};
            if (vJustify) {
                if (excessSpace < 0) {
                    averageHeight = heightToDistribute / numElements;
                    for (i = 0; i < count; i++) {
                        layoutElement = (target.getElementAt(i));
                        if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                            continue;
                        }
                        layoutElement.getPreferredBounds(bounds);
                        if (bounds.height <= averageHeight) {
                            heightToDistribute -= bounds.height;
                            largeChildrenCount--;
                            continue;
                        }
                    }
                    heightToDistribute = heightToDistribute > 0 ? heightToDistribute : 0;
                }
            }
            else {
                if (totalPercentHeight > 0) {
                    this.flexChildrenProportionally(targetHeight, heightToDistribute, totalPercentHeight, childInfoArray);
                    var roundOff_2 = 0;
                    var length_33 = childInfoArray.length;
                    for (i = 0; i < length_33; i++) {
                        childInfo = childInfoArray[i];
                        var childSize = Math.round(childInfo.size + roundOff_2);
                        roundOff_2 += childInfo.size - childSize;
                        heightDic[childInfo.layoutElement.$hashCode] = childSize;
                        heightToDistribute -= childSize;
                    }
                    heightToDistribute = heightToDistribute > 0 ? heightToDistribute : 0;
                }
            }
            if (this.$verticalAlign == egret.VerticalAlign.MIDDLE) {
                y = paddingT + heightToDistribute * 0.5;
            }
            else if (this.$verticalAlign == egret.VerticalAlign.BOTTOM) {
                y = paddingT + heightToDistribute;
            }
            var maxX = paddingL;
            var maxY = paddingT;
            var dx = 0;
            var dy = 0;
            var justifyWidth = Math.ceil(targetWidth);
            if (this.$horizontalAlign == eui.JustifyAlign.CONTENT_JUSTIFY)
                justifyWidth = Math.ceil(Math.max(targetWidth, maxElementWidth));
            var roundOff = 0;
            var layoutElementHeight;
            var childHeight;
            for (i = 0; i < count; i++) {
                var exceesWidth = 0;
                layoutElement = (target.getElementAt(i));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                layoutElementHeight = NaN;
                if (vJustify) {
                    childHeight = NaN;
                    if (excessSpace > 0) {
                        childHeight = heightToDistribute * bounds.height / totalPreferredHeight;
                    }
                    else if (excessSpace < 0 && bounds.height > averageHeight) {
                        childHeight = heightToDistribute / largeChildrenCount;
                    }
                    if (!isNaN(childHeight)) {
                        layoutElementHeight = Math.round(childHeight + roundOff);
                        roundOff += childHeight - layoutElementHeight;
                    }
                }
                else {
                    layoutElementHeight = heightDic[layoutElement.$hashCode];
                }
                if (hJustify) {
                    x = paddingL;
                    layoutElement.setLayoutBoundsSize(justifyWidth, layoutElementHeight);
                    layoutElement.getLayoutBounds(bounds);
                }
                else {
                    var layoutElementWidth = NaN;
                    var values = layoutElement.$UIComponent;
                    if (!isNaN(values[6 /* percentWidth */])) {
                        var percent = Math.min(100, values[6 /* percentWidth */]);
                        layoutElementWidth = Math.round(targetWidth * percent * 0.01);
                    }
                    layoutElement.setLayoutBoundsSize(layoutElementWidth, layoutElementHeight);
                    layoutElement.getLayoutBounds(bounds);
                    exceesWidth = (targetWidth - bounds.width) * hAlign;
                    exceesWidth = exceesWidth > 0 ? exceesWidth : 0;
                    x = paddingL + exceesWidth;
                }
                layoutElement.setLayoutBoundsPosition(Math.round(x), Math.round(y));
                dx = Math.ceil(bounds.width);
                dy = Math.ceil(bounds.height);
                maxX = Math.max(maxX, x + dx);
                maxY = Math.max(maxY, y + dy);
                y += dy + gap;
            }
            this.maxElementSize = maxElementWidth;
            target.setContentSize(maxX + paddingR, maxY + paddingB);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.updateDisplayListVirtual = function (width, height) {
            var target = this.$target;
            if (this.indexInViewCalculated)
                this.indexInViewCalculated = false;
            else
                this.getIndexInView();
            var paddingB = this.$paddingBottom;
            var paddingL = this.$paddingLeft;
            var paddingR = this.$paddingRight;
            var gap = this.$gap;
            var contentHeight;
            var numElements = target.numElements;
            if (this.startIndex == -1 || this.endIndex == -1) {
                contentHeight = this.getStartPosition(numElements) - gap + paddingB;
                target.setContentSize(target.contentWidth, contentHeight);
                return;
            }
            var endIndex = this.endIndex;
            target.setVirtualElementIndicesInView(this.startIndex, endIndex);
            //????????????????????????
            var justify = this.$horizontalAlign == eui.JustifyAlign.JUSTIFY || this.$horizontalAlign == eui.JustifyAlign.CONTENT_JUSTIFY;
            var contentJustify = this.$horizontalAlign == eui.JustifyAlign.CONTENT_JUSTIFY;
            var hAlign = 0;
            if (!justify) {
                if (this.$horizontalAlign == egret.HorizontalAlign.CENTER) {
                    hAlign = 0.5;
                }
                else if (this.$horizontalAlign == egret.HorizontalAlign.RIGHT) {
                    hAlign = 1;
                }
            }
            var bounds = egret.$TempRectangle;
            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var justifyWidth = Math.ceil(targetWidth);
            var layoutElement;
            var typicalHeight = this.$typicalHeight;
            var typicalWidth = this.$typicalWidth;
            var maxElementWidth = this.maxElementSize;
            var oldMaxW = Math.max(typicalWidth, this.maxElementSize);
            if (contentJustify) {
                for (var index = this.startIndex; index <= endIndex; index++) {
                    layoutElement = (target.getVirtualElementAt(index));
                    if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                        continue;
                    }
                    layoutElement.getPreferredBounds(bounds);
                    maxElementWidth = Math.max(maxElementWidth, bounds.width);
                }
                justifyWidth = Math.ceil(Math.max(targetWidth, maxElementWidth));
            }
            var x = 0;
            var y = 0;
            var contentWidth = 0;
            var oldElementSize;
            var needInvalidateSize = false;
            var elementSizeTable = this.elementSizeTable;
            //???????????????????????????
            for (var i = this.startIndex; i <= endIndex; i++) {
                var exceesWidth = 0;
                layoutElement = (target.getVirtualElementAt(i));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                if (!contentJustify) {
                    maxElementWidth = Math.max(maxElementWidth, bounds.width);
                }
                if (justify) {
                    x = paddingL;
                    layoutElement.setLayoutBoundsSize(justifyWidth, NaN);
                    layoutElement.getLayoutBounds(bounds);
                }
                else {
                    layoutElement.getLayoutBounds(bounds);
                    exceesWidth = (targetWidth - bounds.width) * hAlign;
                    exceesWidth = exceesWidth > 0 ? exceesWidth : 0;
                    x = paddingL + exceesWidth;
                }
                contentWidth = Math.max(contentWidth, bounds.width);
                if (!needInvalidateSize) {
                    oldElementSize = isNaN(elementSizeTable[i]) ? typicalHeight : elementSizeTable[i];
                    if (oldElementSize != bounds.height)
                        needInvalidateSize = true;
                }
                elementSizeTable[i] = bounds.height;
                y = this.getStartPosition(i);
                layoutElement.setLayoutBoundsPosition(Math.round(x), Math.round(y));
            }
            contentWidth += paddingL + paddingR;
            contentHeight = this.getStartPosition(numElements) - gap + paddingB;
            this.maxElementSize = maxElementWidth;
            target.setContentSize(contentWidth, contentHeight);
            if (needInvalidateSize || oldMaxW < this.maxElementSize) {
                target.invalidateSize();
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getStartPosition = function (index) {
            if (!this.$useVirtualLayout) {
                if (this.$target) {
                    var element = this.$target.getElementAt(index);
                    if (element) {
                        return element.y;
                    }
                }
            }
            var typicalHeight = this.$typicalHeight;
            var startPos = this.$paddingTop;
            var gap = this.$gap;
            var elementSizeTable = this.elementSizeTable;
            for (var i = 0; i < index; i++) {
                var h = elementSizeTable[i];
                if (isNaN(h)) {
                    h = typicalHeight;
                }
                startPos += h + gap;
            }
            return startPos;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getElementSize = function (index) {
            if (this.$useVirtualLayout) {
                var size = this.elementSizeTable[index];
                if (isNaN(size)) {
                    size = this.$typicalHeight;
                }
                return size;
            }
            if (this.$target) {
                return this.$target.getElementAt(index).height;
            }
            return 0;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getElementTotalSize = function () {
            var typicalHeight = this.$typicalHeight;
            var gap = this.$gap;
            var totalSize = 0;
            var length = this.$target.numElements;
            var elementSizeTable = this.elementSizeTable;
            for (var i = 0; i < length; i++) {
                var h = elementSizeTable[i];
                if (isNaN(h)) {
                    h = typicalHeight;
                }
                totalSize += h + gap;
            }
            totalSize -= gap;
            return totalSize;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.elementAdded = function (index) {
            if (!this.$useVirtualLayout)
                return;
            _super.prototype.elementAdded.call(this, index);
            this.elementSizeTable.splice(index, 0, this.$typicalHeight);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.getIndexInView = function () {
            var target = this.$target;
            if (!target || target.numElements == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var values = target.$UIComponent;
            if (values[10 /* width */] == 0 || values[11 /* height */] == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var numElements = target.numElements;
            var contentHeight = this.getStartPosition(numElements - 1) +
                this.elementSizeTable[numElements - 1] + this.$paddingBottom;
            var minVisibleY = target.scrollV;
            if (minVisibleY > contentHeight - this.$paddingBottom) {
                this.startIndex = -1;
                this.endIndex = -1;
                return false;
            }
            var maxVisibleY = target.scrollV + values[11 /* height */];
            if (maxVisibleY < this.$paddingTop) {
                this.startIndex = -1;
                this.endIndex = -1;
                return false;
            }
            var oldStartIndex = this.startIndex;
            var oldEndIndex = this.endIndex;
            this.startIndex = this.findIndexAt(minVisibleY, 0, numElements - 1);
            if (this.startIndex == -1)
                this.startIndex = 0;
            this.endIndex = this.findIndexAt(maxVisibleY, 0, numElements - 1);
            if (this.endIndex == -1)
                this.endIndex = numElements - 1;
            return oldStartIndex != this.startIndex || oldEndIndex != this.endIndex;
        };
        return VerticalLayout;
    }(eui.LinearLayoutBase));
    eui.VerticalLayout = VerticalLayout;
    egret.registerClass(VerticalLayout,'eui.VerticalLayout');
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The operation of adding a state to view.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ????????????????????????????????????
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var AddItems = (function () {
        /**
         * @language en_US
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????AddItems??????
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function AddItems(target, propertyName, position, relativeTo) {
            this.target = target;
            this.propertyName = propertyName;
            this.position = position;
            this.relativeTo = relativeTo;
        }
        var d = __define,c=AddItems,p=c.prototype;
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.apply = function (host, parent) {
            var index;
            var relative = host[this.relativeTo];
            var target = host[this.target];
            var container = this.propertyName ? host[this.propertyName] : parent;
            if (!target || !container)
                return;
            switch (this.position) {
                case 0 /* FIRST */:
                    index = 0;
                    break;
                case 1 /* LAST */:
                    index = -1;
                    break;
                case 2 /* BEFORE */:
                    index = container.getChildIndex(relative);
                    break;
                case 3 /* AFTER */:
                    index = container.getChildIndex(relative) + 1;
                    break;
            }
            if (index == -1) {
                index = container.numChildren;
            }
            if (egret.is(container, "eui.Component")) {
                container.$Component[8 /* skin */].$elementsContent.push(target);
            }
            container.addChildAt(target, index);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.remove = function (host, parent) {
            var container = this.propertyName ? host[this.propertyName] : parent;
            var target = host[this.target];
            if (!target || !container)
                return;
            if (target.$parent === container) {
                container.removeChild(target);
            }
            if (egret.is(container, "eui.Component")) {
                var arr = container.$Component[8 /* skin */].$elementsContent;
                var idx = arr.indexOf(target);
                if (idx > -1) {
                    arr.splice(idx, 1);
                }
            }
        };
        return AddItems;
    }());
    eui.AddItems = AddItems;
    egret.registerClass(AddItems,'eui.AddItems',["eui.IOverride"]);
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The SetProperty class specifies a property value that is in effect only
     * during the parent view state.
     * You use this class in the <code>overrides</code> property of the State class.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * SetProperty ?????????????????????????????????????????????????????????????????? State ?????? overrides ????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var SetProperty = (function () {
        /**
         * @language en_US
         * Constructor.
         *
         * @param target The object whose property is being set.
         * By default, EUI uses the immediate parent of the State object.
         * @param name The property to set.
         * @param value The value of the property in the view state.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????SetProperty?????????
         *
         * @param target ????????????????????????????????????????????????EUI ?????? State ????????????????????????
         * @param name ?????????????????????
         * @param value ??????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function SetProperty(target, name, value) {
            this.target = target;
            this.name = name;
            this.value = value;
        }
        var d = __define,c=SetProperty,p=c.prototype;
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.apply = function (host, parent) {
            var obj = this.target ? host[this.target] : host;
            if (!obj)
                return;
            this.oldValue = obj[this.name];
            this.setPropertyValue(obj, this.name, this.value, this.oldValue);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        p.remove = function (host, parent) {
            var obj = this.target ? host[this.target] : host;
            if (!obj)
                return;
            this.setPropertyValue(obj, this.name, this.oldValue, this.oldValue);
            this.oldValue = null;
        };
        /**
         * @private
         * ???????????????
         */
        p.setPropertyValue = function (obj, name, value, valueForType) {
            if (value === undefined || value === null)
                obj[name] = value;
            else if (typeof (valueForType) == "number")
                obj[name] = +value;
            else if (typeof (valueForType) == "boolean")
                obj[name] = this.toBoolean(value);
            else
                obj[name] = value;
        };
        /**
         * @private
         * ??????Boolean???
         */
        p.toBoolean = function (value) {
            if (typeof (value) == "string")
                return value.toLowerCase() == "true";
            return value != false;
        };
        return SetProperty;
    }());
    eui.SetProperty = SetProperty;
    egret.registerClass(SetProperty,'eui.SetProperty',["eui.IOverride"]);
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    /**
     * @language en_US
     * The SetProperty class specifies a property value that is in effect only
     * during the parent view state.
     * You use this class in the <code>overrides</code> property of the State class.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * SetProperty ?????????????????????????????????????????????????????????????????? State ?????? overrides ????????????????????????
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    var SetStateProperty = (function () {
        /**
         * @language en_US
         * Constructor.
         *
         * @param target The object whose property is being set.
         * By default, EUI uses the immediate parent of the State object.
         * @param name The property to set.
         * @param value The value of the property in the view state.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * ????????????SetProperty?????????
         *
         * @param target ????????????????????????????????????????????????EUI ?????? State ????????????????????????
         * @param name ?????????????????????
         * @param value ??????????????????????????????
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        function SetStateProperty(host, templates, chainIndex, target, prop) {
            this.host = host;
            this.templates = templates;
            this.chainIndex = chainIndex;
            this.target = target;
            this.prop = prop;
        }
        var d = __define,c=SetStateProperty,p=c.prototype;
        /**
         * @inheritDoc
         *
         * @version Egret 3.0
         * @version eui 1.0
         * @platform Web,Native
         */
        p.apply = function (host, parent) {
            if (!this.target) {
                return;
            }
            var nextOldValue = this.target[this.prop];
            if (this.oldValue) {
                this.setPropertyValue(this.target, this.prop, this.oldValue, this.oldValue);
            }
            if (nextOldValue) {
                this.oldValue = nextOldValue;
            }
            eui.Binding.$bindProperties(this.host, this.templates.concat(), this.chainIndex.concat(), this.target, this.prop);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 3.0
         * @version eui 1.0
         * @platform Web,Native
         */
        p.remove = function (host, parent) {
            if (!this.target) {
                return;
            }
            var oldValue = this.oldValue;
            if (this.target[this.prop]) {
                this.oldValue = this.target[this.prop];
            }
            if (oldValue) {
                this.setPropertyValue(this.target, this.prop, oldValue, oldValue);
            }
        };
        /**
         * @private
         * ???????????????
         */
        p.setPropertyValue = function (obj, name, value, valueForType) {
            if (value === undefined || value === null)
                obj[name] = value;
            else if (typeof (valueForType) == "number")
                obj[name] = +value;
            else if (typeof (valueForType) == "boolean")
                obj[name] = this.toBoolean(value);
            else
                obj[name] = value;
        };
        /**
         * @private
         * ??????Boolean???
         */
        p.toBoolean = function (value) {
            if (typeof (value) == "string")
                return value.toLowerCase() == "true";
            return value != false;
        };
        return SetStateProperty;
    }());
    eui.SetStateProperty = SetStateProperty;
    egret.registerClass(SetStateProperty,'eui.SetStateProperty',["eui.IOverride"]);
})(eui || (eui = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var eui;
(function (eui) {
    var sys;
    (function (sys) {
        var SOLUTION_TOLERANCE = 0.1;
        var MIN_MAX_TOLERANCE = 0.1;
        /**
         * @private
         */
        var MatrixUtil = (function () {
            function MatrixUtil() {
            }
            var d = __define,c=MatrixUtil,p=c.prototype;
            /**
             * @private
             */
            MatrixUtil.fitBounds = function (width, height, matrix, explicitWidth, explicitHeight, preferredWidth, preferredHeight, minWidth, minHeight, maxWidth, maxHeight) {
                if (isNaN(width) && isNaN(height))
                    return egret.Point.create(preferredWidth, preferredHeight);
                var newMinWidth = (minWidth < MIN_MAX_TOLERANCE) ? 0 : minWidth - MIN_MAX_TOLERANCE;
                var newMinHeight = (minHeight < MIN_MAX_TOLERANCE) ? 0 : minHeight - MIN_MAX_TOLERANCE;
                var newMaxWidth = maxWidth + MIN_MAX_TOLERANCE;
                var newMaxHeight = maxHeight + MIN_MAX_TOLERANCE;
                var actualSize;
                if (!isNaN(width) && !isNaN(height)) {
                    actualSize = calcUBoundsToFitTBounds(width, height, matrix, newMinWidth, newMinHeight, newMaxWidth, newMaxHeight);
                    if (!actualSize) {
                        var actualSize1 = void 0;
                        actualSize1 = fitTBoundsWidth(width, matrix, explicitWidth, explicitHeight, preferredWidth, preferredHeight, newMinWidth, newMinHeight, newMaxWidth, newMaxHeight);
                        if (actualSize1) {
                            var fitHeight = transformSize(actualSize1.x, actualSize1.y, matrix).height;
                            if (fitHeight - SOLUTION_TOLERANCE > height) {
                                egret.Point.release(actualSize1);
                                actualSize1 = null;
                            }
                        }
                        var actualSize2 = void 0;
                        actualSize2 = fitTBoundsHeight(height, matrix, explicitWidth, explicitHeight, preferredWidth, preferredHeight, newMinWidth, newMinHeight, newMaxWidth, newMaxHeight);
                        if (actualSize2) {
                            var fitWidth = transformSize(actualSize2.x, actualSize2.y, matrix).width;
                            if (fitWidth - SOLUTION_TOLERANCE > width) {
                                egret.Point.release(actualSize2);
                                actualSize2 = null;
                            }
                        }
                        if (actualSize1 && actualSize2) {
                            actualSize = ((actualSize1.x * actualSize1.y) > (actualSize2.x * actualSize2.y)) ? actualSize1 : actualSize2;
                        }
                        else if (actualSize1) {
                            actualSize = actualSize1;
                        }
                        else {
                            actualSize = actualSize2;
                        }
                        egret.Point.release(actualSize1);
                        egret.Point.release(actualSize2);
                    }
                    return actualSize;
                }
                else if (!isNaN(width)) {
                    return fitTBoundsWidth(width, matrix, explicitWidth, explicitHeight, preferredWidth, preferredHeight, newMinWidth, newMinHeight, newMaxWidth, newMaxHeight);
                }
                else {
                    return fitTBoundsHeight(height, matrix, explicitWidth, explicitHeight, preferredWidth, preferredHeight, newMinWidth, newMinHeight, newMaxWidth, newMaxHeight);
                }
            };
            return MatrixUtil;
        }());
        sys.MatrixUtil = MatrixUtil;
        egret.registerClass(MatrixUtil,'eui.sys.MatrixUtil');
        /**
         * @private
         */
        function fitTBoundsWidth(width, matrix, explicitWidth, explicitHeight, preferredWidth, preferredHeight, minWidth, minHeight, maxWidth, maxHeight) {
            var actualSize;
            if (!isNaN(explicitWidth) && isNaN(explicitHeight)) {
                actualSize = calcUBoundsToFitTBoundsWidth(width, matrix, explicitWidth, preferredHeight, explicitWidth, minHeight, explicitWidth, maxHeight);
                if (actualSize)
                    return actualSize;
            }
            else if (isNaN(explicitWidth) && !isNaN(explicitHeight)) {
                actualSize = calcUBoundsToFitTBoundsWidth(width, matrix, preferredWidth, explicitHeight, minWidth, explicitHeight, maxWidth, explicitHeight);
                if (actualSize)
                    return actualSize;
            }
            actualSize = calcUBoundsToFitTBoundsWidth(width, matrix, preferredWidth, preferredHeight, minWidth, minHeight, maxWidth, maxHeight);
            return actualSize;
        }
        /**
         * @private
         */
        function fitTBoundsHeight(height, matrix, explicitWidth, explicitHeight, preferredWidth, preferredHeight, minWidth, minHeight, maxWidth, maxHeight) {
            var actualSize;
            if (!isNaN(explicitWidth) && isNaN(explicitHeight)) {
                actualSize = calcUBoundsToFitTBoundsHeight(height, matrix, explicitWidth, preferredHeight, explicitWidth, minHeight, explicitWidth, maxHeight);
                if (actualSize)
                    return actualSize;
            }
            else if (isNaN(explicitWidth) && !isNaN(explicitHeight)) {
                actualSize = calcUBoundsToFitTBoundsHeight(height, matrix, preferredWidth, explicitHeight, minWidth, explicitHeight, maxWidth, explicitHeight);
                if (actualSize)
                    return actualSize;
            }
            actualSize = calcUBoundsToFitTBoundsHeight(height, matrix, preferredWidth, preferredHeight, minWidth, minHeight, maxWidth, maxHeight);
            return actualSize;
        }
        /**
         * @private
         */
        function calcUBoundsToFitTBoundsHeight(h, matrix, preferredX, preferredY, minX, minY, maxX, maxY) {
            var b = matrix.b;
            var d = matrix.d;
            if (-1.0e-9 < b && b < +1.0e-9)
                b = 0;
            if (-1.0e-9 < d && d < +1.0e-9)
                d = 0;
            if (b == 0 && d == 0)
                return null;
            if (b == 0 && d == 0)
                return null;
            if (b == 0)
                return egret.Point.create(preferredX, h / Math.abs(d));
            else if (d == 0)
                return egret.Point.create(h / Math.abs(b), preferredY);
            var d1 = (b * d >= 0) ? d : -d;
            var s;
            var x;
            var y;
            if (d1 != 0 && preferredX > 0) {
                var invD1 = 1 / d1;
                preferredX = Math.max(minX, Math.min(maxX, preferredX));
                x = preferredX;
                y = (h - b * x) * invD1;
                if (minY <= y && y <= maxY &&
                    b * x + d1 * y >= 0) {
                    s = egret.Point.create(x, y);
                }
                y = (-h - b * x) * invD1;
                if (minY <= y && y <= maxY &&
                    b * x + d1 * y < 0) {
                    if (!s || transformSize(s.x, s.y, matrix).width > transformSize(x, y, matrix).width) {
                        egret.Point.release(s);
                        s = egret.Point.create(x, y);
                    }
                }
            }
            if (b != 0 && preferredY > 0) {
                var invB = 1 / b;
                preferredY = Math.max(minY, Math.min(maxY, preferredY));
                y = preferredY;
                x = (h - d1 * y) * invB;
                if (minX <= x && x <= maxX &&
                    b * x + d1 * y >= 0) {
                    if (!s || transformSize(s.x, s.y, matrix).width > transformSize(x, y, matrix).width)
                        s = egret.Point.create(x, y);
                }
                x = (-h - d1 * y) * invB;
                if (minX <= x && x <= maxX &&
                    b * x + d1 * y < 0) {
                    if (!s || transformSize(s.x, s.y, matrix).width > transformSize(x, y, matrix).width) {
                        egret.Point.release(s);
                        s = egret.Point.create(x, y);
                    }
                }
            }
            if (s)
                return s;
            var a = matrix.a;
            var c = matrix.c;
            var c1 = (a * c >= 0) ? c : -c;
            return solveEquation(b, d1, h, minX, minY, maxX, maxY, a, c1);
        }
        /**
         * @private
         */
        function calcUBoundsToFitTBoundsWidth(w, matrix, preferredX, preferredY, minX, minY, maxX, maxY) {
            var a = matrix.a;
            var c = matrix.c;
            if (-1.0e-9 < a && a < +1.0e-9)
                a = 0;
            if (-1.0e-9 < c && c < +1.0e-9)
                c = 0;
            if (a == 0 && c == 0)
                return null;
            if (a == 0)
                return egret.Point.create(preferredX, w / Math.abs(c));
            else if (c == 0)
                return egret.Point.create(w / Math.abs(a), preferredY);
            var c1 = (a * c >= 0) ? c : -c;
            var s;
            var x;
            var y;
            if (c1 != 0 && preferredX > 0) {
                var invC1 = 1 / c1;
                preferredX = Math.max(minX, Math.min(maxX, preferredX));
                x = preferredX;
                y = (w - a * x) * invC1;
                if (minY <= y && y <= maxY &&
                    a * x + c1 * y >= 0) {
                    s = egret.Point.create(x, y);
                }
                y = (-w - a * x) * invC1;
                if (minY <= y && y <= maxY &&
                    a * x + c1 * y < 0) {
                    if (!s || transformSize(s.x, s.y, matrix).height > transformSize(x, y, matrix).height) {
                        egret.Point.release(s);
                        s = egret.Point.create(x, y);
                    }
                }
            }
            if (a != 0 && preferredY > 0) {
                var invA = 1 / a;
                preferredY = Math.max(minY, Math.min(maxY, preferredY));
                y = preferredY;
                x = (w - c1 * y) * invA;
                if (minX <= x && x <= maxX &&
                    a * x + c1 * y >= 0) {
                    if (!s || transformSize(s.x, s.y, matrix).height > transformSize(x, y, matrix).height) {
                        egret.Point.release(s);
                        s = egret.Point.create(x, y);
                    }
                }
                x = (-w - c1 * y) * invA;
                if (minX <= x && x <= maxX &&
                    a * x + c1 * y < 0) {
                    if (!s || transformSize(s.x, s.y, matrix).height > transformSize(x, y, matrix).height) {
                        egret.Point.release(s);
                        s = egret.Point.create(x, y);
                    }
                }
            }
            if (s)
                return s;
            var b = matrix.b;
            var d = matrix.d;
            var d1 = (b * d >= 0) ? d : -d;
            return solveEquation(a, c1, w, minX, minY, maxX, maxY, b, d1);
        }
        /**
         * @private
         */
        function solveEquation(a, c, w, minX, minY, maxX, maxY, b, d) {
            if (a == 0 || c == 0)
                return null;
            var x;
            var y;
            var A = (w - minX * a) / c;
            var B = (w - maxX * a) / c;
            var rangeMinY = Math.max(minY, Math.min(A, B));
            var rangeMaxY = Math.min(maxY, Math.max(A, B));
            var det = (b * c - a * d);
            if (rangeMinY <= rangeMaxY) {
                if (Math.abs(det) < 1.0e-9) {
                    y = w / (a + c);
                }
                else {
                    y = b * w / det;
                }
                y = Math.max(rangeMinY, Math.min(y, rangeMaxY));
                x = (w - c * y) / a;
                return egret.Point.create(x, y);
            }
            A = -(minX * a + w) / c;
            B = -(maxX * a + w) / c;
            rangeMinY = Math.max(minY, Math.min(A, B));
            rangeMaxY = Math.min(maxY, Math.max(A, B));
            if (rangeMinY <= rangeMaxY) {
                if (Math.abs(det) < 1.0e-9) {
                    y = -w / (a + c);
                }
                else {
                    y = -b * w / det;
                }
                y = Math.max(rangeMinY, Math.min(y, rangeMaxY));
                x = (-w - c * y) / a;
                return egret.Point.create(x, y);
            }
            return null;
        }
        /**
         * @private
         */
        function calcUBoundsToFitTBounds(w, h, matrix, minX, minY, maxX, maxY) {
            var a = matrix.a;
            var b = matrix.b;
            var c = matrix.c;
            var d = matrix.d;
            if (-1.0e-9 < a && a < +1.0e-9)
                a = 0;
            if (-1.0e-9 < b && b < +1.0e-9)
                b = 0;
            if (-1.0e-9 < c && c < +1.0e-9)
                c = 0;
            if (-1.0e-9 < d && d < +1.0e-9)
                d = 0;
            if (b == 0 && c == 0) {
                if (a == 0 || d == 0)
                    return null;
                return egret.Point.create(w / Math.abs(a), h / Math.abs(d));
            }
            if (a == 0 && d == 0) {
                if (b == 0 || c == 0)
                    return null;
                return egret.Point.create(h / Math.abs(b), w / Math.abs(c));
            }
            var c1 = (a * c >= 0) ? c : -c;
            var d1 = (b * d >= 0) ? d : -d;
            var det = a * d1 - b * c1;
            if (Math.abs(det) < 1.0e-9) {
                if (c1 == 0 || a == 0 || a == -c1)
                    return null;
                if (Math.abs(a * h - b * w) > 1.0e-9)
                    return null;
                return solveEquation(a, c1, w, minX, minX, maxX, maxY, b, d1);
            }
            var invDet = 1 / det;
            w *= invDet;
            h *= invDet;
            var s;
            s = solveSystem(a, c1, b, d1, w, h);
            if (s &&
                minX <= s.x && s.x <= maxX && minY <= s.y && s.y <= maxY &&
                a * s.x + c1 * s.x >= 0 &&
                b * s.x + d1 * s.y >= 0)
                return s;
            s = solveSystem(a, c1, b, d1, w, -h);
            if (s &&
                minX <= s.x && s.x <= maxX && minY <= s.y && s.y <= maxY &&
                a * s.x + c1 * s.x >= 0 &&
                b * s.x + d1 * s.y < 0)
                return s;
            s = solveSystem(a, c1, b, d1, -w, h);
            if (s &&
                minX <= s.x && s.x <= maxX && minY <= s.y && s.y <= maxY &&
                a * s.x + c1 * s.x < 0 &&
                b * s.x + d1 * s.y >= 0)
                return s;
            s = solveSystem(a, c1, b, d1, -w, -h);
            if (s &&
                minX <= s.x && s.x <= maxX && minY <= s.y && s.y <= maxY &&
                a * s.x + c1 * s.x < 0 &&
                b * s.x + d1 * s.y < 0)
                return s;
            egret.Point.release(s);
            return null;
        }
        /**
         * @private
         */
        function transformSize(width, height, matrix) {
            var bounds = egret.$TempRectangle.setTo(0, 0, width, height);
            matrix.$transformBounds(bounds);
            return bounds;
        }
        /**
         * @private
         */
        function solveSystem(a, c, b, d, mOverDet, nOverDet) {
            return egret.Point.create(d * mOverDet - c * nOverDet, a * nOverDet - b * mOverDet);
        }
    })(sys = eui.sys || (eui.sys = {}));
})(eui || (eui = {}));
