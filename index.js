const { get } = require("snekfetch");

class Connection {
  constructor(key, baseURL = "http://verify.mcdiamondfire.com:5000/api/") {
    /**
     * The key used for authentication
     * @type {String}
     */
    Object.defineProperty(this, "_key", { value: key });

    /**
     * The base URL used for generating requests
     * @type {String}
     */
    Object.defineProperty(this, "_baseURL", { value: baseURL });
  }

  async request(...components) {
    const { body } = await get(this._baseURL + components.join("/"), {
      headers: {
        access: this._key
      }
    });

    if (body.error) return Promise.reject(body.error);

    console.log(body);

    return body;
  }

  /**
   * An array of active plots
   * @type {Array[Object]}
   */
  get activePlots() {
    return new Promise(async r => {
      const { result } = await this.request("plots/active");
      r(result);
    });
  }

  /**
   * An array of valid nodes for the connection.node() method
   * @type {Array[String]}
   */
  get nodeList() {
    return new Promise(async r => {
      const { list } = await this.request("nodes/list");
      r(list);
    });
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
    return new Promise(async r => {
      const { users } = await this.request("support/queue");
      return r(users);
    });
  }


  /** 
   * Fetches information about a key
   * @param {key} String The key to fetch
   * @returns {Promise<Object>} The fetched key
  */
  key(key) {
    return this.request("key", key);
  }

  /**
   * Fetches information on a node
   * @param {Node} Number The node to fetch
   * @returns {Promise<Object>} The fetched node
   */
  node(node = 1) {
    return this.request("nodes", node);
  }

  /**
   * Fetches a staff member's support stats
   * @param {String} staff The staff to fetch stats for
   * @param {String} mode The mode to use (total or month)
   * @returns {Promise<Object>} The specified staff's stats
   */
  supportStats(staff, mode = "total") {
    if (!["total", "month"].includes(mode)) throw new Error("\"mode\" must be either \"total\" or \"monthly\"");

    return this.request("support", staff, "stats", mode);
  }

  /**
   * Fetches a plot by ID
   * @param {Sting} id The ID to fetch a plot by
   * @returns {Promise<Object>} plot The plot's values
   */
  async plot(id) {
    return this.request("plots", id);
  }
 }

module.exports = Connection;
