const { crawlPage } = require("./crawl.js")
const { printReport } = require("./report.js")

async function main(url = process.argv[2]) {
  console.log(
    `\nReporting is starting, pages are-a being a-crawled. Any errors will be displayed below.\n`
  )
  if (!url) {
    throw new Error(`Usage: node main.js <url>`)
  }
  const pages = await crawlPage(url, url, {})
  return printReport(pages)
}

main()
