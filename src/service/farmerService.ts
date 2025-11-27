import { FarmerModel } from "@/models/farmerModel";

// Create a new farmer
export const createFarmer = async (userId: string, data: any) => {
  const existingFarmer = await FarmerModel.findOne({ user_id: userId });
  if (existingFarmer) throw new Error("Farmer profile already exists");

  const farmer = new FarmerModel({ user_id: userId, ...data });
  await farmer.save();
  return farmer;
};

// Get a single farmer with user details
export const getFarmerById = async (farmerId: string) => {
  const farmer = await FarmerModel.findById(farmerId).populate(
    "user_id",
    "full_name email phone address"
  );
  if (!farmer) throw new Error("Farmer not found");
  return farmer;
};

// Get all farmers with user details
export const getAllFarmers = async () => {
  const farmers = await FarmerModel.find().populate(
    "user_id",
    "full_name email phone address"
  );
  return farmers;
};

// Update farmer profile
export const updateFarmer = async (farmerId: string, data: any) => {
  const updatedFarmer = await FarmerModel.findByIdAndUpdate(farmerId, data, { new: true });
  if (!updatedFarmer) throw new Error("Farmer not found");
  return updatedFarmer;
};

// Delete farmer
export const deleteFarmer = async (farmerId: string) => {
  const deletedFarmer = await FarmerModel.findByIdAndDelete(farmerId);
  if (!deletedFarmer) throw new Error("Farmer not found");
  return "Farmer deleted successfully";
};
