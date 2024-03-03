function printReport(pages) {
  const pagesArray = []

  for (const page in pages) {
    pagesArray.push({ url: page, count: pages[page] })
  }

  pagesArray.sort((a, b) => b.count - a.count)

  console.log(`\n================================================`)
  console.log(`==================== REPORT ====================`)
  console.log(`================================================\n`)
  for (const page of pagesArray) {
    console.log(`Link to ${page.url} found ${page.count} times`)
  }
  console.log(`\n================================================`)
  console.log(`================================================`)
  console.log(`================================================\n`)
}

module.exports = {
  printReport,
}
