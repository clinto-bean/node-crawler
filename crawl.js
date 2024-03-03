const { JSDOM } = require("jsdom")

function normalizeURL(url) {
  const urlObject = new URL(url)
  const normalizedURL = `${urlObject.origin}${urlObject.pathname}`
  if (normalizedURL.slice(-1) === "/") {
    return normalizedURL.slice(0, -1)
  }
  return normalizedURL
}

function getURLsfromHTML(doc, baseURL) {
  const DOM = new JSDOM(doc)
  const links = DOM.window.document.querySelectorAll("a")
  const result = []
  for (const link of links) {
    let href = link.href
    if (href.slice(-1) === "/") {
      href = href.slice(0, -1)
    }
    if (href.length === 0) {
      continue
    }
    if (href.length > 1 && href.slice(0, 1) === "/") {
      href = baseURL + href

      result.push(normalizeURL(href))
    } else {
      result.push(normalizeURL(href))
    }
  }
  return result
}

async function crawlPage(baseURL, currentURL, pages) {
  const base = new URL(baseURL)
  const current = new URL(currentURL)
  if (base.hostname !== current.hostname) {
    return pages
  }

  const normalizedCurrentURL = normalizeURL(currentURL)

  if (pages[normalizedCurrentURL]) {
    pages[normalizedCurrentURL]++
    return pages
  } else {
    if (normalizedCurrentURL === baseURL) {
      pages[normalizedCurrentURL] = 0
    } else {
      pages[normalizedCurrentURL] = 1
    }
  }
  try {
    const response = await fetch(currentURL)
    const html = await response.text()
    const urls = getURLsfromHTML(html, baseURL)
    if (response.status >= 400) {
      throw new Error(`Failed to load page: ${response.status}`)
    }
    if (!response.headers.get("Content-Type").startsWith("text/html")) {
      throw new Error(`${currentURL} is not an HTML file`)
    }
    for (const url of urls) {
      await crawlPage(baseURL, url, pages)
    }
  } catch (e) {
    console.log(`Unable to crawl page: ${e.message}`)
  } finally {
    return pages
  }
}

module.exports = {
  normalizeURL,
  getURLsfromHTML,
  crawlPage,
}
