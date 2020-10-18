const path = require('path');

module.exports = {
	uploadDir: path.join(__dirname, '../client/public/uploads'),
	upload: (files, path, fileName = null) => {
		let returnFileNames = [];
		files = !files.length ? [ files ] : files;
		files.forEach((file) => {
			let filename = fileName ?? `${Date.now()}-${file.name}`;
            returnFileNames.push(filename);
            console.log(file)

			let fileError = false;
			file.mv(uploadDir + path  + filename + ".jpg", (err) => {
				if (err) {
					fileError = true;
				}
			});
			if (fileError) return res.status(500).json({ msg: 'خطایی در آپلود فایل رخ داد!' });
		});
		return returnFileNames;
	}
};
