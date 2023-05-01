const puppeteer = require("puppeteer");

async function GetData(dto) {
  try {
    const { jobtype = "", location = "" } = dto;
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
    );

    //Going to indeed webpage
    await page.goto("https://in.indeed.com/");

    //setting viewport dimension
    await page.setViewport({ width: 1500, height: 1024 });

    //Going to the What input and entering query of jobtype
    const JobType = await page.waitForSelector("#text-input-what");
    await JobType.type(jobtype);

    //Going to the Where input and entering query of location
    const locationIn = await page.waitForSelector("#text-input-where");
    await locationIn.type(location);

    //Click on Submit button
    const FindBtn = await page.waitForSelector('[type="submit"]');
    await FindBtn.click();

    //waiting for response and page load.
    await page.waitForSelector(".jobsearch-ResultsList");

    //evaluating the element after page load
    const table = await page.evaluate(() => {
      let arr = [];

      //selecting all the individual job card by class

      const JobCard = document.querySelectorAll(".job_seen_beacon");

      //mapping jobcard and extracting company details from jobcard array

      JobCard.forEach((el) => {
        let details = {
          // url: urlList[i],
          title: el.querySelector("h2")?.innerText,
          company_name: el.querySelector(".companyName")?.innerText,
          company_location: el.querySelector(".companyLocation")?.innerText,
          company_salary:
            el.querySelector(".salary-snippet-container")?.innerText || "",
        };
        const job_description = el.querySelectorAll(".job-snippet li");
        // urlget(i);

        // function urlget(num) {
        //   const urlList = document.querySelectorAll(
        //     "h2.jobTitle.css-1h4a4n5.eu4oa1w0 a"
        //   );
        //   console.log(urlList[num]);
        // }

        if (job_description) {
          const job_description_arr = [];
          for (let i = 0; i < job_description.length; i++) {
            let desc = job_description[i]?.innerText;
            job_description_arr.push(desc);
          }
        //adding details in details object
          details.job_description = job_description_arr;
        }
        //adding details in final array
        arr.push(details);
      });

      return arr;
      // return JobCard;
    });

    //Closing browser here

    await browser.close();
    return table;

    //Handling Error
  } catch (error) {
    console.log(" error:", error);
    return error.message;
  }
}

module.exports = GetData;
