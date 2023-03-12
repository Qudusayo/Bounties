# Running the File.
You need to run `npm install` to install the required packages before getting started

### Requirements
1. Twitter API Key. You can get it from [Twitter DevPage](https://developer.twitter.com/en/portal/dashboard) and replace it in `.env` file
2. Youtube API Key. You can get it from [Youtube DevPage](https://console.cloud.google.com/apis/api/youtube.googleapis.com) and replace it in `.env` file
3. Instagram CSRF Token. You can get it from the header inspecting the browser network tabs.

## Running the aggrgations.
Before aggregation, you should convert the file to csv format and then create a directory called files and put it there.


You should then convert the csv to json running
```
node file_processor/csvtojson.js
```

After it's converted, you'll find a data.json file in the files directory, then you can go on with the data aggregation.

To process instagram aggregation
```sh
node processor/instagram_fix.js
```

To process tiktok aggregation
```sh
node processor/tiktok_fix.js
```

To process twitter aggregation
```sh
node processor/twitter_fix.js
```

To process youtube aggregation
```sh
node processor/youtube_fix.js
```

### Finishing
After the aggregation is completed, then you can merge the agrregation by running
```
node file_processor/result_aggregator.js
```
This will generate a `data_aggregated.json` file. Afterwards, you need to convert the file to csv by running
```
node file_processor/jsontocsv.js
```

And you'll find your `data_aggregated.csv` file in the files directory.