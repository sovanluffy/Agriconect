import mongoose , {Schema , Document , Types} from "mongoose";

export interface Category extends Document {
    _id: Types.ObjectId;
    name: string;
    decription?: string;
}

const categorySchema = new Schema<Category> ({
     
    name: { type: String , required: true},
    decription: { type: String },
  

})

export const categoryModel = mongoose.model<Category>("Category" , categorySchema);
