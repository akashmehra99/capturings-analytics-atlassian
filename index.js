// This is the example of component to be instrumented using the function
class Component {
  constructor() {
    // this is where the unction could be called for example
    sendAnalyticsEvent(event);
    setTimeout(this.init, 100);
  }
  init() {
    sendAnalyticsEvent(event);
  }
}

// Your goal is to implement the sendAnalyticsEvent(event) API function.
const doRequest = (events) => {
  return new Promise((resolve, reject) => {
    return resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
    });
  });
};

class Analytics {
  #instance;
  #batchTimer = 3;
  #eventsBatch = [];

  #setTimerId = null;

  constructor() {
    if (!this.#instance) {
      this.#instance = this;
      this.handleApiForAnalytics();
    }
    return this.#instance;
  }

  setCustomBatchTimer(timeInSecs) {
    this.#batchTimer = timeInSecs;
  }

  sendAnalyticsEvent(event) {
    this.#eventsBatch.push(event);
  }

  destroyAnalytics() {
    clearTimeout(this.#setTimerId);
  }

  handleApiForAnalytics() {
    const eventsBatch = [...this.#eventsBatch];
    this.#eventsBatch = [];
    this.#setTimerId = setTimeout(() => {
      doRequest(eventsBatch)
        .then((res) => {
          console.log("Success for event -> ", res, this.#eventsBatch);
          this.handleApiForAnalytics();
        })
        .catch((err) => {
            this.#eventsBatch = [...eventsBatch, ...this.#eventsBatch];
          console.error("Error -> ", err, eventsBatch);
          this.handleApiForAnalytics();
        });
    }, this.#batchTimer * 1000);
  }
}



// export default new Analytics();

const analytics = new Analytics();

setTimeout(() => {
    analytics.destroyAnalytics();
}, 12000)

analytics.sendAnalyticsEvent({
  type: "pageView",
  data: {
    userId: "abc123",
  },
});
