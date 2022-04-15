var b; (function (d) {
    var c = (function () {
        function e(f, g) { this.notify = null; this.context = null; this.setNotifyMethod(f); this.setNotifyContext(g) } e.prototype.getNotifyMethod = function () { return this.notify }; e.prototype.setNotifyMethod = function (f) { this.notify = f }; e.prototype.getNotifyContext = function () { return this.context }; e.prototype.setNotifyContext = function (f) { this.context = f }; e.prototype.notifyObserver = function (f) {
            this.getNotifyMethod().call(this.getNotifyContext(), f)
        }; e.prototype.compareNotifyContext = function (f) { return f === this.context }; return e
    })(); d.Observer = c
})(b || (b = {})); var b; (function (c) {
    var d = (function () {
        function f() { this.mediatorMap = null; this.observerMap = null; if (f.instance) { throw Error(f.SINGLETON_MSG) } f.instance = this; this.mediatorMap = {}; this.observerMap = {}; this.initializeView() } f.prototype.initializeView = function () { }; f.prototype.registerObserver = function (h, g) { var i = this.observerMap[h]; if (i) { i.push(g) } else { this.observerMap[h] = [g] } }; f.prototype.removeObserver = function (k, j) {
            var l = this.observerMap[k];
            var h = l.length; while (h--) { var g = l[h]; if (g.compareNotifyContext(j)) { l.splice(h, 1); break } } if (l.length == 0) { delete this.observerMap[k] }
        }; f.prototype.notifyObservers = function (l) { var k = l.getName(); var n = this.observerMap[k]; if (n) { var m = n.slice(0); var g = m.length; for (var j = 0; j < g; j++) { var h = m[j]; h.notifyObserver(l) } } }; f.prototype.registerMediator = function (l) {
            var j = l.getMediatorName(); if (this.mediatorMap[j]) { return } this.mediatorMap[j] = l; var m = l.listNotificationInterests(); var g = m.length; if (g > 0) {
                var h = new c.Observer(l.handleNotification, l);
                for (var k = 0; k < g; k++) { this.registerObserver(m[k], h) }
            } l.onRegister()
        }; f.prototype.retrieveMediator = function (g) { return this.mediatorMap[g] || null }; f.prototype.removeMediator = function (g) { var j = this.mediatorMap[g]; if (!j) { return null } var k = j.listNotificationInterests(); var h = k.length; while (h--) { this.removeObserver(k[h], j) } delete this.mediatorMap[g]; j.onRemove(); return j }; f.prototype.hasMediator = function (g) { return this.mediatorMap[g] != null }; f.SINGLETON_MSG = "View singleton already constructed!"; f.instance = null;
        f.getInstance = function e() { if (!f.instance) { f.instance = new f() } return f.instance }; return f
    })(); c.View = d
})(b || (b = {})); var b; (function (c) {
    var d = (function () {
        function f() { this.view = null; this.commandMap = null; if (f.instance) { throw Error(f.SINGLETON_MSG) } f.instance = this; this.commandMap = {}; this.initializeController() } f.prototype.initializeController = function () { this.view = c.View.getInstance() }; f.prototype.executeCommand = function (g) { var i = this.commandMap[g.getName()]; if (i) { var h = new i(); h.execute(g) } }; f.prototype.registerCommand = function (g, h) {
            if (!this.commandMap[g]) {
                this.view.registerObserver(g, new c.Observer(this.executeCommand, this))
            } this.commandMap[g] = h
        }; f.prototype.hasCommand = function (g) { return this.commandMap[g] != null }; f.prototype.removeCommand = function (g) { if (this.hasCommand(g)) { this.view.removeObserver(g, this); delete this.commandMap[g] } }; f.instance = null; f.SINGLETON_MSG = "Controller singleton already constructed!"; f.getInstance = function e() { if (!f.instance) { f.instance = new f() } return f.instance }; return f
    })(); c.Controller = d
})(b || (b = {})); var b; (function (c) {
    var d = (function () {
        function f() {
        this.proxyMap = null; if (f.instance) {
            throw Error(f.SINGLETON_MSG)
        } f.instance = this; this.proxyMap = {}; this.initializeModel()
        } f.prototype.initializeModel = function () { }; f.prototype.registerProxy = function (g) { this.proxyMap[g.getProxyName()] = g; g.onRegister() }; f.prototype.removeProxy = function (h) { var g = this.proxyMap[h]; if (g) { delete this.proxyMap[h]; g.onRemove() } return g }; f.prototype.retrieveProxy = function (g) { return this.proxyMap[g] || null }; f.prototype.hasProxy = function (g) { return this.proxyMap[g] != null }; f.SINGLETON_MSG = "Model singleton already constructed!"; f.instance = null;
        f.getInstance = function e() { if (!f.instance) { f.instance = new f() } return f.instance }; return f
    })(); c.Model = d
})(b || (b = {})); var b; (function (c) {
    var d = (function () {
        function e(g, f, h) { if (typeof f === "undefined") { f = null } if (typeof h === "undefined") { h = null } this.name = null; this.body = null; this.type = null; this.name = g; this.body = f; this.type = h } e.prototype.getName = function () { return this.name }; e.prototype.setBody = function (f) { this.body = f }; e.prototype.getBody = function () { return this.body }; e.prototype.setType = function (f) {
        this.type = f
        }; e.prototype.getType = function () { return this.type }; e.prototype.toString = function () { var f = "Notification Name: " + this.getName(); f += "\nBody:" + ((this.getBody() == null) ? "null" : this.getBody().toString()); f += "\nType:" + ((this.getType() == null) ? "null" : this.getType()); return f }; return e
    })(); c.Notification = d
})(b || (b = {})); var b; (function (d) {
    var c = (function () {
        function e() { this.model = null; this.view = null; this.controller = null; if (e.instance) { throw Error(e.SINGLETON_MSG) } e.instance = this; this.initializeFacade() } e.prototype.initializeFacade = function () {
            this.initializeModel();
            this.initializeController(); this.initializeView()
        }; e.prototype.initializeModel = function () { if (!this.model) { this.model = d.Model.getInstance() } }; e.prototype.initializeController = function () { if (!this.controller) { this.controller = d.Controller.getInstance() } }; e.prototype.initializeView = function () { if (!this.view) { this.view = d.View.getInstance() } }; e.prototype.registerCommand = function (g, h) { this.controller.registerCommand(g, h) }; e.prototype.removeCommand = function (g) { this.controller.removeCommand(g) }; e.prototype.hasCommand = function (g) {
            return this.controller.hasCommand(g)
        }; e.prototype.registerProxy = function (g) { this.model.registerProxy(g) }; e.prototype.retrieveProxy = function (g) { return this.model.retrieveProxy(g) }; e.prototype.removeProxy = function (h) { var g; if (this.model) { g = this.model.removeProxy(h) } return g }; e.prototype.hasProxy = function (g) { return this.model.hasProxy(g) }; e.prototype.registerMediator = function (g) { if (this.view) { this.view.registerMediator(g) } }; e.prototype.retrieveMediator = function (g) { return this.view.retrieveMediator(g) }; e.prototype.removeMediator = function (g) {
            var h;
            if (this.view) { h = this.view.removeMediator(g) } return h
        }; e.prototype.hasMediator = function (g) { return this.view.hasMediator(g) }; e.prototype.notifyObservers = function (g) { if (this.view) { this.view.notifyObservers(g) } }; e.prototype.sendNotification = function (h, g, i) { if (typeof g === "undefined") { g = null } if (typeof i === "undefined") { i = null } this.notifyObservers(new d.Notification(h, g, i)) }; e.SINGLETON_MSG = "Facade singleton already constructed!"; e.instance = null; e.getInstance = function f() {
            if (!e.instance) {
            e.instance = new e()
            } return e.instance
        }; return e
    })(); d.Facade = c
})(b || (b = {})); var b; (function (d) { var c = (function () { function e() { this.facade = null; this.facade = d.Facade.getInstance() } e.prototype.sendNotification = function (g, f, h) { if (typeof f === "undefined") { f = null } if (typeof h === "undefined") { h = null } this.facade.sendNotification(g, f, h) }; return e })(); d.Notifier = c })(b || (b = {})); var a = this.__extends || function (f, c) { function e() { this.constructor = f } e.prototype = c.prototype; f.prototype = new e() }; var b; (function (d) {
    var c = (function (f) {
        a(e, f);
        function e() { f.call(this); this.subCommands = null; this.subCommands = new Array(); this.initializeMacroCommand() } e.prototype.initializeMacroCommand = function () { }; e.prototype.addSubCommand = function (g) { this.subCommands.push(g) }; e.prototype.execute = function (l) { var j = this.subCommands.slice(0); var g = this.subCommands.length; for (var h = 0; h < g; h++) { var m = j[h]; var k = new m(); k.execute(l) } this.subCommands.splice(0) }; return e
    })(d.Notifier); d.MacroCommand = c
})(b || (b = {})); var b; (function (c) {
    var d = (function (e) {
        a(f, e); function f() {
            e.apply(this, arguments)
        } f.prototype.execute = function (g) { }; return f
    })(c.Notifier); c.SimpleCommand = d
})(b || (b = {})); var b; (function (c) {
    var d = (function (e) {
        a(f, e); function f(g, h) { if (typeof g === "undefined") { g = null } if (typeof h === "undefined") { h = null } e.call(this); this.mediatorName = null; this.viewComponent = null; this.mediatorName = (g != null) ? g : f.NAME; this.viewComponent = h } f.prototype.getMediatorName = function () { return this.mediatorName }; f.prototype.getViewComponent = function () { return this.viewComponent }; f.prototype.setViewComponent = function (g) {
        this.viewComponent = g
        }; f.prototype.listNotificationInterests = function () { return new Array() }; f.prototype.handleNotification = function (g) { }; f.prototype.onRegister = function () { }; f.prototype.onRemove = function () { }; f.NAME = "Mediator"; return f
    })(c.Notifier); c.Mediator = d
})(b || (b = {})); var b; (function (c) {
    var d = (function (e) {
        a(f, e); function f(h, g) { if (typeof h === "undefined") { h = null } if (typeof g === "undefined") { g = null } e.call(this); this.proxyName = null; this.data = null; this.proxyName = (h != null) ? h : f.NAME; if (g != null) { this.setData(g) } } f.prototype.getProxyName = function () {
            return this.proxyName
        }; f.prototype.setData = function (g) { this.data = g }; f.prototype.getData = function () { return this.data }; f.prototype.onRegister = function () { }; f.prototype.onRemove = function () { }; f.NAME = "Proxy"; return f
    })(c.Notifier); c.Proxy = d
})(b || (b = {}));
var puremvc;
(function (puremvc) {
    "use strict";
    var Observer = (function () {
        function Observer(notifyMethod, notifyContext) {
            this.notify = null;
            this.context = null;
            this.setNotifyMethod(notifyMethod);
            this.setNotifyContext(notifyContext);
        }
        Observer.prototype.getNotifyMethod = function () {
            return this.notify;
        };
        Observer.prototype.setNotifyMethod = function (notifyMethod) {
            this.notify = notifyMethod;
        };
        Observer.prototype.getNotifyContext = function () {
            return this.context;
        };
        Observer.prototype.setNotifyContext = function (notifyContext) {
            this.context = notifyContext;
        };
        Observer.prototype.notifyObserver = function (notification) {
            this.getNotifyMethod().call(this.getNotifyContext(), notification);
        };
        Observer.prototype.compareNotifyContext = function (object) {
            return object === this.context;
        };
        return Observer;
    })();
    puremvc.Observer = Observer;
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var View = (function () {
        function View() {
            this.mediatorMap = null;
            this.observerMap = null;
            if (View.instance) {
                throw Error(View.SINGLETON_MSG);
            }
            View.instance = this;
            this.mediatorMap = {
            };
            this.observerMap = {
            };
            this.initializeView();
        }
        View.prototype.initializeView = function () {
        };
        View.prototype.registerObserver = function (notificationName, observer) {
            var observers = this.observerMap[notificationName];
            if (observers) {
                observers.push(observer);
            } else {
                this.observerMap[notificationName] = [
                    observer
                ];
            }
        };
        View.prototype.removeObserver = function (notificationName, notifyContext) {
            var observers = this.observerMap[notificationName];
            var i = observers.length;
            while (i--) {
                var observer = observers[i];
                if (observer.compareNotifyContext(notifyContext)) {
                    observers.splice(i, 1);
                    break;
                }
            }
            if (observers.length == 0) {
                delete this.observerMap[notificationName];
            }
        };
        View.prototype.notifyObservers = function (notification) {
            var notificationName = notification.getName();
            var observersRef = this.observerMap[notificationName];
            if (observersRef) {
                var observers = observersRef.slice(0);
                var len = observers.length;
                for (var i = 0; i < len; i++) {
                    var observer = observers[i];
                    observer.notifyObserver(notification);
                }
            }
        };
        View.prototype.registerMediator = function (mediator) {
            var name = mediator.getMediatorName();
            if (this.mediatorMap[name]) {
                return;
            }
            this.mediatorMap[name] = mediator;
            var interests = mediator.listNotificationInterests();
            var len = interests.length;
            if (len > 0) {
                var observer = new puremvc.Observer(mediator.handleNotification, mediator);
                for (var i = 0; i < len; i++) {
                    this.registerObserver(interests[i], observer);
                }
            }
            mediator.onRegister();
        };
        View.prototype.retrieveMediator = function (mediatorName) {
            return this.mediatorMap[mediatorName] || null;
        };
        View.prototype.removeMediator = function (mediatorName) {
            var mediator = this.mediatorMap[mediatorName];
            if (!mediator) {
                return null;
            }
            var interests = mediator.listNotificationInterests();
            var i = interests.length;
            while (i--) {
                this.removeObserver(interests[i], mediator);
            }
            delete this.mediatorMap[mediatorName];
            mediator.onRemove();
            return mediator;
        };
        View.prototype.hasMediator = function (mediatorName) {
            return this.mediatorMap[mediatorName] != null;
        };
        View.SINGLETON_MSG = "View singleton already constructed!";
        View.instance = null;
        View.getInstance = function getInstance() {
            if (!View.instance) {
                View.instance = new View();
            }
            return View.instance;
        }
        return View;
    })();
    puremvc.View = View;
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Controller = (function () {
        function Controller() {
            this.view = null;
            this.commandMap = null;
            if (Controller.instance) {
                throw Error(Controller.SINGLETON_MSG);
            }
            Controller.instance = this;
            this.commandMap = {
            };
            this.initializeController();
        }
        Controller.prototype.initializeController = function () {
            this.view = puremvc.View.getInstance();
        };
        Controller.prototype.executeCommand = function (notification) {
            var commandClassRef = this.commandMap[notification.getName()];
            if (commandClassRef) {
                var command = new commandClassRef();
                command.execute(notification);
            }
        };
        Controller.prototype.registerCommand = function (notificationName, commandClassRef) {
            if (!this.commandMap[notificationName]) {
                this.view.registerObserver(notificationName, new puremvc.Observer(this.executeCommand, this));
            }
            this.commandMap[notificationName] = commandClassRef;
        };
        Controller.prototype.hasCommand = function (notificationName) {
            return this.commandMap[notificationName] != null;
        };
        Controller.prototype.removeCommand = function (notificationName) {
            if (this.hasCommand(notificationName)) {
                this.view.removeObserver(notificationName, this);
                delete this.commandMap[notificationName];
            }
        };
        Controller.instance = null;
        Controller.SINGLETON_MSG = "Controller singleton already constructed!";
        Controller.getInstance = function getInstance() {
            if (!Controller.instance) {
                Controller.instance = new Controller();
            }
            return Controller.instance;
        }
        return Controller;
    })();
    puremvc.Controller = Controller;
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Model = (function () {
        function Model() {
            this.proxyMap = null;
            if (Model.instance) {
                throw Error(Model.SINGLETON_MSG);
            }
            Model.instance = this;
            this.proxyMap = {
            };
            this.initializeModel();
        }
        Model.prototype.initializeModel = function () {
        };
        Model.prototype.registerProxy = function (proxy) {
            this.proxyMap[proxy.getProxyName()] = proxy;
            proxy.onRegister();
        };
        Model.prototype.removeProxy = function (proxyName) {
            var proxy = this.proxyMap[proxyName];
            if (proxy) {
                delete this.proxyMap[proxyName];
                proxy.onRemove();
            }
            return proxy;
        };
        Model.prototype.retrieveProxy = function (proxyName) {
            return this.proxyMap[proxyName] || null;
        };
        Model.prototype.hasProxy = function (proxyName) {
            return this.proxyMap[proxyName] != null;
        };
        Model.SINGLETON_MSG = "Model singleton already constructed!";
        Model.instance = null;
        Model.getInstance = function getInstance() {
            if (!Model.instance) {
                Model.instance = new Model();
            }
            return Model.instance;
        }
        return Model;
    })();
    puremvc.Model = Model;
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Notification = (function () {
        function Notification(name, body, type) {
            if (typeof body === "undefined") { body = null; }
            if (typeof type === "undefined") { type = null; }
            this.name = null;
            this.body = null;
            this.type = null;
            this.name = name;
            this.body = body;
            this.type = type;
        }
        Notification.prototype.getName = function () {
            return this.name;
        };
        Notification.prototype.setBody = function (body) {
            this.body = body;
        };
        Notification.prototype.getBody = function () {
            return this.body;
        };
        Notification.prototype.setType = function (type) {
            this.type = type;
        };
        Notification.prototype.getType = function () {
            return this.type;
        };
        Notification.prototype.toString = function () {
            var msg = "Notification Name: " + this.getName();
            msg += "\nBody:" + ((this.getBody() == null) ? "null" : this.getBody().toString());
            msg += "\nType:" + ((this.getType() == null) ? "null" : this.getType());
            return msg;
        };
        return Notification;
    })();
    puremvc.Notification = Notification;
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Facade = (function () {
        function Facade() {
            this.model = null;
            this.view = null;
            this.controller = null;
            if (Facade.instance) {
                throw Error(Facade.SINGLETON_MSG);
            }
            Facade.instance = this;
            this.initializeFacade();
        }
        Facade.prototype.initializeFacade = function () {
            this.initializeModel();
            this.initializeController();
            this.initializeView();
        };
        Facade.prototype.initializeModel = function () {
            if (!this.model) {
                this.model = puremvc.Model.getInstance();
            }
        };
        Facade.prototype.initializeController = function () {
            if (!this.controller) {
                this.controller = puremvc.Controller.getInstance();
            }
        };
        Facade.prototype.initializeView = function () {
            if (!this.view) {
                this.view = puremvc.View.getInstance();
            }
        };
        Facade.prototype.registerCommand = function (notificationName, commandClassRef) {
            this.controller.registerCommand(notificationName, commandClassRef);
        };
        Facade.prototype.removeCommand = function (notificationName) {
            this.controller.removeCommand(notificationName);
        };
        Facade.prototype.hasCommand = function (notificationName) {
            return this.controller.hasCommand(notificationName);
        };
        Facade.prototype.registerProxy = function (proxy) {
            this.model.registerProxy(proxy);
        };
        Facade.prototype.retrieveProxy = function (proxyName) {
            return this.model.retrieveProxy(proxyName);
        };
        Facade.prototype.removeProxy = function (proxyName) {
            var proxy;
            if (this.model) {
                proxy = this.model.removeProxy(proxyName);
            }
            return proxy;
        };
        Facade.prototype.hasProxy = function (proxyName) {
            return this.model.hasProxy(proxyName);
        };
        Facade.prototype.registerMediator = function (mediator) {
            if (this.view) {
                this.view.registerMediator(mediator);
            }
        };
        Facade.prototype.retrieveMediator = function (mediatorName) {
            return this.view.retrieveMediator(mediatorName);
        };
        Facade.prototype.removeMediator = function (mediatorName) {
            var mediator;
            if (this.view) {
                mediator = this.view.removeMediator(mediatorName);
            }
            return mediator;
        };
        Facade.prototype.hasMediator = function (mediatorName) {
            return this.view.hasMediator(mediatorName);
        };
        Facade.prototype.notifyObservers = function (notification) {
            if (this.view) {
                this.view.notifyObservers(notification);
            }
        };
        Facade.prototype.sendNotification = function (name, body, type) {
            if (typeof body === "undefined") { body = null; }
            if (typeof type === "undefined") { type = null; }
            this.notifyObservers(new puremvc.Notification(name, body, type));
        };
        Facade.SINGLETON_MSG = "Facade singleton already constructed!";
        Facade.instance = null;
        Facade.getInstance = function getInstance() {
            if (!Facade.instance) {
                Facade.instance = new Facade();
            }
            return Facade.instance;
        }
        return Facade;
    })();
    puremvc.Facade = Facade;
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Notifier = (function () {
        function Notifier() {
            this.facade = null;
            this.facade = puremvc.Facade.getInstance();
        }
        Notifier.prototype.sendNotification = function (name, body, type) {
            if (typeof body === "undefined") { body = null; }
            if (typeof type === "undefined") { type = null; }
            this.facade.sendNotification(name, body, type);
        };
        return Notifier;
    })();
    puremvc.Notifier = Notifier;
})(puremvc || (puremvc = {}));

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var puremvc;
(function (puremvc) {
    "use strict";
    var MacroCommand = (function (_super) {
        __extends(MacroCommand, _super);
        function MacroCommand() {
            _super.call(this);
            this.subCommands = null;
            this.subCommands = new Array();
            this.initializeMacroCommand();
        }
        MacroCommand.prototype.initializeMacroCommand = function () {
        };
        MacroCommand.prototype.addSubCommand = function (commandClassRef) {
            this.subCommands.push(commandClassRef);
        };
        MacroCommand.prototype.execute = function (notification) {
            var subCommands = this.subCommands.slice(0);
            var len = this.subCommands.length;
            for (var i = 0; i < len; i++) {
                var commandClassRef = subCommands[i];
                var commandInstance = new commandClassRef();
                commandInstance.execute(notification);
            }
            this.subCommands.splice(0);
        };
        return MacroCommand;
    })(puremvc.Notifier);
    puremvc.MacroCommand = MacroCommand;
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var SimpleCommand = (function (_super) {
        __extends(SimpleCommand, _super);
        function SimpleCommand() {
            _super.apply(this, arguments);

        }
        SimpleCommand.prototype.execute = function (notification) {
        };
        return SimpleCommand;
    })(puremvc.Notifier);
    puremvc.SimpleCommand = SimpleCommand;
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Mediator = (function (_super) {
        __extends(Mediator, _super);
        function Mediator(mediatorName, viewComponent) {
            if (typeof mediatorName === "undefined") { mediatorName = null; }
            if (typeof viewComponent === "undefined") { viewComponent = null; }
            _super.call(this);
            this.mediatorName = null;
            this.viewComponent = null;
            this.mediatorName = (mediatorName != null) ? mediatorName : Mediator.NAME;
            this.viewComponent = viewComponent;
        }
        Mediator.prototype.getMediatorName = function () {
            return this.mediatorName;
        };
        Mediator.prototype.getViewComponent = function () {
            return this.viewComponent;
        };
        Mediator.prototype.setViewComponent = function (viewComponent) {
            this.viewComponent = viewComponent;
        };
        Mediator.prototype.listNotificationInterests = function () {
            return new Array();
        };
        Mediator.prototype.handleNotification = function (notification) {
        };
        Mediator.prototype.onRegister = function () {
        };
        Mediator.prototype.onRemove = function () {
        };
        Mediator.NAME = 'Mediator';
        return Mediator;
    })(puremvc.Notifier);
    puremvc.Mediator = Mediator;
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Proxy = (function (_super) {
        __extends(Proxy, _super);
        function Proxy(proxyName, data) {
            if (typeof proxyName === "undefined") { proxyName = null; }
            if (typeof data === "undefined") { data = null; }
            _super.call(this);
            this.proxyName = null;
            this.data = null;
            this.proxyName = (proxyName != null) ? proxyName : Proxy.NAME;
            if (data != null) {
                this.setData(data);
            }
        }
        Proxy.prototype.getProxyName = function () {
            return this.proxyName;
        };
        Proxy.prototype.setData = function (data) {
            this.data = data;
        };
        Proxy.prototype.getData = function () {
            return this.data;
        };
        Proxy.prototype.onRegister = function () {
        };
        Proxy.prototype.onRemove = function () {
        };
        Proxy.NAME = "Proxy";
        return Proxy;
    })(puremvc.Notifier);
    puremvc.Proxy = Proxy;
})(puremvc || (puremvc = {}));
