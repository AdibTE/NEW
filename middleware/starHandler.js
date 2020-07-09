module.exports = function(point) {
    if (point >= 0 && point < 10) {
        return 0;
    }
    if (point >= 10 && point < 20) {
        return 1;
    }
    if (point >= 20 && point < 30) {
        return 2;
    }
    if (point >= 30 && point < 40) {
        return 3;
    }
    if (point >= 40 && point < 50) {
        return 4;
    }
    if (point >= 50 && point <= 60) {
        return 5;
    }
    else return 0
};
