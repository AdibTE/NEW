const path = require('path');
const fs = require("fs")
const ud = path.join(__dirname, '../client/public/uploads');


module.exports = {
	uploadDir: ud,
	upload: (files, path, fileName = null) => {
        let returnFileNames = [];

        files = !files.length ? [ files ] : files;
		files.forEach((file) => {
            let filename = fileName ?? `${Date.now()}-${file.name}`;
			let fileExtenstion = file.name.split(".")[file.name.split(".").length - 1];
			let finalName = ud + path  + filename + "." + fileExtenstion;
			
            returnFileNames.push(filename + "." + fileExtenstion);
			let fileError = false;
			file.mv(finalName, (err) => {
				if (err) {
					fileError = true;
				}
			});
			if (fileError) return res.status(500).json({ msg: 'خطایی در آپلود فایل رخ داد!' });
		});
		return returnFileNames.length == 1 ? returnFileNames[0] : returnFileNames;
	}
};
