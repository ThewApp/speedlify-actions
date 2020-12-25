;(function() {
	if(!("customElements" in window) || !("fetch" in window)) {
		return;
	}

	const NAME = "speedlify-score";

	class SpeedlifyUrlStore {
		constructor() {
			this.fetches = {};
			this.responses = {};
			this.urls = {};
		}

		async fetch(speedlifyUrl, url) {
			if(this.urls[speedlifyUrl]) {
				return this.urls[speedlifyUrl][url] ? this.urls[speedlifyUrl][url].hash : false;
			}

			if(!this.fetches[speedlifyUrl]) {
				this.fetches[speedlifyUrl] = fetch(`${speedlifyUrl}/api/urls.json`);
			}

			let response = await this.fetches[speedlifyUrl];

			if(!this.responses[speedlifyUrl]) {
				this.responses[speedlifyUrl] = response.json();
			}

			let json = await this.responses[speedlifyUrl];

			this.urls[speedlifyUrl] = json;

			return json[url] ? json[url].hash : false;
		}
	}

	const urlStore = new SpeedlifyUrlStore();

	customElements.define(NAME, class extends HTMLElement {
		connectedCallback() {
			this.speedlifyUrl = this.getAttribute("speedlify-url");
			this.shorthash = this.getAttribute("hash");
			this.rawData = this.getAttribute("raw-data");
			this.url = this.getAttribute("url") || window.location.href;
			this.urlStore = urlStore;

			if(!this.rawData && !this.speedlifyUrl) {
				console.log(`Missing \`speedlify-url\` attributes in <${NAME}>`);
				return;
			}

			// lol async in constructors
			this.init();
		}

		async init() {
			if(this.rawData) {
				this.innerHTML = this.render(JSON.parse(this.rawData));
				return;
			}

			let hash = this.shorthash;
			if(!hash) {
				// It’s much faster if you supply a `hash` attribute!
				hash = await this.urlStore.fetch(this.speedlifyUrl, this.url);
			}

			if(!hash) {
				console.error( `<${NAME}> could not find hash for URL: ${this.url}` );
				return;
			}

			let data = await this.fetchData(hash);
			this.innerHTML = this.render(data);
		}

		async fetchData(hash) {
			let response = await fetch(`${this.speedlifyUrl}/api/${hash}.json`);
			let json = await response.json();

			return json;
		}

		getScoreClass(score) {
			if(score < .5) {
				return "speedlify-score speedlify-score-bad";
			}
			if(score < .9) {
				return "speedlify-score speedlify-score-ok";
			}
			return "speedlify-score speedlify-score-good";
		}

		render(data) {
			let scores = [];
			scores.push(`<span title="Performance" class="${this.getScoreClass(data.lighthouse.performance)}">${parseInt(data.lighthouse.performance * 100, 10)}</span>`);
			scores.push(`<span title="Accessibility" class="${this.getScoreClass(data.lighthouse.accessibility)}">${parseInt(data.lighthouse.accessibility * 100, 10)}</span>`);
			scores.push(`<span title="Best Practices" class="${this.getScoreClass(data.lighthouse.bestPractices)}">${parseInt(data.lighthouse.bestPractices * 100, 10)}</span>`);
			scores.push(`<span title="SEO" class="${this.getScoreClass(data.lighthouse.seo)}">${parseInt(data.lighthouse.seo * 100, 10)}</span>`);

			let content = [];
			content.push(`<span class="speedlify-summary">${data.weight.summary}</span>`);
			content.push(`<span>${scores.join("")}</span>`);
			return content.join(" ");
		}
	});
})();
function makeTable(table) {
  let labels = [];
  let series = [];

  let rows = Array.from(table.querySelectorAll(":scope tbody tr"));
  let minY = 90;
  let maxY = 100;
  rows = rows.reverse();

  for(let row of rows) {
    let label = row.children[0].innerText.split(" ");
    labels.push(label.slice(0,2).join(" "));
    let childCount = row.children.length - 1;
    let seriesIndex = 0;
    for(let j = 0, k = childCount; j<k; j++) {
      let data = row.children[j + 1].dataset;
      if(data && data.numericValue) {
        minY = Math.min(data.numericValue, minY);
        maxY = Math.max(data.numericValue, maxY);
        if(!series[seriesIndex]) {
          series[seriesIndex] = [];
        }
        series[seriesIndex].push(data.numericValue);
        seriesIndex++;
      }
    }
  }

  let options = {
    high: Math.max(maxY, 100),
    low: Math.max(0, minY - 5),
    fullWidth: true,
    onlyInteger: true,
    showPoint: false,
    lineSmooth: true,
    axisX: {
      showGrid: true,
      showLabel: true
    },
    chartPadding: {
      right: 40
    }
  };

  new Chartist.Line(table.parentNode.nextElementSibling, {
    labels: labels,
    series: series
  }, options);
}

function initializeAllTables(scope) {
  let tables = scope.querySelectorAll("[data-make-chart]");
  for(let table of tables) {
    // make sure not in a closed details
    if(table.closest("details[open]") || !table.closest("details")) {
      makeTable(table);
    }
  }
}

initializeAllTables(document);

let details = document.querySelectorAll("details");
// let first = true;
for(let detail of details) {
  // open the first details by default
  // if(first) {
  //   detail.open = true;
  //   first = false;
  // }
  detail.addEventListener("toggle", function(e) {
    let open = e.target.hasAttribute("open");
    if(open) {
      initializeAllTables(e.target);
    }
    let row = e.target.closest(".leaderboard-list-entry-details");
    row.classList.toggle("expanded", open);
    row.previousElementSibling.classList.toggle("expanded", open);
  });
}

let expandAliases = document.querySelectorAll("[data-expand-alias]");
for(let alias of expandAliases) {
  alias.addEventListener("click", function(e) {
    e.preventDefault();
    let href = e.target.closest("a[href]").getAttribute("href");
    if(href) {
      let details = document.querySelector(href);
      if(details) {
        details.open = !details.hasAttribute("open");
      }
    }
  }, false);
}

;(function() {
	if(!("customElements" in window) || !("Intl" in window) || !Intl.RelativeTimeFormat) {
		return;
	}
	const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

	customElements.define("timestamp-ago", class extends HTMLElement {
		connectedCallback() {
			let timestamp = this.getAttribute("timestamp");
			if(timestamp) {
				let date = (new Date()).setTime(timestamp);
				let diff = Math.floor((date - Date.now())/(1000 * 60 * 60));
				this.setAttribute("title", this.innerText);
				this.innerText = rtf.format(diff, "hour");
			}
		}
	});
})();
