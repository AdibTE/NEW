module.exports = async function(Model) {
    // id generator
    let isFound;
    for (i = 0; i < Infinity; i++) {
        // id/refrence generator
        isFound = await Model.findOne({ ID: i });
        if (!isFound) {
            return i;
        }
    }
};
