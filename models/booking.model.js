module.exports = (sequelize, type) => {
    const Booking = sequelize.define('bookings', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: type.DATE,
        memberId: type.INTEGER,
        copyId: type.INTEGER,
    });
    return Booking;
};