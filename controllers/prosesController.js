import { Sequelize } from "sequelize";
const Op = Sequelize.Op;

// Get all Apt1v3NojsUsers
export const createDegradasiAptOld = async (req, res) => {
  try {
    console.log("create AptOLD");
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error", error: err.message });
  }
};
