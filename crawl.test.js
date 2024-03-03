const { test, expect } = require("@jest/globals")
const { normalizeURL, getURLsfromHTML } = require("./crawl.js")

test("normalizeURL", () => {
  const url = "http://BooT.dev/sdflkjfdg?234"
  const trimmedURL = normalizeURL(url)
  res = trimmedURL.toLowerCase()
  expect(res).toBe("boot.dev/sdflkjfdg")
})

test("getURLsfromHTML", () => {
  const html = `
        <html>
        <body>
            <a href="http://google.com">Google</a>
            <a href="http://yahoo.com">Yahoo</a>
        </body>
        </html>
    `
  const urls = getURLsfromHTML(html)
  expect(urls).toEqual(["http://google.com", "http://yahoo.com"])
})
