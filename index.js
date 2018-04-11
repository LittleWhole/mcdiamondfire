const { XMLHttpRequest } = require("xmlhttprequest");
const request = new XMLHttpRequest();

class Connection {
  constructor(key) {
    /**
     * The key used in queries
     * @type {String}
     */
    Object.defineProperty(this, "_key", { value: key });
  }

  _build(...components) {
    return `http://verify.mcdiamondfire.com/${components.join("/")}?key=${this._key}`;
  }

  key(key) {
    request.open("GET", this._build("key", key), false);
    request.send(null);

    return request.responseText;
  }

  stats(mode = "server") {
    if (!["server", "discord"].includes(mode)) throw new Error("\"mode\" must be either \"sever\" or \"discord\"");

    request.open("GET", this._build("stats", mode), false);
    request.send(null);

    return request.responseText;
  }

  listNodes() {
    request.open("GET", this._build("nodes", "list"), false);
    request.send(null);

    return request.responseText;
  }

  node(node = 1) {
    request.open("GET", this._build("nodes", node), false);
    request.send(null);

    return request.responseText;
  }

  queue() {
    request.open("GET", this._build("support", "queue"), false);
    request.send(null);

    return request.responseText;
  }

  supportStats(staff, mode = "total") {
    if (!["server", "discord"].includes(mode)) throw new Error("\"mode\" must be either \"total\" or \"monthly\"");

    request.open("GET", this._build("support", staff, "stats", mode), false);
    request.send(null);

    return request.responseText;
  }

  plot(id) {
    request.open("GET", this._build("plot", id), false);
    request.send(null);

    return request.responseText;
  }
}

module.exports = Connection;
