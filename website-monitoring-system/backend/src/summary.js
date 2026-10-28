export async function
extractPageSummary(page) {

  const summary =
    await page.evaluate(() => {

      return {

        title:
          document.title,

        buttons:
          document.querySelectorAll(
            "button"
          ).length,

        forms:
          document.querySelectorAll(
            "form"
          ).length,

        links:
          document.querySelectorAll(
            "a"
          ).length,

        tables:
          document.querySelectorAll(
            "table"
          ).length,

        inputs:
          document.querySelectorAll(
            "input"
          ).length,

        images:
          document.querySelectorAll(
            "img"
          ).length,

        scripts:
          document.querySelectorAll(
            "script"
          ).length,

        iframes:
          document.querySelectorAll(
            "iframe"
          ).length,

        headings:
          document.querySelectorAll(
            "h1,h2,h3,h4,h5,h6"
          ).length,

        paragraphs:
          document.querySelectorAll(
            "p"
          ).length,

      };

    });

  return summary;

}