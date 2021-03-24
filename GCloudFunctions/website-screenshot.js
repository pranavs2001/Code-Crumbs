/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

// const puppeteer = require('puppeteer');

// exports.run = async (req, res) => {
//  try {
//    const buffer = await takeScreenshot(req.body);

//    res.setHeader("content-type", "image/png");
//    res.status(200).send(buffer);

//  } catch(error) {
//    res.setHeader("content-type", "application/json");
//    res.status(422).send(JSON.stringify({
//      error: error.message,
//    }));
//  }
// };

// async function takeScreenshot(params) {
//  const browser = await puppeteer.launch({
//    args: ['--no-sandbox']
//  });
//  const page = await browser.newPage();
//  await page.setDefaultNavigationTimeout(0);
//  await page.goto(params.url, {waitUntil: 'networkidle2'});

//  const buffer = await page.screenshot();

//  await page.close();
//  await browser.close();
  
//    return buffer;
// }

const puppeteer = require('puppeteer');
const { Storage } = require('@google-cloud/storage');

const GOOGLE_CLOUD_PROJECT_ID = "codecrumbs";
const BUCKET_NAME = "website-screenshots-hacks";

exports.run = async (req, res) => {
  res.setHeader("content-type", "application/json");
  
  try {
    const buffer = await takeScreenshot(req.body);
    let curr_url = req.body.url;
    let screenshotUrl = await uploadToGoogleCloud(buffer, (curr_url.replace(/\//g, '')) + ".png");
    
    res.status(200).send(JSON.stringify({
      'screenshotUrl': screenshotUrl
    }));
    
  } catch(error) {
    res.status(422).send(JSON.stringify({
      error: error.message,
    }));
  }
};

async function uploadToGoogleCloud(buffer, filename) {
    const storage = new Storage({
        projectId: GOOGLE_CLOUD_PROJECT_ID,
    });

    const bucket = storage.bucket(BUCKET_NAME);

    const file = bucket.file(filename);
    await uploadBuffer(file, buffer, filename);
  
    await file.makePublic();

    return `https://${BUCKET_NAME}.storage.googleapis.com/${filename}`;
}

async function takeScreenshot(params) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.goto(params.url, {waitUntil: 'networkidle2'});

  const buffer = await page.screenshot();

  await page.close();
  await browser.close();
  
    return buffer;
}

async function uploadBuffer(file, buffer, filename) {
    return new Promise((resolve) => {
        file.save(buffer, { destination: filename }, () => {
            resolve();
        });
    })
}