import { roleModel } from "@/models/roleModel";
import { userRoleModel } from "@/models/userRoleModel";
import { FarmerModel } from "@/models/farmerModel";
import { userModel } from "@/models/userModel"; // your User model

export const assignFarmerRoleToUser = async (targetUserId: string) => {
  // Find Farmer role
  const farmerRole = await roleModel.findOne({ name: "Farmer" });
  if (!farmerRole) throw new Error("Farmer role not found");

  // Check if user already has Farmer role
  const already = await userRoleModel.findOne({
    user_id: targetUserId,
    role_id: farmerRole._id,
  });
  if (already) return "User already has Farmer role";

  // Assign Farmer role
  await userRoleModel.create({
    user_id: targetUserId,
    role_id: farmerRole._id,
  });

  // Check if Farmer record exists
  const existingFarmer = await FarmerModel.findOne({ user_id: targetUserId });
  if (!existingFarmer) {
    // Get data from User
    const user = await userModel.findById(targetUserId);
    if (!user) throw new Error("User not found");

    // Create Farmer from User data
    await FarmerModel.create({
      user_id: user._id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      address: user.address, // optional, if user has it
    });
  }

  return "Farmer role assigned and Farmer record created successfully";
};
