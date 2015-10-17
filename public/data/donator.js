var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongodbUri = 'mongodb://gmcallister:hack15@ds042898.mongolab.com:42898/MongoLab-v';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
mongoose.connect(mongooseUri, options);

var donatorSchema = new Schema({
	name: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	donation: Number,
	items: [String]
});

mongoose.model('donator', donatorSchema);