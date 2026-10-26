const dashboardService = require("../services/dashboardService");

const getProfit = async (req, res, next) => {
    try {
        const profit = await dashboardService.getProfit(req.business.id);
        if(!profit){
            const error = new Error("Cannot find business");
            error.status = 404;
            next(error);
        }
        res.status(200).json({
            success: true,
            message: "profit fetched successfully",
            data: profit
        })
    } catch (error) {
        next(error);
    }
}


module.exports = {getProfit}