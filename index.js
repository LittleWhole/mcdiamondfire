const http = require("xmlhttprequest");
const request = new XMLHttpRequest();

class Connection {
  constructor(key, baseURL = "http://verify.mcdiamondfire.com:5000/api/") {
    /**
     * The header used for authentication
     * @type {String}
     */
    Object.defineProperty(this, "_header", { value: { access: key } });

    /**
     * The base URL used for generating requests
     * @type {String}
     */
    Object.defineProperty(this, "_baseURL", { value: baseURL });
  }

  request(...components) {
    http.open("GET", this._baseURL + components.join("/"), false);
    http.setRequestHeader(this._header);
    http.send(null);

    return http.responseText;
  }

  /**
   * An array of active plots
   * @type {Array[Object]}
   */
  get activePlots() {
    const { result } = this.request("plots/active");
    return result;
  }

  /**
   * An array of valid nodes for the connection.node() method
   * @type {Array[String]}
   */
  get nodeList() {
    const { list } = this.request("nodes/list");
    return list;
  }

  /**
   * The Discord server's statistics
   * @type {Object}
   */
  get discordStats() {
    return this.request("stats/discord");
  }

  /**
   * The Minecraft server's statistics
   * @type {Object}
   */
  get minecraftStats() {
    return this.request("stats/server");
  }

  /**
   * The current support queue
   * @type {Array[Object]}
   */
  get supportQueue() {
    const { list } = this.request("support/queue");
    return list;
  }


  /** 
   * Fetches information about a key
   * @param {key} String The key to fetch
   * @returns {Object} The fetched key
  */
  key(key) {
    return this.request("key", key);
  }

  /**
   * Fetches information on a node
   * @param {Node} Number The node to fetch
   */
  node(node = 1) {
    return this.request("nodes", node);
  }

  /**
   * Fetches a staff member's support stats
   * @param {String} staff The staff to fetch stats for
   * @param {String} mode The mode to use (total or month)
   */
  supportStats(staff, mode = "total") {
    if (!["total", "month"].includes(mode)) throw new Error("\"mode\" must be either \"total\" or \"monthly\"");

    return this.request("support", staff, "stats", mode);
  }

  /**
   * Fetches a plot by ID
   * @param {Sting} id The ID to fetch a plot by
   * @returns {Object} plot The plot's values
   */
  plot(id) {
    const plot = this.request("plots", id);
    if (plot.error) return Promise.reject(plot.error);

    return plot;
  }
 }

module.exports = Connection;
