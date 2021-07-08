const downloadsFolder = require("downloads-folder");
const save = require("instagram-save");
const youtubedl = require("youtube-dl");
const fs = require("fs");

const instaDownloader = (req, res) => {
  try {
    //sUrl - splitted URl
    const sUrl = req.query.URL.split("/");
    const urlId = sUrl[sUrl.length - 2];

    save(urlId, downloadsFolder())
      .then((result) => {
        var output = downloadsFolder().split("\\").join('/') + result.file  ;
        res.status(200).send({
          status: 200,
          message: "Successfully Downloaded",
          data: { file: result.file },
        });
      })
      .catch((e) => {
        res
          .status(400)
          .send({ status: 400, message: "Invalid Link", data: null });
      });
  } catch (e) {
    res
      .status(400)
      .send({ status: 400, message: "Invalid Link", data: null });
  }
};

const yotubeDownloader = (req, res) => {
  const vUrl = req.query.URL;
  console.log(vUrl)
  const video = youtubedl(vUrl,
    ["--format=18"],
  );
  var output = downloadsFolder().split("\\").join('/') + '/myvideo.mp4'  ;
  video.on("info", function (info) {
    console.log("Download started");
    console.log("filename: " + info._filename);
    console.log("size: " + info.size);
    // res.status(200).send({
    //   status: 201,
    //   message: "Downloading...",
    //   data: { file: output },
    // });
  });
  video.pipe(fs.createWriteStream(output));
  video.on('end', function() {
    console.log('finished downloading!')
    res.status(200).send({
      status: 200,
      message: "Successfully Downloaded...",
      data: { file: output },
    });
  })
};

module.exports = {
  instaDownloader,
  yotubeDownloader,
};
