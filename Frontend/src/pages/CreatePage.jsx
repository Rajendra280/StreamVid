import React, { useState } from "react";
import AppLayout from "../layout/AppLayout";
import {ConverImage} from "../lib/helperfunction";
import usePostStore from "../store/usePostStore";

const CreatePage = () => {
  const {createPost} = usePostStore();
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [isChanging,setIsChanging] = useState(false);
  const [formData, setFormData] = useState({
    image:"",
    link1:"",
    link2:"",
    link3:"",
    link4:"",
    title:""
  })

  const updateFormData = async (e) => {
    setIsChanging(true);
    const { name, value, files } = e.target;
    if (name === "image") {
        const data = await ConverImage(files[0]);
        setFormData((prev) => ({ ...prev, image: data }));
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setIsChanging(false);
  };
  
  const SubmitHandler = async (e) =>{
    setIsSubmitting(true);
    e.preventDefault();
    await createPost(formData);
    setIsSubmitting(false);
  }
  
  return (
    <AppLayout>
      <form onSubmit={SubmitHandler} className="max-w-[1400px] mx-6 p-6 bg-base-100 mt-4 space-y-4">
        <h2 className="text-xl font-semibold text-center">Create New Post</h2>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Upload Image</span>
          </label>
          <input
            type="file"
            name="image"
            onChange={updateFormData}
            accept="image/*"
            className="file-input file-input-bordered w-full"
            required
          />
        </div>

        {/* Title Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Title</span>
          </label>
          <input
            type="text"
            placeholder="Enter title"
            name='title'
            onChange={updateFormData}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Link Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Link1</span>
          </label>
          <input
            name="link1"
            onChange={updateFormData}
            type="url"
            placeholder="https://example.com"
            className="input input-bordered w-full"
          />
        </div>
        {/* Link Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Link2</span>
          </label>
          <input
            name="link2"
            onChange={updateFormData}
            type="url"
            placeholder="https://example.com"
            className="input input-bordered w-full"
          />
        </div>
        {/* Link Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Link3</span>
          </label>
          <input
            name="link3"
            onChange={updateFormData}
            type="url"
            placeholder="https://example.com"
            className="input input-bordered w-full"
          />
        </div>
        {/* Link Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Link4</span>
          </label>
          <input
            name="link4"
            onChange={updateFormData}
            type="url"
            placeholder="https://example.com"
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-4">
          <button disabled={isChanging} type="submit" className="btn btn-neutral w-full">
            Submit
            {
                isSubmitting && <span className="loading loading-infinity text-white w-7"></span>
            }
          </button>
        </div>
      </form>
    </AppLayout>
  );
};

export default CreatePage;
